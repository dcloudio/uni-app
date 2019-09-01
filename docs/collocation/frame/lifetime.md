### 应用生命周期

``uni-app`` 支持如下应用生命周期函数：

|函数名|说明|
|:-|:-|
|onLaunch|当``uni-app`` 初始化完成时触发（全局只触发一次）|
|onShow|当 ``uni-app`` 启动，或从后台进入前台显示|
|onHide|当 ``uni-app`` 从前台进入后台|
|onUniNViewMessage|对 ``nvue`` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](/use-weex?id=nvue-向-vue-通讯)|

**注意**

- 应用生命周期仅可在``App.vue``中监听，在其它页面监听无效。
- onlaunch里进行页面跳转，如遇白屏报错，请参考[https://ask.dcloud.net.cn/article/35942](https://ask.dcloud.net.cn/article/35942)

### 页面生命周期

``uni-app`` 支持如下页面生命周期函数：

|函数名|说明|平台差异说明|最低版本|
|:-|:-|:-|:-|
|onLoad|监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参），参考[示例](/api/router?id=navigateto)|||
|onShow|监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面|||
|onReady|监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发|||
|onHide|监听页面隐藏|||
|onUnload|监听页面卸载|||
|onResize|监听窗口尺寸变化|5+App、微信小程序||
|onPullDownRefresh|监听用户下拉动作，一般用于下拉刷新，参考[示例](api/ui/pulldown)|||
|onReachBottom|页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项|||
|onTabItemTap|点击 tab 时触发，参数为Object，具体见下方注意事项|微信小程序、百度小程序、H5、5+App（自定义组件模式）||
|onShareAppMessage|用户点击右上角分享|微信小程序、百度小程序、头条小程序、支付宝小程序||
|onPageScroll|监听页面滚动，参数为Object|||
|onNavigationBarButtonTap|监听原生标题栏按钮点击事件，参数为Object|5+ App、H5||
|onBackPress|监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack ；详细说明及使用：[onBackPress 详解](http://ask.dcloud.net.cn/article/35120)|5+App、H5||
|onNavigationBarSearchInputChanged|监听原生标题栏搜索输入框输入内容变化事件|5+App、H5|1.6.0|
|onNavigationBarSearchInputConfirmed|监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。|5+App、H5|1.6.0|
|onNavigationBarSearchInputClicked|监听原生标题栏搜索输入框点击事件|5+App、H5|1.6.0|

``onReachBottom``使用注意
可在pages.json里定义具体页面底部的触发距离[onReachBottomDistance](/collocation/pages)，比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。

如使用scroll-view导致页面没有滚动，则触底事件不会被触发。scroll-view滚动到底部的事件请参考scroll-view的文档


``onPageScroll`` （监听滚动、滚动监听、滚动事件）参数说明：

|属性|类型|说明|
|---|---|---|
|scrollTop|Number|页面在垂直方向已滚动的距离（单位px）|

**注意**
- `onPageScroll`里不要写交互复杂的js，比如频繁修改页面。因为这个生命周期是在渲染层触发的，在非h5端，js是在逻辑层执行的，两层之间通信是有损耗的。如果在滚动过程中，频发触发两层之间的数据交换，可能会造成卡顿。
- 如果想实现滚动时标题栏透明渐变，在App和H5下，可在pages.json中配置titleNView下的type为transparent，[参考](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)。
- 如果需要滚动吸顶固定某些元素，推荐使用css的粘性布局，参考[插件市场](https://ext.dcloud.net.cn/plugin?id=715)。插件市场也有其他js实现的吸顶插件，但性能不佳，需要时可自行搜索。
- 在App、微信小程序、H5中，也可以使用wxs监听滚动，[参考](https://uniapp.dcloud.io/frame?id=wxs)；在app-nvue中，可以使用bindingx监听滚动，[参考](https://uniapp.dcloud.io/use-weex?id=nvue-%e9%87%8c%e4%bd%bf%e7%94%a8-bindingx)。

``onTabItemTap`` 参数说明：

|属性|类型|说明|
|---|---|---|
|index|String|被点击tabItem的序号，从0开始|
|pagePath|String|被点击tabItem的页面路径|
|text|String|被点击tabItem的按钮文字|

**注意**
- onTabItemTap常用于点击当前tabitem，滚动或刷新当前页面。如果是点击不同的tabitem，一定会触发页面切换。
- 如果想在App端实现点击某个tabitem不跳转页面，不能使用onTabItemTap，可以使用[plus.nativeObj.view](http://www.html5plus.org/doc/zh_cn/nativeobj.html)放一个区块盖住原先的tabitem，并拦截点击事件。

``onNavigationBarButtonTap`` 参数说明：

|属性|类型|说明|
|---|---|---|
|index|Number|原生标题栏按钮数组的下标|

`onBackPress` 回调参数对象说明：

|属性|类型|说明|
|---|---|---|
|from|String|触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法。|
```javascript
export default {
	data() {
		return {};
	},
	onBackPress(options) {
		console.log('from:' + options.from)
	}
}
```

**注意**

- nvue 页面支持的生命周期参考：[nvue 生命周期介绍](/use-weex?id=生命周期)。

### 组件生命周期

``uni-app`` 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期：

|函数名|说明|平台差异说明|最低版本|
|:-|:-|:-|:-|
|beforeCreate|在实例初始化之后被调用。[详见](https://cn.vuejs.org/v2/api/#beforeCreate)|||
|created|在实例创建完成后被立即调用。[详见](https://cn.vuejs.org/v2/api/#created)|||
|beforeMount|在挂载开始之前被调用。[详见](https://cn.vuejs.org/v2/api/#beforeMount)|||
|mounted|挂载到实例上去之后调用。[详见](https://cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用```$nextTick```[Vue官方文档](https://cn.vuejs.org/v2/api/#Vue-nextTick)|||
|beforeUpdate|数据更新时调用，发生在虚拟 DOM 打补丁之前。[详见](https://cn.vuejs.org/v2/api/#beforeUpdate)|仅H5平台支持||
|updated|由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。[详见](https://cn.vuejs.org/v2/api/#updated)|仅H5平台支持||
|beforeDestroy|实例销毁之前调用。在这一步，实例仍然完全可用。[详见](https://cn.vuejs.org/v2/api/#beforeDestroy)|||
|destroyed|Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://cn.vuejs.org/v2/api/#destroyed)|||

