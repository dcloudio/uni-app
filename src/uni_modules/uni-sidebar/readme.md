# uni-sidebar 侧边滚动导航组件

用于长滚动容器的侧边导航，点击 uni-sidebar 组件中的导航项切换旁边目标滚动容器的滚动条位置。

常用于外卖点餐选择菜品页面，或长文章大纲。与 index-bar 组件有类似之处。

演示页面路径：/pages/uni-ui/sidebar/sidebar.uvue 页面，里面演示 uni-sidebar 组件的各种用法。

## 组件设计

uni-sidebar 组件为 list-view 组件的包装，内部包含 list-view 和 list-item。list-item 下面有 slot。外部使用者通过具名插槽方式传入内容。

uni-sidebar 提供属性 `targetId`，用于绑定目标列表组件。

uni-sidebar 内部需传入导航数据，以数组方式（`list` 属性）。

同时在目标列表组件也需要传入数据，并且数据的导航索引需要与 uni-sidebar 组件传入的数组对应。目标列表中的每个分段需要设置 id，规则为 `${targetId}-item-${index}`，例如 `targetId` 为 `list` 时，第一个分段的 id 为 `list-item-0`，第二个为 `list-item-1`，以此类推。

点击 sidebar 组件中的 list-item，会触发右侧 `targetId` 的列表滚动，滚动到相应的位置。通过 `uni.createSelectorQuery` 传入 `targetId` 获取到右侧列表的 ScrollViewContext，再调用 ScrollViewContext 的 `scrollIntoView` 方法来滚动，避免响应式变量更新。

右侧列表滚动时，通过 IntersectionObserver 在目标列表顶部构造一条 1px 的参照带，与参照带相交的分段即当前吸顶的分段，据此高亮左侧 sidebar 的对应菜单项，保证左侧高亮与右侧吸顶分段严格对应。

> 分段吸顶：`sticky-section` + `sticky-header` 仅在 Skyline 渲染下可用；默认小程序为 WebView 渲染，`scroll-view` 内 `position: sticky` 也不生效（而且 uni-app x 给所有 `view` 默认加了 `overflow: hidden`，会破坏 sticky）。
>
> 小程序端（`#ifdef MP`）采用**页面滚动 + CSS `position: sticky`**实现原生「推出式」分段吸顶（与常见点餐小程序一致）：
> - 目标列表不再放进 `list-view`，而是直接作为页面内容（页面自然滚动）；
> - 分组标题用 `position: sticky; top: 0`；
> - 关键：把标题的所有祖先容器（页面根 view、列表容器、分组容器）设为 `overflow: visible`，否则会被 uni-app x 默认的 `overflow: hidden` 限制而无法吸顶；
> - 左侧导航用 `position: fixed` 固定；
> - 组件传入 `:page-scroll="true"`，点击导航项时通过 `uni.pageScrollTo` 滚动到对应分组，并用基于视口的 `IntersectionObserver` 计算当前吸顶分组来高亮。
>
> 其他平台（`#ifndef MP`）继续使用独立滚动容器（`list-view`）+ `sticky-section`。
>
> 两种结构下，分组 id 均为 `${targetId}-item-${index}`，uni-sidebar 的高亮始终跟随当前吸顶的分组。

> 说明：ScrollViewContext 目前仅在微信小程序和 App 蒸汽模式下可用。微信小程序端 list-view 编译为原生 scroll-view，可通过 `createSelectorQuery().select('#id').node()` 获取 ScrollViewContext。滚动高亮依赖 `createIntersectionObserver`（App 端暂不支持，已自动降级为仅点击高亮）。

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| list | Array\<string> | [] | 导航数据，数组每一项与目标列表中的条目按索引一一对应 |
| targetId | string | - | 目标列表 list-view 的 id |
| offset | number | 0 | 滚动到目标位置时的额外偏移量，单位 px |
| scrollWithAnimation | boolean | true | 滚动时是否使用动画 |
| pageScroll | boolean | false | 目标列表是否使用页面滚动（而非独立 list-view 滚动容器）。为 true 时点击导航项用 `uni.pageScrollTo` 滚动，并按视口高亮 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 点击导航项时触发 | index: number - 当前导航项索引；item: string - 当前导航项内容 |
| change | 高亮导航项发生变化（目标列表滚动）时触发 | index: number - 当前高亮索引；item: string - 当前高亮内容 |

## 插槽

| 插槽名 | 说明 | 插槽参数 |
|--------|------|----------|
| default | 自定义导航项内容 | { item: string, index: number, active: boolean } |

## 基本用法

小程序端用「页面滚动 + CSS sticky」实现原生推出式分段吸顶：

```html
<!-- #ifdef MP -->
<view class="page">
  <view class="sidebar-wrap">
    <uni-sidebar class="sidebar" :list="categories" target-id="food-list" :page-scroll="true">
      <template #default="{ item, index, active }">
        <view class="sidebar-item" :class="{ 'sidebar-item--active': active }">
          <text class="sidebar-item__text">{{ item }}</text>
        </view>
      </template>
    </uni-sidebar>
  </view>
  <view class="list">
    <view v-for="(group, index) in groups" :key="group.name" :id="'food-list-item-' + index" class="section">
      <view class="group-header">{{ group.name }}</view>
      <view v-for="item in group.items" :key="item.id">
        <!-- 分段内容 -->
      </view>
    </view>
  </view>
</view>
<!-- #endif -->
```

```css
/* 侧边栏固定在左侧（用固定容器显式给定宽度与背景，避免组件根节点宽度为 0 导致漏内容） */
.sidebar-wrap {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 90px;
  z-index: 30;
  background-color: var(--background-color, #f7f7f7);
}

.sidebar {
  width: 100%;
  height: 100%;
}

.list {
  padding-left: 90px;
}

/* 关键：uni-app x 给所有 view 默认加了 overflow: hidden，会破坏 sticky，必须置为 visible */
.page,
.list,
.section {
  overflow: visible;
}

/* 分组标题吸顶（下一段标题会推出上一段） */
.group-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--background-color, #f5f5f5);
}
```

非小程序端（App/H5）使用独立滚动容器 + `sticky-section`：

```html
<!-- #ifndef MP -->
<view style="flex: 1; flex-direction: row;">
  <uni-sidebar :list="categories" target-id="food-list">
    <template #default="{ item, index, active }">
      <view class="sidebar-item" :class="{ 'sidebar-item--active': active }">
        <text class="sidebar-item__text">{{ item }}</text>
      </view>
    </template>
  </uni-sidebar>
  <list-view id="food-list" style="flex: 1;">
    <sticky-section v-for="(group, index) in groups" :key="group.name" :id="'food-list-item-' + index">
      <sticky-header>
        <view class="group-header">{{ group.name }}</view>
      </sticky-header>
      <list-item v-for="item in group.items" :key="item.id">
        <!-- 分段内容 -->
      </list-item>
    </sticky-section>
  </list-view>
</view>
<!-- #endif -->
```
