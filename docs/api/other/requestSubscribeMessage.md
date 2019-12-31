### uni.requestSubscribeMessage(Object object)

 
**平台差异说明**

|App|H5	|微信小程序				|支付宝小程序	|百度小程序	|头条小程序	|QQ小程序	|
|:-:	|:-:|:-:							|:-:					|:-:				|:-:				|:-:			|
|x		|x	|基础库版本>=2.8.2|x						|x					|x					|x				|

**object参数说明**

|属性			|类型			|默认值	|必填	|说明																																																																																																																																																|
|:-:			|:-:			|:-:		|:-:	|:-:																																																																																																																																																|
|tmplIds	|Array		|				|是		|需要订阅的消息模板的id的集合，一次调用最多可订阅3条消息（注意：iOS客户端7.0.6版本、Android客户端7.0.7版本之后的一次性订阅/长期订阅才支持多个模板消息，iOS客户端7.0.5版本、Android客户端7.0.6版本之前的一次订阅只支持一个模板消息）消息模板id在[微信公众平台(mp.weixin.qq.com)-功能-订阅消息]中配置	|
|success	|function	|				|否		|接口调用成功的回调函数																																																																																																																																							|
|fail			|function	|				|否		|接口调用失败的回调函数																																																																																																																																							|
|complete	|function	|				|否		|接口调用结束的回调函数（调用成功、失败都会执行）																																																																																																																										|


**注意**

- 用户发生点击行为或者发起支付回调后，才可以调起订阅消息界面

**平台说明**

- [微信小程序订阅消息参考文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)


**object.success 返回值**

|属性				|类型		|说明																																																																																																																																																																														|
|:-:				|:-:		|:-:																																																																																																																																																																														|
|errMsg			|String	|接口调用成功时errMsg值为'requestSubscribeMessage:ok'																																																																																																																																																						|
|TEMPLATE_ID|String| [TEMPLATE_ID]是动态的键，即模板id，值包括'accept'、'reject'、'ban'。'accept'表示用户同意订阅该条id对应的模板消息，'reject'表示用户拒绝订阅该条id对应的模板消息，'ban'表示已被后台封禁。例如 { errMsg: "requestSubscribeMessage:ok", zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: "accept"} 表示用户同意订阅zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE这条消息|

**object.fail 返回值**

|属性		|类型		|说明									|
|:-:		|:-:		|:-:									|
|errMsg	|String	|接口调用失败错误信息	|
|errCode|Number	|接口调用失败错误码		|

**示例代码**
```
uni.requestSubscribeMessage({
  tmplIds: [''],
  success (res) { }
})
```