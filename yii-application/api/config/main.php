<?php

$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php')
//    require(__DIR__ . '/params.php'),
//    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'modules' => [
        'v1' => [
            'basePath' => '@app/modules/v1',
            'class' => 'api\modules\v1\Module' // here is our v1 modules
        ]
    ],
    'components' => [
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/questions', // our correct answer api rule,
                    'extraPatterns' => [
                        'GET {id}' => 'get',
//                        'GET {id}/answer' => 'answer', // 'xxxxx' refers to 'actionXxxxx'
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/answers', // our answer api rule,
                    'extraPatterns' => [
                        'GET {id}/question' => 'question', // 'xxxxx' refers to 'actionXxxxx'
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/corrects-answers', // our question api rule,
                    'tokens' => [
                        '{id}' => '<id:\\w+>'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/quizzes',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'GET {id}/question' => 'question',
                    ],
                ],
            ],
        ],
        'request' => [
            'parsers' =>['application/json' => 'yii\web\JsonParser', ],
        ]
    ],
    'params' => $params,
];