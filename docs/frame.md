
```uni-app``` 使用vue的语法+小程序的标签和API。

## 开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，```uni-app``` 约定了如下开发规范：

- 页面文件遵循 [Vue 单文件组件 (SFC) 规范](https://vue-loader.vuejs.org/zh/spec.html)
- 组件标签靠近小程序规范，详见[uni-app 组件规范](component/README.md)
- 接口能力（JS API）靠近微信小程序规范，但需将前缀 ```wx``` 替换为 ```uni```，详见[uni-app接口规范](api/README.md)
- 数据绑定及事件处理同 ```Vue.js``` 规范，同时补充了App及页面的生命周期
- 为兼容多端运行，建议使用flex布局进行开发

## 目录结构

一个uni-app工程，默认包含如下目录及文件：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，<a href="/component/web-view">详见</a>
├─platforms             存放各平台专用页面的目录，<a href="/platform?id=%E6%95%B4%E4%BD%93%E7%9B%AE%E5%BD%95%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91">详见</a>
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，<b>注意：</b>静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录，<a href="/frame?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81">详见</a>
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 <a href="/frame?id=应用生命周期">应用生命周期</a>
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
	</code>
</pre>

**Tips**

- `static` 目录下的 `js` 文件不会被编译，如果里面有 `es6` 的代码，不经过转换直接运行，在手机设备上会报错。
- `css`、`less/scss` 等资源同样不要放在 `static` 目录下，建议这些公用的资源放在 `common` 目录下。
- HbuilderX 1.9.0+ 支持在根目录创建 `ext.json` `sitemap.json` 文件。  

|有效目录|说明|
|:-:|:-:|
|app-plus|5+App|
|h5|H5|
|mp-weixin|微信小程序|
|mp-alipay|支付宝小程序|
|mp-baidu|百度小程序|

## 生命周期


### 应用生命周期

``uni-app`` 支持如下应用生命周期函数：

|函数名|说明|
|:-|:-|
|onLaunch|当``uni-app`` 初始化完成时触发（全局只触发一次）|
|onShow|当 ``uni-app`` 启动，或从后台进入前台显示|
|onHide|当 ``uni-app`` 从前台进入后台|
|onUniNViewMessage|对 ``nvue`` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](/use-weex?id=nvue-向-vue-通讯)|

**注意**

- 应用生命周期仅可在``App.vue``中监听，在其它页面监听无效。
- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942](https://ask.dcloud.net.cn/article/35942)

### 页面生命周期

``uni-app`` 支持如下页面生命周期函数：

|函数名|说明|平台差异说明|最低版本|
|:-|:-|:-|:-|
|onLoad|监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考[示例](/api/router?id=navigateto)|||
|onShow|监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面|||
|onReady|监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发|||
|onHide|监听页面隐藏|||
|onUnload|监听页面卸载|||
|onResize|监听窗口尺寸变化|5+App、微信小程序||
|onPullDownRefresh|监听用户下拉动作，一般用于下拉刷新，参考[示例](api/ui/pulldown)|||
|onReachBottom|页面上拉触底事件的处理函数|||
|onTabItemTap|点击 tab 时触发，参数为Object，具体见下方注意事项|微信小程序、百度小程序、H5、5+App（自定义组件模式）||
|onShareAppMessage|用户点击右上角分享|微信小程序、百度小程序、头条小程序、支付宝小程序||
|onPageScroll|监听页面滚动，参数为Object|||
|onNavigationBarButtonTap|监听原生标题栏按钮点击事件，参数为Object|5+ App、H5||
|onBackPress|监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：[onBackPress 详解](http://ask.dcloud.net.cn/article/35120)|5+App、H5||
|onNavigationBarSearchInputChanged|监听原生标题栏搜索输入框输入内容变化事件|5+App、H5|1.6.0|
|onNavigationBarSearchInputConfirmed|监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。|5+App、H5|1.6.0|
|onNavigationBarSearchInputClicked|监听原生标题栏搜索输入框点击事件|5+App、H5|1.6.0|

``onPageScroll`` 参数说明：

|属性|类型|说明|
|---|---|---|
|scrollTop|Number|页面在垂直方向已滚动的距离（单位px）|

``onTabItemTap`` 参数说明：

|属性|类型|说明|
|---|---|---|
|index|String|被点击tabItem的序号，从0开始|
|pagePath|String|被点击tabItem的页面路径|
|text|String|被点击tabItem的按钮文字|

**注意**
- onTabItemTap常用于点击当前tabitem，滚动或刷新当前页面。如果是点击不同的tabitem，一定会触发页面切换。
- 如果想在App端实现点击某个tabitem不跳转页面，不能使用onTabItemTap，可以使用[plus.nativeObj.view](http://www.html5plus.org/doc/zh_cn/nativeobj.html)放一个区块盖住原先的tabitem，并拦截点击事件。
- onTabItemTap在App端，从HBuilderX 1.9 的自定义组件编译模式开始支持。

``onNavigationBarButtonTap`` 参数说明：

|属性|类型|说明|
|---|---|---|
|index|Number|原生标题栏按钮数组的下标|

`onBackPress` 回调参数对象说明：

|属性|类型|说明|
|---|---|---|
|from|String|触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法。|
```javascript
export default {
	data() {
		return {};
	},
	onBackPress(options) {
		console.log('from:' + options.from)
	}
}
```

**注意**

- nvue 页面支持的生命周期参考：[nvue 生命周期介绍](/use-weex?id=生命周期)。

## 路由

``uni-app``路由全部交给框架统一管理，开发者需要在[pages.json](/collocation/pages?id=pages)里配置每个路由页面的路径及页面样式，不支持 ``Vue Router``。

### 路由跳转

``uni-app`` 有两种路由跳转方式：使用[navigator](/component/navigator)组件跳转、调用[API](/api/router)跳转。

### 页面栈

框架以栈的形式管理当前所有页面， 当发生路由切换的时候，页面栈的表现如下：

|路由方式	|页面栈表现							|触发时机																						|
|---		|---								|---																							|
|初始化		|新页面入栈							|uni-app 打开的第一个页面																			|
|打开新页面	|新页面入栈							|调用 API &nbsp; [uni.navigateTo](/api/router?id=navigateto) &nbsp;、使用组件 &nbsp;<a href="/component/navigator?id=navigator">&lt;navigator open-type="navigate"/&gt;</a>							|
|页面重定向	|当前页面出栈，新页面入栈			|调用 API  &nbsp; [uni.redirectTo](/api/router?id=redirectto) &nbsp;、使用组件&nbsp; <a href="/component/navigator?id=navigator">&lt;navigator open-type="redirectTo"/&gt;</a>							|
|页面返回	|页面不断出栈，直到目标返回页		|调用 API &nbsp;[uni.navigateBack](/api/router?id=navigateback) &nbsp; 、使用组件&nbsp;<a href="/component/navigator?id=navigator">&lt;navigator open-type="navigateBack"/&gt;</a>&nbsp;、用户按左上角返回按钮、安卓用户点击物理back按键	|
|Tab 切换	|页面全部出栈，只留下新的 Tab 页面	|调用 API &nbsp;[uni.switchTab](/api/router?id=switchtab)&nbsp;  、使用组件&nbsp; <a href="/component/navigator?id=navigator">&lt;navigator open-type="switchTab"/&gt;</a>&nbsp; 、用户切换 Tab				|
|重加载		|页面全部出栈，只留下新的页面		|调用 API &nbsp;[uni.reLaunch](/api/router?id=relaunch)&nbsp;  、使用组件 &nbsp;<a href="/component/navigator?id=navigator">&lt;navigator open-type="reLaunch"/&gt;</a>						|

## 运行环境判断

### 开发环境和生产环境
``uni-app`` 可通过 ``process.env.NODE_ENV`` 判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。
- 在HBuilderX 中，点击“运行”编译出来的代码是开发环境，点击“发行”编译出来的代码是生产环境
- cli模式下，是通行的编译环境处理方式。

```javascript
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}
```

**快捷代码块**

HBuilderX 中敲入代码块 `uEnvDev`、`uEnvProd` 可以快速生成对应 `development`、`production` 的运行环境判定代码。
```javascript
// uEnvDev
if (process.env.NODE_ENV === 'development') {
    // TODO
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
    // TODO
}
```

### 判断平台

平台判断有2种场景，一种是在编译期判断，一种是在运行期判断。

- 编译期判断
编译期判断，即条件编译，不同平台在编译出包后已经是不同的代码。详见：[条件编译](/platform)

```javascript
// #ifdef H5
	alert("只有h5平台才有alert方法")
// #endif
```
如上代码只会编译到H5的发行包里，其他平台的包不会包含如上代码。

- 运行期判断
运行期判断是指代码已经打入包中，仍然需要在运行期判断平台，此时可使用 ``uni.getSystemInfoSync().platform`` 判断客户端环境是 Android、iOS 还是小程序开发工具（在百度小程序开发工具、微信小程序开发工具、支付宝小程序开发工具中使用 ``uni.getSystemInfoSync().platform`` 返回值均为 devtools）。

```javascript
switch(uni.getSystemInfoSync().platform){
    case 'android':
       console.log('运行Android上')
       break;
    case 'ios':
       console.log('运行iOS上')
       break;
    default:
       console.log('运行在开发者工具上')
       break;
}
```

如有必要，也可以在条件编译里自己定义一个变量，赋不同值。在后续运行代码中动态判断环境。


## 页面样式与布局

### 尺寸单位

`uni-app` 支持的通用 css 单位包括 px、rpx

- px 即屏幕像素
- rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。

vue页面支持普通H5单位，但在nvue里不支持：
- rem 默认根字体大小为 屏幕宽度/20（微信小程序、头条小程序、App、H5）<span style="display:none">百度小程序16px、支付宝小程序50px</span>
- vh viewpoint height，视窗高度，1vh等于视窗高度的1%
- vw viewpoint width，视窗宽度，1vw等于视窗宽度的1%

nvue还不支持百分比单位。

App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px。**注意此时不支持 rpx**

nvue中，uni-app 模式（[nvue 不同编译模式介绍](https://ask.dcloud.net.cn/article/36074)）可以使用 px 、rpx，表现与 vue 中一致。weex 模式目前遵循weex的单位，它的单位比较特殊：

- px:，以750宽的屏幕为基准动态计算的长度单位，与 vue 页面中的 rpx 理念相同。（一定要注意 weex 模式的 px，和 vue 里的 px 逻辑不一样。）
- wx：与设备屏幕宽度无关的长度单位，与 vue 页面中的 px 理念相同


下面对 `rpx` 详细说明：

设计师在提供设计图时，一般只提供一个分辨率的图。

严格按设计图标注的 px 做开发，在不同宽度的手机上界面很容易变形。

而且主要是宽度变形。高度一般因为有滚动条，不容易出问题。由此，引发了较强的动态宽度单位需求。

微信小程序设计了 rpx 解决这个问题，`uni-app` 在 App 端、H5 端都支持了 `rpx`。

rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。```uni-app``` 规定屏幕基准宽度 750rpx。

开发者可以通过设计稿基准宽度计算页面元素 rpx 值，设计稿 1px 与框架样式 1rpx 转换公式如下：

```设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx```

换言之，页面元素宽度在 `uni-app` 中的宽度计算公式：

``` 750 * 元素在设计稿中的宽度 / 设计稿基准宽度 ```

**举例说明：**

1. 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 750`，结果为：100rpx。
2. 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 640`，结果为：117rpx。
2. 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 `uni-app` 里面的宽度应该设为：` 750 * 200 / 375`，结果为：400rpx。

**Tips**

- 注意 rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，则应该使用 px 单位。
- 如果开发者在字体或高度中也使用了 rpx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要固定高度，则应该使用 px 。
- rpx不支持动态横竖屏切换计算，使用rpx建议锁定屏幕方向
- 设计师可以用 iPhone6 作为视觉稿的标准。
- 如果设计稿不是750px，HBuilderX提供了自动换算的工具，详见：[https://ask.dcloud.net.cn/article/35445](https://ask.dcloud.net.cn/article/35445)。
- App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px，不支持 rpx。
- 早期 uni-app 提供了 upx ，目前已经推荐统一改为 rpx 了，[详见](http://ask.dcloud.net.cn/article/36130)

### 样式导入

使用```@import```语句可以导入外联样式表，```@import```后跟需要导入的外联样式表的相对路径，用```;```表示语句结束。

**示例代码：**

```
<style>
    @import "../../common/uni.css";

    .uni-card {
        box-shadow: none;
    }
</style>
```

### 内联样式

框架组件上支持使用 style、class 属性来控制组件的样式。

- style：静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。
```
<view :style="{color:color}" />
```
- class：用于指定样式规则，其属性值是样式规则中类选择器名(样式类名)的集合，样式类名不需要带上.，样式类名之间用空格分隔。
```
<view class="normal_view" />
```

### 选择器

目前支持的选择器有：

|选择器|样例|样例描述|
|:-|:-|:-|
|.class|.intro|选择所有拥有 class="intro" 的组件|
|#id|#firstname|选择拥有 id="firstname" 的组件|
|element|view|选择所有 view 组件|
|element, element|view, checkbox|选择所有文档的 view 组件和所有的 checkbox 组件|
|::after|view::after|在 view 组件后边插入内容，**仅微信小程序和5+App生效**|
|::before|view::before|在 view 组件前边插入内容，**仅微信小程序和5+App生效**|

**注意：** 
- 在 ```uni-app``` 中不能使用 ```*``` 选择器。
- ```page``` 相当于 ```body``` 节点，例如：
```css
<!-- 设置页面背景颜色 -->
page {
	background-color:#ccc;
}
```


### 全局样式与局部样式
定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

**注意：** App.vue 中通过 ``@import`` 语句可以导入外联样式，一样作用于每一个页面。

### CSS变量

uni-app 提供内置 CSS 变量

|CSS变量|描述|5+App|小程序|H5|
|:-|:-|:-|:-|:-|
|--status-bar-height|系统状态栏高度|[系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)|25px|0|
|--window-top|内容区域距离顶部的距离|0|0|NavigationBar 的高度|
|--window-bottom|内容区域距离底部的距离|0|0|TabBar 的高度|


**注意：**
- ``var(--status-bar-height)`` 此变量在微信小程序环境为固定 ``25px``，在 5+App 里为手机实际状态栏高度。
- 当设置 ``"navigationStyle":"custom"`` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 ``var(--status-bar-height)`` 的 view 放在页面顶部，避免页面内容出现在状态栏。
- 由于在H5端，不存在原生导航栏和tabbar，也是前端div模拟。如果设置了一个固定位置的居底view，在小程序和App端是在tabbar上方，但在H5端会与tabbar重叠。此时可使用`--window-bottom`，不管在哪个端，都是固定在tabbar上方。
- 目前 nvue 还不支持css变量

**代码块**

快速书写css变量的方法是：在css中敲hei，在候选助手中即可看到3个css变量。（HBuilderX 1.9.6以上支持）


示例：

```html
<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view> 状态栏下的文字 </view>
	</view>
</template>	
<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
```

```html
<template>
	<view>
		<view class="toTop">
			<!-- 这里可以放一个向上箭头，它距离底部tabbar上浮10px-->
		</view>
	</view>
</template>	
<style>
	.toTop {
		bottom: calc(var(--window-bottom) + 10px)
	}
</style>
```

### 固定值
`uni-app` 中以下组件的高度是固定的，不可修改：

|组件|描述|5+App|H5|
|:-|:-|:-|:-|
|NavigationBar|导航栏|44px|44px|
|TabBar|底部选项卡|56px|50px|

### Flex布局

为支持跨平台，框架建议使用Flex布局，关于Flex布局可以参考外部文档[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)、[阮一峰的flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)等。

### 背景图片

``uni-app`` 支持使用在 css 里设置背景图片，使用方式与普通 ``web`` 项目相同，需要注意以下几点：

- 支持 base64 格式图片。
- 支持网络路径图片。
- 使用本地路径背景图片需注意：
    1. 图片小于 40kb，``uni-app`` 会自动将其转化为 base64 格式；
    2. 图片大于等于 40kb， 需开发者自己将其转换为base64格式使用，或将其挪到服务器上，从网络地址引用。
    3. 本地背景图片的引用路径仅支持以 ~@ 开头的绝对路径（不支持相对路径）。
   ```css
        .test2 {
            background-image: url('~@/static/logo.png');
        }
   ```

### 字体图标

``uni-app`` 支持使用字体图标，使用方式与普通 ``web`` 项目相同，需要注意以下几点：

- 支持 base64 格式字体图标。
- 支持网络路径字体图标。
- 网络路径必须加协议头 ``https``。
- 从 [http://www.iconfont.cn](http://www.iconfont.cn) 上拷贝的代码，默认是没加协议头的。 
- ``uni-app`` 本地路径图标字体支持情况：
    1. 字体文件小于 40kb，``uni-app`` 会自动将其转化为 base64 格式；
    2. 字体文件大于等于 40kb， 需开发者自己转换，否则使用将不生效；
    3. 字体文件的引用路径仅支持以 ~@ 开头的绝对路径（不支持相对路径）。
   ```css
        @font-face {
            font-family: test1-icon;
            src: url('~@/static/iconfont.ttf');
        }
   ```


**示例：**

```html
<template>
	<view>
		<view>
			<text class="test">&#xe600;</text>
			<text class="test">&#xe687;</text>
			<text class="test">&#xe60b;</text>
		</view>
	</view>
</template>
<style>
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
	}
	.test {
		font-family: iconfont;
		margin-left: 20rpx;
	}
</style>
```

## ``<template/>`` 和 ``<block/>`` @template-block

``uni-app`` 支持在 template 模板中嵌套 ``<template/>`` 和 ``<block/>``，用来进行 [列表渲染](/use?id=列表渲染) 和 [条件渲染](/use?id=条件渲染)。

 ``<template/>`` 和 ``<block/>`` 并不是一个组件，它们仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
 
**代码示例**
 
```html
<template>
	<view>
		<template v-if="test">
			<view>test 为 true 时显示</view>
		</template>
        <template v-else>
        	<view>test 为 false 时显示</view>
        </template>
	</view>
</template>
```

```html
<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<view>{{item}} - {{index}}</view>
		</block>
    </view>
</template>
```

## ES6 支持
uni-app 在支持绝大部分 ES6 API 的同时，也支持了 ES7 的 await/async。

ES6 API 的支持，详见如下表格部分（`x` 表示不支持，无特殊说明则表示支持。不区分App、小程序、H5）：

|String|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|codePointAt|||||
|normalize|x|x|||
|includes|||||
|startsWith|||||
|endsWith|||||
|repeat|||||
|String.fromCodePoint||||&nbsp;|

|Array|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|copyWithin|||||
|find|||||
|findIndex|||||
|fill|||||
|entries|||||
|keys|||||
|values|x|||x|
|includes|x||||
|Array.from|||||
|Array.of||||&nbsp;|

|Number|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|isFinite|||||
|isNaN|||||
|parseInt|||||
|parseFloat|||||
|isInteger|||||
|EPSILON|||||
|isSafeInteger||||&nbsp;|

|Math|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|trunc|||||
|sign|||||
|cbrt|||||
|clz32|||||
|imul|||||
|fround|||||
|hypot|||||
|expm1|||||
|log1p|||||
|log10|||||
|log2|||||
|sinh|||||
|cosh|||||
|tanh|||||
|asinh|||||
|acosh|||||
|atanh||||&nbsp;|

|Object|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|is|||||
|assign|||||
|getOwnPropertyDescriptor|||||
|keys|||||
|getOwnPropertyNames|||||
|getOwnPropertySymbols||||&nbsp;|

|Other|iOS8|iOS9|iOS10|Android|
|:-|:-|:-|:-|:-|
|Symbol|||||
|Set|||||
|Map|||||
|Proxy|x|x||x|
|Reflect|||||
|Promise||||&nbsp;|

**注意**
- 不管哪个端都是这个数据，即便是Android4.4。因为uni-app编译器把es6语法自动转es5了。低版本Android的兼容性主要是css，太新的css语法在低版本不支持，js语法不受影响。
- 默认不需要在微信工具里继续开启es6转换。但如果用了微信的wxml自定义组件（wxcomponents目录下），uni-app编译器并不会处理这些文件中的es6代码，需要去微信工具里开启转换。从HBuilderX调起微信工具时，如果发现工程下有wxcomponents目录会自动配置微信工程打开es6转换。


## NPM支持

uni-app支持使用**npm**安装第三方包。

此文档要求开发者们对**npm**有一定的了解，因此不会再去介绍**npm**的基本功能。如若之前未接触过**npm**，请翻阅[NPM官方文档](https://docs.npmjs.com/getting-started/what-is-npm)进行学习。

**初始化npm工程**

若项目之前未使用npm管理依赖（项目根目录下无package.json文件），先在项目根目录执行命令初始化npm工程：
```shell
npm init -y
```

**安装依赖**

在项目根目录执行命令安装npm包：
```shell
npm install packageName --save
```

**使用**

安装完即可使用npm包，js中引入npm包：
```js
import package from 'packageName'
const package = require('packageName')
```

**注意**

* 为多端兼容考虑，建议优先从 [uni-app插件市场](https://ext.dcloud.net.cn/) 获取插件。直接从 npm 下载库很容易只兼容H5端。
* 非 H5 端不支持使用含有 dom、window 等操作的 vue 组件和 js 模块，安装的模块及其依赖的模块使用的 API 必须是 uni-app 已有的 [API](./api/README)（兼容小程序 API），比如：支持[高德地图微信小程序 SDK](https://www.npmjs.com/package/amap-wx)。类似[jQuery](https://www.npmjs.com/package/jquery) 等库只能用于H5端。
* node_modules 目录必须在项目根目录下。
* 支持安装 mpvue 组件，但npm方式不支持小程序自定义组件（如 wxml格式的vant-weapp），使用小程序自定义组件请参考：[小程序组件支持](./frame?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81)。
* 关于ui库的获取，详见[多端UI库](https://ask.dcloud.net.cn/article/35489)

## TypeScript 支持
在 uni-app 中使用 ts 开发，请参考 [Vue.js TypeScript 支持](https://cn.vuejs.org/v2/guide/typescript.html) 说明。

### 注意事项
在 uni-app 中使用 ts 需要注意以下事项。
#### 在 vue 文件的 script 节点声明 lang="ts"@vue-ts
声明 `lang="ts"` 后，该 vue 文件 import 进来的所有 vue 组件，均需要使用 ts 编写。

**示例代码**

改造 uni-badge.vue 
```javascript
<script lang="ts">
    // 仅展示需要修改的核心代码，完整代码请参考原来的组件。
	import Vue from 'vue';
	export default Vue.extend({
		props: {
			type: {
				type: String,
				default: 'default'
			},
			inverted: {
				type: Boolean,
				default: false
			},
			text: {
				type: [String, Number],
				default: ''
			},
			size: {
				type: String,
				default: 'normal'
			}
		},
		computed: {
			setClass(): string {
				const classList: string[] = ['uni-badge-' + this.type, 'uni-badge-size-' + this.size];
				if (this.inverted === true) {
					classList.push('uni-badge-inverted')
				}
				return classList.join(" ")
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	})
</script>
```
在 index.vue 中引用 uni-badge 组件
```javascript
<script lang="ts">
    import Vue from 'vue';
	import uniBadge from '../../components/uni-badge.vue';
	export default Vue.extend({
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			uniBadge
		}
	});
</script>
```
## 小程序组件支持

``uni-app`` 支持在 5+App 和小程序中使用**小程序组件**。

**平台差异说明**

|平台|支持情况|小程序组件存放目录|
|---|---|---|
|H5|不支持||
|5+App|支持微信小程序组件|wxcomponents|
|微信小程序|支持微信小程序组件|wxcomponents|
|支付宝小程序|支持支付宝小程序组件|mycomponents|
|百度小程序|支持百度小程序组件|swancomponents|
|头条小程序|支持头条小程序组件|ttcomponents|

此文档要求开发者对各端小程序的**自定义组件**有一定了解，没接触过小程序**自定义组件**的可以参考：

- [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
- [百度小程序自定义组件](https://smartprogram.baidu.com/docs/develop/framework/custom-component/)
- [支付宝小程序自定义组件](https://docs.alipay.com/mini/framework/custom-component-overview)
- [头条小程序自定义组件](https://developer.toutiao.com/docs/framework/custom_component_intro.html)

**目录结构**

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─wxcomponents                  微信小程序自定义组件存放目录
│   └──custom                   微信小程序自定义组件
│		├─index.js
│		├─index.wxml
│		├─index.json
│		└─index.wxss
├─mycomponents                  支付宝小程序自定义组件存放目录
│   └──custom                   支付宝小程序自定义组件
│		├─index.js
│		├─index.axml
│		├─index.json
│		└─index.wxss
├─swancomponents                百度小程序自定义组件存放目录
│   └──custom                   百度小程序自定义组件
│		├─index.js
│		├─index.swan
│		├─index.json
│		└─index.wxss
├─pages
│  └─index
│		└─index.vue
│
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
	</code>
</pre>

**使用方式**

在 ``pages.json`` 对应页面的 style -> usingComponents 引入组件：

```javascript
{
    "pages": [
        {
        	"path": "index/index",
        	"style": {
        		"usingComponents": {
        			// #ifdef APP-PLUS || MP-WEIXIN
        			 "custom": "/wxcomponents/custom/index"
        			// #endif
        			// #ifdef MP-BAIDU
        			 "custom": "/swancomponents/custom/index"
        			// #endif
        			// #ifdef MP-ALIPAY
        			 "custom": "/mycomponents/custom/index"
        			// #endif
        		}
        	}
        }
    ]
}
```

在页面中使用

```html
<!-- 页面模板 (index.vue) -->
<view>
    <!-- 在页面中对自定义组件进行引用 -->
    <custom name="uni-app"></custom>
</view>
```

**代码示例**

下面以微信小程序官方自定义组件示例 [miniprogram-slide-view](https://github.com/wechat-miniprogram/slide-view) 为例演示小程序自定义组件的使用方式。
其他组件使用示例见GitHub：[wxcomponents-template](https://github.com/dcloudio/uni-app/tree/master/examples/wxcomponents-template)。
插件市场有一个完整的``vant weapp`` 引用好的示例工程，详见[https://ext.dcloud.net.cn/plugin?id=302](https://ext.dcloud.net.cn/plugin?id=302)。

目录结构
<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─components
├─wxcomponents
│   └──miniprogram-slide-view
│		├─index.js
│		├─index.wxml
│		├─index.json
│		└─index.wxss
│
├─pages
│  └─slide-view
│		└─slide-view.vue
│
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
	</code>
</pre>
pages.json
```json
{
    "pages": [
        {
        	"path": "slide-view/slide-view",
        	"style": {
        		"navigationBarTitleText": "slide-view",
        		"usingComponents": {
        			"slide-view": "/wxcomponents/miniprogram-slide-view/index"
        		}
        	}
        }
    ]
}
```
slide-view.vue
```html
<template>
	<view class='slide'>
		<slide-view width="750" height="110" slide-width="500">
			<view slot="left" class="l">
				<image src="/static/file_transfer.jpg" class="img"></image>
				<view class='text'>
					<view class='title'>文件传输助手</view>
					<view class='time'>7:00 PM</view>
				</view>
			</view>
			<view slot="right" class="r">
				<view class='read'>标为已读</view>
				<view class='delete'>删除</view>
			</view>
		</slide-view>
	</view>
</template>
<script>
	export default {}
</script>
<style>
	.slide {
		border-bottom: 1px solid #DEDEDE;
	}
	.l {
		background-color: white;
		height: 110rpx;
		width: 750rpx;
		display: flex;
		flex-direction: row;
	}
	.r {
		height: 110rpx;
		display: flex;
		direction: row;
		text-align: center;
		vertical-align: middle;
		line-height: 110rpx;
	}
	.read {
		background-color: #ccc;
		color: #fff;
		width: 350rpx;
	}
	.delete {
		background-color: red;
		color: #fff;
		width: 150rpx;
	}
	.img {
		width: 90rpx;
		height: 90rpx;
		border-radius: 10rpx;
		margin: 10rpx 15rpx;
	}
	.text {
		display: flex;
		flex-direction: row;
	}

	.title {
		margin-top: 15rpx;
		font-size: 33rpx;
	}
	.time {
		margin-top: 15rpx;
		color: #ccc;
		font-size: 25rpx;
		margin-left: 330rpx;
	}
</style>
```

**注意事项**

* 小程序组件需要放在项目特殊文件夹 ``wxcomponents``（或 mycomponents、swancomponents）。
* HBuilderX 建立的工程 ``wxcomponents`` 文件夹在 项目根目录下。
* vue-cli 建立的工程 ``wxcomponents`` 文件夹在 ``src`` 目录下。
* 注意数据和事件绑定的差异，使用时应按照 vue 的数据和事件绑定方式
	- 属性绑定从 attr="{{ a }}"，改为 :attr="a"；从 title="复选框{{ item }}" 改为 :title="'复选框' + item"
	- 事件绑定从 bind:click="toggleActionSheet1" 改为 @click="toggleActionSheet1"
	- 阻止事件冒泡 从 catch:tap="xx" 改为 @tap.native.stop="xx"
	- wx:if 改为 v-if
	- wx:for="{{ list }}" wx:key="{{ index }}" 改为`v-for="(item,index) in list"
	- 原事件命名以短横线分隔的需要手动修改小程序组件源码为驼峰命名，比如：*this.$emit('left-click')* 修改为 *this.$emit('leftClick')*（HBuilderX 1.9.0+ 不再需要修改此项）

详细的小程序转uni-app语法差异可参考文档[https://ask.dcloud.net.cn/article/35786](https://ask.dcloud.net.cn/article/35786)。

## 致谢

```uni-app```的设计使用了 ```vue + 自定义组件``` 的模式；开发者使用```Vue```语法，了解```uni-app```的组件，就可以开发跨端App；感谢```Vue```团队！

为了照顾开发者的已有学习积累，```uni-app```的组件和api设计，基本参考了微信小程序，学过微信小程序开发，了解```vue```，就能直接上手```uni-app```；感谢微信小程序团队！

```uni-app``` 在小程序端，曾引用[mpvue](http://mpvue.com/)及[Megalo](https://megalojs.org/)，感谢美团点评技术团队、网易考拉团队的贡献!