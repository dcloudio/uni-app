折叠面板组件，包含：

- `uni-collapse`：父容器
- `uni-collapse-item`：子面板

一个折叠面板组件可以包含若干uni-collapse-item。每个uni-collapse-item包括顶部标题栏和通过slot传入的内容区。

### 基本用法

```html
<uni-collapse :accordion="true">
  <uni-collapse-item title="标题 1" :open="true">
    <view><text>内容 1</text></view>
  </uni-collapse-item>
  <uni-collapse-item title="标题 2">
    <view><text>内容 2</text></view>
  </uni-collapse-item>
</uni-collapse>
```

uni-collapse-item的标题栏的自定义：
- 标题栏容器可通过 `title-wrap-class` 自定义背景等容器样式。
- 标题栏支持title属性，可通过title-class自定义文字样式。
- 标题展开态可通过 `title-open-class` 自定义激活文字样式。组件默认使用透明度区分状态，便于外部继续覆盖文字颜色。
- 标题禁用态可通过 `title-disabled-class` 自定义禁用文字样式。若同时存在展开态和禁用态，以禁用态为最终状态。
- 内容外层容器可通过 `content-wrap-class` 自定义背景等容器样式。
- 标题栏右边默认带有箭头，可通过arrow-class自定义箭头样式。该箭头为一个view包括2个直角边的边框，然后旋转而成。
- 箭头展开态和禁用态可分别通过 `arrow-open-class`、`arrow-disabled-class` 覆盖。组件默认也使用透明度区分状态，便于外部继续覆盖箭头颜色。
- 如果完全不想要默认包含的title和arrow，也可以传入一个名为title的具名插槽来替换。

### 具名插槽标题

```html
<uni-collapse-item>
  <template #title="{ open, disabled }">
    <view class="custom-title">
      <view class="custom-title-icon"></view>
      <text class="custom-title-text">{{ open ? '已展开' : '未展开' }}</text>
    </view>
  </template>
  <view><text>自定义标题内容</text></view>
</uni-collapse-item>
```

### externalClass

```html
<uni-collapse-item
  title="自定义样式"
  title-wrap-class="my-title-wrap-class"
  title-class="my-title-class"
  title-open-class="my-title-open-class"
  content-wrap-class="my-content-wrap-class"
  arrow-class="my-arrow-class"
  arrow-open-class="my-arrow-open-class"
>
  <view><text>内容区域</text></view>
</uni-collapse-item>
```

### Slots

#### uni-collapse-item

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 面板内容 | - |
| title | 自定义标题区域 | `open: boolean`、`disabled: boolean` |

### Events

#### uni-collapse-item

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 面板展开状态变化时触发 | `open: boolean` |

### Expose

#### uni-collapse-item

| 方法名 | 说明 |
| --- | --- |
| openCollapse(open: boolean) | 执行展开/收起，会遵循 `disabled` 和手风琴逻辑 |
| openOrClose(open: boolean) | 直接切换内容显示状态 |

### 暗黑模式适配

建议通过组件 `class` 和 externalClass 组合传入暗色样式：

- 用组件 `class` 统一控制根节点和内容区等外层视觉。
- 用 `title-wrap-class`、`title-class`、`title-open-class`、`content-wrap-class`、`arrow-class`、`arrow-open-class` 等 externalClass 覆盖标题区、内容外层和箭头样式。
- 默认展开态和禁用态主要通过透明度表达，减少颜色覆盖时的交叉冲突。

### 注意
- 本组件在Android上需HBuilderX 5.09+。在低版本上箭头变颜色+旋转时，在Android上会消失
