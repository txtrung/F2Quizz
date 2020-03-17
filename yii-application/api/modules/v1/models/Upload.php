<?php

namespace api\modules\v1\models;
use yii\db\Expression;

use \yii\db\ActiveRecord;
/**
 * Answers Model
 *
 * @author
 */
class Upload extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'file_upload';
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
            [['id', 'name'], 'required']
        ];
    }
}