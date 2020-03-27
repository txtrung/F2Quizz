<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\Quizzes;
use yii\rest\ActiveController;
use yii\helpers\ArrayHelper;
use yii\filters\Cors;

class UsersController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Users';

    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:4200'],
                    'Access-Control-Request-Method' => ['POST','GET'],
                ],
            ],
        ], parent::behaviors());
    }

    public function actionLogin() {
        $quizzId = \Yii::$app->getRequest()->getQueryParams('quizzes')['id'];
        $datas = (new Questions)->getQuestionByQuizzId($quizzId);
        return $datas;
    }
}