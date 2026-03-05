<template>
  <view style="flex-direction: row;padding-top: var(--status-bar-height);box-sizing: content-box;align-items: center;position: relative;">
    <view style="height: 44px;align-items: center;justify-content: center;
    <!-- #ifdef WEB -->
    cursor: pointer
    <!-- #endif -->
    " class="uni-left-class-buildin" :class="leftClass">
			<!-- 旋转边框的view实现返回箭头。因需要扩大点击区域，外面多套了一层 -->
			<view v-if="!hideDefaultBack && slots['left']==null" style="width: 44px;height: 44px;justify-content: center;align-items: center;" @click="back">
				<view style="width: 12px;height: 12px;transform: rotate(45deg);
        border-left: 2px solid; border-bottom: 2px solid;" :style="{borderLeftColor:foreColor,borderBottomColor:foreColor}"></view>
			</view>
      <slot name="left" v-else></slot>
    </view>

    <view :style="{'position': 'absolute', 'height': '44px', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': isLeft ? 'flex-start' : 'center'}" class="uni-mid-class-buildin" :class="midClass" flatten>
      <text v-if="slots['mid']==null" :style="{ color: foreColor }" flatten> {{ title }} </text>
			<slot name="mid" v-else></slot>
    </view>
    <view style="position: absolute; height: 44px; flex-direction: row; align-items: center;right: 0;" class="uni-right-class-buildin" :class="rightClass" flatten>
      <slot name="right"></slot>
    </view>

  </view>
</template>

<script lang="uts" setup>
  defineOptions({
  	// inheritAttrs: false,
  	externalClasses: ['left-class','mid-class','right-class']
  })
  const props = defineProps({
    hideDefaultBack: { type: Boolean, default: false },
    title: { type: String, default: "" },
    // navigationBarTextStyle: { type: "#000000" | "#ffffff" | "#000" | "#fff" | "black" | "white" | "", default: "" },
    navigationBarTextStyle: { type: String, default: "" },
    leftClass: { type: String, default: "" },
    midClass: { type: String, default: "" },
    rightClass: { type: String, default: "" },
    isLeft: { type: Boolean, default: false },
    // stat: { type: Boolean, default: false }
  })
  const slots = useSlots();

// #ifndef MP
  const currentPage = getCurrentInstance()?.proxy?.$page
  const foreColor = computed((): string => {
    return (props.navigationBarTextStyle=="") ? currentPage?.getPageStyle()["navigationBarTextStyle"] as string : props.navigationBarTextStyle; //如果外部没有传入前景色，从pageStyle获取
  });
// #endif
// #ifdef MP
	const foreColor = computed((): string => {
    return props.navigationBarTextStyle; //小程序端无法获取pageStyle，需要显式传入前景色
  });
// #endif
  // let statusBarHeight = ref(0)
  onMounted(() => {
    // #ifdef MP-WEIXIN
    // TODO 部分小程序平台不支持getWindowInfo
    // statusBarHeight.value = uni.getWindowInfo().statusBarHeight
    // #endif

    /* if (props.stat && props.title != '') {
      uni.report({
        name: 'title',
        options: props.title
      })
    } */
  })

  const back = () => {
    uni.navigateBack({});
  }
</script>

<style>
	.uni-left-class-buildin {
    width: 44px;
		margin-left: 6px;
	}
  .uni-mid-class-buildin {
    justify-content: center;
		left: 52px; /* padding 6 + 44 = 52*/
    right: 52px;
  }
  .uni-right-class-buildin {
    width: 44px;
    margin-right: 6px;
  }

</style>
