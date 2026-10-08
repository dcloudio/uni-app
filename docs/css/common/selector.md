# 选择器 @selector

App平台，支持的选择器比web少。这源于开发进度、性能、运行时体积、AI友好度等多方面考虑。

支持过多的选择器，会引入复杂的css优先级问题，这会导致性能下降，AI也容易搞错css优先级。
简单的class，可能多写几行代码，但对AI来说这不算什么，反而复杂的css权重让AI难以排查问题。\

uni-app x 额外引入了page选择器，该选择器是小程序规范，uni-app x 中全平台均支持。

| 名称 | 示例 | Web | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) | 描述 |
| :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
| 通配选择器 | * {} | 4.0 | x |   | x | x | x | x |  |
| 类选择器 | .class {} | 4.0 | 3.9 |   | 4.11 | 5.11 | 4.61 | 5.0 |  |
| 元素选择器 | \[tag] {} | 4.0 | x |   | x | x | x | x | App平台蒸汽模式支持page选择器 |
| ID 选择器 | #\[id] {} | 4.0 | x |   | x | x | x | x |  |
| 属性选择器 | \[attr] {} | 4.0 | x |   | x | x | x | x |  |
| 分组选择器 | .a, .b {} | 4.0 | 3.9 |   | 4.11 | 5.11 | 4.61 | 5.0 |  |
| 直接子代选择器 | .a > .b {} | 4.0 | 3.9 | x | 4.11 | x | 4.61 | x |  |
| 后代选择器 | .a .b {} | 4.0 | 3.9 | x | 4.11 | x | 4.61 | x |  |
| 一般兄弟选择器 | .a ~ .b {} | 4.0 | 3.9 | x | 4.11 | x | 4.61 | x |  |
| 紧邻兄弟选择器 | .a + .b {} | 4.0 | 3.9 | x | 4.11 | x | 4.61 | x |  |
| 伪类选择器 | :active {} | 4.0 | x |   | x | x | x | x |  |
| 伪元素选择器 | ::before {} | 4.0 | x |   | x | x | x | x |  |

## App平台不支持情况的替代方案
### 伪类
- 通过`:active`伪类来实现点击态，很容易触发，并且滚动或滑动时点击态不会消失。小程序平台均给view组件引入了`hover-class`，考虑到跨端兼容和体验，需使用 `hover-class` 属性来实现点击态效果。[详见](../../component/view.md#hover-class)
- :first-child / :last-child / :nth-child()，需改用动态class方式，示例代码[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/CSS/border/dynamic-border.uvue)

### 伪元素
- 字体图标，无法使用`::before`、`::after`等伪元素，而需使用unicode直显方案。[详见](./at-rules.md#iconfont)
- 不推荐使用伪元素来创建不占宽度的边框，W3C标准推荐使用 box-sizing 来控制边框是否占宽度。
- `::placeholder`：在input和textarea组件中，替代方案是[placeholder-class](../../component/input.md)。
- `::selection`：在input和textarea组件中，小程序和App平台可通过cursor-color影响选区颜色；在rich-text组件中，App平台支持selection-handle-color、selection-background-color属性来设置选区样式。
- `::part`：小程序和App平台不支持web component。仅支持vue组件，可使用[externalClass](./style-isolation.md#external-class)来设置组件中子组件的样式。

### 关系选择器
关系类选择器（分组选择器、直接子代选择器、后代选择器、一般兄弟选择器、紧邻兄弟选择），在App平台VDOM模式曾被支持，蒸汽模式暂不支持。

## App平台是后设生效
选择器声明的变化可能会导致元素重新绘制。为了减少选择器变化引起的 DOM 更新数量，**当前只支持：CSS 声明的多个选择器中最后一个规则的变更对 DOM 的更新**。

示例

```vue
<template>
  <view :class="docBody">
    <text :class="rowDesc">描述内容</text>
  </view>
</template>

<style>
  .doc-body1 .row-desc1 {
    color: #ff0000;
  }
  .doc-body1 .row-desc2 {
    color: #0000ff;
  }
  .doc-body2 .row-desc1 {
    color: #00ff00;
  }
</style>

<script setup>
  const rowDesc = ref('row-desc1')
  const docBody = ref('doc-body1')
</script>
```

以上代码示例，当我们把 `rowDesc` 变量从 `row-desc1` 变为 `row-desc2` 时，会更新 `text` 节点样式，但是如果把 `docBody` 变量从 `doc-body1` 变为 `doc-body2`，是不会更新 `text` 节点样式的。\
因为 `doc-body` 不是最后一个选择器，非末尾的选择器变更有可能影响很多 DOM 元素，从而影响到渲染性能。

## 示例：css选择器

示例源码 [pages/CSS/selector/selector.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/CSS/selector/selector.uvue)

```uvue
<template>
  <view>
    默认通过page选择器设置padding: 16px
    <text class="uni-subtitle-text">预期：page 内边距 16px、背景随主题变化；点按钮后变 20px</text>
    <!-- WEB 和 MP-WEIXIN 暂不支持动态修改 page 的 style，因此不展示切换按钮 -->
    <!-- #ifndef WEB || MP-WEIXIN -->
    <button id="setPagePaddingButton" @tap="setPagePadding">切换page padding为20px</button>
    <!-- #endif -->

    <!-- 类选择器 -->
    <view class="uni-common-mt">
      <text class="uni-title-text">类选择器 .class {}</text>
      <text class="uni-subtitle-text">预期：盒子边框蓝色、背景浅蓝</text>
      <view class="selector-demo selector-class" id="selector-class">
        <text>.selector-class 生效</text>
      </view>
    </view>

    <!-- 多类名（复合）选择器 -->
    <view class="uni-common-mt">
      <text class="uni-title-text">多类名（复合）选择器 .a.b {}</text>
      <text class="uni-subtitle-text">预期：仅 .selector-base 边框青色；再加 .selector-active 时背景和边框绿色</text>
      <view class="selector-demo selector-base" id="selector-base">
        <text>仅 .selector-base</text>
      </view>
      <view class="selector-demo selector-base selector-active" id="selector-compound">
        <text>.selector-base.selector-active 生效</text>
      </view>
    </view>

    <!-- 分组选择器 -->
    <view class="uni-common-mt">
      <text class="uni-title-text">分组选择器 .a, .b {}</text>
      <text class="uni-subtitle-text">预期：两个盒子边框均为红色</text>
      <view class="selector-demo selector-group-a" id="selector-group-a">
        <text>.selector-group-a</text>
      </view>
      <view class="selector-demo selector-group-b" id="selector-group-b">
        <text>.selector-group-b</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// #ifdef APP
const currentPage = getCurrentInstance()!.proxy!.$page

const getPageBackgroundColorContent = () : string => {
  return currentPage.getPageStyle()['backgroundColorContent'] as string
}

defineExpose({
  getPageBackgroundColorContent,
})
// #endif

// #ifndef WEB || MP-WEIXIN
const setPagePadding = () => {
  const pages = getCurrentPages()
  pages[pages.length - 1].querySelector('page')?.style.setProperty('padding', 'var(--page-padding-change)')
}
// #endif
</script>

<style>
  page {
    --page-padding-change: 20px;
    padding: var(--page-padding);
    background-color: var(--selector-page-background);
  }

  .selector-demo {
    width: 300px;
    padding: 10px;
    margin-top: 8px;
    border:#bcbcbc solid 2px;
    background-color: #fcbf6f;
  }

  /* 类选择器 */
  .selector-class {
    border-color: blue;
    background-color: #accaff;
  }

  /* 多类名（复合）选择器：.selector-base.selector-active 优先级更高，覆盖单类样式 */
  .selector-base {
    border-color: #00fcf9;
  }

  .selector-base.selector-active {
    border-color: green;
    background-color: #97d664;
  }

  /* 分组选择器 */
  .selector-group-a,
  .selector-group-b {
    border-color: red;
  }
</style>

```

## tips
- web端可以使用`html`、`body`、`:root`等选择器。由于页面的css样式隔离，且html节点并未添加data-xxx属性，`html`、`:root`写在页面style内无效，只能写在App.uvue内。
- 深度选择器 `:deep()/::v-deep` 用法参考 [单文件 style - 深度选择器](../../vue/README.md#scoped) 文档。
