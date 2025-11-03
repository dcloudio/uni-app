<template>
  <view class="__uni-loading__ __loading-4-3__"></view>
</template>

<style>
.__uni-loading__ {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  transform: translateZ(0);
  /* 启用硬件加速 */
  image-rendering: -webkit-optimize-contrast;
  /* 提高图像对比度 */
  image-rendering: crisp-edges;
  /* 边缘清晰 */
  animation: k-loading-spin 1.333s infinite;
  animation-timing-function: linear;
}

/*.uni-loading_.loading-4-1 {
  border-left-color: #007AFF;
}

.uni-loading_.loading-4-2 {
  border-left-color: #007AFF;
  border-top-color: #007AFF;
}*/

.__loading-4-3__ {
  border-color: #000;
  border-right-color: transparent !important;
}

@keyframes k-loading-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
