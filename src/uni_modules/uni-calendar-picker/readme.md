# uni-calendar-picker 日期选择器

uni-calendar-picker 是基于 uni-calendar-view 封装的日期选择器组件。

## 用途和场景

uni-calendar-picker 用于从页面触发区打开日历弹层选择日期，支持单日选择与首尾日期范围选择。

相比系统内置 picker 的日期模式，它更适合以下场景：

- 手机端需要接近全屏的日历弹层，方便点选。
- 需要在一个控件内完成入住/离店、开始/结束等日期范围选择，无需连续弹出两次选择器。
- 需要快捷选择（近 7 天、本周、本月等）、节假日高亮、日期附加文字。

弹层在手机端（App、小程序，含宽屏与 Pad）统一从底部升起；仅 Web 宽屏（宽度不小于 700px）弹层锚定在触发区下方展示，空间不足时自动改到触发区上方。

范围选择时有两个日历视图，宽屏时横排、窄屏时竖排。

组件默认为点击日期就关闭弹层。如果设置 confirm 属性，则会显示确定按钮。

## 使用方式（职责分工）

- 组件内部负责：
  - 渲染触发区与弹层，处理遮罩、打开/关闭动画、返回键关闭。
  - 手机端下拉关闭、Web 端 `Esc` 关闭与触发区键盘操作。
  - 单日选择与范围选择的状态管理。
  - 范围模式下给两个日历绑定同一份首尾日期，并让两个日历各自独立翻月。
  - 微信小程序下同名插槽只允许出现一个，组件会按当前展示月份把范围首尾插槽自动路由到对应日历，翻月改变归属后标签自动跟随。
  - Web 宽屏弹层自动锚定触发区、避让视口边缘并限制最大高度。
  - 选择完成后的自动关闭；确认模式（`confirm`）下的底部预览、确定/取消按钮与内置五种语言按钮文案。
  - 窄屏范围模式在空间足够时缩小日期单元格高度，同时完整展示两个日历。
- 使用者负责：
  - 通过 `v-model` 绑定单日日期，或通过 `v-model:range-start`、`v-model:range-end` 绑定范围首尾。
  - 传入 `placeholder`、`title`、首尾标签文字等所有界面文案；组件不包含固定文案。
  - 按需传入 `min-date`、`max-date`、`holidays`、`day-extras`、`locale`、`week-start`，组件会透传给内部的日历视图。
  - 通过插槽自定义触发区、弹层标题、范围首尾标签。
  - 通过外部样式类定制触发区、弹层、遮罩和日历样式。

## 单日选择

```html
<uni-calendar-picker
  v-model="selectedDate"
  placeholder="请选择日期"
  title="选择日期"
  @change="onChange"
  @popupopened="onOpened"
  @popupclosed="onClosed" />
```

```ts
const selectedDate = ref('')

function onChange(value : any) {
  const date = value as string
  console.log('选中日期：', date)
}
```

点击日期即完成选择并自动关闭弹层。`change` 的单选参数为 `YYYY-MM-DD` 字符串；开启 `confirm` 后点击日期仅更新底部预览，点击确定才提交并关闭。

## 范围选择

```html
<uni-calendar-picker
  range
  v-model:range-start="rangeStart"
  v-model:range-end="rangeEnd"
  placeholder="请选择入住和离店日期"
  title="选择日期范围"
  range-start-label="入住"
  range-end-label="离店"
  @change="onRangeChange" />
```

```ts
const rangeStart = ref('')
const rangeEnd = ref('')

function onRangeChange(value : any) {
  const range = value as { start : string, end : string }
  console.log('选择完成：', range.start, range.end)
}
```

范围模式下：

- 弹层内上下排列两个日历（宽屏左右排列），两者共享同一份首尾日期，因此都能完整显示整条区间。
- 可以在一个日历中依次点选开始和结束，也可以在第一个日历选开始、第二个日历选结束。
- 两个日历的年月互不联动，可以各自翻月；切换月份不会改变已选区间。
- `change` 只在开始与结束日期同时存在时触发，参数为 `{ start, end }`；选完结束日期后自动关闭。开启 `confirm` 后改为点击确定才提交并关闭。

## 确认模式

`confirm` 为 `true` 时弹层不会在选择后立即关闭，适合需要"预览 + 确定"两步操作的场景：

```html
<uni-calendar-picker
  range
  confirm
  v-model:range-start="rangeStart"
  v-model:range-end="rangeEnd"
  title="选择日期范围"
  preview-result-class="my-preview"
  preview-result-text-class="my-preview-text"
  @change="onRangeChange" />
```

- 弹层底部显示已选日期预览：单选显示一个日期；范围先显示开始日期，点选结束日期后同时显示结束日期。
- 左上角关闭按钮变为取消文字，右上角新增确定文字，点击确定才提交选择并关闭弹层。
- 确定、取消文字内置简体中文、繁体中文、英文、法文、拉丁文五种语言，按 `locale` 或系统语言自动适配，其余语言回退英文。
- 预览区域支持 `preview-result-class`、`preview-result-text-class` 外部样式类。
- 点取消、遮罩、系统返回键、`Esc` 或下拉关闭时，本次未确认的选择会被丢弃，不会更新 `v-model`；确认按钮在本次选择与已提交值一致时只关闭弹层，不重复触发 `change`。

## 首尾标签

首尾标签有两种方式，插槽优先于文案属性：

```html
<!-- 文案方式 -->
<uni-calendar-picker
  range
  v-model:range-start="rangeStart"
  v-model:range-end="rangeEnd"
  range-start-label="入住"
  range-end-label="离店" />

<!-- 插槽方式，插槽参数为 { date, start, end } -->
<uni-calendar-picker range v-model:range-start="rangeStart" v-model:range-end="rangeEnd">
  <template #range-start="slotProps">
    <text class="my-label">入住</text>
  </template>
  <template #range-end="slotProps">
    <text class="my-label">离店</text>
  </template>
</uni-calendar-picker>
```

标签与 `day-extras` 的 `top` 文字冲突时，标签优先显示。

## 快捷选择

可以通过 `title` 插槽在弹层顶部放置快捷选项。触发快捷选择时更新绑定的 `range-start`、`range-end`，组件会同步到两个日历；如需选择后立即关闭，可调用组件实例的 `close()` 方法，或让使用者自己的按钮逻辑负责关闭。

```html
<uni-calendar-picker ref="pickerRef" range v-model:range-start="rangeStart" v-model:range-end="rangeEnd">
  <template #title>
    <scroll-view direction="horizontal" :show-scrollbar="false">
      <view class="quick-row">
        <text class="quick-item" @click="selectLast7Days">近7天</text>
        <text class="quick-item" @click="selectThisMonth">本月</text>
      </view>
    </scroll-view>
  </template>
</uni-calendar-picker>
```

## 自定义触发区

`default` 插槽可完全替换触发区，插槽参数为 `{ start, end, text }`：

```html
<uni-calendar-picker range v-model:range-start="rangeStart" v-model:range-end="rangeEnd">
  <template #default="slotProps">
    <view class="my-trigger">
      <text>{{ slotProps.text }}</text>
    </view>
  </template>
</uni-calendar-picker>
```

## 自动关闭与关闭方式

- 默认情况下，单日选择后、范围首尾都选好后自动关闭弹层。
- 开启 `confirm` 后进入确认模式，点击确定才提交选择并关闭弹层；其余关闭方式不会提交选择。
- 手机端可下拉弹层关闭；Web 端支持 `Esc` 关闭，触发区支持 `Enter`、空格、`ArrowDown` 打开。
- 组件实例提供 `open()`、`close()`、`clearRange()` 方法。`clearRange()` 在范围模式下清空首尾日期，在单选模式下清空选中日期。

## 区域与外部样式类对照

| 区域 | 外部样式类 |
| --- | --- |
| 触发区（含触发文字与箭头容器） | `input-class` |
| 弹层面板 | `pop-class` |
| 遮罩 | `mask-class` |
| 关闭按钮（确认模式下为取消文字） | `cancel-class` |
| 确认模式底部预览区 | `preview-result-class` |
| 确认模式预览文字 | `preview-result-text-class` |
| 日历年月标题 | `year-month-class` |
| 日历翻月箭头 | `year-month-arrow-class` |
| 日历星期行容器 | `week-class` |
| 日历星期项 | `week-item-class` |
| 日期单元格 | `day-class` |
| 选中日期 | `day-selected-class` |
| 范围区间中段 | `range-class` |
| 范围首尾标签 | `range-label-class` |

说明：

- 表格未列出的区域（如弹层标题、确定按钮文字、日期附加文字）当前不对外开放样式定制。
- 组件内部用于定位、布局的属性（如位置、尺寸、层级）不允许通过外部样式类覆盖，替换时请勿携带此类属性。

## 注意事项与限制

- 组件不包含固定业务文案。`placeholder`、`title`、首尾标签以及快捷选项文字均需使用者传入，以便自行国际化；仅确认模式的确定、取消按钮文字内置五种语言，无需传入。
- `range` 模式下忽略 `v-model`，请改用 `v-model:range-start`、`v-model:range-end`。
- 范围选择不校验区间内部是否存在禁用日期；若业务要求区间连通，请使用 `min-date`、`max-date` 约束可选范围。
- 手机端范围模式在窄屏且空间足够时，会自动缩小日期单元格高度并同时完整展示两个日历（弹层高度提升至 98%）；空间不足或使用范围首尾标签、`day-extras` 时保持滚动布局。
- 使用范围标签插槽时，建议同时提供 `range-start`、`range-end` 两个插槽；只提供其中一个时，另一端不会回退到文案属性，而是显示空标签。若只需要一端自定义、另一端使用文案，请直接使用 `uni-calendar-view`。
- 范围模式下的两个日历初始月份分别为：第一个日历依次取开始日期、结束日期所在月，都为空时取今天所在月；第二个日历优先取结束日期所在月（与开始月相同或结束日期为空时取开始月的下一个月）。之后两者独立翻月。
- 弹层关闭时会卸载内部日历，再次打开时按当前已选日期重新计算初始月份。
