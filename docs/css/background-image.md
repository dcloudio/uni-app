## background-image



background-image 属性用于为一个元素设置一个或者多个背景图像。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
background-image: <bg-image>#;
```



### 值限制
- gradient



### background-image 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| linear-gradient | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 使用由两种或多种颜色沿一条直线进行线性过渡的背景图像。 |
| none | Web: 4.0; Android: 4.27; iOS: 4.27; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 表示无背景图 |








### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/background/background-image.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/background/background-image.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/background/background-image

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/background/background-image

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <!-- 测试iOS平台宽高为0时，设置渐变色会不会导致闪退 -->
      <view style="width: 0px; height: 0px; background-image: linear-gradient(to bottom,#f5f5f5,#eff2f5);"></view>
      <text>不支持背景图片，仅支持linear-gradient方法</text>
      <view v-for="(direction) in directionData">
        <text>background-image: linear-gradient({{direction}}, red, yellow)</text>
        <view class="common"
          :style="{'background-image': backgroundSelect ?'linear-gradient('+direction+', red, yellow)':''}"></view>
      </view>
      <view>
        <text>style 动态切换 background</text>
        <view @click='changeBgStyle' class="common" :style='testStyle'>{{ testStyle}}</view>
      </view>
      <view>
        <text>class 动态切换 background</text>
        <view @click='changeBgClass' class="common" :class='testClass'>{{testClass}}</view>
      </view>

      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
      <text class="uni-subtitle-text">background-image: linear-gradient(to right, cyan, yellow);</text>
      <text class="uni-subtitle-text">background-image: linear-gradient(to bottom, blue, green);</text>
      <view class="demo-box">
        <scroll-view class="common" style="background-image: linear-gradient(to right, cyan, yellow);width: 150px;">
          <text class="common-text">to right</text>
        </scroll-view>
        <scroll-view class="common" style="background-image: linear-gradient(to bottom, blue, green);width: 150px;">
          <text class="common-text">to bottom</text>
        </scroll-view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">style.setProperty 动态设置 background-image </text>
        <text>background-image: {{backgroundImage}}</text>
        <view ref="viewRef" class="common" :style="{ backgroundImage: backgroundImage }">
          <text style="color: white;">当前 background-image: {{backgroundImage}}</text>
        </view>
      </view>

      <!-- 测试控制区域 -->
      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :compact="true" :items="backgroundImageEnum" title="background-image 枚举值" @change="radioChangeBackgroundImage"></enum-data>
        <input-data :defaultValue="backgroundImage" title="background-image 自定义值" type="text" @confirm="inputChangeBackgroundImage"></input-data>
      </view>

      <text class="uni-title-text uni-common-mt">native-view 组件</text>
      <text class="uni-subtitle-text">background-image: linear-gradient(to right, cyan, yellow);</text>
      <text class="uni-subtitle-text">background-image: linear-gradient(to bottom, blue, green);</text>
      <view class="demo-box uni-common-mb">
        <native-view class="native-view-bg" style="background-image: linear-gradient(to right, cyan, yellow);"></native-view>
        <native-view class="native-view-bg" style="background-image: linear-gradient(to bottom, blue, green);"></native-view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const backgroundSelect = ref(true)
  const directionData = ref(['to right', 'to left', 'to bottom', 'to top', 'to bottom left', 'to bottom right', 'to top left', 'to top right'])
  const testStyle = ref("background:linear-gradient(to right, red, yellow)")
  const testClass = ref("bg-color")

  //供自动化测试使用
  const updateBackgroundSelect = () => {
    backgroundSelect.value = !backgroundSelect.value
  }

  const setBackgroundColor = () => {
    testStyle.value = "background:blue"
  }

  const setBackgroundImage = () => {
    testStyle.value = "background:linear-gradient(to right, red, yellow)"
  }

  const changeBgStyle = () => {
    const isColor = testStyle.value == "background:blue"
    if (isColor) {
      setBackgroundImage()
    } else {
      setBackgroundColor()
    }
  }

  const changeBgClass = () => {
    testClass.value = testClass.value == "bg-color" ? "bg-image" : "bg-color"
  }

  defineExpose({
    updateBackgroundSelect,
    setBackgroundColor,
    setBackgroundImage,
    changeBgClass
  })

  const backgroundImage = ref('linear-gradient(to right, red, yellow)')
  const viewRef = ref(null as UniElement | null)

  const backgroundImageEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'linear-gradient(to right, red, yellow)' },
    { value: 2, name: 'linear-gradient(to bottom, blue, green)' },
    { value: 3, name: 'linear-gradient(to top, red, blue)' },
    { value: 4, name: 'linear-gradient(45deg, red, yellow)' },
    { value: 5, name: 'linear-gradient(to right, red, yellow, green)' },
    { value: 6, name: '(to right, red 0%, yellow 50%, green 100%)' },
    { value: 7, name: 'linear-gradient(to bottom left, red, yellow)' }
  ]

  const changeBackgroundImage = (value: string) => {
    backgroundImage.value = value
    viewRef.value?.style.setProperty('background-image', value)
  }

  const radioChangeBackgroundImage = (index: number) => {
    const selectedItem = backgroundImageEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changeBackgroundImage(selectedItem.name)
    }
  }

  const inputChangeBackgroundImage = (value: string) => {
    changeBackgroundImage(value)
  }

</script>

<style>
  .common {
    width: 250px;
    height: 100px;
  }
  .bg-color {
    background: blue;
  }
  .bg-image {
    background: linear-gradient(to right, red, yellow);
  }

  .demo-box {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }

  .common-text {
    font-size: 12px;
    color: white;
  }

  .native-view-bg {
    width: 150px;
    height: 100px;
  }
</style>

```

:::

#### App平台
原生应用没有背景图，这是一种影响性能的设计。App平台也不支持背景图，仅支持linear-gradient设置一个背景渐变色。
linear-gradient仅支持三个参数，格式如下：
```
linear-gradient(<direction>, <color-start>, <color-stop>)
```
- direction
	渐变方向，字符串类型，支持以下值：
	+ to right：从左向右渐变
	+ to left：从右向左渐变
	+ to bottom：从上到下渐变
	+ to top：从下到上渐变
	+ to bottom left：从右上角到左下角（3.99开始支持）
	+ to bottom right：从左上角到右下角
	+ to top left：从右下角到左上角
	+ to top right: 从左下角到右上角（3.99开始支持）
- color-start
	渐变起始点颜色值，支持RGB（rgb(255, 0, 0)）；RGBA（rgba(255, 0, 0, 0.5)）；十六进制（#ff0000）；精简写法的十六进制（#f00）；色值关键字（red）
- color-stop
	渐变终点颜色值，支持RGB（rgb(255, 0, 0)）；RGBA（rgba(255, 0, 0, 0.5)）；十六进制（#ff0000）；精简写法的十六进制（#f00）；色值关键字（red）

> background-image 优先级高于 background-color，同时设置 background-image 和 background-color 时 background-color 被覆盖。



### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/background-image)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.background-image)


### Bug & Tips@tips

- App-Harmony 平台，背景不支持绘制到 border 区域。
