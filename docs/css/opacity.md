## opacity



opacity 属性指定了一个元素的不透明度。换言之，opacity 属性指定了一个元素后面的背景的被覆盖程度。


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
opacity: <alpha-value>;
```



### 值限制
- number(0-1)




### 默认值 @default-value 
 `1`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/opacity.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/opacity.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/opacity

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/opacity

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view class="demo-row">
        <view class="demo-item">
          <text>opacity: 1 (默认值)</text>
          <view class="common" style="opacity: 1;"></view>
        </view>
        <view class="demo-item">
          <text>拍平</text>
          <view class="common" style="opacity: 1;" flatten></view>
        </view>
      </view>

      <view class="demo-row uni-common-mt">
        <view class="demo-item">
          <text>opacity: 0.8</text>
          <view class="common" style="opacity: 0.8;"></view>
        </view>
        <view class="demo-item">
          <text>拍平</text>
          <view class="common" style="opacity: 0.8;" flatten></view>
        </view>
      </view>

      <view class="demo-row uni-common-mt">
        <view class="demo-item">
          <text>opacity: 0.5</text>
          <view class="common" style="opacity: 0.5;"></view>
        </view>
        <view class="demo-item">
          <text>拍平</text>
          <view class="common" style="opacity: 0.5;" flatten></view>
        </view>
      </view>

      <view class="demo-row uni-common-mt">
        <view class="demo-item">
          <text>opacity: 0.2</text>
          <view class="common" style="opacity: 0.2;"></view>
        </view>
        <view class="demo-item">
          <text>拍平</text>
          <view class="common" style="opacity: 0.2;" flatten></view>
        </view>
      </view>

      <view class="demo-row uni-common-mt">
        <view class="demo-item">
          <text>opacity: 0</text>
          <view class="common" style="opacity: 0;"></view>
        </view>
        <view class="demo-item">
          <text>拍平</text>
          <view class="common" style="opacity: 0;" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-row uni-common-mt">
        <view class="demo-item">
          <text>opacity: 0.5</text>
          <scroll-view class="common" style="opacity: 0.5;"></scroll-view>
        </view>
        <view class="demo-item">
          <text>opacity: 0.2</text>
          <scroll-view class="common" style="opacity: 0.2;"></scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common test-view" :style="{ opacity: data.opacity }">
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common test-text" :style="{ opacity: data.opacity }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common test-image" :style="{ opacity: data.opacity }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common test-view-flatten" :style="{ opacity: data.opacity }" flatten>
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common test-text-flatten" :style="{ opacity: data.opacity }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.opacity}}</text>
          <text class="uni-info">获取值: {{data.opacityActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common test-image-flatten" :style="{ opacity: data.opacity }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="opacityEnum" title="opacity 枚举值" @change="radioChangeOpacity" :compact="true"></enum-data>
        <input-data :defaultValue="data.opacity" title="opacity 自定义值" type="text" @confirm="inputChangeOpacity"></input-data>
      </view>

      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-common-mb">
        <text>native-view组件: opacity: 0.5 和 opacity: 0.2</text>
        <view class="demo-row uni-common-mt">
          <view class="demo-item">
            <text>opacity: 0.5</text>
            <test-native-view class="common" style="opacity: 0.5;"></test-native-view>
          </view>
          <view class="demo-item">
            <text>opacity: 0.2</text>
            <test-native-view class="common" style="opacity: 0.2;"></test-native-view>
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

  const opacityEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0.2' },
    { value: 3, name: '0.5' },
    { value: 4, name: '0.8' },
    { value: 5, name: '1' }
  ]

  const data = reactive({
    opacity: '1',
    opacityActual: '',
    opacityActualText: '',
    opacityActualImage: '',
    opacityActualFlat: '',
    opacityActualTextFlat: '',
    opacityActualImageFlat: ''
  })
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.opacityActual = viewRef.value?.style.getPropertyValue('opacity') ?? ''
    data.opacityActualFlat = viewRefFlat.value?.style.getPropertyValue('opacity') ?? ''
    data.opacityActualText = textRef.value?.style.getPropertyValue('opacity') ?? ''
    data.opacityActualTextFlat = textRefFlat.value?.style.getPropertyValue('opacity') ?? ''
    data.opacityActualImage = imageRef.value?.style.getPropertyValue('opacity') ?? ''
    data.opacityActualImageFlat = imageRefFlat.value?.style.getPropertyValue('opacity') ?? ''
  }


  const changeOpacity = (value : string) => {
    data.opacity = value
    viewRef.value?.style.setProperty('opacity', value)
    viewRefFlat.value?.style.setProperty('opacity', value)
    textRef.value?.style.setProperty('opacity', value)
    textRefFlat.value?.style.setProperty('opacity', value)
    imageRef.value?.style.setProperty('opacity', value)
    imageRefFlat.value?.style.setProperty('opacity', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeOpacity = (index : number) => {
    const selectedItem = opacityEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeOpacity(selectedItem.name)
    }
  }

  const inputChangeOpacity = (value : string) => {
    changeOpacity(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeOpacity,
    data
  })
</script>

<style>
  .demo-row {
    flex-direction: row;
    justify-content: space-between;
  }

  .demo-item {
    flex: 1;
    margin: 0 5px;
  }

  .common {
    width: 80px;
    height: 80px;
    background-color: blue;
  }

  .common-text {
    width: 50px;
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
    background-color: gray;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/opacity)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.opacity)

