<template>
  <!-- #ifdef APP-ANDROID || APP-IOS || APP-HARMONY -->

  <!-- #ifdef VUE3-VAPOR -->
  <native-view class="default" @init="onviewinit"></native-view>
  <!-- #endif -->

  <!-- #ifndef VUE3-VAPOR -->
  <uni-loading-element class="default">
    <native-view class="defaultNativeView" @init="onviewinit"></native-view>
  </uni-loading-element>
  <!-- #endif -->

  <!-- #endif -->

  <!-- #ifdef WEB -->
  <view class="__uni_loading_container__" ref="LoadingRef" style="display: flex;">
    <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" style="box-sizing: border-box;" :style="{ width: loadingStyle.size, height: loadingStyle.size, borderWidth: loadingStyle.borderWidth }"></view>
  </view>
  <!-- #endif -->

  <!-- #ifdef MP -->
  <view class="__uni-loading__ __loading-4-3__" :class="{ '__uni-loading__paused': props.paused }" style="box-sizing: border-box;"></view>
  <!-- #endif -->
</template>

<script setup lang="uts">
// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
import { NativeLoading, UniLoadingElement } from "@/uni_modules/uni-loading";
// #endif
// #ifndef APP
import { UniLoadingElement } from './element';
// #endif

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
  bold ?: boolean,
	/**
	  * iOS是否采用系统雪花状样式
	  * @uniPlatform {
	    "app": {
	      "ios": {
	        "unixvVer": "5.0"
	      }
	    }
	  }
	*/
 iosSnow ?: boolean
}>(), {
  paused: false,
  bold: false,
  iosSnow: false
})

defineOptions({
  name: 'loading',
  // @ts-ignore
  rootElement: {
    name: 'uni-loading-element',
    class: UniLoadingElement
  }
});

// #ifdef WEB
import { ref, reactive, computed } from 'vue'
import { useLoadingStyle } from './useLoadingStyle'

const LoadingRef = ref<HTMLElement | null>(null)
const loadingStyle = reactive(useLoadingStyle(LoadingRef, computed(() => props.bold)))
// #endif
// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY

// iOS 的ios-snow 属性需要监听color
// #ifdef APP-IOS
const style = useComputedStyle({
  properties: [
    'color',
    'border-top-color',
    'border-left-color',
    'border-right-color',
    'border-bottom-color'
  ] as string[],
  filterProperties: true
} as UseComputedStyleOptions)
// #endif

// #ifndef APP-IOS
const style = useComputedStyle({
  properties: [
    'border-top-color',
    'border-left-color',
    'border-right-color',
    'border-bottom-color'
  ] as string[],
  filterProperties: true
} as UseComputedStyleOptions)
// #endif

// #ifdef VUE3-VAPOR
function rgba2argb(color: string | null): string | null {
  if (color !== null && color.startsWith('#') && color.length == 9) {
    // 将 #RRGGBBAA 转换为 #AARRGGBB
    const alpha = color.substring(7, 9)  // AA
    const rgb = color.substring(1, 7)    // RRGGBB
    return `#${alpha}${rgb}`
  }
  return color
}
// #endif

// border-color 会被解为四个方向的值，取 top 值（哪个方向都一样）vapor 模式下需要转换为 argb 格式
const borderColor = computed<string | null>(() => style.get('border-color')?.toString() ?? style.get('border-top-color')?.toString())
// ios 增加ios-snow = true, color 优先级 > border-color, 两个css style 均生效
const color = computed<string | null>(() => style.get('color')?.toString())
const timingFunction = computed<string | null>(() => style.get('animation-timing-function')?.toString())

type LoadingState = { nativeLoading : NativeLoading | null }
const loadingState = reactive<LoadingState>({
  nativeLoading: null
})

watchEffect(() => {
  let colorValue = borderColor.value
	// #ifdef APP-IOS
	if (color?.value != null && props.iosSnow == true) {
		colorValue = color.value
	}
	// #endif
	
  // #ifdef VUE3-VAPOR
  colorValue = rgba2argb(colorValue)
  // #endif
  const width = props.bold ? 'thick' : 'medium'
  loadingState.nativeLoading?.updateStyle(
    colorValue,
    width
  )
})


watchEffect(() => {
  const paused = props.paused
  loadingState.nativeLoading?.updatePaused(paused)
})

// #ifdef APP-IOS
watchEffect(() => {
  const iosSnow = props.iosSnow
  loadingState.nativeLoading?.updateIosSnow(iosSnow)
})
// #endif

//native-view初始化时触发此方法
const onviewinit = (e : UniNativeViewInitEvent) => {
  //获取UniNativeViewElement 传递给NativeButton对象
  loadingState.nativeLoading = new NativeLoading(e.detail.element);
}

onUnmounted(() => {
  loadingState.nativeLoading?.destroy()
})
// #endif
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
/* #ifdef WEB || MP*/
/* #ifdef WEB */
.__uni_loading_container__ {
  width: 16px;
  height: 16px;
  border-color: #000;
  animation-timing-function: linear;
  justify-content: center;
  align-items: center;
}
/* #endif */
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
  /* #ifdef MP */
  border-color: #000;
  /* #endif */
  /* #ifdef WEB */
  border-color: inherit;
  /* #endif */
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
/* #endif */
</style>
