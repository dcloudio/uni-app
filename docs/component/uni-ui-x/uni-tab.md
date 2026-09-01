---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-tab-bar
---

> 本 Component 是 uni ext component，需下载插件：[uni-tab-bar](https://ext.dcloud.net.cn/plugin?id=27849)

自定义tab-bar组件， 包括一组前端组件：

- `uni-tab`：最外层容器，负责激活索引、内容区高度和切换事件
- `uni-tab-bar`：底部 tab 容器，负责底栏布局、安全区和中间按钮占位
- `uni-tab-item`：普通 tab 项，负责插槽展示和 badge
- `uni-tab-midbutton`：中间悬浮按钮占位容器
- `uni-tab-content`：上方内容区域容器，负责内容注册、懒渲染和显示切换

每个选项卡内容，不再是页面，而变成了uni-tab-content组件的子组件。

自定义tab-bar组件的使用方式是纯前端的、也是跨平台的。这与pages.json中的tabBar完全不同：
1. pages.json中的tabBar相关的api无法应用于自定义tab-bar，比如uni.switchTab、uni.showTabBar、uni.hideTabBar、uni.showTabBarRedDot、uni.hideTabBarRedDot、uni.setTabBarBadge、uni.removeTabBarBadge、uni.setTabBarStyle、uni.setTabBarItem。
2. pages.json中的tabBar页面，生命周期仍然是页面生命周期。但自定义tab-bar的uni-tab-content内容不触发页面生命周期，只触发组件生命周期。

当然，自定义tab-bar组件拥有更强的功能、更灵活的控制方式。比如下凹式midbutton。在uni-app x的非小程序平台中，性能并不会比pages.json中的tabBar差。


### 基础用法

```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" @change="handleChange">
		<uni-tab-content>
			<scroll-view style="flex: 1">
				<view>
					<text>内容一</text>
				</view>
			</scroll-view>
		</uni-tab-content>
		<uni-tab-content>
			<view>
				<text>内容二</text>
			</view>
		</uni-tab-content>

		<uni-tab-bar>
			<uni-tab-item>
				<text>首页</text>
			</uni-tab-item>
			<uni-tab-item badge-text="8">
				<text>消息</text>
			</uni-tab-item>
		</uni-tab-bar>
	</uni-tab>
</template>
```

如果需要自定义底栏主体高度，请在 `uni-tab` 上使用 `tab-bar-height` 属性。使用该属性可以更快的计算布局，而不必在页面onReady后通过getBoundRect来计算布局：

```vue
<uni-tab style="flex: 1" :active-index="activeIndex" :tab-bar-height="40" @change="handleChange">
	...
</uni-tab>
```

### 组件 API

#### uni-tab

##### 事件

| 事件名 | 返回参数 | 说明 |
| --- | --- | --- |
| `change` | `index: number` | 点击普通 tab 项切换后触发，返回新的激活索引 |

#### uni-tab-bar

无专用属性和API，可直接通过 `class` / `style` 自定义底栏外观。

#### uni-tab-content

无专用属性和API，可直接通过 `class` / `style` 自定义外观。

多个选项卡内容揉在一个uni-tab中比较乱，一般推荐uni-tab-content下放一个子组件，子组件作为独立uvue文件。

各个uni-tab-content的子组件，在显示和隐藏的没有生命周期。
如需监听显示/隐藏需要通过provide/inject方式从外层传入响应式变量activeIndex，然后在子组件中watch这个activeIndex。

### 使用注意事项

1. `uni-tab` 所在的页面不应该滚动，应该在pages.json中配置页面style为`disableScroll:true`。
2. 屏幕变化适配，Android需HBuilderX 5.09+支持。之前版本组件里无法监听页面的onResize。
3. `uni-tab-content` 与 `uni-tab-item` 的数量必须一致，顺序也必须一一对应，否则切换后的内容会错位。
4. `uni-tab` 默认占满页面的宽度和高度，即 `style="flex: 1"`
5. 自定义底栏高度时，不要只改样式高度，要同步通过 `tab-bar-height` 传入 `uni-tab`，这样内容区底部留白和安全区计算才会一起更新。
6. 如果底栏存在镂空、下凹或透明边缘，需要让底部内容透出来，请在 `uni-tab` 上开启 `tab-content-height-full`，此时内容区会延伸到 `uni-tab-bar` 下方。
7. `uni-tab-content` 采用“首次激活再渲染”的策略；第一次切入前不会创建实例，切走后只隐藏不销毁，适合保留 tab 内部状态。
8. `uni-tab-item` 只负责普通 tab 项注册与展示，不提供单独点击事件；请统一监听 `uni-tab` 的 `change`。
9. 使用 `uni-tab-midbutton` 时，中间按钮左右两侧的普通 `uni-tab-item` 数量需要相等，也就是普通项总数必须为偶数，才能保持居中均分布局。
10. `uni-tab-midbutton` 只负责预留中间按钮位置，不参与激活索引计算；中间按钮点击行为需要在插槽内部自行处理。
11. `badge-text` 传空字符串时显示红点，传 `'0'` 时不显示；如果需要自定义 badge 外观，请使用 `badge-class` 覆盖样式。
12. `uni-tab-bar`、`uni-tab-item`、`uni-tab-content` 的根节点都支持直接挂 `class` / `style`，推荐把视觉差异放在页面侧处理，不要改组件内部逻辑。
13. 微信小程序提供了一种webview方式渲染的底部tabBar方式，来进行tabBar自定义。这种方式仅微信小程序支持，与本组件无关。

::: sourceCode
## uni-tab
:::

选项卡容器组件

> 本 Component 是 uni ext component，需下载插件：[uni-tab](https://ext.dcloud.net.cn/plugin?id=27849)



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| activeIndex | number |   | 当前激活的选项卡索引 |
| tabBarHeight | number | 50 | tab-bar 的高度 |
| tabContentHeightFull | boolean | false | tab-content 的高度是否通到tab-bar下面 |
| @change | Event |   | 选项卡变化时触发，参数为当前激活的选项卡索引，类型为 number |

<!-- UTSCOMJSON.uni-tab.fileFormates -->



<!-- UTSCOMJSON.uni-tab.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-tab)


::: sourceCode
## uni-tab-bar
:::

底部选项卡栏组件

> 本 Component 是 uni ext component，需下载插件：[uni-tab-bar](https://ext.dcloud.net.cn/plugin?id=27849)



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |




<!-- UTSCOMJSON.uni-tab-bar.fileFormates -->



<!-- UTSCOMJSON.uni-tab-bar.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-content-height-full="tabContentHeightFull" @change="handleChange">
		<!-- 内容区域 -->
		<uni-tab-content :style="tabContentStyle">
			<tabContent1 ref="tabContent1Ref" @contentscroll="handleTabContent1Scroll" />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent2 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent3 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent4 />
		</uni-tab-content>

		<!-- 底部选项卡 -->
		<uni-tab-bar>
			<!-- 图标高度24，文字字号10px，文字高度是12~14px，角标不能在图标的正右上角，需要向下偏移1px，避免角标画出tab-list之外) -->
			<uni-tab-item>
				<view class="first-tab-button" @click="handleFirstTabClick">
					<view class="first-tab-animator">
						<view class="first-tab-face"
							:class="showBackToTop ? 'first-tab-default-hidden' : 'first-tab-default-visible'">
							<image :src="activeIndex == 0 ? '/static/componentHL.png' : '/static/component.png'" class="tab-icon-image"></image>
							<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">首页</text>
						</view>
						<view class="first-tab-face"
							:class="showBackToTop ? 'first-tab-backtop-visible' : 'first-tab-backtop-hidden'">
							<text class="tab-arrow-icon" :class="activeIndex == 0 ? 'tab-arrow-icon-active' : ''">↑</text>
							<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">回到顶部</text>
						</view>
					</view>
				</view>
			</uni-tab-item>
			<uni-tab-item :badge-text="apiTabBadgeText" :badge-class="apiTabBadgeClass">  <!-- 需要角标时使用 badge-text="99+" 详见 uni-badge 组件 -->
				<image :src="activeIndex == 1 ? '/static/apiHL.png' : '/static/api.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 1 ? 'tab-label-active' : ''">API</text>
			</uni-tab-item>
			<uni-tab-item>
				<image :src="activeIndex == 2 ? '/static/cssHL.png' : '/static/css.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 2 ? 'tab-label-active' : ''">CSS</text>
			</uni-tab-item>
			<uni-tab-item badge-text="">
				<image :src="activeIndex == 3 ? '/static/templateHL.png' : '/static/template.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 3 ? 'tab-label-active' : ''">模板</text>
			</uni-tab-item>

		</uni-tab-bar>
	</uni-tab>
</template>

<script setup lang="uts">
	import tabContent1 from './tab-content1.uvue'
	import tabContent2 from './tab-content-api.uvue'
	// import tabContent2 from './tab-content2.uvue'
	import tabContent3 from './tab-content3.uvue'
	import tabContent4 from './tab-content4.uvue'
	const TAB_CONTENT1_SWITCH_OFFSET = 100 // 当 tab-content1 滚动超过这个距离（单位px）时显示回到顶部按钮，如需调节请自行定义
	const TAB_CONTENT2_INDEX = 1
	const tabContent1Ref = ref<ComponentPublicInstance | null>(null)
	let tabContentHeightFull = false
	// #ifdef MP-WEIXIN
	tabContentHeightFull = true
	// #endif
	let tabContentStyle = ''
	// #ifdef MP-ALIPAY
	tabContentStyle = 'flex: 1; min-height: 0px;'
	// #endif

	  // 当前激活的索引
	const activeIndex = ref<number>(0)
	const showBackToTop = ref<boolean>(false)
	const apiTabBadgeText = ref<string>('99+')
	const apiTabBadgeClass = ref<string.ClassString>('')
	let lastTabContent1ScrollTop = 0

	function updateTabContent2Badge(text : string, badgeClass : string.ClassString) : void {
		apiTabBadgeText.value = text
		apiTabBadgeClass.value = badgeClass
	}

	function setTabContent2BadgeNumber() : void {
		updateTabContent2Badge('8', '')
	}

	function setTabContent2BadgeDot() : void {
		updateTabContent2Badge('', '')
	}

	function clearTabContent2Badge() : void {
		updateTabContent2Badge('0', '')
	}

	function setTabContent2BadgeClass() : void {
		updateTabContent2Badge('NEW', 'api-tab-badge-custom')
	}

	function handleTabContent1Scroll(scrollTop : number) : void {
		lastTabContent1ScrollTop = scrollTop
		if (activeIndex.value == 0) {
			showBackToTop.value = scrollTop > TAB_CONTENT1_SWITCH_OFFSET
		}
	}

	function handleFirstTabClick() : void {
		if (activeIndex.value == 0 && showBackToTop.value) {
			const tabContent1Instance = tabContent1Ref.value
			if (tabContent1Instance != null) {
				tabContent1Instance.$callMethod('scrollToTop')
			}
		}
	}

	// 处理 tab 的切换
	function handleChange(index : number) : void {
		activeIndex.value = index
		if (index == 0) {
			showBackToTop.value = lastTabContent1ScrollTop > TAB_CONTENT1_SWITCH_OFFSET
		} else {
			showBackToTop.value = false
		}
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '组件' })
				break
			case 1:
				uni.setNavigationBarTitle({ title: 'API' })
				break
			case 2:
				uni.setNavigationBarTitle({ title: 'CSS' })
				break
			case 3:
				uni.setNavigationBarTitle({ title: '模板' })
				break
		}
	}

	provide('tabContent2Index', TAB_CONTENT2_INDEX)
	provide('tabContent2SetBadgeNumber', setTabContent2BadgeNumber)
	provide('tabContent2SetBadgeDot', setTabContent2BadgeDot)
	provide('tabContent2ClearBadge', clearTabContent2Badge)
	provide('tabContent2SetBadgeClass', setTabContent2BadgeClass)
</script>

<style>
	.api-tab-badge-custom {
		background-color: #1f6feb;
		color: #ffffff;
	}

	.first-tab-button {
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.first-tab-animator {
		width: 100%;
		height: 100%;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.first-tab-face {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition-property: opacity, transform;
		transition-duration: 220ms;
		transition-timing-function: ease;
	}

	.first-tab-default-visible {
		opacity: 1;
		transform: translateY(0px);
	}

	.first-tab-default-hidden {
		opacity: 0;
		transform: translateY(8px);
	}

	.first-tab-backtop-visible {
		opacity: 1;
		transform: translateY(0px);
	}

	.first-tab-backtop-hidden {
		opacity: 0;
		transform: translateY(-8px);
	}

	.tab-icon-image {
		height: 24px;
		width: 24px;
	}

	.tab-arrow-icon {
		line-height: 20px;
		margin-bottom: 2px;
	}

	.tab-arrow-icon-active {
		color: #007aff;
	}

	.tab-label {
		font-size: 10px;
		color: rgb(122, 126, 131);
	}

	.tab-label-active {
		color: #007aff;
	}

	.blue-dot{
		background-color: #1f6feb;
	}
</style>

```

:::
#### tab-bar-dark
暗色风格
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar-dark.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar-dark.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar-dark

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar-dark

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-content-height-full="tabContentHeightFull" @change="handleChange">
		<!-- 内容区域 -->
		<uni-tab-content :style="tabContentStyle">
			<!-- TODO 小程序下这些Class不生效，界面没有变黑！ -->
			<tabContent1 ref="tabContent1Ref" class="dark-tab-content dark-tab-content-home" @contentscroll="handleTabContent1Scroll" />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent2 class="dark-tab-content dark-tab-content-api" />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent3 class="dark-tab-content dark-tab-content-css" />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent4 class="dark-tab-content dark-tab-content-template" />
		</uni-tab-content>

		<!-- 底部选项卡 -->
		<uni-tab-bar class="dark-tab-list">
			<!-- 图标高度24，文字字号10px，文字高度是12~14px，角标不能在图标的正右上角，需要向下偏移1px，避免角标画出tab-list之外) -->
			<uni-tab-item>
				<view class="first-tab-button" @click="handleFirstTabClick">
					<view class="first-tab-animator">
						<view class="first-tab-face"
							:class="showBackToTop ? 'first-tab-default-hidden' : 'first-tab-default-visible'">
							<image :src="activeIndex == 0 ? '/static/componentHL.png' : '/static/component.png'" class="tab-icon-image"></image>
							<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">首页</text>
						</view>
						<view class="first-tab-face"
							:class="showBackToTop ? 'first-tab-backtop-visible' : 'first-tab-backtop-hidden'">
							<text class="tab-arrow-icon" :class="activeIndex == 0 ? 'tab-arrow-icon-active' : ''">↑</text>
							<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">回到顶部</text>
						</view>
					</view>
				</view>
			</uni-tab-item>
			<uni-tab-item badge-text="99+">
				<image :src="activeIndex == 1 ? '/static/apiHL.png' : '/static/api.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 1 ? 'tab-label-active' : ''">API</text>
			</uni-tab-item>
			<uni-tab-item>
				<image :src="activeIndex == 2 ? '/static/cssHL.png' : '/static/css.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 2 ? 'tab-label-active' : ''">CSS</text>
			</uni-tab-item>
			<uni-tab-item badge-text="">
				<image :src="activeIndex == 3 ? '/static/templateHL.png' : '/static/template.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 3 ? 'tab-label-active' : ''">模板</text>
			</uni-tab-item>
		</uni-tab-bar>
	</uni-tab>
</template>

<script setup lang="uts">
	import tabContent1 from './tab-content1.uvue'
	import tabContent2 from './tab-content2.uvue'
	import tabContent3 from './tab-content3.uvue'
	import tabContent4 from './tab-content4.uvue'
	const TAB_CONTENT1_SWITCH_OFFSET = 100
	const tabContent1Ref = ref<ComponentPublicInstance | null>(null)
	let tabContentHeightFull = false
	// #ifdef MP-WEIXIN
	tabContentHeightFull = true
	// #endif
	let tabContentStyle = ''
	// #ifdef MP-ALIPAY
	tabContentStyle = 'flex: 1; min-height: 0px;'
	// #endif

	const activeIndex = ref<number>(0)
	const showBackToTop = ref<boolean>(false)
	let lastTabContent1ScrollTop = 0

	function handleTabContent1Scroll(scrollTop : number) : void {
		lastTabContent1ScrollTop = scrollTop
		if (activeIndex.value == 0) {
			showBackToTop.value = scrollTop > TAB_CONTENT1_SWITCH_OFFSET
		}
	}

	function handleFirstTabClick() : void {
		if (activeIndex.value == 0 && showBackToTop.value) {
			const tabContent1Instance = tabContent1Ref.value
			if (tabContent1Instance != null) {
				tabContent1Instance.$callMethod('scrollToTop')
			}
		}
	}

	function handleChange(index : number) : void {
		activeIndex.value = index
		if (index == 0) {
			showBackToTop.value = lastTabContent1ScrollTop > TAB_CONTENT1_SWITCH_OFFSET
		} else {
			showBackToTop.value = false
		}
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '组件' })
				break
			case 1:
				uni.setNavigationBarTitle({ title: 'API' })
				break
			case 2:
				uni.setNavigationBarTitle({ title: 'CSS' })
				break
			case 3:
				uni.setNavigationBarTitle({ title: '模板' })
				break
		}
	}
</script>

<style>
	.first-tab-button {
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.first-tab-animator {
		width: 100%;
		height: 100%;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.first-tab-face {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition-property: opacity, transform;
		transition-duration: 220ms;
		transition-timing-function: ease;
	}

	.first-tab-default-visible {
		opacity: 1;
		transform: translateY(0px);
	}

	.first-tab-default-hidden {
		opacity: 0;
		transform: translateY(8px);
	}

	.first-tab-backtop-visible {
		opacity: 1;
		transform: translateY(0px);
	}

	.first-tab-backtop-hidden {
		opacity: 0;
		transform: translateY(-8px);
	}

	.dark-tab-list {
		background-color: #0f172a;
		border-top-color: rgba(255,255,255,0.33);
	}

	.dark-tab-content {
		background-color: #111827;
	}

	.dark-tab-content-home {
		background-color: #111827;
	}

	.dark-tab-content-api {
		background-color: #141c2f;
	}

	.dark-tab-content-css {
		background-color: #102126;
	}

	.dark-tab-content-template {
		background-color: #161a31;
	}

	.tab-icon-image {
		height: 24px;
		width: 24px;
	}

	.tab-arrow-icon {
		line-height: 20px;
		margin-bottom: 2px;
		color: rgba(255,255,255,0.68);
	}

	.tab-arrow-icon-active {
		color: #7ce0b8;
	}

	.tab-label {
		font-size: 10px;
		color: rgba(255,255,255,0.62);
	}

	.tab-label-active {
		color: #f3f7fb;
	}
</style>

```

:::
#### tab-bar-custom
自定义样式
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar-custom.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar-custom.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar-custom

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar-custom

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-bar-height="40" @change="handleChange">
		<uni-tab-content>
			<view class="custom-panel custom-panel-emerald">
				<text class="custom-panel-kicker">自定义 tab-bar</text>
				<text class="custom-panel-title">精选</text>
				<text class="custom-panel-desc">uni-tab-bar 使用 externalClass 覆盖了渐变背景和更低的高度，整体更像一条轻量导航条。</text>
			</view>
		</uni-tab-content>
		<uni-tab-content>
			<view class="custom-panel custom-panel-sand">
				<text class="custom-panel-kicker">自定义 tab-bar</text>
				<text class="custom-panel-title">趋势</text>
				<text class="custom-panel-desc">这里只有一行文字，没有图标，适合内容频道或资讯场景里的轻型底部切换。</text>
			</view>
		</uni-tab-content>
		<uni-tab-content>
			<view class="custom-panel custom-panel-ink">
				<text class="custom-panel-kicker">自定义 tab-bar</text>
				<text class="custom-panel-title">我的</text>
				<text class="custom-panel-desc">激活文字色改成绿色，同时每个 uni-tab-item 只有一行文本，更紧凑也更聚焦。</text>
			</view>
		</uni-tab-content>

		<uni-tab-bar class="custom-tab-list-shell custom-tab-list-root">
			<uni-tab-item>
				<view class="custom-tab-cell">
					<text class="custom-tab-label" :class="activeIndex == 0 ? 'custom-tab-label-active' : ''">精选</text>
				</view>
			</uni-tab-item>
			<uni-tab-item>
				<view class="custom-tab-cell">
					<text class="custom-tab-label" :class="activeIndex == 1 ? 'custom-tab-label-active' : ''">趋势</text>
				</view>
			</uni-tab-item>
			<uni-tab-item>
				<view class="custom-tab-cell">
					<text class="custom-tab-label" :class="activeIndex == 2 ? 'custom-tab-label-active' : ''">我的</text>
				</view>
			</uni-tab-item>
		</uni-tab-bar>
	</uni-tab>
</template>

<script setup lang="uts">
	const activeIndex = ref<number>(0)

	function syncNavigationBar(index : number) : void {
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '精选' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#dff3e8'
				})
				break
			case 1:
				uni.setNavigationBarTitle({ title: '趋势' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f6ddbf'
				})
				break
			case 2:
				uni.setNavigationBarTitle({ title: '我的' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#dde7ea'
				})
				break
		}
	}

	function handleChange(index : number) : void {
		activeIndex.value = index
		syncNavigationBar(index)
	}

	onLoad(() => {
		syncNavigationBar(activeIndex.value)
	})
</script>

<style>
	.custom-panel {
		flex: 1;
		padding-top: 28px;
		padding-right: 24px;
		padding-bottom: 24px;
		padding-left: 24px;
		flex-direction: column;
		justify-content: center;
	}

	.custom-panel-emerald {
		background-color: #dff3e8;
	}

	.custom-panel-sand {
		background-color: #f6ddbf;
	}

	.custom-panel-ink {
		background-color: #dde7ea;
	}

	.custom-panel-kicker {
		font-size: 12px;
		color: rgba(34,51,59,0.56);
	}

	.custom-panel-title {
		margin-top: 10px;
		font-size: 30px;
		color: #22333b;
	}

	.custom-panel-desc {
		margin-top: 10px;
		font-size: 15px;
		line-height: 22px;
		color: rgba(34,51,59,0.74);
	}

	.custom-tab-list-shell {
		background-color: #f4efe6;
	}

	.custom-tab-list-root {
		background: linear-gradient(to right, #f7d9a8, #c6ece3);
		height: 40px;
		border-top-width: 0px;
	}

	.custom-tab-cell {
		width: 100%;
		height: 100%;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.custom-tab-label {
		font-size: 14px;
		color: rgba(34,51,59,0.58);
	}

	.custom-tab-label-active {
		color: #1d9f5f;
	}
</style>

```

:::
#### tab-bar-blur
半透明毛玻璃
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar-blur.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar-blur.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar-blur

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar-blur

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-bar-height="TAB_BAR_HEIGHT" :tab-content-height-full="tabContentHeightFull" @change="handleChange">
		<uni-tab-content :style="tabContentStyle">
			<scroll-view class="blur-scroll blur-scene-morning" direction="vertical">
				<view class="blur-content-inner">
					<text class="blur-title">精选</text>
					<text class="blur-desc">uni-tab-bar 使用半透明背景和 backdrop-filter，让底部内容自然透出并形成毛玻璃效果。</text>
					<view class="blur-card-list">
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">轻量导航</text>
							<text class="blur-card-desc">半透明底栏覆盖在内容上方，背景仍然保持可见。</text>
						</view>
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">内容延伸</text>
							<text class="blur-card-desc">开启 tab-content-height-full 后，列表会铺到 tab-bar 下方。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">毛玻璃层</text>
							<text class="blur-card-desc">卡片边缘和文字经过底栏时，可以看到背景模糊。</text>
						</view>
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">浮层边界</text>
							<text class="blur-card-desc">圆角底栏遮住列表内容时，能看出清晰内容和模糊内容的差异。</text>
						</view>
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">列表底部</text>
							<text class="blur-card-desc">更多内容让页面底部始终有卡片进入 tab-bar 背景区域。</text>
						</view>
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">轻量展示</text>
							<text class="blur-card-desc">不需要额外图片，普通 view 和 text 就能提供可模糊的背景细节。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">全屏滚动</text>
							<text class="blur-card-desc">scroll-view 占满内容区，列表可以持续滚动到悬浮底栏下面。</text>
						</view>
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">底部内容</text>
							<text class="blur-card-desc">最后几项会经过 tab-bar 背后，让 Web 端也能观察到模糊效果。</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<scroll-view class="blur-scroll blur-scene-coral" direction="vertical">
				<view class="blur-content-inner">
					<text class="blur-title">趋势</text>
					<text class="blur-desc">悬浮 tab-bar 距离页面左右和底部留出间距，配合圆角让底栏更像独立的浮层。</text>
					<view class="blur-card-list">
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">圆角浮层</text>
							<text class="blur-card-desc">左右和底部留白让底栏脱离页面边缘，视觉更轻。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">透明叠色</text>
							<text class="blur-card-desc">不同卡片颜色经过底栏时，会产生自然的半透明叠加。</text>
						</view>
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">固定高度</text>
							<text class="blur-card-desc">示例显式设置高度和 padding，避免不同端底部安全区差异。</text>
						</view>
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">内容穿透</text>
							<text class="blur-card-desc">列表向下铺开后，底栏下方会持续出现真实内容。</text>
						</view>
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">视觉层次</text>
							<text class="blur-card-desc">半透明背景和阴影一起区分底栏与页面内容。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">底部观察</text>
							<text class="blur-card-desc">靠近页面底部的卡片会成为毛玻璃效果的主要背景。</text>
						</view>
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">滚动区域</text>
							<text class="blur-card-desc">外层 scroll-view 负责全屏滚动，内层内容只处理布局。</text>
						</view>
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">背后采样</text>
							<text class="blur-card-desc">滚动到列表底部时，卡片会进入 backdrop-filter 的采样范围。</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<scroll-view class="blur-scroll blur-scene-ink" direction="vertical">
				<view class="blur-content-inner">
					<text class="blur-title">我的</text>
					<text class="blur-desc">内容区延伸到 tab-bar 下方，不同背景色可以更直观看到半透明叠加后的层次。</text>
					<view class="blur-card-list">
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">跨端样式</text>
							<text class="blur-card-desc">使用 rgba 写法，避免部分端不识别现代 rgb 透明语法。</text>
						</view>
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">动态宽度</text>
							<text class="blur-card-desc">通过窗口宽度计算 px，避免在鸿蒙端依赖 calc。</text>
						</view>
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">真实内容</text>
							<text class="blur-card-desc">列表内容比装饰线条更适合作为毛玻璃背景。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">背景采样</text>
							<text class="blur-card-desc">backdrop-filter 会采样底栏背后的卡片颜色和文字轮廓。</text>
						</view>
						<view class="blur-card blur-card-green">
							<text class="blur-card-title">跨端预览</text>
							<text class="blur-card-desc">Web 端和 App 端都需要保证底栏背后有实际内容。</text>
						</view>
						<view class="blur-card blur-card-blue">
							<text class="blur-card-title">页面留白</text>
							<text class="blur-card-desc">底部 padding 给悬浮 tab-bar 留出空间，同时允许内容透到下方。</text>
						</view>
						<view class="blur-card blur-card-coral">
							<text class="blur-card-title">列表延展</text>
							<text class="blur-card-desc">更多列表项可以保证大屏 Web 下也有足够滚动距离。</text>
						</view>
						<view class="blur-card blur-card-yellow">
							<text class="blur-card-title">底栏覆盖</text>
							<text class="blur-card-desc">滚动到底部时，卡片内容会从悬浮底栏下方经过。</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-tab-content>

		<uni-tab-bar class="blur-tab-list" :style="tabBarStyle">
			<uni-tab-item class="blur-tab-item">
				<text class="blur-tab-label" :class="activeIndex == 0 ? 'blur-tab-label-active' : ''">精选</text>
			</uni-tab-item>
			<uni-tab-item class="blur-tab-item">
				<text class="blur-tab-label" :class="activeIndex == 1 ? 'blur-tab-label-active' : ''">趋势</text>
			</uni-tab-item>
			<uni-tab-item class="blur-tab-item">
				<text class="blur-tab-label" :class="activeIndex == 2 ? 'blur-tab-label-active' : ''">我的</text>
			</uni-tab-item>
		</uni-tab-bar>
	</uni-tab>
</template>

<script setup lang="uts">
	const TAB_BAR_MARGIN = 24
	const TAB_BAR_BOTTOM = 40
	const TAB_BAR_HEIGHT = 64

	function buildTabBarStyle() : string {
		const windowInfo = uni.getWindowInfo()
		const tabBarWidth = Math.max(0, windowInfo.windowWidth - TAB_BAR_MARGIN * 2)
		return 'left: ' + TAB_BAR_MARGIN + 'px; bottom: ' + TAB_BAR_BOTTOM + 'px; width: ' + tabBarWidth + 'px; height: ' + TAB_BAR_HEIGHT + 'px; padding-bottom: 0px; align-items: center; border-radius: 22px; overflow: hidden; border-top-width: 0px; background-color: rgba(255, 255, 255, 0.12);'
	}

	const activeIndex = ref<number>(0)
	const tabBarStyle = ref<string>(buildTabBarStyle())
	let tabContentHeightFull = true
	let tabContentStyle = ''
	// #ifdef MP-ALIPAY
	tabContentHeightFull = false
	tabContentStyle = 'flex: 1; min-height: 0px;'
	// #endif

	function syncTabBarStyle() : void {
		tabBarStyle.value = buildTabBarStyle()
	}

	function syncNavigationBar(index : number) : void {
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '精选' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f2f7fb'
				})
				break
			case 1:
				uni.setNavigationBarTitle({ title: '趋势' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#fbf5eb'
				})
				break
			case 2:
				uni.setNavigationBarTitle({ title: '我的' })
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#f1f8f3'
				})
				break
		}
	}

	function handleChange(index : number) : void {
		activeIndex.value = index
		syncNavigationBar(index)
	}

	onLoad(() => {
		syncTabBarStyle()
		syncNavigationBar(activeIndex.value)
	})

	onReady(() => {
		syncTabBarStyle()
	})
</script>

<style>
	.blur-scroll {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 0px;
		flex: 1;
	}

	.blur-content-inner {
		width: 100%;
		box-sizing: border-box;
		padding-top: 36px;
		padding-right: 20px;
		padding-bottom: 170px;
		padding-left: 20px;
		flex-direction: column;
	}

	.blur-scene-morning {
		background-color: #f2f7fb;
	}

	.blur-scene-coral {
		background-color: #fbf5eb;
	}

	.blur-scene-ink {
		background-color: #f1f8f3;
	}

	.blur-title {
		position: relative;
		font-size: 32px;
		font-weight: bold;
		color: #1f2937;
	}

	.blur-desc {
		position: relative;
		margin-top: 10px;
		font-size: 15px;
		line-height: 22px;
		color: rgba(31, 41, 55, 0.72);
	}

	.blur-card-list {
		margin-top: 24px;
		flex-direction: column;
	}

	.blur-card {
		margin-top: 14px;
		padding: 16px;
		min-height: 100px;
		border-radius: 8px;
		flex-direction: column;
	}

	.blur-card-blue {
		background-color: #9cc9ff;
	}

	.blur-card-green {
		background-color: #9fd8bd;
	}

	.blur-card-yellow {
		background-color: #f7d88a;
	}

	.blur-card-coral {
		background-color: #f4b2a6;
	}

	.blur-card-title {
		font-size: 17px;
		font-weight: bold;
		color: #1f2937;
	}

	.blur-card-desc {
		margin-top: 8px;
		font-size: 13px;
		line-height: 20px;
		color: rgba(31, 41, 55, 0.66);
	}

	.blur-tab-list {
		backdrop-filter: blur(5px);
		box-shadow: 0px 8px 24px rgba(31, 41, 55, 0.10);
	}

	/* #ifdef WEB */
	.blur-tab-list {
		-webkit-backdrop-filter: blur(5px);
	}
	/* #endif */

	.blur-tab-item {
		position: relative;
		z-index: 1;
		transform: scaleX(1.005);
	}

	.blur-tab-label {
		font-size: 15px;
		color: rgba(31, 41, 55, 0.72);
	}

	.blur-tab-label-active {
		color: #0f766e;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-tab-bar)


::: sourceCode
## uni-tab-item
:::

选项卡项组件

> 本 Component 是 uni ext component，需下载插件：[uni-tab-item](https://ext.dcloud.net.cn/plugin?id=27849)



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| badgeText | string |   | badge 的内容 |
| badgeClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | badge 的样式类 |

<!-- UTSCOMJSON.uni-tab-item.fileFormates -->



<!-- UTSCOMJSON.uni-tab-item.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-tab-item)


::: sourceCode
## uni-tab-content
:::

选项卡内容组件

> 本 Component 是 uni ext component，需下载插件：[uni-tab-content](https://ext.dcloud.net.cn/plugin?id=27849)



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |




<!-- UTSCOMJSON.uni-tab-content.fileFormates -->



<!-- UTSCOMJSON.uni-tab-content.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-tab-content)


::: sourceCode
## uni-tab-midbutton
:::

选项卡中间悬浮按钮组件

> 本 Component 是 uni ext component，需下载插件：[uni-tab-midbutton](https://ext.dcloud.net.cn/plugin?id=27849)



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| width | number | 90 | 中间按钮宽度，单位 px |
| height | number | 90 | 中间按钮高度，单位 px |

<!-- UTSCOMJSON.uni-tab-midbutton.fileFormates -->



<!-- UTSCOMJSON.uni-tab-midbutton.component_type -->



### 示例
#### tab-bar-midbutton
中间按钮
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar-midbutton.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar-midbutton.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar-midbutton

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar-midbutton

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-content-height-full="tabContentHeightFull" @change="handleChange">
		<uni-tab-content :style="tabContentStyle">
			<tabContent1 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent2 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent3 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent4 />
		</uni-tab-content>

		<uni-tab-bar style="border-top: 0px;">
			<uni-tab-item>
				<image :src="activeIndex == 0 ? '/static/componentHL.png' : '/static/component.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">组件</text>
			</uni-tab-item>
			<uni-tab-item badge-text="99+">
				<image :src="activeIndex == 1 ? '/static/apiHL.png' : '/static/api.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 1 ? 'tab-label-active' : ''">API</text>
			</uni-tab-item>
			<uni-tab-midbutton :width="60" :height="60">
				<view class="mid-button-shell">
					<view class="mid-button-core" hover-class="mid-button-core-hover" :hover-stop-propagation="true"
						@click="handleMidButtonClick">
						<text class="mid-button-plus">+</text>
						<text class="mid-button-label">发布</text>
					</view>
				</view>
			</uni-tab-midbutton>
			<uni-tab-item>
				<image :src="activeIndex == 2 ? '/static/cssHL.png' : '/static/css.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 2 ? 'tab-label-active' : ''">CSS</text>
			</uni-tab-item>
			<uni-tab-item badge-text="">
				<image :src="activeIndex == 3 ? '/static/templateHL.png' : '/static/template.png'" class="tab-icon-image"></image>
				<text class="tab-label" :class="activeIndex == 3 ? 'tab-label-active' : ''">模板</text>
			</uni-tab-item>
		</uni-tab-bar>
	</uni-tab>
</template>

<script setup lang="uts">
	import tabContent1 from './tab-content1.uvue'
	import tabContent2 from './tab-content2.uvue'
	import tabContent3 from './tab-content3.uvue'
	import tabContent4 from './tab-content4.uvue'

	const activeIndex = ref<number>(0)
	const midButtonClickCount = ref<number>(0)
	let tabContentHeightFull = false
	// #ifdef MP-WEIXIN
	tabContentHeightFull = true
	// #endif
	let tabContentStyle = ''
	// #ifdef MP-ALIPAY
	tabContentStyle = 'flex: 1; min-height: 0px;'
	// #endif

	function handleChange(index : number) : void {
		activeIndex.value = index
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '组件' })
				break
			case 1:
				uni.setNavigationBarTitle({ title: 'API' })
				break
			case 2:
				uni.setNavigationBarTitle({ title: 'CSS' })
				break
			case 3:
				uni.setNavigationBarTitle({ title: '模板' })
				break
		}
	}

	function handleMidButtonClick() : void {
		midButtonClickCount.value = midButtonClickCount.value + 1
		uni.showToast({
			title: 'mid-button 点击 ' + midButtonClickCount.value + ' 次',
			icon: 'none'
		})
	}
</script>

<style>
	.tab-icon-image {
		width: 24px;
		height: 24px;
	}

	.tab-label {
		font-size: 10px;
		color: rgb(122, 126, 131);
	}

	.tab-label-active {
		color: #007aff;
	}

	.mid-button-shell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0);
	}

	.mid-button-core {
		width: 52px;
		height: 52px;
		border-radius: 26px;
		background-color: #ff7a18;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* box-shadow: 0px 6px 16px rgba(255, 122, 24, 0.22); */
	}

	.mid-button-core-hover {
		transform: scale(0.96);
		opacity: 0.92;
	}

	.mid-button-plus {
		font-size: 22px;
		line-height: 22px;
		color: #ffffff;
	}

	.mid-button-label {
		margin-top: 1px;
		font-size: 9px;
		color: #ffffff;
	}
</style>

```

:::
#### tab-bar-midbutton-notch
中间按钮镂空
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/tab-bar/tab-bar-midbutton-notch.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/tab-bar/tab-bar-midbutton-notch.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/tab-bar/tab-bar-midbutton-notch

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/tab-bar/tab-bar-midbutton-notch

>示例
```vue
<template>
	<uni-tab style="flex: 1" :active-index="activeIndex" :tab-content-height-full="tabContentHeightFull" @change="handleChange">
		<uni-tab-content :style="tabContentStyle">
			<tabContent1 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent2 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent3 />
		</uni-tab-content>
		<uni-tab-content :style="tabContentStyle">
			<tabContent4 />
		</uni-tab-content>

		<uni-tab-bar style="border-top: 0px;background-color: rgba(0, 0, 0, 0);">
			<uni-tab-item class="tab-bg">
				<!-- <image :src="activeIndex == 0 ? '/static/componentHL.png' : '/static/component.png'" class="tab-icon-image"></image> -->
				<text :class="activeIndex == 0 ? 'tab-label-active' : ''">🏠</text>
				<text class="tab-label" :class="activeIndex == 0 ? 'tab-label-active' : ''">首页</text>
			</uni-tab-item>
			<uni-tab-item class="tab-bg">
				<!-- <image :src="activeIndex == 1 ? '/static/apiHL.png' : '/static/api.png'" class="tab-icon-image"></image> -->
				<text :class="activeIndex == 0 ? 'tab-label-active' : ''">💬</text>
				<text class="tab-label" :class="activeIndex == 1 ? 'tab-label-active' : ''">消息</text>
			</uni-tab-item>
			<uni-tab-midbutton :width="106" :height="94">
				<view class="floating-ball" hover-class="floating-ball-hover" :hover-stop-propagation="true" @click="handleMidButtonClick">
					<view flatten class="floating-ball-plus" style="position: absolute;"></view>
					<view flatten class="floating-ball-plus" style="position: absolute;transform: rotate(90deg);"></view>
				</view>
				<image class="notch-svg" src="/static/tab-bar-midbutton-notch.svg" mode="scaleToFill"></image>
			</uni-tab-midbutton>
			<uni-tab-item class="tab-bg">
				<!-- <image :src="activeIndex == 2 ? '/static/cssHL.png' : '/static/css.png'" class="tab-icon-image"></image> -->
				<text :class="activeIndex == 0 ? 'tab-label-active' : ''">🔔</text>
				<text class="tab-label" :class="activeIndex == 2 ? 'tab-label-active' : ''">通知</text>
			</uni-tab-item>
			<uni-tab-item class="tab-bg" badge-text="8">
				<!-- <image :src="activeIndex == 3 ? '/static/templateHL.png' : '/static/template.png'" class="tab-icon-image"></image> -->
				<text :class="activeIndex == 0 ? 'tab-label-active' : ''">👤</text>
				<text class="tab-label" :class="activeIndex == 3 ? 'tab-label-active' : ''">我的</text>
			</uni-tab-item>
		</uni-tab-bar>
		<view class="tab-bg tab-safe-area-bg"></view> <!-- 因为要镂空，tabbar不能整体设背景色，只能加一个占位view覆盖安全区的颜色，-->
	</uni-tab>
</template>

<script setup lang="uts">
	import tabContent1 from './tab-content1.uvue'
	import tabContent2 from './tab-content2.uvue'
	import tabContent3 from './tab-content3.uvue'
	import tabContent4 from './tab-content4.uvue'

	const activeIndex = ref<number>(0)
	const midButtonClickCount = ref<number>(0)
	let tabContentHeightFull = true
	let tabContentStyle = ''
	// #ifdef MP-ALIPAY
	tabContentHeightFull = false
	tabContentStyle = 'flex: 1; min-height: 0px;'
	// #endif

	function handleChange(index : number) : void {
		activeIndex.value = index
		switch (index) {
			case 0:
				uni.setNavigationBarTitle({ title: '首页' })
				break
			case 1:
				uni.setNavigationBarTitle({ title: '消息' })
				break
			case 2:
				uni.setNavigationBarTitle({ title: '通知' })
				break
			case 3:
				uni.setNavigationBarTitle({ title: '我的' })
				break
		}
	}

	function handleMidButtonClick() : void {
		midButtonClickCount.value = midButtonClickCount.value + 1
		uni.showToast({
			title: '悬浮球点击 ' + midButtonClickCount.value + ' 次',
			icon: 'none'
		})
	}
</script>

<style>
	.tab-icon-image {
		width: 24px;
		height: 24px;
	}

	.tab-label {
		font-size: 10px;
		color: rgb(220, 220, 220);
	}

	.tab-label-active {
		color: #FFFFFF;
	}

	.tab-bg {
		background-color: #2196F3;
		/* 宽度用transform调宽1点，不然在某些屏幕上，item之间会出现半像素的间隙 */
		transform: scaleX(1.005);
		/* margin-left: -1px; */
		/* margin-right: -1px; */
	}

	/* #ifdef MP-ALIPAY */
	.tab-bg {
		transform: none;
		margin-left: -1px;
		margin-right: -1px;
	}
	/* #endif */

	.tab-safe-area-bg {
		width: 100%;
		height: var(--uni-safe-area-inset-bottom);
		position: absolute;
		bottom: 0;
	}

	/* #ifdef MP-ALIPAY */
	.tab-safe-area-bg {
		height: calc(var(--uni-safe-area-inset-bottom) + 1px);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
	/* #endif */

	.notch-svg {
		width: 108px;
		height: 50px;
		position: absolute;
		margin-left: -1px; /* 为了防止边线漏出半像素 */
		margin-right: -1px; /* 为了防止边线漏出半像素 */
		bottom: 0;
		pointer-events: none; /* 不拦截点击。 TODO 鸿蒙上有bug，svg图仍然遮挡了点击区，导致加号的下半部分点不着*/
	}

	/* #ifdef MP-ALIPAY */
	.notch-svg {
		width: 112px;
		height: 51px;
		margin-left: -3px;
		margin-right: -3px;
		bottom: -1px;
	}
	/* #endif */

	.floating-ball {
		position: relative;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		background-color: #ff5a24;
		justify-content: center;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff;
		box-shadow: 0px 4px 10px rgba(28, 98, 183, 0.16);
	}

	.floating-ball-hover {
		opacity: 0.92;
		transform: scale(0.96);
	}

	.floating-ball-plus {
		background-color: #ffffff;
		border-radius: 2px;
		width: 40%;
		height: 2px;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-tab-midbutton)
