---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-data-v-marquee
---

::: sourceCode
## uni-data-vertical-marquee

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-data-vertical-marquee


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-data-v-marquee/components/uni-data-vertical-marquee

:::

绑定数组数据，上下轮播；用于公告、搜索框推荐词等场景

> 本 Component 是 uni ext component，需下载插件：[uni-data-vertical-marquee](https://ext.dcloud.net.cn/plugin?id=30514)


# uni-data-vertical-marquee 上下滚动文字组件

`uni-data-vertical-marquee` 是符合 datacom 规范的组件，绑定数组数据，上下轮播。常用于两个场景：

1. 上下轮播的公告。
2. 搜索框中上下轮播的搜索推荐词。

传统的水平跑马灯marquee，由于文字不停在变化位置，追视困难，体验不佳。定时上下滚动的文字，既吸引了眼球，又减少了追视困难。

本组件自带高性能优化，
- 无论公告内容多少条，内部只有两个Text组件实例。
- 组件所在页面不在栈顶时，定时器会自动停止。

本组件通过 `localdata` 或 uniCloud 数据绑定一个数组，数据格式兼容以下两种数组：

1. 对象数组

```json
[{
	"text": "公告内容1",
	"value": "xxx"
}]
```

2. 字符串数组

```json
["公告1", "公告2"]
```

数据只有一条时，不会上下滚动。数据有多条时，会按时上下滚动。滚动的间隔毫秒数，通过组件的 `interval` 属性控制。


## 基本用法

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

## 属性

除了绑定数据的 datacom 相关属性（`localdata`、`collection`、`field`、`where`、`orderby`、`page-size` 等），组件对外暴露以下属性：

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| localdata | Array | `[]` | 本地数据，支持对象数组 `[{ text, value }]` 或字符串数组 `["公告1", "公告2"]` |
| collection | String | `''` | uniCloud 数据库集合名称；设置后且未提供 `localdata` 时使用云端数据 |
| interval | Number | `3000` | 滚动间隔毫秒数 |
| text-class | String | `''` | 文字 external class，用于定制文字样式 |

云端查询返回的数据需要包含 `text`、`value` 字段，也可以通过 `field` 设置别名，例如 `field="name as text, code as value"`。

支持绑定OpenDB的opendb-notice表（可在database菜单右键直接新建出这个表）。

使用云端数据前，需要：

1. 使用 HBuilder 5.32 或更高版本。
2. 为项目关联 uniCloud 服务空间。
3. 配置目标集合的读取权限。

只使用 `localdata` 时不需要关联 uniCloud 服务空间。`localdata` 与 `collection` 同时设置时，优先使用本地数据。

## 事件

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

参数说明：

| 字段 | 说明 |
| --- | --- |
| index | 当前数据项索引 |
| data | 当前数据项原始数据（对象数组时为对象，字符串数组时为字符串） |

## 方法

通过组件 ref 可以调用 datacom 相关方法：

| 方法 | 说明 |
| --- | --- |
| loadData | 加载云端数据 |
| refresh | 按当前查询条件重新加载云端数据 |
| clear | 清空当前查询结果，不会删除云数据库数据 |

## 自定义样式

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
```

组件根元素为 `view`，在组件标签上写的 `class` 会作用于根元素，可用于控制组件宽度等整体样式。

## 定时器与页面可见性

组件会监听自己所在的页面：

- 如果不在栈顶（页面被覆盖或切后台），停止定时器；恢复到栈顶时重新判断是否启动。
- 在支持相交API的平台会额外判断组件是否位于可视区域：在可视区域运行定时器，否则关闭定时器。



### 兼容性 <Help />
Web(VDOM): 5.33; Web(Vapor): 5.41; 微信小程序: 5.33; 支付宝小程序: 5.33; Android(Vapor): 5.33; iOS(Vapor): 5.33; HarmonyOS(Vapor): 5.33


### 属性 
| 名称 | 类型 | 描述 |
| :- | :- | :- |
| localdata | Array |   |
| collection | string |   |
| interval | number |   |
| textClass | string([string.ClassString](/uts/data-type.md#ide-string)) |   |
| @click | Function | 点击文字时触发；参数为 { index, data } |
| @change | Function | 轮播切到新的一条时触发；参数为 { index, data }，仅回传索引与原始数据以降低高频开销 |

<!-- UTSCOMJSON.uni-data-vertical-marquee.fileFormates -->



<!-- UTSCOMJSON.uni-data-vertical-marquee.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/data-vertical-marquee/data-vertical-marquee.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/data-vertical-marquee/data-vertical-marquee.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/data-vertical-marquee/data-vertical-marquee

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/data-vertical-marquee/data-vertical-marquee

>示例
```vue
<template>
	<view class="intro">
		<text class="page-title">uni-data-vertical-marquee 上下滚动文字</text>
		<text class="page-desc">绑定数组数据上下轮播，支持对象数组与字符串数组；数据多于一条时定时滚动，组件始终只复用两个 text 渲染。</text>
	</view>

	<view class="group-header">
		<text class="group-title">常见场景</text>
	</view>

	<view class="section">
		<text class="section-title">公告通知</text>
		<text class="section-desc">左侧图标搭配上下滚动的公告文字，点击公告文字可回传数据。</text>
		<view class="notice-bar">
			<uni-icons type="sound" class="notice-bar__icon" />
			<view class="notice-bar__body">
				<uni-data-vertical-marquee class="test-notice-marquee" :localdata="data.noticeList" text-class="notice-bar__text" @click="onNoticeClick" />
			</view>
		</view>
	</view>

	<view class="section">
		<text class="section-title">搜索框推荐词</text>
		<text class="section-desc">搜索框内上下滚动推荐词，点击搜索按钮弹出当前展示的推荐词。</text>
		<view class="search-bar">
			<view class="search-bar__field">
				<view class="search-bar__word" @click="gotosearch"> <!-- 父子都得监听click，容器宽高不一样-->
					<uni-data-vertical-marquee class="test-search-marquee" :localdata="data.searchWords" text-class="search-bar__word-text" @change="onSearchWordChange" @click="gotosearch" />
				</view>
				<view class="search-bar__divider"></view>
				<text class="search-bar__btn" @tap="onSearch">搜索</text>
			</view>
		</view>
	</view>

	<view class="group-header">
		<text class="group-title">基础用法</text>
	</view>

	<view class="section">
		<text class="section-title">对象数组与点击事件</text>
		<text class="section-desc">数据项使用 text、value 字段，点击文字触发 click 事件并回传点中的数据。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee :localdata="data.noticeList" @click="onNoticeClick" />
		</view>
		<view class="result-block">
			<text class="result-text">最近点击：{{ data.latestClick }}</text>
		</view>
	</view>

	<view class="section">
		<text class="section-title">字符串数组</text>
		<text class="section-desc">直接传入字符串数组，文字即数据本身。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee class="test-string-marquee" :localdata="data.stringList" :interval="2000" @click="onStringClick" />
		</view>
	</view>

	<view class="section">
		<text class="section-title">单条数据不滚动</text>
		<text class="section-desc">数据只有一条时不做上下滚动。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee class="test-single-marquee" :localdata="data.singleList" />
		</view>
	</view>

	<view class="group-header">
		<text class="group-title">属性演示</text>
	</view>

	<view class="section">
		<text class="section-title">interval 滚动间隔</text>
		<text class="section-desc">切换 interval 会即时生效，单位毫秒。当前：{{ data.intervalValue }} ms。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee class="test-interval-marquee" :localdata="data.noticeList" :interval="data.intervalValue" />
		</view>
		<view class="btn-row">
			<button class="demo-btn" size="mini" @click="setInterval1000">1000ms</button>
			<button class="demo-btn" size="mini" @click="setInterval2000">2000ms</button>
			<button class="demo-btn" size="mini" @click="setInterval5000">5000ms</button>
		</view>
	</view>

	<view class="section">
		<text class="section-title">text-class 自定义文字样式</text>
		<text class="section-desc">通过 external class 定制文字字号、颜色、字重等。</text>
		<view class="marquee-box marquee-box-tall">
			<uni-data-vertical-marquee :localdata="data.stringList" text-class="demo-marquee-text" />
		</view>
	</view>

	<view class="section">
		<text class="section-title">动态更新数据</text>
		<text class="section-desc">数据由 1 条增到多条时开始滚动，减到 1 条时停止。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee class="test-dynamic-marquee" :localdata="data.dynamicList" />
		</view>
		<view class="btn-row">
			<button class="demo-btn" size="mini" @click="addDynamicItem">新增一条</button>
			<button class="demo-btn" size="mini" @click="removeDynamicItem">删除一条</button>
		</view>
		<text class="result-text result-standalone">当前条数：{{ data.dynamicList.length }}</text>
	</view>

	<view class="section">
		<text class="section-title">空数据</text>
		<text class="section-desc">数据为空时不渲染内容，也不会启动定时器。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee class="test-empty-marquee" :localdata="data.emptyList" />
		</view>
	</view>

	<view class="group-header">
		<text class="group-title">datacom 云端数据</text>
	</view>

	<view class="section section-last">
		<text class="section-title">collection 与查询参数</text>
		<text class="section-desc">不传 localdata 并设置 collection 后使用 uniCloud 数据，可通过 field / where / orderby 指定查询。需关联服务空间。</text>
		<view class="marquee-box">
			<uni-data-vertical-marquee
				ref="cloudMarquee"
				collection="opendb-notice"
				field="data as text, _id as value"
				orderby="update_time desc"
				:interval="3000"
			/>
		</view>
		<!-- 以下2个属性先屏蔽
		 where="eq(isDel, false)"
		 limit="10"
		 -->
		<view class="btn-row">
			<button class="demo-btn" size="mini" @click="loadCloudData">loadData</button>
			<button class="demo-btn" size="mini" @click="refreshCloudData">refresh</button>
			<button class="demo-btn" size="mini" @click="clearCloudData">clear</button>
		</view>
	</view>
</template>

<script setup lang="ts">

type MarqueeItem = {
	text: string,
	value: string
}

type Data = {
	noticeList: MarqueeItem[],
	stringList: string[],
	singleList: MarqueeItem[],
	emptyList: MarqueeItem[],
	dynamicList: MarqueeItem[],
	intervalValue: number,
	latestClick: string,
	searchWords: MarqueeItem[],
	currentSearchWord: string
}

const data = reactive<Data>({
	noticeList: [
		{ text: '超长公告内容。忽略换行符。\n超长公告内容。超长公告内容。超长公告内容。超长公告内容。', value: 'n1' },
		{ text: '数据驱动的上下滚动文字组件', value: 'n2' },
		{ text: '支持对象数组与字符串数组', value: 'n3' }
	],
	stringList: [
		'公告：系统将于今晚 23:00 维护',
		'公告：新增暗黑模式支持',
		'公告：版本 1.0.1 已发布'
	],
	singleList: [
		{ text: '只有一条数据，不会上下滚动', value: 's1' }
	],
	emptyList: [],
	dynamicList: [
		{ text: '初始公告 1', value: 'd1' }
	],
	intervalValue: 3000,
	latestClick: '未点击',
	searchWords: [
		{ text: '搜索热词1', value: 'word1' },
		{ text: '搜索热词2', value: 'word2' },
		{ text: '搜索热词3', value: 'word3' },
		{ text: '搜索热词4', value: 'word4' }
	],
	currentSearchWord: '搜索热词1'
})
let dynamicSeed = 1

const cloudMarquee = ref<any>(null)

function onNoticeClick(event : any) {
	const item = event.data
	const text = typeof item === 'string' ? item : (item != null ? item['text'] : '')
	data.latestClick = `index=${event.index}, text=${text}`
	console.log('uni-data-vertical-marquee click:', event)
}

function onStringClick(event : any) {
	const item = event.data
	const text = typeof item === 'string' ? item : (item != null ? item['text'] : '')
	data.latestClick = `index=${event.index}, text=${text}`
	console.log('uni-data-vertical-marquee click:', event)
}

function onSearchWordChange(event : any) {
	const item = event.data
	data.currentSearchWord = item != null ? item['text'] : ''
}

const gotosearch = () => {
	uni.showToast({
		title: '点击了搜索框。应该转到搜索页面',
		icon: 'none'
	})
}

function onSearch() {
	uni.showToast({
		title: '搜索：' + data.currentSearchWord,
		icon: 'none'
	})
}

function setInterval1000() : void {
	data.intervalValue = 1000
}
function setInterval2000() : void {
	data.intervalValue = 2000
}
function setInterval5000() : void {
	data.intervalValue = 5000
}

function addDynamicItem() : void {
	dynamicSeed++
	data.dynamicList.push({ text: '新增公告 ' + dynamicSeed, value: 'd' + dynamicSeed })
}

function removeDynamicItem() : void {
	if (data.dynamicList.length > 0) {
		data.dynamicList.pop()
	}
}

function loadCloudData() : void {
	cloudMarquee.value?.loadData()
}
function refreshCloudData() : void {
	cloudMarquee.value?.refresh()
}
function clearCloudData() : void {
	cloudMarquee.value?.clear()
}

defineExpose({
	data,
	setInterval1000,
	setInterval2000,
	setInterval5000,
	addDynamicItem,
	removeDynamicItem
})
</script>

<style>
page {
	background-color: var(--background-color, #f5f5f5);
}

.intro {
	padding: 18px 16px;
	background-color: var(--content-background-color, #ffffff);
}

.page-title {
	font-size: 20px;
	font-weight: bold;
	color: var(--text-color, #222222);
}

.page-desc {
	margin-top: 8px;
	font-size: 14px;
	line-height: 21px;
	color: var(--secondary-text-color, #657180);
}

.group-header {
	padding: 18px 16px 6px;
}

.group-title {
	font-size: 14px;
	font-weight: bold;
	color: var(--secondary-text-color, #657180);
}

.section {
	padding: 16px;
	margin-top: 10px;
	background-color: var(--content-background-color, #ffffff);
}

.section-last {
	padding-bottom: 32px;
}

.section-title {
	margin-bottom: 12px;
	font-size: 16px;
	font-weight: bold;
	color: var(--text-color, #333333);
}

.section-desc {
	margin-top: -4px;
	margin-bottom: 12px;
	font-size: 13px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

.marquee-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 40px;
	padding-left: 12px;
	padding-right: 12px;
	border-width: 1px;
	border-style: solid;
	border-color: var(--divider-color, #e2e5e9);
	border-radius: 6px;
	background-color: var(--active-background-color, #f7f8fa);
	color: #333333;
}

.marquee-box-tall {
	height: 56px;
}

.demo-marquee-text {
	font-size: 17px;
	color: #007aff;
	font-weight: bold;
}

.notice-bar {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px 12px;
	background-color: #fff7e6;
}

.notice-bar__icon {
	margin-right: 8px;
	font-size: 18px;
	color: #fe7c00;
}

.notice-bar__body {
	flex: 1;
	overflow: hidden;
}

.notice-bar__text {
	font-size: 14px;
	color: #fe7c00;
}

.search-bar {
	padding: 12px;
	/* border-radius: 8px; */
	background-color: #2b5cff;
}

.search-bar__field {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 44px;
	padding-left: 16px;
	padding-right: 16px;
	border-radius: 22px;
	background-color: #ffffff;
}

.search-bar__word {
	flex: 1;
	overflow: hidden;
}

.search-bar__word-text {
	font-size: 15px;
	color: #333333;
}

.search-bar__divider {
	width: 1px;
	height: 16px;
	margin-left: 12px;
	margin-right: 12px;
	background-color: #c9d2f0;
}

.search-bar__btn {
	font-size: 15px;
	color: #2b5cff;
}

.btn-row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 12px;
}

.demo-btn {
	margin-right: 8px;
	margin-bottom: 8px;
}

.result-block,
.result-standalone {
	margin-top: 10px;
}

.result-block {
	flex-direction: column;
}

.result-text {
	font-size: 13px;
	line-height: 20px;
	color: var(--secondary-text-color, #657180);
}

@media (prefers-color-scheme: dark) {
	.marquee-box {
		color: #ffffff;
		background-color: #262626;
	}

	.demo-marquee-text {
		color: #91caff;
	}
}
</style>

```

:::

