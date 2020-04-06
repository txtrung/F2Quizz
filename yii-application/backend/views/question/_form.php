<?php

use backend\models\CorrectAnswer;
use wbraganca\dynamicform\DynamicFormWidget;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\Question */
/* @var $form yii\widgets\ActiveForm */
/* @var $modelsAnswers backend\models\Answer */
/* @var $modelsCorrectAnswer backend\models\CorrectAnswer */

$tmpCorrectAnswerModel = count(ArrayHelper::toArray($model)) <= 0 ? new CorrectAnswer : ($model->correctAnswers ? $model->correctAnswers[0] : new CorrectAnswer);
$modelsCorrectAnswerString =json_encode(ArrayHelper::toArray($tmpCorrectAnswerModel));

?>

<div class="question-form">

    <?php $form = ActiveForm::begin(['id' => 'dynamic-form']); ?>

    <?= $form->field($model, 'content')->textarea(['rows' => 6]) ?>

    <?= $form->field($model, 'category_id')->dropDownList(
        ArrayHelper::map(\backend\models\Quizz::find()->all(),'id','title')
    ) ?>


    <div class="panel panel-default">
        <div class="panel-heading"><h4><i class="glyphicon glyphicon-envelope"></i> Answers</h4></div>
        <div class="panel-body">
            <?php DynamicFormWidget::begin([
                'widgetContainer' => 'dynamicform_wrapper', // required: only alphanumeric characters plus "_" [A-Za-z0-9_]
                'widgetBody' => '.container-items', // required: css class selector
                'widgetItem' => '.item', // required: css class
                'limit' => 4, // the maximum times, an element can be cloned (default 999)
                'min' => 1, // 0 or 1 (default 1)
                'insertButton' => '.add-item', // css class
                'deleteButton' => '.remove-item', // css class
                'model' => $modelsAnswers[0],
                'formId' => 'dynamic-form',
                'formFields' => [
                    'content',
                    'tag',
                    'right_answer'
                ],
            ]); ?>

            <div class="container-items"><!-- widgetContainer -->
                <?php
//                    $tmpCorrectAnswerModel = count(ArrayHelper::toArray($model)) <= 0 ? new CorrectAnswer : ($model->correctAnswers ? $model->correctAnswers[0] : new CorrectAnswer);
                    foreach ($modelsAnswers as $i => $modelAnswers):
                ?>
                    <div class="item panel panel-default"><!-- widgetBody -->
                        <div class="panel-heading">
                            <h3 class="panel-title pull-left">Answers</h3>
                            <div class="pull-right">
                                <button type="button" class="add-item btn btn-success btn-xs"><i class="glyphicon glyphicon-plus"></i></button>
                                <button type="button" class="remove-item btn btn-danger btn-xs"><i class="glyphicon glyphicon-minus"></i></button>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <?= $form->field($modelAnswers, "[{$i}]content")->textInput(['maxlength' => true]) ?>
                                </div>
                                <div class="col-sm-4">
                                    <?= $form->field($tmpCorrectAnswerModel, "right_answer", [
                                            'options' => [
                                                'onchange' => "addChecked(event)"
                                            ]
                                    ])->radio(
                                            array(
                                                    'checked'=> $modelAnswers->isNewRecord ? false : intval($tmpCorrectAnswerModel->right_answer) === $modelAnswers->tag,
                                                    'class' => 'right_answer_checkbox',
                                                    'value' => $modelAnswers->isNewRecord ? 0 : $modelAnswers->tag
                                            )
                                    ) ?>
                                </div>
                                <?php
                                    // necessary for update action.
//                                    if (! $modelAnswers->isNewRecord) {
//                                        echo Html::activeHiddenInput($modelAnswers, "[{$i}]id", ['class' => 'hidden_right_answer_checkbox']
//                                        );
//                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <?php DynamicFormWidget::end(); ?>
        </div>
    </div>
<script>
    var correctAnswer = <?php echo $modelsCorrectAnswerString; ?>;
    function addChecked(event) {
        let value = event.target.value;
        correctAnswer.correctAnswer = value;
        $('input[type=hidden][name="CorrectAnswer[right_answer]"]').each(function() {
            $(this).val(value);
        });
    };
    window.onload = function() {
        function setHiddenInputValue() {
            let allHiden = $('input[type=hidden][name="CorrectAnswer[right_answer]"]');
            allHiden.each(function() {
                $(this).val(correctAnswer.right_answer);
            });
        };
        $(document).ready(function () {
            let all = $(".dynamicform_wrapper").find(".right_answer_checkbox");
            all.each(function () {
                let index = all.index(this);
                all.eq(index).val(index + 1);
            });
            setHiddenInputValue();
        });
        $(".dynamicform_wrapper").on("afterInsert", function (e, item) {
            let preAll = $(item).prevAll();
            $(item).find(".right_answer_checkbox").val(preAll.length + 1);
            setHiddenInputValue();
        });
        $(".dynamicform_wrapper").on("afterDelete", function (e, item) {
            let preAll = $(item).nextAll();
            preAll.each(function () {
                let index = all.index(this);
                all.eq(index).val(index - 1);
            });
        });
    };
</script>

    <div class="form-group">
        <?= Html::submitButton($modelAnswers->isNewRecord ? Yii::t('app', 'Save') : Yii::t('app', 'Update'), ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
