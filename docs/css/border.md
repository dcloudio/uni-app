## border



CSS 的 border 是设置元素边框属性的简写形式，用于设置一个或多个以下属性的值：border-width、border-style、border-color。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border: <line-width> || <line-style> || <color>;
```



### 值限制
- length
- line-width
- line-style
- color




### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | 0 |





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view>
        <text>border与background-image同时设置</text>
        <view class="common"
          style="border-style: solid;border-color: rgba(0, 0, 255, 0.1);background-image: linear-gradient(to right, #00ff00, #00bc79)">
        </view>
      </view>

      <view>
        <text>设置border 多次赋值的场景</text>
        <view class="demo-box">
          <view class="common multi-times-border"></view>
          <view class="multi-times-border" style="width: 150px;height: 50px;"></view>
        </view>
      </view>

      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>border内联样式覆盖，预期右边框为blue</text>
        <view class="demo-box">
          <view class="multi-times-border" style="border-right: 6px solid blue; width: 150px;height: 50px;"></view>
          <view class="multi-times-border" style="border-right: 6px solid blue; width: 150px;height: 50px;" flatten></view>
        </view>
      </view>
      <view>
        <text>border: 5px dotted blue</text>
        <view class="demo-box">
          <view class="common" style="border: 5px dotted blue;"></view>
          <view class="common" style="border: 5px dotted blue;" flatten></view>
        </view>
      </view>

      <view>
        <text>设置border的view，通过v-show控制显示</text>
        <view v-show="shown" class="demo-box">
          <view class="common" style="border: 5px dotted blue;"></view>
          <view class="common" style="border: 5px dotted blue;" flatten></view>
        </view>
      </view>
      <view>
        <text>border: dashed</text>
        <view class="demo-box">
          <view class="common multi-times-border" style='border: dashed'></view>
          <view class="common multi-times-border" style='border: dashed' flatten></view>
        </view>
      </view>
      <view>
        <text>text组件: border: 5px dotted blue</text>
        <view class="demo-box">
          <text class="text-border" style="border: 5px dotted blue;">文本</text>
          <text class="text-border" style="border: 5px dotted blue;" flatten>文本</text>
        </view>
      </view>
      <view>
        <text>image组件: border: 5px dotted blue</text>
        <view class="demo-box">
          <image class="image-border" style="border: 5px dotted blue;" src="/static/test-image/logo.png"></image>
          <image class="image-border" style="border: 5px dotted blue;" src="/static/test-image/logo.png" flatten></image>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common" style="border: 1px solid red;">
          <text class="common-text">border: 1px solid red</text>
        </scroll-view>
        <scroll-view class="common" style="border: 5px solid blue;">
          <text class="common-text">border: 5px solid blue</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic" :style="{ border: border }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic" :style="{ border: border }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image" :style="{ border: border }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic" :style="{ border: border }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>
        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic" :style="{ border: border }" flatten>text</text>
          </view>
        </view>
        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{border}}</text>
          <text class="uni-info">获取值: {{borderActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image" :style="{ border: border }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderEnum" title="border 枚举值" @change="radioChangeBorder" :compact="true"></enum-data>
        <input-data :defaultValue="border" title="border 自定义值" type="text" @confirm="inputChangeBorder"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border: 5px dotted blue 和 5px solid cyan;</text>
        <view class="demo-box">
          <native-view class="common" style="border: 5px dotted blue;"></native-view>
          <native-view class="common" style="border: 5px solid cyan;"></native-view>
        </view>
      </view>

    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const shown = ref(false)
  setTimeout(() => {
    shown.value = true
  }, 1000);

  const borderEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: '1px solid purple' },
    { value: 3, name: '2px dashed blue' },
    { value: 4, name: '3px dotted green' }
  ]

  const border = ref('5px solid cyan')
  const borderActual = ref('')
  const borderActualText = ref('')
  const borderActualImage = ref('')
  const borderActualFlat = ref('')
  const borderActualTextFlat = ref('')
  const borderActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    const actualValue = viewRef.value?.style.getPropertyValue('border')
    borderActual.value = actualValue ?? ''
    borderActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border') ?? ''
    borderActualText.value = textRef.value?.style.getPropertyValue('border') ?? ''
    borderActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border') ?? ''
    borderActualImage.value = imageRef.value?.style.getPropertyValue('border') ?? ''
    borderActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border') ?? ''
  }

  const changeBorder = (value: string) => {
    border.value = value
    viewRef.value?.style.setProperty('border', value)
    viewRefFlat.value?.style.setProperty('border', value)
    textRef.value?.style.setProperty('border', value)
    textRefFlat.value?.style.setProperty('border', value)
    imageRef.value?.style.setProperty('border', value)
    imageRefFlat.value?.style.setProperty('border', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorder = (index: number) => {
    const selectedItem = borderEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorder(selectedItem.name)
    }
  }

  const inputChangeBorder = (value: string) => {
    changeBorder(value)
  }

  onReady(() => {
    getPropertyValues()
  })
</script>

<style>
  .common {
    width: 150px;
    height: 50px;
    background-color: gray;
  }
  .demo-box{
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
  }

  .multi-times-border {
    border: 3px solid purple;
    border-right-color: blue;
  }

  .common.multi-times-border {
    border-right-color: green;
  }

  .multi-times-border {
    border-right: 6px solid yellow;
  }

  .text-border {
    width: 150px;
    height: 50px;
    background-color: gray;
    font-size: 16px;
    color: black;
  }

  .image-border {
    width: 150px;
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
  .test-text{
    height:50px;
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


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border)


**注意**
- Harmony 平台上，父节点的border显示在子节点内容之上。 [issue详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20950)
