## 介绍

```uni-app``` App端内置了一个基于 [weex](https://weex.apache.org/) 改进的原生渲染引擎，提供了原生渲染能力。

在App端，如果使用vue页面，则使用webview渲染；如果使用nvue页面(native vue的缩写)，则使用原生渲染。一个App中可以同时使用两种页面，比如首页使用nvue，二级页使用vue页面，hello uni-app示例就是如此。

虽然nvue也可以多端编译，输出H5和小程序，但nvue的css写法受限，所以如果你不开发App，那么不需要使用nvue。

以往的 weex ，有个很大的问题是它只是一个高性能的渲染器，没有足够的API能力（比如各种push sdk集成、蓝牙等能力调用），使得开发时非常依赖原生工程师协作，开发者本来想节约成本，结果需要前端、iOS、Android 3拨人开发，适得其反。
nvue 解决了这个问题，让前端工程师可以直接开发完整 App，并提供丰富的[插件生态](https://ext.dcloud.net.cn/)和云打包。这些组合方案，帮助开发者切实的提高效率、降低成本。

同时uni-app扩展了weex原生渲染引擎的很多排版能力，修复了很多bug。比如
- Android端良好支持边框阴影
- iOS端支持高斯模糊，[详情](https://ask.dcloud.net.cn/article/36617#view)
- 可实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果
- 优化圆角边框绘制性能

## 适用场景

nvue的组件和API写法与vue页面一致，其内置组件还比vue页面内置组件增加了更多，[详见](https://uniapp.dcloud.io/component/list)。但nvue在css的写法限制较多，具体如下：
- nvue的css仅支持flex布局，是webview的css语法的子集。这是因为操作系统原生排版不支持非flex之外的web布局。当然flex足以排布出各种页面，只是写法需要适应。
- nvue的css，在选择器方面支持的较少，只支持简单的class="classA"。
- class 进行绑定时只支持数组语法。
- 有些web的css属性在nvue里无法支持，比如背景图。但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念

如果你熟悉 weex或react native 开发，那么 nvue 是你的更优选择，能切实提升你的开发效率，降低成本。

如果你是web前端，不熟悉原生排版，那么建议你仍然以使用vue页面为主，在App端某些vue页面表现不佳的场景下使用 nvue 作为强化补充。这些场景如下：
- 需要高性能的区域长列表或瀑布流滚动。webview的页面级长列表滚动时没有性能问题的（就是滚动条覆盖webview整体高度），但页面中某个区域做长列表滚动，则需要使用nvue的list、recycle-list、waterfall等组件。这些组件的性能要高于vue页面里的区域滚动组件scroll-view。
- 复杂高性能的自定义下拉刷新。uni-app的pages.json里可以配置原生下拉刷新，但引擎内置的下拉刷新样式只有雪花和circle圈2种样式。如果你需要自己做复杂的下拉刷新，推荐使用nvue的refresh组件。当然插件市场里也有很多vue下的自定义下拉刷新插件，只要是基于renderjs或wxs的，性能也可以商用，只是没有nvue的refresh组件更极致。
- 左右拖动的长列表。在webview里，通过swiper+scroll-view实现左右拖动的长列表，前端模拟下拉刷新，这套方案的性能不好。此时推荐使用nvue，比如新建uni-app项目时的新闻示例模板，就采用了nvue，切换很流畅。
- 实现区域滚动长列表+左右拖动列表+吸顶的复杂排版效果，效果可参考hello uni-app模板里的swiper-list
- 如需要将软键盘右下角按钮文字改为“发送”，则需要使用nvue
- 解决前端控件无法覆盖原生控件的层级问题。当你使用map、video、live-pusher等原生组件时，会发现前端写的view等组件无法覆盖原生组件，层级问题处理比较麻烦，此时使用nvue更好。或者在vue页面上也可以覆盖一个subnvue（一种非全屏的nvue页面覆盖在webview上），以解决App上的原生控件层级问题。[详见](https://ask.dcloud.net.cn/article/35948)
- 如深度使用map组件，建议使用nvue。除了层级问题，App端nvue文件的map功能更完善，和小程序拉齐度更高，多端一致性更好。
- 如深度使用video，建议使用nvue。比如如下2个场景：video内嵌到swiper中，以实现抖音式视频滑动切换，例子见[插件市场](https://ext.dcloud.net.cn/plugin?id=664)；nvue的视频全屏后，通过cover-view实现内容覆盖，比如增加文字标题、分享按钮。
- 直播推流：nvue下有live-pusher组件，和小程序对齐，功能更完善，也没有层级问题。
- 对App启动速度要求极致化。App端v3编译器模式下，如果首页使用nvue且在manifest里配置fast模式，那么App的启动速度可以控制在1秒左右。而使用vue页面的话，App的启动速度一般是3秒起，取决于你的代码性能和体积。

但注意，在某些场景下，nvue不如vue页面，如下：
- canvas。nvue的canvas性能不高，尤其是Android App平台，所以这个组件干脆没有内置，而是需要单独引入。操作canvas动画，最高性能的方式是使用vue页面的renderjs技术，在hello uni-app里的canvas示例就是如此。
- 动态横竖屏。nvue页面的css不支持媒体查询，所以横竖屏动态切换、动态适配屏幕是很困难的。


## 纯原生渲染模式
uni-app在App端，支持vue页面和nvue页面混搭、互相跳转。也支持纯nvue原生渲染。

启用纯原生渲染模式，可以减少App端的包体积、减少使用时的内存占用。因为webview渲染模式的相关模块将被移除。

在manifest.json源码视图的`"app-plus"`下配置`"renderer":"native"`，即代表App端启用纯原生渲染模式。此时pages.json注册的vue页面将被忽略，vue组件也将被原生渲染引擎来渲染。

如果不指定该值，默认是不启动纯原生渲染的。

```json
// manifest.json    
{    
    // ...    
     /* App平台特有配置 */    
    "app-plus": {    
        "renderer": "native", //App端纯原生渲染模式
    }    
}   

```

## weex编译模式和uni-app编译模式

如你之前是weex开发者，可以继续查阅本章节，否则可以跳过看下一节。

weex的组件和jsapi，与uni-app不同。uni-app与微信小程序相同。

考虑到weex用户的迁移，uni-app 也支持weex的代码写法。在manifest.json中可以配置使用weex编译模式或uni-app编译模式。选择weex编译模式时将不支持uni-app的组件和jsapi，需要开发者参考weex官方文档的写法来写代码。
比如 weex 编译模式用`<div>`。uni-app 编译模式则使用`<view>`。

一般情况建议使用uni-app模式，除非历史weex代码较多，需要逐步过渡。同时注意weex编译模式的切换是项目级的，不支持同项目下某个nvue页面使用weex模式，另一个nvue页面使用uni-app模式。

|			|weex编译模式						|uni-app编译模式					|
|--			|--									|--									|
|平台		|仅App								|所有端，包含小程序和H5				|
|组件		|weex组件如`div`					|uni-app组件如`view`				|
|生命周期	|只支持weex生命周期					|支持所有uni-app生命周期			|
|JS API		|weex API、uni API、Plus API		|weex API、uni API、Plus API		|
|单位		|750px是屏幕宽度，wx是固定像素单位	|750rpx是屏幕宽度，px是固定像素单位	|
|全局样式	|手动引入							|app.vue的样式即为全局样式			|
|页面滚动	|必须给页面套<list>或<scroller>组件	|默认支持页面滚动					|

在 manifest.json 中修改2种编译模式，`manifest.json` -> `app-plus` -> `nvueCompiler` 切换编译模式。

`nvueCompiler` 有两个值：
- weex
- uni-app

```json
// manifest.json    
{    
    // ...    
     /* App平台特有配置 */    
    "app-plus": {    
        "nvueCompiler":"uni-app" //是否启用 uni-app 模式  
    }    
}   

```

如果没有在manifest里明确配置，默认是weex模式。这是为了向下兼容。

weex 编译模式不支持 onNavigationBarButtonTap 生命周期函数的写法。在 ``nvue`` 中监听原生标题栏按钮点击事件，详见：[uni.onNavigationBarButtonTap](/use-weex?id=onnavigationbarbuttontap)。

weex编译模式不支持onShow生命周期，但熟悉5+的话，可利用监听webview的addEventListener show事件实现onShow效果。

weex 编译模式不支持vuex。

nvue 的页面跳转，与 weex 不同，仍然遵循 uni-app 的路由模型。vue 页面和 nvue 页面之间不管怎么跳转，都遵循这个模型。包括 nvue 页面跳向 nvue 页面。每个页面都需要在 pages.json 中注册，调用  `uni-app` 的 [路由 API](/api/router) 进行跳转。

原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（list、waterfall、scroll-view/scroller），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 scroller，页面内容过高会自动滚动。（组件不会套，页面有recycle-list时也不会套）。后续会提供配置，可以设置不自动套。

weex 编译模式下支持使用 weex ui ，例子见：[https://ext.dcloud.net.cn/plugin?id=442](https://ext.dcloud.net.cn/plugin?id=442)。但相比uni-app插件市场及官方uni ui而言，weex语法的组件生态还是比较欠缺的。

## 快速上手

### 1. 新建 nvue 页面

在HBuilderX的 ``uni-app`` 项目中，新建页面，弹出界面右上角可以选择是建立vue页面还是nvue页面，或者2个同时建。

不管是vue页面还是nvue页面，都需要在pages.json中注册。如果在HBuilderX中新建页面是会自动注册的，如果使用其他编辑器，则需要自行在pages.json里注册。

如果一个页面路由下同时有vue页面和nvue页面，即出现同名的vue和nvue文件。那么在App端，会仅使用nvue页面，同名的vue文件将不会被编译到App端。而在非App端，会优先使用vue页面。

如果不同名，只有nvue页面，则在非app端，只有uni-app编译模式的nvue文件才会编译。


### 2. 开发 nvue 页面

``nvue`` 页面结构同 ``vue``, 由 template、style、script 构成。
* template： 模板写法、数据绑定同 ``vue``。组件支持2种模式，1、 ``weex`` 组件，同weex写法，参考：[weex 内置组件](https://weex.apache.org/zh/docs/components/a.html)；2、``uni-app``组件，同uni-app写法。
* style：由于采用原生渲染，**并非所有浏览器的 css 均支持，布局模型只支持 flex 布局**，虽然不会造成某些界面布局无法实现，但写法要注意。详见：[weex 样式](https://weex.apache.org/cn/wiki/common-styles.html)
* script：写法同 ``vue``，并支持3种API：
	- weex API ：仅支持App端，uni-app编译模式也可使用。使用前需先引入对应模块，参考：[weex 模块引入](https://weex.apache.org/zh/docs/api/weex-variable.html#requiremodule)
	- uni API：[https://uniapp.dcloud.io/api/README](https://uniapp.dcloud.io/api/README)
	- plus API：仅支持App端。[http://www.html5plus.org/doc/h5p.html](http://www.html5plus.org/doc/h5p.html)

### 3. 调试 nvue 页面

HBuilderX内置了weex调试工具的强化版，包括审查界面元素、看log、debug打断点，[详见](https://uniapp.dcloud.io/snippet?id=%e5%85%b3%e4%ba%8e-app-%e7%9a%84%e8%b0%83%e8%af%95)


## nvue 和 vue 相互通讯

在 uni-app 中，nvue 和 vue 页面可以混搭使用。

推荐使用`uni.$on`,`uni.$emit`的方式进行页面通讯，旧的通讯方式（`uni.postMessage`及`plus.webview.postMessageToUniNView`）不再推荐使用。

**通讯实现方式**

```
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

**步骤：**

1. 在 ``nvue`` 使用 ``uni.postMessage(data)`` 发送数据通讯，``data`` 为 ``JSON`` 格式（键值对的值仅支持String）。
2. 在 ``App.vue`` 里使用 ``onUniNViewMessage`` 进行监听。

**代码示例:** 

```html
//test.nvue
<template>
	<div @click="test">
		<text>点击页面发送数据</text>
	</div>
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

**步骤：**

1. 在 ``vue`` 里使用 ``plus.webview.postMessageToUniNView(data,nvueId)`` 发送消息，``data`` 为 ``JSON`` 格式（键值对的值仅支持String），``nvueId`` 为 ``nvue`` 所在 webview 的 id，webview的 id 获取方式参考：[$getAppWebview()](/frame?id=getappwebview)。
2. 在 ``nvue`` 里引用 ``globalEvent`` 模块监听 ``plusMessage`` 事件，如下：

```javascript
const globalEvent = weex.requireModule('globalEvent');
globalEvent.addEventListener("plusMessage", e => {
  console.log(e.data);//得到数据
});
```

**代码示例：**

```html
//index.nvue
<template>
	<div @click="test">
		<text>点击页面发送数据{{num}}</text>
	</div>
</template>
<script>
	const globalEvent = weex.requireModule('globalEvent');
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
除了通信事件，vue 和 nvue 页面之间还可以共享变量和存储。
uni-app提供的共享变量和数据的方案如下：


**1. vuex:**

自```HBuilderX 2.2.5```起，nvue支持vuex。这是vue官方的状态管理工具。

**注意：**
- 不支持直接引入`store`使用，可以使用`mapState`、`mapGetters`、`mapMutations`等辅助方法或者使用`this.$store`

**2. uni.storage:**

vue和nvue页面可以使用相同的`uni.storage`存储。这个存储是持久化的。
比如登陆状态可以保存在这里。

App端还支持plus.sqlite，也是共享通用的。

**3. globalData:**

小程序有globalData机制，这套机制在uni-app里也可以使用，全端通用。
在`App.vue`文件里定义globalData，如下：
```html
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

js中操作globalData的方式如下：
`getApp().globalData.text = 'test'`

如果需要把globalData的数据绑定到页面上，可在页面的onShow声明周期里进行变量重赋值。


## nvue 里使用 BindingX

uni-app是逻辑层和视图层分离的。此时会产生两层通信成本。比如拖动视图层的元素，如果在逻辑层不停接收事件，因为通信损耗会产生不顺滑的体验。

[BindingX](https://alibaba.github.io/bindingx/)是weex提供的一种预描述交互语法。由原生解析BindingX规则，按此规则处理视图层的交互和动效。不再实时去js逻辑层运行和通信。

BindingX类似一种强化版的css，运行性能高，但没有js那样足够强的编程灵活性。

``uni-app`` 内置了 BindingX，可在 ``nvue`` 中使用 BindingX 完成复杂的动画效果。

* 从HBuilderX 2.3.4起，`uni-app` 编译模式可直接引用`uni.requireNativePlugin('bindingx')`模块，`weex` 模式还需使用 npm 方式引用。

* BindingX demo示例可参考 [BindingX 示例](https://alibaba.github.io/bindingx/demos) 里 ``vue`` 的相关示例，将实验田里的 ``vue`` 代码拷贝到 ``nvue`` 文件里即可。

**代码示例**

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
		data: {
			isExpanded: false
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
							token: main_binding
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
							token: btn_binding
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
							token: main_binding
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
							token: btn_binding
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

**注意**

- 暂时不要在`expression`内使用`origin`

## nvue 里使用 HTML5Plus API

- nvue页面可直接使用plus的API，并且不需要等待plus ready。

## nvue 里不支持的 uni-app API
`nvue` 支持大部分 uni-app API ，下面只列举目前还不支持的 API 。

**动画**

|API|说明|
|:-|:-|
|uni.createAnimation()|创建一个动画实例|

**滚动**

|API|说明|
|:-|:-|
|uni.pageScrollTo()|将页面滚动到目标位置|

**绘画**

canvas API使用，详见canvas文档。

**节点布局交互**

|API|说明|
|:-|:-|
|uni.createIntersectionObserver()|创建并返回一个 IntersectionObserver 对象实例|



## nvue开发与vue开发的常见区别
基于原生引擎的渲染，虽然还是前端技术栈，但和web开发肯定是有区别的。

- nvue 页面只能使用 flex 布局，不支持其他布局方式。页面开发前，首先想清楚这个页面的纵向内容有什么，哪些是要滚动的，然后每个纵向内容的横轴排布有什么，按 flex 布局设计好界面。
- 原生开发没有页面滚动的概念，页面内容高过屏幕高度并不会自动滚动，只有部分组件可滚动（list、waterfall、scroll-view/scroller），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 scroller，页面内容过高会自动滚动。（组件不会套，页面有recycle-list时也不会套）。后续会提供配置，可以设置不自动套。
- 文字内容，必须、只能在`<text>`组件下。不能在`<div>`、`<view>`的text区域里直接写文字。否则即使渲染了，也无法绑定js里的变量。
- 支持的css有限，不过并不影响布局出你需要的界面，flex还是非常强大的。[详见](https://weex.apache.org/zh/docs/styles/common-styles.html#%E7%9B%92%E6%A8%A1%E5%9E%8B)
- 不支持背景图。但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
- css选择器支持的比较少，没有web丰富。详见weex的样式文档
- class 进行绑定时只支持数组语法。
- nvue页面没有bounce回弹效果，只有几个列表组件有bounce效果，包括 list、recycle-list、waterfall。
- Android端在一个页面内使用大量圆角边框会造成性能问题，尤其是多个角的样式还不一样的话更耗费性能。应避免这类使用。
- nvue 的各组件在安卓端默认是透明的，如果不设置background-color，可能会导致出现重影的问题。
- 在 App.vue 中定义的全局js变量不会在 nvue 页面生效。globalData和vuex是生效的。
- App.vue 中定义的全局css，对nvue和vue页面同时生效。如果全局css中有些css在nvue下不支持，编译时控制台会报警，建议把这些不支持的css包裹在条件编译里，`APP-PLUS-NVUE`
- nvue 切换横竖屏时可能导致样式出现问题，建议有 nvue 的页面锁定手机方向。
- 不能在 style 中引入字体文件，nvue 中字体图标的使用参考：[weex 加载自定义字体](https://weex.apache.org/zh/docs/modules/dom.html#addrule)。如果是本地字体，可以用plus.io的API转换路径。
- 目前不支持在 nvue 页面使用 typescript/ts。
- nvue 页面 ``titleNview`` 设为 ``false``时，想要模拟状态栏，可以参考：[https://ask.dcloud.net.cn/article/35111](https://ask.dcloud.net.cn/article/35111)。

## Android平台阴影(box-shadow)问题

Android平台weex对阴影样式(`box-shadow`)支持不完善，如设置圆角边框时阴影样式显示不正常、设置动画时在`Android7`上显示不正常等。为解决这些问题，从HBuilderX 2.4.7起，新增`elevation`属性（组件的属性，不是css样式）设置组件的层级，`Number`类型，层级值越大阴影越明显，阴影效果也与组件位置有关，越靠近页面底部阴影效果越明显

**用法**

```html
<view elevation="5px"></view>
```

**注意**

- 为了避免`elevation`属性的阴影效果与阴影样式(`box-shadow`)冲突，设置`elevation`属性后`box-shadow`样式失效
- 使用`elevation`需要阴影元素的父元素大于阴影范围，否则会对阴影进行裁剪

