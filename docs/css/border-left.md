## border-left



CSS 属性 border-left 是属性border-left-color, border-left-style, 和border-left-width的三者的缩写。这些属性都是在描述一个元素的左边的边框border。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-left: <line-width> || <line-style> || <color>;
```



### 值限制
- length
- line-width
- line-style
- color




### 默认值 @default-value 
 `0`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-left.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-left.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-left

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-left

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>border-left: 5px solid blue</text>
        <view class="demo-box">
          <view class="common" style="border-left: 5px solid blue;"></view>
          <view class="common" style="border-left: 5px solid blue;" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common" style="border-left: 5px solid blue;">
          <text class="common-text">border-left: 5px solid blue</text>
        </scroll-view>
        <scroll-view class="common" style="border-left: 10px dotted cyan;">
          <text class="common-text">border-left: 10px dotted cyan</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-left </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderLeft: borderLeft }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderLeft: borderLeft }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderLeft: borderLeft }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderLeft: borderLeft }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderLeft: borderLeft }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderLeft}}</text>
          <text class="uni-info">获取值: {{borderLeftActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderLeft: borderLeft }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderLeftEnum" title="border-left 枚举值" @change="radioChangeBorderLeft" :compact="true"></enum-data>
        <input-data :defaultValue="borderLeft" title="border-left 自定义值" type="text" @confirm="inputChangeBorderLeft"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-left: 5px solid blue 和 10px dotted cyan</text>
        <view class="demo-box">
          <native-view class="common" style="border-left: 5px solid blue;"></native-view>
          <native-view class="common" style="border-left: 10px dotted cyan;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderLeftEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '1px solid cyan' },
    { value: 3, name: '2px dashed blue' },
    { value: 4, name: '3px dotted green' }
  ]

  const borderLeft = ref('5px solid pink')
  const borderLeftActual = ref('')
  const borderLeftActualText = ref('')
  const borderLeftActualImage = ref('')
  const borderLeftActualFlat = ref('')
  const borderLeftActualTextFlat = ref('')
  const borderLeftActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderLeftActual.value = viewRef.value?.style.getPropertyValue('border-left') ?? ''
    borderLeftActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-left') ?? ''
    borderLeftActualText.value = textRef.value?.style.getPropertyValue('border-left') ?? ''
    borderLeftActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-left') ?? ''
    borderLeftActualImage.value = imageRef.value?.style.getPropertyValue('border-left') ?? ''
    borderLeftActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-left') ?? ''
  }

  const changeBorderLeft = (value: string) => {
    borderLeft.value = value
    viewRef.value?.style.setProperty('border-left', value)
    viewRefFlat.value?.style.setProperty('border-left', value)
    textRef.value?.style.setProperty('border-left', value)
    textRefFlat.value?.style.setProperty('border-left', value)
    imageRef.value?.style.setProperty('border-left', value)
    imageRefFlat.value?.style.setProperty('border-left', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderLeft = (index: number) => {
    const selectedItem = borderLeftEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderLeft(selectedItem.name)
    }
  }

  const inputChangeBorderLeft = (value: string) => {
    changeBorderLeft(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderLeft
  })
</script>

<style>
  .common {
    width: 150px;
    height: 50px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
  }
  .common-dynamic {
    height: 50px;
    background-color: gray;
  }

  .common-image {
    width: 50px;
    height: 50px;
    background-color: gray;
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
    height: 60px;
    background-color: lightgray;
  }

  .common-text {
    font-size: 12px;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-left)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-left)

