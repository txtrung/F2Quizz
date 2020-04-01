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
            'identityClass' => 'api\modules\models\Users',
            'enableAutoLogin' => false,
            'enableSession'=>false,
            //'identityCookie' => ['name' => '_identity-api', 'httpOnly' => true],
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
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/download-file',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'GET {id}/file' => 'download',
                        'GET random-reward' => 'random-reward',
                        'GET random-exchange' => 'random-exchange'
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/upload',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'GET upload-file' => 'get-upload-file',
                        'POST post-upload-file' => 'post-upload-file',
                    ],
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'v1/users',
                    'pluralize' => false,
                    'extraPatterns' => [
                        'GET test'=>'test',
                        'POST authenticate' => 'authenticate',
                        'POST register' => 'register',
                        'POST social-authenticate' => 'social-authenticate'
                    ],
                ]
            ],
        ],
        'request' => [
            'parsers' =>['application/json' => 'yii\web\JsonParser', ],
            'enableCookieValidation' => false,
            'enableCsrfValidation' => false,
        ]
    ],
    'params' => $params,
];