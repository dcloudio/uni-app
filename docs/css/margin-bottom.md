## margin-bottom



margin-bottom 属性设置与元素相关联的盒子模型的下外边距。可以为负值


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
margin-bottom: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### margin-bottom 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 由浏览器自己选择一个合适的值。参见 margin。 |


### 默认值 @default-value 
 `0`



**注意**

- app平台不支持外边距折叠（上下外边距折叠合并为单个边距，其大小为两个边距中的最大值），折叠规则参考[CSS的外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)
- HBuilderX3.98以下版本当 position 设置为 fixed 或 absolute 时， margin不支持 auto



### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/margin/margin-bottom.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/margin/margin-bottom.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/margin/margin-bottom

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/margin/margin-bottom

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>margin-bottom: 25px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-bottom: 25px;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-bottom: 25px;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view>
        <text>margin-bottom: 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-bottom: 10%;"></view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <view class="common" style="margin-bottom: 10%;" flatten></view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>
      <view>
        <text class="uni-subtitle-text">margin-bottom: 10% 和 margin-bottom: 30px</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-bottom: 10%;"></scroll-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <scroll-view class="common" style="margin-bottom: 30px;"></scroll-view>
            <view class="common blue"></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 margin-bottom </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActual}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRef" class="common-view test-view" :style="{ marginBottom: marginBottom }">
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActualText}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRef" class="common-view common-text test-text" :style="{ marginBottom: marginBottom }">text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActualImage}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-image test-image" :style="{ marginBottom: marginBottom }" src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActualFlat}}</text>
          <view class="test-box">
            <view class="common-view" style="background-color: red;"></view>
            <view ref="viewRefFlat" class="common-view test-view-flatten" :style="{ marginBottom: marginBottom }" flatten>
              <text class="common-text">view</text>
            </view>
            <view class="common-view" style="background-color: blue;"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActualTextFlat}}</text>
          <view class="test-box">
            <text class="common-view common-text" style="background-color: red;">红色</text>
            <text ref="textRefFlat" class="common-view common-text test-text-flatten" :style="{ marginBottom: marginBottom }" flatten>text</text>
            <text class="common-view common-text" style="background-color: blue;">蓝色</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{marginBottom}}</text>
          <text class="uni-info">获取值: {{marginBottomActualImageFlat}}</text>
          <view class="test-box">
            <image class="common-image" style="background-color: red;" src="/static/test-image/logo.png"></image>
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ marginBottom: marginBottom }" flatten src="/static/test-image/logo.png"></image>
            <image class="common-image" style="background-color: blue;" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>
      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="marginBottomEnum" title="margin-bottom 枚举值" @change="radioChangeMarginBottom" :compact="true"></enum-data>
        <input-data :defaultValue="marginBottom" title="margin-bottom 自定义值" type="text" @confirm="inputChangeMarginBottom"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: margin-bottom: 25px 和 10%</text>
        <view class="demo-box">
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin-bottom: 25px;"></native-view>
            <view class="common blue"></view>
          </view>
          <view class="demo-container">
            <view class="common red"></view>
            <native-view class="common" style="margin-bottom: 10%;"></native-view>
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

  const marginBottom = ref('25px')
  const marginBottomActual = ref('')
  const marginBottomActualText = ref('')
  const marginBottomActualImage = ref('')
  const marginBottomActualFlat = ref('')
  const marginBottomActualTextFlat = ref('')
  const marginBottomActualImageFlat = ref('')

  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const marginBottomEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '0%' },
    { value: 5, name: '10%' },
    { value: 6, name: 'auto' }
  ]

  const getPropertyValues = () => {
    marginBottomActual.value = viewRef.value?.style.getPropertyValue('margin-bottom') ?? ''
    marginBottomActualFlat.value = viewRefFlat.value?.style.getPropertyValue('margin-bottom') ?? ''
    marginBottomActualText.value = textRef.value?.style.getPropertyValue('margin-bottom') ?? ''
    marginBottomActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('margin-bottom') ?? ''
    marginBottomActualImage.value = imageRef.value?.style.getPropertyValue('margin-bottom') ?? ''
    marginBottomActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('margin-bottom') ?? ''
  }

  const changeMarginBottom = (value: string) => {
    marginBottom.value = value
    viewRef.value?.style.setProperty('margin-bottom', value)
    viewRefFlat.value?.style.setProperty('margin-bottom', value)
    textRef.value?.style.setProperty('margin-bottom', value)
    textRefFlat.value?.style.setProperty('margin-bottom', value)
    imageRef.value?.style.setProperty('margin-bottom', value)
    imageRefFlat.value?.style.setProperty('margin-bottom', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeMarginBottom = (index: number) => {
    const selectedItem = marginBottomEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeMarginBottom(selectedItem.name)
    }
  }

  const inputChangeMarginBottom = (value: string) => {
    changeMarginBottom(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeMarginBottom
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
    height: 140px;
    background-color: gray;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/margin-bottom)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.margin-bottom)

