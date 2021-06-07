## 概述

`uni一键登录`是DCloud联合个推公司推出的，整合了三大运营商网关认证能力的服务。

通过运营商的底层SDK，实现App端无需短信验证码直接获取手机号，也就是很多主流App都提供的一键登录功能。

`uni一键登录`是替代短信验证登录的下一代登录验证方式，能消除现有短信验证模式等待时间长、操作繁琐和容易泄露的痛点。

+ 支持版本：HBuilderX 3.0+
+ 支持项目类型：uni-app的App端，5+ App，Wap2App
+ 支持系统平台: Android，iOS
+ 支持运营商: 中国移动，中国联通，中国电信

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/demo.png)

<a id="fullscreen"/>

> HBuilderX3.1.6+版本授权登录界面支持全屏模式

调用uni.login时设置univerifyStyle中的fullScreen属性值为true即可：
```js
uni.login({
	provider: 'univerify',
	univerifyStyle: { 
            fullScreen: true
        }
})
```

全屏效果如下:

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/full.png)

### 产品优势

- **用户体验好**

一键登录，无需等待和复制短信验证码，能有效降低用户流失率，提升用户注册量在App激活量中的转换率。

- **便宜**

使用`uni一键登录`，每次验证仅需2分！比短信验证码便宜数倍，也比市场上三方提供的一键登录要更便宜。

- **安全**

采用运营商网关认证，避免短信劫持，有效提升安全性

- **开发体验好**

无需原生插件，无需自定义基座（HBuilder标准基座就可以直接运行调试），简单快速完成上线。

### 流程
1. App界面弹出请求授权，询问用户是否同意授权该App获取手机号。这个授权请求界面是运营商sdk弹出的，可以有限定制。
2. 用户同意授权后，SDK底层访问运营商网关鉴权，获得当前设备`access_token`等信息。
3. 在服务器侧通过 uniCloud 将`access_token`等信息 置换为当前设备的真实手机号码。然后服务器直接入库，避免手机号传递到前端发生的不可信情况。

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/process.png)

前置条件：
+ 手机安装有sim卡
+ 手机开启数据流量（与wifi无关，不要求关闭wifi，但数据流量不能禁用。）
+ 开通uniCloud服务（但不要求所有后台代码都使用uniCloud）


## 开通

### 开通uni一键登录服务
开发者需要登录[DCloud开发者中心](https://dev.dcloud.net.cn/)，申请开通一键登录服务。

详细步骤参考：[开通一键登录服务的详细教程](https://ask.dcloud.net.cn/article/37965)

开通成功后会得到 apiKey、apiSecret。这2个信息，后续需要配置在uniCloud的云函数里。同时注意保密，这2个信息也是计费凭证。

**注意**
> 应用开通uni一键登录服务后，需要等审核通过后才能正式使用。在审核期间可以使用HBuilder标准基座真机运行调用一键登录功能，调用时会从你的账户中扣费；但在审核期间不可以使用自定义基座调用一键登录功能，调用时会返回错误。


### 开通uniCloud服务
一键登录在客户端获取 `access_token` 后，必须在 [uniCloud](https://uniapp.dcloud.io/uniCloud/README) 换取手机号码。

在uniCloud的云函数中拿到手机号后，可以直接使用，也可以再转给传统服务器处理，也可以通过[云函数url化](https://uniapp.dcloud.io/uniCloud/http)方式生成普通的http接口给5+ App使用。

开通uniCloud是免费的，其中阿里云是全免费，腾讯云是提供一个免费服务空间。

注意:
**虽然一键登录需要uniCloud，但并不要求开发者把所有的后台服务都迁移到uniCloud**

服务器API详见：[uniCloud云函数中使用一键登录](https://uniapp.dcloud.net.cn/uniCloud/univerify)

## 开发

本文主要介绍uni-app的客户端调用方法。5+ App（Wap2App）请另行参考：[5+ App一键登录使用指南](https://ask.dcloud.net.cn/article/38009)

DCloud还提供了更易用的封装。在[uni-id](/uniCloud/uni-id)里已经预置了`uni一键登录`，并基于`uni-id`提供了[前后一体登录模板](https://ext.dcloud.net.cn/plugin?id=13)（也可以在HBuilderX 3.0+ 新建项目界面选择“前后一体登录模板”），开发者可以拿去直接用

接下来继续介绍原始API的用法。

### 客户端-获取可用的服务提供商
一键登录，和 uni.login 中的微信登录、QQ登录等provider是并列的。

其中一键登录对应的 provider ID为 'univerify'，当获取provider列表时发现包含 'univerify' ，则说明当前环境打包了一键登录的sdk。

```js
uni.getProvider({
    service: 'oauth',
    success: function (res) {
        console.log(res.provider)// ['qq', 'univerify']
    }
});
```

### 客户端-预登录（可选）
预登录操作可以判断当前设备环境是否支持一键登录，如果能支持一键登录，此时可以显示一键登录选项，同时预登录会准备好相关环境，显著提升显示授权登录界面的速度。

如果当前设备环境不支持一键登录，此时应该显示其他的登录选项。

如果手机没有插入有效的sim卡，或者手机蜂窝数据网络关闭，都有可能造成预登录校验失败。

`uni.preLogin(options)`

```js
uni.preLogin({
	provider: 'univerify',
	success(){  //预登录成功
		// 显示一键登录选项
	},
	fail(res){  // 预登录失败
		// 不显示一键登录选项（或置灰）
    // 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
		console.log(res.errCode)
		console.log(res.errMsg)
	}
})

```


### 客户端-请求登录授权

弹出用户授权界面。根据用户操作及授权结果返回对应的回调，拿到 `access_token`

`uni.login(options);`

```js
uni.login({
	provider: 'univerify',
	univerifyStyle: { // 自定义登录框样式
    //参考`univerifyStyle 数据结构`
  },
	success(res){ // 登录成功
		console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
	},
	fail(res){  // 登录失败
		console.log(res.errCode)
		console.log(res.errMsg)
	}
})
```


`uni一键登录`的授权弹出界面是默认是半屏的，也可以配置为全屏。这个界面本质是运营商sdk弹出的，它询问手机用户是否授权自己的手机号给这个App使用。

这个授权弹出界面可以通过 univerifyStyle 设置有限定制。

univerifyStyle 数据结构：

```json
{  
    "fullScreen": "false", // 是否全屏显示，默认值： "false"
    "backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff
    "backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
    "icon": {  
        "path": "static/xxx.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
    },  
    "phoneNum": {  
        "color": "#202020"  // 手机号文字颜色 默认值：#202020  
    },  
    "slogan": {  
        "color": "#BBBBBB"  //  slogan 字体颜色 默认值：#BBBBBB  
    },  
    "authButton": {  
        "normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
        "highlightColor": "#2861c5",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
        "disabledColor": "#73aaf5",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
        "textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
        "title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
        "borderRadius": "24px"	// 授权按钮圆角 默认值："24px" （按钮高度的一半）
    },  
    "otherLoginButton": {  
        "visible": "true", // 是否显示其他登录按钮，默认值：true  
        "normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
        "highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
        "textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
        "title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
        "borderColor": "",  //边框颜色 默认值：透明（仅iOS支持）  
        "borderRadius": "0px" // 其他登录按钮圆角 默认值："0px" 
    },  
    "privacyTerms": {  
        "defaultCheckBoxState":"true", // 条款勾选框初始状态 默认值： true   
        "textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
        "termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
        "prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
        "suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
        "privacyItems": [  
            // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
            {  
                "url": "https://", // 点击跳转的协议详情页面  
                "title": "用户服务协议" // 协议名称  
            }  
        ]  
    },
    "buttons": {  // 自定义登陆按钮
      "iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
      "list": [
        {
          "provider": "apple",
          "iconPath": "/static/apple.png" // 图标路径仅支持本地图片
        }, 
        {
          "provider": "weixin",
          "iconPath": "/static/wechat.png" // 图标路径仅支持本地图片
        }
      ]
    }
}
```

univerifyStyle 属性对应配置的界面指示图

全屏效果  | 非全屏效果
:--------:|:--------:
<img src="https://img.cdn.aliyun.dcloud.net.cn/client/doc/univerify/full_styles_v2.png" width=240>  | <img src="https://img.cdn.aliyun.dcloud.net.cn/client/doc/univerify/half_styles_v2.png" width=240>

返回数据示例

```json
{
	"errMsg": "login:ok",
	"authResult": {
		"openid": "208E2FBE6EF64DF3B2D377D886EF2A14124262bfd7ae16465ea0f0634554dcee7636",
		"access_token": "ZGI4NjkxZWE4YjAyNGUzMjhiMmZiNDcwODBjYjc5MDF8fDJ8djJ8Mg=="
	}
}
```


### 客户端关闭一键登录授权界面

请求登录认证操作完成后，不管成功或失败都不会关闭一键登录界面，需要主动调用`closeAuthView`方法关闭。

客户端登录认证完成只是说明获取 `access_token` 成功，需要将此数据提交到服务器获取手机号码，完成业务服务登录逻辑后通知客户端关闭登录界面。

```js
uni.closeAuthView()
```

### 用户点击一键登录自定义按钮

`univerifyStyle`中如果配置了`"fullScreen": "true"`和`buttons`选项并且`buttons`数组不为空时，在全屏的时候会渲染出自定义按钮。

当用户点击`自定义按钮`时，会触发`uni.login`的`fail`回调，返回数据如下：

```json
{
  "code": "30008",
  "errMsg": "用户点击了自定义按钮",
  "index": 0, // 第几个按钮
  "provider": "apple",
}
```

### 用access_token换手机号

客户端获取到 `access_token` 后，传递给uniCloud云函数，云函数中通过`uniCloud.getPhoneNumber`方法获取真正的手机号。

这一步有3种方式：
1. uni-app项目开通[uniCloud](https://unicloud.dcloud.net.cn/)服务，在前端直接写 `uniCloud.callFunction` ，将 `access_token` 传给指定的云函数。
2. 使用普通ajax请求提交 `access_token` 给uniCloud的云函数。这种方式uni-app和5+App、wap2app均可使用，但uniCloud上的云函数需要做URL化。
3. 使用普通ajax请求提交 `access_token` 给自己的传统服务器，通过自己的传统服务器再转发给 uniCloud 云函数。这种方式uni-app和5+App、wap2app均可使用，但uniCloud上的云函数需要做URL化。

下面分别提供示例代码：

#### uni-app项目使用uniCloud.callFunction的方式调用云函数

如果是未开通过uniCloud的uni-app项目：
1. 首先开通uniCloud服务空间，[参考](https://unicloud.dcloud.net.cn/)
2. 对项目点右键，创建uniCloud开发环境，然后绑定到上一步创建的服务空间上
3. 对uniCloud/cloudfunctions/点右键，创建云函数
4. 分别在前端和云端复制下列代码
5. 对云函数点右键，上传到服务空间

客户端示例：

```js
// 在得到access_token后，通过callfunction调用云函数
uniCloud.callFunction({
  name: 'xxx', // 你的云函数名称
  data: {
    'access_token': 'xxx', // 客户端一键登录接口返回的access_token
    'openid': 'xxx' // 客户端一键登录接口返回的openid
  }
}).then(res => {
  // res.result = {
  //   code: '',
  //   message: ''
  // }
  // 登录成功，可以关闭一键登录授权界面了
}).catch(err=>{
  // 处理错误
})
```

云函数代码示例：
```js
'use strict';
exports.main = async (event, context) => {
  // event里包含着客户端提交的参数
  const res = await uniCloud.getPhoneNumber({
  	appid: '_UNI_ABCDEFG', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
  	provider: 'univerify',
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	access_token: event.access_token,
  	openid: event.openid
  })
  
  console.log(res); // res里包含手机号
  // 执行用户信息入库等操作，正常情况下不要把完整手机号返回给前端
  // 如果数据库在uniCloud上，可以直接入库
  // 如果数据库不在uniCloud上，可以通过 uniCloud.httpclient API，将手机号通过http方式传递给其他服务器的接口，详见：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient
  return {
    code: 0,
    message: '获取手机号成功'
  }
}
```

完整的项目实例源码，可以参考：
1. 云端一体项目模板：[https://ext.dcloud.net.cn/plugin?id=13](https://ext.dcloud.net.cn/plugin?id=13)
2. hello uni-app。打包后直接体验：[https://m3w.cn/uniapp](https://m3w.cn/uniapp)；源码获取：在HBuilderX中新建uni-app项目，选择hello uni-app模板。一键登录的具体位置在 API - login 栏目中。

**注意**

- 开发期间如果重新获取过appid需要重新编译uni-app项目

#### 5+（wap2app）项目通过云函数URL化让云函数暴露出普通http接口

5+（wap2app）项目不可使用uniCloud.callFunction请求云函数。

uniCloud云函数提供了[URL化](https://uniapp.dcloud.io/uniCloud/http)方案，可以把云函数暴露出普通http接口。设置方法参考：[https://uniapp.dcloud.io/uniCloud/http](https://uniapp.dcloud.io/uniCloud/http)

此时客户端代码使用普通ajax写法。

客户端代码：
```js
const xhr = new plus.net.XMLHttpRequest();
xhr.onload = function(e) {
  const {
    code,
    message
  } = JSON.parse(xhr.responseText)
}
xhr.open( "POST", "https://xxx" ); // url应为云函数Url化之后的地址，可以在uniCloud web控制台云函数详情页面看到
xhr.setRequestHeader('Content-Type','application/json');
xhr.send(JSON.stringify({
  access_token: 'xxx', // 客户端一键登录接口返回的access_token
  openid: 'xxx' // 客户端一键登录接口返回的openid
}));
```

云函数代码：
```js
// 下面仅展示客户端使用post方式发送content-type为application/json请求的场景
exports.main = async(event) => {
  let body = event.body
  if(event.isBase64Encoded) {
    body = Buffer.from(body,'base64')
  }
  const {
    access_token,
    openid
  } = JSON.parse(body)
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
    appid: 'xxx', // DCloud appid，不同于callFunction方式调用，使用云函数Url化需要传递DCloud appid参数！！！
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	access_token: access_token,
  	openid: openid
  })
  console.log(res); // res里包含手机号
  // 如果数据库不在uniCloud上，可以通过 uniCloud.httpclient API，将手机号通过http方式传递给其他服务器的接口，详见：https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=httpclient
  
  return {  // 不建议把完整手机号返回给前端
    code: 0,
    message: '获取手机号成功'
  }
}
```

uni-app项目也可以使用普通的uni.request来请求云函数URL化后的http接口，此处不再重复举例。

#### 通过传统服务器连接uniCloud云函数

开发者也可以在客户端获取到access_token等信息后，传给自己的传统服务器。然后由自己的传统服务器，访问uniCloud的云函数（需将云函数URL化）。

写法类似上面5+项目的云函数url化的方式，但是不同的是需要云函数返回手机号给自己服务器，这样就需要确保数据安全。

下面以一个简单的例子演示如何使用签名验证请求是否合法

```js
// 以nodejs为例
const crypto = require('crypto')

const secret = 'your-secret-string' // 自己的密钥不要直接使用示例值，且注意不要泄露
const hmac = crypto.createHmac('sha256', secret);

// 自有服务器生成签名，并以GET方式发送请求
const params = {
  access_token: 'xxx', // 客户端传到自己服务器的参数
  openid: 'xxx'
}
// 字母顺序排序后拼接签名串
const signStr = Object.keys(params).sort().map(key => {
  return `${key}=${params[key]}`
}).join('&')
hmac.update(signStr);
const sign = hmac.digest('hex')
// 最终请求如下链接，其中https://xxxx/xxx为云函数Url化地址
// https://xxxx/xxx?access_token=xxx&openid=xxx&sign=${sign} 其中${sign}为上一步得到的sign值
```


```js
// 云函数验证签名，此示例中以接受GET请求为例作演示
const crypto = require('crypto')
exports.main = async(event) => {
  
  const secret = 'your-secret-string' // 自己的密钥不要直接使用示例值，且注意不要泄露
  const hmac = crypto.createHmac('sha256', secret);
  
  let params = event.queryStringParameters
  const sign = params.sign
  delete params.sign
  const signStr = Object.keys(params).sort().map(key => {
    return `${key}=${params[key]}`
  }).join('&')
  
  hmac.update(signStr);
  
  if(sign!==hmac.digest('hex')){
    throw new Error('非法访问')
  }
  
  const {
    access_token,
    openid
  } = params
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
    appid: 'xxx', // DCloud appid，不同于callFunction方式调用，使用云函数Url化需要传递DCloud appid参数
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	access_token: access_token,
  	openid: openid
  })
  // 返回手机号给自己服务器
  return res
}
```


#### 返回 res 数据说明
```json
{
	"data": {
		"code": 0,
		"success": true,
		"phoneNumber": "166xxxx6666"
	},
	"statusCode": 200,
	"header": {
		"Content-Type": "application/json; charset=utf-8",
		"Connection": "keep-alive",
		"Content-Length": "53",
		"Date": "Fri, 06 Nov 2020 08:57:21 GMT",
		"X-CloudBase-Request-Id": "xxxxxxxxxxx",
		"ETag": "xxxxxx""
	},
	"errMsg": "request:ok"
}
```


### 错误码

|  错误码  |  错误描述  |
|  -:-  |  -:-  |
|  -7   |  uniAppid 缺失，检查是否配置/已通过审核  |
|  1000 |  当前 uniAppid 尚未开通一键登录  |
|  1001 |  应用所有者账号信息异常，请检查账号一键登录服务是否正常  |
|  1002 |  应用所有者账号信息异常，请检查账号余额是否充足 |
|  4001 |  请求参数异常 |
|  4003 |  开发者账户appid 校验异常，联系官方人员 |
|  5000 |  服务器未知异常，联系官方人员 |
| 30001	|  当前网络环境不适合执行该操作  |
| 30002 |  用户点击了其他登录方式  |
| 30003 |  用户关闭验证界面  |
| 30004 |  其他错误  |
| 30005 |  预登录失败  |
| 30006 |  一键登录失败  |
| 30007 |  获取本机号码校验token失败  |
| 30008 |  用户点击了自定义按钮  |
| 40004 |  应用不存在  |
| 40047 |  一键登录取号失败  |
| 40053 |  手机号校验失败  |
| 40201 |  源IP鉴权失败 |


## 运行基座和打包

- 使用`uni一键登录`，不需要制作自定义基座，使用HBuilder标准真机运行基座即可。在云函数中配置好apiKey、apiSecret后，一样从你的账户充值中扣费。

- 云端打包
在项目manifest.json页面“App模块配置”项的“OAuth(登录鉴权)”下勾选“一键登录(uni-verify)”
![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/hx.png)

- 离线打包
  + Android平台：[一键登录Android离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95)
  + iOS平台：[一键登录iOS离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95%ef%bc%88univerify%ef%bc%89h)


## 常见问题
- **预登录有效期**
预登录有效期为10分钟，超过10分钟后预登录失效，此时调用login授权登录相当于之前没有调用过预登录，大概需要等待1-2秒才能弹出授权界面。
预登录只能使用一次，调用login弹出授权界面后，如果用户操作取消登录授权，再次使用一键登录时需要重新调用预登录。

- **双卡手机能否同时获取两个手机号码**
不支持同时获取两个手机号，
双卡手机以开启数据流量的 SIM 卡进行认证。


- **提示“非移动网关ip地址”**
大多数情况 是因为部分特定设备，不支持双卡双待的网络环境

- **错误代码 40201，提示“源IP鉴权失败”**
检查一下手机卡类型是否是正常运营商手机卡，关闭飞行模式后重新尝试

- **错误代码 40004，提示“应用不存在”**
多出现在自定义基座的场景，请确保应用已通过审核后，且已重新打包。

- **错误代码 30005，提示“预登录失败”**
不具备一键登录的使用前提，设备不支持/未开启数据流量/其他原因




