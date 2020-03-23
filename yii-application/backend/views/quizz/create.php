<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model backend\models\Quizz */

$this->title = Yii::t('app', 'Create Quizz');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Quizzs'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="quizz-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
