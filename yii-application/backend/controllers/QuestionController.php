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
            'modelsCorrectAnswer' => $this->findModel($id)->correctAnswers ? ArrayHelper::toArray($this->findModel($id)->correctAnswers)[0] : []
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
        $modelsAnswers = (empty($model->answers)) ? [new Answer] : $model->answers;
//        $modelsCorrectAnswer = $model->correctAnswers;
        $modelsCorrectAnswer = (empty($model->correctAnswers)) ? new CorrectAnswer : $model->correctAnswers[0] ;

//        var_dump($modelsCorrectAnswer);

        var_dump(Yii::$app->request->post());
//die();
        if ($model->load(Yii::$app->request->post())) {

            $answersData = Yii::$app->request->post((new Answer())->formName());
            $deletedIDs = [];
            if ($answersData) {
                foreach ($modelsAnswers as $data) {
                    array_push($deletedIDs,$data['id']);
                }
//                var_dump($deletedIDs);
                $multipleAnswerModel = [];
                foreach ($answersData as $index => $answerData) {
                    $tmpAnswerModel = new Answer();
                    $tmpAnswerModel->question_id = $model->id;
                    $tmpAnswerModel->content = $answerData['content'];
                    $tmpAnswerModel->tag = $index+1;
                    $multipleAnswerModel[] = $tmpAnswerModel;
                }
            }

            $correctAnswerData = Yii::$app->request->post((new CorrectAnswer())->formName());

//var_dump($correctAnswerData);
//            die();
//            var_dump($deletedCorrectAnswerIDs);
//            var_dump($modelsCorrectAnswer);
//            die();

            // validate all models
            $valid = $model->validate();
            $valid = Model::validateMultiple($multipleAnswerModel,['content']) && $valid;

            if ($valid) {
                $transaction = \Yii::$app->db->beginTransaction();
                try {
                    if ($flag = $model->save(false)) {
                        if (! empty($deletedIDs)) {
                            Answer::deleteAll(['id' => $deletedIDs]);
                            foreach ($multipleAnswerModel as $item) {
                                if (! ($flag = $item->save(false))) {
                                    $transaction->rollBack();
                                    break;
                                }
                            }

                            var_dump($correctAnswerData['right_answer']);
//                            var_dump(empty($correctAnswerData['right_answer']));
//                            die();
//                            if (!empty($correctAnswerData['right_answer'])) {
                                $modelsCorrectAnswer->question_id = $model->id;
                                $modelsCorrectAnswer->right_answer = $correctAnswerData['right_answer'];
                                if (! ($flag = $modelsCorrectAnswer->save(false))) {
                                    $transaction->rollBack();
                                }
//                            }
                        } else {
                            Answer::deleteAll(['question_id' => $model->id]);
                            CorrectAnswer::deleteAll(['question_id' => $model->id]);
                        }
                    }
                    if ($flag) {
                        $transaction->commit();
die();
                        return $this->redirect(['view', 'id' => $model->id]);
                    }
                } catch (Exception $e) {
//                    var_dump($e->getMessage());die();
                    $transaction->rollBack();
                }
            }
//die();
            return $this->redirect(['view', 'id' => $model->id]);
        }

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
