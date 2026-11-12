# 示例页面重构规范

这份规范用于指导 AI 重构 `hello-uni-app-x` 的示例页面。重构时先保持页面的测试数据、事件、属性和导航行为，再调整布局与控件。每次只修改一个页面，完成后检查亮色、暗色和页面已有的自动化测试。

## 组件目录与命名

以下为当前组件的固定归属，重构页面时直接使用，不要重复创建同用途的组件：

| 组件 | 源文件 |
| --- | --- |
| `uni-card` | `components/uni-card/uni-card.uvue` |
| `enum-data-checkbox` | `components/enum-data-checkbox/enum-data-checkbox.uvue` |
| `uni-data-input` | `uni_modules/uni-data-input/components/uni-data-input/uni-data-input.uvue` |
| `uni-data-switch` | `uni_modules/uni-data-switch/components/uni-data-switch/uni-data-switch.uvue` |
| `uni-data-slider` | `uni_modules/uni-data-slider/components/uni-data-slider/uni-data-slider.uvue` |
| `uni-data-combobox` | `uni_modules/uni-data-combobox/components/uni-data-combobox/uni-data-combobox.uvue` |

- `uni-card` 和 `enum-data-checkbox` 保留为项目组件，不迁移到 `uni_modules`。
- 原 `uni-form-input`、`uni-form-switch`、`uni-form-slider` 分别使用 `uni-data-input`、`uni-data-switch`、`uni-data-slider` 替代；原 `uni-form-checkbox` 使用已有的 `enum-data-checkbox` 替代。
- 不新增与 `uni_modules/uni-data-checkbox-x` 中底层 `uni-data-checkbox` 同名的表单封装。普通枚举配置使用 `enum-data-checkbox`。
- 四个 uni-data 插件均遵循 `uni_modules/<插件名>/components/<组件名>/<组件名>.uvue` 的目录结构，包含独立的 `package.json`、`readme.md` 和 `changelog.md`。
- `package.json` 的 `id` 与插件目录名一致，声明实际依赖：input、switch、slider 依赖 `uni-forms-x`，combobox 依赖 `uni-forms-x` 和 `uni-combobox`。不要仅移动源码而遗漏依赖和文档。
- 同一组件名只能有一个实现入口，不保留会与 easycom 自动扫描冲突的旧 `.uvue` 副本。

## 页面结构

- 页面不增加只用于包裹内容的最外层 `view` 或 `scroll-view`。优先使用 `page` 选择器设置页面级样式。
- 一个功能分组使用项目 `components/uni-card/uni-card.uvue`。通过 `title` 设置标题，组件自动使用 `uni-h4` 并将标题放在卡片背景外面，通过默认插槽放置内容：

  ```html
  <uni-card title="分组标题">分组内容</uni-card>
  ```

- 卡片样式由 `uni-card` 组件管理，不再使用旧的全局 `.uni-card` class。不要在页面中重复定义卡片的 padding、圆角、间距和背景色。
- 页面底部安全区由 `common/uni.css` 的 `page` 规则处理：Web 使用 `page::after`，其他平台使用 `padding-bottom`。页面不要用 padding 简写覆盖该规则；需要页内间距时分别设置上、左、右 padding。
- 不使用标题额外 class 或内联颜色；分组层级通过标题、卡片背景和间距表达。

## 颜色和暗黑模式

- 页面背景使用 `page` 选择器和公共主题变量，卡片使用 `--list-background-color`，正文和标题使用 `--text-color`。
- 颜色、边框和占位符优先使用 `common/uni.css` 中已有的语义变量，并提供亮色 fallback。
- 不为普通界面文字直接写固定的 `#333`、`#666`、`#999`、`#fff`；固定颜色只有在示例明确测试颜色属性时才保留。
- 不使用页面状态复制暗黑模式，也不新增 `.uni-theme-root`。暗黑适配使用现有的主题变量和媒体查询规则。
- 亮色和暗色都要检查：页面背景、卡片层级、文字、输入控件、边框、下拉面板和选中状态。
- 公共 css var 在 `common/uni.css` 中定义，页面和组件通过 `var(--变量名)` 使用，确保亮色和暗色模式下的统一样式。

## 控件选择

- 普通参数配置使用下表中的组件。这些组件内部统一组合 `uni-forms-item` 和实际控件，页面通过 `label`（枚举组件为 `title`）与 `v-model` 使用，不再重复组合相同的结构和样式。

  | 场景 | 组件 | v-model 类型 | 默认布局 |
  | --- | --- | --- | --- |
  | 自由文本输入 | `uni-data-input` | `string` | label 在左，透明背景、下边线输入框填满右侧空间 |
  | 布尔值 | `uni-data-switch` | `boolean` | label 在左，原生 switch 靠右 |
  | 枚举单选、多选 | `enum-data-checkbox` | 单选为 `string` 或 `number`，多选为对应值的数组 | title 在上，默认 list 模式 |
  | 有限范围数值、时间 | `uni-data-slider` | `number` | label 在上，slider 在下，默认显示数值 |
  | 颜色等字符串候选 | `uni-data-combobox` | `string` | label 在左，组合框填满右侧空间 |

- `enum-data-checkbox` 通过 `items` 接收 `{ text, value, disabled? }` 选项，兼容旧的 name、label 文案；支持 `multiple` 和 `mode`，不要无条件添加 `icon="right"`。普通参数配置显式设置 `:show-toast="false"`。
- 可调节的数值优先使用 `uni-data-slider`，按属性语义设置 `min`、`max`、`step`。百分比、尺寸、时间等有限范围值不要使用输入框。
- `uni-data-slider` 默认在 `change` 时更新 `v-model`；需要拖动过程中实时更新时设置 `live`，此时组件会在 `changing` 时更新。两种模式都会处理并转发原生 `change`，不额外合成结束事件。
- 颜色选择使用 `uni-data-combobox`，候选数组通过 `options` 提供；不要用输入框模拟颜色下拉。
- 默认颜色候选为 `black`、`white`、`gray`、`red`、`green`、`blue`；示例已有的固定颜色值可以追加保留，不改变原有测试数据。
- 只有需要自由输入文本时才使用 `uni-data-input`。输入框统一使用透明背景和单独的下边线，不使用完整边框模拟卡片。
- 已封装的控件不要再套一层 `uni-forms-item`。组件可以独立用于参数配置；需要表单校验时再置于 `uni-forms` 中，提供 `name` 并绑定相应表单模型。
- 原生 `radio`、`checkbox` 的示例页面如果本身就是测试原生组件，则保留原生结构，不为追求统一而替换。
- 原生 input、switch、slider 等组件及 API 的专门测试同样保留原生结构。封装只用于页面的普通配置控件，不能改变被测对象。

### Slider 更新模式

```html
<!-- 默认：原生 change 发生时更新 -->
<uni-data-slider label="耗时（ms）" v-model="duration" :min="1" :max="100" />

<!-- 实时：changing 过程中也更新，用于需要即时反馈的预览 -->
<uni-data-slider label="进度（%）" v-model="percent" live />
```

`live` 默认为 `false`。需要动态关闭时使用 `:live="false"`，不要传字符串 `"false"`。即使未启用实时回写，页面仍可通过 `@changing` 接收原始事件。

### Combobox 使用约定

- 使用 `uni-data-combobox` 封装好的标签与候选框，不再在页面额外包 `uni-forms-item`。
- 不提供 `input` 插槽时保持默认单选模式；提供该作用域插槽时启用底层的可输可选模式。
- `input` 插槽透传 `value`、`input`、`focus`、`disabled`。自定义输入框绑定插槽值，并将原生 input、focus 事件传给相应回调，不自行维护第二份值。
- `control-id` 和 `id` 都作用于外层表单项，同时提供时 `control-id` 优先。它们不能覆盖底层组合框的内部 ID，否则会破坏下拉面板的位置和宽度。

## 按钮与导航

- 普通操作按钮和导航按钮默认不设置 `type`，不要将一组普通操作都做成蓝色主按钮。
- 只有明确的主操作或告警操作才设置相应 `type`。
- 重构时保留原有导航目标、平台条件与按钮事件，不因布局调整改变功能。

## 数据和事件

- 页面传给封装组件的绑定值、候选选项列表都使用 `ref` 定义。不要把这些配置值混入已有的 `reactive data`，也不要为了使用组件新增一份同步状态。
- 新的 uni-data 组件以 `modelValue` 为数据来源，用户操作后触发 `update:modelValue`；不要通过 watch 和内部 ref 镜像同一个值。原有的 `enum-data-checkbox` 为兼容未绑定模型时的 checked 初始化，保留原有内部 ref。
- `uni-data-input` 的 `v-model` 始终为字符串；即使选择数字键盘，也不自动转为 number。有限范围的数值配置优先使用 `uni-data-slider`。
- 事件参数按下表读取，不要把所有封装组件的事件都当作 `event.detail.value`：

  | 组件 | 事件 | 监听器收到的参数 |
  | --- | --- | --- |
  | `uni-data-input` | `input` | 原始 `UniInputEvent`，值为 `event.detail.value` |
  | `uni-data-switch` | `change` | 原始 `UniSwitchChangeEvent`，值为 `event.detail.value` |
  | `uni-data-slider` | `change`、`changing` | 原始 `UniSliderChangeEvent`，值为 `event.detail.value` |
  | `uni-data-combobox` | `selectchange` | 选中的字符串 |
  | `enum-data-checkbox` | `change` | 单选值或多选数组，保留原有接口 |

- `uni-data-slider` 同时转发 `changing` 事件；`live` 只控制是否在该事件中回写 `v-model`，不影响事件转发。
- `control-id` 指定 uni-data-input/switch/slider 内部控件的 ID。uni-data-combobox 的 `control-id` 放在外层表单项上，防止覆盖底层组合框用于定位弹层的内部 anchorId。enum-data-checkbox 沿用 `id`，作用于外层表单项。
- 未单独声明的属性和监听器通过 `$attrs` 传给实际控件；enum-data-checkbox 保持旧规则，传给外层 uni-forms-item。不要假定所有封装组件的属性透传目标相同。

示例：

```html
<script setup lang="ts">
  const progress = ref(0)
  const duration = ref(30)
  const enabled = ref(false)
  const description = ref('')
  const mode = ref(0)
  const modeOptions = ref([{ value: 0, text: '从头播放' }, { value: 1, text: '接续播放' }])
  const color = ref('black')
  const colors = ref(['black', 'white', 'gray', 'red', 'green', 'blue'])
</script>

<template>
  <uni-card title="配置">
    <uni-data-slider control-id="demo-progress" label="进度（%）" v-model="progress" :min="0" :max="100" live />
    <uni-data-slider control-id="demo-duration" label="耗时（ms）" v-model="duration" :min="1" :max="100" />
    <uni-data-switch control-id="demo-enabled" label="启用动画" v-model="enabled" />
    <enum-data-checkbox id="demo-mode" title="播放方式" v-model="mode" :items="modeOptions" :show-toast="false" />
    <uni-data-input control-id="demo-description" label="说明" v-model="description" placeholder="请输入说明" />
    <uni-data-combobox control-id="demo-color" label="颜色" v-model="color" :options="colors" />
  </uni-card>
</template>
```

## CSS 约束

- 卡片与表单控件的样式放入对应的封装组件；全局文字、主题变量和页面安全区继续由 `common/uni.css` 管理。页面只保留自身特有的布局和状态。
- App-UVue 跨端样式优先使用单一 class 选择器。避免标签、ID、后代和复合选择器覆盖组件内部样式。
- 不用 `!important` 掩盖层叠问题，不通过增加无意义的容器解决间距问题。
- 不给 `view` 设置文字颜色来期待所有子控件继承；颜色写在实际绘制文字的 `text`、`input`、`textarea` 或组件提供的文字 class 上。

## 自动化验收

- 重构完成后进行两轮 review：第一轮检查目录、依赖、命名、样式归属和旧调用兼容；第二轮检查 v-model、事件、外部值更新、禁用状态及平台条件分支，并修复发现的问题。
- `page.$` 和 `page.$$` 只使用稳定的 ID 选择器，页面中新增的交互控件应有唯一 ID。
- 保留原有自动化使用的 ID。封装后应确认 ID 实际落在控件还是表单项上，不要只确认模板里存在同名属性。
- 控件修改后测试应验证事件传递和 v-model 回写，例如 slider 触发 `change` 后控件值和预览属性同步；不要只通过 `setData` 验证页面状态。模拟触发事件不等于设备上的真实拖动验证。
- 对 slider 分别检查默认模式与 `live` 模式；对 combobox 检查默认单选、按需使用的输入插槽，以及下拉面板的宽度、位置和选择回写。
- 测试等待异步属性更新后再断言，并在 `finally` 中恢复原值。使用 ref 后不再读取旧的 `data.xxx` 字段，可读取实际控件或预览属性并通过交互事件恢复值。
- 至少检查亮色和暗色首屏、滚动后的修改区域，以及下拉、切换、输入或展开等实际交互状态。
- 只做语法检查不能代替 Web、App 或小程序的运行验证；报告中明确说明实际验证的平台。
