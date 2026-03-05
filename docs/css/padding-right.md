## padding-right



CSS 属性 padding-right 是指一个元素在内边距区域（padding area）中右边的宽度。内边距（padding）是指一个元素的内容和边框之间的区域。和外边距（margin）不同，内边距（padding）是不允许有负值的。内边距（padding）可以用四个值声明一个元素的四个方向的内边距（paddings），这是一种 CSS 缩写属性。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
padding-right: <length> | <percentage>;
```



### 值限制
- length
- percentage




### 默认值 @default-value 
 `0`





### 注意
- app-ios平台不支持slider、switch、web-view、image 组件

### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/padding/padding-right.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/padding/padding-right.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/padding/padding-right

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/padding/padding-right

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>padding-right: 25px</text>
        <view class="demo-box">
          <view class="common" style="padding-right: 25px;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-right: 25px;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view>
        <text>padding-right: 10%</text>
        <view class="demo-box">
          <view class="common" style="padding-right: 10%;">
            <view class="inner-content"></view>
          </view>
          <view class="common" style="padding-right: 10%;" flatten>
            <view class="inner-content"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view>
        <text class="uni-subtitle-text">padding-right: 10% 和 padding-right: 30px</text>
        <view class="demo-box">
          <scroll-view class="common" style="padding-right: 10%;">
            <view class="inner-content"></view>
          </scroll-view>
          <scroll-view class="common" style="padding-right: 30px;">
            <view class="inner-content"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 padding-right </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-view test-view" :style="{ paddingRight: paddingRight }">
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-text test-text" :style="{ paddingRight: paddingRight }">当前为text组件</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ paddingRight: paddingRight }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-view test-view-flatten" :style="{ paddingRight: paddingRight }" flatten>
              <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-text test-text-flatten" :style="{ paddingRight: paddingRight }" flatten>当前为text组件</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{paddingRight}}</text>
          <text class="uni-info">获取值: {{paddingRightActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ paddingRight: paddingRight }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="paddingRightEnum" title="padding-right 枚举值" @change="radioChangePaddingRight" :compact="true"></enum-data>
        <input-data :defaultValue="paddingRight" title="padding-right 自定义值" type="text" @confirm="inputChangePaddingRight"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: padding-right: 30px 和 padding-right: 30%</text>
        <text class="uni-tips">说明：cyan 背景色区域的宽度即为 padding-right 的值，灰色区域为容器背景</text>
        <view class="demo-box">
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-right: 30px;"></native-view>
          </view>
          <view class="native-view-container-large">
            <native-view class="native-view-padding-large" style="padding-right: 30%;"></native-view>
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

  const paddingRight = ref('25px')
  const paddingRightActual = ref('')
  const paddingRightActualText = ref('')
  const paddingRightActualImage = ref('')
  const paddingRightActualFlat = ref('')
  const paddingRightActualTextFlat = ref('')
  const paddingRightActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const paddingRightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' }
  ]

  const getPropertyValues = () => {
    paddingRightActual.value = viewRef.value?.style.getPropertyValue('padding-right') ?? ''
    paddingRightActualFlat.value = viewRefFlat.value?.style.getPropertyValue('padding-right') ?? ''
    paddingRightActualText.value = textRef.value?.style.getPropertyValue('padding-right') ?? ''
    paddingRightActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('padding-right') ?? ''
    paddingRightActualImage.value = imageRef.value?.style.getPropertyValue('padding-right') ?? ''
    paddingRightActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('padding-right') ?? ''
  }

  const changePaddingRight = (value: string) => {
    paddingRight.value = value
    viewRef.value?.style.setProperty('padding-right', value)
    viewRefFlat.value?.style.setProperty('padding-right', value)
    textRef.value?.style.setProperty('padding-right', value)
    textRefFlat.value?.style.setProperty('padding-right', value)
    imageRef.value?.style.setProperty('padding-right', value)
    imageRefFlat.value?.style.setProperty('padding-right', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangePaddingRight = (index: number) => {
    const selectedItem = paddingRightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changePaddingRight(selectedItem.name)
    }
  }

  const inputChangePaddingRight = (value: string) => {
    changePaddingRight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangePaddingRight
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

  .common-view {
    height: 80px;
    background-color: gray;
  }

  .common-text {
    height: 80px;
    background-color: gray;
    /* 为了加强视觉效果 */
    max-width: 100px;
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
    height: 100px;
    background-color: lightgray;
  }

  .native-view-container-large {
    width: 120px;
    height: 120px;
    background-color: #e0e0e0;
    border: 2px solid #999;
    margin: 0 10px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .native-view-padding-large {
    height: 100%;
    background-color: cyan;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/padding-right)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.padding-right)

