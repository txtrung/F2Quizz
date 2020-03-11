<?php

namespace api\modules\v1\models;

use \yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;

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
            [['id', 'content', 'category_id'], 'required']
        ];
    }

    public function getQuizz()
    {
        return $this->hasOne(Quizzes::className(),['id' => 'category_id']);
    }

    public function getAnswers() {
        return $this->hasMany(Answers::className(),['question_id' => 'id']);
    }

    public function getCorrectsAnswers() {
        return $this->hasOne(CorrectsAnswers::className(),['question_id' => 'id']);
    }

    /**
     * @param $id
     */
    public function getQuestionByQuizzId($id) {

        $conbinedDatas = Quizzes::find()->with(['questions','answers','correctAnswer'])->where(['id' => $id])->all();

        $questions = $conbinedDatas[0]->questions;
        $questions = ArrayHelper::toArray($questions, [['id', 'content', 'category_id']]);
        foreach ($questions as $index => $question){
            $questions[$index]['answers'] = Answers::find()->select('id,content,tag')->where(['question_id' => $question['id']])->asArray()->all();
            $questions[$index]['correct_answer'] = CorrectsAnswers::find()->select('id,right_answer')->where(['question_id' => $question['id']])->asArray()->all();
        }

        return $questions;
    }

}