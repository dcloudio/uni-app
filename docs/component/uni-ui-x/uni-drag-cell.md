---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-drag-cell
---

::: sourceCode
## uni-drag-cell
:::

可拖拽单元格组件

> 本 Component 是 uni ext component，需下载插件：[uni-drag-cell](https://ext.dcloud.net.cn/plugin?id=27845)


`uni-drag-cell` 是一个基于 `uni-app x + uvue + UTS` 实现的可拖拽排序组件。

它适合这些场景：
- 标签排序
- 宫格排序
- 单列列表排序
- 带删除能力的拖拽
- 尾部追加“+”入口
- 手柄拖拽排序
- 九宫格图片选择和排序
- 支付方式排序

组件通过 v-model 绑定了一个数组，通过插槽渲染绑定数组的内容，通过拖拽调整数组项的顺序。

组件还提供了show-close属性，显示底部删除条，拖到删除条即可删除。

组件还提供了show-append属性，显示尾部的添加插槽。该插槽不参与拖拽排序，始终在最后一个。（添加数组项的逻辑需自行实现）

通过这些能力，本组件具备对数组数据排序、添加、删除的能力。

但本组件不适合超长虚拟列表。不具备拖动到顶部或底部后自动滚动列表的功能。

### 设计目标

这个组件的设计不是“拖一下就立刻改数组”，而是分成两个阶段：

1. **拖拽预览阶段**
   - 拖动过程中，通过 `transform` 动态调整视觉顺序
   - 其他 item 会根据碰撞结果做位移动画
   - 此时外部 `v-model` 还不会被正式改写

2. **拖拽提交阶段**
   - 松手后，才正式修改内部数组顺序
   - 然后通过 `update:modelValue` 和 `change` 把最终结果抛给外部

这样做的好处是：
- 拖动过程更平滑
- 外部响应式更新次数更少
- 更容易支持删除条、追加入口、手柄拖拽等扩展能力

### 交互模式

组件目前支持两种进入拖拽态的方式：长按拖拽和手柄拖拽。

#### 1. 长按拖拽

默认模式。

- 长按某个 item 后进入拖拽态
- 当前长按触发时间为 `350ms`
- 进入拖拽态后，item 会跟随手指/鼠标移动，并且会scale放大1.12倍。
- 拖动过程中持续做碰撞检测，并实时预览排序结果

补充：
- 如果按下后移动距离超过组件内部阈值，会取消本次长按判定，避免页面滚动时误触发拖拽

适合：
- 标签排序
- 宫格排序
- 图片排序

#### 2. 手柄拖拽

当 `handleMode` 为 `true`，且同时提供 `handle` 插槽时，会启用手柄模式。

- 不再需要长按
- 只有拖动手柄才会开始排序
- 内容区本身可以继续点击、滚动、预览

适合：
- 设置项排序
- 表单项排序
- 内容区本身还有点击行为的列表

### 插槽

| 插槽名 | 插槽参数 | 说明 |
| --- | --- | --- |
| `default` | `{ item, index }` | 默认内容插槽，用于渲染每一个可排序项。组件不限制 item 的视觉形式，可以自由渲染标签、卡片、宫格、图片等内容。 |
| `append` | - | 列表末尾的固定入口。不参与拖拽排序，不会写入 `v-model`，不会被删除，适合放“新增按钮”“上传入口”“更多入口”等内容。 |
| `handle` | `{ item, index }` | 拖拽手柄插槽，仅在 `handleMode` 开启时生效。手柄由组件放在每个 item 的右上角，建议给内容区预留右侧空间，避免手柄遮挡正文。 |

### 事件

| 事件名 | 回调参数 | 触发时机 | 说明 |
| --- | --- | --- | --- |
| `change` | 最新数组 | 排序完成后、删除完成后 | 最终结果事件。拖动中的视觉预览不会频繁触发 `change`。 |

### 使用方式

#### 1. 基础标签排序

```vue
<uni-drag-cell v-model="tagList">
  <template #default="{ item, index }">
    <view class="tag-item" @click="onClickTag(item, index)">
      <text>{{ item }}</text>
    </view>
  </template>
</uni-drag-cell>
```

适合：
- 标签拖拽
- 轻量横向流式布局

说明：
- 默认使用长按触发拖拽
- 当前长按触发时间为 `350ms`

#### 2. 宫格排序

```vue
<uni-drag-cell v-model="gridList" :column="3">
  <template #default="{ item }">
    <view class="grid-item">
      <text>{{ item.name }}</text>
    </view>
  </template>
</uni-drag-cell>
```

适合：
- 应用图标
- 功能入口宫格
- 九宫格类布局

#### 3. 带删除条的拖拽

```vue
<uni-drag-cell v-model="list" :show-close="true">
  <template #default="{ item }">
    <view class="cell-item">
      <text>{{ item }}</text>
    </view>
  </template>
</uni-drag-cell>
```

交互：
- 长按进入拖拽
- 拖到屏幕底部删除条
- 删除条高亮后松手即删除

#### 4. 尾部追加一个固定入口

```vue
<uni-drag-cell v-model="tagList" :show-append="true">
  <template #default="{ item }">
    <view class="tag-item">
      <text>{{ item }}</text>
    </view>
  </template>
  <template #append>
    <view class="tag-add" @click="addTag">
      <text>+</text>
    </view>
  </template>
</uni-drag-cell>
```

说明：
- `append` 是通用设计，不局限于图片场景
- 拖拽排序时，`append` 不参与位置计算

#### 5. 九宫格图片选择

```vue
<uni-drag-cell
  v-model="imageList"
  :column="3"
  :show-close="true"
  :show-append="imageList.length < 9">
  <template #default="{ item, index }">
    <view class="image-item" @click="previewImage(index)">
      <image :src="item" mode="aspectFill"></image>
    </view>
  </template>
  <template #append>
    <view class="image-add" @click="chooseImages">
      <text>+</text>
    </view>
  </template>
</uni-drag-cell>
```

设计说明：
- 图片数组本身就是 `v-model`
- `append` 用来放“添加图片”入口
- 当达到上限时，把 `showAppend` 设为 `false`

#### 6. 手柄拖拽排序

```vue
<uni-drag-cell v-model="list" :column="1" :handle-mode="true">
  <template #default="{ item }">
    <view class="cell-item">
      <text>{{ item }}</text>
    </view>
  </template>
  <template #handle>
    <view class="cell-handle">
      <text>≡</text>
    </view>
  </template>
</uni-drag-cell>
```

说明：
- 手柄模式下，不需要长按
- 当前实现中，手柄模式不会再把整个 item 放大
- 这样可以避免单列场景下被父容器裁剪

### 组件内部设计说明

#### 1. 排序预览不是直接改数组

拖动过程中，组件内部维护的是“预览顺序”。

实现方式：
- 记录每个 item 的稳定 id
- 根据碰撞结果生成一份预览顺序
- 通过 `transform` 让其他项移动到目标位置
- 松手后再正式更新数组和 id 顺序

这样可以避免：
- 拖动中频繁改外部数组
- 频繁触发父组件重渲染
- item 身份丢失导致动画错乱

#### 2. 删除判定基于拖动内容区域

删除命中不是简单按手指坐标判断，而是优先按“拖动内容的真实边界”和“删除条边界”是否接触来判断。

这样做是为了避免：
- item 外层有 padding 时提前触发删除
- 不同高度 item 在删除区表现不一致
- web 与 app 坐标系不一致时出现明显偏移

#### 3. 追加项与删除条互不干扰

`append` 项的设计目标是“固定入口”，因此：
- 不参与碰撞排序
- 不参与删除
- 不写入绑定数组

#### 4. 手柄模式与长按模式共用同一套拖拽链路

也就是说：
- 排序逻辑相同
- 删除逻辑相同
- 只是“进入拖拽态”的入口不同

这样可以减少两套逻辑分叉导致的维护成本。

### 性能注意

拖拽时耗费性能的点主要有两个：

#### 1. 拖动中的碰撞检测

每次 move 都会更新：
- 当前拖动偏移
- 删除条命中状态
- 目标悬停位置

这是拖拽组件的必要开销，当前实现已经把重测布局的频率控制在较低水平，只在必要时重新测量。

#### 2. 删除条命中时的实时矩形读取

当启用 `showClose` 时，拖动中会优先读取当前拖动内容的实时矩形，以保证删除命中准确。

这部分是“精度优先”的设计，开销可接受，但不建议把它用于超大数量、超复杂 item 的高频拖拽场景。

### 使用注意事项

#### 1. 建议 item 尺寸稳定

尤其是宫格模式下，建议每个 item 的宽高尽量稳定。

否则可能带来：
- 拖动命中感不一致
- 排序预览观感不稳定

#### 2. 手柄模式下给内容区预留右侧空间

因为手柄是覆盖在 item 右上角的。

建议：
- 内容区右侧留白
- 或者把手柄区域设计成视觉上独立的一块

#### 3. `append` 只是入口，不是数据项

这点非常重要。

不要指望：
- `append` 参与排序
- `append` 进入 `v-model`
- `append` 被删除

如果你需要“真正的数据项”，请直接写进 `modelValue`。

#### 4. 外部不要在拖拽过程中频繁整体替换列表

建议：
- 由组件在松手后统一回传结果
- 父组件收到结果后再更新自己的数据源

不建议：
- 拖动过程中再由父组件持续重建整个数组

#### 5. 不建议用于超大列表或虚拟列表场景

这个组件当前更适合：
- 小中型标签列表
- 宫格
- 表单排序
- 九宫格图片选择

如果是超长列表、虚拟滚动列表，应该使用专门为大数据量设计的方案。

### 平台说明

#### Web

- 支持 pointer / touch 交互

#### Android

- 支持触摸拖拽



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.08 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| modelValue | Array |   | 可拖拽排序的数据源，支持 v-model 双向绑定，内部会在拖拽结束后更新顺序 |
| column | number | 0 | 网格列数。大于 0 时按网格排布，等于 0 时按一行流式排布 |
| showClose | boolean | false | 是否显示拖拽到底部删除栏，开启后可将 item 拖入底部删除 |
| showAppend | boolean | true | 是否显示末尾的 append 插槽（非拖拽状态下） |
| handleMode | boolean | false | 是否启用拖拽手柄模式，仅点击 handle 插槽才能触发拖拽 |
| @update:modelValue | Event |   | v-model 绑定值变化事件，参数为最新数组，类型为数组 |
| @change | Event |   | 排序完成后、删除完成后触发，参数为最新数组，类型为数组 |

<!-- UTSCOMJSON.uni-drag-cell.fileFormates -->



<!-- UTSCOMJSON.uni-drag-cell.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/drag-cell/drag-cell.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/drag-cell/drag-cell.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/drag-cell/drag-cell

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/drag-cell/drag-cell

>示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1; padding: 15px;">
	<!-- #endif -->
		<!-- #ifndef APP -->
		<view style="padding: 15px;">
		<!-- #endif -->
			<text class="page-title">drag-cell 拖拽排序组件</text>

			<view class="section">
				<text class="section-title">示例 1：标签拖拽排序</text>
				<text class="section-desc">长按标签后可拖拽排序，点击标签可拿到 item 和 index</text>
				<uni-drag-cell v-model="data.tagList" @change="onTagChange">
					<template #default="{ item, index }">
						<view class="tag-slot">
							<view class="tag-item" @click="clickItem(item as string, index as number)">
								<text class="tag-text">{{ item as string }}</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ data.tagList.join(', ') }}</text>
			</view>

			<view class="section">
				<text class="section-title">示例 2：宫格拖拽排序（3 列）</text>
				<text class="section-desc">长按宫格项后可拖拽排序</text>
				<uni-drag-cell v-model="data.gridList3" :column="3" @change="onGridChange">
					<template #default="{ item }">
						<view class="grid-slot">
							<view class="grid-item">
								<text class="grid-text">{{ (item as UTSJSONObject)['name'] }}</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ getGridNames(data.gridList3) }}</text>
			</view>

			<view class="section">
				<text class="section-title">示例 3：列表拖拽排序（1 列）</text>
				<text class="section-desc">长按列表项后可拖拽排序</text>
				<uni-drag-cell v-model="data.gridList4" :column="1" @change="onGridChange">
					<template #default="{ item }">
						<view class="grid-slot-small">
							<view class="grid-item-small">
								<text class="grid-text-small">{{ (item as UTSJSONObject)['name'] }}</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ getGridNames(data.gridList4) }}</text>
			</view>

			<view class="section">
				<text class="section-title">示例 4：可新增并删除的标签</text>
				<text class="section-desc">长按标签可排序，拖到底部可删除，点击 + 可输入并新增标签</text>
				<uni-drag-cell v-model="data.deleteList" :show-close="true" :show-append="true" @change="onDeleteChange">
					<template #default="{ item }">
						<view class="tag-slot">
							<view class="tag-item-delete">
								<text class="tag-text">{{ item as string }}</text>
							</view>
						</view>
					</template>
					<template #append>
						<view class="tag-slot">
							<view class="tag-item-add" @click="promptAddDeleteTag">
								<text class="tag-plus-text">+</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ data.deleteList.join(', ') }}</text>
				<text class="result-text">剩余：{{ data.deleteList.length }} 项</text>
			</view>

			<view class="section">
				<text class="section-title">示例 5：带删除功能的图标宫格</text>
				<text class="section-desc">长按后可拖动图标宫格项，并支持拖到底部删除</text>
				<uni-drag-cell v-model="data.iconGridList" :column="3" :show-close="true" @change="onIconGridChange">
					<template #default="{ item }">
						<view class="icon-grid-slot">
							<view class="icon-grid-item">
								<view class="icon-box">
									<text class="icon-emoji">{{ (item as UTSJSONObject)['icon'] }}</text>
								</view>
								<text class="icon-label">{{ (item as UTSJSONObject)['label'] }}</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ getIconNames(data.iconGridList) }}</text>
			</view>

			<view class="section">
				<text class="section-title">示例 6：九宫格图片选择</text>
				<text class="section-desc">点击 + 选择图片，支持拖拽排序，也支持拖到底部删除</text>
				<uni-drag-cell v-model="data.imageList" :column="3" :show-close="true"
					:show-append="data.imageList.length < maxImageCount" @change="onImageChange">
					<template #default="{ item, index }">
						<view class="image-grid-slot">
							<view class="image-grid-item" @click="previewImages(index as number)">
								<image class="image-grid-img" :src="item" mode="aspectFill"></image>
							</view>
						</view>
					</template>
					<template #append>
						<view class="image-grid-slot">
							<view class="image-grid-plus" @click="chooseImages">
								<text class="image-grid-plus-icon">+</text>
							</view>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">已选择：{{ data.imageList.length }}/{{ maxImageCount }}</text>
			</view>

			<view class="section">
				<text class="section-title">示例 7：手柄拖拽排序</text>
				<text class="section-desc">开启手柄模式后，不需要长按，只能拖动右侧手柄进行排序</text>
				<uni-drag-cell v-model="data.handleList" :column="1" :handle-mode="true" @change="onHandleListChange">
					<template #default="{ item, index }">
						<view class="handle-demo-slot">
							<view class="handle-demo-item">
								<text class="handle-demo-index">{{ (index as number) + 1 }}</text>
								<text class="handle-demo-text">{{ item as string }}</text>
							</view>
						</view>
					</template>
					<template #handle="{ item }">
						<view class="handle-demo-grip">
							<text class="handle-demo-grip-text">≡</text>
						</view>
					</template>
				</uni-drag-cell>
				<text class="result-text">当前顺序：{{ data.handleList.join(', ') }}</text>
			</view>

			<view style="height: 50px;"></view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
	<!-- #ifndef APP -->
	</view>
	<!-- #endif -->
</template>

<script setup lang="uts">
	const maxImageCount = 9

	type Data = {
		tagList: string[],
		gridList3: UTSJSONObject[],
		gridList4: UTSJSONObject[],
		deleteList: string[],
		iconGridList: UTSJSONObject[],
		imageList: string[],
		handleList: string[]
	}

	const data = reactive<Data>({
		tagList: ['标签1', '标签2', '标签3', '标签4'],
		gridList3: [
			{ name: '宫格1' },
			{ name: '宫格2' },
			{ name: '宫格3' },
			{ name: '宫格4' },
			{ name: '宫格5' },
			{ name: '宫格6' },
			{ name: '宫格7' },
			{ name: '宫格8' },
			{ name: '宫格9' }
		],
		gridList4: [
			{ name: '1' },
			{ name: '2' },
			{ name: '3' },
			{ name: '4' },
			{ name: '5' }
		],
		deleteList: ['标签A', '标签B', '标签C', '标签D', '标签E'],
		iconGridList: [
			{ icon: 'H', label: '首页' },
			{ icon: 'M', label: '消息' },
			{ icon: 'P', label: '我的' },
			{ icon: 'S', label: '设置' },
			{ icon: 'A', label: '相册' },
			{ icon: 'Y', label: '音乐' }
		],
		imageList: [],
		handleList: ['微信支付', '支付宝', 'Apple Pay']
	})

	const clickItem = (item : string, index : number) => {
		uni.showToast({
			title: '点击了第 ' + (index + 1) + ' 项：' + item,
			icon: 'none'
		})
	}

	const onTagChange = (list : string[]) => {
		console.log('tag list changed:', list)
	}

	const onGridChange = (list : UTSJSONObject[]) => {
		console.log('grid list changed:', list)
	}

	const onDeleteChange = (list : string[]) => {
		console.log('delete list changed:', list)
	}

	const onIconGridChange = (list : UTSJSONObject[]) => {
		console.log('icon grid list changed:', list)
	}

	const onImageChange = (list : string[]) => {
		console.log('image list changed:', list)
	}

	const onHandleListChange = (list : string[]) => {
		console.log('handle list changed:', list)
	}

	const promptAddDeleteTag = () => {
		uni.showModal({
			title: '新增标签',
			editable: true,
			placeholderText: '请输入标签内容',
			confirmText: '确定',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm != true) {
					return
				}
				const value = res.content != null ? res.content.trim() : ''
				if (value.length == 0) {
					uni.showToast({
						title: '标签内容不能为空',
						icon: 'none'
					})
					return
				}
				const nextList = data.deleteList.slice()
				nextList.push(value)
				data.deleteList = nextList
				onDeleteChange(data.deleteList)
			}
		})
	}

	const extractChooseImagePaths = (res : ChooseImageSuccess) : string[] => {
		const paths : string[] = []
		for (let i = 0; i < res.tempFilePaths.length; i++) {
			const path = res.tempFilePaths[i]
			if (path.length > 0) {
				paths.push(path)
			}
		}
		if (paths.length > 0) {
			return paths
		}
		for (let i = 0; i < res.tempFiles.length; i++) {
			const path = res.tempFiles[i].path
			if (path.length > 0) {
				paths.push(path)
			}
		}
		return paths
	}

	const chooseImages = () => {
		const remainCount = maxImageCount - data.imageList.length
		if (remainCount <= 0) {
			return
		}
		uni.chooseImage({
			count: remainCount,
			success: (res : ChooseImageSuccess) => {
				const selectedPaths = extractChooseImagePaths(res)
				if (selectedPaths.length == 0) {
					return
				}
				const nextList = data.imageList.slice()
				for (let i = 0; i < selectedPaths.length; i++) {
					if (nextList.length >= maxImageCount) {
						break
					}
					nextList.push(selectedPaths[i])
				}
				data.imageList = nextList
				onImageChange(data.imageList)
			}
		})
	}

	const previewImages = (index : number) => {
		if (index < 0 || index >= data.imageList.length) {
			return
		}
		uni.previewImage({
			urls: data.imageList,
			current: data.imageList[index]
		})
	}

	const getGridNames = (list : UTSJSONObject[]) : string => {
		const names : string[] = []
		for (let i = 0; i < list.length; i++) {
			const value = list[i]['name']
			if (value != null) {
				names.push(value as string)
			}
		}
		return names.join(', ')
	}

	const getIconNames = (list : UTSJSONObject[]) : string => {
		const names : string[] = []
		for (let i = 0; i < list.length; i++) {
			const value = list[i]['label']
			if (value != null) {
				names.push(value as string)
			}
		}
		return names.join(', ')
	}

	defineExpose({
		data,
		clickItem,
		promptAddDeleteTag,
		chooseImages,
		previewImages
	})
</script>

<style>
	.page-title {
		font-size: 24px;
		font-weight: bold;
		color: var(--text-color, #333333);
		margin-bottom: 20px;
		text-align: center;
	}

	.section {
		margin-bottom: 30px;
		background-color: var(--list-background-color, #ffffff);
		border-radius: 8px;
		padding: 15px;
	}

	.section-title {
		font-size: 16px;
		font-weight: bold;
		color: #007aff;
		margin-bottom: 5px;
	}

	.section-desc {
		font-size: 12px;
		color: var(--text-color, #333333);
		opacity: 0.7;
		margin-bottom: 15px;
	}

	.tag-slot {
		padding-right: 10px;
		padding-bottom: 10px;
	}

	.tag-item {
		display: flex;
		flex-direction: column;
		background-color: #007aff;
		border-radius: 4px;
		padding: 8px 16px;
	}

	.tag-text {
		color: #ffffff;
		font-size: 14px;
	}

	.tag-item-delete {
		display: flex;
		flex-direction: column;
		background-color: #ff6b6b;
		border-radius: 4px;
		padding: 4px 16px;
		height: 32px;
	}

	.tag-item-add {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff5f5;
		border-width: 1px;
		border-style: dashed;
		border-color: #ff6b6b;
		border-radius: 4px;
		padding: 4px 16px;
		height: 32px;
	}

	.tag-plus-text {
		color: #ff6b6b;
		font-size: 16px;
		font-weight: bold;
	}

	.grid-slot {
		width: 100%;
		padding: 5px;
	}

	.grid-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #28a745;
		border-radius: 8px;
		height: 80px;
	}

	.grid-text {
		color: #ffffff;
		font-size: 14px;
		font-weight: bold;
	}

	.grid-slot-small {
		width: 90%;
		/* 避免scale放大1.12倍时被裁剪*/
		padding: 3px;
		align-self: center;
	}

	.grid-item-small {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffc107;
		border-radius: 8px;
		height: 60px;
	}

	.grid-text-small {
		color: #333333;
		font-size: 16px;
		font-weight: bold;
	}

	.icon-grid-slot {
		width: 100%;
		padding: 5px;
	}

	.icon-grid-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f9fa;
		border-radius: 8px;
		padding: 10px;
	}

	.icon-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background-color: #e9ecef;
		border-radius: 25px;
		margin-bottom: 5px;
	}

	.icon-emoji {
		font-size: 24px;
		font-weight: bold;
		color: #333333;
	}

	.icon-label {
		font-size: 12px;
		color: #333333;
	}

	.image-grid-slot {
		width: 100%;
		padding: 5px;
	}

	.image-grid-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 104px;
		background-color: #f5f5f5;
		border-radius: 12px;
		overflow: hidden;
	}

	.image-grid-img {
		width: 100%;
		height: 100%;
		border-radius: 12px;
	}

	.image-grid-plus {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 104px;
		background-color: #fafafa;
		border-width: 1px;
		border-style: dashed;
		border-color: #d9d9d9;
		border-radius: 12px;
	}

	.image-grid-plus-icon {
		font-size: 36px;
		font-weight: bold;
		color: #999999;
	}

	.handle-demo-slot {
		width: 100%;
		padding: 4px 0;
	}

	.handle-demo-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #f7f8fa;
		border-width: 1px;
		border-style: solid;
		border-color: #e5e6eb;
		border-radius: 10px;
		padding: 16px 52px 16px 14px;
	}

	.handle-demo-index {
		width: 24px;
		margin-right: 12px;
		color: #007aff;
		font-size: 15px;
		font-weight: bold;
		text-align: center;
	}

	.handle-demo-text {
		color: #333333;
		font-size: 14px;
	}

	.handle-demo-grip {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 56px;
	}

	.handle-demo-grip-text {
		color: #999999;
		font-size: 24px;
		font-weight: bold;
	}

	.result-text {
		font-size: 12px;
		color: var(--text-color, #333333);
		opacity: 0.7;
		margin-top: 10px;
	}
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-drag-cell)
