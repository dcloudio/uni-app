## border-bottom



border-bottom 简写属性把下边框的所有属性：border-bottom-color，border-bottom-style 与 border-bottom-width 设置到了一个声明中。这些属性描述了元素的下边框样式。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-bottom: <line-width> || <line-style> || <color>;
```



### 值限制
- length
- line-width
- line-style
- color




### 默认值 @default-value 
 `0`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-bottom.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-bottom.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-bottom

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-bottom

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>border-bottom: 5px dashed blue</text>
        <view class="demo-box">
          <view class="common" style="border-bottom: 5px dashed blue;"></view>
          <view class="common" style="border-bottom: 5px dashed blue;" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common" style="border-bottom: 5px dashed blue;">
          <text class="common-text">border-bottom: 5px dashed blue</text>
        </scroll-view>
        <scroll-view class="common" style="border-bottom: 10px solid green;">
          <text class="common-text">border-bottom: 10px solid green</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-bottom </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderBottom: borderBottom }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderBottom: borderBottom }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderBottom: borderBottom }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderBottom: borderBottom }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderBottom: borderBottom }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderBottom}}</text>
          <text class="uni-info">获取值: {{borderBottomActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderBottom: borderBottom }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderBottomEnum" title="border-bottom 枚举值" @change="radioChangeBorderBottom" :compact="true"></enum-data>
        <input-data :defaultValue="borderBottom" title="border-bottom 自定义值" type="text" @confirm="inputChangeBorderBottom"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-bottom: 5px dashed blue 和 10px solid green</text>
        <view class="demo-box">
          <native-view class="common" style="border-bottom: 5px dashed blue;"></native-view>
          <native-view class="common" style="border-bottom: 10px solid green;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderBottomEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '1px solid black' },
    { value: 3, name: '2px dashed blue' },
    { value: 4, name: '3px dotted green' }
  ]

  const borderBottom = ref('5px solid purple')
  const borderBottomActual = ref('')
  const borderBottomActualText = ref('')
  const borderBottomActualImage = ref('')
  const borderBottomActualFlat = ref('')
  const borderBottomActualTextFlat = ref('')
  const borderBottomActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderBottomActual.value = viewRef.value?.style.getPropertyValue('border-bottom') ?? ''
    borderBottomActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-bottom') ?? ''
    borderBottomActualText.value = textRef.value?.style.getPropertyValue('border-bottom') ?? ''
    borderBottomActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-bottom') ?? ''
    borderBottomActualImage.value = imageRef.value?.style.getPropertyValue('border-bottom') ?? ''
    borderBottomActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-bottom') ?? ''
  }

  const changeBorderBottom = (value: string) => {
    borderBottom.value = value
    viewRef.value?.style.setProperty('border-bottom', value)
    viewRefFlat.value?.style.setProperty('border-bottom', value)
    textRef.value?.style.setProperty('border-bottom', value)
    textRefFlat.value?.style.setProperty('border-bottom', value)
    imageRef.value?.style.setProperty('border-bottom', value)
    imageRefFlat.value?.style.setProperty('border-bottom', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderBottom = (index: number) => {
    const selectedItem = borderBottomEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderBottom(selectedItem.name)
    }
  }

  const inputChangeBorderBottom = (value: string) => {
    changeBorderBottom(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderBottom
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
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-bottom)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-bottom)

