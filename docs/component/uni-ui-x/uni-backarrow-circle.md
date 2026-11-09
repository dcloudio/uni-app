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

带圆形背景的返回箭头组件。

很多界面顶部是沉浸式通顶，比如视频、地图，没有通栏的顶部导航栏，只需要一个独立的返回按钮。

同时这个按钮需要自带有透明度的背景，以防止和界面背景元素重叠造成不可见。

箭头由旋转 45° 的边框绘制，保留 28px × 28px 的圆形点击区域，支持系统暗黑模式，无字体或图片依赖。组件内置按下降低不透明度与 Web 端悬浮阴影效果。

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
| auto-back | boolean | false | 点击后是否自动调用 `uni.navigateBack({})` 返回上一页 |
| ios-glass | boolean | false | 仅 iOS：使用 `glass-effect-view` 液态玻璃背景，并启用按下交互效果 |

### auto-back

默认只触发 `click`，由调用方处理导航、关闭弹层或二次确认。需要组件自动返回上一页时，显式开启：

```vue
<uni-backarrow-circle auto-back />
```

请使用 `:auto-back="true"` 传入布尔值。开启自动返回后，组件先触发 `click`，随后调用 `uni.navigateBack({})`，不会等待异步点击处理完成；需要离开确认时，保持默认关闭，在确认后自行调用导航 API。

### ios-glass

在 iOS 上开启玻璃背景及按下交互效果：

```vue
<uni-backarrow-circle ios-glass auto-back />
```

## 事件

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发；当 `auto-back` 为 `true` 时随后返回上一页 | 无 |

## 样式

通过根节点的 class 或 style 定制背景、位置等样式，无需 externalClasses。

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

## 暗黑模式

组件默认跟随系统暗黑模式：圆形背景色自动加深，箭头颜色默认统一为 `#ffffff`。未显式设置 `--uni-backarrow-circle-color` 时生效。



### 兼容性 <Help />
Web: 5.33; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.33; iOS(Vapor): 5.33; HarmonyOS(Vapor): 5.33


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| autoBack | boolean | false | Web: 5.33; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.33; iOS(Vapor): 5.33; HarmonyOS(Vapor): 5.33 | 点击后是否自动调用 uni.navigateBack({}) 返回上一页 |
| iosGlass | boolean | false | Web: x; 微信小程序: x; 支付宝小程序: x; Android(Vapor): x; iOS(Vapor): 5.33; HarmonyOS(Vapor): x | 仅 iOS 使用 glass-effect-view 液态玻璃背景，并启用按下交互效果 |
| @click | Function |   |   | 点击时触发，无参数；当 autoBack 为 true 时随后返回上一页 |

<!-- UTSCOMJSON.uni-backarrow-circle.fileFormates -->



<!-- UTSCOMJSON.uni-backarrow-circle.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/backarrow-circle/backarrow-circle.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/backarrow-circle/backarrow-circle.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/backarrow-circle/backarrow-circle

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/backarrow-circle/backarrow-circle

>示例
```vue
<template>
	<view>
		<!-- 悬浮导航：返回按钮常驻，页面滚动后显示标题与背景。 -->
		<view class="navigation-bar" :class="{ 'navigation-bar--scrolled': scrolled }">
			<!-- 支付宝小程序导航栏左上角返回按钮始终存在，无法隐藏，会导致重叠 -->
			<!-- #ifndef MP-ALIPAY -->
			<uni-backarrow-circle id="default-back" class="navigation-back" :class="{ 'navigation-back--scrolled': scrolled }" ios-glass auto-back @click="onBackClick" />
			<!-- #endif -->
			<text class="navigation-title" :class="{ 'navigation-title--show': scrolled }" :style="{ marginRight: titleRightSpace + 'px' }">uni-backarrow-circle</text>
		</view>

		<!-- 沉浸式顶部：背景延伸到状态栏下方，内容可滚动并从顶部穿过。 -->
		<view class="hero">
			<text class="hero-title">uni-backarrow-circle</text>
			<text class="hero-subtitle">顶部沉浸式圆形返回按钮</text>
		</view>

		<view class="content">
			<text class="description">圆形返回箭头，适配安全区，点击左上角返回按钮自动返回上一页。向下滚动页面可查看返回按钮与标题悬浮效果。</text>
			<text class="section-title">自定义样式</text>
			<view class="examples">
				<uni-backarrow-circle id="custom-blue" class="blue-arrow" @click="onCustomClick" />
				<uni-backarrow-circle id="custom-large" class="large-arrow" @click="onCustomClick" />
				<uni-backarrow-circle id="custom-dark" class="dark-arrow" @click="onCustomClick" />
			</view>
			<text class="section-title">事件</text>
			<button id="event-button" type="primary" @click="onCustomClick">点击返回箭头或按钮</button>
			<text class="event-result">{{ eventMessage }}</text>
		</view>

		<!-- 用于演示长页面滚动：内容延伸后返回按钮与标题保持悬浮。 -->
		<view class="scene">
			<text class="scene-title">沉浸式顶部</text>
			<text class="scene-text">常用于详情页、图片页等需要内容延伸到状态栏的场景，滚动后左上角返回按钮与标题保持悬浮。</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	const eventMessage = ref('尚未触发 click 事件')
	const scrolled = ref(false)
	const titleRightSpace = ref(0)
	// #ifdef MP
	titleRightSpace.value = 96
	// #endif
	// #ifdef MP-WEIXIN
	function updateTitleRightSpace() {
		const capsule = uni.getMenuButtonBoundingClientRect()
		const windowWidth = uni.getWindowInfo().windowWidth
		if (capsule.width > 0 && capsule.left > 0 && capsule.left < windowWidth) {
			// 胶囊左侧额外留出 8px，标题只使用返回按钮与胶囊之间的空间。
			titleRightSpace.value = windowWidth - capsule.left + 8
		}
	}
	onReady(updateTitleRightSpace)
	onResize(() => {
		updateTitleRightSpace()
	})
	// #endif

	onPageScroll((e: OnPageScrollOptions) => {
		scrolled.value = e.scrollTop > 10
	})

	function onBackClick() {
		eventMessage.value = '默认返回按钮触发了 click'
	}

	function onCustomClick() {
		eventMessage.value = '自定义返回按钮触发了 click'
		uni.showToast({ title: '点击了返回箭头', icon: 'none' })
	}
</script>

<style>
	.hero {
		height: calc(var(--status-bar-height, 0px) + 160px);
		background-color: #007aff;
		justify-content: flex-end;
		padding: 15px;
	}

	.hero-title {
		color: #ffffff;
		font-size: 22px;
		font-weight: bold;
	}

	.hero-subtitle {
		color: rgba(255, 255, 255, 0.85);
		font-size: 13px;
		margin-top: 4px;
	}

	.content,
	.scene {
		flex-direction: column;
		padding: 15px;
	}

	.scene {
		height: 630px;
		justify-content: center;
	}

	.scene-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 8px;
	}

	.scene-text {
		font-size: 14px;
		line-height: 20px;
	}

	.description {
		line-height: 20px;
		margin-bottom: 15px;
	}

	.section-title {
		font-weight: bold;
		margin: 8px 0;
	}

	.event-result {
		margin-top: 15px;
	}

	.examples {
		flex-direction: row;
		align-items: center;
		height: 100px;
		padding-left: 30px;
	}

	/* 内容区展示按钮无需再次避让屏幕安全区。 */
	.blue-arrow,
	.large-arrow,
	.dark-arrow {
		margin: 0;
	}

	.blue-arrow {
		background-color: #e5f1ff;
		--uni-backarrow-circle-color: #007aff;
		--uni-backarrow-circle-width: 3px;
	}

	.large-arrow,
	.dark-arrow {
		margin-left: 40px;
	}

	.large-arrow {
		transform: scale(1.25);
		--uni-backarrow-circle-width: 3px;
	}

	.dark-arrow {
		background-color: #333;
		--uni-backarrow-circle-color: #fff;
	}

	/* 悬浮导航：固定在页面顶部，覆盖在内容之上，安全区由自身内边距处理。 */
	.navigation-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		flex-direction: row;
		align-items: center;
		background-color: transparent;
		z-index: 10;
		height: calc(var(--status-bar-height, 0px) + 48px);
		/* #ifdef MP */
		padding-top: var(--status-bar-height, 0px);
		/* #endif */
		/* #ifndef MP */
		padding-top: var(--uni-safe-area-inset-top, 0px);
		/* #endif */
	}

	/* 返回按钮在悬浮行内垂直居中，安全区已由导航行内边距处理。 */
	.navigation-back {
		margin-top: 0;
		flex-shrink: 0;
		--uni-backarrow-circle-color: #ffffff;
	}

	.navigation-back--scrolled {
		--uni-backarrow-circle-color: #1a1a1a;
	}

	.navigation-title {
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
		font-size: 17px;
		font-weight: bold;
		color: #1a1a1a;
		opacity: 0;
	}

	.navigation-title--show {
		opacity: 1;
	}

	/* 滚动后悬浮导航显示背景与分割线。 */
	.navigation-bar--scrolled {
		background-color: #ffffff;
		border-bottom: 1px solid #ececec;
	}
</style>

```

:::


