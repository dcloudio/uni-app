---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-data-picker-x
---

::: sourceCode
## uni-data-picker

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-data-picker


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-data-picker-x/components/uni-data-picker

:::

通过本地数据或 datacom 数据的级联选择组件，支持单列和多列级联选择，列数没有限制，如果屏幕显示不全，顶部tab区域会左右滚动。

> 本 Component 是 uni ext component，需下载插件：[uni-data-picker](https://ext.dcloud.net.cn/plugin?name=uni-data-picker-x)


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

`uni-data-picker` 可通过 `input-class`、`error-class` 自定义输入框和错误提示，通过 `popup-class`、`mask-class` 自定义弹出框和遮罩层（`cover-class` 为旧命名，仍兼容，建议改用 `mask-class`）：

```html
<uni-data-picker
  :localdata="classDataTree"
  v-model="classValue"
  input-class="demo-picker-input"
  error-class="demo-picker-error"
  popup-class="demo-picker-popup"
  mask-class="demo-picker-mask"
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
| mask-class | String | '' | externalClass，遮罩层样式 |
| cover-class | String | '' | externalClass，遮罩层样式（已废弃，请使用 `mask-class`） |

#### uni-data-picker-view

`uni-data-picker-view` 支持上述除 `placeholder`、`popup-title`、`readonly`、`split`、`input-class`、`popup-class`、`mask-class`、`cover-class` 之外的公共数据属性，另外支持：

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



### 兼容性 <Help />
Web: 5.33; Android: 5.33; iOS: 5.33; HarmonyOS: 5.33


### 属性 
| 名称 | 类型 |
| :- | :- |
| placeholder | string |
| readonly | boolean |
| split | string |
| ellipsis | boolean |
| inputClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| errorClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| popupTitle | string |
| popupClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| maskClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| coverClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| @popupopened | Event |
| @popupclosed | Event |
| @nodeclick | Event |
| @change | Event |
| @input | Event |
| @update:modelValue | Event |
| @inputclick | Event |

<!-- UTSCOMJSON.uni-data-picker.fileFormates -->



<!-- UTSCOMJSON.uni-data-picker.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/data-picker/data-picker.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/data-picker/data-picker.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/data-picker/data-picker
```uvue
<template>
  <scroll-view class="page">
    <text class="desc">uni-data-picker 支持本地数据、云端数据和自定义插槽；下面示例会把 change、nodeclick、popupopened、popupclosed、inputclick 的触发结果实时显示在页面底部。</text>

    <text class="title">单列本地数据</text>
    <view class="uni-px-5 uni-pb-5">
      <uni-data-picker placeholder="请选择城市" popup-title="请选择" tab-placeholder="请选择" :localdata="cityList"
        v-model="cityValue" @change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
        @popupclosed="onpopupclosed" @inputclick="inputclick"></uni-data-picker>
    </view>

    <text class="title">多列本地数据</text>
    <view class="uni-px-5 uni-pb-5">
      <uni-data-picker placeholder="请选择班级" popup-title="请选择" tab-placeholder="请选择" :localdata="classDataTree"
        v-model="classValue" @change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
        @popupclosed="onpopupclosed" @inputclick="inputclick"></uni-data-picker>
    </view>

    <text class="title">只读模式（点击输入框触发 inputclick）</text>
    <view class="uni-px-5 uni-pb-5">
      <uni-data-picker placeholder="只读状态，不可选择" popup-title="请选择" tab-placeholder="请选择" :localdata="classDataTree"
        :readonly="true" v-model="classValue" @inputclick="inputclick"></uni-data-picker>
    </view>

    <text class="title">externalClass 自定义输入框、弹出框样式</text>
    <view class="uni-px-5 uni-pb-5">
      <uni-data-picker placeholder="请选择班级" popup-title="请选择" tab-placeholder="请选择" :localdata="classDataTree"
        v-model="externalClassValue" input-class="demo-picker-input" error-class="demo-picker-error"
        popup-class="demo-picker-popup" mask-class="demo-picker-mask" @change="onchange"
        @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed"></uni-data-picker>
    </view>

    <text class="title">自定义插槽</text>
    <uni-data-picker v-slot:default="{ data, error }" title="请选择" :localdata="classDataTree" tab-placeholder="请选择"
      v-model="classValue">
      <view class="input-border">
        <view v-if="error" class="error">
          <text>{{ error }}</text>
        </view>
        <view v-else-if="data.length" class="input-selected">
          <view v-for="(item, index) in data" :key="index" class="selected-item">
            <text>{{ item.text }}</text>
          </view>
        </view>
        <view v-else><text>请选择</text></view>
      </view>
    </uni-data-picker>

    <text class="title">Cloud 数据 (树形)</text>
    <uni-data-picker placeholder="请选择地址" popup-title="请选择所在地区" tab-placeholder="请选择" :preload="true"
      :step-searh="true" self-field="code" parent-field="parent_code" collection="opendb-city-china" orderby="value asc"
      :page-size="50" field="code as value, name as text, eq(type, 2) as isleaf" v-model="address"
      @nodeclick="onnodeclick" @change="onchange" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
    </uni-data-picker>

    <text class="title">事件结果</text>
    <view class="event-panel">
      <view class="event-row">
        <text class="event-label">最近事件</text>
        <text class="event-value">{{ eventState.lastEvent }}</text>
      </view>
      <view class="event-row">
        <text class="event-label">弹窗状态</text>
        <text class="event-value">{{ eventState.popupState }}</text>
      </view>
      <view class="event-row">
        <text class="event-label">change</text>
        <text class="event-value">{{ eventState.changeValue }}</text>
      </view>
      <view class="event-row">
        <text class="event-label">nodeclick</text>
        <text class="event-value">{{ eventState.nodeClick }}</text>
      </view>
      <view class="event-row">
        <text class="event-label">inputclick</text>
        <text class="event-value">{{ eventState.inputClickCount }} 次</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  type EventState = {
    lastEvent : string,
    popupState : string,
    changeValue : string,
    nodeClick : string,
    inputClickCount : number
  }

  const address = ref('110101')
  const classValue = ref('1-2')
  const externalClassValue = ref('')
  const classDataTree = ref(buildClassDataTree())
  const cityValue = ref('')
  const cityList = ref(buildCityList())

  const eventState = reactive<EventState>({
    lastEvent: '暂无',
    popupState: '未打开',
    changeValue: '暂无',
    nodeClick: '暂无',
    inputClickCount: 0
  })

  function buildCityList() : Array<UTSJSONObject> {
    const cityNames : Array<string> = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '成都市', '武汉市', '西安市', '南京市', '重庆市']
    const list : Array<UTSJSONObject> = []
    cityNames.forEach((name : string, index : number) => {
      const item : UTSJSONObject = {
        text: name,
        value: `${index + 1}`
      }
      list.push(item)
    })
    return list
  }

  function buildClassDataTree() : Array<UTSJSONObject> {
    const tree : Array<UTSJSONObject> = []
    for (let i = 1; i <= 10; i++) {
      const children : Array<UTSJSONObject> = []
      for (let j = 1; j <= 50; j++) {
        const child : UTSJSONObject = {
          text: `${i}.${j}班`,
          value: `${i}-${j}`
        }
        children.push(child)
      }
      const node : UTSJSONObject = {
        text: `${i}年级`,
        value: `${i}-0`,
        children: children
      }
      tree.push(node)
    }
    return tree
  }

  function formatNodes(nodes : Array<UTSJSONObject>) : string {
    if (nodes.length == 0) {
      return '空'
    }
    const parts : Array<string> = []
    nodes.forEach((node : UTSJSONObject) => {
      parts.push(`${node['text']}(${node['value']})`)
    })
    return parts.join(' / ')
  }

  function onnodeclick(e : any) {
    const node = e as UTSJSONObject
    eventState.lastEvent = 'nodeclick'
    eventState.nodeClick = `${node['text']}(${node['value']})`
    console.log('nodeclick', node)
  }

  function onpopupopened(e : any) {
    eventState.lastEvent = 'popupopened'
    eventState.popupState = '已打开'
    console.log('onpopupopened')
  }

  function onpopupclosed(e : any) {
    eventState.lastEvent = 'popupclosed'
    eventState.popupState = '已关闭'
    console.log('onpopupclosed')
  }

  function onchange(e : any) {
    const nodes = e.detail.value as Array<UTSJSONObject>
    eventState.lastEvent = 'change'
    eventState.changeValue = formatNodes(nodes)
    console.log('onchange', nodes)
  }

  function inputclick(e : any) {
    eventState.lastEvent = 'inputclick'
    eventState.inputClickCount += 1
    console.log('inputclick')
  }
</script>

<style>
  .page {
    flex: 1;
    padding: 15px;
  }

  .desc {
    font-size: 12px;
    line-height: 18px;
    color: var(--text-color, #64748b);
  }

  .title {
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0 5px 0;
    color: var(--text-color, #333333);
  }

  .input-border {
    border: 1px solid #b3e5fc;
    border-radius: 5px;
    padding: 2px 4px;
  }

  .input-selected {
    flex-direction: row;
    line-height: 2;
  }

  /* externalClass：自定义 uni-data-picker 输入框 */
  .demo-picker-input {
    background-color: #f0fdf4;
    border-color: #22c55e;
    border-radius: 10px;
    padding: 8px 10px;
  }

  .demo-picker-error {
    color: #ea580c;
  }

  /* externalClass：自定义 uni-data-picker 弹出框和遮罩层 */
  .demo-picker-popup {
    height: 300px;
    background-color: #f0fdf4;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }

  .demo-picker-mask {
    background-color: rgba(34, 197, 94, 0.25);
  }

  .event-panel {
    background-color: var(--active-background-color, #f8fafc);
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 20px;
  }

  .event-row {
    flex-direction: row;
    padding: 4px 0;
  }

  .event-label {
    width: 76px;
    font-size: 13px;
    color: #64748b;
  }

  .event-value {
    flex: 1;
    font-size: 13px;
    color: var(--text-color, #0f172a);
  }
</style>

```
:::




::: sourceCode
## uni-data-picker-view

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-data-picker-view


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-data-picker-x/components/uni-data-picker-view

:::

通过本地数据或 datacom 数据的级联选择组件，支持单列和多列级联选择，列数没有限制，如果屏幕显示不全，顶部tab区域会左右滚动。

> 本 Component 是 uni ext component，需下载插件：[uni-data-picker-view](https://ext.dcloud.net.cn/plugin?name=uni-data-picker-x)



### 兼容性 <Help />
Web: 5.33; Android: 5.33; iOS: 5.33; HarmonyOS: 5.33


### 属性 
| 名称 | 类型 |
| :- | :- |
| inDataPicker | boolean |
| ellipsis | boolean |
| tabItemClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| listViewClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| listItemClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| listItemTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| listItemCheckClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| loadingClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| errorClass | string([string.ClassString](/uts/data-type.md#ide-string)) |
| @nodeclick | Event |
| @change | Event |
| @update:modelValue | Event |

<!-- UTSCOMJSON.uni-data-picker-view.fileFormates -->



<!-- UTSCOMJSON.uni-data-picker-view.component_type -->






