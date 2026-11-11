---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-data-checkbox-x
---

::: sourceCode
## uni-data-checkbox

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-data-checkbox


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-data-checkbox-x/components/uni-data-checkbox

:::

通过本地数据或 datacom 数据渲染单选、多选选项

> 本 Component 是 uni ext component，需下载插件：[uni-data-checkbox](https://ext.dcloud.net.cn/plugin?name=uni-data-checkbox-x)


# uni-data-checkbox 枚举类平铺型选择组件

`uni-data-checkbox` 是符合datacom规范的一组组件，适用于平铺展示枚举类候选项的场景。

给组件传入一组数据，它可以生成多种展示候选的方案，包括单选radio、多选checkbox、并排radio-button、竖排列表、横排tag等多种形态。

因为平铺了所有候选项，所以它不适合候选项非常多的场景。

datacom 规范和 external class 配合使用，既可以简化数据绑定，也可以通过样式类定制选项外观。

组件支持：

- 单选与多选
- `default`、`list`、`button`、`tag` 四种展示模式。覆盖了常见的平铺候选UI样式。
- external class，可以自定义所有样式
- datacom规范，绑定本地数组 或 uniCloud 云端数据
- 最少、最多选择数量限制
- 整体禁用和单项禁用
- 自定义字段映射
- 浅色、暗黑模式

## 基本用法

通过 `localdata` 提供候选数据（localdata是相对于uniCloud云端数据的本地数据概念），使用 `v-model` 绑定当前值。

以下代码，简单的传入一组数据，即可渲染好候选内容。如果没有 uni-data-checkbox组件，开发者需要在template里写大量代码，包括checkbox-group、label、v-for等。

```vue
<template>
  <uni-data-checkbox v-model="value" :localdata="options" />
</template>

<script setup>
const value = ref(0)
const options = [
  { text: '男', value: 0 },
  { text: '女', value: 1 },
  { text: '未知', value: 2 }
]
</script>
```

单选模式下，`v-model` 为字符串或数字；多选模式下，`v-model` 为数组。

## 本地数据

`localdata` 中的每一项支持以下字段：

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | String | - | 选项显示文字 |
| value | String / Number | - | 选项值，用于 `v-model` 和事件回传 |
| disabled | Boolean | `false` | 是否禁用当前项 |
| disable | Boolean | `false` | `disabled` 的兼容写法 |
| selected | Boolean | `false` | 多选模式下的初始选中状态。绑定值为非空数组时，以 `v-model` 为准 |

```vue
<script setup lang="ts">
const values = ref(['basketball'])
const options = [
  { text: '足球', value: 'football' },
  { text: '篮球', value: 'basketball' },
  { text: '游泳', value: 'swimming', disabled: true }
]
</script>

<template>
  <uni-data-checkbox v-model="values" :localdata="options" multiple />
</template>
```

### 字段映射

数据字段不是 `text`、`value` 时，通过 `map` 指定文字字段和值字段。

```vue
<script setup lang="ts">
const values = ref(['pop'])
const options = [
  { name: '流行', code: 'pop' },
  { name: '摇滚', code: 'rock' },
  { name: '爵士', code: 'jazz' }
]
const fieldMap = { text: 'name', value: 'code' }
</script>

<template>
  <uni-data-checkbox
    v-model="values"
    :localdata="options"
    :map="fieldMap"
    mode="tag"
    multiple
  />
</template>
```

`map` 只映射文字和值字段。`disabled`、`disable`、`selected` 字段名保持不变。

## 单选与多选

### 单选

默认是单选模式，选择新选项后替换当前值。

```vue
<uni-data-checkbox v-model="value" :localdata="options" />
```

### 多选

设置 `multiple` 后启用多选，绑定值必须为数组。

```vue
<uni-data-checkbox v-model="values" :localdata="options" multiple />
```

```ts
const values = ref([0, 2])
```

### 选择数量限制

多选模式可通过 `min`、`max` 限制最少和最多选择数量。

```vue
<uni-data-checkbox
  v-model="values"
  :localdata="options"
  multiple
  :min="1"
  :max="3"
/>
```

- 达到 `min` 时，当前已选项不可继续取消。
- 达到 `max` 时，未选项不可继续选择。
- `min`、`max` 仅在 `multiple` 为 `true` 时生效。

## 展示模式

通过 `mode` 切换展示方式。

| mode | 说明 | 常用场景 |
| --- | --- | --- |
| default | 默认平铺模式，显示单选或复选控件 | 表单选项、问卷 |
| list | 纵向列表模式 | 设置项、单列选择 |
| button | 分段按钮模式 | 少量选项、视图切换 |
| tag | 标签模式 | 标签筛选、偏好选择 |

```vue
<uni-data-checkbox v-model="value" :localdata="options" />

<uni-data-checkbox v-model="value" :localdata="options" mode="list" />

<uni-data-checkbox v-model="value" :localdata="options" mode="button" />

<uni-data-checkbox v-model="values" :localdata="options" mode="tag" multiple />
```

### 右侧选中标记

`icon="right"` 时不显示左侧单选或复选控件，选中标记显示在选项右侧。该写法通常与 `list` 模式配合使用。

```vue
<uni-data-checkbox
  v-model="value"
  :localdata="options"
  mode="list"
  icon="right"
/>
```

## 禁用状态

通过组件的 `disabled` 禁用全部选项：

```vue
<uni-data-checkbox v-model="value" :localdata="options" disabled />
```

通过数据项的 `disabled` 或 `disable` 禁用指定选项：

```ts
const options = [
  { text: '可用选项', value: 'available' },
  { text: '不可用选项', value: 'unavailable', disabled: true }
]
```

禁用项不会更新 `v-model`，也不会触发 `change`。

## 在表单中使用

将组件放在 `uni-forms-item` 中，并将 `v-model` 绑定到对应表单字段。

```vue
<template>
  <uni-forms ref="formRef" v-model="formData" :rules="rules">
    <uni-forms-item name="hobbies" label="兴趣">
      <uni-data-checkbox
        v-model="formData.hobbies"
        :localdata="hobbyOptions"
        multiple
      />
    </uni-forms-item>
  </uni-forms>
</template>

<script setup lang="ts">
const formRef = ref<any>(null)
const formData = ref({ hobbies: [] as string[] })
const hobbyOptions = [
  { text: '阅读', value: 'reading' },
  { text: '运动', value: 'sports' },
  { text: '音乐', value: 'music' }
]
const rules = {
  hobbies: {
    rules: [{ required: true, errorMessage: '请选择兴趣' }]
  }
}
</script>
```

## 云端数据

不传 `localdata`，并设置 `collection` 后，组件从 uniCloud 云数据库加载候选数据。

```vue
<template>
  <uni-data-checkbox
    v-model="cityCode"
    collection="opendb-city-china"
    field="code as value, name as text"
    where="eq(type, 2)"
    orderby="code asc"
    :page-size="50"
    empty-text="暂无城市数据"
  />
</template>

<script setup lang="ts">
const cityCode = ref('110000')
</script>
```

云端查询返回的数据需要包含 `text`、`value` 字段，也可以通过 `field` 设置别名，或结合 `map` 使用自定义字段。

使用云端数据前，需要：

1. 使用 HBuilder 5.32 或更高版本。
2. 为项目关联 uniCloud 服务空间。
3. 配置目标集合的读取权限。

只使用 `localdata` 时不需要关联 uniCloud 服务空间。`localdata` 与 `collection` 同时设置时，优先使用本地数据。

数据格式与查询参数参见 [datacom 组件规范](https://uniapp.dcloud.net.cn/component/datacom.html) 和 [uniCloud Datacom API](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/)。

使用树形或分组查询时，应确保最终返回的数据仍是组件可平铺展示的候选项数组。

## 事件

推荐使用 `v-model` 接收当前值，通过 `change` 获取值和完整数据项。

```vue
<template>
  <uni-data-checkbox
    v-model="value"
    :localdata="options"
    @update:modelValue="onUpdate"
    @change="onChange"
  />
</template>

<script setup lang="ts">
function onUpdate(value : any) {
  console.log('当前值', value)
}

function onChange(event : any) {
  console.log('当前值', event.detail.value)
  console.log('当前数据', event.detail.data)
}
</script>
```

单选模式的 `event.detail.data` 为当前数据项，多选模式为已选数据项数组。

## 自定义样式

组件通过 external class 开放选项样式。样式类写在使用组件的页面中。

```vue
<uni-data-checkbox
  v-model="values"
  :localdata="options"
  multiple
  label-class="choice-label"
  text-class="choice-text"
  checkbox-class="choice-control"
  label-selected-class="choice-label-selected"
  text-selected-class="choice-text-selected"
  checkbox-selected-class="choice-control-selected"
/>
```

```css
.choice-label {
  margin-right: 16px;
}

.choice-text {
  font-size: 15px;
}

.choice-text-selected {
  color: #007aff;
}

@media (prefers-color-scheme: dark) {
  .choice-text-selected {
    color: #91caff;
  }
}
```

组件提供浅色和暗黑模式默认样式。自定义颜色时，应同时为浅色和暗黑模式设置合适的文字、背景和状态颜色，并检查默认、选中、禁用三种状态。

## 注意事项

- 不要同时使用 `value` 和 `v-model` 设置不同的值。需要双向绑定时使用 `v-model`。
- 单选绑定值必须与数据项 `value` 类型一致；多选数组中的每一项也必须与对应 `value` 类型一致。例如数字 `1` 与字符串 `'1'` 是不同的值。
- `value` 应在候选数据中保持唯一，否则选中状态和事件数据可能不明确。
- `multiple` 为 `true` 时，绑定值应始终使用数组，包括没有选中项时的空数组 `[]`。
- 多选数据项设置 `selected: true` 时，空数组会按 `selected` 初始化；需要保持空选状态时，不要设置该字段。
- 建议保证 `0 <= min <= max`，并确保初始值数量符合限制。
- `localdata` 使用响应式数组时，更新选项文字、禁用状态或字段映射会同步刷新展示。
- 自定义选中态颜色时，需要同时检查禁用项，避免禁用项呈现为可操作状态。



### 兼容性 <Help />
Web: 5.33; 微信小程序: 5.33; 支付宝小程序: 5.33; Android: 5.33; iOS: 5.33; HarmonyOS: 5.33


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| mode | string | "default" | 展示模式 |
| multiple | boolean | false | 是否启用多选 |
| value | Array \| string \| number | "" | 当前值的兼容属性，推荐使用 v-model；组件更新时只触发 update:modelValue |
| modelValue | Array \| string \| number | "" | v-model 绑定值；单选为字符串或数字，多选为数组 |
| localdata | Array | \[\] | 本地候选数据；数据项默认使用 text、value、disabled、disable、selected 字段 |
| min | number \| string | "" | 多选模式的最少选择数量 |
| max | number \| string | "" | 多选模式的最多选择数量 |
| icon | string | "left" | 选中标记位置 |
| emptyText | string | "暂无数据" | 云端数据为空时显示的文字 |
| map | object | {"text":"text","value":"value"} | 自定义候选数据的文字字段和值字段 |
| disabled | boolean | false | 是否禁用全部选项 |
| labelClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 每个选项外层容器的自定义样式类 |
| textClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 每个选项文字的自定义样式类 |
| checkboxClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 左侧单选或复选控件的自定义样式类 |
| labelSelectedClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 已选项外层容器的自定义样式类 |
| textSelectedClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 已选项文字的自定义样式类 |
| checkboxSelectedClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 已选单选或复选控件的自定义样式类 |
| iconClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | icon 为 right 时右侧选中标记的自定义样式类 |
| emptyTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 云端数据为空或加载失败提示文字的自定义样式类 |
| collection | string | "" | uniCloud 数据库集合名称；设置后且未提供 localdata 时使用云端数据，需要 HBuilder 5.32 或更高版本并关联服务空间 |
| options | object \| Array |   |   |
| action | string |   |   |
| field | string |   |   |
| where | string \| object |   |   |
| orderby | string |   |   |
| pageData | string |   |  |
| pageCurrent | number |   |   |
| pageSize | number |   |   |
| getcount | boolean \| string |   |   |
| gettree | boolean \| string |   |   |
| gettreepath | boolean \| string |   |   |
| startwith | string |   |   |
| limitlevel | number |   |   |
| groupby | string |   |   |
| groupField | string |   |   |
| distinct | boolean \| string |   |   |
| manual | boolean |   |   |
| @change | Function |   | 用户选择变化时触发；event.detail.value 为当前值，event.detail.data 为当前完整数据项 |
| @update:modelValue | Event |   | 用户选择变化时更新绑定值；单选参数为字符串或数字，多选参数为数组 |

#### mode 的属性描述

| 合法值 | 描述 |
| :- | :- |
| default | 默认平铺模式 |
| list | 纵向列表模式 |
| button | 分段按钮模式 |
| tag | 标签模式 |

#### multiple 的属性描述

| 合法值 |
| :- |
| true |
| false |

#### icon 的属性描述

| 合法值 | 描述 |
| :- | :- |
| left | 在选项左侧显示原生选择控件 |
| right | 隐藏左侧选择控件，在选项右侧显示选中标记 |

#### pageData 的属性描述

| 合法值 | 描述 |
| :- | :- |
| add | 追加到已有数据 |
| replace | 替换已有数据 |

<!-- UTSCOMJSON.uni-data-checkbox.fileFormates -->



<!-- UTSCOMJSON.uni-data-checkbox.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/data-checkbox/data-checkbox.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/data-checkbox/data-checkbox.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/data-checkbox/data-checkbox

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/data-checkbox/data-checkbox

>示例
```vue
<template>
	<scroll-view class="page" :class="{ 'page-dark': isDarkMode }">
		<view class="intro">
			<text class="page-title">uni-data-checkbox 数据选择器</text>
			<text class="page-desc">使用本地数据完成单选、多选、选择约束和多种展示模式，并通过 external class 调整选项样式。</text>
		</view>

		<view class="group-header">
			<text class="group-title">基础用法</text>
		</view>

		<view class="section">
			<text class="section-title">单选与事件</text>
			<text class="section-desc">数字 0 作为有效默认值，同时监听 modelValue 和 change。</text>
			<uni-data-checkbox
				v-model="sexValue"
				:localdata="sex"
				label-class="demo-inline-label"
				label-selected-class="test-zero-selected"
				@update:modelValue="onUpdate"
				@change="onChange"
			/>
			<view class="result-block">
				<text class="result-text">当前值：{{ sexValue }}</text>
				<text class="event-text">最近事件：{{ latestEvent }}</text>
			</view>
		</view>

		<view class="section">
			<text class="section-title">多选与事件</text>
			<text class="section-desc">支持数组模型和默认选中项。</text>
			<uni-data-checkbox
				v-model="sexMultiValue"
				:localdata="hobby"
				multiple
				label-class="demo-inline-label"
				text-class="test-dynamic-text"
				@update:modelValue="onMultiUpdate"
				@change="onMultiChange"
			/>
			<view class="result-block">
				<text class="result-text">当前值：{{ JSON.stringify(sexMultiValue) }}</text>
				<text class="event-text">最近事件：{{ latestMultiEvent }}</text>
			</view>
		</view>

		<view class="section">
			<text class="section-title">选择数量限制</text>
			<text class="section-desc">最多选择 3 项，数据中的 disable 可单独禁用选项。</text>
			<uni-data-checkbox
				v-model="sexMultiMaxValue"
				:localdata="hobbyMore"
				:max="3"
				multiple
				label-class="demo-inline-label"
			/>
			<text class="result-text result-standalone">当前值：{{ JSON.stringify(sexMultiMaxValue) }}</text>
		</view>

		<view class="group-header">
			<text class="group-title">展示模式</text>
		</view>

		<view class="section">
			<text class="section-title">Button 模式</text>
			<uni-data-checkbox v-model="buttonValue" mode="button" :localdata="buttonOptions" />
			<text class="result-text result-standalone">当前值：{{ buttonValue }}</text>
		</view>

		<view class="section">
			<text class="section-title">Tag 模式与字段映射</text>
			<text class="section-desc">使用 map 映射 name/code 字段，并限制选择 1 至 3 项。</text>
			<uni-data-checkbox
				v-model="tagValue"
				mode="tag"
				multiple
				:localdata="mappedOptions"
				:map="mappedFields"
				:min="1"
				:max="3"
				label-class="demo-tag-label"
				text-class="demo-tag-text test-map-text"
			/>
			<text class="result-text result-standalone">当前值：{{ JSON.stringify(tagValue) }}</text>
		</view>

		<view class="section">
			<text class="section-title">List 模式与图标位置</text>
			<text class="subsection-title">默认图标</text>
			<view class="list-frame">
				<uni-data-checkbox
					v-model="listValue"
					mode="list"
					:localdata="hobby"
					label-class="demo-list-label"
					text-class="demo-list-text"
					label-selected-class="demo-list-selected"
					icon-class="demo-right-icon"
				/>
			</view>

			<text class="subsection-title subsection-spaced">右侧对勾</text>
			<view class="list-frame">
				<uni-data-checkbox
					v-model="listRightValue"
					mode="list"
					icon="right"
					:localdata="hobby"
					label-class="demo-list-label"
					text-class="demo-list-text"
					label-selected-class="demo-list-selected"
					icon-class="demo-right-icon"
				/>
			</view>

			<text class="subsection-title subsection-spaced">左右对齐</text>
			<view class="list-frame">
				<uni-data-checkbox
					v-model="listAlignValue"
					mode="list"
					:localdata="alignOptions"
					label-class="demo-list-label demo-list-align"
					text-class="demo-list-text-align"
					label-selected-class="demo-list-selected"
					text-selected-class="demo-list-text-selected"
				/>
			</view>
		</view>

		<view class="group-header">
			<text class="group-title">状态与样式</text>
		</view>

		<view class="section section-last">
			<text class="section-title">禁用状态与外部样式</text>
			<text class="section-desc">组合全局 disabled、数据项 disabled、min/max 与 external class。</text>
			<uni-data-checkbox
				v-model="disabledValues"
				multiple
				:localdata="disabledOptions"
				:min="1"
				:max="2"
				disabled
				empty-text="暂无可选数据"
				empty-text-class="demo-empty-text"
				label-class="demo-inline-label"
				label-selected-class="test-default-selected"
			/>
			<text class="result-text result-standalone">当前值：{{ JSON.stringify(disabledValues) }}</text>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import { state } from '@/store/index.ts'

const isDarkMode = computed(() : boolean => state.isDarkMode)

function syncNavigationBar() : void {
	// #ifdef APP
	const dark = isDarkMode.value
	uni.setNavigationBarColor({
		frontColor: dark ? '#ffffff' : '#000000',
		backgroundColor: dark ? '#1a1a1a' : '#efeff4'
	})
	// #endif
}

watch(isDarkMode, syncNavigationBar, { immediate: true })
onShow(syncNavigationBar)

const sex = [
	{ text: '男', value: 0 },
	{ text: '女', value: 1 },
	{ text: '未知', value: 2 }
]
const hobby = reactive([
	{ text: '足球', value: 0 },
	{ text: '篮球', value: 1 },
	{ text: '游泳', value: 2 }
])
const buttonOptions = [
	{ text: '选项一', value: 'normal' },
	{ text: '选项二', value: 'other' },
	{ text: '选项三', value: 'third' }
]
const mappedOptions = [
	{ name: '流行', code: 'pop', label: 'POP', id: 'p' },
	{ name: '摇滚', code: 'rock', label: 'ROCK', id: 'r' },
	{ name: '爵士', code: 'jazz', label: 'JAZZ', id: 'j' },
	{ name: '蓝调', code: 'blues', label: 'BLUES', id: 'b' },
	{ name: '古典', code: 'classic', label: 'CLASSIC', id: 'c' }
]
const disabledOptions = [
	{ text: '固定选中', value: 'fixed', selected: true },
	{ text: '不可用', value: 'unavailable', disabled: true },
	{ text: '普通选项', value: 'available' }
]

const sexValue = ref(0)
const sexMultiValue = ref([1])
const sexMultiMaxValue = ref([])
const hobbyMore = [
	{ text: '足球', value: 0 },
	{ text: '篮球', value: 1 },
	{ text: '游泳', value: 2 },
	{ text: '乒乓球', value: 3 },
	{ text: '羽毛球', value: 4 },
	{ text: '网球', value: 5, disable: true }
]
const buttonValue = ref('normal')
const tagValue = ref(['pop'])
const listValue = ref(1)
const listRightValue = ref(1)
const alignOptions = [
	{ text: '50毫秒', value: 50 },
	{ text: '200毫秒', value: 200 },
	{ text: '400毫秒', value: 400 }
]
const listAlignValue = ref(200)
const disabledValues = ref([])
const mappedFields = reactive({ text: 'name', value: 'code' })
const latestEvent = ref('未触发')
const latestMultiEvent = ref('未触发')

const onUpdate = (event) => {
	latestEvent.value = 'update:modelValue：' + JSON.stringify(event)
	console.log('onUpdate:', event)
}
const onChange = (event) => {
	latestEvent.value = 'change：' + JSON.stringify(event.detail.value)
	console.log('onChange:', event)
}
const onMultiUpdate = (event) => {
	latestMultiEvent.value = 'update:modelValue：' + JSON.stringify(event)
	console.log('onMultiUpdate:', event)
}
const onMultiChange = (event) => {
	latestMultiEvent.value = 'change：' + JSON.stringify(event.detail.value)
	console.log('onMultiChange:', event)
}

const clearDisabledValues = () => {
	disabledValues.value = []
}

const updateFirstHobby = () => {
	hobby[0].text = '足球（已更新）'
}

const useAlternateMap = () => {
	mappedFields.text = 'label'
	mappedFields.value = 'id'
}

defineExpose({
	clearDisabledValues,
	updateFirstHobby,
	useAlternateMap
})
</script>

<style>
.page {
	flex: 1;
	background-color: var(--background-color, #f5f5f5);
	--data-checkbox-demo-error-color: #dd524d;
}

.page-dark {
	--data-checkbox-demo-error-color: #ff7875;
}

.intro {
	padding: 18px 16px;
	background-color: var(--content-background-color, #ffffff);
}

.page-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--text-color, #222222);
}

.page-desc {
	margin-top: 8px;
	font-size: 14px;
	line-height: 21px;
	color: var(--secondary-text-color, #657180);
}

.group-header {
	padding: 18px 16px 6px;
}

.group-title {
	font-size: 14px;
	font-weight: bold;
	color: var(--secondary-text-color, #657180);
}

.section {
	padding: 16px;
	margin-top: 10px;
	background-color: var(--content-background-color, #ffffff);
}

.section-last {
	padding-bottom: 32px;
}

.section-title {
	margin-bottom: 12px;
	font-size: 16px;
	font-weight: bold;
	color: var(--text-color, #333333);
}

.section-desc {
	margin-top: -4px;
	margin-bottom: 12px;
	font-size: 13px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

.subsection-title {
	margin-bottom: 8px;
	font-size: 13px;
	font-weight: bold;
	color: var(--secondary-text-color, #657180);
}

.subsection-spaced {
	margin-top: 18px;
}

.result-block,
.result-standalone {
	margin-top: 10px;
}

.result-block {
	flex-direction: column;
}

.result-text,
.event-text {
	font-size: 13px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

.event-text {
	margin-top: 2px;
}

.list-frame {
	border-width: 1px;
	border-style: solid;
	border-color: var(--divider-color, #e2e5e9);
	border-radius: 6px;
	overflow: hidden;
}

.demo-inline-label {
	margin-right: 20px;
	margin-bottom: 8px;
}

.demo-tag-label {
	margin-right: 8px;
	margin-bottom: 8px;
	border-radius: 6px;
}

.demo-tag-text {
	font-size: 14px;
}

.demo-list-label {
	padding-left: 12px;
	padding-right: 12px;
}

.demo-list-text {
	flex: 1;
}

.demo-list-align {
	justify-content: space-between;
}

.demo-list-text-align {
	flex: 1;
	text-align: right;
}

.demo-list-selected {
	background-color: var(--active-background-color, #f2f7ff);
}

.demo-list-text-selected {
	color: var(--tips-color, #007aff);
}

.demo-right-icon {
	width: 7px;
	height: 13px;
}

.demo-empty-text {
	color: var(--data-checkbox-demo-error-color, #dd524d);
}

@media (prefers-color-scheme: dark) {
	.page {
		--data-checkbox-demo-error-color: #ff7875;
	}
}
</style>

```

:::


