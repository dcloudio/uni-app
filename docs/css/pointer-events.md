## pointer-events



pointer-events CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target (en-US)。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
pointer-events: auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit;
```



### 值限制
- enum



### pointer-events 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 与pointer-events属性未指定时的表现效果相同，对于 SVG 内容，该值与visiblePainted效果相同 |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 元素永远不会成为鼠标事件的target (en-US)。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/pointer-events/pointer-events.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/pointer-events/pointer-events.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/pointer-events/pointer-events

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/pointer-events/pointer-events

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <view class="container1">
        <text>控制父视图pointer-events打开时可以点击</text>
        <switch :checked="true" @change="onChange1" />
      </view>
      <view class="container" :style="{ 'pointer-events': pointerEvents1 }">
        <text class="text">点击修改宽度</text>
        <view class="base-style transition-width" id="widthOrHeight" @click="changeWidthOrHeight"></view>
      </view>
      <view class="container1">
        <text>控制遮罩层pointer-events关闭时可以点击</text>
        <switch :checked="true" @change="onChange2" />
      </view>
      <view class="container">
        <text class="text">点击修改宽度(递增)</text>
        <view class="width-progress transition-width" id="widthProgress" @click="changeWidthProgress"></view>
        <view class="mask" :style="{ 'pointer-events': pointerEvents2 }"></view>
      </view>
      <view class="container1">
        <text>控制text组件pointer-events打开时可以点击</text>
        <switch :checked="true" @change="onChange3" />
      </view>
      <view class="container" :style="{ 'pointer-events': pointerEvents3 }">
        <text class="text">点击修改宽度</text>
        <text class="text-pointer transition-width" id="textPointer" @click="changeTextWidth">测试文本</text>
      </view>
      <view class="container1">
        <text>控制image组件pointer-events打开时可以点击</text>
        <switch :checked="true" @change="onChange4" />
      </view>
      <view class="container" :style="{ 'pointer-events': pointerEvents4 }">
        <text class="text">点击修改宽度</text>
        <image class="image-pointer transition-width" id="imagePointer" @click="changeImageWidth" src="/static/test-image/logo.png"></image>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">

  let isTranstionWidthOrHeight = false
  let widthOrHeight: UniElement | null = null
  let widthProgress: UniElement | null = null
  let textPointer: UniElement | null = null
  let imagePointer: UniElement | null = null
  let progressWidth = 200
  let textWidth = 200
  let imageWidth = 200
  let isTextWidth = false
  let isImageWidth = false
  const pointerEvents1 = ref('auto')
  const pointerEvents2 = ref('auto')
  const pointerEvents3 = ref('auto')
  const pointerEvents4 = ref('auto')

  onReady(() => {
    widthOrHeight = uni.getElementById("widthOrHeight")
    widthProgress = uni.getElementById("widthProgress")
    textPointer = uni.getElementById("textPointer")
    imagePointer = uni.getElementById("imagePointer")
  })

  const changeWidthOrHeight = () => {
    widthOrHeight?.style?.setProperty("width", isTranstionWidthOrHeight
      ? '200px'
      : '300px')
    isTranstionWidthOrHeight = !isTranstionWidthOrHeight
  }

  const changeWidthProgress = () => {
    progressWidth += 20
    widthProgress?.style?.setProperty("width", progressWidth + 'px')
  }

  const onChange1 = (e : UniSwitchChangeEvent) => {
    pointerEvents1.value = e.detail.value ? 'auto' : 'none'
  }

  const onChange2 = (e : UniSwitchChangeEvent) => {
    pointerEvents2.value = e.detail.value ? 'auto' : 'none'
  }

  const changeTextWidth = () => {
    textPointer?.style?.setProperty("width", isTextWidth
      ? '200px'
      : '300px')
    isTextWidth = !isTextWidth
  }

  const changeImageWidth = () => {
    imagePointer?.style?.setProperty("width", isImageWidth
      ? '200px'
      : '300px')
    isImageWidth = !isImageWidth
  }

  const onChange3 = (e : UniSwitchChangeEvent) => {
    pointerEvents3.value = e.detail.value ? 'auto' : 'none'
  }

  const onChange4 = (e : UniSwitchChangeEvent) => {
    pointerEvents4.value = e.detail.value ? 'auto' : 'none'
  }
</script>

<style>
  .container1 {
    margin: 7px 0px 7px 7px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .container {
    margin: 7px;
    background-color: white;
  }

  .text {
    margin-top: 10px;
    margin-bottom: 16px;
  }

  .base-style {
    width: 200px;
    height: 200px;
    background-color: brown;
  }

  .width-progress {
    width: 200px;
    height: 200px;
    background-color: brown;
  }

  .transition-width {
    transition-property: width;
    transition-duration: 1s;
  }

  .mask {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .text-pointer {
    width: 200px;
    height: 200px;
    background-color: brown;
    font-size: 16px;
    color: white;
  }

  .image-pointer {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

```

:::

#### App平台
如果当前元素设置 pointer-events 为 none ，当前元素不会响应事件和默认行为，如果此元素包含子元素，所有子元素也将不会响应事件和默认行为，即使子元素显式设置 pointer-events 为 auto。

#### Web规范
如果当前元素设置 pointer-events 为 none ，当前元素不会响应事件和默认行为，如果此元素包含子元素，所有子元素默认将继承父元素的 pointer-events 值，即子元素也将不响应事件和默认行为，如果子元素显示设置 pointer-events 属性，则以设置的值为准。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/pointer-events)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.pointer-events)

