---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-icons-x
---

::: sourceCode
## uni-icons

> GitCode: https://gitcode.com/dcloud/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-icons-x/components/uni-icons


> GitHub: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-icons-x/components/uni-icons

:::



> 本 Component 是 uni ext component，需下载插件：[uni-icons](https://ext.dcloud.net.cn/plugin?id=30221)


# uni-icons 图标

适用于 uni-app x 蒸汽模式的字体图标组件。

组件内部DOM结构极简，只有一个 `text` 组件。通过 `type` 指定图标名称，并可直接在组件标签上设置 `class` 或 `style` 自定义颜色、字号及其他文字样式。

在web平台，内部使用了woff2字体，减少web包体积。

## 基本用法

```html
<template>
	<uni-icons type="search" />
	<uni-icons type="heart-filled" style="color: #ff5a5f; font-size: 28px;" />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | `''` | 图标名称，取值范围见 [属性表中的合法值](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/uni-icons.html#属性)；未传入或取值不存在时组件不显示图标 |

`type` 为字符串联合类型，在 IDE 中编写 `type="..."` 时会自动提示全部可选图标名称。

## 自定义颜色和字号

组件根节点是 `text`，标签上的 `class` 和 `style` 会直接作用于该节点：

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

## 自定义字体

组件内部通过 `@font-face` 引入字体：Web 平台使用 `uniicons.woff2`，其他平台使用 `uniicons.ttf`。如需替换为自定义字体，可自行覆盖根节点的 `font-family`：

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

## 样式说明

通过 `style` 设置的内联样式会覆盖组件默认样式；使用全局 class 覆盖 `font-family` 时，可能需要使用 `!important`。




### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| type | IconsType | "" | 图标名称，取值范围见 icons.ts 导出的 IconsType，未传入或取值不存在时不显示图标 |

#### type 的属性描述

| 合法值 |
| :- |
| arrow-down |
| arrow-left |
| arrow-right |
| arrow-up |
| auth |
| auth-filled |
| back |
| bars |
| calendar |
| calendar-filled |
| camera |
| camera-filled |
| cart |
| cart-filled |
| chat |
| chat-filled |
| chatboxes |
| chatboxes-filled |
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
| cloud-download |
| cloud-download-filled |
| cloud-upload |
| cloud-upload-filled |
| color |
| color-filled |
| compose |
| contact |
| contact-filled |
| down |
| bottom |
| download |
| download-filled |
| email |
| email-filled |
| eye |
| eye-filled |
| eye-slash |
| eye-slash-filled |
| fire |
| fire-filled |
| flag |
| flag-filled |
| folder-add |
| folder-add-filled |
| font |
| forward |
| gear |
| gear-filled |
| gift |
| gift-filled |
| hand-down |
| hand-down-filled |
| hand-up |
| hand-up-filled |
| headphones |
| heart |
| heart-filled |
| help |
| help-filled |
| home |
| home-filled |
| image |
| image-filled |
| images |
| images-filled |
| info |
| info-filled |
| left |
| link |
| list |
| location |
| location-filled |
| locked |
| locked-filled |
| loop |
| mail-open |
| mail-open-filled |
| map |
| map-filled |
| map-pin |
| map-pin-ellipse |
| medal |
| medal-filled |
| mic |
| mic-filled |
| micoff |
| micoff-filled |
| minus |
| minus-filled |
| more |
| more-filled |
| navigate |
| navigate-filled |
| notification |
| notification-filled |
| paperclip |
| paperplane |
| paperplane-filled |
| person |
| person-filled |
| personadd |
| personadd-filled |
| personadd-filled-copy |
| phone |
| phone-filled |
| plus |
| plus-filled |
| plusempty |
| pulldown |
| pyq |
| qq |
| redo |
| redo-filled |
| refresh |
| refresh-filled |
| refreshempty |
| reload |
| right |
| scan |
| search |
| settings |
| settings-filled |
| shop |
| shop-filled |
| skip-back-fill |
| skip-back-line |
| skip-forward-fill |
| skip-forward-line |
| skip-left-line |
| skip-right-line |
| smallcircle |
| smallcircle-filled |
| sound |
| sound-filled |
| spinner-cycle |
| staff |
| staff-filled |
| star |
| star-filled |
| starhalf |
| trash |
| trash-filled |
| tune |
| tune-filled |
| undo |
| undo-filled |
| up |
| top |
| upload |
| upload-filled |
| videocam |
| videocam-filled |
| vip |
| vip-filled |
| wallet |
| wallet-filled |
| weibo |
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

<script setup lang="uts">
	import { state } from '@/store/index.ts'
	import { iconlist, iconType } from './icons_type'

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
	}

	.surface-dark {
		background-color: #2d2d2d;
	}

	.icon-item {
		width: 25%;
		min-height: 84px;
		padding: 10px 4px;
		align-items: center;
		justify-content: center;
	}

	.icon-label {
		margin-top: 8px;
		font-size: 12px;
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


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-icons)
