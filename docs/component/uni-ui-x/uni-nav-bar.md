---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-nav-bar
---

::: sourceCode
## uni-nav-bar
:::

自定义导航栏组件

> 本 Component 是 uni ext component，需下载插件：[uni-nav-bar](https://ext.dcloud.net.cn/plugin?id=27897)


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

本组件默认没有背景色，即透明，会透显页面的背景色。开发者可通过组件的class自行设置背景色

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

<script setup lang="uts">
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



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| hideDefaultBack | boolean | false | 是否隐藏默认的返回箭头。为 true 时需要通过 left 插槽自定义返回按钮 |
| title | string | "" | 导航栏中间显示的标题文字，若使用 mid 插槽则该属性无效 |
| navigationBarTextStyle | String as PropType\<"white" \| "black" \| ""> | "" | 导航栏前景色（文字和返回箭头颜色）。非小程序端未传入时会自动读取 pageStyle 的 navigationBarTextStyle |
| leftClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 左侧区域的自定义样式类 |
| midClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 中间区域的自定义样式类 |
| rightClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 右侧区域的自定义样式类 |

<!-- UTSCOMJSON.uni-nav-bar.fileFormates -->



<!-- UTSCOMJSON.uni-nav-bar.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/nav-bar/nav-bar.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/nav-bar/nav-bar.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/nav-bar/nav-bar

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/nav-bar/nav-bar

>示例
```vue
<template>
	<uni-nav-bar class="uni-theme-root"></uni-nav-bar>
	<scroll-view class="page uni-theme-root" style="padding-bottom: var(--uni-safe-area-inset-bottom);">
		<!-- 正常使用场景应把uni-nav-bar放在template的根节点，本示例为了演示多种导航栏效果把导航栏组件放到了scroll-view里了 -->
		<uni-nav-bar navigationBarTextStyle="black" title="黑色标题"></uni-nav-bar>
		<uni-nav-bar navigationBarTextStyle="white" title="青色背景白色标题" style="background-color: cyan;"></uni-nav-bar>
		<uni-nav-bar title="下边带灰线" style="border-bottom: 0.5px #ccc solid;"></uni-nav-bar>
		<uni-nav-bar hideDefaultBack title="隐藏左侧返回箭头"></uni-nav-bar>
		<uni-nav-bar title="标题居左" mid-class="left-title"></uni-nav-bar>
		<uni-nav-bar title="右边有按钮">
			<template #right>
				<text class="txt-button" @click="clickButton">⋯</text>
			</template>
		</uni-nav-bar>
		<uni-nav-bar title="右边有2个按钮" right-class="two-buttons">
			<template #right>
				<text class="txt-button" @click="clickButton">+</text>
				<text class="txt-button" @click="clickButton">⋯</text>
			</template>
		</uni-nav-bar>
		<uni-nav-bar title="左边有按钮">
			<template #left>
				<text class="txt-button" @click="clickButton">+</text>
			</template>
		</uni-nav-bar>
		<uni-nav-bar title="左右各1个按钮">
			<template #left>
				<text class="txt-button" @click="clickButton">+</text>
			</template>
			<template #right>
				<text class="txt-button" @click="clickButton">⋯</text>
			</template>
		</uni-nav-bar>
		<uni-nav-bar>
			<template #mid>
				<text class="uni-theme-text">插槽右箭头可以点</text>
				<text style="padding: 3px;font-size: 10px;" class="uni-theme-text" @click="clickButton">▼</text>
			</template>
		</uni-nav-bar>
		<uni-nav-bar>
			<template #left>
				<text class="txt-button" @click="clickButton">+</text>
			</template>
			<template #mid>
				<input class="slot-input" placeholder="左中右都是插槽，中间是input"/>
			</template>
			<template #right>
				<text class="txt-button" @click="clickButton">⋯</text>
			</template>
		</uni-nav-bar>
	</scroll-view>
</template>

<script setup>
	function clickButton() {
		uni.showToast({
			title: '点击了按钮'
		});
	}
</script>

<style>
.page {
	flex: 1;
}
.left-title{
	justify-content: flex-start;
}
.two-buttons{
	width: 88px;
}
.txt-button{
	font-weight: bold;
	width: 44px;
	height: 44px;
	line-height: 44px;
	text-align: center;
	color: var(--text-color);
}
.slot-input {
	color: #333333;
	background-color: #ffffff;
	border-width: 0.5px;
	border-style: solid;
	border-color: #cccccc;
}
@media (prefers-color-scheme: dark) {
	.slot-input {
		color: #ffffff;
		background-color: #2d2d2d;
		border-color: rgba(255, 255, 255, 0.2);
	}
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-nav-bar)
