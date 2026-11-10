# uni-calendar-view 日历视图组件

uni-calendar-view 用于页面中内嵌的日历。

支持左右拖动切换前后月份。支持多语言。支持在日期上下显示扩展文字。

内置复用、拍平等高性能方案。

组件支持节假日红色显示，但需要使用者传入节假日数据。因中国大陆地区每年的节假日不同，一般需等待政府公布下一年放假通知后更新数据。

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | string | "" | 选中日期，格式 `YYYY-MM-DD`，支持 `v-model` |
| date | string | "" | 初始显示的月份，格式 `YYYY-MM` 或 `YYYY-MM-DD`；为空时依次取 modelValue 所在月份、当前月份 |
| minDate | string | "" | 可选的最小日期，格式 `YYYY-MM-DD`，早于该日期的日期置灰且不可点击 |
| maxDate | string | "" | 可选的最大日期，格式 `YYYY-MM-DD`，晚于该日期的日期置灰且不可点击 |
| holidays | Array\<string> | [] | 节假日日期列表，格式 `YYYY-MM-DD`，命中的日期高亮显示 |
| locale | string | "" | 语言标识，如 `zh-Hans`、`zh-Hant`、`en`、`fr`、`ja` 等；为空时跟随系统语言 |
| weekStart | number | -1 | 一周的起始日，0 为周日、1 为周一，以此类推；-1 表示按语言自动适配 |
| dayExtras | Array\<CalendarDayExtra> | [] | 日期附加文字列表，用于在日期数字上方、下方显示农历、节日等文字，仅携带数据 |
| yearMonthClass | string | "" | 年月标题的自定义样式类 |
| yearMonthArrowClass | string | "" | 年月标题左右箭头的自定义样式类 |
| weekClass | string | "" | 星期标题行容器的自定义样式类 |
| weekItemClass | string | "" | 星期标题项的自定义样式类 |
| dayClass | string | "" | 日期数字的自定义样式类，作用于所有日期 |
| daySelectedClass | string | "" | 选中日期的自定义样式类，用于覆盖默认选中样式；未传 dayExtras 时作用于日期数字，传入 dayExtras 时作用于整个日期单元格（含上下方文字） |
| todayClass | string | "" | 今天日期的自定义样式类，用于覆盖默认今天高亮样式 |
| dayWrapClass | string | "" | 日期单元格容器的自定义样式类，仅在传入 dayExtras 时生效 |
| dayTopClass | string | "" | 日期数字上方文字的自定义样式类 |
| dayBottomClass | string | "" | 日期数字下方文字的自定义样式类 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中日期变化时触发，用于 `v-model` 双向绑定 | date: string - 选中的日期，格式 `YYYY-MM-DD` |
| change | 点击选择日期时触发 | date: string - 选中的日期，格式 `YYYY-MM-DD` |
| month-change | 当前显示月份变化时触发（切换箭头、滑动、选择月份、方法跳转） | year: number - 当前年份；month: number - 当前月份，1-12 |

## 方法

通过组件 ref 调用。

| 方法名 | 说明 | 参数 |
|--------|------|------|
| prevMonth | 切换到上一个月 | - |
| nextMonth | 切换到下一个月 | - |
| goToMonth | 跳转到指定年月 | year: number, month: number |
| goToDate | 选中并跳转到指定日期 | date: string，格式 `YYYY-MM-DD` |
| getSelectedDate | 获取当前选中日期，未选中时返回空字符串 | - |

## 外部样式类

| 类名 | 说明 |
|------|------|
| year-month-class | 年月标题文本 |
| year-month-arrow-class | 年月标题左右箭头 |
| week-class | 星期标题行容器 |
| week-item-class | 星期标题项 |
| day-class | 所有日期数字 |
| day-selected-class | 选中日期；未传 day-extras 时为日期数字，传入 day-extras 时为整个日期单元格（含上下方文字） |
| today-class | 今天日期数字，今天默认高亮 |
| day-wrap-class | 日期单元格容器，仅在传入 day-extras 时生效 |
| day-top-class | 日期数字上方文字 |
| day-bottom-class | 日期数字下方文字 |

## 国际化

内置以下语言，组件根据 `locale` 属性或系统语言自动切换月份名称、星期缩写和一周起始日：

中文简体（zh-Hans）、中文繁体（zh-Hant）、英文（en）、法文（fr）、拉丁文（la）、日文（ja）、韩文（ko）、德文（de）、印尼（id）、马来（ms）、意大利（it）、葡萄牙（pt）、俄语（ru）、泰语（th）、越南语（vi）、阿拉伯语（ar）、土耳其语（tr）。

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

```html
<uni-calendar-view
  v-model="selectedDate"
  year-month-class="custom-year-month"
  year-month-arrow-class="custom-arrow"
  week-class="custom-week"
  week-item-class="custom-week-item"
  day-class="custom-day"
  day-selected-class="custom-day-selected"
  today-class="custom-today"
/>
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
  day-bottom-class="custom-day-bottom"
/>
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

```css
/* 单元格容器，可调整高度、对齐等（默认高度 60px） */
.custom-day-wrap {
  height: 72px;
}

.custom-day-top {
  font-size: 10px;
  color: #ff5500;
}

.custom-day-bottom {
  font-size: 10px;
  color: #999999;
}
```

说明：

- 未传 `day-extras` 或数组为空时，组件保持单个 `text` 拍平渲染，不产生额外节点；传入后按日期预索引（Map），渲染阶段无额外查找计算，上方、下方文字均为拍平的单层 `text`，兼顾性能与自定义能力。
- 传入 `day-extras` 时，选中态样式应用于整个日期单元格（与点击单元一致），选中日期的数字与上下方文字默认显示为白色，可通过 `day-selected-class`、`day-top-class`、`day-bottom-class` 覆盖。
- 上方、下方文字默认单行显示，超出单元格宽度的部分会被省略。
- `day-wrap-class` 仅在传入 `day-extras` 时生效，通过它可以调整单元格高度；App 平台下日历整体高度通过 swiper 的 `auto-height` 自动跟随单元格高度，其他平台（Web、小程序）受 swiper-item 绝对定位限制，组件会在渲染后按日期网格的实际高度自动校正日历高度（默认 60px 单元格时为 360px），日期点击的命中位置始终与视觉单元格一致。
- `dayExtras` 变化后组件会自动刷新日历数据，可按需动态更新文字。

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

## 切换语言与一周起始日

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
