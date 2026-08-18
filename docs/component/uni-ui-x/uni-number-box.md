---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-number-box
---

::: sourceCode
## uni-number-box
:::

带加减按钮的数字输入框，常见于购物车商品数量选择

> 本 Component 是 uni ext component，需下载插件：[uni-number-box](https://ext.dcloud.net.cn/plugin?id=27896)


带加减按钮的数字输入框，常见于购物车商品数量选择。

### 基本用法

```html
<uni-number-box v-model="value" />
```

### 设置范围

```html
<uni-number-box v-model="value" :min="5" :max="20" />
```

### 设置步长

```html
<!-- 整数步长 -->
<uni-number-box v-model="value" :step="5" />

<!-- 小数步长 -->
<uni-number-box v-model="value" :step="0.1" />
```

### 禁用状态

```html
<uni-number-box :value="5" :disabled="true" />
```

### 自定义样式

通过 `btn-class`、`input-class`、`icon-class` 自定义组件样式：

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

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值改变时触发 | value: number |
| focus | 输入框聚焦时触发 | event: UniInputFocusEvent |
| blur | 输入框失焦时触发 | event: UniInputBlurEvent |



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 描述 |
| :- | :- | :- |
| value | number | 输入框当前值，不使用 v-model 时通过该属性传入初始值 |
| modelValue | number | v-model 绑定值，支持双向绑定 |
| min | number | 允许输入的最小值 |
| max | number | 允许输入的最大值 |
| step | number | 每次点击加/减按钮改变的步长，支持小数 |
| disabled | boolean | 是否禁用组件，禁用时输入框和加减按钮都不可操作 |
| btnClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 加减按钮的自定义样式类 |
| inputClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 输入框的自定义样式类 |
| iconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 加减按钮内部图标的自定义样式类 |
| @change | Function | 值改变时触发，参数为当前值，类型为 number |
| @focus | Function | 输入框聚焦时触发，参数为事件对象，类型为 UniInputFocusEvent |
| @blur | Function | 输入框失焦时触发，参数为事件对象，类型为 UniInputBlurEvent |
| @update:modelValue | Event | v-model 绑定值变化事件，参数为当前值，类型为 number |

<!-- UTSCOMJSON.uni-number-box.fileFormates -->



<!-- UTSCOMJSON.uni-number-box.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/number-box/number-box.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/number-box/number-box.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/number-box/number-box

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/number-box/number-box

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1; padding: 15px;">
	<!-- #endif -->
	<!-- #ifndef APP -->
	<view style="padding: 15px;">
	<!-- #endif -->
		<text class="page-title">NumberBox 数字输入框</text>

		<!-- 基础用法 -->
		<view style="margin-bottom: 20px;">
			<text class="label">基础用法：</text>
			<uni-number-box v-model="data.value1" @change="onChange" />
			<text class="hint">当前值：{{ data.value1 }}</text>
		</view>

		<!-- 设置最小值和最大值 -->
		<view style="margin-bottom: 20px;">
			<text class="label">设置范围 (min=5, max=20)：</text>
			<uni-number-box v-model="data.value2" :min="5" :max="20" />
			<text class="hint">当前值：{{ data.value2 }}</text>
		</view>

		<!-- 设置步长 -->
		<view style="margin-bottom: 20px;">
			<text class="label">步长为5 (step=5)：</text>
			<uni-number-box v-model="data.value3" :step="5" />
			<text class="hint">当前值：{{ data.value3 }}</text>
		</view>

		<!-- 小数步长 -->
		<view style="margin-bottom: 20px;">
			<text class="label">小数步长 (step=0.1)：</text>
			<uni-number-box v-model="data.value4" :step="0.1" :min="0" :max="10" />
			<text class="hint">当前值：{{ data.value4 }}</text>
		</view>

		<!-- 禁用状态 -->
		<view style="margin-bottom: 20px;">
			<text class="label">禁用状态：</text>
			<uni-number-box :value="5" :disabled="true" />
		</view>

		<!-- 自定义样式 btn-class -->
		<view style="margin-bottom: 20px;">
			<text class="label">自定义按钮样式 (btn-class)：</text>
			<uni-number-box v-model="data.value5" btn-class="custom-btn" />
		</view>

		<!-- 自定义样式 input-class -->
		<view style="margin-bottom: 20px;">
			<text class="label">自定义输入框样式 (input-class)：</text>
			<uni-number-box v-model="data.value6" input-class="custom-input" />
		</view>

		<!-- 自定义样式组合 -->
		<view style="margin-bottom: 20px;">
			<text class="label">自定义样式组合 (蓝色主题)：</text>
			<uni-number-box v-model="data.value7" btn-class="blue-btn" input-class="blue-input" icon-class="blue-icon" />
		</view>

		<!-- 暗黑模式外观演示：此区域固定展示深色外观，不跟随系统主题 -->
		<view style="margin-bottom: 20px; background-color: #1a1a1a; padding: 15px; border-radius: 8px;">
			<text style="color: #fff; margin-bottom: 10px;">暗黑模式：</text>
			<uni-number-box v-model="data.value8" btn-class="dark-btn" input-class="dark-input" icon-class="dark-icon" />
			<text style="color: #999; margin-top: 5px;">当前值：{{ data.value8 }}</text>
		</view>

	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
	<!-- #ifndef APP -->
	</view>
	<!-- #endif -->
</template>

<script setup lang="uts">
type Data = {
	value1 : number
	value2 : number
	value3 : number
	value4 : number
	value5 : number
	value6 : number
	value7 : number
	value8 : number
}

const data = reactive<Data>({
	value1: 1,
	value2: 10,
	value3: 0,
	value4: 0.5,
	value5: 1,
	value6: 1,
	value7: 1,
	value8: 1
})

const onChange = (value : number) : void => {
	console.log('number-box change:', value)
}

defineExpose({
	data
})
</script>

<style>
.page-title {
	font-size: 18px;
	font-weight: bold;
	color: var(--text-color, #333333);
	margin-bottom: 20px;
}

.label {
	color: var(--text-color, #333333);
	opacity: 0.75;
	margin-bottom: 10px;
}

.hint {
	color: var(--text-color, #333333);
	opacity: 0.6;
	margin-top: 5px;
}

.custom-btn {
	background-color: #28a745;
}

.custom-input {
	background-color: #fff3cd;
	color: #856404;
	width: 80px;
}

.dark-btn {
	background-color: #333;
}

.dark-input {
	background-color: #333;
	color: #fff;
}

.dark-icon {
	background-color: #fff;
}

.blue-btn {
	background-color: #007aff;
}

.blue-input {
	background-color: #e8f4ff;
	color: #007aff;
}

.blue-icon {
	background-color: #fff;
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-number-box)
