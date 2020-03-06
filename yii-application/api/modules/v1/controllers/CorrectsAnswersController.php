<?php

namespace api\modules\v1\controllers;

use yii\rest\ActiveController;

class CorrectsAnswersController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\CorrectsAnswers';
}