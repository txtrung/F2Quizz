<?php

namespace api\modules\v1\controllers;

use api\modules\v1\models\Questions;
use api\modules\v1\models\Quizzes;
use api\modules\v1\models\SignupForm;
use api\modules\v1\models\SocialUsers;
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
                    'Origin' => \Yii::$app->params['clientDomain'],
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
        if($_POST && count($_POST)) {
            $model = new LoginForm();
            if ($model->load(ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["authenticate"])), '') && $model->login()) {
                return [
                    'status'=>'success',
                    'access_token' => $model->login(),
                ];
            }
//            else {
//                return $model->getFirstErrors();
//            }
        }
        return [
            'status'=>'error',
            'message'=>'Incorrect username or password.'
        ];
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
            }
//            else {
//                return $model->getFirstErrors();
//            }
        }
        return [
            'status'=>'error',
            'message'=>'Can\'t create account.'
        ];
    }

    /**
     * Signs user up.
     *
     * @return mixed
     */
    public function actionSocialAuthenticate() {
//        var_dump(ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["social-authenticate"])));
        if($_POST && count($_POST)) {
            $userData = ArrayHelper::toArray(json_decode(\Yii::$app->getRequest()->post()["social-authenticate"]));
            $user = SocialUsers::findByEmail($userData["email"]);
            if ($user) {
                $access_token = $user->generateAccessToken();
                $user->expire_at = time() + SocialUsers::EXPIRE_TIME;
                if ($user->save()) {
                    return [
                        'status'=>'success',
                        'access_token'=>$access_token
                    ];
                }
            } else {
                $model = new SocialUsers();
                $model->id = $userData['id'];
                $model->name = $userData['name'];
                $model->email = $userData['email'];
                $model->auth_token = $userData['authToken'];
                $model->provider = $userData['provider'];
                $model->status = SocialUsers::STATUS_ACTIVE;
                $model->access_token = Yii::$app->security->generateRandomString();
                $model->expire_at = time() + SocialUsers::EXPIRE_TIME;
                if ($model->save()) {
                    return [
                        'status'=>'success',
                        'access_token'=>$model->access_token
                    ];
                }
            }
        }
        return [
            'status'=>'error',
            'message'=>'Can\'t login.'
        ];
    }
}