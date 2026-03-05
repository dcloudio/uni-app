## border-top



CSS 属性 border-top是属性 border-top-color, border-top-style, 和border-top-width 的三者的缩写。这些属性都是在描述一个元素的上方的边框border。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-top: <line-width> || <line-style> || <color>;
```



### 值限制
- length
- line-width
- line-style
- color




### 默认值 @default-value 
 `0`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-top.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-top.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-top

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-top

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>border-top: 5px dashed blue</text>
        <view class="demo-box">
          <view class="common" style="border-top: 5px dashed blue;"></view>
          <view class="common" style="border-top: 5px dashed blue;" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common" style="border-top: 5px dashed blue;">
          <text class="common-text">border-top: 5px dashed blue</text>
        </scroll-view>
        <scroll-view class="common" style="border-top: 10px solid cyan;">
          <text class="common-text">border-top: 10px solid cyan</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-top </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderTop: borderTop }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderTop: borderTop }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderTop: borderTop }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderTop: borderTop }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderTop: borderTop }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderTop}}</text>
          <text class="uni-info">获取值: {{borderTopActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderTop: borderTop }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderTopEnum" title="border-top 枚举值" @change="radioChangeBorderTop" :compact="true"></enum-data>
        <input-data :defaultValue="borderTop" title="border-top 自定义值" type="text" @confirm="inputChangeBorderTop"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-top: 5px dashed blue 和 10px solid cyan</text>
        <view class="demo-box">
          <native-view class="common" style="border-top: 5px dashed blue;"></native-view>
          <native-view class="common" style="border-top: 10px solid cyan;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderTopEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '1px solid cyan' },
    { value: 3, name: '2px dashed blue' },
    { value: 4, name: '3px dotted yellow' }
  ]

  const borderTop = ref('5px solid purple')
  const borderTopActual = ref('')
  const borderTopActualText = ref('')
  const borderTopActualImage = ref('')
  const borderTopActualFlat = ref('')
  const borderTopActualTextFlat = ref('')
  const borderTopActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderTopActual.value = viewRef.value?.style.getPropertyValue('border-top') ?? ''
    borderTopActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-top') ?? ''
    borderTopActualText.value = textRef.value?.style.getPropertyValue('border-top') ?? ''
    borderTopActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-top') ?? ''
    borderTopActualImage.value = imageRef.value?.style.getPropertyValue('border-top') ?? ''
    borderTopActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-top') ?? ''
  }

  const changeBorderTop = (value: string) => {
    borderTop.value = value
    viewRef.value?.style.setProperty('border-top', value)
    viewRefFlat.value?.style.setProperty('border-top', value)
    textRef.value?.style.setProperty('border-top', value)
    textRefFlat.value?.style.setProperty('border-top', value)
    imageRef.value?.style.setProperty('border-top', value)
    imageRefFlat.value?.style.setProperty('border-top', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderTop = (index: number) => {
    const selectedItem = borderTopEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderTop(selectedItem.name)
    }
  }

  const inputChangeBorderTop = (value: string) => {
    changeBorderTop(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderTop
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
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-top)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-top)

