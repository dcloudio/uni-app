## uni-data-picker 级联选择器

> **组件名：uni-data-picker**
> 关联组件：`uni-data-picker-view`。

`<uni-data-picker>` 是一个 datacom 规范的级联选择组件，支持单列和多列级联选择，列数没有限制。
候选数据支持本地数据、uniCloud 云数据库数据，也支持通过默认插槽完全自定义输入框。

相比 picker 组件，uni-data-picker 有如下优势和不同：

1. 弹出的候选区更大，比全屏略矮，选择更方便。
2. uni-data-picker 是点击即选中，而 picker 是先滚动到中间、再点击右上角“确定”。
3. uni-data-picker 没有列数限制，每次只显示一列候选，之前的选择在选择区的上方通过导航链接展示。picker 是并排显示，屏幕空间有限，一般不超过 3 列，并且文字太长时显示不全。
4. 符合 datacom 规范，绑定数据即可，减少大量模板代码编写。

`<uni-data-picker-view>` 是不带弹窗的选择面板，可以单独嵌入页面使用。`<uni-data-picker>` 内部的弹窗区域也是基于它实现的。

示例页面：

- `/pages/uni-ui/data-picker/data-picker.uvue`
- `/pages/uni-ui/data-picker/data-picker-view.uvue`

## 使用方式

组件负责：读取 `localdata` 或 uniCloud `collection` 数据、维护级联选中路径、渲染输入框与弹窗（`uni-data-picker`）或选择面板（`uni-data-picker-view`）、派发 `change`/`nodeclick` 等事件，并内置浅色与暗黑基础样式。

使用者负责：提供数据与 `v-model` 当前值、按需配置云端查询参数、决定是否需要自定义插槽与 external class、在业务侧处理选择结果与事件。

## 基本用法

### 单列本地数据

`localdata` 传入**不含 `children` 字段的扁平数组**时为单列模式，选中任一节点即完成选择并触发 `change`：

```html
<template>
  <uni-data-picker
    placeholder="请选择城市"
    popup-title="请选择"
    tab-placeholder="请选择"
    :localdata="cityList"
    v-model="cityValue"
    @change="onChange"
  />
</template>

<script setup lang="ts">
  const cityValue = ref('')
  const cityList = ref([
    { text: '北京市', value: '1' },
    { text: '上海市', value: '2' },
    { text: '广州市', value: '3' }
  ])
</script>
```

### 多列本地数据

```html
<template>
  <uni-data-picker
    placeholder="请选择班级"
    popup-title="请选择"
    :localdata="classDataTree"
    v-model="classValue"
    @change="onChange"
    @nodeclick="onNodeClick"
  />
</template>

<script setup lang="ts">
  const classValue = ref('1-2')
  const classDataTree = ref([
    {
      text: '1年级',
      value: '1-0',
      children: [
        { text: '1.1班', value: '1-1' },
        { text: '1.2班', value: '1-2' }
      ]
    }
  ])
</script>
```

多列本地数据为树形数组，每个节点使用 `text` 显示文字、`value` 作为唯一值，可选 `children` 子节点、`disable` 禁用标记和 `isleaf` 叶子节点标记。
字段名不是 `text` / `value` 时，可通过 `default-props` 映射：

```html
<uni-data-picker
  :localdata="list"
  :default-props="{ text: 'name', value: 'id' }"
  v-model="value"
/>
```

### 云端数据

同时不传 `self-field` 和 `parent-field` 时为单列模式：

```html
<uni-data-picker
  collection="opendb-city-china"
  field="code as value, name as text"
  where="eq(type, 2)"
  orderby="value asc"
  :page-size="50"
  v-model="address"
/>
```

同时传入 `self-field` 和 `parent-field` 时为树形模式：

```html
<uni-data-picker
  placeholder="请选择地址"
  collection="opendb-city-china"
  field="code as value, name as text, eq(type, 2) as isleaf"
  self-field="code"
  parent-field="parent_code"
  orderby="value asc"
  :page-size="50"
  v-model="address"
/>
```

云端数据通过 `uniCloud.databaseForJQL()` 查询，使用前需要先关联 uniCloud 服务空间。`field` 中必须把查询字段映射为 `value` 和 `text`，例如 `code as value, name as text`。

### 自定义插槽

通过默认插槽可以完全接管输入框的展示，插槽参数为 `data`（已选节点数组）和 `error`（云端查询错误）：

```html
<uni-data-picker
  v-slot:default="{ data, error }"
  :localdata="classDataTree"
  v-model="classValue"
>
  <view class="input-border">
    <text v-if="error">{{ error.errMsg }}</text>
    <text v-else-if="data.length">{{ data[data.length - 1].text }}</text>
    <text v-else>请选择</text>
  </view>
</uni-data-picker>
```

### 只读模式

只读状态下不会打开选择弹窗，点击输入框会触发 `inputclick`：

```html
<uni-data-picker
  :readonly="true"
  :localdata="classDataTree"
  v-model="classValue"
  @inputclick="onInputClick"
/>
```

### 自定义样式

`uni-data-picker` 可通过 `input-class`、`error-class` 自定义输入框和错误提示，通过 `popup-class`、`mask-class` 自定义弹出框和遮罩层。
`uni-data-picker-view` 可通过 `tab-item-class`、`list-class`、`list-item-class`、`list-item-text-class`、`list-item-check-class`、`loading-class`、`error-class` 自定义选择面板。

```html
<uni-data-picker
  :localdata="classDataTree"
  v-model="classValue"
  input-class="demo-picker-input"
  error-class="demo-picker-error"
  popup-class="demo-picker-popup"
  mask-class="demo-picker-mask"
/>

<uni-data-picker-view
  collection="opendb-city-china"
  field="code as value, name as text"
  v-model="address"
  tab-item-class="demo-tab"
  list-class="demo-list"
  list-item-class="demo-list-item"
  list-item-text-class="demo-list-item-text"
  list-item-check-class="demo-check"
  loading-class="demo-loading"
  error-class="demo-error"
/>
```

### 事件回显

```html
<template>
  <uni-data-picker
    :localdata="classDataTree"
    v-model="classValue"
    @change="onChange"
    @nodeclick="onNodeClick"
    @popupopened="popupState = '已打开'"
    @popupclosed="popupState = '已关闭'"
  />
  <text>最近事件：{{ lastEvent }}</text>
  <text>弹窗状态：{{ popupState }}</text>
  <text>选中值：{{ changeValue }}</text>
  <text>点击节点：{{ nodeClickValue }}</text>
</template>

<script setup lang="ts">
  const lastEvent = ref('暂无')
  const popupState = ref('未打开')
  const changeValue = ref('暂无')
  const nodeClickValue = ref('暂无')

  function onChange(e: any) {
    const nodes = e.detail.value as Array<UTSJSONObject>
    lastEvent.value = 'change'
    changeValue.value = nodes.map((node: UTSJSONObject) => `${node['text']}(${node['value']})`).join(' / ')
  }

  function onNodeClick(node: UTSJSONObject) {
    lastEvent.value = 'nodeclick'
    nodeClickValue.value = `${node['text']}(${node['value']})`
  }
</script>
```

## 注意事项

- `localdata` 优先级高于 `collection`，同时传入时使用本地数据。
- 单列模式在选中节点后触发 `change`；多列树形模式在选中叶子节点（或没有子节点的节点）后触发 `change`，点击非叶子节点时只触发 `nodeclick`。
- `readonly` 只控制是否打开弹窗，不会禁用组件本身；只读时点击输入框会触发 `inputclick`。
- 云端数据依赖 uniCloud 服务空间，未关联服务空间时查询会失败，错误信息会通过默认插槽的 `error` 参数或组件的 `error-class` 区域展示。
- 组件已内置基础暗黑模式样式（`prefers-color-scheme: dark`）。如需更精细的暗色主题，可通过外部 `class` 与 externalClass 组合覆盖颜色。
- 以下参数已预留，当前版本暂未参与内部逻辑：`page-data`、`multiple`、`manual`、`load-time`、`preload`、`step-searh`、`page-indistinct`。

### [查看文档](https://uniapp.dcloud.io/component/uniui/uni-data-picker)
