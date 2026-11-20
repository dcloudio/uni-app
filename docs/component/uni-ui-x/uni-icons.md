---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-icons-x
---

::: sourceCode
## uni-icons

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-icons


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-icons-x/components/uni-icons

:::



> 本 Component 是 uni ext component，需下载插件：[uni-icons](https://ext.dcloud.net.cn/plugin?id=30221)


# uni-icons 图标

适用于 uni-app x 蒸汽模式的字体图标组件。

## 用途和场景

- 替代小图片，减少图片资源
- 界面中的功能图标、状态图标
- 需要跟随文字颜色、字号变化的图标

## 使用方式

组件负责：

- 根据 `type` 渲染对应字形，未传入或取值不存在时不显示图标
- 内部通过 `@font-face` 引入字体：Web/小程序使用 `uniicons.woff2`，App 使用 `uniicons.ttf`

使用者负责：

- 通过 `type` 指定图标名称
- 直接在组件标签上设置 `class` 或 `style` 自定义颜色、字号及其他文字样式

组件内部 DOM 结构极简，只有一个承载字形的 `text`（App）或 `view`（Web/小程序）节点。

## 基本用法

```html
<template>
	<uni-icons type="search" />
	<uni-icons type="heart-filled" style="color: #ff5a5f; font-size: 28px;" />
</template>
```

`type` 为字符串联合类型，在 IDE 中编写 `type="..."` 时会自动提示全部可选图标名称。

### 自定义颜色和字号

组件根节点承载字形，标签上的 `class` 和 `style` 会直接作用于该节点：

```html
<template>
	<uni-icons type="heart-filled" :class="active ? 'icon-active' : 'icon-base'" />
</template>

<style>
.icon-base {
	color: #8a8f99;
	font-size: 28px;
}

.icon-active {
	color: #ff5a5f;
}
</style>
```

### 自定义字体

如需替换为自定义字体，可自行覆盖根节点的 `font-family`：

```html
<template>
	<uni-icons type="search" class="custom-icon" />
</template>

<style>
@font-face {
	font-family: CustomFont;
	src: url('/static/custom.ttf');
}

.custom-icon {
	font-family: CustomFont;
}
</style>
```

## 图标调整

图标名称和使用方式保持不变。组件优先使用当前平台支持的 uni-app x [内置图标](https://doc.dcloud.net.cn/uni-app-x/css/common/at-rules.html#uniicon)。

### 内置图标

| `type` | 内置图标 | 支持平台 |
| --- | --- | --- |
| `left` | `back` | App、Web、小程序 |
| `closeempty` | `close` | App、Web、小程序 |
| `checkmarkempty` | `success_no_circle` | App、Web、小程序 |
| `info-filled` | `info` | App、Web、小程序 |
| `search` | `search` | App、Web、小程序 |
| `checkbox` | `success circle` | App |
| `checkbox-filled` | `success` | App |
| `close` | `cancel circle` | App |
| `clear` | `clear` | App |
| `info` | `info circle` | App |
| `circle` | `circle` | App |
| `star` | `favorites` | App |
| `home` | `home` | App |
| `more-filled` | `more` | App |

### 通过 transform 实现的图标

| `type` | 基础图标 | 处理方式 |
| --- | --- | --- |
| `top`、`up` | `left` | 旋转 90° |
| `right` | `left` | 旋转 180° |
| `bottom`、`down` | `left` | 旋转 -90° |
| `plusempty` | `closeempty` | 旋转 45° |
| `plus` | `close` | 旋转 45° |
| `plus-filled` | `clear` | 旋转 45° |
| `arrow-up` | `arrow-left` | 旋转 90° |
| `arrow-right` | `arrow-left` | 旋转 180° |
| `arrow-down` | `arrow-left` | 旋转 -90° |
| `last-page`、`skip-right-line` | `first-page` | 旋转 180° |

## 注意事项

- 通过 `style` 设置的内联样式会覆盖组件默认样式。
- 使用全局 class 覆盖 `font-family` 时，可能需要使用 `!important`。




### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | IconsType | "" | Web: 5.36; 微信小程序: 5.36; 支付宝小程序: 5.36; Android(Vapor): 5.21; iOS(Vapor): 5.21; HarmonyOS(Vapor): 5.21 | 图标名称，取值范围见 icons.ts 导出的 IconsType，未传入或取值不存在时不显示图标 |

#### type 的属性描述

| 合法值 |
| :- |
| arrow-down |
| arrow-left |
| arrow-right |
| arrow-up |
| bars |
| bottom |
| camera |
| camera-filled |
| chatbubble |
| chatbubble-filled |
| checkbox |
| checkbox-filled |
| checkmarkempty |
| circle |
| circle-filled |
| clear |
| close |
| closeempty |
| cloud-upload |
| cloud-upload-filled |
| compose |
| contact |
| contact-filled |
| copy |
| down |
| download |
| eye |
| eye-filled |
| eye-slash |
| eye-slash-filled |
| first-page |
| font |
| gear |
| hand-down |
| hand-down-filled |
| hand-up |
| hand-up-filled |
| heart |
| heart-filled |
| help |
| help-filled |
| home |
| home-filled |
| images |
| images-filled |
| info |
| info-filled |
| last-page |
| left |
| list |
| location |
| location-filled |
| logout |
| map-pin |
| map-pin-ellipse |
| mic |
| mic-filled |
| micoff |
| micoff-filled |
| minus |
| minus-filled |
| more |
| more-filled |
| paperplane |
| paperplane-filled |
| person |
| person-filled |
| plus |
| plus-filled |
| plusempty |
| pulldown |
| reload |
| right |
| scan |
| search |
| share |
| sidebar |
| skip-left-line |
| skip-right-line |
| sound |
| sound-filled |
| sound-slash |
| sound-slash-filled |
| spinner-cycle |
| star |
| star-filled |
| starhalf |
| top |
| trash |
| up |
| weixin |

<!-- UTSCOMJSON.uni-icons.fileFormates -->



<!-- UTSCOMJSON.uni-icons.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/icons/icons.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/icons/icons.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/icons/icons

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/icons/icons

>示例
```vue
<template>
	<scroll-view class="page" :class="{ 'page-dark': isDarkMode }">
		<view class="intro" :class="{ 'surface-dark': isDarkMode }">
			<text class="intro-text" :class="{ 'text-dark': isDarkMode }">图标组件可以减少小图片的使用，并支持自定义颜色和尺寸。</text>
		</view>

		<view class="section-header" :class="{ 'surface-dark': isDarkMode }">
			<text class="section-title" :class="{ 'text-dark': isDarkMode }">图标</text>
			<view class="display-mode">
				<text class="display-mode-text" :class="{ 'text-dark': isDarkMode }">{{ checked ? 'Unicode' : '名称' }}</text>
				<switch class="display-mode-switch" :checked="checked" @change="change" />
			</view>
		</view>

		<view class="icon-content" :class="{ 'surface-dark': isDarkMode }">
			<view
				v-for="(item, index) in iconlist"
				:key="index"
				class="icon-item"
				@click="switchActive(index, item)"
			>
				<uni-icons
					:type="item.font_class"
					class="icon-glyph"
					:class="{
						'icon-glyph-active': activeIndex == index,
						'icon-glyph-dark': isDarkMode
					}"
				/>
				<text
					class="icon-label"
					:class="{
						'icon-label-active': activeIndex == index,
						'icon-label-dark': isDarkMode
					}"
				>{{ checked ? item.unicode : item.font_class }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
	import { state } from '@/store/index.ts'
	import { iconlist, iconType } from './icons_type.uts'

	const activeIndex = ref(-1)
	const checked = ref(false)
	const isDarkMode = computed(() : boolean => state.isDarkMode)

	const syncNavigationBar = () : void => {
		// #ifdef APP
		const dark = isDarkMode.value
		uni.setNavigationBarColor({
			frontColor: dark ? '#ffffff' : '#000000',
			backgroundColor: dark ? '#1a1a1a' : '#efeff4'
		})
		// #endif
	}

	const change = (event : UniSwitchChangeEvent) => {
		checked.value = event.detail.value
	}

	const switchActive = (index : number, item : iconType) => {
		activeIndex.value = index
		uni.setClipboardData({
			data: checked.value ? item.unicode : item.font_class,
			showToast: false,
			success: () => {
				uni.showToast({
					icon: 'none',
					title: (checked.value ? 'Unicode' : '图标名称') + '复制成功'
				})
			}
		})
	}

	watch(isDarkMode, syncNavigationBar, { immediate: true })
	onShow(syncNavigationBar)

	defineExpose({
		activeIndex,
		checked
	})
</script>

<style>
	.page {
		flex: 1;
		background-color: var(--background-color, #efeff4);
	}

	.page-dark {
		background-color: #1a1a1a;
	}

	.intro {
		padding: 16px;
		background-color: var(--list-background-color, #ffffff);
	}

	.intro-text {
		font-size: 14px;
		line-height: 22px;
		color: var(--text-color, #333333);
	}

	.section-header {
		margin-top: 10px;
		padding: 12px 16px;
		background-color: var(--list-background-color, #ffffff);
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.section-title {
		font-size: 16px;
		font-weight: bold;
		color: var(--text-color, #333333);
	}

	.display-mode {
		flex-direction: row;
		align-items: center;
	}

	.display-mode-text {
		margin-right: 8px;
		font-size: 13px;
		color: var(--text-color, #333333);
		opacity: 0.65;
	}

	.display-mode-switch {
		transform: scale(0.7);
	}

	.icon-content {
		padding: 8px 0 24px;
		background-color: var(--list-background-color, #ffffff);
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.surface-dark {
		background-color: #2d2d2d;
	}

	.icon-item {
		width: 25%;
		padding: 12px 4px 10px;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	.icon-label {
		width: 100%;
		margin-top: 8px;
		font-size: 12px;
		line-height: 16px;
		text-align: center;
		color: var(--text-color, #333333);
		opacity: 0.65;
	}

	.icon-label-dark {
		color: #ffffff;
	}

	.icon-label-active {
		color: #007aff;
		opacity: 1;
	}

	.icon-glyph {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		align-self: center;
		flex-shrink: 0;
		color: var(--text-color, #333333);
		font-size: 30px;
		opacity: 0.65;
	}

	.icon-glyph-dark {
		color: #ffffff;
	}

	.icon-glyph-active {
		color: #007aff;
		opacity: 1;
	}

	.text-dark {
		color: #ffffff;
	}

</style>

```

:::


