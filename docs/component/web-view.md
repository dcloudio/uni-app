#### web-view

`web-view` 是一个 web 浏览器组件，可以用来承载网页的容器，会自动铺满整个页面（nvue 使用需要手动指定宽高）。

> 各小程序平台，web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url 。

**属性说明**

|属性名|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|src|String|webview 指向网页的链接|&nbsp;|
|allow|String|用于为 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 指定其[特征策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/策略特征)|H5|
|sandbox|String|该属性对呈现在 [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) 框架中的内容启用一些额外的限制条件。|H5|
|webview-styles|Object|webview 的样式|App-vue|
|@message|EventHandler|网页向应用 `postMessage` 时，会在特定时机（后退、组件销毁、分享）触发并收到消息。|H5 暂不支持|
|@onPostMessage|EventHandler|网页向应用实时 `postMessage`|App-nvue|

**src**

|来源|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|网络|√|√|√|√|√|√|√|√|√|
|本地|√|√|x|x|x|x|x|x|x|

**webview-styles**

|属性|类型|说明|
|:-|:-|:-|
|progress|Object/Boolean|进度条样式。仅加载网络 HTML 时生效，设置为 `false` 时禁用进度条。|

**progress**

|属性|类型|默认值|说明|
|:-|:-|:-|:-|
|color|String|#00FF00|进度条颜色|

```html
<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		}
	}
</script>

<style>

</style>
```

注意：
- 小程序仅支持加载网络网页，不支持本地html
- 小程序端 web-view 组件一定有原生导航栏，下面一定是全屏的 web-view 组件，navigationStyle: custom 对 web-view 组件无效。
- App 端使用 `自定义组件模式` 时，uni.web-view.js 的最低版为 [uni.webview.1.5.2.js](https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js)
- App 平台同时支持网络网页和本地网页，但本地网页及相关资源（js、css等文件）必须放在 `uni-app 项目根目录->hybrid->html` 文件夹下，如下为一个加载本地网页的`uni-app`项目文件目录示例：
- nvue `web-view` 必须指定样式宽高
- V3 编译模式，网页向应用 `postMessage` 为实时消息

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─components           
├─hybrid              
│  └─html
│     ├─css
│     │  └─test.css
│     ├─img
│     │  └─icon.png
│     ├─js
│     │  └─test.js
│     └─local.html
├─pages              
│  └─index
│     └─index.vue  
├─static              
├─main.js             
├─App.vue              
├─manifest.json      
└─pages.json         
	</code>
</pre>

**示例** [查看示例](https://hellouniapp.dcloud.net.cn/pages/component/web-view/web-view)
```html
<template>
	<view>
		<web-view src="/hybrid/html/local.html"></web-view>
	</view>
</template>
```

`<web-view>` 加载的网页中支持调用部分 uni 接口：

|方法名|说明|平台差异说明|
|:-|:-|:-|
|uni.navigateTo|[navigateTo](/api/router?id=navigateto)||
|uni.redirectTo|[redirectTo](/api/router?id=redirectto)||
|uni.reLaunch|[reLaunch](/api/router?id=relaunch)||
|uni.switchTab|[switchTab](/api/router?id=switchtab)||
|uni.navigateBack|[navigateBack](/api/router?id=navigateback)||
|uni.postMessage|向应用发送消息|字节跳动小程序不支持|
|uni.getEnv|获取当前环境|字节跳动小程序不支持|

##### uni.postMessage(OBJECT)
网页向应用发送消息，在 `<web-view>` 的 `message` 事件回调 `event.detail.data` 中接收消息。

**Tips**

- 传递的消息信息，必须写在 data 对象中。
- `event.detail.data` 中的数据，以数组的形式接收每次 post 的消息。

##### uni.getEnv(CALLBACK)

**callback 返回的对象**

|属性|类型|说明|
|:-|:-|:-|
|plus|Boolean|App|
|miniprogram|Boolean|微信小程序|
|smartprogram|Boolean|百度小程序|
|miniprogram|Boolean|支付宝小程序|

**示例**

在 `<web-view>` 加载的 HTML 中，添加以下代码：

```html
<script type="text/javascript">
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf('AlipayClient') > -1) {
    // 支付宝小程序的 JS-SDK 防止 404 需要动态加载，如果不需要兼容支付宝小程序，则无需引用此 JS 文件。
    document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
  } else if (/QQ/i.test(userAgent) && /miniProgram/i.test(userAgent)) {
    // QQ 小程序
    document.write('<script type="text/javascript" src="https://qqq.gtimg.cn/miniprogram/webview_jssdk/qqjssdk-1.0.0.js"><\/script>');
  } else if (/miniProgram/i.test(userAgent) || /MicroMessenger/i.test(userAgent)) {
    // 微信小程序 JS-SDK 如果不需要兼容微信小程序，则无需引用此 JS 文件。
    document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"><\/script>');
  } else if (/toutiaomicroapp/i.test(userAgent)) {
    // 字节跳动小程序 JS-SDK 如果不需要兼容字节跳动小程序，则无需引用此 JS 文件。
    document.write('<script type="text/javascript" src="https://s3.pstatp.com/toutiao/tmajssdk/jssdk-1.0.1.js"><\/script>');
  } else if (/swan/i.test(userAgent)) {
    // 百度小程序 JS-SDK 如果不需要兼容百度小程序，则无需引用此 JS 文件。
    document.write('<script type="text/javascript" src="https://b.bdstatic.com/searchbox/icms/searchbox/js/swan-2.0.18.js"><\/script>');
  }
  if (!/toutiaomicroapp/i.test(userAgent)) {
    document.querySelector('.post-message-section').style.visibility = 'visible';
  }
</script>
<!-- uni 的 SDK -->
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>
```
待触发 `UniAppJSBridgeReady` 事件后，即可调用 uni 的 API。
```html
<script>
    document.addEventListener('UniAppJSBridgeReady', function() {
        uni.postMessage({
            data: {
                action: 'message'
            }
        });
        uni.getEnv(function(res) {
            console.log('当前环境：' + JSON.stringify(res));
        });
    });
</script>
```


##### **App端web-view的扩展**
App端的webview是非常强大的，可以更灵活的控制和拥有更丰富的API。

每个vue页面，其实都是一个webview，而vue页面里的web-view组件，其实是webview里的一个子webview。这个子webview被append到父webview上。

通过以下方法，可以获得这个web-view组件对应的js对象，然后参考[https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject)，可以进一步重设这个web-view组件的样式，比如调整大小

```html
<template>
	<view>
		<web-view src="https://www.baidu.com"></web-view>
	</view>
</template>
<script>
var wv;//计划创建的webview
export default {
	onReady() {
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
		setTimeout(function() {
			wv = currentWebview.children()[0]
			wv.setStyle({top:150,height:300})
		}, 1000); //如果是页面初始化调用时，需要延时一下
		// #endif
		}
	};
</script>
```

甚至可以不用`web-view`组件，直接js创建一个子webview来加载html。比如不希望远程网页使用plus的API，不管是因为安全原因还是因为back监听冲突，可以使用如下代码：
```html
<template>
	<view>
	</view>
</template>
<script>
var wv;//计划创建的webview
export default {
	onLoad() {
		// #ifdef APP-PLUS
		wv = plus.webview.create("","custom-webview",{
			plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
      'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
			top:uni.getSystemInfoSync().statusBarHeight+44 //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
		})
		wv.loadURL("https://www.baidu.com")
		var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
		currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
		setTimeout(function() {
			console.log(wv.getStyle())
		}, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
		// #endif
	}
};
</script>
```

如果想设置web-view组件可双指缩放，可参考如下代码：
```js
onReady() {
		// #ifdef APP-PLUS
		var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
		setTimeout(function() {
			wv = currentWebview.children()[0]
			wv.setStyle({scalable:true})
		}, 1000); //如果是页面初始化调用时，需要延时一下
		// #endif
		}
	};
```

##### `web-view`组件的层级问题解决
web-view组件在App和小程序中层级较高，如需要在vue页面中写代码为web-view组件覆盖内容，小程序端无解，只能由web-view的组件自己弹出div。App端有如下若干方案：
1. 比较简单的方式是actionsheet等原生弹出菜单（小程序也可以使用此方案）
2. 使用plus.nativeObj.view。这里有一个底部图标菜单的示例，可参考[https://ext.dcloud.net.cn/plugin?id=69](https://ext.dcloud.net.cn/plugin?id=69)
3. 使用[原生子窗体subNvue](/api/window/subNVues)
4. 可以在web-view组件内嵌的网页中弹出z-index更高的div。如果是外部网页，可以在vue中获得子webview对象后，通过[evalJS](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.evalJS)为这个子webview注入一段js，操作其弹出div层。

##### web-view组件的浏览器内核说明
- H5端的web-view其实是被转为iframe运行，使用的是当前的浏览器
- 小程序的web-view使用的是小程序自带的浏览器内核，不同厂商不一样，[详见](https://ask.dcloud.net.cn/article/1318)
- App端，Android，默认使用的是os自带的浏览器内核，在设置-所有应用里，显示系统服务，可查看Android System Webview的版本。在Android5+，系统webview支持安装升级。
- App端，Android，支持在manifest中配置选用腾讯X5浏览器内核。使用x5内核需要一些注意事项！具体请参考[详见](https://ask.dcloud.net.cn/article/36806)
- App端，iOS，是分为UIWebview和WKWebview的，2.2.5+起默认为WKWebview，之前版本[详见](https://ask.dcloud.net.cn/article/36348)


**注意事项**
- `<web-view>` 组件默认铺满全屏并且层级高于前端组件。App端想调节大小或再其上覆盖内容需使用plus规范。
- `<web-view>` 组件所在窗口的标题，跟随页面的 `<title>` 值的变化而变化。
- App-vue的`web-view`加载的html页面可以运行plus的api，但注意如果该页面调用了plus.key的API监听了back按键（或使用mui的封装），会造成back监听冲突。需要该html页面移除对back的监听。或按照上面的示例代码禁止网页使用plus对象。app-nvue页面的`web-view`组件不能运行plus API。
- `uni.webview.js` 最新版地址：[https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js](https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js)
- 小程序平台，个人类型与海外类型的小程序使用 `web-view` 组件，提交审核时注意微信等平台是否允许使用
- 小程序平台， `src` 指向的链接需登录小程序管理后台配置域名白名单。`App`和`H5` 无此限制。

##### FAQ

Q：web-view 的页面怎么和应用内的页面交互？
A：调用 uni 相关的 API，就可以实现页面切换及发送消息。参考：[在 web-view 加载的 HTML 中调用 uni 的 API](https://ask.dcloud.net.cn/article/35083)

Q：web-view 加载的 HTML 中，能够调用 5+ 的能力么？
A：加载的 HTML 中是有 5+ 环境的，在 plusready 后调用即可。参考：[一个简单实用的 plusready 方法](https://ask.dcloud.net.cn/article/34922)

Q: web-view 加载 uni-app H5，内部跳转冲突如何解决
A：使用 uni.webView.navigateTo...
