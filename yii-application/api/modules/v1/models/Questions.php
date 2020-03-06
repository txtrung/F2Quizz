<?php

namespace api\modules\v1\models;

use \yii\db\ActiveRecord;
/**
 * Questions Model
 *
 * @author
 */
class Questions extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'questions';
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
            [['id', 'content'], 'required']
        ];
    }

}