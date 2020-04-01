<?php

use yii\db\Migration;

/**
 * Class m200327_095659_m200327_insertAdmin
 */
class m200327_095659_m200327_insertAdmin extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->insert('admin', [
            'username' => 'admin',
            'auth_key' => Yii::$app->security->generateRandomString(),
            'password_hash' => Yii::$app->security->generatePasswordHash('admin123'),
            'email' => 'backendadmin@gmail.com',
            'status' => 10,
            'created_at' => 1584344372,
            'updated_at' => 1584344372,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->delete('admin', ['id' => 1]);
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200327_095659_m200327_insertAdmin cannot be reverted.\n";

        return false;
    }
    */
}
