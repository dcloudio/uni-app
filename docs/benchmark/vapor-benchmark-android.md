Android Benchmark

## 背景
`uni-app x 蒸汽模式`，是DCloud于2026年推出的新一代跨平台开发框架。

该产品的特点是：**渲染比原生更快**。

跨平台能做到比原生快，js驱动的跨平台框架能做到比kt/java快。这些信息是违反普遍认知的。所以一份严谨、客观的评测报告非常重要。

本基准测试的目标，即为了真实、全面的呈现主要性能指标，并确保开发者可自行重现本基准测试，并得出相近结论。

先简要介绍 `uni-app x` 及 蒸汽模式
- uni-app x 使用vue语法，并在蒸汽模式中去除了虚拟DOM
- uni-app x 在蒸汽模式中启动了全新的渲染引擎，页面中模板和样式编译为字节码/机器码，script支持js/ts/uts，不强制要求强类型。
- uni-app x 基于原生渲染管线，可融合原生组件生态，并占用更小的内存
- 蒸汽模式提供了大量自研高性能组件，如view、text、image、list-view、rich-text、canvas、swiper、slider、picker等

本报告为Android平台的性能评测。

iOS评测报告[另见](./vapor-benchmark-ios.md)，鸿蒙评测报告[另见](./vapor-benchmark-harmony.md)。

**测试指标**

UI系统的核心性能指标有3个：**渲染速度、帧率、内存占用**。

渲染速度更快，则等待感更少；掉帧更少，即更加丝滑；内存占用更低，则手机整体更流畅。

人工体感可以录像，但测试指标必须可精准度量，需要准确的度量方案。

## 环境声明

Android平台，由于自由度较高，很容易通过各种黑科技制造不公正的评测报告，所以Android平台的评测报告篇幅会比鸿蒙、iOS长很多，用于描述如何在实验中公平的设定测试环境。

本Benchmark使用了2台小米Fold4，具体信息如下：

- 设备型号：小米Fold4
	设备处理器: 骁龙 8 Gen 3。8核
	- 超大核: 3.30 GHz × 1
	- 普大核: 3.15 GHz × 3 + 2.96 GHz × 2
	- 小核: 2.27 GHz × 2

	该设备为2024年旗舰机，但Android的节电策略较为激进，超大核很难激活，当测试时代码被运行在普大核上时，与普通中端机速度无异。

- OS版本：Android 16。
- 电量90%以上，未开启节能模式、未开启性能模式。
- 屏幕的刷新率设置为高，即120。
- 关闭所有应用的自启动，包括微信。测试前所有设备重启，并静置2分钟。测试时除关于本机的界面和测试应用，杀掉所有其他App的进程。
- 全程监控设备温度，发热时停止测试，避免系统降频。
- 设备均未root

除了测试设备干净，应用也不能使用作弊手段。

- apk全部使用release方式运行
- 应用包名均为普通包名，不冒名大厂和专业性能测试应用的app包名，不包含benchmark的字样
- 应用层面不使用强制提升至超大核等手段。并在实验中观测 Perfetto CPU调度，确保都在普大核上运行。如果被系统调度到了其他核，则本次实验数据作废。
- 由于Compose UI默认自带框架的baseline优化，这符合大多数用户的实际场景，所以uni-app x的框架部分也包含了baseline优化。但不管是Compose UI还是uni-app x，均只对框架进行baseline优化，应用代码均不开启baseline优化。
- 不预载，不预触发jit
- 测试数据分apk初次安装和闲时优化，2批数据各自独立比较。
	
	闲时优化状态是大多数Android用户的使用场景。Android系统会在app安装后、手机充电空闲时，在背后默默进行机器码编译优化。
- 测试掉帧时，同时打开开发者选项的显示屏幕帧率并打开HWUI呈现模式分析的条形图


## view和text渲染速度测试

view和text是渲染引擎的核心基础，大量组件基于这2个基础组件构建。这2个基础组件的渲染速度是一套渲染引擎最核心的性能指标。

验证一个view和text创建速度是否足够快，可靠的方式是在同一个屏幕内创建大量view和text组件，计算耗时。

### 测试方法

点击按钮后，在屏幕上创建2000个view，每个view有一个背景色，每个view中再套入一个text组件。

2000个view需在同一屏幕区显示，不显示在屏幕外、不使用滚动区，避免分批加载优化的影响。

view不设宽高，text字体较小。view们被分为50行，每行40个view，同时每行外层再套一个view。

即，一共4050的元素，其中2050个view和2000个text。

对比使用 `uni-app x 蒸汽模式`和`Android原生View`、`Android Compose UI`，进行创建速度的测试。

首先看录屏对比。

1. 左边为`Android原生View`，右边为`uni-app x 蒸汽模式`。

点击链接：[4050对比视频](https://www.bilibili.com/video/BV17VuG6sExP)

界面中弹出的toast显示了耗时，单位为ms。`Android原生View`为505ms、`uni-app x蒸汽模式`为273ms。计时说明：
- 开始时间为按钮的click事件触发时间
- 结束时间为主线程渲染指令已全部送达OS渲染进程时间。此时主线程已经完成本次渲染所需的工作，处于空闲状态。

该结束时间并非肉眼所见的屏幕显示时间，实际上渲染进程和GPU仍需1帧左右时间才能让屏幕显示图像，但后续时间段无法通过编程打点计时，可以忽略。

2. 左边为`Android原生View`，右边为`uni-app x 蒸汽模式非拍平`

点击链接：[4050对比视频](https://www.bilibili.com/video/BV1qVuG6sE87)

有开发者担心不拍平时 uni-app x 是不是会比原生慢？以上视频可见，`Android原生View`为804ms、`uni-app x蒸汽模式不拍平`为267ms。

在开发者选项中，可以把显示布局边界设在下拉窗的快捷方式中，在视频中可以看出显示布局边界后，确实创建了4050个真实元素，没有拍平。

3. 左边为`Compose UI`，右边为`uni-app x 蒸汽模式`

点击链接：[4050对比视频](https://www.bilibili.com/video/BV17VuG6sE3n)

Compose UI 与 uni-app x 同为声明式写法，但性能最差。以上视频可见，`Compose UI`为804ms、`uni-app x蒸汽模式`为267ms。

#### 初次安装的性能对比

首先测试初次安装。电脑端提前下载好 hello uni-app x 和 原生的4050示例应用。

- hello uni-app x下载地址：[http://hellouniappx.dcloud.net.cn](http://hellouniappx.dcloud.net.cn)
- 原生4050示例应用下载地址：[https://gitcode.com/dcloud/test4050-android](https://gitcode.com/dcloud/test4050-android)。该git仓库中的 nativeApp-release.apk 为编译好的apk。

hello uni-app x 中包括拍平和非拍平2部分数据。原生示例中包括 view 和 Compose UI 这2种渲染写法。

在设备重启后，不启动任何软件，首先通过ADB安装 hello uni-app x 到手机上。

启动 hello uni-app x ，进入模板tab - view和text性能测试，

1. 首先测试拍平的耗时数据，点击显示按钮，观测渲染耗时。

该实验重复5次。每次均杀掉应用进程重新进入。杀进程重测，是为了避免jit优化引发的干扰。

5次耗时：287 273 276 276 280。均值：278.4ms。

2. 然后测试非拍平的数据，该实验重复5次。每次均杀掉应用进程重新进入。

5次耗时：316 325 320 324 360。均值：329ms。

3. 然后重启手机，不启动任何软件，通过ADB安装 原生4050示例 到手机上。

启动原生4050示例，首先测试 view耗时。该实验重复5次。每次均杀掉应用进程重新进入。

5次耗时：460 480 466 505 508。均值：483.8ms。

然后启动原生4050示例，测试 Compose UI 耗时。该实验重复5次。每次均杀掉应用进程重新进入。

5次耗时：706 628 639 616 631。均值：644ms。

再次重申，以上测试过程中，
- 如遇到电量低于90%，停止测试，充电恢复电量后再测。
- 如遇手机发烫，停止测试，恢复常温后再测。
- 观测Perfetto数据，被OS偶发调度到超大核而导致变快的数据，一律剔除。

如下为Perfetto的截图，cpu7即为超大核，可以看出超大核基本没有工作，这种数据才可以使用。

![](static/4050-hello-flatten-optimized-device1-r1.png)

一旦超大核被调用，uni-app x 的数据会在几十ms，原生会在100多ms。但这种情况不稳定，不适合作为严谨的benchmark来比较。

总结，初次安装性能对比汇总表格如下：

|技术方案							|5次平均耗时	|内存增量	|
|--										|--					|--				|
|uni-app x蒸汽 拍平		|278.4			|48,868	|
|uni-app x蒸汽 非拍平	|329				|59,588	|
|原生 view							|483.8			|78,676	|
|原生 compose					|644				|123,693	|

以上数据单位均为ms。

内存增量，指渲染4050个view+text完成后的adb显示的应用内存 减去 渲染前adb显示的应用内存 的差额。它代表渲染了这些元素后应用内存增加了多少。

#### 闲时优化后的性能对比

Android手机，在应用安装并使用过后，系统会追踪热点代码、生成profile文件，并根据profile文件进行预编译机器码优化。

一般是晚上手机充电时，对应用进行AOT预编译优化。所以很多应用在第二天使用时会感觉更快一点。

这是手机用户的常态使用场景，所以必须测试在这种情况下的性能对比。

但测试中，并不需要等待第二天。为了精准测试，也不需要依赖profile文件，可以通过如下命令手动触发AOT预编译：

```powershell
adb shell cmd package compile -m speed -f io.dcloud.hellouniappx
adb shell cmd package compile -m speed -f io.dcloud.test4050
```

上述adb命令，分别对 uni-app x 蒸汽模式 和 原生应用进行优化。
然后重启手机再次测试。测试注意事项与上一步相同，都要监控电量、发烫、Perfetto数据。

总结，闲时优化后性能对比汇总表格如下：

|技术方案									|5次平均耗时，括号中是明细		|内存增量	|
|--												|--													|--				|
|uni-app x蒸汽 拍平 aot		|229.2(220 233 228 236 229)	|41,642		|
|uni-app x蒸汽 非拍平 aot	|276.2(270 275 288 278 270)	|55,494		|
|原生 view aot							|461.8(456 456 462 465 470)	|78,760.8	|
|原生 compose aot					|625.8(645 623 593 656 612)	|124,145	|


### 测试结论

以上数据有较多维度，有初次安装、闲时优化；uni-app x也有拍平和非拍平。但不管哪个维度，uni-app x 均比 Android 原生View和Compose UI快。

正常的uni-app x开发应当使用拍平，而手机用户日常使用的是闲时优化后的版本，在这个更为普适的维度上：
- **uni-app x 比 Android 原生View 快2倍**（461.8/229.2）
- **uni-app x 比 Android Compose UI 快2.73倍**（625.8/229.2）

### 复现工程源码和体验方式

上述2个示例，源码如下：

- Android原生示例的源码：[https://gitcode.com/dcloud/test4050-android](https://gitcode.com/dcloud/test4050-android)。仓库下有编译好的apk可直接体验。
- uni-app x 的源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue)

`uni-app x 蒸汽模式`，可以在HBuilderX 5.23以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

也可以直接安装`hello uni-app x`示例应用：
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
- 一共渲染2万个元素，占据普通手机1333屏左右
- 列表中还有大量的阴影、圆角、边框等复杂渲染样式

在Android平台，可以通过打开开发者工具的HWUI呈现模式条形图，直观的看到掉帧情况。
并通过adb命令获取到帧率。

死亡长列表的代码，也需要在Android view 和 Compose UI中使用相同逻辑实现，Android view 使用 RecyclerView 实现。Compose UI 使用 Lazy 系列组件。

确保手机打开了120高刷。在2个设备分别进入长列表，按住右侧滑块上下拖动，快速的到达列表底部再返回顶部。

首先看录屏对比。
左边为`Android原生`，右边为`uni-app x蒸汽模式`。

- 点击链接：[死亡长列表Android原生RecyclerView vs uni蒸汽](https://www.bilibili.com/video/BV16MuG6ZEjz)
- 点击链接：[死亡长列表Android Compose UI vs uni蒸汽](https://www.bilibili.com/video/BV1nMuG6fEcv)

视觉体验中可明显看出，
1. 原生view 和 Compose UI，滚动过程中条形图已经高的占据大半屏幕，几乎帧帧都大幅掉帧。而 uni-app x 蒸汽模式 的长列表则平稳，大部分帧都在8.3ms内绘制完成。
2. 原生view 和 Compose UI，滚动过程中大量灰块，图片视频无法都显示。而 uni-app x 蒸汽模式 的长列表可以正常显示图片和视频封面。

虽然肉眼已经可见明显差距，仍需要数据的数据来衡量差距是多少倍。

测试时关闭HWUI呈现模式条形图，通过adb提取滚动期间的平均帧率数据，避开首尾。

每次测试后杀进程，重启App再进行下一轮测试。

5次测试后再取一次均值。

我们同样区分首次安装和闲时优化2组数据。

### 首次安装数据
| 技术方案						| 平均帧率																	|
|---								|---:																			|
| 原生View						| 42.148(43.1 41.93 41.29 42.58 41.84)		|
| Compose UI				| 50.674(48.89 53.91 52.71 50.4 47.46)		|
| uni-app x蒸汽			|	101.7(102.37 107.71 102.67 93.46 102.61)|

### 闲时优化后数据

原生死亡长列表的aot优化命令是：
```adb shell cmd package compile -m speed -f com.example.androiddeadlylist```

| 技术方案						| 平均帧率																	|
|---								|---:																			|
| 原生View	 aot			| 45.35(44.97 44.31 45.53 44.51 43.9)			|
| Compose UI aot		| 51.094(49.96 52.2 48.93 51.68 52.7)			|
| uni-app x蒸汽 aot	|	109(112.33 110.89 106.7 108.69 106.43)	|

在这个场景下，闲时优化的效果不明显，主要原因是Android系统的jit优化。在拖动开始几百ms后，系统已经认为这段代码属于热点代码，进行了jit编译优化。

### 测试结论

结论：在长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率是 原生View 的**2.4倍**（109/45.35），是 Compose UI 的 **2.13倍**（109/51.094）

### 复现工程源码和体验方式

上述2个示例，源码如下：

- 原生版死亡长列表源码：[https://gitcode.com/dcloud/AndroidDeadlyList](https://gitcode.com/dcloud/AndroidDeadlyList)。仓库下有编译好的apk可直接体验。
- uni-app x版源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue)

`uni-app x蒸汽模式`，可以在HBuilderX 5.23以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

也可以直接安装`hello uni-app x`示例应用：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)

安装 `hello uni-app x` 后，点击右下角模板 -> 顶部有 死亡长列表。

`uni-app x` 作为通用引擎，未对该示例做任何定制优化，没有诸如预加载、预测量等影响实验结果的行为。

此示例中7M多的4000行数据并非静态数据存在本地，而是由代码生成的数据，生成数据的代码是预执行的，在原生版和`uni-app x`版均如此。

此示例中，uni-app x的长列表中的视频是自带播放进度记忆的，原生版未实现此功能。

## 其他组件

一套渲染引擎，除了view、text、list外，还需要更多高性能的组件。

`uni-app x`中对各种组件都做了极限性能测试，但受限于精力，未对原始组件全面做对比测试。

开发者可以在 `hello uni-app x` 中体验各种组件的性能测试，几乎每个组件的示例中，都单独提供了 组件性能测试。

- rich-text组件
rich-text组件很重要，不管是新闻、UGC内容，还是AI输出的markdown富文本，包括表格、代码高亮。这些在App平台过去一直没有好的解决方案。
大多数开发者只能忍受webview初始化慢、内存占用高、快滑白屏等问题。uni-app x 蒸汽模式 提供了应该是业内当前最好的rich-text组件。

以下测试，用一个rich-text组件加载5万字长文，其中包括59张插图。
可以看到
1. 无等待进入页面。
2. 上下快滑不掉帧、不白屏，都是瞬间渲染
3. 初次联网加载图片的速度受网速影响，再次进入后使用本地缓存，速度会更快。

[视频链接](https://www.bilibili.com/video/BV134u26CE2s)

- swiper组件

在上述5万字长文中点击图片，打开的预览图片界面，就是使用swiper组件实现的。可以看到swiper中无等待呈现59张图片，左右切换图片无延迟。
很多单一指标变好，可以依靠牺牲其他指标来做到。比如启动时做懒加载，会造成启动快，但后续切换慢。
同时做到启动快、切换快，且还没有预加载，那就是无死角的真性能好。

- canvas组件

uni-app x 蒸汽模式的canvas性能大幅提升，屏幕上有2万个小球同时进行边缘碰撞而不掉帧。

[视频链接](https://www.bilibili.com/video/BV1Wyu26wEYH)

在小米Fold4设备上，uni-app x 蒸汽模式，球数增加到2.1万个仍120满帧运行。

原生并没有符合web规范的canvas组件，于是我们比较了浏览器、小程序、react native的性能。

* 浏览器，edge150，运行相同页面的web版，首先浏览器在这台设备上最高只能60帧运行，然后在2万个球时，已经是50多帧了。
* 微信小程序，运行相同页面的微信小程序版本，最高只能60帧运行，在2千个球时，开始变成50多帧。
* react native skia OpenGL后端，运行相同示例，9百个球时低于120帧，2千个球时低于60帧。vulkan后端在小米Fold4上黑屏。

为了补充 react native skia的vulkan数据，我们又找了一台设备测试。

测试设备-iQOO Z3 Android13

|技术									|<120帧球数	|<60帧球数	|<3帧球数	|
|---:									|---:				|---:			|---:			|
|系统浏览器(chrome130)	|2.6k				|9.7k			|156K			|
|rn skia opengl				|0.97k			|1.4k			|35k			|
|rn skia vulkan				|1.5k				|5.6k			|121k			|
|uni-app x 蒸汽				|16.6k			|31.6k		|310k			|

可以看出 uni-app x 蒸汽的canvas具有断层领先的优势。

- picker组件

加载省市区4000条数据。无等待弹出组件

- loading组件

uni-app x的Android平台loading组件，完全不占用主线程，不管主线程进行多么密集的运算，loading圈仍然可以流畅无卡顿旋转。

如下视频是屏幕上同时旋转100个loading且主线程中文字不停更新而不掉帧。

[视频链接](https://www.bilibili.com/video/BV1ChuS6BEL2)

## 更多示例

hello uni-app x 模板中还提供了日历、竖滑视频、侧滑删除长列表、ai chat的流式打字机等性能考验示例。

[日历](https://www.bilibili.com/video/BV1C8uS6MENd)

[竖滑视频](https://www.bilibili.com/video/BV1cXuU6eEuw)

[侧滑删除长列表视频链接](https://www.bilibili.com/video/BV1pSuU6iEaK)

[ai chat的流式打字机视频链接](https://www.bilibili.com/video/BV1cRuU6AEwG)

在ai时代，很多App都需要内嵌一个开源的AI对话聊天库，能流式解析markdown，解析过程不掉帧。为此DCloud推出开源的uni-ai x，详见[https://ext.dcloud.net.cn/plugin?id=23902](https://ext.dcloud.net.cn/plugin?id=23902)

没有用户喜欢等待、没有用户喜欢卡顿掉帧。

从2007年iPhone发布后，全世界手机用户每天都要为每次页面转场等待300ms。但`hello uni-app x`的蒸汽模式中已默认改为150ms，这150ms更多是留给网络。

如果开发者使用h3等新兴网络技术，优化好服务器速度，还可以把等待时间缩的更短。

## FAQ
### uni-app x 的App平台到底是自渲染还是原生渲染？

是原生渲染。准确的讲，是在原生渲染管线上自己做几乎所有组件。

如果使用surface自渲染，会因为2条渲染管线并存额外消耗硬件资源。

并且很多原生组件，比如信息流广告、webview组件、map地图以及三方生态中大量原生组件，自渲染方案在与原生生态融合时问题较多。两条渲染管线的滚动同步、层级合成、资源消耗均导致这一路线不是最佳方案。

站在宏观视角，在原生渲染管线中优化，提供更快的核心组件，兼容所有原生组件，比自立一套组件生态对产业更有意义。

### 为什么都是原生渲染，uni-app x的蒸汽模式比原生渲染更快？
这里面涉及数千项工程优化，举例一些：

1. Android的compose ui也是基于原生渲染管线的，但没有使用Android自带的view、textview，而是实现了自己的组件系统。
	
	这条路可行，只不过compose ui没有成为一个好标杆，它实际渲染速度比view体系更慢。（在上述4050示例对比中，有原生view和compose ui的测试例，[详见](https://gitcode.com/dcloud/test4050-android)）
	
	`uni-app x 蒸汽模式`，也几乎没有使用系统自带的组件，不管是textView、recyclerView、viewPage...，基本都没用。全新研发的组件做到了性能更高。
	
2. vue里template和style里的代码，被直接编译为优化度非常高的C代码。它的运行速度远快于java、kotlin及k/n。
	
也就是`uni-app x蒸汽模式`，作为跨平台开发框架，实现了业内期盼已久的梦想：**即跨平台，又比原生性能更高**。