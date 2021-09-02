
## 全局配置

|Vue 全局配置		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|Vue.config.silent	| 取消 Vue 所有的日志与警告 [详情](https://cn.vuejs.org/v2/api/#silent)	|√	|√	| √		|		|
|Vue.config.optionMergeStrategies	| 自定义合并策略的选项 [详情](https://cn.vuejs.org/v2/api/#optionMergeStrategies)	|√	| √	| √		|		|
|Vue.config.devtools	| 配置是否允许 vue-devtools 检查代码 [详情](https://cn.vuejs.org/v2/api/#devtools) 	|√	| x	| x		|只在Web环境下支持		|
|Vue.config.errorHandler	| 指定组件的渲染和观察期间未捕获错误的处理函数 [详情](https://cn.vuejs.org/v2/api/#errorHandler) 	|√	|√	| √		|		|
|Vue.config.warnHandler	| 为 Vue 的运行时警告赋予一个自定义处理函数 [详情](https://cn.vuejs.org/v2/api/#warnHandler) 	|√	| √	| √		|		|
|Vue.config.ignoredElements	| 须使 Vue 忽略在 Vue 之外的自定义元素 [详情](https://cn.vuejs.org/v2/api/#ignoredElements) 	|√	| √	| √		|强烈不推荐，会覆盖uni-app框架配置的内置组件		|
|Vue.config.keyCodes	| 给 v-on 自定义键位别名 [详情](https://cn.vuejs.org/v2/api/#keyCodes)	|√	| x	| x		|		|
|Vue.config.performance	| 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪 [详情](https://cn.vuejs.org/v2/api/#performance)	|√	|x	| x		|只在Web环境下支持	|
|Vue.config.productionTip	| 设置为 false 以阻止 vue 在启动时生成生产提示 [详情](https://cn.vuejs.org/v2/api/#productionTip)	|√	| √	| √		|	-	|




## 全局 API

|Vue 全局 API	|描述	|H5	|App端|微信小程序	|说明				|
| --			| --	| --|--		|--			| --				|
|Vue.extend		| 使用基础 Vue 构造器，创建一个“子类” [详情](https://cn.vuejs.org/v2/api/#Vue-extend)	|√	|√		| x			|不可作为组件使用	|
|Vue.nextTick	| 在下次 DOM 更新循环结束之后执行延迟回调 [详情](https://cn.vuejs.org/v2/api/#Vue-nextTick)	|√	| x		| x			|	|
|Vue.set		| 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新 [详情](https://cn.vuejs.org/v2/api/#Vue-set)|√	| √|√	|		|
|Vue.delete	| 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图 [详情](https://cn.vuejs.org/v2/api/#Vue-delete)		|√	| √		| √	| |
|Vue.directive	| 注册或获取全局指令 [详情](https://cn.vuejs.org/v2/api/#Vue-directive)|√	|√		| x			|	|
|Vue.filter		| 注册或获取全局过滤器 [详情](https://cn.vuejs.org/v2/api/#Vue-filter)|√	|√		| x		|App端旧版不可以在class中使用			|
|Vue.component	| 注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称 [详情](https://cn.vuejs.org/v2/api/#Vue-component)	|√	| √		| √	| |
|Vue.use		| 安装 Vue.js 插件 [详情](https://cn.vuejs.org/v2/api/#Vue-use)	|√	| √		| √		|		|
|Vue.mixin		| 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例 [详情](https://cn.vuejs.org/v2/api/#Vue-mixin)	|√	|√		| √		|	|
|Vue.version	| 提供字符串形式的 Vue 安装版本号 [详情](https://cn.vuejs.org/v2/api/#Vue-version)	|√	| √		| √		|	|
|Vue.compile	| 将一个模板字符串编译成 render 函数。只在完整版时可用。[详情](https://cn.vuejs.org/v2/api/#Vue-compile)	|√	| x	| x	|uni-app使用的vue是只包含运行时的版本	|



## 选项

|Vue 选项		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|data	| Vue 实例的数据对象 [详情](https://cn.vuejs.org/v2/api/#data) 	|√	|√	| √		|		|
|props	| props 可以是数组或对象，用于接收来自父组件的数据 [详情](https://cn.vuejs.org/v2/api/#props) 	|√	|√	| √		|App端旧版不可以传递函数		|
|propsData	| 创建实例时传递 props。主要作用是方便测试 [详情](https://cn.vuejs.org/v2/api/#propsData) 	|√	| √	| √		|		|
|computed	| 计算属性将被混入到 Vue 实例中 [详情](https://cn.vuejs.org/v2/api/#computed) 	|√	| √	| √		|		|
|methods	| methods 将被混入到 Vue 实例中 [详情](https://cn.vuejs.org/v2/api/#methods) 	|√	| √	| √		|		|
|watch	| 一个对象，键是需要观察的表达式，值是对应回调函数 [详情](https://cn.vuejs.org/v2/api/#watch) 	|√	| √	| √		|		|
|el	| 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标 [详情](https://cn.vuejs.org/v2/api/#el) 	|√	| x	| x		|		|
|template	| 一个字符串模板作为 Vue 实例的标识使用 [详情](https://cn.vuejs.org/v2/api/#template) 	|√	| x	| x		|uni-app使用的vue是只包含运行时的版本		|
|render	| 字符串模板的代替方案，该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。[详情](https://cn.vuejs.org/v2/api/#render) 	|√	| x	| x		|		|
|renderError	| 当 render 函数遭遇错误时，提供另外一种渲染输出，只在开发者环境下工作 [详情](https://cn.vuejs.org/v2/api/#renderError) 	|√	| x	| x		|		|
|directives	| 包含 Vue 实例可用指令的哈希表 [详情](https://cn.vuejs.org/v2/api/#directives) 	|√	| √	| x		|		|
|filters	| 包含 Vue 实例可用过滤器的哈希表 [详情](https://cn.vuejs.org/v2/api/#filters) 	|√	| √	| √		|App端旧版不可以在class中使用		|
|components	| 包含 Vue 实例可用组件的哈希表 [详情](https://cn.vuejs.org/v2/api/#components) 	|√	| √	| √		|		|
|parent	| 指定已创建的实例之父实例，在两者之间建立父子关系 [详情](https://cn.vuejs.org/v2/api/#parent) 	|√	| √	| √		|不推荐		|
|mixins	|  选项接收一个混入对象的数组 [详情](https://cn.vuejs.org/v2/api/#mixins) 	|√	| √	| √		|		|
|extends	| 允许声明扩展另一个组件 [详情](https://cn.vuejs.org/v2/api/#extends) 	|√	| √	| √		|		|
|provide/inject	| 允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效 [详情](https://cn.vuejs.org/v2/api/#provide-inject) 	|√	|√	| √		|App端旧版部分支持		|
|name	| 允许组件模板递归地调用自身 [详情](https://cn.vuejs.org/v2/api/#name) 	|√	| √	| √		|App端旧版不支持递归组件		|
|delimiters	| 改变纯文本插入分隔符 [详情](https://cn.vuejs.org/v2/api/#delimiters) 	|√	|x	| x		|		|
|functional	| 使组件无状态 (没有 data) 和无实例 (没有 this 上下文) [详情](https://cn.vuejs.org/v2/api/#functional) 	|√	| x	| x		|		|
|model	| 允许一个自定义组件在使用 v-model 时定制 prop 和 event [详情](https://cn.vuejs.org/v2/api/#model) 	|√	|√	| x		|		|
|inheritAttrs	| inheritAttrs属性默认值为true，表示允许组件的根节点继承$attrs包含的属性 [详情](https://cn.vuejs.org/v2/api/#inheritAttrs) 	|√	|√	| x		|		|
|comments	| 当设为 true 时，将会保留且渲染模板中的 HTML 注释 [详情](https://cn.vuejs.org/v2/api/#comments) 	|√	| x	| x		|	-	|





## 生命周期


|生命周期钩子	|描述	|H5	|App端|微信小程序	|说明				|
| --			| --	| --|--		|--			| --				|
|beforeCreate		| 在实例初始化之后被调用 [详情](https://cn.vuejs.org/v2/api/#beforeCreate)	|√	|√		| √			|	|
|created	| 在实例创建完成后被立即调用 [详情](https://cn.vuejs.org/v2/api/#created)	|√	| √		| √			|	|
|beforeMount		| 在挂载开始之前被调用 [详情](https://cn.vuejs.org/v2/api/#beforeMount)|√	| √|√	|		|
|mounted	| 挂载到实例上去之后调用 [详情](https://cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用$nextTick	[详情](https://cn.vuejs.org/v2/api/#Vue-nextTick)	|√	| √		| √	| |
|beforeUpdate	| 数据更新时调用，发生在虚拟 DOM 打补丁之前 [详情](https://cn.vuejs.org/v2/api/#beforeUpdate)|√	|√		| √			|	|
|updated		| 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子 [详情](https://cn.vuejs.org/v2/api/#updated)|√	|√		| √		|	|
|activated	| 被 keep-alive 缓存的组件激活时调用 [详情](https://cn.vuejs.org/v2/api/#activated)	|√	| √		| x	| |
|deactivated		| 被 keep-alive 缓存的组件停用时调用 [详情](https://cn.vuejs.org/v2/api/#deactivated)	|√	| √		| x		|		|
|beforeDestroy		| 实例销毁之前调用。在这一步，实例仍然完全可用 [详情](https://cn.vuejs.org/v2/api/#beforeDestroy)	|√	|√		| √		|	|
|destroyed	| Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁 [详情](https://cn.vuejs.org/v2/api/#destroyed)	|√	| √		| √		|	|
|errorCaptured	| 当捕获一个来自子孙组件的错误时被调用 [详情](https://cn.vuejs.org/v2/api/#errorCaptured)	|√	| √	| √	| -	|




## 实例属性



|Vue 实例属性		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|vm.$data	| Vue 实例观察的数据对象 [详情](https://cn.vuejs.org/v2/api/#vm-data) 	|√	| √	| √		|		|
|vm.$props	| 当前组件接收到的 props 对象 [详情](https://cn.vuejs.org/v2/api/#vm-props) 	|√	| √	| √		|		|
|vm.$el	| Vue 实例使用的根 DOM 元素 [详情](https://cn.vuejs.org/v2/api/#vm-el) 	|√	| x	| x		|		|
|vm.$options	| 用于当前 Vue 实例的初始化选项 [详情](https://cn.vuejs.org/v2/api/#vm-options) 	|√	| √	| √		|		|
|vm.$parent	| 父实例，如果当前实例有的话 [详情](https://cn.vuejs.org/v2/api/#vm-parent) 	|√	|√	| √		|H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$parent` 会获取这些到内置组件，导致的问题是 `this.$parent` 与其他平台不一致，解决方式是使用 `this.$parent.$parent` 获取或自定义组件根节点由 `view` 改为 `div`|
|vm.$root	| 当前组件树的根 Vue 实例 [详情](https://cn.vuejs.org/v2/api/#vm-root) 	|√	| √	| √		|		|
|vm.$children	| 当前实例的直接子组件 [详情](https://cn.vuejs.org/v2/api/#vm-children) 	|√	| √	| √		|H5端 `view`、`text` 等内置标签是以 Vue 组件方式实现，`$children` 会获取到这些内置组件，导致的问题是 `this.$children` 与其他平台不一致，解决方式是使用 `this.$children.$children` 获取或自定义组件根节点由 `view` 改为 `div`|
|vm.$slots	| 用来访问被插槽分发的内容 [详情](https://cn.vuejs.org/v2/api/#vm-slots) 	|√	| x	| √		|App端旧版获取值为{'slotName':true/false}比如：{"footer":true}		|
|vm.$scopedSlots	| 用来访问作用域插槽 [详情](https://cn.vuejs.org/v2/api/#vm-scopedSlots) 	|√	| √	| √		|App端旧版获取值为{'slotName':true/false}比如：{"footer":true}		|
|vm.$refs	| 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例[详情](https://cn.vuejs.org/v2/api/#vm-refs) 	|√	| √	| √		|非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text）		|
|vm.$isServer	| 当前 Vue 实例是否运行于服务器 [详情](https://cn.vuejs.org/v2/api/#vm-isServer) 	|√	| √	| x		|App端V3总是返回false		|
|vm.$attrs	| 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 [详情](https://cn.vuejs.org/v2/api/#vm-attrs) 	|√	| √	| x		|		|
|vm.$listeners	| 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器 [详情](https://cn.vuejs.org/v2/api/#vm-listeners) 	|√	| √	| x		|	-	|





## 实例方法



|实例方法		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|vm.$watch()	| 观察 Vue 实例上的一个表达式或者一个函数计算结果的变化 [详情](https://cn.vuejs.org/v2/api/#vm-watch) 	|√	|√	| √		|		|
|vm.$set()	| 这是全局 Vue.set 的别名 [详情](https://cn.vuejs.org/v2/api/#vm-set) 	|√	| √	| √		|		|
|vm.$delete()	| 这是全局 Vue.delete 的别名 [详情](https://cn.vuejs.org/v2/api/#vm-delete) 	|√	| √	| √		|		|
|vm.$on()	| 监听当前实例上的自定义事件 [详情](https://cn.vuejs.org/v2/api/#vm-on) 	|√	| √	| √		|		|
|vm.$once()	| 监听一个自定义事件，但是只触发一次 [详情](https://cn.vuejs.org/v2/api/#vm-once) 	|√	|√	| √		|		|
|vm.$off()	| 移除自定义事件监听器 [详情](https://cn.vuejs.org/v2/api/#vm-off) 	|√	| √	| √		|		|
|vm.$emit()	| 触发当前实例上的事件 [详情](https://cn.vuejs.org/v2/api/#vm-emit) 	|√	| √	| √		|		|
|vm.$mount()	| 手动地挂载一个未挂载的实例 [详情](https://cn.vuejs.org/v2/api/#vm-mount) 	|√	| x	| x		|		|
|vm.$forceUpdate()	| 迫使 Vue 实例重新渲染 [详情](https://cn.vuejs.org/v2/api/#vm-forceUpdate) 	|√	| √	| √		|		|
|vm.$nextTick()	| 将回调延迟到下次 DOM 更新循环之后执行 [详情](https://cn.vuejs.org/v2/api/#vm-nextTick) 	|√	| √	| √		|		|
|vm.$destroy()	| 完全销毁一个实例 [详情](https://cn.vuejs.org/v2/api/#vm-destroy) 	|√	| √	| √		|	-	|





## 模板指令



|Vue 指令		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|v-text	| 更新元素的 textContent [详情](https://cn.vuejs.org/v2/api/#v-text) 	|√	|√	| √		|		|
|v-html	| 更新元素的 innerHTML [详情](https://cn.vuejs.org/v2/api/#v-html) 	|√	| √	| x		|微信小程序会被转成 `rich-text`		|	
|v-show	| 根据表达式之真假值，切换元素的 display CSS属性 [详情](https://cn.vuejs.org/v2/api/#v-show) 	|√	| √	| √		|		|
|v-if	| 根据表达式的值的 truthiness 来有条件地渲染元素 [详情](https://cn.vuejs.org/v2/api/#v-if) 	|√	| √	| √		|		|
|v-else	| 为 v-if 或者 v-else-if 添加“else 块” [详情](https://cn.vuejs.org/v2/api/#v-else) 	|√	| √	| √		|		|
|v-else-if| 表示 v-if 的“else if 块”。可以链式调用 [详情](https://cn.vuejs.org/v2/api/#v-else-if) 	|√	| √	| √		|		|
|v-for	| 基于源数据多次渲染元素或模板块 [详情](https://cn.vuejs.org/v2/api/#v-for) 	|√	| √	| √		|		|
|v-on	| 绑定事件监听器 [详情](https://cn.vuejs.org/v2/api/#v-on) 	|√	| √	| √		|		|
|v-bind	| 动态地绑定一个或多个 attribute，或一个组件 prop 到表达式 [详情](https://cn.vuejs.org/v2/api/#v-bind) 	|√	| √	| √		|App端旧版不支持v-bind="{key:value}"类似用法		|
|v-model| 在表单控件或者组件上创建双向绑定 [详情](https://cn.vuejs.org/v2/api/#v-model) 	|√	| √	| √		|		|
|v-pre	| 跳过这个元素和它的子元素的编译过程 [详情](https://cn.vuejs.org/v2/api/#v-pre) 	|√	| √	| x		|		|
|v-cloak| 这个指令保持在元素上直到关联实例结束编译 [详情](https://cn.vuejs.org/v2/api/#v-cloak) 	|√	| x	| x		|		|
|v-once	| 只渲染元素和组件一次 [详情](https://cn.vuejs.org/v2/api/#v-once) 	|√	| √	| x		| -	|




## 特殊属性


|特殊属性		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|key	| 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes [详情](https://cn.vuejs.org/v2/api/#key) 	|√	| √	| √		|App端旧版不支持表达式		|
|ref	| ref 被用来给元素或子组件注册引用信息 [详情](https://cn.vuejs.org/v2/api/#ref) 	|√	| √	| √		|非 H5 平台只能获取 vue 组件实例不能获取到内置组件实例|
|is	| 用于动态组件且基于 DOM 内模板的限制来工作 [详情](https://cn.vuejs.org/v2/api/#is) 	|√	| √	| x		|	-	|






## 内置组件


|内置组件		|描述						|H5		|App端|微信小程序  |说明	|
| --				| --						| --	|--		|--			| --	|
|component	| 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染 [详情](https://cn.vuejs.org/v2/api/#component) 	|√	| √	| x		|		|
|transition	| 作为单个元素/组件的过渡效果 [详情](https://cn.vuejs.org/v2/api/#transition) 	|√	| x	| x		|		|
|transition-group	| 作为多个元素/组件的过渡效果 [详情](https://cn.vuejs.org/v2/api/#transition-group) 	|√	| x	| x		|		|
|keep-alive	| 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们 [详情](https://cn.vuejs.org/v2/api/#keep-alive) 	|√	|x	| x		|		|	
|slot	| 作为组件模板之中的内容分发插槽 [详情](https://cn.vuejs.org/v2/api/#slot) 	|√	| √	| √		|	-	|
|template	| 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性 [详情](https://uniapp.dcloud.io/component/vue-component?id=template) 	|√	| √	| √		|	-	|




## 全局变量

实现全局变量的方式需要遵循 Vue 单文件模式的开发规范。详细参考：[uni-app全局变量的几种实现方式](https://ask.dcloud.net.cn/article/35021)。


## 其他配置

Vue 组件编译到小程序平台的时候会编译为对应平台的组件，部分小程序平台支持 options 选项（具体选项参考对应小程序平台文档的自定义组件部分），一般情况默认即可，如有特殊需求可在 Vue 组件中增加 options 属性。

```js
export default {
  props: ['data'],
  data(){ return { } },
  options: {
    // 微信小程序中 options 选项
    multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    styleIsolation: "isolated",  //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true,  //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
  }
}
```



## 常见问题

### 1. 如何获取上个页面传递的数据

在 onLoad 里得到，onLoad 的参数是其他页面打开当前页面所传递的数据。


### 2. 如何设置全局的数据和全局的方法

uni-app 内置了 [Vuex](https://uniapp.dcloud.io/vue-vuex) ，在app里的使用，可参考 `hello-uniapp` ` store/index.js`。


```javaScript
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



### 3. 如何捕获 app 的 onError

由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 onError 的回调函数即可。如下：

```javaScript
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


### 4. 组件属性设置不生效解决办法@componentsolutions

当重复设置某些属性为相同的值时，不会同步到view层。 例如：每次将scroll-view组件的scroll-top属性值设置为0，只有第一次能顺利返回顶部。 这和props的单向数据流特性有关，组件内部scroll-top的实际值改动后，其绑定的属性并不会一同变化。

解决办法有两种（以scroll-view组件为例）：

1.监听scroll事件，记录组件内部变化的值，在设置新值之前先设置为记录的当前值



```html
	<scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scroll"></scroll-view>
```


```javaScript
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

2.监听scroll事件，获取组件内部变化的值，实时更新其绑定值

```html
	<scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scroll"></scroll-view>
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


第二种解决方式在某些组件可能造成抖动，**推荐第一种解决方式**。


