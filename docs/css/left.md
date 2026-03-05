## left



CSS **left**属性定义了定位元素的左外边距边界与其包含块左边界之间的偏移，非定位元素设置此属性无效。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
left: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### left 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 这个关键字表示：<br/>    <br/>      对于绝对定位元素，元素将忽略此属性而以right属性为准，如果此时设置width: auto，将基于内容需要的宽度设置宽度；如果right也为auto的话，元素的水平位置就是它假如作为静态 (即 static) 元素时该在的位置。<br/>      对于相对定位元素，元素相对正常位置的偏移量将基于right属性；如果right也为auto的话，元素将不会有偏移。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/left.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/left.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/left

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/left

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view style="flex-grow: 1;">
    <view class="uni-common-mb">
      <text class="uni-title-text">left: 20px (距离左边 20px) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="left: 20px;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="left: 20px;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">left: 20rpx (距离左边 20rpx) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="left: 20rpx;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="left: 20rpx;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">left: 20% (距离左边 20%) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="left: 20%;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="left: 20%;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">left: auto (自动，默认左边对齐) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="left: auto;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="left: auto;" flatten></view>
        </view>
      </view>
    </view>

    <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

    <view class="uni-common-mb">
      <text class="uni-subtitle-text">left: 10% 和 left: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <scroll-view class="common" style="left: 10%;"></scroll-view>
        </view>
        <view class="example-box">
          <scroll-view class="common" style="left: 30px;"></scroll-view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 left </text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common test-view" :style="{ left: left }">
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common common-text test-text" :style="{ left: left }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common test-image" :style="{ left: left }" src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common test-view-flatten" :style="{ left: left }" flatten>
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common common-text test-text-flatten" :style="{ left: left }" flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{left}}</text>
        <text class="uni-info">获取值: {{leftActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common test-image-flatten" :style="{ left: left }" flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="leftEnum" title="left 枚举值" @change="radioChangeLeft" :compact="true"></enum-data>
      <input-data :defaultValue="left" title="left 自定义值" type="text" @confirm="inputChangeLeft"></input-data>
    </view>

    <view class="uni-common-mb">
      <text>native-view组件: left: 10% 和 left: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <native-view class="common" style="left: 10%;"></native-view>
        </view>
        <view class="example-box">
          <native-view class="common" style="left: 30px;"></native-view>
        </view>
      </view>
    </view>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const leftEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '10px' },
    { value: 4, name: '20rpx' },
    { value: 5, name: '0%' },
    { value: 6, name: '20%' },
    { value: 7, name: 'auto' }
  ]

  const left = ref('10px')
  const leftActual = ref('')
  const leftActualText = ref('')
  const leftActualImage = ref('')
  const leftActualFlat = ref('')
  const leftActualTextFlat = ref('')
  const leftActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    leftActual.value = viewRef.value?.style.getPropertyValue('left') ?? ''
    leftActualFlat.value = viewRefFlat.value?.style.getPropertyValue('left') ?? ''
    leftActualText.value = textRef.value?.style.getPropertyValue('left') ?? ''
    leftActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('left') ?? ''
    leftActualImage.value = imageRef.value?.style.getPropertyValue('left') ?? ''
    leftActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('left') ?? ''
  }

  const changeLeft = (value: string) => {
    left.value = value
    viewRef.value?.style.setProperty('left', value)
    viewRefFlat.value?.style.setProperty('left', value)
    textRef.value?.style.setProperty('left', value)
    textRefFlat.value?.style.setProperty('left', value)
    imageRef.value?.style.setProperty('left', value)
    imageRefFlat.value?.style.setProperty('left', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeLeft = (index: number) => {
    const selectedItem = leftEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeLeft(selectedItem.name)
    }
  }

  const inputChangeLeft = (value: string) => {
    changeLeft(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeLeft
  })
</script>

<style>
  .example-box {
    position: relative;
    flex: 1;
    height: 60px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin: 0 5px;
  }

  .common {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: cyan;
  }

  .common-text{
    width:50px;
    font-size: 12px;
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
    position: relative;
    width: 100%;
    height: 60px;
    background-color: #e0e0e0;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/left)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.left)

