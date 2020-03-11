<?php

namespace api\modules\v1\models;

use \yii\db\ActiveRecord;
/**
 * CorrectAnswer Model
 *
 *
 */
class CorrectsAnswers extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'correct_answer';
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
            [['id', 'question_id', 'right_answer'], 'required']
        ];
    }

    public function getQuestion() {
        return $this->hasOne(Questions::className(),['id' => 'question_id']);
    }

}