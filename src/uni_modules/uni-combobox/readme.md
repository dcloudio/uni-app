# uni-combobox 组合框组件

## 用途和场景

uni-combobox 是可输入可选择的组合组件。其弹出层悬浮在组件下方，区域有限，适合等选项数量较少、可输入的场景。

默认是单选模式，只能选择不能输入。此时交互形态类似HTML的select标签。

通过 `input` 具名插槽传入 input 组件后，切换为可输入、可选择的组合模式。
通过插槽传入 input，可以避免在本组件中封装太多 input 的属性、事件，方便使用者使用所有 input 功能。

## 使用方式（职责分工）

- 组件内部负责：
  - 渲染选择框、占位文字、右侧箭头与候选浮层。
  - 计算浮层位置，下方空间不足且上方更充足时自动向上展开；浮层通过 `teleport` 渲染到页面层，不受组件尺寸裁剪。
  - 默认只读选择；组合模式下按输入内容过滤候选并高亮匹配项。
  - 关闭交互：点击组件外部、页面滚动、按 Esc、返回键（App/MP）都会关闭浮层。
  - web 端键盘交互：`Tab` 聚焦后可用 `ArrowUp`/`ArrowDown` 移动高亮项、`Enter` 选中、`Esc` 关闭。
  - 候选项为空时的提示文案跟随应用语言（简体中文、繁体中文、英文、法文、拉丁文）。
- 使用者负责：
  - 传入候选字符串数组 `options`，并用 `v-model` 绑定当前值。
  - 组合模式下自行提供 input（或其它输入组件）作为 `input` 插槽内容，并把插槽提供的 `value`、`input`、`focus`、`disabled` 接到输入组件上。
  - 通过外部样式类定制各区域外观。
  - 通过组件 ref 调用对外方法。

## 基本用法

```html
<uni-combobox :options="options" placeholder="请选择" v-model="value" />
```

```ts
const options : string[] = ['一年级', '二年级', '三年级']
const value = ref('')
```

普通单选模式下点击主体或右侧箭头打开完整候选列表，再次点击关闭浮层；点击候选项即选中并关闭浮层。

## 组合模式（可输入、可选择）

```html
<uni-combobox :options="cities" v-model="city" placeholder="选择或输入城市">
  <template #input="{ value, input, focus, disabled }">
    <input
      :value="value"
      :disabled="disabled"
      :confirm-hold="true"
      placeholder="选择或输入城市"
      @input="input"
      @focus="focus"
    />
  </template>
</uni-combobox>
```

点击输入框时打开候选浮层，已展开时再次点击保持展开，方便调整光标。输入时按包含关系过滤候选项。点击右侧箭头切换浮层开关，打开时展示完整候选列表，并高亮当前输入匹配项。禁用后不可输入、展开或选择候选项。

组合模式下的输入组件需设置 `confirm-hold`（Web 端 `confirm-hold`、App 端 `confirm-hold`）。Web 端内置 input 组件默认 `confirm-hold` 为 `false`，会在按回车时触发确认并主动失焦（`input.blur()`）；开启后回车不再失焦，用键盘选中候选后焦点仍保留在输入框中。该行为在输入组件内部于 `keyup` 阶段执行，`keydown` 中的 `preventDefault()` 无法阻止，因此必须由输入组件自身开启。

## 自定义样式

选择框、箭头、浮层与候选文字均通过外部样式类定制，组件不通过属性传递内联 css，也不对外暴露 css 变量：

```html
<uni-combobox
  :options="options"
  v-model="value"
  field-class="demo-field"
  arrow-class="demo-arrow"
  options-view-class="demo-options-view"
  options-content-class="demo-options-content"
  option-text-class="demo-option-text"
  option-text-highlight-class="demo-option-highlight"
  option-row-highlight-class="demo-option-row-highlight"
  result-text-class="demo-result-text"
/>
```

- `field-class`：非弹出区域（选择框本体）。
- `arrow-class`：右侧箭头。
- `options-view-class`：候选浮层外层。
- `options-content-class`：候选浮层内容区。
- `option-text-class`：候选项文字。
- `option-text-highlight-class`：高亮候选项文字。
- `option-row-highlight-class`：高亮候选项整行。
- `result-text-class`：单选模式结果文字。

浮层的定位、最大高度等布局由组件内部控制，外部样式类不应覆盖这些属性。

## 事件与组件方法

`update:modelValue` 在值更新时触发，`selectchange` 仅在从候选项中选中时触发。

```html
<uni-combobox ref="comboboxRef" :options="options" v-model="value" @selectchange="onSelectChange" />
<button @click="open">打开候选</button>
<button @click="close">关闭候选</button>
<button @click="setValue">设置值并过滤</button>
```

```ts
const comboboxRef = ref<CallEasyMethodComponentPublicInstance | null>(null)

function open() {
  comboboxRef.value?.openOptions()
}

function close() {
  comboboxRef.value?.closeOptions()
}

function setValue() {
  comboboxRef.value?.setInputValue('杭州')
}
```

## 注意事项

- 候选项数组变化后需整体替换数组才会刷新过滤结果，原地修改数组元素不会触发。
- 浮层默认最大高度为 200px，候选较多时内部使用 `scroll-view` 滚动。
- 组件已做暗黑适配；通过外部样式类自定义颜色时，请同步考虑暗黑下的可读性。
- 示例页面路径：`/pages/uni-ui/combobox/combobox.uvue`。
