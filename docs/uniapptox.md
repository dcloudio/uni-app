# uni-app升uni-app x指南

uni-app迁移到uni-app x，是一个大型工程。

首先需要利用优秀的AI工具，即[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，它是DCloud官方推出的最了解uni产品的AI工具。

同时整个改造工程，应该分步骤实施、分阶段验收。

1. 改造flex布局

	通过uni-agent，把uni-app项目全部改造成flex布局，不使用block布局和grid布局。如果你的页面已经全都是nvue，那么可以跳过这个步骤。

	做完后先在uni-app下检查是否正常。

2. 改造所有页面中的文字必须写在text组件中，样式不从父继承

	虽然uni-app也要求文字写在text组件中，但很多代码实际没做到，它利用了web的文字样式继承特性。这在uni-app x下会失效。
	需要严格把文字包裹在text组件中，并且样式不从父继承。

	做完后先在uni-app下检查是否正常。

3. 收敛css用法

	* 把复杂的选择器写法，都改成简单的class写法。[详见](./css/common/selector.md)
	* 单位只使用px、rpx、%，其他单位都改成这几种支持的单位。特别的是line-height可以使用em。[详见](./css/common/length.md)
	* 不使用不支持的@rule。[详见](./css/common/at-rules.md)
	* 不支持的css方法。[详见](./css/common/function.md)
	* 把不支持的css属性和属性值，改成uni-app x支持的。[详见](./css/README.md)
	
	暂不处理样式重置。

4. 将vue2或vue3的选项式，升级为vue3组合式
	
	uni-app x 不支持vue2，uni-app x的蒸汽模式不支持vue3的选项式（这是vue官方的限制）

	所以推荐开发者都在uni-agent的帮助下统一迁移到vue3组合式。

	注意：
	* vue2的状态管理vuex，在vue3下已经改成了pinia
	* vue蒸汽模式，不再支持mixin
	* 组合式里没有this了，需要改成 [`getCurrentInstance()!.proxy!`](./vue/composition-api.md#getcurrentinstance)

	做完后先在uni-app下检查是否正常。

5. 构造uni-app x项目

	新建uni-app x项目，勾选manifest中的蒸汽模式。把老项目的页面、组件、uni_modules、静态资源复制过来。所有vue或nvue页面组件文件，批量重命名为uvue。main.js改名为main.uts（蒸汽模式下，main.uts里也支持js/ts写法）。可以保留之前的appid和包名。
	
	之前如果有nativeplugins目录，就不用带来过了，uni-app x只支持uni_modules下的uts插件。原本的插件需要换新，或者临时mock掉。如果插件市场没有同款uts插件替代，可以让uni-agent重新封装一个uts原生插件，不懂原生也可以指挥ai完成（别选智商低的模型）。
	
	对于app.vue，不建议整体文件改名替换uni-app x的app.uvue。而是挑选部分代码复制过来。因为uni-app x 的app.uvue有2个变化：
	
	a. 应用退出方式
	
	老uni的应用退出是固化的，想改动需要劫持。uni-app x提供了[onLastPageBackPress](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onlastpagebackpress)生命周期，可以方便的控制如何退出应用，是连续back弹toast退出，还是弹确认框退出，都可以自己编程控制。
	
	b. 隐私协议
	
	老uni的隐私弹框是原生的，UI很难自定义。而uni-app x未提供原生的隐私弹框，需要开发者自己做一个uvue页面来显示隐私协议。\
	开发者需要在app.uvue的onLaunch里判断隐私接受状态，通过dialogPage的方式弹出自定义隐私协议页面。可以参考hello uni-app x的app.uvue里的onLaunch里的`uni.getPrivacySetting`部分。
	
	
	如果你之前有web版和微信小程序，那么改造后首先运行到 uni-app x 的web和微信小程序上，看看是否正常。

	同时注意uni-app x的 [web开发注意](./web/README.md) 和 [小程序开发注意](./mp/README.md)
	
	如果你的app之前有manifest原生配置的隐私框，

6. 再次适配css

	之前在uni-app中适配过一次css，但[css样式重置](./css/README.md#css-reset)、[样式隔离策略2.0](./css/common/style-isolation.md)，这2个在uni-app下没有，还得在uni-app x环境中再次适配。
	
	之前uni-app中的css改造难免有遗漏，也需要再次核对。
	
	uni-app x在编译时，会在控制台提示不支持的css，可以让uni-agent读取控制台的css告警，改成更简单的css来实现相关的布局功能。

	如涉及暗黑模式适配，需参考uni-app x的[暗黑适配文档](./api/theme-change.md)，有些部分与uni-app相同，但也有一些改动。

如果要改造为app，继续往下。

7. 改造plus
	uni-app x不支持plus。
	* 如果在代码中使用了plus，参考这个指南迁移：[plus替代](./api/ext.md#plus)；
	* 如果在pages.json里使用了plus，推荐改用 uni-ui x 的 [uni-nav-bar 自定义导航栏组件](./component/uni-ui-x/uni-nav-bar.md) 和 [uni-tab-bar自定义tabbar组件](./component/uni-ui-x/uni-tab.md) 来替代。

	另外如果项目使用了subNVue，需要改成[dialogPage](./api/dialog-page.md)

8. 改造组件库
	* 如果使用了uni ui，那么迁移指南在这篇文档的底部：[uni-ui x](./component/uni-ui-x/README.md)
	* 如果使用其他组件库，需要咨询组件作者是否有 uni-app x 版本。如果没有的话，推荐用[uni-ui x](./component/uni-ui-x/README.md)重构。

	uni-app x 相比 uni-app 多了不少内置组件，比如list-view复用长列表、waterflow瀑布流、page-container弹框、sticky吸顶、match-media宽屏适配、loading加载中、native-view对接原生view。对于内置组件已经满足需求的情况就没必要使用三方组件了。

9. 改造wxs和renderjs为Element API

	uni-app x的app平台不再支持wxs和renderjs。uni-app x的逻辑层和渲染层虽然还是2层，但并没有明显的通信成本。
	
	uni-app x 提供了全端统一的UNIElement API，它在编译到微信小程序时会自动编译成wxs。写法跨端且高性能。[详见](./api/dom/README.md)
	
	包括moveable组件的使用，也推荐改成UNIElement的操作。
	
10. mock掉App原生插件（非uts原生插件）的输入输出，在iOS和鸿蒙上验证

	如果你使用了老的App原生插件，先让uni-agent把App原生插件的输入输出mock掉，后续步骤再处理原生插件，先对前几步的工作进行验证。

	iOS和鸿蒙，使用的是js驱动，arkts是js的强化版，可以运行标准的js。
	Android的vdom模式是uts驱动，需要强类型。对于uni-app开发者而言，推荐改用没有强类型约束的蒸汽模式，并且性能比vdom更高。

	这一步要再处理一件事，检查组件库是否适配了[样式隔离策略2.0](./css/common/style-isolation.md)。

	uni-app x 的蒸汽模式，仅支持[样式隔离策略2.0](./css/common/style-isolation.md)。

11. 替换App原生插件和uts兼容模式组件
	
	如果你之前使用了uts API插件，那么可以在uni-app x下直接复用。

	如果你使用了App原生插件，那么需要在插件市场寻找uts插件来替代。因为uni-app x不再支持app原生插件。

	uni-app x的内置API比uni-app更丰富，如果内置API能替代原本的插件，就可以使用内置API。比如uni-app x的内置扫码API，可以替代之前的很多扫码插件。
	
	需要注意uts原生组件，uts组件分兼容模式组件和标准模式组件。兼容模式组件虽然可以在uni-app的nvue上兼容运行，但无法运行在uni-app x的蒸汽模式下。uni-app x下还是需要使用标准模式组件。
	
	如果没有合适的替代插件，使用uni-agent重写uts原生插件也没问题。

	uni-agent让普通前端开发者具备了写原生插件的能力，官方的很多内置原生API插件都是使用uni-agent完成的。[详见](https://doc.dcloud.net.cn/uni-app-x/ai/#%E6%A1%88%E4%BE%8B)

	可以把之前对App原生插件mock的输入输出，让uni-agent先转成interface.uts，然后让uni-agent编写实现。

	完成后继续在iOS和鸿蒙上验证。

12. 适配Android
	
	HBuilderX 5.21+，推出uni-app x的Android版蒸汽模式并兼容js/ts写法。这套方案的性能比uni-app x Android版VDOM模式、比Android原生开发的性能都会好非常多。[详见](./app-vapor.md)

	js驱动将避免开发者改造uts代码，并且兼容广泛的npm js生态。
	
	官方推荐开发者先行适配非Android平台，走完上面的前11步。因为Android平台较新，先把其他平台适配好，期间等HBuilderX 更新1、2个版本，就可以开始迁移Android了。


整个升级过程，不可能在uni-agent的一个会话内完成，前文太长会超过上下文限制，并且让AI迷失重点。

这十几步的每一步都应该新起一个会话。有必要传给下一个会话的内容，让AI总结到md里，让下一个会话在有必要时读取这个md。

一个AI使用经验：\
AI很擅长从0到60，这一步很快。但再往上，要不投入更多优秀人力review、要不投入更多和更高智商的AI算力做交叉验证和自动化测试。\
高智商的AI算力虽然贵，但在代码翻译这件事上，其实性价比是远超过投入优秀的人时的。
