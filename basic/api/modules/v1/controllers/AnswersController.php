<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;

class AnswersController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Answers';
}