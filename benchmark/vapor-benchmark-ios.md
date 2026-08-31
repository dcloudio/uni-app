iOS Benchmark

## 背景
`uni-app x 蒸汽模式`，是DCloud于2026年推出的跨平台开发框架新版本。

该产品的特点是：**比原生更快**。

继 uni-app x 蒸汽模式 鸿蒙版发布后，iOS版也已于5.11+ 发布了alpha，并于5.14发布了正式版。

iOS的原生性能优化是业界标杆，想要做到超过iOS原生是非常难的。这可能会让很多人觉得天方夜谭。所以一份严谨、客观的benchmark尤为重要。

本基准测试的目标，即为了真实呈现主要性能指标，并确保开发者可自行重现本基准测试，并得出相近结论。

先简要介绍 `uni-app x` 及 蒸汽模式
- uni-app x 使用vue语法，并在蒸汽模式中去除了虚拟DOM
- 蒸汽模式中，模板和样式编译为字节码/机器码，script支持js/ts/uts语言
- uni-app x 基于原生渲染管线，可融合原生组件生态，并占用更小的内存
- 蒸汽模式提供了大量自研高性能组件，如view、text、image、list、rich-text、swiper、slider、picker等

本报告为iOS平台的性能评测。

Android评测报告[另见](./vapor-benchmark-android.md)，鸿蒙评测报告[另见](./vapor-benchmark-harmony.md)。

**测试指标**

UI系统的核心性能指标是：**渲染速度和帧率**。

追求渲染速度更快、掉帧更少。

人工体感可以录像，但测试指标必须可精准度量，需要准确的度量方案。

## 环境声明

本Benchmark使用了2台iOS系统在售的最低端机型 iPhone SE2，发布于2020年，具体信息如下：

- 设备型号：iPhone SE2
- OS版本：iOS 26.5
- 全部使用release方式运行
- 电量90%左右，未开启节能模式。该设备仅支持普通模式和节能模式
- 屏幕最高刷新率为60Hz
- 测试前所有设备重启，并静置2分钟。除关于本机的界面外，杀掉所有其他App的进程

## view和text渲染速度测试

view和text是渲染引擎的核心基础，大量组件基于这2个基础组件构建。这2个基础组件的渲染速度是一套渲染引擎最核心的性能指标。

验证一个view和text创建速度是否足够快，可靠的方式是在同一个屏幕内创建大量view和text组件，计算耗时。

### 测试方法

点击按钮后，在屏幕上创建2000个view，每个view有一个背景色，每个view中再套入一个text组件。

2000个view需在同一屏幕区显示，view不设宽高，text字体较小。view们被分为50行，每行40个view，同时每行外层再套一个view。

即，一共4050的元素，其中2050个view和2000个text。

对比使用 `uni-app x 蒸汽模式`和 `原生UIKit`，进行创建速度的测试。

首先看录屏对比。
左边为`原生UIKit`，右边为`uni-app x 蒸汽模式`。

点击链接：[4050对比视频](https://www.bilibili.com/video/BV1ApMt66Eez)

界面中弹出的toast显示了耗时，单位为ms。`原生UIkit`为325.76ms、`uni-app x蒸汽模式`为167ms。计时说明：
- 开始时间为按钮的click事件触发时间
- 结束时间为主线程渲染指令已全部送达OS渲染进程时间。此时主线程已经完成本次渲染所需的工作，处于空闲状态。

该结束时间并非肉眼所见的屏幕显示时间，实际上渲染进程和GPU仍需一定时间工作才能让屏幕显示图像，但后续时间段无法通过编程打点计时。

经过录屏和计时的粗略对比，发现`原生UIkit`和`uni-app x 蒸汽模式`在渲染进程和GPU的耗时接近，都在1帧左右，故在后续精准比较中忽略这段时间，保留目前的结束时间定义。

该实验重复5次。每次均杀掉应用进程重新进入，精准计算的耗时如下：
|原生UIkit|uni-app x蒸汽模式	|
|--				|--								|
|325.76		|167							|
|330			|157							|
|330			|159							|
|330			|160							|
|328			|160							|

平均值：
|原生UIkit|uni-app x蒸汽模式	|
|--				|--								|
|328.75		|160.6						|

以上数据单位均为ms。

### 测试结论
结论：在4050 view和text同屏渲染测试中，`uni-app x 蒸汽模式`的渲染速度是 原生UIkit **2倍** (328.75/160.6)。

需要说明的是，在iOS18上，原生和uni-app x蒸汽模式的差距更大，尤其是SwiftUI。
在更低端的iPhoneXR、iOS18上测试数据如下：

|技术方案		|耗时（括号中为5次明细）								|
|:-:				|:-:																	|
|原生UIKit		|339.7 (340.9 339.1 337.7 343.9 336.9)|
|原生SwiftUI	|610.56 (609.6 614.2 613.1 613 602.9)	|
|uni-app x 	|185.8 (186 186 185 185 187)					|

渲染4050个元素，uni-app x的增量内存也更低，依次是 uni-app x < UIKit < SwiftUI。相关数据较多，本报告不再罗列，有兴趣的开发者可以使用xcode自行观测。

### 复现工程源码和体验方式

上述2个示例，源码如下：

- iOS原生源码：[https://gitcode.com/dcloud/test4050-ios](https://gitcode.com/dcloud/test4050-ios)
- uni-app x的源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/4050/4050.uvue)

原生版本，需要自行编译原始工程。

`uni-app x 蒸汽模式`，可以在HBuilderX 5.11以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

你也可以不编译uni-app x，直接下载[hello uni-app x示例](https://hellouniappx.dcloud.net.cn)体验：
<div>
	<a
		href="https://hellouniappx.dcloud.net.cn" target="_blank"
		style="display: flex; align-items: center;flex-direction: column;margin: 0 5px 20px;width:160px;"
	>
		<img src="https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png" width="160" loading="lazy" />
		<b>hello uni-app x</b>
	</a>
</div>

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

该fps组件需要使用同样的逻辑分别实现原生版本和`uni-app x`版本。源码见后续 复现工程 章节。

同时死亡长列表的代码，也需要在iOS原生和`uni-app x`中使用相同逻辑实现。

由于工作量原因，长列表测试只编写了SwiftUI的版本，未编写UIKit版本。`uni-app x`中使用list-view。

在2端分别进入长列表，滚动到底部，加载完4000行数据，然后点击 iOS 手机的顶部状态栏，此时会滚动回到列表顶部。

2端回滚时间一样，均为1秒，在这个回滚到顶部的过程中，计算帧率，验证掉帧情况。同时从录像视觉上进行直观感受。

首先看录屏对比。

点击链接：
- [iPhone13pro max高刷屏长列表对比视频](https://www.bilibili.com/video/BV1y4816jE7m)
- [iPhone SE2普刷屏长列表对比视频](https://www.bilibili.com/video/BV19zMt6ZEv2)

视觉体验中可看出，iOS原生的fps组件数字在1秒的动画期间更低，在回滚过程中很多视频呈现黑块。

该实验重复5次，每次均杀掉应用重新进入，重新滚动到顶部。

iOS选择了2台设备，一台为iPhone SE2(iOS26.5)，iPhone SE2不支持高刷，最大帧率为60。另一台iPhone16PM(iOS26.5)，支持120高刷。

| iPhone SE2 iOS26.5 无高刷| 平均帧率	|
|---								|---:			|
| uni-app x蒸汽模式	|49.6		|
| SwiftUI						|37.6		|

iPhone SE2并非120高刷屏，所以帧率最高只能60。因主流iPhone已全面高刷屏，所以普刷屏测试数据意义不大，应该关注高刷屏数据。

| iPhone16PM(iOS26.5) 120高刷| 平均帧率	|
|---								|---:			|
| uni-app x蒸汽模式	|111		|
| SwiftUI						|49		|


### 测试结论

数据结论：死亡长列表帧率测试中，`uni-app x蒸汽模式`的平均帧率，在高刷设备上是原生SwiftUI的**2.27倍**(111/49)。

视觉体验：SwiftUI滚动时大量的灰块不渲染、video封面图不渲染，体验较差。而 uni-app x 则始终渲染彩色图。

实测发现SwiftUI版本的长列表中的video，无法记忆video的播放进度，即播放A视频到5s时，滚动到其他地方，然后再滚回来显示A视频，A视频会重头播放。

但`uni-app x`的版本记忆了播放进度。除了功能的不同外，此差异也需要考虑到帧率对比中，记忆播放进度本身也耗费时间，也就是如果uni-app x取消记忆播放进度，帧率还能再提升。

### 复现工程源码和体验方式

上述2个示例，源码如下：

- iOS Swift版源码：[https://gitcode.com/dcloud/iOSDeadlyList-SwiftUI](https://gitcode.com/dcloud/iOSDeadlyList-SwiftUI)
- uni-app x版源码：[https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/long-list-perf/long-list-perf.uvue)

原生版本，需要自行编译原始工程。

`uni-app x 蒸汽模式`，可以在HBuilderX 5.11以上版本编译运行（注意选用release方式运行，或者发行为正式包安装）。

你也可以不编译uni-app x，直接下载[hello uni-app x示例](https://hellouniappx.dcloud.net.cn)体验：
<div>
	<a
		href="https://hellouniappx.dcloud.net.cn" target="_blank"
		style="display: flex; align-items: center;flex-direction: column;margin: 0 5px 20px;width:160px;"
	>
		<img src="https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png" width="160" loading="lazy" />
		<b>hello uni-app x</b>
	</a>
</div>

安装`hello uni-app x`后，点击右下角模板 -> 顶部有 死亡长列表。

`uni-app x`作为通用引擎，未对该示例做任何定制优化，没有诸如预加载、预测量等影响实验结果的行为。

此示例中7M多的4000行数据并非静态数据存在本地，而是由代码生成的数据，生成数据的代码是预执行的，在原生版和`uni-app x`版均如此。

## 其他组件

一套渲染引擎，除了view、text、list外，还需要更多高性能的组件。

`uni-app x`中对各种组件都做了极限性能测试，但受限于精力，未对原生组件全面做性能对比测试。

开发者可以在 `hello uni-app x` 中体验各种组件的性能测试，几乎每个组件的示例中，都单独提供了 组件性能测试。

- rich-text组件：

rich-text组件很重要，不管是新闻、UGC内容，还是AI输出的markdown富文本，包括表格、代码高亮。这些在App平台过去一直没有好的解决方案。
大多数开发者只能忍受webview初始化慢、内存占用高、快滑白屏等问题。uni-app x 蒸汽模式 提供了应该是业内当前最好的rich-text组件。

以下测试，用一个rich-text组件加载5万字长文，其中包括59张插图。
可以看到
1. 无等待进入页面。
2. 上下快滑不掉帧、不白屏，都是瞬间渲染
3. 初次联网加载图片的速度受网速影响，再次进入后使用本地缓存，速度会更快。

[视频链接](https://www.bilibili.com/video/BV15zMt6fENa)

**注：录屏时帧率只能为60Hz，实际使用时是完整的120Hz。下同**

- swiper组件：
在上述5万字长文中点击图片，打开的预览图片界面，就是使用swiper组件实现的。可以看到swiper中无等待呈现59张图片，左右切换图片无延迟。
很多单一指标变好，可以依靠牺牲其他指标来做到。比如启动时做懒加载，会造成启动快，但后续切换慢。
同时做到启动快、切换快，且还没有预加载，那就是无死角的真性能好。

- picker组件：加载省市区4000条数据。无等待弹出组件

[视频链接](https://www.bilibili.com/video/BV19rMt6tE81)

- slide组件：拖动100个slider，流畅丝滑。完全不担心逻辑层和渲染层的通信阻塞。

[视频链接](https://www.bilibili.com/video/BV15rMt6tEW4)

- loading组件：屏幕上同时旋转100个loading不掉帧

[视频链接](https://www.bilibili.com/video/BV1RBMt6bEvS)

- canvas组件：
uni-app x 蒸汽模式的canvas性能大幅提升，从HBuilderX 5.25起，可以做到数万个小球同时进行边缘碰撞而不掉帧。

[视频链接](https://www.bilibili.com/video/BV1RBMt6bEyx)

- 众多组件均有100或200个创建速度测试监控。hello uni-app x 模板中还提供了日历、竖滑视频、侧滑删除长列表、ai chat的流式打字机等性能考验示例

[侧滑删除长列表视频链接](https://www.bilibili.com/video/BV1AHMt63EoY)

[高性能日历](https://www.bilibili.com/video/BV1wpMt66ErZ)

[ai chat的流式打字机视频链接](https://www.bilibili.com/video/BV1PHMt63Ejy)

在ai时代，很多App都需要内嵌一个开源的AI对话聊天库，能流式解析markdown，解析过程不掉帧。为此DCloud推出开源的uni-ai x，详见[https://ext.dcloud.net.cn/plugin?id=23902](https://ext.dcloud.net.cn/plugin?id=23902)

没有用户喜欢等待、没有用户喜欢卡顿掉帧。

从2007年iPhone发布后，全世界手机用户每天都要为每次页面转场等待300ms。但`hello uni-app x`的蒸汽模式中已默认改为150ms，这150ms更多是留给网络。

如果开发者使用h3等新兴网络技术，优化好服务器速度，还可以把等待时间缩的更短。

## FAQ
- uni-app x 的App平台到底是自渲染还是原生渲染？

是原生渲染。准确的讲，是在原生渲染管线上自己做几乎所有组件。

如果使用自渲染，会因为2条渲染管线并存额外消耗硬件资源。

并且很多原生组件，比如信息流广告、webview组件、map地图以及三方生态中大量原生组件，自渲染方案在与原生生态融合时问题较多。两条渲染管线的滚动同步、层级合成、资源消耗均导致这一路线不是最佳方案。

站在宏观视角，在原生渲染管线中优化，提供更快的核心组件，兼容所有原生组件，比自立一套组件生态对产业更有意义。

- 为什么都是原生渲染，uni-app x的蒸汽模式比原生渲染更快？
这里面涉及数千项工程优化，举例一些：

1. Android的compose ui也是基于原生渲染管线的，但没有使用Android自带的view、textview，而是实现了自己的组件系统。
	
	这条路可行，只不过compose ui没有成为一个好标杆，它实际渲染速度比view体系更慢。（在上述4050示例对比中，有原生view和compose ui的测试例，[详见](https://gitcode.com/dcloud/test4050-android)）
	
	`uni-app x 蒸汽模式`，也几乎没有使用系统自带的组件，不管是textView、recycleView、viewPage...，或者是鸿蒙的arkUI相关组件，基本都没用。全新研发的组件做到了性能更高。
	
2. vue里template和style里的代码，被直接编译为优化度非常高的机器码/字节码。

- 在uni-app x的示例中发现了拍平。如果不拍平的话，uni-app x蒸汽模式中渲染速度还会比原生快吗？

不拍平时，uni-app x蒸汽模式仍然快于UIKit和SwiftUI。有兴趣的开发者可以修改4050.uvue代码自行测试。

- k/n驱动c层渲染，是否也快过SwiftUI或uni-app x蒸汽模式？

Compose Multiplatform ，在iOS上使用自渲染，未基于原生渲染管线，有初始化问题和原生UI生态融合问题，且性能表现不佳。

性能排名是 uni-app x蒸汽模式 > UIKit > SwiftUI > Compose Multiplatform。

- AI时代，跨平台的意义还大吗？

提升生产效率，是社会发展不变的趋势。AI和跨平台都是推进生产效率提升的重要手段。

但如果用AI来生成多平台代码，那么AI并不是一个稳定的公共抽象。如果你实践过后就会发现，除了给AI发出的第一句话可以多平台复用外，后面的每个问题都需要分平台处理，不具备专业平台知识很难做出商业级应用。

提升性能，是用户体验发展不变的趋势。页面切换从300ms等待变成150ms，操作任何交互都丝滑流畅，这都是用户选择一个App或放弃另一个App的重要原因。AI + 原生的UI体系并不能实现比uni-app x更高的性能。

另外，欢迎关注[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，它对uni-app系产品的了解程度超过任何AI Coding工具，可以帮助开发者更好的用AI生成uni-app x、uniCloud等产品代码。

- 基于原生渲染，又宣称比原生渲染快，岂不是互相矛盾？

需要严谨化名词，uni-app x 蒸汽模式，是基于原生渲染管线，渲染性能超过原生UI框架。\
原生渲染管线，和原生UI框架，这是2个概念。\
原生渲染管线，是一个应用启动后，OS一定会给应用分配的画布、合成机制、渲染线程资源、GPU上下文。\
而所谓自渲染，指的是新开一个独立画布，占用一大块新内存、内部有自己的小合成机制，然后再并入原生大合成里，自己创建渲染线程，自己创建独立的GPU上下文。Android上新开一个surface/textureView，鸿蒙上是新开XComponent。\
所以自渲染在启动和与原生view合成时性能不佳。\
那么基于原生渲染管线，可以有多套原生UI框架，Android上有 Android View 体系、Compose UI 体系。iOS有 UIView 体系、SwiftUI 体系。这些原生UI框架，都有自己的排版系统、组件库、命令式或声明式编写框架。\
uni-app x 做的，是在原生渲染管线上新增了一套原生UI框架，它有自己的排版布局系统和组件系统，这套系统的性能比上述OS自带的UI框架性能更高。

- 蒸汽模式快是因为拍平吗？对于不能拍平的场景，uni-app x 会比原生慢吗？

uni-app x 蒸汽模式，在不拍平时一样是原生的数倍，注意仔细看前述测试数据表格中的“非拍平”数据。并且注意视频对比中，Android平台开启了显示布局边界后，每个格子外面都有框，这是未拍平的铁证。\
uni-app x 组件众多，支持拍平的仅view、text、image，其他组件如rich-text、canvas性能高更和拍平无关。

- 基于原生渲染，是否涉及跨平台的不一致问题？

uni-app x 蒸汽模式只是使用了原生渲染管线，但几乎没有使用各平台的原生组件，基本都是使用跨平台的C++和uts自己编写的。因为是一套代码，所以可以很好的保持跨平台一致性。\
之前 uni-app x VDOM模式时，不同平台的组件差异还较多，比如Android的list组件基于recycle-view，iOS的list基于UICollectionView，代码完全不同，细节和bug难免有差异。\
但 uni-app x蒸汽模式中，list是基于c和uts一套代码实现的，逻辑上就高度统一。

- 是否存在测试例定向优化？在其他测试例下其实 uni-app x 性能不如原生的情况？

再次强调 uni-app x 未对测试例做定向优化。\
	* 4050 view + text，是对 view 和 text这2个核心组件的性能极限测试。\
开发者可以不使用方格，可以使用任意其他方式来测试对比 uni-app x 和原生的view、text的性能，都能得出一样的结论。\
开发者还可以使用多种布局方式来对比测试，上面的测试例中Android使用的线性布局，开发者还可以使用约束布局等多种方式测试，uni-app x 蒸汽模式比原生快数倍的结论不会变。\
	* 死亡长列表，是对list组件的性能极限测试；5万字长图文是对rich-text的性能极限测试。\
开发者可以构造其他方式的长列表和长图文来做性能测试，一样会得出uni-app x 性能更好的结论。\
因为不是恰好这些测试例的写法中，uni-app x 表现更好。而是 uni-app x 的这些组件性能确实更好，怎么做极限测试都一样。

当然也不一定 uni-app x 的几十个组件，每个都比原生组件的性能高。有些组件比如video，使用的就是exoplayer，和原生的性能一样。但高频使用、有性能压力的组件，uni-app x 均会优化到比原生组件更快。

- 对比的测试例中，原生的写法是否没有极致优化？

原生的写法均已开源，对此有怀疑的开发者可以查看源码，自行优化，如果能优化到比 uni-app x 快，我们定然在官网公布。\
但需注意不能写测试例定向优化代码，需要在同一层面对比，即需使用原生组件和排版系统。

前面提到过原生渲染管线和原生UI组件系统的区别。uni-app x 是和 Android View体系、Compose UI体系、UIView体系、SwiftUI体系、ArkUI体系来比较。\
如果原生不使用view、text这些组件，自己绘制，在某些测试例中可以定向优化。\
比如4050个view套text示例中假使把宽高定死，不走测量和排版，在一个自定义view上自绘，肯定比用原生view和text更快。但这反而是原生为测试例更好看而搞的定向优化了\
4050这个例子，对比的是 uni-app x 提供的UI组件系统，和OS原生提供的UI组件系统。它不是定宽高的，大小是由文字撑开的，要完整的测试排版、测量和绘制的性能。\
uni-app x 自然也可以跳过排版和测量自绘。但注意 uni-app x 中拍平，并不是跳过排版、测量的自绘，它仍然要走排版、测量和绘制。\
跳过排版测量的自绘，不具备通用性，没有比较的意义。

- uni-app x 的css是web的子集，是否够用？以及后续功能增加是否会导致性能一路下降到没有原生快？即 uni-app x 的快是否是因为没有原生的功能多？

uni-app x 的css支持度，和react native的Style支持度类似，都是web子集，都足够开发者写出想要的界面。\
未来确实有计划增加更多css能力，但都可以做到不用这些新能力时，老能力的渲染速度不会变。\
另外，DCloud 实验室内部还有非常多性能优化技术未进入产品化。目前已经够快了，所以这些技术的产品化工作的优先级放低了。uni-app x 未来只会更快，不会变慢。