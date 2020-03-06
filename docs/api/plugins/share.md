**分享**

在不同平台，分享的调用方式和逻辑有较大差异。
- App：可以自主控制分享内容、分享形式及分享平台
1. 使用 ``uni.share`` API方式调用社交sdk分享
2. 使用[plus.share.sendWithSystem](http://www.html5plus.org/doc/zh_cn/share.html#plus.share.sendWithSystem)呼起手机os的系统分享菜单
- 小程序：不支持API调用，只能用户主动点击触发分享。可使用自定义按钮方式 &lt;button open-type="share"&gt; 或监听系统右上角的分享按钮 onShareAppMessage 进行自定义分享内容
- H5：如果是普通浏览器，浏览器自带分享按钮；如果是在微信内嵌浏览器中，可调用js-sdk进行分享，[参考](https://ask.dcloud.net.cn/article/35380)|

### uni.share(OBJECT)
uni-app的App引擎已经封装了微信、QQ、微博的分享SDK，开发者可以直接调用相关功能。

可以分享到微信、QQ、微博，每个社交平台被称为分享服务提供商，即provider。

可以分享文字、图片、图文横条、音乐、视频等多种形式。同时注意，分享为小程序也使用本API。即在App里可以通过本API把一个内容以小程序（通常为内容页）方式直接分享给微信好友。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|x|x|x|x|x|


**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享服务提供商（即weixin&#124;qq&#124;sinaweibo），通过 [uni.getProvider](/api/plugins/provider) 获取可用的分享服务商，可用是指在manifest.json的sdk配置中配的分享sdk厂商，与本机安装了什么社交App无关|
|type|Number|否|分享形式，如图文、纯文字、纯图片、音乐、视频、小程序等。默认图文 0。不同分享服务商支持的形式不同，具体参考下面type值说明。|
|title|String|否|分享内容的标题|
|scene|String|provider 为 weixin 时必选|场景，可取值参考下面说明。|
|summary|String|type 为 1 时必选|分享内容的摘要|
|href|String|type 为 0 时必选|跳转链接|
|imageUrl|String|type 为 0、2、5 时必选|图片地址。type为0时，推荐使用小于20Kb的图片|
|mediaUrl|String|type 为 3、4 时必选|音视频地址|
|miniProgram|Object|type 为 5 时必选|分享小程序必要参数|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**type 值说明**

|值|说明|provider 支持度|
|:-|:-|:-|
|0|图文|weixin、sinaweibo|
|1|纯文字||
|2|纯图片||
|3|音乐|weixin、qq|
|4|视频|weixin、sinaweibo|
|5|小程序|weixin|

**scene 值说明**

|值|说明|
|:-|:-|
|WXSceneSession|分享到聊天界面|
|WXSenceTimeline|分享到朋友圈|
|WXSceneFavorite|分享到微信收藏|

**miniProgram 值说明**

|值|类型|说明|
|:-|:-|:-|
|id|String|微信小程序原始id|
|path|String|点击链接进入的页面|
|type|Number|微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。|
|webUrl|String|兼容低版本的网页链接|

**注意事项：**

* 真机运行时，分享调用的是HBuilder真机运行基座的sdk配置，分享出去的内容会显示为HBuilder。需自行在各社交平台注册账户，在manifest的sdk配置中填写自己的配置，打包后生效。
* 分享到 QQ 必须含有 href 链接
* 分享文字到 QQ 时，title 必选
* 新浪微博仅支持分享本地音视频，不能分享网络音视频
* 仅支持分享微信小程序到微信聊天界面，想进入朋友圈需改为分享图片方式，在图片中包含小程序码。一般通过canvas绘制图片，插件市场有很多生成图片的插件。
* 在 iOS 端，若未安装微博客户端，会启用微博的网页分享，此时不能分享图片
* 分享新浪微博不会返回正确的成功回调
* 不能直接分享到QQ空间，可以分享到QQ，然后在QQ的界面里选择QQ空间。
* 分享微信朋友圈多图，微信官方已经禁掉这个功能。可以考虑把多张图用canvas合并成一张图分享出去。
* 从APP分享到微信时，无法判断用户是否点击取消分享，因为微信官方禁掉了分享成功的返回值。

#### 分享到微信聊天界面示例代码

**分享文字**
```javascript
uni.share({
	provider: "weixin",
	scene: "WXSceneSession",
	type: 1,
	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```

**分享图片**
```javascript
uni.share({
	provider: "weixin",
	scene: "WXSceneSession",
	type: 2,
	imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```


**分享图文**

href、imageUrl 为必选参数，title/summary 二选一，最好将这四个参数都选上。

```javascript
uni.share({
	provider: "weixin",
	scene: "WXSceneSession",
	type: 0,
	href: "http://uniapp.dcloud.io/",
	title: "uni-app分享",
	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
	imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```


#### 分享到微信朋友圈示例代码

**分享文字**
```javascript
uni.share({
	provider: "weixin",
	scene: "WXSenceTimeline",
	type: 1,
	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```

**分享图片**
```javascript
uni.share({
	provider: "weixin",
	scene: "WXSenceTimeline",
	type: 2,
	imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```

**分享图文**

href、imageUrl 为必选参数，title、summary 至少有一项。

```javascript
uni.share({
	provider: "weixin",
	scene: "WXSenceTimeline",
	type: 0,
	href: "http://uniapp.dcloud.io/",
	title: "uni-app分享",
	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
	imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
	success: function (res) {
		console.log("success:" + JSON.stringify(res));
	},
	fail: function (err) {
		console.log("fail:" + JSON.stringify(err));
	}
});
```

**App分享为微信小程序**（App中分享一个内容到微信好友，对方微信中呈现的是一个小程序卡片）

```javascript
uni.share({
    provider: 'weixin',
    scene: "WXSceneSession",
    type: 5,
    imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
    title: '欢迎体验uniapp',
    miniProgram: {
        id: 'gh_abcdefg',
        path: 'pages/index/index',
        type: 0,
        webUrl: 'http://uniapp.dcloud.io'
    },
    success: ret => {
        console.log(JSON.stringify(ret));
    }
});
```


#### uni.share 在App端各社交平台分享配置说明

- 第一步，打开 manifest.json -> App模块权限配置，勾选 Share(分享)；
- 第二步，按如下文档具体配置微信、微博、QQ的参数。

##### 微信分享

在 manifest.json 的 App SDK 配置里，勾选微信消息及朋友圈，并填写 appid，如需在iOS平台使用还需要配置通用链接。

**参考文档**

- 微信 appid 申请步骤：[https://ask.dcloud.net.cn/article/208](https://ask.dcloud.net.cn/article/208)。
- iOS平台微信SDK配置通用链接：[https://ask.dcloud.net.cn/article/36445](https://ask.dcloud.net.cn/article/36445)。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/doc/mp-weixin-manifest-share.png)

##### 新浪微博分享
在 manifest.json 的 App SDK 配置里，勾选勾选新浪微博，并填写相关appkey，新浪微博 appkey 申请步骤可参考：[https://ask.dcloud.net.cn/article/209](https://ask.dcloud.net.cn/article/209)。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni2019022502.png)

##### QQ 分享
在 manifest.json 的 App SDK 配置里，勾选分享到QQ好友，并填写相关appkey，QQ分享 appkey 申请步骤：

1. 前往 QQ 开放平台：[https://connect.qq.com/index.html](https://connect.qq.com/index.html)；
2. 完成开发者注册；
3. 创建应用，选择移动 App，填写相关信息，然后等待审核，审核通过后即可得到AppId。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni2019022503.png)

这些配置需要打包生效，真机运行仍然是HBuilder基座的设置，可使用[自定义基座包](http://ask.dcloud.net.cn/article/12723)调试。离线打包请参考离线打包文档在原生工程中配置。

配置并打包后，通过`uni.getProvider`可以得到配置的结果列表，注意这里返回的是manifest配置的，与手机端是否安装微信、QQ、微博无关。

如果手机端未安装QQ、微博，调用时会启动这些平台的wap页面分享，如果已安装相应客户端，会启动它们的客户端分享。


##### FAQ
- Q：App端如何集成其他分享SDK，如facebook分享、twitter分享
- A：插件市场已有相关插件，[详见](https://ext.dcloud.net.cn/search?q=%E5%88%86%E4%BA%AB)；也可以根据原生插件教程自行开发，原生插件开发文档见[https://ask.dcloud.net.cn/article/35428](https://ask.dcloud.net.cn/article/35428)

- Q：弹出分享菜单，是否有已经写好的插件？
- A：插件市场有很多封装好的分享菜单插件，[底部图标菜单](https://ext.dcloud.net.cn/search?q=%E5%BA%95%E9%83%A8%E5%9B%BE%E6%A0%87%E8%8F%9C%E5%8D%95)，可直接弹出菜单，并且没有遮挡层级问题，推荐使用。

### uni.shareWithSystem(OBJECT)

调用系统分享组件发送分享消息，不需要配置分享SDK

**平台差异说明**

|App						|H5	|微信小程序	|支付宝小程序	|百度小程序	|头条小程序	|QQ小程序	|
|:-:						|:-:|:-:				|:-:					|:-:				|:-:				|:-:			|
|√(App 2.6.4+)	|x	|x					|x						|x					|x					|x				|


**OBJECT 参数说明**

|参数名		|类型		|必填	|说明																		|
|:-				|:-			|:-		|:-																			|
|type			|String	|-		|分享类型，只支持text，image，默认为text|
|summary	|String	|-		|分享的文字内容													|
|href			|String	|-		|分享链接，ios端分享到微信时必填此字段	|
|imageUrl	|String	|-		|分享图片，仅支持本地路径								|

**注意事项**

- Android端当msg参数中设置图片（`imageUrl`属性）时，分享类型自动变为为`image`，在分享时可能只会发送图片（如微信）；没有设置图片时分享类型则认为是文本`text`。
- iOS端不同的分享程序对分享内容有要求，如微信分享时必需添加链接地址`href`，否则微信分享失败。 注：iOS8.0及以上系统触发成功回调则表示发送消息成功。

**示例代码**

```javascript
uni.shareWithSystem({
  summary: '',
  href: 'https://uniapp.dcloud.io',
  success(){
    // 分享完成，请注意此时不一定是成功分享
  },
  fail(){
    // 分享失败
  }
})
```

### plus.share.sendWithSystem(msg, successCB, errorCB)

Android和iOS都有应用注册分享接口的机制，基本上所有有接收分享内容功能的应用，都会注册分享接口。

App端可调用手机的系统分享，实现所有注册分享的应用的呼起，比如短信、邮件、蓝牙(仅Android)、隔空投送(仅iOS)，或其他注册系统分享的应用，比如钉钉。

与`uni.share`相比，调用系统分享不需要集成三方sdk。但有些功能上的限制，比如无法分享为微信小程序。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|x|x|x|x|x|

说明：
调用系统分享组件分享消息，通过msg参数设置分享内容。 发送成功后通过successCB回调函数通知操作完成，发送失败则通过errorCB回调返回。

|参数|类型|说明|
|:-|:-|:-|
|msg|object|要发送的分享消息对象，如文字内容，图片等信息。对象格式见下。必填|
|successCB||成功回调，可选。注：此回调仅保证呼起分享界面，并不表示分享消息已经发送成功|
|errorCB||失败回调，可选|

**msg参数说明**

|参数|类型|说明|
|:-|:-|:-|
|content|String|分享消息的文字内容|
|pictures|Array[ String ]|分享消息中包含的图片路径，仅支持本地路径。 若分享平台仅支持提交一张图片，传入多张图片则仅提交第一张图片。 如果未指定type类型，优先级顺序为：pictures>content（即设置了pictures则认为分享图片类型）。|
|thumbs|Array[ Stromg ]|分享消息中包含的缩略图路径，支持本地路径及网络路径。 若分享平台仅支持提交一张图片，传入多张图片则仅提交第一张图片。 如果分享平台的信息不支持缩略图，若没有设置消息的图片（pictures）则使用缩略图，否则忽略其属性值。 注意：图片有大小限制，推荐图片小于20Kb。|
|media|Strubg|分享的多媒体资源地址，当type值为"music"、"video"时有效。 注意： 微信分享平台支持音乐、视频类型，仅支持网络地址（以http://或https://开头）； QQ分享平台支持音乐类型，仅支持网络路径（以http://或https://开头）； 新浪微博分享平台支持视频类型，仅支持本地文件路径。|
|href|String|分享独立的链接地址，仅支持网络地址（以http://或https://开头）。 如果未指定type类型，优先级顺序为：href>pictures>content（即设置了href则认为分享网页类型）。|
|title|String|分享消息的标题。仅微信分享网页、音频、视频类型时支持。|

**示例代码**
```javascript
	plus.share.sendWithSystem({content:'分享内容',href:'https://www.dcloud.io/'}, function(){
		console.log('分享成功');
	}, function(e){
		console.log('分享失败：'+JSON.stringify(e));
	});
```

**注意**
- Android：当msg参数中设置图片（msg.pictures属性）时，分享类型为"image/*"，在分享时可能只会发送图片（如微信）；没有设置图片时分享类型则认为是文本"text/plain"。
- iOS：不同的分享程序对分享内容有要求，如微信分享时必需添加链接地址（msg.href），否则微信分享失败。 注：iOS8.0及以上系统表示分享操作成功则表示发送消息成功。
- 很多App的做法是点击分享按钮首先弹出一个自定义菜单，放置微信好友、朋友圈、QQ、微博等功能图标，然后再放置一个更多分享，点击后会调用系统分享。类似插件在[插件市场](https://ext.dcloud.net.cn/search?q=%E5%BA%95%E9%83%A8%E5%9B%BE%E6%A0%87%E8%8F%9C%E5%8D%95)很多。

### onShareAppMessage(OBJECT)

小程序中用户点击分享后，在 js 中定义 onShareAppMessage 处理函数（和 onLoad 等生命周期函数同级），设置该页面的分享信息。

* 用户点击分享按钮的时候会调用。这个分享按钮可能是小程序右上角原生菜单自带的分享按钮，也可能是开发者在页面中放置的分享按钮（\<button open-type="share">）；
* 此事件需要 return 一个Object，用于自定义分享内容。

微信小程序平台的分享管理比较严格，请参考 [小程序分享指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|


|参数|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|from|String|分享事件来源：button（页面内分享按钮）、menu（右上角分享按钮）||
|target|Object|如果 from 值是 button，则 target 是触发这次分享事件的 button，否则为 undefined||
|webViewUrl|String|页面中包含 ``<web-view>`` 组件时，返回当前 ``<web-view>`` 的url|微信小程序1.6.4+、支付宝小程序|

此事件需要 return 一个 Object，用于自定义分享内容，其内容如下：

|参数名			|类型			|必填	|说明																																																																									|平台差异说明							|
|:-					|:-				|:-		|:-																																																																										|:-												|
|title			|String		|是		|分享标题																																																																							|													|
|path				|String		|是		|页面 path ，必须是以 / 开头的完整路径。																																																							|QQ小程序不支持						|
|imageUrl		|String		|否		|分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4																									|													|
|content		|String		|否		|百度小程序表现为：分享内容；支付宝小程序表现为：吱口令文案																																														|百度小程序、支付宝小程序	|
|desc				|String		|否		|自定义分享描述																																																																				|支付宝小程序、头条小程序	|
|bgImgUrl		|String		|否		|自定义分享二维码的背景图，建议大小750*950（网络图片路径）																																														|支付宝小程序							|
|query			|String		|否		|QQ小程序查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 qq.getLaunchOptionSync() 或 qq.onShow() 获取启动参数中的 query。	|QQ小程序									|
|templateId	|String		|否		|开发者后台设置的分享素材模板 id																																																											|头条小程序								|
|success		|Function	|否		|接口调用成功的回调函数																																																																|支付宝小程序、百度小程序	|
|fail				|Function	|否		|接口调用失败的回调函数																																																																|支付宝小程序、百度小程序	|
|complete		|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）																																																			|百度小程序								|

**示例代码**

```javascript
export default {
  onShareAppMessage(res) {
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '自定义分享标题',
      path: '/pages/test/test?id=123'
    }
  }
}
```

**注意**
* 微信、头条平台：只有定义了此事件处理函数，小程序右上角菜单才会显示“转发”按钮
* QQ小程序还支持通过[qq.offShareAppMessage](https://q.qq.com/wiki/develop/game/API/share/qq.offShareAppMessage.html)取消对系统分享按钮的监听。

### uni.showShareMenu(OBJECT)

小程序的原生菜单中显示分享按钮

**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|头条小程序	|QQ小程序	|
|:-:|:-:|:-:				|:-:					|:-:				|:-:				|:-:			|
|x	|x	|√					|√						|√					|√					|√				|

|属性						|类型			|必填	|说明																																																																		|平台差异说明	|
|:-							|:-				|:-		|:-																																																																			|:-						|
|withShareTicket|Boolean	|否		|是否使用带 shareTicket 的转发，默认为 flase。[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)|微信小程序		|
|title					|String		|否		|分享标题																																																																|百度小程序		|
|content				|String		|否		|分享内容																																																																|百度小程序		|
|imageUrl				|String		|否		|分享图标																																																																|百度小程序		|
|path						|String		|否		|页面 path ，必须是以 / 开头的完整路径。																																																|百度小程序		|
|success				|Function	|否		|接口调用成功的回调函数																																																									|							|
|fail						|Function	|否		|接口调用失败的回调函数																																																									|							|
|complete				|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）																																												|&nbsp;				|

### uni.hideShareMenu(OBJECT)
小程序的原生菜单中隐藏分享按钮

**平台差异说明**

|App|H5	|微信小程序	|支付宝小程序	|百度小程序	|头条小程序	|
|:-:|:-:|:-:				|:-:					|:-:				|:-:				|
|x	|x	|√					|√(1.17.0+)	|x					|√					|

|属性						|类型			|必填	|说明																																																																			|平台差异说明	|
|:-							|:-				|:-		|:-																																																																				|:-						|
|hideShareItems	|Array		|否		|['qq']控制是否隐藏"转发"，['qzone']控制是否隐藏"分享到空间"，不带hideShareItems参数默认"转发"、"分享到空间"全隐藏。目前只支持'qq'、'qzone'。	|QQ小程序			|
|success				|function	|否		|接口调用成功的回调函数																																																										|							|
|fail						|function	|否		|接口调用失败的回调函数																																																										|							|
|complete				|function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）																																													|							|

**代码示例**

```javascript
uni.hideShareMenu()
```

**注意**
* QQ小程序可以单独控制隐藏分享到QQ好友或分享到QQ空间，详见其[API文档](https://q.qq.com/wiki/develop/game/API/share/qq.hideShareMenu.html)
