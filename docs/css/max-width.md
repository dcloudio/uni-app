## max-width



max-width 属性用来给元素设置最大宽度值。定义了 max-width 的元素会在达到 max-width 值之后避免进一步按照 width 属性设置变大。


### uni-app x 兼容性 <Help />
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 |


### App平台拍平（flatten）兼容性 <Help /> @flatten_compatibility

| Android(Vapor) | iOS(Vapor) | HarmonyOS(Vapor) |
| :- | :- | :- |
| 5.21 | 5.11 | 5.0 |



### 语法
```
max-width: <viewport-length>;
```



### 值限制
- length



### max-width 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| fit-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 与 max-content 等价。 |
| max-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素的最大宽度可以扩展到内容的最大宽度。 |
| min-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素的最大宽度限制在内容的最小宽度之内。 |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 浏览器将通过计算为指定元素选择一个 max-width 值。 |
| none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素未设置最大值 |


### 默认值 @default-value 
 `none`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/max-width.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/max-width.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/max-width

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/max-width

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view class="uni-theme-root" style="flex: 1">
  <!-- #endif -->
    <view class="uni-theme-root" style="flex-grow: 1;">
      <view>
        <text>max-width: 200px</text>
        <view class="common" style="max-width: 200px;">
          <text class="cyan-label">width: 400px</text>
        </view>
        <text>拍平</text>
        <view class="common" style="max-width: 200px;" flatten>
          <text class="cyan-label">width: 400px</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="max-width: 100px; background-color: cyan;">
          <text class="scroll-view-label">max-width: 100px</text>
        </scroll-view>
        <scroll-view class="common" style="max-width: 200px; background-color: cyan;">
          <text class="scroll-view-label">max-width: 200px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ maxWidth: data.maxWidth }">
              <text class="cyan-label">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ maxWidth: data.maxWidth }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ maxWidth: data.maxWidth }"
              src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ maxWidth: data.maxWidth }"
              flatten>
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ maxWidth: data.maxWidth }"
              flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.maxWidth}}</text>
          <text class="uni-info">获取值: {{data.maxWidthActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ maxWidth: data.maxWidth }"
              flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="maxWidthEnum" title="max-width 枚举值" @change="radioChangeMaxWidth"
          :compact="true"></enum-data>
        <input-data :defaultValue="data.maxWidth" title="max-width 自定义值" type="text"
          @confirm="inputChangeMaxWidth"></input-data>
      </view>

      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-common-mb">
        <text>native-view组件: max-width: 100px 和 max-width: 200px</text>
        <view class="demo-box-native">
          <view class="container-native">
            <native-view style="max-width: 100px; height: 100px;"></native-view>
          </view>
          <view class="container-native">
            <native-view style="max-width: 200px; height: 100px;"></native-view>
          </view>
        </view>
      </view>
      <!-- #endif -->

    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const maxWidthEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '50px' },
    { value: 4, name: '120px' },
    { value: 5, name: '80rpx' },
    { value: 6, name: 'none' }
  ]

  const data = reactive({
    maxWidth: '100px',
    maxWidthActual: '',
    maxWidthActualText: '',
    maxWidthActualImage: '',
    maxWidthActualFlat: '',
    maxWidthActualTextFlat: '',
    maxWidthActualImageFlat: ''
  })
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.maxWidthActual = viewRef.value?.style.getPropertyValue('max-width') ?? ''
    data.maxWidthActualFlat = viewRefFlat.value?.style.getPropertyValue('max-width') ?? ''
    data.maxWidthActualText = textRef.value?.style.getPropertyValue('max-width') ?? ''
    data.maxWidthActualTextFlat = textRefFlat.value?.style.getPropertyValue('max-width') ?? ''
    data.maxWidthActualImage = imageRef.value?.style.getPropertyValue('max-width') ?? ''
    data.maxWidthActualImageFlat = imageRefFlat.value?.style.getPropertyValue('max-width') ?? ''
  }


  const changeMaxWidth = (value : string) => {
    data.maxWidth = value
    viewRef.value?.style.setProperty('max-width', value)
    viewRefFlat.value?.style.setProperty('max-width', value)
    textRef.value?.style.setProperty('max-width', value)
    textRefFlat.value?.style.setProperty('max-width', value)
    imageRef.value?.style.setProperty('max-width', value)
    imageRefFlat.value?.style.setProperty('max-width', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMaxWidth = (index : number) => {
    const selectedItem = maxWidthEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeMaxWidth(selectedItem.name)
    }
  }

  function inputChangeMaxWidth(value : string) {
    changeMaxWidth(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMaxWidth,
    data
  })
</script>

<style>
  .common {
    width: 400px;
    height: 80px;
    background-color: cyan;
    justify-content: center;
    align-items: center;
  }

  .common-view {
    width: 400px;
    height: 80px;
    background-color: cyan;
  }

  .common-text {
    width: 50px;
    color: #1a1a1a;
  }

  .common-dynamic {
    width: 100px;
    height: 80px;
    background-color: cyan;
    color: #1a1a1a;
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
    margin-top: 10px;
    justify-content: space-around;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
    color: #1a1a1a;
  }

  .cyan-label {
    color: #1a1a1a;
  }

  .demo-box-native {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
    align-items: center;
  }

  .container-native {
    background-color: cyan;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/max-width)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.width.max-width)

