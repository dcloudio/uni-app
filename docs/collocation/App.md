`App.vue`是uni-app的主组件，所有页面都是在`App.vue`下进行切换的，是页面入口文件。但`App.vue`本身不是页面，这里不能编写视图元素。

这个文件的作用包括：调用应用生命周期函数、配置全局样式、配置全局的存储globalData

应用生命周期仅可在`App.vue`中监听，在页面监听无效。
### 应用生命周期

`uni-app` 支持如下应用生命周期函数：

|函数名						|说明																																												|平台兼容|
|:-								|:-																																													|:-	|
|onLaunch					|当`uni-app` 初始化完成时触发（全局只触发一次）																							||
|onShow						|当 `uni-app` 启动，或从后台进入前台显示																										||
|onHide						|当 `uni-app` 从前台进入后台																																||
|onError					|当 `uni-app` 报错时触发																																||
|onUniNViewMessage|对 `nvue` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](/use-weex?id=nvue-向-vue-通讯)	|App|

在`App.vue`文件里使用生命周期函数，如下：

```html
<script>  
    export default {  
        onLaunch: function() {  
            console.log('App Launch，app启动')  
        },  
        onShow: function() {  
            console.log('App Show，app展现在前台')  
        },  
        onHide: function() {  
            console.log('App Hide，app不再展现在前台')  
        }  
    }  
</script>  
```

**注意**
- **应用生命周期仅可在`App.vue`中监听，在其它页面监听无效**。
- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942](https://ask.dcloud.net.cn/article/35942)
- `App.vue` 不能写模板

### globalData
小程序有globalData，这是一种简单的全局变量机制。这套机制在uni-app里也可以使用，并且全端通用。

**以下是 App.vue 中定义globalData的相关配置：**

```html
<script>  
    export default {  
        globalData: {  
            text: 'text'  
        }
    }  
</script>  
```

js中操作globalData的方式如下：
`getApp().globalData.text = 'test'`

在应用onLaunch时，getApp对象还未获取，暂时可以使用this.$scope.globalData获取globalData。

如果需要把globalData的数据绑定到页面上，可在页面的onShow页面生命周期里进行变量重赋值。

nvue的weex编译模式中使用globalData的话，由于weex生命周期不支持onShow，但熟悉5+的话，可利用监听webview的addEventListener show事件实现onShow效果，或者直接使用weex生命周期中的beforeCreate。但建议开发者使用uni-app编译模式，而不是weex编译模式。

globalData是简单的全局变量，如果使用状态管理，请使用`vuex`（main.js中定义）

### 全局样式
在`App.vue`中，可以一些定义全局通用样式，例如需要加一个通用的背景色，首屏页面渲染的动画等都可以写在App.vue中。

注意如果工程下同时有vue和nvue文件，全局样式的所有css会应用于所有文件，而nvue支持的css有限，编译器会在控制台报警，提示某些css无法在nvue中支持。此时需要把nvue不支持的css写在单独的条件编译里。如：
```html
<style>
    /* #ifndef APP-PLUS-NVUE */
    @import './common/uni.css';
    /* #endif*/
</style>
```
