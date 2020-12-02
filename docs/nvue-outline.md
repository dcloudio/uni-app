## 介绍
```uni-app``` App端内置了一个基于 weex 改进的原生渲染引擎，提供了原生渲染能力。

在App端，如果使用vue页面，则使用webview渲染；如果使用nvue页面(native vue的缩写)，则使用原生渲染。一个App中可以同时使用两种页面，比如首页使用nvue，二级页使用vue页面，hello uni-app示例就是如此。

虽然nvue也可以多端编译，输出H5和小程序，但nvue的css写法受限，所以如果你不开发App，那么不需要使用nvue。

以往的 weex ，有个很大的问题是它只是一个高性能的渲染器，没有足够的API能力（比如各种push sdk集成、蓝牙等能力调用），使得开发时非常依赖原生工程师协作，开发者本来想节约成本，结果需要前端、iOS、Android 3拨人开发，适得其反。 nvue 解决了这个问题，让前端工程师可以直接开发完整 App，并提供丰富的插件生态和云打包。这些组合方案，帮助开发者切实的提高效率、降低成本。

同时```uni-app```扩展了weex原生渲染引擎的很多排版能力，修复了很多bug。比如

- Android端良好支持边框阴影，[详情](#阴影)
- iOS端支持高斯模糊，<a href="https://ask.dcloud.net.cn/article/36617#view" target="_blank">详情</a>
- 可实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果
- 优化圆角边框绘制性能

## 适用场景

nvue的组件和API写法与vue页面一致，其内置组件还比vue页面内置组件增加了更多，[详见](https://uniapp.dcloud.io/component/list)。

如果你熟悉 weex或react native 开发，那么 nvue 是你的更优选择，能切实提升你的开发效率，降低成本。

如果你是web前端，不熟悉原生排版，那么建议你仍然以使用vue页面为主，在App端某些vue页面表现不佳的场景下使用 nvue 作为强化补充。这些场景如下：

1. 需要高性能的区域长列表或瀑布流滚动。webview的页面级长列表滚动时没有性能问题的（就是滚动条覆盖webview整体高度），但页面中某个区域做长列表滚动，则需要使用nvue的```list```、```recycle-list```、```waterfall```等组件([详见](https://uniapp.dcloud.io/component/list))。这些组件的性能要高于vue页面里的区域滚动组件```scroll-view```。
2. 复杂高性能的自定义下拉刷新。uni-app的pages.json里可以配置原生下拉刷新，但引擎内置的下拉刷新样式只有雪花和circle圈2种样式。如果你需要自己做复杂的下拉刷新，推荐使用nvue的refresh组件。当然[插件市场](https://ext.dcloud.net.cn/search?q=%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)里也有很多vue下的自定义下拉刷新插件，只要是基于renderjs或wxs的，性能也可以商用，只是没有nvue的```refresh```组件更极致。
3. 左右拖动的长列表。在webview里，通过```swiper```+```scroll-view```实现左右拖动的长列表，前端模拟下拉刷新，这套方案的性能不好。此时推荐使用nvue，比如新建uni-app项目时的[新闻示例模板](https://ext.dcloud.net.cn/plugin?id=103)，就采用了nvue，切换很流畅。
4. 实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果，效果可参考hello uni-app模板里的```swiper-list```。[详见](https://ext.dcloud.net.cn/plugin?id=2128)
5. 如需要将软键盘右下角按钮文字改为“发送”，则需要使用nvue。比如聊天场景，除了软键盘右下角的按钮文字处理外，还涉及聊天记录区域长列表滚动，适合nvue来做。
6. 解决前端控件无法覆盖原生控件的层级问题。当你使用```map```、```video```、```live-pusher```等原生组件时，会发现前端写的```view```等组件无法覆盖原生组件，层级问题处理比较麻烦，此时使用nvue更好。或者在vue页面上也可以覆盖一个subnvue（一种非全屏的nvue页面覆盖在webview上），以解决App上的原生控件层级问题。[详见](https://uniapp.dcloud.io/component/native-component)
7. 如深度使用```map```组件，建议使用nvue。除了层级问题，App端nvue文件的map功能更完善，和小程序拉齐度更高，多端一致性更好。
8. 如深度使用```video```，建议使用nvue。比如如下2个场景：video内嵌到swiper中，以实现抖音式视频滑动切换，例子见[插件市场](https://ext.dcloud.net.cn/search?q=%E4%BB%BF%E6%8A%96%E9%9F%B3)；nvue的视频全屏后，通过```cover-view```实现内容覆盖，比如增加文字标题、分享按钮。
9. 直播推流：nvue下有```live-pusher```组件，和小程序对齐，功能更完善，也没有层级问题。
10. 对App启动速度要求极致化。App端v3编译器模式下，如果首页使用nvue且在manifest里配置fast模式，那么App的启动速度可以控制在1秒左右。而使用vue页面的话，App的启动速度一般是3秒起，取决于你的代码性能和体积。

但注意，在某些场景下，nvue不如vue页面，如下：
1. ```canvas```。nvue的canvas性能不高，尤其是Android App平台，所以这个组件干脆没有内置，而是需要单独引入。操作canvas动画，最高性能的方式是使用vue页面的renderjs技术，在hello uni-app里的canvas示例就是如此。
2. 动态横竖屏。nvue页面的css不支持媒体查询，所以横竖屏动态切换、动态适配屏幕是很困难的。


## 纯原生渲染模式
uni-app在App端，支持vue页面和nvue页面混搭、互相跳转。也支持纯nvue原生渲染。

启用纯原生渲染模式，可以减少App端的包体积、减少使用时的内存占用。因为webview渲染模式的相关模块将被移除。

在manifest.json源码视图的```"app-plus"```下配置```"renderer":"native"```，即代表App端启用纯原生渲染模式。此时pages.json注册的vue页面将被忽略，vue组件也将被原生渲染引擎来渲染。

如果不指定该值，默认是不启动纯原生渲染的。

```javascript
	// manifest.json    
	{    
	     // ...    
		/* App平台特有配置 */    
	    "app-plus": {    
	        "renderer": "native", //App端纯原生渲染模式
	    }    
	}
```


## 编译模式
**weex编译模式和uni-app编译模式**

如你之前是weex开发者，可以继续查阅本章节，否则可以跳过看下一节[快速上手](#快速上手)。

weex的组件和JS API，与uni-app不同。uni-app与微信小程序相同。

考虑到weex用户的迁移，uni-app 也支持weex的代码写法。在manifest.json中可以配置使用**weex编译模式**或**uni-app编译模式**。选择weex编译模式时将不支持uni-app的组件和jsapi，需要开发者参考weex官方文档的写法来写代码。 比如 weex 编译模式用```<div>```。uni-app 编译模式则使用```<view>```。

一般情况建议使用```uni-app```模式，除非历史weex代码较多，需要逐步过渡。同时注意weex编译模式的切换是项目级的，不支持同项目下某个nvue页面使用weex模式，另一个nvue页面使用uni-app模式。


|			|weex编译模式						|uni-app编译模式					|
|--			|--									|--								|
|平台		|仅App								|所有端，包含小程序和H5			|
|组件		|weex组件如div						|uni-app组件如view				|
|生命周期	|只支持weex生命周期					|支持所有uni-app生命周期			|
|JS API		|weex API、uni API、Plus API			|weex API、uni API、Plus API		|
|单位		|750px是屏幕宽度，wx是固定像素单位		|750rpx是屏幕宽度，px是固定像素单位|
|全局样式	|手动引入							|app.vue的样式即为全局样式		|
|页面滚动	|必须给页面套或组件					|默认支持页面滚动					|

在 manifest.json 中修改2种编译模式，```manifest.json``` -> ```app-plus``` -> ```nvueCompiler``` 切换编译模式。

```nvueCompiler``` 有两个值：

- weex
- uni-app

```javascript
	// manifest.json    
	{    
	    // ...    
	    /* App平台特有配置 */    
	    "app-plus": {    
	        "nvueCompiler":"uni-app" //是否启用 uni-app 模式  
	    }    
	}
```

如果没有在manifest里明确配置，默认是```weex模式```。这是为了向下兼容。

weex 编译模式不支持 ```onNavigationBarButtonTap``` 生命周期函数的写法。在 nvue 中监听原生标题栏按钮点击事件，详见：[uni.onNavigationBarButtonTap](https://uniapp.dcloud.net.cn/frame?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)。

weex编译模式不支持onShow生命周期，但熟悉5+的话，可利用监听webview的```addEventListener``` show事件实现onShow效果。

weex 编译模式不支持```vuex```。

nvue 的页面跳转，与 weex 不同，仍然遵循 uni-app 的路由模型。vue 页面和 nvue 页面之间不管怎么跳转，都遵循这个模型。包括 nvue 页面跳向 nvue 页面。每个页面都需要在 pages.json 中注册，调用 uni-app 的 [路由 API](https://uniapp.dcloud.net.cn/api/router) 进行跳转。

原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（```list```、```waterfall```、```scroll-view/scroller```），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 ```scroller```，页面内容过高会自动滚动。（组件不会套，页面有```recycle-list```时也不会套）。 可以设置不自动套。

```javascript
	{
		"path": "",
		"style": {
			"disableScroll": true // 不嵌套 scroller
		}
	}
```

weex 编译模式下支持使用 weex ui ，例子[详见](https://ext.dcloud.net.cn/plugin?id=442)。但相比uni-app插件市场及官方[uni ui](https://ext.dcloud.net.cn/plugin?id=55)而言，weex语法的组件生态还是比较欠缺的。

## 快速上手
### 1.新建nvue页面
在HBuilderX的 ```uni-app``` 项目中，新建页面，弹出界面右上角可以选择是建立```vue```页面还是```nvue```页面，或者2个同时建。

不管是vue页面还是nvue页面，都需要在```pages.json```中注册。如果在HBuilderX中新建页面是会自动注册的，如果使用其他编辑器，则需要自行在pages.json里注册。

如果一个页面路由下同时有vue页面和nvue页面，即出现同名的vue和nvue文件。那么在App端，会仅使用nvue页面，同名的vue文件将不会被编译到App端。而在非App端，会优先使用vue页面。

如果不同名，只有nvue页面，则在非app端，只有uni-app编译模式的nvue文件才会编译。

### 2.开发nvue页面
```nvue``` 页面结构同 ```vue```, 由 ```template```、```style```、```script``` 构成。

- template： 模板写法、数据绑定同 vue。组件支持2种模式，
	- weex 组件，同weex写法，参考：[weex 内置组件](https://weex.apache.org/zh/docs/components/a.html)；
	- uni-app组件，同uni-app写法。
- style：由于采用原生渲染，**并非所有浏览器的 css 均支持，布局模型只支持 flex 布局**，虽然不会造成某些界面布局无法实现，但写法要注意。详见：[样式](#样式)
- script：写法同 vue，并支持3种API：
	- nvue API ：仅支持App端，uni-app编译模式也可使用。使用前需先引入对应模块，参考：[模块引入API](#API)
	- uni API：[https://uniapp.dcloud.io/api/README](https://uniapp.dcloud.io/api/README)
	- plus API：仅支持App端。[http://www.html5plus.org/doc/h5p.html](http://www.html5plus.org/doc/h5p.html)

### 3.调试 nvue 页面
HBuilderX内置了weex调试工具的强化版，包括审查界面元素、看log、debug打断点，[详见](https://uniapp.dcloud.io/snippet?id=%e5%85%b3%e4%ba%8e-app-%e7%9a%84%e8%b0%83%e8%af%95)


## nvue开发与vue开发的常见区别

基于原生引擎的渲染，虽然还是前端技术栈，但和web开发肯定是有区别的。

1. nvue 页面控制显隐只可以使用```v-if```不可以使用```v-show```
2. nvue 页面只能使用``` flex ```布局，不支持其他布局方式。页面开发前，首先想清楚这个页面的纵向内容有什么，哪些是要滚动的，然后每个纵向内容的横轴排布有什么，按 flex 布局设计好界面。
3. nvue 页面的布局排列方向默认为竖排（```column```），如需改变布局方向，可以在 ```manifest.json``` -> ```app-plus``` -> ```nvue``` -> ```flex-direction``` 节点下修改，仅在 uni-app 模式下生效。[详情](https://uniapp.dcloud.io/collocation/manifest?id=nvue)。
4. nvue页面编译为H5、小程序时，会做一件css默认值对齐的工作。因为weex渲染引擎只支持flex，并且默认flex方向是垂直。而H5和小程序端，使用web渲染，默认不是flex，并且设置```display:flex```后，它的flex方向默认是水平而不是垂直的。所以nvue编译为H5、小程序时，会自动把页面默认布局设为flex、方向为垂直。当然开发者手动设置后会覆盖默认设置。
5. 文字内容，必须、只能在```<text>```组件下。不能在```<div>```、```<view>```的```text```区域里直接写文字。否则即使渲染了，也无法绑定js里的变量。
6. 只有```text```标签可以设置字体大小，字体颜色。
7. 布局不能使用百分比、没有媒体查询。
8. nvue 切换横竖屏时可能导致样式出现问题，建议有 nvue 的页面锁定手机方向。
9. 支持的css有限，不过并不影响布局出你需要的界面，```flex```还是非常强大的。详见
10. 不支持背景图。但可以使用```image```组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
11. css选择器支持的比较少，只能使用 class 选择器。[详见](#样式)
12. nvue 的各组件在安卓端默认是透明的，如果不设置```background-color```，可能会导致出现重影的问题。
13. ```class``` 进行绑定时只支持数组语法。
14. Android端在一个页面内使用大量圆角边框会造成性能问题，尤其是多个角的样式还不一样的话更耗费性能。应避免这类使用。
15. nvue页面没有```bounce```回弹效果，只有几个列表组件有```bounce```效果，包括 ```list```、```recycle-list```、```waterfall```。
16. 原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（```list```、```waterfall```、```scroll-view/scroller```），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 ```scroller```，页面内容过高会自动滚动。（组件不会套，页面有```recycle-list```时也不会套）。后续会提供配置，可以设置不自动套。
17. 在 App.vue 中定义的全局js变量不会在 nvue 页面生效。```globalData```和```vuex```是生效的。
18. App.vue 中定义的全局css，对nvue和vue页面同时生效。如果全局css中有些css在nvue下不支持，编译时控制台会报警，建议把这些不支持的css包裹在[条件编译](https://uniapp.dcloud.io/platform)里，```APP-PLUS-NVUE```
19. 不能在 ```style``` 中引入字体文件，nvue 中字体图标的使用参考：[加载自定义字体](#addRule)。如果是本地字体，可以用```plus.io```的API转换路径。
20. 目前不支持在 nvue 页面使用 ```typescript/ts```。
21. nvue 页面关闭原生导航栏时，想要模拟状态栏，可以[参考文章](https://ask.dcloud.net.cn/article/35111)。但是，仍然强烈建议在nvue页面使用原生导航栏。nvue的渲染速度再快，也没有原生导航栏快。原生排版引擎解析```json```绘制原生导航栏耗时很少，而解析nvue的js绘制整个页面的耗时要大的多，尤其在新页面进入动画期间，对于复杂页面，没有原生导航栏会在动画期间产生整个屏幕的白屏或闪屏。


## iOS平台下拉组件refresh组件注意问题

iOS平台默认情况下滚动容器组件（如```list```、```waterfall```组件）内容不足时，由于没有撑满容器的可视区域会导致无法上下滚动，此时无法操作下拉刷新功能，无法触发```refresh```组件的```@refresh```、```@pullingdown```事件。 此时可在容器组件中配置```alwaysScrollableVertical```属性值为```true```来设置支持上下滚动，支持下拉刷新操作。


##### 用法
```html
	<list class="scroll-v list" enableBackToTop="true" scroll-y alwaysScrollableVertical="true">
		<refresh class="refresh" @refresh="onrefresh()" @pullingdown="onpullingdown">
			//refresh content
		</refresh>
		<cell v-for="(newsitem,index) in list" :key="newsitem.id">
			//cell content
		</cell>
	</list>
```


> Android平台不存在此问题