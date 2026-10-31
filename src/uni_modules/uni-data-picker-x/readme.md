## uni-data-picker 级联选择器

> **组件名：uni-data-picker**
> 关联组件：`uni-data-picker-view`。

`<uni-data-picker>` 是一个datacom规范的级联选择组件，支持单列和多列级联选择，列数没有限制。
候选数据支持本地数据、uniCloud 云数据库数据，也支持通过默认插槽完全自定义输入框。

相比picker组件，uni-data-picker有如下优势和不同：
1. 弹出的候选区更大，比全屏略矮，选择更方便
2. uni-data-picker是点击即选中，而picker是先滚动到中间、再点击右上角“确定”
3. uni-data-picker没有列数限制，每次只显示一列候选，之前的选择在选择区的上方通过导航链接展示。picker是并排显示，屏幕空间有限，一般不超过3列，并且文字太长时显示不全。
4. 符合datacom规范，绑定数据即可，减少大量模板代码编写

`<uni-data-picker-view>` 是不带弹窗的选择面板，可以单独嵌入页面使用。`<uni-data-picker>` 内部的弹窗区域也是基于它实现的。

示例页面：包含单列本地数据、多列本地树形数据、云端数据、自定义插槽、只读模式、externalClass 和事件回显等完整示例。
- `/pages/uni-ui/data-picker/data-picker.uvue`
- `/pages/uni-ui/data-picker/data-picker-view.uvue`

### 基本用法

#### 单列本地数据

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

#### 多列本地数据

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

多列本地数据为树形数组，每个节点支持以下字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| text | String | 显示文字 |
| value | String | 唯一值，用于 v-model 和回显 |
| children | Array | 子节点，没有该字段或为空时视为叶子节点 |
| disable | Boolean | 是否禁用当前节点 |
| isleaf | Boolean | 是否强制标记为叶子节点 |

字段名不是 `text` / `value` 时，可通过 `default-props` 映射：

```html
<uni-data-picker
  :localdata="list"
  :default-props="{ text: 'name', value: 'id' }"
  v-model="value"
/>
```

#### 云端数据

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

#### 自定义插槽

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

#### 只读模式

只读状态下不会打开选择弹窗，点击输入框会触发 `inputclick`：

```html
<uni-data-picker
  :readonly="true"
  :localdata="classDataTree"
  v-model="classValue"
  @inputclick="onInputClick"
/>
```

### externalClass

`uni-data-picker` 可通过 `input-class`、`error-class` 自定义输入框和错误提示，通过 `popup-class`、`cover-class` 自定义弹出框和遮罩层：

```html
<uni-data-picker
  :localdata="classDataTree"
  v-model="classValue"
  input-class="demo-picker-input"
  error-class="demo-picker-error"
  popup-class="demo-picker-popup"
  cover-class="demo-picker-cover"
/>
```

`uni-data-picker-view` 可通过以下扩展类自定义选择面板：

```html
<uni-data-picker-view
  collection="opendb-city-china"
  field="code as value, name as text"
  v-model="address"
  tab-item-class="demo-tab"
  list-view-class="demo-list-view"
  list-item-class="demo-list-item"
  list-item-text-class="demo-list-item-text"
  list-item-check-class="demo-check"
  loading-class="demo-loading"
  error-class="demo-error"
/>
```

### Props

#### uni-data-picker

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| localdata | Array | [] | 本地树形数据 |
| collection | String \| Array | '' | uniCloud 表名，或表名数组 |
| field | String | '' | JQL 查询字段，需要将值字段映射为 `value`、文字字段映射为 `text` |
| orderby | String | '' | 排序字段，例如 `value asc` |
| where | String \| Object | '' | 查询条件 |
| page-size | Number | 20 | 每页数据条数 |
| page-current | Number | 1 | 当前页码 |
| getcount | Boolean | false | 是否返回总数 |
| gettree | String \| Object | '' | 树形查询配置 |
| gettreepath | String \| Object | '' | 按节点路径回显查询配置 |
| startwith | String | '' | 树形查询的起始条件 |
| limitlevel | Number | 10 | 最大级联层级 |
| groupby | String | '' | 分组字段 |
| group-field | String | '' | 分组后返回的字段 |
| distinct | Boolean | false | 是否对 `field` 去重 |
| foreign-key | String | '' | JQL 外键字段 |
| self-field | String | '' | 树形模式的当前节点字段 |
| parent-field | String | '' | 树形模式的父节点字段 |
| default-props | Object | - | 自定义节点字段名，如 `{ text: 'name', value: 'id' }` |
| model-value | String \| Object | '' | 当前值，支持 `v-model` |
| value | String \| Object | '' | 当前值，`model-value` 的兼容写法 |
| placeholder | String | '' | 未选择时的占位文字 |
| tab-placeholder | String | '' | 层级 tab 未选择时的占位文字 |
| popup-title | String | '' | 弹窗标题 |
| readonly | Boolean | false | 是否只读，只读时点击触发 `inputclick` |
| split | String | '/' | 多级已选值之间的分隔符 |
| ellipsis | Boolean | true | 已选文字是否省略 |
| input-class | String | '' | externalClass，输入框容器样式 |
| error-class | String | '' | externalClass，错误提示文字样式 |
| popup-class | String | '' | externalClass，弹出框容器样式 |
| cover-class | String | '' | externalClass，遮罩层样式 |

#### uni-data-picker-view

`uni-data-picker-view` 支持上述除 `placeholder`、`popup-title`、`readonly`、`split`、`input-class`、`popup-class`、`cover-class` 之外的公共数据属性，另外支持：

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| ellipsis | Boolean | true | 列表文字是否省略 |
| tab-item-class | String | '' | externalClass，顶部层级 tab 样式 |
| list-view-class | String | '' | externalClass，列表容器样式 |
| list-item-class | String | '' | externalClass，列表项样式 |
| list-item-text-class | String | '' | externalClass，列表项文字样式 |
| list-item-check-class | String | '' | externalClass，选中标记样式 |
| loading-class | String | '' | externalClass，加载图标样式 |
| error-class | String | '' | externalClass，错误提示样式 |

### Events

#### uni-data-picker

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 完成选择后触发 | `e.detail.value: Array<UTSJSONObject>`，已选节点数组 |
| nodeclick | 点击任意层级节点时触发 | 被点击的节点对象 |
| popupopened | 选择弹窗打开时触发 | - |
| popupclosed | 选择弹窗关闭时触发 | - |
| inputclick | 只读模式下点击输入框时触发 | - |
| update:modelValue | v-model 回写，值为最后一级节点的 `value` | `value: string` |

#### uni-data-picker-view

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 完成选择后触发 | `e.detail.value: Array<UTSJSONObject>`，已选节点数组 |
| nodeclick | 点击任意层级节点时触发 | 被点击的节点对象 |
| update:modelValue | v-model 回写，值为最后一级节点的 `value` | `value: string` |

### Slots

#### uni-data-picker

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 自定义输入框区域 | `data: Array<UTSJSONObject>`、`error: UniCloudError \| null` |
| picker-loading | 已选值加载中的自定义内容 | `loading: boolean` |

#### uni-data-picker-view

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| picker-view-loading | 面板加载中的自定义内容 | `loading: boolean` |

### Expose

#### uni-data-picker-view

| 方法名 | 说明 |
| --- | --- |
| loadData(selectedPaths: Array<UTSJSONObject>) | 重新加载数据，并可选传入已选节点用于回显 |

### 事件回显示例

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

### 说明

- `localdata` 优先级高于 `collection`，同时传入时使用本地数据。
- 单列模式在选中节点后触发 `change`；多列树形模式在选中叶子节点（或没有子节点的节点）后触发 `change`，点击非叶子节点时只触发 `nodeclick`。
- `readonly` 只控制是否打开弹窗，不会禁用组件本身；只读时点击输入框会触发 `inputclick`。
- 云端数据依赖 uniCloud 服务空间，未关联服务空间时查询会失败，错误信息会通过默认插槽的 `error` 参数或组件的 `error-class` 区域展示。
- 组件已内置基础暗黑模式样式（`prefers-color-scheme: dark`）。如需更精细的暗色主题，可通过外部 `class` 与 externalClass 组合覆盖颜色。
- 以下参数已预留，当前版本暂未参与内部逻辑：`page-data`、`multiple`、`manual`、`load-time`、`preload`、`step-searh`、`page-indistinct`。

### [查看文档](https://uniapp.dcloud.io/component/uniui/uni-data-picker)
