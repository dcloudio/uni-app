## ScrollViewContext

滚动组件的上下文对象，用于控制滚动位置、滚动行为、下拉刷新和下拉二级面板。

### ScrollViewContext 兼容性 <Help /> 
 Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36

### 适用组件

- App 蒸汽模式：[scroll-view](../component/scroll-view.md)、[list-view](../component/list-view.md)、[waterflow](../component/waterflow.md)。
- 微信小程序：[scroll-view](../component/scroll-view.md)。

### 获取方式

通过 [uni.createSelectorQuery()](./create-selector-query.md) 选中滚动组件，调用 `NodesRef.node()` 并执行 `exec()`，在回调结果的 `node` 属性中获取 `ScrollViewContext` 对象。

在组件渲染完成后获取，例如在页面的 `onReady` 中获取 id 为 `scroll-view` 的组件：

```ts
onReady(() => {
  uni.createSelectorQuery()
    .select('#scroll-view')
    .node((result) => {
      if (result != null) {
        const scrollViewContext = result.node as ScrollViewContext
        scrollViewContext.scrollTo({ top: 100, animated: true })
      }
    })
    .exec()
})
```




### ScrollViewContext 的属性值 @scrollviewcontext-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| bounces | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS: x | 设置滚动边界弹性 (仅在 iOS 下生效) |
| showScrollbar | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 是否显示滚动条。 |
| scrollEnabled | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 是否允许手势滚动；关闭后仍可调用滚动方法。 |
| pagingEnabled | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 是否按页停靠。 |
| fastDeceleration | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 设置滚动减速速率。仅微信小程序 iOS 下生效。 |
| decelerationDisabled | boolean | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 取消滚动惯性。仅微信小程序 iOS 下生效。 |



### ScrollViewContext 的方法 @scrollviewcontext-methods
#### scrollTo(options: ScrollViewScrollToOptions): void @scrollto

scrollTo

滚动到指定位置，越界时钳制到可滚动范围。

##### scrollTo 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewScrollToOptions** | 是 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | scrollTo 的目标坐标和动画配置。未指定的坐标保持当前位置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| top | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 垂直滚动位置，单位 px。 |
| left | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 水平滚动位置，单位 px。 |
| animated | boolean | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 未指定且未传 duration、velocity 时，使用组件的 scroll-with-animation 配置。 |
| duration | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 动画时长，单位 ms；显式启用动画时默认 300，小于或等于 0 时立即定位。<br/>微信小程序：WebView 仅 iOS，Skyline 需基础库 3.14.3+。 |
| velocity | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 动画初始速度，单位 px/s；负值按 0 处理。<br/>微信小程序：WebView 仅 iOS，Skyline 需基础库 3.14.3+。 | 








#### scrollIntoView(selector: string, options?: ScrollViewScrollIntoViewOptions): void @scrollintoview

scrollIntoView

滚动到当前容器内的目标节点。App 平台 `list-view` 和 `waterflow` 中的目标需已渲染。
微信小程序 options 仅支持 Skyline（基础库 3.1.0+）。

##### scrollIntoView 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| selector | string | 是 | Web: x; 支付宝小程序: x | 元素选择器 |
| options | **ScrollViewScrollIntoViewOptions** | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 滚动至容器内目标节点时的配置。 微信小程序仅支持 Skyline（基础库 3.1.0+）。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| alignment | string | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 目标与容器视口的对齐方式；默认从起始位置对齐。<br/>微信小程序仅支持 Skyline（基础库 3.1.0+）。 |
| offset | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 对齐位置的偏移量，单位 px，默认 0。<br/>微信小程序仅支持 Skyline（基础库 3.1.0+）。 |
| animated | boolean | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36 | 是否启用滚动动画，默认 true。<br/>微信小程序仅支持 Skyline（基础库 3.1.0+）。 |
| withinExtent | boolean | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 是否仅跳转到 cacheExtent 范围内的目标节点，默认 false。<br/>仅微信小程序 Skyline 支持（基础库 3.1.0+）。 | 

##### alignment 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "start" | Web: x; 支付宝小程序: x |
| "center" | Web: x; 支付宝小程序: x |
| "end" | Web: x; 支付宝小程序: x |
| "nearest" | Web: x; 支付宝小程序: x |








#### triggerRefresh(options?: ScrollViewRefreshOptions): void @triggerrefresh

triggerRefresh

触发下拉刷新。

##### triggerRefresh 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x; 支付宝小程序: x |
| "ease" | Web: x; 支付宝小程序: x |
| "ease-in" | Web: x; 支付宝小程序: x |
| "ease-out" | Web: x; 支付宝小程序: x |
| "ease-in-out" | Web: x; 支付宝小程序: x | 








#### closeRefresh(): void @closerefresh

closeRefresh

关闭下拉刷新。

##### closeRefresh 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android(VDOM): x; Android(Vapor): 5.36; iOS(VDOM): x; iOS(Vapor): 5.36; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.36










#### triggerTwoLevel(options?: ScrollViewRefreshOptions): void @triggertwolevel

triggerTwoLevel

打开下拉二级面板。

##### triggerTwoLevel 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x; 支付宝小程序: x |
| "ease" | Web: x; 支付宝小程序: x |
| "ease-in" | Web: x; 支付宝小程序: x |
| "ease-out" | Web: x; 支付宝小程序: x |
| "ease-in-out" | Web: x; 支付宝小程序: x | 








#### closeTwoLevel(options?: ScrollViewRefreshOptions): void @closetwolevel

closeTwoLevel

关闭下拉二级面板。

##### closeTwoLevel 兼容性 <Help /> 
Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x; 支付宝小程序: x |
| "ease" | Web: x; 支付宝小程序: x |
| "ease-in" | Web: x; 支付宝小程序: x |
| "ease-out" | Web: x; 支付宝小程序: x |
| "ease-in-out" | Web: x; 支付宝小程序: x | 








### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/scroll-view/scroll-view-context/scroll-view.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/scroll-view/scroll-view-context/scroll-view.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/scroll-view/scroll-view-context/scroll-view
```uvue
<template>
  <text class="fs-18 fw-bold color-text-333">属性</text>
  <scroll-view id="property-scroll" class="context-scroll" direction="vertical">
    <view v-for="index in 8" :key="index" class="context-item">
      <text>条目 {{ index }}</text>
    </view>
  </scroll-view>
  <!-- #ifdef APP-IOS || MP-WEIXIN -->
  <boolean-data
    id="property-bounces"
    title="bounces（边界回弹，仅 iOS）"
    :value="data.bounces"
    @change="changeBounces"
  />
  <!-- #endif -->
  <boolean-data
    id="property-showScrollbar"
    title="showScrollbar（显示滚动条）"
    :value="data.showScrollbar"
    @change="changeShowScrollbar"
  />
  <boolean-data
    id="property-scrollEnabled"
    title="scrollEnabled（允许手势滚动）"
    :value="data.scrollEnabled"
    @change="changeScrollEnabled"
  />
  <boolean-data
    id="property-pagingEnabled"
    title="pagingEnabled（分页滚动）"
    :value="data.pagingEnabled"
    @change="changePagingEnabled"
  />

  <text class="fs-18 fw-bold color-text-333 mt-15">方法</text>

  <!-- scrollTo：使用自己的滚动容器。 -->
  <text class="fs-15 fw-bold color-text-333 mt-15">scrollTo</text>
  <scroll-view id="scroll-to" class="context-scroll" direction="vertical">
    <view v-for="index in 8" :key="index" class="context-item">
      <text>条目 {{ index }}</text>
    </view>
  </scroll-view>
  <button id="call-scroll-to" class="mt-10" @click="scrollTo">滚动到 top = 120</button>

  <!-- scrollIntoView：使用自己的滚动容器。 -->
  <text class="fs-15 fw-bold color-text-333 mt-15">scrollIntoView</text>
  <scroll-view id="scroll-into-view" class="context-scroll" direction="vertical">
    <view
      v-for="index in 8"
      :key="index"
      :id="index == 2 ? 'scroll-into-view-target' : 'into-item-' + index"
      class="context-item"
    >
      <text>{{ index == 2 ? '目标条目' : '条目 ' + index }}</text>
    </view>
  </scroll-view>
  <button id="call-scroll-into-view" class="mt-10" @click="scrollIntoView">定位到目标条目</button>

  <!-- triggerRefresh / closeRefresh：共用一个滚动容器。 -->
  <text class="fs-15 fw-bold color-text-333 mt-15">triggerRefresh / closeRefresh</text>
  <scroll-view
    id="refresh-scroll"
    class="context-scroll"
    direction="vertical"
    :refresher-enabled="true"
  >
    <view v-for="index in 8" :key="index" class="context-item">
      <text>条目 {{ index }}</text>
    </view>
  </scroll-view>
  <button id="call-trigger-refresh" class="mt-10" @click="triggerRefresh">
    调用 triggerRefresh
  </button>

  <button id="call-close-refresh" class="mt-10" @click="closeRefresh">调用 closeRefresh</button>

  <!-- triggerTwoLevel / closeTwoLevel：共用一个滚动容器。 -->
  <text class="fs-15 fw-bold color-text-333 mt-15">triggerTwoLevel / closeTwoLevel</text>
  <scroll-view
    id="two-level-scroll"
    class="context-scroll"
    direction="vertical"
    :refresher-enabled="true"
    <!-- #ifdef MP-WEIXIN -->
    :refresher-two-level-enabled="true"
    <!-- #endif -->
    refresher-default-style="none"
  >
    <view v-for="index in 8" :key="index" class="context-item">
      <text>条目 {{ index }}</text>
    </view>
    <view slot="refresher" class="context-refresher items-center justify-center">
      <text>二级面板</text>
    </view>
  </scroll-view>
  <button id="call-trigger-two-level" class="mt-10" @click="triggerTwoLevel">
    调用 triggerTwoLevel
  </button>

  <button id="call-close-two-level" class="mt-10" @click="closeTwoLevel">调用 closeTwoLevel</button>
</template>

<script setup lang="ts">
  import { getScrollViewContext } from './scroll-view-context'

  const data = reactive({
    // #ifdef APP-IOS || MP-WEIXIN
    bounces: true,
    // #endif
    showScrollbar: true,
    scrollEnabled: true,
    pagingEnabled: false
  })

  // #ifdef APP-IOS || MP-WEIXIN
  async function changeBounces(value: boolean) {
    const context = await getScrollViewContext('#property-scroll')
    context.bounces = value
    data.bounces = context.bounces
  }
  // #endif

  async function changeShowScrollbar(value: boolean) {
    const context = await getScrollViewContext('#property-scroll')
    context.showScrollbar = value
    data.showScrollbar = context.showScrollbar
  }

  async function changeScrollEnabled(value: boolean) {
    const context = await getScrollViewContext('#property-scroll')
    context.scrollEnabled = value
    data.scrollEnabled = context.scrollEnabled
  }

  async function changePagingEnabled(value: boolean) {
    const context = await getScrollViewContext('#property-scroll')
    context.pagingEnabled = value
    data.pagingEnabled = context.pagingEnabled
  }

  async function scrollTo() {
    const context = await getScrollViewContext('#scroll-to')
    context.scrollTo({ top: 120 })
  }

  async function scrollIntoView() {
    const context = await getScrollViewContext('#scroll-into-view')
    context.scrollIntoView('#scroll-into-view-target')
  }

  async function triggerRefresh() {
    const context = await getScrollViewContext('#refresh-scroll')
    // #ifdef MP-WEIXIN
    context.triggerRefresh({})
    // #endif
    // #ifdef APP
    context.triggerRefresh()
    // #endif
  }

  async function closeRefresh() {
    const context = await getScrollViewContext('#refresh-scroll')
    context.closeRefresh()
  }

  async function triggerTwoLevel() {
    const context = await getScrollViewContext('#two-level-scroll')
    // #ifdef MP-WEIXIN
    context.triggerTwoLevel({})
    // #endif
    // #ifdef APP
    // App 端的二级开关通过运行时属性设置。
    context.setAnyAttribute('refresher-two-level-enabled', true)
    context.triggerTwoLevel()
    // #endif
  }

  async function closeTwoLevel() {
    const context = await getScrollViewContext('#two-level-scroll')
    // #ifdef MP-WEIXIN
    context.closeTwoLevel({})
    // #endif
    // #ifdef APP
    context.closeTwoLevel()
    // #endif
  }

  defineExpose({
    data,
    // #ifdef APP-IOS || MP-WEIXIN
    changeBounces,
    // #endif
    changeShowScrollbar,
    changeScrollEnabled,
    changePagingEnabled,
    scrollTo,
    scrollIntoView,
    triggerRefresh,
    closeRefresh,
    triggerTwoLevel,
    closeTwoLevel
  })
</script>

<style>
  @import './scroll-view-context.css';
</style>

```
:::
