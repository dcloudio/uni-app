---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-backarrow-circle
---

::: sourceCode
## uni-backarrow-circle

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-backarrow-circle

:::

带圆形背景的返回箭头组件，使用旋转边框绘制箭头，支持暗黑模式与 CSS 变量定制箭头颜色、线宽；默认只触发 click，开启 autoBack 后自动返回上一页。

> 本 Component 是 uni ext component，需下载插件：[uni-backarrow-circle](https://ext.dcloud.net.cn/plugin?id=30536)


# uni-backarrow-circle 圆形返回按钮

带圆形背景的返回箭头组件。箭头由旋转 45° 的边框绘制，保留 28px × 28px 的圆形点击区域，支持系统暗黑模式，无字体或图片依赖。

App 端使用一个 `flatten` 子 view 绘制箭头并拍平到圆形背景上；Web、小程序端使用根节点的 `::after` 伪元素绘制箭头，不额外创建内部节点。

## 基本用法

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

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autoBack | boolean | false | 点击后是否自动调用 `uni.navigateBack({})` 返回上一页 |

### autoBack

默认只触发 `click`，由调用方处理导航、关闭弹层或二次确认。需要组件自动返回上一页时，显式开启：

```vue
<uni-backarrow-circle auto-back />
```

请使用 `:auto-back="true"` 传入布尔值。开启自动返回后，组件先触发 `click`，随后调用 `uni.navigateBack({})`，不会等待异步点击处理完成；需要离开确认时，保持默认关闭，在确认后自行调用导航 API。

## 事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发；当 autoBack 为 `true` 时随后返回上一页 | 无 |

## 样式

通过根节点的 class 或 style 定制背景、位置等样式，无需 externalClasses。

| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| --uni-backarrow-circle-color | 浅色 #000000，深色 #ffffff | 箭头颜色；显式设置后覆盖深浅色默认值 |
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

## 暗黑模式

组件默认跟随系统暗黑模式：圆形背景色自动加深，箭头颜色由 #000000 切换为 #ffffff。未显式设置 `--uni-backarrow-circle-color` 时生效。



### 兼容性 <Help />
Web: 5.33; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.33; iOS(Vapor): 5.33; HarmonyOS(Vapor): 5.33


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| autoBack | boolean | false | Web: 5.33; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.33; iOS(Vapor): 5.33; HarmonyOS(Vapor): 5.33 | 点击后是否自动调用 uni.navigateBack({}) 返回上一页 |
| @click | Function |   |   | 点击时触发，无参数；当 autoBack 为 true 时随后返回上一页 |

<!-- UTSCOMJSON.uni-backarrow-circle.fileFormates -->



<!-- UTSCOMJSON.uni-backarrow-circle.component_type -->






