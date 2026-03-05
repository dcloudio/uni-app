# iOS开发注意

由于swift编译iOS应用必须依赖xcode，而DCloud的开发者中windows占比高于mac电脑。

我们不能抛弃Windows开发者，所以uni-app x在iOS上提供js和swift双选逻辑层。

|								|js逻辑层																								|swift逻辑层														|
|--							|--																											|--																			|
|主应用开发平台	|windows或mac																						|只能mac																|
|uvue页面代码		|可使用js但不能直接调用swift API。swift调用需封装在uts插件中|只能调用swift不能使用js								|
|uts原生插件开发|只能mac																								|只能mac																|
|uts原生插件使用|windows下打包后使用，mac下本地直接编译									|windows下打包后使用，mac下本地直接编译	|
|性能						|丝滑流畅																								|丝滑流畅															|

也就是uts原生插件作者必须得有mac电脑，普通的App开发者可以没有mac电脑，使用插件也不需要mac电脑，通过云打包即可。

虽然理论上swift逻辑层的性能要高于js逻辑层，但开发者可以放心使用js逻辑层。

uni-app x在iphone上的js逻辑层和原生渲染层的通信经过特殊处理，大幅提升通信效率问题，不再需要bindingX这类技术。

uni-app x的js逻辑层，不是使用webview，而是iOS内置的jscore，渲染层更不是webview，而是纯原生渲染。

uni-app x专门对iOS上jscore和原生视图层的通信做了优化，可以达到良好的效果。\
可以体验hello uni-app x的iOS版本，如下2个场景均使用js逻辑层，但都没有通信损耗带来的体验问题
- 在模板slider-100示例中，拖动一个slider，剩下99个同步移动，不掉帧、始终跟手。
- 在模板scroll-view自定义滚动吸顶示例中，滚动时动态调整view的top值以维持吸顶，这种极端场景，均如原生一样的丝滑流畅。

使用js逻辑层有若干好处：
- 可以在windows下开发（纯Swift只能在mac下开发）
- 支持开发期间热刷新（纯Swift修改代码只能重新编译打包安装）
- 大幅降低插件生态的建设难度
插件作者只需要特殊适配Android版本，在iOS和Web端仍使用ts/js库，即可快速把uni-app/web的生态迁移到uni-app x中。
例如这个[request拦截库](https://ext.dcloud.net.cn/plugin?id=16177)

如果开发者不想使用js驱动，或者弱化js在应用中的占比，方案就是跳开vue、在uts插件中直接操作原生DOM。

uni-app x的所有原生UI，除了使用vue框架构建，还可以使用DOM API构建。参考[UniELement文档](../dom/README.md)

在uts插件中也可以使用DOM API，因为uts插件是编译为swift的，所以这样实现了纯原生的驱动。

- 在uvue中写常规代码，在想要更高性能时，改用uts插件，在其中通过DOM API来操作界面。这是一种混合方案。兼具开发便利性和性能。类似于uni-app的renderjs，部分代码运行在另一个环境中。
- 如果基本不想用js，可以在uvue的template中，只放入一个uts组件插件，在该插件中使用uts来操作dom。

使用uts插件，虽然编译为了swift，但要注意就只能在mac电脑下开发，且不能有开发热刷新体验。

目前vue框架还没有swift版本，所以如果使用vue组件，仍然会编译为js。

vue很快会正式推出蒸气模式，这个版本发布后，官方会将这个版本的vue迁移到swift中。这个迁移完成后，开发者使用vue也可以在iOS上编译为纯Swift。
目前想用纯Swift，就不能用vue，而是需要用DOM API在uts插件中操作。