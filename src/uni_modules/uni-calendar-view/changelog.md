## 1.2.0（2026-11-14）

- 新增 `compact` 属性：紧凑模式（1 为纯文本布局行高 36px，2 为三段式单元格布局 44px），用于窄屏下同时完整展示两个日历
- 紧凑样式内置到组件内，取代由使用方通过外部样式类注入的方式，避免跨样式表竞争导致的选中样式断裂
- 范围首尾状态类（`day-range-start-text`、`day-range-end-text` 等）补齐完整尺寸，样式规则自足、不依赖跨规则覆盖

## 1.1.0（2026-11-14）

- 新增 `range` 日期范围选择能力，支持 `v-model:range-start`、`v-model:range-end`
- 新增 `range-change` 事件，开始与结束日期同时非空表示范围选择完成
- 新增 `range-start`、`range-end` 首尾标签插槽，以及 `range-start-label`、`range-end-label` 文案属性
- 新增 `range-class`、`range-label-class` 外部样式类
- 新增 `setRange`、`clearRange`、`getRange` 方法
- `range` 模式下 `change`、`update:modelValue` 不再触发

## 1.0.0（2026-11-10）
