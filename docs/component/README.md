### 基础组件

uni-app为开发者提供了一系列基础组件，类似HTML里的基础标签元素。

但uni-app的组件与HTML不同，而是与小程序相同，更适合手机端使用。

虽然不推荐使用HTML标签，但实际上如果开发者写了`div`等标签，在编译到非H5平台时也会被编译器转换为`view`标签，类似的还有`span`转`text`、`a`转`navigator`等，包括css里的元素选择器也会转。但为了管理方便、策略统一，新写代码时仍然建议使用view等组件。

开发者可以通过组合这些基础组件进行快速开发。
基于内置的基础组件，可以开发各种扩展组件，组件规范与vue组件相同。

什么是组件：

* 组件是视图层的基本组成单元。
* 一个组件包括开始标签和结束标签，标签上可以写属性，并对属性赋值。内容则写在两个标签之内。

```html
<template>
	<view>
		<tagname property="value">
			content
		</tagname>
	</view>
</template>
```

**Tips**

- 所有组件与属性名都是小写，单词之间以连字符``-``连接。
- 根节点为 ``<template>``，这个 ``<template>`` 下只能且必须有一个根``<view>``组件。这是vue单文件组件规范。
- **平台差异说明**若无特殊说明，则表示所有平台均支持。

### 属性类型

|类型|描述|注解|
|:-|:-|:-|
|Boolean|布尔值|组件写上该属性，不管该属性等于什么，其值都为 ``true``，只有组件上没有写该属性时，属性值才为 ``false``。如果属性值为变量，变量的值会被转换为 ``Boolean`` 类型。|
|Number|数字|1, 2.5|
|String|字符串|"string"|
|Array|数组|[ 1, "string" ]|
|Object|对象|{ key: value }|
|EventHandler|事件处理函数名|``handlerName`` 是 methods 中定义的事件处理函数名|
|Any|任意属性|&nbsp;|

### 共同属性类型
所有组件都有的属性：

|属性名|类型|描述|注解|
|:-|:-|:-|:-|
|id|String|组件的唯一标示|保持整个页面唯一|
|class|String|组件的样式类|在对应的 css 中定义的样式类|
|style|String|组件的内联样式|可以动态设置的内联样式|
|hidden|Boolean|组件是否隐藏|所有组件默认是显示的|
|data-*|Any|自定义属性|组件上触发的事件时，会发送给事件处理函数|
|@\*|EventHandler|组件的事件|详见各组件详细文档，事件绑定参考 [事件处理器](/use?id=事件处理器)|

### 特殊属性

几乎所有组件都有各自自定义的属性，可以对该组件的功能或样式进行修饰，请参考各个组件的定义。

### 组件列表

基础组件分为以下八大类：

**视图容器（View Container）：**

|组件名|说明|
|:-|:-|
|[view](component/view.md)|视图容器，类似于HTML中的div|
|[scroll-view](component/scroll-view.md)|可滚动视图容器|
|[swiper](component/swiper.md)|滑块视图容器|

**基础内容（Basic Content）：**

|组件名|说明|
|:-|:-|
|[icon](component/icon.md)|图标|
|[text](component/text.md)|文字|
|[rich-text](component/rich-text.md)|富文本|
|[progress](component/progress.md)|进度条|

**表单组件（Form）：**

|标签名|说明|
|:-|:-|
|[button](component/button.md)|按钮|
|[form](component/form.md)|表单|
|[input](component/input.md)|输入框|
|[checkbox](component/checkbox.md)|多项选择器|
|[radio](component/radio.md)|单项选择器|
|[picker](component/picker.md)|弹出式列表选择器|
|[picker-view](component/picker-view.md)|窗体内嵌式列表选择器|
|[slider](component/slider.md)|滑动选择器|
|[switch](component/switch.md)|开关选择器|
|[label](component/label.md)|标签|

**导航（Navigation）：**

|组件名|说明|
|:-|:-|
|[navigator](component/navigator.md)|页面链接。类似于HTML中的a标签|

**媒体组件（Media）：**

|组件名|说明|
|:-|:-|
|[audio](component/audio.md)|音频|
|[camera](component/camera.md)|相机|
|[image](component/image.md)|图片|
|[video](component/video.md)|视频|
|[live-player](component/live-player.md)|直播播放|
|[live-pusher](component/live-pusher.md)|实时音视频录制，也称直播推流|


**地图（Map）：**

|组件名|说明|
|:-|:-|
|[map](component/map.md)|地图|

**画布（Canvas）：**

|组件名|说明|
|:-|:-|
|[canvas](component/canvas.md)|画布|

**webview（Web-view）：**

|组件名|说明|
|:-|:-|
|[web-view](component/web-view.md)|web浏览器组件|

**各平台专有组件**

在小程序平台和weex平台，还有一些专有组件，比如open-data，详见左侧导航

### 扩展组件（uni-ui）：@uniui

uni-ui是DCloud提供的一个跨端ui库，它是基于vue组件的、flex布局的、无dom的跨全端ui框架。

uni-ui不包括基础组件，**它是基础组件的补充**。

#### uni ui产品特点

1、高性能

目前为止，在小程序和混合app领域，uni ui是性能的标杆。
- 自动差量更新数据

虽然uni-app支持小程序自定义组件，所有小程序的ui库都可以用。但小程序自定义组件的ui库都需要使用setData手动更新数据，在大数据量时、或高频更新数据时，很容易产生性能问题。

而uni ui属于vue组件，uni-app引擎底层自动diff更新数据。当然其实插件市场里众多vue组件都具备这个特点。
- 优化逻辑层和视图层通讯折损

非H5，不管是小程序还是App，不管是app的webview渲染还是原生渲染，全都是逻辑层和视图层分离的。这里就有一个逻辑层和视图层通讯的折损问题。
比如在视图层拖动一个可跟手的组件，由于通讯的损耗，用js监听很难做到实时跟手。

这时就需要使用css动画以及平台底层提供的wxs、bindingx等技术。不过这些技术都比较复杂，所以uni ui里做了封装，在需要跟手式操作的ui组件，比如swiperaction列表项左滑菜单，就在底层使用了这些技术，实现了高性能的交互体验
- 背景停止

很多ui组件是会一直动的，比如轮播图、跑马灯。即便这个窗体被新窗体挡住，它在背景层仍然在消耗着硬件资源。在Android的webview版本为chrome66以上，背景操作ui会引发很严重的性能问题，造成前台界面明显卡顿。

而uni ui的组件，会自动判断自己的显示状态，在组件不再可见时，不会再消耗硬件资源。

2、全端

uni ui的组件都是多端自适应的，底层会抹平很多小程序平台的差异或bug。

比如导航栏navbar组件，会自动处理不同端的状态栏。
比如swiperaction组件，在app和微信小程序上会使用交互体验更好的wxs技术，但在不支持wxs的其他小程序端会使用js模拟类似效果。

uni ui还支持nvue原生渲染，[详见](https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui)

未来uni ui还会支持pc等大屏设备。

3、与uni统计自动集成实现免打点

uni统计是优秀的多端统计平台，见[tongji.dcloud.net.cn](https://tongji.dcloud.net.cn)。

除了一张报表看全端，它的另一个重要特点是免打点。
比如使用uni ui的navbar标题栏、收藏、购物车等组件，均可实现自动打点，统计页面标题等各种行为数据。
当然你也可以关闭uni统计，这不是强制的。

4、风格扩展

uni ui的默认风格是中型的，与uni-app基础组件风格一致。但它支持[uni.scss](https://uniapp.dcloud.io/collocation/uni-scss)，可以方便的扩展和切换App的风格。

ui是一种需求非常发散的产品，DCloud官方也无意用uni ui压制第三方ui插件的空间，但官方有义务在性能和跨端方面提供一个开源的标杆给大家。

我们欢迎更多优秀的ui组件出现，也欢迎更多人贡献uni ui的主题风格，满足更多用户的需求。

#### uni ui的使用方式

uni ui支持 HBuilderX直接新建项目模板、npm安装和单独导入个别组件等多种使用方式
1. 在HBuilderX新建uni-app项目的模板中，选择uni ui模板
由于uni-app独特的[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)技术，可以免引用、注册，直接使用各种符合规则的vue组件。

在代码区键入`u`，拉出各种内置或uni ui的组件列表，选择其中一个，即可使用该组件。

光标放在组件名称上，按F1，可以查阅组件的文档。

2. npm安装参考：[https://ext.dcloud.net.cn/plugin?id=55](https://ext.dcloud.net.cn/plugin?id=55)

3. 单独安装组件
如果你没有创建uni ui项目模板，也可以在你的工程里，单独安装需要的那个组件。下表为uni-ui的扩展组件清单，点击每个组件在详情页面可以导入组件到项目下，导入后直接使用即可，无需import和注册。

|组件名|说明|
|:-|:-|
|[Badge](https://ext.dcloud.net.cn/plugin?id=21)| 数字角标|
|[Calendar](https://ext.dcloud.net.cn/plugin?id=56)| 日历|
|[Card](https://ext.dcloud.net.cn/plugin?id=22)| 卡片|
|[Collapse](https://ext.dcloud.net.cn/plugin?id=23)| 折叠面板|
|[Combox](https://ext.dcloud.net.cn/plugin?id=1261)| 可下拉选择的输入框|
|[CountDown](https://ext.dcloud.net.cn/plugin?id=25)| 倒计时|
|[Drawer](https://ext.dcloud.net.cn/plugin?id=26)| 抽屉|
|[Fab](https://ext.dcloud.net.cn/plugin?id=144)| 悬浮按钮|
|[Fav](https://ext.dcloud.net.cn/plugin?id=864)| 收藏按钮|
|[GoodsNav](https://ext.dcloud.net.cn/plugin?id=865)| 底部购物导航|
|[Grid](https://ext.dcloud.net.cn/plugin?id=27)| 宫格|
|[Icons](https://ext.dcloud.net.cn/plugin?id=28)| 图标|
|[IndexedList](https://ext.dcloud.net.cn/plugin?id=375)| 字母索引列表|
|[List](https://ext.dcloud.net.cn/plugin?id=24)| 列表|
|[LoadMore](https://ext.dcloud.net.cn/plugin?id=29)| 加载更多|
|[NavBar](https://ext.dcloud.net.cn/plugin?id=52)| 自定义导航栏|
|[NoticeBar](https://ext.dcloud.net.cn/plugin?id=30)| 通告栏|
|[NumberBox](https://ext.dcloud.net.cn/plugin?id=31)| 数字输入框|
|[Pagination](https://ext.dcloud.net.cn/plugin?id=32)| 分页器|
|[PopUp](https://ext.dcloud.net.cn/plugin?id=329)| 弹出层|
|[Rate](https://ext.dcloud.net.cn/plugin?id=33)| 评分|
|[SearchBar](https://ext.dcloud.net.cn/plugin?id=866)| 搜索栏|
|[SegmentedControl](https://ext.dcloud.net.cn/plugin?id=54)| 分段器|
|[Steps](https://ext.dcloud.net.cn/plugin?id=34)| 步骤条|
|[SwipeAction](https://ext.dcloud.net.cn/plugin?id=181)| 滑动操作|
|[SwiperDot](https://ext.dcloud.net.cn/plugin?id=284)| 轮播图指示点|
|[Tag](https://ext.dcloud.net.cn/plugin?id=35)| 标签|


**更多组件**

除了基础组件、uni-ui，插件市场还有更多扩展组件、模板，包括前端组件和原生扩展组件，具体见[插件市场](https://ext.dcloud.net.cn/)。

关于其他vue的web组件库、小程序组件库是否能在uni-app中使用的问题，参考[https://ask.dcloud.net.cn/article/35489](https://ask.dcloud.net.cn/article/35489)
