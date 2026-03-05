## border-color



CSS 属性 border-color 是一个用于设置元素四个边框颜色的快捷属性： border-top-color、border-right-color、border-bottom-color、border-left-color。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-color: <color>{1,4};
```



### 值限制
- color



### border-color 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| color | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示四个边框的颜色，仅用于单值语法。 |
| horizontal | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示水平（左边框和右边框）边框的颜色，仅用于双值语法。 |
| vertical | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示垂直（上边框和下边框）边框的颜色，仅用于双值或三值语法。 |
| top | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示上边框的颜色，仅用于三值或四值语法。 |
| bottom | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示下边框的颜色，仅用于三值或四值语法。 |
| right | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示右边框的颜色，仅用于四值语法。 |
| left | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 \<color> 来表示左边框的颜色，仅用于四值语法。 |
| inherit | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 这是一个关键词，用于指示四边的颜色值均继承自父元素的计算值。 |








### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-color.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-color.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-color

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-color

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>border-color: cyan</text>
        <view class="demo-box">
          <view class="common" style="border-width: 5px; border-color: cyan; border-style: solid;"></view>
          <view class="common" style="border-width: 5px; border-color: cyan; border-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-color: #00FF00</text>
        <view class="demo-box">
          <view class="common" style="border-width: 5px; border-color: #00FF00; border-style: solid;"></view>
          <view class="common" style="border-width: 5px; border-color: #00FF00; border-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-color: rgb(0,0,255)</text>
        <view class="demo-box">
          <view class="common" style="border-width: 5px; border-color: rgb(0,0,255); border-style: solid;"></view>
          <view class="common" style="border-width: 5px; border-color: rgb(0,0,255); border-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-color: rgba(0,255,255,0.5)</text>
        <view class="demo-box">
          <view class="common" style="border-width: 5px; border-color: rgba(0,255,255,0.5); border-style: solid;"></view>
          <view class="common" style="border-width: 5px; border-color: rgba(0,255,255,0.5); border-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-left-color: cyan</text>
        <view class="demo-box">
          <view class="common" style="border-left-width: 5px; border-left-color: cyan; border-left-style:solid;"></view>
          <view class="common" style="border-left-width: 5px; border-left-color: cyan; border-left-style:solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-top-color: green</text>
        <view class="demo-box">
          <view class="common" style="border-top-width: 5px; border-top-color: green; border-top-style: solid;"></view>
          <view class="common" style="border-top-width: 5px; border-top-color: green; border-top-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-right-color: yellow</text>
        <view class="demo-box">
          <view class="common" style="border-right-width: 5px; border-right-color: yellow; border-right-style: solid;"></view>
          <view class="common" style="border-right-width: 5px; border-right-color: yellow; border-right-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-bottom-color: blue</text>
        <view class="demo-box">
          <view class="common" style="border-bottom-width: 5px; border-bottom-color: blue; border-bottom-style: solid; "></view>
          <view class="common" style="border-bottom-width: 5px; border-bottom-color: blue; border-bottom-style: solid; " flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common scroll-view-border" style="border-color: cyan;">
          <text class="common-text">border-color: cyan</text>
        </scroll-view>
        <scroll-view class="common scroll-view-border" style="border-color: #00FF00;">
          <text class="common-text">border-color: #00FF00</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-color </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }">
              <view style="flex-grow: 1;background-color: green;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }" flatten>
              <view style="flex-grow: 1;background-color: green;"><text>view</text></view>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderColor}}</text>
          <text class="uni-info">获取值: {{borderColorActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderWidth: '5px', borderColor: borderColor, borderStyle: 'solid' }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderColorEnum" title="border-color 枚举值" @change="radioChangeBorderColor" :compact="true"></enum-data>
        <input-data :defaultValue="borderColor" title="border-color 自定义值" type="text" @confirm="inputChangeBorderColor"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-color: cyan 和 #00FF00</text>
        <view class="demo-box">
          <native-view class="common" style="border-width: 5px; border-style: solid; border-color: cyan;"></native-view>
          <native-view class="common" style="border-width: 5px; border-style: solid; border-color: #00FF00;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const borderColorEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'blue' },
    { value: 2, name: '#0000ff' },
    { value: 3, name: 'rgb(0, 0, 255)' },
    { value: 4, name: 'rgba(0, 0, 255, 0.5)' },
    { value: 5, name: 'transparent' }
  ]

  const borderColor = ref('blue')
  const borderColorActual = ref('')
  const borderColorActualText = ref('')
  const borderColorActualImage = ref('')
  const borderColorActualFlat = ref('')
  const borderColorActualTextFlat = ref('')
  const borderColorActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderColorActual.value = viewRef.value?.style.getPropertyValue('border-color') ?? ''
    borderColorActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-color') ?? ''
    borderColorActualText.value = textRef.value?.style.getPropertyValue('border-color') ?? ''
    borderColorActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-color') ?? ''
    borderColorActualImage.value = imageRef.value?.style.getPropertyValue('border-color') ?? ''
    borderColorActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-color') ?? ''
  }

  const changeBorderColor = (value: string) => {
    borderColor.value = value
    viewRef.value?.style.setProperty('border-color', value)
    viewRefFlat.value?.style.setProperty('border-color', value)
    textRef.value?.style.setProperty('border-color', value)
    textRefFlat.value?.style.setProperty('border-color', value)
    imageRef.value?.style.setProperty('border-color', value)
    imageRefFlat.value?.style.setProperty('border-color', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderColor = (index: number) => {
    const selectedItem = borderColorEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderColor(selectedItem.name)
    }
  }

  const inputChangeBorderColor = (value: string) => {
    changeBorderColor(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderColor
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
    border-width: 5px;
    border-style: solid;
  }

  .common-text {
    font-size: 12px;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-color)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-color)

