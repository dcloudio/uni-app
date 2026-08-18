# uni-app x 是什么？<Badge text="HBuilderX 3.9+"/>

uni-app x，是下一代 uni-app，是一个基于vue、js/ts/uts、css和原生渲染的跨平台开发框架。

uni-app x 在2026年推出[蒸汽模式](./app-vapor.md)后，终于实现了跨平台框架的终极愿景：即跨平台，又做到了比原生更快的渲染速度。见[性能对比](#pk)

可以体验打包后的[hello uni-app x](https://hellouniappx.dcloud.net.cn)，访问地址或扫描二维码后获取：

支持 Android、iOS、鸿蒙、web、微信小程序。
  
<div>
	<a
		href="https://hellouniappx.dcloud.net.cn" target="_blank"
		style="display: flex; align-items: center;flex-direction: column;margin: 0 5px 20px;width:160px;"
	>
		<img src="https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png" width="160" loading="lazy" />
		<b>hello uni-app x</b>
	</a>
</div>

::: tip
hello uni-app x 的源码见：[https://gitcode.com/dcloud/hello-uni-app-x](https://gitcode.com/dcloud/hello-uni-app-x)
:::

## 性能对比@pk

以渲染4050个view和text的测试例为例，需在同一屏幕内渲染，在不同平台原生的耗时和`uni-app x蒸汽模式`的耗时如下：

|平台		|原生		|uni-app x|差距倍数	|对比视频																																									|
|--			|--			|--				|--				|--																																												|
|Android|505		|273			|1.85倍		|[https://www.bilibili.com/video/BV17VuG6sExP](https://www.bilibili.com/video/BV17VuG6sExP)|
|iOS		|325.76	|167			|1.95倍		|[https://www.bilibili.com/video/BV1ApMt66Eez](https://www.bilibili.com/video/BV1ApMt66Eez)|
|鸿蒙		|804		|267			|3倍			|[https://www.bilibili.com/video/BV1RpPQzAEDS](https://www.bilibili.com/video/BV1RpPQzAEDS)|

表格数据为耗时，单位为ms。

- Android测试设备：小米Fold4(Android16)
- iOS测试设备：iPhoneSE(iOS26.5)
- 鸿蒙测试设备：鸿蒙nova12(api21)

可见，uni-app x蒸汽模式，在每个平台，均比原生渲染快2、3倍。

**重现方式：**

- uni-app x 的源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue)。上方二维码显示的[ hello uni-app x 下载页面](http://hellouniappx.dcloud.net.cn/)可下载编译后的体验包。
- Android原生源码：[https://gitcode.com/dcloud/test4050-android](https://gitcode.com/dcloud/test4050-android)。仓库下有编译好的apk可直接体验。
- iOS原生源码：[https://gitcode.com/dcloud/test4050-ios](https://gitcode.com/dcloud/test4050-ios)，开发者可以自行编译。
- 鸿蒙原生源码：[https://gitcode.com/dcloud/test4050-harmony-arkui](https://gitcode.com/dcloud/test4050-harmony-arkui)，开发者可以自行编译。

本文为 uni-app x 简介，并非详细评测报告，更多内容，包括Compose UI、Swift UI等更多技术方案的对比，包括如何公平测试，包括长列表、富文本、canvas等更多组件的性能测试，详见专业的benchmark：
- [Android benchmark](./benchmark/vapor-benchmark-android.md)
- [iOS benchmark](./benchmark/vapor-benchmark-ios.md)
- [鸿蒙benchmark](./benchmark/vapor-benchmark-harmony.md)

## VDOM模式和蒸汽模式

uni-app x 的第一代是VDOM模式，该模式的编程语言是uts，一种可以编译为kotlin、Swift、ets、js的跨平台强类型语言。
* `web/小程序`平台，编译为JavaScript
* `Android`平台，编译为Kotlin
* `iOS`平台，编译Swift
* `鸿蒙next`平台，编译为ArkTS

虽然跨语言调用障碍抹平，但由于VDOM的存在以及渲染引擎不够强大，实际渲染速度比原生慢。

2026年，uni-app x 推出了新一代的蒸汽模式，由于新版的渲染引擎性能远超原生，考虑到AI友好度、动态性以及老uni-app用户的升级，
在蒸汽模式下改用普通的ts/js。

如果写成uts，Android和iOS也会通过uts2js运行在js引擎上。鸿蒙目前运行在arkts引擎上，未来为了热更新，也会提供运行在js引擎上的选项。

在蒸汽模式后，uts语言的主要作用是开发uts原生插件。仅uts插件（utssdk目录）继续保留uts向kotlin、Swift、ets的编译能力。

也就是uni-app x 蒸汽模式，不依赖uts的原生编译能力，拥有js的动态性、拥有非常强的AI友好度，渲染性能又超过原生。

从2026年起，新的[蒸汽模式](./app-vapor.md)将逐渐替代老的VDOM模式。
- harmonyOS版于5.0上线
- iOS版于5.11上线
- Android版于5.21上线

## 开发技术

开发者使用vue + js/ts + css(子集) 来开发 uni-app x 蒸汽模式。

与uni-app相比，无需新学习任何编程语言或框架。仅需注意在uni-app x 的app平台，由于使用的是原生渲染，其支持的css是web css的子集。

如果您是新手，也可以通过[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)来完成应用开发，AI对 uni-app x 蒸汽模式的开发非常友好。

一个典型的 uni-app x 的 uvue页面例子：

```html
<template>
	<view class="content">
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script setup lang="uts">
	const title = ref("Hello world")

	onLoad(() => {
		console.log('onLoad')
	})

	const buttonClick = () => {
		uni.showModal({
			"showCancel": false,
			"content": "点了按钮"
		})
	}
</script>

<style>
	.content {
		flex: 1;
		background-color: white;
	}
</style>

```

### uni的组件 @uni-components

uni-app x支持的组件包括：
- `内置基础组件`：与uni-app和小程序相同，如view、text、image、scroll-view、input...等，详见[组件清单](./component/README.md)
- `自定义uvue组件`：使用内置组件和vue组件技术进行封装的组件，支持easycom。
- `uts原生组件插件`：用于原生sdk的ui以组件的方式嵌入。

> 除了微信小程序，其他端不支持小程序wxml组件。

很多内置组件，也是开源的uvue组件，在每个组件文档右上角可以点击源码仓库链接查看。

更多组件介绍，[详见](./component/README.md)

## API @uni-api

uni-app x支持的API包括：

1. js的内置API
2. 全局API，前面不需要加`uni.`。如[getApp](./api/get-app.md)、[getCurrentPages](./api/get-current-pages.md)
3. uni.xxx的内置API。数量较多，[详见](./api/README.md)
4. uniCloud.xxx的内置API。[详见](./api/unicloud/README.md)
5. dom的API [详见](./api/dom/README.md)
6. 原生API

uni-app x不会限制任何原生API的调用，在每个平台都可以调用其平台所有原生能力：
- web平台：可调用浏览器的所有api，可混合使用js，可使用web生态的各种库，包括npm。
- 小程序平台：可调用小程序的所有api，可混合使用js，小程序的自定义组件生态（如wxml组件），包括支持小程序的npm库。
- Android平台：可调用Android os的所有api，可混合使用kotlin、java源码，可使用所有适配Android的sdk，包括so库，可使用gradle等仓储。
- iOS平台：可调用iOS的所有api，可混合使用swift，可使用所有适配iOS的sdk，包括动态库静态库，可使用cocoaPods库管理
- Harmony平台：可调用鸿蒙的所有api，可混合使用ArkTS，可使用所有适配鸿蒙的sdk，包括so库，可使用ohpm库管理。

uni.的api，大多是uts开发的，在每个API文档右上角可以点击源码仓库链接查看。

插件市场也有很多做好的uts插件，方便开发者拿来即用。[uts插件](https://ext.dcloud.net.cn/?cat1=8&type=UpdatedDate)

老uni-app，支持 plus API 和 weex API。但 uni-app x 中，不再支持这些API。

更多API介绍，[详见](./api/README.md)

## CSS @css

uni-app x 在web和小程序，支持完成的浏览器css，在app平台，由于是原生渲染，支持的css的子集。

主要差异包括：
- 使用flex布局，且默认方向为竖向
- 文字必须写在text组件内且样式不支持继承

其他差异详见 [css文档](./css/README.md)

## 插件生态

uni-app x的插件生态，以uni_modules为主。这是一种面向全端的、统一的插件管理方案。

它容纳支持各种平台的原生库管理方案，包括npm、Android仓储、iOS Swift PM、CocoaPods、鸿蒙ohpm。

可以引入web和原生的各种生态库。

如果不开发原生插件，仅使用纯js库，在蒸汽模式下，npm上众多库也可以直接在App平台使用，比如vue-pinia、day.js等。而vdom模式则需要uts适配库才能在App平台使用。

但需注意小程序和App平台不支持window等api，对dom api的支持也有限。详见[DOM API](./api/dom/README.md)

[uni插件市场](https://ext.dcloud.net.cn/)是跨端插件的聚集地，前端插件可以去npm找，但原生插件更推荐在这里找。

uni-app x的插件生态，基于[uts插件](./plugin/uts-plugin.md)。这是一种面向全端的、统一的插件管理方案。

目前已经有数千款插件支持uni-app x，它们发布在[uni插件市场](https://ext.dcloud.net.cn/?uni-appx=1)

uts插件通过统一的interface，约束了所有平台的API的输入输出，甚至错误码，保障了跨平台调用的一致性。

uts插件有多种开发方式：
1. 可以使用uts语言直接调用系统API来封装插件
比如[电量插件](https://gitcode.com/dcloud/uni-api/tree/master/uni_modules/uni-getbatteryinfo/utssdk)，在每个平台都是uts代码，但统一了interface。
2. 可以原生混编
在不同平台，直接用uts调用平台原生代码，比如Android的kt文件、iOS的swift文件、鸿蒙的ets文件。同样使用一套interface约束。\
比如[音频播放插件](https://gitcode.com/dcloud/uni-api/tree/dev/uni_modules/uni-createInnerAudioContext)，在Android上使用了kt混编，iOS使用了swift混编，复用现成的原生代码，快速封装插件。
3. 调用三方sdk并引入库管理
uts插件是一个大一统的插件模型，其中在不同的子平台可以包含不同平台的库管理方案，不管是aar、so、framework、har都可以使用
	- web平台和小程序平台，以及跨端的js库，支持npm
	- Android平台支持gradle等仓储
	- iOS平台支持cocoaPods和Swift PM
	- Harmony平台支持ohpm

如果你只是使用插件，那么访问插件市场，勾选`uni-app x`的checkbox就能找到所需插件。

如果你想开发uts插件，[参考插件开发教程](./plugin/uts-plugin.md)

推荐使用[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)来开发uts原生插件，它可以做到不懂原生的前端开发者开发出uts原生插件。

### 推荐的优秀插件

基于uni-app x的纯前端组件，比如ui库，这里推荐一些：
- [uni-ui x](./component/uni-ui-x/README.md)：官方UI库。它的设计规范与uni ui有差别，是为uni-app x重新设计的更好的ui库。兼容[蒸汽模式](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html)、使用样式隔离策略2.0
- [lime-UI Vapor](https://ext.dcloud.net.cn/plugin?id=28915)：即兼容uni-app又兼容uni-app x蒸汽模式。2025插件大赛一等奖。
- [RiceUI](https://ext.dcloud.net.cn/plugin?id=24907)：支持蒸汽模式，全端组合式UI库。
- [TuiPlus Vapor](https://ext.dcloud.net.cn/plugin?id=28497)：支持蒸汽模式，支持css原子化。
- [TMUI4.0](https://ext.dcloud.net.cn/plugin?id=16369)：VDOM模式高品质UI库，2023插件大赛一等奖。

## 开放性

uni-app x的组件和API基本都开源，个别未开源部分也会在接下来陆续完成开源。

在uni-app x的每个组件和API的文档中，都有该API具体实现的源码github和gitcode链接（文档右侧）。比如[uni.showModal](https://doc.dcloud.net.cn/uni-app-x/api/modal.html)

开发者可以审查这些源码的合理性，也可以在遇到官方bug时，自行拉源码修复。\
uni-app x支持单独的组件和API替换，将源码的`uni_modules`下载到工程下，修改源码后打包即可将官方实现自动替换为你修改的实现。

uni-app x的Web版、小程序版的主引擎有单独开源地址：[https://github.com/dcloudio/uni-app](https://github.com/dcloudio/uni-app)

uni-app x的所有可视元素，都没有写死样式和文字，开发者可以自己定制风格和国际化。

开发者编写的代码，编译后的产物代码都在项目的unpackage目录下。\
开发者可以看到实际生成的js、kt、swift、ets代码是什么样的，无需担心埋入不合适的代码。\
开发者可以自行把这些编译产物引入自己的原生工程中，自行打包。这些都是开放的。

uni-app x引擎仅在引擎崩溃时有数据收集以用于产品改进，且不采集任何《个人信息保护法》涉及的个人隐私数据。详见[隐私协议](https://dcloud.io/license/appprivacy.html)

## 路线图

uni-app x 在2026年会陆续完成
- app热更新
- 支付宝小程序、抖音小程序

其他计划，将根据社区的反馈意见来排优先级。

欢迎去[需求墙](https://vote.dcloud.net.cn/#/?name=uni-app%20x)投票。


## 案例
[另见](./sample.md)

## 自动化测试
uni-app x 从源头重视产品质量，第一个版本就支持自动化测试。并为uni-app x产品编写了数十万行自动化测试例代码。

uni-app x 的自动化测试方案和 uni-app js版相同，自动化测试脚本使用js编写（注意不是uts）。整个自动化测试环境，运行在电脑端。

开发者可以为自己的app编写好自动化测试，以提升自己的产品质量。

uni-app (x) 的自动化测试教程详见：[https://uniapp.dcloud.net.cn/worktile/auto/quick-start.html](https://uniapp.dcloud.net.cn/worktile/auto/quick-start.html)

## 历史老项目兼容指南

### uni-app js版老项目迁移指南

详见：[uni-app 升级 uni-app x](./uniapptox.md)

### 原生/rn/flutter页面兼容指南

之前已经有原生/rn/flutter页面，希望渐进式的迁移到uni-app x架构，该怎么搞？

uni-app x 毕竟是原生应用，内嵌flutter、rn这些没有任何问题，包括调用其他原生写的界面也可以。把之前的页面封装为[uts插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)，云打包就可以用。

插件市场已经有uts版本的[内嵌flutter插件](https://ext.dcloud.net.cn/search?q=flutter&orderBy=Relevance&cat1=8)、[内嵌compose ui插件](https://ext.dcloud.net.cn/search?q=compose+ui&orderBy=Relevance&cat1=8)

而[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，也具备把原生、rn、flutter应用翻译成uni-app x应用的能力。

至于把 uni-app x 作为一个sdk内嵌到其他原生应用中，请参考[uni-app x原生SDK](native/README.md)。


## FAQ
- uni-app x 支持uvue页面和vue页面混写吗？\
  不支持混写。但蒸汽模式下的uvue可以写js/ts/uts。如需升级详见：[uni-app 升级 uni-app x](./uniapptox.md)

- uni-app x 的app端能离线打包吗？\
  鸿蒙平台和小程序类似，本身就是本地打包。而iOS和Android的离线打包文档[详见](./native/README.md)

- uni-app x 的App能热更新吗？\
  App开发期间可以热刷，但打包后不能热更新。\
  蒸汽模式下的3端app会推出wgt更新。\
  Android目前可以使用[uni小程序sdk](https://ext.dcloud.net.cn/plugin?id=17638)，热更新小程序。\
  
- uni-app x 能调用所有原生API吗？\
  可以。在app端，kotlin、swift、ets能调用的，uts就能调，因为uts其实就是编译成这些语言了。在浏览器、小程序端，所有js能调用的，uts也都能调。

- uni-app x 能集成原生sdk吗？\
  可以，通过uts插件，[https://uniapp.dcloud.net.cn/plugin/uts-plugin.html](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)

- uni-app x 的开发只能用HBuilderX吗？\
  官方已发布cursor/vscode的语法服务插件，运行和打包仍需要HBuilderX。[详见](tutorial/ls-plugin.md)

- uni-app x 支持AI开发吗？\
	官方提供的[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，是最佳的uni-app x AI Coding工具。熟悉uni全线产品，熟悉uts语法、自动修复编译错误，还熟悉原生混编，可以写uts原生插件。\
	官方的[uni-ui x](./component/uni-ui-x/README.md) 组件库，以及众多新出的[设备API](./api/calendar.md)，都是使用uni-agent开发的。

- uni-app x 支持最低的Android版本多少？浏览器版本多少？\
  * Android VDOM最低支持`Android 5`，蒸汽模式最低支持`Android 6`；
  * iOS版 VDOM模式最低支持`iOS12`，蒸汽模式最低支持`iOS14`
  * harmonyOS版 VDOM模式最低支持`API14`；蒸汽模式最低支持`API20`
  * Web版`发行模式`最低支持`chrome 64`、`safari 11.1`、`firefox 62`、`edge 79`、`safari on iOS 12`；
  * Web版`运行模式`最低支持`chrome 66`、`safari 11.1`、`firefox 62`、`edge 79`、`safari on iOS 12`；另外由于运行时不会对语法进行转化来兼容低版本浏览器，如果使用了一些比较新的语法可能会无法在低版本浏览器上运行。

- 老 uni-app 还维护吗？\
  
	官方已于2024年停止nvue和5+的维护。
	
	因为uni-app x蒸汽模式已经兼容js/ts写法，开发者可以方便的将老uni-app升级到uni-app x蒸汽模式。所以老uni-app、尤其是老uni-app的app平台的维护意义也不大了。
	
	不再维护不是下线，而是没有重大问题的话（如新手机不兼容）不会再更新了。

  如果只开发小程序和Web，那使用uni-app或uni-app x哪个都差不多。如果开发App，那么推荐改用uni-app x。

  不管uni-app还是uni-app x，都支持uts插件生态，原生扩展api和插件是复用的。

  包括官方的组件和API也是复用的，比如电量API [uni.getbatteryinfo](https://ext.dcloud.net.cn/plugin?id=9295)，它们使用uts开发，在 uni-app和uni-app x上，调用的都是一套代码。


::: tip 加群交流
欢迎加入 uni-app x 专用群交流
- [uni-im群](https://im.dcloud.net.cn/#/?joinGroup=6582a367058a46652e0deda9)
:::