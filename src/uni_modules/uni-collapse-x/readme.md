# uni-collapse 折叠面板组件

## 用途和场景

折叠面板用于在有限空间内分组展示内容，点击标题展开或收起对应内容区。常用于 FAQ、设置项分组、筛选条件等场景。

组件包含两个部分：

- `uni-collapse`：父容器，负责手风琴互斥逻辑。
- `uni-collapse-item`：子面板，包含顶部标题栏和通过默认插槽传入的内容区。

## 使用方式（职责分工）

- 组件内部负责：标题栏与内容区的基础布局、展开/收起状态与过渡动画、手风琴互斥（`accordion`）、禁用态、右侧箭头绘制，以及 web 端的鼠标光标、键盘聚焦与 Enter/Space 切换。
- 使用者负责：
  - 通过 `title` 传入标题文字，或通过 `title` 具名插槽完全自定义标题区域（插槽参数为 `open`、`disabled`）。
  - 通过默认插槽传入内容区。
  - 需要受控时传入 `open`，并监听 `change` 同步状态。
  - 通过外部样式类定制标题区、内容外层和箭头的外观。
  - 通过组件 ref 调用 `openCollapse`、`openOrClose` 控制展开状态。

## 基本用法

```html
<uni-collapse :accordion="true">
  <uni-collapse-item title="标题 1" :open="true">
    <view><text>内容 1</text></view>
  </uni-collapse-item>
  <uni-collapse-item title="标题 2">
    <view><text>内容 2</text></view>
  </uni-collapse-item>
  <uni-collapse-item title="禁用项" :disabled="true">
    <view><text>内容 3</text></view>
  </uni-collapse-item>
</uni-collapse>
```

`accordion` 为 `true` 时同一时间只保留一个展开项；设为 `false` 可同时展开多个。

## 自定义标题

标题区域支持通过外部样式类定制：

- `title-wrap-class`：标题行容器，可覆盖背景等容器样式。
- `title-class`：标题文字基础样式。
- `title-open-class`：展开态叠加到标题文字的样式。组件默认用透明度区分状态，便于外部继续覆盖颜色。
- `title-disabled-class`：禁用态叠加到标题文字的样式。展开态与禁用态同时存在时，以禁用态为准。
- `content-wrap-class`：内容外层容器，可覆盖背景等容器样式。
- `arrow-class`：右侧箭头样式。箭头由一个 view 的两条直角边框旋转而成，可覆盖尺寸、边框粗细与颜色。
- `arrow-open-class`、`arrow-disabled-class`：箭头展开态、禁用态样式。

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

如果希望完全替换默认的标题与箭头结构，可使用 `title` 具名插槽：

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

## 受控与调用组件方法

```html
<uni-collapse-item ref="itemRef" title="受控面板" :open="opened" @change="onChange" />

<script setup lang="ts">
  const itemRef = ref<CallEasyMethodComponentPublicInstance | null>(null)
  const opened = ref(false)

  function onChange(open : boolean) {
    opened.value = open
  }

  function expand() {
    itemRef.value?.openCollapse(true)
  }
</script>
```

`openCollapse` 会遵循 `disabled` 与手风琴逻辑并触发 `change`；`openOrClose` 仅直接切换内容显示状态，不做上述判断。

## 注意事项

- 默认标题、内容区背景为白色、文字为深色，组件已做暗黑适配：暗黑下背景改为深灰、文字与箭头改为浅色。若通过外部样式类接管颜色，请注意在暗黑下同样可读。
- 内容区使用 `max-height` 过渡，内容高度超过 2000px 时会被截断，超长内容建议放入固定高度滚动容器。
- 本组件在 Android 上需 HBuilderX 5.09+。低版本上箭头在“变颜色 + 旋转”同时发生时，Android 端会消失。
- 示例页面路径：`/pages/uni-ui/collapse/collapse.uvue`。
