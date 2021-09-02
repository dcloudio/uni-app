
## 介绍

**Vue.js 是什么**

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。Vue 被设计为可以自底向上逐层应用。


Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统，只关注视图层，易于上手。所有东西都是响应式的。


我们提供了免费视频教程，在看此文档同时建议结合 [vue入门视频教程](https://learning.dcloud.io/#/?vid=0) ，帮助你更加快速掌握。



 **致谢**

本文大部分内容来源于vue官网，但结合 `uni-app` 做了部分调整，以更有利于开发者快速上手。感谢Vue团队！


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

- 新增：`uni-app` 除了支持Vue实例的生命周期，还支持[应用生命周期](/collocation/frame/lifecycle?id=应用生命周期)以及[页面生命周期](/collocation/frame/lifecycle?id=页面生命周期)。
- 受限：相比web平台，在小程序和App端部分功能受限，[具体见](/vue-api)。
- uni-app 完整支持 Vue 模板语法。
- App端可以使用更多的vue特性，[详见](https://ask.dcloud.net.cn/article/36599)。





## 模板语法



### 插值

[观看本节视频讲解](https://learning.dcloud.io/#/?vid=5)

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
> 
> 你不应该在模板表达式中试图访问用户定义的全局变量。




### 指令


[观看本节视频讲解](https://learning.dcloud.io/#/?vid=6)

指令是带有 v- 前缀的特殊属性。

- 指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况)。
- 指令的作用是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
- 一些指令能够接收一个“参数”，在指令名称之后以冒号（ : ）表示。



#### v-bind

动态地绑定一个或多个属性，或一个组件 `prop` 到表达式。

- v-bind缩写为‘ : ’
- 在绑定 `prop` 时，`prop` 必须在子组件中声明。
- 可以用修饰符指定不同的绑定类型。

```html
	<image v-bind:src="imgUrl"></image>
	<!-- 缩写 -->
	<image :src="imgUrl"></image>
	
	<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
	<my-component :prop="someThing"></my-component>
	
	<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 `isButtonDisabled` 的值是 `null` 、`undefined` 或 `false` ，则 `disabled` 甚至不会被包含在渲染出来的 `button` 元素中。


#### v-on


v-on 指令，它用于监听 DOM 事件。v-on缩写为‘ @ ’，下文简称为 @事件


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
	<view v-once>This will never change: {{msg}}</view>
	<!-- 有子元素 -->
	<view v-once>
		<text>comment</text>
		<text>{{msg}}</text>
	</view>
```


#### v-html

更新元素的 `innerHTML` 。

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




## data 属性

data 必须声明为返回一个初始数据对象的函数（注意函数内返回的数据对象不要直接引用函数外的对象）；否则页面关闭时，数据不会自动销毁，再次打开该页面时，会显示上次数据。

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


[观看本节视频讲解](https://learning.dcloud.io/#/?vid=7)

为节约性能，我们将 `Class` 与 `Style` 的表达式通过 `compiler` 硬编码到 `uni-app` 中，支持语法和转换效果见下：


### 对象语法


可以传给 v-bind:class 一个对象，实现动态地切换 class。

也可以在对象中传入更多字段来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 共存。


```html
	<template>
		<view>
			<!-- class -->
			<view class="static" :class="{ active: isActive}">111</view>
			<view class="static" :class="{ active: isActive, 'text-danger': hasError }">222</view>
			<!-- style -->
			<view v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">333</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					isActive: true,
					hasError: false,
					activeColor:"green",
					fontSize:50
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



### 数组语法

可以把一个数组传给 v-bind:class，以应用一个 class 列表。


```html
<template>
	<view>
		<!-- class -->
		<view class="static" :class="[activeClass,errorClass]">111</view>
		<view class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">222</view><!-- 三元表达式 -->
		<view class="static" v-bind:class="[{ active: isActive }, errorClass]">333</view>
		<!-- style -->
		<view v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">444</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isActive: true,
				activeClass: 'active',
				errorClass: 'text-danger',
				activeColor:"green",
				fontSize:50
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


此外还可以用 `computed` 方法生成 `class` 或者 `style` 字符串，插入到页面中，举例说明：


```html
  <template>
      <!-- 支持 -->
      <view class="container" :class="computedClassStr"></view>
      <view class="container" :class="{active: isActive}"></view>
      <!-- 不支持 -->
      <view class="container" :class="computedClassObject"></view>
  </template>
  <script>
      export default {
          data () {
              return {
                  isActive: true
              }
          },
          computed: {
              computedClassStr () {
                  return this.isActive ? 'active' : ''
              },
              computedClassObject () {
                  return { active: this.isActive }
              }
          }
      }
  </script>
```





> 非H5端不支持 `classObject` 和 `styleObject` 语法。

不支持示例：

```html
	<template>
		<view :class="[activeClass]" :style="[baseStyles,overridingStyles]"></view>
	</template>
	<script>
		export default {
			data() {
				return {
					activeClass: {
						'active': true,
						'text-danger': false
					},
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


### 用在组件上

非H5端（非自定义组件编译模式）**暂不支持**在自定义组件上使用 `Class` 与 `Style` 绑定。



## 条件渲染@condition


[观看本节视频讲解](https://learning.dcloud.io/#/?vid=8)


### v-if和v-else

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `truthy` 值的时候被渲染。
使用 `v-else` 指令来表示 v-if 的“else 块”。

> 在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）。

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

因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `template` 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 `template` 元素。

```html
<template v-if="seen">
	<view>标题</view>
	<view>内容：现在你看到我了</view>
</template>
```



### v-show

`v-show` 是一个根据条件展示元素选项的指令 。用法大致和 `v-if` 一样：

```html
	<view v-show="ok">Hello!</view>
```

不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 `CSS` 属性的 `display` 。

> 注意，v-show 不支持 template 元素，也不支持 v-else。nvue 页面不支持 v-show。



### v-if 和 v-show 区别

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多，不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换，来控制元素的显示和隐藏。

**根据应用场景选择**

- `v-if` 有更高的切换开销，如果在运行时条件很少改变，则使用 v-if 较好。
- `v-show` 有更高的初始渲染开销。如果需要非常频繁地切换，则使用 v-show 较好。


**注意**

- 不推荐同时使用 `v-if` 和 `v-for`。
- 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。



## 列表渲染@listrendering

[观看本节视频讲解](https://learning.dcloud.io/#/?vid=9)


### 在 v-for 里使用数组

v-for 指令可以实现基于一个数组来渲染一个列表。

- `v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。
	- 第一个参数 `item` 则是被迭代的数组元素的别名。
	- 第二个参数，即当前项的索引 `index` ，是可选的。

```html
	<template>
		<view>
			<view v-for="(item, index) in items">
				{{ index }} - {{ item.message }}
			</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
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
	0 - Foo
	1 - Bar
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
						publishedAt: '2020-04-10'
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
	2.publishedAt: 2020-04-10
```


### 列表渲染分组

类似于 `v-if`，你也可以利用带有 `v-for` 的 `template` 来循环渲染一段包含多个元素的内容。比如：

```html
	<template v-for="item in items">
		<view>{{ item.message }}</view>
		<view class="divider" role="presentation"></view>
	</template>
```



### key

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 `input` 中的输入内容，`switch` 的选中状态），需要使用 `:key` 来指定列表中项目的唯一的标识符。

`:key` 的值以两种形式提供

- 使用 `v-for` 循环 `array` 中 `item` 的某个 `property`，该 `property` 的值需要是列表中唯一的字符串或数字，且不能动态改变。
- 使用 `v-for` 循环中 `item` 本身，这时需要 `item` 本身是一个唯一的字符串或者数字

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

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


### 在组件上使用 v-for

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for` 。

```html
	<my-component v-for="item in items" :key="item.id"></my-component>
```

**当在组件上使用 v-for 时，key是必须的。**


## 事件处理器@eventhandler


[观看本节视频讲解](https://learning.dcloud.io/#/?vid=10)

### 监听事件

可以用@事件监听 DOM 事件，并在触发时运行一些 `JavaScript` 代码。

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
					}
					uni.showToast({
						title: message
					});
				}
			}
		}
	</script>
```





### 事件修饰符

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 @事件对于触发的事件调用 `event.preventDefault()`：

@事件（v-on）提供了事件修饰符:

- `.stop`: 各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
- `.native`: 监听原生事件，各平台均支持
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


## 表单控件绑定

[观看本节视频讲解](https://learning.dcloud.io/#/?vid=11)


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

每一个计算属性都包含一个 `getter` 和一个 `setter` ，默认是利用 `getter` 来读取。所有 `getter` 和 `setter` 的 `this` 上下文自动地绑定为 Vue 实例。


#### 计算属性的 getter 


在模板中绑定表达式是非常便利的，但是它们实际上只用于简单的操作。在模板中放入太多的逻辑会让模板过重且难以维护。例如：


```html
	<view>
		{{ message.split('').reverse().join('') }}
	</view>
```

这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中多包含此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。



```html
	<template>
		<view>
			<view>Original message: "{{ message }}"</view>
			<view>Computed reversed message: "{{ reversedMessage }}"</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					message: 'Hello'
				}
			},
			computed: {
				// 计算属性的 getter
				reversedMessage(){
				  return this.message.split('').reverse().join('')
				}
			}
		}
	</script>
```

结果：

```html
	Original message: "Hello"
	Computed reversed message: "olleH"
```


你可以像绑定普通 `property` 一样在模板中绑定计算属性。

Vue 知道 `reversedMessage` 依赖于 `message`，因此当 `message` 发生改变时，所有依赖 `reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 `getter` 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

计算属性还可以依赖多个 Vue 实例的数据，只要其中任一数据变化，计算属性就会重新执行，视图也会更新。



#### 计算属性的 setter

在你需要时也可以提供一个 `setter` 函数， 当手动修改计算属性的值时，就会触发 `setter` 函数，执行一些自定义的操作。

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
			<view>Reversed message: "{{ reversedMessage() }}"</view>
		</view>
	</template>
	<script>
		export default {
			data() {
				return {
					message: 'Hello'
				}
			},
			methods: {
				reversedMessage(){
					return this.message.split('').reverse().join('')
				}
			}
		}
	</script>
```

可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。

只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

```js
	computed: {
		now(){
			return Date.now()
		}
	}
```


相比之下，每当触发重新渲染时，**调用方法将总会再次执行函数**。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。



### 计算属性 vs 侦听属性


Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch` 。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。

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


### 侦听器watch

- 类型：{ [key: string]: string | Function | Object | Array }


- 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()` ，遍历 `watch` 对象的每一个 `property` 。



- 示例：

```html
<template>
	<view>
		<input type="text" v-model="word">
	</view>
</template>
<script>
	export default {
		data() {
			return {
				word: 'word'
			}
		},
		watch: {
			/* 使用watch来响应数据的变化 */
			word(newVal, oldVal) {
				console.log('最新值是：'+newVal,"原来的值是："+ oldVal);
			}
		},
	}
</script>
```


示例：

```html
<script>
	export default {
		data() {
			return {
				a: 1,
				b: 2,
				c: 3,
				d: 4,
				e: {
					f: {
						g: 5
					}
				}
			}
		},
		watch: {
			a: function(val, oldVal) {
				console.log('new: %s, old: %s', val, oldVal)
			},
			// 方法名
			b: 'someMethod',
			// 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
			c: {
				handler: function(val, oldVal) { /* ... */ },
				deep: true
			},
			// 该回调将会在侦听开始之后被立即调用
			d: {
				handler: 'someMethod',
				immediate: true
			},
			// 你可以传入回调数组，它们会被逐一调用
			e: [
				'handle1',
				function handle2(val, oldVal) { /* ... */ },
				{
					handler: function handle3(val, oldVal) { /* ... */ },
					/* ... */
				}
			],
			// watch vm.e.f's value: {g: 5}
			'e.f': function(val, oldVal) { /* ... */ }
		}
	}
</script>
```






