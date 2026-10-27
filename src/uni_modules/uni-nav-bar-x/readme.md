自定义导航栏组件

在页面pages.json中关闭原生导航栏后，即使用`"style": {"navigationStyle": "custom"}`，可以使用本组件实现自定义导航栏。

同时注意在pages.json中配置页面style增加属性`disableScroll:true`，即禁止页面滚动。此时只有uni-nav-bar组件的下方才可以滚动。否则页面的回弹bounce效果会把自定义导航栏也拉下来。

本组件自动适配顶部安全区。用padding-top让出顶部状态栏的高度。除去状态栏高度后，本组件的高度为44px。

本组件左右两边默认各让出了6px的边距。也可以在left-class和right-class中自定义边距。

本组件分为left、mid、right 3个区域。

- left区域默认显示一个返回箭头，大小为44*44px。可以通过属性hideDefaultBack来隐藏，也可以传入一个slot name='left'来替代。可以通过left-class来修饰样式。
- mid区域默认显示title属性设置的标题。也可以传入一个slot name='mid'来替代。其默认宽度为屏幕宽度-两边默认边距-left区域默认宽度-right区域默认宽度。可以通过mid-class来修饰样式。
- right区域默认不显示内容，可以传入一个slot name='right'来显示自定义内容。right区域默认width也是44px，可以通过right-class来修饰样式。

支持属性：
- hideDefaultBack: 隐藏返回箭头
- title: 通过属性方便设置标题。如果传入mid slot，则不生效
- navigationBarTextStyle: 返回箭头和属性设置的标题，它们的颜色均由该属性控制，可选 white|black

本组件默认没有背景色，即透明，会透显页面的背景色，开发者可通过组件的class自行设置背景色。

如果遇到顶部安全区避让失效的问题，可升级到 HBuilderX 5.25 版本。

在小程序端，如果需要规避右上角胶囊按钮，可以参考下方代码设置 margin-right 让出胶囊按钮的宽度和右侧间距。

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
