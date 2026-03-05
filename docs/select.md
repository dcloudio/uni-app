# 跨平台开发框架比较

App跨平台框架历史悠久，从cordova、react native、flutter，直到最近的uni-app x。江山代有才人出，每个都试图颠覆原生，但过去却一直未成功。

过去的问题到底在哪里？uni-app x为什么和过去那些方案不一样？

我们先捋一捋各种技术路线，看看这些跨平台开发框架为什么不如原生应用。

|逻辑层		|渲染层					|类型		|代表作																|
|--				|--							|--			|--																		|
|webview	|webview				|弱类型	|5+App、cordova												|
|js引擎		|webview				|弱类型	|uni-app app-vue、小程序（dount）			|
|js引擎		|原生渲染				|弱类型	|react native、uni-app app-nvue、weex	|
|dart引擎	|flutter渲染引擎|强类型	|flutter															|
|js引擎		|flutter渲染引擎|弱类型	|微信skyline、webF、ArkUI-x						|
|kotlin		|原生渲染				|强类型	|uni-app x														|
|kotlin		|原生渲染				|强类型	|原生应用															|

上面的表格，除了行尾的原生应用外，各个跨平台框架按出现时间排序，可以看到跨平台框架是如何演进的。

上表中，uni-app x和原生应用是一样的，逻辑层和渲染层都是原生，都是强类型；而其他跨平台框架或者在逻辑层、或者在渲染层与原生不一致。

webview与原生的差距已经是业内常识了，启动慢、渲染慢、内存占用高。这块本文不再详述。

但那些非web-view的框架到底哪里不如原生？

## js+原生渲染
react native等抛弃webview，改由原生渲染的跨平台方案，2014年就推出了。如今手机硬件也越来越好了，为什么性能还达不到原生？

js+原生渲染的方案问题如下：
### 1. js引擎慢，启动速度和运行速度都弱于原生

所以很多开发者即便使用这类方案，首页也还是原生来写。

React Native的Hermes引擎和华为，提供了js编译为字节码的方案，这是一种空间换时间的方案，启动速度有了一定优化，但仍然比不过原生。

弱类型在编译期能优化的有限，还是需要一个运行时来跑，而不能像强类型那样直接深入底层。

以数字运算为例，js的number运算确实比强类型的int慢，内存开销也更大。

### 2. js语言与原生之间通信卡顿

每个语言有自己的内存空间，跨语言通信都有折损，每次通信几十到几百毫秒不等，视手机当时的状态。一旦频繁通信，就会明显卡顿。

逻辑层的js，既要和原生渲染层通信，还要和原生API通信：

- 2.1 js与原生ui通信

举个简单的场景例子，在js里监听滚动，根据滚动变化实时调整界面上某些元素的高度变化。
这个问题能难倒一大批跨平台开发框架。

如果全部在webview里，js操作ui还好一些，所以uni-app的app-vue里的renderjs操作UI性能高，就是这个道理。同理还有微信小程序的wsx。

虽然小程序和uni-app都是js，但实际上逻辑层在独立js引擎里，通过原生桥来控制web-view，通信成本很高。

weex提供了bindingx技术，这是一种弱编程，渲染层预先定义了一些操作UI的方式，调用时全部在渲染层运行，不会来回与逻辑层通信。
但这种预定义方式的适应面有限，无法做到在js里高性能、自由的操作所有UI。

- 2.2 js操作原生api

操作系统和三方SDK的API都是原生的，js调用这些能力也需要跨语言通信。比如js调用原生的Storage或IO，数据较多时遍历的性能非常差。

当然在js API的封装上可以做些优化，比如微信的storage提供了wx.batchGetStorageSync这种批量读取的API，既然遍历性能差，那干脆一次性从原生读出来再传给js。

这也只能是无奈的方案，如果在遍历时想用js做什么判断就实现不了了，而且一次性读出很大的数据后传给js这一下，也需要通信时间。

## flutter
flutter2018年发布，第一次统一了逻辑层和渲染层，而且使用了强类型。

它没有使用原生渲染，而是使用由dart驱动的渲染引擎，这样逻辑层的dart代码操作UI时，再也没有延时了！bindingx、wxs这种补丁方案再也不需要了。

并且dart作为强类型，编译优化很好做，启动速度和运行速度都胜过js。

在这个开源项目下[https://gitcode.com/dcloud/test-cross/tree/master/test_flutter_slider_100](https://gitcode.com/dcloud/test-cross/tree/master/test_flutter_slider_100)，提供了一个flutter编写的100个slider同时滑动的示例，
项目下有源码也有打包好apk，可以直接安装体验。

100个slider同时滑动，非常考验逻辑和UI的通信。如果在webview内部，html和js写100个这样的slider，在新的手机上表现也还ok。但在小程序和react native这种逻辑和UI分离的模式下，100个slider是灾难。

下载apk后可以看到dart操作flutter的UI真的没有通信折损，100个slider的拖动非常流畅。

<video id="video" preload="none" controls="controls" width="185px" height="400px" poster="https://web-ext-storage.dcloud.net.cn/doc/flutter-slider-poster.png" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/flutter-slider.mp4"></video>

flutter看起来很完美。但为什么也没有成为主流呢？很多大厂兴奋的引入后为何又不再扩大使用范围呢？

### 1. dart与原生API的通信
别忘了上面2.2提到的原生API通信。flutter虽然在逻辑层和渲染层都是dart，但要调用原生API时，还是要通信。

操作系统和三方SDK的API是原生的，让dart调用需要做一层封装，又落到了跨语言通信的坑里。

[https://gitcode.com/dcloud/test_flutter_message_channel](https://gitcode.com/dcloud/test_flutter_message_channel)这是一个开源测试项目，来测试原生的class数据与dart的通信耗时。

项目里面有源码，大家可自行编译；根目录有打包好的apk，可直接安装体验。

这个项目首先在kotlin中构建了包含不同数据量的class，传递到dart然后渲染在界面上，并且再写回到原生层。

有0.1k和1k两种数据量（点击界面上的1k数字可切换），有读和读并写2个按钮，各自循环1000次。

以下截图的测试环境是华为mate 30 5G，麒麟990。手机上所有进程杀掉。如下图：
- 1k数据从原生读到dart并渲染

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/flutter_1k_read.jpeg)#{.zooming height="400px"}
- 1k数据从原生读到dart并渲染再写回

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/flutter_1k_readwrite.jpeg)#{.zooming height="400px"}
- 0.1k数据从原生读到dart并渲染

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/flutter_0.1k_read.jpeg)#{.zooming height="400px"}
- 0.1k数据从原生读到dart并渲染再写回

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/flutter_0.1k_readwrite.jpeg)#{.zooming height="400px"}

通信损耗非常明显。数据量从1k降低到0.1k时，通信时间并没有减少10倍，这是因为通信耗时有一个基础线，数据再小也降不下去。

dart并不能直接调用kotlin的class，只能先序列化成字符串，把字符串数据从原生传到dart，然后在dart层再重新构造。

当然也可以在原生层为dart封装API时提供wx.batchGetStorageSync这类批处理API，把数据一次读好再给dart，但这种又会遇到灵活性问题。

而在uni-app x中，这种跨语言通信是不存在的，不需要序列化，因为uni-app x使用的编程语言uts，在android上就编译为了kotlin，它可以直接调用kotlin的class而无需通信和封装。示例如下，具体uni-app x的原理后续章节会专题介绍。

```ts
<template>
</template>
<script lang="uts">
import Build from 'android.os.Build';
export default {
	onLoad() {
		console.log(Build.MODEL); //uts可以直接导入并使用原生对象，不需要封装，没有跨语言通信折损
	}
}
</script>
```

再分享一个知识：

很多人都知道iPhone上跨平台框架的应用，表现比android好。但大多数人只知道是因为iPhone的硬件好。

其实还有一个重要原因，iOS的jscore是c写的，OS的API及渲染层也都是ObjectC，js调用原生时，某些类型可以做共享内存的优化。但复杂对象也还是无法直接丢一个指针过去共享使用内存。

而android，不管java还是kotlin，他们和v8、dart通信仍然需要跨语言通信。

### 2. flutter渲染和原生渲染的并存问题

flutter的自渲染引擎，在技术上是不错的。但在生态兼容上有问题。

很多三方软件和SDK是原生的，原生渲染和flutter自渲染并存时，问题很多。

flutter开发者都知道的一个常见坑是输入法，因为输入法是典型的原生UI，它和flutter自绘UI并存时各种兼容问题，输入框被遮挡、窗体resize适应，输入法有很多种，很难适配。

混合渲染，还有信息流广告、map、图表、动画等很多三方sdk涉及。这个时候内存占用高、渲染帧率下降、不同渲染方式字体不一致、暗黑主题不一致、国际化、无障碍、UI自动化测试，各种不一致。。。

这里没有提供开源示例，因为flutter官方是承认这个问题的，它提供了2种方式：混合集成模式和虚拟显示模式。

但在渲染速度、内存占用、版本兼容、键盘交互上都各自有各自的问题。
详见flutter官网：[https://docs.flutter.dev/platform-integration/android/platform-views#performance](https://docs.flutter.dev/platform-integration/android/platform-views#performance)。
这个是中文翻译：[https://flutter.cn/docs/platform-integration/android/platform-views#performance](https://flutter.cn/docs/platform-integration/android/platform-views#performance)

在各大App中，微信的小程序首页是为数不多的使用flutter UI的界面，已经上线1年以上。

下面是微信8.0.44（此刻最新版），从微信的发现页面进入小程序首页。

<video id="video" preload="none" controls="controls" width="185px" height="400px" poster="https://web-ext-storage.dcloud.net.cn/doc/weixin_dark-poster.png" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/weixin_dark.mp4"></video>

视频中手机切换暗黑主题后，这个UI却还是白的，而且flutter的父容器原生view已经变黑了，它又在黑底上绘制了一个白色界面，体验非常差。

这个小程序首页界面很简单，没有输入框，规避了混合渲染，点击搜索图标后又跳转到了黑色的原生渲染的界面里。

假使这个界面再内嵌一个原生的信息流SDK，那会看到白色UI中的信息流广告是黑底的，更无法接受。

当然这不是说flutter没法做暗黑主题，重启微信后这个界面会变黑。这里只是说明渲染引擎不一致带来的各种问题。

> 注：如何识别一个界面是不是用flutter开发的？在手机设置的开发者选项里，有一个GPU呈现模式分析，flutter的UI不触发这个分析。且无法审查布局边界。

flutter的混合渲染的问题，在所有使用原生渲染的跨平台开发框架中都不存在，比如react native、weex、uni-app x。

总结下flutter：逻辑层和UI层交互没有通信折损，但逻辑层dart和原生api有通信成本，自绘UI和原生ui的混合渲染问题很多。

## js+flutter渲染

flutter除了上述提到的原生通信和混合渲染，还有3个问题：dart生态、热更新、以及比较难用的嵌套写法。

一些厂商把flutter的dart引擎换成了js引擎，来解决上述3个问题。比如微信skyline、webF、ArkUI-x。

其实这令人困惑。因为这又回到了react native和weex的老路了，只是把原生渲染换成了flutter渲染。

flutter最大的优势是dart操作UI不需要通信，以及强类型。而改成js，操作UI再次需要通信，又需要js引擎。

为了解决js和flutter渲染层的通信问题，微信的skyline又推出了补丁技术worklet动画，让这部分代码运行在UI层。（当然微信的通信，除了跨语言，还有跨进程通信，会更明显）

这个项目[https://gitcode.com/dcloud/test-cross/tree/master/test_arkuix_slider_100](https://gitcode.com/dcloud/test-cross/tree/master/test_arkuix_slider_100)，
使用ArkUI-x做了100个slider，大家可以看源码，下载apk体验，明显能看到由于逻辑层和UI层通信导致的卡顿。

<video id="video" preload="none" controls="controls" width="185px" height="400px" poster="https://web-ext-storage.dcloud.net.cn/doc/arkui-x-slider-poster.png" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/arkui-x-slider.mp4"></video>

上述视频中，手指按下的那个slider，和其他通过数据通讯指挥跟随一起行动的99个slider，无法同步，并且界面掉帧。

不过自渲染由于无法通过Android的开发者工具查看GPU呈现模式，所以无法从条状图直观反映出掉帧。

> 注意ArkUI-x不支持`Android8.0`以下的手机，不要找太老的手机测试。

很多人以为自渲染是王道，但其实自渲染是坑。因为flutter的UI还会带来混合渲染问题。

也就是说，js+flutter渲染，和js+原生渲染，这2个方案相比，都是js弱类型、都有逻辑层和渲染层的通信问题、都有原生API通信问题，而js+flutter还多了一个混合渲染问题。

可能有的同学会说，原生渲染很难在iOS、Android双端一致，自渲染没有这个问题。

但其实完全可以双端一致，如果你使用某个原生渲染框架遇到不一致问题，那只是这个框架厂商做的不好而已。

是的，很遗憾react native在跨端组件方面投入不足，官方连slider组件都没有，导致本次评测中未提供react native下slider-100的示例和视频。

## uni-app x

2022年，uts语言发布。2023年，uni-app x发布。

uts语言是基于typescript修改而来的强类型语言，编译到不同平台时有不同的输出：
- 编译到web，输出js
- 编译到Android，输出kotlin
- 编译到iOS，输出swift
- 编译到鸿蒙，输出ets

而uni-app x，是基于uts语言重新开发了一遍uni-app的组件、API以及vue框架。

如下这段示例，前端的同学都很熟悉，但它在编译为Android App时，变成了一个纯的kotlin app，里面没有js引擎、没有flutter、没有webview，从逻辑层到UI层都是原生的。
```html
<template>
	<view class="content">
		<button @click="buttonClick">{{title}}</button>
	</view>
</template>

<script> //这里只能写uts
	export default {
		data() {
			return {
				title: "Hello world"
			}
		},
		onLoad() {
			console.log('onLoad')
		},
		methods: {
			buttonClick: function () {
				uni.showModal({
					"showCancel": false,
					"content": "点了按钮"
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		background-color: white;
	}
</style>
```

这听起来有点天方夜谭，很多人不信。DCloud不得不反复告诉大家，可以使用如下方式验证：
- 在编译uni-app x项目时，在项目的unpackage目录下看看编译后生成的kt文件
- 解压打包后的apk，看看里面有没有js引擎或flutter引擎
- 手机端审查布局边界，看看渲染是不是原生的（flutter和webview都无法审查布局边界）

但是开发者也不要误解之前的uni-app代码可以无缝迁移。
- 之前的js要改成uts。uts是强类型语言，上面的示例恰好类型都可以自动推导，不能推导的时候，需要用`:`或`as`声明和转换类型。
- uni-app x支持css，但是css的子集，不影响开发者排版出所需的界面，但并非web的css全都兼容。

了解了uni-app x的基本原理，我们来看下uni-app x下的100个slider效果怎么样。

项目[https://gitcode.com/dcloud/test-cross/tree/master/test_uniappx_slider_100](https://gitcode.com/dcloud/test-cross/tree/master/test_uniappx_slider_100)下有源码工程和编译好的apk。

如下视频，打开了GPU呈现模式，可以看到没有一条竖线突破那条红色的掉帧安全横线，也就是没有一帧掉帧。

<video id="video" preload="none" controls="controls" width="185px" height="400px" poster="https://web-ext-storage.dcloud.net.cn/doc/uni-app-x-slider-poster.png" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/uni-app-x-slider.mp4"></video>

uni-app x在Android端，不管逻辑层、渲染层，都是kotlin，没有通信问题、没有混合渲染问题。不是达到了原生的性能，而是它本身就是原生应用，它和原生应用的性能没差别。

这也是其他跨平台开发框架做不到的。

uni-app x是一次大胆的技术突破，分享下DCloud选择这条技术路线的思路：

DCloud做了很多年跨平台开发，uni-app在web和小程序平台取得了很大的成功，不管规模大小的开发者都在使用；
但在app平台，大开发者只使用uni小程序sdk，中小开发者的app会整体使用。

究其原因，uni-app在web和小程序上，没有性能问题，直接编译为了js或wxml，uni-app只是换了一种跨平台的写法，不存在用uni-app开发比原生js或原生wxml性能差的说法。

但过去基于小程序架构的app端，性能确实不及原生开发。

那么App平台，为什么不能像web和小程序那样，直接编译为App平台的原生语言呢？

**uni-app x，目标不是改进跨平台框架的性能，而是给原生应用提供一个跨平台的写法。**

这个思路的转换使得uni-app x超越了其他跨平台开发框架。

在Web端编译为js，在小程序端编译为wxml等，在Android端编译为kotlin。
每个平台都只是帮开发者换种一致的写法而已，运行的代码都是该平台原生的代码。

然而在3年前，这条路线​有2个巨大的风险：
1. 从来没有人走通过
2. 即便能走通，工作量巨大

没有人确定这个产品可以做出来，DCloud内部争议也很多。

还好，经历了无数的困难和挑战，这个产品终于​面世了。

​换个写法写原生应用，还带来另一个好处。

同样业务功能的app，使用vue的写法，比手写纯原生快多了。也就是uni-app x对开发效率的提升不只是因为跨平台，单平台它的开发效率也更高。

其实google自己也知道原生开发写法太复杂，关于换种更高效的写法来写原生应用，他们的做法是推出了compose UI。

不过遗憾的是这个方案引入了性能问题。我们专门测试使用compose UI做100个slider滑动的例子，流畅度也掉帧。

源码见：[https://gitcode.com/dcloud/test-cross/tree/master/test_compose_ui_slider_100](https://gitcode.com/dcloud/test-cross/tree/master/test_compose_ui_slider_100)，
项目下有打包后的apk可以直接安装体验。

打开GPU呈现模式，可以看到compose ui的100个slider拖动时，大多数竖线都突破那条红色的掉帧安全横线，也就是掉帧严重。

<video id="video" preload="none" controls="controls" width="185px" height="400px" poster="https://web-ext-storage.dcloud.net.cn/doc/compose-ui-slider-poster.png" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/test-cross/compose-ui-slider.mp4"></video>

既然已经把不同开发框架的slider-100应用打包出来了，我们顺便也比较了不同框架下的包体积大小、内存占用：

|						|包体积（单位:M）	|内存占用（单位:Kb）|
|--					|--								|--									|
|flutter		|18								|141324.8						|
|ArkUI-X		|45.7							|133091.2						|
|uni-app x	|8.5							|105451.2						|
|compose ui	|4.4							|98575.2						|

包体积数据说明：
- 包含3个CPU架构：arm64、arm32、x86_64。
- flutter的代码都是编译为so文件，支持的cpu类型和包体积是等比关系，1个cpu最小需要6M体积，业务代码越多，cpu翻倍起来越多。
- ArkUI-X的业务代码虽然写在js里，但除了引用了flutter外还引用了js引擎，这些so库体积都不小且按cpu分类型翻倍。
- uni-app x里主业务都在kotlin里，kotlin和Android x的兼容库占据了不少体积。局部如图片引用了so库，1个cpu最小需要7M体积。但由于so库小，增加了2个cpu类型只增加了不到1M。
- compose ui没有使用so库，体积裁剪也更彻底。
- uni-app x的常用模块并没有裁剪出去，比如slider100的例子其实没有用到图片，但图片使用的fesco的so库还是被打进去了。实际业务中不可能不用图片，所以实际业务中uni-app x并不会比compose ui体积大多少。

内存占用数据说明：
- 在页面中操作slider数次后停止，获取应用内存使用信息VmRSS: 进程当前占用物理内存的大小
- 表格中的内存数据是运行5次获取的值取平均值
- 自渲染会占据更多内存，如果还涉及混合渲染那内存占用更高

## 后记

跨语言通信、弱类型、混合渲染、包体积、内存占用，这些都是过去跨平台框架不如原生的地方。

这些问题在uni-app x都不存在，它只是换了一种写法的原生应用。

|代表作											|类型		|逻辑层与UI通信折损	|逻辑层与OS API通信折损	|混合渲染	|包体积																		|内存										|
|--													|--			|--							|--									|--				|--																				|--											|
|react native、nvue、weex		|弱类型	|有							|有									|无				|js引擎体积大且分CPU											|js引擎占用更多内存			|
|flutter										|强类型	|无							|有									|有				|flutter引擎体积大、业务代码变为so且分CPU	|flutter引擎占用更多内存|
|微信skyline、webF、ArkUI-x	|弱类型	|有							|有									|有				|js和flutter引擎体积大										|2个引擎占用更多内存		|
|uni-app x									|强类型	|无							|无									|无				|较小																			|较低										|
|原生应用										|强类型	|无							|无									|无				|较小																			|较低										|

当然，作为一个客观的分析，这里需要强调uni-app x刚刚面世，还有很多不成熟的地方。

[需求墙](https://vote.dcloud.net.cn/#/?name=uni-app%20x)里都是uni-app x该做还未做的。也欢迎大家投票​。

另外，原生Android中一个界面不能有太多元素，否则性能会拉胯。flutter的自渲染和compose ui解决了这个问题。而原生中解决这个问题需要引入自绘机制来降低元素数量，这个在uni-app x里对应的是draw自绘API​。

uni-app x这个技术路线是产业真正需要的东西，随着产品的迭代完善，它能真正帮助开发者即提升开发效率又不牺牲性能。​

**让跨平台开发不如原生，成为历史**。

欢迎体验 hello uni-app x 示例应用，Android、iOS、Web 三个平台都有，可以亲身感受它的启动速度，渲染流畅度。

<div class="quick">
  <div style="margin-top: 20px;justify-content: space-around;">
    <a
      href="https://hellouniappx.dcloud.net.cn"
      target="_blank"
      style="display: flex; align-items: center;flex-direction: column;margin: 0 5px 20px;width:160px;"
      one-link-mark="yes"
    >
      <div class="barcode-img-box">
        <img
          src="https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png"
          width="160"
          loading="lazy"
        />
      </div>
      <b>hello uni-app x</b>
    </a>
  </div>
</div>

源码在：[https://gitcode.com/dcloud/hello-uni-app-x/](https://gitcode.com/dcloud/hello-uni-app-x/)

这个示例里有几个例子非常考验通信性能，除了也内置了slider-100外，另一个是“模版-scroll-view自定义滚动吸顶”，在滚动时实时修改元素top值始终为一个固定值，一点都不抖动。

我们不说服您使用任何开发技术，但您应该知道它们的原理和差别。

欢迎指正和讨论。
