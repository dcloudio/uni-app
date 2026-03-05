## text-overflow



text-overflow CSS 属性用于确定如何提示用户存在隐藏的溢出内容。其形式可以是裁剪、显示一个省略号（“…”）或显示一个自定义字符串。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
text-overflow: [ clip | ellipsis | <string> ]{1,2};
```



### 值限制
- enum



### text-overflow 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| clip | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 默认值。这个关键字会在内容区域的极限处截断文本，因此可能会在单词的中间发生截断。如果你的目标浏览器支持 text-overflow: ''，为了能在两个单词过渡处截断，你可以使用一个空字符串值（''）作为 text-overflow 属性的值。 |
| ellipsis | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 这个关键字会用一个省略号（'…'、U+2026 HORIZONTAL ELLIPSIS）来表示被截断的文本。这个省略号被添加在内容区域中，因此会减少显示的文本。如果空间太小以至于连省略号都容纳不下，那么这个省略号也会被截断。 |


### 默认值 @default-value 
 `clip`

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/text-overflow.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/text-overflow.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/text-overflow

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/text-overflow

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view style="padding: 0 10px; background-color: gray;justify-content: center;">
        <view class="margin-bottom-10">
          <text class="font-weight-bold">text-overflow:clip white-space:nowrap</text>
          <text class="font-size-20" style="text-overflow: clip;white-space: nowrap;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: clip;white-space: nowrap;" flatten>{{multiLineText}}</text>
        </view>
        <view class="margin-bottom-10">
          <text class="font-weight-bold">text-overflow:ellipsis white-space:nowrap</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;">{{singleLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;" flatten>{{singleLineText}}</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;" flatten>{{multiLineText}}</text>
        </view>
        <view class="margin-bottom-10">
          <text class="font-weight-bold">white-space:normal</text>
          <text class="font-size-20" style="white-space: normal;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="white-space: normal;" flatten>{{multiLineText}}</text>
        </view>
        <view class="margin-bottom-10" style="overflow: visible;">
          <text class="font-weight-bold">white-space: nowrap</text>
          <text class="font-size-20" style="white-space: nowrap;align-self: flex-start;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="white-space: nowrap;align-self: flex-start;" flatten>{{multiLineText}}</text>
        </view>
        <view class="margin-bottom-10">
          <text class="font-weight-bold">任意宽度截断（100px、200px、300px）</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 100px;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 100px;" flatten>{{multiLineText}}</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 200px;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 200px;" flatten>{{multiLineText}}</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 300px;">{{multiLineText}}</text>
          <text style="color:#dbd9d9;">拍平版本</text>
          <text class="font-size-20" style="text-overflow: ellipsis;white-space: nowrap;width: 300px;" flatten>{{multiLineText}}</text>
        </view>
         <!-- #ifdef !VUE3-VAPOR && (APP-IOS || APP-ANDROID || APP-HARMONY) -->
        <view class="margin-bottom-10">
          <text class="font-weight-bold">lines:1 text-overflow:ellipsis</text>
          <text class="font-size-20" style="text-overflow: ellipsis; lines: 1;">{{multiLineText}}</text>
        </view>
        <!-- #endif -->

        <view class="margin-bottom-10 uni-common-mt">
          <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 text-overflow </text>
        </view>

        <view class="common-box">
          <!-- 普通版本 -->
          <view class="uni-common-mt">
            <text class="uni-title-text">text-overflow</text>
            <text class="uni-info">设置值: {{textOverflow}}</text>
            <text class="uni-info">获取值: {{textOverflowActual}}</text>
            <view class="test-box">
              <text ref="textRef" class="font-size-14 test-text" :style="{ textOverflow: textOverflow, whiteSpace: 'nowrap', width: '150px' }">{{multiLineText}}</text>
            </view>
          </view>

          <!-- 拍平版本 -->
          <view class="uni-common-mt">
            <text class="uni-title-text">拍平</text>
            <text class="uni-info">设置值: {{textOverflow}}</text>
            <text class="uni-info">获取值: {{textOverflowActualFlat}}</text>
            <view class="test-box">
              <text ref="textRefFlat" class="font-size-14 test-text-flatten" :style="{ textOverflow: textOverflow, whiteSpace: 'nowrap', width: '150px' }" flatten>{{multiLineText}}</text>
            </view>
          </view>
        </view>

        <view class="uni-common-mt uni-common-mb">
            <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
            <enum-data :items="textOverflowEnum" title="text-overflow 枚举值" @change="radioChangeTextOverflow" :compact="true"></enum-data>
            <input-data :defaultValue="textOverflow" title="text-overflow 自定义值" type="text" @confirm="inputChangeTextOverflow"></input-data>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const multiLineText = ref('HBuilderX，轻巧、极速，极客编辑器；uni-app x，终极跨平台方案；uts，大一统语言')
  const singleLineText = ref('uts，大一统语言（单行文本）')

  const textOverflowEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'clip' },
    { value: 2, name: 'ellipsis' }
  ]

  const textOverflow = ref('clip')
  const textOverflowActual = ref('')
  const textOverflowActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    textOverflowActual.value = textRef.value?.style.getPropertyValue('text-overflow') ?? ''
    textOverflowActualFlat.value = textRefFlat.value?.style.getPropertyValue('text-overflow') ?? ''
  }

  const changeTextOverflow = (value: string) => {
    textOverflow.value = value
    textRef.value?.style.setProperty('text-overflow', value)
    textRefFlat.value?.style.setProperty('text-overflow', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeTextOverflow = (index: number) => {
    const selectedItem = textOverflowEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeTextOverflow(selectedItem.name)
    }
  }

  const inputChangeTextOverflow = (value: string) => {
    changeTextOverflow(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeTextOverflow
  })
</script>

<style>
  .font-size-20 {
    font-size: 20px;
  }
  .font-size-14{
    font-size: 14px;
  }

  .font-weight-bold {
    font-weight: bold;
  }

  .margin-bottom-10 {
    margin-bottom: 10px;
  }

  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 160px;
    height: 80px;
    background-color: #cccccc;
    justify-content: center;
    align-items: center;
  }
</style>

```

:::

#### App平台差异
- text-overflow 样式不支持继承
- app 平台无法截断单个字符，即不会出现某个字符只显示一部分的情况


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/text-overflow)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.text-overflow)

