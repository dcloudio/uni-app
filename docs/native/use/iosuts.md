# 制作UTS插件
> 1. 付费uts插件(普通授权版)不支持原生工程接入。
> 2. 如果导出的资源文件不包含 `uni_modules` ，或 `uni_modules` 中的插件均不包含 `app-ios` 目录可以跳过此章节

## 新建原生插件工程
根据资源文件下的`uni_modules`下的插件列表，新建原生插件工程
1. 启动`Xcode`，点击`File->New->Project`，选择`Framework`点击`Next`；
2. `Product Name`填写规则为：`unimodule`+`插件名称`，其中`-`分割改为驼峰，比如`uni-getbatteryinfo`插件对应的原生工程名应为`unimoduleUniGetbatteryinfo`
3. `Language`选择为`Objective-C`，点击`Next`即可完成创建

## 插件工程环境配置
 `Target -> General -> Minimum Deployments` 选择 `12.0`
 `Target -> Build Settings -> Mach-O Type` 设置为`Dynamic Library`
 `Target -> Build Settings -> Other Linker Flags` 中添加`-ObjC`, 字母o和c大写
 `Target -> Build Settings -> Build Libraries for Distribution` 设置为`YES`
 `Target -> Build Settings -> Enable Module Verifier` 设置为`NO`
 `Target -> Build Settings -> Framework Search Paths` 中添加SDK的Libs目录（操作方法：双击展开`Framework Search Paths`将`SDK/Libs`文件夹拖入即可）

`插件工程`中新建`uts-config.json`文件，然后将SDK中`SDK/ExtApiSrc/UTSOC.h`以及`SDK/ExtApiSrc/UTSOC.mm`添加到`插件工程`中

## 配置资源文件
1. 将以下源文件(`SDK/ExtApiSrc 目录下`)、依赖库(`SDK/Libs 目录下`)添加到`插件工程`中，并将依赖库均设置为`Do Not Embed`
    | uniapp-x源码文件&资源文件 | uniapp-x项目依赖库| uniapp源码文件&资源文件  | uniapp项目依赖库 |
    |---|---|---|---|
    | UTSOC.h <br> UTSOC.mm <br> uts-config.json | DCloudUniappRuntime.xcframework <br> DCloudUTSExtAPI.xcframework <br> DCloudUTSFoundation.xcframework | DCloudUTSConfig.h <br> DCloudUTSConfig.m <br> UTSCPP.h <br> UTSCPP.mm <br> config.json | DCUniBase.framework <br> DCloudUTSFoundation.framework  |

> DCloudUTSExtAPI.xcframework的制作详见[集成内置模块](../modules/ios/modules.md)


2. 将导出的资源文件中`uni_modules`目录下的插件资源，按以下列表中的配置方式分别在`主工程`和`插件工程`添加依赖资源
    | 目录名/文件名 | 	用途 | 配置 |
    |---|---|---|
    | Frameworks | 插件依赖的三方库(framework/xcframework) | 将目录下的依赖库添加到`插件工程`中 |
    | Libs | 插件依赖的三方库(.a) | 将目录下的依赖库添加到`插件工程`中 |
    | src | 插件源代码 | 将目录下的源代码添加到`插件工程`中 |
    | Resources | 插件需要引用的资源文件存放目录 | 将目录下的资源文件添加到`主工程`中 |
    | Info.plist | 需要添加到原生主工程`Info.plist`中的配置文件 | 将该文件配置添加到`主工程`的`Info.plist`中，注意去重 |
    | UTS.entitlements | 需要添加到原生主工程 `entitlements` 文件中的配置文件 | 根据该文件内容，在主工程中添加对应的`Capability` |
    | config.json | 插件依赖的`系统库`、`cocoapods三方库`以及一些需要添加到`主工程Info.plist`文件内的配置信息 | 详见下表 |

### config.json配置

| 参数 | 	用途 | 配置 |
|---|---|---|
| frameworks | 插件依赖的系统库 | 在`主工程`中搜索并添加该列表中的系统依赖库 |
| deploymentTarget | 插件最低支持的iOS版本 | 在`插件工程`中`Target -> General -> Minimum Deployments`设置（若大于主工程设置的最低iOS版本需要同步修改主工程的最低支持） |
| dependencies-pods | 依赖的pod库 | 将其添加到`插件工程`的`Podfile`文件中并执行`pod install` |
| plists | 需要添加到原生主工程`Info.plist`中的配置文件 | 将字段配置添加到`主工程`的`Info.plist`中 |
| hooksClass | 用于uts插件应用程序生命周期函数监听 | 在`插件工程`中找到上面创建的`uts-config.json`文件，将该配置内容添加到`hooksClasses`节点下 |
| provider | 组件的注册信息 | 在`插件工程`中找到上面创建的`uts-config.json`文件，将该配置内容添加到`providers`节点下 |
| components | 组件的注册信息 | 在`插件工程`中找到上面创建的`uts-config.json`文件，将该配置内容添加到`components`节点下 |

`uts-config.json`配置示例图   

![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/utsconfig.png)


### 隐私清单
如果HBuilderX导出的资源文件中包含`PrivacyInfo.xcprivacy`文件，需要将文件内容添加到`插件工程`的同名文件中，注意去重

## 编译导出xcframework
选择构建目标(Any iOS Device/Any iOS Simulator Device)，在菜单栏中，选择`Product -> Build`（或使用快捷键`Command + B`），分别编译出真机以及模拟器的Framework文件。
在菜单栏中，选择`Product -> Show Build Floder in Finder` 获取编译产物所在路径。
使用xcodebuild命令行创建xcframework
```
xcodebuild -create-xcframework -framework 真机路径/unimoduleUniGetbatteryinfo.framework -framework 模拟器路径/unimoduleUniGetbatteryinfo.framework -output 导出路径/unimoduleUniGetbatteryinfo.xcframework
```
导出成功后，将 `unimoduleUniGetbatteryinfo.xcframework` 添加到主工程，并设置为 `Embed && Sign` 

> 编译模拟器注意事项
> `Apple芯片`的设备编译模拟器需要在菜单栏中点击 `Product -> Destination -> Show All Run Destinations` ，然后选择 `Rosetta模拟器` 编译
  
## 原生项目中调试UTS插件
首先，你需要创建一个`Xcode Workspace`，它允许你同时打开多个项目（包括你的主工程和UTS插件工程）。
1. 创建Xcode Workspace  
* 打开Xcode，选择`File > New > Workspace`。
* 给你的Workspace命名，例如`MyProject.xcworkspace`。
* 保存Workspace文件。
2. 将`主工程`和`UTS插件工程`添加到Workspace  
* 在Workspace中，选择`File > Add Files to <YourWorkspaceName>`。
* 找到并选择你的`主工程`和`UTS插件工程`，将它们添加到Workspace中。
3. 配置`主工程`依赖`UTS插件工程`
* 在Workspace中，打开主工程的项目设置。
* 选择`General`标签页，滚动到`Frameworks, Libraries, and Embedded Content`部分。
* 点击`+`按钮，添加你的`UTS插件工程`生成的framework文件。
* 确保`Embed & Sign`选项被勾选。
4. 设置断点和调试 
* 在`UTS插件工程`工程中设置断点，然后在主工程中触发相关功能来调试UTS插件