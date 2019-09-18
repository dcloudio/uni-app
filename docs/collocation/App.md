`App.vue`是我们的主组件，所有页面都是在`App.vue`下进行切换的，是页面入口文件。

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

在`App.vue`文件里使用生命周期函数，如下：

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
- **应用生命周期仅可在`App.vue`中监听，在其它页面监听无效**。
- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942](https://ask.dcloud.net.cn/article/35942)
- `App.vue` 不能写模板

### globalData
小程序有globalData机制，这套机制在uni-app里也可以使用，全端通用。

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

如果需要把globalData的数据绑定到页面上，可在页面的onShow页面生命周期里进行变量重赋值。HBuilderX 2.0.3起，nvue页面在`uni-app`编译模式下，也支持onShow。

weex编译模式中使用globalData的话，由于weex生命周期不支持onShow，但熟悉5+的话，可利用监听webview的addEventListener show事件实现onShow效果，或者直接使用weex生命周期中的beforeCreate。

### 全局样式
在`App.vue`中，可以一些定义全局通用样式，例如需要加一个通用的背景色，首屏页面渲染的动画等都可以写在App.vue中。

**例如：**

现在有个页面背景是深色在vue页面中，可能会发生新窗体刚开始动画时是灰白色背景，动画结束时才变为深色背景，造成闪屏。这种情况就可以使用全局样式来解决。
- 造成这种现象的原因是因为webview的背景生效太慢。此时可将样式写在 `App.vue` 里，来加速页面样式的渲染速度。因为`App.vue` 里面的样式是全局样式，每次新开页面会优先加载 `App.vue` 里面的样式，然后加载普通 vue 页面的样式去覆盖`App.vue` 里面的样式。
- 另外nvue页面不存在此问题，也可以更改为nvue页面。
