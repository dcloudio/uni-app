---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-easyinput-x
---

::: sourceCode
## uni-easyinput

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-easyinput


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-easyinput-x/components/uni-easyinput

:::

包装原生 input 和 textarea，提供清空、密码显隐、左右插槽和内部样式定制

> 本 Component 是 uni ext component，需下载插件：[uni-easyinput](https://ext.dcloud.net.cn/plugin?name=uni-easyinput-x)


# uni-easyinput 增强输入框

适用于 uni-app x 的增强输入框。组件包装原生 `input` 和 `textarea`，补充边框、清空、密码显隐和左右插槽等常用输入场景。

- 通过 `type` 指定输入类型，`textarea` 渲染多行输入框、`password` 渲染密码输入框，其余透传给原生单行输入。
- 所有布尔属性默认值均为 `false`。

## 基本用法

```html
<uni-easyinput v-model="value" clearable placeholder="请输入内容" />
```

## 单行与多行

```html
<!-- 单行密码 -->
<uni-easyinput v-model="password" type="password" password-icon placeholder="请输入密码" />

<!-- 多行文本，自动增高 -->
<uni-easyinput v-model="description" type="textarea" auto-height placeholder="请输入介绍" />
```

`type="textarea"` 时渲染 `textarea`，并使用 `auto-height` 控制自动增高。

组件不会裁剪输入内容。需要移除首尾空白时使用 Vue 的 `v-model.trim` 修饰符：

```html
<uni-easyinput v-model.trim="value" />
```

## 图标和插槽

清空图标由 `clearable` 控制，密码显隐图标由 `type="password"` + `password-icon` 控制，两者可同时显示。图标样式通过 `icon-class` 设置：

```html
<uni-easyinput
	v-model="keyword"
	clearable
	icon-class="my-icon"
	@clear="onClear"
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

## 自定义样式

根节点样式直接通过组件的 `class` 或 `style` 设置；内部节点通过 external classes 设置：

```html
<uni-easyinput
	class="custom-easyinput"
	v-model="value"
	input-class="custom-input"
	placeholder-class="custom-placeholder"
	icon-class="custom-icon"
/>
```

```css
.custom-easyinput {
	border-radius: 0;
	border-color: #0052cc;
}

.custom-input {
	color: #0052cc;
	font-size: 16px;
}

.custom-placeholder {
	color: #8c939d;
}

.custom-icon {
	color: #0052cc;
}
```

VDOM 模式需要在 `manifest.json` 中启用样式隔离策略 2.0。定义在全局 `App.uvue` 中的 external class 覆盖组件默认样式时，部分属性可能需要使用 `!important`。

组件默认不设置 placeholder 的颜色和字号，保留原生 `input` / `textarea` 的表现；需要定制时使用 `placeholder-class`。

## 配合 uni-forms 使用

输入校验和错误信息由 `uni-forms-item` 负责，`uni-easyinput` 不提供错误态属性。表单项的 `name` 需要与绑定数据及校验规则的字段名一致：

```vue
<uni-forms v-model="formData" :rules="rules">
	<uni-forms-item name="account" label="账号" required>
		<uni-easyinput
			v-model="formData.account"
			clearable
			placeholder="请输入账号"
		/>
	</uni-forms-item>
</uni-forms>
```

## 值同步与交互

推荐使用 `v-model` 双向绑定输入内容。`value` 只用于不使用 `v-model` 的兼容场景；同时传入两者时，以 `modelValue` 为准，包括 `modelValue` 为 `null` 的情况。数字和 `null` 会分别显示为对应字符串和空字符串，组件更新时始终回传字符串。

`input` 在输入内容更新时触发。`change` 在失焦或点击键盘完成按钮时触发，同一次聚焦期间相同值只触发一次。点击清空图标会同步更新绑定值并触发 `input` 和 `clear`，随后失焦不会再为同一个空值重复触发 `change`。

禁用状态下不能输入，也不会执行清空和密码显隐操作。密码内容清空、组件禁用、切换到非密码类型或关闭 `password-icon` 时，组件会恢复密码隐藏状态；如果此前为显示状态，同时触发 `eyes(false)`。

## 程序控制焦点

需要从业务逻辑中控制焦点时，通过组件引用调用公开方法：

```vue
<template>
	<uni-easyinput ref="easyinputRef" v-model="value" />
	<button @click="focusInput">聚焦输入框</button>
	<button @click="blurInput">取消聚焦</button>
</template>

<script setup lang="uts">
const easyinputRef = ref<any>(null)

function focusInput() {
	easyinputRef.value?.focusInput()
}

function blurInput() {
	easyinputRef.value?.blurInput()
}
</script>
```

组件禁用时，调用 `focusInput()` 不生效。

## 在二次封装中复用属性类型

组件的 Props 类型已导出，可直接与自定义属性做类型合并，便于二次封装时保留代码提示：

```ts
import { UniEasyinputProps } from '@/uni_modules/uni-easyinput-x/components/uni-easyinput/types.uts'

export type MyInputProps = UniEasyinputProps & {
	label? : string
}
```

## 更新说明（不兼容调整）

- `clearable`、`password-icon` 默认值由 `true` 调整为 `false`。
- 移除 `input-border` 属性，默认始终显示边框，使用组件 `class` 覆盖即可。
- 移除 `prefix-icon`、`suffix-icon`、`prefix-icon-class`、`suffix-icon-class` 及 `iconClick` 事件；清空和密码显隐图标统一用 `icon-class` 设置样式。
- `action-icon-class` 重命名为 `icon-class`。
- 移除 `trim` 属性，输入内容处理改用 Vue 修饰符。
- 移除 `error-message` 和 `error-class`，输入校验和错误反馈改由 `uni-forms-item` 负责。



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android: 5.07; iOS: 5.07; HarmonyOS: 5.07


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| modelValue | string \| number \| null | "" | 输入内容，支持 v-model；同时传入 value 时优先使用 modelValue |
| value | string \| number \| null | "" | 不使用 v-model 时传入的输入内容；同时传入 modelValue 时不生效，内容更新时不触发 update:value |
| name | string | "" | 原生表单控件名称，透传给 input / textarea |
| type | string | "text" | 输入类型。textarea 渲染多行输入框，password 渲染密码输入框，其余透传给原生单行输入 |
| placeholder | string | "" | 占位文字 |
| disabled | boolean | false | 是否禁用 |
| maxlength | number | -1 | 最大输入长度，透传给 input / textarea |
| focus | boolean | false | 是否聚焦 |
| confirmType | string | "done" | 键盘右下角按钮类型；单行输入默认 done，多行输入在未设置或设置为 done 时使用 return |
| cursorSpacing | number | 0 | 光标与键盘的距离，单位 px，透传给 input / textarea |
| adjustPosition | boolean | false | 键盘弹起时是否自动上推页面，透传给 input / textarea |
| autoHeight | boolean | false | 是否自动增高，仅当 type 为 textarea 时生效 |
| clearable | boolean | false | 是否显示清空图标，仅对单行 input 生效 |
| passwordIcon | boolean | false | type 为 password 时是否显示密码显隐图标 |
| inputClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | input / textarea 的自定义样式类 |
| placeholderClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 占位文字的自定义样式类 |
| iconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 清空和密码显隐图标的自定义样式类 |
| @input | Function |   | 输入时触发，参数为当前字符串值 |
| @focus | Function |   | 聚焦时触发，参数为原生 input 或 textarea 聚焦事件 |
| @blur | Function |   | 失焦时触发，参数为原生 input 或 textarea 失焦事件 |
| @confirm | Function |   | 点击键盘完成按钮时触发，参数为当前字符串值 |
| @change | Function |   | 失焦或点击键盘完成按钮时触发，同一次聚焦期间相同值只触发一次，参数为当前字符串值 |
| @clear | Function |   | 点击清空图标时触发 |
| @eyes | Function |   | 密码可见状态变化时触发；点击图标或可见密码因状态变化恢复隐藏时都会触发 |
| @keyboardheightchange | Function |   | 键盘高度变化时触发 |
| @update:modelValue | Event |   | 输入内容更新时触发，用于 v-model，参数为当前字符串值 |

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

