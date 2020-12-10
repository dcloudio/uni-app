> HBuilderX 2.9.12+ 版本新增支持 `一键登录`


## 概述
`一键登录`是DCloud联合个推公司推出的，整合了三大运营商网关认证能力的服务。
通过与运营商,个验深度合作，实现APP用户无需输入帐号密码，即可使用本机手机号码自动登录的能力。
`一键登录`是替代短信验证登录的下一代登录验证方式，能消除现有短信验证模式等待时间长、操作繁琐和容易泄露的痛点。

+ 支持项目类型：uni-app，5+ App，Wap2App
+ 支持系统平台: Android，iOS
+ 支持运营商: 移动，联通，电信

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/demo.png)


### 原理
在用户同意授权的操作前提下，访问运营商网关鉴权，获取当前设备access_token等信息。
通过uniCloud 将access_token信息 置换为当前设备的真实手机号码

![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/process.png)

前置条件：
+ 手机安装有sim卡
+ 手机开启数据流量
+ 开通uniCloud服务


### 产品优势
- **便捷**
优化了现有短信验证方式，免短信验证一键免密登录APP，耗时极短，减轻用户记忆负担，能有效降低用户流失率，提升运营效果
- **安全**
采用运营商网关认证，避免短信劫持，有效提升安全性



## 开通使用

### 开通服务
开发者需要登录[DCloud开发者中心](https://dev.dcloud.net.cn/)，申请开通一键登录服务。
具体文档：[开通一键登录的详细教程](https://ask.dcloud.net.cn/article/37965)

### 集成模块
- **云端打包**
在项目manifest.json页面“App模块配置”项的“OAuth(登录鉴权)”下勾选“一键登录(uni-verify)”
![](https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/client/doc/univerify/hx.png)
- **离线打包**
  + Android平台：[一键登录Android离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/oauth)
  + iOS平台：[一键登录iOS离线打包配置](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/iOSModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95%ef%bc%88univerify%ef%bc%89h)

### 开通uniCloud服务
一键登录在客户端获取 token 后，必须在 uniCloud 换取手机号码。
在uniCloud的云函数中拿到手机号后，可以再转给传统服务器，也可以通过云函数url方式生成普通的http接口给5+ App使用。
开通uniCloud是免费的，其中阿里云是全免费，腾讯云是提供一个免费服务空间。

注意:
**虽然一键登录需要uniCloud，但并不要求开发者把所有的后台服务都迁移到uniCloud**

关于uniCloud的介绍和使用： [uniCloud说明文档](https://uniapp.dcloud.io/uniCloud/README)


### 使用一键登录

#### 获取服务提供商

一键登录对应的服务提供商ID
- id 为 'univerify'   

```
uni.getProvider({
    service: 'oauth',
    success: function (res) {
        console.log(res.provider)// univerify
    }
});

```

#### 预登录
（可选） 进行预登录操作，在预登录成功后有效时间内，进行登录操作 速度会显著提升

`uni.preLogin(options)`

```
uni.preLogin({
	provider: 'univerify'
	success(){
		// 成功
	},
	fail(res){
		// 失败
		console.log(res.errCode)
		console.log(res.errMsg)
	}
})

```


#### 关闭一键登录页面

```
uni.closeAuthView()
```

#### 请求登录认证

弹出用户授权界面。根据用户操作及授权结果返回对应的回调

`uni.login(options);`

```
uni.login({
	provider: 'univerify',
	// 自定义样式
	univerifyStyle: {},
	success(res){
		console.log(res.authResult)// {openid:'deviceIDlength+deviceID+gyuid',access_token:'接口返回的 token'}
	},
	fail(res){
		// 失败
		console.log(res.errCode)
		console.log(res.errMsg)
	}
})

```

univerifyStyle 数据结构

```
{
    "backgroundColor": "页面背景颜色，默认白色 #ffffff",  
    "icon": {
        "path": "可选 自定义本地图片 默认显示logo ",
        "width": "可选 宽度 默认60",
        "height": "可选 高度 默认60"
    },
    "phoneNum": {
        "color": "字体颜色 默认黑色 #000000",
        "fontSize": "字体大小 默认 18加粗"
    },
    "slogan": {
        "color": "字体颜色 默认 #8a8b90",
        "fontSize": "字体大小 默认 12"
    },
    "authButton": {
        "normalColor": "正常状态颜色 #3479f5",
        "highlightColor": "按下状态颜色 #2861c5",
        "disabledColor": "不可点击时颜色 #73aaf5",（仅ios支持）
        "width": "宽度 默认 设备屏幕宽度左右各留 32px",
        "height": "高度 默认 94px",
        "textColor": "#ffffff",
        "title": "本机号码一键登录"
    },
    "otherLoginButton": {
        "visible": "true 是否显示其他登录按钮，默认显示"    
        "normalColor": "正常状态颜色 #f8f8f8",
        "highlightColor": "按下状态颜色 #dedede",
        "width": "宽度 默认 设备屏幕宽度左右各留 32px",
        "height": "高度 默认 94px",
        "textColor": "#000000",
        "title": "其他登录方式",
        "borderWidth": "边框宽度 1px",（仅ios支持）
        "borderColor": "边框颜色 #c5c5c5"（仅ios支持）
    },
    "privacyTerms": {
        "textColor": "#8a8b90 文字颜色", 
        "termsColor": "#1d4788 协议文字颜色"   
        "prefix": "我已阅读并同意",
        "suffix": "并使用本机号码登录",
        "fontSize": 12号字体,
        "privacyItems": [
            {
                "url": "https://",
                "title": "用户服务协议"
            }
        ]
    }
}
```

返回数据示例

```

{
	"errMsg": "login:ok",
	"authResult": {
		"openid": "208E2FBE6EF64DF3B2D377D886EF2A14124262bfd7ae16465ea0f0634554dcee7636",
		"access_token": "ZGI4NjkxZWE4YjAyNGUzMjhiMmZiNDcwODBjYjc5MDF8fDJ8djJ8Mg=="
	}
}

```



### 换取手机号码

通过uniCloud 将返回的access_token置换为真实的手机号码。

** 重要提示：正常情况下，用户的手机号码信息不应该返回给客户端 !!!  **

我们这里以调用云函数为例：

新建云函数上传部署，代码实现可以参考：

![](https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20201125/81b289aace20942def2e98a4cd41b97e.png)

返回数据示例
```
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


[uniCloud对一键登录功能的详细说明](https://uniapp.dcloud.net.cn/uniCloud/univerify)


## Q&A

### 常见错误代码

|  错误码  |  错误描述  |
|  -:-  |  -:-  |  
|  1000 |  当前 uniAppid 尚未开通一键登录  |    
|  1001  | 应用所有者账号信息异常，请检查账号一键登录服务是否正常  |    
| 1002 | 应用所有者账号信息异常，请检查账号余额是否充足 |    
| 4001 | 请求参数异常 |    
|30001	|当前网络环境不适合执行该操作|
|30002	 |用户点击了其他登录方式|
|30003	 |用户关闭验证界面|
|30004	|其他错误|
|30005	|预登录失败|
|30006	|一键登录失败|
|30007	|获取本机号码校验token失败|
|40047	|一键登录取号失败|
|40053	|手机号校验失败|

###  提示 非移动网关ip地址
大多数情况 是因为部分特定设备，不支持双卡双待的网络环境

###  代码 40201  提示 源IP鉴权失败
检查一下手机卡类型是否是正常运营商手机卡，关闭飞行模式后重新尝试

