## border-right



CSS 属性 border-right 是属性border-right-color, border-right-style, 和border-right-width的三者的缩写。这些属性都是在描述一个元素的右边的边框border。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-right: <line-width> || <line-style> || <color>;
```



### 值限制
- length
- line-width
- line-style
- color




### 默认值 @default-value 
 `0`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-right.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-right.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-right

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-right

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>border-right: 5px solid blue</text>
        <view class="demo-box">
          <view class="common" style="border-right: 5px solid blue;"></view>
          <view class="common" style="border-right: 5px solid blue;" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common" style="border-right: 5px solid blue;">
          <text class="common-text">border-right: 5px solid blue</text>
        </scroll-view>
        <scroll-view class="common" style="border-right: 10px dashed cyan;">
          <text class="common-text">border-right: 10px dashed cyan</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-right </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderRight: borderRight }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderRight: borderRight }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderRight: borderRight }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderRight: borderRight }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderRight: borderRight }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderRight}}</text>
          <text class="uni-info">获取值: {{borderRightActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderRight: borderRight }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderRightEnum" title="border-right 枚举值" @change="radioChangeBorderRight" :compact="true"></enum-data>
        <input-data :defaultValue="borderRight" title="border-right 自定义值" type="text" @confirm="inputChangeBorderRight"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-right: 5px solid blue 和 10px dashed cyan</text>
        <view class="demo-box">
          <native-view class="common" style="border-right: 5px solid blue;"></native-view>
          <native-view class="common" style="border-right: 10px dashed cyan;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderRightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '1px solid cyan' },
    { value: 3, name: '2px dashed blue' },
    { value: 4, name: '3px dotted green' }
  ]

  const borderRight = ref('5px solid pink')
  const borderRightActual = ref('')
  const borderRightActualText = ref('')
  const borderRightActualImage = ref('')
  const borderRightActualFlat = ref('')
  const borderRightActualTextFlat = ref('')
  const borderRightActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderRightActual.value = viewRef.value?.style.getPropertyValue('border-right') ?? ''
    borderRightActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-right') ?? ''
    borderRightActualText.value = textRef.value?.style.getPropertyValue('border-right') ?? ''
    borderRightActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-right') ?? ''
    borderRightActualImage.value = imageRef.value?.style.getPropertyValue('border-right') ?? ''
    borderRightActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-right') ?? ''
  }

  const changeBorderRight = (value: string) => {
    borderRight.value = value
    viewRef.value?.style.setProperty('border-right', value)
    viewRefFlat.value?.style.setProperty('border-right', value)
    textRef.value?.style.setProperty('border-right', value)
    textRefFlat.value?.style.setProperty('border-right', value)
    imageRef.value?.style.setProperty('border-right', value)
    imageRefFlat.value?.style.setProperty('border-right', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderRight = (index: number) => {
    const selectedItem = borderRightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderRight(selectedItem.name)
    }
  }

  const inputChangeBorderRight = (value: string) => {
    changeBorderRight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderRight
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
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-right)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-right)

