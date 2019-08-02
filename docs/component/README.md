### 基础组件

框架为开发者提供了一系列基础组件，类似HTML里的基础标签元素。

但uni-app的组件与HTML不同，而是与微信小程序相同，更适合手机端使用。

虽然不推荐使用HTML标签，但实际上如果开发者写了`div`等标签，在编译到非H5平台时也会被编译器转换为`view`标签，类似的还有`span`转`text`、`a`转`navigator`等，包括css里的元素选择器也会转。但为了管理方便、策略统一，新写代码时仍然建议使用view等组件。

开发者可以通过组合这些基础组件进行快速开发。
基于内置的基础组件，可以开发各种扩展组件，组件规范与vue组件相同。

DCloud提供了扩展组件框架uni-ui（见文末），同时更多三方开发的组件也收录到插件市场。

什么是组件：

* 组件是视图层的基本组成单元。
* 一个组件通常包括开始标签和结束标签，属性用来修饰这个组件，内容在两个标签之内。

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
- 根节点为 ``<template>``，这个 ``<template>`` 下只能有一个根``<view>``组件。
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
|[view](component/view.md)|视图容器|
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
|[picker](component/picker.md)|列表选择器|
|[picker-view](component/picker-view.md)|内嵌列表选择器|
|[slider](component/slider.md)|滚动选择器|
|[switch](component/switch.md)|开关选择器|
|[label](component/label.md)|标签|

**导航（Navigation）：**

|组件名|说明|
|:-|:-|
|[navigator](component/navigator.md)|应用链接|

**媒体组件（Media）：**

|组件名|说明|
|:-|:-|
|[audio](component/audio.md)|音频|
|[camera](component/camera.md)|相机|
|[image](component/image.md)|图片|
|[video](component/video.md)|视频|
|[live-player](component/live-player.md)|直播|


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

**平台开放数据（Open-data）：**

|组件名|说明|
|:-|:-|
|[open-data](component/open-data.md)|展示平台开放的数据|


### 扩展组件（uni-ui）：@uniui

uni-ui是DCloud提供的一个跨端ui库，它是基于vue组件的、flex布局的、无dom的跨全端ui框架。

注意与web开发不同，uni-ui不包括基础组件，**它是基础组件的补充**。

web开发中有的开发者习惯用一个ui库完成所有开发，但在uni-app体系中，推荐开发者首先使用性能更高的基础组件，然后按需引入必要的扩展组件。

uni-ui支持npm安装和zip下载安装2种方式。

npm安装参考：[https://ext.dcloud.net.cn/plugin?id=55](https://ext.dcloud.net.cn/plugin?id=55)

下表为uni-ui的扩展组件清单，点击每个组件可单独安装。

|组件名|说明|
|:-|:-|
|[Badge](https://ext.dcloud.net.cn/plugin?id=21)| 数字角标|
|[Calendar](https://ext.dcloud.net.cn/plugin?id=56)| 日历|
|[Card](https://ext.dcloud.net.cn/plugin?id=22)| 卡片|
|[Collapse](https://ext.dcloud.net.cn/plugin?id=23)| 折叠面板|
|[CountDown](https://ext.dcloud.net.cn/plugin?id=25)| 倒计时|
|[Drawer](https://ext.dcloud.net.cn/plugin?id=26)| 抽屉|
|[Fab](https://ext.dcloud.net.cn/plugin?id=144)| 悬浮按钮|
|[Grid](https://ext.dcloud.net.cn/plugin?id=27)| 宫格|
|[Icon](https://ext.dcloud.net.cn/plugin?id=28)| 图标|
|[IndexedList](https://ext.dcloud.net.cn/plugin?id=375)| 索引列表|
|[List](https://ext.dcloud.net.cn/plugin?id=24)| 列表|
|[LoadMore](https://ext.dcloud.net.cn/plugin?id=29)| 加载更多|
|[NavBar](https://ext.dcloud.net.cn/plugin?id=52)| 自定义导航栏|
|[NoticeBar](https://ext.dcloud.net.cn/plugin?id=30)| 通告栏|
|[NumberBox](https://ext.dcloud.net.cn/plugin?id=31)| 数字输入框|
|[Pagination](https://ext.dcloud.net.cn/plugin?id=32)| 分页器|
|[PopUp](https://ext.dcloud.net.cn/plugin?id=329)| 弹出层|
|[Rate](https://ext.dcloud.net.cn/plugin?id=33)| 评分|
|[SegmentedControl](https://ext.dcloud.net.cn/plugin?id=54)| 分段器|
|[Steps](https://ext.dcloud.net.cn/plugin?id=34)| 步骤条|
|[SwipeAction](https://ext.dcloud.net.cn/plugin?id=181)| 滑动操作|
|[SwiperDot](https://ext.dcloud.net.cn/plugin?id=284)| 轮播图指示点|
|[Tag](https://ext.dcloud.net.cn/plugin?id=35)| 标签|


**更多组件**

除了基础组件、uni-ui，插件市场还有更多扩展组件、模板，包括前端组件和原生扩展组件，具体见[插件市场](https://ext.dcloud.net.cn/)。

关于其他vue的web组件库、小程序组件库是否能在uni-app中使用的问题，参考[http://ask.dcloud.net.cn/article/35489](http://ask.dcloud.net.cn/article/35489)