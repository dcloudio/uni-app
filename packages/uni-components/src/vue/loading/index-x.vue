<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useLoadingStyle } from './useLoadingStyle'

defineOptions({
  name: "Loading",
  __reserved: true,
  compatConfig: {
    MODE: 3
  }
})



const LoadingRef = ref<HTMLElement | null>(null)
const loadingStyle = reactive(useLoadingStyle(LoadingRef))

</script>

<template>

  <view class="__uni_loading_container__" ref="LoadingRef" style="display: flex;">
    <view class="__uni-loading__ __loading-4-3__" style="box-sizing: border-box;" :style="{ width: loadingStyle.size, height: loadingStyle.size, borderWidth: loadingStyle.borderWidth }"></view>
  </view>

</template>
