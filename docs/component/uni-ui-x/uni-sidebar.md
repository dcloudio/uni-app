---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-sidebar
---

::: sourceCode
## uni-sidebar

> issues: https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-sidebar

:::

侧边导航组件，基于 list-view / list-item 实现，仅负责渲染导航项与抛出交互事件。

> 本 Component 是 uni ext component，需下载插件：[uni-sidebar](https://ext.dcloud.net.cn/plugin?id=30676)


# uni-sidebar 侧边滚动导航组件

用于长滚动容器的侧边导航。左侧展示一组导航项，点击时把右侧目标列表滚动到对应分段；右侧列表滚动时，当前分段索引同步回左侧高亮。

常用于外卖点餐选择菜品、商品分类、长文章大纲等场景。

> 演示页面：`/pages/uni-ui/sidebar/sidebar.uvue`，包含受控用法、点击滚动、滚动高亮、分段吸顶与分页加载的完整示例。

## 平台兼容性

| 平台 | 支持 | 最低版本 |
| --- | :---: | --- |
| Web | √ | HBuilderX 5.07 |
| 微信小程序 | √ | HBuilderX 5.08 |
| 支付宝小程序 | √ | HBuilderX 5.31 |
| Android | √ | HBuilderX 5.07（Vapor 5.21） |
| iOS | √ | HBuilderX 5.07（Vapor 5.11） |
| HarmonyOS | √ | HBuilderX 5.07（Vapor 5.07） |

组件基于 `list-view` / `list-item` 实现。

## 安装与引入

组件位于 `uni_modules/uni-sidebar`，使用 uni_modules 规范，HBuilderX 会自动 easycom 注册，无需手动 `import`：

```html
<uni-sidebar v-model:current-index="activeIndex" :list="categories" @select="onSelect">
  <template #default="{ item, index, active }">
    <view class="sidebar-item" :class="active ? 'sidebar-item--active' : ''">
      <text class="sidebar-item__text">{{ item }}</text>
    </view>
  </template>
</uni-sidebar>
```

## 组件设计

uni-sidebar 是受控组件，职责边界如下：

- 只负责渲染导航项、维护或接收当前高亮索引、抛出交互事件；
- 不感知目标列表：不查找节点、不创建 IntersectionObserver、不执行滚动，对页面 id 命名、容器类型、CSS 结构没有隐式契约；
- 滚动与滚动高亮由页面自行编排，组件通过 `v-model:current-index` 接收高亮索引、通过 `select` 事件拿到点击意图。

这样设计的理由：

- 目标列表属于页面、位于组件子树之外。组件内监听需要用页面作用域选择器跨边界查找外部节点，各端行为不一致（需要大量条件编译、重试与空值兜底），脆弱且难维护；
- 监听放在页面，作用域天然正确，平台差异代码集中在应用层，可针对具体结构写最直接的实现；
- 组件与列表结构解耦后，页面可以自由选择滚动方式（`scroll-into-view`、ScrollViewContext、`uni.pageScrollTo`）。

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| list | Array\<string> | - | 必填。导航数据，数组每一项与目标列表中的分段按索引一一对应 |
| currentIndex | number | - | 当前高亮索引。传入即受控（推荐搭配 `v-model:current-index`，点击只抛出变更请求，高亮由绑定值决定）；不传则非受控，点击后组件内部维护高亮 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击导航项时触发，页面据此滚动目标列表 | index: number - 当前导航项索引；item: string - 当前导航项内容 |
| update:currentIndex | 高亮索引更新事件，用于 `v-model:current-index` | index: number - 新的高亮索引 |

## 插槽

| 插槽名 | 说明 | 插槽参数 |
|--------|------|----------|
| default | 自定义导航项内容 | { item: string, index: number, active: boolean } |

## 样式

组件默认样式如下，可通过页面样式或 CSS 变量覆盖：

| 类名 / 变量 | 说明 |
| --- | --- |
| `.uni-sidebar` | 组件根节点，默认宽度 `90px`、`flex-shrink: 0`、背景 `var(--background-color, #f7f7f7)` |
| `.uni-sidebar__item` | 导航项容器，默认带底部分隔线 `var(--border-color, #eeeeee)` |
| `show-scrollbar` | 组件内部固定为 `false`，不显示滚动条 |

默认情况下导航项的高度由插槽内容决定，建议在页面中为插槽内容设置统一的内边距，保证点击区域与视觉高度一致：

```css
.sidebar-item {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 6px;
}
```

## 基本用法

页面侧需要自己完成两件事：点击滚动 + 滚动同步高亮。目标列表统一使用独立滚动容器（`list-view`），滚动同步高亮统一使用 `@scroll` + 内容坐标计算；不同平台仅在「吸顶实现」与「坐标测量 API」上有差异（见下文两个接入方式）。

公共代码：

```html
<uni-sidebar v-model:current-index="activeIndex" :list="categories" @select="onSelect">
  <template #default="{ item, index, active }">
    <view class="sidebar-item" :class="{ 'sidebar-item--active': active }">
      <text class="sidebar-item__text">{{ item }}</text>
    </view>
  </template>
</uni-sidebar>
```

```ts
const activeIndex = ref(0)
// categories 通常由分类接口一次性返回完整列表，与右侧分段按索引一一对应
const categories = ref<string[]>([])
const sectionId = (index : number) : string => {
  return 'food-list-item-' + index
}
// 分段 id 约定：section 容器为 `food-list-item-{index}`（scroll-into-view 目标）；
// 吸顶头 id 约定为 `food-list-header-{index}`（测量内容坐标用）

// 点击滚动：通过 list-view 的 scroll-into-view 声明式滚动。
// 先清空再设置，保证连续点击同一项也会重新滚动
const scrollTarget = ref('')
const onSelect = (index : number) => {
  scrollTarget.value = ''
  nextTick(() => {
    scrollTarget.value = sectionId(index)
  })
}

// 滚动同步高亮：按滚动位置计算当前分段。
// 渲染后测量每个吸顶头相对滚动内容的坐标，滚动时用 scrollTop 与坐标比较。
// 不使用相交观察器：窄参照带在慢速拖动时只在头部进入瞬间判定，头部到达
// 吸顶位置时不会再有回调，高亮会滞后；宽参照带则无法在带内切换。
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
  activeIndex.value = current
}

const onListScroll = (e : UniScrollEvent) => {
  lastScrollTop = e.detail.scrollTop
  updateActiveFromScroll(lastScrollTop)
}

// 触底加载下一页
const onScrollToLower = () => {
  loadMore()
}
```

### 接入方式一：sticky-section 原生吸顶（App / Web / 鸿蒙）

模板：

```html
<list-view id="food-list" ref="listViewRef" class="food-list" :scroll-into-view="scrollTarget"
           @scroll="onListScroll" @scrolltolower="onScrollToLower">
  <sticky-section v-for="(group, index) in groups" :key="group.name" :id="sectionId(index)">
    <sticky-header :id="'food-list-header-' + index">
      <view class="group__header">{{ group.name }}</view>
    </sticky-header>
    <list-item v-for="food in group.items" :key="food.id">
      <!-- 分段内容 -->
    </list-item>
  </sticky-section>
</list-view>
```

脚本（补充公共代码中的坐标测量实现）：

```ts
const listViewRef = ref<UniElement | null>(null)

// 只测量新追加的分段：分页追加不影响已有坐标；
// 容器高度变化（如购物车栏出现）不影响相对坐标，无需重新测量；
// 吸顶中的旧分段不重测：此时其视口坐标是吸顶位置，会把记录的坐标污染成滚动位置。
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
          // 内容坐标 = 视口位置 - 容器顶部 + 当前滚动位置
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
```

> 说明：`contentOffset = rect.top - bandTop + scrollTop`。`scrollTop` 从 `@scroll` 事件记录，测量时若列表不在顶部，用当前记录值换算为内容坐标。只测量新追加的分段，已吸顶的旧分段不重复测量，避免吸顶头的视口位置污染坐标。
>
> 注意：坐标测量值存在浮点噪声（Android 端 rect 为 float32 量化坐标，与滚动落点可能有 1e-5 级误差，如测量值 `259.0000076` 对应落点 `259`），滚动高亮的边界比较必须带容差（示例中为 0.5px），否则点击分类后高亮会在边界处回退到上一项。
>
> 说明：容器高度变化（如出现底部购物车栏）不改变吸顶头与滚动内容的相对位置，无需重新测量，也不需要用 `UniResizeObserver` 监听容器。`sticky-section` 原生吸顶由 `list-view` 负责，跨平台行为见下方「平台说明」。

### 接入方式二：CSS sticky 吸顶（小程序）

微信小程序的 `sticky-section` / `sticky-header` 是 Skyline 渲染引擎专属组件（默认 WebView 渲染下不生效）。示例在小程序端统一使用 CSS `position: sticky`：

模板：

```html
<list-view id="food-list" class="food-list" :scroll-into-view="scrollTarget"
           @scroll="onListScroll" @scrolltolower="onScrollToLower">
  <view v-for="(group, index) in groups" :key="group.name" :id="sectionId(index)" class="section">
    <view :id="'food-list-header-' + index" class="group__header">{{ group.name }}</view>
    <view v-for="food in group.items" :key="food.id" class="food">
      <!-- 分段内容 -->
    </view>
  </view>
</list-view>
```

样式（关键点）：

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

脚本（测量实现与非 MP 不同：小程序端用 `createSelectorQuery` 同时取吸顶头与列表容器的视口坐标）：

```ts
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
    uni.createSelectorQuery()
      .select('#food-list-header-' + index).boundingClientRect()
      .select('#food-list').boundingClientRect()
      .exec((res) => {
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
```

> 说明：微信端 `list-view` 会编译为增强 `scroll-view`，CSS sticky 在该容器内可用（模拟器与真机已验证）。点击滚动、滚动高亮、触底加载与非 MP 完全一致，仅坐标测量 API 与吸顶实现不同。

## 动态数据与布局变化

各平台处理方式相同：数据变化（首次加载 / 分页追加）后，等新分段渲染完成再测量其内容坐标：

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

## 平台说明

- 各平台统一使用独立滚动容器（`list-view`）+ `@scroll` 坐标计算高亮 + `scroll-into-view` 点击滚动 + `scrolltolower` 触底加载，条件编译仅剩「吸顶模板」与「坐标测量 API」两处；
- 吸顶实现：App / Web / 鸿蒙使用 `sticky-section` / `sticky-header` 原生分段吸顶；小程序使用 CSS `position: sticky`（微信默认 WebView 渲染不支持 `sticky-section`，该组件为 Skyline 专属）；
- 微信端 `list-view` 编译为增强 `scroll-view`（`enhanced="true"`），CSS sticky 在该容器内已被微信模拟器与真机验证可用；
- 不使用相交观察器做滚动高亮：IO 的回调只发生在相交状态 0↔非 0 跨越时，窄参照带在慢速拖动下会在头部到达吸顶位置前就停止回调，导致高亮滞后（该问题在 App 与微信端均已实测确认）；
- iOS 平台 `UniResizeObserver.observe(list-view)` 会导致 `sticky-section` 吸顶失效（[DCloud issue #34579](https://issues.dcloud.net.cn/pages/issues/detail?id=34579)），本示例的高亮方案不依赖 `UniResizeObserver`，因此不受影响；如需监听 `list-view` 尺寸变化，iOS 上请避开此 API；
- 组件本身全平台通用，无平台条件编译。

## 变更日志

见 [changelog.md](./changelog.md)。

# TODO
- web 多根节点下相交 api 获取不到
- web 缺少 scrollViewContext
- 同步监听逻辑在多页面复用后可沉淀为组合式工具



### 兼容性 <Help />
Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| list | string\[\] | Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07 | 导航数据，数组每一项与目标列表中的分段按索引一一对应 |
| currentIndex | number | Web: 5.07; 微信小程序: 5.07; 支付宝小程序: 5.31; Android(Vapor): 5.21; iOS(Vapor): 5.11; HarmonyOS(Vapor): 5.07 | 当前高亮索引。传入时为受控模式（推荐搭配 v-model:current-index），<br>点击只抛出变更请求，高亮由绑定值决定；不传时为非受控模式，点击后组件内部维护高亮。 |
| @select | Event |   | 点击导航项时触发，页面据此滚动目标列表 |
| @update:currentIndex | Event |   | 高亮索引更新事件，用于 v-model:current-index |










