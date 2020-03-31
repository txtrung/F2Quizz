<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\Quizzes;
use Yii;
use yii\rest\ActiveController;
use yii\helpers\ArrayHelper;
use yii\filters\Cors;

class QuizzesController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Quizzes';

    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => \Yii::$app->params['clientDomain'],
                    'Access-Control-Request-Method' => ['GET', 'HEAD', 'OPTIONS'],
                ],
            ],
        ], parent::behaviors());
    }

    public function actionQuestion() {
        $quizzId = \Yii::$app->getRequest()->getQueryParams('quizzes')['id'];
        $datas = (new Questions)->getQuestionByQuizzId($quizzId);
        return $datas;
    }
}