`main.js`是我们的入口文件，主要作用是初始化`vue`实例并使用需要的插件。

首先引入了`Vue`库和`App.vue`，创建了一个`vue`实例，并且挂载`vue`实例。
```
import Vue from 'vue'
import App from './App'
import pageHead from './components/page-head.vue' //引用page-head组件

Vue.config.productionTip = false
Vue.component('page-head', pageHead) //全局注册page-head组件
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount() //挂载Vue实例
```
也可以引用`vuex`，使用`Vue.use`引用插件，使用`Vue.prototype`添加全局变量，使用`Vue.component`注册全局组件。

不过无法使用`vue-router`，路由须在`pages.json`中进行配置。