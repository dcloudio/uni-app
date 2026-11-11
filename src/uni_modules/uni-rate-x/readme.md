# uni-rate 评分组件

## 用途和场景

评分组件，多用于购买商品后对商品进行评价、服务态度评价、用户满意度打分等场景。

## 使用方式（职责分工）

- 组件内部负责：使用 unicode 字符 ★/☆ 实现评分展示，通过修改字体样式实现各种效果；处理评分取值（0~5）、点击定位与 `v-model` 双向绑定；web 端支持鼠标点击与键盘方向键调整评分。
- 组件分两个版本，由属性 `full` 切换：
  - 高性能版（`full` 为 false）：只有一层 `text`，不显示灰星，仅显示亮星，亮星不支持小数点，不能点击，适合长列表中显示。
  - 普通版（`full` 为 true）：由背景灰星与前景亮星叠加而成，支持小数点，支持点击评分。
- 使用者负责：
  - 通过 `v-model` 或 `value` 传入评分；`readonly` 为 true 时不响应点击（`full` 为 false 时始终只读）。
  - 按需设置 `plain`（灰星镂空）、`letter-spacing`（字间距）。
  - 需要自定义样式时，通过 `star-class`（灰星）与 `star-active-class`（亮星）两个外部样式类传入样式。

## 基本用法

```html
<template>
	<!-- 可点击评分，双向绑定 -->
	<uni-rate v-model="rateValue" full :letter-spacing="10" @change="onRateChange" />

	<!-- 只读，显示灰星 -->
	<uni-rate full readonly :value="4.3" />

	<!-- 高性能只读，仅显示亮星 -->
	<uni-rate :value="4.6" />
</template>

<script setup lang="ts">
	const rateValue = ref(0)

	function onRateChange(value : number) {
		console.log('当前评分：', value)
	}
</script>
```

## 注意事项

- 高性能版只显示亮星，不支持小数，`value` 会被四舍五入为整数颗星。
- 普通版通过点击星星的横向位置计算评分，支持 0.5 等小数。
- `change` 事件回调会给出点击/键盘触发的新评分值。
- 组件样式仅通过 `star-class`、`star-active-class` 两个外部样式类自定义，不通过属性直接控制 css。
- 示例页面路径：`/pages/uni-ui/rate/rate.uvue`。
