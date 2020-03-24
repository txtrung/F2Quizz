<?php

namespace backend\controllers;

use backend\models\Answer;
use backend\models\CorrectAnswer;
use Exception;
use Yii;
use backend\models\Question;
use backend\models\QuestionSearch;
use common\models\Model;
use yii\helpers\ArrayHelper;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\Response;
use yii\widgets\ActiveForm;

/**
 * QuestionController implements the CRUD actions for Question model.
 */
class QuestionController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Question models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new QuestionSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Question model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
            'modelsAnswers' => $this->findModel($id)->answers,
            'modelsCorrectAnswer' => ArrayHelper::toArray($this->findModel($id)->correctAnswers)[0]
        ]);
    }

    /**
     * Creates a new Question model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Question();
        $modelsAnswers = [new Answer];
        $modelsCorrectAnswer = new CorrectAnswer();

        if ($model->load(Yii::$app->request->post())) {

            $modelsAnswers = Model::createMultiple(Answer::className());
            Model::loadMultiple($modelsAnswers, Yii::$app->request->post());

            // ajax validation
            if (Yii::$app->request->isAjax) {
                Yii::$app->response->format = Response::FORMAT_JSON;
                return ArrayHelper::merge(
                    ActiveForm::validateMultiple($modelsAnswers),
                    ActiveForm::validate($model)
                );
            }

            // validate all models
            $valid = $model->validate();
            $valid = Model::validateMultiple($modelsAnswers,['content']) && $valid;

            if ($valid) {
                $transaction = \Yii::$app->db->beginTransaction();
                try {
                    if ($flag = $model->save(false)) {
                        foreach ($modelsAnswers as $index => $modelAnswers) {
                            $modelAnswers->question_id = $model->id;
                            $modelAnswers->tag = $index;
                            if (! ($flag = $modelAnswers->save(false))) {
                                $transaction->rollBack();
                                break;
                            }
                        }

                        $modelsCorrectAnswer->question_id = $model->id;
                        $modelsCorrectAnswer->right_answer = Yii::$app->request->post($modelsCorrectAnswer->formName())['right_answer'];
                        if (! ($flag = $modelsCorrectAnswer->save(false))) {
                            $transaction->rollBack();
                        }
                    }
                    if ($flag) {
                        $transaction->commit();
                        return $this->redirect(['view', 'id' => $model->id]);
                    }
                } catch (Exception $e) {
                    $transaction->rollBack();
                }
            }

            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
            'modelsAnswers' => (empty($modelsAnswers)) ? [new Answer] : $modelsAnswers
        ]);
    }

    /**
     * Updates an existing Question model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $modelsAnswers = $model->answers;
        $modelsCorrectAnswer = $model->correctAnswers;

//        var_dump($modelsCorrectAnswer);
//        die();

        if ($model->load(Yii::$app->request->post())) {
            var_dump('0');
            $oldIDs = ArrayHelper::map($modelsAnswers, 'id', 'id');
            $modelsAnswers = Model::createMultiple(Answer::classname(), $modelsAnswers);
            Model::loadMultiple($modelsAnswers, Yii::$app->request->post());
            $deletedIDs = array_diff($oldIDs, array_filter(ArrayHelper::map($modelsAnswers, 'id', 'id')));

            $oldCorrectAnswerIDs = ArrayHelper::map($modelsCorrectAnswer, 'id', 'id');
            var_dump($oldCorrectAnswerIDs);
            $deletedCorrectAnswerIDs = array_diff($oldCorrectAnswerIDs, array_filter(ArrayHelper::map($modelsCorrectAnswer, 'id', 'id')));
            var_dump($deletedCorrectAnswerIDs);
            var_dump('1');
            // ajax validation
            if (Yii::$app->request->isAjax) {
                Yii::$app->response->format = Response::FORMAT_JSON;
                return ArrayHelper::merge(
                    ActiveForm::validateMultiple($modelsAnswers),
                    ActiveForm::validate($model)
                );
            }

            // validate all models
            $valid = $model->validate();
            $valid = Model::validateMultiple($modelsAnswers,['content']) && $valid;

            if ($valid) {
                var_dump('2');
                $transaction = \Yii::$app->db->beginTransaction();
                try {
                    if ($flag = $model->save(false)) {
                        var_dump('3');
                        if (! empty($deletedIDs)) {
                            Answer::deleteAll(['id' => $deletedIDs]);
                        }
                        foreach ($modelsAnswers as $modelAnswers) {
                            $modelAnswers->question_id = $model->id;
                            if (! ($flag = $modelAnswers->save(false))) {
                                $transaction->rollBack();
                                break;
                            }
                        }
                        var_dump('4');
                        var_dump($deletedCorrectAnswerIDs);
                        if (! empty($deletedCorrectAnswerIDs)) {
                            CorrectAnswer::deleteAll(['id' => $deletedCorrectAnswerIDs]);
                        }

                        var_dump('4.1');

                        var_dump($modelsCorrectAnswer->question_id);
                        $modelsCorrectAnswer->question_id = $model->id;
                        var_dump('4.2');
                        $modelsCorrectAnswer->right_answer = Yii::$app->request->post($modelsCorrectAnswer->formName())['right_answer'];
                        var_dump('4.3');
                        if (! ($flag = $modelsCorrectAnswer->save(false))) {
                            $transaction->rollBack();
                        }
                        var_dump($flag);
                        var_dump('5');
                    }
                    if ($flag) {
                        var_dump('6');
                        die();
                        $transaction->commit();
                        return $this->redirect(['view', 'id' => $model->id]);
                    }
                } catch (Exception $e) {
                    $transaction->rollBack();
                }
            }

            var_dump('7');
            die();
            return $this->redirect(['view', 'id' => $model->id]);
        }

        var_dump('8');

        return $this->render('update', [
            'model' => $model,
            'modelsAnswers' => (empty($modelsAnswers)) ? [new Answer] : $modelsAnswers,
            'modelsCorrectAnswer' => (empty($modelsAnswers)) ? [new CorrectAnswer] : $model->correctAnswers
        ]);
    }

    /**
     * Deletes an existing Question model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Question model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Question the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Question::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException(Yii::t('app', 'The requested page does not exist.'));
    }
}
