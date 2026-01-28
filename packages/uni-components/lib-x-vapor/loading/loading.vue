<template>


  <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" style="box-sizing: border-box;"></view>
</template>
<script setup lang="uts">
const props = withDefaults(defineProps<{
  /**
   * 是否暂停动画
   * @uniPlatform {
     "app": {
       "harmony": {
         "unixvVer": "5.0"
       }
     }
   }
 */
  paused?: boolean,
  bold ?: boolean
}>(), {
  paused: false,
  bold: false
})
</script>
<style>
.default {
  width: 16px;
  height: 16px;
}
.defaultNativeView {
  width: 100%;
  height: 100%;
}
.__uni-loading__ {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  transform: translateZ(0);
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  animation: k-loading-spin 1.333s infinite;
  animation-timing-function: linear;
}

.__uni-loading__paused {
  animation-play-state: paused;
}

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
