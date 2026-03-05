## z-index

z-index 属性设置元素在渲染时的z轴顺序。在同一个层叠上下文下z-index较大的元素会覆盖在z-index较小的元素上面。

z-index并非一直有效果，如果加上z-index后元素仍未创建层叠上下文，则z-index属性无效。例如对于一个样式为`position: static;`（无其他会创建层叠上下文的样式）的元素设置z-index并不会改变其层级。

z-index文档参考：[MDN z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

层叠上下文文档参考：[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

以如下树形dom结构为例

```text
root
|-- view#1
    |-- view#1-1
    |-- view#1-2
|-- view#2
    |-- view#2-1
    |-- view#2-2
```

如果`view#1`元素创建了层叠上下文，则其子元素`view#1-1`、`view#1-2`就会不在渲染时和`view#2`及其子元素进行层级比较。此时`view#1-1`与`view#2`及`view#2`子元素的层级高低取决于`view#1`和`view#2`的层级高低。

如果`view#1`、`view#2`均未创建层叠上下文，则这两个元素及其子元素（`view#1-1`等）会在渲染时进行层级比较。此时如果设置`view#1-1`的样式为`position: relative; z-index: 100;`，则子元素在z轴的顺序为`view#1-2 --> view#2-1 --> view#2-2 --> view#1-1`。


z-index 属性设定了一个定位元素及其后代元素的 z-order。当元素之间重叠的时候，z-index 较大的元素会覆盖较小的元素在上层进行显示。


#### uni-app x 兼容性
| Web | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 | 5.0 |




### 语法
```
z-index: auto | <integer>;
```



### 值限制
- integer



### z-index 的属性值
| 名称 | 兼容性 | 描述 |
| :- | :- | :- |
| auto | Web: 4.0; Android: -; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | 盒子不会创建一个新的局部层叠上下文。盒子在当前层叠上下文的层叠等级是 0。 |


### 默认值 @default-value 
 | 平台 | 默认值 |
| :- | :- |
| uvue-app | 0 |
| uvue-web | auto |

 **注意**：W3C 默认值为：auto





### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/layout/z-index.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/CSS/layout/z-index.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/CSS/layout/z-index

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/CSS/layout/z-index

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view style="flex-grow: 1;">
      <view style="position:absolute;z-index:0;">
        <view class="common fixed default">
          <text>position: fixed</text>
          <text>z-index: 10</text>
        </view>
        <view class="common fixed specified">
          <text>position: fixed</text>
          <text>z-index: 5</text>
        </view>
        <view class="common fixed floor">
          <text>position: fixed</text>
          <text>z-index: -1</text>
        </view>
      </view>
      <view style="top: 170px;">
        <view class="common" style="background-color: cyan;z-index: 10;">
          <text>z-index: 10</text>
        </view>
        <view ref="view" class="common" style="background-color: green;z-index: 5;top: -100px;left: 100px;"
          @click="changeZIndex(20)">
          <text>z-index: {{data.zIndex}}</text>
          <text>点击修改z-index</text>
        </view>
        <view class="common" style="background-color: blue;top: -120px;left: 175px;">
          <text>z-index: 0</text>
        </view>
      </view>
      <view>
        <view>
          <view class="common fixed popup" style="background-color: yellow;z-index: 5;">
            <text>position: fixed</text>
            <text>z-index: 5</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="data.autoTest">
      <view style="z-index: 1;position: fixed;">111</view>
      <view style="width: 750rpx;">222</view>
    </view>
    <view style="top: 50px;">
      <text class="uni-title-text uni-common-mt">text 组件</text>
      <text class="common" style="background-color: cyan;z-index: 10;text-align: right;">text组件: z-index: 10</text>
      <text class="common" style="background-color: green;top: -37px;left: 87px;z-index: 5;text-align: right;">text组件: z-index: 5</text>
      <text class="common" style="background-color: blue;top: -75px;left: 175px;z-index: 0;text-align: right;">text组件: z-index: 0</text>
    </view>
    <view style="top: 50px;">
      <text class="uni-title-text uni-common-mt">image 组件</text>
      <image class="common image-zindex" style="background-color: cyan;z-index: 10;" src="/static/test-image/logo.png"></image>
      <image class="common image-zindex" style="background-color: green;top: -37px;left: 87px;z-index: 5;" src="/static/test-image/logo.png"></image>
      <image class="common image-zindex" style="background-color: blue;top: -75px;left: 175px;z-index: 0;" src="/static/test-image/logo.png"></image>
    </view>

    <view class="uni-common-mb" style="top: 50px;">
      <text class="uni-title-text uni-common-mt">scroll-view 组件</text>
      <text class="uni-subtitle-text">z-index: 10 和 z-index: 5</text>
      <scroll-view class="common" style="z-index: 10; background-color: cyan;">
        <text>z-index: 10</text>
      </scroll-view>
      <scroll-view class="common" style="top: -40px;left: 30px;z-index: 5;background-color: green;">
        <text style="line-height: 100px;">z-index: 5</text>
      </scroll-view>
    </view>

    <view class="uni-common-mt" style="top:100px;">
      <text class="uni-title-text">setProperty 设置与 getPropertyValue 获取 z-index </text>
      <view class="test-container">
        <view class="test-item">
          <text class="uni-subtitle-text">view 组件</text>
          <text class="uni-info">设置值: {{zIndexValue}}</text>
          <text class="uni-info">获取值: {{zIndexActual}}</text>
          <view class="test-box">
            <view class="common-bg" style="background-color: blue; z-index: 1;">
              <text class="common-text-bg">蓝色view</text>
            </view>
            <view ref="viewRef" class="common-dynamic test-view" style="background-color: cyan;" :style="{ zIndex: zIndexValue }">
              <text class="common-text-bg">青色view</text>
            </view>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">text 组件</text>
          <text class="uni-info">设置值: {{zIndexValue}}</text>
          <text class="uni-info">获取值: {{zIndexActualText}}</text>
          <view class="test-box">
            <text class="common-bg common-text-bg" style="background-color: blue; z-index: 1;">蓝色text</text>
            <text ref="textRef" class="common-dynamic common-text-bg test-text" style="background-color: cyan;" :style="{ zIndex: zIndexValue }">青色text</text>
          </view>
        </view>

        <view class="test-item">
          <text class="uni-subtitle-text">image 组件</text>
          <text class="uni-info">设置值: {{zIndexValue}}</text>
          <text class="uni-info">获取值: {{zIndexActualImage}}</text>
          <view class="test-box">
            <image class="common-bg common-image-bg" style="z-index: 1;" src="/static/test-image/logo.png"></image>
            <image ref="imageRef" class="common-dynamic common-image-bg test-image" :style="{ zIndex: zIndexValue }" src="/static/test-image/logo.png"></image>
          </view>
        </view>
      </view>

      <view class="uni-common-mt uni-common-mb">
        <text class="uni-tips">第一个枚举值，'' (空字符串) - 空值情况</text>
        <enum-data :items="zIndexEnum" title="z-index 枚举值" @change="radioChangeZIndex" :compact="true"></enum-data>
        <input-data :defaultValue="zIndexValue.toString()" title="z-index 自定义值" type="number" @confirm="inputChangeZIndex"></input-data>
      </view>

      <view class="uni-common-mb" style="top: 50px;">
        <text>native-view组件: z-index: 10 和 z-index: 5</text>
        <native-view class="common" style="z-index: 10; background-color: cyan;"></native-view>
        <native-view class="common" style="top: -40px;left: 30px;z-index: 5;background-color: green;"></native-view>
      </view>
    </view>

  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { ItemType } from '@/components/enum-data/enum-data-types'

  type DataType = {
    zIndex: number
    autoTest: boolean
  }

  const data = reactive({
    zIndex: 5,
    autoTest: false
  } as DataType)

  const view = ref(null as UniElement | null)

  const changeZIndex = (zIndexValue: number) => {
    data.zIndex = 20
    view.value?.style.setProperty('z-index', zIndexValue)
  }

  const zIndexEnum: ItemType[] = [
    { value: 0, name: '' },
    { value: 1, name: '-1' },
    { value: 2, name: '0' },
    { value: 3, name: '1' },
    { value: 4, name: '10' },
  ]

  const zIndexValue = ref(5)
  const zIndexActual = ref('')
  const zIndexActualText = ref('')
  const zIndexActualImage = ref('')
  const viewRef = ref(null as UniElement | null)
  const textRef = ref(null as UniTextElement | null)
  const imageRef = ref(null as UniImageElement | null)

  const getPropertyValues = () => {
    zIndexActual.value = viewRef.value?.style.getPropertyValue('z-index') ?? ''
    zIndexActualText.value = textRef.value?.style.getPropertyValue('z-index') ?? ''
    zIndexActualImage.value = imageRef.value?.style.getPropertyValue('z-index') ?? ''
  }

  const changeZIndexProperty = (value: number) => {
    zIndexValue.value = value
    viewRef.value?.style.setProperty('z-index', value)
    textRef.value?.style.setProperty('z-index', value.toString())
    imageRef.value?.style.setProperty('z-index', value.toString())
    // 使用 nextTick 确保样式已应用后再获取值
    nextTick(() => {
      getPropertyValues()
    })
  }

  const radioChangeZIndex = (index: number) => {
    const selectedItem = zIndexEnum.find((item): boolean => item.value === index)
    if (selectedItem != null) {
      const value = selectedItem.name === '' ? 0 : parseInt(selectedItem.name)
      changeZIndexProperty(value)
    }
  }

  const inputChangeZIndex = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue)) {
      changeZIndexProperty(numValue)
    }
  }

  onReady(() => {
    getPropertyValues()
  })

  defineExpose({
    data,
    changeZIndex,
    radioChangeZIndex
  })
</script>

<style>
  .common {
    width: 125px;
    height: 125px;
    justify-content: center;
    align-items: center;
  }

  .fixed {
    position: fixed;
  }

  .default {
    background-color: yellow;
    z-index: 10;
    top: var(--uni-safe-area-inset-top);
    left: var(--uni-safe-area-inset-left);
  }

  .specified {
    background-color: yellowgreen;
    z-index: 5;
    /* #ifdef APP || MP */
    top: 87px;
    left: 87px;
    /* #endif */
    /* #ifdef WEB */
    top: calc(var(--uni-safe-area-inset-top) + 87px);
    left: calc(var(--uni-safe-area-inset-left) + 87px);
    /* #endif */
  }

  .floor {
    background-color: chocolate;
    /* #ifdef APP || MP */
    top: 250px;
    left: 175px;
    /* #endif */
    /* #ifdef WEB */
    top: calc(var(--uni-safe-area-inset-top) + 250px);
    left: calc(var(--uni-safe-area-inset-left) + 175px);
    /* #endif */
    z-index: -1;
  }

  .popup {
    /* #ifdef APP || MP */
    top: 320px;
    left: 87px;
    /* #endif */
    /* #ifdef WEB */
    top: calc(var(--uni-safe-area-inset-top) + 320px);
    left: calc(var(--uni-safe-area-inset-left) + 87px);
    /* #endif */
    height: 40px;
  }

  .image-zindex {
    width: 125px;
    height: 125px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .common-dynamic {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .common-bg {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .common-text-bg {
    color: white;
    font-size: 12px;
    padding: 5px;
  }

  .common-image-bg {
    width: 80px;
    height: 80px;
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

</style>

```

:::

### 平台差异

1. app端z-index默认值为0，web端默认值为auto。position的默认值都是relative。

> HBuilderX 4.11版本web版将内置组件的默认z-index设为了0，于4.12版本撤回此修改。因此在4.11版本web端和app端无此项差异。

在app端每个元素都会创建层叠上下文，子元素不可跨父元素进行层级比较。

web端在**没有其他会产生层叠上下文的属性干扰时**不会创建层叠上下文，其子元素可在最近的一个拥有层叠上下文的祖先元素内跨父元素比较层级。

如下示例在app端四个方块自上而下颜色分别是`green -> blue -> aqua -> red`，web端颜色自上而下分别是`aqua -> green -> blue -> red`

```vue
<template>
  <view style="z-index: 0;flex: 1;">
    <view>
      <view id="view-1-1" class="square" style="z-index: 4;background-color: aqua;"></view>
      <view id="view-1-2" class="square" style="z-index: 1;background-color: red;margin-top: -90px;margin-left: 10px;"></view>
    </view>
    <view style="position: absolute; top: 20px;">
      <view id="view-2-1" class="square" style="z-index: 3;background-color: green;margin-left: 20px;"></view>
      <view id="view-2-2" class="square" style="z-index: 2;background-color: blue;margin-top: -90px;margin-left: 30px;"></view>
    </view>
  </view>
</template>
<script>
export default {}
</script>
<style>
  .square {
    width: 100px;
    height: 100px;
  }
</style>
```

2. app端`position: fixed;`定位的元素会移至根节点下渲染，web端`position: fixed;`无特殊处理。

app端对`position: fixed;`的元素设置z-index，此元素可以与根节点（template 的一级子节点）进行层级比较。

web端对`position: fixed;`的元素设置z-index，此元素仍会在所属的层叠上下文下和其他元素比较层级。

在上面示例的基础上我们将`view-1-2`设为`position: fixed;`，如下示例在app端四个方块自上而下颜色分别是`red -> green -> blue -> aqua`，web端颜色自上而下分别是`aqua -> green -> blue -> red`

```vue
<template>
  <view style="z-index: 0;flex: 1;">
    <view>
      <view id="view-1-1" class="square" style="z-index: 4;background-color: aqua;"></view>
      <view id="view-1-2" class="square view-1-2" style="z-index: 1;background-color: red;"></view>
    </view>
    <view style="position: absolute; top: 20px;">
      <view id="view-2-1" class="square" style="z-index: 3;background-color: green;margin-left: 20px;"></view>
      <view id="view-2-2" class="square" style="z-index: 2;background-color: blue;margin-top: -90px;margin-left: 30px;"></view>
    </view>
  </view>
</template>
<script>
export default {}
</script>
<style>
  .square {
    width: 100px;
    height: 100px;
  }

  .view-1-2 {
    position: fixed;
    left: 10px;
    /* #ifdef APP */
    top: 10px;
    /* #endif */
    /* #ifdef WEB */
    top: calc(var(--window-top) + 10px);
    /* #endif */
  }
</style>
```

### 全局弹窗

了解了z-index特性及平台差异后，可以看出如果直接对层级比较深的元素设置一个较大的z-index并不一定能将此元素覆盖在所有元素之上。如需使用fixed实现弹窗覆盖其他元素，建议将弹窗放在页面末尾。

<!-- 建议使用[teleport组件](https://cn.vuejs.org/guide/built-ins/teleport.html)实现全局弹窗，teleport组件会将元素实际位置移动到指定的节点下。 -->

### Bug & Tips@tips
- App平台仅对同级的兄弟元素之间支持 z-index 来调节，同级元素中 z-index 较大的元素会覆盖较小的元素在上层进行显示，没有设置 z-index 值时，同级元素中写在后面的元素覆盖写在前面的元素。
- App平台元素设置position为fixed时，会将元素调整到根节点，此时z-index会在根节点中比较确定覆盖关系。
- App 平台 list-view 的子组件 list-item 有复用优化机制，list-item 组件不支持 z-index 属性。


### 参见
- [MDN Reference](https://developer.mozilla.org/docs/Web/CSS/z-index)
- [相关 Bug](https://issues.dcloud.net.cn/?mid=css.properties.z-index)

