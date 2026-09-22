<template>





  <uni-loading-element class="default __uni_loading_container__" ref="LoadingRef" style="display: flex;">
    <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" :style="loadingStyle"></view>
  </uni-loading-element>

</template>



<script setup lang="ts">



import { UniLoadingElement } from './element';



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
const loadingStyle = reactive({})



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

.__uni_loading_container__ {
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

}

.__uni-loading__ {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
  border-color: inherit;
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
