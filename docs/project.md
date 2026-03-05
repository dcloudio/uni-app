# uni-app x项目

## 新建

首先需下载最新版[HBuilder](https://www.dcloud.io/hbuilderx.html)

在菜单文件>新建>项目中，选择新建uni-app项目。（或工具链左上角的新建快捷菜单，或者快捷键Ctrl+N）

可以选择空项目，也可以选择hello uni-app x示例项目，这个项目有几百个页面，演示了uni-app x的各种组件和API的用法。

注意这里区分uni-app和uni-app x项目，在该界面的底部有一个checkbox：uni-app x。**勾选后**会新建为uni-app x项目。

不要错选成uni-app！

![](./static/newproject.png)

uni-app x只支持vue3，无法勾选vue2。

uni-app x的项目，manifest.json中会多一个节点`"uni-app-x" : {}`。这是HBuilder识别项目类型的标记。如手动增删这个节点，需对项目点右键"重新识别项目类型"
```json
{
    "name" : "hello-uniapp x",
    "appid" : "__UNI__4517034",
    "description" : "",
    "versionName" : "1.0.0",
    "versionCode" : "100",
    "uni-app-x" : {
    }
}
```

uni-app x的项目，在左侧项目管理器的图标是圆形的U（之前是方型的U）。

![](./static/project-icon.png)

## 项目结构

uni-app x的项目结构与[uni-app老版的项目结构](https://uniapp.dcloud.net.cn/tutorial/project.html)基本一致。

主要的差别是没有nativeplugins目录。原因是uni-app x不支持App原生语言插件，仅支持uts插件。

基于uts的插件，可以在uni-app x和uni-app上通用。

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─uniCloud              云空间目录，支付宝小程序云为uniCloud-alipay，阿里云为uniCloud-aliyun，腾讯云为uniCloud-tcb（详见<a href="https://doc.dcloud.net.cn/uniCloud/quickstart?structure&id=structure">uniCloud</a>）
│─components            符合vue组件规范的uni-app x组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件（已废弃）
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.uvue      index页面
│  └─list
│     └─list.uvue       list页面
├─static                存放应用引用的本地静态资源（如图片、字体、音视频等）的目录，<b>注意：</b>静态资源都应存放于此目录  <a href="https://doc.dcloud.net.cn/uni-app-x/compiler/#static">详见</a>
├─uni_modules           存放uni_module <a href="https://uniapp.dcloud.net.cn/plugin/uni_modules.html">详见</a>
├─platforms             存放各平台专用页面的目录，<a href="https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor">详见</a>
├─nativeResources       App端原生资源目录
│  ├─android            Android原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android">详见</a>
|  └─ios                iOS原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6-bundle-resources">详见</a>
├─harmonyConfig         HarmonyOS 端原生资源目录 <a href="https://uniapp.dcloud.net.cn/tutorial/harmony/runbuild.html#config-dir">详见</a>
├─hybrid                App端存放web-view组件使用的本地html文件的目录，<a href="./component/web-view">详见</a>
├─wxcomponents          微信小程序平台wxml组件专用目录
├─unpackage             非工程代码，一般存放运行或发行的编译结果、App自定义基座。默认应配置git忽略
├─main.uts              Vue初始化入口文件
├─App.uvue              应用配置，用来配置App全局样式以及监听 <a href="/collocation/App#应用生命周期">详见</a>
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
├─AndroidManifest.xml   Android原生应用清单文件 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android">详见</a>
├─Info.plist            iOS原生应用配置文件 <a href="https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios">详见</a>
└─uni.scss              内置的常用样式变量
	</code>
</pre>

> 当使用cursor等ai工具开发uni-app x时，可以在项目下放置.cursor目录，帮助AI更好的生成uni-app x代码。[链接](https://github.com/dcloudio/uni-app-x-ai-rules)

## 运行时的UniApp实例

每个uni-app x应用启动，会有一个UniApp实例，通过全局API `getApp()` 获取。

UniApp上有应用级的方法和属性。[详见](./api/get-app.md)

## 运行

新建项目后，可以直接点顶部菜单或工具栏运行，选择要运行的目标平台。

在HBuilder中，有顶部菜单、toolbar运行按钮、快捷键三种运行入口。

1. 顶部运行菜单

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/menurun.png)

2. toolbar工具栏上的运行按钮

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/toolbarrun.png)

	toolbar的运行按钮点击后会展开一个菜单。这个菜单可配置，通过`自定义菜单`将不常用的运行项目折叠起来。

3. 快捷键

	运行快捷键是【Ctrl+r】

	弹出的菜单还支持键盘快捷选择：按回车可以选中菜单的第一项；windows下按数字可以快捷选中菜单项开头数字对应的菜单项。

如果不能看到相关菜单，那么HBuilder当前打开的文件可能不是uni-app x项目下的文件。

运行到不同平台，需要不同平台的运行环境，比如安装浏览器、安装小程序模拟器、安装手机模拟器或电脑端插入真机。

根据提示安装运行环境，并注意观察控制台的日志。

在控制台的右上角，点击红色虫子可以开启debug调试。详见左侧的运行和调试章节。

### 运行到App

uni-app x在运行到Android和iOS时，提供了真机运行基座（playground），该基座安装到手机后，可以把开发者编写代码同步到手机上运行在这个基座上。
并实现修改代码后热刷新，在手机上及时看到效果。

运行到鸿蒙时，没有基座概念，直接调用本地的deveco出包。当然也就不支持热刷新了。

Android和iOS上的基座有标准基座和自定义基座的概念。

和 uni-app/5+App/wap2app 的基座不同，uni-app x的标准基座是一个绿色圆形的U（之前是方型H），基座名称默认为`uni-app x`（之前叫HBuilder）。
![](./static/playground.jpg)

- uni-app x基座，只能运行uni-app x项目，包名是io.dcloud.uniappx
- HBuilder基座，可以运行uni-app/5+App/wap2app。包名是io.dcloud.HBuilder

标准基座使用的图标、包名、证书以及配置的三方sdk的appkey等各种原生信息，都是DCloud的。[详见](./tutorial/app-playground.md)

当需要使用自己的包名、证书、原生配置以及变更三方原生sdk时，需在打包界面勾选打包自定义基座，打包后的自定义基座会放置在项目的unpackage目录下，然后在运行项目时的界面中可以选择自定义基座来运行。

uni-app x运行时，默认仅显示开发者代码和uni-app x框架的输出日志，在控制台右上角还可以选择开启原生日志。

### 运行到web

uni-app x运行到浏览器时，编译基于vite，其特点是按需编译。所以项目运行后很快能看到首页，但后续仍然在编译其他页面直到项目编译完成。

如果后续页面有报错，就会在控制台看到输出。即便这个页面并未打开。

## 发行

选中要发行的项目，点顶部菜单发行（或者对项目点右键，或者快捷键Ctrl+U），选择要发行的目标平台。

所有平台的都支持本地发行，同时依赖本地安装的发布环境。在菜单或弹出界面上有相应的教程链接。

如果发布Android和iOS应用，HBuilder还额外提供了方便的云打包，免去安装和配置原生环境，直接出apk、ipa包。[详见](./tutorial/app-package.md)

除了在菜单里点击发布，也可以通过HBuilderX的cli，实现持续集成和自动发布。[详见](https://hx.dcloud.net.cn/cli/README)

如果你不希望直接发布成品应用，而希望发布成其他应用的一部分，那么
- App平台：需参考[uni-app x 原生SDK文档](./native/README.md)，把uni-app x项目发布为kt、swift源码，集成到自己的原生项目中。
- 小程序平台：可发布为分包，成为其他小程序的一个分包。[详见](https://uniapp.dcloud.net.cn/hybrid.html)

如果你已经拥有了非uni-app x的成型应用，想要渐进式的引入uni-app x，那么上面的方案非常合适。可以用uni-app x开发部分页面，集成到原来的项目中。
