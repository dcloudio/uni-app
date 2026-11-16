# uni-calendar-view 日历视图组件

## 用途和场景

uni-calendar-view 用于页面中内嵌的日历。

支持左右拖动切换前后月份，支持选择月份、选择日期、限制可选日期范围、节假日高亮，并支持在日期数字上方、下方显示扩展文字（如农历、节气、节日、入住/离店等）。
示例页面中提供了万年历（含数据）。

内置多语言，内置复用、拍平等高性能方案。

## 使用方式（职责分工）

- 组件内部负责：渲染日历网格、月份切换与滑动、日期选中态、今天与节假日高亮、按语言适配星期标题与一周起始日；对 `day-extras`、`holidays` 建立 O(1) 预索引，切换月份不重复构建。
- 使用者负责：
  - 通过 `v-model` 绑定选中日期（格式 `YYYY-MM-DD`）。
  - 按需传入节假日日期列表（`holidays`）。因中国大陆地区每年的节假日不同，一般需等待政府公布下一年放假通知后更新数据。
  - 按需传入日期附加文字（`day-extras`），只携带数据、不携带样式。
  - 通过外部样式类定制各区域外观。
  - 通过组件 ref 调用对外方法。

## 基本用法

```html
<template>
  <uni-calendar-view v-model="selectedDate" @change="onChange" @month-change="onMonthChange" />
</template>

<script setup lang="ts">
  const selectedDate = ref('2026-11-08')

  function onChange(date : string) {
    console.log('选中日期：', date)
  }

  function onMonthChange(year : number, month : number) {
    console.log('当前月份：', year, month)
  }
</script>
```

## 自定义样式

组件的年月标题、切换箭头、星期行、星期项、日期、选中态、今天、以及日期上下方文字，均通过外部样式类定制：

```html
<uni-calendar-view
  v-model="selectedDate"
  year-month-class="custom-year-month"
  year-month-arrow-class="custom-arrow"
  week-class="custom-week"
  week-item-class="custom-week-item"
  day-class="custom-day"
  day-selected-class="custom-day-selected"
  today-class="custom-today" />
```

```css
.custom-year-month {
  color: #7c3aed;
  font-weight: bold;
}

.custom-arrow {
  color: #7c3aed;
}

.custom-week {
  background-color: #f3e8ff;
}

.custom-week-item {
  color: #7c3aed;
}

.custom-day-selected {
  background-color: #7c3aed;
  color: #ffffff;
  border-radius: 8px;
}

/* 今天默认高亮，通过 today-class 覆盖 */
.custom-today {
  font-weight: bold;
  color: #ff5500;
}
```

## 日期上下方文字

通过 `day-extras` 可以在日期数字的上方、下方显示自定义文字，适用于农历、节日、活动等场景。该属性只承载数据，文字样式通过 `day-top-class`、`day-bottom-class` 定制，单元格样式通过 `day-wrap-class` 定制。

`CalendarDayExtra` 结构：

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 日期，格式 `YYYY-MM-DD` |
| top | string | 日期数字上方显示的文字 |
| bottom | string | 日期数字下方显示的文字 |

```html
<uni-calendar-view
  v-model="selectedDate"
  :day-extras="dayExtras"
  day-wrap-class="custom-day-wrap"
  day-top-class="custom-day-top"
  day-bottom-class="custom-day-bottom" />
```

```ts
type CalendarDayExtra = {
  date : string
  top ?: string
  bottom ?: string
}

const dayExtras : CalendarDayExtra[] = [
  { date: '2026-11-26', top: '感恩节', bottom: '初八' },
  { date: '2026-11-27', bottom: '初九' }
]
```

说明：

- 未传 `day-extras` 或数组为空时，组件保持单个 `text` 拍平渲染，不产生额外节点；传入后按日期预索引（Map），索引仅在数据变化时构建一次，切换月份不会重复构建。
- 传入 `day-extras` 时，选中态样式应用于整个日期单元格，选中日期的数字与上下方文字默认显示为白色，可通过 `day-selected-class`、`day-top-class`、`day-bottom-class` 覆盖。
- 上方、下方文字默认单行显示，超出单元格宽度的部分会被省略。
- `day-wrap-class` 仅在传入 `day-extras` 时生效，通过它可以调整单元格高度。
- `day-extras` 采用浅侦听刷新，变化后需整体替换数组（如 `dayExtras.value = [...]`）才会触发日历刷新；原地修改数组内元素不会自动刷新。

### 数据量大时（分批加载）

组件一次只渲染当前显示月份及前后各一个月，`day-extras` 只需要覆盖这 3 个月（约 126 个日期）。数据量很大时（如多年农历、房价数据），不建议一次性传入全量数据，推荐只传当前月份前后各一个月，并在 `month-change` 事件中整体替换数组：

```html
<uni-calendar-view v-model="selectedDate" :day-extras="dayExtras" @month-change="onMonthChange" />
```

```ts
const dayExtras = ref<CalendarDayExtra[]>([])

function loadExtras(year : number, month : number) {
  const list : CalendarDayExtra[] = []
  // 组装 year-month 所在月份及前后各一个月的数据（本地计算或按需从接口/缓存读取）
  dayExtras.value = list
}

function onMonthChange(year : number, month : number) {
  loadExtras(year, month)
}

const today = new Date()
loadExtras(today.getFullYear(), today.getMonth() + 1)
```

### 追加中国法定节假日数据

中国法定节假日的放假安排（含调休）每年由国务院公布，无法通过算法推导，需要按年录入。推荐将每个年份的放假日期维护为独立的 `CalendarDayExtra` 数组，再合并进 `day-extras`：

```ts
// 官方通知发布后，按格式新增对应年份的数据
// top 用节日名或统一标记（如“休”），bottom 无需填写（由农历/节气自动生成）
const statutoryHolidays2026 : CalendarDayExtra[] = [
  { date: '2026-01-01', top: '元旦' },
  { date: '2026-01-02', top: '休' },
  { date: '2026-02-17', top: '春节' },
  // ...
]

// 汇总所有已录入年份，新年份在拼接处追加，如 statutoryHolidays2026.concat(statutoryHolidays2027)
const statutoryHolidays : CalendarDayExtra[] = statutoryHolidays2026
```

说明：

- 数据以中国政府通知为准，需每年关注并追加新年份，历史年份无需改动、可独立维护。
- 建议结合上一节的按需加载：只将当前显示月份附近的法定日期合并进 `day-extras`，避免随年份累积后数据量越来越大。
- 调休补班日（如春节前后需要在周末上班的日期）如需标注，可在数据中以“班”等标记追加。

## 限制可选范围与节假日

```html
<uni-calendar-view
  :model-value="selectedDate"
  :min-date="minDate"
  :max-date="maxDate"
  :holidays="holidays"
  @change="onChange"
/>
```

```ts
const minDate = '2026-11-01'
const maxDate = '2026-12-31'
const holidays = ['2026-11-26', '2026-11-27']
```

## 日期范围选择

设置 `range` 后进入范围选择模式。用 `v-model:range-start`、`v-model:range-end` 双向绑定首尾日期；开启范围模式后 `modelValue` 与 `change` 不再生效，统一使用 `range-change` 判断是否完成选择。

选择规则：

- 首次点击设置开始日期。
- 已有开始日期时，点击更晚的日期设置结束日期；点击更早的日期会把开始日期前移。
- 首尾都已选择时，点击区间端点以外的任意日期会重新开始选择；点击结束日期会取消结束日期，回到只选开始的状态。
- 点击已选中的开始日期不会清空，避免误触；清空请调用 `clearRange()` 或由外层提供清空按钮。

```html
<uni-calendar-view
  range
  v-model:range-start="rangeStart"
  v-model:range-end="rangeEnd"
  range-start-label="入住"
  range-end-label="离店"
  :min-date="minDate"
  :max-date="maxDate"
  range-class="custom-range"
  @range-change="onRangeChange" />
```

```ts
const rangeStart = ref('')
const rangeEnd = ref('')

function onRangeChange(start : string, end : string) {
  // start、end 同时非空表示范围选择完成
  if (start.length > 0 && end.length > 0) {
    console.log('选择完成：', start, end)
  }
}
```

### 首尾标签

首尾日期上方可以显示标签，例如入住、离店。有两种方式：

1. 使用 `range-start-label`、`range-end-label` 传入纯文本。
2. 使用 `range-start`、`range-end` 插槽完全自定义内容，插槽参数为 `{ date, start, end }`。

插槽优先于文案属性。标签与 `day-extras` 的 `top` 文字冲突时，标签优先，该日期格不显示 `topText`，`bottomText` 不受影响；标签与上方附加文字同高，不会改变日期网格高度。

```html
<uni-calendar-view range v-model:range-start="rangeStart" v-model:range-end="rangeEnd">
  <template #range-start="slotProps">
    <text class="my-range-label">入住</text>
  </template>
  <template #range-end="slotProps">
    <text class="my-range-label">离店</text>
  </template>
</uni-calendar-view>
```

### 区间样式

- 首尾日期复用选中样式，可通过 `day-selected-class` 定制。
- 中间日期（不含首尾）默认使用浅色背景，可通过 `range-class` 覆盖背景色。
- 首尾标签容器可通过 `range-label-class` 定制。
- 中间日期若被 `min-date`、`max-date` 判定为禁用，不绘制区间背景，也不会阻断首尾选择。业务上若要求区间连通，请使用 `min-date`、`max-date` 约束，而不是依赖禁用日期。

```css
.custom-range {
  background-color: rgba(124, 58, 237, 0.16);
}
```

### 范围相关方法

```ts
const calendarRef = ref<CallEasyMethodComponentPublicInstance | null>(null)

// 整体设置范围；非法日期会被置空，开始日期晚于结束日期时丢弃结束日期
calendarRef.value?.setRange('2026-11-10', '2026-11-20')

// 清空范围
calendarRef.value?.clearRange()

// 读取范围，返回 { start, end }
const range = calendarRef.value?.getRange()
```

说明：

- 外部修改 `range-start`、`range-end` 时只更新高亮，不主动切换月份。
- `min-date`、`max-date` 变化后，已越界的范围端点会被清空并触发对应更新事件。
- 两个日历共享同一份 `range-start`、`range-end` 时，可以分别在两个日历中选择开始和结束日期。
- `goToDate()` 在范围模式下会跳转到目标日期所在月份，并当作一次普通点击处理。

## 切换语言与一周起始日

不传 `locale` 时跟随系统语言，内置以下语言，组件根据 `locale` 属性或系统语言自动切换月份名称、星期缩写和一周起始日：

中文简体（zh-Hans）、中文繁体（zh-Hant）、英文（en）、法文（fr）、拉丁文（la）、日文（ja）、韩文（ko）、德文（de）、印尼（id）、马来（ms）、意大利（it）、葡萄牙（pt）、俄语（ru）、泰语（th）、越南语（vi）、阿拉伯语（ar）、土耳其语（tr）。

```html
<!-- 指定语言，一周起始日跟随语言自动适配 -->
<uni-calendar-view v-model="selectedDate" locale="fr" />

<!-- 指定周一开始 -->
<uni-calendar-view v-model="selectedDate" :week-start="1" />
```

星期标题行固定显示；今天默认高亮，可通过 `today-class` 自定义高亮样式。

## 调用组件方法

```html
<uni-calendar-view ref="calendarRef" v-model="selectedDate" />
<button @click="goPrev">上一月</button>
<button @click="jump">跳到指定日期</button>
```

```ts
const calendarRef = ref<CallEasyMethodComponentPublicInstance | null>(null)

function goPrev() {
  calendarRef.value?.prevMonth()
}

function jump() {
  calendarRef.value?.goToDate('2026-12-25')
}
```

## 注意事项

- `day-extras` 数据量较大时请配合 `month-change` 分批加载，避免首次加载准备与传输开销过大。
- `day-extras`、`holidays` 变化后需整体替换数组才会刷新，原地修改数组内元素不会触发刷新。
- 范围模式下不会触发 `change` 与 `update:modelValue`，请使用 `range-change`、`update:range-start`、`update:range-end`。
- `range-start-label`、`range-end-label` 的文案由使用者传入，组件不做国际化，便于按业务显示入住、离店等自定义文字。
