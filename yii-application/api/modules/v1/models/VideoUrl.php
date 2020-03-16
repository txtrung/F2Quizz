<?php

namespace api\modules\v1\models;
use yii\db\Expression;

use \yii\db\ActiveRecord;
/**
 * Answers Model
 *
 * @author
 */
class VideoUrl extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'video_url';
    }

    /**
     * @inheritdoc
     */
    public static function primaryKey()
    {
        return ['id'];
    }

    /**
     * Define rules for validation
     */
    public function rules()
    {
        return [
            [['id', 'path'], 'required']
        ];
    }

    public function getRandomReward() {
        return VideoUrl::find()->orderBy(new Expression('rand()'))->limit(1)->all();
    }

    public function getRandomExchange() {
        return VideoUrl::find()->orderBy(new Expression('rand()'))->limit(2)->all();
    }
}