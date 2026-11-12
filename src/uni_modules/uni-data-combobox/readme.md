# uni-data-combobox 组合框表单项

组合 `uni-forms-item` 和 `uni-combobox`，标签在左、组合框填满右侧剩余空间。依赖 `uni-forms-x`、`uni-combobox`。

```vue
<script setup lang="ts">
const color = ref('black')
const colors = ref(['black', 'white', 'gray', 'red', 'green', 'blue'])
</script>

<template>
  <uni-data-combobox label="颜色" v-model="color" :options="colors" placeholder="请选择颜色" />
</template>
```

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| label | String | 必填 | 标签 |
| modelValue / v-model | String | `''` | 当前值 |
| options | String[] | `[]` | 候选列表 |
| name | String | `''` | uni-forms 字段名 |
| controlId | String | `''` | 外层表单项 ID，用于定位组合框区域 |
| id | String | `''` | 外层表单项 ID 的简写；同时传入时 controlId 优先 |
| placeholder | String | `''` | 占位提示 |
| disabled | Boolean | `false` | 是否禁用 |

- `update:modelValue` 回传字符串，`selectchange` 转发底层组合框选中的字符串。
- 仅支持显式声明的属性和事件，不通过 `$attrs` 自动透传。默认单选的行为和主题样式由 `uni-combobox` 负责。
- 使用 `control-id` 定位表单项，避免覆盖底层组合框用于计算弹层位置和宽度的内部 ID。
- 逐项绑定并转发 `input` 作用域插槽的 `value`、`input`、`focus`、`disabled` 参数，不使用对象形式的 `v-bind`。仅提供该插槽时才启用底层的可输可选模式，未提供时保持默认单选模式。
- 页面绑定值与选项数组使用 `ref`，组件不镜像一份本地状态。
- 可以独立用于参数配置；参与表单校验时置于 `uni-forms` 内并提供 `name` 与表单模型。
