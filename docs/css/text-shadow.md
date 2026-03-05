## text-shadow



text-shadow 为文字添加阴影。可以为文字与 decoration 添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在 X 和 Y 方向的偏移量、模糊半径和颜色值组成。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 4.61 | 4.61 | 4.61 | 5.0 |






### 语法
```
text-shadow: none | [ <color>? && <length>{2,3} ]#;
```



### 值限制
- color
- length



### text-shadow 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android: 4.61; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | No shadow. |


### 默认值 @default-value 
 `none`

阴影颜色默认值为文本颜色，模糊半径默认值为0。

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/text-shadow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/text-shadow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/text-shadow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/text-shadow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view class="container">
      <text class="text" style="text-shadow: 1px 1px 2px pink;">text-shadow: 1px 1px 2px pink</text>
      <text class="text" style="text-shadow: #fc0 1px 0 10px;">text-shadow: #fc0 1px 0 10px</text>
      <text class="text" style="text-shadow: 5px 5px #558abb;">text-shadow: 5px 5px #558abb</text>
      <text class="text" style="text-shadow: cyan 2px 5px;">text-shadow: cyan 2px 5px</text>
      <text class="text" style="text-shadow: 5px 10px;">text-shadow: 5px 10px</text>
      <text class="text" style="text-shadow: 1px 2px 4px rgb(34, 202, 43);">text-shadow: 1px 2px 4px rgb(34, 202, 43)</text>
      <text class="text" style="text-shadow: 2px 4px rgba(202, 207, 17, 0.5);">text-shadow: 2px 4px rgba(202, 207, 17, 0.5)</text>

      <text class="uni-title-text">【拍平版本】</text>
      <text class="text" style="text-shadow: 1px 1px 2px pink;" flatten>text-shadow: 1px 1px 2px pink</text>
      <text class="text" style="text-shadow: #fc0 1px 0 10px;" flatten>text-shadow: #fc0 1px 0 10px</text>
      <text class="text" style="text-shadow: 5px 5px #558abb;" flatten>text-shadow: 5px 5px #558abb</text>
      <text class="text" style="text-shadow: cyan 2px 5px;" flatten>text-shadow: cyan 2px 5px</text>
      <text class="text" style="text-shadow: 5px 10px;" flatten>text-shadow: 5px 10px</text>
      <text class="text" style="text-shadow: 1px 2px 4px rgb(34, 202, 43);" flatten>text-shadow: 1px 2px 4px rgb(34, 202, 43)</text>
      <text class="text" style="text-shadow: 2px 4px rgba(202, 207, 17, 0.5);" flatten>text-shadow: 2px 4px rgba(202, 207, 17, 0.5)</text>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 text-shadow </text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">text-shadow</text>
          <text class="uni-info">设置值: {{textShadow}}</text>
          <text class="uni-info">获取值: {{textShadowActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="text test-text" :style="{ textShadow: textShadow }">当前 text-shadow: {{textShadow}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">拍平</text>
          <text class="uni-info">设置值: {{textShadow}}</text>
          <text class="uni-info">获取值: {{textShadowActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="text test-text-flatten" :style="{ textShadow: textShadow }" flatten>当前 text-shadow: {{textShadow}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="textShadowEnum" title="text-shadow 枚举值" @change="radioChangeTextShadow" :compact="true"></enum-data>
        <input-data :defaultValue="textShadow" title="text-shadow 自定义值" type="text" @confirm="inputChangeTextShadow"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const textShadowEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '1px 1px 2px pink' },
    { value: 2, name: '#fc0 1px 0 10px' },
    { value: 3, name: '5px 5px #558abb' },
    { value: 4, name: 'cyan 2px 5px' },
    { value: 5, name: '5px 10px' },
    { value: 6, name: '1px 2px 4px rgb(34, 202, 43)' },
    { value: 7, name: '2px 4px rgba(202, 207, 17, 0.5)' }
  ]

  const textShadow = ref('1px 1px 2px pink')
  const textShadowActual = ref('')
  const textShadowActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    textShadowActual.value = textRef.value?.style.getPropertyValue('text-shadow') ?? ''
    textShadowActualFlat.value = textRefFlat.value?.style.getPropertyValue('text-shadow') ?? ''
  }

  const changeTextShadow = (value: string) => {
    textShadow.value = value
    textRef.value?.style.setProperty('text-shadow', value)
    textRefFlat.value?.style.setProperty('text-shadow', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeTextShadow = (index: number) => {
    const selectedItem = textShadowEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeTextShadow(selectedItem.name)
    }
  }

  const inputChangeTextShadow = (value: string) => {
    changeTextShadow(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeTextShadow
  })
</script>

<style>
  .container {
    background-color: gray;
    justify-content: center;
  }

  .text {
    width: 100%;
    height: 50px;
    font-size: 20px;
    text-align: center;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 80px;
    background-color: #cccccc;
    justify-content: center;
    align-items: center;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-shadow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text-shadow)

