<?php

namespace backend\models;

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
            [['path'], 'required']
        ];
    }
}