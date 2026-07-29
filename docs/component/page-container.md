<!-- ## page-container -->

::: sourceCode
## page-container
:::

> 组件类型：UniPageContainerElement 

 页面容器组件。用于创建弹出层，支持拦截返回操作

page-container 的特点：
- 与普通前端popup类组件相比，page-container组件能响应返回操作。返回操作具体指：右滑手势、安卓物理返回键、和调用 `navigateBack` 接口三种返回情形。小程序未提供监听返回的API，想实现返回操作关闭弹层而不是页面，只能使用page-container组件。
- 与[dialogPage](../api/dialog-page.md)相比，`page-container` 是组件而不是页面；`page-container` 跨端，而 dialogPage 不支持小程序；dialogPage 支持覆盖pages.json中定义的顶部导航栏和tabbar，而 `page-container`不支持。


### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.02 | 4.41 | 5.02 | 5.02 | 5.02 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| show | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 是否显示容器组件 |
| duration | number | 300 | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 动画时长，单位毫秒 |
| z-index | number | 100 | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | z-index 层级 |
| overlay | boolean | true | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 是否显示遮罩层 |
| round | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 是否显示圆角 |
| position | top \| left \| bottom \| right \| center | "bottom" | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 弹出位置 |
| close-on-slide-down | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 是否在下滑一段距离后关闭 |
| overlay-style | string([string.CSSString](/uts/data-type.md#ide-string)) |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 自定义遮罩层样式 |
| custom-style | string([string.CSSString](/uts/data-type.md#ide-string)) |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 自定义弹出层样式 |
| @beforeenter | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>进入前触发 |
| @enter | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>进入中触发 |
| @afterenter | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>进入后触发 |
| @beforeleave | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>离开前触发 |
| @leave | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>离开中触发 |
| @afterleave | eventhandle |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | *(eventhandle)*<br/>离开后触发 |
| @clickoverlay | (event: [UniPointerEvent](/component/common.md#unipointerevent)) => void |   | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 点击遮罩层时触发 |

#### position 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| top | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 顶部 |
| left | Web: 5.02; 微信小程序: x; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 左侧 |
| bottom | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 底部 |
| right | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 右侧 |
| center | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02 | 居中 |



<!-- UTSCOMJSON.page-container.component_type -->

### Tips
- uni ui组件库中曾广泛使用的uni-popup组件，在uni-app x中推荐改用 page-container 组件替代
- 组件支持拦截用户的返回操作，包括右滑手势、安卓物理返回键和调用 navigateBack API
- iOS从屏幕左边滑入默认是关闭当前页面，如需改成关闭弹层，需在 pages.json 中配置`swipeBackAsBackPress`为true，把左滑关闭页面功能转为 `onBackPress`，才能关闭弹层。此功能需 5.21+ iOS平台 蒸汽模式 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style)
- Web 设置 `overlay: true` 时，组件会禁止背景页面滚动，避免滚动穿透
- 小程序 `uni.navigateBack` 无法在页面栈顶调用，此时没有上一级页面
- 小程序不支持 `左侧弹出`，App 和 Web 支持
- 小程序 `enter` 和 `leave` 相关事件的回调函数有参数 `event`，App 和 Web 平台没有
- 开启 `closeOnSlideDown` 后，小程序需要快速下滑才生效，而 App 和 Web 会跟着手指拖动滑动
- 支付宝小程序同一个页面最多只能有一个 `page-container`，如果页面中有多个 `page-container`，则只有一个 `page-container` 能够正常弹出，其他的 `page-container` 无法弹出，即使设置了 `v-if` 条件渲染也无法弹出，而微信小程序无此限制。App 和 Web 支持弹出多个 `page-container` 组件，后弹覆盖先弹。
- Web 暂不支持拦截侧滑返回和浏览器的后退按钮
- `overlay-style` 设置 `pointer-events: none` 可以实现点击遮罩层不关闭弹窗
- 居中弹出为全屏显示。此行为是为了对齐小程序的表现。由于遮罩层被覆盖，并不会触发 `click-overlay` 事件，可以自行调整 `custom-style` 的样式来规避此行为



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/page-container/page-container.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/page-container/page-container.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/component/page-container/page-container

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/page-container/page-container

>示例
```vue
<template>
  <scroll-view style="flex: 1">
    <page-intro
      content="本页演示 page-container 页面容器，用于在页面内创建弹出层效果，支持拦截返回操作：顶部/底部/左侧/右侧/居中弹出、圆角、遮罩与透明蒙层、下滑关闭等能力，通过按钮触发不同展示。"></page-intro>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 弹出位置 </text>
      </view>
      <view>
        <button @click="showContainer('top', '顶部')">顶部弹出</button>
        <button class="mt-5" @click="showContainer('bottom', '底部')">底部弹出</button>
        <button id="right-button" class="mt-5" @click="showContainer('right', '右侧')">右侧弹出</button>
        <!-- #ifndef MP -->
        <button class="mt-5" @click="showContainer('left', '左侧')">左侧弹出</button>
        <!-- #endif -->
        <button class="mt-5" @click="showContainer('center', '居中')">居中弹出</button>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 跟随元素对齐 </text>
      </view>
      <view>
        <button id="align-left-button" @click="showAlignLeft">下方左对齐</button>
        <button id="align-center-button" class="mt-5" @click="showAlignCenter">下方水平居中</button>
        <button id="align-right-button" class="mt-5" @click="showAlignRight">下方右对齐</button>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 弹窗圆角 </text>
      </view>
      <view>
        <button id="round-button" @click="showRound"> 开启圆角 </button>
        <button id="close-round-button" class="mt-5" @click="closeRound"> 关闭圆角 </button>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 遮罩层 </text>
      </view>
      <view>
        <button @click="showOverlay(false)">不显示蒙层</button>
        <button class="mt-5" @click="showOverlay(true)">显示蒙层</button>
        <button class="mt-5" @click="showTransparentOverlay">透明蒙层</button>
        <button class="mt-5" @click="showGreenTransparentOverlay">绿色半透明蒙层</button>
        <!-- #ifndef APP-ANDROID -->
        <button class="mt-5" @click="showOverlayPointerEventsNone">蒙层穿透（点击蒙层不关闭）</button>
        <!-- #endif -->
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 自动隐藏 </text>
      </view>
      <view>
        <button @click="autoClose">2秒后自动关闭</button>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 滚动穿透 </text>
      </view>
      <view>
        <button @click="showScrollThrough">打开滚动穿透测试弹层</button>
        <text class="slider-down-info">测试弹层内滚动到顶部或底部时是否会影响主页面滚动</text>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 下滑关闭 </text>
      </view>
      <view>
        <button @click="showSlideDown">支持下滑关闭</button>
        <text class="slider-down-info">提示: 当 close-on-slide-down=true 时，可下滑关闭容器</text>
      </view>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 其他方向滑动关闭 </text>
      </view>
      <view>
        <button @click="showSlideClose('left')">左滑关闭</button>
        <button class="mt-5" @click="showSlideClose('right')">右滑关闭</button>
        <button class="mt-5" @click="showSlideClose('top')">上滑关闭</button>
        <text class="slider-down-info">提示: close-on-slide-down=true 时，关闭方向由 position 决定</text>
      </view>
    </view>

    <!-- #ifndef MP -->
    <view class="uni-padding-wrap uni-common-mt" style="margin-bottom: 30px;">
      <view class="uni-title uni-common-mt">
        <text class="uni-title-text"> 多层堆叠测试 </text>
      </view>
      <view>
        <button @click="showStackedLayer1">打开第1层弹层</button>
      </view>
    </view>
    <!-- #endif -->

    <page-container <!-- #ifdef MP -->
      v-if="containerShow"
      <!-- #endif -->
      :show="containerShow" :position="containerPosition" :round="containerRound"
      :overlay="containerOverlay" :overlay-style="containerOverlayStyle"
      :custom-style="containerCustomStyle"
      :close-on-slide-down="containerCloseOnSlideDown" @afterleave="onAfterLeave">
      <view class="container">
        <text class="container-title">{{ containerTitle }}</text>
        <scroll-view v-if="enableScrollThrough" style="height: 200px;margin-bottom: 15px; padding: 10px;">
          <text class="container-content">{{ containerContent }}</text>
        </scroll-view>
        <text v-else class="container-content">{{ containerContent }}</text>
        <button @click="closeContainer" type="primary">关闭容器</button>
        <button class="mt-5" @click="navigateBack">后退页面</button>
      </view>
    </page-container>

    <!-- #ifndef MP -->
    <!-- 多层堆叠弹层 - 第1层 -->
    <page-container v-if="showStackedPop1" :show="showStackedPop1" position="center" @afterleave="closeStackedLayer1">
      <view class="stacked-container" style="background-color: #fff; width: 360px;">
        <text class="container-title">第1层弹层</text>
        <text class="container-content">这是第1层弹层,点击下方按钮可以打开第2层</text>
        <view style="flex-direction: row; justify-content: space-around;">
          <button @click="showStackedLayer2" size="default" type="primary">打开第2层</button>
          <button @click="closeStackedLayer1" size="default">关闭本层</button>
        </view>
      </view>
    </page-container>

    <!-- 多层堆叠弹层 - 第2层 -->
    <page-container v-if="showStackedPop2" :show="showStackedPop2" position="center" @afterleave="closeStackedLayer2">
      <view class="stacked-container" style="background-color: #f0f0f0; width: 340px;">
        <text class="container-title">第2层弹层</text>
        <text class="container-content">这是第2层弹层,点击下方按钮可以打开第3层</text>
        <view style="flex-direction: row; justify-content: space-around;">
          <button @click="showStackedLayer3" size="default" type="primary">打开第3层</button>
          <button @click="closeStackedLayer2" size="default">关闭本层</button>
        </view>
      </view>
    </page-container>

    <!-- 多层堆叠弹层 - 第3层 -->
    <page-container v-if="showStackedPop3" :show="showStackedPop3" position="center" @afterleave="closeStackedLayer3">
      <view class="stacked-container" style="background-color: #e0e0e0; width: 300px;">
        <text class="container-title">第3层弹层</text>
        <text class="container-content">这是第3层弹层,最顶层的弹层</text>
        <button @click="closeStackedLayer3" size="default">关闭本层</button>
      </view>
    </page-container>
    <!-- #endif -->

    <!-- 跟随元素对齐的弹层 -->
    <page-container <!-- #ifdef MP -->
      v-if="showAlignContainer"
      <!-- #endif -->
      :show="showAlignContainer" position="center" overlay-style="background-color: rgba(0, 0, 0, 0.1);"
      :custom-style="alignContainerStyle"
      @afterleave="closeAlignContainer">
      <view class="align-shell">
        <view class="align-arrow" :style="alignArrowStyle"></view>
        <view class="align-container">
          <view class="align-menu-item" hover-class="align-menu-item-hover" @click="onAlignMenuClick('菜单1')">
            <text class="align-menu-text">菜单1</text>
          </view>
          <view class="align-menu-item" hover-class="align-menu-item-hover" @click="onAlignMenuClick('菜单2')">
            <text class="align-menu-text">菜单2</text>
          </view>
          <view class="align-menu-item align-menu-item-last" hover-class="align-menu-item-hover"
            @click="closeAlignContainer">
            <text class="align-menu-text">关闭</text>
          </view>
        </view>
      </view>
    </page-container>
  </scroll-view>
</template>

<script setup lang="uts">
  const containerShow = ref<boolean>(false)
  const containerRound = ref<boolean>(false)
  const containerPosition = ref<string>('bottom')
  const containerOverlay = ref<boolean>(true)
  const containerTitle = ref<string>('Page-Container')
  const containerOverlayStyle = ref<string>('')
  const containerCustomStyle = ref<string>('')
  const containerContent = ref<string>('这是一个 page-container 容器')
  const containerCloseOnSlideDown = ref<boolean>(false)
  const enableScrollThrough = ref<boolean>(false)

  // 多层堆叠弹层状态
  const showStackedPop1 = ref<boolean>(false)
  const showStackedPop2 = ref<boolean>(false)
  const showStackedPop3 = ref<boolean>(false)

  // 跟随元素对齐弹层状态
  const showAlignContainer = ref<boolean>(false)
  const alignContainerStyle = ref<string>('')
  const alignArrowStyle = ref<string>('')

  type Data = {
    onAfterLeaveCallCount : number
  }

  // 仅用于自动化测试
  const data = reactive<Data>({
    onAfterLeaveCallCount: 0
  })

  function resetConfig() {
    containerPosition.value = 'bottom'
    containerOverlay.value = true
    containerCloseOnSlideDown.value = false
    containerOverlayStyle.value = ''
    containerCustomStyle.value = ''
    enableScrollThrough.value = false
  }

  function showContainer(position : string, text : string) {
    resetConfig()
    containerPosition.value = position
    containerShow.value = true
    containerTitle.value = `Position: ${position}`
    containerContent.value = `容器从 ${text} 弹出`
  }

  function showRound() {
    resetConfig()
    containerRound.value = true
    containerShow.value = true
    containerTitle.value = 'Round: true'
    containerContent.value = `弹窗圆角: ${containerRound.value}`
  }

  function closeRound() {
    resetConfig()
    containerRound.value = false
    containerShow.value = true
    containerTitle.value = 'Round: false'
    containerContent.value = `弹窗圆角: ${containerRound.value}`
  }

  function showOverlay(overlay : boolean) {
    resetConfig()
    containerOverlay.value = overlay
    containerShow.value = true
    containerTitle.value = `Overlay: ${overlay}`
    containerContent.value = `遮罩层: ${overlay}`
  }

  function showTransparentOverlay() {
    resetConfig()
    containerOverlay.value = true
    containerOverlayStyle.value = 'background-color: rgba(0, 0, 0, 0);'
    containerTitle.value = '透明蒙层'
    containerContent.value = '蒙层开启但完全透明，可以点击蒙层区域关闭'
    containerShow.value = true
  }

  function showGreenTransparentOverlay() {
    resetConfig()
    containerOverlay.value = true
    containerPosition.value = 'bottom'
    containerOverlayStyle.value = 'background-color: rgba(76, 175, 80, 0.3);'
    containerTitle.value = '绿色半透明蒙层'
    containerContent.value = '蒙层开启但为绿色半透明，可以点击蒙层区域关闭'
    containerShow.value = true
  }

  function showOverlayPointerEventsNone() {
    resetConfig()
    containerOverlay.value = true
    containerPosition.value = 'bottom'
    containerOverlayStyle.value = 'background-color: rgba(0, 0, 0, 0.3); pointer-events: none;'
    containerTitle.value = 'overlay-style: pointer-events: none'
    containerContent.value = '蒙层已开启并设置 pointer-events: none，点击蒙层区域不会关闭容器'
    containerShow.value = true
  }

  function showSlideDown() {
    resetConfig()
    containerCloseOnSlideDown.value = true
    containerShow.value = true
    containerPosition.value = 'bottom'
    containerTitle.value = 'Close-on-slide-down: true'
    containerContent.value = '下滑关闭: true'
  }

  function showSlideClose(position : string) {
    resetConfig()
    containerCloseOnSlideDown.value = true
    containerPosition.value = position

    if (position == 'left') {
      containerCustomStyle.value = 'width: 300px; height: 100%; right: auto;'
      containerTitle.value = '左滑关闭'
      containerContent.value = '左侧弹出: 从内容区域向左滑动可关闭容器'
    } else if (position == 'right') {
      containerCustomStyle.value = 'width: 300px; height: 100%; left: auto;'
      containerTitle.value = '右滑关闭'
      containerContent.value = '右侧弹出: 从内容区域向右滑动可关闭容器'
    } else if (position == 'top') {
      containerCustomStyle.value = 'height: 300px;'
      containerTitle.value = '上滑关闭'
      containerContent.value = '顶部弹出: 从内容区域向上滑动可关闭容器'
    }

    containerShow.value = true
  }

  function autoClose() {
    resetConfig()
    containerShow.value = true
    containerPosition.value = 'bottom'
    containerTitle.value = 'Page-container'
    containerContent.value = '容器会在 2s 后自动关闭'
    setTimeout(() => {
      containerShow.value = false
    }, 2000)
  }

  function showScrollThrough() {
    resetConfig()
    enableScrollThrough.value = true
    containerShow.value = true
    containerPosition.value = 'bottom'
    containerTitle.value = 'Page-container'
    containerContent.value = `这是一个可滚动的内容区域。\n\n请向上或向下滚动此区域。\n\n当滚动到顶部或底部边界时\n\n测试主页面是否会跟随滚动(滚动穿透问题)\n\n理想情况下,当弹层内的scroll-view滚动到边界时,不应该触发主页面的滚动。\n\n已到达底部,现在可以测试向上滚动到顶部的情况。`
  }

  function onAfterLeave() {
    containerShow.value = false
    data.onAfterLeaveCallCount += 1
  }

  function closeContainer() {
    containerShow.value = false
  }

  function navigateBack() {
    uni.navigateBack()
  }

  function showAlign(selector : string, alignType : string) {
    const containerWidth = 200
    const arrowStyleMap = new Map<string, string>([['left', 'left: 28px;'], ['center', 'left: 92px;'], ['right', 'left: 156px;']])
    // #ifdef WEB
    const elementId = selector.substring(1)
    const targetElement = uni.getElementById(elementId)
    if (targetElement != null) {
      const rect = targetElement.getBoundingClientRect()
      const nodeWidth = rect.width
      let targetLeft = rect.left

      if (alignType == 'center') {
        targetLeft += (nodeWidth / 2 - containerWidth / 2)
      } else if (alignType == 'right') {
        targetLeft += (nodeWidth - containerWidth)
      }

      alignArrowStyle.value = arrowStyleMap.get(alignType) as string
      alignContainerStyle.value = `left: ${targetLeft}px; top: ${rect.bottom}px; background-color: transparent; transform: none`
      showAlignContainer.value = true
      return
    }
    // #endif

    uni.createSelectorQuery().select(selector).boundingClientRect().exec((ret) => {
      if (ret.length == 1) {
        const nodeInfo = ret[0] as NodeInfo;
        const nodeWidth = nodeInfo.width as number
        let targetLeft = nodeInfo.left as number

        if (alignType == 'center') {
          targetLeft += (nodeWidth / 2 - containerWidth / 2)
        } else if (alignType == 'right') {
          targetLeft += (nodeWidth - containerWidth)
        }

        alignArrowStyle.value = arrowStyleMap.get(alignType) as string

        const targetTop = (nodeInfo.top as number) + (nodeInfo.height as number)

        // #ifdef MP-WEIXIN
        alignContainerStyle.value = `left: ${targetLeft}px; top: ${targetTop}px; background-color: transparent; transform: none`
        // #endif

        // #ifndef MP-WEIXIN
        const windowInfo = uni.getWindowInfo()
        const maxLeft = Math.max(0, windowInfo.windowWidth - containerWidth)
        const popupLeft = Math.max(0, Math.min(targetLeft, maxLeft))
        alignContainerStyle.value = `transform: translate(${popupLeft}px, ${targetTop}px); background-color: transparent; transition: none`
        // #endif

        showAlignContainer.value = true
      }
    })
  }

  function showAlignLeft() {
    showAlign('#align-left-button', 'left')
  }

  function showAlignCenter() {
    showAlign('#align-center-button', 'center')
  }

  function showAlignRight() {
    showAlign('#align-right-button', 'right')
  }

  function closeAlignContainer() {
    showAlignContainer.value = false
  }

  function onAlignMenuClick(menuName : string) {
    closeAlignContainer()
    uni.showToast({
      title: `点击了${menuName}`,
      icon: 'none'
    })
  }

  // 多层堆叠弹层方法
  function showStackedLayer1() {
    showStackedPop1.value = true
  }

  function showStackedLayer2() {
    showStackedPop2.value = true
  }

  function showStackedLayer3() {
    showStackedPop3.value = true
  }

  function closeStackedLayer1() {
    showStackedPop1.value = false
  }

  function closeStackedLayer2() {
    showStackedPop2.value = false
  }

  function closeStackedLayer3() {
    showStackedPop3.value = false
  }

  defineExpose({
    data,
    showContainer,
    navigateBack
  })
</script>

<style scoped>
  .container {
    padding: 20px;
    background-color: #ffffff;
    min-height: 300px;
    min-width: 300px;
  }

  .container-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .container-content {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  .mt-5 {
    margin-top: 5px;
  }

  .slider-down-info {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .stacked-container {
    padding: 10px;
    border-radius: 8px;
    min-height: 150px;
  }

  .align-container {
    background-color: #ffffff;
    width: 200px;
    border-radius: 8px;
    margin-top: -1px;
  }

  .align-menu-item {
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #eeeeee;
  }

  .align-menu-item-last {
    border-bottom-width: 0;
  }

  .align-menu-text {
    font-size: 14px;
    color: #333333;
  }

  .align-menu-item-hover {
    background-color: #f5f5f5;
  }

  .align-shell {
    width: 200px;
    padding-top: 7px;
    position: relative;
    background-color: transparent;
  }

  .align-arrow {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffffff;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.page-container)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/page-container.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=page-container&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=page-container&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=page-container&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=page-container&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=page-container)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=page-container&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
