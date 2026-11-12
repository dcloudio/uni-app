# uni-data-slider 滑块表单项

组合 `uni-forms-item` 和原生 `slider`，标签在上、滑块在下。依赖 `uni-forms-x`。

```vue
<script setup lang="ts">
const percent = ref(0)
</script>

<template>
  <uni-data-slider label="进度（%）" v-model="percent" :min="0" :max="100" live />
</template>
```

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| label | String | 必填 | 标签 |
| modelValue / v-model | Number | `0` | 当前值 |
| name | String | `''` | uni-forms 字段名 |
| controlId | String | `''` | 原生 slider 的 ID |
| min / max / step | Number | `0 / 100 / 1` | 原生滑块范围和步长 |
| showValue | Boolean | `true` | 是否显示数值 |
| disabled | Boolean | `false` | 是否禁用 |
| live | Boolean | `false` | 是否在拖动时回写 v-model |

默认在 `change` 时回写数字。开启 `live` 后，拖动的 `changing` 事件也会回写；最终 `change` 仍回写并转发。两种模式都会转发原始 `change`、`changing` 事件，不通过 watch 维护副本。

仅支持显式声明的属性和事件，不通过 `$attrs` 自动透传。页面使用 `ref` 绑定，数值校正和交互行为遵循原生 slider。可以独立用于参数配置；需要校验时置于 `uni-forms` 内并绑定表单模型和字段名。
