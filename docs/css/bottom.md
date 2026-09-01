## bottom



bottom样式属性定义了定位元素下外边距边界与其包含块下边界之间的偏移，非定位元素设置此属性无效。


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
bottom: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### bottom 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 对于绝对定位元素，元素将忽略此属性而以top属性为准，如果此时设置height: auto，将基于内容需要的高度设置宽度；如果top也为auto的话，元素的垂直位置就是它假如作为静态 (即 static) 元素时该在的位置。<br/>对于相对定位元素，元素相对正常位置的偏移量将基于top属性；如果top也为auto的话，元素将不会有偏移。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/bottom.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/bottom.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/bottom

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/bottom

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view class="uni-theme-root" style="flex: 1">
  <!-- #endif -->
    <view class="css-page uni-theme-root" style="flex-grow: 1;">
      <view class="uni-common-mb">
        <text class="uni-title-text">bottom: 20px (距离底部 20px) - 右侧：拍平</text>
        <view class="test-container">
          <view class="example-box">
            <view class="common" style="bottom: 20px;"></view>
          </view>
          <view class="example-box">
            <view class="common" style="bottom: 20px;" flatten></view>
          </view>
        </view>
      </view>
      <view class="uni-common-mb">
        <text class="uni-title-text">bottom: 20rpx (距离底部 20rpx) - 右侧：拍平</text>
        <view class="test-container">
          <view class="example-box">
            <view class="common" style="bottom: 20rpx;"></view>
          </view>
          <view class="example-box">
            <view class="common" style="bottom: 20rpx;" flatten></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mb">
        <text class="uni-title-text">bottom: 20% (距离底部 20%) - 右侧：拍平</text>
        <view class="test-container">
          <view class="example-box">
            <view class="common" style="bottom: 20%;"></view>
          </view>
          <view class="example-box">
            <view class="common" style="bottom: 20%;" flatten></view>
          </view>
        </view>
      </view>

      <view class="uni-common-mb">
        <text class="uni-title-text">bottom: auto (自动，默认顶部对齐) - 右侧：拍平</text>
        <view class="test-container">
          <view class="example-box">
            <view class="common" style="bottom: auto;"></view>
          </view>
          <view class="example-box">
            <view class="common" style="bottom: auto;" flatten></view>
          </view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="uni-common-mb">
        <text class="uni-subtitle-text">bottom: 10% 和 bottom: 30px</text>
        <view class="test-container">
          <view class="example-box">
            <scroll-view class="common" style="bottom: 10%;"></scroll-view>
          </view>
          <view class="example-box">
            <scroll-view class="common" style="bottom: 30px;"></scroll-view>
          </view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取</text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common test-view" :style="{ bottom: data.bottom }">
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common common-text test-text" :style="{ bottom: data.bottom }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common test-image" :style="{ bottom: data.bottom }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common test-view-flatten" :style="{ bottom: data.bottom }" flatten>
              <text class="common-text">view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common common-text test-text-flatten" :style="{ bottom: data.bottom }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{data.bottom}}</text>
          <text class="uni-info">获取值: {{data.bottomActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common test-image-flatten" :style="{ bottom: data.bottom }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="bottomEnum" title="bottom 枚举值" @change="radioChangeBottom" :compact="true"></enum-data>
        <input-data :defaultValue="data.bottom" title="bottom 自定义值" type="text" @confirm="inputChangeBottom"></input-data>
      </view>

      <!-- #ifndef MP-ALIPAY -->
      <view class="uni-common-mb">
        <text class="theme-label">native-view组件: bottom: 10% 和 bottom: 30px</text>
        <view class="test-container">
          <view class="example-box">
            <test-native-view class="common-native" style="bottom: 10%;"></test-native-view>
          </view>
          <view class="example-box">
            <test-native-view class="common-native" style="bottom: 30px;"></test-native-view>
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

  const bottomEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '10px' },
    { value: 4, name: '20rpx' },
    { value: 5, name: '0%' },
    { value: 6, name: '20%' },
    { value: 7, name: 'auto' }
  ]

  const data = reactive({
    bottom: '10px',
    bottomActual: '',
    bottomActualText: '',
    bottomActualImage: '',
    bottomActualFlat: '',
    bottomActualTextFlat: '',
    bottomActualImageFlat: ''
  })
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    data.bottomActual = viewRef.value?.style.getPropertyValue('bottom') ?? ''
    data.bottomActualFlat = viewRefFlat.value?.style.getPropertyValue('bottom') ?? ''
    data.bottomActualText = textRef.value?.style.getPropertyValue('bottom') ?? ''
    data.bottomActualTextFlat = textRefFlat.value?.style.getPropertyValue('bottom') ?? ''
    data.bottomActualImage = imageRef.value?.style.getPropertyValue('bottom') ?? ''
    data.bottomActualImageFlat = imageRefFlat.value?.style.getPropertyValue('bottom') ?? ''
  }


  const changeBottom = (value : string) => {
    data.bottom = value
    viewRef.value?.style.setProperty('bottom', value)
    viewRefFlat.value?.style.setProperty('bottom', value)
    textRef.value?.style.setProperty('bottom', value)
    textRefFlat.value?.style.setProperty('bottom', value)
    imageRef.value?.style.setProperty('bottom', value)
    imageRefFlat.value?.style.setProperty('bottom', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBottom = (index : number) => {
    const selectedItem = bottomEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeBottom(selectedItem.name)
    }
  }

  const inputChangeBottom = (value : string) => {
    changeBottom(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBottom,
    data
  })
</script>

<style>
  .theme-label {
    color: var(--text-color, #333333);
  }

  .example-box {
    position: relative;
    flex: 1;
    height: 100px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin: 0 5px;
  }

  .common {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: cyan;
  }

  .common-text {
    width: 50px;
    font-size: 12px;
    color: #1a1a1a;
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
    position: relative;
    width: 100%;
    height: 100px;
    background-color: #e0e0e0;
  }

  .common-native {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: rgba(255,0,0,0.5);
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/bottom)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.position.bottom)

