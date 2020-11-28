
# 概述
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

# 样式
#### nvue所支持的通用样式已在本文档中全部列出，一些组件可能有自定义样式，请参考组件文档。除此之外的属性，均不被支持。


### 注意事项

- nvue的css**仅支持flex布局**，是webview的css语法的子集。这是因为操作系统原生排版不支持非flex之外的web布局。当然flex足以排布出各种页面，只是写法需要适应。
- 在选择器方面支持的较少，只支持简单的```class="classA"```。
- class 进行绑定时只支持数组语法。
- 不支持媒体查询
- 不支持复合样式，不支持简写
- 不能在 style 中引入字体文件
- 布局不能使用百分比，如```width：100%```；
- 有些web的css属性在nvue里无法支持，比如背景图。但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
- nvue 的各组件在安卓端默认是透明的，如果不设置```background-color```，可能会导致出现重影的问题
- 文字内容，必须只能在```text```组件下，```text```组件不能换行写内容，否则会出现无法去除的周边空白
- 只有```text```标签可以设置字体大小，字体颜色

下面有些正确和错误的写法示例对比：

- 选择器仅支持class 选择器

```css
	/* 错误 */
	#id {}
	.a .b .c {}
	.a > .b {}
	
	/* 正确 */
	.class {}
```

- 不支持简写

```css
	/* 错误 */
	.class {
	    border: 1px red solid;
	}
	
	/* 正确 */
	.class {
	    border-width: 1px;
	    border-style: solid;
	    border-color: red;
	}
	
	/* 错误 */
	.class {
	    background: red;
	}
	
	/* 正确 */
	.class {
	    background-color: red;
	}
```

- nvue的```uni-app```编译模式下，App.vue 中的样式，会编译到每个 nvue文件。对于共享样式，如果有不合法属性控制台会给出警告，可以通过[条件编译](https://uniapp.dcloud.io/platform)```APP-PLUS-NVUE```屏蔽 App 中的警告。

```css
	/* 错误 */
	/*	控制台警告：
		WARNING: `border` is not a standard property name (may not be supported)  
		WARNING: `-webkit-transform` is not a standard property name (may not be supported)
	*/
	.class {
		border: 1px red solid;
		-webkit-transform: scaleY(.5);
	}

	/* 正确 */
	.class {
		border-width: 1px;
		border-style: solid;
		border-color: red;
		/* #ifndef APP-PLUS-NVUE */
		-webkit-transform: scaleY(.5);
		/* #endif*/
	}
```

## 盒模型

nvue盒模型基于 CSS 盒模型，每个 nvue 元素都可视作一个盒子。我们一般在讨论设计或布局时，会提到「盒模型」这个概念。

盒模型描述了一个元素所占用的空间。每一个盒子有四条边界：外边距边界 ```margin edge```, 边框边界 ```border edge```, 内边距边界 ```padding edge``` 与内容边界 ```content edge```。这四层边界，形成一层层的盒子包裹起来，这就是盒模型大体上的含义。

![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ec4f2810-2fec-11eb-899d-733ae62bed2f.png)


> nvue盒模型的 ```box-sizing``` 默认为 ```border-box```，即盒子的宽高包含内容、内边距和边框的宽度，不包含外边距的宽度。

> 在 Android 平台，nvue只支持 ```overflow:hidden```。

> 在 iOS 上，nvue支持 ```overflow:hidden``` 和 ```overflow:visible```，默认是 ```overflow:visible```。




##### 基本用法
```html
	<template>
		<view>
			<image style="width: 400rpx; height: 200rpx; margin-left: 20rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png"></image>
		</view>
	</template>
```



|可选值			|描述									|
|--				|--										|
|width {length}	|宽度，默认值 0							|
|height {length}|高度，默认值 0							|

##### 内边距
padding {length}：内边距，内容和边框之间的距离，默认值 0。与标准 CSS 类似，padding 支持简写，也可分解为以下四个：

|可选值					|描述								|
|--						|--									|
|padding {length}		|上、右、下、左四边内边距，默认值 0	|
|padding-left {length}	|左内边距，默认值 0					|
|padding-right {length}	|右内边距，默认值 0					|
|padding-top {length}	|上内边距，默认值 0					|
|padding-bottom {length}|下内边距，默认值 0					|


##### 边框
```border-style```设定边框样式，如果四个方向的边框样式不同，可分别设置：

|可选值	|描述					|
|--		|--						|
|border-left-style {string}		|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-top-style {string}		|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-right-style {string}	|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|
|border-bottom-style {string}	|可选值为 ```solid```， ```dashed```， ```dotted```，默认值 ```solid```	|



|可选值	|描述					|
|--		|--						|
|solid	|实线边框，默认值 ```solid```	|
|dashed	|方形虚线边框			|
|dotted	|圆点虚线边框			|


##### border-width
```border-width```：设定边框宽度，非负值, 默认值 0，如果四个方向的边框宽度不同，可分别设置：

|可选值							|描述				|
|--								|--					|
|border-width {length}			|非负值, 默认值 0	|
|border-left-width {length}		|非负值, 默认值 0	|
|border-top-width {length}		|非负值, 默认值 0	|
|border-right-width {length}	|非负值, 默认值 0	|
|border-bottom-width {length}	|非负值, 默认值 0	|

##### border-color
```border-color```：设定边框颜色，默认值 ```#000000```，如果四个方向的边框颜色不同，可分别设置：


|可选值						|描述					|
|--							|--						|
|border-color {color}		|默认值 ```#000000```	|
|border-left-color {color}	|默认值 ```#000000```	|
|border-top-color {color}	|默认值 ```#000000```	|
|border-right-color {color}	|默认值 ```#000000```	|
|border-bottom-color {color}|默认值 ```#000000```	|

##### border-radius
```border-radius```：设置边框的圆角，默认值 0，如果四个方向的圆角弧度不同，可分别设置：

|可选值								|描述				|
|--									|--					|
|border-radius {length}				|非负值, 默认值 0	|
|border-bottom-left-radius {length}	|非负值, 默认值 0	|
|border-bottom-right-radius {length}|非负值, 默认值 0	|
|border-top-left-radius {length}	|非负值, 默认值 0	|
|border-top-right-radius {length}	|非负值, 默认值 0	|

> ```border-radius```和```border-width```定义了圆心角为90度的椭圆弧的长轴和半长轴的大小。如果邻接两边```border-radius```(或```border-width```不一致，nvue绘制的边框曲线可能不够平滑。


##### 外边距
margin {length}：外边距，元素和元素之间的空白距离，默认值 0。与标准 CSS 类似，margin 支持简写，也可分解为四边：

|可选值					|描述								|
|--						|--									|
|margin {length}		|上、右、下、左四边外边距，默认值 0	|
|margin-left {length}	|左外边距，默认值 0					|
|margin-right {length}	|右外边距，默认值 0					|
|margin-top {length}	|上外边距，默认值 0					|
|margin-bottom {length}	|下外边距，默认值 0					|




##### Android 兼容性

尽管 ```overflow: hidden``` 在 Android 上是默认行为，但只有下列条件都满足时，一个父 view 才会去剪切它的子 ```view```。

- 父view是```view```, ```cell```, ```refresh``` 或 ```loading```。
- 系统版本是 Android 4.3 或更高。
- 系统版本不是 Andorid 7.0。
- 父 view 没有 ```background-image``` 属性或系统版本是 Android 5.0 或更高。




## Flexbox


### Flex 容器
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

nvue布局模型基于 CSS Flexbox，以便所有页面元素的排版能够一致可预测，同时页面布局能适应各种设备或者屏幕尺寸。Flexbox 包含 flex 容器和 flex 成员项。如果一个nvue元素可以容纳其他元素，那么它就成为 flex 容器。

> 文档中未说明的 flexbox 属性**均不支持**：如 ```order```、```flex-grow``` 、```flex-shrink``` 、 ```flex-basis```、```align-content```、```align-self``` 等。

**在 nvue中，Flexbox 是默认且唯一的布局模型，所以你不需要手动为元素添加 ```display: flex;``` 属性。**


### flex-direction
	
定义了 flex 容器中 flex 成员项的排列方向，默认值为 ```column```

|可选值			|描述								|
|--				|--									|
|column			|竖排，从上到下排列					|
|column-reverse	|反向竖排，排布方向与```flex-direction:column```相反|
|row			|横排，从左到右排布						|
|row-reverse	|反向横排，排布方向与```flex-direction:row```相反	|



### flex-wrap
	
决定了 flex 成员项在一行还是多行分布，默认值为```nowrap```

|可选值			|描述												|
|--				|--													|
|nowrap			| 不换行，flex 成员项在一行排布，排布的开始位置由direction指定	|
|wrap			| 换行，第一行在上方，flex 成员项在多行排布，排布的开始位置由direction指定	|
|wrap-reverse	|换行，第一行在下方，行为类似于```wrap```，排布方向与其相反						|



### justify-content
	
定义了 flex 容器中 flex 成员项在主轴方向上如何排列以处理空白部分。默认值为 ```flex-start```

|可选值			|描述										|
|--				|--											|
|flex-start		|左对齐，所有的 flex 成员项都排列在容器的前部	|
|flex-end		|右对齐，则意味着成员项排列在容器的后部				|
|center			|居中，即中间对齐，成员项排列在容器中间、两边留白		|
|space-between	|两端对齐，空白均匀地填充到 flex 成员项之间	|
|space-around	|表示 flex 成员项两侧的间隔相等，所以，成员项之间的间隔比成员项与边框的间隔大一倍	|


![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9610d190-2f17-11eb-97b7-0dc4655d6e68.png)



	
### align-items
	
定义了 flex 容器中 flex 成员项在纵轴方向上如何排列以处理空白部分。默认值为 stretch。

|可选值		|描述								|
|--			|--									|
|stretch	|即拉伸高度至 flex 容器的大小			|
|flex-start	|上对齐，所有的成员项排列在容器顶部	|
|flex-end	|下对齐，所有的成员项排列在容器底部	|
|center		|中间对齐，所有成员项都垂直地居中显示	|

![图片描述文字](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/ad305030-2f17-11eb-b680-7980c8a877b8.png)

### flex
	
flex 属性定义了 flex 成员项可以占用容器中剩余空间的大小。
flex {number}：值为 number 类型。
- 如果所有的成员项设置相同的值 flex: 1，它们将平均分配剩余空间。
- 经常用作自适应布局，将父容器的display：flex，侧边栏大小固定后，将内容区flex：1，内容区则会自动放大占满剩余空间。
- 如果一个成员项设置的值为 flex: 2，其它的成员项设置的值为 flex: 1，那么这个成员项所占用的剩余空间是其它成员项的 2 倍。

**注意**
	
**Flex 成员项暂不支持 ```flex-shrink``` 、 ```flex-basis```、```align-content``` 属性**。

**该属性不支持 flex: flex-grow | flex-shrink | flex-basis 的简写。**


``` html
	//Gird布局
	<template>
		<view>
			<view v-for="(v, i) in list" class="row">
				<view v-for="(text, k) in v" class="item">
					<view>
						<text>{{text}}</text>
					</view>
				</view>
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					list: [
						['A', 'B', 'C'],
						['D', 'E', 'F'],
						['G', 'H', 'I']
					]
				}
			}
		}
	</script>
	<style scoped>
	.row {
		flex-direction: row;
		height: 80px;
	}
	.item {
		flex: 1;
		justify-content: center;
		align-items: center;
		border-width: 1;
		border-style: solid;
		border-color: #FFFFFF;
		background-color: #00AAFF;
	}
	</style>
	</style>
```



``` html
	//等高模块
	<template>
	  <view>
	    <view style="width:300px; height:100px;">
	      <view style="flex: 1;background-color:blue"></view>
	      <view style="flex: 1;background-color:red"></view>
	      <view style="flex: 1;background-color:yellow"></view>
	    </view>
	  </view>
	</template>
```




## position 定位

设置定位类型。默认值为 ```relative```。

|可选值		|描述													|
|--			|--														|
|relative	|是默认值，指的是相对定位									|
|absolute	|绝对定位，以元素的容器作为参考系						|
|fixed		|固定定位，保证元素在页面窗口中的对应位置显示，即使窗口是滚动的它也不会移动						|
|sticky		|指的是仅当元素滚动到页面之外时，元素会固定在页面窗口的顶部，达到吸顶效果/粘性定位（布局）	|

> 运用 position:sticky或position: fixed 可实现头部导航栏固定(吸顶效果)


``` html
	//水平垂直居中
	<template>
		<view class="wrapper">
			<view class="box"></view>
		</view>
	</template>
	<style scoped>
		.wrapper{
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: #cccccc;
			justify-content: center;
			align-items: center;
		}
		.box{
			width: 200px;
			height: 200px;
			background-color: #fc0000;
		}
	</style>
```





> Android 兼容性

如果定位元素超过容器边界，在 Android 下，超出部分将不可见，原因在于 Android 端元素 ```overflow``` 默认值为 ```hidden```，但目前 Android 暂不支持设置 ```overflow: visible```。


## Transition 

```transition```允许 CSS 的属性值在一定的时间区间内平滑地过渡。
### transition-property
设置过渡动画的属性名，设置不同样式 ```transition``` 效果的键值对，默认值为空，表示不执行任何过渡效果


|参数名				|描述				|
|--					|--					|
|width				|宽度参与过渡动画		|
|height				|高度参与过渡动画		|
|top				|顶部距离参与过渡动画	|
|bottom				|底部距离参与过渡动画	|
|left				|左侧距离参与过渡动画	|
|right				|右侧距离参与过渡动画	|
|background-color	|背景颜色参与过渡动画	|
|opacity			|不透明度参与过渡动画	|
|transform			|变换类型参与过渡动画	|




### transition-duration
指定过渡的持续时间 (单位是毫秒)，默认值是 0，表示没有动画效果。

### transition-delay
指定请求过渡操作到执行过渡之间的时间间隔 (单位是毫秒或者秒)，默认值是 0，表示没有延迟，在请求后立即执行过渡。

### transition-timing-function
描述过渡执行的速度曲线，用于使过渡更为平滑。默认值是 ```ease```。下表列出了所有合法的属性：


|参数名							|描述																																			|
|--								|--																																				|
|ease							|transition 过渡逐渐变慢的过渡效果																												|
|ease-in						|transition 过渡慢速开始，然后变快的过渡效果																									|
|ease-out						|transition 过渡快速开始，然后变慢的过渡效果																									|
|ease-in-out					|transition 过渡慢速开始，然后变快，然后慢速结束的过渡效果																						|
|linear							|transition 过渡以匀速变化																														|
|cubic-bezier(x1, y1, x2, y2)	|使用三阶贝塞尔函数中自定义 transition 变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅  [cubic-bezier](https://cubic-bezier.com/?spm=a2c7j.-zh-docs-styles-common-styles.0.0.3f952164z39lZD#.17,.67,.83,.67)和 [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve?spm=a2c7j.-zh-docs-styles-common-styles.0.0.3f952164z39lZD)	|


	
### 示例





``` html
<template>
	<view class="row">
		<view class="box" :class="{'active':isActive}" @click="isActive = !isActive">
			<image class="img" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/9c877c50-2f0c-11eb-899d-733ae62bed2f.png" mode="aspectFill"></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"isActive":false
			}
		}
	}
</script>
<style scoped>
	.row{
		align-items: center;
		justify-content: center;
	}
	.box{
		margin:20px;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		width:200rpx;
		height:200rpx;
		background-color: #007AFF;
		transition-property: width, height, background-color;
		transition-duration:0.3s;
		transition-delay:0.1s;
		transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
	}
	.active{
		width:300rpx;
		height:300rpx;
		background-color: #6bd8ff;
	}
	.img{
		width:80rpx;
		height:80rpx;
	}
</style>
```

<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0d2fc7a0-3089-11eb-8ff1-d5dcf8779628.gif" />

## Transform

应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。


|参数名							|描述																																			|
|--								|--																																				|
|translateX({<length/percentage>})	|X 轴方向平移，支持长度单位或百分比。																												|
|translateY({<length/percentage>})	|Y 轴方向平移，支持长度单位或百分比。																	|
|translate({<length/percentage>} {<length/percentage>})	|X 轴和 Y 轴方向同时平移，```translateX``` + ```translateY``` 简写。									|
|scaleX(<number>)				|X 轴方向缩放，值为数值，表示缩放比例，不支持百分比。							|
|scaleY(<number>)						|Y 轴方向缩放，值为数值，表示缩放比例，不支持百分比。																													|
|scale(<number>)|X 轴和 Y 轴方向同时缩放，```scaleX``` + ```scaleY``` 简写。|
|rotate(<angle/degree>)|将元素围绕一个定点（由 ```transform-origin``` 属性指定）旋转而不变形的转换。指定的角度定义了旋转的量度。若角度为正，则顺时针方向旋转，否则逆时针方向旋转。|
|rotateX(<angle/degree>)|X 轴方向的旋转。|
|rotateY(<angle/degree>)|Y 轴方向的旋转。|
|rotateZ(<angle/degree>)|Z 轴方向的旋转。|
|perspective(<length>)|指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。Android 4.1及以上版本支持。|
|transform-origin {length/percentage/关键字(top/left/right/bottom)}:|设置一个元素变形的原点，仅支持 2D 坐标。|

> 除了```perspective```和```transform-origin```，```transition```支持了```transform```的全部能力。 其中transform的```rotate``` 和```rotatez``` 等效.


	
### 示例


``` html
<template>
	<view class="card">
		<view class="box">
			<view class="row-box">
				<view @click="isRotate = !isRotate" class="fill row-rotate " :class="{'rotate':isRotate}"></view>
			</view>
			<text>rotate(45deg) </text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isScale = !isScale" class="fill row-scale" :class="{'scale':isScale}"></view>
			</view>
			<text>scale(2)</text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isTranslateX = !isTranslateX" class="fill row-translateX" :class="{'translateX':isTranslateX}"></view>
			</view>
			<text>translateX(45px)</text>
		</view>
		<view class="box">
			<view class="row-box">
				<view @click="isTranslateY = !isTranslateY" class="fill row-translateY" :class="{'translateY':isTranslateY}"></view>
			</view>
			<text>translateY(45px)</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				"isRotate": false,
				"isScale":false,
				"isTranslateX":false,
				"isTranslateY":false
			}
		},
	}
</script>
<style>
	.card {
		width:710rpx;
		margin:20rpx;
		flex-direction:row;
		flex-wrap: wrap;
	}
	.box{
		width:355rpx;
		height:355rpx;
		justify-content: center;
		align-items: center;
	}
	.row-box{
		width:200rpx;
		height:200rpx;
		margin:10rpx;
		background-color: #DDDDDD;
	}
	.fill{
		width:200rpx;
		height:200rpx;
		position: relative;
		background-color: #03A9F4;
		opacity: 0.5;
	}
	.row-rotate{
		transition-duration:0.3s;
		transform:rotate(0deg);
	}
	.rotate{
		transition-duration:0.3s;
		transform:rotate(45deg);
	}
	.row-scale{
		transition-duration:0.3s;
		transform:scale(1);
	}
	.scale{
		transform:scale(2);
	}
	.row-translateX{
		transition-duration:0.3s;
		transform:translateX(0px);
	}
	.translateX{
		transform:translateX(45px);
	}
	.row-translateY{
		transition-duration:0.3s;
		transform:translateY(0px);
	}
	.translateY{
		transform:translateY(45px);
	}
</style>
```





<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/810e5de0-3088-11eb-b997-9918a5dda011.gif" />


## 伪类


|参数名		|描述								|
|--			|--									|
|active		|所有组件都支持						|
|focus		|只有 ```input``` 组件和 ```textarea``` 组件支持|
|disabled	|只有 ```input``` 组件和 ```textarea``` 组件支持|
|enabled	|只有 ```input``` 组件和 ```textarea``` 组件支持|

**注意**
> 同时生效的时候，优先级高覆盖优先级低。
> 例如：```input:active:enabled``` 和 ```input:active``` 同时生效，前者覆盖后者

- 互联规则如下所示

<img width="400px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/f3069420-2f17-11eb-8a36-ebb87efcf8c0.png" />


## 线性渐变

所有组件均支持线性渐变。[CSS3 渐变](https://www.w3cschool.cn/css3/oj26bfli.html)
你可以通过  ``` background-image ```属性创建线性渐变。
``` javascript
	background-image:linear-gradient(to bottom right,#AD18F9,#05DFC7);
```

只支持两种颜色的渐变，渐变方向如下：

|渐变方向		|描述				|
|--				|--					|
|to right		|从左向右渐变		|
|to left		|从右向左渐变		|
|to bottom		|从上到下渐变		|
|to top			|从下到上渐变		|
|to bottom right|从左上角到右下角	|
|to top left	|从右下角到左上角	|

**注意**

> ```background-image``` 优先级高于 ```background-color```，这意味着同时设置 ```background-image``` 和 ```background-color```，```background-color``` 被覆盖。
> ```background``` 不支持简写。
> 
> **目前暂不支持 radial-gradient（径向渐变）。**


<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/8f70e4e0-308b-11eb-97b7-0dc4655d6e68.PNG" />


## 阴影

### IOS平台：阴影```box-shadow```

	
	{box-shadow:inset offset-x offset-y blur-radius color}
	{box-shadow:投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径  阴影颜色}


|参数			|描述																										|
|--				|--																											|
|inset（可选）	|默认阴影在边框外。使用 ```inset``` 后，阴影在边框内（即使是透明边框），背景之上内容之下。						|
|offset-x		|设置水平偏移量，如果是负值则阴影位于元素左边。																|
|offset-y		|设置垂直偏移量，如果是负值则阴影位于元素上面。																|
|blur-radius	|设置模糊半径，px 单位长度值，值越大，模糊面积越大，阴影就越大越淡。不能为负值。默认为0，此时阴影边缘锐利。	|
|color			|设置阴影颜色																								|

示例
``` css
	.box4 {
	    box-shadow: inset 3px 5px 20px rgb(255, 69, 0);
	}
```

**注意**
- 目前仅 iOS 支持 ```box-shadow``` 属性，Android 暂不支持，可以使用```elevation```或者图片代替。
- 每个元素只支持设置一个阴影效果，不支持多个阴影同时作用于一个元素。





### Android平台：阴影```elevation```

Android平台weex对阴影样式(box-shadow)支持不完善，如设置圆角边框时阴影样式显示不正常、设置动画时在Android7上显示不正常、在Android10上出现闪烁现象等。

为解决这些问题，从HBuilderX 2.4.7起，新增elevation属性（**组件的属性，不是css样式**）设置组件的层级，Number类型，层级值越大阴影越明显，阴影效果也与组件位置有关，越靠近页面底部阴影效果越明显


	
用法
``` html
	<view elevation="5px"></view>
```


#### 注意
- 设置```elevation```属性产生的阴影暂时无法修改颜色
- 设置```elevation```后当前组件的层级会高于其他未设置elevation组件的层级，都设置```elevation```值域越大则层级越高！组件覆盖的场景需要留意
- 为了避免```elevation```属性的阴影效果与阴影样式(```box-shadow```)冲突，设置```elevation```属性后```box-shadow```样式失效
- 使用```elevation```需要阴影元素的父元素大于阴影范围，否则会对阴影进行裁剪
- IOS不支持```elevation```属性，请使用```box-shadow```设置阴影



## 文本样式

### color
color {color}：文字颜色，支持如下字段：
 * RGB（ rgb(255, 0, 0) ） 
 * RGBA（ rgba(255, 0, 0, 0.5) ） 
 * 十六进制（ #ff0000 ）；
 * 精简写法的十六进制（ #f00 ）
 * 色值关键字（red）

> 只有```text```标签可以设置字体颜色

### font-size
font-size {number}：文字大小，只有```text```标签可以设置字体大小

### font-style
font-style {string}：字体类别。可选值 ```normal``` | ```italic```，默认为 ```normal```。

### font-weight
font-weight {string}：字体粗细程度。默认值: ```normal```；

- 可选值: ```normal```, ```bold```, 100, 200, 300, 400, 500, 600, 700, 800, 900
- ```normal``` 等同于 400, ```bold``` 等同于 700；
- iOS 支持 9 种 ```font-weight```值；Android 仅支持 400 和 700, 其他值会设为 400 或 700
- 类似 ```lighter```, ```bolder``` 这样的值暂时不支持

### text-decoration
```text-decoration {string}```：字体装饰。默认值为 ```none```。

|可选值			|描述						|
|--				|--							|
|none			|默认。定义标准的文本		|
|underline		|定义文本下的一条线		|
|line-through	|定义穿过文本下的一条线	|


> 只支持 ```text``` 和 ```ricthext```
> 
> 不支持 ```text-decoration:overline```


### text-align
```text-align {string}```：对齐方式。默认值为 ```left```。

|可选值	|描述				|
|--		|--					|
|left	|把文本排列到左边	|
|center	|把文本排列到中间	|
|right	|把文本排列到右边|

> 不支持```text-align:justify```


### font-family
```font-family {string}```：设置字体。这个设置不保证在不同平台，设备间的一致性。
如所选设置在平台上不可用，将会降级到平台默认字体。
如果需要加载自定义字体，请参考相关[DOM.addRule](#addRule)

### text-overflow
```text-overflow {string}```：设置内容超长时的省略样式。

|可选值		|描述							|
|--			|--								|
|clip		|修剪文本						|
|ellipsis	|显示省略符号来代表被修剪的文本	|
> 只支持 ```text``` 和 ```ricthext```

### lines
```lines {number}```: 正整数，指定最大文本行数，默认```lines```值为0，表示不限制最大行数```lines```。如果文本不够长，实际展示行数会小于指定行数。

### line-height
line-height {length}: 正整数，每行文字高度。```line-height```是 top 至 bottom的距离。
```line-height```与```font-size```没有关系，因为```line-height```被 top 和 bottom 所限制，
```font-size``` 被 glyph 所解析。```line-height```和```font-size```相等一般会导致文字被截断。

### word-wrap
```word-wrap:<string>```  对nvue来说 ```anywhere``` 表示在以字符为最小元素做截断换行，其它值或不指定该属性，都以英文单词为单位进行换行。

|可选值		|描述								|
|--			|--									|
|break-word	|在长单词或 URL 地址内部进行换行	|
|normal		|只在允许的断字点换行				|
|anywhere	|以字符为最小元素做截断换行	|



# API <div id="API"></div>


对于那些不依赖 UI 交互的原生功能，nvue将其封装成模块，这是一种通过 javascript 调用原生能力的方法。
- uni-app默认内置集成原生模块，如：BindingX，Animation， DOM.addRule等。
  通过```uni.requireNativePlugin```引入 App 原生插件

  
```js
//使用方式
	const PluginName = uni.requireNativePlugin(PluginName); // PluginName 为原生插件名称
```
  
  
 - 支持项目nativeplugins目录下和插件市场原生云打包的第三方原生插件。你可以将已有原生模块移植到nvue平台也很方便。
  使用方式：在manifest.json->App原生插件配置->选择本地插件或者云端插件->打自定义基座才能使用。
  
 - nvue还支持uni-app的js API接口，若无特殊说明，则表示vue文件和nvue文件均支持。[详见](https://uniapp.dcloud.io/api/)。
  
 - nvue 里不支持的 uni-app API，[详见](#nvueAPI)



## DOM.addRule <div id="addRule"></div>

 Weex 提供 DOM.addRule 以**加载自定义字体**。开发者可以通过指定 font-family加载 iconfont 和 custom font。开发者可以使用下面的代码加载自定义字体：
``` html
	<template>
		<view>
			<text class="my-iconfont">&#xe85c;</text>	
		</view>
	</template>
	<script>
		export default{
			beforeCreate() {
				const domModule = uni.requireNativePlugin('dom')
				domModule.addRule('fontFace', {
					'fontFamily': "myIconfont",
					'src': "url('http://at.alicdn.com/t/font_2234252_v3hj1klw6k9.ttf')"
				});
			}
		}
	</script>
	<style>
		.my-iconfont {
			font-family:myIconfont;
			font-size:60rpx;
			color: #00AAFF;
		}
	</style>
	
	
```

<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/18870440-30a9-11eb-bd01-97bc1429a9ff.PNG" />


### addRule(type, contentObject)
- @fontFace 协议名称，不可修改。
- @fontFamily ```font-family```的名称。
- @src 字体地址，url('') 是保留字段，其参数如下:
	- http. 从HTTP请求加载, e.g. ```url('http://at.alicdn.com/t/font_1469606063_76593.ttf')```
	- https. 从HTTPS请求加载, e.g. ```url('https://at.alicdn.com/t/font_1469606063_76593.ttf')```
	- local, Android ONLY. 从assets目录读取, e.g. url('local://foo.ttf'), foo.ttf 是文件名在你的assets目录中.
	- file. 从本地文件读取, e.g. ```url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')```
	- data. 从base64读取, e.g. ```url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+....')```, 上述data字段不全。
	
**注意**
> addRule 方法里的 fontFamily 可以随意取。这个名字不是字体真正的名字。字体真正的名字（font-family），也就是注册到系统中的名字是保存在字体二进制文件中的。你需要确保你使用的字体的真正名字（font-family）足够特殊，否则在向系统注册时可能发生冲突，导致注册失败，你的字符被显示为‘?’。
> 如果你使用 http://www.iconfont.cn/ 来构建你的 iconfont。确保在项目设置中，设置一个特殊的 font-family 名字。默认是 “iconfont”，但极大可能发生冲突。
> 调用addRule 在 beforeCreate 中是被推荐的。




## animation

```animation```模块可以用来在组件上执行动画。JS-Animation可以对组件执行一系列简单的变换 (位置、大小、旋转角度、背景颜色和不透明度)。

举个例子，如果有一个```image```组件，通过动画你可以对其进行移动、旋转、拉伸或收缩等动作。

```html
<template>
	<view ref="test" @click="move" class="box"></view>
</template>
<script>
	const animation = weex.requireModule('animation')
	export default {
		methods: {
			move() {
				var testEl = this.$refs.test;
				animation.transition(testEl, {
					styles: {
						backgroundColor: '#007AFF',
						transform: 'translate(100px, 80px)',
						transformOrigin: 'center center'
					},
					duration: 800, //ms
					timingFunction: 'ease',
					delay: 0 //ms
				},()=>{
					uni.showToast({
						title: 'finished',
						icon:'none'
					});
				})
			}
		}
	}
</script>
<style scoped>
.box{
	width: 250rpx;
	height: 250rpx;
	background-color: #00aaff;
}
</style>
```


<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1852eff0-312d-11eb-8ff1-d5dcf8779628.gif" />




#### transition


- @ref，将要执行动画的元素。例如指定动画的元素 ref 属性为 test，可以通过调用 this.$refs.test 来获取元素的引用。
- @options，动画参数。styles，设置不同样式过渡效果的键值对，下表列出了所有合法的参数：

|可选值		|描述		|
|--			|--			|
|width	|表示动画执行后应用到组件上的宽度值。如果你需要影响布局，设置needLayout为true。默认值为computed width。|
|height		|表示动画执行后应用到组件上的高度值。如果你需要影响布局，设置设置为 needLayout为true。默认值为computed width。		|
|backgroundColor	|动画执行后应用到组件上的背景颜色，默认值为computed backgroundColor。
|opacity		|表示动画执行后应用到组件上的不透明度值，默认值为computed opacity。																																						|
|transformOrigin|```transformOrigin```定义变化过程的中心点，如transformOrigin: x-axis y-axis 参数 x-axis 可能的值为 left、center、right、长度值或百分比值，参数 y-axis 可能的值为 top、center、bottom、长度值或百分比。默认值为center center。|
|transform		|```transform```变换类型，可能包含rotate，translate，scale及其他属性。默认值为空。详见下																																			|
|duration		|指定动画的持续时间 (单位是毫秒)，默认值是 0，表示瞬间达到动画结束状态。																																				|
|delay			|指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 0，表示没有延迟，在请求后立即执行动画。																												|
|needLayout		|动画执行是否影响布局，默认值是false。																																													|
|timingFunction	|描述动画执行的速度曲线，用于描述动画已消耗时间和动画完成进度间的映射关系。默认值是 ```linear```，表示动画从开始到结束都拥有同样的速度。详见下						|

**transform** 

|可选值							|描述																					|
|--								|--																						|
|translate/translateX/translateY|指定元素要移动到的位置。单位是长度或百分比，默认值是0.									|
|rotate/rotateX/rotateY			|v0.16+ 指定元素将被旋转的角度。单位是度 角度度，默认值是0								|
|scale/scaleX/scaleY			|按比例放大或缩小元素。单位是数字，默认值是1											|
|perspective					|v0.16+ 观察者距离z=0平面的距离，在Android 4.1及以上有效。单位值数字，默认值为正无穷。	|




**timingFunction**

|可选值		|描述		|
|--			|--			|
|linear	|动画从头到尾的速度是相同的	|
|ease-in		|动画速度由慢到快				|
|ease-out		|动画速度由快到慢			|
|ease-in-out		|动画先加速到达中间点后减速到达终点			|
|cubic-bezier(x1, y1, x2, y2)		|在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间。更多关于三次贝塞尔的信息请参阅 cubic-bezier 和 Bézier curve。|

- @callback，callback是动画执行完毕之后的回调函数。在iOS平台上，你可以获取动画执行是否成功的信息。


**注意**
- iOS上可以获取 ```animation``` 是否执行成功的信息，callback中的result参数会有两种，分别是是Success与Fail。
- Android 的callback 函数不支持result参数。


> 如果需要使用CSS动画，参考[transition](#transition) 或 [transform](#transform) 。











## nvue 里使用 BindingX

```uni-app```是逻辑层和视图层分离的。此时会产生两层通信成本。比如拖动视图层的元素，如果在逻辑层不停接收事件，因为通信损耗会产生不顺滑的体验。

[BindingX](https://alibaba.github.io/bindingx/)是weex提供的一种预描述交互语法。由原生解析BindingX规则，按此规则处理视图层的交互和动效。不再实时去js逻辑层运行和通信。

BindingX类似一种强化版的```css```，运行性能高，但没有js那样足够强的编程灵活性。

```uni-app``` 内置了 BindingX，可在 ```nvue``` 中使用 BindingX 完成复杂的动画效果。

- 从HBuilderX 2.3.4起，```uni-app``` 编译模式可直接引用```uni.requireNativePlugin('bindingx')```模块，weex 模式还需使用 npm 方式引用。

- BindingX demo示例可参考 BindingX 示例 里 ```vue``` 的相关示例，将实验田里的 vue 代码拷贝到 ```nvue``` 文件里即可。


##### 注意
- 暂时不要在```expression```内使用```origin```


##### 代码示例:

```html
	<template>
	    <div class="container">
	        <div ref="b1" class="btn" style="background-color:#6A1B9A" @click="clickBtn">
	            <text class="text">A</text>
	        </div>
	        <div ref="b2" class="btn" style="background-color:#0277BD" @click="clickBtn">
	            <text class="text">B</text>
	        </div>
	        <div ref="b3" class="btn" style="background-color:#FF9800" @click="clickBtn">
	            <text class="text">C</text>
	        </div>
	        <div ref="main_btn" class="btn" @click="clickBtn">
	            <image class="image" ref="main_image" src="https://gw.alicdn.com/tfs/TB1PZ25antYBeNjy1XdXXXXyVXa-128-128.png" />
	        </div>
	    </div>
	</template>
	<script>
	    const Binding = uni.requireNativePlugin('bindingx');
	    module.exports = {
	        data() {
	            return {
	                isExpanded: false
	            }
	        },
	        methods: {
	            getEl: function(el) {
	                if (typeof el === 'string' || typeof el === 'number') return el;
	                if (WXEnvironment) {
	                    return el.ref;
	                } else {
	                    return el instanceof HTMLElement ? el : el.$el;
	                }
	            },
	            collapse: function() {
	                let main_btn = this.getEl(this.$refs.main_btn);
	                let main_image = this.getEl(this.$refs.main_image);
	                let b1 = this.getEl(this.$refs.b1);
	                let b2 = this.getEl(this.$refs.b2);
	                let b3 = this.getEl(this.$refs.b3);
	                let main_binding = Binding.bind({
	                    eventType: 'timing',
	                    exitExpression: 't>800',
	                    props: [{
	                        element: main_image,
	                        property: 'transform.rotateZ',
	                        expression: 'easeOutQuint(t,45,0-45,800)'
	
	                    }, {
	                        element: main_btn,
	                        property: 'background-color',
	                        expression: "evaluateColor('#607D8B','#ff0000',min(t,800)/800)"
	                    }]
	                }, function(res) {
	                    if (res.state === 'exit') {
	                        Binding.unbind({
	                            token: main_binding.token,
	                          eventType: 'timing'
	                        })
	                    }
	                });
	                let btn_binding = Binding.bind({
	                    eventType: 'timing',
	                    exitExpression: 't>800',
	                    props: [{
	                        element: b1,
	                        property: 'transform.translateY',
	                        expression: "easeOutQuint(t,-150,150,800)"
	                    }, {
	                        element: b2,
	                        property: 'transform.translateY',
	                        expression: "t<=100?0:easeOutQuint(t-100,-300,300,700)"
	                    }, {
	                        element: b3,
	                        property: 'transform.translateY',
	                        expression: "t<=200?0:easeOutQuint(t-200,-450,450,600)"
	                    }]
	                }, function(res) {
	                    if (res.state === 'exit') {
	                        Binding.unbind({
	                            token: btn_binding.token,
	                          eventType: 'timing'
	                        })
	                    }
	                })
	            },
	            expand: function() {
	                let main_btn = this.getEl(this.$refs.main_btn);
	                let main_image = this.getEl(this.$refs.main_image);
	                let b1 = this.getEl(this.$refs.b1);
	                let b2 = this.getEl(this.$refs.b2);
	                let b3 = this.getEl(this.$refs.b3);
	                let main_binding = Binding.bind({
	                    eventType: 'timing',
	                    exitExpression: 't>100',
	                    props: [{
	                        element: main_image,
	                        property: 'transform.rotateZ',
	                        expression: 'linear(t,0,45,100)'
	                    }, {
	                        element: main_btn,
	                        property: 'background-color',
	                        expression: "evaluateColor('#ff0000','#607D8B',min(t,100)/100)"
	                    }]
	                }, function(res) {
	                    if (res.state === 'exit') {
	                        Binding.unbind({
	                            token: main_binding.token,
	                          eventType: 'timing'
	                        })
	                    }
	                });
	                let btn_binding = Binding.bind({
	                    eventType: 'timing',
	                    exitExpression: 't>800',
	                    props: [{
	                        element: b1,
	                        property: 'transform.translateY',
	                        expression: "easeOutBounce(t,0,0-150,800)"
	                    }, {
	                        element: b2,
	                        property: 'transform.translateY',
	                        expression: "t<=100?0:easeOutBounce(t-100,0,0-300,700)"
	                    }, {
	                        element: b3,
	                        property: 'transform.translateY',
	                        expression: "t<=200?0:easeOutBounce(t-200,0,0-450,600)"
	                    }]
	                }, function(res) {
	                    if (res.state === 'exit') {
	                        Binding.unbind({
	                            token: btn_binding.token,
	                          eventType: 'timing'
	                        })
	                    }
	                })
	            },
	            clickBtn: function(e) {
	                if (this.isExpanded) {
	                    this.collapse();
	                } else {
	                    this.expand();
	                }
	                this.isExpanded = !this.isExpanded;
	            }
	        }
	    }
	</script>
	<style>
	    .container {
	        flex: 1;
	    }
	    .image {
	        width: 60px;
	        height: 60px;
	    }
	    .text {
	        color: #ffffff;
	        font-size: 30px;
	    }
	    .btn {
	        width: 100px;
	        height: 100px;
	        background-color: #ff0000;
	        align-items: center;
	        justify-content: center;
	        position: absolute;
	        border-radius: 50px;
	        bottom: 25px;
	        right: 25px;
	    }
	</style>
```

<img width="300px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/6c9f84b0-30a6-11eb-880a-0db19f4f74bb.gif" />






## nvue 和 vue 相互通讯
在 uni-app 中，nvue 和 vue 页面可以混搭使用。

推荐使用```uni.$on```,```uni.$emit```的方式进行页面通讯，旧的通讯方式（uni.postMessage及plus.webview.postMessageToUniNView）不再推荐使用。

##### 通讯实现方式

```javascript
	// 接收信息的页面
	// $on(eventName, callback)  
	uni.$on('page-popup', (data) => {  
	    console.log('标题：' + data.title)
	    console.log('内容：' + data.content)
	})  
	
	// 发送信息的页面
	// $emit(eventName, data)  
	uni.$emit('page-popup', {  
	    title: '我是title',  
	    content: '我是content'  
	});
```

**使用此页面通讯时注意事项：要在页面卸载前，使用 uni.$off 移除事件监听器。**[参考](https://uniapp.dcloud.io/collocation/frame/communication?id=off)

### nvue 向 vue 通讯（已过期，推荐使用上面的uni.$on、uni.$emit）

##### 步骤：

1. 在 nvue 使用 uni.postMessage(data) 发送数据通讯，data 为 JSON 格式（键值对的值仅支持String）。
2. 在 App.vue 里使用 onUniNViewMessage 进行监听。

##### 代码示例:
```html
	//test.nvue
	<template>
	    <view @click="test">
	        <text>点击页面发送数据</text>
	    </view>
	</template>
	<script>
	    export default {
	        methods: {
	            test(e) {
	                uni.postMessage({test: "数据",value:"数据"});
	            }
	        }
	    }
	</script>
```

```html
	//App.vue
	<script>
	    export default {
	        onUniNViewMessage:function(e){
				console.log("App.vue收到数据")
				console.log(JSON.stringify(e.data))  
	        },
	        onLaunch: function() {
	            console.log('App Launch');
	        }
	    }
	</script>
```


### vue 向 nvue 通讯（已过期，推荐使用上面的uni.$on、uni.$emit）

##### 步骤：

1. 在 ```vue``` 里使用 ```plus.webview.postMessageToUniNView(data,nvueId)``` 发送消息，```data``` 为 ```JSON``` 格式（键值对的值仅支持String），```nvueId``` 为 ```nvue``` 所在 webview 的 id，webview的 id 获取方式参考：[$getAppWebview()](https://uniapp.dcloud.net.cn/collocation/frame/window?id=getappwebview)。
2. 在 ```nvue``` 里引用 ```globalEvent``` 模块监听 ```plusMessage``` 事件，如下： 


```javascript
	const globalEvent = uni.requireNativePlugin('globalEvent');
	globalEvent.addEventListener("plusMessage", e => {
		console.log(e.data);//得到数据
	});
```

##### 代码示例:

```javascript
	//index.nvue
	<template>
	    <div @click="test">
	        <text>点击页面发送数据{{num}}</text>
	    </div>
	</template>
	<script>
	    const globalEvent = uni.requireNativePlugin('globalEvent');
	    export default {
	        data() {
	            return {
	                num: "0"
	            }
	        },
	        created() {
	            globalEvent.addEventListener("plusMessage", e => {
	                console.log(e.data);
	                if (e.data.num) { //存在num时才赋值，在nvue里调用uni的API也会触发plusMessage事件，所以需要判断需要的数据是否存在
	                    this.num = e.data.num
	                }
	            });
	        },
	        methods: {
	            test(e) {
	                uni.navigateTo({
	                    url: '../test/test'
	                })
	            }
	        }
	    }
```

```html
	//test.vue
	<template>
	    <view>
	        <button type="primary" @click="test">点击改变nvue的数据</button>
	    </view>
	</template>
	<script>
	    export default {
	        methods: {
	            test() {
	                var pages = getCurrentPages();
	                var page = pages[pages.length - 2];
	                var currentWebview = page.$getAppWebview();
	                plus.webview.postMessageToUniNView({
	                    num: "123"
	                }, currentWebview.id);
	                uni.navigateBack()
	            }
	        }
	    }
	</script>
```




## vue 和 nvue 共享的变量和数据

除了通信事件，vue 和 nvue 页面之间还可以共享变量和存储。 ```uni-app```提供的共享变量和数据的方案如下：

1. **vuex:** 自HBuilderX 2.2.5起，nvue支持```vuex```。这是vue官方的状态管理工具。
> 注意：不支持直接引入```store```使用，可以使用```mapState```、```mapGetters```、```mapMutations```等辅助方法或者使用```this.$store```
2. **uni.storage:**
	- vue和nvue页面可以使用相同的```uni.storage```存储。这个存储是持久化的。 比如登陆状态可以保存在这里。
	- App端还支持```plus.sqlite```，也是共享通用的。
3. **globalData:** 小程序有```globalData```机制，这套机制在```uni-app```里也可以使用，全端通用。 在App.vue文件里定义```globalData```，如下：

```javascript
	<script>  
	    export default {  
	        globalData: {  
	            text: 'text'  
	        },  
	        onLaunch: function() {  
	            console.log('App Launch')  
	        },  
	        onShow: function() {  
	            console.log('App Show')  
	        },  
	        onHide: function() {  
	            console.log('App Hide')  
	        }  
	    }  
	</script>
```


- js中操作```globalData```的方式如下： ```getApp().globalData.text = 'test'```
- 如果需要把```globalData```的数据绑定到页面上，可在页面的onShow声明周期里进行变量重赋值。






## nvue 里使用 HTML5Plus API
nvue页面可直接使用plus的API，并且不需要等待plus ready。


## nvue 里不支持的 uni-app API<div id="nvueAPI"></div>
nvue 支持大部分 uni-app API ，下面只列举目前还**不支持的 API** 。

##### 动画

|API		|说明		|
|--			|--			|
|uni.createAnimation()	|创建一个动画实例	|


##### 滚动

|API		|说明		|
|--			|--			|
|uni.pageScrollTo()	|将页面滚动到目标位置	|


##### 节点布局交互

|API		|说明		|
|--			|--			|
|uni.createIntersectionObserver()	|创建并返回一个 IntersectionObserver 对象实例	|

##### 绘画

canvas API使用，[详见canvas文档](https://uniapp.dcloud.net.cn/api/canvas/createCanvasContext)。





