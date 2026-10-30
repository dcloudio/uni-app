::: sourceCode
## uni-combobox

> GitCode: https://gitcode.com/dcloud/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-combobox/components/uni-combobox


> GitHub: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-combobox/components/uni-combobox

:::

默认是单选选择框，通过 input 具名插槽切换为可输入、可选择的组合框。

> 本 Component 是 uni ext component，需下载插件：[uni-combobox](https://ext.dcloud.net.cn/plugin?id=30347)


uni-combobox 组合框组件。

默认为单选模式，类似 select 组件，只能选择不能输入。通过具名插槽 `input` 传入 input 组件后，切换为可输入、可选择的组合模式。

### 基本用法

```html
<uni-combobox :options="options" placeholder="请选择" v-model="value" />
```

### options

```html
<uni-combobox :options="gradeOptions" placeholder="请选择年级" v-model="grade" />
```

### modelValue / v-model

```html
<uni-combobox :options="cityOptions" v-model="city" placeholder="请选择城市" />
```

### placeholder

```html
<uni-combobox :options="cityOptions" placeholder="这里展示 placeholder" v-model="value" />
```

### disabled

```html
<uni-combobox :options="cityOptions" v-model="city" disabled />
```

禁用后不可输入、展开或选择候选项。

### 组合模式

```html
<uni-combobox :options="options" v-model="city">
  <template #input="{ value, input, disabled }">
    <input
      :value="value"
      :disabled="disabled"
      placeholder="选择或输入城市"
      @input="input"
    />
  </template>
</uni-combobox>
```

输入时会打开候选浮层，并按 startsWith 规则过滤候选项。点击右侧箭头打开时展示完整候选列表，并高亮当前输入匹配项。

### 自定义样式

```html
<uni-combobox
  :options="options"
  v-model="value"
  arrow-class="demo-arrow"
  field-class="demo-field"
  options-view-class="demo-options-view"
  options-content-class="demo-options-content"
  option-text-class="demo-option-text"
  option-text-highlight-class="demo-option-highlight"
  option-row-highlight-class="demo-option-row-highlight"
  result-text-class="demo-result-text"
/>
```

也可以单独传入任意一个样式类属性。

```html
<uni-combobox :options="options" v-model="value" arrow-class="demo-arrow" />
<uni-combobox :options="options" v-model="value" options-view-class="demo-options-view" />
<uni-combobox :options="options" v-model="value" option-text-class="demo-option-text" />
<uni-combobox :options="options" v-model="value" option-text-highlight-class="demo-option-highlight" />
<uni-combobox :options="options" v-model="value" option-row-highlight-class="demo-option-row-highlight" />
<uni-combobox :options="options" v-model="value" result-text-class="demo-result-text" />
```

### 事件

```html
<uni-combobox
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
| field-class | 非弹出区域样式 |
| options-view-class | 候选浮层外层样式 |
| options-content-class | 候选浮层内容样式 |
| option-text-class | 候选项文字样式 |
| option-text-highlight-class | 候选项高亮样式 |
| option-row-highlight-class | 候选项高亮行样式 |
| result-text-class | 单选模式结果文字样式 |

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| options | Array\<String\> | [] | 候选字符串数组 |
| modelValue | String | '' | 当前值，支持 v-model |
| placeholder | String | '' | 占位文字 |
| disabled | Boolean | false | 是否禁用 |
| arrowClass | String | '' | 右侧箭头自定义样式类 |
| fieldClass | String | '' | 非弹出区域自定义样式类 |
| optionsViewClass | String | '' | 候选浮层外层自定义样式类 |
| optionsContentClass | String | '' | 候选浮层内容自定义样式类 |
| optionTextClass | String | '' | 候选项文字自定义样式类 |
| optionTextHighlightClass | String | '' | 候选项高亮自定义样式类 |
| optionRowHighlightClass | String | '' | 候选项高亮行自定义样式类 |
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
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 5.31 | 5.31 | 5.31 | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.31 |


### 属性 
| 名称 | 类型 | 描述 |
| :- | :- | :- |
| options | string\[\] | 候选字符串数组 |
| modelValue | string | 当前值，支持 v-model 双向绑定 |
| placeholder | string | 占位文字 |
| disabled | boolean | 是否禁用 |
| arrowClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 右侧箭头自定义样式类 |
| fieldClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 非弹出区域自定义样式类 |
| optionsViewClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 候选浮层外层自定义样式类 |
| optionsContentClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 候选浮层内容自定义样式类 |
| optionTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 候选项文字自定义样式类 |
| optionTextHighlightClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 候选项高亮自定义样式类 |
| optionRowHighlightClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 候选项高亮行自定义样式类 |
| resultTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) | 单选模式结果文字自定义样式类 |
| @selectchange | Function | 从候选项选中时触发，参数为选中的值，类型为 string |
| @update:modelValue | Event | 值更新时触发，参数为当前值，类型为 string |

<!-- UTSCOMJSON.uni-combobox.fileFormates -->



<!-- UTSCOMJSON.uni-combobox.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-combobox)

