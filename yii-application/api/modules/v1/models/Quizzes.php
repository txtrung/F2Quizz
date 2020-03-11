<?php

namespace api\modules\v1\models;

use \yii\db\ActiveRecord;
/**
 * Answers Model
 *
 * @author
 */
class Quizzes extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'quizz_category';
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
            [['id', 'title', 'description'], 'required']
        ];
    }

    public function getQuestions() {
        return $this->hasMany(Questions::className(), ['category_id' => 'id']);
    }

    public function getAnswers() {
        return $this->hasMany(Answers::className(), ['question_id' => 'id'])->via('questions');
    }

    public function getCorrectAnswer() {
        return $this->hasMany(CorrectsAnswers::className(), ['question_id' => 'id'])->via('questions');
    }
}
