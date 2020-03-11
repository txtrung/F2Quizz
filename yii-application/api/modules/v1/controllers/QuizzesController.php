<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\Quizzes;
use yii\rest\ActiveController;

class QuizzesController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Quizzes';

    public function actionQuestion() {
        $quizzId = \Yii::$app->getRequest()->getQueryParams('quizzes')['id'];
        $datas = (new Questions)->getQuestionByQuizzId($quizzId);
        return $datas;
    }
}