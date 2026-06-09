# uni-app x CSS 与标准 CSS 的差异

uni-app x 在 App 平台实现了 Web CSS 的子集（ucss）。工程中仍使用 `.css`、`.less`、`.scss` 等常见样式文件后缀，`style` 节点的 `lang` 属性也不需要特殊写法。

为了把 CSS 编译到 Android、iOS、HarmonyOS 等原生渲染系统，uni-app x 对布局模型、选择器、继承、层级、单位、函数、动画及部分属性取值做了约束。本文罗列主要差异，并提供迁移建议。

> CSS 属性的完整兼容性以各属性文档为准，详见 [CSS 概述](./README.md) 和各属性页面。

> 本文重点说明 App 平台差异。uni-app x 编译到 Web、小程序等平台时可以支持更多标准 CSS 能力，但框架仍会做 CSS 重置，以保证 ucss 子集在各端效果尽量一致。

## 概述

### App 平台是 Web CSS 的子集

浏览器、Android、iOS、HarmonyOS 都有自己的布局和样式系统。uni-app x 的 CSS 子集抽取了 Web 和 App 原生渲染系统的共同能力，并使用接近 Web CSS 的语法来设置原生组件样式。

这意味着一些标准 CSS 写法在浏览器中有效，但在 App 平台不支持或表现不同。常见差异包括：

- 布局以 flex 和绝对定位为主，不支持完整的 block、inline、grid、table 等标准 Web 布局模型。
- 选择器能力受限，推荐使用简单 class 选择器。
- 样式不继承，父元素样式不会自动影响子元素。
- 页面默认不可滚动，需要使用 `scroll-view`、`list-view` 等滚动组件。
- 一些 CSS 函数、at-rules、属性值、默认值和层级规则与标准 CSS 不同。

### uni-app x 会重置部分 CSS 默认值

标准浏览器 CSS 有较多历史默认值，例如 `auto`、`normal`、`medium` 等值在不同场景下有复杂行为。uni-app x 为了跨端一致性，会对部分默认值做 CSS reset。

例如：

- 标准 CSS 中 flex 主轴默认是横向，即 `flex-direction: row`；uni-app x 中默认是纵向，即 `flex-direction: column`。
- 标准 CSS 中 `box-sizing` 默认是 `content-box`；uni-app x 中默认是 `border-box`。
- 部分属性在 App 平台会使用独立、明确的默认值，避免依赖继承或浏览器复杂计算。

完整 CSS reset 清单不在本文重复维护，详见 [CSS 概述 - css样式重置](./README.md#css-reset)。本文只概括迁移时最容易影响布局和视觉结果的几类差异：

- 布局和盒模型默认值不同，例如 `display`、`flex-direction`、`flex-shrink`、`box-sizing`、`overflow`、`position`。
- 文本和颜色默认值不同，例如 `font-size`、`color`、`border-color`、`text-align`、`white-space`。
- 标准 CSS 中一些复杂默认值会被明确化，例如 `normal`、`auto`、`medium`、`currentcolor` 等相关行为。
- App 平台与 Web 平台也可能存在 reset 差异，例如部分属性在 App 端和 Web 端的默认值不同，具体以 CSS 概述中的清单为准。

### 标准 CSS 思维需要迁移为组件样式思维

标准 Web 开发中，开发者经常通过父级样式继承、复杂选择器、页面滚动和全局层叠来组织样式。

uni-app x 更接近原生应用开发：容器组件、文本组件、滚动组件各自负责自己的能力。推荐把样式写到实际需要生效的组件上，用组件属性和 class 控制局部样式，避免依赖浏览器文档流和层叠规则。

## 约束说明

### 1. 布局模型

#### 默认使用 flex 布局 @default-flex

标准 CSS 中，普通元素默认参与 block 文档流，`display: flex` 需要显式声明。

uni-app x 中页面布局以 flex 为主。App 平台仅支持 flex 布局和绝对定位；`display` 仅支持 `flex` 和 `none`，不支持标准 CSS 中的 `block`、`inline`、`inline-block`、`grid`、`table` 等值。

部分组件内部有自己的布局规则，例如 `text` 内部类似 inline，`rich-text` 内部适合文档流内容，`waterflow` 内部为瀑布流布局。

标准 CSS 写法：

```css
.article {
  display: block;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

uni-app x 推荐写法：

```css
.container {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.left {
  width: 120px;
}

.right {
  flex: 1;
}
```

#### display 默认值和取值不同 @display-value

标准 CSS 中，`display` 默认值为 `inline`，且支持多种布局模型。

uni-app x 中 `display` 默认值为 `flex`，App 平台仅支持：

- `flex`：元素使用弹性布局。
- `none`：元素不显示，也不占据布局空间。

如果只想隐藏元素但保留布局占位，应使用 `visibility: hidden`。

#### flex 方向默认值不同 @flex-direction-default

标准 CSS 中，flex 容器的默认主轴方向是 `row`。

uni-app x 为了适配移动端高频纵向布局，默认主轴方向为 `column`。如果需要横向排列，应显式设置 `flex-direction: row`。

```css
.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}
```

#### Flex 默认值与标准 CSS 不完全一致 @flex-defaults

uni-app x 的 flex 相关属性更偏向移动端 App 布局习惯，部分默认值被重置：

- `flex` 默认值为 `none`，标准 CSS 默认值为 `initial`。
- `flex-shrink` 默认值为 `0`，标准 CSS 默认值为 `1`。
- `align-content`、`align-items` 默认值为 `stretch`，标准 CSS 默认值为 `normal`。
- `justify-content` 默认值为 `flex-start`，标准 CSS 默认值为 `normal`。
- `align-items`、`align-self` 的 `baseline` 值在 App 平台不支持。

因此，从 Web 迁移页面时，不要假设子元素会按标准 CSS 默认规则自动收缩。如果希望元素在空间不足时收缩，需要显式设置 `flex-shrink`。

#### 页面默认不可滚动 @page-scroll

标准 Web 页面默认可以滚动。

App 原生页面默认不能滚动。如果页面内容需要滚动，应使用 `scroll-view` 或 `list-view` 等滚动组件。如果要实现整页滚动，通常在页面最外层放一个全屏 `scroll-view`。

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->

  <view class="content">
    <text>页面内容</text>
  </view>

  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
```

App 端页面滚动相关生命周期和 API，例如 `onPageScroll`、`onReachBottom`、`uni.pageScrollTo()`，会判断页面根节点是否为 `scroll-view`。如果不是 `scroll-view`，这些能力不生效。

#### overflow 支持值有限 @overflow-limit

标准 CSS 的 `overflow` 支持 `visible`、`hidden`、`scroll`、`auto`、`clip` 等值。

App 平台的 `overflow` 仅支持 `hidden` 和 `visible`（仅 `view` 组件支持 `visible`），不支持 `scroll`、`auto`、`clip`。App 平台默认值为 `hidden`（标准 CSS 默认值为 `visible`）。

如需滚动区域，需使用 `scroll-view` 等滚动组件。

#### 盒模型默认值不同 @box-sizing

标准 CSS 中，`box-sizing` 默认值为 `content-box`，`width` 和 `height` 只表示内容区域尺寸。

uni-app x 中 `box-sizing` 默认值为 `border-box`，`width` 和 `height` 包含内容、内边距和边框。迁移 Web 代码时，如果原页面依赖 `content-box` 计算尺寸，需要显式设置：

```css
.content-box {
  box-sizing: content-box;
}
```

### 2. 选择器

#### App 平台推荐使用 class 选择器 @class-selector

标准 CSS 支持标签选择器、ID 选择器、属性选择器、伪类、伪元素、后代选择器、兄弟选择器、分组选择器等复杂选择器。

App 平台选择器能力更窄，核心原则是：优先使用简单 class 选择器；标签、ID、属性、伪类、伪元素、通配选择器不作为 App 端可依赖能力；关系类选择器（子代、后代、兄弟）即使可用，也需要运行时动态计算，会带来额外性能损耗，蒸汽模式对部分关系选择器还有额外限制。

完整选择器支持清单不在本文重复维护，详见 [选择器](./common/selector.md)。

标准 CSS 写法：

```css
view > text.active,
#title,
[data-type="primary"] {
  color: red;
}
```

uni-app x 推荐写法：

```css
.title {
  color: red;
}

.primary-text {
  color: red;
}
```

#### class 名称字符范围有限 @class-name-chars

App 平台 class 选择器目前不支持除 `A-Z`、`a-z`、`0-9`、`_`、`-` 之外的字符。为了跨端一致，class 命名应只使用这些字符。

#### 动态选择器更新规则不同 @dynamic-selector

标准浏览器会根据完整选择器重新计算匹配。

uni-app x 为了减少选择器变化导致的 DOM 更新，目前只支持 CSS 声明中多个选择器的最后一个规则变更对 DOM 的更新。非末尾选择器变化可能不会触发内部子节点样式更新。

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
.doc-body2 .row-desc1 {
  color: #00ff00;
}
</style>
```

上例中，如果只改变外层 `docBody`，App 端可能不会按标准浏览器行为重新更新内部 `text` 样式。推荐把状态直接绑定到需要改变样式的节点上。

### 3. 样式继承

#### App 平台样式不继承 @no-inherit

标准 CSS 中，文字相关属性常常可以继承，例如 `color`、`font-size`、`font-family`、`font-weight` 等。

uni-app x App 平台样式不继承。父元素样式不会影响子元素。尤其是文本样式，应直接写在 `text` 组件上。

标准 CSS 写法：

```vue
<template>
  <view class="title">
    <text>标题</text>
  </view>
</template>

<style>
.title {
  color: red;
  font-size: 20px;
}
</style>
```

uni-app x 正确写法：

```vue
<template>
  <view>
    <text class="title-text">标题</text>
  </view>
</template>

<style>
.title-text {
  color: red;
  font-size: 20px;
}
</style>
```

#### `inherit`、`unset` 等继承相关关键字不支持 @inherit-keyword

由于 App 平台样式不继承，标准 CSS 中依赖继承的关键字，例如 `inherit`、`unset`，在 App 平台不支持。需要改为明确设置具体值。

标准 CSS 写法：

```css
.child {
  color: inherit;
}
```

uni-app x 推荐写法：

```css
.child {
  color: #333333;
}
```

### 4. 样式优先级和作用范围

#### 单 class 优先级按组件 class 属性书写顺序判断 @class-order-priority

标准 CSS 中，多个 class 的优先级通常由选择器权重和 CSS 定义顺序决定。

uni-app x App 平台中，内联 `style` 优先级高于 class。单 class 选择器以组件 `class` 属性中的书写顺序确定优先级，后面的优先级更高。

```vue
<template>
  <text class="blue red">hello</text>
</template>

<style>
.blue {
  color: blue;
}
.red {
  color: red;
}
</style>
```

上例中，`red` 写在 `class` 属性后面，优先级更高。为了跨端一致，应同时保证 CSS 定义顺序和组件 class 书写顺序符合预期。

#### `!important` 支持范围不同 @important

标准 CSS 中，`!important` 可以写在普通声明中，并参与浏览器层叠规则。

uni-app x App 平台中，`!important` 仅支持在 class 选择器中书写，可以覆盖内联 `style` 中的样式；内联 `style` 属性中不支持 `!important`。

#### 非 Web 平台不支持 CSS scoped @scoped

在 uni-app x 中，非 Web 平台不支持 `css scoped`。HBuilderX 5.0 起提供了统一的样式隔离策略 2.0，可通过 `styleIsolation`、`externalClasses` 等方式控制全局样式、页面样式和组件样式之间的影响关系。

组件作者如果希望开放组件内部子元素样式，推荐使用 [external-class](./common/style-isolation.md#external-class)。

### 5. 长度单位和数值

#### App 平台长度值可以不写单位 @length-unit

标准 CSS 中，除少数属性外，长度值必须带单位。例如 `width: 100` 是非法值。

App 平台长度 `<length>` 可以不设置单位，不设置单位时按 `px` 处理。Web 平台仍必须设置单位。为了跨端一致，推荐始终写明确单位。

标准 CSS 写法：

```css
.box {
  width: 100px;
  height: 40px;
}
```

App 平台可运行但不推荐的写法：

```css
.box {
  width: 100;
  height: 40;
}
```

#### 百分比和固有尺寸关键字支持范围有限 @size-keyword

标准 CSS 中，尺寸属性可使用 `fit-content`、`max-content`、`min-content`、`auto`、`none` 等固有尺寸关键字。

App 平台更倾向明确尺寸：

- `width`、`height` 支持 `auto`，但不支持 `fit-content`、`max-content`、`min-content`。
- `min-width`、`min-height` 默认值为 `0px`，不支持 `auto`、`none`、`fit-content`、`max-content`、`min-content`。
- `max-width`、`max-height` 支持长度值，不支持 `auto`、`none`、`fit-content`、`max-content`、`min-content`。
- 百分比单位仅在部分属性中支持，例如 `width`、`height`、`padding-*`、`margin-*`、`top`、`left`、`right`、`bottom`、`flex-basis` 等。

标准 CSS 写法：

```css
.label {
  width: max-content;
  min-width: auto;
}
```

uni-app x 推荐写法：

```css
.label {
  width: 120px;
  min-width: 0px;
}
```

#### 字体单位支持范围不同 @font-size-unit

标准 CSS 的 `font-size` 支持 `px`、`em`、`rem`、百分比、关键字等多种单位和值。

App 平台 `font-size` 仅支持 `px` 和 `rpx`，默认值为 `16px`。不支持百分比、`em`、`rem`、`ex`，也不支持 `small`、`medium`、`large` 等关键字。

```css
.text {
  font-size: 16px;
}
```

虽然 `font-size` 支持 `rpx`，但一般不推荐。大多数字体使用默认 `16px` 或明确的 `px` 更符合性能和宽屏适配预期。

#### rpx、百分比有额外计算成本 @rpx-percent-cost

`rpx` 会根据屏幕宽度换算为 `px`，百分比会根据父容器尺寸换算为 `px`。二者都需要运行时计算，且可能产生小数精度差异。

推荐优先使用 `px` 和 `flex: 1` 组织布局：

- 固定尺寸使用 `px`。
- 剩余空间使用 `flex: 1`。
- 需要按屏幕宽度适配时使用 `rpx`。
- 需要按父容器尺寸适配时使用百分比。

#### 不支持标准外边距折叠 @no-margin-collapse

标准 CSS 文档流中，相邻块级元素或父子元素的上下外边距可能发生折叠。

uni-app x App 平台不支持外边距折叠。两个相邻元素的 `margin-top`、`margin-bottom` 会按 flex 布局规则分别计算。迁移 Web 页面时，如果原布局依赖 margin collapse 减少间距，需要改为明确的容器间距或单侧 margin。

#### line-height 支持范围不同 @line-height

标准 CSS 的 `line-height` 支持百分比、无单位数值、长度值等，并且继承时无单位值和 `em` 表现不同。

App 平台 `line-height` 支持 `px`、`rpx`、无单位数值和 `em`，不支持百分比。由于 App 平台样式不继承，无单位值与 `em` 的效果基本一致，即 `1.5` 与 `1.5em` 都按当前元素字体大小计算。

### 6. 定位和层级

#### `position: fixed` 的参照区域不同 @fixed-ref

标准 Web 中，`position: fixed` 相对浏览器视口定位。

uni-app x App 端中，`fixed` 相对页面区域定位，页面区域通常不包含原生导航栏和 tabBar。Web 端没有原生导航栏和 tabBar，导航栏和 tabBar 多由前端模拟，因此固定定位元素可能与 Web 端导航栏或 tabBar 重叠。

跨端处理安全区域时，推荐使用 `--uni-safe-area-inset-*` 系列 CSS 变量。

```css
.fixed-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: var(--uni-safe-area-inset-bottom);
}
```

#### `position` 默认值为 `relative` @position-default

标准 CSS 中，`position` 默认值为 `static`，`static` 定位元素不参与正常流之外的层叠。

App 平台的 `position` 默认值为 `relative`，且不支持 `static` 值。`relative` 元素在正常文档流中排列，配合 `flex` 布局使用。

#### 不支持标准 `position: sticky` @no-sticky

App 平台不支持标准 CSS 的 `position: sticky`。如需吸顶效果，推荐使用 uni-app x 提供的 [sticky 组件](../component/sticky.md)。

#### z-index 不能脱离 DOM 树任意比较 @z-index-scope

标准 Web 中，元素是否创建层叠上下文由多个 CSS 属性共同决定，子元素有时可以在祖先层叠上下文中跨父元素比较层级。

App 平台中每个元素都会创建层叠上下文，`z-index` 主要在同级兄弟元素之间比较。子元素不能任意跨父元素调整到全局最上层。

如果需要全局弹窗，推荐把弹窗节点放在页面末尾，并使用 `position: fixed` 控制层级。

此外，App 平台元素设置 `position: fixed` 时会被调整到根节点参与层级比较；`list-view` 的 `list-item` 因复用优化机制不支持 `z-index`。

#### top/right/bottom/left 仅对定位偏移生效 @position-offset

标准 CSS 中，`top`、`right`、`bottom`、`left` 对非定位元素无效。

uni-app x 中 `position` 默认值为 `relative`，所以直接设置 `top`、`left` 等偏移属性时，元素会相对自身正常位置偏移。该默认值差异容易让 Web 迁移代码出现位置偏差。如需完全按布局流排列，不要给元素设置偏移属性。

### 7. CSS 变量和函数

#### CSS 函数支持范围有限 @css-functions

标准 CSS 支持大量函数，例如 `calc()`、`min()`、`max()`、`clamp()`、`var()`、`env()`、颜色函数等。

uni-app x 当前主要支持 `url()`、`rgb()`、`rgba()`、`var()`、`env()`。其中 `calc()` 不属于通用支持的 App CSS 函数，不应按浏览器 CSS 习惯大量使用。具体支持范围以 [CSS 方法](./common/function.md) 为准。

#### 自定义 CSS 变量与标准 CSS 有差异 @css-variable

uni-app x 4.71 起 App 平台支持自定义 CSS 变量，但与标准 CSS 仍有差异：

- 定义变量时，不支持变量值为另一个 `var(--*)`。
- `var()` 回退值中不支持再嵌套 `var(--*)`。
- `transition` 暂不支持使用 `var()`。
- 部分组件或部分组件样式暂不支持 CSS 变量：VDOM 模式下 `input`、`textarea` 的 `placeholder-style`、`placeholder-class` 不支持 CSS 变量，`picker-view` 的 `indicator-style`、`indicator-class`、`mask-style`、`mask-class` 也暂不支持；蒸汽模式下 `input`、`textarea`、`loading` 的 class 暂不支持 CSS 变量。
- App 平台不支持 `:root` 伪类，应在页面根元素或合适父级元素的 class 中定义变量。

标准 CSS 写法：

```css
:root {
  --brand-color: #007aff;
}

.button {
  color: var(--brand-color);
}
```

uni-app x 推荐写法：

```vue
<template>
  <view class="page">
    <text class="button">按钮</text>
  </view>
</template>

<style>
.page {
  --brand-color: #007aff;
}

.button {
  color: var(--brand-color);
}
</style>
```

#### `env()` 支持属性有限 @env-function

App 平台的 `env()` 主要用于补齐 Web 安全区规范，且仅部分属性支持使用环境变量，例如 `padding-left`、`margin-top`、`width`、`height`、`top`、`right`、`bottom`、`left` 等。`padding`、`margin` 这类缩写属性不支持直接使用 `env()`，需要写成明确方向的展开属性。

实际开发中，处理导航栏、tabBar、LeftWindow、TopWindow、RightWindow 和屏幕安全区时，更推荐使用 `--uni-safe-area-inset-*` 系列 CSS 变量。

### 8. At-rules 和动画

uni-app x App 平台支持 `@font-face` 和 `@import`，其余 At-rules 中，`@keyframes` 和 `@media` 暂不支持，其他 At-rules 如 `@charset`、`@container`、`@supports` 等仅 Web 端有效，在 App 端均不适用。

#### 不支持 CSS `@keyframes` @no-keyframes

标准 CSS 可以使用 `@keyframes` 和 `animation` 编写关键帧动画。

uni-app x App 平台暂不支持通过 CSS `@keyframes` 实现关键帧动画。需要使用 API 方式实现动画，详见 [UniElement 的 animate 方法](../api/dom/unielement.md#animate)。

#### 不支持 CSS `@media` @no-media-query

标准 CSS 可以使用 `@media` 做媒体查询。

uni-app x App 平台暂不支持 CSS `@media`。宽屏适配推荐使用 [match-media 组件](../component/match-media.md)。暗黑模式判断可使用主题相关 API。

#### transition 支持范围有限 @transition-limit

标准 CSS 的 `transition-*` 支持多个属性、多个时长、多个 timing-function，并可对更多属性值做过渡。

uni-app x App 平台有以下差异：

- `transition-duration` 不支持指定多个时长。
- `transition-delay` 不支持指定多个时长。
- `transition-timing-function` 不支持指定多个过渡效果。
- `transition` 暂不支持结束属性值为百分比。
- HBuilderX 4.11 起，App 平台 `transition-property` 默认值调整为 `all`；更低版本默认值为 `none`。

### 9. 变换、背景、边框、阴影和文本属性

#### transform 支持的函数范围有限 @transform-limit

标准 CSS 的 `transform` 支持 `matrix()`、`matrix3d()`、`translate()`、`scale()`、`rotate()`、`skew()`、`perspective()` 等多类变换函数。

uni-app x App 平台主要支持 `rotate()`、`rotateX()`、`rotateY()`、`rotateZ()`、`scale()`、`scaleX()`、`scaleY()`、`translate()`、`translateX()`、`translateY()`。不应按标准 Web 习惯依赖 `skew()`、`matrix()`、`perspective()` 等复杂变换。

另外，App 平台 `transform-origin` 默认值为 `50% 50%`，标准 CSS 默认值为 `50% 50% 0`。iOS 上使用 `rotateX()`、`rotateY()`、`rotateZ()` 时，三维旋转可能出现同层级视图遮挡穿透部分；Android 上 `scale()` 后通过 `getBoundingClientRect()` 获取的宽高不会随缩放变化。

#### background-image 不支持普通背景图 @no-bg-image

标准 CSS 的 `background-image` 支持 `url()`、渐变、多背景等。

App 平台不支持普通背景图，仅支持 `linear-gradient()` 设置背景渐变色，且 `linear-gradient()` 只支持三个参数：

```css
.box {
  background-image: linear-gradient(to right, #ff0000, #00ff00);
}
```

如需图片内容，推荐使用 `image` 组件，而不是背景图。

#### background 简写只覆盖颜色和渐变场景 @background-shorthand

标准 CSS 的 `background` 简写可以同时设置背景图、位置、尺寸、重复、滚动方式、裁剪区域等多个子属性。

App 平台的 `background` 取值限制为颜色和渐变，不支持 `fixed`、`local`、`scroll`、普通背景图、多背景图等标准 Web 能力。`background-clip` 在 App 平台也不是完整支持：Android 支持 `border-box`，`padding-box`、`content-box` 仅 Web 支持；iOS 和 HarmonyOS 当前不支持 `background-clip`。

#### 圆角百分比支持不完全 @border-radius-percent

标准 CSS 中，`border-radius` 和四个方向的圆角属性都支持百分比。

App-Android/iOS 平台从 HBuilderX 5.0 起支持 `border-radius` 设置百分比；HarmonyOS 平台一直支持。四个方向的圆角属性，例如 `border-top-left-radius`，App 平台暂不支持设置百分比。

如需圆形裁剪，低版本或不确定宽高时可使用明确像素值或足够大的圆角值。

#### 边框默认颜色不是 currentcolor @border-color

标准 CSS 中，边框颜色默认使用 `currentcolor`，即当前元素的 `color`。

uni-app x App 平台中，`border-color`、`border-top-color`、`border-right-color`、`border-bottom-color`、`border-left-color` 默认值为 `#000000`。如果希望边框颜色跟随文字颜色，应显式设置边框颜色，而不是依赖 `currentcolor`。

```css
.tag {
  color: #007aff;
  border-color: #007aff;
}
```

边框宽度关键字也会被明确映射：`medium` 在 App 平台对应 `3px`，`thick` 对应 `5px`。

#### border-style 支持值少于标准 CSS @border-style-limit

标准 CSS 的边框样式包含 `none`、`hidden`、`dotted`、`dashed`、`solid`、`double`、`groove`、`ridge`、`inset`、`outset` 等。

App 平台当前主要支持 `none`、`solid`、`dashed`、`dotted`。如果 Web 页面依赖 `double`、`groove`、`ridge`、`inset`、`outset` 等效果，需要改成图片、额外节点或可支持的边框样式组合。

#### box-shadow 与标准 CSS 有平台差异 @box-shadow

App 平台 `box-shadow` 有以下差异：

- 默认阴影颜色为黑色 `#000000`。
- iOS 平台 `box-shadow` 和 `overflow: hidden` 不能同时设置。
- iOS 平台设置阴影的 `view` 不建议使用透明背景。
- HarmonyOS 平台不支持 `inset` 和阴影扩散半径。
- `box-shadow` 支持多个阴影的能力需以各平台属性文档为准，不建议依赖复杂多层阴影还原 Web 效果。

#### 文本样式应直接设置到 text 组件 @text-style

标准 CSS 中，文本属性通常可继承到子元素。

App 平台文本相关样式不继承，例如 `color`、`font-size`、`font-family`、`font-style`、`font-weight`、`text-overflow`、`text-decoration-*` 等，应直接设置到 `text` 组件。

此外，部分文本属性有取值限制：

- `font-family` 不支持使用逗号分隔的多个字体回退列表。
- `text-decoration` 简写在 App 平台不支持，推荐使用 `text-decoration-line`。
- `text-decoration-line` 仅支持 `underline` 和 `line-through`。
- `text-decoration-color` 在 Android 平台不支持自定义修饰线颜色；iOS 非蒸汽模式也不支持。
- `text-decoration-style`、`text-decoration-thickness` 在 App 平台暂不支持。
- `text-shadow` 支持范围以属性文档为准，阴影颜色默认使用文本颜色，主要适用于 `text`、`button`。
- `text-overflow` 不会截断单个字符的一部分。
- `letter-spacing` 默认值为 `0`，标准 CSS 默认值为 `normal`。
- `text-align` 默认值为 `left`，标准 CSS 默认值为 `start`。
- `white-space` 在 App 平台有额外的 `keep` 值，HBuilderX 5.0 起 App 端默认值调整为 `keep`，Web 端默认值调整为 `pre-line`，标准 CSS 默认值为 `normal`。

#### 颜色关键字和 currentcolor 差异 @color-currentcolor

标准 CSS 中，`currentcolor` 可以作为颜色属性的间接值，也常作为边框颜色默认值。

App 平台 `color` 默认值为 `#000000`，并且 `currentcolor` 不作为 App 端可依赖的通用颜色值。涉及边框、文字装饰线等颜色时，推荐直接写明确颜色值。

颜色表达式也少于现代浏览器 CSS。App 平台主要支持颜色名、十六进制颜色、`rgb()`、`rgba()`、`transparent`；`hsl()`、`hsla()`、`lab()`、`lch()`、`oklab()`、`oklch()`、`color()`、`color-mix()`、相对颜色语法等现代颜色能力主要是 Web 能力，App 端不应依赖。

### 10. 指针事件和可见性

#### pointer-events 子元素行为不同 @pointer-events

标准 CSS 中，父元素设置 `pointer-events: none` 后，子元素如果显式设置 `pointer-events: auto`，仍可能响应事件。

App 平台中，当前元素设置 `pointer-events: none` 后，当前元素及其所有子元素都不会响应事件和默认行为，即使子元素显式设置 `pointer-events: auto`。

#### visibility 子元素行为不同 @visibility

标准 CSS 中，父元素设置 `visibility: hidden` 后，子元素可以通过 `visibility: visible` 再显示。

App 平台中，如果元素设置 `visibility: hidden`，其子元素也不可见，即使子元素设置 `visibility: visible` 也不可见。

### 11. 属性适用组件和拍平限制

#### CSS 属性并非对所有组件都生效 @component-scope

标准 Web 中，大多数 CSS 属性可以写在任意 DOM 元素上，是否生效由浏览器布局模型决定。

uni-app x 中很多 CSS 属性有明确的适用组件范围。常见规律如下：

- Flex 容器相关属性，如 `flex-direction`、`flex-wrap`、`align-items`、`justify-content` 等，主要适用于 `view`、`scroll-view`、`list-view`、`list-item`、`flow-item`、`swiper-item`、`navigator` 等容器类组件。
- 文本相关属性，如 `color`、`font-size`、`font-family`、`font-weight`、`text-align`、`text-decoration-*`、`text-overflow`、`white-space` 等，主要适用于 `text`、`button`、`input`、`textarea` 等文本类组件。
- 部分属性对某些组件有限制，例如 iOS 平台 `padding` 不支持 `slider`、`switch`、`web-view`、`image` 组件。

迁移 Web CSS 时，不要把同一组 class 无差别挂到所有组件上，应按组件类型拆分容器样式和文本样式。

#### 部分 CSS 属性不支持拍平 flatten @flatten-limit

蒸汽模式中的 `flatten` 会影响节点渲染方式。不是所有 CSS 属性都支持拍平节点。

当前文档中列出的不支持拍平的属性包括：`background-clip`、`background-image`、`lines`、`pointer-events`、`text-decoration`、`text-decoration-color`、`text-decoration-style`、`transition`、`transition-delay`、`transition-duration`、`transition-property`、`transition-timing-function`、`visibility`、`z-index`。

如果某个节点需要使用这些属性，不应为了减少层级而盲目添加 `flatten`。

## 重构建议

### 从复杂选择器改为状态 class

不要依赖复杂关系选择器定位内部节点。推荐把状态 class 直接绑定到目标组件上。

```vue
<template>
  <text :class="isActive ? 'title-active' : 'title'">标题</text>
</template>
```

```css
.title {
  color: #333333;
}

.title-active {
  color: #007aff;
}
```

### 从样式继承改为组件内显式设置

不要把文字样式写在父级 `view` 上等待子级继承。推荐在 `text` 上直接设置文本样式。

```vue
<template>
  <view class="card">
    <text class="card-title">标题</text>
    <text class="card-desc">描述</text>
  </view>
</template>
```

### 从页面滚动改为滚动组件

不要假设 App 页面天然可滚动。需要整页滚动时，在 App 端使用 `scroll-view` 作为根级滚动容器；需要长列表时优先使用 `list-view`。

### 从背景图改为 image 组件

不要把核心图片内容写成 `background-image: url(...)`。App 平台应使用 `image` 组件承载图片内容，再用布局容器控制位置和层级。

### 从全局 z-index 改为结构化层级

不要只依赖超大的 `z-index` 让深层节点覆盖全局。需要弹窗、浮层时，尽量把节点放到页面结构靠后的位置，并使用 `fixed` 定位。

### 从 CSS 媒体查询改为组件和 API

宽屏适配使用 `match-media` 组件；主题变化使用主题相关 API；关键帧动画使用 `UniElement.animate()` 等 API。

### 从浏览器默认值改为显式默认值

不要依赖浏览器默认的 `inline`、`static`、`visible`、`content-box`、`currentcolor`、`auto` 等行为。跨端页面中建议显式写出关键布局属性：

```css
.page {
  flex-direction: column;
}

.row {
  flex-direction: row;
  align-items: center;
}

.text {
  color: #333333;
  font-size: 16px;
}
```

### 按组件类型拆分样式

把容器布局、文本展示、图片展示拆成不同 class，避免在 `view` 上写文本样式，或在 `text` 上写容器布局样式。

## 常见对照

uni-app x App 平台和标准 CSS 的差异可以概括为以下几类：

- 布局模型不同：标准 CSS 默认是文档流，uni-app x App 端以 flex 和绝对定位为主，`display`、`flex-direction`、`flex-shrink`、`overflow`、`box-sizing` 等默认值和支持值都需要重新确认。
- 样式组织方式不同：标准 CSS 常依赖继承、复杂选择器和全局层叠；App 端更推荐简单 class、组件内显式样式和结构化层级。
- 单位和值域不同：App 端长度可省略单位但建议显式写单位；百分比、固有尺寸关键字、字体单位、颜色函数、transform 函数等支持范围小于现代浏览器。
- 页面能力不同：App 页面默认不可滚动，需使用滚动组件；`@media`、`@keyframes`、`position: sticky`、普通背景图等 Web 写法需要换成组件或 API。
- 平台渲染规则不同：`z-index` 主要在同级节点间比较，`pointer-events`、`visibility` 的父子行为与浏览器不同，部分属性还有组件适用范围和 flatten 限制。

如果需要逐项核对默认值、属性兼容性或不支持拍平属性，请分别查看 [CSS 概述](./README.md)、[样式清单](./README.md#样式清单) 和 [不支持拍平的 CSS 属性](./README.md#不支持拍平的-css-属性)。

## 相关文档

- [CSS 概述](./README.md)
- [选择器](./common/selector.md)
- [长度单位](./common/length.md)
- [CSS 方法](./common/function.md)
- [颜色](./common/color.md)
- [At-rules](./common/at-rules.md)
- [样式隔离策略和 externalClass](./common/style-isolation.md)
- [display](./display.md)
- [box-sizing](./box-sizing.md)
- [width](./width.md)
- [height](./height.md)
- [margin](./margin.md)
- [overflow](./overflow.md)
- [transform](./transform.md)
- [transform-origin](./transform-origin.md)
- [background](./background.md)
- [background-image](./background-image.md)
- [border-style](./border-style.md)
- [border-width](./border-width.md)
- [color](./color.md)
- [text-decoration-line](./text-decoration-line.md)
- [text-shadow](./text-shadow.md)
- [position](./position.md)
- [z-index](./z-index.md)
- [transition](./transition.md)
