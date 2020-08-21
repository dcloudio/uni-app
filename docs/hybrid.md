**uni-app和原生App混合开发问题：** 

首先务必确认uni-app和原生代码，谁是主谁是从的问题。

- 如果你的应用是uni-app开发的，需要扩展一些原生能力，那么首先去[插件市场](https://ext.dcloud.net.cn/)看看有没有现成的插件，如果没有，就自己开发，开发文档请参考[原生插件开发教程](https://nativesupport.dcloud.net.cn/NativePlugin/README)。
- 如果你的App是原生开发的，部分功能栏目想通过uni-app实现，有2种方式
  * 在原生App里集成uni小程序sdk，[参考](https://nativesupport.dcloud.net.cn/README)
  * 如果不想集成原生sdk，那就把uni-app代码发布成H5方式，在原生App里通过webview打开。

如果应用是uni-app开发为主，只是想离线打包，那么不应该使用uni小程序sdk，而是使用App离线打包SDK，[参考](https://nativesupport.dcloud.net.cn/AppDocs/README)。
另注意离线打包无法享受插件市场的付费原生插件，如有相关需求需自己进行原生插件开发。

**uni-app和原生小程序混合开发问题：** 

- 方式1：把原生小程序转换为uni-app源码。有各种转换工具，[详见](translate.md)
- 方式2：新建一个uni-app项目，把原生小程序的代码变成小程序组件，进而整合到uni-app项目下。uni-app支持使用小程序wxml组件，[参考](frame.md?id=小程序组件支持)
- 方式3：原生开发的小程序仍保留，部分新功能使用uni-app开发。这个场景有三方开发者提供了插件，[参考](https://ext.dcloud.net.cn/plugin?id=1560)

如果想充分发挥uni-app的跨端特性，编译到各种其他小程序平台，建议使用方案1。

如果不需要其他小程序平台，仅需要h5和app，那方案1和方案2均可。

如果只需要开发微信小程序，但想使用vue的方式开发、或者想利用uni-app的插件生态、或者部分页面想跨多端复用，那么使用方案3。
