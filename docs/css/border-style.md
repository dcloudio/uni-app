## border-style



border-style 是一个 CSS 简写属性，用来设定元素所有边框的样式。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
border-style: <line-style>{1,4};
```



### 值限制
- enum



### border-style 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| none | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 和关键字 hidden 类似，不显示边框。在这种情况下，如果没有设定背景图片，border-width 计算后的值将是 0，即使先前已经指定过它的值。在单元格边框重叠情况下，none 值优先级最低，意味着如果存在其他的重叠边框，则会显示为那个边框。 |
| solid | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一条实线。 |
| dashed | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一系列短的方形虚线。标准中没有定义线段的长度和大小，视不同实现而定。 |
| dotted | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示为一系列圆点。标准中没有定义两点之间的间隔大小，视不同实现而定。圆点半径是 border-width 计算值的一半。 |








### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/border/border-style.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/border/border-style.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/border/border-style

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/border/border-style

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <text class="uni-tips">说明：左边是正常版本，右边是拍平版本</text>
      <view>
        <text>border-style: dashed</text>
        <view class="demo-box">
          <view class="common" style="border-width: 5px; border-style: dashed"></view>
          <view class="common" style="border-width: 5px; border-style: dashed" flatten></view>
        </view>
      </view>

      <view>
        <text>border-left-style: dashed</text>
        <view class="demo-box">
          <view class="common" style="border-left-width: 5px; border-left-style: dashed"></view>
          <view class="common" style="border-left-width: 5px; border-left-style: dashed" flatten></view>
        </view>
      </view>

      <view>
        <text>border-top-style: dashed</text>
        <view class="demo-box">
          <view class="common" style="border-top-width: 5px; border-top-style: dashed"></view>
          <view class="common" style="border-top-width: 5px; border-top-style: dashed" flatten></view>
        </view>
      </view>

      <view>
        <text>border-right-style: dotted</text>
        <view class="demo-box">
          <view class="common" style="border-right-width: 5px; border-right-style: dotted"></view>
          <view class="common" style="border-right-width: 5px; border-right-style: dotted" flatten></view>
        </view>
      </view>

      <view>
        <text>border-bottom-style: dotted</text>
        <view class="demo-box">
          <view class="common" style="border-bottom-width: 5px; border-bottom-style: dotted"></view>
          <view class="common" style="border-bottom-width: 5px; border-bottom-style: dotted" flatten></view>
        </view>
      </view>

      <view>
        <text>border-style: solid (缺省 border-width)</text>
        <view class="demo-box">
          <view class="common" style="border-style: solid;"></view>
          <view class="common" style="border-style: solid;" flatten></view>
        </view>
      </view>

      <view>
        <text>border-style: none</text>
        <view class="demo-box">
          <view class="common" style="border-style: none; border-width: 5px;"></view>
          <view class="common" style="border-style: none; border-width: 5px;" flatten></view>
        </view>
      </view>

      <view @click="changeBorderStyle">
        <text>border-style: 点击切换</text>
        <view class="demo-box">
          <view class="common" :style="borderStyle"></view>
          <view class="common" :style="borderStyle" flatten></view>
        </view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>

      <view class="demo-box">
        <scroll-view class="common scroll-view-border" style="border-style: dashed;">
          <text class="common-text">border-style: dashed</text>
        </scroll-view>
        <scroll-view class="common scroll-view-border" style="border-style: dotted;">
          <text class="common-text">border-style: dotted</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 border-style </text>
      </view>

      <!-- 普通版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActual}}</text>
          <view class="test-box">
            <view ref="viewRef" class="common-dynamic test-view" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }">
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActualText}}</text>
          <view class="test-box">
            <text ref="textRef" class="common-dynamic test-text" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }">text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActualImage}}</text>
          <view class="test-box">
            <image ref="imageRef" class="common-image test-image" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <!-- 拍平版本 -->
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件拍平</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActualFlat}}</text>
          <view class="test-box">
            <view ref="viewRefFlat" class="common-dynamic test-view-flatten" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }" flatten>
              <text>view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件拍平</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActualTextFlat}}</text>
          <view class="test-box">
            <text ref="textRefFlat" class="common-dynamic test-text-flatten" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }" flatten>text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件拍平</text>
          <text class="uni-info">设置值: {{borderStyleValue}}</text>
          <text class="uni-info">获取值: {{borderStyleActualImageFlat}}</text>
          <view class="test-box">
            <image ref="imageRefFlat" class="common-image test-image-flatten" :style="{ borderWidth: '5px', borderStyle: borderStyleValue }" flatten src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="borderStyleEnum" title="border-style 枚举值" @change="radioChangeBorderStyle" :compact="true"></enum-data>
        <input-data :defaultValue="borderStyleValue" title="border-style 自定义值" type="text" @confirm="inputChangeBorderStyle"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: border-style: dashed 和 dotted</text>
        <view class="demo-box">
          <native-view class="common" style="border-width: 5px; border-style: dashed;"></native-view>
          <native-view class="common" style="border-width: 5px; border-style: dotted;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  let isSolid = false
  const borderStyle = ref("border-style: none; border-width: 5px;")

  const changeBorderStyle = () => {
    isSolid = !isSolid
    const solid = "border-style: solid; border-width: 5px;"
    const none = ""
    borderStyle.value = isSolid ? solid : none
  }

  const borderStyleEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'none' },
    { value: 2, name: 'solid' },
    { value: 3, name: 'dashed' },
    { value: 4, name: 'dotted' }
  ]

  const borderStyleValue = ref('solid')
  const borderStyleActual = ref('')
  const borderStyleActualText = ref('')
  const borderStyleActualImage = ref('')
  const borderStyleActualFlat = ref('')
  const borderStyleActualTextFlat = ref('')
  const borderStyleActualImageFlat = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)
  const viewRefFlat = ref(null as UniElement | null)
  const textRefFlat = ref(null as UniTextElement | null)
  const imageRefFlat = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    borderStyleActual.value = viewRef.value?.style.getPropertyValue('border-style') ?? ''
    borderStyleActualFlat.value = viewRefFlat.value?.style.getPropertyValue('border-style') ?? ''
    borderStyleActualText.value = textRef.value?.style.getPropertyValue('border-style') ?? ''
    borderStyleActualTextFlat.value = textRefFlat.value?.style.getPropertyValue('border-style') ?? ''
    borderStyleActualImage.value = imageRef.value?.style.getPropertyValue('border-style') ?? ''
    borderStyleActualImageFlat.value = imageRefFlat.value?.style.getPropertyValue('border-style') ?? ''
  }

  const changeBorderStyleValue = (value: string) => {
    borderStyleValue.value = value
    viewRef.value?.style.setProperty('border-style', value)
    viewRefFlat.value?.style.setProperty('border-style', value)
    textRef.value?.style.setProperty('border-style', value)
    textRefFlat.value?.style.setProperty('border-style', value)
    imageRef.value?.style.setProperty('border-style', value)
    imageRefFlat.value?.style.setProperty('border-style', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeBorderStyle = (index: number) => {
    const selectedItem = borderStyleEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBorderStyleValue(selectedItem.name)
    }
  }

  const inputChangeBorderStyle = (value: string) => {
    changeBorderStyleValue(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangeBorderStyle
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
    border-color: blue;
  }

  .common-text {
    font-size: 12px;
  }

</style>

```

:::


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/border-style)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.border-style)


## 注意事项

* 单独设置某个边的border-style的时候，比如`border-top-style`与其他边样式不同时，并且设置的边的颜色`border-top-color`不同时，就会导致以`solid`样式进行绘制，这是一个绘制的Bug，后续会解决。
