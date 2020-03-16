<?php

namespace backend\models;

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
            [['path'], 'required']
        ];
    }
}