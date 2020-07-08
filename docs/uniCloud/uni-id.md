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

或者直接导入[uni-id在插件市场的示例工程](https://ext.dcloud.net.cn/plugin?id=2116)

**config.json的说明**

注意：config.json是一个标准json文件，不支持注释

配置项：

+ `passwordSecret`为用于加密密码入库的密钥
+ `tokenSecret`为生成token需要的密钥
+ `tokenExpiresIn`token有效期，以秒为单位
+ 另外可以按照客户端平台进行不同的配置，参考下面示例

```json
{
	"passwordSecret": "passwordSecret-demo",
	"tokenSecret": "tokenSecret-demo",
	"tokenExpiresIn": 7200,
	"mp-weixin":{
    "oauth":{
      "weixin": {
        "appid": "your mp-weixin appid",
        "appsecret": "your mp-weixin appsecret",
      }
    }
	},
	"app-plus": {
		"tokenExpiresIn": 2592000,
    "oauth":{
      "weixin": {
        "appid": "your app-weixin appid",
        "appsecret": "your app-weixin appsecret",
      }
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

| 字段| 类型	| 必填| 说明											|
| ---	| ---		| ---	| ---												|
| code| Number| 是	|错误码，0表示成功					|
| msg	| String| 是	|详细信息										|
|uid	| String|否		|用户Id，校验成功之后会返回	|

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

## 绑定手机号

用法：`uniID.bindMobile(Object mobileInfo)`

**mobileInfo**参数说明

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|
| mobile| String| 是	|用户手机号											|

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
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.bindMobile({
    uid: payload.uid,
		mobile
	})
	return res
}

```

## 绑定邮箱

用法：`uniID.bindEmail(Object emailInfo)`

**emailInfo**参数说明

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|
| email	| String| 是	|用户邮箱												|

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
		email
	} = event
  const payload = await uniID.checkToken(event.uniIdToken)
  if(payload.code > 0) {
    return payload
  }
	const res = await uniID.bindEmail({
    uid: payload.uid,
		email
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

## 解绑微信

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
