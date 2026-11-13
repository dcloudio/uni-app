---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-sidebar
---

::: sourceCode
## uni-sidebar

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-sidebar


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-sidebar/components/uni-sidebar

:::

侧边导航组件，基于 list-view / list-item 实现，仅负责渲染导航项与抛出交互事件。

> 本 Component 是 uni ext component，需下载插件：[uni-sidebar](https://ext.dcloud.net.cn/plugin?id=30676)


# uni-sidebar 侧边滚动导航组件

用于长滚动容器的侧边导航。

一般在左侧展示一组导航项，点击时把右侧主列表滚动到对应分段；右侧主列表滚动时，左侧导航相应索引项会同步高亮。

常用于外卖点餐选择菜品、商品分类、长文章大纲等场景。

组件内部基于 `list-view` / `list-item`。

uni-sidebar 是轻量受控组件，职责边界如下：

- 只负责渲染导航项、维护或接收当前高亮索引、抛出点击事件；
- 组件不感知主列表：不查找节点、不创建 IntersectionObserver、不执行滚动，对主列表 id 命名、容器类型、CSS 结构没有隐式约束规范；
- 监听右侧滚动与触发sidebar高亮由页面自行编排，组件通过 `v-model:current-index` 接收高亮索引、通过 `select` 事件拿到点击意图分发给页面。

如果把页面的部分工作封装到组件中，会对右侧主列表进行很多格式约束。现实中右侧主列表很灵活，可能有分段吸顶、可能没有；有的可以监听IntersectionObserver，有的只能监听滚动。

## 基本用法

示例页面代码说明方式：

1. 引入uni-sidebar组件

```html
<uni-sidebar v-model:current-index="activeIndex" :list="categories" @select="onSelect">
  <template #default="{ item, index, active }">
    <view class="sidebar-item" :class="{ 'sidebar-item--active': active }">
      <text class="sidebar-item__text">{{ item }}</text>
    </view>
  </template>
</uni-sidebar>
```

2. 构造主页面
- 主列表使用分段吸顶。非MP平台直接使用吸顶组件，MP平台条件编译通过`position: sticky`实现。
- 监听主列表`list-view`的`@scroll`，判断当前滚动吸顶区域，调用uni-sidebar组件设置索引高亮。不使用相交观察器做滚动高亮，因为分段吸顶不适配相交场景

3. 页面监听uni-sidebar组件的@select，调用主列表 `scroll-into-view` 滚动到相应位置。

小程序下分段吸顶注意：
```css
/* uni-app x 给所有 view 默认加了 overflow: hidden，会破坏 position: sticky，
   因此必须把吸顶标题的所有祖先容器改为 overflow: visible */
.page {
  overflow: visible;
}
.body {
  overflow: visible;
}
.section {
  flex-direction: column;
  overflow: visible;
}

/* 推出式吸顶：下一段标题会把上一段标题顶出 */
.group__header {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

## 动态数据与布局变化

示例页面的数据加载逻辑是：初始时把左侧uni-sidebar组件所需数据一次性构造好，但右侧主列表是分页加载，初始只加载第一页，动态加载后续页，并确保动态情况下各种功能正常。

```ts
// 数据变化后重新测量：nextTick 只保证 JS 渲染完成，
// list-view 的原生子节点会稍后创建，需要延时，否则查询会因节点不存在而静默失效。
watch(groups, () => {
  nextTick(() => {
    setTimeout(() => {
      measureNewHeaders()  // 见上文对应接入方式
    }, 150)
  })
})
```

- 分页追加只测量新增分段，已有坐标不受影响；
- 数据整体替换（长度变短）时 `measureNewHeaders` 内部会清空坐标重新测量；
- 容器高度变化（购物车栏出现/消失）不影响吸顶头与内容的相对位置，无需任何处理。

如果右侧列表按条目分页，点击左侧分类时该分类可能尚未加载。此时应先把数据加载到目标分类，再执行 `scroll-into-view`：

```ts
const onSelect = (index : number) => {
  if (!isCategoryLoaded(index)) {
    // 先加载目标分类所需数据，加载完成后再滚动
    loadUntilCategory(index, () => scrollToSection(index))
    return
  }
  scrollToSection(index)
}
```

## 自定义样式

组件根节点，默认宽度 `90px`、`flex-shrink: 0`。可通过组件上设置样式来覆盖。

item为插槽内容，样式由使用者决定。



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| list | string\[\] | Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07 | 导航数据，数组每一项与目标列表中的分段按索引一一对应 |
| currentIndex | number | Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07 | 当前高亮索引。传入时为受控模式（推荐搭配 v-model:current-index），<br>点击只抛出变更请求，高亮由绑定值决定；不传时为非受控模式，点击后组件内部维护高亮。 |
| @select | Event |   | 点击导航项时触发，页面据此滚动目标列表 |
| @update:currentIndex | Event |   | 高亮索引更新事件，用于 v-model:current-index |







### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/sidebar/sidebar.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/sidebar/sidebar.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/sidebar/sidebar

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/sidebar/sidebar

>示例
```vue
<template>
	<view class="page">
		<view class="header">
			<text class="header__title">uni-sidebar 侧边滚动导航</text>
			<text class="header__desc">点击左侧分类，右侧列表滚动到对应位置；滚动右侧列表，左侧分类自动高亮</text>
			<view class="actions">
				<button class="action-btn" size="mini" @click="toggleCart">
					{{ data.cartVisible ? '隐藏购物车' : '显示购物车' }}
				</button>
			</view>
		</view>
		<view class="body">
			<uni-sidebar v-model:current-index="data.activeIndex" class="sidebar" :list="categoryNames" @select="onSelect">
				<template #default="{ item, index, active }">
					<view class="sidebar-item" :class="active ? 'sidebar-item--active' : ''">
						<view flatten class="sidebar-item__bar" v-if="active"></view>
						<text class="sidebar-item__text" :class="active ? 'sidebar-item__text--active' : ''">{{ item }}</text>
					</view>
				</template>
			</uni-sidebar>
			<!-- 右侧列表为独立滚动容器：点击分类用 scroll-into-view 滚动，滚动同步高亮、触底加载 -->
			<list-view id="food-list" ref="listViewRef" class="food-list" :scroll-top="data.scrollTop" :scroll-into-view="data.scrollTarget" @scroll="onListScroll" @scrolltolower="onScrollToLower">
				<!-- 小程序（默认 WebView）没有原生分段吸顶能力，用 CSS position: sticky 实现推出式吸顶（见 .group__header 样式） -->
				<!-- #ifdef MP -->
				<view v-for="(group, index) in groups" :key="group.name" :id="sectionId(index)" class="section">
					<view :id="'food-list-header-' + index" class="group__header">
						<text class="group__header-text">{{ group.name }}</text>
					</view>
					<view v-for="food in group.items" :key="food.id" class="food">
						<view class="food__thumb">
							<text class="food__thumb-text">{{ food.name.substring(0, 1) }}</text>
						</view>
						<view class="food__info">
							<text class="food__name">{{ food.name }}</text>
							<text class="food__desc">{{ food.desc }}</text>
						</view>
						<text class="food__price">￥{{ food.price }}</text>
					</view>
				</view>
				<view class="list-footer" v-if="data.loading || !hasMore">
					<text class="list-footer__text">{{ data.loading ? '加载中...' : '没有更多了' }}</text>
				</view>
				<!-- #endif -->
				<!-- 其他平台（App / Web）：list-view + sticky-section 原生分段吸顶 -->
				<!-- #ifndef MP -->
				<sticky-section v-for="(group, index) in groups" :key="group.name" :id="sectionId(index)">
					<sticky-header :id="'food-list-header-' + index">
						<view class="group__header">
							<text class="group__header-text">{{ group.name }}</text>
						</view>
					</sticky-header>
					<list-item v-for="food in group.items" :key="food.id">
						<view class="food">
							<view class="food__thumb">
								<text class="food__thumb-text">{{ food.name.substring(0, 1) }}</text>
							</view>
							<view class="food__info">
								<text class="food__name">{{ food.name }}</text>
								<text class="food__desc">{{ food.desc }}</text>
							</view>
							<text class="food__price">￥{{ food.price }}</text>
						</view>
					</list-item>
				</sticky-section>
				<list-item>
					<view class="list-footer" v-if="data.loading || !hasMore">
						<text class="list-footer__text">{{ data.loading ? '加载中...' : '没有更多了' }}</text>
					</view>
				</list-item>
				<!-- #endif -->
			</list-view>
		</view>
		<view class="cart-bar" v-if="data.cartVisible">
			<text class="cart-bar__text">购物车</text>
			<text class="cart-bar__price">￥29</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	type Food = {
		id : number,
		name : string,
		desc : string,
		price : number,
		category : string
	}

	type Category = {
		name : string,
		count : number
	}

	type Group = {
		name : string,
		items : Food[]
	}


	// ---------- 模拟服务端数据 ----------
	// 分类接口：一次性返回全部分类，供左侧 sidebar 展示
	const mockCategories : Category[] = [
		{ name: '热销', count: 3 },
		{ name: '招牌套餐', count: 3 },
		{ name: '主食', count: 4 },
		{ name: '小吃', count: 3 },
		{ name: '汤类', count: 3 },
		{ name: '饮品', count: 5 },
		{ name: '甜点', count: 4 },
		{ name: '其他', count: 2 }
	]

	// 列表接口：服务端按分类顺序存放的条目池，接口按分页返回，不向前端暴露完整结构
	const mockFoods : Food[] = [
		{ id: 101, name: '招牌炸鸡', desc: '外酥里嫩，人气爆款', price: 29, category: '热销' },
		{ id: 102, name: '芝士汉堡', desc: '双层芝士，肉感十足', price: 25, category: '热销' },
		{ id: 103, name: '香辣鸡翅', desc: '微辣过瘾', price: 18, category: '热销' },
		{ id: 201, name: '单人精选套餐', desc: '主食 + 小食 + 饮料', price: 39, category: '招牌套餐' },
		{ id: 202, name: '双人分享套餐', desc: '主食 * 2 + 小食 + 饮料 * 2', price: 72, category: '招牌套餐' },
		{ id: 203, name: '全家桶套餐', desc: '适合 3-4 人享用', price: 109, category: '招牌套餐' },
		{ id: 301, name: '照烧鸡腿饭', desc: '日式照烧汁', price: 26, category: '主食' },
		{ id: 302, name: '黑椒牛柳饭', desc: '黑椒浓郁', price: 32, category: '主食' },
		{ id: 303, name: '番茄意面', desc: '酸甜开胃', price: 24, category: '主食' },
		{ id: 304, name: '咖喱猪排饭', desc: '香浓咖喱', price: 30, category: '主食' },
		{ id: 401, name: '黄金薯条', desc: '现炸酥脆', price: 12, category: '小吃' },
		{ id: 402, name: '洋葱圈', desc: '香甜可口', price: 14, category: '小吃' },
		{ id: 403, name: '鸡肉卷', desc: '墨西哥风味', price: 16, category: '小吃' },
		{ id: 501, name: '玉米浓汤', desc: '奶油香浓', price: 10, category: '汤类' },
		{ id: 502, name: '罗宋汤', desc: '番茄牛肉', price: 15, category: '汤类' },
		{ id: 503, name: '蘑菇汤', desc: '细腻顺滑', price: 12, category: '汤类' },
		{ id: 601, name: '冰柠檬水', desc: '清爽解腻', price: 8, category: '饮品' },
		{ id: 602, name: '可乐', desc: '经典碳酸', price: 7, category: '饮品' },
		{ id: 603, name: '鲜橙汁', desc: '现榨橙汁', price: 15, category: '饮品' },
		{ id: 604, name: '牛奶', desc: '新鲜牛奶', price: 15, category: '饮品' },
		{ id: 605, name: '美式咖啡', desc: '醇香提神', price: 16, category: '饮品' },
		{ id: 701, name: '蛋挞', desc: '酥皮流心', price: 9, category: '甜点' },
		{ id: 702, name: '提拉米苏', desc: '入口即化', price: 22, category: '甜点' },
		{ id: 703, name: '甜筒', desc: '平价冰激凌', price: 5, category: '甜点' },
		{ id: 704, name: '草莓圣代', desc: '香甜草莓', price: 13, category: '甜点' },
		{ id: 801, name: '餐具包', desc: '含刀叉纸巾', price: 1, category: '其他' },
		{ id: 802, name: '调味酱', desc: '番茄 / 甜辣', price: 2, category: '其他' }
	]

	// ---------- 模拟接口 ----------

	// 分类接口：一次性返回全部分类
	const fetchCategories = (success : (list : Category[]) => void) => {
		setTimeout(() => {
			success(mockCategories)
		}, 200)
	}

	// 列表接口：按 offset / limit 分页返回
	const fetchFoods = (offset : number, limit : number, success : (list : Food[]) => void) => {
		setTimeout(() => {
			success(mockFoods.slice(offset, offset + limit))
		}, 300)
	}

	// ---------- 页面状态 ----------

	// 每页加载的条目数量：首次加载 20 条，之后触底继续分页
	const pageSize = 20

	// 页面交互状态统一放在 data 中，供模板和自动化测试使用
	const data = reactive({
		// 左侧分类一次性加载，右侧条目按页追加
		categories: [] as Category[],
		foods: [] as Food[],
		loading: false,
		cartVisible: false,
		activeIndex: 0,
		scrollTarget: '',
		scrollTop: 0
	})
	const categoryNames = computed<string[]>(() => data.categories.map((category : Category) : string => category.name))

	const totalCount = mockFoods.length

	const hasMore = computed(() : boolean => data.foods.length < totalCount)

	// 把已加载条目按分类聚合成分段，末尾分类可能只包含前几条
	const groups = computed<Group[]>(() => {
		const result : Group[] = []
		for (let i = 0; i < data.foods.length; i++) {
			const food = data.foods[i]
			const lastIndex = result.length - 1
			if (lastIndex >= 0 && result[lastIndex].name == food.category) {
				result[lastIndex].items.push(food)
			} else {
				const items : Food[] = []
				items.push(food)
				const group : Group = { name: food.category, items: items }
				result.push(group)
			}
		}
		return result
	})

	// 底部购物车栏可见性：出现时右侧列表容器高度会变化
	const toggleCart = () => {
		data.cartVisible = !data.cartVisible
	}

	// 分段 id 由页面自行约定，组件不感知
	const sectionId = (index : number) : string => {
		return 'food-list-item-' + index
	}

	// 点击分类：通过 list-view 的 scroll-into-view 声明式滚动到分段（两端一致）
	const scrollToSection = (index : number) => {
		// 先清空再设置，保证连续点击同一项也会重新滚动
		data.scrollTarget = ''
		nextTick(() => {
			data.scrollTarget = sectionId(index)
		})
	}

	// list-view 元素引用：非小程序端测量吸顶头坐标时使用
	const listViewRef = ref<UniElement | null>(null)

	// #region 分页加载

	// requestTarget 表示当前希望加载到的条目总数，多次请求取最大值；
	// 请求串行执行，避免并发追加导致数据错乱
	let requestTarget = 0
	let requestRunning = false
	let pendingScrollIndex = -1

	// 点击分类时需要加载到第几条，才能完整展示该分类（分类接口已返回每类条目数）
	const getCategoryEndIndex = (index : number) : number => {
		let count = 0
		for (let i = 0; i < data.categories.length; i++) {
			count += data.categories[i].count
			if (i == index) {
				return Math.min(count, totalCount)
			}
		}
		return totalCount
	}

	// 点击的分类数据加载完成后，再滚动到对应分段
	const finishPendingScroll = () => {
		if (pendingScrollIndex < 0) {
			return
		}
		const index = pendingScrollIndex
		if (data.foods.length < getCategoryEndIndex(index)) {
			return
		}
		pendingScrollIndex = -1
		// 等新分段渲染完成（list-view 的原生子节点创建会稍晚于 JS 渲染）
		nextTick(() => {
			setTimeout(() => {
				scrollToSection(index)
			}, 150)
		})
	}

	const pumpLoad = () => {
		if (requestRunning) {
			return
		}
		if (data.foods.length >= requestTarget) {
			finishPendingScroll()
			return
		}
		requestRunning = true
		data.loading = true
		const offset = data.foods.length
		const next = Math.min(offset + pageSize, requestTarget)
		fetchFoods(offset, next - offset, (list : Food[]) => {
			if (list.length == 0) {
				requestRunning = false
				data.loading = false
				return
			}
			data.foods = data.foods.concat(list)
			requestRunning = false
			data.loading = false
			pumpLoad()
		})
	}

	const requestLoad = (target : number) => {
		const clamped = Math.min(target, totalCount)
		if (clamped > requestTarget) {
			requestTarget = clamped
		}
		pumpLoad()
	}

	const loadMore = () => {
		if (data.loading || !hasMore.value) {
			return
		}
		requestLoad(data.foods.length + pageSize)
	}

	// 左侧分类一次性完整加载
	const loadCategories = () => {
		fetchCategories((list : Category[]) => {
			data.categories = list
		})
	}

	// #endregion

	// #region 点击滚动

	const onSelect = (index : number) => {
		if (data.foods.length < getCategoryEndIndex(index)) {
			// 对应数据还未加载：立即加载，加载完成后再滚动到位
			pendingScrollIndex = index
			requestLoad(getCategoryEndIndex(index))
			return
		}
		pendingScrollIndex = -1
		scrollToSection(index)
	}

	// #endregion

	// #region 滚动同步高亮

	// 高亮算法（两端一致）：按滚动位置计算当前分段。
	// 首次渲染后测量每个吸顶头相对滚动内容的坐标，滚动时用 scrollTop 与坐标比较。
	// 不使用相交观察器：窄参照带在慢速拖动时只在进入瞬间判定，头部到达吸顶位置时
	// 不会再有回调，导致高亮滞后；宽参照带则无法在带内切换。
	let headerOffsets : number[] = []
	let measuredCount = 0
	let lastScrollTop = 0

	const updateActiveFromScroll = (scrollTop : number) => {
		if (headerOffsets.length == 0) {
			return
		}
		let current = 0
		for (let i = 0; i < headerOffsets.length; i++) {
			// 0.5px 容差：坐标测量值存在浮点噪声（如 Android 返回 float32 量化坐标 259.0000076，而滚动落点为 259），
			// 严格比较会在边界处判定回退，导致点击分类后高亮跳回上一项
			if (headerOffsets[i] <= scrollTop + 0.5) {
				current = i
			} else {
				break
			}
		}
		data.activeIndex = current
	}

	const onListScroll = (e : UniScrollEvent) => {
		lastScrollTop = e.detail.scrollTop
		updateActiveFromScroll(lastScrollTop)
	}

	// 接近列表底部时加载下一页（两端都通过 list-view 的 scrolltolower 触发）
	const onScrollToLower = () => {
		loadMore()
	}

	// 只测量新追加的分段：分页追加不影响已有坐标；
	// 容器高度变化（如购物车栏出现）不影响相对坐标，无需重新测量；
	// 吸顶中的旧分段不重测：此时其视口坐标是吸顶位置，会把记录的坐标污染成滚动位置。
	// #ifndef MP
	const measureNewHeaders = () => {
		const listView = listViewRef.value
		if (listView == null) {
			return
		}
		const total = groups.value.length
		if (total < measuredCount) {
			headerOffsets = []
			measuredCount = 0
		}
		let pending = total - measuredCount
		if (pending <= 0) {
			return
		}
		const bandTop = listView.getBoundingClientRect().top
		for (let i = measuredCount; i < total; i++) {
			const index = i
			uni.createSelectorQuery().select('#food-list-header-' + index).boundingClientRect().exec((res) => {
				pending--
				if (res.length > 0 && res[0] != null) {
					const r = res[0] as NodeInfo
					if (r.top != null) {
						const offset = (r.top as number) - bandTop + lastScrollTop
						while (headerOffsets.length <= index) {
							headerOffsets.push(999999999)
						}
						headerOffsets[index] = offset
					}
				}
				if (pending == 0) {
					measuredCount = total
					updateActiveFromScroll(lastScrollTop)
				}
			})
		}
	}
	// #endif

	// #ifdef MP
	// 小程序（区域滚动）：分段内容坐标 = 吸顶头视口坐标 - 列表容器视口坐标 + 当前滚动位置
	const measureNewHeaders = () => {
		const total = groups.value.length
		if (total < measuredCount) {
			headerOffsets = []
			measuredCount = 0
		}
		let pending = total - measuredCount
		if (pending <= 0) {
			return
		}
		for (let i = measuredCount; i < total; i++) {
			const index = i
			uni.createSelectorQuery().select('#food-list-header-' + index).boundingClientRect().select('#food-list').boundingClientRect().exec((res) => {
				pending--
				if (res.length > 1 && res[0] != null && res[1] != null) {
					const headerRect = res[0] as NodeInfo
					const listRect = res[1] as NodeInfo
					if (headerRect.top != null && listRect.top != null) {
						const offset = (headerRect.top as number) - (listRect.top as number) + lastScrollTop
						while (headerOffsets.length <= index) {
							headerOffsets.push(999999999)
						}
						headerOffsets[index] = offset
					}
				}
				if (pending == 0) {
					measuredCount = total
					updateActiveFromScroll(lastScrollTop)
				}
			})
		}
	}
	// #endif

	// #endregion

	// #region 动态数据与布局变化

	// 数据变化（首次加载 / 分页追加）后，等新分段渲染完成再测量其内容坐标：
	// nextTick 只保证 JS 渲染完成，list-view 的原生子节点会稍后创建，需要延时，
	// 否则查询会因节点不存在而静默失效。
	watch(groups, () => {
		nextTick(() => {
			setTimeout(() => {
				measureNewHeaders()
			}, 150)
		})
	})

	// #endregion

	// 供页面自动化读取分页状态、驱动独立滚动和触底事件。
	defineExpose({
		data,
		scrollToSection,
		onScrollToLower
	})

	onReady(() => {
		// 左侧分类一次性完整加载
		loadCategories()
		// 右侧列表首屏加载 20 条，后续滚动触底继续加载
		requestLoad(pageSize)
	})
</script>

<style>
	.page {
		flex: 1;
		flex-direction: column;
		background-color: var(--background-color, #ffffff);
	}
	.header {
		padding: 12px 16px;
		flex-direction: column;
		background-color: var(--background-color, #f0f7ff);
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--border-color, #eeeeee);
	}

	.header__title {
		font-size: 16px;
		font-weight: bold;
		color: var(--text-color, #333333);
	}

	.header__desc {
		margin-top: 4px;
		font-size: 12px;
		color: var(--secondary-text-color, #999999);
	}

	.actions {
		flex-direction: row;
		margin-top: 8px;
	}

	.action-btn {
		margin-right: 8px;
		font-size: 12px;
	}

	/* #ifdef MP */
	/* 小程序（默认 WebView）没有原生分段吸顶能力，右侧列表为独立滚动容器（list-view），
	   吸顶改用 CSS position: sticky 实现推出式吸顶。
	   uni-app x 给所有 view 默认加了 overflow: hidden，会破坏 position: sticky，
	   因此把吸顶标题的所有祖先容器改为 overflow: visible */
	.page {
		overflow: visible;
	}

	.body {
		flex: 1;
		flex-direction: row;
		overflow: visible;
	}

	.sidebar {
		width: 90px;
		height: 100%;
	}

	.food-list {
		flex: 1;
		height: 100%;
		background-color: var(--list-background-color, #ffffff);
	}

	.section {
		flex-direction: column;
		overflow: visible;
	}

	.group__header {
		position: sticky;
		top: 0;
		z-index: 10;
	}
	/* #endif */

	/* #ifndef MP */
	.body {
		flex: 1;
		flex-direction: row;
	}

	.sidebar {
		height: 100%;
	}

	.food-list {
		flex: 1;
		height: 100%;
		background-color: var(--list-background-color, #ffffff);
	}
	/* #endif */

	.sidebar-item {
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 16px 6px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--border-color, #eeeeee);
	}

	.sidebar-item__bar {
		position: absolute;
		left: 0;
		width: 3px;
		height: 18px;
		background-color: var(--sidebar-active-color, #ff5500);
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
	}

	.sidebar-item__text {
		font-size: 14px;
		color: var(--text-color, #666666);
	}

	.sidebar-item__text--active {
		color: var(--sidebar-active-color, #ff5500);
		font-weight: bold;
	}

	.sidebar-item--active {
		background-color: var(--list-background-color, #ffffff);
	}

	.group__header {
		padding: 10px 16px;
		background-color: var(--background-color, #f5f5f5);
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--border-color, #eeeeee);
	}

	.group__header-text {
		font-size: 14px;
		font-weight: bold;
		color: var(--text-color, #333333);
		opacity: 0.8;
	}

	.food {
		flex-direction: row;
		align-items: center;
		padding: 12px 16px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: var(--border-color, #f0f0f0);
	}

	.food__thumb {
		width: 48px;
		height: 48px;
		border-radius: 6px;
		background-color: var(--active-background-color, #ffe8d9);
		align-items: center;
		justify-content: center;
	}

	.food__thumb-text {
		font-size: 18px;
		color: var(--sidebar-active-color, #ff5500);
		font-weight: bold;
	}

	.food__info {
		flex: 1;
		flex-direction: column;
		margin-left: 12px;
	}

	.food__name {
		font-size: 15px;
		color: var(--text-color, #333333);
	}

	.food__desc {
		margin-top: 4px;
		font-size: 12px;
		color: var(--secondary-text-color, #999999);
	}

	.food__price {
		font-size: 15px;
		font-weight: bold;
		color: var(--sidebar-active-color, #ff5500);
	}

	.list-footer {
		padding: 16px;
		align-items: center;
		justify-content: center;
	}

	.list-footer__text {
		font-size: 12px;
		color: var(--secondary-text-color, #999999);
	}

	.cart-bar {
		height: 56px;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		background-color: var(--list-background-color, #ffffff);
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: var(--border-color, #eeeeee);
	}

	.cart-bar__text {
		font-size: 14px;
		color: var(--text-color, #333333);
	}

	.cart-bar__price {
		font-size: 16px;
		font-weight: bold;
		color: var(--sidebar-active-color, #ff5500);
	}
</style>

```

:::


