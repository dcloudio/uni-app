# uni-data-vertical-marquee 上下滚动文字组件

`uni-data-vertical-marquee` 是符合 datacom 规范的组件，绑定数组数据，上下轮播。常用于两个场景：

1. 上下轮播的公告。
2. 搜索框中上下轮播的搜索推荐词。

传统的水平跑马灯 marquee，由于文字不停在变化位置，追视困难，体验不佳。定时上下滚动的文字，既吸引了眼球，又减少了追视困难。

本组件自带高性能优化：

- 无论公告内容多少条，内部只有两个 Text 组件实例。
- 组件所在页面不在栈顶时，定时器会自动停止。

## 使用方式

组件负责：接收 `localdata` 或 uniCloud 云端数据、归一化对象数组与字符串数组、定时上下滚动、在页面不可见时暂停定时器，并在点击或切换时派发事件。

使用者负责：提供数据源与滚动间隔、通过 `text-class` 定制文字样式、控制组件外层容器宽高与垂直居中、按需处理 `click` / `change` 事件。

## 基本用法

本组件通过 `localdata` 或 uniCloud 数据绑定一个数组，数据格式兼容以下两种数组。

对象数组：

```json
[{
	"text": "公告内容1",
	"value": "xxx"
}]
```

字符串数组：

```json
["公告1", "公告2"]
```

数据只有一条时，不会上下滚动。数据有多条时，会按时上下滚动。滚动的间隔毫秒数，通过组件的 `interval` 属性控制。

通过 `localdata` 提供本地数据（localdata 是相对于 uniCloud 云端数据的本地数据概念）。

```vue
<template>
  <uni-data-vertical-marquee :localdata="notices"/>
</template>

<script setup lang="ts">
const notices = [
  { text: '公告：系统将于今晚维护', value: 'n1' },
  { text: '公告：新增暗黑模式支持', value: 'n2' }
]
</script>
```

字符串数组同样支持：

```vue
<uni-data-vertical-marquee :localdata="['公告1', '公告2', '公告3']" />
```

云端数据通过 `collection` 绑定集合，并可配合 `field`、`where`、`orderby`、`page-size` 等查询参数。云端查询返回的数据需要包含 `text`、`value` 字段，也可以通过 `field` 设置别名，例如 `field="name as text, code as value"`。支持绑定 OpenDB 的 opendb-notice 表（可在 database 菜单右键直接新建出这个表）。

使用云端数据前，需要：

1. 使用 HBuilder 5.32 或更高版本。
2. 为项目关联 uniCloud 服务空间。
3. 配置目标集合的读取权限。

只使用 `localdata` 时不需要关联 uniCloud 服务空间。`localdata` 与 `collection` 同时设置时，优先使用本地数据。

### 点击与切换事件

点击组件的文字会触发 `click` 回调，回调参数中包括点中的索引与原始数据。公告场景一般会使用，搜索框场景一般不监听。

```vue
<template>
  <uni-data-vertical-marquee :localdata="notices" @click="onClick" />
</template>

<script setup lang="ts">
function onClick(event : any) {
  console.log('索引', event.index)
  console.log('原始数据', event.data)
}
</script>
```

轮播切到新的一条时会触发 `change` 回调，参数结构与 `click` 相同。搜索框推荐词场景可监听该事件，记录当前展示的推荐词。`change` 触发频率较高，参数只保留 `index` 与 `data`，以减少回调数据量。

```vue
<template>
  <uni-data-vertical-marquee :localdata="words" @change="onChange" />
</template>

<script setup lang="ts">
function onChange(event : any) {
  console.log('索引', event.index)
  console.log('当前数据', event.data)
}
</script>
```

### 调用组件方法

通过组件 ref 可以调用 datacom 相关方法：`loadData` 加载云端数据，`refresh` 按当前查询条件重新加载云端数据，`clear` 清空当前查询结果（不会删除云数据库数据）。

```vue
<template>
  <uni-data-vertical-marquee ref="marqueeRef" collection="opendb-notice" field="data as text, _id as value" />
</template>

<script setup lang="ts">
const marqueeRef = ref<any>(null)

function reload() {
  marqueeRef.value?.loadData()
}
</script>
```

### 自定义样式

组件根为 `view`，下面有 2 个 `text`。在组件外层通过 `text-class` 可以设置组件文字样式。

组件不自带任何文字样式与高度。文字样式通过 external class `text-class` 控制。
容器高度自动被文字撑开。整体在父容器中的垂直居中由外层控制。

文字单行显示，超出容器宽度时显示省略号。微信小程序端展示时会将换行符（`\n`、`\r`、`\r\n`）替换为空格；`click` / `change` 事件仍回传未经修改的原始数据。

```vue
<template>
  <view class="notice-bar">
    <uni-data-vertical-marquee :localdata="notices" text-class="marquee-text" />
  </view>
</template>
```

```css
.notice-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
}

.marquee-text {
  font-size: 16px;
  color: #007aff;
  font-weight: bold;
}

@media (prefers-color-scheme: dark) {
  .marquee-text {
    color: #91caff;
  }
}
```

组件根元素为 `view`，在组件标签上写的 `class` 会作用于根元素，可用于控制组件宽度等整体样式。

## 注意事项

- 组件会监听自己所在的页面：如果不在栈顶（页面被覆盖或切后台），停止定时器；恢复到栈顶时重新判断是否启动。
- 在支持相交 API 的平台会额外判断组件是否位于可视区域：在可视区域运行定时器，否则关闭定时器。
- 数据中只有一条时不会滚动；数据为空时不渲染内容，也不会启动定时器。
- 自定义文字颜色时需要同时考虑暗黑模式下的可读性。
