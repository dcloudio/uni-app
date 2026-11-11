# uni-tab-bar 自定义底部选项卡

## 用途和场景

用于在页面内自定义底部 tab-bar，包括一组前端组件：

- `uni-tab`：最外层容器，负责激活索引、内容区高度和切换事件
- `uni-tab-bar`：底部 tab 容器，负责底栏布局、安全区和中间按钮占位
- `uni-tab-item`：普通 tab 项，负责插槽展示和 badge
- `uni-tab-midbutton`：中间悬浮按钮占位容器
- `uni-tab-content`：上方内容区域容器，负责内容注册、懒渲染和显示切换

每个选项卡内容不再是页面，而是 `uni-tab-content` 的子组件。相比 `pages.json` 中的 tabBar，本组件是纯前端、跨平台的：

1. `pages.json` 中 tabBar 相关的 API 无法应用于自定义 tab-bar（如 `uni.switchTab`、`uni.showTabBar`、`uni.setTabBarBadge` 等）。
2. `pages.json` 中 tabBar 页面仍走页面生命周期，而自定义 tab-bar 的 `uni-tab-content` 内容不触发页面生命周期，只触发组件生命周期。

自定义 tab-bar 拥有更强的功能、更灵活的控制方式（如下凹式 midbutton）。在 uni-app x 的非小程序平台中，性能也不会比 `pages.json` 中的 tabBar 差。

## 使用方式（职责分工）

- 组件内部负责：维护激活索引、注册 `uni-tab-item` 与 `uni-tab-content`、按需懒渲染内容、处理底栏安全区与中间按钮占位、抛出切换事件。
- 使用者负责：
  - 用 `uni-tab` 包裹整个 tab，并通过 `:active-index` + `@change` 控制与响应切换（受控）。
  - 保证 `uni-tab-content` 与 `uni-tab-item` 数量一致、顺序一一对应。
  - 通过 `class` / `style` 自定义底栏和内容区外观，通过 `badge-text` / `badge-class` 控制角标。
  - 使用 `uni-tab-midbutton` 时，自行在插槽内实现中间按钮的点击行为。

## 基本用法

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

底栏主体高度默认为 `50px`。如果需要自定义，请在 `uni-tab` 上设置 `--uni-tab-bar-height` CSS 变量：

```vue
<uni-tab style="flex: 1; --uni-tab-bar-height: 40px" :active-index="activeIndex" @change="handleChange">
	...
</uni-tab>
```

多个选项卡内容揉在一个 `uni-tab` 中比较乱，一般推荐 `uni-tab-content` 下放一个子组件，子组件作为独立 uvue 文件。

各个 `uni-tab-content` 的子组件在显示和隐藏时没有生命周期。如需监听显示/隐藏，需要通过 provide/inject 方式从外层传入响应式变量 `activeIndex`，然后在子组件中 watch 这个 `activeIndex`。

## 注意事项

1. `uni-tab` 所在的页面不应该滚动，应该在 `pages.json` 中配置页面 style 为 `disableScroll:true`。
2. 屏幕变化适配，Android 需 HBuilderX 5.09+ 支持。之前版本组件里无法监听页面的 `onResize`。
3. `uni-tab-content` 与 `uni-tab-item` 的数量必须一致，顺序也必须一一对应，否则切换后的内容会错位。
4. `uni-tab` 默认占满页面的宽度和高度，即 `style="flex: 1"`。
5. 自定义底栏高度时，请在 `uni-tab` 上设置带长度单位的 `--uni-tab-bar-height` CSS 变量，例如 `--uni-tab-bar-height: 40px`。底栏和需要显式计算高度的内容区会共用该变量。
6. 如果底栏存在镂空、下凹或透明边缘，需要让底部内容透出来，请在 `uni-tab` 上开启 `tab-content-height-full`，此时内容区会延伸到 `uni-tab-bar` 下方。
7. `uni-tab-content` 采用"首次激活再渲染"的策略；第一次切入前不会创建实例，切走后只隐藏不销毁，适合保留 tab 内部状态。
8. `uni-tab-item` 只负责普通 tab 项注册与展示，不提供单独点击事件；请统一监听 `uni-tab` 的 `change`。
9. 使用 `uni-tab-midbutton` 时，中间按钮左右两侧的普通 `uni-tab-item` 数量需要相等，也就是普通项总数必须为偶数，才能保持居中均分布局。
10. `uni-tab-midbutton` 只负责预留中间按钮位置，不参与激活索引计算；中间按钮点击行为需要在插槽内部自行处理。
11. `badge-text` 传空字符串时显示红点，传 `'0'` 时不显示；如果需要自定义 badge 外观，请使用 `badge-class` 覆盖样式。
12. `uni-tab-bar`、`uni-tab-item`、`uni-tab-content` 的根节点都支持直接挂 `class` / `style`，推荐把视觉差异放在页面侧处理，不要改组件内部逻辑。
13. 微信小程序提供了一种 webview 方式渲染的底部 tabBar 方式，来进行 tabBar 自定义。这种方式仅微信小程序支持，与本组件无关。
