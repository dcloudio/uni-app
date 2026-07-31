# 项目介绍

uni-ui x，是DCloud为 uni-app x 提供的扩展组件库。[开源库地址](https://gitcode.com/dcloud/uni-ui-x/tree/alpha)

uni-ui x 是全新设计的，与为uni-app做的uni-ui不同。

uni-ui x 有包括所有组件的[套装](https://ext.dcloud.net.cn/plugin?id=27852)，也可以单独下载每个组件（左侧每个组件文档中有该组件的下载地址）。

uni-ui x 是伴随着HBuilderX 5.08发版的。5.07版本上有部分组件在部分平台有兼容性问题，详见组件文档的兼容性表格。5.07以前的HBuilderX版本未测试。

uni-ui x 仅支持[样式隔离策略2.0](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html)，需注意5.0以前创建的老项目需要在manifest.json中手动开启。

# 特点

- 性能
uni-ui x 非常注重性能，在DOM层级控制、包体积、代码执行时间方面精益求精。

它了解 uni-app x 蒸汽模式的最佳实践，尽可能利用模板和样式的预编译特性来提升性能。当然它也支持非蒸汽模式。

- 合理的抽象

一个组件的抽象能力非常重要，如何在自定义性、易用性、性能之间尽可能三全其美。

很多组件为了满足使用者的需求，封装的属性越来越多，但组件使用者仍然在抱怨自定义性不足。

尤其是把样式封装在组件属性上，造成用户需要自定义样式时无限封装属性，并且这些属性的控制无法使用css变量。

uni-ui x 提供了完全的样式自定义能力，所有的样式定义都可以通过class设置，组件属性只控制功能逻辑。

* 组件的根节点样式，可以在使用组件时的组件class或style上设置。
* 组件的子节点样式，可以通过[externalClass](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html#external-class)设置样式。子组件开放自己的样式出来，外部可通过externalClass进行子组件的样式自定义。

组件使用者完全可以通过css自己控制所有样式。无需修改组件源码。加上css变量加持，灵活度远高于其他组件库。

使用者可以通过css变量完全自定义自己的主题，而不会被组件属性上不能写css变量困扰。

- 为AI设计

uni-ui x 优先代码而不是二进制文件。目前没有引入字体文件。这处于性能考虑，也出于AI友好度考虑。

以箭头为例，uni-ui x 中使用一个view配置左下边框并transform旋转来实现，这种设计性能比字体更好，且AI可以方便的理解这段代码的UI表现，可以在代码层面调整样式。

如果是字体图片，AI很难理解、生成、修改。

再举一个例子，uni-tab下沉midbutton，涉及一个贝塞尔曲线，此时没有使用图片，而是使用svg，同样是为了方便AI理解和修改。

- 中性

uni-ui x的风格是中性的，和uni内置组件、小程序内置组件一样，重视是开发者可以自定义成各种风格，而不是为开发者提供某套风格。

开发者可以通过自定义css，形成自己的风格，或者交给AI完成类似工作。

- 没有写死的颜色和文字

* 没有写死的文字，不影响国际化。
* 没有写死的颜色，不影响自定义主题。

<!-- 组件列表开始 -->
## uni-ui x 已支持的组件列表

| 组件名 | 组件说明 |
| --- | --- |
| uni-badge-view | [数字角标](https://ext.dcloud.net.cn/plugin?name=uni-badge-view) |
| uni-collapse | [折叠面板](https://ext.dcloud.net.cn/plugin?name=uni-collapse-x) |
| uni-drag-cell | [可拖拽排序组件](https://ext.dcloud.net.cn/plugin?name=uni-drag-cell) |
| uni-fab-button | [uni-fab-button](https://ext.dcloud.net.cn/plugin?name=uni-fab-button) |
| uni-index-bar | [uni-index-bar](https://ext.dcloud.net.cn/plugin?name=uni-index-bar) |
| uni-link | [链接](https://ext.dcloud.net.cn/plugin?name=uni-link-x) |
| uni-nav-bar | [uni-nav-bar](https://ext.dcloud.net.cn/plugin?name=uni-nav-bar-x) |
| uni-number-box | [数字输入框](https://ext.dcloud.net.cn/plugin?name=uni-number-box-x) |
| uni-rate | [评分](https://ext.dcloud.net.cn/plugin?name=uni-rate-x) |
| uni-refresh-box | [uni-refresh-box](https://ext.dcloud.net.cn/plugin?name=uni-refresh-box) |
| uni-tab | [选项卡](https://ext.dcloud.net.cn/plugin?name=uni-tab-bar) |
| uni-time-format | [时间格式化](https://ext.dcloud.net.cn/plugin?name=uni-time-format) |

<!-- 组件列表结束 -->

# uni-ui的升级建议@uniuiupgrade

为 uni-app 提供的 uni-ui，为了兼容vue2，是选项式的。

而 uni-app x 蒸汽模式只支持组合式，所以老的 uni ui 是无法在蒸汽模式下使用的。

uni-app x 新提供了 uni-ui x，它是组合式的，且支持样式隔离策略2.0、支持无头理念。

uni-ui 无法直接对照升级 uni-ui x，组件名称、用法都有变化。

但升级时，老版 uni-ui 组件在 uni-app x 下的平替方案是什么，可以在这里说明功能映射关系：

|uni-ui组件						|中文名称								|在uni-app x下的方案																						|
|--										|--											|--																														|
|uni-badge						|数字角标								|改用uni-ui x的uni-badge-view																	|
|uni-calendar					|日历										|见hello uni-app x里的模板中的日历页面													|
|uni-card							|卡片										|无。建议直接使用class，不用组件																|
|uni-collapse					|折叠面板								|改用uni-ui x的uni-collapse																		|
|uni-combox						|组合框									|无																														|
|uni-countdown				|倒计时									|无																														|
|uni-data-checkbox		|数据选择器							|无																														|
|uni-data-picker			|数据驱动的picker选择器	|该组件支持uni-app x的VDOM模式，因为是选项式，无法支持蒸汽模式		|
|uni-dateformat				|日期格式化							|改用uni-ui x的uni-time-format																	|
|uni-datetime-picker	|日期选择器							|内置组件picker支持mode=date																		|
|uni-drawer						|抽屉										|改用内置组件page-container																		|
|uni-easyinput				|增强输入框							|无																														|
|uni-fab							|悬浮按钮								|改用uni-ui x的uni-fab-button																	|
|uni-fav							|收藏按钮								|无。建议直接使用class，不用组件																|
|uni-file-picker			|文件选择上传						|无																														|
|uni-forms						|表单										|改用内置组件form																							|
|uni-goods-nav				|商品导航								|无																														|
|uni-grid							|宫格										|无。建议直接使用class，不用组件																|
|uni-group						|分组										|无。建议直接使用class，不用组件																|
|uni-icons						|图标										|改用uni-ui x的uni-icons-x的组合式组件													|
|uni-indexed-list			|索引列表								|改用uni-ui x的uni-index-bar																		|
|uni-link							|超链接									|改用uni-ui x的uni-link																				|
|uni-list							|列表										|使用内置组件list-view																					|
|uni-load-more				|加载更多								|使用内置组件loading																						|
|uni-nav-bar					|自定义导航栏						|改用uni-ui x的uni-nav-bar																			|
|uni-notice-bar				|通告栏									|无。非滚动建议直接使用class，不用组件													|
|uni-number-box				|数字输入框							|改用uni-ui x的uni-number-box																	|
|uni-pagination				|分页器									|无																														|
|uni-popup						|弹出层									|改用内置组件page-container																		|
|uni-rate							|评分										|改用uni-ui x的uni-rate																				|
|uni-row							|布局-行									|无。建议直接使用class，不用组件																|
|uni-search-bar				|搜索栏									|无																														|
|uni-segmented-control|分段器									|无																														|
|uni-steps						|步骤条									|无																														|
|uni-swipe-action			|滑动操作								|不推荐使用组件，请参考hello uni-app x模板中可左滑删除长列表示例	|
|uni-swiper-dot				|轮播图指示点						|改用内置组件swiper，通过externalClass控制指示点样式						|
|uni-table						|表格										|推荐使用rich-text或web-view中的table。												|
|uni-tag							|标签										|无。建议直接使用class，不用组件																|
|uni-title						|章节标题								|无。建议直接使用class，不用组件																|
|uni-transition				|过渡动画								|无。建议直接使用class，不用组件																|

标记为`无`的，大多比较简单，有些其实没必要做成组件，使用class即可。有些可以交给AI快速写一个布局view组合，也没有必要封装为组件。

在hello uni-app x示例中，全局css里有一些class，

- uni-row组件，推荐改用使用全局class `uni-row`
- uni-title组件，可以使用全局class `uni-h1`、`uni-h2`、`uni-h3`、`uni-h4`
```css
.uni-row {
  flex-direction: row;
}
.uni-h1 {
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin: 8px 0;
}
.uni-h2 {
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin: 8px 0;
}
.uni-h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
}
.uni-h4 {
  font-weight: bold;
  margin: 8px 0;
}
```

# 交流群

有关 uni-ui-x 组件的任何意见或建议，欢迎通过 [uni-ui-x im 交流群](https://ext.dcloud.net.cn/publisher/start-session?pluginId=27852) 沟通交流。

