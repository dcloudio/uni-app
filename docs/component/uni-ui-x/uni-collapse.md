---
source: https://gitcode.com/dcloud/uni-ui-x/tree/alpha/uni_modules/uni-collapse
---

::: sourceCode
## uni-collapse
:::

折叠面板组件

> 本 Component 是 uni ext component，需下载插件：[uni-collapse](https://ext.dcloud.net.cn/plugin?id=27899)


折叠面板组件，包含：

- `uni-collapse`：父容器
- `uni-collapse-item`：子面板

一个折叠面板组件可以包含若干uni-collapse-item。每个uni-collapse-item包括顶部标题栏和通过slot传入的内容区。

### 基本用法

```html
<uni-collapse :accordion="true">
  <uni-collapse-item title="标题 1" :open="true">
    <view><text>内容 1</text></view>
  </uni-collapse-item>
  <uni-collapse-item title="标题 2">
    <view><text>内容 2</text></view>
  </uni-collapse-item>
</uni-collapse>
```

uni-collapse-item的标题栏的自定义：
- 标题栏容器可通过 `title-wrap-class` 自定义背景等容器样式。
- 标题栏支持title属性，可通过title-class自定义文字样式。
- 标题展开态可通过 `title-open-class` 自定义激活文字样式。组件默认使用透明度区分状态，便于外部继续覆盖文字颜色。
- 标题禁用态可通过 `title-disabled-class` 自定义禁用文字样式。若同时存在展开态和禁用态，以禁用态为最终状态。
- 内容外层容器可通过 `content-wrap-class` 自定义背景等容器样式。
- 标题栏右边默认带有箭头，可通过arrow-class自定义箭头样式。该箭头为一个view包括2个直角边的边框，然后旋转而成。
- 箭头展开态和禁用态可分别通过 `arrow-open-class`、`arrow-disabled-class` 覆盖。组件默认也使用透明度区分状态，便于外部继续覆盖箭头颜色。
- 如果完全不想要默认包含的title和arrow，也可以传入一个名为title的具名插槽来替换。

### 具名插槽标题

```html
<uni-collapse-item>
  <template #title="{ open, disabled }">
    <view class="custom-title">
      <view class="custom-title-icon"></view>
      <text class="custom-title-text">{{ open ? '已展开' : '未展开' }}</text>
    </view>
  </template>
  <view><text>自定义标题内容</text></view>
</uni-collapse-item>
```

### externalClass

```html
<uni-collapse-item
  title="自定义样式"
  title-wrap-class="my-title-wrap-class"
  title-class="my-title-class"
  title-open-class="my-title-open-class"
  content-wrap-class="my-content-wrap-class"
  arrow-class="my-arrow-class"
  arrow-open-class="my-arrow-open-class"
>
  <view><text>内容区域</text></view>
</uni-collapse-item>
```

### Slots

#### uni-collapse-item

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 面板内容 | - |
| title | 自定义标题区域 | `open: boolean`、`disabled: boolean` |

### Events

#### uni-collapse-item

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 面板展开状态变化时触发 | `open: boolean` |

### Expose

#### uni-collapse-item

| 方法名 | 说明 |
| --- | --- |
| openCollapse(open: boolean) | 执行展开/收起，会遵循 `disabled` 和手风琴逻辑 |
| openOrClose(open: boolean) | 直接切换内容显示状态 |

### 暗黑模式适配

建议通过组件 `class` 和 externalClass 组合传入暗色样式：

- 用组件 `class` 统一控制根节点和内容区等外层视觉。
- 用 `title-wrap-class`、`title-class`、`title-open-class`、`content-wrap-class`、`arrow-class`、`arrow-open-class` 等 externalClass 覆盖标题区、内容外层和箭头样式。
- 默认展开态和禁用态主要通过透明度表达，减少颜色覆盖时的交叉冲突。

### 注意
- 本组件在Android上需HBuilderX 5.09+。在低版本上箭头变颜色+旋转时，在Android上会消失



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| accordion | boolean | true | 是否开启手风琴模式，开启后同一时间仅允许一个子项展开 |

<!-- UTSCOMJSON.uni-collapse.fileFormates -->



<!-- UTSCOMJSON.uni-collapse.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/uni-ui/collapse/collapse.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/uni-ui/collapse/collapse.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/uni-ui/collapse/collapse

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/uni-ui/collapse/collapse

>示例
```vue
<template>
  <scroll-view class="page uni-theme-root">
    <view class="section">
      <text class="section-title">手风琴模式</text>
      <uni-collapse :accordion="true">
        <uni-collapse-item class="theme-collapse-item" title="面板 A（默认展开）" :open="data.enableOpen" @change="onPanelAChange" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <view class="content-box" @click="onPanelAClick">
            <text class="content-text">手风琴模式下，同时只会保持一个面板展开。点击当前标题会自动收起其他面板。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="theme-collapse-item" title="面板 B" @change="onPanelBChange" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <view id="panel-b" class="content-box">
            <text class="content-text">当前项展开时，其他已展开的项会自动收起。这里用于验证切换动画和事件回调。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="theme-collapse-item" title="禁用项" :disabled="true" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <view class="content-box">
            <text class="content-text">禁用状态下不会响应点击，也不会触发展开或收起。</text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="section">
      <text class="section-title">普通模式-可同时展开的分组折叠列表</text>
      <uni-collapse :accordion="false">
        <uni-collapse-item v-for="(group, index) in categoryGroups" :key="group.title" class="theme-collapse-item" :title="group.title" @change="onCategoryChange(group.title, $event as boolean)" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <view class="category-list">
            <view v-for="(item, itemIndex) in group.items" :key="item.title" class="category-list-item"
              :class="{'category-list-item--last': itemIndex == group.items.length - 1}">
              <text class="category-list-text">{{ item.title }}</text>
              <view class="category-list-arrow"></view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="section">
      <text class="section-title">externalClass 示例</text>
      <uni-collapse :accordion="false">
        <uni-collapse-item class="theme-collapse-item" title="自定义标题文字" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title demo-title-emphasis" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <view class="content-box">
            <text class="content-text">通过 title-class 可以覆盖 title 属性对应 text 组件的样式。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="theme-collapse-item" title="自定义箭头样式" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow demo-arrow-large">
          <view class="content-box">
            <text class="content-text">通过 arrow-class 可以覆盖默认箭头 view 的尺寸、边框粗细和颜色。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="theme-collapse-item" title="同时自定义标题和箭头" title-wrap-class="theme-collapse-title-wrap" title-class="theme-collapse-title demo-title-accent" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow demo-arrow-accent">
          <view class="content-box">
            <text class="content-text">title-class 和 arrow-class 可以组合使用。</text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="section">
      <text class="section-title">具名插槽标题</text>
      <uni-collapse :accordion="false">
        <uni-collapse-item class="theme-collapse-item" title-wrap-class="theme-collapse-title-wrap" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <template #title="{ open, disabled }">
            <view class="slot-title-wrap">
              <view class="slot-title-icon" :class="{'slot-title-icon--open': open, 'slot-title-icon--disabled': disabled}"></view>
              <text class="slot-title-text" :class="{'slot-title-text--open': open, 'slot-title-text--disabled': disabled}">消息中心</text>
              <text class="slot-title-badge" :class="{'slot-title-badge--open': open}">{{ open ? 'OPEN' : 'CLOSE' }}</text>
            </view>
          </template>
          <view class="content-box">
            <text class="content-text">通过 #title 可以自定义标题区域结构，例如在文字前增加图标、状态徽标和辅助说明。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="theme-collapse-item" title-wrap-class="theme-collapse-title-wrap" content-wrap-class="theme-collapse-content-wrap" arrow-class="theme-collapse-arrow">
          <template #title="{ open }">
            <view class="slot-title-wrap">
              <view class="slot-title-icon slot-title-icon--secondary" :class="{'slot-title-icon--open': open}"></view>
              <text class="slot-title-text" :class="{'slot-title-text--open': open}">设置中心</text>
              <text class="slot-title-note">{{ open ? '当前已展开' : '点击展开配置项' }}</text>
            </view>
          </template>
          <view class="content-box">
            <text class="content-text">具名插槽会透出 open 和 disabled 状态，方便你在标题区域里联动样式。</text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="section section-dark">
      <text class="section-title section-title-dark">暗黑模式 externalClass 示例</text>
      <view class="dark-tip">
        <text class="dark-tip-text">这个示例通过给 uni-collapse-item 传入 class 和 externalClass，分别定制内容区和标题区样式。</text>
      </view>
      <uni-collapse :accordion="false">
        <uni-collapse-item class="dark-collapse-item" title="暗色标题 A" :open="true" title-wrap-class="dark-title-wrap" title-class="dark-title-text" title-open-class="dark-title-text-open" content-wrap-class="dark-content-wrap" arrow-class="dark-arrow" arrow-open-class="dark-arrow-open">
          <view class="content-box dark-content-box">
            <text class="content-text dark-content-text">组件根节点通过 class 统一接入暗色卡片样式，标题背景、默认文字、展开态文字和箭头颜色通过 externalClass 传入。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="dark-collapse-item dark-collapse-item-strong" title="暗色标题 B" title-wrap-class="dark-title-wrap-strong" title-class="dark-title-text-strong" title-open-class="dark-title-text-open" content-wrap-class="dark-content-wrap" arrow-class="dark-arrow-strong" arrow-open-class="dark-arrow-open">
          <view class="content-box dark-content-box">
            <text class="content-text dark-content-text">你也可以继续组合不同的根容器 class、标题字重、箭头粗细和激活色样式。</text>
          </view>
        </uni-collapse-item>
        <uni-collapse-item class="dark-collapse-item dark-collapse-item-muted" title="暗色禁用项" :disabled="true" title-wrap-class="dark-title-wrap-muted" title-class="dark-title-text" title-disabled-class="dark-title-text-disabled" content-wrap-class="dark-content-wrap-muted" arrow-class="dark-arrow" arrow-disabled-class="dark-arrow-disabled">
          <view class="content-box dark-content-box dark-content-box-muted">
            <text class="content-text dark-content-text">禁用态默认通过透明度表达状态，外部依然可以继续指定禁用态文字和箭头颜色。</text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>

    <view class="log-section">
      <text class="log-title">最近事件</text>
      <text class="log-text">{{ data.lastEvent }}</text>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  type CategoryItem = {
    title : string
  }

  type CategoryGroup = {
    title : string,
    items : CategoryItem[]
  }

  const categoryGroups : CategoryGroup[] = [
    {
      title: '分类1',
      items: [
        { title: '分类1-item1' },
        { title: '分类1-item2' },
        { title: '分类1-item3' }
      ]
    },
    {
      title: '分类2',
      items: [
        { title: '分类2-item1' },
        { title: '分类2-item2' },
        { title: '分类2-item3' }
      ]
    },
    {
      title: '分类3',
      items: [
        { title: '分类3-item1' },
        { title: '分类3-item2' },
        { title: '分类3-item3' }
      ]
    }
  ]

  type Data = {
    lastEvent: string,
    enableOpen: boolean
  }

  const data = reactive<Data>({
    lastEvent: '暂无交互',
    enableOpen: true
  })

  function updateEvent(panel : string, open : boolean) {
    const stateText = open ? '展开' : '收起'
    const message = `${panel}${stateText}`
    data.lastEvent = message
    console.log(`[collapse] ${message}`)
  }

  function onPanelAChange(open : boolean) {
    updateEvent('面板 A ', open)
  }

  function onPanelBChange(open : boolean) {
    updateEvent('面板 B ', open)
  }

  function onCategoryChange(title : string, open : boolean) {
    updateEvent(`${title} `, open)
  }

  const onPanelAClick = () => {
    console.log('onPanelAClick')
  }

  defineExpose({
    data,
    onPanelAClick
  })
</script>

<style>
  .page {
    flex: 1;
    padding: 12px;
  }

  .theme-collapse-item,
  .theme-collapse-title-wrap,
  .theme-collapse-content-wrap {
    background-color: #ffffff;
  }

  .theme-collapse-title {
    color: #333333;
  }

  .theme-collapse-arrow {
    border-right-color: #999999;
    border-bottom-color: #999999;
  }

  .section {
    margin-bottom: 12px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--list-background-color, #ffffff);
  }

  .section-title {
    padding: 12px;
    font-size: 14px;
    color: var(--text-color, #333333);
    font-weight: 500;
  }

  .content-box {
    padding: 12px;
    background-color: var(--active-background-color, #f8fafc);
  }

  .content-text {
    font-size: 13px;
    color: var(--text-color, #475569);
    opacity: 0.78;
    line-height: 20px;
  }

  .category-list {
    background-color: var(--active-background-color, #f8fafc);
  }

  .category-list-item {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border-color, #e2e8f0);
  }

  .category-list-item--last {
    border-bottom-width: 0px;
  }

  .category-list-text {
    flex: 1;
    font-size: 13px;
    color: var(--text-color, #334155);
    line-height: 20px;
  }

  .category-list-arrow {
    width: 8px;
    height: 8px;
    margin-left: 12px;
    transform: rotate(-45deg);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: var(--arrow-color, #94a3b8);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--arrow-color, #94a3b8);
  }

  .demo-title-emphasis {
    font-size: 16px;
    font-weight: 700;
  }

  .demo-title-accent {
    font-size: 15px;
    font-weight: 700;
    color: #0f766e;
  }

  .demo-arrow-large {
    width: 12px;
    height: 12px;
    border-right-width: 2px;
    border-bottom-width: 2px;
  }

  .demo-arrow-accent {
    border-right-color: #0f766e;
    border-bottom-color: #0f766e;
    border-right-width: 2px;
    border-bottom-width: 2px;
  }

  .slot-title-wrap {
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  .slot-title-icon {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #94a3b8;
  }

  .slot-title-icon--secondary {
    background-color: #c084fc;
  }

  .slot-title-icon--open {
    background-color: #2563eb;
  }

  .slot-title-icon--disabled {
    background-color: #cbd5e1;
  }

  .slot-title-text {
    flex: 1;
    font-size: 14px;
    color: var(--text-color, #1f2937);
    font-weight: 600;
  }

  .slot-title-text--open {
    color: #2563eb;
  }

  .slot-title-text--disabled {
    color: #94a3b8;
  }

  .slot-title-badge {
    padding: 4px 8px;
    border-radius: 10px;
    background-color: #e2e8f0;
    font-size: 11px;
    color: #475569;
  }

  .slot-title-badge--open {
    background-color: #dbeafe;
    color: #1d4ed8;
  }

  .slot-title-note {
    font-size: 12px;
    color: #64748b;
  }

  .section-dark {
    background-color: #111827;
  }

  .section-title-dark {
    color: #e5e7eb;
  }

  .dark-collapse-item {
    background-color: #111827;
  }

  .dark-collapse-item-strong {
    background-color: #0f172a;
  }

  .dark-collapse-item-muted {
    background-color: #101826;
  }

  .dark-tip {
    padding: 0px 12px 12px 12px;
  }

  .dark-tip-text {
    font-size: 12px;
    color: #9ca3af;
    line-height: 18px;
  }

  .dark-content-box {
    background-color: #1f2937;
  }

  .dark-content-wrap {
    background-color: #1f2937;
  }

  .dark-content-text {
    color: #cbd5e1;
  }

  .dark-content-box-muted {
    background-color: #182333;
  }

  .dark-content-wrap-muted {
    background-color: #182333;
  }

  .dark-title-wrap {
    background-color: #111827;
  }

  .dark-title-wrap-strong {
    background-color: #0f172a;
  }

  .dark-title-wrap-muted {
    background-color: #101826;
  }

  .dark-title-text {
    color: #f8fafc;
  }

  .dark-title-text-strong {
    font-size: 15px;
    font-weight: 700;
    color: #e2e8f0;
  }

  .dark-title-text-open {
    color: #60a5fa;
  }

  .dark-title-text-disabled {
    color: #94a3b8;
  }

  .dark-arrow {
    border-right-color: #cbd5e1;
    border-bottom-color: #cbd5e1;
  }

  .dark-arrow-strong {
    border-right-color: #cbd5e1;
    border-bottom-color: #cbd5e1;
    border-right-width: 2px;
    border-bottom-width: 2px;
  }

  .dark-arrow-open {
    border-right-color: #60a5fa;
    border-bottom-color: #60a5fa;
  }

  .dark-arrow-disabled {
    border-right-color: #94a3b8;
    border-bottom-color: #94a3b8;
  }

  .log-section {
    padding: 12px;
    border-radius: 8px;
    background-color: var(--list-background-color, #ffffff);
  }

  .log-title {
    font-size: 13px;
    color: var(--text-color, #333333);
    font-weight: 500;
    margin-bottom: 8px;
  }

  .log-text {
    font-size: 13px;
    color: #2563eb;
  }

  @media (prefers-color-scheme: dark) {
    .theme-collapse-item,
    .theme-collapse-title-wrap,
    .theme-collapse-content-wrap {
      background-color: #2d2d2d;
    }

    .theme-collapse-title {
      color: #ffffff;
    }

    .theme-collapse-arrow {
      border-right-color: #ffffff;
      border-bottom-color: #ffffff;
    }

    .demo-title-accent {
      color: #5eead4;
    }

    .demo-arrow-accent {
      border-right-color: #5eead4;
      border-bottom-color: #5eead4;
    }

    .slot-title-note {
      color: #cbd5e1;
    }
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-collapse)


::: sourceCode
## uni-collapse-item
:::

折叠面板子项组件

> 本 Component 是 uni ext component，需下载插件：[uni-collapse-item](https://ext.dcloud.net.cn/plugin?id=27899)


折叠面板组件，包含：

- `uni-collapse`：父容器
- `uni-collapse-item`：子面板

一个折叠面板组件可以包含若干uni-collapse-item。每个uni-collapse-item包括顶部标题栏和通过slot传入的内容区。

### 基本用法

```html
<uni-collapse :accordion="true">
  <uni-collapse-item title="标题 1" :open="true">
    <view><text>内容 1</text></view>
  </uni-collapse-item>
  <uni-collapse-item title="标题 2">
    <view><text>内容 2</text></view>
  </uni-collapse-item>
</uni-collapse>
```

uni-collapse-item的标题栏的自定义：
- 标题栏容器可通过 `title-wrap-class` 自定义背景等容器样式。
- 标题栏支持title属性，可通过title-class自定义文字样式。
- 标题展开态可通过 `title-open-class` 自定义激活文字样式。组件默认使用透明度区分状态，便于外部继续覆盖文字颜色。
- 标题禁用态可通过 `title-disabled-class` 自定义禁用文字样式。若同时存在展开态和禁用态，以禁用态为最终状态。
- 内容外层容器可通过 `content-wrap-class` 自定义背景等容器样式。
- 标题栏右边默认带有箭头，可通过arrow-class自定义箭头样式。该箭头为一个view包括2个直角边的边框，然后旋转而成。
- 箭头展开态和禁用态可分别通过 `arrow-open-class`、`arrow-disabled-class` 覆盖。组件默认也使用透明度区分状态，便于外部继续覆盖箭头颜色。
- 如果完全不想要默认包含的title和arrow，也可以传入一个名为title的具名插槽来替换。

### 具名插槽标题

```html
<uni-collapse-item>
  <template #title="{ open, disabled }">
    <view class="custom-title">
      <view class="custom-title-icon"></view>
      <text class="custom-title-text">{{ open ? '已展开' : '未展开' }}</text>
    </view>
  </template>
  <view><text>自定义标题内容</text></view>
</uni-collapse-item>
```

### externalClass

```html
<uni-collapse-item
  title="自定义样式"
  title-wrap-class="my-title-wrap-class"
  title-class="my-title-class"
  title-open-class="my-title-open-class"
  content-wrap-class="my-content-wrap-class"
  arrow-class="my-arrow-class"
  arrow-open-class="my-arrow-open-class"
>
  <view><text>内容区域</text></view>
</uni-collapse-item>
```

### Slots

#### uni-collapse-item

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 面板内容 | - |
| title | 自定义标题区域 | `open: boolean`、`disabled: boolean` |

### Events

#### uni-collapse-item

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 面板展开状态变化时触发 | `open: boolean` |

### Expose

#### uni-collapse-item

| 方法名 | 说明 |
| --- | --- |
| openCollapse(open: boolean) | 执行展开/收起，会遵循 `disabled` 和手风琴逻辑 |
| openOrClose(open: boolean) | 直接切换内容显示状态 |

### 暗黑模式适配

建议通过组件 `class` 和 externalClass 组合传入暗色样式：

- 用组件 `class` 统一控制根节点和内容区等外层视觉。
- 用 `title-wrap-class`、`title-class`、`title-open-class`、`content-wrap-class`、`arrow-class`、`arrow-open-class` 等 externalClass 覆盖标题区、内容外层和箭头样式。
- 默认展开态和禁用态主要通过透明度表达，减少颜色覆盖时的交叉冲突。

### 注意
- 本组件在Android上需HBuilderX 5.09+。在低版本上箭头变颜色+旋转时，在Android上会消失



### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.07 | 5.07 | 5.07 | 5.07 | 5.07 |


### 属性 
| 名称 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| title | string | "" | 折叠项标题文字 |
| open | boolean | false | 是否默认展开 |
| disabled | boolean | false | 是否禁用，禁用后点击标题不会展开或收起 |
| titleWrapClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 标题行（整行容器）的样式类 |
| titleClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 标题文字的基础样式类 |
| titleOpenClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 展开状态下叠加到标题文字的样式类 |
| titleDisabledClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 禁用状态下叠加到标题文字的样式类 |
| contentWrapClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 内容外层容器的样式类 |
| arrowClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 箭头图标的基础样式类 |
| arrowOpenClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 展开状态下叠加到箭头图标的样式类 |
| arrowDisabledClass | string([string.ClassString](/uts/data-type.md#ide-string)) | "" | 禁用状态下叠加到箭头图标的样式类 |
| @change | Event |   |   |

<!-- UTSCOMJSON.uni-collapse-item.fileFormates -->



<!-- UTSCOMJSON.uni-collapse-item.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=uni-ui-x.uni-collapse-item)
