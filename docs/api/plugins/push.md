`push` 是指从服务器主动给手机端发送消息。App平台和小程序平台机制不太一样，小程序平台的概念叫模板消息。

### App平台

`uni-app` 提供了 uni push 服务，这是一个包括客户端和服务器的统一服务，整合了苹果APNs、华为、小米、OPPO、VIVO、魅族等多家厂商的推送和个推的独立推送，不管客户端还是服务器，一套代码多端推送。

开发者可以在uniPush中只接入个推，不配置其他厂商服务，但这将导致Android上App离线后无法推送消息。因为现在的国产rom节电管理策略严格，不使用rom厂商的push基本难以离线送达消息。
若想提供消息推送成功率，只有使用uniPush，并向各rom厂商申请开通推送服务（免费）。

因本文档内容有限，另行开贴，介绍业务、开通流程，请务必仔细阅读 [https://ask.dcloud.net.cn/article/35622](https://ask.dcloud.net.cn/article/35622)。

- 客户端调用的js API见：[https://www.html5plus.org/doc/zh_cn/push.html](https://www.html5plus.org/doc/zh_cn/push.html)
- 服务器调用接口发送push消息：文档仍然是个推的服务器文档[http://docs.getui.com/](http://docs.getui.com/)。如果在uniCloud中使用push，还可以使用三方封装好的插件，更简单：[https://ext.dcloud.net.cn/plugin?id=1680](https://ext.dcloud.net.cn/plugin?id=1680)
- web自助发送界面：在DCloud的开发者后台：[https://dev.dcloud.net.cn/](https://dev.dcloud.net.cn/)

**其他相关资源**
- 检查应用是否被授予推送权限：[https://ext.dcloud.net.cn/plugin?id=594](https://ext.dcloud.net.cn/plugin?id=594)
- 开启关闭推送服务：[https://ext.dcloud.net.cn/plugin?id=727](https://ext.dcloud.net.cn/plugin?id=727)
- 自定义iOS推送铃声：[https://ext.dcloud.net.cn/plugin?id=690](https://ext.dcloud.net.cn/plugin?id=690)
- 如何自定义推送通知的图标：[https://ask.dcloud.net.cn/article/35537](https://ask.dcloud.net.cn/article/35537)

插件市场也提供了其他三方推送方案，但注意unipush是推送成功率更高的解决方案，并且免费使用。不推荐开发者使用其他推送服务。

但我们发现很多开发者有误解，导致还在错误使用其他推送。
- 常见误解1：“uniPush的专业性，和专业的个推、极光等服务可相比吗？”
答：uniPush是由个推将其本来收费的vip push产品，免费提供给了DCloud的开发者。它与个推vip push的只有2个区别：1、免费；2、账户使用的是DCloud开发者账户，而无需再重新注册个推账户。个推是A股上市公司，专业性在推送领域领先。
- 常见误解2：“uniPush好麻烦，我就喜欢个推、极光这种简单sdk，不想去各个rom厂商去申请一圈”
答：uniPush不建立在申请手机厂商授权的基础上，如果你不申请那些，使用起来和用普通的个推是一样的。但是要特别注意，推送行业的现状就是：**不集成rom厂商的推送，就无法在App离线时发送push。**。按照普通个推模式使用，后果就是在华为、小米、OPPO、VIVO、魅族上发不了离线消息。
- 常见误解3：“uniPush的送达率还是不够，是否可以付费来提升送达率，个推是有付费提升送达率的方法的”
答：前文已经说了。个推的付费提升送达率的产品就是vip push，而uniPush就是个推的vip Push。DCloud通过谈判免费给DCloud的开发者使用了。
- 常见误解4：开通uniPush要实名认证，还得传身份证，开通普通个推不用这么麻烦。
答：此问题之前曾存在，后来已经处理，保持和个推需要的身份信息相同，不再需要身份证。

### 小程序平台

小程序平台的类似概念叫做`模板消息`。

以微信为例，开发者的服务器发送消息给微信的服务器，微信服务器会发送一条模板消息，折叠到微信的消息列表中的服务通知里。它属于后台开发，和手机端无关。

微信模板消息文档：[https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)

支付宝模板消息文档：[https://docs.alipay.com/mini/introduce/message](https://docs.alipay.com/mini/introduce/message)

百度模板消息文档：[https://smartprogram.baidu.com/docs/develop/third/api/](https://smartprogram.baidu.com/docs/develop/third/api/)

<!--
**注意：以下API暂停维护，仅为向下兼容而保留。App端 uni push 的API请使用 [https://www.html5plus.org/doc/zh_cn/push.html](https://www.html5plus.org/doc/zh_cn/push.html)**

### uni.subscribePush(OBJECT)

开启推送

平台差异说明：
- App

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享推送提供商，通过 [uni.getProvider](/api/plugins/provider) 获取|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|


**示例**
```javascript
uni.getProvider({
	service: 'push',
	success: function (res) {
		console.log(res.provider)

		// 个推的名称为 igexin
		if (~res.provider.indexOf('igexin')) {
			uni.subscribePush({
				provider: 'igexin',
				success: function (res) {
					console.log('success:' + JSON.stringify(res));
				}
			});
		}
	}
});
```

### uni.unsubscribePush(OBJECT)

关闭推送。

**平台差异说明**

- App

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享推送提供商，通过 uni.getProvider 获取|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.unsubscribePush({
	provider: 'igexin',
	success: function (res) {
		console.log('success:' + JSON.stringify(res));
	}
});
```

### uni.onPush(OBJECT)

监听透传数据。

**平台差异说明**

- App

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享推送提供商，通过 uni.getProvider 获取|
|callback|Function|否|接收到透传数据回调，回调参数（Object）：messageId（消息id）、data（消息内容）|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.onPush({
	provider: 'igexin',
	success: function () {
		console.log('监听透传成功');
	},
	callback: function (data) {
		console.log("接收到透传数据：" + JSON.stringify(data));
	}
});
```

### uni.offPush(OBJECT)

移除监听透传数据。

**平台差异说明**

- App

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|provider|String|是|分享推送提供商，通过uni.getProvider获取|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|


**示例**
```javascript
uni.offPush({
	provider: 'igexin',
	success: function () {
		console.log('取消监听透传成功');
	},
	fail: function () {
		console.log('fail');
	}
});
```
-->

##### FAQ

Q：为什么真机测试推送可以用，打包后就失败呢？
A：HBuilder 真机运行环境下，第三方支付 SDK 的配置信息是 HBuilder 这个应用。这个配置信息是不能动态修改的，因此涉及到第三方 SDK 的配置，需要打包自定义基座进行测试。[真机运行自定义基座包使用说明](http://ask.dcloud.net.cn/article/12723)

Q：用到了推送功能，在打包原生应用时，需要注意什么呢？
A：如果是云打包，首先勾选权限配置，manifest.json->App 模块权限配置->Push。然后，manifest.json->App SDK 配置->推送，按照提示申请相应平台的信息，并填写。最后，勾选并填写完成后再进行打包即可。如果是离线打包，自行在原生工程中配置SDK，并确保选择了推送模块。
