## height



height CSS 属性指定了一个元素的高度。默认情况下，这个属性决定的是内容区（ content area）的高度，但是，如果将 box-sizing 设置为 border-box , 这个属性决定的将是边框区域（border area）的高度。


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
height: <viewport-length>{1,2};
```



### 值限制
- length
- percentage



### height 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 由浏览器为元素计算并选择一个高度。 |
| fit-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 将 fill-content 公式中的可用位置替换为特定的参数以进行使用，如：min(max-content, max(min-content, )) |
| max-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 设置为允许的最大高度。 |
| min-content | Web: 4.0; Android: x; iOS: x; HarmonyOS: x | 设置为允许的最小高度。 |


**注意**
> 属性值为长度 `<length>` 时，App平台可以不设置单位，Web端必须设置单位，详情参考[长度单位](./README.md#length)。

### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/height.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/height.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/height

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/height

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view class="uni-theme-root" style="flex: 1">
  <!-- #endif -->
    <view class="css-page uni-theme-root" style="flex-grow: 1;">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text class="theme-label">height: 100px</text>
        <view class="demo-box">
          <view class="common" style="height: 100px;"></view>
          <view class="common" style="height: 100px;" flatten></view>
        </view>
      </view>

      <view >
        <text class="theme-label">height: 50%</text>
        <view class="demo-box" style="height: 100px;">
          <view class="common" style="height: 50%;"></view>
          <view class="common" style="height: 50%;" flatten></view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">scroll-view 组件</text>
      </view>

      <view class="demo-box">
        <scroll-view style="width: 100px; height: 80px; background-color: cyan;">
          <text class="scroll-view-label">height: 80px</text>
        </scroll-view>
        <scroll-view style="width: 100px; height: 120px; background-color: cyan;">
          <text class="scroll-view-label">height: 120px</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ height: data.height }">
              <text class="cyan-label">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ height: data.height }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-dynamic test-image" :style="{ height: data.height }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ height: data.height }" flatten>
              <text class="cyan-label">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ height: data.height }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.height}}</text>
          <text class="uni-info">获取值: {{data.heightActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-dynamic test-image-flatten" :style="{ height: data.height }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="heightEnum" title="height 枚举值" @change="radioChangeHeight" :compact="true"></enum-data>
        <input-data :defaultValue="data.height" title="height 自定义值" type="text" @confirm="inputChangeHeight"></input-data>
      </view>

      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-common-mb">
        <text class="theme-label">native-view组件: height: 80px 和 height: 120px</text>
        <view class="demo-box-native">
          <view class="container-native">
            <native-view style="width: 100px;height: 80px;"></native-view>
          </view>
          <view class="container-native">
            <native-view style="width: 100px;height: 120px;"></native-view>
          </view>
        </view>
      </view>
      <!-- #endif -->
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const heightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '50px' },
    { value: 4, name: '150px' },
    { value: 5, name: '0%' },
    { value: 6, name: '50%' },
    { value: 7, name: 'auto' }
  ]

  const data = reactive({
    height: '100px',
    heightActual: '',
    heightActualText: '',
    heightActualImage: '',
    heightActualFlat: '',
    heightActualTextFlat: '',
    heightActualImageFlat: ''
  })
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.heightActual = viewRef.value?.style.getPropertyValue('height') ?? ''
    data.heightActualFlat = viewRefFlat.value?.style.getPropertyValue('height') ?? ''
    data.heightActualText = textRef.value?.style.getPropertyValue('height') ?? ''
    data.heightActualTextFlat = textRefFlat.value?.style.getPropertyValue('height') ?? ''
    data.heightActualImage = imageRef.value?.style.getPropertyValue('height') ?? ''
    data.heightActualImageFlat = imageRefFlat.value?.style.getPropertyValue('height') ?? ''
  }


  const changeHeight = (value: string) => {
    data.height = value
    viewRef.value?.style.setProperty('height', value)
    viewRefFlat.value?.style.setProperty('height', value)
    textRef.value?.style.setProperty('height', value)
    textRefFlat.value?.style.setProperty('height', value)
    imageRef.value?.style.setProperty('height', value)
    imageRefFlat.value?.style.setProperty('height', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeHeight = (index: number) => {
    const selectedItem = heightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeHeight(selectedItem.name)
    }
  }

  const inputChangeHeight = (value: string) => {
    changeHeight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeHeight,
    data
  })
</script>

<style>
  .theme-label {
    color: var(--text-color, #333333);
  }

  .cyan-label,
  .scroll-view-label {
    color: #1a1a1a;
  }

  .common {
    flex: 1;
    margin:0 10px;
    background-color: cyan;
  }
  .demo-box {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
  }

  .common-dynamic {
    width: 100px;
    background-color: cyan;
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
    height: 150px;
    background-color: gray;
  }

  .scroll-view-label {
    font-size: 12px;
    text-align: center;
  }

  .demo-box-native {
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-around;
    align-items: center;
  }

  .container-native {
    background-color: cyan;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/height)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.height)

