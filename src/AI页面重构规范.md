# 示例页面重构规范

这份规范用于指导 AI 重构 `hello-uni-app-x` 的示例页面。重构时先保持页面的测试数据、事件、属性和导航行为，再调整布局与控件。每次只修改一个页面，完成后检查亮色、暗色和页面已有的自动化测试。

## 组件目录与命名

以下为当前组件的固定归属，重构页面时直接使用，不要重复创建同用途的组件：

| 组件 | 源文件 |
| --- | --- |
| `form-item` | `components/form-item/form-item.uvue` |
| `component-template` | `components/component-template/component-template.uvue` |
| `enum-data-checkbox` | `components/enum-data-checkbox/enum-data-checkbox.uvue` |
| `uni-forms-x` | `uni_modules/uni-forms-x` |
| `uni-combobox` | `uni_modules/uni-combobox` |

- `form-item` 是统一的业务表单组件，通过 `type="input|switch|slider|combobox"` 切换控件，不再创建多个 `uni-data-*` 组件。
- `component-template` 只根据 syntaxdoc 语法生成属性控制项，不包含任何原生组件、动画、事件日志或组件名分支。真实组件由页面通过 preview 插槽提供，属性值及控制配置均由页面持有。
- `enum-data-checkbox` 保留为项目组件，不迁移到 `uni_modules`。普通枚举配置继续使用它。
- 不新增与 `uni_modules/uni-data-checkbox-x` 中底层 `uni-data-checkbox` 同名的表单封装。
- 已删除 `uni-card`，卡片结构直接写在页面中；需要卡片样式时使用页面自己的 `.uni-card`，标题单独使用 `uni-h4`。
- `form-item`、`component-template` 使用项目组件目录，不声明为独立 uni-module。依赖的 `uni-forms-x` 和 `uni-combobox` 仍从现有 `uni_modules` 使用。

## 页面结构

- 页面不增加只用于包裹内容的最外层 `view` 或 `scroll-view`。优先使用 `page` 选择器设置页面级样式。
- 一个功能分组由外置标题和内容卡片组成。标题使用 `uni-h4`，不使用标题组件包裹：

  ```html
  <text class="uni-h4">分组标题</text>
  <view class="uni-card">分组内容</view>
  ```

- 卡片样式直接写在页面的 `.uni-card` 中，标题必须位于背景卡片外面。不要再使用 `uni-card` 组件。
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

- 普通参数配置使用 `form-item`。它内部组合 `uni-forms-item` 和实际控件，页面通过 `type`、`label` 与 `v-model` 使用，不再重复组合相同结构。

  | 场景 | 组件 | v-model 类型 | 默认布局 |
  | --- | --- | --- | --- |
  | 自由文本输入 | `form-item type="input"` | `string` | label 在左，透明背景、下边线输入框填满右侧空间 |
  | 布尔值 | `form-item type="switch"` | `boolean` | label 在左，原生 switch 靠右 |
  | 枚举单选、多选 | `enum-data-checkbox` | 单选为 `string` 或 `number`，多选为对应值的数组 | title 在上，默认 list 模式 |
  | 有限范围数值、时间 | `form-item type="slider"` | `number` | label 在上，slider 在下，默认显示数值 |
  | 颜色等字符串候选 | `form-item type="combobox"` | `string` | label 在左，组合框填满右侧空间 |

- `enum-data-checkbox` 通过 `items` 接收 `{ text, value, disabled? }` 选项，兼容旧的 name、label 文案；支持 `multiple` 和 `mode`，不要无条件添加 `icon="right"`。普通参数配置显式设置 `:show-toast="false"`。
- 可调节的数值优先使用 `<form-item type="slider">`，按属性语义设置 `min`、`max`、`step`。百分比、尺寸、时间等有限范围值不要使用输入框。
- `form-item type="slider"` 默认在 `change` 时更新 `v-model`；需要拖动过程中实时更新时设置 `live`，此时组件会在 `changing` 时更新。
- 颜色选择使用 `<form-item type="combobox">`，候选数组通过 `options` 提供；不要用输入框模拟颜色下拉。
- 默认颜色候选为 `black`、`white`、`gray`、`red`、`green`、`blue`；示例已有的固定颜色值可以追加保留，不改变原有测试数据。
- 只有需要自由输入文本时才使用 `<form-item type="input">`。输入框统一使用透明背景和单独的下边线，不使用完整边框模拟卡片。
- 已封装的控件不要再套一层 `uni-forms-item`。组件可以独立用于参数配置；需要表单校验时再置于 `uni-forms` 中，提供 `name` 并绑定相应表单模型。
- 原生 `radio`、`checkbox` 的示例页面如果本身就是测试原生组件，则保留原生结构，不为追求统一而替换。
- 原生 input、switch、slider 等组件及 API 的专门测试同样保留原生结构。封装只用于页面的普通配置控件，不能改变被测对象。

### Slider 更新模式

```html
<!-- 默认：原生 change 发生时更新 -->
<form-item type="slider" label="耗时（ms）" v-model="duration" :min="1" :max="100" />

<!-- 实时：changing 过程中也更新，用于需要即时反馈的预览 -->
<form-item type="slider" label="进度（%）" v-model="percent" live />
```

`live` 默认为 `false`。需要动态关闭时使用 `:live="false"`，不要传字符串 `"false"`。即使未启用实时回写，页面仍可通过 `@changing` 接收原始事件。

### Combobox 使用约定

- 使用 `form-item type="combobox"` 封装好的标签与候选框，不再在页面额外包 `uni-forms-item`。
- 当前 `form-item type="combobox"` 使用默认单选模式，不提供输入插槽。需要验证可输可选和插槽行为时，使用底层 uni-combobox 的专门示例。
- `control-id` 作用于实际控件；combobox 的 `control-id` 作用于外层表单项，不能覆盖底层组合框内部 ID，否则会破坏下拉面板的位置和宽度。

## 按钮与导航

- 普通操作按钮和导航按钮默认不设置 `type`，不要将一组普通操作都做成蓝色主按钮。
- 只有明确的主操作或告警操作才设置相应 `type`。
- 重构时保留原有导航目标、平台条件与按钮事件，不因布局调整改变功能。

## 数据和事件

- 页面传给封装组件的候选项、控件配置使用 ref；属性模型直接使用 createTemplateModel 返回的 reactive，不再 ref 包装。不要为了使用组件新增同步副本，也不要修改原有自动化 data。
- `form-item` 以 `modelValue` 为数据来源，用户操作后触发 `update:modelValue`；不要通过 watch 和内部 ref 镜像同一个值。原有的 `enum-data-checkbox` 为兼容未绑定模型时的 checked 初始化，保留原有内部 ref。
- `form-item type="input"` 的 `v-model` 始终为字符串；即使选择数字键盘，也不自动转为 number。有限范围的数值配置优先使用 slider。
- 事件参数按下表读取，不要把所有封装组件的事件都当作 `event.detail.value`：

  | 组件 | 事件 | 监听器收到的参数 |
  | --- | --- | --- |
  | `form-item type="input"` | `input` | 原始 `UniInputEvent`，值为 `event.detail.value` |
  | `form-item type="switch"` | `change` | 原始 `UniSwitchChangeEvent`，值为 `event.detail.value` |
  | `form-item type="slider"` | `change`、`changing` | 原始 `UniSliderChangeEvent`，值为 `event.detail.value` |
  | `form-item type="combobox"` | `selectchange` | 选中的字符串 |
  | `enum-data-checkbox` | `change` | 单选值或多选数组，保留原有接口 |

- `form-item type="slider"` 同时转发 `changing` 事件；`live` 只控制是否在该事件中回写 `v-model`，不影响事件转发。
- `control-id` 指定 input、switch、slider 内部控件的 ID；combobox 的 `control-id` 放在外层表单项上。enum-data-checkbox 沿用 `id`，作用于外层表单项。
- `form-item` 不使用对象形式的 `v-bind` 或 `$attrs` 自动透传，以适配小程序。属性必须在 Props 中显式声明并逐项绑定，事件必须显式转发。

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
  <text class="uni-h4">配置</text>
  <view class="uni-card">
    <form-item type="slider" control-id="demo-progress" label="进度（%）" v-model="progress" :min="0" :max="100" live />
    <form-item type="slider" control-id="demo-duration" label="耗时（ms）" v-model="duration" :min="1" :max="100" />
    <form-item type="switch" control-id="demo-enabled" label="启用动画" v-model="enabled" />
    <enum-data-checkbox id="demo-mode" title="播放方式" v-model="mode" :items="modeOptions" :show-toast="false" />
    <form-item type="input" control-id="demo-description" label="说明" v-model="description" placeholder="请输入说明" />
    <form-item type="combobox" control-id="demo-color" label="颜色" v-model="color" :options="colors" />
  </view>
</template>
```

### 语法数据业务组件

需要根据语法生成属性控制区时，使用 component-template。页面持有 reactive 属性模型，通过插槽提供真实预览：

```html
<script setup lang="ts">
  import progressSyntax from './progress-syntax.json'
  import { createTemplateModel, resetTemplateModel, updateTemplateModel, filterSyntaxAttributes } from '@/components/component-template/types'
  const syntax = ref(filterSyntaxAttributes(progressSyntax))
  const properties = createTemplateModel(syntax.value)
  const controls = ref({ percent: { min: 0, max: 100, step: 1, live: true } })
  const colors = ref(['black', 'white', 'gray', 'red', 'green', 'blue'])

  function updateProperty(change) {
    updateTemplateModel(properties, change)
  }

  function resetProperties() {
    resetTemplateModel(properties, syntax.value)
  }
</script>

<template>
  <component-template :syntax="syntax" :model-value="properties" :controls="controls"
    :color-options="colors" control-prefix="progress" @change="updateProperty">
    <template #preview>
      <!-- 页面按原生组件声明显式绑定所需属性，完整绑定见 progress 页面。 -->
      <progress id="progress-preview" :percent="Number(properties.percent)" />
    </template>
    <template #actions>
      <button @click="resetProperties">重置属性</button>
    </template>
  </component-template>
</template>
```

component-template 的 model-value 必须来自页面。模板只读取对象并通过 change 回传 `{ name, value }`；页面使用 updateTemplateModel 更新自己的 reactive，不使用 .value。模板不得通过内部副本或 props 对象突变保存属性值。

createTemplateDefaults 返回普通默认值对象；createTemplateModel 将其包装为 reactive。resetTemplateModel 原地删除旧键并合入新默认值，保留 proxy 身份，语法变化后也不残留旧字段。不要重新赋值替换模型，也不需要逐字段重置。页面提供 controls（min、max、step、live）和 color-options，模板不硬编码组件专用规则。

### 兼容性过滤

filterSyntaxAttributes、默认值初始化和模板渲染共用同一套规则：

- deprecated 字段存在即排除；事件也检查兼容性，但不会生成普通属性输入框。
- 每条属性或事件的 uniPlatform 必须同时具备 App Android、iOS、Harmony 和 Web 支持信息。
- 各目标优先读取 unixVaporVer。只有该字段为 undefined 时回退 unixVer；Vapor 为 x、空值或无有效值时不允许回退。最终为 x、缺失或空值时排除。
- 其他非空值按“不为 x”的要求通过，包括版本号、√、-。这不是按当前 SDK 版本比较，也不能据此确认原生运行支持。
- 不以 uniVer、hostVer 或组件级信息猜测缺失的属性兼容性。小程序不参与这项四目标共同支持判断。
- values 无独立 uniPlatform 时沿用属性；显式声明时按同一规则过滤。所有候选均被排除时不生成该属性。原默认候选被移除时改用剩余第一项，否则保留显式默认值（包括 false、0、空字符串）。
- 返回新的语法对象，不修改源 JSON；重复过滤结果保持一致。

按此规则，progress 的 border-radius、font-size 因 Web 标为 x 不再生成控制项，activeend 因 Web 标为 x 不再生成事件按钮；原有 progress-default 固定测试实例及用例继续保留。

preview 插槽中的真实组件完全由页面定义和显式绑定，多个属性共同作用于同一个预览。actions 插槽用于页面的重置等操作，events 插槽用于页面的事件运行按钮、回调处理和日志；这些数据与方法也都留在页面。

数字使用 slider，布尔值使用 switch，颜色使用 combobox；非空标量 values 使用 combobox，候选来自 values[].name。默认值缺失时取第一项，否则使用类型基础默认值。存在默认值可判定的 number/string、boolean/string 联合按实际值类型生成；数组、对象、回调和类型不明的联合不能静默转为字符串。嵌套 values 描述的是数据结构，不是普通枚举。

复杂属性不加入自动默认模型，模板显示说明，页面通过 properties 插槽增加专用控件和数据；events 插槽负责原生事件与回调，模板不能仅依据事件名称生成业务逻辑。完整目录检查见 component-template语法库审查报告.md；审查脚本为 components/component-template/audit.cjs。

页面上供既有自动化使用的固定示例必须保留。progress 页面的 progress-default、progress-plain、progress-plain-second、progress-blue、设置/清除按钮，以及对应的 data、页面方法和事件计数均保留原有契约；不能因为引入模板而删除。模板预览和这些自动化示例使用独立状态。

`control-prefix` 与语法中的原始属性名共同决定 ID，保留大小写，不按渲染序号生成，也不把 camelCase 与 kebab-case 别名合并。例如 activeColor 对应：

- `progress-activeColor-example`：该属性的控制区域。
- `progress-activeColor`：该属性的控制项。
- `progress-preview`：页面 preview 插槽中，所有属性共同驱动的真实 progress。

事件能力通过兼容性过滤后，页面才生成相应按钮和日志。例如 activeend 可用时使用 progress-event-activeend-run、progress-event-activeend-log；component-template 不认识具体事件，也不转发原生事件。

progress 示例直接导入 `pages/component/progress/progress-syntax.json`，该文件是语法库 `uvue/progress.json` 的完整本地副本。同步时整体更新并检查 JSON 相等，不再手工维护精简 TS 属性表；默认值、values、valueSet、说明和 uniPlatform 均保留。

页面的真实组件使用显式属性绑定，避免小程序不支持的动态组件和对象 v-bind。新增组件示例只需更换语法数据及页面插槽，不在 component-template 内增加组件分支。JSON 描述支持范围，生成属性控制项本身不等于当前平台支持所有属性或事件。

## 页面文字规范

- 分组标题只使用 `uni-h4`。
- 备注、参数说明和平台限制使用 `uni-comment`。
- 事件结果、接口返回值和运行日志使用 `uni-log`。
- 不使用页面自定义的 `title`、`comment`、`log` class 替代这三个公共 class；需要特殊布局时另加业务 class，不改变文字语义 class。

## CSS 约束

- 表单控件的样式放入 `components/form-item/form-item.uvue`；卡片样式直接放在页面的 `.uni-card` 中；全局文字语义 class、主题变量和页面安全区继续由 `common/uni.css` 管理。
- App-UVue 跨端样式优先使用单一 class 选择器。避免标签、ID、后代和复合选择器覆盖组件内部样式。
- 不用 `!important` 掩盖层叠问题，不通过增加无意义的容器解决间距问题。
- 不给 `view` 设置文字颜色来期待所有子控件继承；颜色写在实际绘制文字的 `text`、`input`、`textarea` 或组件提供的文字 class 上。

## 自动化验收

- 重构完成后进行两轮 review：第一轮检查目录、依赖、命名、样式归属和旧调用兼容；第二轮检查 v-model、事件、外部值更新、禁用状态及平台条件分支，并修复发现的问题。
- `page.$` 和 `page.$$` 只使用稳定的 ID 选择器，页面中新增的交互控件应有唯一 ID。
- 逐项测试“控制项 change → 页面 reactive → 插槽内真实组件”的映射，并验证 reset 保留 proxy 身份、删除旧键、恢复默认值，且控件同步刷新。模板不得包含被测原生节点；progress-default 等固定示例必须保留。
- 控件修改后测试应验证事件传递和 v-model 回写，例如 slider 触发 `change` 后控件值和预览属性同步；不要只通过 `setData` 验证页面状态。模拟触发事件不等于设备上的真实拖动验证。
- 对 slider 分别检查默认模式与 `live` 模式；对 combobox 检查默认单选、下拉面板的宽度、位置和选择回写。
- 模板测试等待异步属性更新后再断言，通过 `*-reset` 按钮恢复状态，并验证多个属性能组合生效。固定示例测试继续使用原有页面 data 和暴露方法；模板控制项不应修改这些测试数据。
- 根据语法的 uniPlatform 跳过明确不支持的原生能力断言。模拟 activeend 只验证事件记录链路；真实播放后等待回调的用例单独验证，不能将两种结果混为一谈。
- 至少检查亮色和暗色首屏、滚动后的修改区域，以及下拉、切换、输入或展开等实际交互状态。
- 只做语法检查不能代替 Web、App 或小程序的运行验证；报告中明确说明实际验证的平台。
