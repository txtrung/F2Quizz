<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\DownloadFile;
use Yii;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;
use yii\web\Response;

class DownloadFileController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\DownloadFile';

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

    public function actionDownload() {
        $fileId = \Yii::$app->getRequest()->getQueryParams('file')['id'];
        $datas = (new DownloadFile)->getFile($fileId);
        $downloadPath = Yii::getAlias('@backend'.'/web/') . $datas['path'];
        Yii::$app->response->headers->set('data-pjax',0);
        return Yii::$app->response->sendFile($downloadPath);
    }

    public function actionRandomReward() {
        $datas = (new DownloadFile)->getRandomReward();
        $downloadPath = Yii::getAlias('@backend'.'/web/') . $datas[0]['path'];
        Yii::$app->response->headers->set('data-pjax',0);
        return Yii::$app->response->sendFile($downloadPath);
    }

    public function actionRandomExchange() {
        $datas = (new DownloadFile)->getRandomExchange();
        return $datas;
    }
}