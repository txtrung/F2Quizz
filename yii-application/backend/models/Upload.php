<?php
namespace backend\models;

use Yii;
use yii\base\Model;
use yii\web\UploadedFile;
use yii\base\ErrorException;

class Upload extends Model
{
    /**
     * @var UploadedFile[]
     */
    public $files;

    public function rules()
    {
        return [
            [['files'], 'file', 'skipOnEmpty' => false, 'extensions' => ' webm', 'maxFiles' => 4]
        ];
    }

    public function upload()
    {
        try {
//        if ($this->validate()) {
            foreach ($this->files as $file) {
                $videoUrl = new VideoUrl();
                $videoUrl->path = Yii::getAlias('@web/uploads') . '/'. $file->baseName . '.' . $file->extension;
                $videoUrl->save();
                $file->saveAs('uploads/' . $file->baseName . '.' . $file->extension);
            }
            return true;
//        } else {
//            return false;
//        }
        } catch (ErrorException $e) {
            Yii::warning($e->getMessage());
        }

    }
}