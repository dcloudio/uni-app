## uni.login(options) @login

登录


> Android、iOS平台从 HBuilderX5.08 版本开始支持微信登录; iOS平台从 HBuilderX 5.21 版本开始支持Apple登录

### login 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.08 | 5.08 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LoginOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| provider | string | 否 | Web: x; 微信小程序: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 授权登录服务提供商，通过 [uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) 获取,目前支持微信登录(weixin)<br/> |
| scopes | any | 否 | Web: x; Android: x; iOS: x; HarmonyOS: x | 授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）<br/> |
| timeout | number | 否 | Web: x; 微信小程序: 2.35; Android: x; iOS: x; HarmonyOS: x | 超时时间，单位 ms |
| onlyAuthorize | boolean | 否 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 微信登录仅请求授权认证<br/> |
| success | (result: [LoginSuccess](#loginsuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 接口调用成功的回调函数 |
| fail | (result: [LoginFail](#loginfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### provider 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| weixin | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.81 | 微信登录 |
| qq | Web: x; Android: x; iOS: x; HarmonyOS: x | QQ登录 |
| sinaweibo | Web: x; Android: x; iOS: x; HarmonyOS: x | 新浪微博登录 |
| xiaomi | Web: x; Android: x; iOS: x; HarmonyOS: x | 小米登录 |
| apple | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | Apple登录 |
| huawei | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 华为 HarmonyOS 华为账号登录 |

#### LoginSuccess 的属性值 @loginsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 否 | Web: x; 微信小程序: 4.41 | 描述信息 |
| authResult | any | 是 | Web: x; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 登录服务商提供的登录信息，服务商不同返回的结果不完全相同 |
| code | string | 是 | Web: x; 微信小程序: 4.41; Android: 5.08; iOS: 5.08; HarmonyOS: 4.61 | 小程序用户临时登录凭证 |
| anonymousCode | string | 否 | Web: x; Android: x; iOS: x; HarmonyOS: x | 头条小程序当前设备标识 |
| authCode | string | 否 | Web: x; Android: x; iOS: x; HarmonyOS: x | 支付宝小程序授权码 |
| authErrorScope | any | 否 | Web: x; Android: x; iOS: x; HarmonyOS: x | 支付宝小程序登录失败的授权类型，key是授权失败的 scope，value 是对应的错误码 |
| appleInfo | **AppleLoginAppleInfo** | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | 苹果登录成功返回的信息 |

#### appleInfo 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| authorizationCode | string | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | Apple 授权码，用于服务端向 Apple 校验或换取凭证 |
| fullName | string | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | 用户授权时 Apple 返回的姓名信息，通常仅首次授权时可获取，后续登录多数情况下为空 |
| identityToken | string | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | Apple 签发的身份令牌（JWT），主要用于服务端校验当前登录用户身份 |
| realUserStatus | number | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | Apple 对真实用户状态的评估值，仅作辅助参考(0: 设备不支持检测; 1: 无法确定; 2:高度可能真实) |
| user | string | 否 | Web: x; Android: x; iOS: 5.21; HarmonyOS: x | Apple 返回给当前 App 的用户唯一标识，不是昵称或用户名 |

#### LoginFail 的属性值 @loginfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 微信登录错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1310500 | Web: x | 未找到微信 APPID |
| 1310501 | Web: x | APPID、appIdentifier、bundleId不匹配 |
| 1310502 | Web: x | 微信可能未安装 |
| 1310503 | Web: x | 未获取到授权凭证 |
| 1310504 | Web: x | 未获取到授权 code |
| 1310505 | Web: x | 授权凭证无效 |
| 1310506 | Web: x | 获取用户信息失败 |
| 1310507 | Web: x | 微信 API 请求失败 |
| 1310508 | Web: x | 微信登录state验证失败 |
| 1310509 | Web: x | 用户取消登录 |
| 1310510 | Web: x | 超时时间必须为正整数 |
| 1310511 | Web: x | 获取用户信息请求超时 |
| 1310512 | Web: x | iOS 没有配置对应的URL Scheme |
| 1310513 | Web: x | iOS 没有配置对应的Universal Link |
| 1310600 | Web: x | 服务供应商获取失败 |
| 1001502040 | Web: x | 登录请求可能被跨站攻击 |




::: warning 注意
- HarmonyOS 平台需要额外的配置，详见[HarmonyOS平台接入微信SDK](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/ohos.html)
  - 配置 queryScheme： `"querySchemes": ["weixin"]` **请勿配置 `wxopensdk`。已在 @tencent/wechat_open_sdk@1.0.15 实测配置 `wxopensdk` 后登录无法回调**
  - 配置 actions: `"actions": [ "action.system.home", "wxentity.action.open" ]`
- 根据apple审核要求，支持任何三方登录，必须同时支持Apple 登录功能，否则审核失败； 具体请参考[Apple App Review Guidelines - Login Services说明](https://developer.apple.com/app-store/review/guidelines/#design)
:::

<!-- UTSAPIJSON.login.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.oauth.login)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/login.html#login)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=login&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=login&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=login&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=login&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=login&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=login)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=login&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 登录provider对象描述 @providerdes

* UniOAuthWeixinProvider(微信登录)继承自 [UniProvider](./provider.md#uniprovider)

| 名称           | 类型      | 必备 | 默认值  | 描述                                  |
| -------------- | --------- | ---- | ------ | ------------------------------------- |
| isWeChatInstalled     | boolean   | 是    | -      | 判断微信是否安装 |

* UniOAuthAppleProvider(Sign in with Apple 登录)继承自 [UniProvider](./provider.md#uniprovider)

## 自定义登录provider接入到uni API @customprovider

背景：目前uni-app x引擎已经内置了微信登录。但登录SDK还有很多，比如苹果登录、京东、支付宝登录。

以往这些SDK可以通过独立插件的方式集成到uni-app x中，但需要提供单独的API给开发者使用。

uni-app x从4.25起，开放了provider自接入机制，让三方SDK可以以[provider](./provider.md)方式被开发者集成。

开发一个UTS插件，对接uni规范化的API、错误信息描述等实现自己的登录插件，这样插件使用者就可以通过uni的标准API使用三方SDK。

举个例子，开发者想使用uni.login()的方式调用XX登录，但是内置登录api不支持，

那只需要按照下面四个步骤实现即可:

第一步，新建一个UTS插件，在interface.uts 中定义接口，UniOAuthProvider，代码如下

```ts
export interface UniOAuthWeixinProvider extends UniOAuthProvider{}
```

第二步，在app-android或者app-ios的index.uts中实现接口，代码如下

```ts
import { UniOAuthProvider } from '../interface.uts'
export class UniOAuthWeixinProviderImpl implements UniOAuthWeixinProvider {
	override id : String = "XX" // id必须有插件作者前缀，避免冲突，避免不同插件作者的插件id重名
	override description : String = "XX的描述"
	override isAppExist : boolean | null = null

	constructor(){}

	override login(options : LoginOptions) {
		//todo 具体逻辑，接收uni规范的入参，进行业务处理，返回uni规范的返回值。如遇到错误，按uni的规范返回错误码
	}
}
```

第三步，在manifest.json中配置

```ts
  "app": {
    "distribute": {
      /* android打包配置 */
      "modules": {
        "uni-oauth":{
          "XX":{}
        }
      }
    }
  }
```

第四步，打包自定义基座然后运行

### 注意
- App平台开发微信登录，无需自定义基座，真机运行可直接开发
- App平台判断微信是否安装可以通过`uni.getProvider`的方式，详见[uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html#getprovider)

```ts
   uni.getProvider({
      service: "oauth",
      success: (e) => {
         const provider = e.providers.find((item): boolean => {
            return item.id == 'weixin'
         })

          // #ifdef APP-ANDROID
          if (provider != null && provider instanceof UniPaymentWxpayProvider && !((provider as UniPaymentWxpayProvider).isWeChatInstalled)) {
            console.log('WeChat 没有安装')
          } else {
             console.log('WeChat 已安装')
          }
          // #endif
          // #ifdef APP-IOS
          if (provider != null && ((provider as UniPaymentWxpayProvider).isWeChatInstalled == undefined || ((provider as UniPaymentWxpayProvider).isWeChatInstalled != null && (provider as UniPaymentWxpayProvider).isWeChatInstalled == false))) {
            console.log('WeChat 没有安装')
          } else {
            console.log('WeChat 已安装')
          }
          // #endif
      },
      fail: (e) => {
         console.log("获取微信登录通道失败：", e);
      }
   })
```
- **app需要在根目录manifest.json文件中配置`uni-oauth`节点，详见 [uni-oauth模块配置](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-oauth)**
- iOS平台微信登录、苹果登录均需要配置在根目录manifest.json文件中配置`uni-oauth`节点，并且只要支持任何三方登录，均需要同时支持苹果登录

## uni.getUserInfo(options) @getuserinfo

获取用户信息


### getUserInfo 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **GetUserInfoOptions** | 是 | Web: x; Android: x; iOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| provider | string | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61 | 授权登录服务提供商，通过uni.getProvider获取 |
| withCredentials | boolean | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 是否带上登录态信息，仅微信小程序生效。 |
| lang | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en，仅微信小程序生效。 |
| timeout | number | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 超时时间，单位 ms |
| success | (result: [GetUserInfoSuccess](#getuserinfosuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 接口调用成功的回调函数 |
| fail | (result: [GetUserInfoFail](#getuserinfofail-values)) => void | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### provider 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| weixin | Web: x; Android: x; iOS: x; HarmonyOS: x | 微信登录。 - **推荐**: 使用 uniCloud 提供的云函数登录方式，避免在客户端暴露 appSecret。 1. [获取微信openid](https://doc.dcloud.net.cn/uniCloud/uni-id/old.html#获取微信openid) 2. [获取App平台微信登录用户信息](https://doc.dcloud.net.cn/uniCloud/uni-id/old.html#get-weixin-user-info) |
| qq | Web: x; Android: x; iOS: x; HarmonyOS: x | QQ登录 |
| sinaweibo | Web: x; Android: x; iOS: x; HarmonyOS: x | 新浪微博登录 |
| xiaomi | Web: x; Android: x; iOS: x; HarmonyOS: x | 小米登录 |
| apple | Web: x; Android: x; iOS: x; HarmonyOS: x | Apple登录 |
| huawei | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 华为 HarmonyOS 华为账号登录 |

#### GetUserInfoSuccess 的属性值 @getuserinfosuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| userInfo | **UserInfo** | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61 | 用户信息对象，不包含 openid 等敏感信息 |
| rawData | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 不包括敏感信息的原始数据字符串，用于计算签名。 |
| signature | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，仅微信小程序生效。 |
| encryptedData | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法，仅微信小程序生效。 |
| iv | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 加密算法的初始向量，详细见加密数据解密算法，仅微信小程序生效。 |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 描述信息 |
| cloudID | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 需要基础库： `2.7.0`<br/><br/>敏感数据对应的云 ID，开通[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/basis/getting-started.html)的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud)<br/> |

#### userInfo 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| nickName | string | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 用户昵称 |
| openId | string | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61 | 该服务商唯一用户标识 |
| avatarUrl | string | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 用户头像 |
| gender | number | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.81 | 用户性别（仅微信登录支持） |
| city | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |
| country | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |
| language | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x | 可选值：<br/>- 'en': 英文;<br/>- 'zh_CN': 简体中文;<br/>- 'zh_TW': 繁体中文;<br/> |
| province | string | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |

##### gender 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 0 | Web: x; Android: x; iOS: x | 男 |
| 1 | Web: x; Android: x; iOS: x | 女 |
| 2 | Web: x; Android: x; iOS: x | 保密 |
| 0 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |
| 1 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |
| 2 | Web: x; 微信小程序: 4.41; Android: x; iOS: x |  |

##### language 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| en | Web: x; Android: x; iOS: x |
| zh_CN | Web: x; Android: x; iOS: x |
| zh_TW | Web: x; Android: x; iOS: x |

#### GetUserInfoFail 的属性值 @getuserinfofail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; Android: x; iOS: x | 统一错误码 |
| errSubject | string | 是 | Web: x; Android: x; iOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; Android: x; iOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; Android: x; iOS: x |  |




<!-- UTSAPIJSON.getUserInfo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.oauth.getUserInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/login.html#getuserinfo)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getUserInfo&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getUserInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getUserInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getUserInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getUserInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getUserInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getUserInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/oauth/oauth.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/oauth/oauth.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/oauth/oauth
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-container">
        <view class="uni-center">登录状态</view>
        <view v-if="userInfo == null">
          <template v-if="logging">
            <view class="uni-center uni-common-mt">登录中...</view>
          </template>
          <template v-else>
            <view class="uni-center uni-common-mt">未登录</view>
            <view class="uni-center uni-common-mt">请点击下面按钮登录</view>
          </template>
        </view>
        <view v-else>
          <view class="uni-center uni-common-mt">
            <image :src="userInfo!.avatarUrl" style="width: 60px;height: 60px;border-radius: 30px;"></image>
          </view>
          <view class="uni-center uni-common-mt">Hello, {{userInfo!.nickName}}</view>
        </view>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <!-- #ifdef APP-HARMONY -->
        <button type="primary" @click="hwLogin">华为登录</button>
        <!-- #endif -->
        <!-- #ifdef APP-IOS -->
        <button type="primary" @click="appleLogin">Apple 登录</button>
        <!-- #endif -->
        <button class="uni-common-mt" type="primary" @click="wxLogin">微信登录</button>
        <button class="uni-common-mt" @click="clear">清空</button>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { state, setUserInfo, UserInfo } from '@/store/index.uts'

  const title = ref('OAuth')
  const logging = ref(false)
  const userInfo = computed(() : UserInfo | null => state.userInfo)
  const testUserInfo = ref<UserInfo | null>(null)

  const clear = () => {
    setUserInfo(null)
    testUserInfo.value = null
    logging.value = false
  }

  // #ifdef APP-IOS
  const appleLogin = () => {
    uni.navigateTo({
      url: '/pages/API/oauth/oauth-apple'
    })
  }
  // #endif


  const hwLogin = () => {
    logging.value = true
    if (userInfo.value != null) return
    uni.login({
      provider: 'huawei',
      success() {
        uni.getUserInfo({
          provider: 'huawei',
          success(res) {
            console.log('获取用户信息成功')
            const info : UserInfo = {
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }
            testUserInfo.value = info
            setUserInfo(info)
            logging.value = false
          },
          fail(err) {
            clear()
            console.log('获取用户信息错误: ', JSON.stringify(err));
          }
        })
      },
      fail(err) {
        clear()
        console.log('获取用户信息错误: ', JSON.stringify(err));
      }
    })
  }

  const wxLogin = () => {
    logging.value = true;
    if (userInfo.value != null) return;
    uni.login({
      provider: 'weixin',
      success(res) {
        uniCloud.importObject('uni-login-test-co').loginByWeixin({
          "code": res.code,
          "appid": "wxd569c7238830733b"
        }).then((res : UTSJSONObject) => {
          console.log(JSON.stringify(res));
          const info : UserInfo = {
            nickName: res.getString('nickname') ?? '',
            avatarUrl: res.getString('headimgurl') ?? ''
          };
          testUserInfo.value = info;
          setUserInfo(info);
          logging.value = false;
        }).catch(err => {
          console.error(JSON.stringify(err));
          uni.showModal({
            title: '微信登录失败',
            content: (err as Error).message
          });
          clear();
        });
      },
      fail(err) {
        uni.showModal({
          title: '微信登录失败',
          content: err.errMsg
        });
        clear();
      }
    })
  }

  function getTestUserInfo() : UserInfo | null {
    return testUserInfo.value
  }

  defineExpose({
    getTestUserInfo,
    hwLogin,
    setUserInfo
  })
</script>

<style>

</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41 | 错误信息 |

