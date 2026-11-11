# uni-number-box 数字输入框组件

## 用途和场景

带加减按钮的数字输入框，常见于购物车商品数量选择、票数选择等需要通过步进调整数值的场景。

## 使用方式（职责分工）

- 组件内部负责：渲染减号按钮、输入框、加号按钮；处理数值范围（`min`/`max`）、步长（`step`）、小数精度格式化、禁用态与 `v-model` 双向绑定；web 端为加减按钮提供鼠标与键盘（Enter/Space）操作。
- 使用者负责：
  - 通过 `v-model` 绑定数值（不双向绑定时可通过 `value` 传入初始值）。
  - 按需设置 `min`、`max`、`step`、`disabled`。
  - 需要自定义外观时，通过 `btn-class`、`input-class`、`icon-class` 三个外部样式类传入样式。

## 基本用法

```html
<template>
	<uni-number-box v-model="value" />

	<!-- 设置范围 -->
	<uni-number-box v-model="value" :min="5" :max="20" />

	<!-- 整数步长 -->
	<uni-number-box v-model="value" :step="5" />

	<!-- 小数步长 -->
	<uni-number-box v-model="value" :step="0.1" />

	<!-- 禁用状态 -->
	<uni-number-box :value="5" :disabled="true" />
</template>

<script setup lang="ts">
	const value = ref(1)
</script>
```

自定义样式（通过外部样式类）：

```html
<uni-number-box v-model="value" btn-class="custom-btn" input-class="custom-input" icon-class="custom-icon" />
```

```css
.custom-btn {
	background-color: #007aff;
}
.custom-input {
	background-color: #e8f4ff;
	color: #007aff;
}
.custom-icon {
	background-color: #fff;
}
```

## 注意事项

- `step` 支持小数，组件会按 `step` 的小数位数格式化显示数值。
- 输入框失焦时会自动把数值裁剪到 `[min, max]` 范围内，并触发 `change`。
- 加减按钮在数值到达 `min`/`max` 时会自动置为不可用。
- 组件样式仅通过 `btn-class`、`input-class`、`icon-class` 外部样式类自定义，不通过属性直接控制 css。
- 示例页面路径：`/pages/uni-ui/number-box/number-box.uvue`。
