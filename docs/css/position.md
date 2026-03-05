## position



position 属性用于指定元素在页面中的定位方式。与 top、right、bottom、left 等属性决定该元素的最终位置。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
position: static | relative | absolute | sticky | fixed;
```



### 值限制
- enum



### position 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| relative | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前元素将参与父节点布局，根据 top、right、bottom、left 等属性相对于自身偏移。 |
| absolute | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前元素将不参与父节点布局，布局时不会为该元素创建任何空间，在父元素的内容区域中进行绝对布局，根据 top、right、bottom、left 等属性决定其位置。 |
| fixed | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前元素将不参与父节点布局，将被视为页面根节点的子元素进行绝对布局，根据 top、right、bottom、left 等属性决定其位置。 |
| static | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。 |
| sticky | Web: 4.0; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): x | 元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block（最近块级祖先 nearest block-level ancestor），包括 table-related 元素，基于 top、right、bottom 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。<br/>      该值总是创建一个新的层叠上下文（stacking context）。注意，一个 sticky 元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的 overflow 是 hidden、scroll、auto 或 overlay 时），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见 Github issue on W3C CSSWG）。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue | relative |

 **注意**：W3C 默认值为：static





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/position.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/position.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/position

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/position

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1">
      <view class="common-box">
        <view>
          <view class="title-container">
            <text class="uni-title-text uni-common-mt">position: fixed</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common fixed" style="position: fixed">
              <text class="text">fixed</text>
            </view>
            <view class="common fixed" style="position: fixed" flatten>
              <text class="text">fixed(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
        <view>
          <view class="title-container">
            <text class="uni-subtitle-text">(四方向组合: top + left + bottom + right)</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common combo-all-sides fixed-combo" style="position: fixed">
              <text class="text">fixed 四方向</text>
            </view>
            <view class="common combo-all-sides fixed-combo" style="position: fixed" flatten>
              <text class="text">fixed 四方向(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="common-box">
        <view>
          <view class="title-container">
            <text class="uni-title-text uni-common-mt">position: absolute</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common" style="position: absolute">
              <text class="text">absolute</text>
            </view>
            <view class="common" style="position: absolute" flatten>
              <text class="text">absolute(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
        <view>
          <view class="title-container">
            <text class="uni-subtitle-text">(四方向组合: top + left + bottom + right)</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common combo-all-sides-container" style="position: absolute">
              <text class="text">absolute 四方向</text>
            </view>
            <view class="common combo-all-sides-container" style="position: absolute" flatten>
              <text class="text">absolute 四方向(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="common-box">
        <view>
          <view class="title-container">
            <text class="uni-title-text uni-common-mt">position: relative</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common" style="position: relative">
              <text class="text">relative</text>
            </view>
            <view class="common" style="position: relative" flatten>
              <text class="text">relative(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
        <view>
          <view class="title-container">
            <text class="uni-subtitle-text uni-common-mt">(四方向组合: top + left + bottom + right)</text>
          </view>
          <scroll-view class="test-scroll-view">
            <view class="test-block red"></view>
            <view class="common combo-all-sides-container" style="position: relative">
              <text class="text">relative 四方向</text>
            </view>
            <view class="common combo-all-sides-container" style="position: relative" flatten>
              <text class="text">relative 四方向(拍平)</text>
            </view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
            <view class="test-block red"></view>
            <view class="test-block green"></view>
            <view class="test-block blue"></view>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mb">
        <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
        <text class="uni-subtitle-text">position: relative 和 position: absolute</text>
        <view class="position-test-box">
          <scroll-view class="scroll-view-common" style="position: relative; top: 20px; left: 20px; background-color: cyan;">
            <text>relative</text>
          </scroll-view>
          <scroll-view class="scroll-view-common" style="position: absolute; top: 65px; left: 65px; background-color: green;">
            <text>absolute</text>
          </scroll-view>
        </view>
      </view>

      <view class="uni-common-mt">
        <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 position </text>
      </view>

      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{position}}</text>
          <text class="uni-info">获取值: {{positionActual}}</text>
          <view class="test-box">
            <view class="test-block-small red"></view>
            <view ref="viewRef" class="common-dynamic test-view" style="top: 10px; left: 10px;" :style="{ position: position }">
              <text style="font-size: 10px;">view</text>
            </view>
            <view class="test-block-small blue"></view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{position}}</text>
          <text class="uni-info">获取值: {{positionActualText}}</text>
          <view class="test-box">
            <text class="test-block-small red test-block-small-text">红</text>
            <text ref="textRef" class="common-dynamic common-text-dynamic test-text" style="top: 10px; left: 10px;" :style="{ position: position }">text</text>
            <text class="test-block-small blue test-block-small-text">蓝</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{position}}</text>
          <text class="uni-info">获取值: {{positionActualImage}}</text>
          <view class="test-box">
            <image class="common-image-static" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-dynamic test-image" style="top: 10px; left: 10px;" :style="{ position: position }" src="/static/test-image/logo.png"></image>
            <image class="common-image-static" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="positionEnum" title="position 枚举值" @change="radioChangePosition" :compact="true"></enum-data>
        <input-data :defaultValue="position" title="position 自定义值" type="text" @confirm="inputChangePosition"></input-data>
      </view>

      <view class="uni-common-mb">
        <text>native-view组件: position: relative 和 position: absolute</text>
        <view class="position-test-box">
          <native-view class="scroll-view-common" style="position: relative; top: 20px; left: 20px; background-color: cyan;"></native-view>
          <native-view class="scroll-view-common" style="position: absolute; top: 65px; left: 65px; background-color: green;"></native-view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->

</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  const positionEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: 'static' },
    { value: 2, name: 'relative' },
    { value: 3, name: 'absolute' },
    { value: 4, name: 'fixed' }
  ]

  const position = ref('relative')
  const positionActual = ref('')
  const positionActualText = ref('')
  const positionActualImage = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    positionActual.value = viewRef.value?.style.getPropertyValue('position') ?? ''
    positionActualText.value = textRef.value?.style.getPropertyValue('position') ?? ''
    positionActualImage.value = imageRef.value?.style.getPropertyValue('position') ?? ''
  }

  const changePosition = (value: string) => {
    position.value = value
    viewRef.value?.style.setProperty('position', value)
    textRef.value?.style.setProperty('position', value)
    imageRef.value?.style.setProperty('position', value)
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangePosition = (index: number) => {
    const selectedItem = positionEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      changePosition(selectedItem.name)
    }
  }

  const inputChangePosition = (value: string) => {
    changePosition(value)
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    radioChangePosition
  })
</script>

<style>
  .common-box{
    flex-direction: row;
    justify-content: space-around;
  }

  .title-container {
    width: 180px;
    height: 45px;
    flex-direction: column;
  }

  .common {
    width: 80px;
    height: 50px;
    background-color: green;
    top: 60px;
    left: 30px;
    justify-content: center;
    align-items: center;
  }

  .fixed {
    /* #ifdef WEB*/
    top: calc(var(--uni-safe-area-inset-top) + 60px);
    left: calc(var(--uni-safe-area-inset-left) + 30px);
    /* #endif */
  }

  .text {
    width: 100%;
    font-size:12px;
  }

  .test-block {
    width: 50px;
    height: 50px;
  }

  .test-block-small {
    width: 40px;
    height: 40px;
  }

  .test-block-small-text {
    font-size: 10px;
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

  .test-scroll-view {
    width: 180px;
    height: 200px;
    background-color: gray;
  }

  .combo-all-sides {
    top: 60px;
    left: 220px;
    bottom: 40px;
    right: 40px;
  }

  .fixed-combo {
    /* #ifdef WEB*/
    top: calc(var(--uni-safe-area-inset-top) + 60px);
    left: calc(var(--uni-safe-area-inset-left) + 220px);
    bottom: calc(var(--uni-safe-area-inset-bottom) + 40px);
    right: calc(var(--uni-safe-area-inset-right) + 40px);
    /* #endif */
  }

  .combo-all-sides-container {
    top: 60px;
    left: 30px;
    bottom: 40px;
    right: 30px;
  }

  .common-dynamic {
    width: 40px;
    height: 40px;
    background-color: green;
  }

  .common-text-dynamic {
    background-color: green;
    color: white;
    font-size: 10px;
    padding: 5px;
  }

  .common-image-static {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 0, 0, 0.3);
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
    height: 120px;
    background-color: gray;
    position: relative;
  }

  .position-test-box {
    position: relative;
    width: 200px;
    height: 150px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin-top: 10px;
  }

  .scroll-view-common {
    width: 80px;
    height: 60px;
    justify-content: center;
    align-items: center;
  }

</style>

```

:::


#### App平台差异

absolute元素相对父组件确定位置，fixed元素位于页面顶层。

虽然App不支持sticky属性值，但uni-app x提供了全端可用的吸顶组件，另见[sticky组件](../component/sticky.md)

#### fixed定位@fixed

position: fixed定位时，web端为相对于整个浏览器页面进行定位，app端为相对于页面（除导航栏、tabbar）定位。可以使用css变量使两端表现一致

```css
.fixed {
  position: fixed;
  width: 100px;
  height: 100px;
  background-color: #FF0000;
  left: 10px;
  /* #ifdef WEB */
  top: calc(--window-top + 10px); //从HBuilderX 4.52起，推荐使用 --uni-safe-area-inset-top 来替代 --window-top
  /* #endif */
  /* #ifdef APP */
  top: 10px;  /* App端暂不支持calc */
  /* #endif */
}
```


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/position)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.position)

