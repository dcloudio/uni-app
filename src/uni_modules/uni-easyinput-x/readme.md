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
