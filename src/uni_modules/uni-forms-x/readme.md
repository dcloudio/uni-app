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
