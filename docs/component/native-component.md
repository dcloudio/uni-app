#### 原生组件说明

小程序和App的vue页面，主体是webview渲染的。为了提升性能，小程序和App的vue页面下部分ui元素，比如导航栏、tabbar、video、map使用了原生控件。这种方式被称为混合渲染。

虽然提升了性能，但原生组件带来了其他问题：1) 前端组件无法覆盖原生控件的层级问题、2) 原生组件不能嵌入特殊前端组件(如scroll-view)、3) 原生控件无法灵活自定义。

H5、App的nvue页面，不存在混合渲染的情况，它们或者全部是前端渲染、或者全部是原生渲染，不涉及层级问题。

``uni-app`` 中原生组件清单如下：
* [map](/component/map)
* [video](/component/video)
* [camera](/component/camera)（仅微信小程序、百度小程序支持）
* [canvas](/component/canvas)（仅在微信小程序、百度小程序表现为原生组件）
* [input](/component/input)（仅在微信小程序、百度小程序、支付宝小程序、头条小程序中且input置焦时表现为原生组件）
* [textarea](/component/textarea)（仅在微信小程序、百度小程序、头条小程序表现为原生组件）
* [live-player](/component/live-player)（仅微信小程序、百度小程序支持，App端直接使用video组件可同时实现拉流）
* [live-pusher](/component/live-pusher)（仅微信小程序、百度小程序、app-nvue支持，app-vue使用plus.video.LivePusher可实现推流）
* [cover-view](/component/cover-view)
* [cover-image](/component/cover-view?id=cover-image)


#### 混合渲染模式下原生组件的使用限制

由于原生组件脱离在 WebView 渲染流程外，因此在使用时有以下限制：

* 原生组件的层级是**最高**的，所以页面中的其他组件无论设置 z-index 为多少，都无法盖在原生组件上。后插入的原生组件可以覆盖之前的原生组件。
* 原生组件无法在 scroll-view、swiper、picker-view、movable-view 中使用。
* 同层渲染支持：微信基础库2.4.4起支持了video的同层渲染、微信基础库2.8.3支持map的同层渲染。支持同层渲染后，相关组件的时候不再有层级问题，无需再使用cover-view覆盖，也可以内嵌入swiper等组件。app-nvue 不涉及层级问题，天然所有组件都是同层渲染。
* 部分CSS样式无法应用于原生组件，例如：
    * 无法对原生组件设置 CSS 动画；
    * 无法定义原生组件为 position: fixed；
    * 不能在父级节点使用 overflow: hidden 来裁剪原生组件的显示区域。
* 在小程序端真机上，原生组件会遮挡 vConsole 弹出的调试面板。

#### 其他原生界面元素
除了原生组件外，uni-app在非H5端还有其他原生界面元素，清单如下：
* 原生导航栏和tabbar（pages.json里配置的）。
* web-view组件虽然不是原生的，但这个组件相当于一个原生webview覆盖在页面上，并且小程序上web-view组件是强制全屏的，无法在上面覆盖前端元素
* 弹出框：picker、showModal、showToast、showLoading、showActionSheet、previewImage、chooseImage、chooseVideo等弹出元素也无法被前端组件覆盖
* plus下的plus.nativeObj.view、plus.video.LivePusher、plus.nativeUI、plus.webview，层级均高于前端元素

注意：app的nvue页面里的组件虽然不涉及map、video等原生组件的层级遮挡问题，但上述“其他原生界面元素”，一样是nvue里的组件也无法遮挡的。

#### vue页面层级覆盖解决方案

为了解决webview渲染中原生组件层级最高的限制，uni-app提供了 [cover-view](/component/cover-view) 和 [cover-image](/component/cover-view?id=cover-image) 组件，让其覆盖在原生组件上。

除了跨端的cover-view，App端还提供了2种方案：plus.nativeObj.view、subNVue。详述如下

- [cover-view](https://uniapp.dcloud.io/component/cover-view?id=cover-view)

`cover-view`只能覆盖原生组件，不能覆盖其他原生界面元素。比如cover-view可以覆盖video、map，但无法覆盖原生导航栏、tabbar、web-view。

微信小程序在基础库 2.4.0 起已支持 video 组件的同层渲染。也就是video在非全屏时，可以被前端元素通过调节zindex来遮挡。但video全屏时，仍需要cover-view覆盖。

vue页面的`cover-view`在App端相比小程序端还有一些限制，1) 无法嵌套、 2) 无法内部滚动，即cover-view无法内部出现滚动条、 3) 无法覆盖到视频的全屏界面。nvue页面的`cover-view`无这些限制。

另外cover-view无论如何都无法解决原生导航栏、tabbar、web-view组件的覆盖，为此App端补充了2个层级覆盖方案plus.nativeObj.view和subNVue

- [plus.nativeObj.view](https://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.View)

简称nview，它是一个原生的类画布的控件，其实cover-view也是用plus.nativeObj.view封装的。API文档详见：[https://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.View](https://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.View)

plus.nativeObj.view的API比较原生，可以画出任何界面，但plus.nativeObj.view有3个问题：1. api很底层，开发比较复杂；2. 不支持动画；3. 不支持内部滚动。

- [subNVue](https://ask.dcloud.net.cn/article/35948)

subNVue是把weex渲染的原生子窗体，覆盖在vue页面上，它解决了plus.nativeObj.view的不足，提供了强大的层级问题解决方案。subNVue的详细介绍见：[https://ask.dcloud.net.cn/article/35948](https://ask.dcloud.net.cn/article/35948)

注意App的非自定义组件编译模式不支持subNVue。

- [弹出部分区域透明的nvue页面](https://ext.dcloud.net.cn/plugin?id=953)

uni-app支持在App端弹出半透明的nvue窗体。即看起来是在本窗体弹出一个元素，但实际上是弹出了一个部分区域蒙灰透明的新窗体。这样的窗体比subnvue有个优势就是可以全局复用。具体参考这个[插件](https://ext.dcloud.net.cn/plugin?id=953)

subNVue或弹出部分区域透明的nvue页面，会比plus.nativeObj.view多占用一些内存。所以如果你要覆盖的内容很简单，cover-view或plus.nativeObj.view可以简单实现，也没必要用subNVue或nvue。



**关于subNVue和Webview的层级问题**
subNVue的层级高于前端元素，但多个subNVue以及Webview，它们之间的也存在层级关系。

默认规则是，先创建的subNVue或webview在底部，后创建的会盖住之前的。

当然每个subNVue和webview，都支持Style参数配置，其中有一个zindex属性，可以调节它们的层级。


#### App的nvue页面层级问题
nvue页面全部都是原生组件，互相之间没有层级问题。

但如果在pages.json里注册了原生导航栏和tabbar，nvue里的界面元素默认也无法覆盖这些，也需要plus.nativeObj.view或subNVue。

如果仅开发App，不跨端，不愿涉及层级问题，也可以不使用pages.json里的原生导航栏和tabbar，nvue页面不需要这些来强化性能。

#### 总结
所以如果你的层级覆盖问题比较简单，不用嵌套，且有跨端需求，就使用cover-view。

如果App端cover-view无法满足需求，且需要覆盖的原生界面比较简单，可以用plus.nativeObj.view。否则，就使用subnvue或部分区域透明的nvue吧。
