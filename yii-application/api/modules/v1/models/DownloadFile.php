<?php

namespace api\modules\v1\models;
use yii\db\Expression;

use \yii\db\ActiveRecord;
/**
 * Answers Model
 *
 * @author
 */
class DownloadFile extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'download_file';
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

    public function getFile($id) {
        return DownloadFile::find()->where(['id' => $id])->asArray()->one();
    }

    public function getRandomReward() {
        return DownloadFile::find()->orderBy(new Expression('rand()'))->limit(1)->asArray()->all();
    }

    public function getRandomExchange() {
        return DownloadFile::find()->orderBy(new Expression('rand()'))->limit(2)->asArray()->all();
    }
}