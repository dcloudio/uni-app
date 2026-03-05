## border-radius



CSS 属性 border-radius 允许你设置元素的外边框圆角。当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆。这个（椭）圆与边框的交集形成圆角效果。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-radius: <length-percentage>{1,4} [ / <length-percentage>{1,4} ]?;
```



### 值限制
- length
- percentage










### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-radius.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-radius.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-radius

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-radius

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>border-radius: 10px</text>
        <view class="demo-box">
          <view class="common" style="border-radius: 10px"></view>
          <view class="common" style="border-radius: 10px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-top-left-radius: 10px</text>
        <view class="demo-box">
          <view class="common" style="border-top-left-radius: 10px"></view>
          <view class="common" style="border-top-left-radius: 10px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-top-right-radius: 10px</text>
        <view class="demo-box">
          <view class="common" style="border-top-right-radius: 10px"></view>
          <view class="common" style="border-top-right-radius: 10px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-bottom-left-radius: 10px</text>
        <view class="demo-box">
          <view class="common" style="border-bottom-left-radius: 10px"></view>
          <view class="common" style="border-bottom-left-radius: 10px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-bottom-right-radius: 10px</text>
        <view class="demo-box">
          <view class="common" style="border-bottom-right-radius: 10px"></view>
          <view class="common" style="border-bottom-right-radius: 10px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-radius: 150px（长宽不同形成扁圆）</text>
        <view class="demo-box">
          <view class="common" style="border-radius: 150px"></view>
          <view class="common" style="border-radius: 150px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-radius: 150px（与长宽相同形成正圆）</text>
        <view class="demo-box">
          <view class="common-square" style="border-radius: 150px"></view>
          <view class="common-square" style="border-radius: 150px" flatten></view>
        </view>
      </view>

      <view>
        <text>border-radius: 10px（包含子视图）</text>
        <view class="demo-box">
          <view class="common" style="margin-left: 5px;border-radius: 10px">
             <view style="background-color: wheat;width: 100%;height: 20px;"></view>
          </view>
          <view class="common" style="margin-left: 5px;border-radius: 10px" flatten>
             <view style="background-color: wheat;width: 100%;height: 20px;" flatten></view>
          </view>
        </view>
      </view>
      <view>
        <text>border-bottom-left-radius: 10px \nborder-bottom-right-radius: 10px \n(包含子视图）</text>
        <view class="demo-box">
          <view class="common" style="margin-left: 5px;border-top-left-radius: 10px;border-top-right-radius: 10px">
             <view style="background-color: wheat;width: 100%;height: 20px;"></view>
          </view>
          <view class="common" style="margin-left: 5px;border-top-left-radius: 10px;border-top-right-radius: 10px" flatten>
             <view style="background-color: wheat;width: 100%;height: 20px;" flatten></view>
          </view>
        </view>
      </view>
      <view>
        <text>text组件: border-radius: 10px</text>
        <view class="demo-box">
          <text class="text-radius" style="border-radius: 10px;">文本</text>
          <text class="text-radius" style="border-radius: 10px;" flatten>文本</text>
        </view>
      </view>
      <view>
        <text>text组件: border-radius: 25px（与高度相同形成圆角）</text>
        <view class="demo-box">
          <text class="text-radius-circle" style="border-radius: 25px;">文本</text>
          <text class="text-radius-circle" style="border-radius: 25px;" flatten>文本</text>
        </view>
      </view>
      <view>
        <text>image组件: border-radius: 10px</text>
        <view class="demo-box">
          <image class="image-radius" style="border-radius: 10px;" src="/static/test-image/logo.png"></image>
          <image class="image-radius" style="border-radius: 10px;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>
      <view>
        <text>image组件: border-radius: 100px（与长宽相同形成正圆）</text>
        <view class="demo-box">
          <image class="image-radius-circle" style="border-radius: 100px;" src="/static/test-image/logo.png"></image>
          <image class="image-radius-circle" style="border-radius: 100px;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
      <view class="demo-box">
        <scroll-view class="common" style="border-radius: 10px;">
          <text class="common-text">border-radius: 10px</text>
        </scroll-view>
        <scroll-view class="common" style="border-radius: 100px;">
          <text class="common-text">border-radius: 100px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-radius </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderRadius: borderRadius }">
              <view style="flex-grow: 1;background-color: bisque;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderRadius: borderRadius }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderRadius: borderRadius }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderRadius: borderRadius }" flatten>
              <view style="flex-grow: 1;background-color: bisque;" flatten><text flatten>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderRadius: borderRadius }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderRadius}}</text>
          <text class="uni-info">获取值: {{borderRadiusActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderRadius: borderRadius }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderRadiusEnum" title="border-radius 枚举值" @change="radioChangeBorderRadius" :compact="true"></enum-data>
        <input-data :defaultValue="borderRadius" title="border-radius 自定义值" type="text" @confirm="inputChangeBorderRadius"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-radius: 10px 和 border-top-left-radius: 10px</text>
        <view class="demo-box">
          <native-view class="common" style="border-radius: 10px"></native-view>
          <native-view class="common" style="border-top-left-radius: 10px"></native-view>
        </view>
      </view>

    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderRadiusEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '5px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '50%' }
  ]

  const borderRadius = ref('10px')
  const borderRadiusActual = ref('')
  const borderRadiusActualText = ref('')
  const borderRadiusActualImage = ref('')
  const borderRadiusActualFlat = ref('')
  const borderRadiusActualTextFlat = ref('')
  const borderRadiusActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderRadiusActual.value = viewRef.value?.style.getPropertyValue('border-radius') ?? ''
    borderRadiusActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-radius') ?? ''
    borderRadiusActualText.value = textRef.value?.style.getPropertyValue('border-radius') ?? ''
    borderRadiusActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-radius') ?? ''
    borderRadiusActualImage.value = imageRef.value?.style.getPropertyValue('border-radius') ?? ''
    borderRadiusActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-radius') ?? ''
  }

  const changeBorderRadius = (value: string) => {
    borderRadius.value = value
    viewRef.value?.style.setProperty('border-radius', value)
    viewRefFlat.value?.style.setProperty('border-radius', value)
    textRef.value?.style.setProperty('border-radius', value)
    textRefFlat.value?.style.setProperty('border-radius', value)
    imageRef.value?.style.setProperty('border-radius', value)
    imageRefFlat.value?.style.setProperty('border-radius', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderRadius = (index: number) => {
    const selectedItem = borderRadiusEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderRadius(selectedItem.name)
    }
  }

  const inputChangeBorderRadius = (value: string) => {
    changeBorderRadius(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderRadius
  })
</script>

<style>
  .common {
    width: 150px;
    height: 50px;
    background-color: gray;
  }

  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .common-square {
    width: 150px;
    height: 150px;
    background-color: gray;
  }

  .text-radius {
    width: 150px;
    height: 50px;
    background-color: gray;
    font-size: 16px;
    color: black;
  }

  .text-radius-circle {
    width: 150px;
    height: 25px;
    background-color: gray;
    font-size: 16px;
    color: black;
  }

  .image-radius {
    width: 150px;
    height: 100px;
    background-color: gray;
  }

  .image-radius-circle {
    width: 100px;
    height: 100px;
    background-color: gray;
  }

  .common-dynamic {
    height: 50px;
    background-color: gray;
  }

  .common-image {
    width: 50px;
    height: 50px;
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
    height: 60px;
    background-color: lightgray;
  }

  .common-text {
    font-size: 12px;
  }
</style>

```

:::

### tips
- App-Android/iOS平台从HBuilderX 5.0+支持设置百分比。
  在HBuilderX 5.0之前Android/iOS如需裁剪正圆图片，暂无法使用50%，可以使用与图片宽高相同的像素来裁剪。比如图片长宽250px，则设置 `border-radius: 125px` 可得一个正圆。\
  如果无法确定元素的宽高值（如 `width: auto` ），可以设置一个非常大的圆角半径值（如 `border-radius: 10000px` ）使得显示为正圆。\
	鸿蒙平台一直支持百分比。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-radius)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-radius)

