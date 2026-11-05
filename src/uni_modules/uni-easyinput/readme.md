# uni-easyinput 增强输入框

适用于 uni-app x 的增强输入框。在原生 `input` 和 `textarea` 基础上提供清空、密码显隐、错误态、空白裁剪和左右插槽。

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

## 错误态

`error-message` 为 `true` 或非空字符串时进入错误态（不渲染错误文案节点）。通过 `error-class` 自定义错误边框和占位文字颜色：

```html
<uni-easyinput
	v-model="value"
	error-message="输入内容有误"
	error-class="my-error"
	placeholder="错误状态"
/>
```

```css
.my-error {
	border-color: #f56c6c;
	color: #f56c6c;
}
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

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | String / Number | - | 输入内容，支持 `v-model` |
| value | String / Number | - | 不使用 `v-model` 时传入的内容 |
| name | String | `''` | 原生表单控件名称 |
| type | String | `text` | 输入类型；`textarea`、`password` 为组件扩展类型 |
| placeholder | String | `''` | 占位文字 |
| disabled | Boolean | `false` | 是否禁用 |
| maxlength | Number | `-1` | 最大输入长度，`-1` 表示不限制 |
| focus | Boolean | `false` | 是否聚焦 |
| confirmType | String | `''` | 键盘右下角按钮类型 |
| cursorSpacing | Number | `0` | 光标与键盘的距离 |
| adjustPosition | Boolean | `false` | 键盘弹起时是否自动上推页面 |
| autoHeight | Boolean | `false` | `type="textarea"` 时是否自动增高 |
| clearable | Boolean | `false` | 是否显示清空图标 |
| passwordIcon | Boolean | `false` | `type="password"` 时是否显示显隐图标 |
| trim | Boolean / String | `false` | `both`、`left`、`right`、`all`；`true` 等价于 `both` |
| errorMessage | String / Boolean | `false` | 是否进入错误态，不渲染错误信息节点 |
| inputClass | String | `''` | input / textarea 的样式类 |
| placeholderClass | String | `''` | 占位文字的样式类 |
| iconClass | String | `''` | 清空和密码显隐图标的样式类 |
| errorClass | String | `''` | 错误态边框和占位文字颜色的样式类 |

## External Classes

| 属性名 | 说明 |
| --- | --- |
| input-class | input 和 textarea 样式 |
| placeholder-class | 占位文字样式 |
| icon-class | 清空和密码显隐图标样式 |
| error-class | 错误态边框和占位文字颜色 |

## Events

| 事件名 | 回调参数 | 说明 |
| --- | --- | --- |
| update:modelValue | `value: string` | 输入内容更新 |
| input | `value: string` | 输入时触发 |
| focus | 原生 focus 事件 | 聚焦时触发 |
| blur | 原生 blur 事件 | 失焦时触发 |
| confirm | `value: string` | 点击键盘完成按钮时触发 |
| change | `value: string` | 失焦或点击完成按钮且内容变化时触发 |
| clear | - | 点击清空图标时触发 |
| eyes | `visible: boolean` | 切换密码显隐时触发 |
| keyboardheightchange | 原生键盘高度事件 | 键盘高度变化时触发 |

同时传入 `modelValue` 和 `value` 时，以 `modelValue` 为准（包括 `modelValue` 为 `null`）。禁用状态下不会触发清空、密码显隐操作。密码内容清空、组件禁用、切换到非密码类型或关闭 `password-icon` 时，会恢复隐藏状态；如果此前为显示状态，同时触发 `eyes(false)`。

## Slots

| 名称 | 说明 |
| --- | --- |
| left | 输入区域左侧内容 |
| right | 输入区域右侧内容 |

## Expose

| 方法名 | 说明 |
| --- | --- |
| focusInput() | 使内部输入框聚焦 |
| blurInput() | 使内部输入框失焦 |

## 在二次封装中复用属性类型

组件的 Props 类型已导出，可直接与自定义属性做类型合并，便于二次封装时保留代码提示：

```ts
import { UniEasyinputProps } from '@/uni_modules/uni-easyinput/components/uni-easyinput/types.uts'

export type MyInputProps = UniEasyinputProps & {
	label? : string
}
```

## 更新说明（不兼容调整）

- `clearable`、`password-icon` 默认值由 `true` 调整为 `false`。
- 移除 `input-border` 属性，默认始终显示边框，使用组件 `class` 覆盖即可。
- 移除 `prefix-icon`、`suffix-icon`、`prefix-icon-class`、`suffix-icon-class` 及 `iconClick` 事件；清空和密码显隐图标统一用 `icon-class` 设置样式。
- `action-icon-class` 重命名为 `icon-class`。
