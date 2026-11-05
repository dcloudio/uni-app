<template>
  <view class="uni-theme-root">
    <view>
      <text class="color-888 fs-12 fw-bold u-mt-5">uni_modules的组件模板相对路径静态引入插件内static目录图片</text>
      <view class="uni-center flex-dir-row justify-center image-bg">
        <image class="image" mode="widthFix" src="../../static/test-image-path.png" />
      </view>
    </view>
    <view>
      <text class="color-888 fs-12 fw-bold u-mt-5">uni_modules的组件模板绝对路径静态引入插件内static目录图片</text>
      <view class="uni-center flex-dir-row justify-center image-bg">
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

  .image-bg {
    background-color: var(--list-background-color, #ffffff);
  }
</style>
