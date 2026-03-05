## border-width



border-width 属性用于设置元素边框的宽度。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-width: <line-width>{1,4};
```



### 值限制
- length
- enum



### border-width 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| thin | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 细边线，App平台对应值为1px |
| medium | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 中等边线，App平台对应值为3px |
| thick | Web: 4.0; Android: 3.93; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 宽边线，App平台对应值为5px |


### 默认值 @default-value 
 `medium`

**注意**
- App平台，HBuilderX3.92及以前版本默认值为0px；HBuilderX3.93+版本调整默认值为thin；HBuilderX4.0+版本调整默认值为medium，与W3C规范保持一致。
- Android平台Chrome浏览器或内置Webview中，实际默认值不是medium，是根据设备自动计算的介于thin和medium中间的值。这与W3C规范不符，在uni-app x编译到web时，对其进行了css重置，调整默认值为medium。





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-width.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-width.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-width

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-width

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
    <view>
      <text>border-width: 5px (无 border-style)</text>
      <view class="demo-box">
        <view class="common" style="border-width: 5px;"></view>
        <view class="common" style="border-width: 5px;" flatten></view>
      </view>
    </view>

    <view>
      <text>border-width: 5px</text>
      <view class="demo-box">
        <view class="common" style="border-width: 5px; border-style: solid;"></view>
        <view class="common" style="border-width: 5px; border-style: solid;" flatten></view>
      </view>
    </view>

    <view>
      <text>border-left-width: 5px</text>
      <view class="demo-box">
        <view class="common" style="border-left-width: 5px; border-left-style: solid; "></view>
        <view class="common" style="border-left-width: 5px; border-left-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-top-width: 10px</text>
      <view class="demo-box">
        <view class="common" style="border-top-width: 10px; border-top-style: solid; "></view>
        <view class="common" style="border-top-width: 10px; border-top-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-right-width: 15px</text>
      <view class="demo-box">
        <view class="common" style="border-right-width: 15px; border-right-style: solid; "></view>
        <view class="common" style="border-right-width: 15px; border-right-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-bottom-width: 20px</text>
      <view class="demo-box">
        <view class="common" style="border-bottom-width: 20px; border-bottom-style: solid; "></view>
        <view class="common" style="border-bottom-width: 20px; border-bottom-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>左下细边框蓝色</text>
      <view class="demo-box">
        <view class="common"
          style="border-left-width: 0.5px; border-bottom-width: 0.5px; border-left-style: solid; border-bottom-style: solid; border-color:blue;">
        </view>
        <view class="common"
          style="border-left-width: 0.5px; border-bottom-width: 0.5px; border-left-style: solid; border-bottom-style: solid; border-color:blue;"
          flatten></view>
      </view>
    </view>

    <!-- 圆角测试 -->
    <view>
      <text>border-width: 5px (无 border-style)</text>
      <view class="demo-box">
        <view class="common-circle" style="border-width: 5px;"></view>
        <view class="common-circle" style="border-width: 5px;" flatten></view>
      </view>
    </view>

    <view>
      <text>border-width: 5px</text>
      <view class="demo-box">
        <view class="common-circle" style="border-width: 5px; border-style: solid;"></view>
        <view class="common-circle" style="border-width: 5px; border-style: solid;" flatten></view>
      </view>
    </view>

    <view>
      <text>border-left-width: 5px</text>
      <view class="demo-box">
        <view class="common-circle" style="border-left-width: 5px; border-left-style: solid; "></view>
        <view class="common-circle" style="border-left-width: 5px; border-left-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-top-width: 10px</text>
      <view class="demo-box">
        <view class="common-circle" style="border-top-width: 10px; border-top-style: solid; "></view>
        <view class="common-circle" style="border-top-width: 10px; border-top-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-right-width: 15px</text>
      <view class="demo-box">
        <view class="common-circle" style="border-right-width: 15px; border-right-style: solid; "></view>
        <view class="common-circle" style="border-right-width: 15px; border-right-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>border-bottom-width: 20px</text>
      <view class="demo-box">
        <view class="common-circle" style="border-bottom-width: 20px; border-bottom-style: solid; "></view>
        <view class="common-circle" style="border-bottom-width: 20px; border-bottom-style: solid; " flatten></view>
      </view>
    </view>

    <view>
      <text>左下细边框蓝色</text>
      <view class="demo-box">
        <view class="common-circle"
          style="border-left-width: 0.5px; border-bottom-width: 0.5px; border-left-style: solid; border-bottom-style: solid; border-color:blue;">
        </view>
        <view class="common-circle"
          style="border-left-width: 0.5px; border-bottom-width: 0.5px; border-left-style: solid; border-bottom-style: solid; border-color:blue;"
          flatten></view>
      </view>
    </view>

    <view>
      <text>裁剪展现半圆</text>
      <view class="demo-box">
        <view style="width: 100px;height: 50px; /* 高度是宽度的一半 */
            overflow: hidden; /* 隐藏下半部分 */
            position: relative;">
          <view style="width: 100px;height: 100px; /* 完整的圆高度 */
            border: 10px solid blue; /* 环的厚度和颜色 */
            border-radius: 50px; /* 变成正圆 */
            box-sizing: border-box; /* 确保边框计算在宽度内 */"></view>
        </view>
        <view flatten style="width: 100px;height: 50px; /* 高度是宽度的一半 */
              overflow: hidden; /* 隐藏下半部分 */
              position: relative;">
          <view flatten style="width: 100px;height: 100px; /* 完整的圆高度 */
            border: 10px solid blue; /* 环的厚度和颜色 */
            border-radius: 50px; /* 变成正圆 */
            box-sizing: border-box; /* 确保边框计算在宽度内 */"></view>
        </view>
      </view>
    </view>

    <view>
      <text>底边透明，3边上色的 3/4 圆弧</text>
      <view class="demo-box">
        <view style="width: 40px; height: 40px;
          /* 1. 基础边框：厚度、样式、透明色 */
          border: 5px solid transparent;
          /* 2. 给其中三条边上色，形成 3/4 圆弧 */
          border-top-color: blue;
          border-right-color: blue;
          border-left-color: blue;
          /* 3. 变成正圆 */
          border-radius: 20px;
          transform: rotate(45deg) translateZ(0); /* 开启硬件加速 */"></view>
        <view flatten style="width: 40px; height: 40px;
          /* 1. 基础边框：厚度、样式、透明色 */
          border: 5px solid transparent;
          /* 2. 给其中三条边上色，形成 3/4 圆弧 */
          border-top-color: blue;
          border-right-color: blue;
          border-left-color: blue;
          /* 3. 变成正圆 */
          border-radius: 20px;
          transform: rotate(45deg) translateZ(0); /* 开启硬件加速 */"></view>
      </view>
    </view>

    <view>
      <text>底边上色，1/4边透明的 3/4 圆弧 加scale缩小</text>
      <view class="demo-box">
        <view style="width: 32px;height: 32px;
          border-radius: 16px;
          border: 2px solid blue;
          border-bottom-color: transparent;
          transform: scale(0.5) rotate(45deg);
          "></view>
        <view flatten style="width: 32px;height: 32px;
          border-radius: 16px;
          border: 2px solid blue;
          border-bottom-color: transparent;
          transform: scale(0.5) rotate(45deg);
          "></view>
      </view>
    </view>

    <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

    <view class="demo-box">
      <scroll-view class="common scroll-view-border" style="border-width: 5px;">
        <text class="common-text">border-width: 5px</text>
      </scroll-view>
      <scroll-view class="common scroll-view-border" style="border-width: 10px;">
        <text class="common-text">border-width: 10px</text>
      </scroll-view>
    </view>

    <!-- 动态设置 -->
    <view class="uni-common-mt">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-width </text>
    </view>

    <!-- 普通版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActual}}</text>
        <view class="test-box">
          <view ref="viewRef" class="common-dynamic test-view" :style="{ borderWidth: borderWidth, borderStyle: 'solid' }">
            <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActualText}}</text>
        <view class="test-box">
          <text ref="textRef" class="common-dynamic test-text"
            :style="{ borderWidth: borderWidth, borderStyle: 'solid' }">text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActualImage}}</text>
        <view class="test-box">
          <image ref="imageRef" class="common-image test-image" :style="{ borderWidth: borderWidth, borderStyle: 'solid' }"
            src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <!-- 拍平版本 -->
    <view class="test-container">
      <view class="test-item">
        <text class="uni-subtitle-text">view 组件拍平</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActualFlat}}</text>
        <view class="test-box">
          <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderWidth: borderWidth, borderStyle: 'solid' }"
            flatten>
            <view style="flex-grow: 1;background-color: cyan;"><text>view</text></view>
          </view>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">text 组件拍平</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActualTextFlat}}</text>
        <view class="test-box">
          <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderWidth: borderWidth, borderStyle: 'solid' }"
            flatten>text</text>
        </view>
      </view>

      <view class="test-item">
        <text class="uni-subtitle-text">image 组件拍平</text>
        <text class="uni-info">设置值: {{borderWidth}}</text>
        <text class="uni-info">获取值: {{borderWidthActualImageFlat}}</text>
        <view class="test-box">
          <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderWidth: borderWidth, borderStyle: 'solid' }"
            flatten src="/static/test-image/logo.png"></image>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-common-mb">
      <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
      <enum-data :items="borderWidthEnum" title="border-width 枚举值" @change="radioChangeBorderWidth"
        :compact="true"></enum-data>
      <input-data :defaultValue="borderWidth" title="border-width 自定义值" type="text"
        @confirm="inputChangeBorderWidth"></input-data>
    </view>

    <view class="uni-common-mb">
      <text>native-view组件: border-width: 5px 和 10px</text>
      <view class="demo-box">
        <native-view class="common" style="border-width: 5px; border-style: solid;"></native-view>
        <native-view class="common" style="border-width: 10px; border-style: solid;"></native-view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderWidthEnum : ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '0' },
    { value: 2, name: '1px' },
    { value: 3, name: '3px' },
    { value: 4, name: 'thin' },
    { value: 5, name: 'medium' },
    { value: 6, name: 'thick' }
  ]

  const borderWidth = ref('5px')
  const borderWidthActual = ref('')
  const borderWidthActualText = ref('')
  const borderWidthActualImage = ref('')
  const borderWidthActualFlat = ref('')
  const borderWidthActualTextFlat = ref('')
  const borderWidthActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderWidthActual.value = viewRef.value?.style.getPropertyValue('border-width') ?? ''
    borderWidthActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-width') ?? ''
    borderWidthActualText.value = textRef.value?.style.getPropertyValue('border-width') ?? ''
    borderWidthActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-width') ?? ''
    borderWidthActualImage.value = imageRef.value?.style.getPropertyValue('border-width') ?? ''
    borderWidthActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-width') ?? ''
  }

  const changeBorderWidth = (value : string) => {
    borderWidth.value = value
    viewRef.value?.style.setProperty('border-width', value)
    viewRefFlat.value?.style.setProperty('border-width', value)
    textRef.value?.style.setProperty('border-width', value)
    textRefFlat.value?.style.setProperty('border-width', value)
    imageRef.value?.style.setProperty('border-width', value)
    imageRefFlat.value?.style.setProperty('border-width', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderWidth = (index : number) => {
    const selectedItem = borderWidthEnum.find((item) : boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderWidth(selectedItem.name)
    }
  }

  const inputChangeBorderWidth = (value : string) => {
    changeBorderWidth(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderWidth
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

  .common-circle {
    width: 50px;
    height: 50px;
    background-color: gray;
    border-radius: 25px;
    margin: 5px;
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

  .scroll-view-border {
    border-style: solid;
    border-color: blue;
  }

  .common-text {
    font-size: 12px;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-width)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-width)

