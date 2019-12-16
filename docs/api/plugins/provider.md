### uni.getProvider(OBJECT)
获取服务供应商。仅App平台支持。

在App平台，可用的服务商，是打包环境中配置的服务商，与手机端是否安装了该服务商的App没有关系。

云打包在manifest中配置相关模块和SDK信息，离线打包在原生工程中配置。某个服务商配置被打包进去，运行时就能得到相应的服务供应商。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-|:-|:-|:-|:-|:-|
|√|x|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|service|String|是|服务类型，可取值见下面说明。|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**service 值说明**

|值|说明|
|:-|:-|
|oauth|授权登录|
|share|分享|
|payment|支付|
|push|推送|


**success 返回参数说明**

|参数名|类型|说明|
|:-|:-|:-|
|service|String|服务类型|
|provider|Array|得到的服务供应商|


**provider 在不同服务类型下可能的取值说明**

|service|provider|说明|备注|
|:-|:-|:-|:-|
|oauth|weixin|微信登录||
||qq|QQ登录||
||sinaweibo|新浪微博登录||
||xiaomi|小米登录||
||apple|[Apple登录](https://ask.dcloud.net.cn/article/36651)|仅iOS13支持，HBuilderX 2.4.7+|
|share|sinaweibo|新浪微博分享||
||qq|分享到QQ好友||
||weixin|分享微信消息、朋友圈及微信小程序||
|payment|alipay|支付宝支付||
||wxpay|微信支付||
||baidu|百度收银台||
||appleiap|苹果应用内支付|iOS 应用打包后可获取|
|push|unipush|[UniPush](https://ask.dcloud.net.cn/article/35622)|推送服务是三选一，只会获取到一个供应商。|
||igexin|个推|填写配置并打包后可以获取，仅为向下兼容而保留，不再推荐使用|
||mipush|小米推送|填写配置并打包后可以获取，仅为向下兼容而保留，不再推荐使用|

**注意事项**

- 自 HBuilderX 1.7.3 起，HBuilder 基座的推送供应商为 UniPush 服务。

**代码**

```javascript
uni.getProvider({
	service: 'oauth',
	success: function (res) {
		console.log(res.provider)
		if (~res.provider.indexOf('qq')) {
			uni.login({
				provider: 'qq',
				success: function (loginRes) {
					console.log(JSON.stringify(loginRes));
				}
			});
		}
	}
});
```
