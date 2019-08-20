#### button

按钮。

**属性说明**

|属性名|类型|默认值|说明|生效时机|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|size|String|default|按钮的大小|||
|type|String|default|按钮的样式类型|||
|plain|Boolean|false|按钮是否镂空，背景色透明|||
|disabled|Boolean|false|是否禁用|||
|loading|Boolean|false|名称前是否带 loading 图标||app-nvue 平台，在 ios 上为雪花，Android上为圆圈|
|form-type|String||用于 ``<form>`` 组件，点击分别会触发 ``<form>`` 组件的 submit/reset 事件|||
|open-type|String||开放能力|||
|hover-class|String|button-hover|指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果|||
|hover-start-time|Number|20|按住后多久出现点击态，单位毫秒|||
|hover-stay-time|Number|70|手指松开后点击态保留时间，单位毫秒|||
|@getuserinfo|Handler||用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo|open-type="getUserInfo"|微信小程序|

- **注1：``button-hover`` 默认为 ``{background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}``**
 
**size 有效值**

|值|说明|
|:-|:-|
|default|默认大小|
|mini|小尺寸|

**type 有效值**

|值|说明|
|:-|:-|
|primary|微信小程序为绿色，5+App、百度小程序、支付宝小程序为蓝色，头条小程序为红色|
|default|白色|
|warn|红色|

**form-type 有效值**

|值|说明|
|:-|:-|
|submit|提交表单|
|reset|重置表单|

**open-type 有效值**

|值|说明|平台差异说明|
|:-|:-|:-|
|feedback|打开“意见反馈”页面，用户可提交反馈内容并上传日志|5+App、微信小程序|
|share|触发用户转发|微信小程序、百度小程序、支付宝小程序、头条小程序|
|getUserInfo|获取用户信息，可以从@getuserinfo回调中获取到用户信息，包括手机号、头像、昵称等信息|微信小程序、百度小程序|
| contact | 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息 |微信小程序|
| getPhoneNumber | 获取用户手机号，可以从@getphonenumber回调中获取到用户信息|微信小程序、百度小程序、头条小程序 |
| launchApp | 打开APP，可以通过app-parameter属性设定向APP传的参数|微信小程序|
| openSetting | 打开授权设置页 |微信小程序、百度小程序|
| getAuthorize | 支持小程序授权 | 支付宝小程序 |
| contactShare | 分享到通讯录好友 | 支付宝小程序 |
| lifestyle | 关注生活号 | 支付宝小程序 |



**注意** 
- 在小程序中，开发者可以登录 [小程序管理后台](https://mp.weixin.qq.com/) 后进入左侧菜单“客服反馈”页面获取反馈内容。
- 在 App 中，开发者登录 [DCloud开发者中心](https://dev.dcloud.net.cn/) 后点击应用名称，进入左侧菜单“用户反馈”页面获取反馈内容。
- 点击 share 分享按钮时会触发 [onShareAppMessage](/api/plugins/share)
- 支付宝小程序平台，获取用户手机号时，建议先通过条件编译的方式，调用支付宝原生API，[参考](https://docs.alipay.com/mini/api/getphonenumber)


**示例**

```html
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<button type="primary">页面主操作 Normal</button>
			<button type="primary" loading="true">页面主操作 Loading</button>
			<button type="primary" disabled="true">页面主操作 Disabled</button>
			<button type="default">页面次要操作 Normal</button>
			<button type="default" disabled="true">页面次要操作 Disabled</button>
			<button type="warn">警告类操作 Normal</button>
			<button type="warn" disabled="true">警告类操作 Disabled</button>
			<view class="button-sp-area">
				<button type="primary" plain="true">按钮</button>
				<button type="primary" disabled="true" plain="true">不可点击的按钮</button>
				<button type="default" plain="true">按钮</button>
				<button type="default" disabled="true" plain="true">按钮</button>
				<button class="mini-btn" type="primary" size="mini">按钮</button>
				<button class="mini-btn" type="default" size="mini">按钮</button>
				<button class="mini-btn" type="warn" size="mini">按钮</button>
			</view>
		</view>
	</view>
</template>
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/button.png?t=201857)
