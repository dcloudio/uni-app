# uni-refresh-box

自定义下拉刷新组件。

本组件封装了 scroll-view/list-view等滚动容器的下拉刷新功能，使用者只需在滚动容器中加入本组件，设置组件的属性和样式，即可实现自定义下拉刷新功能。

本组件自带一个全平台通用的下拉刷新样式，即左边一个 loading 圈，右边为下拉刷新相关的文字。也提供了各种自定义方法，包括文字、样式，甚至通过插槽传入完全不同的自定义下拉效果。

## 基本用法

```vue
<template>
  <scroll-view
  style="flex: 1;"
  :refresher-enabled="true"
  :refresher-triggered="refreshing1"
  refresher-default-style="none"
  :refresher-threshold="45"
  refresher-max-drag-distance="200px"
  @refresherpulling="onRefresherpulling1"
  @refresherrefresh="onRefresherrefresh1"
  @refresherrestore="onRefresherrestore1"
  @refresherabort="onRefresherabort1"
> 
  <!-- 列表内容 -->
  <view v-for="i in listCount1" :key="i" class="content-item">
    <text class="text">item-{{ i }}</text>
  </view>

  <!-- refresher 插槽使用 uni-refresh-box 组件 -->
  <uni-refresh-box
    slot="refresher"
    :pulling-distance="pullingDistance1"
    :refreshing="refreshing1"
  ></uni-refresh-box>
</scroll-view>
</template>

<script setup lang="uts">
const listCount1 = ref(3)
const refreshing1 = ref(false)
const pullingDistance1 = ref(0)

function onRefresherpulling1(e: RefresherEvent) {
  pullingDistance1.value = e.detail.dy
}

function onRefresherrefresh1() {
  refreshing1.value = true
  console.log('列表1 触发刷新')
  setTimeout(() => {
    listCount1.value += 5
    refreshing1.value = false
    console.log('列表1 刷新完成')
  }, 1500)
}

function onRefresherrestore1() {
  pullingDistance1.value = 0
}

function onRefresherabort1() {
  pullingDistance1.value = 0
}
</script>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| refreshing | Boolean | false | 是否正在刷新 |
| threshold | Number | 45 | 触发刷新的下拉阈值(px) |
| pullingText | String | '下拉刷新' | 下拉过程中的提示文字 |
| loosingText | String | '松手刷新' | 下拉超过阈值的提示文字 |
| loadingText | String | '正在刷新' | 刷新中的提示文字 |
| completeText | String | '' | 刷新完成的提示文字 |
| textClass | String | '' | 文字样式类名 |
| loadingClass | String | '' | loading 样式类名 |

### state 状态说明

| 值 | 说明 |
| :-- | :-- |
| 0 | 下拉中（未达到阈值） |
| 1 | 松手可刷新（已达到阈值） |
| 2 | 刷新中 |
| 3 | 刷新完成 |
| 4 | 归位中（不显示文字） |

## Slots

| 名称 | 说明 | 插槽参数 |
| :-- | :-- | :-- |
| loading | 自定义图标 | - |