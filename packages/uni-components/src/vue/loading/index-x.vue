<script setup lang="ts">
import { UniLoadingElement } from "./global";
import { ref, reactive, computed } from 'vue'
import { useLoadingStyle } from './useLoadingStyle'



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
  /**
   * 是否加粗线条
   * @uniPlatform {
     "app": {
       "harmony": {
         "unixvVer": "5.0"
       }
     }
   }
 */
  bold ?: boolean
}>(), {
  paused: false,
  bold: false
})

defineOptions({
  name: 'loading',
  // @ts-ignore
  rootElement: {
    name: 'uni-loading-element',
    class: UniLoadingElement
  },
  __reserved: true,
  compatConfig: {
    MODE: 3
  }
});


const LoadingRef = ref<HTMLElement | null>(null)
const loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props.bold)))

</script>

<template>


  <view class="__uni_loading_container__" ref="LoadingRef" style="display: flex;">
    <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" style="box-sizing: border-box;" :style="{ width: loadingStyle.size, height: loadingStyle.size, borderWidth: loadingStyle.borderWidth }"></view>
  </view>


</template>
