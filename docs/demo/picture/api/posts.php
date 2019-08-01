<?php
require_once 'Category.php';
require_once 'Image.php';

header("Content-type:text/json");

$page = isset($_GET['page']) ? $_GET['page'] : 1;
$prePage = isset($_GET['per_page']) ? $_GET['per_page'] : 5;

$results = array();
for ($i = 0; $i < $prePage; $i++) {
    $category = Category::getCategory(mt_rand(0, 5));
    $imageIndex = mt_rand(1, $category['num']);

    $results[] = new Image($category, $imageIndex);
}

echo json_encode($results);
