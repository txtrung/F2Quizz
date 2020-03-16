<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use backend\models\Upload;
use yii\web\UploadedFile;

class UploadController extends Controller
{
    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        $model = new Upload();

        if (Yii::$app->request->isPost) {
            $model->files = UploadedFile::getInstances($model, 'files');
            if ($model->upload()) {
                // file is uploaded successfully
                return;
            }
        }

        return $this->render('upload', ['model' => $model]);
    }

//    public function actionUpload()
//    {
//        $model = new Upload();
//
//        if (Yii::$app->request->isPost) {
//            $model->imageFiles = UploadedFile::getInstances($model, 'imageFiles');
//            if ($model->upload()) {
//                // file is uploaded successfully
//                return;
//            }
//        }
//
//        return $this->render('upload', ['model' => $model]);
//    }
}