# uni-data-switch 开关表单项

组合 `uni-forms-item` 和原生 `switch`，标签在左、开关靠右。依赖 `uni-forms-x`。

```vue
<script setup lang="ts">
const enabled = ref(false)
</script>

<template>
  <uni-data-switch label="启用动画" v-model="enabled" />
</template>
```

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| label | String | 必填 | 标签 |
| modelValue / v-model | Boolean | `false` | 开关值 |
| name | String | `''` | uni-forms 字段名 |
| controlId | String | `''` | 原生 switch 的 ID |
| disabled | Boolean | `false` | 是否禁用 |

`change` 时先通过 `update:modelValue` 回写布尔值，再转发原始 `UniSwitchChangeEvent`。仅支持显式声明的属性和事件，不通过 `$attrs` 自动透传。组件没有额外本地状态，页面使用 `ref` 绑定。

可以独立用于参数配置；参与表单校验时置于 `uni-forms` 内并提供 `name` 与表单模型。样式由原生 switch 与 uni-forms 的主题规则负责。
