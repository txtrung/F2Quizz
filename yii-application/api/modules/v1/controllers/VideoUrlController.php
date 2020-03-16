<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\VideoUrl;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

class VideoUrlController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\VideoUrl';

    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:4200'],
                    'Access-Control-Request-Method' => ['GET', 'HEAD', 'OPTIONS'],
                ],
            ],
        ], parent::behaviors());
    }

    public function actionRandomReward() {
        $datas = (new VideoUrl)->getRandomReward();
        return $datas;
    }

    public function actionRandomExchange() {
        $datas = (new VideoUrl)->getRandomExchange();
        return $datas;
    }
}