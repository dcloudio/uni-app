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

3. 改造vue2或vue3的选项式为vue3组合式

	uni-app x 不支持vue2，uni-app x的蒸汽模式不支持vue3的选项式（这是vue官方的限制）

	所以推荐开发者都在uni-agent的帮助下统一迁移到vue3组合式。

	注意：
	* vue2的状态管理vuex，在vue3下已经改成了pinia
	* vue蒸汽模式，不再支持mixin
	* 组合式里没有this了，需要改成 [`getCurrentInstance()!.proxy!`](./vue/composition-api.md#getcurrentinstance)

	做完后先在uni-app下检查是否正常。

4. 构造uni-app x项目，先运行到web、微信小程序

	新建uni-app x项目，把老项目复制过来，所有vue或nvue页面组件文件，批量重命名为uvue。可以保留之前的appid和包名。

	如果你之前有web版和微信小程序，那么改造后首先运行到 uni-app x 的web和微信小程序上，看看是否正常。

	同时注意uni-app x的 [web开发注意](./web/README.md) 和 [小程序开发注意](./mp/README.md)

如果要改造为app，继续往下。

5. 改造plus
	uni-app x不支持plus。
	* 如果在代码中使用了plus，参考这个指南迁移：[plus替代](./api/ext.md#plus)；
	* 如果在pages.json里使用了plus，推荐改用 uni-ui x 的 [uni-nav-bar 自定义导航栏组件](./component/uni-ui-x/uni-nav-bar.md) 和 [uni-tab-bar自定义tabbar组件](./component/uni-ui-x/uni-tab.md) 来替代。

6. 改造组件库
	* 如果使用了uni ui，那么迁移指南在这篇文档的底部：[uni-ui x](./component/uni-ui-x/README.md)
	* 如果使用其他组件库，需要咨询组件作者是否有 uni-app x 版本。如果没有的话，推荐用[uni-ui x](./component/uni-ui-x/README.md)重构。

	uni-app x 相比 uni-app 多了不少内置组件，比如list-view、waterflow、page-container、sticky、match-media、loading、native-view。对于内置组件已经满足需求的情况就没必要使用三方组件了。

7. 清理不支持的css

	uni-app x在app平台支持的css没有浏览器那么多。[详见](./css/README.md)

	uni-app x在编译时，会在控制台提示不支持的css，可以让uni-agent读取控制台的css告警，改成更简单的css来实现相关的布局功能。

	如涉及暗黑模式适配，需参考uni-app x的[暗黑适配文档](./api/theme-change.md)，有些部分与uni-app相同，但也有一些改动。

8. 改造wxs和renderjs为Element API

	uni-app x的app平台不再支持wxs和renderjs。

	uni-app x 提供了全端统一的UNIElement API，它在编译到微信小程序时会自动编译成wxs。跨端且高性能。[详见](./api/dom/README.md)

	包括moveable组件的使用，也推荐改成UNIElement的操作。

9. mock掉App原生插件的输入输出，在iOS和鸿蒙上验证

	如果你使用了App原生插件，先让uni-agent把App原生插件的输入输出mock掉，后续步骤再处理原生插件，先对前几步的工作进行验证。

	iOS和鸿蒙，使用的是js驱动，arkts是js的强化版，可以运行标准的js。

	这一步要再处理一件事，检查组件库是否适配了[样式隔离策略2.0](./css/common/style-isolation.md)。

	uni-app x 的蒸汽模式，仅支持[样式隔离策略2.0](./css/common/style-isolation.md)。

10. 替换app原生插件

	如果你之前使用了uts API插件，那么可以在uni-app x下直接复用。

	如果你使用了App原生插件，那么需要在插件市场寻找uts插件来替代。因为uni-app x不再支持app原生插件。

	uni-app x的内置API比uni-app更丰富，如果内置API能替代原本的插件，就可以使用内置API。比如uni-app x的内置扫码API，可以替代之前的很多扫码插件。

	需要注意原生组件，uts组件分兼容模式组件和标准模式组件。兼容模式组件虽然可以在uni-app的nvue上兼容运行，但无法运行在uni-app x的蒸汽模式下。uni-app x下还是推荐使用标准模式组件。

	如果没有合适的替代插件，使用uni-agent重写uts原生插件也没问题。

	uni-agent让普通前端开发者具备了写原生插件的能力，官方的很多内置原生API插件都是使用uni-agent完成的。[详见](https://doc.dcloud.net.cn/uni-app-x/ai/#%E6%A1%88%E4%BE%8B)

	可以把之前对App原生插件mock的输入输出，让uni-agent先转成interface.uts，然后让uni-agent编写实现。

	完成后继续在iOS和鸿蒙上验证。

11. 适配Android

	在2026年6月下旬，DCloud将推出uni-app x的Android版蒸汽模式并搭配js驱动。这套方案的性能比uni-app x Android版VDOM模式、比Android原生开发的性能都会好非常多。[详见](./app-vapor.md)

	js驱动将避免开发者改造uts代码，并且兼容js生态。

	官方推荐开发者先行适配非Android平台，走完上面的前7步。

	然后开发者可以根据情况选择搭配Android蒸汽模式+js驱动版本，免去uts改造，或者继续实施Android uts 适配。

	如果仍进行Android uts适配，那么：

	* 首先通过uni-agent的plan模式，梳理三方js库，进行替代方案规划

		大多数js库，在插件市场都有uts的对应版本，比如
		- [pinia](https://ext.dcloud.net.cn/search?q=pinia&uni-appx=1)、
		- [加密](https://ext.dcloud.net.cn/search?q=%E5%8A%A0%E5%AF%86&uni-appx=1)、
		- [dayjs](https://ext.dcloud.net.cn/search?q=dayjs&uni-appx=1)、
		- [图表](https://ext.dcloud.net.cn/search?q=%E5%9B%BE%E8%A1%A8&uni-appx=1)

	* 然后把业务中js或ts代码改成uts。

		uni-agent可以良好的编写符合条件的uts语法。并且可以自动识别编译错误、自动纠错，直到编译通过。

	在Android上，你也可以把uni-app js版老项目作为uni-app x新项目的一个小程序来使用。在uni-app x里内嵌uni小程序sdk，详见：[uni-unimp](https://ext.dcloud.net.cn/plugin?id=17638)。但这并不是优选。如果上面的路能走通，优选上面的路线。


整个升级过程，不可能在uni-agent的一个会话内完成，前文太长会超过上下文限制，并且让AI迷失重点。

这十几步的每一步都应该新起一个会话。有必要传给下一个会话的内容，让AI总结到md里，让下一个会话在有必要时读取这个md。
