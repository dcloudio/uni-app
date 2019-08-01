
```mpvue``` 继承自 ```Vue.js```，其技术规范和语法特点与 ```Vue.js``` 保持一致。

本文档适用于有一定 ```Vue.js``` 使用经验的开发者。我们默认你已经掌握 ```Vue.js``` 技术体系，如果你是新手，你可能需要先熟悉 ```Vue.js``` 官方文档。

### 五分钟教程

通过 ```Vue.js``` 命令行工具 [vue-cli](https://github.com/vuejs/vue-cli)，你只需在终端窗口输入几条简单命令，即可快速创建和启动一个带热重载、保存时静态检查、内置代码构建功能的小程序项目：

```javascript
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

接下来，你只需要启动[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/quickstart/basic/getting-started.html#%E5%AE%89%E8%A3%85%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7)，引入项目即可预览到你的第一个 mpvue 小程序。

### 框架原理

* ```mpvue``` 保留了 ```vue.runtime``` 核心方法，无缝继承了 ```Vue.js``` 的基础能力
* ```mpvue-template-compiler``` 提供了将 vue 的模板语法转换到小程序的 ```wxml``` 语法的能力
* 修改了 vue 的建构配置，使之构建出符合小程序项目结构的代码格式： json/wxml/wxss/js 文件

## Vue实例

支持 [官方文档：Vue 实例](https://cn.vuejs.org/v2/guide/instance.html)，同时我们做了一些修改，来适应小程序的独特加载逻辑。

### 实例生命周期

同 vue，不同的是我们会在小程序 onReady 后，再去触发 vue mounted 生命周期，详细的 vue 生命周期文档请看[生命周期钩子](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

* beforeCreate
* created
* beforeMount
* mounted
* beforeUpdate
* updated
* activated
* deactivated
* beforeDestroy
* destroyed

除了 Vue 本身的生命周期外，mpvue 还兼容了小程序生命周期，这部分生命周期钩子的来源于[微信小程序的 Page](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html)， 除特殊情况外，不建议使用小程序的生命周期钩子。

**app 部分：**

* onLaunch，初始化
* onShow，当小程序启动，或从后台进入前台显示
* onHide，当小程序从前台进入后台

**page 部分：**

* onLoad，监听页面加载
* onShow，监听页面显示
* onReady，监听页面初次渲染完成
* onHide，监听页面隐藏
* onUnload，监听页面卸载
* onPullDownRefresh，监听用户下拉动作
* onReachBottom，页面上拉触底事件的处理函数
* onShareAppMessage，用户点击右上角分享
* onPageScroll，页面滚动
* onTabItemTap, 当前是 tab 页时，点击 tab 时触发

**用法示例：**

```javascript
new Vue({
  data: {
    a: 1
  },
  created () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a, '小程序触发的 onshow')
  }
})
// => "a is: 1"
```

**注意点**

* 不要在选项属性或回调上使用箭头函数，比如 ```created: () => console.log(this.a)``` 或 ```vm.$watch('a', newValue => this.myMethod())```。因为箭头函数是和父级上下文绑定在一起的，```this``` 不会是如你做预期的 ```Vue``` 实例，且 ```this.a``` 或 ```this.myMethod``` 也会是未定义的。

* 微信小程序的页面的 ```query``` 参数是通过 ```onLoad``` 获取的，```mpvue``` 对此进行了优化，直接通过 ```this.$root.$mp.query``` 获取相应的参数数据，其调用需要在 ```onLoad``` 生命周期触发之后使用，比如 ```onShow``` 等，具体生命周期调用顺序，见下图。

### 生命周期图示

> 你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。

生命周期的调用关系和顺序图。  

![vue](http://mpvue.com/assets/lifecycle.jpg)

## 模板语法

几乎全支持 [官方文档：模板语法](https://cn.vuejs.org/v2/guide/syntax.html)，下面讲下不支持的情况。

### 不支持 纯-HTML

小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用。

### 不支持部分复杂的 JavaScript 渲染表达式

我们会把 ```template``` 中的 ```{{}}``` 双花括号的部分，直接编码到 ```wxml``` 文件中，由于微信小程序的能力限制([数据绑定](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/data.html))，所以无法支持复杂的 JavaScript 表达式。

目前可以使用的有 ```+ - * % ?: ! == === > < [] .```，剩下的还待完善。

```html
<!-- 这种就不支持，建议写 computed -->
<p>{{ message.split('').reverse().join('') }}</p>

<!-- 但写在 @event 里面的表达式是都支持的，因为这部分的计算放在了 vdom 里面 -->
<ul>
    <li v-for="item in list">
        <div @click="clickHandle(item, index, $event)">{{ item.value }}</p>
    </li>
</ul>
```

### 不支持过滤器

渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持。

## 计算属性

支持 [官方文档：计算属性](https://cn.vuejs.org/v2/guide/computed.html)。

## 不支持函数

不支持在 template 内使用 methods 中的函数。

## Class 与 Style 绑定

为节约性能，我们将 Class 与 Style 的表达式通过 compiler 硬编码到 wxml 中，支持语法和转换效果如下：

class 支持的语法:

```html
<p :class="{ active: isActive }">111</p>
<p class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">222</p>
<p class="static" :class="[activeClass, errorClass]">333</p>
<p class="static" v-bind:class="[isActive ? activeClass : '', errorClass]">444</p>
<p class="static" v-bind:class="[{ active: isActive }, errorClass]">555</p>
```

将分别被转换成:

```html
<view class="_p {{[isActive ? 'active' : '']}}">111</view>
<view class="_p static {{[isActive ? 'active' : '', hasError ? 'text-danger' : '']}}">222</view>
<view class="_p static {{[activeClass, errorClass]}}">333</view>
<view class="_p static {{[isActive ? activeClass : '', errorClass]}}">444</view>
<view class="_p static {{[[isActive ? 'active' : ''], errorClass]}}">555</view>
```

style 支持的语法:

```html
<p v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">666</p>
<p v-bind:style="[{ color: activeColor, fontSize: fontSize + 'px' }]">777</p>
```

将分别被转换成:

```html
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">666</view>
<view class="_p" style=" {{'color:' + activeColor + ';' + 'font-size:' + fontSize + 'px' + ';'}}">777</view>
```

不支持 [官方文档：Class 与 Style 绑定](https://cn.vuejs.org/v2/guide/class-and-style.html) 中的 ```classObject``` 和 ``styleObject`` 语法。

最佳实践见上文支持的语法，**从性能考虑，建议不要过度依赖此**。

此外还可以用 computed 方法生成 class 或者 style 字符串，插入到页面中，举例说明：

```html
<template>
    <!-- 支持 -->
    <div class="container" :class="computedClassStr"></div>
    <div class="container" :class="{active: isActive}"></div>

    <!-- 不支持 -->
    <div class="container" :class="computedClassObject"></div>
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

暂不支持在组件上使用 Class 与 Style 绑定

## 条件渲染

全支持 [官方文档：条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)

## 列表渲染

全支持 [官方文档：列表渲染](https://cn.vuejs.org/v2/guide/list.html)

只是需要注意一点，嵌套列表渲染，必须指定不同的索引！

**示例：**

```html
<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
<template>
    <ul v-for="(card, index) in list">
        <li v-for="(item, itemIndex) in card">
            {{item.value}}
        </li>
    </ul>
</template>
```

## 事件处理器

几乎全支持 [官方文档：事件处理器](https://cn.vuejs.org/v2/guide/events.html)

我们引入了 Vue.js 的虚拟 DOM ，在前文模版中绑定的事件会被挂在到 vnode 上，同时我们的 compiler 在 wxml 上绑定了小程序的事件，并做了相应的映射，所以你在真实点击的时候通过 runtime 中 handleProxy 通过事件类型分发到 vnode 的事件上，同 Vue 在 WEB 的机制一样，所以可以做到无损支持。同时还顺便支持了自定义事件和 $emit 机制。

```javascript
// 事件映射表，左侧为 WEB 事件，右侧为 小程序 对应事件
{
    click: 'tap',
    touchstart: 'touchstart',
    touchmove: 'touchmove',
    touchcancel: 'touchcancel',
    touchend: 'touchend',
    tap: 'tap',
    longtap: 'longtap',
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

在 ```input``` 和 ```textarea``` 中 ```change``` 事件会被转为 ```blur``` 事件。

**踩坑注意：**

* 列表中没有的原生事件也可以使用例如 bindregionchange 事件直接在 dom 上将bind改为@ @regionchange,同时这个事件也非常特殊，它的 event type 有 begin 和 end 两个，导致我们无法在handleProxy 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既 <map @regionchange="functionName" @end="functionName" @begin="functionName"><map>
* 小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发，要避免踩坑。
* 事件修饰符
 
 * stop 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
 * prevent 可以直接干掉，因为小程序里没有什么默认事件，比如submit并不会跳转页面
 * capture 支持 1.0.9
 * self 没有可以判断的标识
 * once 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意，暂不考虑
 
* 其他 键值修饰符 等在小程序中压根没键盘，所以。。。

## 表单控件绑定

几乎全支持 [官方文档：表单控件绑定](https://cn.vuejs.org/v2/guide/forms.html)，不支持的还没测出来，之所以说几乎，是因为 WEB 表单这么复杂，谁特么知道会出什么奇怪的特性。

建议开发过程中直接使用  [微信小程序：表单组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html)。用法示例：

[select 组件用 picker 组件进行代替](https://github.com/Meituan-Dianping/mpvue/issues/58)

```html
<template>
  <div>
    <picker @change="bindPickerChange" :value="index" :range="array">
      <view class="picker">
        当前选择：{{array[index]}}
      </view>
    </picker>
  </div>
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

[表单元素 radio 用 radio-group 组件进行代替](https://github.com/Meituan-Dianping/mpvue/issues/66)


```html
<template>
  <div>
    <radio-group class="radio-group" @change="radioChange">
      <label class="radio" v-for="(item, index) in items" :key="item.name">
        <radio :value="item.name" :checked="item.checked"/> {{item.value}}
      </label>
    </radio-group>
  </div>
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

## 组件   

### Vue 组件

组件是整个 Vue.js 中最复杂的部分，当然要支持 [官方文档：组件](https://cn.vuejs.org/v2/guide/components.html) 。

**有且只能使用单文件组件（.vue 组件）的形式进行支持**。其他的诸如：动态组件，自定义 render，和```<script type="text/x-template">``` 字符串模版等都不支持。原因很简单，因为我们要预编译出 wxml。

如果未来小程序支持了动态增删改查 wxml 节点信息，那我们就能做到全支持。

详细的不支持列表：

* 暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：<card class="class-name"> </card> 样式是不会生效的)，因为编译到 wxml，小程序不会生成节点，建议写在内部顶级元素上。
* Slot（scoped 暂时还没做支持）
* 动态组件
* 异步组件
* inline-template
* X-Templates
* keep-alive
* transition
* class
* style

### 小程序组件

```mpvue``` 可以支持小程序的原生组件，比如： ```picker```,```map``` 等，需要注意的是原生组件上的事件绑定，需要以 ```vue``` 的事件绑定语法来绑定，如 ```bindchange="eventName"``` 事件，需要写成 ```@change="eventName"```

**示例代码**

```html
<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
    <view class="picker">
      当前选择: {{date}}
    </view>
</picker>
```

## TypeScript支持

目前```mpvue-loader```是可以支持TypeScript选项的，配置方法[在此](http://mpvue.com/build/mpvue-loader/#typescript)。具体Demo可以见[mpvue-ts-demo](https://github.com/WingGao/mpvue-ts-demo)

## 最佳实践

**1. 精简 data 数据**

冗余数据不要挂在 data 里，所有在 data/props/computed 中的数据，每次变更都会从微信小程序的 JSCore 进程，通过 setData 序列化成字符串后发送到 JSRender 进程。所以，如果你的数据量巨大的时候，会导致页面非常卡顿。

**2. 优化长列表性能**

一般情况下这种页面会有大量的数据，除了遵从上面的建议外还有额外的建议。

* 避免在 v-for 中嵌套子组件，这样可以优化大部分部分 setData 时的冗余数据。
* 通过实践发现 wx:if 和 hidden 的优化肉眼不可见，所以或许可以试试直接通过样式 display 来展示和隐藏。
* 如果列表过长，强烈建议产品思考更好的展示形态。比如只展示热门，多余的折叠等形式。

> 注：我们对其进行了专门优化，最佳实践时和原生小程序代码的性能相差无几。

**3. 合理使用双向绑定** mpvue 建议使用 v-model.lazy 绑定方式以优化性能，此外 v-model 在老基础库下输入框输入时可能存在光标重设的问题。

**4. 谨慎选择直接使用小程序的 API** 如果你有小程序和H5复用代码的需要，业务代码需要保持对 WEB Vue.js 的兼容性。此时我们不建议在代码中直接调用小程序API，更好的选择是通过桥接适配层屏蔽两端差异。

## 常见问题

**1. 如何获取小程序在 page onLoad 时候传递的 options**

在所有 页面 的组件内可以通过 ```this.$root.$mp.query``` 进行获取。

**2. 如何获取小程序在 app onLaunch/onShow 时候传递的 options**

在所有的组件内可以通过 ``this.$root.$mp.appOptions``` 进行获取。

**3. 如何捕获 app 的 onError**

由于 ```onError``` 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 ```onError``` 的回调函数即可。如下：

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

## mpvue 框架使用场景汇总

```mpvue``` 作为一个前端开发框架，提供了一整套解决方案。但开发者面临的实际情况可能更加复杂，我们整理了 ```mpvue``` 可能的使用场景，在这些场景下，我们为你提供了一些建议。

首先，mpvue 小程序框架包含如下内容：

* 运行时JS SDK
* 初始化模板项目（包含推荐的目录结构，webpack构建，代码检查配置等）
* 项目构建所需的 npm 依赖（已经包含在项目模板中，无需手动引入）

#### 开发者可能会面对的四种典型场景

* 单独以 ```mpvue`` 框架构建小程序
* ```mpvue``` 框架为主，同时使用其它框架（原生开发方式或wepy等）
* 已经使用其它框架，引入 ```mpvue``` 做部分模块的开发
* 只使用 ```mpvue``` 的 JS SDK，自定义构建策略

针对上述不同场景，```mpvue``` 框架需要提供的方案和建议如下

* 单独以 ```mpvue``` 框架构建小程序
 * **推荐的方式，无需额外支持**。通过框架提供的项目初始化工具初始化项目即可，已经包含完整的构建策略，代码组织方式等.
* ```mpvue``` 框架为主，同时使用其它框架（原生开发方式或wepy等）
 * **第三方框架和** ```mpvue``` **做分块构建**。可能的方案是：不同框架各自的构建策略做好边界分离，最终通过单一入口聚合到一起。或者更简单的，拆成多个子项目，最终输出到同一目录，目标代码符合小程序规范即可。
* 已经使用其它框架，引入 ```mpvue``` 做部分模块的开发
 * ```mpvue``` **提供轻量的模块构建工具支持部分构建**。对已有小程序项目接入 ```mpvue``` 来说，渐进的方式会是乐于接受的，可以先让一部分功能通过 ```mpvue``` 编写。此类场景，不再适合通过模板项目初始化项目结构，开发者可以参考模板项目中的代码编写方式，通过我们单独准备的构建工具，定制好构建任务即可。
* 只使用 ```mpvue``` 的 JS SDK，自定义构建策略
 * **需要开发者自定义 webpack 构建策略**。 框架本身不建议开发者这么使用。但对于高阶的开发者，这是可能的方案。此时，开发者可以参考我们模板项目中的构建策略即可，我们目前只提供 webpack 构建方案。对于其它构建，我们暂不支持。
