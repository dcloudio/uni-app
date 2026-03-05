## box-sizing



CSS 中的 box-sizing 属性定义了 user agent 应该如何计算一个元素的总宽度和总高度。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
box-sizing: content-box | border-box;
```



### 值限制
- enum



### box-sizing 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| content-box | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 默认值，标准盒子模型。width 与 height 只包括内容的宽和高，不包括边框（border），内边距（padding），外边距（margin）。注意：内边距、边框和外边距都在这个盒子的外部。比如说，.box {width: 350px; border: 10px solid black;} 在浏览器中的渲染的实际宽度将是 370px。<br/>    尺寸计算公式：<br/>    <br/>      width = 内容的宽度<br/>      height = 内容的高度<br/>    <br/>    宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。 |
| border-box | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | width 和 height 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks 模式 时 Internet Explorer 使用的盒模型。注意，填充和边框将在盒子内 , 例如， .box {width: 350px; border: 10px solid black;} 导致在浏览器中呈现的宽度为 350px 的盒子。内容框不能为负，并且被分配到 0，使得不可能使用 border-box 使元素消失。<br/>    尺寸计算公式：<br/>    <br/>      width = border + padding + 内容的宽度<br/>      height = border + padding + 内容的高度 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | border-box |

 **注意**：W3C 默认值为：content-box





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/box-sizing/box-sizing.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/box-sizing/box-sizing.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/box-sizing/box-sizing

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/box-sizing/box-sizing

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view style="flex-grow: 1;">
    <view>
      <text class="desc-text">content-box（标准盒模型，默认值）</text>
      <text class="help-text">width 只包括内容宽度，padding 和 border 在盒子外部向外扩展</text>
      <text class="help-text">设置 width: 100px, padding: 10px, border: 10px</text>
    </view>

    <view class="uni-common-mt">
      <view class="compare-container">
        <view class="compare-box" style="box-sizing: content-box;">
          <text class="box-label">content-box</text>
          <text class="box-info">内容区: 100px</text>
        </view>
      </view>
      <text class="calc-text">实际占用宽度 = 100(内容) + 20(padding) + 20(border) = 140px</text>
    </view>

    <view class="uni-common-mt">
      <text class="help-text">拍平</text>
      <view class="compare-container">
        <view class="compare-box" style="box-sizing: content-box;" flatten>
          <text class="box-label">content-box 拍平</text>
          <text class="box-info">内容区: 100px</text>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="desc-text">border-box</text>
      <text class="help-text">width 包括 border + padding + 内容，padding 和 border 在盒子内部向内挤压</text>
      <text class="help-text">设置 width: 100px, padding: 10px, border: 10px</text>
    </view>

    <view class="uni-common-mt">
      <view class="compare-container">
        <view class="compare-box" style="box-sizing: border-box;">
          <text class="box-label">border-box</text>
          <text class="box-info">内容区: 60px</text>
        </view>
      </view>
      <text class="calc-text">实际占用宽度 = 100px（width 设置值）</text>
      <text class="calc-text">内容宽度 = 100 - 20(padding) - 20(border) = 60px</text>
    </view>

    <view class="uni-common-mt">
      <text class="help-text">拍平</text>
      <view class="compare-container">
        <view class="compare-box" style="box-sizing: border-box;" flatten>
          <text class="box-label">border-box 拍平</text>
          <text class="box-info">内容区: 60px</text>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="title-text">并排对比（左：content-box 140px，右：border-box 100px）</text>
      <text class="help-text">设置 width: 100px, padding: 10px, border: 10px</text>
    </view>

    <view class="uni-common-mt side-by-side">
      <view class="compare-box" style="box-sizing: content-box;">
        <text class="box-label-small">content-box</text>
      </view>
      <view class="compare-box" style="box-sizing: border-box; margin-left: 10px;">
        <text class="box-label-small">border-box</text>
      </view>
    </view>

    <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
    <text class="help-text">设置 width: 100px, padding: 10px, border: 10px</text>
    <view class="demo-box">
      <scroll-view class="common scroll-view-box-sizing" style="box-sizing: content-box;">
        <text class="box-label-small">content-box</text>
      </scroll-view>
      <scroll-view class="common scroll-view-box-sizing" style="box-sizing: border-box;">
        <text class="box-label-small">border-box</text>
      </scroll-view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 box-sizing </text>
      <text class="help-text">设置 width: 60px, padding: 10px, border: 10px</text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common" :style="{ boxSizing: boxSizing }">
            <text class="common-text font-size-12">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common font-size-12" :style="{ boxSizing: boxSizing }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common" :style="{ boxSizing: boxSizing }" src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common" :style="{ boxSizing: boxSizing }" flatten>
            <text class="common-text font-size-12">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common font-size-12" :style="{ boxSizing: boxSizing }" flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{boxSizing}}</text>
        <text class="uni-info">获取值: {{boxSizingActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common" :style="{ boxSizing: boxSizing }" flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="boxSizingEnum" title="box-sizing 枚举值" @change="radioChangeBoxSizing" :compact="true"></enum-data>
      <input-data :defaultValue="boxSizing" title="box-sizing 自定义值" type="text" @confirm="inputChangeBoxSizing"></input-data>
    </view>

    <view class="uni-common-mb">
      <text>native-view组件: box-sizing: content-box 和 border-box</text>
      <text class="help-text">设置 width: 100px, padding: 10px, border: 10px</text>
      <view class="demo-box">
        <native-view class="scroll-view-box-sizing" style="box-sizing: content-box;"></native-view>
        <native-view class="scroll-view-box-sizing" style="box-sizing: border-box;"></native-view>
      </view>
    </view>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const boxSizingEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'content-box' },
    { value: 2, name: 'border-box' }
  ]

  const boxSizing = ref('content-box')
  const boxSizingActual = ref('')
  const boxSizingActualText = ref('')
  const boxSizingActualImage = ref('')
  const boxSizingActualFlat = ref('')
  const boxSizingActualTextFlat = ref('')
  const boxSizingActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    boxSizingActual.value = viewRef.value?.style.getPropertyValue('box-sizing') ?? ''
    boxSizingActualFlat.value = viewRefFlat.value?.style.getPropertyValue('box-sizing') ?? ''
    boxSizingActualText.value = textRef.value?.style.getPropertyValue('box-sizing') ?? ''
    boxSizingActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('box-sizing') ?? ''
    boxSizingActualImage.value = imageRef.value?.style.getPropertyValue('box-sizing') ?? ''
    boxSizingActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('box-sizing') ?? ''
  }

  const changeBoxSizing = (value: string) => {
    boxSizing.value = value
    viewRef.value?.style.setProperty('box-sizing', value)
    viewRefFlat.value?.style.setProperty('box-sizing', value)
    textRef.value?.style.setProperty('box-sizing', value)
    textRefFlat.value?.style.setProperty('box-sizing', value)
    imageRef.value?.style.setProperty('box-sizing', value)
    imageRefFlat.value?.style.setProperty('box-sizing', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBoxSizing = (index: number) => {
    const selectedItem = boxSizingEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBoxSizing(selectedItem.name)
    }
  }

  const inputChangeBoxSizing = (value: string) => {
    changeBoxSizing(value)
  }

  onReady(() => {
    getPropertyValues()
  })
</script>

<style>
  .desc-text {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    line-height: 22px;
  }

  .title-text {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }

  .help-text {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
    line-height: 18px;
  }

  .calc-text {
    font-size: 13px;
    color: #ff6b6b;
    font-weight: bold;
    margin-top: 5px;
    line-height: 20px;
  }

  .side-by-side {
    flex-direction: row;
    align-items: flex-start;
  }

  .compare-container {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px dashed #999;
  }

  .compare-box {
    width: 100px;
    height: 80px;
    padding: 10px;
    border: 10px solid cyan;
    background-color: #4ecdc4;
    justify-content: center;
    align-items: center;
  }

  .box-label {
    font-size: 13px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }

  .box-label-small {
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }

  .box-info {
    font-size: 10px;
    color: #fff;
    text-align: center;
    margin-top: 3px;
  }

  .common {
    width: 60px;
    height: 60px;
    background-color: cyan;
    padding: 10px;
    border: 10px solid #d8dde5;
  }

  .common-text {
    width: 50px;
  }
  .font-size-12{
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
    width: 100%;
    height: 100px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }

  .scroll-view-box-sizing {
    width: 100px;
    height: 80px;
    padding: 10px;
    border: 10px solid cyan;
    background-color: #4ecdc4;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/box-sizing)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.box-sizing)

