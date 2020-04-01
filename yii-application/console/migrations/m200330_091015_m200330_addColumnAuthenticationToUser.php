<?php

use yii\db\Migration;

/**
 * Class m200330_091015_m200330_addColumnAuthenticationToUser
 */
class m200330_091015_m200330_addColumnAuthenticationToUser extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $ret = $this->db->createCommand("SELECT * FROM information_schema. columns WHERE table_schema = DATABASE () and table_name ='user'and column_name ='access_token'")->queryOne(); //Determine whether the user table has the field'access_token'.
        if (empty($ret)) {
            $this->addColumn('user','access_token', $this->string(255)->defaultValue(NULL)->comment('token'));
        }

        $ret = $this->db->createCommand("SELECT * FROM information_schema.columns WHERE table_schema = DATABASE()  AND table_name = 'user' AND column_name = 'expire_at'")->queryOne();
        if (empty($ret)) {
            $this->addColumn('user','expire_at', $this->integer(11)->defaultValue (NULL)->comment('token expiration time'));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('user', 'access_token');
        $this->dropColumn('user', 'expire_at');
        return true;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m200330_091015_m200330_addColumnAuthenticationToUser cannot be reverted.\n";

        return false;
    }
    */
}
