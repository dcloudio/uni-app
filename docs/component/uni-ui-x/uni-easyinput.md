---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-easyinput-x
---

::: sourceCode
## uni-easyinput

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-easyinput

:::

对 input 和 textarea 的常用能力进行封装，支持清空、密码显隐、前后图标及输入内容裁剪。

# uni-easyinput 增强输入框

适用于 uni-app x 的增强输入框。在原生 `input` 和 `textarea` 基础上提供清空、密码显隐、前后图标、空白裁剪和左右插槽。

## 基本用法

```html
<uni-easyinput v-model="value" placeholder="请输入内容" />
```

## 输入类型

```html
<uni-easyinput v-model="password" type="password" placeholder="请输入密码" />
<uni-easyinput v-model="description" type="textarea" placeholder="请输入介绍" />
```

除 `password` 和 `textarea` 外，`type` 会透传给原生 `input`。

## 图标和插槽

```html
<uni-easyinput
	v-model="keyword"
	prefix-icon="search"
	suffix-icon="compose"
	@iconClick="onIconClick"
/>

<uni-easyinput v-model="website">
	<template #left>
		<text>https://</text>
	</template>
	<template #right>
		<text>.com</text>
	</template>
</uni-easyinput>
```

密码显隐图标可以和清空图标同时使用。设置 `suffix-icon` 后，自定义后置图标替代清空图标，但不替代密码显隐图标。

## 自定义样式

根节点样式直接通过组件的 `class` 或 `style` 设置；内部节点通过 external classes 设置：

```html
<uni-easyinput
	class="custom-easyinput"
	v-model="value"
	input-class="custom-input"
	placeholder-class="custom-placeholder"
	action-icon-class="custom-action-icon"
/>
```

```css
.custom-easyinput {
	border-radius: 0;
}

.custom-input {
	color: #0052cc;
	font-size: 16px;
}

.custom-placeholder {
	color: #8c939d;
}

.custom-action-icon {
	color: #0052cc;
}
```

VDOM 模式需要在 `manifest.json` 中启用样式隔离策略 2.0。定义在全局 `App.uvue` 中的 external class 覆盖组件默认样式时，部分属性可能需要使用 `!important`。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | String / Number | - | 输入内容，支持 `v-model` |
| value | String / Number | - | 不使用 `v-model` 时传入的内容 |
| name | String | `''` | 原生表单控件名称 |
| type | String | `text` | 输入类型；额外支持 `password`、`textarea` |
| clearable | Boolean | `true` | 是否显示清空图标 |
| autoHeight | Boolean | `false` | textarea 是否自动增高 |
| placeholder | String | `''` | 占位文字 |
| focus | Boolean | `false` | 是否聚焦 |
| disabled | Boolean | `false` | 是否禁用 |
| maxlength | Number | `140` | 最大输入长度，`-1` 表示不限制 |
| confirmType | String | `done` | 键盘右下角按钮类型 |
| inputBorder | Boolean | `true` | 是否显示边框 |
| prefixIcon | String | `''` | 前置 uni-icons 图标名称 |
| suffixIcon | String | `''` | 后置 uni-icons 图标名称 |
| trim | Boolean / String | `false` | `both`、`left`、`right`、`start`、`end`、`all` 或 `none` |
| cursorSpacing | Number | `0` | 光标与键盘的距离 |
| passwordIcon | Boolean | `true` | 密码输入是否显示显隐图标 |
| adjustPosition | Boolean | `true` | 键盘弹起时是否自动上推页面 |
| errorMessage | String / Boolean | `false` | 是否显示错误状态，不渲染错误信息节点 |

## External Classes

| 属性名 | 说明 |
| --- | --- |
| input-class | input 和 textarea 样式 |
| placeholder-class | 占位文字样式 |
| prefix-icon-class | 前置图标样式 |
| suffix-icon-class | 后置图标样式 |
| action-icon-class | 清空和密码显隐图标样式 |

## Events

| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容更新 |
| input | `value: string` | 输入时触发 |
| focus | 原生 focus 事件 | 聚焦时触发 |
| blur | 原生 blur 事件 | 失焦时触发 |
| confirm | `value: string` | 点击键盘完成按钮时触发 |
| change | `value: string` | 失焦或点击完成按钮时触发；同一次确认后失焦不会重复触发 |
| clear | - | 点击清空图标时触发 |
| eyes | `visible: boolean` | 切换密码显隐时触发 |
| iconClick | `prefix` / `suffix` | 点击前置或后置图标时触发 |
| keyboardheightchange | 原生键盘高度事件 | 键盘高度变化时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 输入区域左侧内容 |
| right | 输入区域右侧内容 |

## Expose

| 方法名 | 说明 |
| --- | --- |
| focus() | 使内部输入框聚焦 |
| blur() | 使内部输入框失焦 |




### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| modelValue | string \| number \| null |   |   |
| value | string \| number \| null |   |   |
| type | string | "text" |   |
| clearable | boolean | true |   |
| autoHeight | boolean | false |   |
| placeholder | string | "" |   |
| focus | boolean | false |   |
| disabled | boolean | false |   |
| maxlength | number | 140 |   |
| confirmType | string | "done" |   |
| inputBorder | boolean | true |   |
| prefixIcon | string | "" |   |
| suffixIcon | string | "" |   |
| trim | string \| boolean | false |   |
| cursorSpacing | number | 0 |   |
| passwordIcon | boolean | true |   |
| adjustPosition | boolean | true |   |
| errorMessage | string \| boolean | false |   |
| inputClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   |
| placeholderClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   |
| prefixIconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   |
| suffixIconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   |
| actionIconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" |   |
| name | string | "" |   |
| @input | Function |   | 输入时触发 |
| @focus | Function |   | 聚焦时触发 |
| @blur | Function |   | 失焦时触发 |
| @confirm | Function |   | 点击键盘完成按钮时触发 |
| @change | Function |   | 失焦或点击键盘完成按钮时触发 |
| @clear | Function |   | 点击清空图标时触发 |
| @eyes | Function |   | 切换密码显隐时触发 |
| @iconClick | Function |   | 点击前置或后置图标时触发 |
| @keyboardheightchange | Function |   | 键盘高度变化时触发 |
| @update:modelValue | Event |   |   |

<!-- UTSCOMJSON.uni-easyinput.fileFormates -->



<!-- UTSCOMJSON.uni-easyinput.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/easyinput/easyinput.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/easyinput/easyinput.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/easyinput/easyinput

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/easyinput/easyinput

>示例
```vue
<template>
	<view>
		<view class="intro">
			<text class="page-title">Easyinput 增强输入框</text>
			<text class="page-desc">支持单行、多行、密码、清空、前后插槽和自定义内部样式。</text>
		</view>

		<view class="section">
			<text class="section-title">基础输入</text>
			<uni-easyinput
				v-model="data.basicValue"
				clearable
				placeholder="请输入内容"
				input-class="test-basic-input"
				icon-class="test-clear-icon"
				@clear="onClear"
				@change="onChange"
				@confirm="onConfirm"
				@blur="handleBlur"
			/>
			<text
				class="result-text test-basic-result"
				:data-change-count="data.changeCount"
				:data-confirm-count="data.confirmCount"
				:data-blur-count="data.blurCount"
			>当前值：{{ data.basicValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">外部值同步</text>
			<view class="button-row">
				<button class="small-button" size="mini" @click="setExternalValue(0)">设为 0</button>
				<button class="small-button" size="mini" @click="setExternalValue(null)">设为 null</button>
				<button class="small-button" size="mini" @click="setExternalValue('外部更新')">设为文本</button>
			</view>
			<uni-easyinput
				v-model="data.externalValue"
				value="后备值"
				placeholder="观察外部值同步"
				input-class="test-external-input"
			/>
			<text class="result-text">当前值：{{ data.externalValue == null ? 'null' : data.externalValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">Vue 修饰符</text>
			<uni-easyinput
				v-model.trim="data.modifierValue"
				placeholder="首尾空格由 v-model.trim 处理"
				input-class="test-modifier-input"
			/>
			<text class="result-text">当前值：[{{ data.modifierValue }}]</text>
		</view>

		<view class="section">
			<text class="section-title">密码和清空</text>
			<uni-easyinput
				v-model="data.passwordValue"
				type="password"
				password-icon
				clearable
				placeholder="请输入密码"
				input-class="test-password-input"
				icon-class="test-password-icon"
				@eyes="onEyes"
			/>
			<text class="result-text">密码显隐：{{ data.passwordVisible ? '显示' : '隐藏' }}</text>
		</view>

		<view class="section">
			<text class="section-title">多行输入</text>
			<uni-easyinput
				v-model="data.textareaValue"
				type="textarea"
				auto-height
				placeholder="请输入多行内容"
				input-class="demo-textarea test-textarea"
			/>
			<text class="result-text">当前值：{{ data.textareaValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">状态</text>
			<uni-easyinput
				class="state-input"
				value="disabled-secret"
				type="password"
				password-icon
				clearable
				disabled
				input-class="test-disabled-input"
				icon-class="test-disabled-icon"
			/>
			<uni-easyinput
				class="state-input state-borderless"
				v-model="data.borderlessValue"
				placeholder="无边框（class 覆盖）"
			/>
		</view>

		<view class="section">
			<text class="section-title">左右插槽</text>
			<uni-easyinput v-model="data.slotValue" placeholder="请输入域名">
				<template #left>
					<text class="slot-prefix">https://</text>
				</template>
				<template #right>
					<text class="slot-suffix">.com</text>
				</template>
			</uni-easyinput>
		</view>

		<view class="section section-last">
			<text class="section-title">自定义样式与窄布局</text>
			<uni-easyinput
				class="custom-root"
				v-model="data.customValue"
				clearable
				placeholder="宽度受限时保持输入区域可用"
				input-class="custom-field"
				placeholder-class="custom-placeholder"
				icon-class="custom-icon"
			/>

			<text class="section-title custom-title-gap">自定义图标颜色（自定义样式）</text>
			<uni-easyinput
				v-model="data.iconColorValue"
				clearable
				placeholder="示例：紫色清空图标"
				icon-class="custom-icon-purple"
			/>
		</view>
	</view>
</template>

<script setup lang="ts">
type Data = {
	basicValue : string,
	externalValue : string | number | null,
	modifierValue : string,
	passwordValue : string,
	passwordVisible : boolean,
	textareaValue : string,
	borderlessValue : string,
	slotValue : string,
	customValue : string,
	iconColorValue : string,
	clearCount : number,
	eyesCount : number,
	changeCount : number,
	confirmCount : number,
	blurCount : number,
	lastChangeValue : string,
	lastConfirmValue : string
}

const data = reactive<Data>({
	basicValue: '初始内容',
	externalValue: '初始值',
	modifierValue: '',
	passwordValue: '123456',
	passwordVisible: false,
	textareaValue: '',
	borderlessValue: '',
	slotValue: '',
	customValue: '窄布局内容',
	iconColorValue: '',
	clearCount: 0,
	eyesCount: 0,
	changeCount: 0,
	confirmCount: 0,
	blurCount: 0,
	lastChangeValue: '',
	lastConfirmValue: ''
})

function setExternalValue(value : string | number | null) {
	data.externalValue = value
}

function onClear() {
	data.clearCount += 1
}

function onEyes(visible : boolean) {
	data.passwordVisible = visible
	data.eyesCount += 1
}

function onChange(value : string) {
	data.lastChangeValue = value
	data.changeCount += 1
}

function onConfirm(value : string) {
	data.lastConfirmValue = value
	data.confirmCount += 1
}

function handleBlur(_event : UniInputBlurEvent) {
	data.blurCount += 1
}

defineExpose({
	data,
	setExternalValue
})
</script>

<style>
page {
	--list-background-color: #ffffff;
	--background-color: #f5f5f5;
	--active-color: #a0a0a0;
	--active-background-color: #f8f8f8;
	--text-color: #333333;
	--arrow-color: #999999;
	--content-background-color: #ffffff;
	--secondary-text-color: #657180;
	--input-border-color: #dcdfe6;
	background-color: var(--background-color);
}

.intro {
	padding: 18px 16px;
	background-color: var(--content-background-color, #ffffff);
}

.page-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--text-color, #222222);
}

.page-desc {
	margin-top: 8px;
	font-size: 14px;
	line-height: 21px;
	color: var(--secondary-text-color, #657180);
}

.section {
	padding: 16px;
	margin-top: 10px;
	background-color: var(--content-background-color, #ffffff);
}

.section-last {
	padding-bottom: 32px;
}

.section-title {
	margin-bottom: 12px;
	font-size: 16px;
	font-weight: bold;
	color: var(--text-color, #333333);
}

.result-text {
	margin-top: 8px;
	font-size: 13px;
	color: var(--secondary-text-color, #657180);
}

.button-row {
	margin-bottom: 10px;
	flex-direction: row;
	flex-wrap: wrap;
}

.small-button {
	margin: 0 8px 6px 0;
	color: var(--text-color, #333333);
	background-color: var(--active-background-color, #f8f8f8);
}

.state-input {
	margin-bottom: 10px;
}

.state-borderless {
	border-width: 0;
}

.slot-prefix,
.slot-suffix {
	padding: 0 8px;
	font-size: 13px;
	color: var(--secondary-text-color, #657180);
}

.slot-prefix {
	border-right-width: 1px;
	border-right-style: solid;
	border-right-color: var(--input-border-color, #dcdfe6);
}

.slot-suffix {
	border-left-width: 1px;
	border-left-style: solid;
	border-left-color: var(--input-border-color, #dcdfe6);
}

.demo-textarea {
	min-height: 96px;
}

.custom-root {
	width: 260px;
	border-color: #0f766e;
	border-radius: 0;
	background-color: #f0fdfa;
}

.custom-field {
	color: #115e59;
	font-size: 15px;
}

.custom-placeholder {
	color: #5f8f89;
}

.custom-icon {
	color: #0f766e;
}

/* 自定义图标颜色示例：通过 icon-class 覆盖默认灰色图标 */
.custom-title-gap {
	margin-top: 16px;
}

.custom-icon-purple {
	color: #7c3aed;
}

@media (prefers-color-scheme: dark) {
	page {
		--list-background-color: #2d2d2d;
		--background-color: #1a1a1a;
		--active-color: rgba(255, 255, 255, 0.35);
		--active-background-color: #3b3b3b;
		--text-color: #ffffff;
		--arrow-color: #a0a0a0;
		--content-background-color: #2d2d2d;
		--secondary-text-color: rgba(255, 255, 255, 0.65);
		--input-border-color: rgba(255, 255, 255, 0.18);
	}
}
</style>

```

:::

