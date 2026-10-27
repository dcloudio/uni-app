带加减按钮的数字输入框，常见于购物车商品数量选择。

### 基本用法

```html
<uni-number-box v-model="value" />
```

### 设置范围

```html
<uni-number-box v-model="value" :min="5" :max="20" />
```

### 设置步长

```html
<!-- 整数步长 -->
<uni-number-box v-model="value" :step="5" />

<!-- 小数步长 -->
<uni-number-box v-model="value" :step="0.1" />
```

### 禁用状态

```html
<uni-number-box :value="5" :disabled="true" />
```

### 自定义样式

通过 `btn-class`、`input-class`、`icon-class` 自定义组件样式：

```html
<uni-number-box v-model="value" btn-class="custom-btn" input-class="custom-input" icon-class="custom-icon" />
```

```css
.custom-btn {
  background-color: #007aff;
}
.custom-input {
  background-color: #e8f4ff;
  color: #007aff;
}
.custom-icon {
  background-color: #fff;
}
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值改变时触发 | value: number |
| focus | 输入框聚焦时触发 | event: UniInputFocusEvent |
| blur | 输入框失焦时触发 | event: UniInputBlurEvent |
