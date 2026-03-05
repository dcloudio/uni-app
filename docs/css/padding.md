## padding



padding CSS 简写属性控制元素所有四条边的内边距区域。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
padding: [ <length> | <percentage> ]{1,4};
```



### 值限制
- length
- percentage










### 注意
- app-ios平台不支持slider、switch、web-view、image 组件

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/padding/padding.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/padding/padding.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/padding/padding

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/padding/padding

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>padding: 25px</text>
        <view class="demo-box">
          <view class="common" style="padding: 25px;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding: 25px;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view>
        <text>padding: 5%</text>
        <view class="demo-box">
          <view class="common" style="padding: 5%;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding: 5%;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>
      <view>
        <text>text组件: padding: 25px</text>
        <view class="demo-box">
          <text class="text-padding" style="padding: 25px;">文本</text>
          <text class="text-padding" style="padding: 25px;" flatten>文本</text>
        </view>
      </view>
      <view>
        <text>text组件: padding: 5%</text>
        <view class="demo-box">
          <text class="text-padding" style="padding: 5%;">文本</text>
          <text class="text-padding" style="padding: 5%;" flatten>文本</text>
        </view>
      </view>
      <view>
        <text>image组件: padding: 25px</text>
        <view class="demo-box">
          <image class="image-padding" style="padding: 25px;" src="/static/test-image/logo.png"></image>
          <image class="image-padding" style="padding: 25px;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>
      <view>
        <text>image组件: padding: 5%</text>
        <view class="demo-box">
          <image class="image-padding" style="padding: 5%;" src="/static/test-image/logo.png"></image>
          <image class="image-padding" style="padding: 5%;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 padding </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ padding: padding }">
              <view style="flex-grow: 1;background-color: cyan;">
                <text class="common-text">view</text>
              </view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic common-text test-text" :style="{ padding: padding }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ padding: padding }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ padding: padding }" flatten>
              <view style="flex-grow: 1;background-color: cyan;">
                <text class="common-text">view</text>
              </view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic common-text test-text-flatten" :style="{ padding: padding }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ padding: padding }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件 padding </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-info">设置值: {{padding}}</text>
          <text class="uni-info">获取值: {{paddingActualScrollView}}</text>
          <view class="test-box" style="height: 150px;">
            <scroll-view ref="scrollViewRef" class="common-scroll-view" :style="{ padding: padding }">
              <view class="scroll-view-content">
                <text class="common-text">scroll-view1</text>
              </view>
              <view class="scroll-view-content">
                <text class="common-text">scroll-view2</text>
              </view>
              <view class="scroll-view-content">
                <text class="common-text">scroll-view3</text>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="paddingEnum" title="padding 枚举值" @change="radioChangePadding" :compact="true"></enum-data>
        <input-data :defaultValue="padding" title="padding 自定义值" type="text" @confirm="inputChangePadding"></input-data>
      </view>
    </view>

    <view>
      <text>native-view组件: padding: 30px 和 padding: 30%</text>
      <text class="uni-tips">说明：cyan 背景色区域的大小即为 padding 的值，灰色区域为容器背景</text>
      <view class="demo-box" style="margin:20px;">
        <view class="native-view-container-large">
          <native-view class="cyan" style="padding: 30px;"></native-view>
        </view>
        <view class="native-view-container-large">
          <native-view class="cyan" style="padding: 30%;"></native-view>
        </view>
      </view>
    </view>

  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const padding = ref('20px')
  const paddingActual = ref('')
  const paddingActualText = ref('')
  const paddingActualImage = ref('')
  const paddingActualFlat = ref('')
  const paddingActualTextFlat = ref('')
  const paddingActualImageFlat = ref('')
  const paddingActualScrollView = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)
  const scrollViewRef = ref(null as UniElement | null)

  const paddingEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '10px' },
    { value: 4, name: '0%' },
    { value: 5, name: '5%' }
  ]

  const getPropertyValues = () => {
    paddingActual.value = viewRef.value?.style.getPropertyValue('padding') ?? ''
    paddingActualFlat.value = viewRefFlat.value?.style.getPropertyValue('padding') ?? ''
    paddingActualText.value = textRef.value?.style.getPropertyValue('padding') ?? ''
    paddingActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('padding') ?? ''
    paddingActualImage.value = imageRef.value?.style.getPropertyValue('padding') ?? ''
    paddingActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('padding') ?? ''
    paddingActualScrollView.value = scrollViewRef.value?.style.getPropertyValue('padding') ?? ''
  }

  const changePadding = (value: string) => {
    padding.value = value
    viewRef.value?.style.setProperty('padding', value)
    viewRefFlat.value?.style.setProperty('padding', value)
    textRef.value?.style.setProperty('padding', value)
    textRefFlat.value?.style.setProperty('padding', value)
    imageRef.value?.style.setProperty('padding', value)
    imageRefFlat.value?.style.setProperty('padding', value)
    scrollViewRef.value?.style.setProperty('padding', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangePadding = (index: number) => {
    const selectedItem = paddingEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changePadding(selectedItem.name)
    }
  }

  const inputChangePadding = (value: string) => {
    changePadding(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangePadding
  })
</script>

<style>
  .common {
    flex:1;
    margin:0 10px;
    height: 100px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .inner-content {
    flex-grow: 1;
    background-color: cyan;
  }

  .common-native {
    flex:1;
    height: 100px;
    background-color: cyan;
    border:red solid 1px;
  }

  .common-dynamic {
    height: 80px;
    background-color: gray;
  }

  .common-image {
    width: 80px;
    height: 80px;
    background-color: gray;
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
    background-color: lightgray;
  }

  .text-padding {
    flex:1;
    margin:0 10px;
    height: 100px;
    background-color: gray;
    font-size: 16px;
    color: black;
  }

  .image-padding {
    width: 100px;
    height: 100px;
    background-color: gray;
  }

  .common-scroll-view {
    height: 100px;
    border:blue solid 1px;
  }

  .scroll-view-content {
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: center;
    border: cyan solid 2px;
  }

  .common-text {
    font-size: 12px;
  }

  .native-view-container-large {
    width: 120px;
    height: 120px;
    background-color: #e0e0e0;
    border: 2px solid #999;
    margin: 0 10px;
    align-items: center;
    justify-content: center;
  }

  .cyan {
    background-color: cyan;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.padding)

