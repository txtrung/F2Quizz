<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\DownloadFile;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;
use yii\web\Response;

class UploadController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Upload';

    public function behaviors()
    {
//        $behaviors = parent::behaviors();
//        $behaviors['contentNegotiator'] = [
//            'class' => ContentNegotiator::className(),
//            'formats' => [
//                'application/json' => Response::FORMAT_JSON,
//            ],
//        ];
//        return array_merge($behaviors, [
//            'corsFilter'  => [
//                'class' => \common\filters\Cors::className(),
//                'cors'  => [
//                    // restrict access to domains:
//                    'Origin'                           => ['http://localhost:4200','https ://localhost:4200','http://localhost:4200/questions'],
//                    'Access-Control-Request-Method'    => ['POST', 'GET', 'OPTIONS'],
//                    'Access-Control-Allow-Credentials' => true,
////                    'Access-Control-Max-Age'           => 3600,                 // Cache (seconds)
//                    'Access-Control-Allow-Headers' => ['authorization','X-Requested-With','content-type', 'some_custom_header']
//                ],
//            ],
//        ]);
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:4200','https ://localhost:4200','http://localhost:4200/questions'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Max-Age'           => 3600,
                    'Access-Control-Request-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'accept', 'Authorization'],
                ],
            ],
        ], parent::behaviors());
    }

    public function actionPostUploadFile() {
//        $post = Yii::$app->request->post();
        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_JSON;
        $response->data = ['message' => 'hello world'];
        return $response->send();
    }

    public function actionGetUploadFile() {
        return [
            'message' => 'hello world 2222222222',
            'code' => 100,
        ];
    }
}