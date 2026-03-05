# CSS 变量

> uni-app x 4.0起 提供内置 CSS 变量。之前版本如有获取状态栏高度等需求可使用[uni.getWindowInfo()](../../api/get-window-info.md)方式获取。

| CSS 变量| 描述| App| web|
| :- | :- | :- | :- |
| --status-bar-height | 系统状态栏高度| [系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)| 0|
| --window-top| 内容区域距离顶部的距离 | 0| NavigationBar 的高度 |
| --window-bottom| 内容区域距离底部的距离 | 0| TabBar 的高度|

::: warning 注意
- 当设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 view 放在页面顶部，避免页面内容出现在状态栏。
- 在 Web 端，由于不存在原生导航栏和 tabBar（是前端 div 模拟的），如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabBar 上方，但在 H5 端会与 tabBar 重叠。此时可使用`--window-bottom`，不管在哪个端，都是固定在 tabBar 上方。
- Android、iOS目前不支持自定义css变量
- 鸿蒙平台目前支持的css变量仅在页面初始化时计算一次，不会随相关区域变化而变化
:::

## 代码块

快速书写 css 变量的方法是：在 css 中敲 `hei`，在候选助手中即可看到 3 个 css 变量。

## 示例

```vue
<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view>状态栏下的文字</view>
	</view>
</template>
<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
```

```vue
<template>
	<view>
		<view class="toTop">
			<!-- 这里可以放一个向上箭头，它距离底部tabBar上浮10px-->
		</view>
	</view>
</template>
<style>
	.toTop {
		bottom: calc(var(--window-bottom) + 10px);
	}
</style>
```
