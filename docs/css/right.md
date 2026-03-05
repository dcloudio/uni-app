## right



right CSS 属性定义了定位元素的右外边距边界与其包含块右边界之间的偏移，非定位元素设置此属性无效。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
right: <length> | <percentage> | auto;
```



### 值限制
- length
- percentage



### right 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 这个关键字表示：<br/>    <br/>      对于绝对定位元素，元素将忽略此属性而以 left 属性为准，如果此时设置 width: auto，将基于内容需要的宽度设置宽度；如果 left 也为 auto 的话，元素的水平位置就是它假如作为静态（即 static）元素时该在的位置。<br/>      对于相对定位元素，元素相对正常位置的偏移量将基于 left 属性；如果 left 也为 auto 的话，元素将不会有偏移。 |


### 默认值 @default-value 
 `auto`





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/right.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/right.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/right

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/right

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
  <view style="flex-grow: 1;">
    <view class="uni-common-mb">
      <text class="uni-title-text">right: 20px (距离右边 20px) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="right: 20px;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="right: 20px;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">right: 20rpx (距离右边 20rpx) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="right: 20rpx;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="right: 20rpx;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">right: 20% (距离右边 20%) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="right: 20%;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="right: 20%;" flatten></view>
        </view>
      </view>
    </view>

    <view class="uni-common-mb">
      <text class="uni-title-text">right: auto (自动，默认左边对齐) - 右侧：拍平</text>
      <view class="test-container">
        <view class="example-box">
          <view class="common" style="right: auto;"></view>
        </view>
        <view class="example-box">
          <view class="common" style="right: auto;" flatten></view>
        </view>
      </view>
    </view>

    <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

    <view class="uni-common-mb">
      <text class="uni-subtitle-text">right: 10% 和 right: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <scroll-view class="common" style="right: 10%;"></scroll-view>
        </view>
        <view class="example-box">
          <scroll-view class="common" style="right: 30px;"></scroll-view>
        </view>
      </view>
    </view>

    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 right </text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common test-view" :style="{ right: right }">
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common common-text test-text" :style="{ right: right }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common test-image" :style="{ right: right }" src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common test-view-flatten" :style="{ right: right }" flatten>
            <text class="common-text">view</text>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common common-text test-text-flatten" :style="{ right: right }" flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{right}}</text>
        <text class="uni-info">获取值: {{rightActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common test-image-flatten" :style="{ right: right }" flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="rightEnum" title="right 枚举值" @change="radioChangeRight" :compact="true"></enum-data>
      <input-data :defaultValue="right" title="right 自定义值" type="text" @confirm="inputChangeRight"></input-data>
    </view>

    <view class="uni-common-mb">
      <text>native-view组件: right: 10% 和 right: 30px</text>
      <view class="test-container">
        <view class="example-box">
          <native-view class="common" style="right: 10%;"></native-view>
        </view>
        <view class="example-box">
          <native-view class="common" style="right: 30px;"></native-view>
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

  const rightEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '0px' },
    { value: 3, name: '20px' },
    { value: 4, name: '40rpx' },
    { value: 5, name: '0%' },
    { value: 6, name: '50%' },
    { value: 7, name: 'auto' }
  ]

  const right = ref('10px')
  const rightActual = ref('')
  const rightActualText = ref('')
  const rightActualImage = ref('')
  const rightActualFlat = ref('')
  const rightActualTextFlat = ref('')
  const rightActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    rightActual.value = viewRef.value?.style.getPropertyValue('right') ?? ''
    rightActualFlat.value = viewRefFlat.value?.style.getPropertyValue('right') ?? ''
    rightActualText.value = textRef.value?.style.getPropertyValue('right') ?? ''
    rightActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('right') ?? ''
    rightActualImage.value = imageRef.value?.style.getPropertyValue('right') ?? ''
    rightActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('right') ?? ''
  }

  const changeRight = (value: string) => {
    right.value = value
    viewRef.value?.style.setProperty('right', value)
    viewRefFlat.value?.style.setProperty('right', value)
    textRef.value?.style.setProperty('right', value)
    textRefFlat.value?.style.setProperty('right', value)
    imageRef.value?.style.setProperty('right', value)
    imageRefFlat.value?.style.setProperty('right', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeRight = (index: number) => {
    const selectedItem = rightEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeRight(selectedItem.name)
    }
  }

  const inputChangeRight = (value: string) => {
    changeRight(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeRight
  })
</script>

<style>
  .example-box {
    position: relative;
    flex: 1;
    height: 60px;
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
    height: 60px;
    background-color: #e0e0e0;
  }
</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/right)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.right)

