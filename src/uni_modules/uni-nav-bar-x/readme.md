# uni-nav-bar 自定义导航栏组件

## 用途和场景

在页面 `pages.json` 中关闭原生导航栏后（即 `"style": {"navigationStyle": "custom"}`），使用本组件实现自定义导航栏。

## 使用方式（职责分工）

- 组件内部负责：渲染顶部导航条并自动适配顶部安全区（用 padding-top 让出状态栏高度，除去状态栏高度后高度为 44px）；布局 left、mid、right 3 个区域。
  - left 区域默认显示一个返回箭头，大小为 44*44px，可通过属性 `hideDefaultBack` 隐藏，也可以传入 `slot name="left"` 替代，可通过 `left-class` 修饰样式；返回箭头在 web 端支持鼠标点击与键盘 Enter/Space 触发返回。
  - mid 区域默认显示 `title` 属性设置的标题，也可以传入 `slot name="mid"` 替代，其默认宽度为屏幕宽度减去两边默认边距与 left、right 区域默认宽度，可通过 `mid-class` 修饰样式。
  - right 区域默认不显示内容，可以传入 `slot name="right"` 显示自定义内容，默认宽度也是 44px，可通过 `right-class` 修饰样式。
  - 左右两边默认各让出 6px 边距，可通过 `left-class`、`right-class` 自定义。
- 使用者负责：
  - 在 `pages.json` 中设置页面 `navigationStyle: custom` 与 `disableScroll: true`。
  - 需要背景色时通过组件的 class 自行设置（本组件默认无背景色、透明）。
  - 需要自定义左右内容时通过 left/right 插槽填充，并自行处理插槽内容的样式与交互。

## 基本用法

```html
<template>
	<uni-nav-bar title="标题"></uni-nav-bar>

	<uni-nav-bar title="右边有按钮">
		<template #right>
			<text class="txt-button" @click="clickButton">⋯</text>
		</template>
	</uni-nav-bar>
</template>

<script setup lang="ts">
	function clickButton() {
		uni.showToast({ title: '点击了按钮' })
	}
</script>

<style>
	.txt-button {
		width: 44px;
		height: 44px;
		line-height: 44px;
		text-align: center;
	}
</style>
```

## 注意事项

- 需在 `pages.json` 中配置页面 `disableScroll: true` 禁止页面滚动，此时只有 uni-nav-bar 组件的下方才可以滚动；否则页面的回弹 bounce 效果会把自定义导航栏也拉下来。
- 本组件默认没有背景色，即透明，会透显页面的背景色，开发者可通过组件的 class 自行设置背景色。
- 如果遇到顶部安全区避让失效的问题，可升级到 HBuilderX 5.25 版本。
- 在小程序端，如果需要规避右上角胶囊按钮，可以通过 `right-class` 设置 margin-right 让出胶囊按钮的宽度和右侧间距：

```html
<template>
	<uni-nav-bar title="标题" right-class="nav-right">
		<template #right>
			<view :style="{ transform: 'translateX(-' + rightMargin + 'px)' }">
				<text class="txt-button">right</text>
			</view>
		</template>
	</uni-nav-bar>
</template>

<script setup lang="ts">
	const rightMargin = ref(0)
	onMounted(() => {
		// #ifdef MP-WEIXIN
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		const windowInfo = uni.getWindowInfo()
		// 预留胶囊按钮宽度和右侧间距，让右侧插槽显示在胶囊按钮左边
		rightMargin.value = windowInfo.windowWidth - menuButtonInfo.right + menuButtonInfo.width
		// #endif
	})
</script>

<style>
	.nav-right {
		overflow: visible;
	}

	.txt-button {
		width: 44px;
		height: 44px;
		line-height: 44px;
		text-align: center;
	}
</style>
```

- 示例页面路径：`/pages/uni-ui/nav-bar/nav-bar.uvue`。
