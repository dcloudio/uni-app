`App.vue`是我们的主组件，所有页面都是在`App.vue`下进行切换的，是页面入口文件。

其实你也可以理解为所有的路由也是`App.vue`的子组件。

在这个文件里，你可以初始化一些通用的组件，调用一些应用生命周期函数。

应用生命周期仅可在`App.vue`中监听，在其它页面监听无效。
### 应用生命周期

`uni-app` 支持如下应用生命周期函数：

|函数名						|说明																																												|
|:-								|:-																																													|
|onLaunch					|当`uni-app` 初始化完成时触发（全局只触发一次）																							|
|onShow						|当 `uni-app` 启动，或从后台进入前台显示																										|
|onHide						|当 `uni-app` 从前台进入后台																																|
|onUniNViewMessage|对 `nvue` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](/use-weex?id=nvue-向-vue-通讯)	|

在`App.vue`文件里定义globalData，如下：

```html
<script>  
    export default {  
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

**注意**

- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942](https://ask.dcloud.net.cn/article/35942)

### globalData
小程序有globalData机制，这套机制在uni-app里也可以使用，全端通用。

**以下是 App.vue 的相关配置：**

在`App.vue`文件里定义globalData，如下：

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

如果需要把globalData的数据绑定到页面上，可在页面的onShow声明周期里进行变量重赋值。HBuilderX 2.0.3起，nvue页面在`uni-app`编译模式下，也支持onShow。

weex编译模式不支持onShow，但熟悉5+的话，可利用监听webview的addEventListener show事件实现onShow效果。

优化样式渲染速度

如果页面背景是深色，在vue页面中可能会发生新窗体刚开始动画时是灰白色背景，动画结束时才变为深色背景，造成闪屏。这是因为webview的背景生效太慢的问题。此时需将样式写在 `App.vue` 里，可以加速页面样式渲染速度。`App.vue` 里面的样式是全局样式，每次新开页面会优先加载 `App.vue` 里面的样式，然后加载普通 vue 页面的样式。另外nvue页面不存在此问题，也可以更改为nvue页面。

