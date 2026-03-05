## font-style



font-style 属性用于设置字体样式。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
font-style: normal | italic | oblique <angle>{0,2};
```



### 值限制
- enum



### font-style 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| italic | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 选择斜体，如果当前字体没有可用的斜体版本，会选用倾斜体（oblique ）替代。 |
| normal | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 选择 font-family 的常规字体。 |


### 默认值 @default-value 
 `normal`

### 适用组件 @unix-tags 
 - [text](/component/text.md)
- [button](/component/button.md)
- [input](/component/input.md)
- [textarea](/component/textarea.md)



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/text/font-style.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/text/font-style.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/text/font-style

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/text/font-style

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view class="demo-box">
        <view class="common">
          <text class="common-size" style="font-style: italic;">font-style: italic</text>
          <text class="common-size" style="font-style: normal;">font-style: normal</text>
        </view>
        <view class="common">
          <text class="common-size" style="font-style: italic;" flatten>font-style: italic</text>
          <text class="common-size" style="font-style: normal;" flatten>font-style: normal</text>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 font-style 测试</text>
      </view>

      <view class="common-box">
        <!-- 普通版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">font-style</text>
          <text class="uni-info">设置值: {{fontStyle}}</text>
          <text class="uni-info">获取值: {{fontStyleActual}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-size test-text" :style="{ fontStyle: fontStyle }">当前 font-style: {{fontStyle}}</text>
          </view>
        </view>

        <!-- 拍平版本 -->
        <view class="uni-common-mt">
          <text class="uni-title-text">测试拍平</text>
          <text class="uni-info">设置值: {{fontStyle}}</text>
          <text class="uni-info">获取值: {{fontStyleActualFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-size test-text-flatten" :style="{ fontStyle: fontStyle }" flatten>当前 font-style: {{fontStyle}}</text>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
          <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
          <enum-data :items="fontStyleEnum" title="font-style 枚举值" @change="radioChangeFontStyle" :compact="true"></enum-data>
          <input-data :defaultValue="fontStyle" title="font-style 自定义值" type="text" @confirm="inputChangeFontStyle"></input-data>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const fontStyleEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'normal' },
    { value: 2, name: 'italic' }
  ]

  const fontStyle = ref('normal')
  const fontStyleActual = ref('')
  const fontStyleActualFlat = ref('')
  const textRef = ref(null as UniTextElement | null)
  const textRefFlat = ref(null as UniTextElement | null)

  const getPropertyValues = () => {
    fontStyleActual.value = textRef.value?.style.getPropertyValue('font-style') ?? ''
    fontStyleActualFlat.value = textRefFlat.value?.style.getPropertyValue('font-style') ?? ''
  }

  const changeFontStyle = (value: string) => {
    fontStyle.value = value
    textRef.value?.style.setProperty('font-style', value)
    textRefFlat.value?.style.setProperty('font-style', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeFontStyle = (index: number) => {
    const selectedItem = fontStyleEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeFontStyle(selectedItem.name)
    }
  }

  const inputChangeFontStyle = (value: string) => {
    changeFontStyle(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeFontStyle
  })
</script>

<style>
  .common-size {
    font-size: 20px;
  }
  .common{
    height: 100px;
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
    height: 80px;
    background-color: gray;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::

#### App平台差异
- app平台 font-style 样式不支持继承


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/font-style)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.font-style)

