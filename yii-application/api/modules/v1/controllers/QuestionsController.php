<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use yii\rest\ActiveController;

class QuestionsController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Questions';

    public function actionIndex() {
        $question = Questions::findOne(1);
        $data = $question->answers;
        return $data;
    }

    public function actionAnswer() {
        $question = Questions::findOne(1);
        $data = $question->answers;
        return $data;
    }
}