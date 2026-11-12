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
