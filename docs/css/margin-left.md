## margin-left



margin-left 属性 设置与元素相关联的盒子模型的左外边距。这个值可以为负值。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
margin-left: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### margin-left 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | auto 关键词表示在当前布局模式下，浏览器根据接收的左边距自动计算出外边距。如果有几组 margin-left 和 margin-right 设置为 auto，那么最后计算的空间分布，会根据 display，float，position 属性，自动生成以下几种情况：<br/>    <br/>      <br/>        <br/>          Value of display<br/>          Value of float<br/>          Value of position<br/>          Computed value of auto<br/>          Comment<br/>        <br/>      <br/>      <br/>        <br/>          inline, inline-block, inline-table<br/>          any<br/>          static or relative<br/>          0<br/>          Inline layout mode<br/>        <br/>        <br/>          block, inline, inline-block, block, table, inline-table, list-item, table-caption<br/>          any<br/>          static or relative<br/>          0, 除非margin-left和 margin-right 同时都设置为 auto。这样的话，元素就被设置为基于父元素居中。<br/>          Block layout mode<br/>        <br/>        <br/>          block, inline, inline-block, block, table, inline-table, list-item, table-caption<br/>          left or right<br/>          static or relative<br/>          0<br/>          Block layout mode (floating element)<br/>        <br/>        <br/>          any table-*, except table-caption<br/>          any<br/>          any<br/>          0<br/>          Internal table-* elements don't have margins, use border-spacing instead<br/>        <br/>        <br/>          any, except flex, inline-flex, or table-*<br/>          any<br/>          fixed or absolute<br/>          0, except if both margin-left and margin-right are set to auto. In this case, it is set to the value centering the border area inside the available width, if fixed.<br/>          Absolutely positioned layout mode<br/>        <br/>        <br/>          flex, inline-flex<br/>          any<br/>          any<br/>          在水平方向上有空余空间的情况下，空余的空间会被平均分给水平方向上写有 margin-left:auto 属性的元素的外边距<br/>          Flexbox layout mode |


### 默认值 @default-value 
 `0`



**注意**

- app平台不支持外边距折叠（上下外边距折叠合并为单个边距，其大小为两个边距中的最大值），折叠规则参考[CSS的外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- HBuilderX3.98以下版本当 position 设置为 fixed 或 absolute 时， margin不支持 auto



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/margin/margin-left.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/margin/margin-left.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/margin/margin-left

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/margin/margin-left

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>margin-left: 25px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-left: 25px;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-left: 25px;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>margin-left: 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-left: 10%;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-left: 10%;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>
      <view>
        <text class="uni-subtitle-text">margin-left: 10% 和 margin-left: 30px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-left: 10%;"></scroll-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-left: 30px;"></scroll-view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 margin-left </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActual}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRef" class="common-view test-view" :style="{ marginLeft: marginLeft }">
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActualText}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRef" class="common-view common-text test-text" :style="{ marginLeft: marginLeft }">text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActualImage}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-image test-image" :style="{ marginLeft: marginLeft }" src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActualFlat}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRefFlat" class="common-view test-view-flatten" :style="{ marginLeft: marginLeft }" flatten>
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActualTextFlat}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRefFlat" class="common-view common-text test-text-flatten" :style="{ marginLeft: marginLeft }" flatten>text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{marginLeft}}</text>
          <text class="uni-info">获取值: {{marginLeftActualImageFlat}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ marginLeft: marginLeft }" flatten src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>
      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="marginLeftEnum" title="margin-left 枚举值" @change="radioChangeMarginLeft" :compact="true"></enum-data>
        <input-data :defaultValue="marginLeft" title="margin-left 自定义值" type="text" @confirm="inputChangeMarginLeft"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: margin-left: 25px 和 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin-left: 25px;"></native-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin-left: 10%;"></native-view>
            <view class="common blue"></view>
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

  const marginLeft = ref('25px')
  const marginLeftActual = ref('')
  const marginLeftActualText = ref('')
  const marginLeftActualImage = ref('')
  const marginLeftActualFlat = ref('')
  const marginLeftActualTextFlat = ref('')
  const marginLeftActualImageFlat = ref('')

  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const marginLeftEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' },
    { value: 6, name: 'auto' }
  ]

  const getPropertyValues = () => {
    marginLeftActual.value = viewRef.value?.style.getPropertyValue('margin-left') ?? ''
    marginLeftActualFlat.value = viewRefFlat.value?.style.getPropertyValue('margin-left') ?? ''
    marginLeftActualText.value = textRef.value?.style.getPropertyValue('margin-left') ?? ''
    marginLeftActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('margin-left') ?? ''
    marginLeftActualImage.value = imageRef.value?.style.getPropertyValue('margin-left') ?? ''
    marginLeftActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('margin-left') ?? ''
  }

  const changeMarginLeft = (value: string) => {
    marginLeft.value = value
    viewRef.value?.style.setProperty('margin-left', value)
    viewRefFlat.value?.style.setProperty('margin-left', value)
    textRef.value?.style.setProperty('margin-left', value)
    textRefFlat.value?.style.setProperty('margin-left', value)
    imageRef.value?.style.setProperty('margin-left', value)
    imageRefFlat.value?.style.setProperty('margin-left', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMarginLeft = (index: number) => {
    const selectedItem = marginLeftEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMarginLeft(selectedItem.name)
    }
  }

  const inputChangeMarginLeft = (value: string) => {
    changeMarginLeft(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMarginLeft
  })
</script>

<style>
  .demo-container {
    flex: 1;
    margin:0 10px;
    height: 180px;
    background-color: gray;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }
  .common {
    height: 50px;
    background-color: green;
  }

  .red {
    background-color: red;
  }

  .blue {
    background-color: blue;
  }

  .green {
    background-color: green;
  }

  .scroll-view-test {
    height: 50px;
  }

  .common-view {
    height: 30px;
    background-color: green;
  }

  .common-text {
    font-size: 12px;
    color: white;
  }

  .common-image {
    width: 30px;
    height: 30px;
    background-color: green;
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

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-left)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.margin-left)

