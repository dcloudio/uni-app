# uni-icons 图标

适用于 uni-app x 蒸汽模式的字体图标组件。

## 用途和场景

- 替代小图片，减少图片资源
- 界面中的功能图标、状态图标
- 需要跟随文字颜色、字号变化的图标

## 使用方式

组件负责：

- 根据 `type` 渲染对应字形，未传入或取值不存在时不显示图标
- 内部通过 `@font-face` 引入字体：Web/小程序使用 `uniicons.woff2`，App 使用 `uniicons.ttf`

使用者负责：

- 通过 `type` 指定图标名称
- 直接在组件标签上设置 `class` 或 `style` 自定义颜色、字号及其他文字样式

组件内部 DOM 结构极简，只有一个承载字形的 `text`（App）或 `view`（Web/小程序）节点。

## 基本用法

```html
<template>
	<uni-icons type="search" />
	<uni-icons type="heart-filled" style="color: #ff5a5f; font-size: 28px;" />
</template>
```

`type` 为字符串联合类型，在 IDE 中编写 `type="..."` 时会自动提示全部可选图标名称。

### 自定义颜色和字号

组件根节点承载字形，标签上的 `class` 和 `style` 会直接作用于该节点：

```html
<template>
	<uni-icons type="heart-filled" :class="active ? 'icon-active' : 'icon-base'" />
</template>

<style>
.icon-base {
	color: #8a8f99;
	font-size: 28px;
}

.icon-active {
	color: #ff5a5f;
}
</style>
```

### 自定义字体

如需替换为自定义字体，可自行覆盖根节点的 `font-family`：

```html
<template>
	<uni-icons type="search" class="custom-icon" />
</template>

<style>
@font-face {
	font-family: CustomFont;
	src: url('/static/custom.ttf');
}

.custom-icon {
	font-family: CustomFont;
}
</style>
```

## 图标调整

图标名称和使用方式保持不变。组件优先使用当前平台支持的 uni-app x [内置图标](https://doc.dcloud.net.cn/uni-app-x/css/common/at-rules.html#uniicon)。

### 内置图标

| `type` | 内置图标 | 支持平台 |
| --- | --- | --- |
| `left` | `back` | App、Web、小程序 |
| `closeempty` | `close` | App、Web、小程序 |
| `checkmarkempty` | `success_no_circle` | App、Web、小程序 |
| `info-filled` | `info` | App、Web、小程序 |
| `search` | `search` | App、Web、小程序 |
| `checkbox` | `success circle` | App |
| `checkbox-filled` | `success` | App |
| `close` | `cancel circle` | App |
| `clear` | `clear` | App |
| `info` | `info circle` | App |
| `circle` | `circle` | App |
| `star` | `favorites` | App |
| `home` | `home` | App |
| `more-filled` | `more` | App |

### 通过 transform 实现的图标

| `type` | 基础图标 | 处理方式 |
| --- | --- | --- |
| `top`、`up` | `left` | 旋转 90° |
| `right` | `left` | 旋转 180° |
| `bottom`、`down` | `left` | 旋转 -90° |
| `plusempty` | `closeempty` | 旋转 45° |
| `plus` | `close` | 旋转 45° |
| `plus-filled` | `clear` | 旋转 45° |
| `arrow-up` | `arrow-left` | 旋转 90° |
| `arrow-right` | `arrow-left` | 旋转 180° |
| `arrow-down` | `arrow-left` | 旋转 -90° |
| `last-page`、`skip-right-line` | `first-page` | 旋转 180° |

## 注意事项

- 通过 `style` 设置的内联样式会覆盖组件默认样式。
- 使用全局 class 覆盖 `font-family` 时，可能需要使用 `!important`。
