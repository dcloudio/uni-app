### uni.share(OBJECT)
分享到社交平台（微信、QQ、微博、短信、邮件等）

**平台差异说明**

|平台|说明|
|:-|:-|
|App|使用 ``uni.share`` 进行分享，需要在 `manifest.json` 里配置各平台分享所必需的的字段，如appid、appsecret等|
|小程序|不支持方法调用，只能用户主动点击触发分享，可使用 <button open-type="share"> 和 onShareAppMessage 进行自定义|
|H5|如果是普通浏览器，浏览器自带分享按钮；如果是在微信内嵌浏览器中调用js-sdk，[参考](https://ask.dcloud.net.cn/article/35380)|


**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享服务提供商，通过 [uni.getProvider](/api/plugins/provider) 获取。|
|type|Number|否|分享类型。默认图文 0，更多值参考下面说明。|
|title|String|否|标题|
|scene|String|provider 为 weixin 时必选|场景，可取值参考下面说明。|
|summary|String|type 为 1 时必选|摘要|
|href|String|type 为 0 时必选|跳转链接|
|imageUrl|String|type 为 0、2、5 时必选|图片地址，type为0时，图片大小于 20Kb|
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

* App端可调用手机的系统分享，实现所有注册分享的应用的呼起，比如短信、邮件等，具体参考[plus.share.sendWithSystem的API文档](http://www.html5plus.org/doc/zh_cn/share.html#plus.share.sendWithSystem)
* 插件市场有一个封装好的分享菜单，直接弹出底部图标菜单，并且没有遮挡层级问题，推荐使用，[https://ext.dcloud.net.cn/plugin?id=69](https://ext.dcloud.net.cn/plugin?id=69)
* uni.share API 仅用于 App 平台。小程序平台的分享，请参考 [小程序分享指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)。
* 分享到 QQ 必须含有 href 链接
* 分享文字到 QQ 时，title 必选
* 新浪微博仅支持分享本地音视频
* 仅支持分享微信小程序到微信聊天界面，想进入朋友圈需改为分享图片方式，在图片中包含小程序码
* 在 iOS 端，若未安装微博客户端，会启用微博的网页分享，此时不能分享图片
* 分享新浪微博不会返回正确的成功回调
* 不能直接分享到QQ空间，可以分享到QQ，然后在QQ的界面里选择QQ空间。
* 分享微信朋友圈多图，微信官方已经禁掉这个功能。可以考虑把多张图用canvas合并成一张图分享出去。

#### 分享到微信聊天界面

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


#### 分享到微信朋友圈

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


### onShareAppMessage(OBJECT)

小程序中用户点击分享后，在 js 中定义 onShareAppMessage 处理函数（和 onLoad 等生命周期函数同级），设置该页面的分享信息。

* 用户点击分享按钮的时候会调用。这个分享按钮可能是小程序原生菜单自带的分享按钮，也可能是开发者在页面中放置的分享按钮（<button open-type="share">）；
* 此事件需要 return 一个Object，用于自定义分享内容。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|


|参数|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|from|String|分享事件来源：button（页面内分享按钮）、menu（右上角分享按钮）||
|target|Object|如果 from 值是 button，则 target 是触发这次分享事件的 button，否则为 undefined||
|webViewUrl|String|页面中包含 ``<web-view>`` 组件时，返回当前 ``<web-view>`` 的url|微信小程序、支付宝小程序|

此事件需要 return 一个 Object，用于自定义分享内容，其内容如下：

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|title|String|是|分享标题||
|path|String|是|页面 path ，必须是以 / 开头的完整路径。||
|imageUrl|String|否|分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径||
|content|String|否|百度小程序表现为：分享内容；支付宝小程序表现为：吱口令文案|百度小程序、支付宝小程序|
|desc|String|否|自定义分享描述|支付宝小程序|
|bgImgUrl|String|否|自定义分享二维码的背景图，建议大小750*950（网络图片路径）|支付宝小程序|
|success|Function|否|接口调用成功的回调函数|支付宝小程序、百度小程序|
|fail|Function|否|接口调用失败的回调函数|支付宝小程序、百度小程序|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|百度小程序|

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

### uni.showShareMenu(OBJECT)
小程序的原生菜单中显示分享按钮

> 1.6.0 新增

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|

|属性|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|withShareTicket|Boolean|否|是否使用带 shareTicket 的转发，默认为 flase。[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)|微信小程序|
|title|String|否|分享标题|百度小程序|
|content|String|否|分享内容|百度小程序|
|imageUrl|String|否|分享图标|百度小程序|
|path|String|否|页面 path ，必须是以 / 开头的完整路径。|百度小程序|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

### uni.hideShareMenu(OBJECT)
小程序的原生菜单中隐藏分享按钮

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|x|√|

|属性|类型|必填|说明|
|:-|:-|:-|:-|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**代码示例**

```javascript
uni.hideShareMenu()
```


### App 端各平台分享配置说明

- 第一步，打开 manifest.json -> App模块权限配置，勾选 Share(分享)；
- 第二步，按如下文档具体配置微信、微博、QQ的参数。

#### 微信分享

在 manifest.json 的 App SDK 配置里，勾选微信消息及朋友圈，并填写相关 appkey，微信 appkey 申请步骤可参考：[https://ask.dcloud.net.cn/article/208](https://ask.dcloud.net.cn/article/208)。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni2019022501.png)

#### 新浪微博分享
在 manifest.json 的 App SDK 配置里，勾选勾选新浪微博，并填写相关appkey，新浪微博 appkey 申请步骤可参考：[https://ask.dcloud.net.cn/article/209](https://ask.dcloud.net.cn/article/209)。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni2019022502.png)

#### QQ 分享
在 manifest.json 的 App SDK 配置里，勾选分享到QQ好友，并填写相关appkey，QQ分享 appkey 申请步骤：

1. 前往 QQ 开放平台：[https://connect.qq.com/index.html](https://connect.qq.com/index.html)；
2. 完成开发者注册；
3. 创建应用，选择移动 App，填写相关信息，然后等待审核，审核通过后即可得到AppId。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni2019022503.png)

这些配置需要打包生效，真机运行仍然是HBuilder基座的设置，可使用[自定义基座包](http://ask.dcloud.net.cn/article/12723)。离线打包请参考离线打包文档在原生工程中配置。

配置并打包后，通过`uni.getProvider`可以得到配置的结果列表，注意这里返回的是manifest配置的，与手机端是否安装微信、QQ、微博无关。

如果手机端未安装QQ、微博，调用时会启动这些平台的wap页面分享，如果已安装相应客户端，会启动它们的客户端分享。


##### FAQ
- Q：App端如何集成其他登陆SDK
- A：使用原生插件方式，可以集成三方sdk，原生插件开发文档见[https://ask.dcloud.net.cn/article/35428](https://ask.dcloud.net.cn/article/35428)。开发之前可以先去[插件市场](https://ext.dcloud.net.cn/)看下有没有做好的。
