---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-forms-x
---

::: sourceCode
## uni-forms

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-forms


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-forms-x/components/uni-forms

:::

通过 v-model 收集字段值，提供字段注册、DB Schema 兼容校验、Standard Schema 可选校验和重置能力

> 本 Component 是 uni ext component，需下载插件：[uni-forms](https://ext.dcloud.net.cn/plugin?name=uni-forms-x)


# uni-forms 表单

uni-forms组件，是 uni-app x 的增强表单组件。相比内置的 form 组件，它解决了如下问题：

1. uni-forms内置了表单校验功能。
2. uni-forms使用vue的`v-model`机制，方便收集、校验，也方便接入任意三方组件。
 内置 form 组件使用的是平台form规范，很多小程序平台不提供三方组件接入到内置form表单中管理的功能，如果你开发了自定义的表单组件，只能通过 uni-forms 来跨平台接入表单中。

本插件包含2个组件：

- `uni-forms`：表单容器，负责数据和整表校验
- `uni-forms-item`：表单项的包裹容器。通过 `label` 设置标签文字，通过默认插槽放置表单控件（如 `input`、`uni-data-checkbox`），并显示校验错误状态。

## 基本用法

```vue
<template>
 <uni-forms ref="formRef" v-model="formData" :rules="rules">
  <uni-forms-item name="name" label="姓名" required>
   <input v-model="formData.name" placeholder="请输入姓名" />
  </uni-forms-item>
  <uni-forms-item name="email" label="邮箱" required>
   <input v-model="formData.email" placeholder="请输入邮箱" />
  </uni-forms-item>
  <button @click="submit">提交</button>
 </uni-forms>
</template>

<script setup lang="ts">
 const formRef = ref<any>(null)
 const formData = ref({
  name: '',
  email: ''
 })
 const rules = {
  name: {
   label: '姓名',
   rules: [
    { required: true, errorMessage: '请输入姓名' },
    { minLength: 2, maxLength: 20, errorMessage: '{label}长度为 {minLength} 到 {maxLength} 个字符' }
   ]
  },
  email: {
   label: '邮箱',
   rules: [
    { required: true, errorMessage: '请输入邮箱' },
    { format: 'email', errorMessage: '邮箱格式不正确' }
   ]
  }
 }

 function submit() {
  formRef.value.validate().then((data : object) => {
   console.log(data)
  }).catch((errors : any[]) => {
   console.log(errors[0].errorMessage)
  })
 }
</script>
```

`required` 只显示必填标记红色的`*`。字段是否必填由 `rules` 决定。

## 表单数据

`v-model` 绑定表单数据。`uni-forms-item` 的 `name` 对应数据中的字段，并与 `rules` 的键一致。

| 写法 | 对应字段 |
| --- | --- |
| `name="name"` | `formData.name` |
| `name="profile.nickname"` | `formData.profile.nickname` |
| `name="users[0].name"` | `formData.users[0].name`，也可写成 `users.0.name` |
| `:name="['users', 0, 'name']"` | 同上 |

## 标签

`label-position` 默认 `left`，即单行横排布局：标签在左，表单控件在右。设为 `top` 时为上下竖排布局：标签在上，表单控件在下。该属性可以写在 `uni-forms` 上，也可以写在 `uni-forms-item` 上覆盖表单设置。

`description` 显示在标签下方，是 `uni-forms-item` 的可选附加描述。

`show-arrow` 为 `true` 时，`uni-forms-item` 在单行横排布局的行尾显示向右箭头。

`label-position`、`label-width`、`label-align` 和 `border` 可以写在 `uni-forms` 上；`uni-forms-item` 可以用同名属性覆盖标签相关设置。`description` 和 `show-arrow` 只属于 `uni-forms-item`。

```vue
<uni-forms v-model="formData" label-width="80" border>
 <uni-forms-item name="name" label="姓名" required>
  <input v-model="formData.name" placeholder="请输入姓名" />
 </uni-forms-item>
 <uni-forms-item name="company" label="公司名称" label-width="120" description="选填">
  <input v-model="formData.company" placeholder="请输入公司名称" />
 </uni-forms-item>
 <uni-forms-item name="city" label="城市" show-arrow>
  <text>北京</text>
 </uni-forms-item>
</uni-forms>
```

标签也可以用插槽替换。使用 `label` 插槽后，不再渲染 `label` 和必填标记。

```vue
<uni-forms-item name="name" required>
 <template #label>
  <text>联系人</text>
 </template>
 <input v-model="formData.name" />
</uni-forms-item>
```

## 表单校验

`rules` 的键与 `uni-forms-item` 的 `name` 一致。每个字段一组规则，数组中的每一项只配置一种校验。

规则写在 `uni-forms` 上时作用于整张表。写在 `uni-forms-item` 上时，覆盖表单中同名字段的规则列表，表单规则组里的 `label` 仍然保留。`setRules` 在运行时按字段合并，同名字段以新规则为准；传入 `null` 恢复为属性上的 `rules`。表单项的 `setRules` 只替换当前项，传入 `null` 恢复为该项属性上的 `rules`。

也可通过 `schema` 接入校验库，见「Schema」。

### 校验规则

```ts
const rules = {
 name: {
  label: '姓名',
  validateTrigger: 'blur',
  rules: [
   { required: true, errorMessage: '请输入{label}' },
   { minLength: 2, maxLength: 20, errorMessage: '{label}长度为 {minLength} 到 {maxLength} 个字符' }
  ]
 }
}
```

`errorMessage` 支持使用规则对象中的占位符。校验失败时，`{label}` 会替换为字段标签（没有标签时使用字段路径），`{minLength}`、`{maxLength}`、`{minimum}`、`{maximum}` 会替换为当前规则配置的对应值。

规则也可以写在表单项上，此时覆盖表单 `rules` 中的同名字段：

```vue
<uni-forms-item
 name="age"
 label="年龄"
 :rules="[{ required: true, errorMessage: '请输入年龄' }, { format: 'int', errorMessage: '请输入整数' }]"
>
 <input v-model="formData.age" />
</uni-forms-item>
```

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| required | Boolean | 必填。空字符串、`null`、空数组视为空 |
| format | String | 格式，见下表 |
| arrayType | String | 数组元素的格式，取值同 `format` |
| range | Array | 值必须是其中一项 |
| pattern | String / RegExp | 正则。小程序中使用字符串 |
| minimum / maximum | Number | 数值范围 |
| exclusiveMinimum / exclusiveMaximum | Boolean | 是否不包含边界值 |
| minLength / maxLength | Number | 长度范围 |
| errorMessage | String | 失败提示 |
| validateTrigger / trigger | String | 该条规则的校验时机 |
| validateFunction | Function | 自定义校验 |
| validateExpr | Function | 返回 `false` 时失败，提示使用 `errorMessage` |

| format | 说明 |
| --- | --- |
| string / password | 字符串，`password` 为字符串类型的兼容别名 |
| number / double / long | 数字，`double` 和 `long` 为数字类型的兼容别名 |
| integer / int | 整数，`int` 为整数类型的兼容别名 |
| float | 浮点数 |
| boolean / bool | 布尔值，`bool` 为布尔类型的兼容别名 |
| array / object | 数组、对象 |
| date / timestamp | 日期对象、时间戳 |
| file | 文件对象 |
| email / url / idcard | 邮箱、网址、身份证号 |
| url-https / url-scheme / url-web | URL 兼容格式 |

### 自定义校验

`validateFunction` 的参数依次为规则、当前值、表单数据、回调。通过时返回 `true` 或调用 `callback()`；失败时返回错误文字、返回 `false`，或调用 `callback('错误原因')`。支持异步函数。

```ts
const rules = {
 confirmPassword: {
  label: '确认密码',
  rules: [{
   validateFunction: (rule : any, value : any, data : any, callback : any) => {
    if (value != data.password) {
     callback('两次密码不一致')
     return false
    }
    return true
   }
  }]
 }
}
```

带函数的规则在微信小程序中需在页面就绪后通过 `setRules` 设置。

### 校验时机

`validate-trigger` 设置校验时机，默认 `submit`。

| 值 | 时机 |
| --- | --- |
| submit | 调用 `validate`、`validateField` 时 |
| bind | 表单数据变化时 |
| blur | 失焦时 |

可写在表单、表单项或单条规则上。优先级为：单条规则 > 表单项 > 表单。

`bind` 随 `v-model` 的数据变化触发。`blur` 需要控件在失焦时调用表单项的 `onFieldBlur`。使用 `input` 时，在 `@blur` 中调用，见「自定义组件」。

### 校验方法

```js
formRef.value.validate()
formRef.value.validateField('email')
formRef.value.validateField(['name', 'email'])
formRef.value.clearValidate()
formRef.value.resetFields()
```

`validate` 返回 Promise。通过时得到表单项数据，未通过时得到错误数组，每项包含 `key`、`path` 和 `errorMessage`。传入回调时不再返回 Promise，回调参数为 `(errors, data)`，通过时 `errors` 为 `null`。

未放在表单项中、但需要随结果返回的字段，传给 `validate` 的第一个参数：

```js
formRef.value.validate(['id'])
```

`resetFields` 恢复为表单创建时的值，并清除错误。

### 错误提示

`err-show-type` 设置校验失败后的提示方式。

| 值 | 说明 |
| --- | --- |
| toast | 默认。弹出第一条错误，并为失败项显示错误边框。控件下方不显示错误文字 |
| modal | 弹窗显示第一条错误。不显示错误边框，控件下方不显示错误文字 |
| undertext | 在控件下方显示错误文字。不弹出提示，不显示错误边框 |

多项失败时，`toast` 和 `modal` 只提示第一条。`toast` 会给所有失败项显示错误边框。

`error-message` 可指定该项显示的错误文字。传入 `false` 时不显示错误文字。

`toast` 下的错误边框通过 `error-class` 调整，见「自定义样式」。

## Schema

`schema` 为实验性属性，后续可能改名，用法也会继续完善。除 `rules` 外，可通过它接入 Valibot、Zod 等校验库。字段名与 `uni-forms-item` 的 `name` 一致。

```vue
<script setup lang="ts">
 import * as v from 'valibot'

 const formData = ref({ name: '' })
 const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, '至少两个字'))
 })
</script>

<template>
 <uni-forms v-model="formData" :schema="schema">
  <uni-forms-item name="name" label="姓名" required>
   <input v-model="formData.name" />
  </uni-forms-item>
 </uni-forms>
</template>
```

`rules` 与 `schema` 可同时使用。整表 `validate` 先执行 `rules`，再执行 `schema`。校验成功且 schema 返回转换后的数据时，表单会更新为该结果。

## 自定义组件

支持 `v-model` 的控件放入 `uni-forms-item` 即可参与校验。需要在值变化或失焦时触发校验，可在组件内调用表单项方法：

```ts
const formItem = inject<any>('uniFormItem', null)

function onInput(value : string) {
 formItem?.onFieldChange(value)
}

function onBlur(value : string) {
 formItem?.onFieldBlur(value)
}
```

## 自定义样式

`uni-forms`、`uni-forms-item` 的 `class` 和 `style` 作用在组件根节点上。`uni-forms-item` 还提供 external class，用于调整标签、说明、必填标记、控件区域和错误状态的样式。

```vue
<uni-forms class="form-card" v-model="formData">
 <uni-forms-item name="name" label="姓名" label-class="name-label" error-class="name-error">
  <input v-model="formData.name" />
 </uni-forms-item>
</uni-forms>
```

```css
.form-card {
 padding: 12px;
 background-color: #ffffff;
}

.name-label {
 font-weight: bold;
}

.name-error {
 border-radius: 8px;
}
```



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android: 5.07; iOS: 5.07; HarmonyOS: 5.07


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| value | object \| null | null | \[已废弃] 旧版表单数据属性，推荐使用 modelValue |
| modelValue | object \| null | null | 表单数据，支持 v-model 双向绑定 |
| model | object \| null | null | \[已废弃] 旧版表单数据属性，优先级高于 modelValue |
| rules | object | "() : UniFormRules => ({})" | DB Schema 风格校验规则，键为字段路径 |
| schema | any | null | Standard Schema 兼容对象，例如由 Valibot、Zod 等校验库创建 |
| errShowType | string | "toast" | 校验错误提示方式 |
| validateTrigger | UniFormTrigger | "'submit' as UniFormTrigger" | 默认校验触发时机 |
| labelPosition | string | "left" | 标签位置 |
| labelWidth | string \| number | "" | 单行横排布局的标签宽度，数字按 px 处理 |
| labelAlign | string | "left" | 标签文字对齐方式 |
| border | boolean | false | 是否显示字段分隔线 |
| @validate | Function |   | 校验结果变化时触发；通过时参数为 null，未通过时为错误对象或错误数组 |
| @submit | Function |   | \[已废弃] 调用 submit 方法时触发，推荐使用 validate 方法 |
| @update:modelValue | Event |   | 表单数据更新时触发，参数为更新后的表单数据 |

#### errShowType 的属性描述

| 合法值 | 描述 |
| :- | :- |
| undertext | 在表单项下方显示错误文字 |
| toast | 弹出第一条错误，并为失败项显示错误边框 |
| modal | 弹窗显示第一条错误 |

#### validateTrigger 的属性描述

| 合法值 | 描述 |
| :- | :- |
| bind | 表单数据变化时触发 |
| blur | 表单项失焦时触发 |
| submit | 调用 validate 或 validateField 时触发 |

#### labelPosition 的属性描述

| 合法值 | 描述 |
| :- | :- |
| left | 标签与控件单行横排 |
| top | 标签在控件上方，竖排显示 |

#### labelAlign 的属性描述

| 合法值 | 描述 |
| :- | :- |
| left | 左对齐 |
| center | 居中对齐 |
| right | 右对齐 |

<!-- UTSCOMJSON.uni-forms.fileFormates -->



<!-- UTSCOMJSON.uni-forms.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/forms/forms.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/forms/forms.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/forms/forms

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/forms/forms

>示例
```vue
<template>
	<scroll-view class="flex-1 bg-page-f5f5f5 page" :class="{ 'page-dark': isDarkMode }">
		<view class="u-p-16 bg-content-background-fff intro">
			<text class="fw-bold color-text-222 fs-18 page-title">uni-forms 表单</text>
			<text class="fs-13 lh-21 color-secondary-text-657180 page-desc">通过 v-model 统一收集字段值，并支持字段校验、错误展示和表单重置。</text>
		</view>

		<view class="u-p-16 bg-content-background-fff mt-10 section demo-index">
			<text class="fw-bold color-text-222 mb-12 fs-16 section-title">多功能演示</text>
			<text class="fs-13 lh-21 color-secondary-text-657180 section-desc">uni-forms 的所有表单用法从这里进入，按场景查看基础接入、校验方案、控件接入和样式配置。</text>
			<view class="flex-dir-row flex-wrap-wrap demo-links">
				<navigator class="demo-link" url="/pages/uni-ui/forms/validation">
					<text class="demo-link-title">完整校验</text>
					<text class="demo-link-desc">DB Schema 规则、异步校验和字段方法</text>
				</navigator>
				<navigator class="demo-link" url="/pages/uni-ui/forms/valibot">
					<text class="demo-link-title">Valibot schema</text>
					<text class="demo-link-desc">Standard Schema、异步、嵌套和原生 API</text>
				</navigator>
				<navigator class="demo-link" url="/pages/uni-ui/forms/controls">
					<text class="demo-link-title">控件接入</text>
					<text class="demo-link-desc">原生控件、uni-x 控件和三方组件</text>
				</navigator>
				<navigator class="demo-link" url="/pages/uni-ui/forms/styles">
					<text class="demo-link-title">样式与属性</text>
					<text class="demo-link-desc">布局属性和 externalClasses 样式覆盖</text>
				</navigator>
				<navigator class="demo-link" url="/pages/uni-ui/forms/form-item">
					<text class="demo-link-title">表单项布局</text>
					<text class="demo-link-desc">左标签字号、宽度、对齐、箭头和说明</text>
				</navigator>
			</view>
		</view>

		<view class="u-p-16 bg-content-background-fff mt-10 section">
			<uni-forms
				ref="formRef"
				v-model="formData"
				:rules="rules"
				validate-trigger="blur"
				err-show-type="undertext"
				label-position="top"
				label-width="80"
				@validate="onValidate"
			>
				<uni-forms-item name="name" label="姓名" required label-class="demo-label" error-message-class="demo-error">
					<uni-easyinput
						v-model="formData.name"
						placeholder="请输入姓名"
						clearable
					/>
				</uni-forms-item>

				<!-- #ifndef (APP-IOS || APP-HARMONY) && !VUE3-VAPOR -->
				<uni-forms-item name="city" label="城市" label-class="demo-label" error-message-class="demo-error">
					<uni-combobox
						v-model="formData.city"
						:options="cityOptions"
						placeholder="请选择城市"
					/>
				</uni-forms-item>
				<!-- #endif -->

				<uni-forms-item name="email" label="邮箱" label-class="demo-label" error-message-class="demo-error">
					<uni-easyinput
						v-model="formData.email"
						type="text"
						placeholder="请输入邮箱"
					/>
				</uni-forms-item>

				<uni-forms-item name="profile.nickname" label="嵌套字段" label-class="demo-label" error-message-class="demo-error">
					<uni-easyinput
						v-model="formData.profile.nickname"
						placeholder="请输入昵称"
					/>
				</uni-forms-item>
			</uni-forms>

			<view class="flex-dir-row button-row">
				<button class="mr-10 color-fff bg-007aff action-button" size="mini" @click="validateForm">校验表单</button>
				<button class="mr-10 color-fff bg-007aff color-text-333 bg-active-e9eef5 action-button secondary-button" size="mini" @click="resetForm">重置字段</button>
			</view>
			<text class="mt-8 fs-14 color-007aff status-text">{{ statusText }}</text>
		</view>

		<view class="u-p-16 bg-content-background-fff mt-10 pb-32 section section-last">
			<text class="fw-bold color-text-222 mb-12 fs-16 section-title">当前数据</text>
			<text class="data-text">{{ dataText }}</text>
			<view class="property-list">
				<text class="property-title">本页使用的关键属性</text>
				<text class="property-text">v-model：formData</text>
				<text class="property-text">validate-trigger：blur</text>
				<text class="property-text">label-position：left</text>
				<text class="property-text">label-class / error-message-class：自定义字段样式</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { state } from '@/store/index.ts'

const isDarkMode = computed((): boolean => state.isDarkMode)

/** 暗黑模式下同步导航栏颜色，与图标示例页保持一致 */
function syncNavigationBar(): void {
	// #ifdef APP
	const dark = isDarkMode.value
	uni.setNavigationBarColor({
		frontColor: dark ? '#ffffff' : '#000000',
		backgroundColor: dark ? '#1a1a1a' : '#efeff4'
	})
	// #endif
}

watch(isDarkMode, syncNavigationBar, { immediate: true })
onShow(syncNavigationBar)

type FormData = {
	name : string,
	city : string,
	email : string,
	profile : {
		nickname : string
	}
}

type FormRule = {
	label : string,
	rules : Array<{
		required? : boolean,
		format? : string,
		pattern? : string,
		errorMessage : string,
		trigger? : 'bind' | 'blur' | 'submit'
	}>
}

const formRef = ref<any>(null)
const formData = ref<FormData>({
	name: '',
	city: '',
	email: '',
	profile: {
		nickname: ''
	}
})

const cityOptions : string[] = ['北京', '上海', '广州', '深圳', '杭州', '成都']

const rules = {
	name: {
		label: '姓名',
		rules: [{ required: true, errorMessage: '请输入姓名', trigger: 'blur' }]
	},
	city: {
		label: '城市',
		rules: [{ required: true, errorMessage: '请选择城市', trigger: 'submit' }]
	},
	email: {
		label: '邮箱',
		rules: [
			{ required: true, errorMessage: '请输入邮箱地址', trigger: 'blur' },
			{ format: 'email', errorMessage: '请输入正确的邮箱地址', trigger: 'blur' }
		]
	},
	'profile.nickname': {
		label: '嵌套字段',
		rules: [{ required: true, errorMessage: '请输入昵称', trigger: 'blur' }]
	}
}

const statusText = ref<string>('等待校验')
const dataText = computed<string>(() : string => JSON.stringify(formData.value))

async function validateForm() {
	try {
		await formRef.value.validate()
		statusText.value = '校验通过'
	} catch (errors) {
		const list = errors as any[]
		statusText.value = list != null && list.length > 0 ? list[0].errorMessage : '校验未通过'
	}
}

function resetForm() {
	formRef.value.resetFields()
	statusText.value = '已重置为初始值'
}

/**
 * 填入一组可以通过当前示例规则的值，供 HBuilderX 自动化测试调用。
 */
function setDemoValues(): void {
	formData.value.name = '张三'
	formData.value.city = '北京'
	formData.value.email = 'name@example.com'
	formData.value.profile.nickname = '小张'
}

function onValidate(result : any) {
	if (result == null) {
		return
	}
	const list = Array.isArray(result) ? result : [result]
	if (list.length > 0 && list[0].errorMessage != null) {
		statusText.value = list[0].errorMessage
	}
}

defineExpose({
	formData,
	statusText,
	validateForm,
	resetForm,
	setDemoValues
})
</script>

<style>
.intro {
	padding: 18px 16px;
}

.page-title {
	font-size: 20px;
}

.page-desc {
	margin-top: 8px;
	font-size: 14px;
}

.demo-index {
	padding-bottom: 8px;
}

.section-desc {
	margin-bottom: 10px;
	line-height: 20px;
}

.demo-link {
	width: 48%;
	padding: 12px;
	margin: 0 2% 10px 0;
	border-radius: 6px;
	background-color: var(--active-background-color, #f3f7fc);
}

.demo-link-title {
	font-size: 15px;
	font-weight: bold;
	color: #007aff;
}

.demo-link-desc {
	margin-top: 5px;
	font-size: 12px;
	line-height: 18px;
	color: var(--secondary-text-color, #657180);
}

.section-title {
	color: var(--text-color, #333333);
}

.button-row {
	margin-top: 8px;
}

.status-text {
	margin-top: 12px;
	color: var(--secondary-text-color, #657180);
}

.data-text {
	font-size: 13px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

.property-list {
	padding-top: 16px;
	margin-top: 16px;
	border-top: 1px solid var(--divider-color, #e5e5e5);
}

.property-title {
	margin-bottom: 6px;
	font-size: 14px;
	font-weight: bold;
	color: var(--text-color, #333333);
}

.property-text {
	font-size: 12px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

.demo-label {
	font-weight: bold;
	color: #007aff;
}

.demo-error {
	font-weight: bold;
	color: #dd524d;
}
</style>

```

:::




::: sourceCode
## uni-forms-item

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-forms-item


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-forms-x/components/uni-forms-item

:::

提供字段路径、标签布局、错误展示和字段上下文，必须放在 uni-forms 内使用才能参与表单管理

> 本 Component 是 uni ext component，需下载插件：[uni-forms-item](https://ext.dcloud.net.cn/plugin?name=uni-forms-x)


# uni-forms 表单

uni-forms组件，是 uni-app x 的增强表单组件。相比内置的 form 组件，它解决了如下问题：

1. uni-forms内置了表单校验功能。
2. uni-forms使用vue的`v-model`机制，方便收集、校验，也方便接入任意三方组件。
 内置 form 组件使用的是平台form规范，很多小程序平台不提供三方组件接入到内置form表单中管理的功能，如果你开发了自定义的表单组件，只能通过 uni-forms 来跨平台接入表单中。

本插件包含2个组件：

- `uni-forms`：表单容器，负责数据和整表校验
- `uni-forms-item`：表单项的包裹容器。通过 `label` 设置标签文字，通过默认插槽放置表单控件（如 `input`、`uni-data-checkbox`），并显示校验错误状态。

## 基本用法

```vue
<template>
 <uni-forms ref="formRef" v-model="formData" :rules="rules">
  <uni-forms-item name="name" label="姓名" required>
   <input v-model="formData.name" placeholder="请输入姓名" />
  </uni-forms-item>
  <uni-forms-item name="email" label="邮箱" required>
   <input v-model="formData.email" placeholder="请输入邮箱" />
  </uni-forms-item>
  <button @click="submit">提交</button>
 </uni-forms>
</template>

<script setup lang="ts">
 const formRef = ref<any>(null)
 const formData = ref({
  name: '',
  email: ''
 })
 const rules = {
  name: {
   label: '姓名',
   rules: [
    { required: true, errorMessage: '请输入姓名' },
    { minLength: 2, maxLength: 20, errorMessage: '{label}长度为 {minLength} 到 {maxLength} 个字符' }
   ]
  },
  email: {
   label: '邮箱',
   rules: [
    { required: true, errorMessage: '请输入邮箱' },
    { format: 'email', errorMessage: '邮箱格式不正确' }
   ]
  }
 }

 function submit() {
  formRef.value.validate().then((data : object) => {
   console.log(data)
  }).catch((errors : any[]) => {
   console.log(errors[0].errorMessage)
  })
 }
</script>
```

`required` 只显示必填标记红色的`*`。字段是否必填由 `rules` 决定。

## 表单数据

`v-model` 绑定表单数据。`uni-forms-item` 的 `name` 对应数据中的字段，并与 `rules` 的键一致。

| 写法 | 对应字段 |
| --- | --- |
| `name="name"` | `formData.name` |
| `name="profile.nickname"` | `formData.profile.nickname` |
| `name="users[0].name"` | `formData.users[0].name`，也可写成 `users.0.name` |
| `:name="['users', 0, 'name']"` | 同上 |

## 标签

`label-position` 默认 `left`，即单行横排布局：标签在左，表单控件在右。设为 `top` 时为上下竖排布局：标签在上，表单控件在下。该属性可以写在 `uni-forms` 上，也可以写在 `uni-forms-item` 上覆盖表单设置。

`description` 显示在标签下方，是 `uni-forms-item` 的可选附加描述。

`show-arrow` 为 `true` 时，`uni-forms-item` 在单行横排布局的行尾显示向右箭头。

`label-position`、`label-width`、`label-align` 和 `border` 可以写在 `uni-forms` 上；`uni-forms-item` 可以用同名属性覆盖标签相关设置。`description` 和 `show-arrow` 只属于 `uni-forms-item`。

```vue
<uni-forms v-model="formData" label-width="80" border>
 <uni-forms-item name="name" label="姓名" required>
  <input v-model="formData.name" placeholder="请输入姓名" />
 </uni-forms-item>
 <uni-forms-item name="company" label="公司名称" label-width="120" description="选填">
  <input v-model="formData.company" placeholder="请输入公司名称" />
 </uni-forms-item>
 <uni-forms-item name="city" label="城市" show-arrow>
  <text>北京</text>
 </uni-forms-item>
</uni-forms>
```

标签也可以用插槽替换。使用 `label` 插槽后，不再渲染 `label` 和必填标记。

```vue
<uni-forms-item name="name" required>
 <template #label>
  <text>联系人</text>
 </template>
 <input v-model="formData.name" />
</uni-forms-item>
```

## 表单校验

`rules` 的键与 `uni-forms-item` 的 `name` 一致。每个字段一组规则，数组中的每一项只配置一种校验。

规则写在 `uni-forms` 上时作用于整张表。写在 `uni-forms-item` 上时，覆盖表单中同名字段的规则列表，表单规则组里的 `label` 仍然保留。`setRules` 在运行时按字段合并，同名字段以新规则为准；传入 `null` 恢复为属性上的 `rules`。表单项的 `setRules` 只替换当前项，传入 `null` 恢复为该项属性上的 `rules`。

也可通过 `schema` 接入校验库，见「Schema」。

### 校验规则

```ts
const rules = {
 name: {
  label: '姓名',
  validateTrigger: 'blur',
  rules: [
   { required: true, errorMessage: '请输入{label}' },
   { minLength: 2, maxLength: 20, errorMessage: '{label}长度为 {minLength} 到 {maxLength} 个字符' }
  ]
 }
}
```

`errorMessage` 支持使用规则对象中的占位符。校验失败时，`{label}` 会替换为字段标签（没有标签时使用字段路径），`{minLength}`、`{maxLength}`、`{minimum}`、`{maximum}` 会替换为当前规则配置的对应值。

规则也可以写在表单项上，此时覆盖表单 `rules` 中的同名字段：

```vue
<uni-forms-item
 name="age"
 label="年龄"
 :rules="[{ required: true, errorMessage: '请输入年龄' }, { format: 'int', errorMessage: '请输入整数' }]"
>
 <input v-model="formData.age" />
</uni-forms-item>
```

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| required | Boolean | 必填。空字符串、`null`、空数组视为空 |
| format | String | 格式，见下表 |
| arrayType | String | 数组元素的格式，取值同 `format` |
| range | Array | 值必须是其中一项 |
| pattern | String / RegExp | 正则。小程序中使用字符串 |
| minimum / maximum | Number | 数值范围 |
| exclusiveMinimum / exclusiveMaximum | Boolean | 是否不包含边界值 |
| minLength / maxLength | Number | 长度范围 |
| errorMessage | String | 失败提示 |
| validateTrigger / trigger | String | 该条规则的校验时机 |
| validateFunction | Function | 自定义校验 |
| validateExpr | Function | 返回 `false` 时失败，提示使用 `errorMessage` |

| format | 说明 |
| --- | --- |
| string / password | 字符串，`password` 为字符串类型的兼容别名 |
| number / double / long | 数字，`double` 和 `long` 为数字类型的兼容别名 |
| integer / int | 整数，`int` 为整数类型的兼容别名 |
| float | 浮点数 |
| boolean / bool | 布尔值，`bool` 为布尔类型的兼容别名 |
| array / object | 数组、对象 |
| date / timestamp | 日期对象、时间戳 |
| file | 文件对象 |
| email / url / idcard | 邮箱、网址、身份证号 |
| url-https / url-scheme / url-web | URL 兼容格式 |

### 自定义校验

`validateFunction` 的参数依次为规则、当前值、表单数据、回调。通过时返回 `true` 或调用 `callback()`；失败时返回错误文字、返回 `false`，或调用 `callback('错误原因')`。支持异步函数。

```ts
const rules = {
 confirmPassword: {
  label: '确认密码',
  rules: [{
   validateFunction: (rule : any, value : any, data : any, callback : any) => {
    if (value != data.password) {
     callback('两次密码不一致')
     return false
    }
    return true
   }
  }]
 }
}
```

带函数的规则在微信小程序中需在页面就绪后通过 `setRules` 设置。

### 校验时机

`validate-trigger` 设置校验时机，默认 `submit`。

| 值 | 时机 |
| --- | --- |
| submit | 调用 `validate`、`validateField` 时 |
| bind | 表单数据变化时 |
| blur | 失焦时 |

可写在表单、表单项或单条规则上。优先级为：单条规则 > 表单项 > 表单。

`bind` 随 `v-model` 的数据变化触发。`blur` 需要控件在失焦时调用表单项的 `onFieldBlur`。使用 `input` 时，在 `@blur` 中调用，见「自定义组件」。

### 校验方法

```js
formRef.value.validate()
formRef.value.validateField('email')
formRef.value.validateField(['name', 'email'])
formRef.value.clearValidate()
formRef.value.resetFields()
```

`validate` 返回 Promise。通过时得到表单项数据，未通过时得到错误数组，每项包含 `key`、`path` 和 `errorMessage`。传入回调时不再返回 Promise，回调参数为 `(errors, data)`，通过时 `errors` 为 `null`。

未放在表单项中、但需要随结果返回的字段，传给 `validate` 的第一个参数：

```js
formRef.value.validate(['id'])
```

`resetFields` 恢复为表单创建时的值，并清除错误。

### 错误提示

`err-show-type` 设置校验失败后的提示方式。

| 值 | 说明 |
| --- | --- |
| toast | 默认。弹出第一条错误，并为失败项显示错误边框。控件下方不显示错误文字 |
| modal | 弹窗显示第一条错误。不显示错误边框，控件下方不显示错误文字 |
| undertext | 在控件下方显示错误文字。不弹出提示，不显示错误边框 |

多项失败时，`toast` 和 `modal` 只提示第一条。`toast` 会给所有失败项显示错误边框。

`error-message` 可指定该项显示的错误文字。传入 `false` 时不显示错误文字。

`toast` 下的错误边框通过 `error-class` 调整，见「自定义样式」。

## Schema

`schema` 为实验性属性，后续可能改名，用法也会继续完善。除 `rules` 外，可通过它接入 Valibot、Zod 等校验库。字段名与 `uni-forms-item` 的 `name` 一致。

```vue
<script setup lang="ts">
 import * as v from 'valibot'

 const formData = ref({ name: '' })
 const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, '至少两个字'))
 })
</script>

<template>
 <uni-forms v-model="formData" :schema="schema">
  <uni-forms-item name="name" label="姓名" required>
   <input v-model="formData.name" />
  </uni-forms-item>
 </uni-forms>
</template>
```

`rules` 与 `schema` 可同时使用。整表 `validate` 先执行 `rules`，再执行 `schema`。校验成功且 schema 返回转换后的数据时，表单会更新为该结果。

## 自定义组件

支持 `v-model` 的控件放入 `uni-forms-item` 即可参与校验。需要在值变化或失焦时触发校验，可在组件内调用表单项方法：

```ts
const formItem = inject<any>('uniFormItem', null)

function onInput(value : string) {
 formItem?.onFieldChange(value)
}

function onBlur(value : string) {
 formItem?.onFieldBlur(value)
}
```

## 自定义样式

`uni-forms`、`uni-forms-item` 的 `class` 和 `style` 作用在组件根节点上。`uni-forms-item` 还提供 external class，用于调整标签、说明、必填标记、控件区域和错误状态的样式。

```vue
<uni-forms class="form-card" v-model="formData">
 <uni-forms-item name="name" label="姓名" label-class="name-label" error-class="name-error">
  <input v-model="formData.name" />
 </uni-forms-item>
</uni-forms>
```

```css
.form-card {
 padding: 12px;
 background-color: #ffffff;
}

.name-label {
 font-weight: bold;
}

.name-error {
 border-radius: 8px;
}
```



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android: 5.07; iOS: 5.07; HarmonyOS: 5.07


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| name | UniFormPath | "" | 表单字段路径，支持点号路径、数组下标路径和路径数组；参与表单校验时必填 |
| rules | UniFormRule\[] \| null | null | 当前字段的 DB Schema 风格校验规则，覆盖表单中同名字段的规则 |
| required | boolean | false | 是否显示红色必填标记；字段是否必填由 rules 决定 |
| label | string | "" | 标签文字 |
| description | string | "" | 标签下方的说明文字 |
| showArrow | boolean | false | 是否在单行横排布局的行尾显示向右箭头 |
| labelWidth | string \| number | "" | 当前项的标签宽度，数字按 px 处理；不设置时跟随表单 |
| labelAlign | string | "" | 当前项的标签文字对齐方式；不设置时跟随表单 |
| labelPosition | string | "" | 当前项的标签位置；不设置时跟随表单 |
| validateTrigger | UniFormTrigger |   | 当前字段的校验触发时机；不设置时跟随表单 |
| errorMessage | string \| boolean | "" | 覆盖组件内部错误信息；传入 false 时不显示错误文字 |
| labelClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 标签文字的自定义样式类 |
| descriptionClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 标签辅助说明的自定义样式类 |
| requiredClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 必填标记的自定义样式类 |
| contentClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 单行横排布局中控件区域的自定义样式类，顶部布局不使用 |
| errorMessageClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 控件下方错误文字的自定义样式类 |
| errorClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | toast 错误提示方式下表单项错误边框的自定义样式类 |

#### labelAlign 的属性描述

| 合法值 | 描述 |
| :- | :- |
| left | 左对齐 |
| center | 居中对齐 |
| right | 右对齐 |

#### labelPosition 的属性描述

| 合法值 | 描述 |
| :- | :- |
| left | 标签与控件单行横排 |
| top | 标签在控件上方，竖排显示 |

#### validateTrigger 的属性描述

| 合法值 | 描述 |
| :- | :- |
| bind | 表单数据变化时触发 |
| blur | 表单项失焦时触发 |
| submit | 调用表单校验方法时触发 |

<!-- UTSCOMJSON.uni-forms-item.fileFormates -->



<!-- UTSCOMJSON.uni-forms-item.component_type -->






