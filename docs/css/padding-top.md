## padding-top



CSS 属性 padding-top 是指一个元素在内边距区域（padding area）中上方的高度。内边距（padding）是指一个元素的内容和边框之间的区域。和外边距（margin）不同，内边距（padding）是不允许有负值的。内边距（padding）可以用四个值声明一个元素的四个方向的内边距（paddings），这是一种 CSS 缩写属性。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
padding-top: <length> | <percentage>;
```



### 值限制
- length
- percentage




### 默认值 @default-value 
 `0`





### 注意
- app-ios平台不支持slider、switch、web-view、image 组件

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/padding/padding-top.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/padding/padding-top.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/padding/padding-top

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/padding/padding-top

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>padding-top: 25px</text>
        <view class="demo-box">
          <view class="common" style="padding-top: 25px;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-top: 25px;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view>
        <text>padding-top: 10%</text>
        <view class="demo-box">
          <view class="common" style="padding-top: 10%;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-top: 10%;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view>
        <text class="uni-subtitle-text">padding-top: 10% 和 padding-top: 30px</text>
        <view class="demo-box">
          <scroll-view class="common" style="padding-top: 10%;">
            <view class="inner-content"></view>
          </scroll-view>
          <scroll-view class="common" style="padding-top: 30px;">
            <view class="inner-content"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 padding-top </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ paddingTop: paddingTop }">
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ paddingTop: paddingTop }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ paddingTop: paddingTop }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ paddingTop: paddingTop }" flatten>
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ paddingTop: paddingTop }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{paddingTop}}</text>
          <text class="uni-info">获取值: {{paddingTopActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ paddingTop: paddingTop }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="paddingTopEnum" title="padding-top 枚举值" @change="radioChangePaddingTop" :compact="true"></enum-data>
        <input-data :defaultValue="paddingTop" title="padding-top 自定义值" type="text" @confirm="inputChangePaddingTop"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: padding-top: 30px 和 padding-top: 30%</text>
        <text class="uni-tips">说明：cyan 背景色区域的高度即为 padding-top 的值，灰色区域为容器背景</text>
        <view class="demo-box">
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-top: 30px;"></native-view>
          </view>
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-top: 30%;"></native-view>
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

  const paddingTop = ref('25px')
  const paddingTopActual = ref('')
  const paddingTopActualText = ref('')
  const paddingTopActualImage = ref('')
  const paddingTopActualFlat = ref('')
  const paddingTopActualTextFlat = ref('')
  const paddingTopActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const paddingTopEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' }
  ]

  const getPropertyValues = () => {
    paddingTopActual.value = viewRef.value?.style.getPropertyValue('padding-top') ?? ''
    paddingTopActualFlat.value = viewRefFlat.value?.style.getPropertyValue('padding-top') ?? ''
    paddingTopActualText.value = textRef.value?.style.getPropertyValue('padding-top') ?? ''
    paddingTopActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('padding-top') ?? ''
    paddingTopActualImage.value = imageRef.value?.style.getPropertyValue('padding-top') ?? ''
    paddingTopActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('padding-top') ?? ''
  }

  const changePaddingTop = (value: string) => {
    paddingTop.value = value
    viewRef.value?.style.setProperty('padding-top', value)
    viewRefFlat.value?.style.setProperty('padding-top', value)
    textRef.value?.style.setProperty('padding-top', value)
    textRefFlat.value?.style.setProperty('padding-top', value)
    imageRef.value?.style.setProperty('padding-top', value)
    imageRefFlat.value?.style.setProperty('padding-top', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangePaddingTop = (index: number) => {
    const selectedItem = paddingTopEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changePaddingTop(selectedItem.name)
    }
  }

  const inputChangePaddingTop = (value: string) => {
    changePaddingTop(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangePaddingTop
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
    width: 100%;
    background-color: cyan;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-top)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.padding-top)

