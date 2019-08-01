<?php
require_once 'Image.php';

class Category
{
    const CATEGORY_LIST = array(
        [
            'id' => 'dongwu',
            'name' => '动物',
            'num' => 10
        ],
        [
            'id' => 'fengjing',
            'name' => '风景',
            'num' => 10
        ],
        [
            'id' => 'jianzhu',
            'name' => '建筑',
            'num' => 10
        ],
        [
            'id' => 'meinv',
            'name' => '美女',
            'num' => 10
        ],
        [
            'id' => 'qiche',
            'name' => '汽车',
            'num' => 10
        ],
        [
            'id' => 'yundong',
            'name' => '运动',
            'num' => 10
        ]
    );

    public static function getCategory($id)
    {
        if (is_numeric($id)) {
            return self::CATEGORY_LIST[(int)$id];
        } else {
            $ret = null;
            foreach (self::CATEGORY_LIST as $item) {
                if ($item['id'] === $id) {
                    $ret = $item;
                    break;
                }
            }
            return $ret;
        }
    }

    public static function getImageList($category)
    {
        $imageList = array();
        for ($i = 0; $i < $category['num']; $i++) {
            $imageList[] = new Image($category, $i + 1);
        }
        return $imageList;
    }
}