<?php
use yii\bootstrap\Nav;

?>
<aside class="main-sidebar">

    <section class="sidebar">

        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="<?= $directoryAsset ?>/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
            </div>
            <div class="pull-left info">
                <p>
                    <?= Yii::$app->user->identity->username ?>
                </p>

                <a href="#"><i class="fa fa-circle text-success"></i>
                    <?= Yii::$app->user->identity->getId() ? 'online' : 'offline'?>
                </a>
            </div>
        </div>

        <ul class="sidebar-menu tree" data-widget="tree">
            <li><a href="<?= \yii\helpers\Url::to(['/gii']) ?>"><span class="fa fa-file-code-o"></span> Gii</a>
            </li>
            <li class="treeview active">
                <a href="#">
                    <i class="fa fa-ambulance"></i> <span>F2Quizz</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="<?= \yii\helpers\Url::to(['/upload']) ?>"><span class="fa fa-file-code-o"></span> Upload video</a>
                    </li>
                    <li><a href="<?= \yii\helpers\Url::to(['/quizz']) ?>"><span class="fa fa-address-book"></span> Quản lý bộ câu hỏi</a>
                    </li>
                    <li><a href="<?= \yii\helpers\Url::to(['/question']) ?>"><span class="fa fa-address-book"></span> Quản lý câu hỏi</a>
                    </li>
                    <li><a href="<?= \yii\helpers\Url::to(['/policy']) ?>"><span class="fa fa-info"></span> Chính sách</a>
                    </li>
                    <li><a href="<?= \yii\helpers\Url::to(['/week']) ?>"><span class="fa fa-bar-chart"></span> Bảng xếp hạng tuần</a>
                    </li>
                    <li><a href="<?= \yii\helpers\Url::to(['/month']) ?>"><span class="fa fa-bar-chart"></span> Bảng xếp hạng tháng</a>
                    </li>
                </ul>
            </li>
        </ul>

    </section>

</aside>
