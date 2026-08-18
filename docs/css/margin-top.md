## margin-top



margin-top CSS 属性用于设置元素的顶部外边距外边距区域。正值使它离相邻元素更远，而负值使它更靠近相邻元素。


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
margin-top: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### margin-top 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 浏览器选择一个合适的值来使用。参见 margin。 |


### 默认值 @default-value 
 `0`



**注意**

- app平台不支持外边距折叠（上下外边距折叠合并为单个边距，其大小为两个边距中的最大值），折叠规则参考[CSS的外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- HBuilderX3.98以下版本当 position 设置为 fixed 或 absolute 时， margin不支持 auto



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/margin/margin-top.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/margin/margin-top.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/margin/margin-top

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/margin/margin-top

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>margin-top: 25px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-top: 25px;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-top: 25px;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>margin-top: 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-top: 10%;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-top: 10%;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>
      <view>
        <text class="uni-subtitle-text">margin-top: 10% 和 margin-top: 30px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-top: 10%;"></scroll-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-top: 30px;"></scroll-view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActual}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRef" class="common-view test-view" :style="{ marginTop: data.marginTop }">
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActualText}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRef" class="common-view common-text test-text" :style="{ marginTop: data.marginTop }">text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActualImage}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-image test-image" :style="{ marginTop: data.marginTop }" src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActualFlat}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRefFlat" class="common-view test-view-flatten" :style="{ marginTop: data.marginTop }" flatten>
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActualTextFlat}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRefFlat" class="common-view common-text test-text-flatten" :style="{ marginTop: data.marginTop }" flatten>text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.marginTop}}</text>
          <text class="uni-info">获取值: {{data.marginTopActualImageFlat}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ marginTop: data.marginTop }" flatten src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="marginTopEnum" title="margin-top 枚举值" @change="radioChangeMarginTop" :compact="true"></enum-data>
        <input-data :defaultValue="data.marginTop" title="margin-top 自定义值" type="text" @confirm="inputChangeMarginTop"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: margin-top: 25px 和 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <test-native-view class="common" style="margin-top: 25px;"></test-native-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <test-native-view class="common" style="margin-top: 10%;"></test-native-view>
            <view class="common blue"></view>
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

  const data = reactive({
    marginTop: '25px',
    marginTopActual: '',
    marginTopActualText: '',
    marginTopActualImage: '',
    marginTopActualFlat: '',
    marginTopActualTextFlat: '',
    marginTopActualImageFlat: ''
  })

  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const marginTopEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' },
    { value: 6, name: 'auto' }
  ]

  const getPropertyValues = () => {
    data.marginTopActual = viewRef.value?.style.getPropertyValue('margin-top') ?? ''
    data.marginTopActualFlat = viewRefFlat.value?.style.getPropertyValue('margin-top') ?? ''
    data.marginTopActualText = textRef.value?.style.getPropertyValue('margin-top') ?? ''
    data.marginTopActualTextFlat = textRefFlat.value?.style.getPropertyValue('margin-top') ?? ''
    data.marginTopActualImage = imageRef.value?.style.getPropertyValue('margin-top') ?? ''
    data.marginTopActualImageFlat = imageRefFlat.value?.style.getPropertyValue('margin-top') ?? ''
  }


  const changeMarginTop = (value: string) => {
    data.marginTop = value
    viewRef.value?.style.setProperty('margin-top', value)
    viewRefFlat.value?.style.setProperty('margin-top', value)
    textRef.value?.style.setProperty('margin-top', value)
    textRefFlat.value?.style.setProperty('margin-top', value)
    imageRef.value?.style.setProperty('margin-top', value)
    imageRefFlat.value?.style.setProperty('margin-top', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMarginTop = (index: number) => {
    const selectedItem = marginTopEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMarginTop(selectedItem.name)
    }
  }

  const inputChangeMarginTop = (value: string) => {
    changeMarginTop(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMarginTop,
    data
  })
</script>

<style>
  .demo-container {
    flex:1;
    margin:0 10px;
    height: 220px;
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
    height: 140px;
    background-color: gray;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-top)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.margin.margin-top)

