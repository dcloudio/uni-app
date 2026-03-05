## min-width



min-width 属性为给定元素设置最小宽度。它可以阻止 width 属性的应用值小于 min-width 的值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
min-width: <viewport-length>;
```



### 值限制
- length



### min-width 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| fit-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 等同于 min(max-content, max(min-content, fill-available). |
| max-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 固有首选宽度。 |
| min-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 固有最小宽度 |
| auto | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 用于弹性元素的默认最小宽度。相比其他布局中以0为默认值，auto能为弹性布局指明更合理的默认表现。 |
| none | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素未设置最小值 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 0px |

 **注意**：W3C 默认值为：auto





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/min-width.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/min-width.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/min-width

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/min-width

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>min-width: 250px</text>
        <view class="common" style="min-width: 250px;">
          <text>width: 50px</text>
        </view>
        <text>拍平</text>
        <view class="common" style="min-width: 250px;" flatten>
          <text>width: 50px</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <scroll-view class="common" style="min-width: 100px; background-color: cyan;">
          <text class="scroll-view-label">min-width: 100px</text>
        </scroll-view>
        <scroll-view class="common" style="min-width: 200px; background-color: cyan;">
          <text class="scroll-view-label">min-width: 200px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 min-width </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ minWidth: minWidth }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ minWidth: minWidth }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ minWidth: minWidth }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ minWidth: minWidth }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ minWidth: minWidth }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{minWidth}}</text>
          <text class="uni-info">获取值: {{minWidthActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ minWidth: minWidth }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="minWidthEnum" title="min-width 枚举值" @change="radioChangeMinWidth" :compact="true"></enum-data>
        <input-data :defaultValue="minWidth" title="min-width 自定义值" type="text" @confirm="inputChangeMinWidth"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: min-width: 100px 和 min-width: 200px</text>
        <view class="demo-box">
          <native-view class="common" style="min-width: 100px; background-color: cyan;"></native-view>
          <native-view class="common" style="min-width: 200px; background-color: cyan;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const minWidthEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '80px' },
    { value: 4, name: '120px' },
    { value: 5, name: '80rpx' },
  ]

  const minWidth = ref('100px')
  const minWidthActual = ref('')
  const minWidthActualText = ref('')
  const minWidthActualImage = ref('')
  const minWidthActualFlat = ref('')
  const minWidthActualTextFlat = ref('')
  const minWidthActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    minWidthActual.value = viewRef.value?.style.getPropertyValue('min-width') ?? ''
    minWidthActualFlat.value = viewRefFlat.value?.style.getPropertyValue('min-width') ?? ''
    minWidthActualText.value = textRef.value?.style.getPropertyValue('min-width') ?? ''
    minWidthActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('min-width') ?? ''
    minWidthActualImage.value = imageRef.value?.style.getPropertyValue('min-width') ?? ''
    minWidthActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('min-width') ?? ''
  }

  const changeMinWidth = (value: string) => {
    minWidth.value = value
    viewRef.value?.style.setProperty('min-width', value)
    viewRefFlat.value?.style.setProperty('min-width', value)
    textRef.value?.style.setProperty('min-width', value)
    textRefFlat.value?.style.setProperty('min-width', value)
    imageRef.value?.style.setProperty('min-width', value)
    imageRefFlat.value?.style.setProperty('min-width', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMinWidth = (index: number) => {
    console.log('index',index)
    const selectedItem = minWidthEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMinWidth(selectedItem.name)
    }
  }

  const inputChangeMinWidth = (value: string) => {
    changeMinWidth(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMinWidth
  })

</script>

<style>
  .common {
    width: 50px;
    height: 80px;
    background-color: cyan;
    justify-content: center;
    align-items: center;
  }

  .common-dynamic{
    width: 50px;
    height: 80px;
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
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/min-width)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.min-width)

