**uni-app和原生App混合问题：** 

首先务必确认uni-app和原生代码，谁是主谁是从的问题。

- 如果你的应用是uni-app开发的，需要扩展一些原生能力，那么请参考[插件市场](https://ext.dcloud.net.cn/)右上角的原生插件开发教程。
- 如果你的App是原生开发的，部分功能栏目想通过uni-app实现，有2种方式
  * 在原生App里集成uni小程序sdk，[参考](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/36941)
  * 如果不想集成原生sdk，那就把uni-app代码发布成H5方式，在原生App里通过webview打开。

如果应用是uni-app开发为主，只是想离线打包，那么不应该使用uni小程序sdk，请在HBuilderX的发行菜单里点击离线打包。
另注意离线打包无法享受插件市场的付费原生插件，如有相关需求需自己进行原生插件开发，参考[插件市场](https://ext.dcloud.net.cn/)右上角的原生插件开发教程。

**uni-app和原生小程序混合问题：** 

uni-app编译后的wxml代码没有可维护性，不便于整合到原生小程序里。如果想复用原生小程序的代码：
- 方式1：把原生小程序的代码变成组件，uni-app支持使用小程序wxml组件，[参考](frame.md?id=小程序组件支持)
- 方式2：把原生小程序转换为uni-app源码，有各种转换工具，[详见](translate.md)

