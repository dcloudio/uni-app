<?php
require_once 'Category.php';

class Image
{
    public $id = '';
    public $title = '';
    public $name = '';
    public $img_num = 0;
    public $img_src = '';

    const BASE_URL = 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/';

    public function __construct($category, $index, $type = 0)
    {
        if ($type) {
            $index = '0' . ($index > 5 ? $index - 5 : $index) . '-l';
        } else {
            $index = $index > 9 ? $index : '0' . $index;
        }

        $name = $category['id'] . $index;

        $this->id = $name;
        $this->name = $name;
        $this->title = $category['name'];
        $this->img_num = $category['num'];
        $this->img_src = self::BASE_URL . $name . '.jpg';
    }

    public static function getImageGroup($name)
    {
        $category = Category::getCategory(preg_replace('/\d+/', '', $name));
        $imageUrls = array();
        for ($i = 0; $i < $category['num']; $i++) {
            $flag = false;
            do {
                if (!$flag) {
                    $image = new Image($category, $i + 1, mt_rand(0, 1));
                    $flag = true;
                } else {
                    $image = new Image($category, $i + 1);
                }
            } while (in_array($image->img_src, $imageUrls));

            if ($name === $image->name) {
                continue;
            }

            $imageUrls[] = $image->img_src;
        }
        if (count($imageUrls) === 10) {
            array_pop($imageUrls);
        }
        return $imageUrls;
    }
}