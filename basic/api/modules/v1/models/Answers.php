<?php

namespace api\modules\v1\models;

use \yii\db\ActiveRecord;
/**
 * Answers Model
 *
 * @author
 */
class Answers extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'answers';
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
            [['id', 'content', 'question_id', 'tag'], 'required']
        ];
    }

}