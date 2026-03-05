# uni-createInnerAudioContext
实现音频播放功能。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html)  


## uts 语言介绍  
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

web平台/小程序：编译为JavaScript
Android平台：编译为Kotlin
iOS平台：编译Swift
鸿蒙OS平台：编译为ArkTS
uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。


## uts 插件介绍
uts插件，是指使用uts语法调用原生的API（包括原生系统的API或三方SDK），并封装成一个 uni_modules 插件，供 uni-app/uni-app x 开发者使用。  

uts插件中的关键目录作用：  
- utssdk/app-android : uts插件在Android平台的实现源码，包括uts/kotlin/java等语言的实现源码  
- utssdk/app-ios : uts插件在iOS平台的实现源码，包括uts/swift等语言的实现源码  
- utssdk/app-harmony : uts插件在HarmonyOS(鸿蒙)平台的实现源码，包括uts/ArkTS等语言的实现源码  

其中utssdk下的.uts文件是各平台共用uts语言的实现源码。  


## 参考文档  
- [uts 语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)
- [uts 和 ts 的差异](https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html)
- [uts 插件开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)
- [uts 插件原生语言混编开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html)
- [uts 插件 Android 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html)
- [uts 插件 iOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
- [uts 插件 HarmonyOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
