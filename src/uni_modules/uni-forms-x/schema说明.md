# schema

`schema` 用来接入第三方校验库。组件不安装、不导入这些库，只调用传入对象上的 `~standard.validate`。这个方法来自 [Standard Schema](https://standardschema.dev/)。

对象上有这个方法时，直接写 `:schema="schema"`。没有时，先按文末的方式包一层。表单、字段和 `validate()` 的写法不变。

校验库由业务项目自己安装。

## 结果格式

`~standard.validate` 返回下面两种结果之一：

```base
// 通过
{ value: 校验后的数据 }

// 未通过
{
	issues: [
		{ message: '请输入姓名', path: ['name'] }
	]
}
```

`path` 的每一段可以是字段名、数字下标，或 `{ key: 字段名 }`。它对应 `uni-forms-item` 的 `name`。

| schema 里的位置 | 表单项 name |
| --- | --- |
| `name` | `name` |
| `profile.nickname` | `profile.nickname` |
| `users[0].name` | `users[0].name` 或 `users.0.name` |

对不上表单项、或 `path` 为空的错误，仍会出现在 `validate()` 的失败结果里，只是没有表单项可以显示。

## 和 rules 一起用

可以同时写 `rules` 和 `schema`。两边不要混传：`rules` 对象不能传给 `schema`，校验库的对象也不能传给 `rules`。

| 调用 | 行为 |
| --- | --- |
| validate() | 先校验每个字段的 `rules`，再校验 `schema` |
| validateField(names) | 先校验这些字段的 `rules`，再带上 schema 里属于它们的错误 |
| bind | 不校验 schema |
| blur | 该字段会校验时，同时校验 schema |

同一个字段、同一句错误只保留一条。某个字段的 `rules` 已经失败时，schema 对这个字段的结果不再覆盖它。

整表 `validate()` 成功，并且 schema 返回了 `value` 时，输入和本次成功结果都会改成这份值。失败、失焦和 `validateField` 不改输入。

提交到服务端后，服务端仍要再校验一次。

修改校验规则时，换成一个新的 schema 对象。

## 支持的库

| 库 | 可以直接传入的版本 | 传入的对象 |
| --- | --- | --- |
| Valibot | 1.0 及以上 | `v.object(...)` |
| Zod | 3.24 及以上 | `z.object(...)` |
| ArkType | 2.0 及以上 | `type({ ... })` |
| Yup | 1.7 及以上 | `yup.object({ ... })` |
| Joi | 18 及以上 | `Joi.object({ ... })` |
| Effect Schema | 3.13 及以上 | 该库提供的 Standard Schema 结果 |

版本不够、对象上没有 `~standard.validate` 时，不能直接传入。

### Valibot

```base
<script setup lang="ts">
	import * as v from 'valibot'

	const formRef = ref<any>(null)
	const formData = ref({
		name: '',
		age: 0
	})
	const schema = v.object({
		name: v.pipe(v.string(), v.minLength(2, '至少两个字')),
		age: v.pipe(v.number(), v.minValue(18, '不能小于 18'))
	})

	function submit() {
		formRef.value.validate().then((data : object) => {
			console.log(data)
		}).catch((errors : any[]) => {
			console.log(errors[0].errorMessage)
		})
	}
</script>

<template>
	<uni-forms ref="formRef" v-model="formData" :schema="schema">
		<uni-forms-item name="name" label="姓名" required>
			<input v-model="formData.name" />
		</uni-forms-item>
		<uni-forms-item name="age" label="年龄" required>
			<input v-model="formData.age" />
		</uni-forms-item>
	</uni-forms>
</template>
```

### Zod

只换创建对象的写法，表单仍然写 `:schema="schema"`。

```base
import * as z from 'zod'

const schema = z.object({
	name: z.string().min(2, '至少两个字'),
	age: z.number().min(18, '不能小于 18')
})
```

字段名与 `uni-forms-item` 的 `name` 保持一致。

## 自己包一层

库没有 `~standard.validate` 时，在项目里包成下面的形状再传入。`validate` 可以是异步函数。失败时返回 `issues`，不要只抛异常。

```base
const schema = {
	'~standard': {
		version: 1,
		vendor: 'my-rules',
		validate: (value : any) => {
			const issues : any[] = []
			if (value == null || value.name == null || String(value.name).length < 2) {
				issues.push({ message: '至少两个字', path: ['name'] })
			}
			if (issues.length > 0) {
				return { issues }
			}
			return { value }
		}
	}
}
```

Yup 1.7 以前的对象，把抛出的错误收成 `issues`：

```base
function fromLegacyYup(yupSchema : any) {
	return {
		'~standard': {
			version: 1,
			vendor: 'yup',
			async validate(value : any) {
				try {
					const next = await yupSchema.validate(value, { abortEarly: false })
					return { value: next }
				} catch (error) {
					const caught = error as any
					const list = caught != null && caught.inner != null && caught.inner.length > 0 ? caught.inner : [caught]
					const issues = list.map((item : any) => {
						const path = item != null && item.path != null ? String(item.path).split('.') : []
						const message = item != null && item.message != null ? String(item.message) : '验证错误'
						return { message, path }
					})
					return { issues }
				}
			}
		}
	}
}
```

```base
<uni-forms v-model="formData" :schema="fromLegacyYup(yupSchema)" />
```

AJV 同理：用它的校验结果得到是否通过，再把错误里的路径和文案收成 `issues`。

不需要第三方库时，使用 `rules`。写法见 [readme.md](./readme.md) 的「校验规则」。
