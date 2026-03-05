## max-height



CSS属性 max-height 设置元素的最大高度。它防止height属性的使用值（used value）大于 max-height 的指定值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
max-height: <viewport-length>;
```



### 值限制
- length



### max-height 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| fit-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素的最大高度根据内容可用高度自适应，当不会超过内容的最大高度 `max-content` 值。 |
| max-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素的最大高度可以扩展到内容的最大高度。 |
| min-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素的最大高度限制在内容的最小高度之内。 |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素的高度可以根据其内容的高度自动扩展，但仍然受到其他相关属性（如 `height` 和 `min-height`）的影响。如果没有其他限制，元素的高度将扩展以适应内容。 |
| none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素的高度不再受到任何最大高度的限制，即使元素的内容很多，也会根据内容的大小来自动扩展。 |


### 默认值 @default-value 
 `none`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/max-height.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/max-height.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/max-height

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/max-height

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>max-height: 100px</text>
        <view class="common" style="max-height: 100px;">
          <text>height: 400px</text>
        </view>
        <text>拍平</text>
        <view class="common" style="max-height: 100px;" flatten>
          <text>height: 400px</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="max-height: 80px; background-color: cyan;width:100px;">
          <text class="scroll-view-label">max-height: 80px</text>
        </scroll-view>
        <scroll-view class="common" style="max-height: 120px; background-color: cyan;width:100px;">
          <text class="scroll-view-label">max-height: 120px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 max-height </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ maxHeight: maxHeight }">
              <text style="font-size: 12px;">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ maxHeight: maxHeight }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ maxHeight: maxHeight }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ maxHeight: maxHeight }" flatten>
              <text style="font-size: 12px;">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ maxHeight: maxHeight }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{maxHeight}}</text>
          <text class="uni-info">获取值: {{maxHeightActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ maxHeight: maxHeight }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="maxHeightEnum" title="max-height 枚举值" @change="radioChangeMaxHeight" :compact="true"></enum-data>
        <input-data :defaultValue="maxHeight" title="max-height 自定义值" type="text" @confirm="inputChangeMaxHeight"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: max-height: 80px 和 max-height: 120px</text>
        <view class="demo-box">
          <native-view class="common" style="max-height: 80px; background-color: cyan;width:100px;"></native-view>
          <native-view class="common" style="max-height: 120px; background-color: cyan;width:100px;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const maxHeightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '100px' },
    { value: 4, name: '150px' },
    { value: 5, name: '80rpx' },
    { value: 6, name: 'none' }
  ]

  const maxHeight = ref('50px')
  const maxHeightActual = ref('')
  const maxHeightActualText = ref('')
  const maxHeightActualImage = ref('')
  const maxHeightActualFlat = ref('')
  const maxHeightActualTextFlat = ref('')
  const maxHeightActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    maxHeightActual.value = viewRef.value?.style.getPropertyValue('max-height') ?? ''
    maxHeightActualFlat.value = viewRefFlat.value?.style.getPropertyValue('max-height') ?? ''
    maxHeightActualText.value = textRef.value?.style.getPropertyValue('max-height') ?? ''
    maxHeightActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('max-height') ?? ''
    maxHeightActualImage.value = imageRef.value?.style.getPropertyValue('max-height') ?? ''
    maxHeightActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('max-height') ?? ''
  }

  const changeMaxHeight = (value: string) => {
    maxHeight.value = value
    viewRef.value?.style.setProperty('max-height', value)
    viewRefFlat.value?.style.setProperty('max-height', value)
    textRef.value?.style.setProperty('max-height', value)
    textRefFlat.value?.style.setProperty('max-height', value)
    imageRef.value?.style.setProperty('max-height', value)
    imageRefFlat.value?.style.setProperty('max-height', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMaxHeight = (index: number) => {
    const selectedItem = maxHeightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMaxHeight(selectedItem.name)
    }
  }

  const inputChangeMaxHeight = (value: string) => {
    changeMaxHeight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMaxHeight
  })
</script>

<style>
  .common {
    width: 200px;
    height: 400px;
    background-color: cyan;
    justify-content: center;
    align-items: center;
  }

  .common-dynamic {
    width: 100px;
    height: 150px;
    background-color: cyan;
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
    height: 150px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-height)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.max-height)

