## 介绍

```uni-app``` App端内置 [weex](https://weex.apache.org/) 渲染引擎，提供了原生渲染能力。

```uni-app``` 里根据编译配置不同，可以使用 ``weex`` 的组件，也可以使用小程序组件(即uni-app组件)。编写页面时页面后缀名为 ``.nvue``(native vue的缩写)

``nvue`` 相当于给 weex 补充了大量 uni-app 的组件和api，以及丰富的 Plus API、Native.js、原生插件。

以往的 weex ，有个很大的问题是它只是一个高性能的渲染器，没有足够的API能力，使得开发时非常依赖原生工程师协作，开发者本来想节约成本，结果需要前端、iOS、Android 3拨人开发，适得其反。而 nvue 解决了这个大问题，让前端工程师可以直接开发完整 App，并提供原生插件的市场交易和云打包。这些组合方案，开发者切实的提高效率、降低成本。

如果你已经是 weex 的开发者，具有 weex 的填坑能力，那么 nvue 是你的更优选择，能切实提升你的开发效率，降低成本。

如果你不开发App，那么你不太需要nvue。

如果你是web前端，不熟悉 weex，那么建议你仍然以使用 vue 为主，在App端某些 vue 表现不佳的场景下使用 nvue 作为强化补充：
- 左右拖动的长列表。在webview里，通过swiper+scroll-view实现左右拖动的长列表，前端模拟下拉刷新，这套方案的性能不好。此时推荐使用nvue，比如新建uni-app项目时的新闻示例模板，就是首页采用了nvue
- 如需要将软键盘右下角按钮文字改为“发送”，则需要使用nvue
- 前端控件无法覆盖原生控件的问题。在nvue下，都是原生控件，覆盖map、video等不需要cover-view（如需要发布到小程序，仍然推荐写cover-view）
- 同样因为层级问题得到解决，nvue可以实现video内嵌到swiper中，以实现抖音式视频滑动切换，例子见[插件市场](https://ext.dcloud.net.cn/plugin?id=664)；nvue的视频全屏后，仍然可以通过cover-view实现内容覆盖，比如增加文字标题、分享按钮。
- nvue下有live-pusher组件，和小程序对齐。而vue页面下使用直播，需在条件编译里单独调用plus.video的API。
- App端nvue文件的map和小程序拉齐度更高。vue里的map则与plus.map功能一致，和小程序的地图略有差异。
- App端实现粘性布局，比如滚动吸顶，则nvue才能保证高性能，例子见[插件市场](https://ext.dcloud.net.cn/plugin?id=715)

此外，App端，vue页面上也可以覆盖subnvue（一种非全屏的nvue页面覆盖在webview上），以解决App上的原生控件层级问题。[详见](https://ask.dcloud.net.cn/article/35948)

## 项目渲染模式
uni-app在App端，支持vue页面和nvue页面混搭、互相跳转。也支持纯nvue项目。

在manifest.json源码视图的`"app-plus"`下配置`"renderer":"native"`，即代表App端启用纯原生渲染模式。此时pages.json注册的vue页面将被忽略，vue组件中的代码也需覆盖nvue规范，并会被原生渲染。

启动纯原生渲染，可以减少App端的包体积、加快App启动速度。因为webview渲染模式的相关模块将被移除。

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

## nvue页面编译模式差异

uni-app 深度改进了 weex，提供了2种编译模式，一种是常规的 weex 组件模式，即编写`<div>`。另一种是 uni-app 组件模式，即编写`<view>`。后者更提供了编译为小程序和H5的能力，实现了全端输出。

也可以理解为uni-app做了一个原生渲染的小程序引擎。

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

* 如果没有在manifest里明确配置，默认是weex模式。这是为了向下兼容。

## 快速上手

### 1. 新建 nvue 页面

在HBuilderX的 ``uni-app`` 项目中，新建页面，弹出界面右上角可以选择是建立vue页面还是nvue页面，或者2个同时建。

不管是vue页面还是nvue页面，都需要在pages.json中注册。如果在HBuilderX中新建页面是会自动注册的，如果使用其他编辑器，则需要自行在pages.json里注册。

如果一个页面路由下同时有vue页面和nvue页面，即出现同名的vue和nvue文件。那么在App端，会优先使用nvue页面，同名的vue文件将不会被编译到App端。而在非App端，会优先使用vue页面。

如果不同名，只有nvue页面，则在非app端，只有uni-app编译模式的nvue文件才会编译。


### 2. 开发 nvue 页面

``nvue`` 页面结构同 ``vue``, 由 template、style、script 构成。
* template： 模板写法、数据绑定同 ``vue``。组件支持2种模式，1、 ``weex`` 组件，同weex写法，参考：[weex 内置组件](https://weex.apache.org/zh/docs/components/a.html)；2、``uni-app``组件，同uni-app写法。部分组件还未在nvue下实现，具体见：[nvue中还未支持的uni-app组件](https://ask.dcloud.net.cn/article/36074)
* style：由于采用原生渲染，**并非所有浏览器的 css 均支持，布局模型只支持 flex 布局**，虽然不会造成某些界面布局无法实现，但写法要注意。详见：[weex 样式](https://weex.apache.org/cn/wiki/common-styles.html)
* script：写法同 ``vue``，并支持3种API：
	- weex API ：使用前需先引入对应模块，参考：[weex 模块引入](https://weex.apache.org/zh/docs/api/weex-variable.html#requiremodule)
	- uni API：nvue可以使用大部分 uni API，个别API不支持，不支持列表请参照：[nvue 里还未支持的 uni-app API](/use-weex?id=nvue-里可使用的-uni-app-api)
	- plus API：在自定义组件编译模式下，nvue里可直接使用plus API


**weex组件代码示例（uni-app组件代码和普通uni-app的vue源码相同）**

```html
<template>
    <div class="example">
        <div class="item" @click="changeNum"><text class="text">点击文字，改变数字大小: {{num}}</text></div>
        <div class="item" @click="showModal('native')"><text class="text">使用 weex 的 API 弹出模态框</text></div>
        <div class="item" @click="showModal('uni')"><text class="text">使用 uni-app 的 API 弹出模态框</text></div>
		<div class="item" @click="showModal('plus')"><text class="text">使用 plus 的 API 弹出模态框</text></div>
    </div>
</template>
<script>
    export default {
        data() {return {num: 1}},
        created() {console.log('页面created')},
        methods: {
            changeNum() { this.num += 1; },
            showModal(type) {
                if (type === 'uni') {
                    uni.showModal({content: '使用 uni-app 的 API 弹出模态框'});
                }
                else if (type === 'plus') {
                    plus.nativeUI.alert('使用 uni-app 的 API 弹出模态框');
                } else {
                    var modal = weex.requireModule('modal')
                    modal.alert({message: '使用 weex 的 API 弹出模态框'});
                }
            }
        }
    }
</script>
<style>
    .example {flex-direction: column;}
    .text {line-height: 80px;font-size: 32px;color: #333;}
    .item {height: 80px;width: 690px;margin: 30px;background-color: #f8f8f8;border-width: 1px;border-color: #eee;border-radius: 10px;align-items: center;}
</style>
```


### 3. 调试 nvue 页面

HBuilderX内置了更好用的weex/uni-app调试工具，包括审查界面元素、看log、debug打断点，[详见](https://uniapp.dcloud.io/snippet?id=%e5%85%b3%e4%ba%8e-app-%e7%9a%84%e8%b0%83%e8%af%95)


## weex 生命周期

``nvue `` 的 uni-app 编译模式的生命周期同普通vue页面，[参考](https://uniapp.dcloud.io/collocation/frame/lifecycle)。而 weex 编译模式，生命周期函数同weex，具体如下：

|Vue 生命周期钩子|说明|
|---|---|
|beforeCreate|在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用|
|created	|在实例创建完成后被立即调用|
|beforeMount|在挂载开始之前被调用|
|mounted	|el 被新创建的 vm.$el 替换时调用|
|beforeUpdate|数据更新时调用|
|updated	|页面元素更新后调用|
|beforeDestroy|实例销毁之前调用|
|destroyed	|实例销毁后调用|
|errorCaptured|当捕获一个来自子孙组件的错误时被调用|

**注意：** weex 编译模式不支持 onNavigationBarButtonTap 生命周期函数的写法。在 ``nvue`` 中监听原生标题栏按钮点击事件，详见：[uni.onNavigationBarButtonTap](/use-weex?id=onnavigationbarbuttontap)。


## 页面跳转

nvue 的页面跳转，与 weex 不同，仍然遵循 uni-app 的路由模型。vue 页面和 nvue 页面之间不管怎么跳转，都遵循这个模型。包括 nvue 页面跳向 nvue 页面。

每个页面都需要在 pages.json 中注册，调用  `uni-app` 的 [路由 API](/api/router) 进行跳转。

## nvue 和 vue 相互通讯

在 uni-app 中，nvue 和 vue 页面可以混搭使用。

### nvue 向 vue 通讯

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

### vue 向 nvue 通讯

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

自```HBuilderX 2.2.5```起，nvue支持vuex

**注意：**
- 不支持直接引入`store`使用，可以使用`mapState`、`mapGetters`、`mapMutations`等辅助方法或者使用`this.$store`
- 暂时只支持`uni-app`编译模式，不支持`weex`编译模式
- `renderer:native`时也可以使用`vuex`

**2. uni.storage:**

vue和nvue页面可以使用相同的`uni.storage`存储。这个存储是持久化的。
比如登陆状态可以保存在这里。

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

如果需要把globalData的数据绑定到页面上，可在页面的onShow声明周期里进行变量重赋值。HBuilderX 2.0.3起，nvue页面在`uni-app`编译模式下，也支持onShow。

weex编译模式不支持onShow，但熟悉5+的话，可利用监听webview的addEventListener show事件实现onShow效果。


## weex 编译模式中使用 weex 第三方库

``nvue`` 的 weex 编译模式中，可以使用weex的第三方库，这里以 [Weex Ui](https://alibaba.github.io/weex-ui/) 为例，介绍如何使用。

1.初始化工程

```
npm init -y
```
2.安装依赖 (暂时只支持名称里包含weex的库)
```
npm i weex-ui -S
```
3.在nvue里面使用
```html
<template>
  <div>
      <wxc-cell label="标题" title="Weex Ui" :has-arrow="true" @wxcCellClicked="wxcCellClicked" :has-margin="true"></wxc-cell>
  </div>
</template>
<script>
  import { WxcCell } from 'weex-ui';
  export default {
    components: { WxcCell },
    methods: {
      wxcCellClicked (e) {
        console.log(e)
      }
    }
  };
</script>
```

Tis:
* 插件市场有一个集成好 weex ui 的示例，可以直接查看[https://ext.dcloud.net.cn/plugin?id=442](https://ext.dcloud.net.cn/plugin?id=442)
* 官方的uni ui库，已经支持了nvue，需要使用uni-app编译模式。详见：[https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui](https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui)

## nvue 里使用 BindingX

``uni-app`` 内置了 [BindingX](https://alibaba.github.io/bindingx/)，可在 ``nvue`` 中使用 BindingX 完成复杂的动画效果。

* 从HBuilderX 2.3.4起，`uni-app` 编译模式可直接引用`uni.requireNativePlugin('bindingx')`模块，`weex` 模式还需使用 npm 方式引用。查看如何修改 [nvue 编译模式](https://ask.dcloud.net.cn/article/36074)
* 2.3.4以前，需要通过npm的方式安装BindingX的库到项目下。使用方式可参考 [BindingX 快速开始](https://alibaba.github.io/bindingx/guide/cn_guide_start)。若引入 weex-bindingx 时发现不生效，检查项目路径，路径不能含有中文。使用npm时如果命令行报错，需要注意看命令行的提示
* 
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

- 推荐`bindingx`引入方式`uni.requireNativePlugin('bindingx')`
- 暂时不要在`expression`内使用`origin`

## nvue 里使用 HTML5Plus API

- 自定义组件编译模式，HBuilderX 1.9.8起，nvue页面可直接使用plus的API，并且同样不需要等待plus ready。
- 非自定义组件编译模式，nvue无法直接调用 HTML5Plus 相关的 API，可以通过与vue通讯的方式，在 vue 页面调用 HTML5Plus 的API，传值给nvue页面，以达到类似的结果。

以下为非自定义组件模式下，通过页面通讯在nvue页面获得设备uuid的示例（推荐老项目尽快升级为自定义组件，享受更高的性能和功能）：

nvue 页面
```html
<template>
	<div @click="test">
		<text>点击页面得到设备的uuid为：{{uuid}}</text>
	</div>
</template>
<script>
	const globalEvent = weex.requireModule('globalEvent');
	export default {
		data() {
			return {
				uuid: null
			}
		},
		created() {
			globalEvent.addEventListener("plusMessage", e => {
				console.log(e.data);
				if (e.data.detail) {
					this.uuid = e.data.detail
				}
			});
		},
		methods: {
			test(e) {
				uni.postMessage({module:"device",api:"uuid"});
			}
		}
	}
</script>
```
App.vue
```html
<script>
	export default {
		onUniNViewMessage: function(e) {
			console.log("App.vue收到数据:" + JSON.stringify(e.data));
			console.log("uuid:" + plus[e.data.module][e.data.api])
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentWebview = page.$getAppWebview();
			plus.webview.postMessageToUniNView({
				detail: plus[e.data.module][e.data.api]
			}, currentWebview.id);
		}
	}
</script>
```

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


#### nvue的新增API

为了解决nvue的weex编译模式不支持uni-app生命周期的问题，`在nvue` 里新增了几个特殊的 API。如果是uni-app编译模式，无需使用这些API：

##### uni.onNavigationBarButtonTap(CALLBACK)@onNavigationBarButtonTap

监听原生标题栏按钮点击事件。

CALLBACK 参数说明：

|属性|类型|说明|
|---|---|---|
|index|Number|原生标题栏按钮数组的下标|

**代码示例**

```javascript
export default {
    created() {
        uni.onNavigationBarButtonTap((e) => {
            console.log("监听到原生标题栏按钮点击事件");
            console.log(e);
        })
    }
}
```


##### uni.onNavigationBarSearchInputChanged(CALLBACK)

监听原生标题栏搜索输入框输入内容变化事件。

CALLBACK 参数说明：

|属性|类型|说明|
|---|---|---|
|text|String|搜索输入框输入内容|

**代码示例**

```javascript
export default {
    created() {
        uni.onNavigationBarSearchInputChanged((e) => {
            console.log("输入内容："+ e.text);
        })
    }
}
```

##### uni.onNavigationBarSearchInputConfirmed()

监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。


**代码示例**

```javascript
export default {
    created() {
        uni.onNavigationBarSearchInputConfirmed(() => {
            console.log("用户点击软键盘搜索");
        })
    }
}
```

##### uni.onNavigationBarSearchInputClicked()

监听原生标题栏搜索输入框点击事件。


**代码示例**

```javascript
export default {
    created() {
        uni.onNavigationBarSearchInputClicked(() => {
            console.log("点击输入框");
        })
    }
}
```


## nvue开发与vue开发的常见区别
基于原生引擎的渲染，虽然还是前端技术栈，但和web开发肯定是有区别的。

比如没有dom、window等对象，比如只支持flex布局，好在`uni-app`一直以来也是推动开发者不使用dom，默认使用flex布局。所以适应起来要好一些。

但仍然还有一些区别需要注意：

- nvue 页面只能使用 flex 布局，不支持其他布局方式。
- weex 下，页面内容高过屏幕高度并不会自动滚动，它没有页面滚动的概念，只有部分组件可滚动（list、waterfall、scroll-view/scroller），要滚得内容需要套在可滚动组件下。这不符合前端开发的习惯，所以在 nvue 编译为 uni-app模式时，给页面外层自动套了一个 scroller，页面内容过高会自动滚动。（组件不会套，页面有recycle-list时也不会套）。后续会提供配置，可以设置不自动套。
- weex 下，px是与屏幕宽度相关的动态单位，750px代表成屏幕宽度100%，它的静态单位是wx。在 nvue 编译为 uni-app模式时，纠正了这个问题，rpx是与屏幕宽度相关的动态单位，px是静态单位。
- 页面开发前，首先想清楚这个页面的纵向内容有什么，哪些是要滚动的，然后每个纵向内容的横轴排布有什么，按 flex 布局设计好界面。
- 文字内容，必须、只能在<text>组件下。不能在<div>、<view>的text区域里直接写文字。否则即使渲染了，也无法绑定js里的变量。
- 支持的css有限，不过并不影响布局出你需要的界面，flex还是非常强大的。[详见](https://weex.apache.org/zh/docs/styles/common-styles.html#%E7%9B%92%E6%A8%A1%E5%9E%8B)
- 不支持背景图。但可以使用image组件和层级来实现类似web中的背景效果。因为原生开发本身也没有web这种背景图概念
- css选择器支持的比较少，没有web丰富。详见weex的样式文档
- class 进行绑定时只支持数组语法。
- nvue页面没有bounce回弹效果，只有几个列表组件有bounce效果，包括 list、recycle-list、waterfall。
- Android端在一个页面内使用大量圆角边框会造成性能问题，尤其是多个角的样式还不一样。应避免这类使用。

## Android平台阴影(box-shadow)问题

Android平台weex对阴影样式(`box-shadow`)支持不完善，如设置圆角边框时阴影样式显示不正常、设置动画时在`Android7`上显示不正常等。为解决这些问题，新增`elevation`属性（组件的属性，不是css样式）设置组件的层级，`Number`类型，层级值越大阴影越明显，阴影效果也与组件位置有关，越靠近页面底部阴影效果越明显

**用法**

```html
<view elevation="5px"></view>
```

**注意**

- 为了避免`elevation`属性的阴影效果与阴影样式(`box-shadow`)冲突，设置`elevation`属性后`box-shadow`样式失效
- 使用`elevation`需要阴影元素的父元素大于阴影范围，否则会对阴影进行裁剪

## 单位说明
- weex的css单位支持如下：
	* px：以750宽的屏幕为基准动态计算的长度单位，与vue页面中的rpx理念相同。（一定要注意nvue里的px，和vue里的px逻辑不一样）
	* wx：与设备屏幕宽度无关的长度单位，与vue页面中的px理念相同
- uni-app编译模式下单位和普通vue相同，rpx是以750宽屏幕为基准的动态单位。px则是固定像素单位。[详见](/frame?id=尺寸单位)

## 注意事项
- 现阶段 nvue 的定位是 vue 的补充。在 App 平台实现一些 vue 上无法实现或性能有问题的场景。
- nvue 的各组件在安卓端默认是透明的，如果不设置background-color，可能会导致出现重影的问题。
- 在 App.vue 中定义的全局js变量不会在 nvue 页面生效。globalData和vuex是生效的。
- nvue 切换横竖屏时可能导致样式出现问题，建议有 nvue 的页面锁定手机方向。
- 不能在 style 中引入字体文件，nvue 中字体图标的使用参考：[weex 加载自定义字体](https://weex.apache.org/zh/docs/modules/dom.html#addrule)。如果是本地字体，可以用plus.io的API转换路径。
- 目前不支持在 nvue 页面使用 typescript/ts。
- nvue 页面 ``titleNview`` 设为 ``false``时，想要模拟状态栏，可以参考：[https://ask.dcloud.net.cn/article/35111](https://ask.dcloud.net.cn/article/35111)。
