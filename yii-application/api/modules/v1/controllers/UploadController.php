<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\UploadForm;
use Yii;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\Response;
use yii\web\UploadedFile;

class UploadController extends ActiveController
{
    // We are using the regular web app modules:
    public $modelClass = 'api\modules\v1\models\Upload';

    public function behaviors()
    {
        return ArrayHelper::merge([
            [
                'class' => Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:4200'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'accept', 'Authorization'],
                ],
            ],
        ], parent::behaviors());
    }

    public function actionPostUploadFile() {
//        var_dump(Yii::getAlias('@webroot'));
//        var_dump(Url::base(true));
//        die();
        if($_FILES['file'])
        {
            $avatar_name = $_FILES["file"]["name"];
            $avatar_tmp_name = $_FILES["file"]["tmp_name"];
            $error = $_FILES["file"]["error"];

            if($error > 0){
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }else
            {
                $random_name = rand(1000,1000000)."-".$avatar_name;
                $upload_name = Yii::getAlias('@backend').'/web/uploads/'.strtolower($random_name);
                $upload_name = preg_replace('/\s+/', '-', $upload_name);

                if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "File uploaded successfully",
                        "url" => Yii::getAlias('@web')."/".$upload_name
                    );
                }else
                {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }
            }
        }else{
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "No file was sent!"
            );
        }

        return $response;
    }

    public function actionGetUploadFile() {
        return [
            'message' => 'hello world 2222222222',
            'code' => 100,
        ];
    }
}