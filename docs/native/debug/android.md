# 原生联调

宿主原生应用是kt/java代码，在as中运行。uni-app x应用是uvue/uts代码，在HBuilderX中运行。但两者经常需要联调。

得益于uts的编译产物就是kotlin，所以uni-app x可以和原生应用混编运行，联调debug。

有两种方案：
1. 在HBuilderX 4.71以前，支持把宿主原生应用变成HBuilderX的自定义基座。
这种方式需要把宿主应用先打包为带有uni-app x调试模块的apk，再运行uni-app x项目，无法动态修改宿主应用的原生代码。
2. 从HBuilderX 4.71+，支持宿主原生工程直接拖入HBuilderX中，和uni-app x项目进行源码级联编联调。

无论哪种方案1还是方案2，首先要对宿主原生应用进行一些配置

## Android Studio 项目配置

对宿主原生项目配置，目的是为了加入uni-app x的调试模块，并对uni-app x调试模块所需的依赖进行配置。

1. 下载uni-app x原生SDK后，将debug-server-release.aar拷贝到原生项目的libs目录下
2. 在app模块的build.gradle下添加如下依赖
```groovy
	dependencies {
		implementation "com.squareup.okhttp3:okhttp:3.12.12"
		implementation "net.lingala.zip4j:zip4j:2.11.5"
		implementation "com.squareup.leakcanary:leakcanary-android:2.14"
	}
```
3. 修改AndroidManifest.xml

	在application节点下添加如下内容
	
	```xml
	<meta-data android:name="DCLOUD_DEBUG" android:value="true"/>
	```
	
	添加网络权限
	
	```xml
	<uses-permission android:name="android.permission.INTERNET" />
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	```
	
注意：
- 如果android原生项目的drawable目录下不存在名称为icon的图片，需要临时先补充一个命名为icon的文件。
- 当build.gradle中的`targetSdk`为34时，在安卓14设备上资源同步会失败。建议将`targetSdk`调整到30至33之间。
- 当前模块仅为调试使用，发行版本请删除上面的配置。
- 如果发行版本显示`正在加载调试框架...`或`Loading debugging framework...`，请删除上面的调试模块配置。

## 方案1：把宿主应用打包为HBuilderX的自定义基座。

思路：把宿主原生工程打包为apk，成为自定义基座。然后在HBuilderX中运行uni-app x时，选择这个自定义基座，运行到手机上。

如果您不了解什么是运行基座、标准基座、自定义基座，这些概念，请参考[文档](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#playground)

### 1. 原生工程生成自定义基座  

- 打开原生工程build.gradle文件，修改versionCode和versionName字段，如下图：
	
![avatar](https://img.cdn.aliyun.dcloud.net.cn/nativedocs/5%2BSDK-android/image/6-1.png)
	
versionCode为应用的版本号（整数值），用于各应用市场的升级判断，需要与uni-app x项目的manifest.json中versionCode值一致
	
versionName为应用的版本名称（字符串），在系统应用管理程序中显示的版本号，需要与uni-app x项目的manifest.json中versionName值一致。

**注意：版本号应该与uni-app x应用一致。**

- 点击android studio的`Build->Generate Signed Bundle/APK...`生成安装包。

**注意：自定义基座不支持aab包。**

### 2. 将自定义基座添加到uni-app x 项目  
- 将生成的apk文件重命名为`android_debug.apk`
- 将`android_debug.apk`拷贝到uni-app x项目的unpackage/debug目录下
- 点击 HBuilderX中运行按钮->运行到Android App基座，勾选`使用自定义基座运行`

	![](https://web-ext-storage.dcloud.net.cn/native/doc/android/debug_hx.png)

运行成功后，在手机自定义基座中打开uni-app x应用，HBuilderX控制台可以看到运行log。
在HBuilderX中修改uni-app x代码，可以在手机端基座中热刷生效。

## 方案2：原生工程联编联调 @installedapk  
> HBuilderX4.71+

**注意：需要将 HBuilderX 和 uni-app x SDK 都升级到4.71或以上版本**

在前述原生工程配置完成后，可以通过android studio直接运行到手机上。

然后切换到 HBuilderX 点击运行按钮->运行到Android App基座，勾选`使用自定义基座运行`->`已安装的基座`。

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/debug_installed.jpg)

调试的包名与原生工程的`build.gradle`中`applicationId`字段一致。

选择正确的包名，点击运行即可。

uni-app x项目将开始编译，并热重载到手机的原生应用中。

运行成功后，将可以在HBuilderX的控制台中看到uni-app x应用的日志，点击后可以到uvue/uts的源码中。
修改uni-app x代码后，手机端将热重载更新。

此时也可以在控制台右上角点击红色虫子按钮开启debug，进行uni-app x应用的断点调试。

如果您不了解如何在HBuilderX中如何调试uni-app x，可以参考[文档](https://uniapp.dcloud.net.cn/tutorial/debug/uni-uts-debug.html)。

如果需要调试原生工程，需要配置上图中的`关联项目`，关联项目的路径为原生工程的根目录。并将原生工程拖入到HBuilderX中。参考下图：

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/drop_project.gif)

配置成功后，重新运行uni-app x项目。

在需要调试的kt/java代码行号上点右键设置断点，开启`uts调试`。如下图：

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/kt_debug.png)

断点设置成功之后，可以触发相应的逻辑进入调试模式。

在HBuilderX中还可以在原生工程和uni-app x项目中各自打断点。在原生的kt/java和uni-app x代码的断点之间来回单步跟踪，方便排查联调问题。具体效果可以参考如下视频：

<video id="video" preload="none" controls="controls" width="900px" height="580px" src="https://web-ext-storage.dcloud.net.cn/native/doc/android/debug-native-video.mov" poster="https://web-ext-storage.dcloud.net.cn/native/doc/android/debug-native-video-poster.png"></video>

:::tip Tips
- 如果在HBuilderX中改动了原生工程的kt/java文件，需要在android studio中重新运行项目才会生效。
- 关联项目的路径应为原生工程的根目录。否则HBuilderX设置在kt/java文件上的断点可能不会生效。
- 不要在Android studio和HBuilderX中同时开启调试服务，否则会导致Android studio/HBuilderX的调试服务无法正常启动。
- 调试原生工程时，在Android studio中重新运行项目，需要在HBuilderX中重新开启调试服务。
- HBuilderX对kt/java代码只有基本的高亮和格式化，没有语言服务。编写原生代码仍然应该在Android Studio中进行。两个IDE同时打开协作使用。
:::