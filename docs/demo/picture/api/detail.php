<?php
require_once 'Image.php';

header("Content-type:text/json");

$id = isset($_GET['id']) ? $_GET['id'] : '';
if ($id) {
    $images = Image::getImageGroup($id);

    if (empty($images)) {
        echo json_encode([
            'code' => 1002,
            'msg' => '没有相关数据'
        ]);
    } else {
        $result = [
            'code' => 0,
            'msg' => 'success',
            'data' => $images
        ];

        echo json_encode($result);
    }
} else {
    echo json_encode([
        'code' => 1001,
        'msg' => '参数信息错误'
    ]);
}

