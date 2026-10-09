# uni-app升uni-app x指南

uni-app迁移到uni-app x，是一个大型工程。

首先需要利用优秀的AI工具，即[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，它是DCloud官方推出的最了解uni产品的AI工具。

同时整个改造工程，应该分步骤实施、分阶段验收。

### 1. 改造flex布局

通过[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，把`uni-app`项目全部改造成`flex`布局，不使用`block`布局和`grid`布局。如果你的页面已经全都是`nvue`，那么可以跳过这个步骤。

做完后先在`uni-app`项目下检查是否正常。

### 2. 检查文字层级及样式

虽然`uni-app`也要求文字写在`text`组件中，但很多代码实际没做到，它利用了`web`的文字样式继承特性。这在`uni-app x`下会失效。需要严格把文字包裹在`text`组件中，并且样式不从父继承。

做完后先在`uni-app`下检查是否正常。

### 3. 收敛css用法

* 把复杂的选择器写法，都改成简单的class写法。[详见](./css/common/selector.md)
* 单位只使用px、rpx、%，其他单位都改成这几种支持的单位。特别的是line-height可以使用em。[详见](./css/common/length.md)
* 不使用不支持的@rule。[详见](./css/common/at-rules.md)
* app平台由于暂不支持伪元素，字体图标需使用unicode直显方式。[详见](./css/common/at-rules.md#iconfont)
* 不支持的css方法。[详见](./css/common/function.md)
* 把不支持的css属性和属性值，改成uni-app x支持的。[详见](./css/README.md)
	
	暂不处理样式重置。

### 4. 将vue2或vue3的选项式，升级为vue3组合式
	
`uni-app x `不支持`vue2`，`uni-app x`的蒸汽模式不支持`vue3`的选项式（这是vue官方的限制），所以推荐开发者都在`uni-agent`的帮助下统一迁移到`vue3`组合式。

注意：
* vue2的状态管理vuex，在vue3下已经改成了pinia
* vue蒸汽模式，不再支持mixin
* 组合式里没有this了，需要改成 [`getCurrentInstance()!.proxy!`](./vue/composition-api.md#getcurrentinstance)
* 检查通过`getCurrentPages()`获取`page.$vm`并访问其他页面数据或方法的代码。组合式页面默认不对外暴露内部成员，建议改用pinia、[事件通信](./api/event-bus.md)等方式重构，不要简单替换为`page.vm`。

做完后先在uni-app下检查是否正常。

### 5. 构造uni-app x项目

新建`uni-app x`项目，选择蒸汽模式。
可以保留之前的appid和包名，在manifest.json源码视图里改成之前的appid。

把老项目的页面、组件、uni_modules、静态资源复制到新项目中。
之前如果有`nativeplugins`目录，就不用带来过了，uni-app x只支持uni_modules下的uts插件。
原本的插件需要换新，或者临时mock掉。
如果插件市场没有同款uts插件替代，可以让uni-agent重新封装一个uts原生插件，不懂原生也可以指挥ai完成（别选智商低的模型）。

所有`vue`或`nvue`页面组件文件，批量重命名为`uvue`。

在HBuilder 5.31以前，推荐把独立的js/ts文件的后缀名改成uts（蒸汽模式页面引用的uts文件也是弱类型，可以写js/ts语法）。
5.31起不需要改文件后缀了。

老项目的`main.js`和`app.vue`，挑选内容复制到新项目中对应的新文件中。

uni-app x 的app.uvue对比老 uni-app 有2个变化：
	
#### 5.1 应用退出方式

老uni的应用退出是固化的，想改动需要劫持。uni-app x提供了[onLastPageBackPress](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onlastpagebackpress)生命周期，可以方便的控制如何退出应用，是连续back弹toast退出，还是弹确认框退出，都可以自己编程控制。
	
#### 5.2 隐私协议

老uni的隐私弹框是原生的，UI很难自定义。而uni-app x未提供原生的隐私弹框，需要开发者自己做一个uvue页面来显示隐私协议。

开发者需要在`App.uvue`的`onLaunch`里判断隐私接受状态，通过`dialogPage`的方式弹出自定义隐私协议页面。可以参考 `hello uni-app x` 的`App.uvue`里的`onLaunch`里的`uni.getPrivacySetting`部分。

如果你之前有web版和微信小程序，那么改造后首先运行到 `uni-app x` 的web和微信小程序上，看看是否正常。

同时注意uni-app x的 [web开发注意](./web/README.md) 和 [小程序开发注意](./mp/README.md)
	
### 6. 再次适配css

之前在uni-app中适配过一次css，但[css样式重置](./css/README.md#css-reset)、[样式隔离策略2.0](./css/common/style-isolation.md)，这2个在uni-app下没有，还得在uni-app x环境中再次适配。

之前uni-app中的css改造难免有遗漏，也需要再次核对。

uni-app x在编译时，会在控制台提示不支持的css，可以让uni-agent读取控制台的css告警，改成更简单的css来实现相关的布局功能。

如涉及暗黑模式适配，需参考uni-app x的[暗黑适配文档](./api/theme-change.md)，有些部分与uni-app相同，但也有一些改动。

### 7. 适配UniApp对象重构

HBuilderX 4.31+ 重构了应用对象，迁移时需要检查`getApp()`的相关代码：

* `getApp()`改为返回[UniApp对象](./api/get-app.md)，Vue实例通过`vm`属性提供。调用`App.uvue`中定义的全局方法时，需要把`getApp().methodName()`改为`getApp().vm?.methodName()`；`globalData`仍通过`getApp().globalData`访问。`UniApp`可在uts插件和uvue页面中使用，但`vm`和`globalData`仅支持在uvue页面中使用。

如果要改造为App，继续往下。

### 8. 改造plus

uni-app x不支持plus。

* 如果在代码中使用了plus，参考这个指南迁移：[plus替代](./api/ext.md#plus)；
* 如果在pages.json里使用了plus，推荐改用 uni-ui x 的 [uni-nav-bar 自定义导航栏组件](./component/uni-ui-x/uni-nav-bar.md) 和 [uni-tab-bar自定义tabbar组件](./component/uni-ui-x/uni-tab.md) 来替代。

另外如果项目使用了subNVue，需要改成[dialogPage](./api/dialog-page.md)
	
### 9. 升级或改造前端库

* 如果使用了uni ui，那么迁移指南在这篇文档的底部：[uni-ui x](./component/uni-ui-x/README.md#uniuiupgrade)
* 如果使用其他组件库，需要咨询组件作者是否有 uni-app x 版本。如果没有的话，推荐用[uni-ui x](./component/uni-ui-x/README.md)重构。

uni-app x 相比 uni-app 多了不少内置组件，比如`list-view`复用长列表、`waterflow`瀑布流、`page-container`弹框、`sticky`吸顶、`match-media`宽屏适配、loading加载、native-view对接原生view。对于内置组件已经满足需求的情况就没必要使用三方组件了。

* 升级uni_modules，比如官方的uni-id-pages、uni-starter、uni-pay、升级中心等库，需要升级到支持蒸汽模式的最新版本。

### 10. 改造wxs和renderjs为Element API

uni-app x的app平台不再支持wxs和renderjs。

uni-app x 提供了全端统一的UNIElement API，它在编译到微信/支付宝小程序时会自动编译成wxs/ajs。写法跨端且高性能。[详见](./api/dom/README.md)

包括moveable组件的使用，也推荐改成UNIElement的操作。
	
### 11. mock掉App原生插件（非uts原生插件）的输入输出

如果你使用了老的App原生插件，先让uni-agent把App原生插件的输入输出mock掉，后续步骤再处理原生插件，先对前几步的工作进行验证。

这一步要再处理一件事，检查组件库是否适配了[样式隔离策略2.0](./css/common/style-isolation.md)。uni-app x 的蒸汽模式，仅支持[样式隔离策略2.0](./css/common/style-isolation.md)。

### 12. 替换App原生插件和uts兼容模式组件
	
如果你之前使用了uts API插件，那么可以在uni-app x下直接复用。

如果你使用了App原生插件，那么需要在插件市场寻找uts插件来替代。因为uni-app x不再支持app原生插件。

uni-app x的内置API比uni-app更丰富，如果内置API能替代原本的插件，就可以使用内置API。比如uni-app x的内置扫码API，可以替代之前的很多扫码插件。

需要注意uts原生组件，uts组件分兼容模式组件和标准模式组件。兼容模式组件虽然可以在uni-app的nvue上兼容运行，但无法运行在uni-app x的蒸汽模式下。uni-app x下还是需要使用标准模式组件。

如果没有合适的替代插件，使用uni-agent重写uts原生插件也没问题。

uni-agent让普通前端开发者具备了写原生插件的能力，官方的很多内置原生API插件都是使用uni-agent完成的。[详见](https://doc.dcloud.net.cn/uni-app-x/ai/#%E6%A1%88%E4%BE%8B)

可以把之前对App原生插件mock的输入输出，让uni-agent先转成interface.uts，然后让uni-agent编写实现。

完成后继续在iOS和鸿蒙上验证。

注意部分uts插件使用了uni-app的特性，导致没有适配uni-app x，这种情况需要插件作者升级适配。

uni-app 的 Android平台整个应用只有一个activity，每个page是view。而uni-app x 的 Android 平台，每个页面都是一个activity。有的uts插件可能未区别这种差异。

### 13. 处理uts/js/ts的差异

在 HBuilder 5.31以前，蒸汽模式下uts/js/ts都是按uts2js编译。此时script中的lang不能设置，需要置空。同时外部文件后缀需要为uts。
但此时的uts，不编译为强类型的kt、swift，可以在里面写普通的js/ts代码。

从 5.31+ ，蒸汽模式下支持独立设置uts/js/ts。[详见](./vue/README.md#lang)。

推荐uni-app的老应用升级时选择5.31+。
	
### 小结

整个升级过程，不可能在`uni-agent`的一个会话内完成，前文太长会超过上下文限制，并且让AI迷失重点。

这十几步的每一步都应该新起一个会话。有必要传给下一个会话的内容，让AI总结到md里，让下一个会话在有必要时读取这个md。

**一个AI使用经验：**
AI很擅长从0到60，这一步很快。但再往上，要不投入更多优秀人力review、要不投入更多和更高智商的AI算力做交叉验证和自动化测试。

高智商的AI算力虽然贵，但在代码翻译这件事上，其实性价比是远超过投入优秀的人时的。

自动化测试，在AI时代这几乎是必备技能。[详见](https://doc.dcloud.net.cn/uni-app-x/worktile/auto/quick-start.html)

`uni-app` 和 `uni-app x`的自动化测试例是兼容的，建议先在 `uni-app` 下补齐自动化测试例，跑通。然后改造 `uni-app x` 时，继续自动跑这些自动化测试例，会极大提升效率。
