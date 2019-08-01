<?php
require_once 'Category.php';

header("Content-type:text/json");

$type = isset($_GET['type']) ? $_GET['type'] : 1;

if (!is_numeric($type)) {
    echo json_encode([
        'ret' => 1000,
        'msg' => '参数错误'
    ]);
} else {
    $type = (int)$type - 1;

    $category = isset(Category::CATEGORY_LIST[$type]) ? Category::CATEGORY_LIST[$type] : null;

    if (empty($category)) {
        echo json_encode([
            'ret' => 1001,
            'msg' => '无此分类'
        ]);
    } else {
        $list = Category::getImageList($category);

        echo json_encode([
            'ret' => 0,
            'msg' => 'success',
            'data' => $list
        ]);
    }
}


