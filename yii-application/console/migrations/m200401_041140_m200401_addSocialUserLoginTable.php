<?php

use yii\db\Migration;

/**
 * Class m200401_041140_m200401_addSocialUserLoginTable
 */
class m200401_041140_m200401_addSocialUserLoginTable extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%social_login_user}}', [
            'id' => $this->string()->notNull(),
            'name' => $this->string()->notNull(),
            'email' => $this->string()->notNull()->unique(),
            'auth_token' => $this->string()->notNull(),
            'access_token' => $this->string(255)->defaultValue(NULL)->comment('token'),
            'expire_at' => $this->integer(11)->defaultValue (NULL)->comment('token expiration time'),
            'provider' => $this->string(32)->notNull(),
            'status' => $this->smallInteger()->notNull()->defaultValue(10),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ], $tableOptions);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%social_login_user}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200401_041140_m200401_addSocialUserLoginTable cannot be reverted.\n";

        return false;
    }
    */
}
