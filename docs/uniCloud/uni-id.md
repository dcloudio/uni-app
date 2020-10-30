# 需求背景

99%的应用，都要开发用户注册、登录、发送短信验证码、密码加密保存、修改密码、token管理等功能，从前端到后端都需要。

为什么不能有一个开源的通用项目，避免大家的重复开发呢？

`uni-id`应需而生。

`uni-id`为`uniCloud`开发者提供了简单、统一、可扩展的用户管理能力封装。

# 组成部分
`uni-id`包括如下组成部分：
1. 云数据库

主表为 `uni-id-users` 表，保存用户的基本信息。

扩展字段有很多，如实名认证数据、工作履历数据，开发者可以自由扩展。

2. 云函数

提供一个名为`uni-id`的公共模块，该模块封装了一系列API，包括注册、登录、修改密码、设置头像等。

示例工程中还提供了一个`user-center`的云函数，演示在云函数中如何调用`uni-id`公共模块。

3. 前端调用

前端示例通过callfunction调用云函数`user-center`，在注册和登录时保存token。

uniCloud框架底层，会自动在callfunction时传递`uni-id`的token（uni-app 2.7.13+版本）。在云函数的event中可直接拿到`uni-id`的token。也就是说开发者无需自己管理token了。

# uni-id 对开发者的价值
1. 节省了大量重复劳动
2. 降低门槛，前端开发者无需纠结怎样设计数据库设计才更合理
3. 多系统打通用户和上下游协同

关于第三点，着重强调下。

一个应用，往往需要集成多个功能模块。比如一个电商应用，需要一个基本电商模板，还需要客服聊天模板，甚至还需要用户交流社区。

在插件市场，每类模板插件都能找到，但他们如果不是基于同一套用户体系设计，就很难整合。

DCloud推荐所有uniCloud的应用，都基于`uni-id`来做。

有了统一的账户规范，并且围绕这套账户规范，有各种各样插件，那么开发者可以随意整合这些插件，让数据连同。

规范，还可以让上下游充分协同。插件市场会出现各种数据迁移插件，比如把从discuz里把用户迁移到`uni-id`中的插件，相信围绕这套规范的产业链会非常活跃。

# 现状和未来

`uni-id`已完整的内容：

- 注册、登录、发送短信验证码、密码加密保存、修改密码、token管理（短信验证码功能需要HBuilderX 2.8.3+）
- 三方登录：App中的微信登录、微信小程序中的微信登录、支付宝小程序中的支付宝账户登录 

关于还缺少的部分，哪些DCloud在完善，哪些希望开发者给共同完善开源项目，计划与边界公布如下：

1. 部分社交账户登录

DCloud暂无计划开发百度、头条、QQ等小程序的登录，以及Apple ID、微博、QQ等App端的登录。欢迎其他开发者在开源项目上提交pr，共同完善`uni-id`。

2. 邮箱验证和手机号一键认证sdk集成

手机号一键认证sdk，目前插件市场里已经有不少相关插件，未来DCloud会整合到`uni-id`中。邮箱验证，DCloud暂无计划开发，有需求的开发者欢迎提供pr。

3. 实名认证、活体检测

目前插件市场里已经有不少相关插件，未来DCloud会整合到`uni-id`中。

4. 权限管理ACL

这部分欢迎开发者参与完善。

其他方面，各种常见开源项目如discuz、wordPress、ecshop的用户导入插件，不属于`uni-id`主工程，欢迎开发者单独提交插件到插件市场。

`uni-id`的git仓库：[https://gitee.com/dcloud/uni-id.git](https://gitee.com/dcloud/uni-id.git)


# 快速上手

使用uni-id需要按照以下步骤操作

1. 准备2.7.14或以上版本的HBuilderX
2. 插件市场导入`uni-id`公用模块，[插件市场 uni-id](https://ext.dcloud.net.cn/plugin?id=2116)
3. 修改公用模块`uni-id`下的`config.json`内所需参数（请参考下面config.json的说明）
4. 上传`cloudfunctions/common`下的`uni-id`模块
5. 按照[公用模块使用说明](https://uniapp.dcloud.io/uniCloud/cf-common)在云函数下安装`uni-id`模块
6. 创建`uni-id-users`、`uni-verify`集合（可以直接使用示例项目里面的db_init.json进行初始化）

或者直接导入[uni-id在插件市场的示例工程](https://ext.dcloud.net.cn/plugin?id=2116)

导入示例项目时，如果选择腾讯云，在HBuilderX2.7及以下版本中，需要进入项目目录，手动将目录`cloudfunctions-aliyun`改名为`cloudfunctions-tcb`，然后在HBuilderX中右键cloudfunctions绑定服务空间。

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

**下面的配置文件中所有时间的单位都是秒**

```json
// 如果拷贝此内容切记去除注释
{
	"passwordSecret": "passwordSecret-demo", // 加密密码所用的密钥，注意修改为自己的，使用一个较长的字符串即可
	"tokenSecret": "tokenSecret-demo", // 生成token所用的密钥，注意修改为自己的，使用一个较长的字符串即可
	"tokenExpiresIn": 7200, // 全平台token过期时间，未指定过期时间的平台会使用此值
	"tokenExpiresThreshold": 600, // 新增于uni-id 1.1.7版本，checkToken时如果token有效期小于此值则自动获取新token，请注意将新token返回给前端保存，如果不配置此参数则不开启自动获取新token功能
	"bindTokenToDevice": true, // 是否将token和设备绑定，设置为true会进行ua校验，默认为true
	"passwordErrorLimit": 6, // 密码错误最大重试次数
	"passwordErrorRetryTime": 3600, // 密码错误重试次数超限之后的冻结时间
  "autoSetInviteCode": false, // 是否在用户注册时自动设置邀请码，默认不自动设置
  "forceInviteCode": false, // 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）,设置为true时需要在loginBySms时指定type为register来使用注册，登录时也要传入type为login
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
				"privateKey": "alipay privateKey", // 私钥
				"keyType": "PKCS8" // 私钥类型，如果私钥类型不是PKCS8，需要填写此字段，否则会出现“error:0D0680A8:asn1 encoding routines:ASN1_CHECK_TLEN:wrong tag”错误
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

# 特色功能

## 角色权限@rbac

为什么需要权限管理？
- 对于后台管理系统，除了超级管理员，不同账号通常需根据职位、责任设定不同的系统权限。
- [clientDB](https://uniapp.dcloud.net.cn/uniCloud/uni-clientDB)允许前端直接操作数据库，但部分字段应该是系统计算或管理员设置的，比如文章的阅读数、收藏数及是否加精置顶，这些字段不允许普通用户在前端通过clientDB直接修改，此时也需要通过权限控制来保证系统的安全稳定。 

`uni-id`如何解决权限管理问题？
- 基于经典的RBAC模型实现内置角色权限系统。

### RBAC模型简介

RBAC：Role-Based Access Control，基于角色的访问控制。

其基本思想：对系统操作的各种权限不是直接授予具体的用户，而是在用户集合与权限集合之间建立一个角色集合。每一种角色对应一组相应的权限。一旦用户被分配了适当的角色后，该用户就拥有此角色的所有权限。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/431878b0-0ca0-11eb-8a36-ebb87efcf8c0.png)

这样做的好处是，增强系统管理的扩展性，对于批量用户的权限变更，仅需变更该批用户角色对应权限即可，而无需对该批每个用户变更权限。

这个模型有三个关键名词：用户、角色、权限：
- 用户：使用系统的人，一个用户可以同时有多个角色
- 角色：权限的集合，一个角色可以有多个权限
- 权限：数据权限或业务权限，例如：删除用户、删除评论等

### 用户

用户信息存储在`uni-id-users`表中，然后通过`role`字段保存该用户所拥有的所有角色ID，角色ID即角色表（`uni-id-roles`表）中的`role_id`字段，注意不是`_id`字段。

```
{
  {
    "_id":"5f8428181c229600010389f6",
    "username":"uniapp",
    "email":"hr2013@dcloud.io",
    role:[
      "USER_ADMIN",
      "NOTICE_ADMIN"
    ],
    "created_date":1602495783272
  }  
}
```

>Tips：将用户角色设计为用户表的字段，而没有新建`用户角色关联表`的原因：避免mongodb在跨表查询时的性能开销

### 角色

角色信息存储在`uni-id-roles`表中

| 字段				| 类型			| 必填| 描述																	|
| ----------	| ---------	| ----| --------------------------------------|
| \_id				| Object ID	| 是	| 系统自动生成的Id											|
| role_id			| String		| 是	| 角色唯一标识													|
| role_name		| String		| 否	| 角色名，展示用												|
| permission	| Array			| 是	| 角色拥有的权限列表										|
| comment			| String		| 否	| 备注																	|
| created_date| Timestamp	| 是	| 角色创建时间													|

其中：
- `role_id`为角色标志，全局唯一，可用于clientDB中的权限控制，建议按照语义化命名，例如：`USER_ADMIN`表示人事管理、`NOTICE_ADMIN`表示公告管理
- `permission`为数组类型，存储该角色拥有的所有权限ID，权限ID即权限表（`uni-id-permissions`表）中的`permission_id`字段，注意不是`_id`字段

如下为示例：

```
{
  {
    "_id":"5f8428181c229600010389f6",
    "role_id":"USER_ADMIN",
    "role_name":"人事管理",
    permission:[
      "USER_ADD",
      "USER_EDIT",
      "USER_DEL"
    ],
    "created_date":1602495783272
  },
  {
    "_id":"5f842836d8daea0001906785",
    "role_id":"NOTICE_ADMIN",
    "role_name":"公告管理",
    permission:[
      "NOTICE_ADD",
      "NOTICE_EDIT",
      "NOTICE_DEL"
    ],
    "created_date":1602495784372
  }  
}
```

如下是角色在clientDB中的配置示例：

```
// db-permission/uni-id-users.js

{
  ".update":"doc._id == auth.uid || 'USER_ADMIN' in auth.role" //用户自己或人事管理员可执行用户表的.update操作
}
```

>Tips1：uni-id中`admin`为超级管理员角色，uni-clientDB也基于同样的策略；如果用户角色包含`admin`，则该用户就拥有所有数据表的全部权限。

>Tips2：出厂时可内置常用角色，也可上线后由运营人员动态创建角色。

### 权限

权限信息在`uni-id-permissions`表中，表结构定义如下：

| 字段						| 类型			| 必填| 描述																	|
| ----------			| ---------	| ----| --------------------------------------|
| \_id						| Object ID	| 是	| 系统自动生成的Id											|
| permission_id		| String		| 是	| 权限唯一标识													|
| permission_name	| String		| 否	| 权限名，展示用												|
| comment					| String		| 否	| 备注																	|
| created_date		| Timestamp	| 是	| 权限创建时间													|

其中，`permission_id`为权限标志，全局唯一，可用于clientDB中的权限配置，建议按照语义化命名，例如：`USER_DEL`、`BRANCH_ADD`。

如下为示例内容：

```
{
  {
    "_id":"5f8428181c229600010389f6",
    "permission_id":"USER_EDIT",
    "permission_name":"修改用户",
    "created_date":1602495783272
  },
  {
    "_id":"5f842836d8daea0001906785",
    "permission_id":"USER_DEL",
    "permission_name":"删除用户",
    "created_date":1602495784372
  }  
}
```

如下是权限在clientDB中的配置示例：

```
// db-permission/uni-id-users.js

{
  ".update":"doc._id == auth.uid || 'USER_EDIT' in auth.permission" //用户自己或有`USER_EDIT`权限的用户，可执行用户表的.update操作
}
```

>Tips1：建议出厂时内置所有权限，方便clientDB中的权限配置。

### 其他说明

uni-id针对角色权限模块封装了丰富的API，比如：获取用户角色、获取某角色下的所有权限等，详情参考：[角色权限API](uniCloud/uni-id.md?id=rbac-api)。

uni-id登录注册接口可接收`needPermission`参数，若`needPermission`配置为true时，后续会在`checkToken`接口返回用户权限列表（permission）。如下是通过token判断权限的简单示例：

```js
// 简单的权限校验示例
function hasPermission(token, permission) {
  const checkTokenRes = await uniID.checkToken(token)
  return checkTokenRes.permission.includes(permission)
}
```



## 裂变@fission

自`1.1.2`版本起uni-id支持裂变功能，目前仅适用手机号+验证码方式注册可以填写邀请码（inviteCode）接受邀请。裂变相关API请参考[裂变API](uniCloud/uni-id.md?id=fission-api)

在`config.json`内配置了`autoSetInviteCode: true`则在用户注册时会自动给设置不重复的6位邀请码，如果不希望使用自动设置的邀请码可以自行传入`myInviteCode`参数来设置邀请码，需要注意的是要保证邀请码唯一。

在`config.json`内配置了`forceInviteCode: true`则只有使用邀请码才可以注册（仅手机号+验证码注册方式支持）。

针对之前使用了旧版本（不支持裂变）的uni-id，现在想增加裂变功能，可以调用`setUserInviteCode`接口给已注册用户设置邀请码，在设置之前可以使用`my_invite_code不存在`作为条件查询所有需要设置的用户。

如果希望用户注册完成之后再填写邀请人的邀请码，可以调用`acceptInvite`接口来使用户接受邀请。

`getInvitedUser`接口可以用于获取接受邀请的用户列表，其中level参数可以用来设置要获取哪一级的邀请用户，不填写level参数则默认获取第一级。

如果想详细的体验一下裂变流程，可以在插件市场导入[前后一体登录模板](https://ext.dcloud.net.cn/plugin?id=13)，此项目内已有邀请用户注册示例，流程如下

**分享邀请码/邀请链接**

<img width="375" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1b181d40-e377-11ea-b680-7980c8a877b8.jpeg" />


**受邀者注册**

<img width="375" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1b12c610-e377-11ea-b997-9918a5dda011.jpeg" />

# API列表@api

## 基础功能

### 用户注册 @register

用法`uniID.register(Object RegisterParams)`

**注意**

- 注册成功之后会返回token，在获取token之后应进行持久化存储，键值为：uniIdToken，`uni.setStorageSync('uniIdToken',res.result.token)`

**user参数说明**

| 字段					| 类型		| 必填| 说明																																					|
| ---						| ---			| ---	| ---																																						|
| username			| String	| 是	|用户名，唯一																																		|
| password			| String	| 是	|密码																																						|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| myInviteCode	| String	| 否	|自行设置用户的邀请码																														|

username可以是字符串、可以是email、可以是手机号，本插件不约束，开发者可以自己定。

比如要求username为手机号，则自行在前端界面上做好提示，在后台对格式进行校验。

password入库时会自动进行一次sha1加密，不明文存储密码。

**响应参数**

| 字段				| 类型	| 必填| 说明															|
| ---					| ---		| ---	| ---																|
| code				| Number| 是	|错误码，0表示成功									|
| message			| String| 是	|详细信息														|
| uid					| String| -		|用户id															|
| token				| String| -		|注册完成自动登录之后返回的token信息|
| tokenExpired| String| -		|token过期时间											|

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
				content: res.result.message,
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


### 用户登录 @login

用法：`uniID.login(Object LoginParams)`

**注意**

- 登录成功之后会返回token，在获取token之后应进行持久化存储，键值为：uniIdToken，`uni.setStorageSync('uniIdToken',res.result.token)`

**user参数说明**

| 字段		| 类型	| 必填	| 说明	|
| ---		| ---	| ---	| ---	|
| username	| String| 是	|用户名	|
| password	| String| 是	|密码	|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| queryField	| Array| 否	|指定从哪些字段中比对username，不填默认与数据库内的username字段对比, 可取值'username'、'email'、'mobile'|

**响应参数**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| uid					| String| 是	|用户Id											|
| userInfo		| Object| 是	|用户全部信息								|
| code				| Number| 是	|错误码，0表示成功					|
| message					| String| 是	|详细信息										|
| token				| String| -		|登录成功之后返回的token信息|
| tokenExpired| String| -		|token过期时间							|

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

### 登出

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
| message	| String| 是	|详细信息					|

**示例代码**

```js
// 云函数logout代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.logout(uniIdToken)
	return res
}

```


### token校验

用法：`uniID.checkToken(String token)`

**参数说明**

| 字段	| 类型	| 必填| 说明												|
| ---		| ---		| ---	| ---													|
| token	| String| 是	|客户端callFunction带上的token|

**响应参数**

| 字段				| 类型			| 说明																																																										|
| ---					| ---				| ---																																																											|
| code				| Number		|错误码，0表示成功																																																				|
| message					| String		|详细信息																																																									|
| uid					| String		|用户Id，校验成功之后会返回																																																|
| token				| String		|新增于uni-id 1.1.7版本，用户token快要过期时，新生成的token，只有在config内配置了`tokenExpiresThreshold`的值时才会有此行为|
| tokenExpired| TimeStamp	|新增于uni-id 1.1.7版本，新token的过期时间																																								|
| role				| Array			|新增于uni-id 1.1.9版本，用户角色列表																																											|
| permission	| Array			|新增于uni-id 1.1.9版本，用户权限列表，只有登录操作时传入needPermission才会返回，否则为空数组															|
| userInfo		| Object		|用户信息，uid对应的uni-id-users全部字段																																									|

**注意：**

- 客户端会自动查找storage内的token在callFunction时插入
- 2.9.5+ 客户端允许开发者自行传入uniIdToken，此时不再从storage获取token
- 2.7.14 版本token存储在storage内使用的是驼峰形式的键值`uniIdToken`，下版会调整为蛇形`uni_id_token`，调整后会在一段时间内兼容驼峰形式

**示例代码**

```js
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const payload = await uniID.checkToken(event.uniIdToken)
	return payload
}
```

### 生成token@createtoken

用法：`uniID.createToken(Object CreateTokenParams)`

**passwordInfo参数说明**

| 字段					| 类型		| 必填| 说明																		|
| ---						| ---			| ---	| ---																			|
| uid						| String	| 是	|用户Id																		|
| needPermission| Boolean	| 否	|标识是否需要在checkToken时返回permission	|

**响应参数**

| 字段				| 类型	| 必填| 说明										|
| ---					| ---		| ---	| ---											|
| code				| Number| 是	|错误码，0表示成功				|
| message			| String| 是	|详细信息									|
| token				| String| 是	|生成的token							|
| tokenExpired| Number| 是	|token过期时间对应的时间戳|

### 修改密码 @update-password

用法：`uniID.updatePwd(Object UpdatePwdParams)`

**passwordInfo参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| uid									| String| 是	|用户Id，可以通过checkToken返回	|
| oldPassword					| String| 是	|旧密码													|
| newPassword					| String| 是	|新密码													|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| message	| String| 是	|详细信息					|

**注意：修改密码会导致所有token失效**

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

### 重置密码 @reset-password

用法：`uniID.resetPwd(Object ResetPwdParams)`

**passwordInfo参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| uid									| String| 是	|用户Id，可以通过checkToken返回	|
| password					| String| 是	|重置后的密码													|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| code	| Number| 是	|错误码，0表示成功			|
| message	| String| 是	|详细信息					|

**注意：重置密码会导致所有token失效**

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

### 加密密码 @encrypt-password

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

### 设置头像

用法：`uniID.setAvatar(Object SetAvatarParams)`

**avatarInfo**参数说明

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|
| avatar| String| 是	|用户头像URL										|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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


### 更新用户信息

用法：`uniID.updateUser(Object UpdateUserParams);`

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
| message	| String| 是	|详细信息					|

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

### 获取用户信息

用法：`uniID.getUserInfo(Object GetUserInfoParams);`

此接口用于在其他接口不满足需求时使用

**参数说明**

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|
| field	| Array	| 否	|指定返回的字段，不传则返回所有	|

**响应参数**

| 字段		| 类型	| 必填| 说明						|
| ---			| ---		| ---	| ---							|
| code		| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|
| userInfo| Object| 是	|获取的用户信息		|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.getUserInfo({
    uid: payload.uid,
    field: ['mobile']
  })
	return res
}
```

### 自行初始化uni-id@init

用法：`uniID.init(Object InitParams);`

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

## 手机号码

### 发送短信验证码

用法：`uniID.sendSmsCode(Object SendSmsCodeParams)`

**codeInfo**参数说明

| 字段			| 类型	| 必填| 说明																																																					|
| ---				| ---		| ---	| ---																																																						|
| mobile		| String| 是	|用户手机号																																																			|
| templateId| String| 否	|`uni-id 1.1.8+`用户自定义模板Id，不传则使用uniID_code，如果要使用自定义模板请使用类似下面模板示例的参数												|
| code			| String| 否	|验证码字符串																																																		|
| type			| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`register`注册、`bind`绑定手机、`unbind`解绑手机|

```
// 短信模板示例，请在https://dev.dcloud.net.cn/uniSms申请签名（短信开头中括号内部分）及模板
验证码：${code}，用于${action}，${expMinute}分钟内有效，请勿泄露并尽快验证。
```

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

### 设置验证码@setVerifyCode

如果你不想使用`uni-id`的sendSmsCode发送短信的话，可以使用此接口自行在库中创建验证码

用法：`uniID.setVerifyCode(Object SetVerifyCodeParams)`

**codeInfo**参数说明

| 字段			| 类型	| 必填| 说明																																													|
| ---				| ---		| ---	| ---																																														|
| mobile		| String| 是	|用户手机号，和邮箱二选一																																										|
| email		| String| 是	|用户邮箱，和手机号二选一																																										|
| code			| String| 是	|验证码字符串																																										|
| expiresIn	| Number| 是	|验证码过期时间，单位秒																																					|
| type			| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`register`注册、`bind`绑定手机、`unbind`解绑手机|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

### 校验验证码@verifyCode

uni-id内置方法`loginBySms`、`bindMobile`、`unbindMobile`均已内置校验验证码方法，如果使用以上方法不需要再调用此接口，如需扩展类型请确保type和发送验证码/设置验证码时对应

用法：`uniID.verifyCode(Object VerifyCodeParams)`

**codeInfo**参数说明

| 字段	| 类型	| 必填| 说明																																													|
| ---		| ---		| ---	| ---																																														|
| mobile| String| 是	|用户手机号，和邮箱二选一																																				|
| email	| String| 是	|用户邮箱，和手机号二选一																																				|
| code	| String| 是	|验证码字符串																																										|
| type	| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`register`注册、`bind`绑定手机、`unbind`解绑手机|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

### 手机号验证码直接登录

用法：`uniID.loginBySms(Object LoginBySmsParams)`

**mobileInfo**参数说明

| 字段				| 类型	| 必填| 说明																																																	|
| ---					| ---		| ---	| ---																																																		|
| mobile			| String| 是	|用户手机号																																															|
| code				| String| 是	|验证码																																																	|
| type				| String| 否	|指定操作类型，可选值为`login`、`register`，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册|
| password		|String	| 否	|密码，type为`register`时生效																																						|
| inviteCode	|String	| 否	|邀请人的邀请码，type为`register`时生效																																	|
| myInviteCode|String	| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																										|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|

**响应参数**

| 字段				| 类型	| 必填| 说明																		|
| ---					| ---		| ---	| ---																			|
| code				| Number| 是	|错误码，0表示成功												|
| message					| String| 是	|详细信息																	|
| uid					| String| 是	|用户uid																	|
| type				| String| 是	|操作类型，`login`为登录、`register`为注册|
| userInfo		| Object| 是	|用户全部信息								|
| token				| String| -		|登录成功之后返回的token信息							|
| tokenExpired| String| -		|token过期时间														|

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

### 绑定手机号

用法：`uniID.bindMobile(Object BindMobileParams)`

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
| message	| String| 是	|详细信息					|

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

### 解绑手机

用法：`uniID.unbindMobile(Object UnbindMobileParams)`

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
| message	| String| 是	|详细信息					|

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

## 邮箱

### 邮箱验证码直接登录

用法：`uniID.loginByEmail(Object LoginByEmailParams)`

**mobileInfo**参数说明

| 字段					| 类型	| 必填| 说明																																					|
| ---						| ---		| ---	| ---																																						|
| email					| String| 是	|用户邮箱																																				|
| code					| String| 是	|验证码																																					|
| type					| String| 否	|指定操作类型，覆盖存在则登录不存在则注册的默认行为，可选值为`login`、`register`|
| password			|String	| 否	|密码，type为`register`时生效																										|
| myInviteCode	|String	| 否	|设置当前注册用户自己的邀请码，type为`register`时生效														|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|

**响应参数**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| code				| Number| 是	|错误码，0表示成功					|
| message					| String| 是	|详细信息										|
| uid					| String| 是	|用户uid																	|
| userInfo		| Object| 是	|用户全部信息								|
| type				| String| 是	|操作类型，`login`为登录、`register`为注册|
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

### 设置验证码

见[设置验证码](uniCloud/uni-id.md?id=setVerifyCode)

### 校验验证码

见[校验验证码](uniCloud/uni-id.md?id=verifyCode)

### 绑定邮箱

用法：`uniID.bindEmail(Object BindEmailParams)`

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
| message	| String| 是	|详细信息					|

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

### 解绑邮箱

用法：`uniID.unbindEmail(Object UnbindEmailParams)`

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
| message	| String| 是	|详细信息					|

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

## 微信小程序

### 微信登录

用法：`uniID.loginByWeixin(Object LoginByWexinParams);`

**注意**

- 需要在config.json内使用微信登录的平台下配置appid和appsecret
- uniId会自动判断客户端平台
- 登录成功之后应持久化存储token，键值为：uniIdToken，`uni.setStorageSync('uniIdToken', res.result.token)`
- App端获取code不可直接调用`uni.login`，详细用法可以看下面示例

**参数说明**

| 字段				| 类型	| 必填| 说明																																																														|
| ---					| ---		| ---	| ---																																																															|
| code				| String| 是	|微信登录返回的code																																																								|
| platform		|String	| 否	|客户端类型：`mp-weixin`、`app-plus`，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定	|
| myInviteCode|String	| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																																							|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|

**响应参数**

| 字段						| 类型		| 必填| 说明																		|
| ---							| ---			| ---	| ---																			|
| code						| Number	| 是	|错误码，0表示成功												|
| message							| String	| 是	|详细信息																	|
| uid							| String	| 是	|用户uid																	|
| type						| String	| 是	|操作类型，`login`为登录、`register`为注册|
| openid					| String	| 是	|用户openid																|
| unionid					| String	| 否	|用户unionid，能取到此参数时会返回				|
| token						| String	| 是	|登录成功之后返回的token信息							|
| userInfo		| Object| 是	|用户全部信息								|
| tokenExpired		| String	| 是	|token过期时间														|
| mobileConfirmed	| Boolean	| 是	|是否已验证手机号													|
| emailConfirmed	| Boolean	| 是	|是否已验证邮箱														|

**示例代码**

```js
// 云函数login-by-weixin代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  // 如下旧写法依然支持
	// const res = await uniID.loginByWeixin(event.code)
	const res = await uniID.loginByWeixin({
    code: event.code
  })
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

### 获取微信openid

用法：`uniID.code2SessionWeixin(Object Code2SessionWeixinParams);`

**参数说明**

| 字段		| 类型	| 必填| 说明																																																														|
| ---			| ---		| ---	| ---																																																															|
| code		| String| 是	|微信登录返回的code																																																								|
|platform	|String	|否		|客户端类型：`mp-weixin`、`app-plus`，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定	|

**响应参数**

| 字段				| 类型	| 必填| 说明																													|
| ---					| ---		| ---	| ---																														|
| code				| Number| 是	|错误码，0表示成功																							|
| message					| String| 是	|详细信息																												|
| openid			| String| -		|用户openid																											|
| unionid			| String| -		|用户unionid，可以取到此值时返回																|
| sessionKey	| String| -		|客户端为微信小程序时返回																				|
| accessToken	| String| -		|客户端为APP时返回																							|
| expiresIn		| String| -		|客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）|
| refreshToken| String| -		|客户端为APP时返回，用于刷新accessToken																					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.code2SessionWeixin({
    code: event.code
  })
	return res
}
```

### 绑定微信

用法：`uniID.bindWeixin(Object BindWeixinParams);`

**weixinInfo 参数说明**

**参数说明**

| 字段		| 类型	| 必填| 说明																																																														|
| ---			| ---		| ---	| ---																																																															|
| uid			| String| 是	|用户Id，可以通过checkToken返回																																																		|
| code		| String| 是	|微信登录返回的code																																																								|
|platform	|String	|否		|客户端类型：`mp-weixin`、`app-plus`，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

### 解绑微信

用法：`uniID.unbindWeixin(String uid);`

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

## 支付宝小程序

### 支付宝登录

用法：`uniID.loginByAlipay(Object LoginByAlipayParams);`

**注意**

- 需要在config.json内支付宝平台下配置appid和privateKey（应用私钥）
- 登录成功之后应持久化存储token，键值为：uniIdToken，`uni.setStorageSync('uniIdToken', res.result.token)`

**参数说明**

| 字段				| 类型	| 必填| 说明																																																														|
| ---					| ---		| ---	| ---																																																															|
| code				| String| 是	|支付宝登录返回的code																																																							|
| platform		| String| 否	|客户端类型：`mp-weixin`、`app-plus`，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定	|
| myInviteCode| String| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																																							|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|

**响应参数**

| 字段						| 类型		| 必填| 说明																		|
| ---							| ---			| ---	| ---																			|
| code						| Number	| 是	|错误码，0表示成功												|
| message							| String	| 是	|详细信息																	|
| uid							| String	| 是	|用户uid																	|
| type						| String	| 是	|操作类型，`login`为登录、`register`为注册|
| openid					| String	| 是	|用户openid																|
| token						| String	| 是	|登录成功之后返回的token信息							|
| userInfo		| Object| 是	|用户全部信息								|
| tokenExpired		| String	| 是	|token过期时间														|
| mobileConfirmed	| Boolean	| 是	|是否已验证手机号													|
| emailConfirmed	| Boolean	| 是	|是否已验证邮箱														|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  // 如下旧写法依然支持
	// const res = await uniID.loginByAlipay(event.code)
	const res = await uniID.loginByAlipay({
    code: event.code
  })
	return res
}
```


### 获取支付宝用户ID

用法：`uniID.code2SessionAlipay(Object Code2SessionAlipayParams);`

**参数说明**

| 字段		| 类型	| 必填| 说明																																																														|
| ---			| ---		| ---	| ---																																																															|
| code		| String| 是	|微信登录返回的code																																																								|
|platform	|String	|否		|客户端类型：`mp-weixin`、`app-plus`，默认uni-id会自动取客户端类型，但是在云函数url化等场景无法取到客户端类型，可以使用此参数指定	|

**响应参数**

| 字段				| 类型	| 必填| 说明																													|
| ---					| ---		| ---	| ---																														|
| code				| Number| 是	|错误码，0表示成功																							|
| message					| String| 是	|详细信息																												|
| openid			| String| -		|用户openid																											|
| accessToken	| String| -		|客户端为APP时返回																							|
| expiresIn		| String| -		|客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）|
| refreshToken| String| -		|客户端为APP时返回，用于刷新accessToken													|
| reExpiresIn	| String| -		|refreshToken超时时间，单位（秒）																|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.code2SessionAlipay({
    code: event.code
  })
	return res
}
```

### 绑定支付宝

用法：`uniID.bindAlipay(Object BindAlipayParams);`

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
| message	| String| 是	|详细信息					|

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

### 解绑支付宝

用法：`uniID.unbindAlipay(String uid);`

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| uid	| String| 是	|用户Id，可以通过checkToken返回	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|

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

## 角色权限@rbac-api

### 获取用户角色

根据uid获取用户角色

用法：`uniID.getRoleByUid(Object GetRoleByUidParams)`

**参数说明**

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| uid		| String| 是	|用户Id，可以通过checkToken返回	|

**响应参数**

| 字段| 类型	| 必填| 说明						|
| ---	| ---		| ---	| ---							|
| code| Number| 是	|错误码，0表示成功|
| message	| String| 是	|详细信息					|
| role	| Array	| 是	|用户拥有的角色列表|

### 获取角色的权限

根据roleID获取角色权限

用法：`uniID.getPermissionByRole(Object GetPermissionByRoleParams)`

**参数说明**

| 字段	| 类型	| 必填| 说明	|
| ---		| ---		| ---	| ---		|
| roleID| String| 是	|角色Id	|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|
| permission| Array	| 是	|角色拥有的权限列表	|

### 获取用户的权限

根据uid获取用户权限

用法：`uniID.getPermissionByUid(Object GetPermissionByUidParams)`

**参数说明**

| 字段| 类型	| 必填| 说明	|
| ---	| ---		| ---	| ---		|
| uid	| String| 是	|用户Id	|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|
| permission| Array	| 是	|用户拥有的权限列表	|

### 为用户绑定角色

用法：`uniID.bindRole(Object BindRoleParams)`

**参数说明**

| 字段		| 类型		| 必填| 说明																																										|
| ---			| ---			| ---	| ---																																											|
| uid			| String	| 是	|用户Id																																										|
| roleList| Array		| 是	|角色Id（role_id）列表																																		|
| reset		| Boolean	| 否	|是否直接覆盖用户角色，true：直接将roleList设置为用户角色，false：在用户已有角色后追加角色|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 为角色绑定权限

用法：`uniID.bindPermission(Object BindPermissionParams)`

**参数说明**

| 字段					| 类型		| 必填| 说明																																													|
| ---						| ---			| ---	| ---																																														|
| roleID				| String	| 是	|用户Id																																													|
| permissionList| Array		| 是	|权限Id（permission_id）列表																																													|
| reset					| Boolean	| 否	|是否直接覆盖角色权限，true：直接将permissionList设置为角色权限，false：在角色已有权限后追加权限|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 为用户解绑角色

用法：`uniID.unbindRole(Object UnbindRoleParams)`

**参数说明**

| 字段		| 类型		| 必填| 说明																																										|
| ---			| ---			| ---	| ---																																											|
| uid			| String	| 是	|用户Id																																										|
| roleList| Array		| 是	|角色Id（role_id）列表																																		|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 为角色解绑权限

用法：`uniID.unbindPermission(Object UnbindPermissionParams)`

**参数说明**

| 字段					| 类型	| 必填| 说明											|
| ---						| ---		| ---	| ---												|
| roleID				| String| 是	|角色Id											|
| permissionList| Array	| 是	|权限Id（permission_id）列表|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 新增角色

用法：`uniID.addRole(Object AddRoleParams)`

**参数说明**

| 字段			| 类型	| 必填| 说明											|
| ---				| ---		| ---	| ---												|
| roleID		| String| 是	|角色Id，唯一标识											|
| roleName	| String| 否	|角色名称，展示用						|
| comment		| String| 否	|备注												|
| permission| Array	| 否	|权限Id（permission_id）列表|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 获取角色列表

用法：`uniID.getRoleList(Object GetRoleListParams)`

**参数说明**

| 字段			| 类型		| 必填| 说明						|
| ---				| ---			| ---	| ---							|
| limit			| Number	| 是	|限制返回数量			|
| offset		| Number	| 是	|偏移量						|
| needTotal	| Boolean	| 否	|是否需要返回总数	|

**响应参数**

| 字段		| 类型	|  说明																			|
| ---			| ---		|  ---																			|
| code		| Number| 错误码，0表示成功													|
| message			| String| 详细信息																	|
| roleList| Array	|roles表记录数组（包含role_name、comment等）|
| total		| Number|总数量																			|

### 获取角色信息

用法：`uniID.getRoleInfo(String roleID)`

**参数说明**

| 字段	| 类型	| 必填| 说明	|
| ---		| ---		| ---	| ---		|
| roleID| String| 是	|角色ID	|

**响应参数**

| 字段				| 类型			|  说明							|
| ---					| ---				|  ---							|
| code				| Number		| 错误码，0表示成功	|
| message			| String		| 详细信息					|
| role_name		| String		| 角色名，展示用		|
| permission	| Array			| 角色拥有的权限列表|
| comment			| String		| 备注							|
| created_date| Timestamp	| 角色创建时间			|

### 更新角色信息

**注意不可修改role_id**

用法：`uniID.updateRole(Object UpdateRoleParams)`

**参数说明**

| 字段			| 类型	| 必填| 说明											|
| ---				| ---		| ---	| ---												|
| roleID		| String| 是	|角色Id，唯一标识						|
| roleName	| String| 否	|角色名称，展示用						|
| comment		| String| 否	|备注												|
| permission| Array	| 否	|权限Id（permission_id）列表|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 删除角色

用法：`uniID.deleteRole(Object DeleteRoleParams)`

**参数说明**

| 字段	| 类型	| 必填| 说明						|
| ---		| ---		| ---	| ---							|
| roleID| String| 是	|角色Id，唯一标识	|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 新增权限

用法：`uniID.addPermission(Object AddPermissionParams)`

**参数说明**

| 字段					| 类型	| 必填| 说明						|
| ---						| ---		| ---	| ---							|
| permissionID	| String| 是	|权限Id，唯一标识	|
| permissionName| String| 否	|权限名称，展示用	|
| comment				| String| 否	|备注							|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 获取权限列表

用法：`uniID.getPermissionList(Object GetPermissionListParams)`

**参数说明**

| 字段			| 类型		| 必填| 说明						|
| ---				| ---			| ---	| ---							|
| limit			| Number	| 是	|限制返回数量			|
| offset		| Number	| 是	|偏移量						|
| needTotal	| Boolean	| 否	|是否需要返回总数	|

**响应参数**

| 字段					| 类型	|  说明																									|
| ---						| ---		|  ---																									|
| code					| Number| 错误码，0表示成功																			|
| message						| String| 详细信息																							|
| permissionList| Array	|permissions表记录数组（包含permission_name、comment等）|
| total					| Number|总数量																									|

### 获取权限信息

用法：`uniID.getPermissionInfo(String permissionID)`

**参数说明**

| 字段				| 类型	| 必填| 说明	|
| ---					| ---		| ---	| ---		|
| permissionID| String| 是	|权限ID	|

**响应参数**

| 字段						| 类型			|  说明							|
| ---							| ---				|  ---							|
| code						| Number		| 错误码，0表示成功	|
| message					| String		| 详细信息					|
| permission_name	| String		| 权限名，展示用		|
| comment					| String		| 备注							|
| created_date		| Timestamp	| 权限创建时间			|

### 修改权限

**注意：不可修改permissionID**

用法：`uniID.updatePermission(Object UpdatePermissionParams)`

**参数说明**

| 字段					| 类型	| 必填| 说明						|
| ---						| ---		| ---	| ---							|
| permissionID	| String| 是	|权限Id，唯一标识	|
| permissionName| String| 否	|权限名称，展示用	|
| comment				| String| 否	|备注							|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

### 删除权限

用法：`uniID.deletePermission(Object DeletePermissionParams)`

**参数说明**

| 字段					| 类型	| 必填| 说明						|
| ---						| ---		| ---	| ---							|
| permissionID	| String| 是	|权限Id，唯一标识	|

**响应参数**

| 字段			| 类型	| 必填| 说明							|
| ---				| ---		| ---	| ---								|
| code			| Number| 是	|错误码，0表示成功	|
| message				| String| 是	|详细信息						|

## 裂变@fission-api

### 设置用户邀请码

针对未生成邀请码的用户使用此方法生成邀请码

用法：`uniID.setUserInviteCode(Object SetUserInviteCodeParams);`

此接口用于在其他接口不满足需求时使用

**参数说明**

| 字段				| 类型	| 必填| 说明																																								|
| ---					| ---		| ---	| ---																																									|
| uid					| String| 是	|用户Id																																								|
| myInviteCode| String| 否	|自行指定邀请码（不可与其他账号邀请码重复），如果不传此字段则自动生成不重复的6位邀请码|

**响应参数**

| 字段				  | 类型	  | 必填 | 说明						|
| ---					| ---		| ---	| ---							|
| code				| Number| 是	  |错误码，0表示成功|
| message					| String| 是	  |详细信息					|
| myInviteCode| String| 是	  |最终设置的邀请码	|

### 用户接受邀请

此接口用于在注册之后再填写邀请码的场景，多数情况下不会用到此接口而是在注册时填写邀请码

用法：`uniID.acceptInvite(Object AcceptInviteParams);`

**参数说明**

| 字段			| 类型	| 必填| 说明					|
| ---				| ---		| ---	| ---						|
| uid				| String| 是	|用户Id					|
| inviteCode| String| 是	|邀请人的邀请码	|

**响应参数**

| 字段				  | 类型	  | 必填 | 说明						|
| ---					| ---		| ---	| ---							|
| code				| Number| 是	  |错误码，0表示成功|
| message					| String| 是	  |详细信息					|

### 获取接受邀请的用户清单

用法：`uniID.getInvitedUser(Object GetInvitedUserParams);`

此接口用于在其他接口不满足需求时使用

**参数说明**

| 字段			| 类型		| 必填| 说明												|
| ---				| ---			| ---	| ---													|
| uid				| String	| 是	|用户Id												|
| level			| Number	| 否	|指定获取第几级邀请用户，默认1|
| limit			| Number	| 否	|指定返回列表长度，默认20			|
| offset		| Number	| 否	|指定列表偏移量，默认0				|
| needTotal	| Boolean	| 否	|是否需要返回总数，默认false	|

**响应参数**

| 字段				| 类型	| 必填| 说明						|
| ---					| ---		| ---	| ---							|
| code				| Number| 是	|错误码，0表示成功|
| message					| String| 是	|详细信息					|
| invitedUser	| Array	| 是	|邀请的用户列表		|

**invitedUser每项结构**

| 字段				| 类型	| 必填| 说明															|
| ---					| ---		| ---	| ---																|
| username		|String	|-		|被邀请者用户名											|
| mobile			|String	|-		|被邀请者手机号											|
| invite_time	|String	|-		|被邀请者注册时间，以时间戳形式返回	|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code && payload.code > 0) {
  	return payload
  }
	const res = await uniID.getUserInfo({
    uid: payload.uid,
    limit: 10,
    offset: 0,
    needTotal: true
  })
	return res
}
```

# 数据库结构

## 用户表

表名：uni-id-users

| 字段						| 类型			| 必填| 描述																											|
| ----------------| ---------	| ----| -------------------------------------------								|
| \_id						| Object ID	| 是	| 存储文档 ID（用户 ID），系统自动生成											|
| username				| String		| 是	| 用户名，不允许重复																				|
| password				| String		| 否	| 密码，加密存储																						|
| nickname				| String		| 否	| 用户昵称																									|
| gender					| Integer		| 否	| 用户性别：0 未知 1 男性 2 女性														|
| status					| Integer		| 是	| 用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝								|
| mobile					| String		| 否	| 手机号码																									|
| mobile_confirmed| Integer		| 否	| 手机号验证状态：0 未验证 1 已验证													|
| email						| String		| 否	| 邮箱地址																									|
| email_confirmed	| Integer		| 否	| 邮箱验证状态：0 未验证 1 已验证														|
| avatar					| String		| 否	| 头像地址																									|
| wx_unionid			| String		| 否	| 微信unionid																								|
| wx_openid				| Object		| 否	| 微信各个平台openid																				|
| ali_openid			| String		| 否	| 支付宝平台openid																					|
| comment					| String		| 否	| 备注																											|
| realname_auth		| Object		| 否	| 实名认证信息																							|
| register_date		| Timestamp	| 否	| 注册时间																									|
| register_ip			| String		| 否	| 注册时 IP 地址																						|
| last_login_date	| Timestamp	| 否	| 最后登录时间																							|
| last_login_ip		| String		| 否	| 最后登录时 IP 地址																				|
| login_ip_limit	| Array			| 否	| 登录 IP 限制																							|
| inviter_uid			| Array			| 否	| 邀请人uid，按层级从下往上排列的uid数组，即第一个是直接上级|
| my_invite_code	| String		| 否	| 用户自己的邀请码																					|
| role						| Array			| 否	| 用户角色列表，由role_id组成的数组													|

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

## 角色表

表名：`uni-id-roles`

| 字段				| 类型			| 必填| 描述																	|
| ----------	| ---------	| ----| --------------------------------------|
| \_id				| Object ID	| 是	| 系统自动生成的Id											|
| role_id			| String		| 是	| 角色唯一标识													|
| role_name		| String		| 否	| 角色名，展示用												|
| permission	| Array			| 是	| 角色拥有的权限列表										|
| comment			| String		| 否	| 备注																	|
| created_date| Timestamp	| 是	| 角色创建时间													|

## 权限表

表名：`uni-id-permissions`

| 字段						| 类型			| 必填| 描述																	|
| ----------			| ---------	| ----| --------------------------------------|
| \_id						| Object ID	| 是	| 系统自动生成的Id											|
| permission_id		| String		| 是	| 权限唯一标识													|
| permission_name	| String		| 否	| 权限名，展示用												|
| comment					| String		| 否	| 备注																	|
| created_date		| Timestamp	| 是	| 权限创建时间													|

# 错误码

自`1.1.0`版本使用此错误码规范

|模块											|模块码	|错误代码	|错误信息																									|
|:-:											|:-:		|:-:			|:-:																											|
|登录通用模块							|100		|01				|（10001）账号已禁用																								|
|账号、邮箱、手机+密码登录|101		|01				|（10101）用户不存在																								|
|													|				|02				|（10102）密码错误																									|
|													|				|03				|（10103）密码错误次数过多																					|
|手机号验证码登录/注册		|102		|01				|（10201）手机号已存在（传入type='register'且手机号已注册时触发）	|
|													|102		|02				|（10202）此手机号尚未注册（传入type='login'且手机号未注册时触发）	|
|													|102		|03				|（10203）邀请码无效（邀请码存在且唯一时才算有效）									|
|邮箱验证码登录/注册			|103		|01				|（10301）此邮箱已注册（传入type='register'且邮箱已注册时触发）		|
|													|103		|02				|（10302）此邮箱尚未注册（传入type='login'且邮箱未注册时触发）			|
|微信登录/注册						|104		|01				|（10401）获取openid失败																						|
|支付宝登录/注册					|105		|01				|（10501）获取openid失败																						|
|注册通用模块							|200		|-				|-																												|
|账号、邮箱、手机+密码注册|201		|01				|（20101）用户名、邮箱、手机号必填一项															|
|													|				|02				|（20102）用户名、邮箱、手机号冲突																	|
|Token类									|300		|-				|-																												|
|生成Token								|301		|-				|-																												|
|验证Token								|302		|01				|（30201）设备特征校验未通过																				|
|													|				|02				|（30202）云端已不包含此token																			|
|													|				|03				|（30203）token已过期																							|
|													|				|04				|（30204）token校验未通过																					|
|账号安全类								|400		|-				|-																												|
|登出											|401		|-				|-																												|
|修改密码									|402		|01				|（40201）用户不存在																								|
|													|				|02				|（40202）旧密码错误																								|
|重置密码									|403		|-				|-																												|
|验证类										|500		|-				|-																												|
|设置验证码								|501		|01				|（50101）参数错误																									|
|校验验证码								|502		|01				|（50201）参数错误																									|
|													|				|02				|（50202）验证码错误或已失效																				|
|发送短信验证码						|503		|01				|（50301）验证码发送失败，一般message内有描述											|
|绑定账号									|600		|-				|-																												|
|绑定手机号								|601		|01				|（60101）此手机号已被绑定																					|
|绑定邮箱									|602		|01				|（60201）此邮箱已被绑定																						|
|绑定微信									|603		|01				|（60301）获取openid失败																						|
|													|				|02				|（60302）此账号已被绑定																						|
|绑定支付宝								|604		|01				|（60401）获取openid失败																						|
|													|				|02				|（60402）此账号已被绑定																						|
|解绑账号									|700		|-				|-																												|
|解绑手机号								|701		|01				|（70101）解绑失败，可能已经解绑或者账号不匹配											|
|解绑邮箱									|702		|01				|（70201）解绑失败，可能已经解绑或者账号不匹配											|
|解绑微信									|703		|01				|（70301）解绑失败，可能已经解绑																		|
|解绑支付宝								|704		|01				|（70401）解绑失败，可能已经解绑																		|
|基础功能									|800		|-				|-																												|
|更新用户信息							|801		|01				|（80101）参数错误																									|
|设置头像									|802		|-				|-																												|
|获取用户信息							|803		|01				|（80301）未查询到用户信息																					|
|设置用户自己的邀请码			|804		|01				|（80401）邀请码设置失败，验证码重复或自动设置重试多次依然重复			|
|													|				|02				|（80402）邀请码重试多次依然重复																		|
|填写邀请人邀请码					|805		|01				|（80501）邀请码无效（邀请码存在且唯一时才算有效）									|
|													|				|02				|（80502）uid错误，用户不存在																			|
|													|				|03				|（80503）邀请码不可修改																						|
|获取微信openid						|806		|01				|（80601）未能获取openid																						|
|													|				|02				|（80602）调用获取openid接口失败																		|
|获取支付宝openid					|807		|01				|（80701）未能获取openid																						|
|													|				|02				|（80702）调用获取openid接口失败																		|
|公用码										|900		|01				|（90001）数据库读写异常																						|

**另外还有一些字符串类型的扩展错误码在各自接口的文档中展示，请不要直接使用`code>0`这种方式来判断是否有错误**

# FAQ

- token数组为什么越来越长
  + 每次登录成功都会新增一个token，并且检查所有token的有效期删除过期token。正常情况下客户端应该判断持久化存储的token是否还在有效期内，如果还有效就直接进入应用，不再执行登录。这样相当于用户的每个设备上都存在一个有效期内的token，云端也是。

- 复制token到其他环境校验不通过
  + uni-id内会校验客户端ua，如果是在本地调试可以在云函数内修改`context.CLIENTUA`为生成token的设备ua，切记上线删除此逻辑。如果不需要设备和token绑定，可以在config内配置`bindTokenToDevice: false`来关闭绑定

- username、email、mobile三个字段
  + 三个字段均可能为空，但是建议限制一下插入数据库三个字段的格式，比如username不应是邮箱格式或手机号格式，因为登录时可以选择使用username或mobile或email+密码的方式

- 关于邀请码
  + 目前仅手机号+验证码的注册方式支持填写邀请码
