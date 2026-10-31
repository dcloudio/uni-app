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
