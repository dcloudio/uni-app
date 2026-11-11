## uni-backarrow-circle 圆形返回按钮

带圆形背景的返回箭头组件。

很多界面顶部是沉浸式通顶，比如视频、地图，没有通栏的顶部导航栏，只需要一个独立的返回按钮。

同时这个按钮需要自带有透明度的背景，以防止和界面背景元素重叠造成不可见。

箭头由旋转 45° 的边框绘制，保留 28px × 28px 的圆形点击区域，支持系统暗黑模式，无字体或图片依赖。组件内置按下降低不透明度与 Web 端悬浮阴影效果。

App 端使用一个 `flatten` 子 view 绘制箭头并拍平到圆形背景上；Web、小程序端使用根节点的 `::after` 伪元素绘制箭头，不额外创建内部节点。

### 基本用法

将模块放入项目的 `uni_modules` 目录后，通过 easycom 使用：

```vue
<template>
  <uni-backarrow-circle @click="onBackClick" />
</template>

<script setup lang="ts">
  const onBackClick = () => {
    // 默认只触发 click，由调用方处理返回。
    uni.navigateBack({})
  }
</script>
```


#### auto-back

默认只触发 `click`，由调用方处理导航、关闭弹层或二次确认。需要组件自动返回上一页时，显式开启：

```vue
<uni-backarrow-circle auto-back />
```

请使用 `:auto-back="true"` 传入布尔值。开启自动返回后，组件先触发 `click`，随后调用 `uni.navigateBack({})`，不会等待异步点击处理完成；需要离开确认时，保持默认关闭，在确认后自行调用路由 API。

#### ios-glass

在 iOS 上开启玻璃背景及按下交互效果：

```vue
<uni-backarrow-circle ios-glass auto-back />
```

### 自定义样式

通过根节点的 class 或 style 可定制圆形区域样式，包括背景、位置等。

箭头子元素，为了性能通过边框和伪类实现，如使用externalClasses来自定义，需开发者理解组件内部实现。
所以本组件改为通过 css变量 自定义箭头样式，提供了如下2个css变量。

| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| --uni-backarrow-circle-color | #ffffff | 箭头颜色；深浅色模式默认均为白色，显式设置后覆盖默认值 |
| --uni-backarrow-circle-width | 2px | 箭头边框线宽 |

```vue
<uni-backarrow-circle class="back" />
```

```css
.back {
  --uni-backarrow-circle-color: #ffffff;
  --uni-backarrow-circle-width: 1px;
  background-color: rgba(0, 0, 0, 0.3);
}
```

圆形背景直径为 28px，组件已适配安全区，左侧额外保留 6px 间距。若外层已处理安全区，需覆盖组件对应的 margin，避免重复留白。

### 暗黑模式

组件默认跟随系统暗黑模式：圆形背景色自动加深，箭头颜色默认统一为 `#ffffff`。未显式设置 `--uni-backarrow-circle-color` 时生效。
