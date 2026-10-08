## animation



CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。


### uni-app x 兼容性 <Help />
| Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | x | 5.31 | x | 5.31 | x | 5.31 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.31 | 5.31 | x |





### 语法
```
animation: <single-animation>#;
```



### animation 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| alternate |   | The animation cycle iterations that are odd counts are played in the normal direction, and the animation cycle iterations that are even counts are played in a reverse direction. |
| alternate-reverse | Android(Vapor): x; iOS(Vapor): x | The animation cycle iterations that are odd counts are played in the reverse direction, and the animation cycle iterations that are even counts are played in a normal direction. |
| backwards | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | The beginning property value (as defined in the first @keyframes at-rule) is applied before the animation is displayed, during the period defined by 'animation-delay'. |
| both | Android(Vapor): x; iOS(Vapor): x; HarmonyOS(Vapor): x | Both forwards and backwards fill modes are applied. |
| forwards |   | The final property value (as defined in the last @keyframes at-rule) is maintained after the animation completes. |
| infinite |   | Causes the animation to repeat forever. |
| none |   | No animation is performed |
| normal |   | Normal playback. |
| reverse | Android(Vapor): x; iOS(Vapor): x | All iterations of the animation are played in the reverse direction from the way they were specified. |






### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/animation/animation.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/animation/animation.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/animation/animation

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/animation/animation

>示例
```vue
<template>
  <view class="animate-page">
    <page-intro content="本页演示 @keyframes 与 animation：点击开始/暂停/恢复/取消动画，可点击各 view 修改宽度、高度、margin、padding 等属性动画。"></page-intro>
    <view id="main" :class="'main-box main-animation-' + data.mainAnimationState"
      @animationend="onMainAnimationEnd"></view>

    <button @click="startAnimate">开始动画</button>
    <button @click="pauseAnimate">暂停动画</button>
    <button @click="resumeAnimate">恢复动画</button>
    <button @click="cancelAnimate">取消动画</button>

    <image src="/static/test-image/logo.png" id="roll"
      :class="'roll-image roll-image-' + data.rollAnimationState"></image>

    <text class="animation-label">修改宽度</text>
    <view id="widthProperty" :class="'animation-box animation-target width-animation-' + data.widthAnimationState"
      @click="widthProperty" @animationend="onWidthAnimationEnd"></view>

    <text class="animation-label">修改高度</text>
    <view id="height1" :class="'animation-box animation-target height-animation-' + data.heightAnimationState"
      @click="heightProperty" @animationend="onHeightAnimationEnd"></view>

    <text class="animation-label">修改margin</text>
    <view id="marginProperty" :class="'animation-box animation-target margin-animation-' + data.marginAnimationState"
      @click="marginProperty" @animationend="onMarginAnimationEnd"></view>

    <text class="animation-label">修改padding</text>
    <view id="paddingProperty" :class="'animation-box animation-target padding-animation-' + data.paddingAnimationState"
      @click="paddingProperty" @animationend="onPaddingAnimationEnd">
      <view class="padding-child"></view>
    </view>

    <text class="animation-label">修改border颜色</text>
    <view id="borderProperty" :class="'animation-box animation-target border-box border-animation-' + data.borderAnimationState"
      @click="borderProperty" @animationend="onBorderAnimationEnd"></view>

    <text class="animation-label">修改transform</text>
    <view id="transformProperty" :class="'animation-box animation-target transform-animation-' + data.transformAnimationState"
      @click="transformProperty" @animationend="onTransformAnimationEnd"></view>

    <text class="animation-label">修改position</text>
    <view id="positionProperty" :class="'animation-box animation-target position-animation-' + data.positionAnimationState"
      @click="positionProperty" @animationend="onPositionAnimationEnd"></view>

    <!-- #ifndef MP-WEIXIN -->
    <text class="animation-label">修改背景色和宽度</text>
    <view id="backgroundAndWidthProperty"
      :class="'animation-box animation-target background-width-animation-' + data.backgroundWidthAnimationState"
      @click="backgroundAndWidthProperty" @animationend="onBackgroundWidthAnimationEnd"></view>

    <text class="animation-label">执行的动画只有一个值1</text>
    <view id="oneProperty1" :class="'animation-box animation-target one-property-one-animation-' + data.onePropertyOneAnimationState"
      @click="oneProperty1" @animationend="onOnePropertyOneAnimationEnd"></view>

    <text class="animation-label">执行的动画只有一个值2</text>
    <view id="oneProperty2" :class="'animation-box animation-target one-property-two-animation-' + data.onePropertyTwoAnimationState"
      @click="oneProperty2" @animationend="onOnePropertyTwoAnimationEnd"></view>
    <!-- #endif -->

    <text class="animation-label">修改背景色和margin-left(关键帧)</text>
    <view id="backgroundAndMarginLeftProperty"
      :class="'animation-box animation-target background-margin-animation-' + data.backgroundMarginAnimationState"
      @click="backgroundAndMarginLeftProperty" @animationend="onBackgroundMarginAnimationEnd"></view>

    <text class="animation-label">修改背景色和transform(关键帧)</text>
    <view id="backgroundAndTransformProperty"
      :class="'animation-box animation-target background-transform-animation-' + data.backgroundTransformAnimationState"
      @click="backgroundAndTransformProperty" @animationend="onBackgroundTransformAnimationEnd"></view>

    <text class="animation-label">修改背景色(关键帧)</text>
    <view id="backgroundProperty" :class="'animation-box animation-target background-animation-' + data.backgroundAnimationState"
      @click="backgroundProperty" @animationend="onBackgroundAnimationEnd"></view>

    <text class="animation-label">修改opacity(关键帧)</text>
    <view id="opacityProperty" :class="'animation-box animation-target opacity-animation-' + data.opacityAnimationState"
      @click="opacityProperty" @animationend="onOpacityAnimationEnd"></view>

    <text class="animation-label">修改border-color和margin-left(关键帧)</text>
    <view id="borderColorMarginLeftProperty"
      :class="'animation-box animation-target border-margin-box border-margin-animation-' + data.borderMarginAnimationState"
      @click="borderColorMarginLeftProperty" @animationend="onBorderMarginAnimationEnd"></view>

    <text class="css-test-label">CSS 变量</text>
    <view id="cssVariableProperty" :class="'css-variable-box css-test-target css-variable-animation-' + data.cssVariableAnimationState"
      @click="cssVariableProperty" @animationend="onCssVariableAnimationEnd"></view>

    <!-- #ifdef uniVersion >= 5.27 -->
    <text class="css-test-label">calc() 计算宽度</text>
    <view id="calcProperty" :class="'calc-box css-test-target calc-animation-' + data.calcAnimationState"
      @click="calcProperty" @animationend="onCalcAnimationEnd"></view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
  type Data = {
    mainAnimationState : string,
    widthAnimationState : string,
    heightAnimationState : string,
    marginAnimationState : string,
    paddingAnimationState : string,
    borderAnimationState : string,
    transformAnimationState : string,
    positionAnimationState : string,
    backgroundWidthAnimationState : string,
    onePropertyOneAnimationState : string,
    onePropertyTwoAnimationState : string,
    backgroundMarginAnimationState : string,
    backgroundTransformAnimationState : string,
    backgroundAnimationState : string,
    opacityAnimationState : string,
    borderMarginAnimationState : string,
    cssVariableAnimationState : string,
    // #ifdef uniVersion >= 5.27
    calcAnimationState : string,
    // #endif
    rollAnimationState : string,
    testTriggerFinishEvent : boolean,
    testTriggerCancelEvent : boolean
  }

  const data = reactive({
    mainAnimationState: '',
    widthAnimationState: '',
    heightAnimationState: '',
    marginAnimationState: '',
    paddingAnimationState: '',
    borderAnimationState: '',
    transformAnimationState: '',
    positionAnimationState: '',
    backgroundWidthAnimationState: '',
    onePropertyOneAnimationState: '',
    onePropertyTwoAnimationState: '',
    backgroundMarginAnimationState: '',
    backgroundTransformAnimationState: '',
    backgroundAnimationState: '',
    opacityAnimationState: '',
    borderMarginAnimationState: '',
    cssVariableAnimationState: '',
    // #ifdef uniVersion >= 5.27
    calcAnimationState: '',
    // #endif
    rollAnimationState: '',
    testTriggerFinishEvent: false,
    testTriggerCancelEvent: false
  } as Data)

  let mainAnimationTimer = 0
  let mainAnimationStartedAt = 0
  let mainAnimationRemaining = 5000

  function finishMainAnimation() {
    if (data.mainAnimationState != 'running' && data.mainAnimationState != 'paused') {
      return
    }
    clearTimeout(mainAnimationTimer)
    mainAnimationTimer = 0
    data.mainAnimationState = 'finished'
    data.testTriggerFinishEvent = true
    uni.showToast({
      title: '动画播放完成'
    })
  }

  function scheduleMainAnimationFinish() {
    mainAnimationStartedAt = Date.now()
    mainAnimationTimer = setTimeout(() => {
      finishMainAnimation()
    }, mainAnimationRemaining)
  }

  function startAnimate() {
    clearTimeout(mainAnimationTimer)
    mainAnimationTimer = 0
    mainAnimationRemaining = 5000
    data.mainAnimationState = ''
    data.testTriggerFinishEvent = false
    data.testTriggerCancelEvent = false
    nextTick(() => {
      data.mainAnimationState = 'running'
      scheduleMainAnimationFinish()
    })
  }

  function pauseAnimate() {
    if (data.mainAnimationState == 'running') {
      clearTimeout(mainAnimationTimer)
      mainAnimationTimer = 0
      mainAnimationRemaining = Math.max(0, mainAnimationRemaining - (Date.now() - mainAnimationStartedAt))
      data.mainAnimationState = 'paused'
    }
  }

  function resumeAnimate() {
    if (data.mainAnimationState == 'paused') {
      data.mainAnimationState = 'running'
      scheduleMainAnimationFinish()
    }
  }

  function cancelAnimate() {
    if (data.mainAnimationState == 'running' || data.mainAnimationState == 'paused') {
      clearTimeout(mainAnimationTimer)
      mainAnimationTimer = 0
      data.mainAnimationState = ''
      data.testTriggerCancelEvent = true
      uni.showToast({
        title: '动画被取消了'
      })
    }
  }

  function onMainAnimationEnd() {
    finishMainAnimation()
  }

  function cssVariableProperty() {
    data.cssVariableAnimationState = ''
    nextTick(() => { data.cssVariableAnimationState = 'running' })
  }

  function onCssVariableAnimationEnd() {
    data.cssVariableAnimationState = 'finished'
  }

  // #ifdef uniVersion >= 5.27
  function calcProperty() {
    data.calcAnimationState = ''
    nextTick(() => { data.calcAnimationState = 'running' })
  }

  function onCalcAnimationEnd() {
    data.calcAnimationState = 'finished'
  }
  // #endif

  function stopRollAnimation() {
    data.rollAnimationState = 'stopped'
  }

  function widthProperty() {
    data.widthAnimationState = ''
    nextTick(() => { data.widthAnimationState = 'running' })
  }

  function onWidthAnimationEnd() {
    data.widthAnimationState = 'finished'
  }

  function heightProperty() {
    data.heightAnimationState = ''
    nextTick(() => { data.heightAnimationState = 'running' })
  }

  function onHeightAnimationEnd() {
    data.heightAnimationState = 'finished'
  }

  function marginProperty() {
    data.marginAnimationState = ''
    nextTick(() => { data.marginAnimationState = 'running' })
  }

  function onMarginAnimationEnd() {
    data.marginAnimationState = 'finished'
  }

  function paddingProperty() {
    data.paddingAnimationState = ''
    nextTick(() => { data.paddingAnimationState = 'running' })
  }

  function onPaddingAnimationEnd() {
    data.paddingAnimationState = 'finished'
  }

  function borderProperty() {
    data.borderAnimationState = ''
    nextTick(() => { data.borderAnimationState = 'running' })
  }

  function onBorderAnimationEnd() {
    data.borderAnimationState = 'finished'
  }

  function transformProperty() {
    data.transformAnimationState = ''
    nextTick(() => { data.transformAnimationState = 'running' })
  }

  function onTransformAnimationEnd() {
    data.transformAnimationState = 'finished'
  }

  function positionProperty() {
    data.positionAnimationState = ''
    nextTick(() => { data.positionAnimationState = 'running' })
  }

  function onPositionAnimationEnd() {
    data.positionAnimationState = 'finished'
  }

  function backgroundAndWidthProperty() {
    data.backgroundWidthAnimationState = ''
    nextTick(() => { data.backgroundWidthAnimationState = 'running' })
  }

  function onBackgroundWidthAnimationEnd() {
    data.backgroundWidthAnimationState = 'finished'
  }

  function oneProperty1() {
    data.onePropertyOneAnimationState = ''
    nextTick(() => { data.onePropertyOneAnimationState = 'running' })
  }

  function onOnePropertyOneAnimationEnd() {
    data.onePropertyOneAnimationState = 'finished'
  }

  function oneProperty2() {
    data.onePropertyTwoAnimationState = ''
    nextTick(() => { data.onePropertyTwoAnimationState = 'running' })
  }

  function onOnePropertyTwoAnimationEnd() {
    data.onePropertyTwoAnimationState = 'finished'
  }

  function backgroundAndMarginLeftProperty() {
    data.backgroundMarginAnimationState = ''
    nextTick(() => { data.backgroundMarginAnimationState = 'running' })
  }

  function onBackgroundMarginAnimationEnd() {
    data.backgroundMarginAnimationState = 'finished'
  }

  function backgroundAndTransformProperty() {
    data.backgroundTransformAnimationState = ''
    nextTick(() => { data.backgroundTransformAnimationState = 'running' })
  }

  function onBackgroundTransformAnimationEnd() {
    data.backgroundTransformAnimationState = 'finished'
  }

  function backgroundProperty() {
    data.backgroundAnimationState = ''
    nextTick(() => { data.backgroundAnimationState = 'running' })
  }

  function onBackgroundAnimationEnd() {
    data.backgroundAnimationState = 'finished'
  }

  function opacityProperty() {
    data.opacityAnimationState = ''
    nextTick(() => { data.opacityAnimationState = 'running' })
  }

  function onOpacityAnimationEnd() {
    data.opacityAnimationState = 'finished'
  }

  function borderColorMarginLeftProperty() {
    data.borderMarginAnimationState = ''
    nextTick(() => { data.borderMarginAnimationState = 'running' })
  }

  function onBorderMarginAnimationEnd() {
    data.borderMarginAnimationState = 'finished'
  }

  defineExpose({
    data,
    startAnimate,
    pauseAnimate,
    resumeAnimate,
    cancelAnimate,
    stopRollAnimation
  })
</script>

<style>
  .animate-page {
    display: flex;
    flex-direction: column;
  }

  .main-box {
    width: 100px;
    height: 100px;
    background-color: brown;
    transform: scale(1);
  }

  .css-test-label {
    margin: 4px 4px 0;
    padding: 8px 8px 0;
    border-style: solid;
    border-width: 1px 1px 0;
    background-color: var(--animation-panel-color, #eeeeee);
    color: var(--animation-text-color, #333333);
    border-color: var(--border-color, #eeeeee);
  }

  .css-test-target {
    margin: 0 4px 4px;
    border-style: solid;
    border-width: 0 1px 1px;
    border-color: var(--border-color, #eeeeee);
  }

  .css-variable-box {
    --animation-mid-size: 140px;
    --animation-mid-color: #38bdf8;
    --animation-mid-translate-x: 32px;
    width: 80px;
    height: 80px;
    background-color: #0ea5e9;
  }

  .css-variable-animation-running {
    animation: css-variable-animation 1s ease-in-out 1;
  }

  .css-variable-animation-finished {
    width: 120px;
    height: 120px;
    background-color: #0284c7;
    transform: translateX(0px);
  }

  /* #ifdef uniVersion >= 5.27 */
  .calc-box {
    width: calc(100% - 32px);
    height: 48px;
    background-color: #f97316;
  }

  .calc-animation-running {
    animation: calc-animation 1s ease-in-out 1;
  }

  .calc-animation-finished {
    width: calc(100% - 80px);
    background-color: #ea580c;
  }
  /* #endif */

  .main-animation-running,
  .main-animation-paused {
    animation: main-scale 5s linear 1;
  }

  .main-animation-paused {
    animation-play-state: paused;
  }

  .roll-image {
    width: 100px;
    height: 100px;
    margin: 10px;
    animation: roll-logo 2s ease-in-out infinite alternate;
  }

  .roll-image-stopped {
    animation: none;
    transform: translateX(0px) rotate(0deg);
  }

  .animation-label {
    margin: 4px 4px 0;
    padding: 4px 4px 0;
    border-style: solid;
    border-width: 1px 1px 0;
    background-color: var(--list-background-color, #eeeeee);
    border-color: var(--border-color, #eeeeee);
    color: var(--text-color, #333333);
  }

  .animation-target {
    margin: 0 4px 4px;
    border-style: solid;
    border-width: 0 1px 1px;
    border-color: var(--border-color, #eeeeee);
  }

  .animation-box {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: brown;
  }

  .padding-child {
    width: 50px;
    height: 50px;
    background-color: black;
  }

  .border-box {
    border-width: 10px;
    border-color: black;
    border-style: solid;
  }

  .border-margin-box {
    border-width: 5px;
    border-color: black;
    border-style: solid;
  }

  .width-animation-running {
    animation: change-width 1s linear 1;
  }

  .width-animation-finished {
    width: 150px;
  }

  .height-animation-running {
    animation: change-height 1s linear 1;
  }

  .height-animation-finished {
    height: 200px;
  }

  .margin-animation-running {
    animation: change-margin 1s linear 1;
  }

  .margin-animation-finished {
    margin: 32px;
  }

  .padding-animation-running {
    animation: change-padding 1s linear 1;
  }

  .padding-animation-finished {
    padding: 16px;
  }

  .border-animation-running {
    animation: change-border-color 1s linear 1;
  }

  .border-animation-finished {
    border-color: blue;
  }

  .transform-animation-running {
    animation: change-transform 1s linear 1;
  }

  .transform-animation-finished {
    transform: scale(0.8) rotate(180deg);
  }

  .position-animation-running {
    animation: change-position 1s linear 1;
  }

  .position-animation-finished {
    left: 16px;
  }

  .background-width-animation-running {
    animation: change-background-width 1s linear 1;
  }

  .background-width-animation-finished {
    width: 200px;
    background-color: blue;
  }

  .one-property-one-animation-running {
    animation: change-one-property-one 1s linear 1;
  }

  .one-property-one-animation-finished {
    background-color: green;
  }

  .one-property-two-animation-running {
    animation: change-one-property-two 1s linear 1;
  }

  .one-property-two-animation-finished {
    background-color: blue;
  }

  .background-margin-animation-running {
    animation: change-background-margin 1s linear 1;
  }

  .background-margin-animation-finished {
    margin-left: 30px;
    background-color: pink;
  }

  .background-transform-animation-running {
    animation: change-background-transform 1s linear 1;
  }

  .background-transform-animation-finished {
    transform: translate(100px, 0px);
    background-color: pink;
  }

  .background-animation-running {
    animation: change-background 1s linear 1;
  }

  .background-animation-finished {
    background-color: blue;
  }

  .opacity-animation-running {
    animation: change-opacity 1s linear 1;
  }

  .opacity-animation-finished {
    opacity: 0.5;
  }

  .border-margin-animation-running {
    animation: change-border-margin 1s linear 1;
  }

  .border-margin-animation-finished {
    margin-left: 60px;
    border-color: yellow;
  }

  @keyframes main-scale {
    0% {
      transform: scale(1);
      transform-origin: 0px 0px;
    }

    50% {
      transform: scale(0);
      transform-origin: 50px 50px;
    }

    100% {
      transform: scale(1);
      transform-origin: 100px 100px;
    }
  }

  @keyframes css-variable-animation {
    0% {
      width: 80px;
      height: 80px;
      background-color: #0ea5e9;
      transform: translateX(0px);
    }

    50% {
      width: var(--animation-mid-size);
      height: var(--animation-mid-size);
      background-color: var(--animation-mid-color);
      transform: translateX(var(--animation-mid-translate-x));
    }

    100% {
      width: 120px;
      height: 120px;
      background-color: #0284c7;
      transform: translateX(0px);
    }
  }

  /* #ifdef uniVersion >= 5.27 */
  @keyframes calc-animation {
    0% {
      width: calc(100% - 32px);
    }

    50% {
      width: calc(100% - 120px);
    }

    100% {
      width: calc(100% - 80px);
      background-color: #ea580c;
    }
  }
  /* #endif */

  @keyframes roll-logo {
    0% {
      transform: translateX(0px) rotate(0deg);
    }

    100% {
      transform: translateX(200px) rotate(540deg);
    }
  }

  @keyframes change-width {
    0% { width: 100px; }
    50% { width: 200px; }
    100% { width: 150px; }
  }

  @keyframes change-height {
    0% { height: 100px; }
    100% { height: 200px; }
  }

  @keyframes change-margin {
    0% { margin: 8px; }
    50% { margin: 16px; }
    100% { margin: 32px; }
  }

  @keyframes change-padding {
    0% { padding: 0px; }
    33.33% { padding: 16px; }
    66.67% { padding: 32px; }
    100% { padding: 16px; }
  }

  @keyframes change-border-color {
    30% { border-color: yellow; }
    60% { border-color: pink; }
    100% { border-color: blue; }
  }

  @keyframes change-transform {
    0% { transform: translateX(0px) scale(1) rotate(0deg); }
    50% { transform: translateX(100px); }
    100% { transform: scale(0.8) rotate(180deg); }
  }

  @keyframes change-position {
    0% { left: 0px; }
    33.33% { left: 16px; }
    66.67% { left: 32px; }
    100% { left: 16px; }
  }

  @keyframes change-background-width {
    0% {
      width: 100px;
      background-color: red;
    }

    50% {
      background-color: yellow;
    }

    100% {
      width: 200px;
      background-color: blue;
    }
  }

  @keyframes change-one-property-one {
    100% { background-color: green; }
  }

  @keyframes change-one-property-two {
    100% { background-color: blue; }
  }

  @keyframes change-background-margin {
    20% { background-color: red; }
    46.67% { margin-left: 10px; }
    73.33% { margin-left: 20px; }
    100% {
      margin-left: 30px;
      background-color: pink;
    }
  }

  @keyframes change-background-transform {
    20% { background-color: red; }
    46.67% { transform: translate(30px, 0px); }
    73.33% { transform: translate(50px, 0px); }
    100% {
      transform: translate(100px, 0px);
      background-color: pink;
    }
  }

  @keyframes change-background {
    30% { background-color: yellow; }
    60% { background-color: red; }
    100% { background-color: blue; }
  }

  @keyframes change-opacity {
    30% { opacity: 1; }
    60% { opacity: 0.1; }
    100% { opacity: 0.5; }
  }

  @keyframes change-border-margin {
    0% {
      border-color: red;
      margin-left: 0px;
    }

    50% {
      margin-left: 20px;
    }

    100% {
      margin-left: 60px;
      border-color: yellow;
    }
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/animation)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.animation)
