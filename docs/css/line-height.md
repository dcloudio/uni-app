## line-height



line-height 属性用于设置多行文本的间距。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
line-height: normal | <number> | <length> | <percentage>;
```



### 值限制
- length
- number



### line-height 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| normal | Web: 4.0; Android: 5.0; iOS: 5.0; HarmonyOS: 5.0; HarmonyOS(Vapor): 5.0 | 由各平台实现，约为 1.2，取决于元素的 font-family。 |


### 默认值 @default-value 
 `normal`

> HBuilderX5.0+ 调整 line-height 默认值为 normal，该值不是固定高度，而是根据字体调节，可保障不会发生行高太小裁剪字体。但在不同平台，由于其默认字体不同，会导致行高的绝对高度有差异。HBuilderX5.0以下版本默认值曾为 1.2em，该值在某些字体下会出现上下边缘裁剪。 如需统一各平台行高绝对值且避免裁剪，请设置1.5em以上的数字。

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [textarea](/component/textarea.md)



### tips
App平台仅支持以像素值（px）、相对像素值（rpx）、无单位和相对元素字体大小单位（em）。不支持百分比。

无单位表示数字值乘以该元素的字体大小，在App平台由于不支持继承，无单位与em单位相同，即 1.5 与 1.5em 效果一致。

**注意**  
Web平台 无单位 和em单位在line-height样式继承自父元素时存在差异：  
- 无单位  
  子元素会用自己的 font-size 乘以这个无单位数值，子元素的字体变大时，行高自动适应  
- em单位  
  父元素先根据自己的 font-size 计算出固定像素值，子元素使用这个固定像素值，如果子元素字体变大，行高保持不变，可能出现文字重叠  


### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/line-height.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/line-height.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/line-height

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/line-height

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <template v-if="autoTestData.begin">
      <view>
        <text id="testText"
          :style="`line-height: ${lineHeight_mix};`">
          uni-app 是一个使用 Vue.js
          开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、鸿蒙Next、Web（响应式）、以及各种小程序（微信/支付宝/百度/抖音/飞书/QQ/快手/钉钉/淘宝/京东/小红书）、快应用、鸿蒙元服务等多个平台。</text>
        <view style="flex-direction: row;">
          <button @click="plusLineHeight">+行高</button>
          <button @click="minusLineHeight">-行高</button>
        </view>
      </view>
    </template>
    <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
    <view class="demo-box">
      <view class="box">
        <text class="common" style="line-height: 75px;">line-height: 75px</text>
        <text class="line-height-3 common">line-height: 3</text>
        <text class="common" style="line-height: 3em;">line-height: 3em</text>
        <text class="common" style="line-height: 3;">line-height: 3\nline-height: 3\nline-height: 3</text>
      </view>
      <view class="box">
        <text class="common" style="line-height: 75px;" flatten>line-height: 75px</text>
        <text class="line-height-3 common" flatten>line-height: 3</text>
        <text class="common" style="line-height: 3em;" flatten>line-height: 3em</text>
        <text class="common" style="line-height: 3;" flatten>line-height: 3\nline-height: 3\nline-height: 3</text>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 line-height </text>
    </view>

    <view class="common-box">
      <!-- 普通版本 -->
      <view class="uni-common-mt">
        <text class="uni-title-text">line-height</text>
        <text class="uni-info">设置值: {{lineHeight}}</text>
        <text class="uni-info">获取值: {{lineHeightActual}}</text>
        <view class="test-box">
          <text ref="textRef" class="common" :style="{ lineHeight: lineHeight }">当前 line-height: {{lineHeight}}</text>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="uni-common-mt">
        <text class="uni-title-text">拍平</text>
        <text class="uni-info">设置值: {{lineHeight}}</text>
        <text class="uni-info">获取值: {{lineHeightActualFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common" :style="{ lineHeight: lineHeight }" flatten>当前 line-height: {{lineHeight}}</text>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="lineHeightEnum" title="line-height 枚举值" @change="radioChangeLineHeight" :compact="true"></enum-data>
        <input-data :defaultValue="lineHeight" title="line-height 自定义值" type="text" @confirm="inputChangeLineHeight"></input-data>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const lineHeightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '1.5' },
    { value: 2, name: '2' },
    { value: 3, name: '25px' },
    { value: 4, name: '50rpx' },
    { value: 5, name: '1.5em' },
    { value: 6, name: '2em' }
  ]

  const lineHeight = ref('20px')
  const lineHeightActual = ref('')
  const lineHeightActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    lineHeightActual.value = textRef.value?.style.getPropertyValue('line-height') ?? ''
    lineHeightActualFlat.value = textRefFlat.value?.style.getPropertyValue('line-height') ?? ''
  }

  const changeLineHeight = (value: string) => {
    lineHeight.value = value
    textRef.value?.style.setProperty('line-height', value)
    textRefFlat.value?.style.setProperty('line-height', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeLineHeight = (index: number) => {
    const selectedItem = lineHeightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeLineHeight(selectedItem.name)
    }
  }

  const inputChangeLineHeight = (value: string) => {
    changeLineHeight(value)
  }


  /**
   * * * * * * * * * * * * * *
   * 自动化测试
   * * * * * * * * * * * * * *
   */
  type AutoTextData = {
    begin: boolean
  }
  const autoTestData = reactive<AutoTextData>({
    begin: false
  } as AutoTextData)

  const lineHeight_mix = ref(1.5)

  function plusLineHeight() {
    lineHeight_mix.value += 0.2
  }
  function minusLineHeight() {
    lineHeight_mix.value -= 0.2
  }
  function getLineHeight() {
    const testText = uni.getElementById('testText')
    if (testText != null) {
      return parseFloat(testText.style.getPropertyValue('line-height'))
    }
    return 0
  }

  defineExpose({
    autoTestData,
    getLineHeight,
    plusLineHeight,
    minusLineHeight
  })
  /**
   * * * * * * * * * * * * * *
   * 自动化测试 END
   * * * * * * * * * * * * * *
   */

  onReady(() => {
    getPropertyValues()
  })
</script>

<style>
  .common {
    font-size: 20px;
    border: 1px cyan solid;
    margin: 10px 0;
    padding: 0 10px;
  }
  .line-height-3 {
    line-height: 3;
  }
  .box{
    height: 500px;
    background-color: gray;
    justify-content: center;
    align-items: center;
    flex:1;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }
  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .test-box {
    width: 180px;
    height: 150px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/line-height)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.line-height)

