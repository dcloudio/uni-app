## min-height



CSS 属性 min-height 能够设置元素的最小高度。这样能够防止 height 属性的应用值小于 min-height 的值。


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
min-height: <viewport-length>;
```



### 值限制
- length



### min-height 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| fit-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素的高度将自动调整为适应内容的大小，但不会小于内容的最小高度 `min-content` 值。 |
| max-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素的最小高度不会小于内容的最大高度。 |
| min-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 元素的最小高度不会小于内容的最小高度。 |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 浏览器将通过计算为指定元素选择一个 min-height 值。 |
| none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 不限制盒容器的尺寸。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 0px |

 **注意**：W3C 默认值为：auto





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/min-height.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/min-height.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/min-height

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/min-height

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>min-height: 150px</text>
        <view class="common" style="min-height: 150px;">
          <text>height: 50px</text>
        </view>
        <text>拍平</text>
        <view class="common" style="min-height: 150px;" flatten>
          <text>height: 50px</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="min-height: 100px; background-color: cyan;width:100px;">
          <text class="scroll-view-label">min-height: 100px</text>
        </scroll-view>
        <scroll-view class="common" style="min-height: 150px; background-color: cyan;width:100px;">
          <text class="scroll-view-label">min-height: 150px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ minHeight: data.minHeight }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ minHeight: data.minHeight }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ minHeight: data.minHeight }"
              src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ minHeight: data.minHeight }"
              flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ minHeight: data.minHeight }"
              flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.minHeight}}</text>
          <text class="uni-info">获取值: {{data.minHeightActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ minHeight: data.minHeight }"
              flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="minHeightEnum" title="min-height 枚举值" @change="radioChangeMinHeight"
          :compact="true"></enum-data>
        <input-data :defaultValue="data.minHeight" title="min-height 自定义值" type="text"
          @confirm="inputChangeMinHeight"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: min-height: 100px 和 min-height: 150px</text>
        <view class="demo-box-native">
          <view class="container-native">
            <native-view style="min-height: 100px; width:100px; height: 50px;"></native-view>
          </view>
          <view class="container-native">
            <native-view style="min-height: 150px; width:100px; height: 50px;"></native-view>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const minHeightEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '50px' },
    { value: 4, name: '150px' },
    { value: 5, name: '80rpx' },
  ]

  const data = reactive({
    minHeight: '100px',
    minHeightActual: '',
    minHeightActualText: '',
    minHeightActualImage: '',
    minHeightActualFlat: '',
    minHeightActualTextFlat: '',
    minHeightActualImageFlat: ''
  })
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.minHeightActual = viewRef.value?.style.getPropertyValue('min-height') ?? ''
    data.minHeightActualFlat = viewRefFlat.value?.style.getPropertyValue('min-height') ?? ''
    data.minHeightActualText = textRef.value?.style.getPropertyValue('min-height') ?? ''
    data.minHeightActualTextFlat = textRefFlat.value?.style.getPropertyValue('min-height') ?? ''
    data.minHeightActualImage = imageRef.value?.style.getPropertyValue('min-height') ?? ''
    data.minHeightActualImageFlat = imageRefFlat.value?.style.getPropertyValue('min-height') ?? ''
  }


  const changeMinHeight = (value : string) => {
    data.minHeight = value
    viewRef.value?.style.setProperty('min-height', value)
    viewRefFlat.value?.style.setProperty('min-height', value)
    textRef.value?.style.setProperty('min-height', value)
    textRefFlat.value?.style.setProperty('min-height', value)
    imageRef.value?.style.setProperty('min-height', value)
    imageRefFlat.value?.style.setProperty('min-height', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMinHeight = (index : number) => {
    const selectedItem = minHeightEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeMinHeight(selectedItem.name)
    }
  }

  const inputChangeMinHeight = (value : string) => {
    changeMinHeight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMinHeight,
    data
  })
</script>

<style>
  .common {
    width: 200px;
    height: 50px;
    background-color: cyan;
    justify-content: center;
    align-items: center;
  }

  .common-dynamic {
    width: 100px;
    height: 50px;
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


#### App平台
在App端为了优化文字排版性能，不支持 auto、none、max-content、min-content、fit-content，默认值为0px。

#### Web规范
默认值为 auto，通过计算选择一个 min-height 值。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-height)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.height.min-height)

