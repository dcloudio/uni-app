<template>





  <uni-loading-element class="default __uni_loading_container__" ref="LoadingRef" style="display: flex;">
    <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" :style="loadingStyle"></view>
  </uni-loading-element>

</template>



<script setup lang="ts">



import { UniLoadingElement } from './element';

import { ref, reactive, computed } from 'vue'
import { useLoadingStyle } from './useLoadingStyle'


const props = withDefaults(defineProps<{
  /**
   * 是否暂停动画
   * @uniPlatform {
     "app": {
      "ios": {
         "unixVaporVer": "5.11"
       },
      "harmony": {
         "unixVaporVer": "5.0"
       }
     }
   }
 */
  paused?: boolean,
  /**
   * 是否加粗线条
   * @uniPlatform {
     "app": {
      "ios": {
         "unixVaporVer": "5.11"
       },
      "harmony": {
         "unixVaporVer": "5.0"
       }
     }
   }
 */
  bold ?: boolean,
	/**
	  * iOS是否采用系统雪花状样式
	  * @uniPlatform {
	    "app": {
	      "ios": {
	        "unixVaporVer": "5.11"
	      }
	    }
	  }
	*/
 iosSpinner ?: boolean
}>(), {
  paused: false,
  bold: false,
  iosSpinner: false
})

defineOptions({
  name: 'loading',
  styleIsolation: 'app-and-page',
  // @ts-ignore
  rootElement: {
    name: 'uni-loading-element',
    class: UniLoadingElement
  }
});

const LoadingRef = ref<HTMLElement | null>(null)
const loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props.bold)))





</script>
