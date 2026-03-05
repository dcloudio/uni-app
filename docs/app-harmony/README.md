# harmony开发指南

uni-app x 从4.61+起支持纯血鸿蒙，即Harmony next。

将uni-app x代码编译为运行在ArkTS引擎上代码，生成鸿蒙原生应用。


## 开发环境要求

- HBuilderX 4.61+
- 鸿蒙电脑端开发工具DevEco Studio BuildVersion 5.0.7.210+
- 鸿蒙手机系统 API版本 14+

鸿蒙的API版本类似于Android的API Level。鸿蒙的API版本在手机设置 - 关于本机 中，可找到`API版本`，比如`5.0.2（14）`，这个14即是API版本。

在[uni.getDeviceInfo](../api/get-device-info.md)中也可以通过属性`osHarmonySDKAPIVersion`获取API版本。

## 运行和发行注意
uni-app x编译到鸿蒙运行在ArkTS引擎上，ArkTS在老版鸿蒙的ide deveco中没有热刷新。每次改动代码，需要重新build包、签名、安装新包到手机。但从2025年末起arkts自身支持了开发期间热刷新。

所以uts的运行，需要在本地安装鸿蒙deveco，本地直接编译出包。既然本地可以出包，那么鸿蒙就没有做云打包。这也是和Android和iOS的云打包的区别。

uni-app 因使用jsvm，而鸿蒙模拟器自身在某些CPU上还未适配好jsvm，导致开发者使用模拟器受限。但uni-app x在鸿蒙模拟器运行不受限制。

HBuilderX自身提供了运行、日志、debug、发行、调试证书申请等全套功能，开发者安装deveco后，可以做到不启动deveco，在HBuilderX中完成所有开发。

详细的运行教程[另见](https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html)

### 证书和权限

鸿蒙的证书和权限体系较复杂，和iOS类似。开发者需要在鸿蒙开发者官网仔细了解其证书和权限体系。

如果运行到模拟器，是不需要证书的。

运行到真机时，需要使用调试证书对应用进行签名后才能在指定的开发设备安装。

证书中绑定了权限，如果变更权限，需要更新证书。调试证书还绑定了开发设备。

对于不涉及受限权限的情况，在HBuilderX的运行界面中可以自助申请调试证书。

鸿蒙的权限配置在harmony-config目录下，需要自行参考鸿蒙文档配置。且不支持根据使用的模块自动打包权限。比如使用了定位API，打包时并不会自动带上定位权限。需要自行配置好权限后再打包。

### 调试

鸿蒙平台支持断点调试，不管是uvue、uts，还是混编的ets，都可以断点，详见[鸿蒙Debug](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug-harmony.html)

uni-app x项目的unpackage目录下的app-harmony下有编译后的鸿蒙原生工程。将该工程拖入鸿蒙的deveco中，可使用deveco的一些能力。比如内存泄漏分析工具。

ArkTS的内存垃圾回收和V8等不同，比较容易造成内存泄漏。可以通过deveco提供的工具来分析泄漏点。

## 企业应用的内部分发@internal-test

在应用内测和企业应用场景，有时候需要绕过华为应用商店，直接向部分特定的手机设备分发安装包。
此时可以从 AppGallery Connect 申请**内部测试**证书，并通过 HBuilderX 的调试运行操作得到 .hap 运行包，
然后再编写相关的分发描述文件上传到自己的服务器供手机用户下载安装。

具体操作过程可以参考 ASK 社区文章 [鸿蒙企业应用内部分发打包教程](https://ask.dcloud.net.cn/article/42052)

## 开发注意
	鸿蒙整体处于发展初期，能用，有坑，大部分坑有规避方案。但开发者应建议其领导、客户、质量部门降低期望，不能严格比照Android和iOS的验收标准要求鸿蒙。
	
- 鸿蒙编译工具会在编译本地库时给编译产物的目录加上一串hash值，但windows上最长的文件路径不能超过255个字符。如果开发者的项目路径字符串较长、uni_modules的目录名称较长，再加上鸿蒙deveco编译器加上的hash，就会触发windows文件路径长度限制，导致编译失败。所以windows上的uni-app x项目路径尽量要短，比如`c:\dev\app1`，`uni_modules`的目录名称也要短一些。
- 暂未发布小程序SDK
- 使用 uni.loadFontFace 后需要更新设置字体内容才能使字体生效
- 鸿蒙原生应用的单位有逻辑像素和物理像素之分，分别是vp和px。这里的px是物理像素，而web的px是逻辑像素。同名但不同义。不过在uni-app x的css样式中，仍然使用习惯的px即可，它是逻辑像素，css里写的px编译到鸿蒙会自动变成vp（鸿蒙里的逻辑像素）。鸿蒙开发默认也是vp逻辑像素。鸿蒙原生单位文档[详见](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-pixel-units?ha_source=Dcloud&ha_sourceId=89000448)
- 鸿蒙平台 uts 插件内暂不支持使用uniCloud。页面中可以正常使用uniCloud。
- 在运行 HBuilderX 内置的 hello uni-app x 项目运行报错 `运行所需的权限没有签名授权`，是因为演示项目使用到了需要审批的 ACL 权限。解决方案：搜索 `ohos.permission.READ_PASTEBOARD` 将其注释掉，此时项目可以正常运行，同时剪切板的 api 测试页面将不生效。

## 插件扩展

对于uni自带API不满足需求时，可在uts插件中自由调用ArkTS的原生API或SDK，可以在uts里调用，也可以使用ets混编。
- [uts插件综述文档](../plugin/uts-plugin.md)
- [鸿蒙uts插件文档](../plugin/uts-for-harmony.md)
- [uts插件混编文档](../plugin/uts-plugin-hybrid.md#harmonyos平台)
- [uts标准模式组件文档](../plugin/uts-component-vue.md)
