## transition-duration



transition-duration 属性以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s，表示不出现过渡动画。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
transition-duration: <time>#;
```



### 值限制
- time




### 默认值 @default-value 
 `0s`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/transition/transition-duration.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/transition/transition-duration.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/transition/transition-duration

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/transition/transition-duration

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <text class="uni-title-text">view 组件 transition-duration：2s </text>
      <view :class="classValue"></view>
      <view class="button-container">
        <button class="button-item" @click="start">start</button>
        <button class="button-item" @click="reset">reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">text 组件 transition-duration: 2s</text>
      <text :class="textClassValue">transition-duration: 2s</text>
      <view class="button-container">
        <button class="button-item" @click="textStart">text start</button>
        <button class="button-item" @click="textReset">text reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">image 组件 transition-duration: 2s</text>
      <image :class="imageClassValue" src="/static/test-image/logo.png"></image>
      <view class="button-container">
        <button class="button-item" @click="imageStart">image start</button>
        <button class="button-item" @click="imageReset">image reset</button>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件 transition-duration: 2s</text>
      <scroll-view :class="scrollViewClassValue"></scroll-view>
      <view class="button-container">
        <button class="button-item" @click="scrollViewStart">scroll-view start</button>
        <button class="button-item" @click="scrollViewReset">scroll-view reset</button>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 transition-duration </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActual}}</text>
          <view class="test-box">
            <view ref="viewRefDynamic" class="common-image" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionDynamic">
              <text style="font-size: 12px;">点击view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActualText}}</text>
          <view class="test-box">
            <text ref="textRefDynamic" class="common-text" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionTextDynamic">点击text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActualImage}}</text>
          <view class="test-box">
            <image ref="imageRefDynamic" class="common-image" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionImageDynamic" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefDynamicFlat" class="common-image" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionDynamic" flatten>
              <text style="font-size: 12px;">点击view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefDynamicFlat" class="common-text" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionTextDynamic" flatten>点击text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{transitionDurationDynamic}}</text>
          <text class="uni-info">获取值: {{transitionDurationActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefDynamicFlat" class="common-image" :style="{ transitionDuration: transitionDurationDynamic, transitionProperty: 'width' }" @click="triggerTransitionImageDynamic" src="/static/test-image/logo.png" flatten></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="transitionDurationEnum" title="transition-duration 枚举值" @change="radioChangeTransitionDuration" :compact="true"></enum-data>
        <input-data :defaultValue="transitionDurationDynamic" title="transition-duration 自定义值" type="text" @confirm="inputChangeTransitionDuration"></input-data>
      </view>

      <text class="uni-title-text uni-common-mt uni-common-mb">native-view 组件 transition-duration: 2s</text>
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
    textStart()
    imageStart()
  }

  const jest_reset = () => {
    reset()
    textReset()
    imageReset()
  }

	defineExpose({
	  jest_start,
	  jest_reset
	})

  import { ItemType } from '@/components/enum-data/enum-data-types'

  const transitionDurationDynamic = ref('2s')
  const transitionDurationActual = ref('')
  const transitionDurationActualText = ref('')
  const transitionDurationActualImage = ref('')
  const transitionDurationActualFlat = ref('')
  const transitionDurationActualTextFlat = ref('')
  const transitionDurationActualImageFlat = ref('')
  const viewRefDynamic = ref(null as UniElement | null)
  const textRefDynamic = ref(null as UniTextElement | null)
  const imageRefDynamic = ref(null as UniImageElement | null)
  const viewRefDynamicFlat = ref(null as UniElement | null)
  const textRefDynamicFlat = ref(null as UniTextElement | null)
  const imageRefDynamicFlat = ref(null as UniImageElement | null)
  const scrollViewRefDynamic = ref(null as UniElement | null)
  const isExpandedDynamic = ref(false)
  const isExpandedDynamicText = ref(false)
  const isExpandedDynamicImage = ref(false)
  const isExpandedDynamicScrollView = ref(false)

  const transitionDurationEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0s' },
    { value: 2, name: '0.5s' },
    { value: 3, name: '1s' },
    { value: 4, name: '5s' },
  ]

  const getPropertyValues = () => {
    transitionDurationActual.value = viewRefDynamic.value?.style.getPropertyValue('transition-duration') ?? ''
    transitionDurationActualFlat.value = viewRefDynamicFlat.value?.style.getPropertyValue('transition-duration') ?? ''
    transitionDurationActualText.value = textRefDynamic.value?.style.getPropertyValue('transition-duration') ?? ''
    transitionDurationActualTextFlat.value = textRefDynamicFlat.value?.style.getPropertyValue('transition-duration') ?? ''
    transitionDurationActualImage.value = imageRefDynamic.value?.style.getPropertyValue('transition-duration') ?? ''
    transitionDurationActualImageFlat.value = imageRefDynamicFlat.value?.style.getPropertyValue('transition-duration') ?? ''
  }

  const changeTransitionDurationDynamic = (value: string) => {
    transitionDurationDynamic.value = value
    viewRefDynamic.value?.style.setProperty('transition-duration', value)
    viewRefDynamicFlat.value?.style.setProperty('transition-duration', value)
    textRefDynamic.value?.style.setProperty('transition-duration', value)
    textRefDynamicFlat.value?.style.setProperty('transition-duration', value)
    imageRefDynamic.value?.style.setProperty('transition-duration', value)
    imageRefDynamicFlat.value?.style.setProperty('transition-duration', value)
    scrollViewRefDynamic.value?.style.setProperty('transition-duration', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeTransitionDuration = (index: number) => {
    const selectedItem = transitionDurationEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeTransitionDurationDynamic(selectedItem.name)
    }
  }

  const inputChangeTransitionDuration = (value: string) => {
    changeTransitionDurationDynamic(value)
  }

  const triggerTransitionDynamic = () => {
    isExpandedDynamic.value = !isExpandedDynamic.value
    const width = isExpandedDynamic.value ? '100px' : '50px'
    viewRefDynamic.value?.style.setProperty('width', width)
    viewRefDynamicFlat.value?.style.setProperty('width', width)
  }

  const triggerTransitionTextDynamic = () => {
    isExpandedDynamicText.value = !isExpandedDynamicText.value
    const width = isExpandedDynamicText.value ? '100px' : '50px'
    textRefDynamic.value?.style.setProperty('width', width)
    textRefDynamicFlat.value?.style.setProperty('width', width)
  }

  const triggerTransitionImageDynamic = () => {
    isExpandedDynamicImage.value = !isExpandedDynamicImage.value
    const width = isExpandedDynamicImage.value ? '100px' : '50px'
    imageRefDynamic.value?.style.setProperty('width', width)
    imageRefDynamicFlat.value?.style.setProperty('width', width)
  }

  const triggerTransitionScrollViewDynamic = () => {
    isExpandedDynamicScrollView.value = !isExpandedDynamicScrollView.value
    const width = isExpandedDynamicScrollView.value ? '100px' : '50px'
    scrollViewRefDynamic.value?.style.setProperty('width', width)
  }

  onReady(() => {
    getPropertyValues()
    if (scrollViewRefDynamic.value != null) {
      scrollViewRefDynamic.value.style.setProperty('transition-duration', transitionDurationDynamic.value)
      scrollViewRefDynamic.value.style.setProperty('transition-property', 'width')
    }
  })

</script>

<style>
  .box {
    width: 200px;
    height: 50px;
    background-color: blue;
  }

  .ani {
    transition-duration: 2s;
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
    transition-duration: 2s;
    width: 300px;
  }

  .image-box {
    width: 100px;
    height: 100px;
  }

  .image-ani {
    transition-duration: 2s;
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
    transition-duration: 2s;
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

#### App平台
- 不支持指定多个时长
- HBuilderX4.0以下版本，属性值可以不设置单位，不设置单位时当做 ms（毫秒） 处理。从 HBuilderX4.0 起，统一为web的策略，必须设置单位，无单位当做非法值。也就是会造成动画不生效。

#### Web规范
属性值必须设置单位，无单位时当做非法值处理


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/transition-duration)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.transition-duration)

