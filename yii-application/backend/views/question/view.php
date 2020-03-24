<?php

use wbraganca\dynamicform\DynamicFormWidget;
use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model backend\models\Question */
/* @var $modelsAnswers backend\models\Answer */
/* @var $modelsCorrectAnswer [] */

//var_dump($model->category->title);
//die();

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Questions'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="question-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a(Yii::t('app', 'Update'), ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a(Yii::t('app', 'Delete'), ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => Yii::t('app', 'Are you sure you want to delete this item?'),
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
//        'modelsAnswers' => $modelsAnswers,
        'attributes' => [
            'id',
            'content:ntext',
            [
                'label'=>$model->attributeLabels()['category_id'],
                'value'=>$model->category->title
            ],
        ],
    ]) ?>

    <div class="panel panel-default">
        <div class="panel-heading"><h4><i class="glyphicon glyphicon-envelope"></i> Answers</h4></div>
        <div class="panel-body">
            <div class="container-items"><!-- widgetContainer -->
                <div class="item panel panel-default"><!-- widgetBody -->
                    <div class="panel-heading">
                        <h3 class="panel-title col-sm-4">Answers</h3>
                        <h3 class="panel-title col-sm-4">Tag</h3>
                        <h3 class="panel-title col-sm-4">Right answer</h3>
                        <div class="clearfix"></div>
                    </div>
                    <?php foreach ($modelsAnswers as $i => $modelAnswers): ?>
                        <div class="clearfix"></div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <?= $modelAnswers->content ?>
                                </div>
                                <div class="col-sm-4">
                                    <?php if ($modelsCorrectAnswer['right_answer'] == $modelAnswers->tag): ?>
                                        <input type="radio" name="right_answer" checked disabled/>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>

</div>
