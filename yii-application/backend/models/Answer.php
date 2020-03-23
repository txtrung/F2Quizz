<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "answers".
 *
 * @property int $id
 * @property string $content
 * @property int $question_id
 * @property int $tag
 *
 * @property Questions $question
 */
class Answer extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'answers';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['content', 'question_id', 'tag'], 'required'],
            [['content'], 'string'],
            [['question_id', 'tag'], 'integer'],
            [['question_id'], 'exist', 'skipOnError' => true, 'targetClass' => Question::className(), 'targetAttribute' => ['question_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'content' => Yii::t('app', 'Content'),
            'question_id' => Yii::t('app', 'Question ID'),
            'tag' => Yii::t('app', 'Tag'),
        ];
    }

    /**
     * Gets query for [[Question]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getQuestion()
    {
        return $this->hasOne(Question::className(), ['id' => 'question_id']);
    }
}
