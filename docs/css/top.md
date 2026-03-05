## top



top样式属性定义了定位元素的上外边距边界与其包含块上边界之间的偏移，非定位元素设置此属性无效。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
top: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### top 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 这个关键字表示：<br/>    <br/>      对于绝对定位元素，元素将忽略此属性已bottom属性为准，如果此时设置height: auto，将基于内容需要的高度设置高度；如果bottom也为auto的话，元素的垂直位置就是它假如作为静态 (即 static) 元素时该在的位置。<br/>      对于相对定位元素，元素相对正常位置的偏移量将基于bottom属性；如果bottom也为auto的话，元素将不会有偏移。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/top.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/top.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/top

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/top

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view style="flex-grow: 1;">
    <view class="uni-common-mb">
      <text class="uni-title-text">top: 20px (距离顶部 20px) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="top: 20px;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="top: 20px;" flatten></view>
        </view>
      </view>
    </view>
    <view class="uni-common-mb">
      <text class="uni-title-text">top: 20rpx (距离顶部 20rpx) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="top: 20rpx;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="top: 20rpx;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">top: 20% (距离顶部 20%) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="top: 20%;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="top: 20%;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">top: auto (自动，默认顶部对齐) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="top: auto;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="top: auto;" flatten></view>
        </view>
      </view>
    </view>

    <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
    <view class="uni-common-mb">
      <text class="uni-subtitle-text">top: 10% 和 top: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <scroll-view class="common" style="top: 10%;"></scroll-view>
        </view>
        <view class="example-box">
          <scroll-view class="common" style="top: 30px;"></scroll-view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 top </text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common test-view" :style="{ top: top }">
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common common-text test-text" :style="{ top: top }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common test-image" :style="{ top: top }" src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common test-view-flatten" :style="{ top: top }" flatten>
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common common-text test-text-flatten" :style="{ top: top }" flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{top}}</text>
        <text class="uni-info">获取值: {{topActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common test-image-flatten" :style="{ top: top }" flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="topEnum" title="top 枚举值" @change="radioChangeTop" :compact="true"></enum-data>
      <input-data :defaultValue="top" title="top 自定义值" type="text" @confirm="inputChangeTop"></input-data>
    </view>

    <view class="uni-common-mb">
      <text>native-view组件: top: 10% 和 top: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <native-view class="common" style="top: 10%;"></native-view>
        </view>
        <view class="example-box">
          <native-view class="common" style="top: 30px;"></native-view>
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

  const topEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '10px' },
    { value: 4, name: '20rpx' },
    { value: 5, name: '0%' },
    { value: 6, name: '50%' },
    { value: 7, name: 'auto' }
  ]

  const top = ref('10px')
  const topActual = ref('')
  const topActualText = ref('')
  const topActualImage = ref('')
  const topActualFlat = ref('')
  const topActualTextFlat = ref('')
  const topActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    topActual.value = viewRef.value?.style.getPropertyValue('top') ?? ''
    topActualFlat.value = viewRefFlat.value?.style.getPropertyValue('top') ?? ''
    topActualText.value = textRef.value?.style.getPropertyValue('top') ?? ''
    topActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('top') ?? ''
    topActualImage.value = imageRef.value?.style.getPropertyValue('top') ?? ''
    topActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('top') ?? ''
  }

  const changeTop = (value: string) => {
    top.value = value
    viewRef.value?.style.setProperty('top', value)
    viewRefFlat.value?.style.setProperty('top', value)
    textRef.value?.style.setProperty('top', value)
    textRefFlat.value?.style.setProperty('top', value)
    imageRef.value?.style.setProperty('top', value)
    imageRefFlat.value?.style.setProperty('top', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeTop = (index: number) => {
    const selectedItem = topEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeTop(selectedItem.name)
    }
  }

  const inputChangeTop = (value: string) => {
    changeTop(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeTop
  })
</script>

<style>
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

  .common-text{
    width:50px;
    font-size: 12px;
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
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/top)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.top)

