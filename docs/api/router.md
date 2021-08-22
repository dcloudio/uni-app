#### uni.navigateTo(OBJECT)

保留当前页面，跳转到应用内的某个页面，使用```uni.navigateBack```可以返回到原页面。

**OBJECT参数说明**

|参数|类型|必填|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|url|String|是||需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数| |
|animationType|String|否|pop-in|窗口显示的动画效果，详见：[窗口动画](api/router?id=animation)|App|
|animationDuration|Number|否|300|窗口动画持续时间，单位为 ms|App|
|events|Object|否||页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。||
|success|Function|否||接口调用成功的回调函数||
|fail|Function|否||接口调用失败的回调函数||
|complete|Function|否||接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**object.success 回调函数**

**参数**

**Object res**

|属性|类型|说明|
|:-|:-|:-|
|eventChannel|[EventChannel](api/router?id=event-channel)|和被打开页面进行通信|


**示例**

```javascript
//在起始页面跳转到test.vue页面并传递参数
uni.navigateTo({
	url: 'test?id=1&name=uniapp'
});
```
```javascript
// 在test.vue页面接受参数
export default {
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
		console.log(option.name); //打印出上个页面传递的参数。
	}
}
```

```
// 2.8.9+ 支持
uni.navigateTo({
  url: 'pages/test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})

// uni.navigateTo 目标页面 pages/test.vue
onLoad: function(option) {
  console.log(option.query)
  // #ifdef APP-NVUE
  const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
  // #endif
  // #ifndef APP-NVUE
  const eventChannel = this.getOpenerEventChannel();
  // #endif
  eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
  eventChannel.emit('someEvent', {data: 'test'});
  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
  eventChannel.on('acceptDataFromOpenerPage', function(data) {
    console.log(data)
  })
}
```


url有长度限制，太长的字符串会传递失败，可改用[窗体通信](https://uniapp.dcloud.io/collocation/frame/communication)、[全局变量](https://ask.dcloud.net.cn/article/35021)，另外参数中出现空格等特殊字符时需要对参数进行编码，如下为使用`encodeURIComponent`对参数进行编码的示例。
```html
<navigator :url="'/pages/test/test?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>
```
```javascript
// 在test.vue页面接受参数
onLoad: function (option) {
	const item = JSON.parse(decodeURIComponent(option.item));
}
```
**注意：**

* 页面跳转路径有层级限制，不能无限制跳转新页面
* 跳转到 tabBar 页面只能使用 switchTab 跳转
* 路由API的目标页面必须是在pages.json里注册的vue页面。如果想打开web url，在App平台可以使用 [plus.runtime.openURL](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL)或web-view组件；H5平台使用 window.open；小程序平台使用web-view组件（url需在小程序的联网白名单中）。在hello uni-app中有个组件ulink.vue已对多端进行封装，可参考。
* APP-NVUE平台暂不支持以`this.getOpenerEventChannel()`方式获取`eventChannel`，请换用`this.$scope.eventChannel`来获取，具体方式请参考上述示例。

#### uni.redirectTo(OBJECT)

关闭当前页面，跳转到应用内的某个页面。

**OBJECT参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|url|String|是|需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.redirectTo({
	url: 'test?id=1'
});
```

**注意：**

* 跳转到 tabBar 页面只能使用 switchTab 跳转

#### uni.reLaunch(OBJECT)

关闭所有页面，打开到应用内的某个页面。

**注意：**
如果调用了 [uni.preloadPage(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

**OBJECT参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|url|String|是|需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.reLaunch({
	url: 'test?id=1'
});
```
```javascript
export default {
	onLoad: function (option) {
		console.log(option.id);
	}
}
```

Tips：

* H5端调用`uni.reLaunch`之后之前页面栈会销毁，但是无法清空浏览器之前的历史记录，此时`navigateBack`不能返回，如果存在历史记录的话点击浏览器的返回按钮或者调用`history.back()`仍然可以导航到浏览器的其他历史记录。

#### uni.switchTab(OBJECT)

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。

**注意：**
如果调用了 [uni.preloadPage(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

**OBJECT参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|url|String|是|需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

pages.json
```javascript
{
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    },{
      "pagePath": "pages/other/other",
      "text": "其他"
    }]
  }
}
```
other.vue
```javascript
uni.switchTab({
	url: '/pages/index/index'
});
```

#### uni.navigateBack(OBJECT)

关闭当前页面，返回上一页面或多级页面。可通过 ```getCurrentPages()``` 获取当前的页面栈，决定需要返回几层。

**OBJECT参数说明**

|参数|类型|必填|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|delta|Number|否|1|返回的页面数，如果 delta 大于现有页面数，则返回到首页。||
|animationType|String|否|pop-out|窗口关闭的动画效果，详见：[窗口动画](api/router?id=animation)|App|
|animationDuration|Number|否|300|窗口关闭动画的持续时间，单位为 ms|App|

**示例**

```javascript
// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
uni.navigateTo({
	url: 'B?id=1'
});

// 此处是B页面
uni.navigateTo({
	url: 'C?id=1'
});

// 在C页面内 navigateBack，将返回A页面
uni.navigateBack({
	delta: 2
});
```


#### EventChannel@event-channel
2.8.9+ 支持
页面间事件通信通道

**方法**

#### EventChannel.emit(string eventName, any args)

触发一个事件

string eventName
事件名称

any args
事件参数


#### EventChannel.off(string eventName, function fn)

取消监听一个事件。给出第二个参数时，只取消给出的监听函数，否则取消所有监听函数

string eventName
事件名称

function fn
事件监听函数

参数
any args
触发事件参数


#### EventChannel.on(string eventName, function fn)

持续监听一个事件

string eventName
事件名称

function fn
事件监听函数

参数
any args
触发事件参数


#### EventChannel.once(string eventName, function fn)

监听一个事件一次，触发后失效

string eventName
事件名称

function fn
事件监听函数

参数
any args
触发事件参数


Tips：
* ``navigateTo``, ``redirectTo`` 只能打开非 tabBar 页面。
* ``switchTab`` 只能打开 ``tabBar`` 页面。
* ``reLaunch`` 可以打开任意页面。
* 页面底部的 ``tabBar`` 由页面决定，即只要是定义为 ``tabBar`` 的页面，底部都有 ``tabBar``。
* 不能在 ```App.vue``` 里面进行页面跳转。
* H5端页面刷新之后页面栈会消失，此时`navigateBack`不能返回，如果一定要返回可以使用`history.back()`导航到浏览器的其他历史记录。

**参考事项**
- 页面路由拦截和管理，插件市场有很多封装好的工具类，搜索[路由](https://ext.dcloud.net.cn/search?q=%E8%B7%AF%E7%94%B1)


#### 窗口动画@animation
> 本API仅App支持。小程序自身不支持自定义动画。H5的窗体动画可使用常规单页动画处理方案，见[H5下单页动画示例](https://ext.dcloud.net.cn/plugin?id=659&tdsourcetag=s_pctim_aiomsg)

窗口的显示/关闭动画效果，支持在 API、组件、pages.json 中配置，优先级为：`API = 组件 > pages.json`。

##### API
有效的路由 API

- navigateTo
- navigateBack

```javascript
uni.navigateTo({
	url: '../test/test',
	animationType: 'pop-in',
	animationDuration: 200
});
uni.navigateBack({
	delta: 1,
	animationType: 'pop-out',
	animationDuration: 200
});
```
##### 组件
open-type 有效值

- navigateTo
- navigateBack

```html
<navigator animation-type="pop-in" animation-duration="300" url="../test/test">navigator</navigator>
<navigator animation-type="pop-out" animation-duration="300" open-type="navigateBack" >navigator</navigator>
```
##### pages.json
pages.json 中配置的是窗口显示的动画
```javascript
"style": {
	"app-plus": {
		"animationType": "fade-in",
		"animationDuration": 300
	}
}
```

显示动画与关闭动画，会有默认的对应规则。但是如果通过 API 或组件配置了窗口关闭的动画类型，则不会使用默认的类型。

|显示动画|关闭动画|显示动画描述（关闭动画与之相反）
|:-|:-|:-|
|slide-in-right|slide-out-right|新窗体从右侧进入|
|slide-in-left|slide-out-left|新窗体从左侧进入|
|slide-in-top|slide-out-top|新窗体从顶部进入|
|slide-in-bottom|slide-out-bottom|新窗体从底部进入|
|pop-in|pop-out|新窗体从左侧进入，且老窗体被挤压而出|
|fade-in|fade-out|新窗体从透明到不透明逐渐显示|
|zoom-out|zoom-in|新窗体从小到大缩放显示|
|zoom-fade-out|zoom-fade-in|新窗体从小到大逐渐放大并且从透明到不透明逐渐显示|
|none|none|无动画|

详细的窗口动画说明，请参考：

- 窗口显示的动画：[AnimationTypeShow](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.AnimationTypeShow)
- 窗口关闭的动画：[AnimationTypeClose](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.AnimationTypeClose)

**注意**
- 纯nvue项目（render为native），窗体动画默认进入动画为popin，返回为pop-out。如果想修改动画类型，只能通过uni.navigateTo API修改，在组件或pages.json里配置动画类型无效
- 非纯nvue项目，App端窗体动画，默认进入动画为slider-in-right，默认返回动画为pop-out
- webview 中嵌入 uni-app H5时，使用 uni.webView.navigateTo... 跳转页面
