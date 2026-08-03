---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-fab-button
---

::: sourceCode
## uni-fab-button
:::

悬浮加号按钮组件

> 本 Component 是 uni ext component，需下载插件：[uni-fab-button](https://ext.dcloud.net.cn/plugin?id=27846)


悬浮加号按钮

本组件常用于页面中右下角悬浮的、里面有一个加号的圆形按钮。

组件的根view默认是一个圆形，蓝色背景（#007AFF），并带有阴影。使用组件时注意组件的父容器要留出阴影的空间，避免被裁剪。

组件的二级view是2个view交叉组成的加号。其中垂直的view是通过transform变换方向实现的。

组件的属性为 plus-class，它是一个externalClass，用于外部修改组件内部的、组成加号的2个view的样式。

组件中加号的默认样式为背景白色、粗细为2px、尺寸为40%。

### 注意
- 鸿蒙平台按下fab-button不缩写的问题，需升级到HBuilderX 5.09+解决



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| plusClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 加号图标的自定义样式类，用于调整加号颜色、尺寸等样式 |
| @click | Event |   | 点击事件，参数为事件对象，类型为 UniPointerEvent |

<!-- UTSCOMJSON.uni-fab-button.fileFormates -->



<!-- UTSCOMJSON.uni-fab-button.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/fab-button/fab-button.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/fab-button/fab-button.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/fab-button/fab-button

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/fab-button/fab-button

>示例
```vue
<template>
	<view style="flex: 1;position: relative;padding: 15px 15px 0 15px;">
		<text class="label first-label">标准uni-fab-button</text>
		<uni-fab-button></uni-fab-button>
		<text class="label">自定义fab样式</text>
		<uni-fab-button class="custom-class"></uni-fab-button>
		<text class="label">自定义plus样式</text>
		<uni-fab-button plus-class="custom-plus-class"></uni-fab-button>
		<text class="label">自定义fab和plus样式，变成一个16px的纯+</text>
		<uni-fab-button class="transparent" plus-class="black-plus"></uni-fab-button>
		<text class="label">可移动uni-fab-button</text>
		<view class="move-fab-placeholder">
			<view id="move-fab" class="move-fab" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="updateMoveData" @touchcancel="updateMoveData">
				<uni-fab-button></uni-fab-button>
			</view>
		</view>
		<view
			class="right-bottom"
			:class="rightBottomFabPressed ? 'fab-pressed' : ''"
			@touchstart="rightBottomFabPressed = true"
			@touchend="rightBottomFabPressed = false"
			@touchcancel="rightBottomFabPressed = false">
			<uni-fab-button @click="handleClick"></uni-fab-button>
		</view>
	</view>
</template>

<script setup lang="uts">
	type Data = {
		dx : number
		dy : number
		left : number
		top : number
	}

	const data = reactive<Data>({
		dx: 0,
		dy: 0,
		left: 15,
		top: 47
	})
	let sx = 0
	let sy = 0
	let mx = 0
	let my = 0
	let baseLeft = 15
	let baseTop = 47
	const rightBottomFabPressed = ref(false)

	function handleClick() {
		uni.showToast({
			title: '点击了右下角的fab',
			icon: 'none'
		})
	}

	function updateMoveData() {
		data.left = baseLeft + mx
		data.top = baseTop + my
		data.dx = mx
		data.dy = my
	}

	function updateMovePos(element : UniElement) {
		element.style.setProperty('position', 'fixed')
		element.style.setProperty('left', baseLeft + 'px')
		element.style.setProperty('top', baseTop + 'px')
		element.style.setProperty('transform', 'translate(' + mx + 'px,' + my + 'px)')
	}

	function onTouchStart(e : UniTouchEvent) {
		sx = e.touches[0].clientX
		sy = e.touches[0].clientY
		updateMovePos(e.currentTarget as UniElement)
	}

	function onTouchMove(e : UniTouchEvent) {
		mx = e.touches[0].clientX - sx + mx
		my = e.touches[0].clientY - sy + my
		sx = e.touches[0].clientX
		sy = e.touches[0].clientY
		updateMovePos(e.currentTarget as UniElement)
	}

	onReady(() => {
		uni.createSelectorQuery()
			.select('.move-fab-placeholder')
			.boundingClientRect((rect) => {
				if (rect != null) {
					const nodeInfo = rect as NodeInfo
					baseLeft = nodeInfo.left != null ? nodeInfo.left : baseLeft
					baseTop = nodeInfo.top != null ? nodeInfo.top : baseTop
					data.left = baseLeft
					data.top = baseTop
				}
			})
			.exec()
	})

	defineExpose({
		data
	})
</script>

<style>
	.label {
		color: var(--text-color, #333333);
		margin-top: 24px;
		margin-bottom: 12px;
	}
	.first-label {
		margin-top: 0;
	}
	.custom-class{
		background-color: green;
		width: 20px;
		height: 20px;
	}
	.custom-plus-class {
		background-color: brown;
		width: 80%;
		height: 5px;
		border-radius: 0px;
	}
	.transparent {
		width: 16px;
		height: 16px;
		background-color: transparent;
		box-shadow: none;
	}
	.black-plus {
		background-color: black;
		width: 100%;
		height: 2px;
		border-radius: 0px;
	}
	.move-fab-placeholder {
		width: 44px;
		height: 44px;
	}
	.move-fab {
		width: 44px;
		height: 44px;
	}
	.right-bottom {
		position: absolute;
		right: 44px;
		bottom: 44px;
		width: 44px;
		height: 44px;
		opacity: 1;
		transform: scale(1);
		transform-origin: center center;
		transition-property: transform, opacity;
		transition-duration: 140ms;
		transition-timing-function: cubic-bezier(0.2, 0, 0.2, 1);
	}
	.fab-pressed {
		opacity: 0.9;
		transform: scale(0.95);
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-fab-button)
