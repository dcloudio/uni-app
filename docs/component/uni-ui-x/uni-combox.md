::: sourceCode
## uni-combox
:::

默认是单选选择框，通过 input 具名插槽切换为可输入、可选择的组合框。

> 本 Component 是 uni ext component，需下载插件：[uni-combox](https://ext.dcloud.net.cn/plugin?id=29915)


uni-combox 组合框组件。

默认为单选模式，类似 select 组件，只能选择不能输入。通过具名插槽 `input` 传入 input 组件后，切换为可输入、可选择的组合模式。

### 基本用法

```html
<uni-combox :options="options" placeholder="请选择" v-model="value" />
```

### options

```html
<uni-combox :options="gradeOptions" placeholder="请选择年级" v-model="grade" />
```

### modelValue / v-model

```html
<uni-combox :options="cityOptions" v-model="city" placeholder="请选择城市" />
```

### placeholder

```html
<uni-combox :options="cityOptions" placeholder="这里展示 placeholder" v-model="value" />
```

### 组合模式

```html
<uni-combox :options="options" v-model="city">
  <template #input="{ value, input }">
    <input
      :value="value"
      placeholder="选择或输入城市"
      @input="input"
    />
  </template>
</uni-combox>
```

输入时会打开候选浮层，并按 startsWith 规则过滤候选项。点击右侧箭头打开时展示完整候选列表，并高亮当前输入匹配项。

### 自定义样式

```html
<uni-combox
  :options="options"
  v-model="value"
  arrow-class="demo-arrow"
  options-view-class="demo-options-view"
  option-text-class="demo-option-text"
  option-text-highlight-class="demo-option-highlight"
  result-text-class="demo-result-text"
/>
```

也可以单独传入任意一个样式类属性。

```html
<uni-combox :options="options" v-model="value" arrow-class="demo-arrow" />
<uni-combox :options="options" v-model="value" options-view-class="demo-options-view" />
<uni-combox :options="options" v-model="value" option-text-class="demo-option-text" />
<uni-combox :options="options" v-model="value" option-text-highlight-class="demo-option-highlight" />
<uni-combox :options="options" v-model="value" result-text-class="demo-result-text" />
```

### 事件

```html
<uni-combox
  :options="options"
  v-model="value"
  @update:modelValue="onUpdateModelValue"
  @selectchange="onSelectChange"
/>
```

### 浮层

候选浮层通过 `teleport` 渲染到页面层，不受组件自身尺寸裁剪。下方空间不足且上方空间更充足时，会自动向上展开。默认最大高度为 200px。

候选浮层内部使用 `scroll-view`。

### External Classes

| 类名 | 说明 |
| --- | --- |
| arrow-class | 右侧箭头样式 |
| options-view-class | 候选浮层外层样式 |
| option-text-class | 候选项文字样式 |
| option-text-highlight-class | 候选项高亮样式 |
| result-text-class | 单选模式结果文字样式 |

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| options | Array\<String\> | [] | 候选字符串数组 |
| modelValue | String | '' | 当前值，支持 v-model |
| placeholder | String | '' | 占位文字 |
| arrowClass | String | '' | 右侧箭头自定义样式类 |
| optionsViewClass | String | '' | 候选浮层外层自定义样式类 |
| optionTextClass | String | '' | 候选项文字自定义样式类 |
| optionTextHighlightClass | String | '' | 候选项高亮自定义样式类 |
| resultTextClass | String | '' | 单选模式结果文字自定义样式类 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值更新时触发 | value: string |
| selectchange | 从候选项选中时触发 | value: string |

### Expose

| 方法名 | 说明 |
| --- | --- |
| setInputValue(value: string) | 设置当前值并打开过滤候选 |
| openOptions() | 打开候选浮层 |
| closeOptions() | 关闭候选浮层 |



### 兼容性 <Help />
| 微信小程序 | 支付宝小程序 |
| :- | :- |
| 5.07 | 5.31 |


### 属性 
| 名称 | 类型 | 描述 |
| :- | :- | :- |
| options | string\[\] |   |
| modelValue | string |   |
| placeholder | string |   |
| arrowClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| optionsViewClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| optionTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| optionTextHighlightClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| resultTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| @selectchange | Function | 从候选项选中时触发 |
| @update:modelValue | Event |   |

<!-- UTSCOMJSON.uni-combox.fileFormates -->



<!-- UTSCOMJSON.uni-combox.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/combox/combox.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/combox/combox.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/combox/combox

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/combox/combox

>示例
```vue
<template>
	<scroll-view class="page">
		<view class="section">
			<text class="page-title">uni-combox 组合框</text>
			<text class="page-desc">默认单选模式只能从候选项中选择；传入 input 插槽后，可输入并按左侧匹配过滤候选项。</text>
		</view>

		<view class="section">
			<text class="group-title">属性示例</text>
		</view>

		<view class="section">
			<text class="section-title">options：候选字符串数组</text>
			<uni-combox
				:options="gradeOptions"
				placeholder="请选择年级"
				v-model="optionsValue"
			/>
			<text class="result-text">当前选择：{{ optionsValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">input 插槽：可输入可选择</text>
			<uni-combox
				:options="cityOptions"
				v-model="city"
				placeholder="选择或输入城市"
				@selectchange="onCityChange"
			>
				<template #input="{ value, input, focus }">
					<input
						class="custom-input"
						:value="value"
						placeholder="选择或输入城市"
						@focus="focus"
						@input="input"
					/>
				</template>
			</uni-combox>
			<text class="result-text">当前输入：{{ city }}</text>
		</view>

		<view class="section">
			<text class="section-title">placeholder：占位文字</text>
			<uni-combox
				:options="cityOptions"
				placeholder="这里展示 placeholder"
				v-model="placeholderValue"
			/>
			<text class="result-text">未选择时展示占位文字</text>
		</view>

		<view class="section">
			<text class="section-title">arrow-class：右侧箭头样式</text>
			<uni-combox
				:options="statusOptions"
				placeholder="请选择状态"
				v-model="arrowClassValue"
				arrow-class="demo-arrow"
			/>
			<text class="result-text">当前选择：{{ arrowClassValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">options-view-class：候选浮层样式</text>
			<uni-combox
				:options="cityOptions"
				placeholder="打开查看浮层样式"
				v-model="optionsViewClassValue"
				options-view-class="demo-options-view"
			/>
			<text class="result-text">当前选择：{{ optionsViewClassValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">option-text-class：候选项文字样式</text>
			<uni-combox
				:options="statusOptions"
				placeholder="打开查看候选文字"
				v-model="optionTextClassValue"
				option-text-class="demo-option-text"
			/>
			<text class="result-text">当前选择：{{ optionTextClassValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">option-text-highlight-class：高亮项文字样式</text>
			<uni-combox
				:options="cityOptions"
				v-model="optionTextHighlightClassValue"
				option-text-highlight-class="demo-option-highlight"
			/>
			<text class="result-text">打开后当前匹配项会使用高亮文字样式：{{ optionTextHighlightClassValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">result-text-class：单选结果文字样式</text>
			<uni-combox
				:options="gradeOptions"
				v-model="resultTextClassValue"
				result-text-class="demo-result-text"
			/>
			<text class="result-text">当前选择：{{ resultTextClassValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">大量候选</text>
			<uni-combox
				:options="largeOptions"
				placeholder="请选择编号"
				v-model="largeValue"
			/>
			<text class="result-text">当前选择：{{ largeValue }}</text>
		</view>

		<view class="section">
			<text class="group-title">事件示例</text>
		</view>

		<view class="section">
			<text class="section-title">update:modelValue：值更新时触发</text>
			<uni-combox
				:options="cityOptions"
				v-model="updateEventValue"
				placeholder="请选择城市"
				@update:modelValue="onUpdateModelValue"
			/>
			<text class="result-text">事件值：{{ updateEventText }}</text>
		</view>

		<view class="section">
			<text class="section-title">selectchange：从候选项选中时触发</text>
			<uni-combox
				:options="statusOptions"
				v-model="selectEventValue"
				placeholder="请选择状态"
				@selectchange="onSelectChange"
			/>
			<text class="result-text">事件值：{{ selectEventText }}</text>
		</view>

	</scroll-view>
</template>

<script setup lang="ts">
const optionsValue = ref<string>('')
const placeholderValue = ref<string>('')
const arrowClassValue = ref<string>('')
const optionsViewClassValue = ref<string>('')
const optionTextClassValue = ref<string>('')
const optionTextHighlightClassValue = ref<string>('杭州')
const resultTextClassValue = ref<string>('三年级')
const updateEventValue = ref<string>('')
const updateEventText = ref<string>('未触发')
const selectEventValue = ref<string>('')
const selectEventText = ref<string>('未触发')
const city = ref<string>('杭州')
const largeValue = ref<string>('')

const gradeOptions: string[] = [
	'一年级',
	'二年级',
	'三年级',
	'四年级',
	'五年级',
	'六年级',
	'初一',
	'初二',
	'初三'
]

const cityOptions: string[] = [
	'北京',
	'上海',
	'广州',
	'深圳',
	'杭州',
	'南京',
	'苏州',
	'成都',
	'重庆',
	'武汉',
	'西安',
	'郑州'
]

const statusOptions: string[] = [
	'待处理',
	'处理中',
	'已完成',
	'已取消'
]

const largeOptions = computed(() : string[] => {
	const list: string[] = []
	for (let i = 1; i <= 120; i++) {
		const value = i < 10 ? `编号 00${i}` : (i < 100 ? `编号 0${i}` : `编号 ${i}`)
		list.push(value)
	}
	return list
})

function onUpdateModelValue(value : string) {
	updateEventText.value = value == '' ? '空字符串' : value
	console.log('combox update:modelValue:', value)
}

function onSelectChange(value : string) {
	selectEventText.value = value
	console.log('combox selectchange:', value)
}

function onCityChange(value : string) {
	console.log('city selectchange:', value)
}
</script>

<style>
.page {
	flex: 1;
	padding: 16px;
}

.section {
	margin-bottom: 24px;
}

.page-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--text-color, #1f2937);
	margin-bottom: 8px;
}

.page-desc {
	font-size: 14px;
	line-height: 22px;
	color: var(--text-color, #64748b);
	opacity: 0.7;
}

.group-title {
	font-size: 18px;
	font-weight: bold;
	color: var(--text-color, #111827);
	margin-top: 4px;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: var(--text-color, #1f2937);
	margin-bottom: 10px;
}

.result-text {
	font-size: 13px;
	color: var(--text-color, #64748b);
	opacity: 0.7;
	margin-top: 8px;
}

.custom-input {
	flex: 1;
	width: 100%;
	height: 22px;
	font-size: 14px;
	color: var(--text-color, #1f2937);
	background-color: transparent;
}

.demo-arrow {
	border-right-color: var(--tips-color, #16a34a);
	border-bottom-color: var(--tips-color, #16a34a);
	border-right-width: 2px;
	border-bottom-width: 2px;
}

.demo-options-view {
	border-color: var(--tips-border-color, #2563eb);
	border-width: 2px;
	background-color: var(--tips-background-color, #eff6ff);
}

.demo-option-text {
	color: var(--tips-color, #7c3aed);
	font-weight: bold;
}

.demo-option-highlight {
	color: var(--tips-color, #dc2626);
	font-weight: bold;
}

.demo-result-text {
	color: var(--tips-color, #2563eb);
	font-weight: bold;
}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-combox)
