#### 运行原理

##### 逻辑层和视图层分离，且非H5端通信有折损

``uni-app`` 在非H5端运行时，从架构上分为逻辑层和视图层两个部分。逻辑层负责执行业务逻辑，也就是运行js代码，视图层负责页面渲染。

虽然开发者在一个vue页面里写js和css，但其实，编译时就已经将它们拆分了。

###### 逻辑层详解

逻辑层是运行在一个独立的jscore里的，它不依赖于本机的webview，所以一方面它没有浏览器兼容问题，可以在Android4.4上跑es6代码，另一方面，它无法运行window、document、navigator、localstorage等浏览器专用的js API。

`jscore`就是一个标准js引擎，标准js是可以正常运行的，比如if、for、各种字符串、日期处理等。js和浏览器的区别要注意区分开来。
- 所谓浏览器的js引擎，就是jscore或v8的基础上新增了一批浏览器专用API，比如dom；
- node.js引擎，则是v8基础上补充一些电脑专用API，比如本地io；
- 那么uni-app的App端和小程序端的js引擎，其实是在jscore上补充了一批手机端常用的JS API，比如扫码。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/jscore.jpg)

###### 视图层详解

h5和小程序平台，以及app-vue，视图层是webview。而app-nvue的视图层是基于weex改造的原生渲染视图。

关于webview，在iOS上，只能使用iOS提供的Webview（默认是WKWebview）。它有一定的浏览器兼容问题，iOS版本不同，它的表现有细微差异（一般可忽略）。

Android上小程序大多自带了一个几十M的chromium webview，而App端没办法带这么大体积的三方包，所以App端默认使用了Android system webview，这个系统webview跟随手机不同而有差异。当然App端也支持使用腾讯X5引擎，此时可以在Android端统一视图层。

所以uni-app的js基本没有不同手机的兼容问题（因为js引擎自带了），而视图层的css，在app-vue上使用系统webview时会有手机浏览器的css兼容问题。此时或者不要用太新的css语法，或者集成腾讯x5引擎。

###### 逻辑层和视图层分离的利与弊

逻辑层和视图层分离，好处是js运算不卡渲染，最简单直接的感受就是：窗体动画稳。

如果开发者使用过App，应该有概念，webview新窗体一边做进入动画，一边自身渲染，很容易卡动画。而uni-app则无需写预载代码，新窗体渲染快且动画稳定。

但是两层分离也带来一个坏处，这两层互相通信，其实是有损耗的。

iOS还好，但Android低端机上，每次通信都要耗时几十毫秒。平时看不出来影响，但有几个场景表现明显。

1. 连续高帧率绘制canvas动画，会发现还不如webview内部绘制流畅
2. 视图层滚动、跟手操作，不停反馈给逻辑层，js再处理逻辑并通知视图层做对应更新。此时会发现交互不跟手或卡

不管小程序还是app，不管app-vue还是app-nvue，都有这个两层通信损耗的问题。

解决这类问题，在webview渲染和原生渲染引用了不同的做法：

- webview渲染的视图层

在app-vue和微信小程序上，提供了一种运行于视图层的专属js，微信叫做[wxs](https://uniapp.dcloud.io/frame?id=wxs)。

wxs中可以监听手势，以uni ui的swiperAction组件为例，手指拖动，侧边的列表菜单项要跟手滑出，此时就需要使用wxs才能实现流畅效果。还有插件市场里一些自定义下拉刷新的插件，通过wxs实现了更高的性能体验。

uni-app支持把wxs编译到微信小程序、App和H5中。

微信里对wxs限制较多，只能实现有限的功能。app端提供了更强大的[renderjs](https://uniapp.dcloud.io/frame?id=renderjs)，并兼容到H5平台。

比如canvas动画，微信的canvas无法通过wxs操作，js不停绘制canvas动画因通信折损而无法流畅。uni-app的app-vue里的canvas对象设计在webview视图层的，通过renderjs可以在视图层直接操作canvas动画，将不再有通信折损，实现更流畅的效果，详见：[renderjs](https://uniapp.dcloud.io/frame?id=renderjs)

- 原生渲染的视图层

在app-nvue里，逻辑层和视图层的折损一样存在。包括react native也有这个问题。所以也千万别以为原生渲染就多么高级。

weex提供了一套[bindingx](https://uniapp.dcloud.io/nvue-api?id=nvue-%e9%87%8c%e4%bd%bf%e7%94%a8-bindingx)机制，可以在js里一次性传一个表达式给原生层，由原生层解析后根据指令操作原生的视图层，避免反复跨层通信。这个技术在uni-app里也可以使用。

bindingx作为一种表达式，它的功能不及js强大，但手势监听、动画还是可以实现的，比如uni ui的swiperAction组件在app-nvue下运行时会自动启用bindingx，以实现流畅跟手。

###### app-vue和小程序的数据更新，分页面级和组件级

对于复杂页面，更新某个区域的数据时，需要把这个区域做成组件，这样更新数据时就只更新这个组件，否则会整个页面的数据更新，造成点击延迟卡顿。

比如微博长列表页面，点击一个点赞图标，赞数要立即+1，此时这个点赞按钮一定要做成组件。否则这个+1会引发页面级所有数据的从js层向视图层的同步。

app-nvue和h5不存在此问题。造成差异的原因是小程序目前只提供了组件差量更新的机制，不能自动计算所有页面差量。

#### 优化建议

##### App如果不是v3模式，请改为v3编译模式

详见：[https://ask.dcloud.net.cn/article/36599](https://ask.dcloud.net.cn/article/36599)

##### 避免使用大图

页面中若大量使用大图资源，会造成页面切换的卡顿，导致系统内存升高，甚至白屏崩溃。

尤其是不要把多张大图缩小后显示在一个屏幕内，比如上传图片前选了数张几M体积的照片，然后缩小在一个屏幕中展示多张几M的大图，非常容易白屏崩溃。

对大体积的二进制文件进行base64，也非常耗费资源。

##### 优化数据更新

在 ``uni-app`` 中，定义在 data 里面的数据每次变化时都会通知视图层重新渲染页面。所以如果不是视图所需要的变量，可以不定义在 data 中，可在外部定义变量或直接挂载在vue实例上，以避免造成资源浪费。

##### 长列表
- 长列表中如果每个item有一个点赞按钮，点击后点赞数字+1，此时点赞组件必须是一个单独引用的组件，才能做到差量数据更新。否则会造成整个列表数据重载。
- 长列表中每个item并不一定需要做成组件，取决于你的业务中是否需要差量更新某一行item的数据，如没有此类需求则不应该引入大量组件。（点击item后背景变色，属于css调整，没有更新data数据和渲染，不涉及这个问题）
- 单个组件中存在大量数据时（比如长列表），在App和小程序端数据更新时会消耗较多时间，建议使用组件对数据进行分页，将变更限制更小范围。可以参考：[长列表优化示例](https://ext.dcloud.net.cn/plugin?id=2863#detail)
- app端nvue的长列表应该使用list组件，有自动的渲染资源回收机制。vue页面使用页面滚动的性能，好于使用scroll-view的区域滚动。uni ui封装了uList组件，在app-nvue下使用了list组件，在其他环境使用页面滚动，自动适配，强烈推荐开发者使用，避免自己写的不好产生性能问题。
- 如需要左右滑动的长列表，请在HBuilderX新建uni-app项目选新闻模板，那是一个标杆实现。自己用swiper和scroll-view做很容易引发性能问题。

##### 减少一次性渲染的节点数量

页面初始化时，逻辑层如果一次性向视图层传递很大的数据，使视图层一次性渲染大量节点，可能造成通讯变慢、页面切换卡顿，所以建议以局部更新页面的方式渲染页面。如：服务端返回100条数据，可进行分批加载，一次加载50条，500ms 后进行下一次加载。

##### **减少组件数量、减少节点嵌套层级**

深层嵌套的节点在页面初始化构建时往往需要更多的内存占用，并且在遍历节点时也会更慢些，所以建议减少深层的节点嵌套。

有些nvue页面在Android低端机上初次渲染时，会看到从上到下的渲染过程，这往往都是因为组件过多导致的。每个组件渲染时都会触发一次通信，太多组件就会阻塞通信。

##### 避免视图层和逻辑层频繁进行通讯

* 减少 scroll-view 组件的 scroll 事件监听，当监听 scroll-view 的滚动事件时，视图层会频繁的向逻辑层发送数据；
* 监听 scroll-view 组件的滚动事件时，不要实时的改变 scroll-top/scroll-left 属性，因为监听滚动时，视图层向逻辑层通讯，改变 scroll-top/scroll-left 时，逻辑层又向视图层通讯，这样就可能造成通讯卡顿。
* 注意 onPageScroll 的使用，onPageScroll 进行监听时，视图层会频繁的向逻辑层发送数据；
* 多使用css动画，而不是通过js的定时器操作界面做动画
* 如需在canvas里做跟手操作，app端建议使用renderjs，小程序端建议使用web-view组件。web-view里的页面没有逻辑层和视图层分离的概念，自然也不会有通信折损。

##### 优化页面切换动画

* 页面初始化时若存在大量图片或原生组件渲染和大量数据通讯，会发生新页面渲染和窗体进入动画抢资源，造成页面切换卡顿、掉帧。建议延时100ms~300ms渲染图片或复杂原生组件，分批进行数据通讯，以减少一次性渲染的节点数量。
* App端动画效果可以自定义。popin/popout的双窗体联动挤压动画效果对资源的消耗更大，如果动画期间页面里在执行耗时的js，可能会造成动画掉帧。此时可以使用消耗资源更小的动画效果，比如slide-in-right/slide-out-right。
* App-nvue和H5，还支持页面预载，[uni.preloadPage](https://uniapp.dcloud.io/api/preload-page)，可以提供更好的使用体验

##### 优化背景色闪白
1. 如果是新页面进入时背景闪白
  * 如果页面背景是深色，在vue页面中可能会发生新窗体刚开始动画时是灰白色背景，动画结束时才变为深色背景，造成闪屏。这是因为webview的背景生效太慢的问题。此时需将样式写在 ``App.vue`` 里，可以加速页面样式渲染速度。``App.vue`` 里面的样式是全局样式，每次新开页面会优先加载 ``App.vue`` 里面的样式，然后加载普通 vue 页面的样式。
  * app端还可以在pages.json的页面的style里单独配置页面原生背景色，比如在globalStyle->style->app-plus->background下配置全局背景色
```json
"style": {  
    "app-plus": {  
        "background":"#000000"
    }  
}
```
  * 另外nvue页面不存在此问题，也可以更改为nvue页面。
  * 注意：以上优化方案在 HBuilderX 2.7.7 以上版本时运行在 iOS12 以下系统效果较差，请等待优化。
2. 如果是老页面消失时背景闪白
Android上popin动画时，老窗体会有一个半透明消失的效果。这个半透明效果的背景色，可以根据需要调节为暗色系。
在pages.json里globalStyle下或指定页面下，配置app-plus专属节点，然后配置animationAlphaBGColor属性。

##### 使用nvue代替vue

在 App 端 ```uni-app``` 的 nvue 页面可是基于weex升级改造的原生渲染引擎，实现了页面原生渲染能力、提高了页面流畅性。若对页面性能要求较高可以使用此方式开发，详见：[nvue](/nvue-outline)。

##### 优化启动速度

* 工程代码越多，包括背景图和本地字体文件越大，对小程序启动速度有影响，应注意控制体积。<image>组件引用的前景图不影响性能。app端在v3以前也存在和小程序一样的问题，但v3起解决了这个问题。
* App端的 splash 关闭有白屏检测机制，如果首页一直白屏或首页本身就是一个空的中转页面，可能会造成 splash 10秒才关闭，可参考此文解决[https://ask.dcloud.net.cn/article/35565](https://ask.dcloud.net.cn/article/35565)
* App端使用v3编译器，首页为nvue页面时，并设置为[fast启动模式](https://ask.dcloud.net.cn/article/36749)，此时App启动速度最快。
* App设置为纯nvue项目（manifest里设置app-plus下的renderer:"native"），这种项目的启动速度更快，2秒即可完成启动。因为它整个应用都使用原生渲染，不加载基于webview的那套框架。

##### 优化包体积

* uni-app发行到小程序时，自带引擎只有几十K，主要是一个定制过的vue.js核心库。如果使用了es6转es5、css对齐的功能，可能会增大代码体积，可以配置这些编译功能是否开启。
* uni-app的H5端，自带了vue.js、vue-router及部分es6 polyfill库，这部分的体积gzip后只有92k，和web开发使用vue基本一致。而内置组件ui库（如picker、switch等）、小程序的对齐js api等，相当于一个完善的大型ui库。但大多数应用不会用到所有内置组件和API。由此uni-app提供了摇树优化机制，未摇树优化前的uni-app整体包体积约500k，服务器部署gzip后162k。开启摇树优化需在manifest配置，[详情](https://uniapp.dcloud.io/collocation/manifest?id=optimization)。
* uni-app的App端，因为自带了一个独立v8引擎和小程序框架，所以比HTML5Plus或mui等普通hybrid的App引擎体积要大。Android基础引擎约9M。App还提供了扩展模块，比如地图、蓝牙等，打包时如不需要这些模块，可以裁剪掉，以缩小发行包体积。在 manifest.json-App模块权限 里可以选择。
* App端支持如果选择纯nvue项目（manifest里设置app-plus下的renderer:"native"），包体积可以进一步减少2M左右。
* App端在HBuilderX 2.7后，App端下掉了非v3的编译模式，包体积下降了3M。
* uni-app的App-Android端有so库的概念，支持不同的cpu类型的so库越多，包越大。在HBuilderX 2.7以前，Android app默认包含arm32和x86两个cpu的支持so库。包体积比较大。如果你在意体积控制，可以在manifest里去掉x86 cpu的支持（manifest可视化界面-App其他设置里选择cpu），这可以减少包体积到9M。从HBuilderX 2.7起，默认不再包含x86，如有需求请自行在manifest里勾选后打包。一般手机都是arm的，涉及x86 cpu场景很少，包括：个别少见的Android pad、as的模拟器里选择x86类型。
