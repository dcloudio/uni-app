# 需求背景

99%的应用，都要开发用户注册、登录、发送短信验证码、密码加密保存、修改密码、token管理等功能，从前端到后端都需要。

为什么不能有一个开源的通用项目，避免大家的重复开发呢？

`uni-id`应需而生。

`uni-id`为`uniCloud`开发者提供了简单、统一、可扩展的用户管理能力封装。

[clientDB](uniCloud/clientDB)、[DB Schema](uniCloud/schema)、[uniCloud admin](uniCloud/admin)，这些产品都基于`uni-id`的账户体系。可以说`uni-id`是uniCloud不可或缺的基础能力。

# 组成部分

`uni-id`包括如下组成部分：

1.云数据库

主表为 `uni-id-users` 表，保存用户的基本信息。扩展字段有很多，如实名认证数据、工作履历数据，开发者可以自由扩展。

还有 uni-id- 开头的十几个附表，比如权限表`uni-id-permissions`、角色表`uni-id-roles`、积分表`uni-id-scores`、设备表`uni-id-device`...

所有`uni-id`的数据表，在uniCloud web控制台新建表的界面上，都可以选择这些数据表模板，直接建好。

2.云函数

提供一个名为`uni-id`的公共模块，该模块封装了一系列API，包括注册、登录、修改密码、设置头像等。

示例工程中还提供了一个`user-center`的云函数，演示在云函数中如何调用`uni-id`公共模块。推荐使用[云端一体登录插件](https://ext.dcloud.net.cn/plugin?id=13)

3.前端调用

前端示例通过callfunction调用云函数`user-center`，在注册和登录时保存token。在这个[云端一体登录插件](https://ext.dcloud.net.cn/plugin?id=13)里，有完整的登录、注册、修改密码等前后端代码示例。[详见](https://ext.dcloud.net.cn/plugin?id=13)

uniCloud框架底层，会自动在callfunction时传递`uni-id`的token（uni-app 2.7.13+版本）。在云函数的event中可直接拿到`uni-id`的token。也就是说开发者无需自己管理token了。

# uni-id 对开发者的价值

1. 节省了大量重复劳动
2. 降低门槛，前端开发者无需纠结怎样设计数据库设计才更合理
3. 多系统打通用户和上下游协同

关于第三点，着重强调下。

一个应用，往往需要集成多个功能模块。比如一个电商应用，需要一个基本电商模板，还需要客服聊天模板，甚至还需要用户交流社区。

在插件市场，每类模板插件都能找到，但他们如果不是基于同一套用户体系设计，就很难整合。

所有uniCloud的应用，几乎都基于`uni-id`来做。

有了统一的账户规范，并且围绕这套账户规范，有各种各样插件，那么开发者可以随意整合这些插件，让数据连同。

规范，还可以让上下游充分协同。插件市场会出现各种数据迁移插件，比如把从discuz里把用户迁移到`uni-id`中的插件，相信围绕这套规范的产业链会非常活跃。

事实上，[clientDB](uniCloud/clientDB)、[DB Schema](uniCloud/schema)、[uniCloud admin](uniCloud/admin)等重要uniCloud产品，以及插件市场上各种优秀的轮子，都是基于`uni-id`的。

# 现状和未来

`uni-id`已完成的内容：

- 注册、登录、发送短信验证码、密码加密保存、修改密码、token管理（短信验证码功能需要HBuilderX 2.8.3+）
- App手机号一键认证，免验证码
- 三方登录：App中的微信登录和Apple ID、微信小程序中的微信登录、支付宝小程序中的支付宝账户登录 
- rbac权限角色体系

关于还缺少的部分，哪些DCloud在完善，哪些希望开发者给共同完善开源项目，计划与边界公布如下：

1.部分社交账户登录

DCloud暂无计划开发百度、头条、QQ等小程序的登录，以及微博、QQ等App端的登录。欢迎其他开发者在开源项目上提交pr，共同完善`uni-id`。

2.邮箱验证集成

发送邮件验证邮箱真实性，DCloud暂无计划开发，有需求的开发者欢迎提供pr。

3.活体检测

目前插件市场里已经有不少相关插件，未来DCloud会整合到`uni-id`中。

其他方面，各种常见开源项目如discuz、wordPress、ecshop的用户导入插件，不属于`uni-id`主工程，欢迎开发者单独提交插件到插件市场。

`uni-id`的git仓库：[https://gitee.com/dcloud/uni-id.git](https://gitee.com/dcloud/uni-id.git)


# 快速上手

使用uni-id需要按照以下步骤操作

**uni_modules版**

1. HBuilderX 3.1.0+
2. 插件市场导入`uni-id`公用模块uni_modules版本，HBuilderX会自动导入依赖的`uni-config-center`，[插件市场 uni-id](https://ext.dcloud.net.cn/plugin?id=2116)
3. 在`uni-config-center`公用模块下创建`uni-id`目录，在创建的uni-id目录下再创建`config.json`文件配置uni-id所需参数（请参考下面config.json的说明），**注意：如果HBuilderX版本低于3.1.8，批量上传云函数及公共模块后需要单独再上传一次uni-id**
4. 在`cloudfunctions/common`下上传`uni-id`模块
5. 在要使用`uni-id`的云函数右键选择`管理公共模块依赖`添加`uni-id`到云函数
6. 创建`uni-id-users`、`opendb-verify-codes`集合（opendb-verify-codes是验证码表。可以使用示例项目里面的db_init.json进行初始化、也可以在web控制台新建表时选择这些表模块）

**非uni_modules版本**

1. HBuilderX 2.9+
2. 插件市场导入`uni-id`公用模块，[插件市场 uni-id](https://ext.dcloud.net.cn/plugin?id=2116)
3. 修改公用模块`uni-id`下的`config.json`内所需参数（请参考下面config.json的说明）
4. 上传`cloudfunctions/common`下的`uni-id`模块
5. 按照[公用模块使用说明](/uniCloud/cf-common)在云函数下安装`uni-id`模块
6. 创建`uni-id-users`、`opendb-verify-codes`集合（opendb-verify-codes是验证码表。可以使用示例项目里面的db_init.json进行初始化、也可以在web控制台新建表时选择这些表模块）

或者直接导入[uni-id在插件市场的示例工程](https://ext.dcloud.net.cn/plugin?id=2116)

## config.json的说明

注意：

- **config.json是一个标准json文件，不支持注释**
- 如果不希望使用config.json初始化而是想自行传入参数（一般不推荐这么做），可以使用`init`方法[uniID.init](/uniCloud/uni-id?id=init)

> 在云函数URL化的场景无法获取客户端平台信息，可以在调用uni-id相关接口之前（推荐在云函数入口）通过修改context.PLATFORM手动传入客户端平台信息

例：

```js
exports.main = async (event, context) => {
	context.PLATFORM = 'app-plus'
}
```

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

> ！！！重要！！！ passwordSecret与tokenSecret十分重要，切记妥善保存（不要直接使用下面示例中的passwordSecret与tokenSecret）。修改passwordSecret会导致老用户使用密码无法登录，修改tokenSecret会导致所有已经下发的token失效。如果重新导入uni-id切勿直接覆盖config.json相关配置

```json
// 如果拷贝此内容切记去除注释
{
	"passwordSecret": "passwordSecret-demo", // 数据库中password字段是加密存储的，这里的passwordSecret即为加密密码所用的密钥，注意修改为自己的密钥，使用一个较长的字符串即可
	"tokenSecret": "tokenSecret-demo", // 生成token所用的密钥，注意修改为自己的，使用一个较长的字符串即可
	"tokenExpiresIn": 7200, // 全平台token过期时间，未指定过期时间的平台会使用此值
	"tokenExpiresThreshold": 600, // 新增于uni-id 1.1.7版本，checkToken时如果token有效期小于此值则自动获取新token，请注意将新token返回给前端保存，如果不配置此参数则不开启自动获取新token功能
	"bindTokenToDevice": false, // 是否将token和设备绑定，设置为true会进行ua校验，uni-id 3.0.12前默认为true，3.0.12及以后版本默认调整为false
	"passwordErrorLimit": 6, // 密码错误最大重试次数
	"passwordErrorRetryTime": 3600, // 密码错误重试次数超限之后的冻结时间
	"autoSetInviteCode": false, // 是否在用户注册时自动设置邀请码，默认不自动设置
	"forceInviteCode": false, // 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）,设置为true时需要在loginBySms时指定type为register来使用注册，登录时也要传入type为login
  "removePermissionAndRoleFromToken": false, // 新增于uni-id 3.0.0版本，如果配置为false则自动缓存用户的角色、权限到token中，默认值为false。详细说明见https://uniapp.dcloud.io/uniCloud/uni-id?id=cachepermissionintoken
	"app-plus": {
		"tokenExpiresIn": 2592000,
		"oauth": {
			// App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
			"weixin": {
				"appid": "weixin appid",
				"appsecret": "weixin appsecret"
			},
			"apple": { // 使用苹果登录时需要
				"bundleId": "your bundleId"
			}
		}
	},
	"mp-weixin": {
		"tokenExpiresIn": 259200,
		"oauth": {
			// 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
			"weixin": {
				"appid": "weixin appid",
				"appsecret": "weixin appsecret"
			}
		}
	},
	"mp-alipay": {
		"tokenExpiresIn": 259200,
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
		},
		"univerify": {
      "appid": "your appid", // 当前应用的appid，使用云函数URL化，此项必须配置
			"apiKey": "your apiKey",// apiKey 和 apiSecret 在开发者中心获取，开发者中心：https://dev.dcloud.net.cn/uniLogin/index?type=0，文档：https://ask.dcloud.net.cn/article/37965
			"apiSecret": "your apiSecret"
		}
	}
}
```

**关于token自动刷新**

tokenExpiresThreshold用于指定token还有多长时间过期时自动刷新token。

例：指定`tokenExpiresThreshold:600,tokenExpiresIn:7200`，token过期时间为2小时，在token有效期不足10分钟时自动刷新token

在token还有5分钟过期时调用checkToken接口会返回新的token和新的token的过期时间（新token有效时间也是2小时），需要前端主动保存此新token。

# 用户角色权限@rbac

为什么需要角色权限管理？
- 对于后台管理系统，比如[uniCloud admin](/uniCloud/admin)，除了超级管理员，不同账号通常需根据职位、责任设定不同的系统权限。
- [clientDB](/uniCloud/database)允许前端直接操作数据库，但部分字段应该是系统计算或管理员设置的，比如文章的阅读数、收藏数及是否加精置顶，这些字段不允许普通用户在前端通过clientDB直接修改，此时也需要通过权限控制来保证系统的安全稳定。 

`uni-id`基于经典的RBAC模型实现了角色权限系统。

## RBAC模型简介

RBAC：Role-Based Access Control，基于角色的访问控制。

其基本思想：对系统操作的各种权限不是直接授予具体的用户，而是在用户集合与权限集合之间建立一个角色集合。每一种角色对应一组相应的权限。一旦用户被分配了适当的角色后，该用户就拥有此角色的所有权限。

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/431878b0-0ca0-11eb-8a36-ebb87efcf8c0.png)

这样做的好处是，增强系统管理的扩展性，对于批量用户的权限变更，仅需变更该批用户角色对应权限即可，而无需对该批每个用户变更权限。

这个模型有三个关键名词：用户、角色、权限：
- 用户：使用系统的人，一个用户可以同时有多个角色
- 角色：权限的集合，一个角色可以有多个权限
- 权限：数据权限或业务权限，例如：删除用户、删除评论等

## 用户

用户信息存储在`uni-id-users`表中，然后通过`role`字段保存该用户所拥有的所有角色ID，角色ID即角色表（`uni-id-roles`表）中的`role_id`字段，注意不是`_id`字段。

```
{
  {
    "_id":"5f8428181c229600010389f6",
    "username":"uniapp",
    "email":"hr2013@dcloud.io",
    "role":[
      "USER_ADMIN",
      "NOTICE_ADMIN"
    ],
    "created_date":1602495783272
  }  
}
```

>Tips：将用户角色设计为用户表的字段，而没有新建`用户角色关联表`的原因：避免mongodb在跨表查询时的性能开销

## 角色

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

```js
{
  {
    "_id":"5f8428181c229600010389f6",
    "role_id":"USER_ADMIN",
    "role_name":"人事管理",
    "permission":[
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
    "permission":[
      "NOTICE_ADD",
      "NOTICE_EDIT",
      "NOTICE_DEL"
    ],
    "created_date":1602495784372
  }  
}
```

如下是角色在clientDB中的配置示例：

```js
// db-permission/uni-id-users.js

{
  "update":"doc._id == auth.uid || 'USER_ADMIN' in auth.role" //用户自己或人事管理员可执行用户表的.update操作
}
```

>Tips1：uni-id中`admin`为超级管理员角色，uni-clientDB也基于同样的策略；如果用户角色包含`admin`，则该用户就拥有所有数据表的全部权限。

>Tips2：出厂时可内置常用角色，也可上线后由运营人员动态创建角色。

## 权限

权限信息在`uni-id-permissions`表中，表结构定义如下：

| 字段						| 类型			| 必填| 描述																	|
| ----------			| ---------	| ----| --------------------------------------|
| \_id						| Object ID	| 是	| 系统自动生成的Id											|
| permission_id		| String		| 是	| 权限唯一标识													|
| permission_name	| String		| 否	| 权限名，展示用												|
| comment					| String		| 否	| 备注																	|
| created_date		| Timestamp	| 是	| 权限创建时间													|

其中，`permission_id`为权限标志，全局唯一，可用于clientDB中的权限配置，建议按照语义化命名，例如：`USER_DEL`、`BRANCH_ADD`。**权限总数量不得超过500**

如下为示例内容：

```js
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

```js
// db-permission/uni-id-users.js

{
  "update":"doc._id == auth.uid || 'USER_EDIT' in auth.permission" //用户自己或有`USER_EDIT`权限的用户，可执行用户表的.update操作
}
```

>Tips1：建议出厂时内置所有权限，方便clientDB中的权限配置。

## 其他说明

uni-id针对角色权限模块封装了丰富的API，比如：获取用户角色、获取某角色下的所有权限等，详情参考：[角色权限API](uniCloud/uni-id.md?id=rbac-api)。

uni-id登录注册接口可接收`needPermission`参数，若`needPermission`配置为true时，后续会在`checkToken`接口返回用户权限列表（permission）。如下是通过token判断权限的简单示例：

```js
// 简单的权限校验示例
function hasPermission(token, permission) {
  const checkTokenRes = await uniID.checkToken(token)
  return checkTokenRes.permission.includes(permission)
}
```

注意：**在uniCloud admin中，封装了可视化的用户、权限、角色的管理，新增删除修改均支持。**无需自己维护。[详见](https://uniapp.dcloud.net.cn/uniCloud/admin?id=mutiladmin)

**如果需要管理多端的用户，建议使用type在uni-id-users表内进行区分，不要分多个表**

# uni-id的API列表@api

`uni-id`作为一个云函数的公共模块，暴露了各种API，供云函数调用。

## 基础功能

### 创建uni-id实例@create-instance

> uni-id 3.0.7及以上版本

用法：`uniID.createInstance(Object CreateInstanceParams);`

CreateInstanceParams内可以传入云函数context

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
  const uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
    context: context,
    // config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
  })
  payload = await uniIDIns.checkToken(event.uniIdToken) // 后续使用uniIDIns调用相关接口
  if (payload.code) {
  	return payload
  }
	const res = await uniIDIns.updateUser({
    uid: payload.uid,
    nickname: 'user nickname'
  })
	return res
}
```

**为什么需要自行创建uni-id实例**

默认情况下uni-id某些接口会自动从全局context内获取客户端的PLATFORM（平台，如：app-plus、h5、mp-weixin）信息。但是在单实例多并发的场景下可能无法正确获取（全局对象会被后面的请求覆盖，可能会导致前面一次请求使用了后面一次请求的PLATFORM信息）。因此推荐在开启云函数单实例多并发后，自行为uni-id传入context。

### 用户注册 @register
用户注册就是将客户端用户输入的用户名和密码，经服务端：
1. 校验用户名是否与已经注册的用户名重复，如果重复就返回错误
2. 加密密码
3. 生成token
最后将`用户名` `密码` `token`存储到数据库并返回token、uid等响应参数（详见下文“响应参数”表）的过程。

如上操作uni-id的注册api内部会自动完成
用法`uniID.register(Object RegisterParams)`

**注意**

- 注册成功之后会返回token，在获取token之后应进行持久化存储，键值为：`uni_id_token、uni_id_token_expired`，例：`uni.setStorageSync('uni_id_token',res.result.token)`

**参数说明**

| 字段					| 类型		| 必填| 说明																																					|
| ---						| ---			| ---	| ---																																						|
| username			| String	| 是	|用户名，唯一																																		|
| password			| String	| 是	|密码																																						|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission）。`uni-id 3.0.0`起，如果配置`"removePermissionAndRoleFromToken": false`此选项不再生效	|
| myInviteCode	| String	| 否	|自行设置用户的邀请码																														|
| role	| Array	| 否	|设定用户角色												|

username可以是字符串、可以是email、可以是手机号，本插件不约束，开发者可以自己定。

比如要求username为手机号，则自行在前端界面上做好提示，在后台对格式进行校验。

password入库时会自动进行一次sha1加密，不明文存储密码。这是一种单向不可逆加密方式，强度高于md5，密钥是开发者在config.json里自行配置的passwordSecret。

即用户注册时输入的密码，通过密钥passwordSecret使用sha1算法加密，然后再入库。

由于是不可逆加密，理论上数据库泄露或passwordSecret泄露都不会造成用户的真实密码被泄露。

但任何加密算法，在撞库等暴力手段面前被攻破只是时间和算力问题。使用自己特定的而不是默认的passwordSecret，并保护好passwordSecret可以数倍提升破解的算力代价。

uni-id公共模块没有限制密码的强度，如长度限制、是否包含大小写或数据等限制，这类限制需要开发者自行在云函数中处理。

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
// 云函数register的代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		username,
		password
	} = event
  //自己额外增加的校验密码规范的逻辑（可选）
  //强弱密码校验,密码至少包含大写字母，小写字母，数字，且不少于6位
  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(password)){
    return {
      code: 401,
      msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
    }
  }
	// 自动验证用户名是否与已经注册的用户名重复，如果重复会直接返回错误。否则会自动生成token并加密password存储username、password、token到数据表uni-id-users，并返回如上响应参数
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
			// 2.8.0版本起调整为蛇形uni_id_token（调整后在一段时间内兼容驼峰uniIdToken）
			uni.setStorageSync('uni_id_token',res.result.token)
			uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
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
登录就是通过查询数据库验证，客户端传递的“用户名”和“密码”是否匹配并返回token、uid等响应参数（详见下文“响应参数”表）的过程。
如果你允许用户同时使用多种方式登录，需要注意：必须限制用户注册用户名不为邮箱格式且不为手机号格式，uni-id内部并未做出此类限制。否则用户可以使用他人的手机号码作为用户名注册账号，这就成了一个漏洞。具体做法可以参考[云端一体应用快速开发模版"uniStarter"](https://ext.dcloud.net.cn/plugin?id=5057)


用法：`uniID.login(Object LoginParams)`

**注意**

- 登录成功之后会返回token，在获取token之后应进行持久化存储，键值为：`uni_id_token、uni_id_token_expired`，例：`uni.setStorageSync('uni_id_token',res.result.token)`
- 登录时请注意自行验证数据有效性

**参数说明**

| 字段		| 类型	| 必填	| 说明	|
| ---		| ---	| ---	| ---	|
| username	| String| 是	|用户名	|
| password	| String| 是	|密码	|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission）。`uni-id 3.0.0`起，如果配置`"removePermissionAndRoleFromToken": false`此选项不再生效	|
| queryField	| Array| 否	|指定从哪些字段中比对username（传入参数均为username），不填默认与数据库内的username字段对比, 可取值'username'、'email'、'mobile'|

**注意**

- 使用邮箱时需要用户对应的记录里`email_confirmed`为1才可以登录，手机号同样需要`mobile_confirmed`为1才可以登录

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
	// 自动完成username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password,
    queryField: ['username', 'email', 'mobile']
	})
	return res
}
```

### token校验@checktoken
一个校验客户端发起请求（uniCloud.callFunction）自带的uniIdToken，获得用户的uid、token、token的过期时间、角色、权限、用户信息(uni-id-users全部字段)的API。

这是非常高频且重要的API通常用于换取操作当前云函数的用户Id。

#### 思考
如果你并没有服务端开发经验，可能会想：为什么需要通过token去换取用户Id，而不是让客户端直接传递用户Id更方便？
这里就涉及到安全问题，有一句话叫做：“前端传递的参数都是不可信任的”。比如：你去银行取款，柜台会要求出示你的身份证来证明你是谁，而不是你直接告诉银行柜台你是谁就管用。否则这是一个极大的安全漏洞。
综上所述：所有服务端操作涉及账户信息相关内容，都需要使用token来获得，而不是使用前端传递的参数。

用法：`uniID.checkToken(String token, Object checkTokenOptions)`

**参数说明**

| 字段							| 类型	| 必填| 说明												|
| ---								| ---		| ---	| ---													|
| token							| String| 是	|客户端callFunction带上的token|
| checkTokenOptions	| Object| 是	|checkToken选项`uni-id 3.0.0`版起支持								|

**checkTokenOptions说明**

| 字段					| 类型		| 必填| 默认值|说明													|
| ---						| ---			| ---	|---		| ---													|
| needPermission| Boolean	| 否	|false		|是否需要返回角色权限，请阅读下方说明|
| needUserInfo | Boolean	| 否	|true			|是否需要返回用户信息。|

**说明**

- `needPermission`参数仅对token内未缓存角色权限且token内不包含needPermission的场景生效。
- 如果在token内缓存角色权限，建议将此`needUserInfo`参数配置为`false`
- 角色内包含admin时返回的permission是一个空数组，因此判断一个用户是否有权限时应注意admin角色额外进行判断

请务必阅读一下此文档：[关于缓存角色权限的说明](uniCloud/uni-id.md?id=cachepermissionintoken)

**响应参数**

| 字段				| 类型			| 说明																																																										|
| ---					| ---				| ---																																																											|
| code				| Number		|错误码，0表示成功																																																				|
| message			| String		|详细信息																																																									|
| uid					| String		|用户Id，校验成功之后会返回																																																|
| token				| String		|新增于uni-id 1.1.7版本，用户token快要过期时，新生成的token，只有在config内配置了`tokenExpiresThreshold`的值时才会有此行为|
| tokenExpired| TimeStamp	|新增于uni-id 1.1.7版本，新token的过期时间																																								|
| role				| Array			|新增于uni-id 1.1.9版本，用户角色列表。`uni-id 3.0.0`以上版本传入`needPermission:true`时返回此字段																																											|
| permission	| Array			|新增于uni-id 1.1.9版本，用户权限列表，只有登录操作时传入needPermission才会返回，否则为空数组。`uni-id 3.0.0`以上版本传入`needPermission:true`时返回此字段															|
| userInfo		| Object		|用户信息，uid对应的uni-id-users全部字段。		|


uni-id使用jwt生成token，jwt所生成的token包含三部分，其中存储的信息为明文信息，uni-id只根据tokenSecret来校验客户端token是否合法。

`uni-id 3.0.0`之前的版本，checkToken必然会查询数据库进行token合法性校验。

`uni-id 3.0.0`起，默认情况下不再查库校验token，角色权限将被缓存在token中，此举能减少或消除checkToken的查库次数（有效节省费用、减少响应时间）。
如需关闭此行为需在config内配置`removePermissionAndRoleFromToken:true`。

更多关于`removePermissionAndRoleFromToken`的说明见：[缓存角色权限](https://uniapp.dcloud.io/uniCloud/uni-id?id=cachepermissionintoken)

**注意：**

- 客户端会自动查找storage内的token在callFunction时插入
- HBuilderX 2.9.5+ 客户端允许开发者自行传入uniIdToken，此时不再从storage获取token
- HBuilderX 2.8.0版本起token存储在storage内推荐使用使用蛇形`uni_id_token`，会在一段时间内兼容驼峰形式`uniIdToken`

**示例代码**

```js
// 云函数list-news代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const payload = await uniID.checkToken(event.uniIdToken)
  const {
    code,
    token,
    tokenExpired
  } = payload
  if(code) { // code不为0代表token校验未通过
    return payload
  }
  // 其他业务代码
  return {
    token,
    tokenExpired
  }
}

// 下面仅为简单示例，可以参考uniCloud admin里面的request进行封装 https://ext.dcloud.net.cn/plugin?id=3268
// 客户端代码
uniCloud.callFunction({
  name: 'list-news',
  data : {}
}).then(res => {
  const {
    token,
    tokenExpired
  } = res.result
  if(token) {
    uni.setStorageSync('uni_id_token', token)
    uni.setStorageSync('uni_id_token_expired', tokenExpired)
  }
  // 其他逻辑...
})

```


### 登出
登出就是一个验证客户端uniCloud.callFunction自带的uniIdToken通过token校验并获取uid，将对应uid的用户的token清除的过程（uniID登出api内部会自动完成，你传入uniIdToken即可）。

用法：`uniID.logout(String token);`

**注意**

- 登出成功之后应删除持久化存储的token，键值为：`uni_id_token`，`uni.removeStorageSync('uni_id_token')`

```js
  uni.removeStorageSync('uni_id_token')
  uni.removeStorageSync('uni_id_token_expired')
```

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
	const res = await uniID.logout(event.uniIdToken)
	return res
}

```

### 生成token@createtoken

注意createToken接口不会将生成的token存库，只是生成token而已

用法：`uniID.createToken(Object CreateTokenParams)`

**参数说明**

| 字段					| 类型		| 必填| 说明																		|
| ---						| ---			| ---	| ---																			|
| uid						| String	| 是	|用户Id																		|
| needPermission| Boolean	| 否	|标识是否需要在checkToken时返回permission	|

**响应参数**

| 字段				| 类型	| 必填| 说明										|
| ---					| ---		| ---	| ---											|
| token				| String| 是	|生成的token							|
| tokenExpired| Number| 是	|token过期时间对应的时间戳|

### 修改密码 @update-password

用法：`uniID.updatePwd(Object UpdatePwdParams)`

**参数说明**

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
  if(payload.code) {
    return payload
  }
  
	const res = await uniID.updatePwd({
    uid: payload.uid,
		oldPassword,
		newPassword
	})
	return res
}
```

### 重置密码 @reset-password

用法：`uniID.resetPwd(Object ResetPwdParams)`

**参数说明**

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
  if(payload.code) {
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

**参数说明**

| 字段								| 类型	| 必填| 说明													|
| ---									| ---		| ---	| ---														|
| password					| String| 是	|要加密的字符串													|

**响应参数**

| 字段	| 类型	| 必填	| 说明						|
| ---	| ---	| ---	| ---						|
| passwordHash	| String| 是	|加密后的字符串		|

**重要**

`2.0.0`版本起`encryptPwd`接口调整为返回对象。结构如下

```js
{
  passwordHash: 'asdajdoaiojfj', // 存储到数据库的密码
  version: 1 // 密钥版本，关于此字段请参考https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=modifysecret
}
```

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

**参数说明**

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
  if(payload.code) {
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

**参数说明**

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
  if (payload.code) {
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
  if (payload.code) {
  	return payload
  }
	const res = await uniID.getUserInfo({
    uid: payload.uid,
    field: ['mobile']
  })
	return res
}
```


### 根据token获取用户信息

自`uni-id 3.0.0`起支持

用法：`uniID.getUserInfoByToken(String token);`

**参数说明**

| 字段	| 类型	| 必填| 说明													|
| ---		| ---		| ---	| ---														|
| token	| String| 是	|用户的token	|

**响应参数**

| 字段			| 类型	| 必填| 说明															|
| ---				| ---		| ---	| ---																|
| code			| Number| 是	|错误码，0表示成功									|
| message		| String| 是	|详细信息														|
| uid				| String| 是	|用户id															|
| role			| Array	| 是	|用户角色列表，需要开启缓存角色权限	|
| permission| Array	| 是	|用户权限列表，需要开启缓存角色权限	|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.getUserInfoByToken(event.uniIdToken)
	return res
  // res = {
  //   uid: 'xxx',
  //   role: [],
  //   permission: []
  // }
}
```

**注意**

- 此接口仅校验token是否合法，从token中获取用户信息。不查库校验token，也不会查库获取用户信息。适用于不想使用checkToken获取用户信息的场景（checkToken内包含其他逻辑，比如自动刷新token等）

### 自行初始化uni-id@init

用法：`uniID.init(Object InitParams);`

此接口仅适用于不希望使用config.json初始化而是希望通过js的方式传入配置的情况，多数情况下不推荐使用。**如果你要使用clientDB，且必须要用这种方式初始化uni-id，必须在uni-id的config.json内也写上同样的配置。**

**参数说明**

InitParams格式与[config.json](https://uniapp.dcloud.io/uniCloud/uni-id?id=configjson%e7%9a%84%e8%af%b4%e6%98%8e)完全相同

**响应参数**

无

```js
// 云函数代码
const uniID = require('uni-id')
uniID.init({ // 如果在此处传入配置信息则不会再使用config.json作为配置
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
  if (payload.code) {
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

### 发送短信验证码@sendsmscode

用法：`uniID.sendSmsCode(Object SendSmsCodeParams)`

**参数说明**

| 字段			| 类型	| 必填| 说明																																																					|
| ---				| ---		| ---	| ---																																																						|
| mobile		| String| 是	|用户手机号																																																			|
| templateId| String| 是	|`uni-id 1.1.8+`用户自定义模板Id，不传则使用uniID_code（请注意目前此模板已经不再开放使用，请传入自定义模板Id，已经报备使用的用户不受影响），请使用类似下面模板示例的参数申请模板												|
| code			| String| 否	|验证码字符串																																																		|
| type			| String| 是	|类型，用于防止不同功能的验证码混用，目前支持的类型`login`登录、`register`注册、`bind`绑定手机、`unbind`解绑手机|

```
// 短信模板示例，请在https://dev.dcloud.net.cn/uniSms申请签名（短信开头中括号内部分）及模板
验证码：${code}，${expMinute}分钟内有效，请勿泄露并尽快验证。
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
如果使用`uni-id`的sendSmsCode发送短信的话会自动设置验证码（在数据表：`opendb-verify-codes`添加一条记录)，否则你需要使用此接口自行在库中设置验证码。

用法：`uniID.setVerifyCode(Object SetVerifyCodeParams)`

**参数说明**

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
一个查库校验：由`uni-id`的sendSmsCode发送短信自动设置或调用uniID.setVerifyCode手动设置的验证码的API

uni-id内置方法`loginBySms`、`bindMobile`、`unbindMobile`均已内置校验验证码方法，如果使用以上方法不需要再调用此接口，如需扩展类型请确保type和发送验证码/设置验证码时对应

用法：`uniID.verifyCode(Object VerifyCodeParams)`

**参数说明**

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

**参数说明**

| 字段					| 类型		| 必填| 说明																																																	|
| ---						| ---			| ---	| ---																																																		|
| mobile				| String	| 是	|用户手机号																																															|
| code					| String	| 是	|验证码																																																	|
| type					| String	| 否	|指定操作类型，可选值为`login`、`register`，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册|
| password			|String		| 否	|密码，type为`register`时生效																																						|
| inviteCode		|String		| 否	|邀请人的邀请码，type为`register`时生效																																	|
| myInviteCode	|String		| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																										|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用													|
| role					| Array		| 否	|设定用户角色，当前用户为新注册时生效																																		|

**响应参数**

| 字段				| 类型	| 必填| 说明																		|
| ---					| ---		| ---	| ---																			|
| code				| Number| 是	|错误码，0表示成功												|
| message			| String| 是	|详细信息																	|
| uid					| String| 是	|用户uid																	|
| type				| String| 是	|操作类型，`login`为登录、`register`为注册|
| userInfo		| Object| 是	|用户全部信息															|
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

### 手机一键登录@univerify

用法：`uniID.loginByUniverify(Object loginByUniverifyParams)`

> 需再[开发者控制台](https://dev.dcloud.net.cn/uniLogin)开通一键登录并在config.json内配置univerify相关信息

**参数说明**

| 字段					| 类型		| 必填| 说明																																																	|
| ---						| ---			| ---	| ---																																																		|
| access_token	| String	| 是	|uni.login登录成功后，返回的`access_token`参数																													|
| openid				| String	| 是	|uni.login登录成功后，返回的`openid`参数																																|
| type					| String	| 否	|指定操作类型，可选值为`login`、`register`，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册|
| password			|String		| 否	|密码，type为`register`时生效																																						|
| inviteCode		|String		| 否	|邀请人的邀请码，type为`register`时生效																																	|
| myInviteCode	|String		| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																										|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用													|
| role					| Array		| 否	|设定用户角色  ，当前用户为新注册时生效																																	|

**响应参数**

| 字段				| 类型	| 说明																		|
| ---					| ---		| ---																			|
| code				| Number| 错误码，0表示成功												|
| message			| String|详细信息																	|
| uid					| String|用户`uid`																|
| type				| String|操作类型，`login`为登录、`register`为注册|
| mobile			| String|登录者手机号															|
| userInfo		| Object|用户全部信息															|
| token				| String|登录成功之后返回的`token`信息						|
| tokenExpired| String|`token`过期时间													|

**示例代码**

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const {
		access_token,
    openid
	} = event
	const res = await uniID.loginByUniverify({
		access_token,
    openid
	})
	return res
}
```

### 绑定手机号@bind-mobile

用法：`uniID.bindMobile(Object BindMobileParams)`

**参数说明**

| 字段				| 类型	| 必填| 说明																																			|
| ---					| ---		| ---	| ---																																				|
| uid					| String| 是	|用户Id，可以通过checkToken返回																							|
| mobile			| String| 否	|用户手机号																																	|
| code				| String| 否	|验证码，为兼容旧版逻辑此参数不填写时不会进行验证码校验，而是直接绑定手机号	|
| access_token| String| 否	|uni.login登录成功后，返回的`access_token`参数															|
| openid			| String| 否	|uni.login登录成功后，返回的`openid`参数																		|
| type				| String| 否	|通过何种方式绑定手机号，sms（手机号验证码）、univerify（一键登录），默认sms|

type为sms时mobile、code必传，type为univerify时access_token、openid必传

**响应参数**

| 字段		| 类型	| 必填| 说明						|
| ---			| ---		| ---	| ---							|
| code		| Number| 是	|错误码，0表示成功|
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
  if(payload.code) {
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

**参数说明**

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
  if(payload.code) {
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

**参数说明**

| 字段					| 类型	| 必填| 说明																																					|
| ---						| ---		| ---	| ---																																						|
| email					| String| 是	|用户邮箱																																				|
| code					| String| 是	|验证码																																					|
| type					| String| 否	|指定操作类型，覆盖存在则登录不存在则注册的默认行为，可选值为`login`、`register`|
| password			|String	| 否	|密码，type为`register`时生效																										|
| myInviteCode	|String	| 否	|设置当前注册用户自己的邀请码，type为`register`时生效														|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| role	| Array	| 否	|设定用户角色	，当前用户为新注册时生效											|

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

**参数说明**

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
  if(payload.code) {
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

**参数说明**

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
  if(payload.code) {
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
- 登录成功之后应持久化存储token、token过期时间，键值为：`uni_id_token、uni_id_token_expired`，例：`uni.setStorageSync('uni_id_token', res.result.token)`
- App端获取code不可直接调用`uni.login`，详细用法可以看下面示例

**APP微信登录详细配置流程**

1. 在manifest.json内配置微信登录用appid
2. **打包**并**使用**自定义基座（注意一定要在manifest.json填写微信appid后再制作自定义基座），[自定义基座使用说明](https://ask.dcloud.net.cn/article/35115)
3. 在uni-id的config.json内app-plus对应的微信登录信息内配置appid和appsecret

**LoginByWexinParams参数说明**

| 字段				| 类型	| 必填| 说明																																																														|
| ---					| ---		| ---	| ---																																																															|
| code				| String| 是	|微信登录返回的code																																																								|
| myInviteCode|String	| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																																							|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| role	| Array	| 否	|设定用户角色	，当前用户为新注册时生效											|

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
| userInfo		    | Object  | 否	|用户全部信息，`type`为`login`时返回								|
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
          content: JSON.stringify(res.result)
        })
        if (res.result.code === 0) {
          uni.setStorageSync('uni_id_token', res.result.token)
          uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
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

**参数说明**

| 字段		| 类型	| 必填| 说明																																																														|
| ---			| ---		| ---	| ---																																																															|
| uid			| String| 是	|用户Id，可以通过checkToken返回																																																		|
| code		| String| 是	|微信登录返回的code																																																								|

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
  if (payload.code) {
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
  if (payload.code) {
  	return payload
  }
	const res = await uniID.unbindWeixin(payload.uid)
	return res
}
```

### 微信数据解密

用法：`uniID.wxBizDataCrypt(Object WxBizDataCryptParams);`

**参数说明**

| 字段| 类型	| 必填| 说明													|
| ---	| ---		| ---	| ---														|
| encryptedData	| String| 是	|包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法。解密后得到的数据结构见后文	|
| iv	| String| 是	|加密算法的初始向量	|
| code	| String| `sessionKey`二选一	|微信登录返回的code	|
| sessionKey	| String| `code`二选一	|用户的会话密钥，可通过uniID.code2SessionWeixin(code)获取	|

**注意**

- `code`参数和`sessionKey`参数必须选填一个。如果有`sessionKey`则使用此值进行解密，否则尝试使用`code`去获取`sessionKey`，若两个都没有则报错。

**响应参数**

| 字段| 类型	| 说明						|
| ---	| ---			| ---							|
| code| Number	|错误码，0表示成功|
| message	| String	|详细信息					|
| 解密数据	| String	|具体数据由微信接口解密为准					|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	return uniID.wxBizDataCrypt(event)
}
```

## 支付宝小程序

### 支付宝登录

用法：`uniID.loginByAlipay(Object LoginByAlipayParams);`

**注意**

- 需要在config.json内支付宝平台下配置appid和privateKey（应用私钥）
- 登录成功之后应持久化存储token，键值为：`uni_id_token、uni_id_token_expired`，例：`uni.setStorageSync('uni_id_token', res.result.token)`

**LoginByAlipayParams参数说明**

| 字段				| 类型	| 必填| 说明																																																														|
| ---					| ---		| ---	| ---																																																															|
| code				| String| 是	|支付宝登录返回的code																																																							|
| myInviteCode| String| 否	|设置当前注册用户自己的邀请码，type为`register`时生效																																							|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| role	| Array	| 否	|设定用户角色	，当前用户为新注册时生效											|

**响应参数**

| 字段						| 类型		| 必填| 说明																		|
| ---							| ---			| ---	| ---																			|
| code						| Number	| 是	|错误码，0表示成功												|
| message							| String	| 是	|详细信息																	|
| uid							| String	| 是	|用户uid																	|
| type						| String	| 是	|操作类型，`login`为登录、`register`为注册|
| openid					| String	| 是	|用户openid																|
| token						| String	| 是	|登录成功之后返回的token信息							|
| userInfo		| Object| 是	|用户全部信息，`type`为`login`时返回								|
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
| code		| String| 是	|支付宝登录返回的code																																																								|

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
  if (payload.code) {
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
  if (payload.code) {
  	return payload
  }
	const res = await uniID.unbindAlipay(payload.uid)
	return res
}
```

## Apple（苹果）

### Apple登录@loginbyapple

用法：`uniID.loginByApple(Object LoginByAppleParams);`

**注意**

- 需要在config.json内的 app-plus > oauth > apple 下配置 bundleId
- 登录成功之后应持久化存储token，键值为：uni_id_token，`uni.setStorageSync('uni_id_token', res.result.token)`

**LoginByAppleParams参数说明**

| 字段				| 类型	| 必填| 说明																																						   						|
| ---					| ---		| ---	| ---																																     	     			|
| identityToken  |String	| 是	|uni.login使用apple登录后，uni.getUserInfo返回的identityToken								  					|
| nickName  |String	| 否	| 若无nickName，则读取fullName，若fullName也无效，则使用email												     			|
| fullName  |Object	| 否	| uni.login使用apple登录后，uni.getUserInfo返回的fullName												     			|
| type				| String| 否	| 指定操作类型，可选值为`login`、`register`，不传此参数时表现为已注册则登录，未注册则进行注册|
| myInviteCode| String| 否	| 设置当前注册用户自己的邀请码，type为`register`时生效					          							|
| needPermission| Boolean	| 否	|设置为true时会在checkToken时返回用户权限（permission），建议在管理控制台中使用	|
| role	| Array	| 否	|设定用户角色	，当前用户为新注册时生效											|

**响应参数**

| 字段						| 类型		| 说明																		|
| ---							| ---			| ---																			|
| code						| Number	|错误码，0表示成功												|
| message							| String	|详细信息																	|
| uid							| String	|用户uid																	|
| type						| String	|操作类型，`login`为登录、`register`为注册|
| openid					| String	|用户openid																|
| token						| String	|登录成功之后返回的token信息							|
| userInfo		| Object|用户全部信息								|
| tokenExpired		| String	|token过期时间														|

**示例代码**

```js
// 云函数login-by-apple代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.loginByApple(event)
	return res
}

// 客户端代码
// 代码较长建议直接参考插件市场示例项目：https://ext.dcloud.net.cn/plugin?id=2116
let AuthService
const Provider = 'apple'
export default {
  data() {
    return {
      haAuth: false
    }
  },
  onLoad() {
    uni.getProvider({
      service: 'oauth',
      success: (result) => {
        if(result.provider.indexOf(Provider) !== -1){
          this.haAuth = true
        }
      },
      fail: (error) => {
        console.log('获取登录通道失败', error);
      }
    });
  },
  methods: {
    async loginByApple() {
      if(!this.haAuth) return;
      const [loginErr, loginData] = await uni.login({
        provider: Provider
      });
      if (loginErr) {
        uni.showModal({
          showCancel: false,
          content: '苹果登录失败，请稍后再试'
        })
        return;
      }
      // 获取用户信息
      const [getUserInfoErr, result] = await uni.getUserInfo({
        provider: Provider
      });
      console.log("getUserInfo result: ",result);
      if (getUserInfoErr) {
        let content = getUserInfoErr.errMsg;
        if (~content.indexOf('uni.login')) {
          content = '请先完成登录操作';
        }
        uni.showModal({
          title: '获取用户信息失败',
          content: '错误原因' + content,
          showCancel: false
        });
        return;
      }
      // uni-id 苹果登录
      uniCloud.callFunction({
        name: 'login-by-apple',
        data: result.userInfo,
        success: (res) => {
          console.log('uniid login success', res);
          uni.showModal({
            showCancel: false,
            content: JSON.stringify(res.result)
          })
        },
        fail: (e) => {
          uni.showModal({
            content: `苹果登录失败: ${JSON.stringify(e)}`,
            showCancel: false
          })
        }
      })
    }
  }
}

```

### Apple登录校验identityToken

用法：`uniID.verifyAppleIdentityToken(Object Code2SessionAppleParams);`

**参数说明**

| 字段		| 类型	| 必填| 说明																																																										|
| ---			| ---		| ---	| ---																																																											|
| identityToken  |String	| 否	|uni.login使用apple登录后，uni.getUserInfo返回的identityToken								  					|

**响应参数**

| 字段				| 类型	| 说明																													|
| ---					| ---		| ---																														|
| code				| Number|错误码，0表示成功																							|
| message					| String|详细信息																												|
| iss			| String|发行人注册的索赔标识了发行身份令牌的委托人。由于Apple生成令牌，因此值为。https://appleid.apple.com																											|
| sub	| String|主题注册的权利要求标识作为身份令牌主题的主体。由于此令牌用于您的应用程序，因此该值是用户的唯一标识符。																							|
| aud		| String|观众注册的声明标识了身份令牌所针对的收件人。由于令牌是针对您的应用程序的，因此该值是您开发者帐户中的。client_id |
| iat| String|在注册时发出的声明中，以自Epoch以来的秒数（单位为UTC）来指示Apple发行身份令牌的时间。													|
| exp	| String|注册的到期时间以UTC中的自Epoch以来的秒数来标识身份令牌将在其上或之后到期的时间。验证令牌时，该值必须大于当前日期/时间。																|
| email	| String|一个字符串值，代表用户的电子邮件地址。电子邮件地址将是用户的真实电子邮件地址或代理地址，具体取决于他们的状态私人电子邮件中继服务。					|
| email_verified	| String|字符串或布尔值，指示服务是否已验证电子邮件。此声明的值始终为true，因为服务器仅返回经过验证的电子邮件地址。该值可以是字符串（”true”）或布尔值（true）。|
| is_private_email	| String|字符串或布尔值，指示用户共享的电子邮件是否是代理地址。该值可以是字符串（”true”或“false”）或布尔值（true或false）。|
| real_user_status	| String|一个整数值，指示用户是否看起来是真实的人。使用此索赔的价值来减轻欺诈。可能的值为：（0或Unsupported）。1 （或Unknown），2 （或）。有关更多信息，请参见。仅在iOS 14和更高版本，macOS 11和更高版本，watchOS 7和更高版本，tvOS 14和更高版本上才存在此声明；基于Web的应用程序不存在或不支持该声明。|

```js
// 云函数代码
const uniID = require('uni-id')
exports.main = async function(event,context) {
	const res = await uniID.verifyAppleIdentityToken({
    identityToken: event.identityToken
  })
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
  const payload = await uniID.checkToken(event.uniIdToken)
  if (payload.code) {
    return payload
  }
  const res = await uniID.getInvitedUser({
    uid: payload.uid,
    limit: 10,
    offset: 0,
    needTotal: true
  })
  return res
}
```

# 数据库结构

`uni-id`的所有数据表，都在[opendb](https://gitee.com/dcloud/opendb/)规范中。

在unicloud [web控制台](https://unicloud.dcloud.net.cn/) 新建数据表时，可以从`uni-id`的模板分类里找到下面的表，并一键创建这些表。

## 用户表

表名：`uni-id-users`

| 字段						| 类型			| 必填| 描述																											|
| ----------------| ---------	| ----| -------------------------------------------								|
| \_id						| Object ID	| 是	| 存储文档 ID（用户 ID），系统自动生成											|
| username				| String		| 否	| 用户名，不允许重复																				|
| password				| String		| 否	| 密码。加密存储																						|
| nickname				| String		| 否	| 用户昵称																									|
| gender					| Integer		| 否	| 用户性别：0 未知 1 男性 2 女性														|
| status					| Integer		| 是	| 用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝								|
| mobile					| String		| 否	| 手机号码																									|
| mobile_confirmed| Integer		| 否	| 手机号验证状态：0 未验证 1 已验证，未验证用户不可登录			|
| email						| String		| 否	| 邮箱地址																									|
| email_confirmed	| Integer		| 否	| 邮箱验证状态：0 未验证 1 已验证，未验证用户不可登录				|
| avatar					| String		| 否	| 头像地址																									|
| wx_unionid			| String		| 否	| 微信unionid																								|
| wx_openid				| Object		| 否	| 微信各个平台openid																				|
| ali_openid			| String		| 否	| 支付宝平台openid																					|
| comment					| String		| 否	| 备注																											|
| realname_auth		| Object		| 否	| 实名认证信息																							|
| register_date		| Timestamp	| 否	| 注册时间																									|
| register_ip			| String		| 否	| 注册时 IP 地址																						|
| last_login_date	| Timestamp	| 否	| 最后登录时间（注意并非只有登录操作会修改此值，token刷新时也会修改最后登录时间。应用启动时若token有效则不会触发登录行为，也不会更新本值。最后登录IP同理）|
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

表名：`opendb-verify-codes` 

**uni-id 2.0.0版本以前，使用的表名为uni-verify，2.0.0+起改为新表名**

该表的前缀不是uni-id，意味着该表的设计用途是通用的，不管是uni-id的手机号验证码，或者支付等关键业务需要验证码，都使用此表。

每条验证信息，都记录在本表中。uni-id不会自动删除本表的历史数据，数据保留有效期需要开发者自行管理，可以在云函数中设置一个定时运行来清理过期数据。

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

## 更多表

还有更多uni-id的配套数据表，可以在uniCloud [web控制台](https://unicloud.dcloud.net.cn/)新建表时选择相应模板。此处不再详述，仅罗列清单：

- 积分表：uni-id-scores
- 地址信息表：uni-id-address
- 订单表：uni-id-base-order
- 设备表：uni-id-device
- 关注粉丝表：uni-id-followers
- 日志表：uni-id-log
- 任务表：uni-id-task
- 任务日志表：uni-id-task-log

# 错误码

自`1.1.0`版本使用此错误码规范

|模块											|模块码	|错误代码	|错误信息																									|
|:-:											|:-:		|:-:			|:-:																											|
|`登录通用模块`							|100		|01				|（10001）账号已禁用																								|
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
|一键登录/注册					|106		|01				|（10601）手机号已存在（传入type='register'且手机号已注册时触发）								|
|					    |106		|02				|（10602）此手机号尚未注册（传入type='login'且手机号未注册时触发）																						|
|Apple登录/注册					|107		|01				|（10701）获取用户唯一标识符失败																						|
|					    |107		|02				|（10702）bundleId校验失败，请确认配置后重试																						|
|					    |107		|03				|（10703）此账户已注册																						|
|					    |107		|04				|（10704）此账户尚未注册																						|
|					    |107		|05				|（10705）identityToken校验失败																						|
|					    |107		|06				|（10706）签发机构检验失败																						|
|`注册通用模块`							|200		|-				|-																												|
|账号、邮箱、手机+密码注册|201		|01				|（20101）用户名、邮箱、手机号必填一项															|
|													|				|02				|（20102）用户名、邮箱、手机号冲突																	|
|`Token类`									|300		|-				|-																												|
|生成Token								|301		|-				|-																												|
|验证Token								|302		|01				|（30201）设备特征校验未通过																				|
|													|				|02				|（30202）云端已不包含此token																			|
|													|				|03				|（30203）token已过期																							|
|													|				|04				|（30204）token校验未通过																					|
|`账号安全类`								|400		|-				|-																												|
|登出											|401		|-				|-																												|
|修改密码									|402		|01				|（40201）用户不存在																								|
|													|				|02				|（40202）旧密码错误																								|
|重置密码									|403		|-				|-																												|
|`验证类`										|500		|-				|-																												|
|设置验证码								|501		|01				|（50101）参数错误																									|
|校验验证码								|502		|01				|（50201）参数错误																									|
|													|				|02				|（50202）验证码错误或已失效																				|
|发送短信验证码						|503		|01				|（50301）验证码发送失败，一般message内有描述											|
|`绑定账号`									|600		|-				|-																												|
|绑定手机号								|601		|01				|（60101）此手机号已被绑定																					|
|绑定邮箱									|602		|01				|（60201）此邮箱已被绑定																						|
|绑定微信									|603		|01				|（60301）获取openid失败																						|
|													|				|02				|（60302）此账号已被绑定																						|
|绑定支付宝								|604		|01				|（60401）获取openid失败																						|
|													|				|02				|（60402）此账号已被绑定																						|
|`解绑账号`									|700		|-				|-																												|
|解绑手机号								|701		|01				|（70101）解绑失败，可能已经解绑或者账号不匹配											|
|解绑邮箱									|702		|01				|（70201）解绑失败，可能已经解绑或者账号不匹配											|
|解绑微信									|703		|01				|（70301）解绑失败，可能已经解绑																		|
|解绑支付宝								|704		|01				|（70401）解绑失败，可能已经解绑																		|
|`基础功能`									|800		|-				|-																												|
|更新用户信息							|801		|01				|（80101）参数错误																									|
|设置头像									|802		|-				|-																												|
|获取用户信息							|803		|01				|（80301）未查询到用户信息																					|
|传入token获取用户信息			|808		|01				|（80801）未查询到用户信息																					|
|设置用户自己的邀请码			|804		|01				|（80401）邀请码设置失败，验证码重复或自动设置重试多次依然重复			|
|													|				|02				|（80402）邀请码重试多次依然重复																		|
|填写邀请人邀请码					|805		|01				|（80501）邀请码无效（邀请码存在且唯一时才算有效）									|
|													|				|02				|（80502）uid错误，用户不存在																			|
|													|				|03				|（80503）邀请码不可修改																						|
|获取微信openid						|806		|01				|（80601）未能获取openid																						|
|													|				|02				|（80602）调用获取openid接口失败																		|
|获取支付宝openid					|807		|01				|（80701）未能获取openid																						|
|													|				|02				|（80702）调用获取openid接口失败																		|
|解密微信encryptedData		|808		|01				|（80801）sessionKey获取失败																						|
|													|				|02				|（80802）解密失败																		|
|													|				|03				|（80803）appid不匹配（[watermark](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)敏感数据归属appid与config.json中appid不匹配）|
|													|				|04				|（80804）code或sessionKey必须有其中一个																		|
|													|				|05				|（80805）encryptedData不可为空																		|
|													|				|06				|（80806）iv不可为空																		        |
|`公用码`										|900		|01				|（90001）数据库读写异常																						|

**另外还有一些字符串类型的扩展错误码在各自接口的文档中展示，请不要直接使用`code>0`这种方式来判断是否有错误，建议使用`if(code){}`来判断是否有错误**


# 其他功能

## 裂变@fission

自`1.1.2`版本起uni-id支持裂变功能，目前仅适用手机号+验证码方式注册可以填写邀请码（inviteCode）接受邀请。裂变相关API请参考[裂变API](uniCloud/uni-id.md?id=fission-api)

在`config.json`内配置了`autoSetInviteCode: true`则在用户注册时会自动给设置不重复的6位邀请码，如果不希望使用自动设置的邀请码可以自行传入`myInviteCode`参数来设置邀请码，需要注意的是要保证邀请码唯一。

在`config.json`内配置了`forceInviteCode: true`则只有使用邀请码才可以注册（仅手机号+验证码注册方式支持）。

针对之前使用了旧版本（不支持裂变）的uni-id，现在想增加裂变功能，可以调用`setUserInviteCode`接口给已注册用户设置邀请码，在设置之前可以使用`my_invite_code不存在`作为条件查询所有需要设置的用户。

如果希望用户注册完成之后再填写邀请人的邀请码，可以调用`acceptInvite`接口来使用户接受邀请。

`getInvitedUser`接口可以用于获取接受邀请的用户列表，其中level参数可以用来设置要获取哪一级的邀请用户，不填写level参数则默认获取第一级。

如果想详细的体验一下裂变流程，可以在插件市场导入[前后一体登录模板](https://ext.dcloud.net.cn/plugin?id=13)，此项目内已有邀请用户注册示例，流程如下

**分享邀请码/邀请链接**

<img width="375" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/1b181d40-e377-11ea-b680-7980c8a877b8.jpeg" />


**受邀者注册**

<img width="375" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/1b12c610-e377-11ea-b997-9918a5dda011.jpeg" />


## 修改passwordSecret@modifysecret

> `注意：通常情况下设定好passwordSecret之后不需要再进行修改，使用此功能时请务必小心谨慎`

**说明**

在config.json内修改passwordSecret会导致历史用户无法通过密码登录。但是某些情况下有些应用有修改passwordSecret的需求，例如刚开始使用uni-id时没有自定义passwordSecret，后续需要修改，此时可以使用uni-id 2.0.1版本新增的修改passwordSecret功能。（注意：2.0.1版本验证码表名调整为了`opendb-verify-codes`）

**如何使用**

下面以将passwordSecret从`passwordSecret-demo`修改为`qwertyasdfgh`为例介绍如何使用

```json
// 旧config.json
{
  "passwordSecret": "passwordSecret-demo"
}

// 新config.json
{
  "passwordSecret": [{
    "version": 1,
    "value": "passwordSecret-demo"
  },{
    "version": 2,
    "value": "qwertyasdfgh"
  }]
}

```

如果在上面基础上再修改passwordSecret为`1q2w3e4r5t`,config.json调整如下

> !!!注意只有在数据库内完全没有使用某个版本（`password_secret_version`字段表示了用户密钥版本）密钥的用户才可以将此密钥从config.json内去除。没有`password_secret_version`的用户使用的是最旧版本的passwordSecret，如果存在这样的用户对应的passwordSecret也不可去除。

```json
// 新config.json，
{
  "passwordSecret": [{
    "version": 1,
    "value": "passwordSecret-demo"
  },{
    "version": 2,
    "value": "qwertyasdfgh"
  },{
    "version": 3,
    "value": "1q2w3e4r5t"
  }]
}
```

**原理**

uni-id-users表内存储的password字段为使用hmac-sha1生成的hash值，此值不可逆向推出用户真实密码。所以直接修改passwordSecret会导致老用户无法使用密码登录。

上述修改通过密钥版本号区分新旧密钥，用户登录时如果密钥版本小于当前最新版本，会为用户更新数据库内存储的password字段，并记录当前使用的密钥版本。

用户对应的数据库记录内没有密钥版本的话会使用最低版本密钥进行密码校验，校验通过后为用户更新为最新版密钥对应的password并记录版本号。

由于是不可逆加密，理论上passwordSecret泄露不会造成用户的真实密码被泄露，自定义passwordSecret只是进一步加强安全性。

## 缓存角色权限@cachepermissionintoken

自`uni-id 3.0.0`起，支持在token内缓存用户的角色权限，默认开启此功能，各登录接口的needPermission参数不再生效。如需关闭请在config内配置`"removePermissionAndRoleFromToken": true`。

为什么要缓存角色权限？要知道云数据库是按照读写次数来收取费用的，并且读写数据库会拖慢接口响应速度。未配置`"removePermissionAndRoleFromToken": true`的情况下，可以在调用checkToken接口时不查询数据库获取用户角色权限。

详细checkToken流程如下：

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/ed45d350-5a4d-11eb-b997-9918a5dda011.jpg)

可以看出，旧版token（removePermissionAndRoleFromToken为true时生成的）在checkToken时如需返回权限需要进行两次数据库查询。新版token不需要查库即可返回权限信息。

**注意**

- 由于角色权限缓存在token内，可能会存在权限已经更新但是用户token未过期之前依然是旧版角色权限的情况。可以调短一些token过期时间来减少这种情况的影响。
- admin角色token内不包含permission，如需自行判断用户是否有某个权限，要注意admin角色需要额外判断一下，写法如下
  ```js
  const {
    role,
    permission
  } = await uniID.checkToken(event.uniIdToken)
  if(role.includes('admin') || permission.includes('your permission id')) {
    // 当前角色拥有'your permission id'对应的权限
  }
  ```

## 自定义token内容@custom-token

> uni-id 3.0.7及以上版本，且需要使用[uni-config-center](https://ext.dcloud.net.cn/plugin?id=4425)

自`uni-id 3.0.0`起，支持在token内缓存用户的角色权限。但是某些情况下开发者可能还希望缓存一些别的东西，以便在客户端能方便的访问（**注意：不可缓存机密信息到token内**）。

**用法**

在`uni-config-center`模块内的uni-id插件内创建`custom-token.js`内容如下：

```js
module.exports = async (tokenObj) => { 
  // tokenObj为原始token信息结构如下
  // {
  //   uid: 'abc', // 用户id
  //   role: [], // 用户角色列表
  //   permission: [] // 用户权限列表，admin角色的用户权限列表为空数组
  // }
  
  tokenObj.customField = 'hello custom token' // 自定义token字段
  return tokenObj // 注意务必返回修改后的token对象
}
```

uni-id会自动加载custom-token.js进行处理，在所有生成token的操作（包括：登录、注册、token过期自动刷新、开发者自行调用createToken）执行时自动获取新token信息，并生成token。

**注意**

- 使用custom-token时自行调用createToken接口会变为异步操作，需使用`await uniID.createToken(...)`
- 不要删除原始token内的字段

# 迁移指南@migration

## 自1.x.x版本升级到2.x.x@m1to2

自2.0.0版本起uni-id调整了验证码表名（这个调整导致了与旧版不兼容），如果要使用2.0.0以上版本需要在数据库中创建opendb-verify-code表（建议直接选择opendb内uni-id下的opendb-verify-code表，会自动创建索引以及表结构）

## 自2.x.x版本升级到3.x.x@m2to3

3.0.0版本起uni-id默认将缓存用户角色权限到token内，关于缓存角色权限的说明请参考：[缓存角色权限](uniCloud/uni-id?id=cachepermissionintoken)。从2.x.x版本升级到3.x.x版本需要根据自己需求分别处理。

- 如果不希望缓存角色权限到token内，需要在config.json内配置`"removePermissionAndRoleFromToken": true`。
- 如果希望升级为缓存角色权限到token内的方案，可以按照以下步骤迁移
  + 各登录接口的needPermission参数不再生效，checkToken校验新token时总是返回角色权限
  + 所有注册用户行为均支持传入角色（role）字段，指定创建用户的角色（需要使用3.0.2及以上版本，此前只有uniID.register接口支持）。由于需要初始生成的token内带有角色权限，所以推荐在注册时就给用户设置好角色。

#### uniCloud admin升级uni-id@m2to3-uni-admin

uniCloud admin可以平滑升级到uni-id 3.0.0。如果要缓存角色权限到token内（uni-id 3.0.0的默认行为），那还有几点可以优化。详细调整如下

1. `uniCloud-aliyun\cloudfunctions\uni-admin\middleware\auth.js`

  auth中间件内可以调整为checkToken时不再获取用户信息，这样auth中间件就无需进行数据库查询，可以加速接口响应

2. `uniCloud-aliyun\cloudfunctions\uni-admin\controller\app.js`

  受第一步影响app/init内无法获取用户信息，可以额外调用uniID的getUserInfo获取

可以参考此次提交进行调整：[uniCloud admin](https://github.com/dcloudio/uniCloud-admin/commit/8359d699aacb8f7d074fce9aa82a36474cb6e7df)

#### 使用uni-config-center@uni-config-center

> uni-id 3.0.7及以上版本

从插件市场导入支持uni_modules的uni-id，会自动安装依赖的uni-config-center到uni_modules内。如果此前并没有使用uni-config-center可以直接将uni-id的config.json移至`uni-config-center/uni-id/config.json`即可（可以参照插件市场的uni-id示例项目）

- uni-id会优先使用uni-config-center内添加的配置
- 如果批量上传后报“请在公用模块uni-id的config.json或init方法中内添加配置项”，请重新上传一次`uni-id`

**uni-id配置优先级**

1. `uniID.init`、`uniID.createInstance`传入的配置（此配置不会对clientDB依赖的uni-id生效，不推荐使用）
2. uni-config-center内配置的`uni-id/config.json`（推荐使用的配置方式）
3. uni-id插件下配置的config.json（已不推荐使用的配置方式）

以上三个配置不会进行合并，优先级高的先生效

#### 忽略用户名邮箱大小写@case-sensitive

> uni-id 3.1.0及以上版本

uni-id 3.1.0版本主要有以下两个调整

1. 自此版本起会对所有接口中的用户名、邮箱、密码进行前后去空格。

2. 此版本之前uni-id并未忽略用户名及邮箱的大小写。这样导致了一些问题，比如用户在手机上登录不小心就会使用首字母大写的用户名或邮箱，这样就会登录失败，影响用户体验。很多应用/网站的登录都是忽略大小写的，为此uni-id在3.1.0版本起调整为默认忽略用户名、邮箱的大小写。实现方式为将用户名、邮箱均存储为小写，用户输入用户名邮箱时也转化为小写进行匹配

**注意**

- 此调整兼容旧版本，以登录接口为例，优先匹配用户输入用户名对应的账号，如果不存在则匹配全小写用户名对应的账号（uni-id内部进行处理实际不会增加数据库读写次数）
- 新注册用户会将用户名/邮箱存储为全小写格式，老用户可能还存在包含大写字母的邮箱及用户名

# FAQ

- token数组为什么越来越长
  + 每次登录成功都会新增一个token，并且检查所有token的有效期删除过期token。正常情况下客户端应该判断持久化存储的token是否还在有效期内，如果还有效就直接进入应用，不再执行登录。这样相当于用户的每个设备上都存在一个有效期内的token，云端也是。

- 复制token到其他环境校验不通过
  + uni-id内会校验客户端ua，如果是在本地调试可以在云函数内修改`context.CLIENTUA`为生成token的设备ua，切记上线删除此逻辑。如果不需要设备和token绑定，可以在config内配置`bindTokenToDevice: false`来关闭绑定，`uni-id 3.0.12`及以上版本bindTokenToDevice默认值调整为了false

- username、email、mobile三个字段
  + 三个字段均可能为空，但是建议限制一下插入数据库三个字段的格式，比如username不应是邮箱格式或手机号格式，因为登录时可以选择使用username或mobile或email+密码的方式

- 关于邀请码
  + 目前仅手机号+验证码的注册方式支持填写邀请码

- 区分前后端用户
  + 不支持分表，推荐给用户添加标记来区分前后端用户
