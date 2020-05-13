
``uni-app`` 在发布到H5时支持所有vue的语法；发布到App和小程序时，由于平台限制，无法实现全部vue语法，但``uni-app``仍是是对vue语法支持度最高的跨端框架。本文将详细讲解差异。

相比Web平台， ``Vue.js`` 在 ``uni-app`` 中使用差异主要集中在两个方面：
- 新增：uni-app除了支持Vue实例的生命周期，还支持应用启动、页面显示等生命周期
- 受限：相比web平台，在小程序和App端部分功能受限，具体见下。
- v3版本App端可以使用更多的vue特性，[详见](https://ask.dcloud.net.cn/article/36599)

## 生命周期

``uni-app`` 完整支持 ``Vue`` 实例的生命周期，同时还新增 [应用生命周期](/frame?id=应用生命周期) 及 [页面生命周期](/frame?id=页面生命周期)。

详见Vue官方文档：[生命周期钩子](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)。


## 模板语法

``uni-app`` 完整支持 ``Vue`` 模板语法。

详见Vue官方文档：[模板语法](https://cn.vuejs.org/v2/guide/syntax.html)。

**注意**
如果使用**老版**的非自定义组件模式，即manifest中`"usingComponents":false`，部分模版语法不支持，但此模式已于2019年11月起下线。


## data 属性

``data`` 必须声明为返回一个初始数据对象的函数；否则页面关闭时，数据不会自动销毁，再次打开该页面时，会显示上次数据。

```javascript
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
```

## 全局变量

实现全局变量的方式需要遵循 Vue 单文件模式的开发规范。详细参考：[uni-app全局变量的几种实现方式](https://ask.dcloud.net.cn/article/35021)

## Class 与 Style 绑定

为节约性能，我们将 ``Class`` 与 ``Style`` 的表达式通过 ``compiler`` 硬编码到 ``uni-app`` 中，支持语法和转换效果如下：

class 支持的语法:

```html
<view :class="{ active: isActive }">111</view>
<view class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">222</view>
<view class="static" :class="[activeClass, errorClass]">333</view>
<view class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">444</view>
<view class="static" v-bind:class="[{ active: isActive }, errorClass]">555</view>
```

style 支持的语法:

```html
<view v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">666</view>
<view v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">777</view>
```

非H5端不支持 [Vue官方文档：Class 与 Style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html) 中的 ``classObject`` 和 ``styleObject`` 语法。

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

**注意：以``:style=""``这样的方式设置px像素值，其值为实际像素，不会被编译器转换。**

此外还可以用 ``computed`` 方法生成 ``class`` 或者 ``style`` 字符串，插入到页面中，举例说明：

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

**用在组件上**

非H5端暂不支持在自定义组件上使用 ``Class`` 与 ``Style`` 绑定

## 计算属性

完整支持 [Vue官方文档：计算属性](https://cn.vuejs.org/v2/guide/computed.html)。

## 条件渲染

完整支持 [Vue官方文档：条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)

## 列表渲染

完整vue列表渲染 [Vue官方文档：列表渲染](https://cn.vuejs.org/v2/guide/list.html)

### key
 
如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 ``<input>`` 中的输入内容，``<switch>`` 的选中状态），需要使用 ``:key`` 来指定列表中项目的唯一的标识符。

``:key`` 的值以两种形式提供

- 使用 ``v-for`` 循环 ``array`` 中 ``item`` 的某个 ``property``，该 ``property`` 的值需要是列表中唯一的字符串或数字，且不能动态改变。
- 使用 ``v-for`` 循环中 ``item`` 本身，这时需要 ``item`` 本身是一个唯一的字符串或者数字

当数据改变触发渲染层重新渲染的时候，会校正带有 ``key`` 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

**如不提供 ``:key``，会报一个 ``warning``， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。**

**示例：**

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
* 在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 `v-for="(item, index) in 10"` 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
* 在非H5平台 循环对象时不支持第三个参数，如 `v-for="(value, name, index) in object"` 中，index 参数是不支持的。

## 事件处理器

几乎全支持 [Vue官方文档：事件处理器](https://cn.vuejs.org/v2/guide/events.html)

```javascript
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

**注意：**

<!-- * 事件映射表中没有的原生事件也可以使用，例如``map``组件的``regionchange`` 事件直接在组件上写成 ``@regionchange``,同时这个事件也非常特殊，它的 ``event`` ``type`` 有 ``begin`` 和 ``end`` 两个，导致我们无法在``handleProxy`` 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既 
``<map @regionchange="functionName" @end="functionName" @begin="functionName"><map>``。 -->
* 为兼容各端，事件需使用 ``v-on`` 或 ``@`` 的方式绑定，请勿使用小程序端的``bind`` 和 ``catch`` 进行事件绑定。
* 事件修饰符
 * ``.stop``：各平台均支持， 使用时会阻止事件冒泡，在非 H5 端同时也会阻止事件的默认行为
 * ``.prevent`` 仅在 H5 平台支持
 * ``.self``：仅在 H5 平台支持
 * ``.once``：仅在 H5 平台支持
 * ``.capture``：仅在 H5 平台支持
 * ``.passive``：仅在 H5 平台支持 
* 若需要禁止蒙版下的页面滚动，可使用 ``@touchmove.stop.prevent="moveHandle"``，moveHandle 可以用来处理 touchmove 的事件，也可以是一个空函数。
  ```html
  <view class="mask" @touchmove.stop.prevent="moveHandle"></view>
  ```
* 按键修饰符：``uni-app``运行在手机端，没有键盘事件，所以不支持按键修饰符。


## 表单控件绑定

支持 [Vue官方文档：表单控件绑定](https://cn.vuejs.org/v2/guide/forms.html)。

建议开发过程中直接使用  [uni-app：表单组件](component/button)。用法示例：

H5 的select 标签用 picker 组件进行代替

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
  data () {
    return {
      index: 0,
      array: ['A', 'B', 'C']
    }
  },
  methods: {
    bindPickerChange (e) {
      console.log(e)
    }
  }
}

</script>
```

表单元素 radio 用 radio-group 组件进行代替

```html
<template>
  <view>
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked"/> {{item.value}}
      </label>
    </radio-group>
  </view>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'}
      ]
    }
  },
  methods: {
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
    }
  }
}

</script>

```

## v-html指令

App端（vue页面[V3编译模式](https://ask.dcloud.net.cn/article/36599)）和H5端支持v-html，其他端不支持v-html。

跨端的富文本处理方案详见：[https://ask.dcloud.net.cn/article/35772](https://ask.dcloud.net.cn/article/35772)

## 组件   

### Vue 组件

组件是 ``vue`` 技术中非常重要的部分，组件使得与ui相关的轮子可以方便的制造和共享，进而使得vue使用者的开发效率大幅提升。

uni-app搭建了组件的插件市场，可大幅提升开发者的效率。[https://ext.dcloud.net.cn/](https://ext.dcloud.net.cn/)

在项目的/component目录下存放组件，在要显示组件的页面中则分为3步：导入、注册和使用。

可以这个[评分组件](https://ext.dcloud.net.cn/plugin?id=33)的使用为例，了解vue组件的使用方式。

```html
<template>
	<view>
		<uni-rate value="2"></uni-rate> <!-- 第三步，使用组件。并传值点亮2颗星 -->
	</view>
</template>
<script>
import uniRate from "@/components/uni-rate/uni-rate.vue" //第一步，导入组件
export default {
    components: {
		uniRate //第二步，注册组件
	}
}
</script>
```

- `2.5.0+`版本支持在pages.json内引入组件，[详见](/collocation/pages?id=easycom)
- **uni-app只支持vue单文件组件（.vue 组件）**。其他的诸如：动态组件，自定义 ``render``，和``<script type="text/x-template">`` 字符串模版等，在非H5端不支持。


详细的非H5端不支持列表：

* ``Slot``（``scoped`` 暂时还没做支持）
* 动态组件
* 异步组件
* ``inline-template``
* ``X-Templates``
* ``keep-alive``
* ``transition`` （可使用 [animation](/api/ui/animation) 或 CSS 动画替代）
* [老的非自定义组件编译模式](https://ask.dcloud.net.cn/article/35843)不支持在组件引用时，在组件上定义 ``click`` 等原生事件、``v-show``（可用 ``v-if`` 代替）和 ``class`` ``style`` 等样式属性(例：``<card class="class-name"> </card>`` 样式是不会生效的)。建议更新为自定义组件模式
* [老的非自定义组件编译模式](https://ask.dcloud.net.cn/article/35843)组件里使用 ``slot`` 嵌套的其他组件时不支持 ``v-for``。建议更新为自定义组件模式

[Vue官方文档参考：组件](https://cn.vuejs.org/v2/guide/components.html) 。

### uni-app内置基础组件

``uni-app`` 内置了小程序的所有[组件](component/)，比如： ``picker``,``map`` 等，需要注意的是原生组件上的事件绑定，需要以 ``vue`` 的事件绑定语法来绑定，如 ``bindchange="eventName"`` 事件，需要写成 ``@change="eventName"`` 

**示例**

```html
<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
    <view class="picker">
      当前选择: {{date}}
    </view>
</picker>
```

### 全局组件

```uni-app``` 支持配置全局组件，需在 ``main.js`` 里进行全局注册，注册后就可在所有页面里使用该组件。

**注意**

- ``Vue.component`` 的第一个参数必须是静态的字符串。
- nvue页面暂不支持全局组件

**示例**

main.js 里进行全局导入和注册
```javascript
import Vue from 'vue'
import pageHead from './components/page-head.vue'
Vue.component('page-head',pageHead)
```
index.vue 里可直接使用组件
```html
<template>
  <view>
    <page-head></page-head>
	</view>
</template>
```

### 命名限制
在 `uni-app` 中以下这些作为保留关键字，不可作为组件名。

- `a`
- `canvas`
- `cell`
- `content`
- `countdown`
- `datepicker`
- `div`
- `element`
- `embed`
- `header`
- `image`
- `img`
- `indicator`
- `input`
- `link`
- `list`
- `loading-indicator`
- `loading`
- `marquee`
- `meta`
- `refresh`
- `richtext`
- `script`
- `scrollable`
- `scroller`
- `select`
- `slider-neighbor`
- `slider`
- `slot`
- `span`
- `spinner`
- `style`
- `svg`
- `switch`
- `tabbar`
- `tabheader`
- `template`
- `text`
- `textarea`
- `timepicker`
- `transition-group`
- `transition`
- `video`
- `view`
- `web`

**Tips**

- 除以上列表中的名称外，标准的 HTML 及 SVG 标签名也不能作为组件名。
- 在百度小程序中使用时，不要在 data 内使用 hidden ，可能会导致渲染错误
- `methods`中不可使用与生命周期同名的方法名


## 常见问题

**1. 如何获取上个页面传递的数据**

在 ``onLoad`` 里得到，``onLoad`` 的参数是其他页面打开当前页面所传递的数据。

**2. 如何设置全局的数据和全局的方法**

``uni-app`` 内置了 [vuex](https://vuex.vuejs.org/zh/guide/) ，在app里的使用，可参考``hello-uniapp`` ``store/index.js``。

```javascript
//store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {...},
    mutations: {...},
    actions: {...}
})

export default store

//main.js
...
import store from './store'
Vue.prototype.$store = store
const app = new Vue({
    store,...
})
...

//test.vue 使用时：
import {mapState,mapMutations} from 'vuex'
```

**3. 如何捕获 app 的 onError**

由于 ``onError`` 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 ``app`` 的根组件上添加名为 ``onError`` 的回调函数即可。如下：

```javascript
export default {
   // 只有 app 才会有 onLaunch 的生命周期
   onLaunch () {
       // ...
   },

   // 捕获 app error
   onError (err) {
       console.log(err)
   }
}
```

**4. 组件属性设置不生效解决办法**

当重复设置某些属性为相同的值时，不会同步到view层。
例如：每次将scroll-view组件的scroll-top属性值设置为0，只有第一次能顺利返回顶部。
这和props的单向数据流特性有关，组件内部scroll-top的实际值改动后，其绑定的属性并不会一同变化。

解决办法有两种（以scroll-view组件为例）：

* 监听scroll事件，记录组件内部变化的值，在设置新值之前先设置为记录的当前值

```html
<scroll-view :scroll-top="scrollTop" scroll-y="true" @scroll="scroll">
```

```js
export default {
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		}
	},
	methods: {
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function() {
				this.scrollTop = 0
			});
		}
	}
}
```

* 监听scroll事件，获取组件内部变化的值，实时更新其绑定值

```html
<scroll-view :scroll-top="scrollTop" scroll-y="true" @scroll="scroll">
```

```js
export default {
	data() {
		return {
			scrollTop: 0,
		}
	},
	methods: {
		scroll: function(e) {
			// 如果使用此方法，请自行增加防抖处理
			this.scrollTop = e.detail.scrollTop
		},
		goTop: function(e) {
			this.scrollTop = 0
		}
	}
}
```

第二种解决方式在某些组件可能造成抖动，推荐第一种解决方式。


## Vue特性支持表

#### 全局配置

|Vue 全局配置											|H5		|App端旧版|App端V3|微信小程序|说明																					|
|--																|--		|--				|--			|--				|--																						|
|Vue.config.silent								|支持	|支持			|支持		|支持			|-																						|
|Vue.config.optionMergeStrategies	|支持	|支持			|支持		|支持			|-																						|
|Vue.config.devtools							|支持	|不支持		|不支持	|不支持		|只在`Web`环境下支持													|
|Vue.config.errorHandler					|支持	|支持			|支持		|支持			|-																						|
|Vue.config.warnHandler						|支持	|支持			|支持		|支持			|-																						|
|Vue.config.ignoredElements				|支持	|支持			|支持		|支持			|强烈不推荐，会覆盖`uni-app`框架配置的内置组件|
|Vue.config.keyCodes							|支持	|不支持		|不支持	|不支持		|-																						|
|Vue.config.performance						|支持	|不支持		|不支持	|不支持		|只在`Web`环境下支持													|
|Vue.config.productionTip					|支持	|支持			|支持		|支持			|-																						|


#### 全局 API

|Vue 全局 API	|H5		|App端旧版|App端V3|微信小程序|说明																		|
|--						|--		|--				|--			|--				|--																			|
|Vue.extend		|支持	|不支持		|支持		|不支持		|不可作为组件使用												|
|Vue.nextTick	|支持	|不支持		|不支持	|不支持		|-																			|
|Vue.set			|支持	|支持			|支持		|支持			|-																			|
|Vue.delete		|支持	|支持			|支持		|支持			|-																			|
|Vue.directive|支持	|不支持		|支持		|不支持		|-																			|
|Vue.filter		|支持	|支持			|支持		|支持			|App端旧版不可以在`class`中使用					|
|Vue.component|支持	|支持			|支持		|支持			|-																			|
|Vue.use			|支持	|支持			|支持		|支持			|-																			|
|Vue.mixin		|支持	|支持			|支持		|支持			|-																			|
|Vue.version	|支持	|支持			|支持		|支持			|-																			|
|Vue.compile	|支持	|不支持		|不支持	|不支持		|`uni-app`使用的`vue`是只包含运行时的版本	|


#### 选项

|Vue 选项				|H5		|App端旧版|App端V3|微信小程序|说明																			|
|--							|--		|--				|--			|--				|--																				|
|data						|支持	|支持			|支持		|支持			|-																				|
|props					|支持	|支持			|支持		|支持			|App端旧版不可以传递函数									|
|propsData			|支持	|支持			|支持		|支持			|-																				|
|computed				|支持	|支持			|支持		|支持			|-																				|
|methods				|支持	|支持			|支持		|支持			|-																				|
|watch					|支持	|支持			|支持		|支持			|-																				|
|el							|支持	|不支持		|不支持	|不支持		|																					|
|template				|支持	|不支持		|不支持	|不支持		|`uni-app`使用的`vue`是只包含运行时的版本	|
|render					|支持	|不支持		|不支持	|不支持		|-																				|
|renderError		|支持	|不支持		|不支持	|不支持		|-																				|
|directives			|支持	|不支持		|支持		|不支持		|-																				|
|filters				|支持	|支持			|支持		|支持			|App端旧版不可以在`class`中使用						|
|components			|支持	|支持			|支持		|支持			|-																				|
|parent					|支持	|支持			|支持		|支持			|不推荐																		|
|mixins					|支持	|支持			|支持		|支持			|-																				|
|extends				|支持	|支持			|支持		|支持			|-																				|
|provide/inject	|支持	|支持			|支持		|支持			|App端旧版部分支持												|
|name						|支持	|支持			|支持		|支持			|App端旧版不支持递归组件									|
|delimiters			|支持	|不支持		|不支持	|不支持		|-																				|
|functional			|支持	|不支持		|不支持	|不支持		|-																				|
|model					|支持	|不支持		|支持		|不支持		|-																				|
|inheritAttrs		|支持	|不支持		|支持		|不支持		|-																				|
|comments				|支持	|不支持		|不支持	|不支持		|-																				|


#### 生命周期钩子

|Vue 生命周期钩子	|H5		|App端旧版|App端V3|微信小程序|说明	|
|--								|--		|--				|--			|--				|--		|
|beforeCreate			|支持	|支持			|支持		|支持			|-		|
|created					|支持	|支持			|支持		|支持			|-		|
|beforeMount			|支持	|支持			|支持		|支持			|-		|
|mounted					|支持	|支持			|支持		|支持			|-		|
|beforeUpdate			|支持	|支持			|支持		|支持			|-		|
|updated					|支持	|支持			|支持		|支持			|-		|
|activated				|支持	|不支持		|支持		|不支持		|-		|
|deactivated			|支持	|不支持		|支持		|不支持		|-		|
|beforeDestroy		|支持	|支持			|支持		|支持			|-		|
|destroyed				|支持	|支持			|支持		|支持			|-		|
|errorCaptured		|支持	|支持			|支持		|支持			|-		|

#### 实例属性

|Vue 实例属性		|H5		|App端旧版|App端V3|微信小程序|说明																																				|
|--							|--		|--				|--			|--				|--																																					|
|vm.$data				|支持	|支持			|支持		|支持			|-																																					|
|vm.$props			|支持	|支持			|支持		|支持			|-																																					|
|vm.$el					|支持	|不支持		|不支持	|不支持		|-																																					|
|vm.$options		|支持	|支持			|支持		|支持			|-																																					|
|vm.$parent			|支持	|支持			|支持		|支持			|H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$parent` 会获取这些内置组件	|
|vm.$root				|支持	|支持			|支持		|支持			|-																																					|
|vm.$children		|支持	|支持			|支持		|支持			|H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$children` 会获取这些内置组件|
|vm.$slots			|支持	|支持			|不支持	|支持			|App端旧版获取值为`{'slotName':true/false}`比如：`{"footer":true}`					|
|vm.$scopedSlots|支持	|支持			|支持		|支持			|App端旧版获取值为`{'slotName':true/false}`比如：`{"footer":true}`					|
|vm.$refs				|支持	|支持			|支持		|支持			|非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text）|
|vm.$isServer		|支持	|不支持		|支持		|不支持		|App端V3总是返回false																												|
|vm.$attrs			|支持	|不支持		|支持		|不支持		|-																																					|
|vm.$listeners	|支持	|不支持		|支持		|不支持		|-																																					|


#### 实例方法

|Vue 实例方法			|H5		|App端旧版|App端V3|微信小程序|说明	|
|--								|--		|--				|--			|--				|--		|
|vm.$watch()			|支持	|支持			|支持		|支持			|-		|
|vm.$set()				|支持	|支持			|支持		|支持			|-		|
|vm.$delete()			|支持	|支持			|支持		|支持			|-		|
|vm.$on()					|支持	|支持			|支持		|支持			|-		|
|vm.$once()				|支持	|支持			|支持		|支持			|-		|
|vm.$off()				|支持	|支持			|支持		|支持			|-		|
|vm.$emit()				|支持	|支持			|支持		|支持			|-		|
|vm.$mount()			|支持	|不支持		|不支持	|不支持		|-		|
|vm.$forceUpdate()|支持	|支持			|支持		|支持			|-		|
|vm.$nextTick()		|支持	|支持			|支持		|支持			|-		|
|vm.$destroy()		|支持	|支持			|支持		|支持			|-		|


#### 模板指令

|Vue 指令	|H5		|App端旧版|App端V3|微信小程序|说明																					|
|--				|--		|--				|--			|--				|--																						|
|v-text		|支持	|支持			|支持		|支持			|-																						|
|v-html		|支持	|不支持		|支持		|不支持		|-																						|
|v-show		|支持	|支持			|支持		|支持			|-																						|
|v-if			|支持	|支持			|支持		|支持			|-																						|
|v-else		|支持	|支持			|支持		|支持			|-																						|
|v-else-if|支持	|支持			|支持		|支持			|-																						|
|v-for		|支持	|支持			|支持		|支持			|-																						|
|v-on			|支持	|支持			|支持		|支持			|-																						|
|v-bind		|支持	|支持			|支持		|支持			|App端旧版不支持`v-bind="{key:value}"`类似用法|
|v-model	|支持	|支持			|支持		|支持			|-																						|
|v-pre		|支持	|不支持		|支持		|不支持		|-																						|
|v-cloak	|支持	|不支持		|不支持	|不支持		|-																						|
|v-once		|支持	|不支持		|支持		|不支持		|-																						|


#### 特殊属性

|Vue 特殊属性	|H5		|App端旧版|App端V3|微信小程序|说明									|
|--						|--		|--				|--			|--				|--										|
|key					|支持	|支持			|支持		|支持			|App端旧版不支持表达式|
|ref					|支持	|支持			|支持		|支持			|-										|
|is						|支持	|不支持		|支持		|不支持		|-										|


#### 内置组件

|Vue 内置组件			|H5		|App端旧版|App端V3|微信小程序	|说明	|
|--								|--		|--				|--			|--					|--		|
|component				|支持	|不支持		|支持		|不支持			|-		|
|transition				|支持	|不支持		|不支持	|不支持			|-		|
|transition-group	|支持	|不支持		|不支持	|不支持			|-		|
|keep-alive				|支持	|不支持		|支持		|不支持			|-		|
|slot							|支持	|支持			|支持		|支持				|-		|
