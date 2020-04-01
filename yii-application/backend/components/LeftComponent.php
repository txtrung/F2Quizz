<?php
namespace backend\components;

use yii\base\Widget;
use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;

class LeftComponent extends Component {

    private $widget;

    public function __construct(Widget $widget)
    {
        $this->widget = $widget;
    }

    public function generateTree() {
        $dataTree=array(
            array(
                'text'=>'Grampa', //must using 'text' key to show the text
                'children'=>array(//using 'children' key to indicate there are children
                    array(
                        'text'=>'Father',
                        'children'=>array(
                            array('text'=>'me'),
                            array('text'=>'big sis'),
                            array('text'=>'little brother'),
                        )
                    ),
                    array(
                        'text'=>'Uncle',
                        'children'=>array(
                            array('text'=>'Ben'),
                            array('text'=>'Sally'),
                        )
                    ),
                    array(
                        'text'=>'Aunt',
                    )
                )
            )
        );

        return $dataTree;
    }
}