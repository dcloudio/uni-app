# uni-app x 比 uni-app 优势汇总

众所周知，uni-app x 的蒸汽模式在渲染性能上表现极其优异，甚至[超越了传统原生开发](./app-vapor.md#4050)，相比 uni-app 自然有着更大的优势。

但除了极致的性能之外，uni-app x 还有哪些长处？本文特对两者的差异进行全面汇总。

在语法层面，uni-app x 蒸汽模式与 uni-app 高度相似：支持相同的 Vue 语法、相同的 JS/TS、相同的组件和 API 命名，仅 CSS 为 Web 的子集。

uni-app 毕竟是2018年设计的系统，而 uni-app x 吸取了前者的很多经验教训，拥有更优秀、很现代的设计。

优秀的架构不像显性功能那样容易被直观感知，但当你遇到各种复杂问题时，它会展现出更优雅解决方案、合理的解耦、更小的副作用。

## UI系统
### UI的全自定义能力

uni-app 的 UI 不具备全面定制能力，许多UI定制需求开发者难以实现。

1. 小程序的组件规范缺少足够的自定义性

例如swiper的指示器，小程序的规范中仅能通过3个属性来定义：是否显示、指示点的颜色、以及高亮指示点的颜色。
但在实际业务中，指示器的形态丰富多样，有时需要横线，有时需要显示数字。

uni-app 中，开发者只能隐藏默认指示器并自行绘制（即 uni ui 中的 uni-swiper-dot 组件）。

uni-app x 中，swiper组件提供了`indicator-class`、`indicator-active-class`和指示器插槽，可以完全自定义所有指示器ui。

类似的情况还有很多，slider、switch等很多组件，小程序规范只能提供有限属性定义样式，但 uni-app x 中提供了各种externalClass，支持所有样式的自定义。

此外，小程序规范中，暗黑时很多组件样式是写死的。但在uni-app x下，都可以完全自定义。

2. 原生UI无法自定义

uni-app中，出于性能考虑，很多UI界面是各平台原生语言实现的，比如showModal、showActionSheet、showLoading、扫码、一键登录、previewImage、chooseLocation、openLocation、video组件的操作视图...

这些原生UI无法方便的自定义，只能提供有限的属性，例如一键登陆提供了一批json定义方式。
这些UI界面的国际化、暗黑适配也不统一。
由于不同平台代码不同，这些UI的细节也不同。

在uni-app x中，没有一个界面是原生编程语言实现的，所有UI界面都是uvue。
（除了已经不推荐使用的chooseImage的内置相册选择界面。不推荐是因为系统权限收紧，推荐改用OS提供的相册选择以实现免权限）

统一的uvue界面实现带来很多优势：
- 渲染的比原生还快
- 支持传入Class或自行修改开源代码来完全的自定义样式
- 统一适配国际化和暗黑模式
- 保持各平台UI一致性、减少了质量和兼容性问题

### 样式隔离系统

uni-app并没有统一的样式隔离系统。

全局样式、页面样式、组件样式，这3者如何管理复用和隔离，是没有统一方案的。uni-app的web版使用v-deep，app和小程序则依赖权重选择器。

由于缺乏统一规范，组件的样式自定义往往是依靠组件作者封装属性，但又无法完全覆盖所有样式的自定义需求。于是大多数组件使用者的做法是直接修改组件源码。

同时全局和页面的样式，以前也经常误影响组件内表现，导致组件作者在收到组件使用者的Bug反馈时常常莫名其妙。

uni-app x 蒸汽模式支持的"样式隔离系统2.0"，从根本上彻底的解决了样式管理问题。[详见](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html)

基于"样式隔离系统2.0"的组件，包括扩展的uni-ui x，从此都干净清爽，所有组件样式都可以自定义、任何自定义样式都不需要改组件源码。
并且组件是否允许被外部影响也提供了明确的配置项。

"样式隔离系统2.0"，是跨端生态里非常重要的基建，它深刻影响整个组件生态，是孕育优秀组件库的坚实地基。

### 内置更多UI组件

针对那些常用且对性能要求极高（或如液态玻璃般必须原生实现）的场景，uni-app x 蒸汽模式提供了业内顶级性能的组件实现：

uni-app x 蒸汽模式提供了业内顶级性能的组件实现。

- 液态玻璃组件 [glass-effect-view](./component/glass-effect-view.md)
- [list-view](./component/list-view.md)：比原生recyclerView性能更高的长列表组件。[benchmark](./app-vapor.md#list)
- [waterflow](./component/waterflow.md)
- 嵌套滚动组件 [nested-scroll-header](./component/nested-scroll-header.md)、[nested-scroll-body](./component/nested-scroll-body.md)
- 吸顶组件 [sticky-header](./component/sticky-header.md)、[sticky-section](./component/sticky-section.md)
- [page-container](https://doc.dcloud.net.cn/uni-app-x/component/page-container.html)
- [rich-text](./component/rich-text.md)：原生模式的rich-text，提供了业内顶尖的富文本渲染性能。[benchmark](./app-vapor.md#rich-text)
- [camera](./component/camera.md)
- [animation-view](./component/animation-view.md) : uni-app的lottie组件仅支持nvue的Android和iOS。uni-app x全平台都支持。
- [native-view](./component/native-view.md)：集成原生视图到uvue界面的重要纽带

### uni-ui x的高性能和完全自定义

uni-app对应的uni ui，存在封装和抽象不合理的问题，组件属性封了太多，影响了性能、拉长了文档，也仍然无法满足开发者的所有自定义需求。

uni-ui x 的逻辑抽象和设计代表了业内最先进的水平。它借鉴了Headless UI的充分自定义性，同时兼顾了易用性与高性能。

这种高性能不仅源于 uni-app x 蒸汽模式的底层支持，也得益于组件自身的代码优化，多重因素共同打造了一流的高性能组件库。[详见](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/)

## App权限和隐私管理

uni-app 诞生于隐私和权限管控并不严格的时代。很多相关功能没有内置，需要依赖插件实现。

uni-app x 内置了众多权限相关的API：[uni.getAppAuthorizeSetting](./api/get-app-authorize-setting.md)、[uni.openAppAuthorizeSetting](./api/open-app-authorize-setting.md)、[uni.getSystemSetting](./api/get-system-setting.md)、[uni.createRequestPermissionListener](./api/create-request-permission-listener.md)、[uni.requestSystemPermission](./api/request-system-permission.md) 

uni-app的隐私政策弹窗，是原生提供的一个无法完全自定义的弹窗。\
而在 uni-app x 中，不再依赖这种受限的原生弹框，开发者完全可以在前端使用 uvue 自主绘制任意隐私政策弹窗界面。

同时uni-app x新增了多项隐私政策的相关API、组件和配置：uni.getPrivacySetting、uni.resetPrivacyAuthorization、uni.onPrivacyAuthorizationChange、uni.offPrivacyAuthorizationChange，同时button组件中提供了属性open-type="agreePrivacyAuthorization"，manifest.json中app节点下提供了initPrivacyAuthorization。[详见](./api/privacy.md)

uni-app x 的内置组件和API，都遵循统一的隐私管理规范，避免隐私政策同意前发生违规的数据访问。

uni-app中集成的一些三方SDK版本较老，这些SDK的新版已符合监管规范。仅在uni-app x中使用的是新版SDK。

应用商店的隐私管理经常升级，uni-app的做法是发现开发者报哪个SDK有问题，才升级哪个。而uni-app x从源头就没有这类问题。

uni-app 中还留有 plus.device.imei 等新版Android无法再使用的API，呼叫电话、读写通讯录等API使用的也是现在已经难以获得权限的老方式。在uni-app x 中，读写联系人、呼叫电话、选择相册，这些API的实现内部都使用了新的权限管理策略，不再要求高敏感权限。

## 内置API的新增和优化

uni-app x 内置很多新API，例如[worker](./api/create-worker.md)、[getFileSystemManager](./api/get-file-system-manager.md)、[日历](./api/calendar.md)、[陀螺仪](./api/gyroscope.md)。

尤其是worker多线程，是提高性能的利器。

uni-app 中使用AI流式返回，需要通过renderjs，在webview操作。
uni-app x 的request API内置支持AI流式返回。

## 错误码规范

uni-app 的API实现较早，当时还没有uniError规范。导致不同平台错误码可能不同或错误码过于笼统不利于排错。

uni-app x 的API错误码，严格遵循[uni error规范](https://doc.dcloud.net.cn/uni-app-x/err-spec.html)

每个API都有统一的interface和errCode的类型定义，让错误排查更清晰、可追踪。也更方便开发者自行拦截错误并向用户展示定制化的错误提示。

## 路由系统

uni-app x 的每个页面都提供了 [UniPage对象](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html)，可以通过编程的方式来操作页面样式，而不是只能使用固化在 pages.json 里的静态属性。

uni-app x 的路由系统，新增了跨端统一的 [路由事件](https://doc.dcloud.net.cn/uni-app-x/api/app-route.html)

在弹窗实现方面，uni-app 时代方案杂乱：有人用uni-popup等z-index方案、有人用subnvue、有人利用了webview页面背景可透明的特性。

uni-app x 提供了[page-container](https://doc.dcloud.net.cn/uni-app-x/component/page-container.html)和[dialogPage](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html)，分别用于处理页内弹层和独立页弹框。

page-container是小程序中唯一可以监听back后关闭弹窗的组件，但uni-app的app平台并未提供，且uni-popup组件也无法在小程序上通过back关闭。
uni-app x 中全端补齐 page-container组件，成为全端通用的页内弹层方案。

dialogPage是设计更完善的独立页弹窗。事实上 uni-app x 很多内置API，如showModal、showActionSheet、showLoading 都是基于 dialogPage 实现的。

## 文件系统

uni-app 的沙盒文件管理缺乏统一规范，很多内置组件、API、三方SDK在使用沙盒文件，用户代码也在使用沙盒文件，容易冲突。

uni-app x 提供了完善的[沙盒文件管理规范](./api/file-system-spec.md)。

uni-app x 也提供了完善的文件管理API，[uni.getFileSystemManager](./api/get-file-system-manager.md)，开发者可以完全的控制沙盒文件、控制缓存管理。

## 屏幕适配

uni-app的预置css变量实现数量少，且无法参与calc运算。

uni-app x 的预置css变量，比uni-app多了安全区相关的css变量，[详见](./css/common/function.md#preset-var)。且所有预置css变量均可参与calc方法的运算。

针对摄像头挖空区、Android底部的全面屏手势、三键导航，uni-app x都新增了获取状态和设置参数的能力。
包括：
- [uni.getWindowInfo](./api/get-window-info.md)、
- [pages.json](./collocation/pagesjson.md#pagesoptionspage-style)中配置hideBottomNavigationIndicator、androidThreeButtonNavigationTranslucent、androidThreeButtonNavigationBackgroundColor、androidThreeButtonNavigationStyle，
- UniPage对象上的[getPageStyle/setPageStyle方法](./api/unipage.md#unipage-methods)。

uni-app x 的内置UI，包括导航栏、tabbar、video全屏、各种弹窗，均适配了各种屏幕，包括正常屏、折叠屏、小窗模式。
而 uni-app 未进行更多屏幕的适配和测试。

## 原生插件系统

uni-app 和 uni-app x 都支持uts插件。尤其是API插件，可以同时在 uni-app 和 uni-app x 中使用。

不过uni-app的uts插件，在js和原生通信时采用的是序列化方案，跨语言通信性能欠佳。

uni-app x 基于codegen技术，免除序列化，通信性能更优秀。

在原生组件集成方面，uni-app 和 uni-app x 差异很大。

uni-app 只能在nvue页面里显示原生视图。\
uni-app x 的界面本就是原生渲染，可以在任意位置显示原生视图。

uni-app 的原生视图插件集成概念不够直观，封装概念较多。\
uni-app x 内置native-view组件，可以绑定任意原生view，理解和使用更方便。

uni-app x 不支持已经被淘汰数年的App原生插件机制。插件市场在2024年已经不再受理新增的App原生插件了。

uts插件本身的interface.uts和errcode.uts机制，让不同平台原生能力封装为统一的前端API，变的更加规范和便捷。\
uni-app x 数百个内置组件和API都是基于uts插件实现的，这套原生扩展机制成熟、高效且高性能。

uni-app x 新增了uasm插件（uni assembly），可以把高性能二进制库方便引入到前端开发中。

## 离线SDK

uni-app 的离线sdk，仅限于离线打包。对于一个已经存在的原生应用，无法方便嵌入，需改用uni小程序SDK。

uni-app x 的离线sdk，支持离线打包，也支持一个已经存在的原生应用方便的嵌入，实现渐进式使用 uni-app x。[详情](./native/README.md)

## 质量

uni-app 没有自动化测试系统。对于组件和API的质量监控不足。

但 uni-app 无需关心底层渲染引擎的质量，这部分由webview来保障。uni-app x 需要额外关注渲染引擎质量。

uni-app x 有数万个自动化测试例。涉及断言、截图、崩溃、性能、Error各种场景，在Android、iOS、鸿蒙、浏览器、小程序的不同版本全部过测才能发版。

除了内部测试例，开发者报的每个bug，uni-app x 内部在修复时都要补测试例，否则无法发版。数年来积累了大量测试例。

# uni-app x相比uni-app的不足

虽然 uni-app x 比 uni-app 多了很多能力和规范。但当前的状态，也并非拉齐了 uni-app 的所有功能。

1. uni-app x 的css是web的子集。

这个子集足以绘制出任何界面。

对于古法编程的人来说，这个子集限制了写法的灵活性。
对于AI来说，这个子集其实是优势。AI更适合约束。如果提供太多选择器写法，复杂的权重计算会把AI搞晕，很容易犯错。

2. 小程序支持不全

uni-app 支持所有小程序。

uni-app x 目前仅支持微信小程序和支付宝小程序。接下来会适配抖音小程序。很多小程序平台自身已经停更，uni-app x会根据小程序发展情况决定是否放弃某些小程序的适配。

3. 云打包方面

uni-app x 还不支持安心打包和js加密。js加密，开发者也可以使用[uni加固](https://doc.dcloud.net.cn/uni-app-x/tutorial/app-security.html)或其他加固方案解决。

4. API方面

- 暂未内置蓝牙（已在开发中）。目前需要在插件市场寻找蓝牙相关插件。
- 登录支付海外sdk未集成。目前需要在插件市场寻找相关插件。
- canvas的API，没有web的丰富。不影响图表等常见功能。[详见](./api/canvasrenderingcontext2d.md)
- webview的内置API，没有uni-app的plus.webview丰富。[详见](./api/create-webview-context.md)

5. uniCloud schema2code

由于一些datacom组件还未适配，schema2code及相关周边还不能在 uni-app x 下运行。

开发者可以在需求墙投票，影响这些TODO的优先级。[需求墙](https://vote.dcloud.net.cn/#/?name=uni-app%20x)

# 结语

综合优势和不足，可以看出，uni-app x 虽然比 uni-app 少了一些能力，但多了更多能力。所以并非 uni-app x 不如 uni-app 完善，而是相反，uni-app x 更完善、更现代。

随着时间的推移，uni-app x会更加完善。从2027年起，uni-app的app平台将不再升级。