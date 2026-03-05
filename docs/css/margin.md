## margin



margin 属性为给定元素设置所有四个（上下左右）方向的外边距属性。也就是 margin-top，margin-right，margin-bottom，和 margin-left 四个外边距属性设置的简写。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
margin: [ <length> | <percentage> | auto ]{1,4};
```



### 值限制
- length
- percentage



### margin 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 让浏览器自己选择一个合适的外边距。有时，在一些特殊情况下，该值可以使元素居中。 |


### 默认值 @default-value 
 `0`



**注意**

- app平台不支持外边距折叠（上下外边距折叠合并为单个边距，其大小为两个边距中的最大值），折叠规则参考[CSS的外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- HBuilderX3.98以下版本当 position 设置为 fixed 或 absolute 时， margin不支持 auto



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/margin/margin.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/margin/margin.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/margin/margin

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/margin/margin

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>margin: 25px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin: 25px;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin: 25px;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>margin: 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin: 10%;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin: 10%;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 margin </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActual}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRef" class="common-view test-view" :style="{ margin: margin }">
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualText}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRef" class="common-view common-text test-text" :style="{ margin: margin }">text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualImage}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-image test-image" :style="{ margin: margin }" src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualFlat}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRefFlat" class="common-view test-view-flatten" :style="{ margin: margin }" flatten>
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualTextFlat}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRefFlat" class="common-view common-text test-text-flatten" :style="{ margin: margin }" flatten>text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualImageFlat}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ margin: margin }" flatten src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件 margin </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-info">设置值: {{margin}}</text>
          <text class="uni-info">获取值: {{marginActualScrollView}}</text>
          <view class="test-box" style="height: 180px;">
            <view class="common-view" style="background-color: red;"></view>
            <scroll-view ref="scrollViewRef" class="common-scroll-view" :style="{ margin: margin }">
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
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :compact="true" :items="marginEnum" title="margin 枚举值" @change="radioChangeMargin"></enum-data>
        <input-data :defaultValue="margin" title="margin 自定义值" type="text" @confirm="inputChangeMargin"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: margin: 25px 和 5%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin: 25px;"></native-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin: 10%;"></native-view>
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

  const margin = ref('25px')
  const marginActual = ref('')
  const marginActualText = ref('')
  const marginActualImage = ref('')
  const marginActualFlat = ref('')
  const marginActualTextFlat = ref('')
  const marginActualImageFlat = ref('')
  const marginActualScrollView = ref('')

  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)
  const scrollViewRef = ref(null as UniElement | null)

  const marginEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' },
    { value: 6, name: 'auto' }
  ]

  const getPropertyValues = () => {
    marginActual.value = viewRef.value?.style.getPropertyValue('margin') ?? ''
    marginActualFlat.value = viewRefFlat.value?.style.getPropertyValue('margin') ?? ''
    marginActualText.value = textRef.value?.style.getPropertyValue('margin') ?? ''
    marginActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('margin') ?? ''
    marginActualImage.value = imageRef.value?.style.getPropertyValue('margin') ?? ''
    marginActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('margin') ?? ''
    marginActualScrollView.value = scrollViewRef.value?.style.getPropertyValue('margin') ?? ''
  }

  const changeMargin = (value: string) => {
    margin.value = value
    viewRef.value?.style.setProperty('margin', value)
    viewRefFlat.value?.style.setProperty('margin', value)
    textRef.value?.style.setProperty('margin', value)
    textRefFlat.value?.style.setProperty('margin', value)
    imageRef.value?.style.setProperty('margin', value)
    imageRefFlat.value?.style.setProperty('margin', value)
    scrollViewRef.value?.style.setProperty('margin', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMargin = (index: number) => {
    const selectedItem = marginEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMargin(selectedItem.name)
    }
  }

  const inputChangeMargin = (value: string) => {
    changeMargin(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMargin
  })
</script>

<style>
  .demo-container {
    flex: 1;
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


  .common-scroll-view {
    height: 30px;
    background-color: green;
  }

  .scroll-view-content {
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: center;
    border: cyan solid 2px;
  }

  .native-view-container {
    width: 100px;
    height: 100px;
    background-color: #e0e0e0;
    border: 1px solid #999;
  }

  .native-view {
    width: 100%;
    height: 100%;
    background-color: cyan;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.margin)

