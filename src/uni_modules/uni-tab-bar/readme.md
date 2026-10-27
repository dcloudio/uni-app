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

底栏主体高度默认为 `50px`。如果需要自定义，请在 `uni-tab` 上设置 `--uni-tab-bar-height` CSS 变量：

```vue
<uni-tab style="flex: 1; --uni-tab-bar-height: 40px" :active-index="activeIndex" @change="handleChange">
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
5. 自定义底栏高度时，请在 `uni-tab` 上设置带长度单位的 `--uni-tab-bar-height` CSS 变量，例如 `--uni-tab-bar-height: 40px`。底栏和需要显式计算高度的内容区会共用该变量。
6. 如果底栏存在镂空、下凹或透明边缘，需要让底部内容透出来，请在 `uni-tab` 上开启 `tab-content-height-full`，此时内容区会延伸到 `uni-tab-bar` 下方。
7. `uni-tab-content` 采用“首次激活再渲染”的策略；第一次切入前不会创建实例，切走后只隐藏不销毁，适合保留 tab 内部状态。
8. `uni-tab-item` 只负责普通 tab 项注册与展示，不提供单独点击事件；请统一监听 `uni-tab` 的 `change`。
9. 使用 `uni-tab-midbutton` 时，中间按钮左右两侧的普通 `uni-tab-item` 数量需要相等，也就是普通项总数必须为偶数，才能保持居中均分布局。
10. `uni-tab-midbutton` 只负责预留中间按钮位置，不参与激活索引计算；中间按钮点击行为需要在插槽内部自行处理。
11. `badge-text` 传空字符串时显示红点，传 `'0'` 时不显示；如果需要自定义 badge 外观，请使用 `badge-class` 覆盖样式。
12. `uni-tab-bar`、`uni-tab-item`、`uni-tab-content` 的根节点都支持直接挂 `class` / `style`，推荐把视觉差异放在页面侧处理，不要改组件内部逻辑。
13. 微信小程序提供了一种webview方式渲染的底部tabBar方式，来进行tabBar自定义。这种方式仅微信小程序支持，与本组件无关。
