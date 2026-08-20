# 蒸汽模式
蒸汽模式，即vapor，是vue3的新功能，去掉了虚拟DOM。

之前的非蒸汽模式，也称之为VDOM模式。

uni-app x 的蒸汽模式，包含了去掉虚拟DOM的vue框架，以及App平台的一套基于原生渲染管线的、超过原生渲染速度的全新渲染引擎。

- HBuilderX 5.0+，鸿蒙支持蒸汽模式
- HBuilderX 5.11+，iOS支持蒸汽模式
- HBuilderX 5.21+，Android支持蒸汽模式

目前 uni-app x 蒸汽模式编译到小程序和web时，会以VDOM模式运行，后续会升级为蒸汽模式，无需担心使用蒸汽模式后无法编译到web和小程序。

## 体验方式

hello uni-app x的3个App平台示例均已更新为蒸汽模式，下载地址：[http://hellouniappx.dcloud.net.cn/](http://hellouniappx.dcloud.net.cn/)

下载HBuilderX 5.21+，运行[hello uni-app x](https://gitcode.com/dcloud/hello-uni-app-x)。

如在自己的项目下打开蒸汽模式，需要在**manifest.json的可视化界面首页中勾选蒸汽模式**。

## 虚拟DOM的问题
近年新兴的前端框架，掀起了新一轮的性能革命，纷纷去掉了虚拟DOM。通过更复杂的编译器，生成更高效的直接操作DOM的代码。

vue中去掉虚拟DOM的版本即为蒸汽模式。

回答蒸汽模式为什么更快这个问题前，我们需要先明白虚拟DOM为什么慢。

假设我们要加载一个大页面，里面有1000个DOM元素。

在蒸汽模式之前的版本，运行时的流程实际是：
1. 创建1000个虚拟DOM，构造VNode Tree
2. 在每个VNode创建的内部逻辑中，创建对应的真实DOM，构造DOM Tree。

本来创建1000个真实DOM的树已经比较耗时了，再加上还要花时间创建1000个虚拟DOM树，造成页面加载更慢。

过去的虚拟DOM，包含了DOM操作的最佳实践，使得普通开发者写出的代码也能较高性能运行。

但蒸汽模式，通过更强大和复杂的编译器，把vue的语法编译成了包含DOM操作最佳实践的JS代码。

注意：蒸汽模式仅支持组合式API（setup），不支持选项式。

选项式的问题在于很多写法框的比较死，灵活度相比其他框架要弱。

从DCloud的角度看，去掉虚拟DOM的蒸汽模式vue框架，综合性能、生态、易用性，已超过了react等其他框架。

## 全新的渲染系统

uni-app x 引入蒸汽模式，不仅是去掉了虚拟DOM，更重要的是 uni-app x 全新的渲染系统。

出于减少技术概念和条件编译的角度，这套全新的渲染系统和蒸汽模式绑定推出，渲染系统仅有内部代号，没有对外单独命名。

对于开发者而言，写条件编译时仅需一个条件，即`// #ifdef VUE3-VAPOR`。

这个无名的渲染系统，实现了跨平台App框架的历史突破，即：**基于原生渲染管线的跨平台框架，超越原生的渲染速度**。

### 性能说明

测试性能，主要测试3个场景，

1. view和text的创建渲染速度
2. 超长列表的加载速度和滚动掉帧情况
3. rich-text等考验性能的组件

#### 1. 4050个View和text创建速度对比@4050

**实验说明：**同屏渲染2050个view，里面又套了2000个text，一共4050个元素。没有懒加载、没有复用，是view和text创建速度的硬性考验。

- 鸿蒙平台

**测试设备：** 鸿蒙nova12(api21，鸿蒙最低端手机)

|	开发方式					|渲染耗时ms	|
|--									|--					|
|ArkUI							|798				|
|NativeNode					|672				|
|uni-app x 蒸汽模式	|280				|

NativeNode指跳过ArkUI声明式框架，纯写c代码创建这些ui元素。

uni-app x 作为一个数据驱动的响应式框架，渲染速度比裸写c代码还快数倍。

**视频体验：** [2台nova12上鸿蒙4050真机对比视频](https://www.bilibili.com/video/BV1RpPQzAEDS)。左边为`arkUI原生`，右边为`uni-app x 蒸汽模式`。

**测试结论：** 在创建view和text的速度对比中，`uni-app x蒸汽模式`比ArkUI快2.85倍、比nativeNode快2.4倍。

另外我们也测试了其他跨平台框架在鸿蒙的表现，包括基于k/n方案的跨平台框架，实际运行速度比原生的ArkUI要慢的多，更无法与`uni-app x蒸汽模式`相比，

**重现方式：**

原生ArkUI的开源工程见[https://gitcode.com/dcloud/test4050-harmony-arkui](https://gitcode.com/dcloud/test4050-harmony-arkui)，开发者可以自行编译、测试数据，重现实验。

`uni-app x蒸汽模式`，演示包已上架鸿蒙应用商店，使用鸿蒙手机扫如下二维码，安装后进入右下角选项卡模板 -> view和text性能测试\
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)#{width=200px height=200px}

测试前建议重启手机，不启动其他应用，保持电量在90%进行对比测试。不要在运行模式下测性能，请发行为release包测试

- iOS平台

**测试设备：**

因iOS26和18的表现差异较大，故选用2台设备分别测试，iPhone SE2(iOS26.5)和iPhoneXR(iOS18.5)

|iPhoneXR(iOS18.5)	|渲染耗时ms	|
|--									|--					|
|原生UIKit						|339.7			|
|SwiftUI						|610.56			|
|uni-app x 蒸汽模式	|185.8			|

|iPhoneSE2(iOS26.5)	|渲染耗时ms	|
|--									|--					|
|原生UIKit						|329.4			|
|SwiftUI						|385				|
|uni-app x 蒸汽模式	|158.2			|

iOS原生自身的优化做的很好，都通过AOT编译为了机器码。SwiftUI是数据驱动的声明式框架，比UIKit慢是正常的。但uni-app x 作为数据驱动的响应式框架，做到了比原生UIKit更快数倍。

**视频体验：** 
- [原生UIKit与uni蒸汽4050真机对比视频](https://www.bilibili.com/video/BV1ApMt66Eez)。左边为`UIKit原生`，右边为`uni-app x 蒸汽模式`。
- [SwiftUI与uni蒸汽4050真机对比视频](https://www.bilibili.com/video/BV1LiGX6kEFA)。左边为`SwiftUI`，右边为`uni-app x 蒸汽模式`。

**测试结论：** 不同设备的差异倍数不同，以iPhone SE2(iOS26.5)为例，在创建view和text的速度对比中，`uni-app x蒸汽模式`比UIKit快2倍、比SwiftUI快2.43倍。
而iPhoneXR(iOS18.5)上，SwiftUI表现更差，速度比`uni-app x蒸汽模式`慢3.3倍。

**重现方式：**

原生iOS的开源工程见[https://gitcode.com/dcloud/test4050-ios](https://gitcode.com/dcloud/test4050-ios)，开发者可以自行编译、测试数据，重现实验。

`uni-app x蒸汽模式`，演示包已通过ABM方式上架Appstore，使用iOS手机扫如下二维码，登录DCloud账户，安装后进入右下角选项卡模板 -> view和text性能测试

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)#{width=200px height=200px}

测试前建议重启手机，不启动其他应用，保持电量在90%且不启用节电模式，也不需要开启性能模式（如有），然后进行对比测试。不要在运行模式下测性能，请发行为release包测试

- Android平台

**测试设备：** 小米Fold4

|小米Fold4									|5次平均耗时，括号中是明细		|内存增量	|
|--												|--													|--				|
|uni-app x蒸汽		|229.2(220 233 228 236 229)	|41,642		|
|uni-app x蒸汽 非拍平	|276.2(270 275 288 278 270)	|55,494		|
|原生 view							|461.8(456 456 462 465 470)	|78,760.8	|
|原生 compose					|625.8(645 623 593 656 612)	|124,145	|


**视频体验：** 
- [Android 原生View vs uni蒸汽 4050真机对比视频](https://www.bilibili.com/video/BV17VuG6sExP)。左边为`原生view`，右边为`uni-app x 蒸汽模式`。
- [Android Compose UI vs uni蒸汽 4050真机对比视频](https://www.bilibili.com/video/BV17VuG6sE3n)。左边为`原生view`，右边为`uni-app x 蒸汽模式`。

Android上数据有较多维度，有初次安装、闲时优化；uni-app x也有拍平和非拍平。但不管哪个维度，uni-app x 均比 Android 原生View和Compose UI快。

正常的uni-app x开发应当使用拍平，而手机用户日常使用的是闲时优化后的版本，在这个更为普适的维度上：
- **uni-app x 比 Android 原生View 快2倍**（461.8/229.2）
- **uni-app x 比 Android Compose UI 快2.73倍**（625.8/229.2）

**重现方式：**

- Android原生示例的源码：[https://gitcode.com/dcloud/test4050-android](https://gitcode.com/dcloud/test4050-android)。仓库下有编译好的apk可直接体验。
- uni-app x 的源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue)

`uni-app x 蒸汽模式`，可以在HBuilderX 5.23以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

也可以直接安装`hello uni-app x`示例应用：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)

安装 `hello uni-app x` 后，点击右下角模板 -> 顶部有 view和text性能测试。

测试前建议重启手机，不启动其他应用，保持电量在90%且不启用节电模式，也不需要开启性能模式（如有），然后进行对比测试。不要在运行模式下测性能，请发行为release包测试

Android的测试非常复杂，因为核调度策略、jit均不透明，很容易产生错误实验数据，如自行重现实验，务必查阅[Android的专业测试报告](./benchmark/vapor-benchmark-android.md)

#### 2. 死亡长列表性能测试@list

**实验说明：**

构造一个死亡长列表：4000行数据，7.4M的JSON，渲染2万个元素，占据普通手机1333屏左右。

每行超过40+元素，包括文字、图片、视频、vue组件；每行嵌套10+层。

列表中还有大量的阴影、圆角、边框等复杂渲染样式。

对于支持高刷的手机，鸿蒙/Android手机上在设置中搜索“刷新率”，打开强制120Hz体验。iOS没有设置方式，确保电量充足。

在120Hz高刷屏上，8.3ms内无法完成新列表项的加载，就会掉帧。列表越复杂，越难以在8.3ms内完成渲染。

**测试设备**

鸿蒙为nova12 api21，最大帧率120；

| nova12 api21			| 平均帧率	|
|---								|---:			|
| uni-app x蒸汽模式	|97.97		|
| ArkUI							|21.13		|

iOS选择了2台设备，一台为iPhone SE2(iOS26.5)，iPhone SE2不支持高刷，最大帧率为60。另一台iPhone16PM(iOS26.5)，支持120高刷。

| iPhone SE2 iOS26.5 无高刷| 平均帧率	|
|---								|---:			|
| uni-app x蒸汽模式	|49.6		|
| SwiftUI						|37.6		|

| iPhone16PM(iOS26.5) 高刷| 平均帧率	|
|---								|---:			|
| uni-app x蒸汽模式	|111		|
| SwiftUI						|49		|

Android设备为小米Fold4

| 小米Fold4			| 平均帧率	|
|---						|---:			|
| 原生View				| 45.35		|
| Compose UI		| 51.094	|
| uni-app x蒸汽	|	109			|

**真机视频对比：**

- [鸿蒙死亡长列表2台nova12真机对比视频](https://www.bilibili.com/video/BV1dpPQzAEYN)。左边是原生arkui，右边是`uni-app x蒸汽模式`。
- [iOS死亡长列表2台iPhone SE2真机对比视频](https://www.bilibili.com/video/BV19zMt6ZEv2)。左边是`uni-app x蒸汽模式`，右边是SwiftUI。
- [Android死亡长列表2台小米Fold4真机对比视频](https://www.bilibili.com/video/BV16MuG6ZEjz)。左边是原生RecyclerView，右边是`uni-app x蒸汽模式`。

**实验结论：**

- 鸿蒙平台死亡长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率是原生ArkUI的**4.64倍**（97.97/21.13）。
- iOS平台死亡长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率，在非高刷设备是原生SwiftUI的1.32倍，在高刷设备上是原生SwiftUI的**2.27倍**(111/49)。
- Android死亡长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率是 原生RecyclerView 的**2.4倍**（109/45.35），是 Compose UI 的 **2.13倍**（109/51.094）

由于使用复用技术，所有开发，瞬间进入页面。

上下手滑列表均不掉帧；但拖着滚动条极快滑动时，给长列表带来了巨大的压力，`uni-app x蒸汽模式`在任何情况下都不会出现白块灰块，但原生版的列表大段灰块。


**重现方式：**

- 鸿蒙原生ArkUI的开源工程见[https://gitcode.com/dcloud/HarmonyDeadlyList](https://gitcode.com/dcloud/HarmonyDeadlyList)，开发者可以自行编译、测试数据，重现实验。
- iOS原生SwiftUI的开源工程见[https://gitcode.com/dcloud/iOSDeadlyList-SwiftUI](https://gitcode.com/dcloud/iOSDeadlyList-SwiftUI)，开发者可以自行编译、测试数据，重现实验。
- Android原生的开源工程见[https://gitcode.com/dcloud/AndroidDeadlyList](https://gitcode.com/dcloud/AndroidDeadlyList)，开发者可以自行编译、测试数据，重现实验。目录下有编译好的apk可以直接安装体验。

`uni-app x蒸汽模式`，演示包已上架，手机扫如下二维码，安装后进入右下角选项卡模板 -> 死亡长列表

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)#{width=200px height=200px}

测试前建议重启手机，不启动其他应用，保持电量在90%且不启用节电模式，也不需要开启性能模式（如有），设备在设置中搜索刷新率，打开强制高刷，然后进行对比测试。不要在运行模式下测性能，请发行为release包测试

#### 3. rich-text 5万字长文多图页面@rich-text

rich-text组件是新闻、UGC内容的重要载体，在AI时代，markdown富文本，包括表格、代码高亮，更需要高性能的rich-text方案。

但在App平台过去一直没有好的解决方案。大多数开发者只能忍受webview初始化慢、内存占用高、快滑白屏等问题。

uni-app x 蒸汽模式 提供了应该是业内最好的rich-text组件。

由于原生没有相应方案，故无法对比原生。只能设计一个压力测试，测试uni-app x 蒸汽模式的rich-text组件在各平台的体验

用一个rich-text组件加载5万字长文，其中包括59张插图。可以看到：

- [鸿蒙nova12 rich-text真机录屏](https://www.bilibili.com/video/BV1RWPQzaE7o/)
- [iOS iPhone SE2 iOS26.5 rich-text真机录屏](https://www.bilibili.com/video/BV15zMt6fENa/)
- [Android小米Fold4 rich-text真机录屏](https://www.bilibili.com/video/BV134u26CE2s)
**注：iOS和鸿蒙录屏时帧率只能为60Hz，实际使用时是完整的120Hz**

1. 无等待进入页面
2. 上下快滑不掉帧、不白屏，都是瞬间渲染（初次联网加载图片的速度受网速影响，再次进入后使用本地缓存，速度会更快）
3. 点击图片预览，瞬间打开，自由缩放、切换，无任何等待。

体验入口：hello uni-app x 选项卡模板 -> rich-text 5万字性能测试。

#### 其他

除了上述3个性能考验项，DCloud还做了很多性能测试，
<!-- 
- slide组件：拖动100个slider，流畅丝滑

* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1RpPQzAE8V)
* [iOS真机录屏](https://www.bilibili.com/video/BV15rMt6tEW4)

- picker组件：加载省市区4000条数据。无等待弹出组件

* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1dpPQzAEGP)
* [iOS真机录屏](https://www.bilibili.com/video/BV19rMt6tE81) -->

- loading组件：屏幕上同时旋转100个loading不掉帧（录屏后从120掉帧到60）

* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1dpPQzAEGD)
* [iOS真机录屏](https://www.bilibili.com/video/BV1RBMt6bEvS)
* [Android真机录屏](https://www.bilibili.com/video/BV1ChuS6BEL2)

- canvas组件：屏幕上同时移动数万个小球不掉帧

* [Android真机录屏](https://www.bilibili.com/video/BV1Wyu26wEYH)
* [iOS真机录屏](https://www.bilibili.com/video/BV1RBMt6bEyx)
* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1X4PQz8Ert)

鸿蒙目前版本使用的是鸿蒙原生的canvas，还不能做到数万个小球的不掉帧，后续版本会把Android平台的canvas移植到鸿蒙上。

- 侧滑删除长列表

* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1X4PQz8EdB)
* [iOS真机录屏](https://www.bilibili.com/video/BV1AHMt63EoY)
* [Android真机录屏](https://www.bilibili.com/video/BV1pSuU6iEaK)

- ai chat的流式打字机

* [鸿蒙真机录屏](https://www.bilibili.com/video/BV1X4PQz8Ezy)
* [iOS真机录屏](https://www.bilibili.com/video/BV1PHMt63Ejy)
* [Android真机录屏](https://www.bilibili.com/video/BV1cRuU6AEwG)


更详细专业的benchmark报告：
- [Android benchmark](./benchmark/vapor-benchmark-android.md)
- [iOS benchmark](./benchmark/vapor-benchmark-ios.md)
- [鸿蒙benchmark](./benchmark/vapor-benchmark-harmony.md)

### 释疑@faq
关于uni-app x的蒸汽模式为什么这么快，很多人可能有疑问，比如

- uni-app x 的App平台到底是自渲染还是原生渲染？

答案是原生渲染。uni-app x 选择原生渲染是为了更好的和原生生态无缝融合、以及降低内存占用（无需2套渲染管线）。

- 为什么都是原生渲染，uni-app x的蒸汽模式比原生渲染更快？

这里面涉及数千项工程优化，举例一些：

1. Android的compose ui也是基于原生渲染管线的，但没有使用Android自带的view、textview，而是实现了自己的排版和组件系统。
	
	这条路可行，只不过compose ui没有成为一个好标杆，它实际渲染速度比view体系更慢。（在上述4050示例对比中，有原生view和compose ui的测试例，[详见](./benchmark/vapor-benchmark-android.md)）
	
	`uni-app x 蒸汽模式`，也几乎没有使用系统自带的排版和组件，不管是textView、recycleView、viewPage...，或者是鸿蒙的arkUI相关组件，基本都没用。全新研发的组件做到了性能更高。
	
2. 视图层代码，即vue里template和style里的代码，被直接编译为优化度非常高的机器码/字节码。它的运行速度远快于arkts、kotlin及k/n。
	
- 这些优化有没有副作用？

App平台因为要编译C代码，所以真机运行的编译速度变慢不少。

但从5.11起，新推出了字节码，来替代机器码模式。字节码模式大幅改善编译速度，且性能下降微乎其微。

所以从5.11起，可以理解为没有副作用了

- 基于原生渲染，是否涉及跨平台的不一致问题？

uni-app x 蒸汽模式只是使用了原生渲染管线，但几乎没有使用各平台的原生组件，基本都是使用跨平台的C++和uts自己编写的。因为是一套代码，所以可以很好的保持跨平台一致性。

之前 uni-app x VDOM模式时，不同平台的组件差异还较多，比如Android的list组件基于recycle-view，iOS的list基于UICollectionView，代码完全不同，细节和bug难免有差异。

但 uni-app x蒸汽模式中，list是基于c和uts一套代码实现的，逻辑上就高度统一。

- 基于原生渲染，又宣称比原生渲染快，岂不是互相矛盾？

需要严谨化名词，uni-app x 蒸汽模式，是基于原生渲染管线，渲染性能超过原生UI框架。\
原生渲染管线，和原生UI框架，这是2个概念。\
原生渲染管线，是一个应用启动后，OS一定会给应用分配的画布、合成机制、渲染线程资源、GPU上下文。\
而所谓自渲染，指的是新开一个独立画布，占用一大块新内存、内部有自己的小合成机制，然后再并入原生大合成里，自己创建渲染线程，自己创建独立的GPU上下文。Android上新开一个surface/textureView，鸿蒙上是新开XComponent。\
所以自渲染在启动和与原生view合成时性能不佳。\
那么基于原生渲染管线，可以有多套原生UI框架，Android上有 Android View 体系、Compose UI 体系。iOS有 UIView 体系、SwiftUI 体系。这些原生UI框架，都有自己的排版系统、组件库、命令式或声明式编写框架。\
uni-app x 做的，是在原生渲染管线上新增了一套原生UI框架，它有自己的排版布局系统和组件系统，这套系统的性能比上述OS自带的UI框架性能更高。\

- uni-app x 蒸汽模式为什么把页面驱动从强类型uts改成js了？反而还更快？

uni-app x 蒸汽模式渲染快的原因，不是语言，而是渲染引擎自身的优化。\
DCloud推出uts语言，是为了解决性能问题，主要是跨语言通信折损。\
其实 uni-app x 蒸汽模式最初立项时的方案也是uts语言。\
但蒸汽渲染引擎做好后，实测比原生快了数倍。这给我们很大的余地，让我们开始思考不靠强类型语言是不是仍然能做到比原生快。\
这耽误了些时间，也是Android版推出时间最晚的原因。\
最终在优化好跨语言通信后，把损耗影响控制在5%以内。\
在2、3倍的优势面前，5%的损耗几乎看不见，所以js驱动的蒸汽模式仍然比原生快2、3倍。\
考虑到js在AI熟悉度、易用性、生态丰富度、动态化、以及老uni用户的升级等方面的优势，调整为了js引擎驱动。\
同时VDOM模式的uts编写的页面，仍可以通过uts2js运行在蒸汽模式上，不会因此造成向下兼容问题。\
uni-app x 蒸汽模式也保留了uts插件中操作UI的能力。\

至于js和uts本身的执行速度，其实各有千秋。uts的优势主要是跨语言通信折损上。

- 蒸汽模式快是因为拍平吗？对于不能拍平的场景，uni-app x 会比原生慢吗？

uni-app x 蒸汽模式，在不拍平时一样是原生的数倍，注意仔细看前述测试数据表格中的“非拍平”数据。并且注意视频对比中，Android平台开启了显示布局边界后，每个格子外面都有框，这是未拍平的铁证。\
uni-app x 组件众多，支持拍平的仅view、text、image，其他组件如rich-text、canvas性能高更和拍平无关。

- 是否存在测试例定向优化？在其他测试例下其实uni-app x性能不如原生的情况？

再次强调 uni-app x 未对测试例做定向优化。\
	* 4050 view + text，是对 view 和 text这2个核心组件的性能极限测试。\
开发者可以不使用方格，可以使用任意其他方式来测试对比 uni-app x 和原生的view、text的性能，都能得出一样的结论。\
开发者还可以使用多种布局方式来对比测试，上面的测试例中Android使用的线性布局，开发者还可以使用约束布局等多种方式测试，uni-app x 蒸汽模式比原生快数倍的结论不会变。\
	* 死亡长列表，是对list组件的性能极限测试；5万字长图文是对rich-text的性能极限测试。\
开发者可以构造其他方式的长列表和长图文来做性能测试，一样会得出uni-app x 性能更好的结论。\
因为不是恰好这些测试例的写法中，uni-app x 表现更好。而是 uni-app x 的这些组件性能确实更好，怎么做极限测试都一样。

当然也不一定 uni-app x 的几十个组件，每个都比原生的性能高。DCloud只对高频和性能压力大的组件做了原生示例进行对比。

- 对比的测试例中，原生的写法是否没有极致优化？

如果原生不使用view、text这些组件，自己绘制、自己测量、自己排版，在某些测试例中可以定向优化。\
比如4050中假使把宽高定死，不走测量和排版，肯定比用view和text更快。当然实际4050例子中不是定宽高的，大小是由文字撑开的，这个测试例是故意要测排版和测量的性能的。\
如果原生写死宽高自绘，反而是原生为测试例更好看而搞的定向优化了。\
uni-app x 自然也可以跳过排版和测量自绘。但注意 uni-app x 中拍平，并不是跳过排版、测量的自绘，它仍然要走排版、测量和绘制。\
开发者需要使用的是框架和组件，在同一个层面对比。而不是原生中跳过排版和测量自绘，去和uni-app x 中使用组件来对比。\
其实不管是原生体系还是 uni-app x，本质都是在自绘的基础上提供一套优秀的排版测量系统、组件系统、事件分发系统。\
谁做的更好，要比的是这套系统。\
建议对此有怀疑的开发者，在使用原生组件和排版系统的基础上，任意写代码对比测试，看看怎么极致优化原生代码才能得出原生更快的结论，如果有成果，我们定然在官网公布。\

- uni-app x 的css是web的子集，是否够用？以及后续功能增加是否会导致性能一路下降到没有原生快？即 uni-app x 的快是否是因为没有原生的功能多？

uni-app x 的css支持度，和react native的Style支持度类似，都是web子集，都足够开发者写出想要的界面。\
未来确实有计划增加更多css能力，但都可以做到不用这些新能力时，老能力的渲染速度不会变。\
另外，DCloud 实验室内部还有非常多性能优化技术未进入产品化。目前已经够快了，所以这些技术的产品化工作的优先级放低了。uni-app x 未来只会更快，不会变慢。


注意：部分开发者在AI上询问 uni-app x 蒸汽模式为什么这么快，除了上面公开的这几点，AI输出的其他观点都是瞎猜。uni-app x 的技术路线是首创的，不存在于AI熟悉的现有技术栈中。

### 运行注意
- 运行默认是debug模式，性能较差。
	
	如测试性能，鸿蒙平台可以选择以release方式运行（在运行弹出的界面可以选择）。release方式运行接近正式打包后的性能，但仍然略微低于正式包。
	
	Android平台必须必须打release正式包才能测试性能。
	
- 蒸汽模式最低支持的OS版本比VDOM模式要高一些

	如果开发者的应用是面向普通用户的，那么蒸汽模式的最低版本要求不会影响业务推广。如果开发者的应用是专用工业设备，那么需核对设备的系统版本。
	
	* Android蒸汽模式要求Android6.0+。默认target为36。而之前vdom模式为Android5.0+，默认target为32。
		如果开发者使用了某些老旧的原生插件，不支持target36，会报错。此时需升级插件或在manifest中将Android平台的target降低。
	* iOS蒸汽模式要求iOS15+。
	* 鸿蒙要求 API 20+，即鸿蒙6.0+。可在manifest可视化界面鸿蒙配置中设置最低版本。低于目标版本会编译报错。
比如
```
The project's compatibleSdkVersion: 17 cannot be lower than the minimum compatible version 20 required by the dependencies: @dcloudio/uni-app-x-runtime.
```

- 反复差量编译，会打断鸿蒙deveco的Build流程，会出现偶发错误。
    使用机器码时，在deveco制作hap时，有新的差量编译任务进来后，有时候deveco可以正常重编；有时候会报如下错：
```
ninja: error: failed recompaction: Permission denied。
```
    此时需要重新运行一次。（ninja是deveco自带的c++编译器）

## 开发注意

对比非蒸汽，蒸汽模式有一些变更调整，说明如下：

### vue蒸汽模式自身变更

- **仅支持组合式，不支持选项式**

    选项式转组合式，AI可以帮忙。hello uni-app x里大量的选项式页面都是用uni-agent转成了组合式，以适配蒸汽模式。详见[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)
- 不再支持mixin

以上为vue框架自身的新版约束。

### css
- 变更：因为性能考虑，运行时不支持复杂关系选择器，只支持简单的class选择器和分组选择器 [详见](css/common/selector.md)

    替代方案：使用 BEM 命名规范, 通过类名表达层级关系, 例如：`.parent .child` 替换为 `.parent__child`。另外scss是编译时方案，不影响运行时性能，仍可使用。

- 变更：css的样式隔离策略，仅支持样式隔离策略2.0。它相对于1.0有较大调整 [详见](css/common/style-isolation.md)

    **组件默认不受外部css同名影响，不管是页面还是全局css，外部的同名class默认都不能影响组件样式。**

    如需受外部影响，组件可以在 `<script setup>` 中 defineOptions 中定义 styleIsolation，默认值为：isolated。可以改为  app 或 app-and-page。

### 组件
- 变更：不再支持uts兼容模式组件，仅支持uts标准模式组件，即使用native-view的开发方式。
- 变更：布尔属性规范化。scroll-view、swiper等部分组件布尔属性默认值从true改为false。
- 变更：list-view的变化和限制
    * list-view支持vue实例、dom的全面复用，进一步降低内存占用。不再需要之前模板示例中的复用长列表、分批加载长列表。
    * list-item的v-for必须要有:key，否则无法复用
    * list-view下仅第一个在list-item上的v-for且有:key属性，才支持复用。如果一个list-view下多组list-item各自有v-for，第2个起的v-for并不复用
    * list-item和list-view需要编写在同一个uvue文件内，否则list-item不会被复用。即，不要把list-item包装到另一个组件。
    * 符合条件能复用的list-item会当做真正的list-item，其他不符合复用条件的list-item都会被编译为view。
    * list-view不支持横向滚动
    * list-item宽度固定为100%，获取position时固定为absolute。
    * list-item不支持直接以文字节点作为子节点，必须使用text包裹文字内容。
    * list-item不支持设置margin
- 变更：swiper组件的变化
    * 可以通过indicator-class、indicator-active-class自定义默认指示器的样式
    * 可通过 `<template v-slot:indicator>` ，传入自定义的指示器
    * 支持3D轮播
    * swiper-item的position属性的值固定为absolute
    * swiper默认高度为150px。如需根据内容高度撑开，可使用auto-height属性。
- 新增：view、text、image这3个组件的flatten拍平属性

  拍平即不创建独立元素，而是绘制在父上。在审查元素边界时无法看到红框。

  `<view flatten></view>`

  该属性为初始化属性，不支持动态修改。

  被拍平的元素存在一些限制，因为本质上是把这拍平元素画在了它的父级上。限制具体如下：
  * 拍平的元素无法支持事件（如click、touch）
  * 拍平的元素不支持截图API：takeSnapshot
  * 拍平时如下css不支持：
    + 不支持 [visibility](css/visibility.md)
    + 不支持 [z-index](css/z-index.md)
    + 不支持 [background-image](css/background-image.md)、[background-clip](css/background-clip.md)
    + 不支持 [pointer-events](css/pointer-events.md)
    + [box-shadow](css/box-shadow.md) 不支持设置 inset 及 spreadRadius
    + [display](css/display.md) 为 fixed 时显示存在缺陷，无法覆盖其它非 fixed 的元素
    + [transition](css/transform.md) 动画不支持渲染相关（如background-color）的样式
  * image组件拍平后无法播放动画，gif、webp动画仅显示第一帧
  * view组件拍平后css属性transform、overflow、display、opacity存在缺陷，如果view存在子元素，这些样式不会对非拍平的子元素产生效果

  注意：当自定义组件的单根节点是（view、text、image）时，该自定义组件会自动支持flatten属性，并将其传递给它的单根节点，如果在不符合要求的自定义组件上使用flatten属性，则会被自动忽略。

#### 拍平（flatten）在鸿蒙平台注意事项
支持 flatten属性的组件（如 View、Text、Image）在逻辑上均可设置为 true 以进行“拍平”，但实际性能优化效果需满足以下条件：
`仅当存在至少两个相邻元素同时设置为拍平时，才能提升性能，否则可能导致性能下降。`

相邻元素包括：
- 兄弟节点
  不要求直接紧挨，例如父元素 P 下有 C1、C2、C3 三个子元素，只要其中任意两个或以上设置为拍平，即可带来性能提升。
- 父子节点
  要求直接紧邻，例如 P → C → G 三层结构中：
  + 对 P 和 C、C 和 G，或 P、C、G 同时拍平，可优化性能。
  + 若仅对 P 和 G 拍平（中间隔了 C），则无法优化。
- 混合情况
  只要存在至少两个相邻节点（父子或兄弟）同时拍平，即可获得性能优化。


### Element API
- TODO：缺少Drawable。dom2的view、text创建足够快且支持拍平，故优先级不高

    在蒸汽模式之前，为了高性能绘制，经常不能使用view和text组件，而是需要通过Drawable对象来绘制线条和文字，这种写法无法跨平台且复杂。\
    在蒸汽模式后，开发者可以正常使用view和text跨平台的开发，比如hello uni-app x的模板中的[日历示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/master/pages/template/calendar-vapor/calendar-vapor.uvue)，之前是Drawable绘制，现在都是拍平的text组件。

其他还有一些差异，见文档的兼容性说明。

## 使用uni-agent，从VDOM模式升级到蒸汽模式@vom2vapor

1. 在vdom模式下，要求uni-agent把复杂的组合选择器，改成 简单的class选择器或分组选择器，确认是否正常
2. 在vdom模式下，打开manifest.json中的样式隔离策略2.0，把[文档](css/common/style-isolation.md)贴给ai，要求ai改造，确认是否正常。如涉及三方组件，核对三方组件的新版是否支持样式隔离策略2.0，尽量选择支持该策略的组件。官方的 [uni ui x](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/) 是支持的。
3. 由于改用js驱动，Android的uvue页面中，不能直接调用原生API，相关调用需挪到uts插件中，包括utsAndroid，在uvue页面下将不可用。让uni-agent协助完成改造。
4. 要求uni-agent把项目中的选项式代码翻译为组合式代码。
5. 项目在manifest中切换为蒸汽模式，把上一个章节 `开发注意`文档内容贴给ai，检查是否正常

注意，如果项目之前是选项式，使用过早期的hello uni-app x或uni-id-pages里的废弃组件，需要更换为新写法：
- uni-loading，改用内置组件[loading](./component/loading.md)
- uni-popup，改用内置组件[page-container](./component/page-container.md)

如果想从uni-app升级到uni-app x的蒸汽模式，[另见](./uniapptox.md)

## 视图层编译目标 @vapor-render-target

uni-app x 是逻辑层和视图层分离，逻辑层即script内，是uts/js。视图层是`template`和`style`区域。

App平台的蒸汽模式下，视图层有较大的变化。

VDOM模式的视图层是编译为uts/js代码，然后驱动原生渲染。

而蒸汽模式的视图层，把`template`和`style`直接编译为底层c代码对应的机器码/字节码。

根据编译目标不同，App平台的视图层产物分为字节码和机器码两种模式。

### 机器码

机器码模式，是把`template`和`style`编译为优化度非常高的C代码，再经平台编译器编译为机器码运行。

优点：
- 渲染性能高一点点。

缺点：
- 编译速度比字节码模式慢非常多，因为需要编译C代码。大型工程的c++编译是非常非常慢的。
- 开发阶段的差量编译体验差。
- iOS只能在mac电脑上开发。

### 字节码

为了平衡机器码的性能和开发易用性。从5.11起新增了字节码编译模式。字节码也是二进制格式。

优点：
- 编译速度更快。
- 开发阶段支持差量更新。
- 发行后支持 wgt 热更新。（暂未上线）

缺点：
- 渲染性能低于机器码3%左右。由于蒸汽模式比原生快了数倍，所以字节码虽比机器码慢了一点点，但仍快过原生数倍。

正常情况下，使用字节码即可。

因为最初在5.0版上线鸿蒙蒸汽模式时只有机器码，所以目前在鸿蒙上是提供了字节码或机器码2个选项。

而在后续上线iOS和Android蒸汽模式时，只提供了字节码选项。实测机器码会造成云打包非常非常慢，暂不计划开放。
