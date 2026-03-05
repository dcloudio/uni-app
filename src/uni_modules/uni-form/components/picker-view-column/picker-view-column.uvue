<template>
  <view class="picker-view-column" ref="rootRef" @click="handleClick">
    <scroll-view ref="scrollViewRef" class="picker-view-scroll" direction="vertical" :show-scrollbar="false" :scroll-with-animation="scrollWithAnimation" @scrollend="onScrollEnd" @scroll="onScroll">
      <view ref="contentRef" :style="{ 'padding-top': containerPaddingPx, 'padding-bottom': containerPaddingPx }">
        <slot></slot>
      </view>
    </scroll-view>
    <view class="uni-picker-view-mask uni-picker-view-mask-top" :class="maskClass" :style="maskTopInlineStyle"></view>
    <view class="uni-picker-view-indicator" :style="indicatorInlineStyle"></view>
    <view class="uni-picker-view-mask uni-picker-view-mask-bottom" :class="maskClass" :style="maskBottomInlineStyle"></view>
  </view>
</template>

<script lang="uts" setup>
  import { PICKER_VIEW_KEY } from '../common.uts'
  import { UniPickerViewColumnElement } from './global.uts'
  import { PickerViewContext, PickerViewColumnApi } from '../types.uts'

  defineOptions({
    name: 'picker-view-column',
    // @ts-ignore
    rootElement: {
      class: UniPickerViewColumnElement
    }
  })

  const ctx = inject<PickerViewContext>(PICKER_VIEW_KEY)
  const itemHeight = computed<number>(() => ctx ? ctx.itemHeight() : 50)
  const containerPaddingPx = computed<string>(() => ctx ? ctx.containerPaddingPx() : '50%')
  const maskClass = computed<string>(() => ctx ? ctx.maskClass() : '')
  const maskTopInlineStyle = computed<any>(() => ctx ? ctx.maskTopStyle() : {})
  const maskBottomInlineStyle = computed<any>(() => ctx ? ctx.maskBottomStyle() : {})
  const indicatorInlineStyle = computed<any>(() => ctx ? ctx.indicatorStyle() : {})

  // selected index for this column, and scrollTop mapping
  const selectedIndex = ref<number>(0)
  const isScrolling = ref(false)
  const scrollViewRef = ref<UniScrollViewElement | null>(null)
  const rootRef = ref<UniElement | null>(null)
  const contentRef = ref<UniElement | null>(null)
  const scrollWithAnimation = ref(false)

  const EPSILON = 1

  let isAdjusting = false
  let columnIndex = -1

  function setScrollTop(idx : number) {
    if (idx < 0) {
      idx = 0
    }
    selectedIndex.value = idx
    const scrollTop = Math.max(0, idx * itemHeight.value)
    scrollViewRef.value?.scrollTo(0, scrollTop)
  }

  function getIndex() : number { return selectedIndex.value }

  const api : PickerViewColumnApi = { setScrollTop, getIndex }

  onMounted(() => {
    if (ctx) {
      columnIndex = ctx.registerColumn(api)
    }
    setTimeout(() => {
      // 首次加载，不开启滚动动画
      scrollWithAnimation.value = true
    }, 100)
  })

  onUnmounted(() => {
    if (ctx) {
      ctx.unregisterColumn(api)
    }
  })

  function onScroll() {
    if (!isScrolling.value) {
      isScrolling.value = true
    }
  }

  function onScrollEnd(e : UniScrollEvent) {
    isScrolling.value = false

    if(isAdjusting) {
      return
    }

    // top may be negative, so we need to clamp it to 0
    const top = Math.max(e.detail.scrollTop, 0)
    // compute nearest index
    const idx = Math.round(top / itemHeight.value)
    const valueChanged = selectedIndex.value !== idx

    // avoid trigger scrollTo frequently
    if (Math.abs(top - idx * itemHeight.value) > EPSILON) {
      isAdjusting = true;
      setScrollTop(idx);
      setTimeout(() => {
        isAdjusting = false;
      }, 0)
    }

    if (valueChanged) {
      ctx?.onColumnIndexChange(columnIndex, idx)
    }
  }

  function handleClick(e : UniPointerEvent) {
    if (!rootRef.value || !scrollViewRef.value || isScrolling.value) {
      return
    }

    const { top, height } = rootRef.value.getBoundingClientRect()
    // calculate click position relative to container top
    const y = e.clientY - top

    let containerPadding = 0
    const paddingStr = containerPaddingPx.value
    if (paddingStr.includes('%')) {
      containerPadding = (parseFloat(paddingStr) / 100) * height
    } else {
      containerPadding = parseFloat(paddingStr)
    }

    const currentScrollTop = scrollViewRef.value.scrollTop
    // calculate actual position in the content list
    const actualY = y + currentScrollTop - containerPadding
    // calculate target index
    const targetIndex = Math.floor(actualY / itemHeight.value)

    const itemCount = contentRef.value?.children?.length
    // if no any children, skip validation, otherwise validate the index
    const isIndexValid = targetIndex >= 0 && (itemCount ? targetIndex < itemCount : true)

    if (isIndexValid && targetIndex !== selectedIndex.value) {
      setScrollTop(targetIndex)
      ctx?.onColumnIndexChange(columnIndex, targetIndex)
    }
  }
</script>

<style>
  .picker-view-column {
    flex: 1;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .picker-view-scroll {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 2;
  }

  .uni-picker-view-mask {
    flex: 1;
    z-index: 3;
    pointer-events: none;
  }

  .uni-picker-view-mask-bottom {
    bottom: 0;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  }

  .uni-picker-view-mask-top {
    top: 0;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
  }

  .uni-picker-view-indicator {
    height: 50px;
    border-top-width: 0.5px;
    border-bottom-width: 0.5px;
    border-style: solid;
    border-color: #ddd;
    background-color: #efeff480;
    z-index: 1;
  }
</style>