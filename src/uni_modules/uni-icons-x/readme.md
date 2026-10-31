# uni-icons 图标

适用于 uni-app x 蒸汽模式的字体图标组件。

组件内部DOM结构极简，只有一个 `text` 组件。通过 `type` 指定图标名称，并可直接在组件标签上设置 `class` 或 `style` 自定义颜色、字号及其他文字样式。

在web平台，内部使用了woff2字体，减少web包体积。

## 基本用法

```html
<template>
	<uni-icons type="search" />
	<uni-icons type="heart-filled" style="color: #ff5a5f; font-size: 28px;" />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | `''` | 图标名称，取值范围见 [属性表中的合法值](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/uni-icons.html#属性)；未传入或取值不存在时组件不显示图标 |

`type` 为字符串联合类型，在 IDE 中编写 `type="..."` 时会自动提示全部可选图标名称。

## 自定义颜色和字号

组件根节点是 `text`，标签上的 `class` 和 `style` 会直接作用于该节点：

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

## 自定义字体

组件内部通过 `@font-face` 引入字体：Web 平台使用 `uniicons.woff2`，其他平台使用 `uniicons.ttf`。如需替换为自定义字体，可自行覆盖根节点的 `font-family`：

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

## 样式说明

通过 `style` 设置的内联样式会覆盖组件默认样式；使用全局 class 覆盖 `font-family` 时，可能需要使用 `!important`。
