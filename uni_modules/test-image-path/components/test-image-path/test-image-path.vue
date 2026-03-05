<template>
  <view>
    <view>
      <text class="uni-subtitle-text">uni_modules的组件模板相对路径静态引入插件内static目录图片</text>
      <view class="uni-center" style="background:#FFFFFF;">
        <image class="image" mode="widthFix" src="../../static/test-image-path.png" />
      </view>
    </view>
    <view>
      <text class="uni-subtitle-text">uni_modules的组件模板绝对路径静态引入插件内static目录图片</text>
      <view class="uni-center" style="background:#FFFFFF;">
        <image class="image" mode="widthFix" src="/uni_modules/test-image-path/static/test-image-path.png" />
      </view>
    </view>
  </view>
</template>

<style>
  .image {
    margin: 20px auto;
    width: 100px;
  }
</style>
