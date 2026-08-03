---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-index-bar
---

::: sourceCode
## uni-index-bar
:::

索引列表组件

> 本 Component 是 uni ext component，需下载插件：[uni-index-bar](https://ext.dcloud.net.cn/plugin?id=27847)


### 介绍

本组件以竖排方式显示字母索引，常悬浮或固定于列表右侧，用户通过点击或滑动索引条上的字母索引，触发 `select` 事件。在该事件中通过代码驱动指定的列表滚动到该字母索引所在的位置。

本组件为绝对定位，默认垂直居中于父容器右侧。

本组件不包括 list-view 组件，需要配合 list-view 使用。list-view 中需要有对应索引的 list-item，且这些 list-item 需要有 id 属性，可以通过 `scroll-into-view` 属性或 `scrollTop` 属性跳转。

本组件包括一个指示器（indicator）子组件。当用户手指触摸在索引条上的某个字母时，在触摸的字母左边悬浮显示一个水滴形气泡，箭头指向当前触摸的字母。

### 基本用法

```html
<view style="flex: 1; position: relative;">
  <list-view ref="listRef" style="flex: 1;">
    <!-- 列表内容 -->
  </list-view>
  <uni-index-bar @select="onSelect"></uni-index-bar>
</view>
```

```uts
const onSelect = (index: string) => {
  // 处理索引选择，滚动列表到对应位置
}
```

### 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择索引时触发 | index: string - 当前选择的索引字符 |

### 外部样式类

| 类名 | 说明 |
|------|------|
| indicator-view-class | 指示器容器样式，可自定义气泡背景色等 |
| indicator-text-class | 指示器文字样式，可自定义文字颜色等 |

### 示例

#### 自定义索引

```html
<uni-index-bar :indexs="'☆\nA\nB\nC\n#'" @select="onSelect"></uni-index-bar>
```

#### 自定义样式

```html
<uni-index-bar
  indicator-view-class="custom-indicator"
  indicator-text-class="custom-indicator-text"
  style="color: aqua;"
  @select="onSelect">
</uni-index-bar>
```

```css
.custom-indicator {
  background-color: #007aff;
}
.custom-indicator-text {
  color: #ffff00;
}
```

#### 配合 list-view 使用

```html
<view style="flex: 1; position: relative;">
  <list-view ref="listRef" style="flex: 1;" :scroll-into-view="indexViewID">
    <template v-for="group in cityGroups" :key="group.index">
      <list-item :id="'idx-' + group.index" type="header">
        <view class="group-header">
          <text>{{ group.index }}</text>
        </view>
      </list-item>
      <list-item v-for="city in group.cities" :key="city.id" type="city">
        <view class="city-item">
          <text>{{ city.name }}</text>
        </view>
      </list-item>
    </template>
  </list-view>
  <uni-index-bar :indexs="indexList" @select="onSelect"></uni-index-bar>
</view>
```

```uts
const indexList = cityGroups.map((g): string => g.index).join('\n')
const indexViewID = ref("")

const onSelect = (index: string) => {
  indexViewID.value = 'idx-' + index
}
```



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.08 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| indexs | string | "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ" | 索引字符列表，使用换行符 \n 分隔，每行作为一个索引项 |
| indicatorViewClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 指示器容器的自定义样式类，触摸时显示当前索引的气泡 |
| indicatorTextClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 指示器内文字的自定义样式类 |
| @select | Event |   | 选择索引时触发，参数为当前选择的索引字符，类型为 string |

<!-- UTSCOMJSON.uni-index-bar.fileFormates -->



<!-- UTSCOMJSON.uni-index-bar.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/index-bar/index-bar.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/index-bar/index-bar.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/index-bar/index-bar

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/index-bar/index-bar

>示例
```vue
<template>
	<view style="flex: 1; flex-direction: column; position: relative;">
		<!-- 控制条 -->
			<view class="control-bar">
				<button class="control-btn" @click="toggleStyle">{{ data.useCustomStyle ? '默认样式' : '自定义样式' }}</button>
				<button class="control-btn" @click="toggleIndexs">{{ data.useCustomIndexs ? '根据数据设索引' : '自定义索引' }}</button>
			</view>
			<list-view ref="listRef" style="flex: 1;" class="city-list" :scroll-into-view="data.indexViewID">
			<sticky-section v-for="group in cityGroups" :key="group.index"
			<!-- #ifdef APP && VUE3-VAPOR -->
			:preload="true"
			<!-- #endif -->
			>
				<sticky-header :id="'idx-' + group.index">
					<view class="group-header">
						<text class="group-header-text">{{ group.index }}</text>
					</view>
				</sticky-header>
				<!-- 每个城市作为独立的 list-item -->
				<list-item v-for="city in group.cities" :key="city.pinyin" type="city">
					<view class="city-item">
						<text class="city-name">{{ city.name }}</text>
					</view>
				</list-item>
			</sticky-section>
		</list-view>
			<uni-index-bar
				:indexs="currentIndexs"
				:indicator-view-class="data.useCustomStyle ? 'custom-indicator' : ''"
				:indicator-text-class="data.useCustomStyle ? 'custom-indicator-text' : ''"
				:style="data.useCustomStyle ? 'color: aqua;' : ''"
				@select="onSelect">
			</uni-index-bar>
	</view>
</template>

<script lang="uts" setup>
	import { cityGroups } from './cities.uts'

	// 默认索引列表
	const defaultIndexs = cityGroups.map((g) : string => g.index).join('\n')
	// 自定义索引列表
	const customIndexs = '☆\nA\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY\nZ\n#'

	type Data = {
		useCustomStyle: boolean
		useCustomIndexs: boolean
		indexViewID: string
	}

	const data = reactive<Data>({
		useCustomStyle: false,
		useCustomIndexs: false,
		indexViewID: ""
	})

	// 当前使用的索引
	const currentIndexs = computed(() : string => data.useCustomIndexs ? customIndexs : defaultIndexs)

	const listRef = ref<UniListViewElement | null>(null)

	const toggleStyle = () => {
		data.useCustomStyle = !data.useCustomStyle
	}

	const toggleIndexs = () => {
		data.useCustomIndexs = !data.useCustomIndexs
	}

	const onSelect = (index : string) => {
		const list = listRef.value
		if (list == null) {
			return
		}
		// console.log('选择了索引：', index)
		const childId = 'idx-' + index
		// #ifndef VUE3-VAPOR && APP-HARMONY
		// TODO 鸿蒙蒸汽模式修复scrollIntoView不能准确滚动到孙子节点的问题后也使用 scrollIntoView
		data.indexViewID = childId
		// #endif
		// #ifdef VUE3-VAPOR && APP-HARMONY
		const element = uni.getElementById(childId)
		if (element != null) {
			// 使用 scrollTop 属性滚动
			const rect = element.getBoundingClientRect()
			const listRect = list.getBoundingClientRect()
			const scrollTop = list.scrollTop + (rect.top - listRect.top)
			list.scrollTop = scrollTop
		}
		// #endif
	}

	defineExpose({
		data,
		currentIndexs,
		toggleStyle,
		toggleIndexs,
		onSelect
	})
</script>

<style>
	.control-bar {
		flex-direction: row;
		padding: 10px;
		background-color: var(--background-color, #f5f5f5);
	}

	.control-btn {
		flex: 1;
		margin: 0 5px;
		font-size: 14px;
	}

	.group-header {
		background-color: var(--background-color, #f5f5f5);
		padding-left: 16px;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.group-header-text {
		font-size: 14px;
		color: var(--text-color, #333333);
		opacity: 0.7;
		font-weight: bold;
	}

	.city-list {
		background-color: var(--list-background-color, #ffffff);
	}

	.city-item {
		padding-left: 16px;
		padding-top: 14px;
		padding-bottom: 14px;
		background-color: var(--list-background-color, #ffffff);
		border-bottom-width: 1px;
		border-bottom-color: var(--border-color, #eeeeee);
		border-bottom-style: solid;
	}

	.city-name {
		font-size: 16px;
		color: var(--text-color, #333333);
	}

	.custom-indicator {
		background-color: #007aff;
	}

	.custom-indicator-text {
		color: #ffff00;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-index-bar)
