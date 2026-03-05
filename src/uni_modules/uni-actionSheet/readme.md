# uni-actionSheet
实现弹出操作菜单(uni.showActionSheet)和关闭栈顶页面操作菜单(uni.hideActionSheet)功能。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/action-sheet.html)  


## uts 语言介绍  
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序：编译为JavaScript  

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。


## uts 插件介绍
UTS 插件是一种特定的 uni_modules 插件，其核心目的是允许 uni-app/uni-app x 开发者使用 UTS 语法来调用扩展 API（封装原生系统的API或三方SDK）。  

UTS 插件的实现代码主要位于 utssdk 目录下，并按平台进行分离和组织：  
| 目录/文件 | 目标平台 | 实现语言 | 作用描述 |
| -- | -- | -- | -- |
|utssdk/app-android|Android|UTS, Kotlin, Java|存放 UTS 插件在 Android 平台上的具体实现源码|
|utssdk/app-ios|iOS|UTS, Swift|存放 UTS 插件在 iOS 平台上的具体实现源码|
|utssdk/app-harmony|HarmonyOS (鸿蒙)|UTS, ArkTS|存放 UTS 插件在 HarmonyOS 平台上的具体实现源码|
|utssdk/*.uts|多平台共用|UTS|存放使用 UTS 语言编写的、可供 所有平台 共用的实现源码|


## 参考文档  
- [uts 语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)
- [uts 和 ts 的差异](https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html)
- [uts 插件开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)
- [uts 插件原生语言混编开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html)
- [uts 插件 Android 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html)
- [uts 插件 iOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
- [uts 插件 HarmonyOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
