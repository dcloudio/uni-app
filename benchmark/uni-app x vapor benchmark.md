Benchmark

## 背景
`uni-app x 蒸汽模式`，是DCloud于2026年推出的跨平台开发框架新版本。

该产品的特点是：**比原生更快**。

本基准测试的目标，即为了真实呈现主要性能指标，并确保开发者可自行重现本基准测试，并得出相近结论。

先简要介绍 `uni-app x` 及 蒸汽模式
- uni-app x 使用vue语法，并在蒸汽模式中去除了虚拟DOM
- 蒸汽模式中，模板和样式编译为c或c++代码（在Android也会编译出部分kotlin代码），script仍然为uts语言
- uni-app x 基于原生渲染管线，可融合原生组件生态，并占用更小的内存
- 蒸汽模式提供了大量自研高性能组件，如view、text、image、list、rich-text、swiper、slider、picker等

**测试指标**

UI系统的核心性能指标是：**渲染速度和帧率**。

追求渲染速度更快、掉帧更少。

人工体感可以录像，但测试指标必须可精准度量，需要准确的度量方案。

## 环境声明

目前 `uni-app x 蒸汽模式`，仅在鸿蒙平台公开发布，本测试报告仅包含鸿蒙设备的测试。

本Benchmark使用了2台鸿蒙系统在售的最低端机型 nove 12，具体信息如下：

- 设备型号：nova 12 （不是pro） 运行内存8G
- OS版本：6.0.0.130（截止测试时间的最新版OS，patch02）
- 全部使用release方式运行
- 电量90%左右，未开启节能模式。该设备仅支持普通模式和节能模式
- 屏幕的刷新率设置为高，即120hz
- 测试前所有设备重启，并静置2分钟。除关于本机的界面外，杀掉所有其他App的进程

## view和text渲染速度测试

view和text是渲染引擎的核心基础，大量组件基于这2个基础组件构建。这2个基础组件的渲染速度是一套渲染引擎最核心的性能指标。

验证一个view和text创建速度是否足够快，可靠的方式是在同一个屏幕内创建大量view和text组件，计算耗时。

### 测试方法

点击按钮后，在屏幕上创建2000个view，每个view有一个背景色，每个view中再套入一个text组件。

2000个view需在同一屏幕区显示，view不设宽高，text字体较小。view们被分为50行，每行40个view，同时每行外层再套一个view。

即，一共4050的元素，其中2050个view和2000个text。

对比使用 `uni-app x 蒸汽模式`和`arkUI原生`，进行创建速度的测试。

首先看录屏对比。
左边为`arkUI原生`，右边为`uni-app x 蒸汽模式`。

https://github.com/user-attachments/assets/b5bd46c2-50de-48b9-b0e3-9367a9d3e594

界面中弹出的toast显示了耗时，单位为ms。`arkUI`为804ms、`uni-app x蒸汽模式`为267ms。计时说明：
- 开始时间为按钮的click事件触发时间
- 结束时间为主线程渲染指令已全部送达OS渲染进程时间。此时主线程已经完成本次渲染所需的工作，处于空闲状态。

该结束时间并非肉眼所见的屏幕显示时间，实际上渲染进程和GPU仍需一定时间工作才能让屏幕显示图像，但后续时间段无法通过编程打点计时。

经过录屏和计时的粗略对比，发现`arkUI`和`uni-app x 蒸汽模式`在渲染进程和GPU的耗时接近，都在1帧左右，故在后续精准比较中忽略这段时间，保留目前的结束时间定义。

该实验重复5次。每次均杀掉应用进程重新进入，精准计算的耗时如下：
|arkUI|uni-app x蒸汽模式	|
|--		|--								|
|791	|243	|
|805	|244	|
|811	|244	|
|771	|243	|
|810	|242	|

平均值：
|arkUI|uni-app x蒸汽模式	|
|--		|--								|
|797.6|243.2						|

以上数据单位均为ms。

### 测试结论
结论：在4050 view和text同屏渲染测试中，`uni-app x 蒸汽模式`的渲染速度是 arkUI **3.3倍**。


### 复现工程源码和体验方式

上述2个示例，源码如下：

- 鸿蒙的arkUI源码：[https://gitcode.com/dcloud/test4050-harmony-arkui](https://gitcode.com/dcloud/test4050-harmony-arkui)
- uni-app x的源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue)

arkUI版本，需要自行编译原始工程。

`uni-app x 蒸汽模式`，可以在HBuilderX 5.0以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

且`hello uni-app x`示例应用已经在鸿蒙应用商店上架，可以搜索“DCloud开发者中心系统”，或使用鸿蒙手机扫描下方二维码：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)

安装 `hello uni-app x` 后，点击右下角模板 -> 顶部有 view和text性能测试。

`uni-app x` 作为通用引擎，未对该示例做任何定制优化，没有诸如预加载、预测量等影响实验结果的行为。


## 长列表掉帧测试

list组件的地位，在渲染引擎中仅次于view和text。

现代渲染引擎，都采用复用技术实现长列表，确保持续滑动长列表后，内存没有持续增长。

使用复用技术的长列表进入速度都很快，因为只加载了一部分数据，但在滚动过程中持续加载数据并复用已存在视图时，如果列表复杂，会发生滚动掉帧。

### 测试方法

设计一个非常复杂的“死亡长列表”：
- 加载4000行数据，7.4M的JSON
- 每行超过40+元素，包括文字、图片、视频、自定义vue组件
- 每行嵌套10+层
- 渲染2万个元素，占据普通手机1333屏左右
- 列表中还有大量的阴影、圆角、边框等复杂渲染样式

在人工体验中，用户可以体验加载速度、快速滑动时的流畅度，但在严谨的Benchmark中，需要精准的对比数据。

首先需要制作一个fps组件，监听系统的帧回调，在120Hz高刷屏上，每8.33ms会触发一次帧回调。如果2个帧回调的代码响应时长超过了8.33ms，就意味着掉帧。

该fps组件需要使用同样的逻辑分别实现arkUI版本和`uni-app x`版本。源码见后续 复现工程 章节。

同时死亡长列表的代码，也需要在arkUI和`uni-app x`中使用相同逻辑实现。

arkUI中使用lazy foreach，`uni-app x`中使用list-view。

在2端分别进入长列表，滚动到底部，加载完4000行数据，然后点击鸿蒙手机的顶部状态栏，此时会滚动回到列表顶部。

2端回滚速度一样，均为1秒，在这个回滚到顶部的过程中，计算帧率，验证掉帧情况。同时从录像视觉上进行直观感受。

首先看录屏对比。
左边为`arkUI原生`，右边为`uni-app x蒸汽模式`。

https://github.com/user-attachments/assets/07d840c0-7f79-49d0-a235-ff2ffbc698c8


视觉体验中可看出，arkUI的fps组件数字在1秒的动画期间更低，在回滚过程中很多视频呈现黑块。

该实验重复5次，每次均杀掉应用重新进入，重新滚动到顶部。

5次的测试数据如下：
- arkUI:
	* 回滚过程中的平均FPS: 19.67, 最高FPS: 49, 最低FPS: 13
	* 回滚过程中的平均FPS: 24.14, 最高FPS: 61, 最低FPS: 15
	* 回滚过程中的平均FPS: 19.50, 最高FPS: 43, 最低FPS: 13
	* 回滚过程中的平均FPS: 20.67, 最高FPS: 53, 最低FPS: 13
	* 回滚过程中的平均FPS: 21.67, 最高FPS: 56, 最低FPS: 13

- uni-app-x 蒸汽模式: 
	* 回滚过程中的平均FPS: 78.29, 最高FPS: 100, 最低FPS: 52 
	* 回滚过程中的平均FPS: 112.30, 最高FPS: 120, 最低FPS: 90 
	* 回滚过程中的平均FPS: 106.33, 最高FPS: 120, 最低FPS: 45 
	* 回滚过程中的平均FPS: 88.43, 最高FPS: 120, 最低FPS: 29 
	* 回滚过程中的平均FPS: 104.50, 最高FPS: 120, 最低FPS: 55 

arkUI的5次平均fps为 21.13，最高fps为61，最低fps为13。

`uni-app x蒸汽模式`的5次平均fps为 97.97，最高fps为120，最低为29。

### 测试结论

结论：在长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率是 arkUI **4.6倍**。

实测发现arkUI版本的长列表中的video，无法记忆video的播放进度，即播放A视频到5s时，滚动到其他地方，然后再滚回来显示A视频，A视频会重头播放。

但`uni-app x`的版本记忆了播放进度。除了功能的不同外，此差异也需要考虑到帧率对比中，记忆播放进度本身也耗费时间，也就是如果uni-app x取消记忆播放进度，帧率还能再提升。

### 复现工程源码和体验方式

上述2个示例，源码如下：

- 鸿蒙的arkUI版源码：[https://gitcode.com/dcloud/HarmonyDeadlyList](https://gitcode.com/dcloud/HarmonyDeadlyList)
- uni-app x版源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue)

arkUI版本，需要自行编译原始工程。

`uni-app x蒸汽模式`，可以在HBuilderX 5.0以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

且`hello uni-app x`示例应用已经在鸿蒙应用商店上架，可以搜索“DCloud开发者中心系统”，或使用鸿蒙手机扫描下方二维码：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)

安装`hello uni-app x`后，点击右下角模板 -> 顶部有 死亡长列表。

`uni-app x`作为通用引擎，未对该示例做任何定制优化，没有诸如预加载、预测量等影响实验结果的行为。

此示例中7M多的4000行数据并非静态数据存在本地，而是由代码生成的数据，生成数据的代码是预执行的，在arkUI版和`uni-app x`版均如此。

## 其他组件

一套渲染引擎，除了view、text、list外，还需要更多高性能的组件。

`uni-app x`中对各种组件都做了极限性能测试，但受限于精力，未对arkUI组件全面做性能对比测试。

开发者可以在 `hello uni-app x` 中体验各种组件的性能测试，几乎每个组件的示例中，都单独提供了 组件性能测试。

- rich-text组件：App平台的rich-text过去一直没有太好的解决方案。鸿蒙自身的richText组件也是基于webview渲染的，存在加载慢、内存占用高、快滑白屏等问题。uni-app x 蒸汽模式 提供更快的rich-text组件。以下测试，加载5万字长文、59张插图。可以看到无等待进入页面。上下快滑不掉帧、除了联网图片加载外滑不出白屏。

https://github.com/user-attachments/assets/9d6e7e3e-b23c-4264-bd2d-006a291a1e74

**注：录屏时帧率只能为60Hz，实际使用时是完整的120Hz。下同**

- swiper组件：加载100个item。无等待进入页面。在上述5万字长文中点击图片，可以看到swiper中无等待呈现59张图片，左右切换图片无延迟

- picker组件：加载省市区4000条数据。无等待弹出组件

https://github.com/user-attachments/assets/ad96de37-3665-41b6-b005-bd271e6fe3c1

- slide组件：拖动100个slider，流畅丝滑

https://github.com/user-attachments/assets/2d3cbbe5-b5f6-4774-800e-c1260a0d2777

- loading组件：屏幕上同时旋转100个loading不掉帧（录屏后从120掉帧到60）

https://github.com/user-attachments/assets/262f9113-8616-455b-a863-d78c7006c74a

- canvas组件：屏幕上同时移动数百个小球不掉帧

https://github.com/user-attachments/assets/d9944f9a-07f3-4466-9098-5e7e191430bc

- 众多表单组件均有100或200个创建速度测试监控。hello uni-app x 模板中还提供了日历、竖滑视频、侧滑删除长列表、ai chat的流式打字机等性能考验示例

https://github.com/user-attachments/assets/b324a313-d6d0-46ad-8bff-54bd144b5677

https://github.com/user-attachments/assets/a8c5ca1c-0734-47b2-9901-e2a0f31ebbca

在ai时代，很多App都需要内嵌一个开源的AI对话聊天库，能流式解析markdown，解析过程不掉帧。为此DCloud推出开源的uni-ai x，详见[https://ext.dcloud.net.cn/plugin?id=23902](https://ext.dcloud.net.cn/plugin?id=23902)

没有用户喜欢等待、没有用户喜欢卡顿掉帧。

从2007年iPhone发布后，全世界手机用户每天都要为每次页面转场等待300ms。但`hello uni-app x`的蒸汽模式中已默认改为150ms，这150ms更多是留给网络。

如果开发者使用h3等新兴网络技术，优化好服务器速度，还可以把等待时间缩的更短。

## FAQ
### uni-app x 的App平台到底是自渲染还是原生渲染？

是原生渲染。准确的讲，是在原生渲染管线上自己做几乎所有组件。

如果使用xComponent自渲染，会因为2条渲染管线并存额外消耗硬件资源。

并且鸿蒙有很多原生组件，比如权限按钮、map地图以及三方生态中大量arkUI原生组件，自渲染方案在与原生生态融合时问题较多。两条渲染管线的滚动同步、资源消耗均导致这一路线不是最佳方案。

站在宏观视角，在原生渲染管线中优化，提供更快的核心组件，兼容所有原生组件，比自立一套组件生态对产业更有意义。

### 为什么都是原生渲染，uni-app x的蒸汽模式比原生渲染更快？
这里面涉及数千项工程优化，举例一些：

1. Android的compose ui也是基于原生渲染管线的，但没有使用Android自带的view、textview，而是实现了自己的组件系统。
	
	这条路可行，只不过compose ui没有成为一个好标杆，它实际渲染速度比view体系更慢。（在上述4050示例对比中，有原生view和compose ui的测试例，[详见](https://gitcode.com/dcloud/test4050-android)）
	
	`uni-app x 蒸汽模式`，也几乎没有使用系统自带的组件，不管是textView、recycleView、viewPage...，或者是鸿蒙的arkUI相关组件，基本都没用。全新研发的组件做到了性能更高。
	
2. vue里template和style里的代码，被直接编译为优化度非常高的C代码。它的运行速度远快于arkts、kotlin及k/n。
	
	当然它的副作用就是编译速度很慢，开发C的工程师应该知道编译大型C工程是一件耗时工作。
	
	后续DCloud也会提供开发期间的热刷新方案。

### 在uni-app x的示例中发现了拍平。如果不拍平的话，uni-app x蒸汽模式中渲染速度还会比原生快吗？
如果不拍平的话，同屏创建4050个view和text的示例的平均耗时为467ms。仍远快于arkUI的797.6ms。

### k/n驱动c层渲染，是否也快过arkUI或uni-app x蒸汽模式？
截止到目前（2026年2月初），基于k/n的开源跨平台框架，在上述基准测试中的表现均比arkUI差很多。更无法与`uni-app x蒸汽模式`相比。

### uni-app x蒸汽模式在Android和iOS是否也快过原生？
`uni-app x蒸汽模式`的iOS版和Android版的渲染引擎已开发完毕，但产品化还有一些工作要做。预计分别在2026年Q1和Q2发布。

不管在iOS还是Android，均比原生快2~3倍，均基于原生渲染管线。

已公开如下预览版对比测试例：

* Android平台的uni-app x 蒸汽模式的4050同屏创建示例apk：[https://gitcode.com/dcloud/test4050-uni-app-x-vapor](https://gitcode.com/dcloud/test4050-uni-app-x-vapor)，安装其中apk即可体验。
* Android平台的原生view，以及compose ui的与源码 [https://gitcode.com/dcloud/test4050-android](https://gitcode.com/dcloud/test4050-android)

上述示例在华为mate30 Android版上，对比数据如下：
|										|5次冷启动平均耗时（单位:ms）	|
|--									|--													|
|原生view						|436												|
|原生compose	ui			|673.2											|
|原生compose ui aot	|544.2											|
|uni-app x 蒸汽模式	|224												|


也就是`uni-app x蒸汽模式`，作为跨平台开发框架，实现了业内期盼已久的梦想：**即跨平台，又比原生性能更高**。






