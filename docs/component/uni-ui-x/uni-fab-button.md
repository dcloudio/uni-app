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



### 兼容性
| Web | 微信小程序 | Android | Android(Vapor) | iOS | iOS(Vapor) | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.07 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| plusClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   | 加号图标的自定义样式类，用于调整加号颜色、尺寸等样式 |
| @click | Event |   |   | 点击事件，参数为事件对象，类型为 UniPointerEvent |

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
		<uni-fab-button class="right-bottom" hover-class="fab-hover" @click="clickme"></uni-fab-button> <!-- TODO: hover-class仅web生效-->
	</view>
</template>

<script setup>
	const clickme = () => {
		uni.showToast({
			title: '点击了右下角的fab',
			icon: 'none'
		})
	}
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
	.right-bottom {
		position: absolute;
		right: 44px;
		bottom: 44px;
		transition: transform 0.1s ease;
	}
	.fab-hover{
		opacity: 0.8;
		transform: scale(0.8); /* TOOD hover-class里使用transform和transition，取消hover后无法复位*/
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-fab-button)
