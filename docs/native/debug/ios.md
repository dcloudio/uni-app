# 原生联调

宿主原生应用是Objective-C/Swift代码，在Xcode中运行。uni-app x应用是uvue/uts代码，在HBuilderX中运行。但两者经常需要联调。

得益于uts的编译产物就是Swift，所以uni-app x可以和原生应用混编运行，联调debug。

有两种方案：
1. 在HBuilderX 4.81以前，支持把宿主原生应用变成HBuilderX的自定义基座。
这种方式需要把宿主应用先打包为带有uni-app x调试模块的基座(.ipa文件)，再运行uni-app x项目，无法动态修改宿主应用的原生代码。
2. 从HBuilderX 4.81+，支持宿主原生工程直接拖入HBuilderX中，和uni-app x项目进行源码级联编联调。

无论哪种方案1还是方案2，首先要对宿主原生应用进行一些配置

## Xcode 配置项目
对宿主原生项目配置，目的是为了加入uni-app x的调试模块，并对uni-app x调试模块所需的依赖进行配置。
1. 下载[uni-app x原生SDK](https://doc.dcloud.net.cn/uni-app-x/native/download/ios.html)后，将DCloudDebugServe.xcframework添加到原生工程中。
2. 将原生工程中`Target`的名称改为`UniAppX`。如图：
   ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_update_target_name.jpg)
         
3. 在工程`Info.plist`下添加`UIFileSharingEnabled`节点，值设置为`true`。如图：   
      
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_info_filesharingenabled.png)

4. 填写`Display Name(建议与manifest.json中name值一致)`、`Build(建议与manifest.json中versionCode一致)`、`Version(建议与manifest.json中versionName值一致)`字段。如图：
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_update_name_version.png)

5. 在工程`Info.plist`下添加`uniapp-x`节点，在节点中配置`appid(必须与manifest.json中appid值一致)`以及`ipatype(在HBuilderX中调试需要设置为1)`,如图：  
   ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/uniappx_app_info.png)
  
## 方案1：把宿主应用打包为HBuilderX的自定义基座。
思路：把宿主原生工程打包为ipa，成为自定义基座。然后在HBuilderX中运行uni-app x时，选择这个自定义基座，运行到手机上。

如果您不了解什么是运行基座、标准基座、自定义基座，这些概念，请参考[文档](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#playground)

### 原生工程生成自定义基座
检查`Target -> Info -> uniapp-x`节点下的`uniRuntimeVersion`与`HBuilder X`版本号是否一致，如有差异建议更新为相同版本。   
在Xcode菜单栏中，选择`Product -> Archive` 根据提示导出ipa文件  

### 将自定义基座添加到uni-app x 项目  
1. 将生成的`ipa`文件重命名为`iOS_debug.ipa`   
2. 将`iOS_debug.ipa`拷贝到`uni-app x`项目的`unpackage/debug`目录下   
3. 点击 `运行 -> 运行到iOS App基座`，勾选`使用自定义基座运行` 
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_export_to_hx.jpg)

运行成功后，在手机自定义基座中打开uni-app x应用，HBuilderX控制台可以看到运行log。
在HBuilderX中修改uni-app x代码，可以在手机端基座中热刷生效。


## 方案2：原生工程联编联调
> HBuilderX4.81+

**注意：需要将 HBuilderX 和 uni-app x SDK 都升级到4.81或以上版本**

在前述`Xcode 配置项目`配置完成后，可以通过Xcode直接运行到手机上。

然后切换到 HBuilderX 点击运行按钮->运行到iOS App基座，勾选`使用自定义基座运行`->`原生工程基座`，在`基座位置`处输入Xcode编译产物(UniAppX.app)的路径后，点击运行。


![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_debug_choose_ipa.png)

### 如何获取基座位置
编译成功后，在 Xcode 左侧的 ​​项目导航器 (Navigator)​​ 中，切换到 ​​`Products`​​ 目录。找到你的项目名称对应的 .app文件。右键点击​​它，选择 `​​Show in Finder` 或 将其拖入到终端中获取路径。

![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_debug_xcode_find_app_path.png)
 

### 调试原生工程中的uvue页面

在HBuilder X完成运行基座后，通过 HBuilder X 控制台右上角的红色虫子按钮点击`开启uts调试(jscore)`后通过双击或右键在uvue页面中添加断点调试。断点调试详情参考 [uni-app x iOS uts 调试](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug-ios.html) 中的 `uni-app x jscore调试` 部分。

![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_hx_start_debug.png)


### 调试原生主工程或UTS插件

在HBuilder X完成运行基座后，将Xcode中的原生工程根目录拖入到HBuilderX的项目管理器中，通过 HBuilder X 控制台右上角的红色虫子按钮点击`开启uts调试(swift)`后通过双击或右键在原生代码中添加断点。断点调试详情参考[uni-app x iOS uts 调试](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug-ios.html) 中的 `uni-app x swift调试` 部分。

![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_debug_hx_native.png)


调试UTS插件必须将插件原生工程通过 ​​`Workspace` 或 `引用工程`的方式​​ 引入您的主工程。不可仅引用导出的`xcframework`或`framework`产物文件，否则无法进行源码调试。具体可参考SDK中的示例`UniAppXDemo`。

![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/x_native_sdk_debug_xcode_uniappxdemo_workspace.png)


调试UTS插件流程同上，在HBuilder X完成运行基座后，将插件原生工程拖入到HBuilderX的项目管理器中，`开启uts调试(swift)`打断点调试即可。


:::tip Tips
- 如果原生工程的源码文件有变更，需要在Xcode中重新编译、运行项目后才会生效。
- 调试原生工程时，在Xcode中重新运行项目，需要在HBuilderX中重新开启调试服务。
:::