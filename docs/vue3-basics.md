## 介绍


> 已经了解 Vue2，只想了解 Vue3 新功能可以参阅[vue3新功能](https://vue3js.cn/docs/zh/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)！
>  
> 已经有 Vue2 项目，需要适配 Vue3 的可参阅[vue2 项目迁移 vue3](https://uniapp.dcloud.io/migration-to-vue3)！



**Vue.js 是什么**

Vue (读音 /vjuː/，类似于 `view`) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，`Vue` 被设计为可以自底向上逐层应用。


`Vue.js` 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 `DOM` 的系统，**只关注视图层，易于上手**。所有东西都是响应式的。


 **致谢**

本文大部分内容来源于[vue3中文文档官网](https://vue3js.cn/docs/zh/)，但结合 `uni-app` 做了部分调整，以更有利于开发者快速上手。感谢Vue团队！


**vue3的优势：**

- 响应式系统提升
- 虚拟DOM重写
- 更快，性能比Vue2快1.2~2倍(diff方法优化、静态提升、时间侦听器缓存、[ssr渲染](https://uniapp.dcloud.io/collocation/ssr))
- 更小，按需编译，体积比Vue2更小
- 组合API，加强API设计一致性，实现逻辑模块化和重用
- 加强TypeScripe支持
- 暴露了自定义渲染API
- 提高自身可维护性


## vue相比传统js的开发优势

在传统开发中，用原生的 JavaScript DOM 操作函数对 DOM 进行频繁操作的时候，浏览器要不停的渲染新的 DOM 树，导致页面看起来非常卡顿。

vue 是单页面应用，使页面局部刷新，不用每次跳转页面都要请求所有数据和 DOM ，这样大大加快了访问速度和提升用户体验。



**vue的优势：**

- 轻量级渐进式框架
- 视图、数据和结构的分离
- 响应式双向数据绑定
- 组件化
- 虚拟DOM
- 运行速度快，易于上手
- 便于与第三方库或既有项目整合



### 文件类型变化

- 以前是.html文件，开发也是html，运行也是html。
- 现在是.vue文件，开发是vue，经过编译后，运行时已经变成了js文件。
- 现代前端开发，很少直接使用HTML，基本都是开发、编译、运行。所以 `uni-app` 有编译器、运行时的概念。


### 文件内代码架构的变化

- 以前一个 `html` 大节点，里面有 `script` 和 `style` 节点；

```html
	<!DOCTYPE html>  
	<html>  
		<head>  
			<meta charset="utf-8" />  
			<title></title>  
			<script type="text/javascript">  
			</script>  
			<style type="text/css">  
			</style>  
		</head>  
		<body>  
		</body>  
	</html>
```


- 现在 `template` 是一级节点，用于写tag组件， `script` 和 `style` 是并列的一级节点，也就是有3个一级节点。这个叫[vue单文件组件规范sfc](https://cn.vuejs.org/v2/guide/single-file-components.html)。

```html
	<template>  
		<view>  
		注意必须有一个view，且只能有一个根view。所有内容写在这个view下面。  
		</view>  
	</template>  
	<script>  
		export default {  
		}  
	</script>  
	<style>  
	</style>
```


### 外部文件引用方式变化

- 以前通过script src、link href引入外部的js和css；

```html
	<script src="js/jquery-1.10.2.js" type="text/javascript"></script>  
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
```


- 现在是es6的写法， `import` 引入外部的js模块(注意不是文件)或css；

**js要require进来，变成了对象**。
在hello uni-app的 `common` 目录有一个工具类 `util.js` ，可以在hello uni-app中搜索这个例子查看。hello uni-app示例代码可从 [github](https://github.com/dcloudio/hello-uniapp) 获取。


```html
	<script>  
		var util = require('../../../common/util.js');  //require这个js模块  
		var formatedPlayTime = util.formatTime(playTime); //调用js模块的方法  
	</script>
```

而在这个 `util.js` 里，要把之前的 `function` 封装为对象的方法

```js
	function formatTime(time) {  
		return time;//这里没写逻辑  
	}  
	module.exports = {  
		formatTime: formatTime  
	}
```


当然还有一些高级的用法

```js
	<!-- 直接使用js模块的属性。在hello uni-app有示例   -->
	var dateUtils = require('../../../common/util.js').dateUtils; 
	<!-- 将js导入并重命名为echarts，然后使用echarts.来继续执行方法。在hello uni-app有示例 -->
	import * as echarts from '/components/echarts/echarts.simple.min.js'; 
```

**css外部文件导入**。全局样式，在根目录下的 `app.vue` 里写入，每个页面都会加载 `app.vue` 里的样式。


```html
	<style>  
		@import "./common/uni.css";  
		.uni-hello-text{  
			color:#7A7E83;  
		}  
	</style>
```


**另外，vue支持组件导入，可以更方便的封装一个包括界面、js、样式的库**。[详见](/vue-components.md)


### 组件/标签的变化

以前是html标签，比如 `<div>` ，现在是小程序组件，比如 `<view>` 。

那么标签和组件有什么区别，不都是用尖括号包围起来一段英文吗？
- 其实标签是老的概念，标签属于浏览器内置的东西。
- 但组件，是可以自由扩展的。类似你可以把一段js封装成函数或模块，你也可以把一个ui控件封装成一个组件。

`uni-app` 参考小程序规范，提供了一批[内置组件](https://uniapp.dcloud.io/component/README)。


### js的变化


- 以前的 DOM 操作，如果你想改变某个 DOM 元素的显示内容，比如一个view的显示文字：给view设id，然后js里通过选择器获取 DOM 元素，进一步通过js进行赋值操作，修改 DOM 元素的属性或值。

```html
	<html>  
		<head>  
			<script type="text/javascript">  
				document.addEventListener("DOMContentLoaded",function () {  
					document.getElementById("spana").innerText="456"  
				})  
				function changetextvalue () {  
					document.getElementById("spana").innerText="789"  
				}  
			</script>  
		</head>  
		<body>  
			<span id="spana">123</span>  
			<button type="button" onclick="changetextvalue()">修改为789</button>  
		</body>  
	</html>  
```


- 现在的做法，是vue的绑定模式，给这个 DOM 元素绑定一个js变量，在script中修改js变量的值，DOM 会自动变化，页面会自动更新渲染。
	- 前端改用 [MVVM](https://baike.baidu.com/item/MVVM/96310?fr=aladdin) (Model-View-ViewModel的简写)模式，简单来说，Model:代表数据模型，View:只专注视图UI处理，ViewModel:只处理业务和数据。它的核心是 MVVM 中的 VM，也就是 ViewModel。 ViewModel负责连接 View 和 Model，保证视图和数据的一致性，这种轻量级的架构让前端开发更加高效、便捷，大幅减少代码行数，同时差量渲染性能更好。
	- `uni-app` 使用vue的数据绑定方式解决js和 DOM 界面交互的问题。


```html
	<template>  
		<view>  
			<text>{{textvalue}}</text><!-- 这里演示了组件值的绑定 -->  
			<button :type="buttontype" @click="changetextvalue()">修改为789</button><!-- 这里演示了属性和事件的绑定 -->  
		</view>  
	</template>  
	<script>  
		export default {  
			data() {  
				return {  
					textvalue:"123",  
					buttontype:"primary"  
				};  
			},  
			onLoad() {  
				this.textvalue="456"//这里修改textvalue的值，其实123都来不及显示就变成了456  
			},  
			methods: {  
				changetextvalue() {  
					this.textvalue="789"//这里修改textvalue的值，页面自动刷新为789  
				}  
			}  
		}  
	</script>
```




## 在 uni-app 中使用差异

`uni-app` 在发布到H5时支持所有vue的语法；发布到App和小程序时，由于平台限制，无法实现全部vue语法，但 `uni-app` 仍是对vue语法支持度最高的跨端框架。

相比Web平台， Vue.js 在 `uni-app` 中使用差异主要集中在两个方面：

- 新增：`uni-app` 除了支持Vue实例的生命周期，还支持[应用生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e5%ba%94%e7%94%a8%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)以及[页面生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e9%a1%b5%e9%9d%a2%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f)。
- 受限：相比web平台，在小程序和App端部分功能受限。
- uni-app 完整支持 Vue 模板语法。


[uni-app 项目支持 vue 3.0介绍，及升级指南](https://ask.dcloud.net.cn/article/37834)


`HBuilderX 3.2.5-alpha`新增在App平台支持 vue 3.0，至此 `uni-app` 项目对 vue 3.0 的支持情况如下：

- H5/PC Web平台支持，编译器升级为`vite`。
- 小程序平台：支持vue 3.0开发，编译器依然是 `webpack`，正在升级`vite`中。
- App 平台：支持，编译器升级为`vite`，`nvue`暂不支持。



**注意事项**

- vue3 响应式基于 `Proxy` 实现，不支持`iOS9`和`ie11`。
- 暂不支持新增的 `Teleport`,`Suspense` 组件。
- 暂不支持 `template` 下存在多个根节点。
- 小程序端暂不支持使用 `Vite` 编译。
- 目前 `HBuilderX 3.2` 起已预置，之前的版本只能使用cli方式。




## 模板语法

`Vue.js` 使用了基于 `HTML` 的模板语法，允许开发者声明式地将 `DOM` 绑定至底层组件实例的数据。
所有 `Vue.js` 的模板都是合法的 `HTML`，所以能被遵循规范的浏览器和 `HTML` 解析器解析。

在底层的实现上，`Vue` 将模板编译成虚拟 `DOM` 渲染函数。结合响应性系统，`Vue` 能够智能地计算出最少需要重新渲染多少组件，并把 `DOM` 操作次数减到最少。


### 插值

#### 文本

数据绑定最常见的形式就是文本插值：

```html
	<template>
		<view>
			<view>Message: {{ msg }}</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					msg: 'Hello Vue!'
				}
			}
		}
	</script>
```

{{msg}}里的内容将会被替代为对应数据对象上msg的值。无论何时，绑定的数据对象上msg发生了改变，插值处的内容都会更新。


#### 使用 JavaScript 表达式


迄今为止，在我们的模板中，我们一直都只绑定简单的 `property` 键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 `JavaScript` 表达式支持。

**示例一**

```html
	<template>
		 <view>
			<view>{{ number + 1 }}</view>
			<view>{{ ok ? 'YES' : 'NO' }}</view>
			<!-- 把一个字符串分割成字符串数组,颠倒其元素的顺序,把数组中的所有元素放入一个字符串 -->
			<view>{{ message.split('').reverse().join('') }}</view>
		 </view>
	</template>
	<script>
	  export default {
		 data() {
			return {
			  number:1,
			  ok:true,
			  message: 'Hello Vue!'
			}
		 }
	  }
	</script>
```


**示例二**

```html
	<template>
	  <view>
			<view v-for="(item,index) in 10">
			<!-- 通过%运算符求余数，实现隔行换色的效果 -->
			<view :class="'list-' + index%2">{{index%2}}</view>
		 </view>
	  </view>
	</template>
	<script>
	  export default {
		 data() {
			return { }
		 }
	  }
	</script>
	<style>
	  .list-0{
		 background-color: #aaaaff;
	  }
	  .list-1{
		 background-color: #ffaa7f;
	  }
	</style>
```


这些表达式会在所属 Vue 实例的数据作用域下作为 `JavaScript` 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

**错误示例**
```html
	<template>
	  <view>
		 <!-- 这是语句，不是表达式 -->
		 <view>{{ var a = 1 }}</view>
		 <!-- 流控制也不会生效，请使用三元表达式 -->
		 <view>{{ if (ok) { return message } }}</view>
	  </view>
	</template>
	<script>
	  export default {
		 data() {
			return {
			  ok:true,
			  message: 'Hello Vue!'
			}
		 }
	  }
	</script>
```




> 模板表达式都被放在沙盒中，只能访问**全局变量的一个白名单**：
> - `Infinity`
> - `undefined`
> - `NaN`
> - `isFinite`
> - `isNaN`
> - `parseFloat`
> - `parseInt`
> - `decodeURI`
> - `decodeURIComponent`
> - `encodeURI`
> - `encodeURIComponent`
> - `Math`
> - `Number`
> - `Date`
> - `Array`
> - `Object`
> - `Boolean`
> - `String`
> - `RegExp`
> - `Map`
> - `Set`
> - `JSON`
> - `Intl`
> - `BigInt`
> 
> 你不应该在模板表达式中试图访问用户定义的全局变量。



### 指令

指令是带有 v- 前缀的特殊属性。

- 指令属性的值预期是**单个 `JavaScript` 表达式** (`v-for` 和 `v-on` 是例外情况，稍后我们再讨论)。
- 指令的作用是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 `DOM` 。
- 一些指令能够接收一个“参数”，在指令名称之后以冒号（ : ）表示。


#### v-bind

动态地绑定一个或多个属性，`v-bind`缩写为‘ : ’，可以用于响应式地更新 `HTML attribute`：

```html
	<!-- 完整语法 -->
	<image v-bind:src="imgUrl"></image>
	<!-- 缩写 -->
	<image :src="imgUrl"></image>
	
	<button v-bind:disabled="isButtonDisabled">Button</button>
```

在这里 `src` 是参数，告知 `v-bind` 指令将该元素的 `src` attribute 与表达式 `imgUrl` 的值绑定。

如果 `isButtonDisabled` 的值是 `null` 或 `undefined`，则 `disabled` attribute 甚至不会被包含在渲染出来的 `button` 元素中。


#### v-on

v-on 指令，它用于监听 `DOM` 事件。v-on缩写为‘ @ ’，下文简称为 `@事件`

```html
	<!-- 完整语法 -->
	<view v-on:click="doSomething">点击</view>	
	<!-- 缩写 -->
	<view @click="doSomething">点击</view>
```


#### v-once

只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。

和前端框架中的理解不同，客户端里要实现复用的逻辑，会标记模板节点的状态，添加了 `v-once` 能保证节点只渲染一次，但是并不一定能优化渲染性能，反而可能会拖慢客户端复用节点时的比对效率。

>  h5、微信小程序均不支持

```html
	<!-- 单个元素 -->
	<view v-once>This will never change: {{msg}}</view>
	<!-- 有子元素 -->
	<view v-once>
		<text>comment</text>
		<text>{{msg}}</text>
	</view>
```


#### v-html

更新元素的 [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) 。

- 注意：**内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。**
- 如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。
- App端和H5端支持 `v-html` ，微信小程序会被转为 `rich-text`，其他端不支持 `v-html` 。


跨端的富文本处理方案详见：[https://ask.dcloud.net.cn/article/35772](https://ask.dcloud.net.cn/article/35772)

```html
	<template>
		<view>
			<view v-html="rawHtml"></view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					rawHtml: '<div style="text-align:center;background-color: #007AFF;"><div >我是内容</div><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>'
				}
			}
		}
	</script>
```



## Data 选项

`data` 选项已标准化为只接受**返回一个初始数据对象的函数**（注意函数内返回的数据对象不要直接引用函数外的对象）；否则页面关闭时，数据不会自动销毁，再次打开该页面时，会显示上次数据。

```js
	//正确用法，使用函数返回对象
	data() {
		return {
			title: 'Hello'
		}
	}

	//错误写法，会导致再次打开页面时，显示上次数据
	data: {
		title: 'Hello'
	}

	//错误写法，同样会导致多个组件实例对象数据相互影响
	const obj = {
		title: 'Hello'
	}
	data() {
		return {
			obj
		}
	}
```



## Class 与 Style 绑定


### 绑定 HTML Class


**对象语法**


我们可以传给 `:class` (`v-bind:class` 的简写) 一个对象，实现动态地切换 `class`。

也可以在对象中传入更多字段来动态切换多个 `class`。此外，`v-bind:class` 指令也可以与普通的 `class` 共存。


```html
	<template>
		<view>
			<view class="static" :class="{ active: isActive}">hello uni-app</view>
			<view class="static" :class="{ active: isActive, 'text-danger': hasError }">hello uni-app</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					isActive: true,
					hasError: false
				}
			}
		}
	</script>
	<style>
	.static{
		color: #2C405A;
	}
	.active{
		background-color: #007AFF;
		font-size:30px;
	}
	.text-danger{
		color: #DD524D;
	}
	</style>
```

渲染结果为

```html
	<view class="static active"></view>
```

当 `isActive` 或者 `hasError` 变化时，class 列表将相应地更新。例如，如果 `hasError` 的值为 `true` ，class 列表将变为 `static active text-danger`。



**数组语法**

可以把一个数组传给 `v-bind:class`，以应用一个 `class` 列表。

```html
	<template>
		 <view>
			<view :class="[activeClass,errorClass]">hello uni-app</view>
		 </view>
	</template>
	<script>
		 export default {
			  data() {
					return {
						 activeClass: 'active',
						 errorClass: 'text-danger'
					}
			  }
		 }
	</script>
	<style>
		.active{
			background-color: #007AFF;
		}
		.text-danger{
			font-size:60rpx;
			color:#DD524D;
		}
	</style>
```


渲染的结果为：

```html
	<view class="active text-danger"></view>
```

如果你想根据条件切换列表中的 class，可以使用三元表达式：


```html
	<view :class="[isActive ? activeClass : '', errorClass]"></view>
```


这样写将始终添加 `errorClass`，但是只有在 `isActive` 为 `truthy` 时才添加 `activeClass`。

> 在 `JavaScript` 中，`truthy`（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 `false`、0、""、`null`、`undefined` 和 `NaN` 以外皆为真值）。


不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```html
	<template>
		<view>
			<view class="static" :class="[{ active: isActive }, errorClass]">hello uni-app</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					isActive: true,
					errorClass: 'text-danger'
				}
			}
		}
	</script>
	<style>
		.static{
			font-size:30rpx;
		}
		.active{
			background-color: #007AFF;
		}
		.text-danger{
			font-size:60rpx;
			color:#DD524D;
		}
	</style>
```

**注意：以:style=""这样的方式设置px像素值，其值为实际像素，不会被编译器转换。**


此外还可以用计算属性 `computed` 方法生成 `class` 或者 `style` 字符串，插入到页面中，举例说明：

```html
	<template>
		<view>
			<view class="container" :class="computedClassStr">hello uni-app</view>
			<view class="container" :class="{active: isActive}">hello uni-app</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					isActive: true
				}
			},
			computed: {
				computedClassStr() {
					return this.isActive ? 'active' : ''
				}
			}
		}
	</script>
	<style>
		.active {
			background-color: #007AFF;
			font-size:30px;
		}
	</style>
```



### 绑定内联样式

**对象语法**

:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 `JavaScript` 对象。CSS property 名可以用驼峰式 (`camelCase`) 或短横线分隔 (`kebab-case`，记得用引号括起来) 来命名：

```html
	<template>
		<view :style="{ color: activeColor, fontSize: fontSize + 'px' }">hello uni-app</view>
	</template>
	<script>
		export default {
			data() {
				return {
					activeColor: 'red',
					fontSize: 30
				}
			}
		}
	</script>
```


直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
	<template>
		<view :style="styleObject">hello uni-app</view>
	</template>
	<script>
		export default {
			data() {
				return {
					styleObject: {
					  color: 'red',
					  fontSize: '13px'
					}
				}
			}
		}
	</script>
```

同样的，对象语法常常结合返回对象的计算属性使用。


**数组语法**

`:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```html
	<template>
		<view>
			<view :style="[baseStyles, overridingStyles]">hello uni-app</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					baseStyles: {
						color: 'green',
						fontSize: '30px'
					},
					overridingStyles: {
						'font-weight': 'bold'
					}
				}
			}
		}
	</script>
```


**自动添加前缀**

在 `:style` 中使用需要 (浏览器引擎前缀) 	[vendor prefixesa](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) 的 `CSS property` 时，如 `transform`，`Vue` 将自动侦测并添加相应的前缀。



**多重值**

可以为 `style` 绑定中的 `property` 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
	<view :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></view>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 `flexbox`，那么就只会渲染 `display: flex`。


## 条件渲染

### v-if和v-else

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `truthy` 值的时候被渲染。
使用 `v-else` 指令来表示 `v-if` 的“else 块”。
`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

> 在 `JavaScript` 中，`truthy`（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 `false`、0、""、`null`、`undefined` 和 `NaN` 以外皆为真值）。

```html
	<template>
		<view>
			<view v-if="seen">现在你看到我了</view>
			<view v-else>你看不到我了</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					seen: true
				}
			}
		}
	</script>
```


`v-else-if`，顾名思义，充当 v-if 的“else-if 块”，可以连续使用：


```html
	<template>
		<view>
			<view v-if="type === 'A'">
				A
			</view>
			<view v-else-if="type === 'B'">
				B
			</view>
			<view v-else-if="type === 'C'">
				C
			</view>
			<view v-else>
				Not A/B/C
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					type:'B'
				}
			}
		}
	</script>
```

类似于 `v-else` ，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。


### 条件渲染分组

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？

此时可以把一个 `template` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `template` 元素。


```html
	<template v-if="seen">
		<view>标题</view>
		<view>内容：现在你看到我了</view>
	</template>
```


### v-show

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

```html
	<view v-show="ok">Hello!</view>
```

不同的是带有 `v-show` 的元素始终会被渲染并保留在 `DOM` 中。`v-show` 只是简单地切换元素的 `CSS` 属性的 `display` 。

> 注意，v-show 不支持 template 元素，也不支持 v-else。nvue 页面不支持 v-show。


### v-if 和 v-show 区别


`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换，来控制元素的显示和隐藏。

**根据应用场景选择**

- `v-if` 有更高的切换开销，如果在运行时条件很少改变，则使用 v-if 较好。
- `v-show` 有更高的初始渲染开销。如果需要非常频繁地切换，则使用 v-show 较好。


**注意**

- 不推荐同时使用 `v-if` 和 `v-for`。
- 当 `v-if` 与 `v-for` 一起使用时，**`v-if` 具有比 `v-for` 更高的优先级**。


## 列表渲染

### 在 v-for 里使用数组

v-for 指令可以实现基于一个数组来渲染一个列表。

- `v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。
	- 在 v-for 块中，我们可以访问所有父作用域的 `property`
	- 第一个参数 `item` 则是被迭代的数组元素的别名。
	- 第二个参数，即当前项的索引 `index` ，是可选的。

```html
	<template>
		<view>
			<view v-for="(item, index) in items">
				 {{ parentMessage }} - {{ index }} - {{ item.message }}
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					parentMessage: 'Parent',
					items: [
						{ message: 'Foo' },
						{ message: 'Bar' }
					]
				}
			}
		}
	</script>
```

结果：

```html
	Parent - 0 - Foo
	Parent - 1 - Bar
```


### 在 v-for 里使用对象

你也可以用 v-for 来遍历一个对象的 `property`。

- 第一个参数 `value` 是被迭代的对象元素的属性值。
- 第二个参数为 `property` 名称 (也就是键名)。
- 第三个参数作为索引。

```html
	<template>
		<view>
			<view v-for="(value, name, index) in object">
				 {{ index }}. {{ name }}: {{ value }}
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					object: {
						title: 'How to do lists in Vue',
						author: 'Jane Doe',
						publishedAt: '2021-05-10'
					}
				}
			}
		}
	</script>
```


结果：

```html
	0.title: How to do lists in Vue,
	1.author: Jane Doe,
	2.publishedAt: 2021-05-10
```


> 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它在不同 `JavaScript` 引擎下的结果都一致。


### 列表渲染分组

类似于 `v-if`，你也可以利用带有 `v-for` 的 `template` 来循环渲染一段包含多个元素的内容。比如：

```html
	<template v-for="item in items">
		<view>{{ item.message }}</view>
		<view class="divider" role="presentation"></view>
	</template>
```


### 维护状态


当 `Vue` 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，`Vue` 将不会移动 `DOM` 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。


这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。


为了给 `Vue` 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
	<view v-for="item in items" :key="item.id">
	  <!-- content -->
	</view>
```

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

- 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
- 而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除/销毁 key 不存在的元素。
- 有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

> 不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值。
> 
> 如不提供 :key，会报一个 `warning`， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。

示例：

```html
	<template>
		<view>
			<!-- array 中 item 的某个 property -->
			<view v-for="(item,index) in objectArray" :key="item.id">
				{{index +':'+ item.name}}
			</view>
			<!-- item 本身是一个唯一的字符串或者数字时，可以使用 item 本身 -->
			<view v-for="(item,index) in stringArray" :key="item">
				{{index +':'+ item}}
			</view>
		</view>
	</template>
	<script>
	export default {
		data () {
			return {
				objectArray:[{
					id:0,
					name:'li ming'
				},{
					id:1,
					name:'wang peng'
				}],
				stringArray:['a','b','c']
			}
		}
	}
	</script>
```


### 注意事项

- 在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 `v-for="(item, index) in 10"` 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
- 在非H5平台 循环对象时不支持第三个参数，如 `v-for="(value, name, index) in object"` 中，index 参数是不支持的。
- 小程序端数据为差量更新方式，由于小程序不支持删除对象属性，使用的设置值为 null 的方式替代，导致遍历时可能出现不符合预期的情况，需要自行过滤一下值为 null 的数据（[相关反馈](https://ask.dcloud.net.cn/question/103269)）。



### 结合 `<template v-for>`

在`Vue3`中，`key` 则应该被设置在 `<template>` 标签上

```html
	<template v-for="item in list" :key="item.id">
		<view>...</view>
		<text>...</text>
	</template>
```


类似地，当使用 `<template v-for>` 时存在使用 `v-if` 的子节点，`key` 应改为设置在 `<template>` 标签上。

```html
	<template v-for="item in list" :key="item.id">
		<view v-if="item.isVisible">...</view>
		<view v-else>...</view>
	</template>
```




### 在组件上使用 v-for

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for` 。

```html
	<my-component v-for="item in items" :key="item.id"></my-component>
```

**当在组件上使用 v-for 时，key是必须的。**



### v-for 与 v-if 一同使用

> 不推荐在同一元素上使用 v-if 和 v-for

当它们处于同一节点，**`v-if` 的优先级比 `v-for` 更高**，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：


```html
	<!-- 这将引发错误，因为未在实例上定义属性“todo” -->
	<view v-for="todo in todos" v-if="!todo.isComplete">
	  {{ todo }}
	</view>
```


可以把 `v-for` 移动到 `template` 标签中来修正：

```html
	<template v-for="todo in todos">
	  <view v-if="!todo.isComplete">
		 {{ todo }}
	  </view>
	</template>
```



## 事件处理


### 监听事件

我们可以使用 `v-on` 指令 (通常缩写为 @ 符号，下文简称为：@事件) 来监听 DOM 事件，并在触发事件时执行一些 `JavaScript`。
用法为 `v-on:click="methodName"` 或使用快捷方式 `@click="methodName"`

```html
	<template>
		<view>
			<button @click="counter += 1">Add 1</button>
			<text>The button above has been clicked {{ counter }} times.</text>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					counter:0
				}
			}
		}
	</script>
```


### 事件处理方法

然而许多事件处理逻辑会更为复杂，所以直接把 `JavaScript` 代码写在@事件中是不可行的。因此@事件还可以接收一个需要调用的方法名称。

示例：

```html
	<template>
		<view>
			<!-- `greet` 是在下面定义的方法名 -->
			<button @click="greet">Greet</button>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					name: 'Vue.js'
				}
			},
			// 在 `methods` 对象中定义方法
			methods: {
				greet(event){
					// `event` 是原生 DOM 事件
					console.log(event);
					uni.showToast({
						title: 'Hello ' + this.name + '!'
					});
				}
			}
		}
	</script>
```



### 内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 `JavaScript` 语句中调用方法：


```html
	<template>
		<view>
			<button @click="say('hi')">Say hi</button>
			<button @click="say('what')">Say what</button>
		</view>
	</template>
	<script>
		export default {
			methods: {
				say(message) {
					uni.showToast({
						title: message
					});
				}
			}
		}
	</script>
```

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```html
	<template>
		<view>
			<button @click="warn('Form cannot be submitted yet.', $event)">
			  Submit
			</button>
		</view>
	</template>
	<script>
		export default {
			methods: {
				warn(message, event) {
					// 现在我们可以访问原生事件对象
					if (event) {
						//可访问 event.target等原生事件对象
						console.log("event: ",event);
					}
					uni.showToast({
						title: message
					});
				}
			}
		}
	</script>
```


### 多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```html
	<template>
		<view>
			<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
			<button @click="one($event), two($event)">
			  Submit
			</button>
		</view>
	</template>
	<script>
		export default {
			methods: {
				one(event) {
					// first handler logic...
					console.log("event1: ",event);
				},
				two(event) {
					// second handler logic...
					console.log("event2: ",event);
				}
			}
		}
	</script>
```


### 事件修饰符

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 @事件对于触发的事件调用 `event.preventDefault()`：

@事件（v-on）提供了事件修饰符:

- `.stop`: 各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
- `.prevent`: 仅在 H5 平台支持
- `.capture`: 仅在 H5 平台支持
- `.self`: 仅在 H5 平台支持
- `.once`: 仅在 H5 平台支持
- `.passive`: 仅在 H5 平台支持


```html
	<!-- 阻止单击事件继续传播 -->
	<view @click.stop="doThis"></view>
```


> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。


**注意**

- 为兼容各端，事件需使用 **@** 的方式绑定，请勿使用小程序端的 `bind` 和 `catch` 进行事件绑定；也不能在 JS 中使用`event.preventDefault()`和`event.stopPropagation()`方法；
- 若需要禁止蒙版下的页面滚动，可使用 `@touchmove.stop.prevent="moveHandle"`，`moveHandle` 可以用来处理 `touchmove` 的事件，也可以是一个空函数。

```html
	<view class="mask" @touchmove.stop.prevent="moveHandle"></view>
```

- 按键修饰符：`uni-app` 运行在手机端，没有键盘事件，所以不支持按键修饰符。


**使用 v-on 或 @ 有几个好处**

1. 扫一眼 `HTML` 模板便能轻松定位在 `JavaScript` 代码里对应的方法。

2. 因为你无须在 `JavaScript` 里手动绑定事件，你的 `ViewModel` 代码可以是非常纯粹的逻辑，和 `DOM` 完全解耦，更易于测试。

3. 当一个 `ViewModel` 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。




### 事件映射表

```js
// 事件映射表，左侧为 WEB 事件，右侧为 ``uni-app`` 对应事件
	{
		click: 'tap',
		touchstart: 'touchstart',
		touchmove: 'touchmove',
		touchcancel: 'touchcancel',
		touchend: 'touchend',
		tap: 'tap',
		longtap: 'longtap', //推荐使用longpress代替
		input: 'input',
		change: 'change',
		submit: 'submit',
		blur: 'blur',
		focus: 'focus',
		reset: 'reset',
		confirm: 'confirm',
		columnchange: 'columnchange',
		linechange: 'linechange',
		error: 'error',
		scrolltoupper: 'scrolltoupper',
		scrolltolower: 'scrolltolower',
		scroll: 'scroll'
	}
```




## 表单输入绑定


### v-model

你可以用 v-model 指令在表单 `input`、`textarea` 及 `select` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

> v-model 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。


```html
	<template>
		<view>
			<input v-model="message" placeholder="edit me">
			<text>Message is: {{ message }}</text>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					message:""
				}
			}
		}
	</script>
```


### uni-app表单组件

建议开发过程中直接使用 `uni-app`：[表单组件](https://uniapp.dcloud.io/component/button)。

##### 用法示例：

- H5 的 `select` 标签用 `picker` 组件进行代替

```html
	<template>
		<view>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="picker">
					当前选择：{{array[index]}}
				</view>
			</picker>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					index: 0,
					array: ['A', 'B', 'C']
				}
			},
			methods: {
				bindPickerChange(e) {
					console.log(e)
					this.index = e.detail.value
				}
			}
		}
	</script>
```

- 表单元素 `radio` 用 `radio-group` 组件进行代替

```html
	<template>
		<view>
			<radio-group class="radio-group" @change="radioChange">
				<label class="radio" v-for="(item, index) in items" :key="item.name">
					<radio :value="item.name" :checked="item.checked" /> {{item.value}}
				</label>
			</radio-group>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					items: [{
							name: 'USA',
							value: '美国'
						},
						{
							name: 'CHN',
							value: '中国',
							checked: 'true'
						},
						{
							name: 'BRA',
							value: '巴西'
						},
						{
							name: 'JPN',
							value: '日本'
						},
						{
							name: 'ENG',
							value: '英国'
						},
						{
							name: 'TUR',
							value: '法国'
						}
					]
				}
			},
			methods: {
				radioChange(e) {
					console.log('radio发生change事件，携带value值为：', e.target.value)
				}
			}
		}
	</script>
```



## 计算属性和侦听器

### 计算属性computed

每一个计算属性都包含一个 `getter` 函数和一个 `setter`函数 ，默认是利用 `getter` 函数来读取。所有 `getter` 和 `setter` 函的 `this` 上下文自动地绑定为 Vue 实例。


#### 计算属性的 getter 


模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如，有一个嵌套数组对象：

```js
	data() {
		return {
			author: {
				name: 'John Doe',
				books: [
					'Vue 2 - Advanced Guide',
					'Vue 3 - Basic Guide',
					'Vue 4 - The Mystery'
				]
			}
		}
	}
```


我们想根据 author 是否已经有一些书来显示不同的消息


```html
	<view>
		<view>Has published books:</view>
		<view>{{ author.books.length > 0 ? 'Yes' : 'No' }}</view>
	</view>
```

此时，模板不再是简单的和声明性的。你必须先看一下它，然后才能意识到它执行的计算取决于 author.books。如果要在模板中多次包含此计算，则问题会变得更糟。

所以，对于任何包含响应式数据的复杂逻辑，你都应该使用**计算属性**。



**例子**

```html
	<template>
		<view>
			<view>OHas published books:</view>
			<view>{{ publishedBooksMessage }}</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					author: {
						name: 'John Doe',
						books: [
							'Vue 2 - Advanced Guide',
							'Vue 3 - Basic Guide',
							'Vue 4 - The Mystery'
						]
					}
				}
			},
			computed: {
				// 计算属性的 getter
				publishedBooksMessage() {
					// `this` points to the vm instance
					return this.author.books.length > 0 ? 'Yes' : 'No'
				}
			}
		}
	</script>
```


这里声明了一个计算属性 `publishedBooksMessage`。

尝试更改应用程序 `data` 中 `books` 数组的值，你将看到 `publishedBooksMessage` 如何相应地更改。

你可以像普通属性一样将数据绑定到模板中的计算属性。Vue 知道 `publishedBookMessage` 依赖于 `author.books`，因此当 `author.books` 发生改变时，所有依赖 `publishedBookMessage` 绑定也会更新。而且最妙的是我们已经声明的方式创建了这个依赖关系：计算属性的 getter 函数没有副作用，这使得更易于测试和理解。

计算属性还可以依赖多个 Vue 实例的数据，只要其中任一数据变化，计算属性就会重新执行，视图也会更新。



#### 计算属性的 setter

计算属性默认只有 `getter`，不过在需要时你也可以提供一个 `setter`， 当手动修改计算属性的值时，就会触发 `setter` 函数，执行一些自定义的操作。

```html
	<template>
		<view>
			<view>{{ fullName }}</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					firstName: 'Foo',
					lastName: 'Bar'
				}
			},
			computed: {
				fullName: {
					// getter
					get(){
						return this.firstName + ' ' + this.lastName
					},
					// setter
					set(newValue){
						var names = newValue.split(' ')
						this.firstName = names[0]
						this.lastName = names[names.length - 1]
					}
				}
			}
		}
	</script>
```

现在再运行 `fullName = 'John Doe'` 时，`setter` 会被调用，`firstName` 和 `lastName` 也会相应地被更新。


#### getter与setter区别

- get：通过设置get方法可以得到fullName的新值。
- set：通过set的方法，设置一个值（newValue）来改变fullName相关联的值，引起fullName重新的计算，相应的页面上fullName也会发生改变成新的内容。



### 计算属性缓存 vs 方法

我们可以通过在表达式中调用方法来达到同样的效果：

```html
	<template>
		<view>
			<view>{{ calculateBooksMessage() }}</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					author: {
						name: 'John Doe',
						books: [
							'Vue 2 - Advanced Guide',
							'Vue 3 - Basic Guide',
							'Vue 4 - The Mystery'
						]
					}
				}
			},
			methods: {
				calculateBooksMessage() {
				   return this.author.books.length > 0 ? 'Yes' : 'No'
				}
			}
		}
	</script>
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的反应依赖关系缓存的**。

计算属性只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `author.books` 还没有发生改变，多次访问 `publishedBookMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now ()` 不是响应式依赖：

```js
	computed: {
		now(){
			return Date.now()
		}
	}
```


相比之下，每当触发重新渲染时，**调用方法将总会再次执行函数**。


我们为什么需要缓存？

假设我们有一个性能开销比较大的计算属性 `list`，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 `list`。如果没有缓存，我们将不可避免的多次执行 `list` 的 `getter`！如果你不希望有缓存，请用 `method` 来替代。




### 侦听器watch

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 `Vue` 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

当你有一些数据需要随着其它数据变动而变动时，就可以使用`Watch`来监听他们之间的变化。

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。
`Vue` 实例将会在实例化时调用 `$watch()` ，遍历 `watch` 对象的每一个 `property` 。



#### 监听变量的值变化

示例：

```html
	<template>
		<view>
			<input type="number" v-model="a" style="border: red solid 1px;" />
			<input type="number" v-model="b" style="border: red solid 1px;" />
			<view>总和：{{sum}}</view>
			<button type="default" @click="add">求和</button>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					a:1,
					b:1,
					sum: ""
				}
			},
			watch: {
				/* 使用watch来响应数据的变化，第一个参数为newVal新值，第二个参数oldVal为旧值*/
				a: function(newVal, oldVal) {
					console.log("a--newVal: ", newVal, "a--oldVal: ",oldVal);
				},
				b: function(newVal, oldVal) {
					console.log("b--newVal: ", newVal, "b--oldVal: ",oldVal);
				}
			},
			methods: {
				add() {
					this.sum = parseInt(this.a) + parseInt(this.b)
				}
			}
		}
	</script>
```


以上示例有个问题，就是页面刚加载时，因为没有变化，所以不会执行。下面用`immediate`来解决。

#### 选项：immediate

在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调：

`watch`方法默认就是`handler`，而当`immediate:true`时，就会先执行`handler`方法。


```html
	<template>
		<view>
			<input type="number" v-model="a" style="border: red solid 1px;" />
			<input type="number" v-model="b" style="border: red solid 1px;" />
			<view>总和：{{sum}}</view>
			<button type="default" @click="add">求和</button>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					a:1,
					b:1,
					sum: ""
				}
			},
			watch: {
				a: {
					handler(newVal, oldVal) {
						console.log("a------: ", newVal, oldVal);
					},
					immediate: true//初始化绑定时就会执行handler方法
				},
				b: {
					handler(newVal, oldVal) {
						console.log("b------: ", newVal, oldVal);
					},
					immediate: true//初始化绑定时就会执行handler方法
				}
			},
			methods: {
				add() {
					this.sum = parseInt(this.a) + parseInt(this.b)
				}
			}
		}
	</script>
```



#### 选项：deep

为了发现对象内部值的变化，可以在选项参数中指定 `deep: true` 。深度监听一个对象整体的变化（即监听对象所有属性值的变化），注意监听数组的变更不需要这么做。


```html
	<template>
		<view>
			<input type="number" v-model="obj.a" style="border: red solid 1px;" />
			<input type="number" v-model="obj.b" style="border: red solid 1px;" />
			<view>总和：{{sum}}</view>
			<button type="default" @click="add">求和</button>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					obj: {
						a: 1,
						b: 1,
					},
					sum:""
				}
			},
			watch: {
				obj: {
					handler(newVal, oldVal) {
						console.log('obj-newVal:' + JSON.stringify(newVal), 'obj-oldVal:' + JSON.stringify(oldVal), );
					},
					deep: true//对象中任一属性值发生变化，都会触发handler方法
				}
			},
			methods: {
				add() {
					this.sum = parseInt(this.obj.a) + parseInt(this.obj.b)
				}
			}
		}
	</script>
```


#### 监听对象中单个属性

如果不想监听 `obj` 中其他值，只想监听 `obj.a` 的值的变化，可以写成字符串形式监听。

```js
	export default {
		data() {
			return {
				obj: {
					a: 1,
					b: 1,
				}
			}
		},
		watch: {
			"obj.a": {//监听obj对象中的单个属性值的变化
				handler(newVal, oldVal) {
					console.log('obj-newVal:' + newVal, 'obj-oldVal:' + oldVal);
				}
			}
		}
	}
```



### 计算属性 vs 侦听属性

`Vue` 提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch` 。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。


```js
	export default {
		data() {
			return {
				firstName: 'Foo',
				lastName: 'Bar',
				fullName: 'Foo Bar'
			}
		},
		watch: {
			firstName: function(val) {
				this.fullName = val + ' ' + this.lastName
			},
			lastName: function(val) {
				this.fullName = this.firstName + ' ' + val
			}
		}
	}
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：


```js
	export default {
		data() {
			return {
				firstName: 'Foo',
				lastName: 'Bar'
			}
		},
		computed: {
		    fullName(){
				return this.firstName + ' ' + this.lastName
		    }
		}
	}
```
