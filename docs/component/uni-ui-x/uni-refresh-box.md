---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-refresh-box
---

::: sourceCode
## uni-refresh-box
:::

自定义下拉刷新组件

> 本 Component 是 uni ext component，需下载插件：[uni-refresh-box](https://ext.dcloud.net.cn/plugin?id=27848)


自定义下拉刷新组件。

本组件封装了 scroll-view/list-view等滚动容器的下拉刷新功能，使用者只需在滚动容器中加入本组件，设置组件的属性和样式，即可实现自定义下拉刷新功能。

本组件自带一个全平台通用的下拉刷新样式，即左边一个 loading 圈，右边为下拉刷新相关的文字。也提供了各种自定义方法，包括文字、样式，甚至通过插槽传入完全不同的自定义下拉效果。

### 基本用法

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

#### state 状态说明

| 值 | 说明 |
| :-- | :-- |
| 0 | 下拉中（未达到阈值） |
| 1 | 松手可刷新（已达到阈值） |
| 2 | 刷新中 |
| 3 | 刷新完成 |
| 4 | 归位中（不显示文字） |

### Slots

| 名称 | 说明 | 插槽参数 |
| :-- | :-- | :-- |
| loading | 自定义图标 | - |



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| pullingDistance | number | 0 | 当前下拉距离（px），通常由外部 scroll-view 的 refresher 状态传入 |
| refreshing | boolean | false | 是否正在刷新中，外部控制；为 true 时显示 loading 动画 |
| threshold | number | 45 | 触发刷新的下拉阈值（px），下拉距离超过该值时进入“松手刷新”状态 |
| pullingText | string | "下拉刷新" | 下拉过程中（未达到阈值）显示的提示文字 |
| loosingText | string | "松手刷新" | 下拉超过阈值后显示的提示文字 |
| loadingText | string | "正在刷新" | 刷新中显示的提示文字 |
| completeText | string | "" | 刷新完成瞬间显示的提示文字，为空则不展示 |
| textClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 提示文字的自定义样式类 |
| loadingClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | loading 图标的自定义样式类 |

<!-- UTSCOMJSON.uni-refresh-box.fileFormates -->



<!-- UTSCOMJSON.uni-refresh-box.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/refresh-box/refresh-box.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/refresh-box/refresh-box.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/refresh-box/refresh-box

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/refresh-box/refresh-box

>示例
```vue
<template>
  <view style="flex: 1;">
    <scroll-view
      style="flex: 1;"
      :refresher-enabled="true"
      :refresher-triggered="data.refreshing1"
      refresher-default-style="none"
      :refresher-threshold="45"
      refresher-max-drag-distance="200px"
      @refresherpulling="onRefresherpulling1"
      @refresherrefresh="onRefresherrefresh1"
      @refresherrestore="onRefresherrestore1"
      @refresherabort="onRefresherabort1"
    > <!-- TODO Android不支持bool属性，:refresher-enabled="true" 不能简写为 refresher-enabled -->
      <!-- 列表内容 -->
      <view v-for="i in data.listCount1" :key="i" class="content-item">
        <text class="text">item-{{ i }}</text>
      </view>

      <!-- refresher 插槽使用 uni-refresh-box 组件 -->
      <uni-refresh-box
        slot="refresher"
        :pulling-distance="data.pullingDistance1"
        :refreshing="data.refreshing1"
      ></uni-refresh-box> <!-- TODO web只认在组件外层使用slot="refresher"，不支持组件内根元素使用-->
    </scroll-view>
		<text class="section-label">竖排暗黑自定义文字的下拉设置</text>
		<scroll-view
		  style="flex: 1;background-color: black;"
		  :refresher-enabled="true"
		  :refresher-triggered="data.refreshing2"
		  refresher-default-style="none"
		  :refresher-threshold="45"
		  refresher-max-drag-distance="200px"
		  @refresherpulling="onRefresherpulling2"
		  @refresherrefresh="onRefresherrefresh2"
		  @refresherrestore="onRefresherrestore2"
		  @refresherabort="onRefresherabort2"
		> 
		  <!-- 列表内容 -->
		  <view v-for="i in data.listCount2" :key="i" class="content-item">
		    <text class="text">item-{{ i }}</text>
		  </view>

		  <!-- refresher 插槽使用 uni-refresh-box 组件 -->
		  <uni-refresh-box
		    slot="refresher"
		    :pulling-distance="data.pullingDistance2"
		    :refreshing="data.refreshing2"
				loading-class="loading-dark"
				text-class="text-dark"
				style="flex-direction: column;height: 46px;padding-top: 6px;"
				pulling-text="继续下拉可刷新"
				loosing-text="释放后会刷新"
				loading-text="奋力加载中..."
			></uni-refresh-box> 
		</scroll-view>
		<text class="section-label">slot自定义下拉图标</text>
		<scroll-view
		  style="flex: 1;"
		  :refresher-enabled="true"
		  :refresher-triggered="data.refreshing3"
		  refresher-default-style="none"
		  :refresher-threshold="45"
		  refresher-max-drag-distance="200px"
		  @refresherpulling="onRefresherpulling3"
		  @refresherrefresh="onRefresherrefresh3"
		  @refresherrestore="onRefresherrestore3"
		  @refresherabort="onRefresherabort3"
		> 
		  <!-- 列表内容 -->
		  <view v-for="i in data.listCount3" :key="i" class="content-item">
		    <text class="text">item-{{ i }}</text>
		  </view>

		  <!-- refresher 插槽使用 uni-refresh-box 组件 -->
		  <uni-refresh-box
		    slot="refresher"
		    :pulling-distance="data.pullingDistance3"
		    :refreshing="data.refreshing3"
		  >
				<template #loading="{ state }">
				  <image
				    v-if="state == 2"
				    src="https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/refresh-box-run.gif"
				    style="width: 20px; height: 20px;"
				  /> <!-- 刷新中的动图-->
				  <image
				    v-else
				    src="https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/refresh-box-run.gif"
				    style="width: 20px; height: 20px;"
				  /> <!-- 非刷新中的图，可以和刷新中的图是一张，也可以分开-->
				</template>
				<!-- <image src="https://web-ext-storage.dcloud.net.cn/hello-uni-app-x/refresh-box-run.gif" style="width:20px;height:20px;"></image> -->
			</uni-refresh-box> 
		</scroll-view>
		<text class="section-label">无文字，纯loading</text>
		<scroll-view
		  style="flex: 1;"
		  :refresher-enabled="true"
		  :refresher-triggered="data.refreshing4"
		  refresher-default-style="none"
		  :refresher-threshold="45"
		  refresher-max-drag-distance="200px"
		  @refresherpulling="onRefresherpulling4"
		  @refresherrefresh="onRefresherrefresh4"
		  @refresherrestore="onRefresherrestore4"
		  @refresherabort="onRefresherabort4"
		> 
		  <!-- 列表内容 -->
		  <view v-for="i in data.listCount4" :key="i" class="content-item">
		    <text class="text">item-{{ i }}</text>
		  </view>

		  <!-- refresher 插槽使用 uni-refresh-box 组件 -->
		  <uni-refresh-box
		    slot="refresher"
		    :pulling-distance="data.pullingDistance4"
		    :refreshing="data.refreshing4"
				pulling-text=""
				loosing-text=""
				loading-text=""
				loading-class="loading-big-font"
		  ></uni-refresh-box> 
		</scroll-view>
  </view>
</template>

<script setup lang="uts">
type Data = {
  listCount1: number
  refreshing1: boolean
  pullingDistance1: number
  listCount2: number
  refreshing2: boolean
  pullingDistance2: number
  listCount3: number
  refreshing3: boolean
  pullingDistance3: number
  listCount4: number
  refreshing4: boolean
  pullingDistance4: number
}

const data = reactive<Data>({
  listCount1: 3,
  refreshing1: false,
  pullingDistance1: 0,
  listCount2: 3,
  refreshing2: false,
  pullingDistance2: 0,
  listCount3: 3,
  refreshing3: false,
  pullingDistance3: 0,
  listCount4: 3,
  refreshing4: false,
  pullingDistance4: 0
})

function onRefresherpulling1(e: RefresherEvent) {
  data.pullingDistance1 = e.detail.dy
}

function onRefresherrefresh1() {
  data.refreshing1 = true
  console.log('列表1 触发刷新')
  setTimeout(() => {
    data.listCount1 += 5
    data.refreshing1 = false
    console.log('列表1 刷新完成')
  }, 1500)
}

function onRefresherrestore1() {
  data.pullingDistance1 = 0
}

function onRefresherabort1() {
  data.pullingDistance1 = 0
}

function onRefresherpulling2(e: RefresherEvent) {
  data.pullingDistance2 = e.detail.dy
}

function onRefresherrefresh2() {
  data.refreshing2 = true
  console.log('列表2 触发刷新')
  setTimeout(() => {
    data.listCount2 += 5
    data.refreshing2 = false
    console.log('列表2 刷新完成')
  }, 1500)
}

function onRefresherrestore2() {
  data.pullingDistance2 = 0
}

function onRefresherabort2() {
  data.pullingDistance2 = 0
}

function onRefresherpulling3(e: RefresherEvent) {
  data.pullingDistance3 = e.detail.dy
}

function onRefresherrefresh3() {
  data.refreshing3 = true
  console.log('列表3 触发刷新')
  setTimeout(() => {
    data.listCount3 += 5
    data.refreshing3 = false
    console.log('列表3 刷新完成')
  }, 1500)
}

function onRefresherrestore3() {
  data.pullingDistance3 = 0
}

function onRefresherabort3() {
  data.pullingDistance3 = 0
}

function onRefresherpulling4(e: RefresherEvent) {
  data.pullingDistance4 = e.detail.dy
}

function onRefresherrefresh4() {
  data.refreshing4 = true
  console.log('列表4 触发刷新')
  setTimeout(() => {
    data.listCount4 += 5
    data.refreshing4 = false
    console.log('列表4 刷新完成')
  }, 1500)
}

function onRefresherrestore4() {
  data.pullingDistance4 = 0
}

function onRefresherabort4() {
  data.pullingDistance4 = 0
}

defineExpose({
  data
})
</script>

<style>
.section-label {
  margin: 5px;
  color: var(--text-color, #333333);
}
.content-item {
  margin: 5px 10px;
}
.text {
  color: var(--text-color, #333333);
  font-size: 14px;
}

.loading-dark{
	border-color:white;
	width: 20px;
	height: 20px;
}
.text-dark{
	color: white;
	margin-top: 5px;
}

.loading-big-font{
	width: 24px;
	height: 24px;
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-refresh-box)
