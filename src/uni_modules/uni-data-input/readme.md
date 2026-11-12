# uni-data-input 文本表单项

组合 `uni-forms-item` 和原生 `input`。标签在左，输入框占据右侧剩余空间，背景透明，仅显示下边线。依赖 `uni-forms-x`。

```vue
<script setup lang="ts">
const description = ref('')
</script>

<template>
  <uni-data-input label="说明" v-model="description" placeholder="请输入说明" />
</template>
```

## 属性与事件

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| label | String | 必填 | 标签 |
| modelValue / v-model | String | `''` | 输入内容，数字键盘也回传字符串 |
| name | String | `''` | uni-forms 字段名 |
| controlId | String | `''` | 原生 input 的 ID |
| type | String | `'text'` | 原生 input 类型 |
| placeholder | String | `''` | 占位提示 |
| disabled | Boolean | `false` | 是否禁用 |

- `update:modelValue` 回传字符串，`input` 回传原始 `UniInputEvent`。
- 仅支持显式声明的属性和事件，不通过 `$attrs` 自动透传。需要其他原生能力时，在组件中补充对应的 Props、绑定或事件转发。
- 数据使用 `ref`。组件不镜像一份本地状态，也不自行转换为数字。
- 可以独立用于参数配置；参与表单校验时置于 `uni-forms` 内并提供 `name` 与表单模型。
- 在其他项目使用时，需提供 `--text-color`、`--border-color` 的主题值；缺失时使用亮色 fallback。
