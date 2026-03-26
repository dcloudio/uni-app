# 说明  
此目录中每个子目录是一个uts插件，用于实现 uni-app x 中内置的 组件 或 uni API 。  

可以根据需求将 uts插件 拷贝到 uni-app x 项目下的 uni_modules 中替换内置的 组件 或 uni API。如果内置的组件 或 uni API 不满足项目需求，可修改 uts插件 源码来实现，保存后真机运行（Android/iOS平台需要提交云端打包自定义基座）查看效果。  

**注意**  
通常 uni-app 项目中也可以使用这些uts插件，但有部分插件不支持 uni-app 项目：  
- 插件的 interface.uts 中定义导出的API中使用了泛型，如 [uni-network](./uni-network/readme.md)  
- 插件中使用了 [native-view](https://doc.dcloud.net.cn/uni-app-x/component/native-view.html) 组件，如 [camera](./uni-camera/readme.md)、[input](./uni-input/readme.md)、[uni-loading](./uni-loading/readme.md)、[uni-textarea](./uni-textarea/readme.md)、[uni-video](./uni-video/readme.md)、[uni-web-view](./uni-web-view/readme.md)等  
- 插件中使用了 uni-app 项目中不存在的内置组件，如 [uni-showLoading](./uni-showLoading/readme.md) 使用了内置组件 [loading](https://doc.dcloud.net.cn/uni-app-x/component/loading.html)，而此组件在 uni-app 中不支持  


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
uts插件是一种特定的 [uni_modules 插件](https://doc.dcloud.net.cn/uni-app-x/plugin/uni_modules.html)，其核心目的是允许 uni-app/uni-app x 开发者使用 uts 语言来开发调用扩展能力（封装原生系统的API或三方SDK）。  

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
