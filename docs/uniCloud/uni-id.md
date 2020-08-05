# 简介

99%的应用，都要开发用户注册、登录、密码md5加密保存、修改密码、token管理等功能，从前端到后端都需要。

为什么不能有一个开源的通用项目，避免大家的重复开发呢？

`uni-id`应需而生。

`uni-id`为`uniCloud`开发者提供了统一、简单、可扩展的用户管理能力封装。推荐每个`uniCloud`开发者使用。

`uni-id`可成为开发者应用的用户中心，在插件市场获取更多基于`uni-id`的业务模板，集成到你的应用中。

# uni-id组成部分

`uni-id`包括如下组成部分：

1. 云数据库

  主表为 `uni-id-users` 表，保存用户的基本信息。

  扩展字段有很多，如实名认证数据、工作履历数据，开发者可以自由扩展。

2. 云函数

  提供一个名为`uni-id`的公共模块，该模块封装了一系列API，包括注册、登录、修改密码、设置头像等。

  [插件市场](https://ext.dcloud.net.cn/plugin?id=2116)的示例工程中还提供了一个`user-center`的云函数，演示在云函数中如何调用`uni-id`公共模块。

3. 前端调用

  前端示例通过callfunction调用云函数`user-center`，在注册和登录时保存token。

  uniCloud框架底层，会自动在callfunction时传递`uni-id`的token（uni-app 2.7.13+版本）。在云函数的event中可直接拿到`uni-id`的token。也就是说开发者无需自己管理token了。

对于`uni-id`还未封装的能力，欢迎大家在开源项目上提交 pr，共同完善这个开源项目，[uni-id git仓库](https://gitee.com/dcloud/uni-id.git)。

# 快速上手

使用uni-id需要按照以下步骤操作

1. 准备2.7.14或以上版本的HBuilderX
2. 插件市场导入`uni-id`公用模块，[插件市场 uni-id](https://ext.dcloud.net.cn/plugin?id=2116)
3. 修改公用模块`uni-id`下的`config.json`内所需参数（请参考下面config.json的说明）
4. 上传`cloudfunctions/common`下的`uni-id`模块
5. 按照[公用模块使用说明](https://uniapp.dcloud.io/uniCloud/cf-common)在云函数下安装`uni-id`模块
6. 创建`uni-id-users`、`uni-verify`集合（可以直接使用示例项目里面的db_init.json进行初始化）

或者直接导入[uni-id在插件市场的示例工程](https://ext.dcloud.net.cn/plugin?id=2116)

**config.json的说明**

注意：

- **config.json是一个标准json文件，不支持注释**
- 如果不希望使用config.json初始化而是想自行传入参数，可以使用`init`方法[uniID.init](/uniCloud/uni-id?id=init)

配置项：

+ `passwordSecret`为用于加密密码入库的密钥
+ `tokenSecret`为生成token需要的密钥
+ `tokenExpiresIn`token有效期，以秒为单位
+ `passwordErrorLimit`密码错误重试次数，分ip记录密码错误次数，达到重试次数之后等待`passwordErrorRetryTime`时间之后才可以重试
+ `passwordErrorRetryTime`单位为秒
+ 如果使用`sendSmsCode`接口发送短信需要前往[https://dev.dcloud.net.cn/uniSms](https://dev.dcloud.net.cn/uniSms)充值短信额度，配置`config.json`的`service`字段，字段说明见下方示例
+ 如果使用其他方式发送短信可以参考`sendSmsCode`接口的实现[uni-id sendSmsCode](https://gitee.com/dcloud/uni-id/blob/master/src/lib/send-sms-code.js)
+ 另外可以按照客户端平台进行不同的配置，参考下面示例

```json
// 如果拷贝此内容切记去除注释
{
	"passwordSecret": "passwordSecret-demo", // 加密密码所用的密钥，注意修改为自己的
	"tokenSecret": "tokenSecret-demo", // 生成token所用的密钥，注意修改为自己的
	"tokenExpiresIn": 7200, // 全平台token过期时间，未指定过期时间的平台会使用此值
	"bindTokenToDevice": true, // 是否将token和设备绑定，设置为true会进行ua校验，默认为true
	"passwordErrorLimit": 6, // 密码错误最大重试次数
	"passwordErrorRetryTime": 3600, // 密码错误重试次数超限之后的冻结时间
	"app-plus": {
		"tokenExpiresIn": 2592000,
		"oauth": {
			// App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
			"weixin": {
				"appid": "weixin appid",
				"appsecret": "weixin appsecret"
			}
		}
	},
	"mp-weixin": {
		"oauth": {
			// 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
			"weixin": {
				"appid": "weixin appid",
				"appsecret": "weixin appsecret"
			}
		}
	},
	"mp-alipay": {
		"oauth": {
			// 支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr
			"alipay": {
				"appid": "alipay appid",
				"privateKey": "alipay privateKey"
			}
		}
	},
	"service": {
		"sms": {
			"name": "your app name", // 应用名称，对应短信模版的name
			"codeExpiresIn": 180, // 验证码过期时间，单位为秒，注意一定要是60的整数倍
			"smsKey": "your sms key", // 短信密钥key，开通短信服务处可以看到
			"smsSecret": "your sms secret" // 短信密钥secret，开通短信服务处可以看到
		}
	}
}
```

# API列表

## 用户注册 @register

用法`uniID.register(Object user)`

**注意**

- 注册成功之后会返回token，在获取token之后应进行持久化存储，键值为：uniIdToken，`uni.setStorageSync('uniIdToken',res.result.token)`

**user参数说明**

| 字段		| 类型	| 必填	| 说明			|
| ---		| ---	| ---	| ---			|
| username	| String| 是	|用户名，唯一	|
| password	| String| 是	|密码			|

username可以是字符串、可以是email、可以是手机号，本插件不约束，开发者可以自己定。

比如要求username为手机号，则自行在前端界面上做好提示，在后台对格式进行校验。

password入库时会自动进行一次sha1加密，不明文存储密码。

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|
| token	| String| -	|注册完成自动登录之后返回的token信息|
| tokenExpired	| String| -	|token过期时间|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		username,
		password
	} = event
	// username、password验证是否合法的逻辑
	const res = await uniID.register({
		username,
		password
	})
	return res
}
```

```js
// 客户端代码
uniCloud.callFunction({
	name: 'register',
	data: {
		username: 'username',
		password: 'user password'
	},
	success(res){
		if(res.result.code === 0) {
      // 目前版本是驼峰形式uniIdToken，后面会调整为蛇形uni_id_token（调整后会在一段时间内兼容驼峰）
			uni.setStorageSync('uniIdToken',res.result.token)
			// 其他业务代码，如跳转到首页等
			uni.showToast({
				title: '注册成功',
				icon: 'none'
			})
		} else {
			uni.showModal({
				content: res.result.msg,
				showCancel: false
			})
		}
	},
	fail(){
		uni.showModal({
			content: '注册失败，请稍后再试',
			showCancel: false
		})
	}
})
```


## 用户登录 @login

用法：`uniID.login(Object user)`

**注意**

- 登录成功之后会返回token，在获取token之后应进行持久化存储，键值为：uniIdToken，`uni.setStorageSync('uniIdToken',res.result.token)`

**user参数说明**

| 字段		| 类型	| 必填	| 说明	|
| ---		| ---	| ---	| ---	|
| username	| String| 是	|用户名	|
| password	| String| 是	|密码	|
| queryField	| Array| 否	|指定从哪些字段中比对username，不填默认与数据库内的username字段对比, 可取值'username'、'email'、'mobile'|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|
| token	| String| -	|登录成功之后返回的token信息|
| tokenExpired	| String| -	|token过期时间|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		username,
		password
	} = event
	// username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password,
    queryField: ['username', 'email', 'mobile']
	})
	return res
}
```

## token校验

用法：`uniID.checkToken(String token)`

**参数说明**

| 字段	| 类型	| 必填| 说明												|
| ---		| ---		| ---	| ---													|
| token	| String| 是	|客户端callFunction带上的token|

**响应参数**

| 字段		| 类型	| 说明															|
| ---			| ---		| ---																|
| code		| Number|错误码，0表示成功									|
| msg			| String|详细信息														|
| uid			| String|用户Id，校验成功之后会返回					|
| userInfo| Object|用户信息，uid对应的uni-id-users全部字段|

**注意：**

- 2.7.14+ 客户端会自动查找storage内的token在callFunction时插入
- 2.7.14 版本token存储在storage内使用的是驼峰形式的键值`uniIdToken`，下版会调整为蛇形`uni_id_token`，调整后会在一段时间内兼容驼峰形式

**示例代码**

```js
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const payload = await uniID.checkToken(event.uniIdToken)
	return payload
}
```

## 修改密码 @update-password

用法：`uniID.updatePwd(Object passwordInfo)`

**passwordInfo参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| uid									| String| 是	|用户Id，可以通过checkToken返回	|
| oldPassword					| String| 是	|旧密码													|
| newPassword					| String| 是	|新密码													|
| passwordConfirmation| String| 是	|确认新密码											|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数update-pwd代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		oldPassword,
		newPassword,
		passwordConfirmation
	} = event
	// 校验新密码与确认新密码是否一致
  
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
  
	const res = await uniID.updatePwd({
    uid: payload.uid,
		oldPassword,
		newPassword,
		passwordConfirmation
	})
	return res
}
```

## 重置密码 @reset-password

用法：`uniID.resetPwd(Object passwordInfo)`

**passwordInfo参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| uid									| String| 是	|用户Id，可以通过checkToken返回	|
| password					| String| 是	|重置后的密码													|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
  
	const res = await uniID.resetPwd({
    uid: payload.uid,
		password: '12345678'
	})
	return res
}
```

## 加密密码 @encrypt-password

用法：`uniID.encryptPwd(String password)`

**passwordInfo参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| password					| String| 是	|要加密的字符串													|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| password	| String| 是	|加密后的字符串		|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const encResult = await uniID.encryptPwd('123456')
	return {
    encResult
  }
}
```

## 设置头像

用法：`uniID.setAvatar(Object avatarInfo)`

**avatarInfo**参数说明

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|
| avatar| String| 是	|用户头像URL										|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数set-avatar代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		avatar
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.setAvatar({
    uid: payload.uid,
		avatar
	})
	return res
}

```

## 发送短信验证码

用法：`uniID.sendSmsCode(Object codeInfo)`

**codeInfo**参数说明

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| mobile| String| 是	|用户手机号											|
| code		| String| 是	|验证码字符串	|
| type		| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`bind`绑定手机、`unbind`解绑手机	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile
	} = event
  // 生成验证码可以按自己的需求来，这里以生成6位数字为例
  const randomStr = '00000' + Math.floor(Math.random() * 1000000)
  const code = randomStr.substring(randomStr.length - 6)
	const res = await uniID.sendSmsCode({
		mobile,
    code,
    type: 'login'
	})
	return res
}

```

## 设置验证码

如果你不想使用`uni-id`的sendSmsCode发送短信的话，可以使用此接口自行在库中创建验证码

用法：`uniID.setVerifyCode(Object codeInfo)`

**codeInfo**参数说明

| 字段			| 类型	| 必填| 说明																																													|
| ---				| ---		| ---	| ---																																														|
| mobile		| String| 是	|用户手机号，和邮箱二选一																																										|
| email		| String| 是	|用户邮箱，和手机号二选一																																										|
| code			| String| 是	|验证码字符串																																										|
| expiresIn	| Number| 是	|验证码过期时间，单位秒																																					|
| type			| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`bind`绑定手机、`unbind`解绑手机|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile
	} = event
  // 生成验证码可以按自己的需求来，这里以生成6位数字为例
  const randomStr = '00000' + Math.floor(Math.random() * 1000000)
  const code = randomStr.substring(randomStr.length - 6)
	const res = await uniID.setVerifyCode({
		mobile,
    code,
    expiresIn: 180,
    type: 'login'
	})
	return res
}

```

## 校验验证码

uni-id内置方法`loginBySms`、`bindMobile`、`unbindMobile`均已内置校验验证码方法，如果使用以上方法不需要再调用此接口，如需扩展类型请确保type和发送验证码/设置验证码时对应

用法：`uniID.verifyCode(Object codeInfo)`

**codeInfo**参数说明

| 字段	| 类型	| 必填| 说明																																													|
| ---		| ---		| ---	| ---																																														|
| mobile| String| 是	|用户手机号，和邮箱二选一																																				|
| email	| String| 是	|用户邮箱，和手机号二选一																																				|
| code	| String| 是	|验证码字符串																																										|
| type	| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`bind`绑定手机、`unbind`解绑手机|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile,
    code
	} = event
	const res = await uniID.verifyCode({
		mobile,
    code,
    type: 'login'
	})
	return res
}

```

## 手机号验证码直接登录

用法：`uniID.loginBySms(Object mobileInfo)`

**mobileInfo**参数说明

| 字段	| 类型	| 必填| 说明			|
| ---		| ---		| ---	| ---				|
| mobile| String| 是	|用户手机号	|
| code	| String| 是	|验证码			|

**响应参数**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| code				| Number| 是	|错误码，0表示成功					|
| msg					| String| 是	|详细信息										|
| token				| String| -		|登录成功之后返回的token信息|
| tokenExpired| String| -		|token过期时间							|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile,
    code
	} = event
	const res = await uniID.loginBySms({
		mobile,
    code
	})
	return res
}

```

## 绑定手机号

用法：`uniID.bindMobile(Object mobileInfo)`

**mobileInfo**参数说明

| 字段	| 类型	| 必填| 说明																																			|
| ---		| ---		| ---	| ---																																				|
| uid		| String| 是	|用户Id，可以通过checkToken返回																							|
| mobile| String| 是	|用户手机号																																	|
| code	| String| 否	|验证码，为兼容旧版逻辑此参数不填写时不会进行验证码校验，而是直接绑定手机号	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile,
    code
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.bindMobile({
    uid: payload.uid,
		mobile,
    code
	})
	return res
}

```

## 解绑手机

用法：`uniID.unbindMobile(Object mobileInfo)`

**mobileInfo**参数说明

| 字段	| 类型	| 必填| 说明																																			|
| ---		| ---		| ---	| ---																																				|
| uid		| String| 是	|用户Id，可以通过checkToken返回																							|
| mobile| String| 是	|用户手机号																																	|
| code	| String| 否	|验证码，此参数不填写时不会进行验证码校验，而是直接绑定手机号	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		mobile,
    code
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.unbindMobile({
    uid: payload.uid,
		mobile,
    code
	})
	return res
}

```

## 邮箱验证码直接登录

用法：`uniID.loginByEmail(Object emailInfo)`

**mobileInfo**参数说明

| 字段	| 类型	| 必填| 说明		|
| ---		| ---		| ---	| ---			|
| email	| String| 是	|用户邮箱	|
| code	| String| 是	|验证码		|

**响应参数**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| code				| Number| 是	|错误码，0表示成功					|
| msg					| String| 是	|详细信息										|
| token				| String| -		|登录成功之后返回的token信息|
| tokenExpired| String| -		|token过期时间							|

**示例代码**

```js
// 云函数bind-mobile代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		email,
    code
	} = event
	const res = await uniID.loginByEmail({
		email,
    code
	})
	return res
}

```

## 绑定邮箱

用法：`uniID.bindEmail(Object emailInfo)`

**emailInfo**参数说明

| 字段	| 类型	| 必填| 说明																									|
| ---		| ---		| ---	| ---																										|
| uid		| String| 是	|用户Id，可以通过checkToken返回													|
| email	| String| 是	|用户邮箱																								|
| code	| String| 否	|用户邮箱验证码，不填此字段或留空时直接绑定不校验验证码	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-email代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		email,
    code
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.bindEmail({
    uid: payload.uid,
		email,
    code
	})
	return res
}


```

## 解绑邮箱

用法：`uniID.unbindEmail(Object emailInfo)`

**emailInfo**参数说明

| 字段	| 类型	| 必填| 说明																									|
| ---		| ---		| ---	| ---																										|
| uid		| String| 是	|用户Id，可以通过checkToken返回													|
| email	| String| 是	|用户邮箱																								|
| code	| String| 否	|用户邮箱验证码，不填此字段或留空时直接绑定不校验验证码	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数bind-email代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		email,
    code
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.unbindEmail({
    uid: payload.uid,
		email,
    code
	})
	return res
}
```

## 登出

用法：`uniID.logout(String token);`

**注意**

- 登出成功之后应删除持久化存储的token，键值为：uniIdToken，`uni.removeStorageSync('uniIdToken')`

**参数说明**

| 字段| 类型	| 必填| 说明	|
| ---	| ---		| ---	| ---		|
| token	| String| 是	|用户token|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数logout代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.logout(uniIdToken)
	return res
}

```

## 微信登录

用法：`uniID.loginByWeixin(String code);`

**注意**

- 需要在config.json内使用微信登录的平台下配置appid和appsecret
- uniId会自动判断客户端平台
- 登录成功之后应持久化存储token，键值为：uniIdToken，`uni.removeStorageSync('uniIdToken')`
- App端获取code不可直接调用`uni.login`，详细用法可以看下面示例

**参数说明**

| 字段| 类型	| 必填| 说明							|
| ---	| ---		| ---	| ---								|
| code| String| 是	|微信登录返回的code	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|
| token	| String| -	|登录成功之后返回的token信息|
| tokenExpired	| String| -	|token过期时间|

**示例代码**

```js
// 云函数login-by-weixin代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.loginByWeixin(event.code)
	return res
}

// 客户端代码
// 代码较长建议直接参考插件市场示例项目：https://ext.dcloud.net.cn/plugin?id=2116
let weixinAuthService
export default {
  data() {
    return {
      hasWeixinAuth: false
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.oauth.getServices((services) => {
      weixinAuthService = services.find((service) => {
        return service.id === 'weixin'
      })
      if (weixinAuthService) {
        this.hasWeixinAuth = true
      }
    });
    // #endif
  },
  methods: {
    getWeixinCode() {
      return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.login({
          provider: 'weixin',
          success(res) {
            resolve(res.code)
          },
          fail(err) {
            reject(new Error('微信登录失败'))
          }
        })
        // #endif
        // #ifdef APP-PLUS
        weixinAuthService.authorize(function(res) {
          resolve(res.code)
        }, function(err) {
          console.log(err)
          reject(new Error('微信登录失败'))
        });
        // #endif
      })
    },
    loginByWeixin() {
      this.getWeixinCode().then((code) => {
        return uniCloud.callFunction({
          name: 'login-by-weixin',
          data: {
            code
          }
        })
      }).then((res) => {
        uni.showModal({
          showCancel: false,
          content: JSON.stringify(e.result)
        })
        if (res.result.code === 0) {
          uni.setStorageSync('uniIdToken', e.result.token)
        }
      }).catch(() => {
        uni.showModal({
          showCancel: false,
          content: '微信登录失败，请稍后再试'
        })
      })
    }
  }
}

```

## 绑定微信

用法：`uniID.bindWeixin(Object weixinInfo);`

**weixinInfo 参数说明**

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|
| code| String| 是	|微信登录返回的code							|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.bindWeixin({
    uid: payload.uid,
    code: event.code
  })
	return res
}
```

## 解绑微信

用法：`uniID.unbindWeixin(String uid);`

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.unbindWeixin(payload.uid)
	return res
}
```

## 支付宝登录

用法：`uniID.loginByAlipay(String code);`

**注意**

- 需要在config.json内支付宝平台下配置appid和privateKey（应用私钥）
- 登录成功之后应持久化存储token，键值为：uniIdToken，`uni.removeStorageSync('uniIdToken')`

**参数说明**

| 字段| 类型	| 必填| 说明							|
| ---	| ---		| ---	| ---								|
| code| String| 是	|支付宝登录返回的code	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|
| token	| String| -	|登录成功之后返回的token信息|
| tokenExpired	| String| -	|token过期时间|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.loginByAlipay(event.code)
	return res
}
```

## 绑定支付宝

用法：`uniID.bindAlipay(Object alipayInfo);`

**alipayInfo 参数说明**

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|
| code| String| 是	|支付宝登录返回的code							|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.bindAlipay({
    uid: payload.uid,
    code: event.code
  })
	return res
}
```

## 解绑支付宝

用法：`uniID.unbindAlipay(String uid);`

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.unbindAlipay(payload.uid)
	return res
}
```

## 更新用户信息

用法：`uniID.updateUser(Object userInfo);`

此接口用于在其他接口不满足需求时使用

**userInfo参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|
| 其余参数	| Any| 是	|要设置的用户信息	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| msg	| String| 是	|详细信息					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.updateUser({
    uid: payload.uid,
    nickname: 'user nickname'
  })
	return res
}
```

## 自行初始化uni-id@init

用法：`uniID.init(Object config);`

此接口适用于不希望使用config.json初始化而是希望通过js的方式传入配置的情况

**config参数说明**

config格式与config.json完全相同

**响应参数**

无

```js
// 云函数代码
const uniID = require('uni-id')
uniID.init({
	"passwordSecret": "passwordSecret-demo", // 用于加密用户密码
	"tokenSecret": "tokenSecret-demo", // 用于生成token
	"tokenExpiresIn": 7200, // token过期时间
	"passwordErrorLimit": 6, // 同一个ip密码错误最大重试次数
	"passwordErrorRetryTime": 3600, // 超过密码重试次数之后的等待时间
	"service": {
		"sms": {
			"name": "your app name", // 应用名称对应uniCloud.sendSms的data参数内的name
			"codeExpiresIn": 180, // 验证码过期时间，单位：秒，只可取60的整数倍，不填此参数时会取默认值180秒
			"smsKey": "your sms key", // 短信密钥key
			"smsSecret": "your sms secret" // 短信密钥secret
		}
	}
})
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.updateUser({
    uid: payload.uid,
    nickname: 'user nickname'
  })
	return res
}
```

# 数据库结构

## 用户表

表名：uni-id-users

| 字段						| 类型			| 必填| 描述																				|
| ----------------| ---------	| ----| -------------------------------------------	|
| \_id						| Object ID	| 是	| 存储文档 ID（用户 ID），系统自动生成				|
| username				| String		| 是	| 用户名，不允许重复													|
| password				| String		| 否	| 密码，加密存储															|
| nickname				| String		| 否	| 用户昵称																		|
| gender					| Integer		| 否	| 用户性别：0 未知 1 男性 2 女性							|
| status					| Integer		| 是	| 用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝	|
| mobile					| String		| 否	| 手机号码																		|
| mobile_confirmed| Integer		| 否	| 手机号验证状态：0 未验证 1 已验证						|
| email						| String		| 否	| 邮箱地址																		|
| email_confirmed	| Integer		| 否	| 邮箱验证状态：0 未验证 1 已验证							|
| avatar					| String		| 否	| 头像地址																		|
| comment					| String		| 否	| 备注																				|
| wx_openid				| Object		| 否	| 微信平台openid															|
| wx_unionid			| String		| 否	| 微信平台uniodid															|
| ali_openid			| String		| 否	| 支付宝平台openid															|
| realname_auth		| Object		| 否	| 实名认证信息																|
| register_date		| Timestamp	| 否	| 注册时间																		|
| register_ip			| String		| 否	| 注册时 IP 地址															|
| last_login_date	| Timestamp	| 否	| 最后登录时间																|
| last_login_ip		| String		| 否	| 最后登录时 IP 地址													|

**wx_openid字段定义**

| 字段    | 类型   | 必填 | 描述     |
| ------- | ------ | ---- | -------- |
| app-plus | String | 否   | app平台微信openid |
| mp-weixin| String | 否   | 微信小程序平台openid  |

**realNameAuth 扩展字段定义**
该字段存储实名认证信息。

| 字段            | 类型      | 必填 | 描述                                                |
| --------------- | --------- | ---- | --------------------------------------------------- |
| type            | Integer   | 是   | 用户类型：0 个人用户 1 企业用户                     |
| auth_status     | Integer   | 是   | 认证状态：0 未认证 1 等待认证 2 认证通过 3 认证失败 |
| auth_date       | Timestamp | 否   | 认证通过时间                                        |
| real_name       | String    | 否   | 真实姓名/企业名称                                   |
| identity        | String    | 否   | 身份证号码/营业执照号码                             |
| id_card_front   | String    | 否   | 身份证正面照 URL                                    |
| id_card_back    | String    | 否   | 身份证反面照 URL                                    |
| id_card_in_hand | String    | 否   | 手持身份证照片 URL                                  |
| license         | String    | 否   | 营业执照 URL                                        |
| contact_person  | String    | 否   | 联系人姓名                                          |
| contact_mobile  | String    | 否   | 联系人手机号码                                      |
| contact_email   | String    | 否   | 联系人邮箱                                          |

**job 扩展字段定义**

| 字段    | 类型   | 必填 | 描述     |
| ------- | ------ | ---- | -------- |
| company | String | 否   | 公司名称 |
| title   | String | 否   | 职位     |

用户集合示例：

```
{
  "_id": "f2a60d815ee1da3900823d45541bb162",
  "username": "姓名"
  "password": "503005d4dd16dd7771b2d0a47aaef927e9dba89e",
  "status":0,//用户状态：0正常 1禁用 2审核中 3审核拒绝
  "mobile":"",
  "mobile_confirmed":0, //手机号是否验证，0为未验证，1为已验证
  "email":"amdin@domain.com",
  "email_confirmed":0, //邮箱是否验证，0为未验证，1为已验证
  "avatar":"https://cdn.domain.com/avatar.png"
  "register_ip": "123.120.11.128", //注册IP
  "last_login_ip": "123.120.11.128", //最后登录IP

}
```

## 验证码表

表名：`uni-verify`

| 字段       | 类型      | 必填 | 描述                                   |
| ---------- | --------- | ---- | -------------------------------------- |
| \_id       | Object ID | 是   | 存储文档 ID（验证码 ID），系统自动生成 |
| mobile     | String    | 是   | 手机号，和邮箱二选一                 |
| email      | String    | 是   | 邮箱，和手机号二选一                  |
| code       | String    | 是   | 验证码                                 |
| type       | String   | 是   | 验证类型：login, bind, unbind, pay     |
| state      | Integer   | 是   | 验证状态：0 未验证 1 已验证 2 已作废    |
| ip         | String    | 是   | 请求时 IP 地址                         |
| created_at | Timestamp | 是   | 创建时间                               |
| expired_at | Timestamp | 是   | 验证码过期时间                         |

# 错误码

自`1.1.0`版本使用此错误码规范

|模块						|模块码	|错误代码	|错误信息								|
|:-:						|:-:	|:-:		|:-:									|
|登录通用模块				|100	|01			|账号已禁用								|
|账号、邮箱、手机+密码登录	|101	|01			|用户不存在								|
|							|		|02			|密码错误								|
|							|		|03			|密码错误次数过多						|
|手机号验证码登录/注册		|102	|-			|-										|
|邮箱验证码登录/注册		|103	|-			|-										|
|微信登录/注册				|104	|01			|获取openid失败							|
|支付宝登录/注册			|105	|01			|获取openid失败							|
|注册通用模块				|200	|-			|-										|
|账号、邮箱、手机+密码注册	|201	|01			|用户名、邮箱、手机号必填一项			|
|							|		|02			|用户名、邮箱、手机号冲突				|
|Token类					|300	|-			|-										|
|生成Token					|301	|-			|-										|
|验证Token					|302	|01			|设备特征校验未通过						|
|							|		|02			|云端以不包含此token					|
|							|		|03			|token已过期							|
|							|		|04			|token校验未通过						|
|账号安全类					|400	|-			|-										|
|登出						|401	|-			|-										|
|修改密码					|402	|01			|用户不存在								|
|							|		|02			|旧密码错误								|
|重置密码					|403	|-			|-										|
|验证类						|500	|-			|-										|
|设置验证码					|501	|01			|参数错误								|
|校验验证码					|502	|01			|参数错误								|
|							|		|02			|验证码错误或已失效						|
|发送短信验证码				|503	|01			|验证码发送失败，一般msg内有描述		|
|绑定账号					|600	|-			|-										|
|绑定手机号					|601	|01			|此手机号已被绑定						|
|绑定邮箱					|602	|01			|此邮箱已被绑定							|
|绑定微信					|603	|01			|获取openid失败							|
|							|		|02			|此账号已被绑定							|
|绑定支付宝					|604	|01			|获取openid失败							|
|							|		|02			|此账号已被绑定							|
|解绑账号					|700	|-			|-										|
|解绑手机号					|701	|01			|解绑失败，可能已经解绑或者账号不匹配	|
|解绑邮箱					|702	|01			|解绑失败，可能已经解绑或者账号不匹配	|
|解绑微信					|703	|01			|解绑失败，可能已经解绑					|
|解绑支付宝					|704	|01			|解绑失败，可能已经解绑					|
|基础功能					|800	|-			|-										|
|更新用户信息				|801	|-			|-										|
|设置头像					|802	|-			|-										|
|公用码						|900	|01			|数据库读写异常							|

# FAQ

- token数组为什么越来越长
  + 每次登录成功都会新增一个token，并且检查所有token的有效期删除过期token。正常情况下客户端应该判断持久化存储的token是否还在有效期内，如果还有效就直接进入应用，不再执行登录。这样相当于用户的每个设备上都存在一个有效期内的token，云端也是。

- 复制token到其他环境校验不通过
  + uni-id内会校验客户端ua，如果是在本地调试可以在云函数内修改`context.CLIENTUA`为生成token的设备ua，切记上线删除此逻辑

- username、email、mobile三个字段
  + 三个字段均可能为空，但是建议限制一下插入数据库三个字段的格式，比如username不应是邮箱格式或手机号格式，因为登录时可以选择使用username或mobile或email+密码的方式