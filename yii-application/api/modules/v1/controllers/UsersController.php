<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\Quizzes;
use api\modules\v1\models\SignupForm;
use Yii;
use yii\rest\ActiveController;
use yii\helpers\ArrayHelper;
use yii\filters\Cors;
use api\modules\v1\models\LoginForm;

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

    public function actionTest()
    {
        return ['status'=>'success'];
    }

    public function actionAuthenticate() {
//        var_dump(json_decode(\Yii::$app->getRequest()->post()["authenticate"]));
//        var_dump(ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["authenticate"])));
//        die();
        if($_POST && count($_POST)) {
            $model = new LoginForm();
            if ($model->load(ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["authenticate"])), '') && $model->login()) {
                return [
                    'access_token' => $model->login(),
                ];
            } else {
                return $model->getFirstErrors();
            }
        }
        return ['status'=>'error'];
    }

    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionRegister() {
        if($_POST && count($_POST)) {
            $model = new SignupForm();
            if ($model->load(ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["register"])),'') && $model->signup()) {
                return ['status'=>'success'];
            } else {
                return $model->getFirstErrors();
            }
        }
        return ['status'=>'error'];
    }
}