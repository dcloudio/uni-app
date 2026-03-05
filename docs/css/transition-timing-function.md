## transition-timing-function



CSS 属性受到 transition effect的影响，会产生不断变化的中间值，而 CSS transition-timing-function 属性用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个 transition 变化过程中，变化速度可以不断改变。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
transition-timing-function: <easing-function>#;
```



### 值限制
- enum



### transition-timing-function 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| ease | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 默认值。表示过渡效果开始缓慢，然后逐渐加速，最后减速结束。这是大多数情况下的推荐值，因为它创建了平滑的过渡效果。 |
| ease-in | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 过渡开始时较慢，然后逐渐加速。这会在过渡初期创建一个缓慢的效果。 |
| ease-out | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 过渡开始时较快，然后逐渐减速。这会在过渡末尾创建一个缓慢的效果。 |
| ease-in-out | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 过渡开始时较慢，然后加速，最后减速。这是一个结合了ease-in和ease-out的时间函数，产生平滑的过渡效果。 |
| linear | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 过渡效果是线性的，速度保持恒定，没有加速或减速。这会在整个过渡期间保持相同的速度。 |
| cubic-bezier | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用于自定义 CSS 过渡（transition）的时间函数的函数，它允许你精确地定义过渡效果的速度变化。 |


#### App平台
App平台不支持指定多个过渡效果。

### 默认值 @default-value 
 `ease`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/transition/transition-timing-function.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/transition/transition-timing-function.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/transition/transition-timing-function

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/transition/transition-timing-function

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <text class="uni-title-text uni-common-mt">view 组件 transition-timing-function：linear</text>
      <view :class="classValue"></view>
      <view class="button-container">
        <button class="button-item" @click="start">start</button>
        <button class="button-item" @click="reset">reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">text 组件 transition-timing-function：ease-in-out</text>
      <text :class="textClassValue">timing-function: ease-in-out</text>
      <view class="button-container">
        <button class="button-item" @click="textStart">text start</button>
        <button class="button-item" @click="textReset">text reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">image 组件 transition-timing-function：ease</text>
      <image :class="imageClassValue" src="/static/test-image/logo.png"></image>
      <view class="button-container">
        <button class="button-item" @click="imageStart">image start</button>
        <button class="button-item" @click="imageReset">image reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件 transition-timing-function：ease-in-out</text>
      <scroll-view :class="scrollViewClassValue"></scroll-view>
      <view class="button-container">
        <button class="button-item" @click="scrollViewStart">scroll-view start</button>
        <button class="button-item" @click="scrollViewReset">scroll-view reset</button>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 transition-timing-function </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{transitionTimingFunctionDynamic}}</text>
          <text class="uni-info">获取值: {{transitionTimingFunctionActual}}</text>
          <view class="test-box">
            <view ref="viewRefDynamic" class="common-image test-view" :style="{ transitionTimingFunction: transitionTimingFunctionDynamic, transitionProperty: 'width', transitionDuration: '2s' }" @click="triggerTransitionDynamic">
              <text style="font-size: 12px;">点击view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{transitionTimingFunctionDynamic}}</text>
          <text class="uni-info">获取值: {{transitionTimingFunctionActualText}}</text>
          <view class="test-box">
            <text ref="textRefDynamic" class="common-text test-text" :style="{ transitionTimingFunction: transitionTimingFunctionDynamic, transitionProperty: 'width', transitionDuration: '2s' }" @click="triggerTransitionTextDynamic">点击text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{transitionTimingFunctionDynamic}}</text>
          <text class="uni-info">获取值: {{transitionTimingFunctionActualImage}}</text>
          <view class="test-box">
            <image ref="imageRefDynamic" class="common-image test-image" :style="{ transitionTimingFunction: transitionTimingFunctionDynamic, transitionProperty: 'width', transitionDuration: '2s' }" @click="triggerTransitionImageDynamic" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="transitionTimingFunctionEnum" title="transition-timing-function 枚举值" @change="radioChangeTransitionTimingFunction" :compact="true"></enum-data>
        <input-data :defaultValue="transitionTimingFunctionDynamic" title="transition-timing-function 自定义值" type="text" @confirm="inputChangeTransitionTimingFunction"></input-data>
      </view>

      <text class="uni-title-text uni-common-mt uni-common-mb">native-view 组件 transition-timing-function：ease-in-out</text>
      <native-view :class="nativeViewClassValue"></native-view>
      <view class="button-container">
        <button class="button-item" @click="nativeViewStart">native-view start</button>
        <button class="button-item" @click="nativeViewReset">native-view reset</button>
      </view>

    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">

  const classValue = ref('box')
  const textClassValue = ref('text-box')
  const imageClassValue = ref('image-box')
  const scrollViewClassValue = ref('scroll-view-box')
  const nativeViewClassValue = ref('native-view-box')

  const start = () => {
    classValue.value = 'box ani'
  }

  const reset = () => {
    classValue.value = 'box'
  }

  const textStart = () => {
    textClassValue.value = 'text-box text-ani'
  }

  const textReset = () => {
    textClassValue.value = 'text-box'
  }

  const imageStart = () => {
    imageClassValue.value = 'image-box image-ani'
  }

  const imageReset = () => {
    imageClassValue.value = 'image-box'
  }

  const scrollViewStart = () => {
    scrollViewClassValue.value = 'scroll-view-box scroll-view-ani'
  }

  const scrollViewReset = () => {
    scrollViewClassValue.value = 'scroll-view-box'
  }

  const nativeViewStart = () => {
    nativeViewClassValue.value = 'native-view-box native-view-ani'
  }

  const nativeViewReset = () => {
    nativeViewClassValue.value = 'native-view-box'
  }

  const jest_start = () => {
    start()
  }

  const jest_reset = () => {
    reset()
  }
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const transitionTimingFunctionDynamic = ref('ease')
  const transitionTimingFunctionActual = ref('')
  const transitionTimingFunctionActualText = ref('')
  const transitionTimingFunctionActualImage = ref('')
  const viewRefDynamic = ref(null as UniElement | null)
  const textRefDynamic = ref(null as UniTextElement | null)
  const imageRefDynamic = ref(null as UniImageElement | null)
  const scrollViewRefDynamic = ref(null as UniElement | null)
  const isExpandedDynamic = ref(false)
  const isExpandedDynamicText = ref(false)
  const isExpandedDynamicImage = ref(false)
  const isExpandedDynamicScrollView = ref(false)

  const transitionTimingFunctionEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'ease' },
    { value: 2, name: 'ease-in' },
    { value: 3, name: 'ease-out' },
    { value: 4, name: 'ease-in-out' },
    { value: 5, name: 'linear' },
    { value: 6, name: 'cubic-bezier(0.42, 0, 0.58, 1)' },
  ]

  const getPropertyValues = () => {
    transitionTimingFunctionActual.value = viewRefDynamic.value?.style.getPropertyValue('transition-timing-function') ?? ''
    transitionTimingFunctionActualText.value = textRefDynamic.value?.style.getPropertyValue('transition-timing-function') ?? ''
    transitionTimingFunctionActualImage.value = imageRefDynamic.value?.style.getPropertyValue('transition-timing-function') ?? ''
  }

  const changeTransitionTimingFunctionDynamic = (value: string) => {
    transitionTimingFunctionDynamic.value = value
    viewRefDynamic.value?.style.setProperty('transition-timing-function', value)
    textRefDynamic.value?.style.setProperty('transition-timing-function', value)
    imageRefDynamic.value?.style.setProperty('transition-timing-function', value)
    scrollViewRefDynamic.value?.style.setProperty('transition-timing-function', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeTransitionTimingFunction = (index: number) => {
    const selectedItem = transitionTimingFunctionEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeTransitionTimingFunctionDynamic(selectedItem.name)
    }
  }

  const inputChangeTransitionTimingFunction = (value: string) => {
    changeTransitionTimingFunctionDynamic(value)
  }

  const triggerTransitionDynamic = () => {
    isExpandedDynamic.value = !isExpandedDynamic.value
    const width = isExpandedDynamic.value ? '100px' : '50px'
    viewRefDynamic.value?.style.setProperty('width', width)
  }

  const triggerTransitionTextDynamic = () => {
    isExpandedDynamicText.value = !isExpandedDynamicText.value
    const width = isExpandedDynamicText.value ? '100px' : '50px'
    textRefDynamic.value?.style.setProperty('width', width)
  }

  const triggerTransitionImageDynamic = () => {
    isExpandedDynamicImage.value = !isExpandedDynamicImage.value
    const width = isExpandedDynamicImage.value ? '100px' : '50px'
    imageRefDynamic.value?.style.setProperty('width', width)
  }

  const triggerTransitionScrollViewDynamic = () => {
    isExpandedDynamicScrollView.value = !isExpandedDynamicScrollView.value
    const width = isExpandedDynamicScrollView.value ? '100px' : '50px'
    scrollViewRefDynamic.value?.style.setProperty('width', width)
  }

  onReady(() => {
    getPropertyValues()
    if (scrollViewRefDynamic.value != null) {
      scrollViewRefDynamic.value.style.setProperty('transition-timing-function', transitionTimingFunctionDynamic.value)
      scrollViewRefDynamic.value.style.setProperty('transition-property', 'width')
      scrollViewRefDynamic.value.style.setProperty('transition-duration', '2s')
    }
  })

  defineExpose({
    jest_start,
    jest_reset,
    radioChangeTransitionTimingFunction
  })
</script>

<style>
  .box {
    width: 200px;
    height: 50px;
    background-color: blue;
  }

  .ani {
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: linear;
    width: 300px;
  }

  .text-box {
    width: 200px;
    height: 60px;
    padding: 10px;
    font-size: 16px;
    background-color: lightblue;
    text-align: center;
  }

  .text-ani {
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: ease-in-out;
    width: 300px;
  }

  .image-box {
    width: 100px;
    height: 100px;
  }

  .image-ani {
    transition-property: width, height;
    transition-duration: 2s;
    transition-timing-function: ease;
    width: 150px;
    height: 150px;
  }

  .common-text {
    width: 50px;
    height: 50px;
    background-color: green;
    font-size: 12px;
    color: white;
  }

  .common-image {
    width: 50px;
    height: 50px;
    background-color: green;
  }

  .scroll-view-box {
    width: 200px;
    height: 50px;
    background-color: green;
  }

  .scroll-view-ani {
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: ease-in-out;
    width: 300px;
  }

  .native-view-box {
    width: 200px;
    height: 50px;
    background-color: green;
  }

  .native-view-ani {
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: ease-in-out;
    width: 300px;
  }

  .test-container {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }

  .test-item {
    flex: 1;
    margin: 0 5px;
  }

  .test-box {
    width: 100%;
    height: 80px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }


  .button-container {
    flex-direction: row;
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom:#d3d3d3 solid 1px;
  }

  .button-item {
    margin-right: 10px;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-timing-function)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.transition-timing-function)

