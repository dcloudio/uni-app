## padding-left



CSS 属性 padding-left 是指一个元素在内边距区域（padding area）中左边的宽度。内边距（padding）是指一个元素的内容和边框之间的区域。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
padding-left: <length> | <percentage>;
```



### 值限制
- length
- percentage




### 默认值 @default-value 
 `0`





### 注意
- app-ios平台不支持slider、switch、web-view、image 组件

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/padding/padding-left.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/padding/padding-left.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/padding/padding-left

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/padding/padding-left

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>padding-left: 25px</text>
        <view class="demo-box">
          <view class="common" style="padding-left: 25px;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-left: 25px;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view>
        <text>padding-left: 10%</text>
        <view class="demo-box">
          <view class="common" style="padding-left: 10%;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-left: 10%;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view>
        <text class="uni-subtitle-text">padding-left: 10% 和 padding-left: 30px</text>
        <view class="demo-box">
          <scroll-view class="common" style="padding-left: 10%;">
            <view class="inner-content"></view>
          </scroll-view>
          <scroll-view class="common" style="padding-left: 30px;">
            <view class="inner-content"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 padding-left </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ paddingLeft: paddingLeft }">
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ paddingLeft: paddingLeft }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ paddingLeft: paddingLeft }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ paddingLeft: paddingLeft }" flatten>
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ paddingLeft: paddingLeft }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{paddingLeft}}</text>
          <text class="uni-info">获取值: {{paddingLeftActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ paddingLeft: paddingLeft }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="paddingLeftEnum" title="padding-left 枚举值" @change="radioChangePaddingLeft" :compact="true"></enum-data>
        <input-data :defaultValue="paddingLeft" title="padding-left 自定义值" type="text" @confirm="inputChangePaddingLeft"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: padding-left: 30px 和 padding-left: 30%</text>
        <text class="uni-tips">说明：cyan 背景色区域的宽度即为 padding-left 的值，灰色区域为容器背景</text>
        <view class="demo-box">
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-left: 30px;"></native-view>
          </view>
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-left: 30%;"></native-view>
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

  const paddingLeft = ref('25px')
  const paddingLeftActual = ref('')
  const paddingLeftActualText = ref('')
  const paddingLeftActualImage = ref('')
  const paddingLeftActualFlat = ref('')
  const paddingLeftActualTextFlat = ref('')
  const paddingLeftActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const paddingLeftEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' }
  ]

  const getPropertyValues = () => {
    paddingLeftActual.value = viewRef.value?.style.getPropertyValue('padding-left') ?? ''
    paddingLeftActualFlat.value = viewRefFlat.value?.style.getPropertyValue('padding-left') ?? ''
    paddingLeftActualText.value = textRef.value?.style.getPropertyValue('padding-left') ?? ''
    paddingLeftActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('padding-left') ?? ''
    paddingLeftActualImage.value = imageRef.value?.style.getPropertyValue('padding-left') ?? ''
    paddingLeftActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('padding-left') ?? ''
  }

  const changePaddingLeft = (value: string) => {
    paddingLeft.value = value
    viewRef.value?.style.setProperty('padding-left', value)
    viewRefFlat.value?.style.setProperty('padding-left', value)
    textRef.value?.style.setProperty('padding-left', value)
    textRefFlat.value?.style.setProperty('padding-left', value)
    imageRef.value?.style.setProperty('padding-left', value)
    imageRefFlat.value?.style.setProperty('padding-left', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangePaddingLeft = (index: number) => {
    const selectedItem = paddingLeftEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changePaddingLeft(selectedItem.name)
    }
  }

  const inputChangePaddingLeft = (value: string) => {
    changePaddingLeft(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangePaddingLeft
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

  .native-view-container-large {
    width: 120px;
    height: 120px;
    background-color: #e0e0e0;
    border: 2px solid #999;
    margin: 0 10px;
    align-items: flex-start;
  }

  .native-view-padding-large {
    height: 100%;
    background-color: cyan;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-left)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.padding-left)

