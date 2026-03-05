## uni.login(options) @login

登录


Android、iOS还未提供此功能，请在插件市场搜索替代方案。[详情](https://ext.dcloud.net.cn/search?q=%E5%BE%AE%E4%BF%A1%E7%99%BB%E5%BD%95&orderBy=Relevance&uni-appx=1&uni-app-platforms=&uni-app-x-platforms=&uni-appx=1)

### login 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **LoginOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录服务提供商，通过uni.getProvider获取，如果不设置则弹出分享列表选择界面<br/> |
| scopes | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）<br/> |
| timeout | number | 否 | - | Web: x; 微信小程序: 2.35; Android: x; iOS: x; HarmonyOS: x | 超时时间，单位 ms |
| onlyAuthorize | boolean | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 微信登录仅请求授权认证<br/> |
| success | (result: [LoginSuccess](#loginsuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [LoginFail](#loginfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### provider 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| weixin | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 微信登录 |
| qq | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | QQ登录 |
| sinaweibo | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 新浪微博登录 |
| xiaomi | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 小米登录 |
| apple | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | Apple登录 |
| huawei | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 华为 HarmonyOS 华为账号登录 |

#### LoginSuccess 的属性值 @loginsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 描述信息 |
| authResult | any | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 登录服务商提供的登录信息，服务商不同返回的结果不完全相同 |
| code | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 小程序用户临时登录凭证 |
| anonymousCode | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 头条小程序当前设备标识 |
| authCode | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 支付宝小程序授权码 |
| authErrorScope | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 支付宝小程序登录失败的授权类型，key是授权失败的 scope，value 是对应的错误码 |
| authSucessScope | Array&lt;string&gt; | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 支付宝小程序登录成功的授权 scope |
| appleInfo | **AppleLoginAppleInfo** | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 苹果登录成功返回的信息 |

#### appleInfo 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| authorizationCode | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 应用程序用来与服务器交互的令牌 |
| fullName | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 返回身份的全名 |
| identityToken | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 一个JSON Web令牌(JWT)，可以安全地将用户信息传递给应用程序 |
| realUserStatus | number | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 指示用户是否为真人 |
| user | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 验证用户的标识符 |

#### LoginFail 的属性值 @loginfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 微信登录错误码 |
| errno | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 需要基础库： `2.24.0`<br/><br/>errno 错误码，错误码的详细说明参考 [Errno错误码](https://developers.weixin.qq.com/miniprogram/dev/framework/usability/PublicErrno.html)<br/> |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1310500 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 未找到微信 APPID |
| 1310501 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | APPID、appIdentifier、bundleId不匹配 |
| 1310502 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 微信可能未安装 |
| 1310503 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 未获取到授权凭证 |
| 1310504 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 未获取到授权 code |
| 1310505 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 授权凭证无效 |
| 1310506 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 获取用户信息失败 |
| 1310507 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 微信 API 请求失败 |
| 1310508 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 微信登录state验证失败 |
| 1310509 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 用户取消登录 |
| 1310510 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 超时时间必须为正整数 |
| 1310511 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 获取用户信息请求超时 |
| 1001502040 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 登录请求可能被跨站攻击 |




::: warning 注意
- HarmonyOS 平台需要额外的配置，详见[HarmonyOS平台接入微信SDK](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/ohos.html)
  - 配置 queryScheme： `"queryScheme": ["weixin"]` **请勿配置 `wxopensdk`。已在 @tencent/wechat_open_sdk@1.0.15 实测配置 `wxopensdk` 后登录无法回调**
  - 配置 actions: `"actions": [ "action.system.home", "wxentity.action.open" ]`
:::

<!-- UTSAPIJSON.login.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.oauth.login)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/login.html#login)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)
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

## uni.getUserInfo(options) @getuserinfo

获取用户信息


### getUserInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetUserInfoOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 授权登录服务提供商，通过uni.getProvider获取 |
| withCredentials | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 是否带上登录态信息，仅微信小程序生效。 |
| lang | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en，仅微信小程序生效。 |
| timeout | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 超时时间，单位 ms |
| success | (result: [GetUserInfoSuccess](#getuserinfosuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [GetUserInfoFail](#getuserinfofail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### provider 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| weixin | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 微信登录。 - **推荐**: 使用 uniCloud 提供的云函数登录方式，避免在客户端暴露 appSecret。 1. [获取微信openid](https://doc.dcloud.net.cn/uniCloud/uni-id/old.html#获取微信openid) 2. [获取App平台微信登录用户信息](https://doc.dcloud.net.cn/uniCloud/uni-id/old.html#get-weixin-user-info) |
| qq | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | QQ登录 |
| sinaweibo | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 新浪微博登录 |
| xiaomi | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 小米登录 |
| apple | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | Apple登录 |
| huawei | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 华为 HarmonyOS 华为账号登录 |

#### GetUserInfoSuccess 的属性值 @getuserinfosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| userInfo | **UserInfo** | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用户信息对象，不包含 openid 等敏感信息 |
| rawData | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 不包括敏感信息的原始数据字符串，用于计算签名。 |
| signature | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，仅微信小程序生效。 |
| encryptedData | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法，仅微信小程序生效。 |
| iv | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 加密算法的初始向量，详细见加密数据解密算法，仅微信小程序生效。 |
| errMsg | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 描述信息 |
| cloudID | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 需要基础库： `2.7.0`<br/><br/>敏感数据对应的云 ID，开通[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/basis/getting-started.html)的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud)<br/> |

#### userInfo 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| nickName | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 用户昵称 |
| openId | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 该服务商唯一用户标识 |
| avatarUrl | string | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 用户头像 |
| gender | number | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 用户性别（仅微信登录支持） |
| city | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - |  |
| country | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - |  |
| language | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 可选值：<br/>- 'en': 英文;<br/>- 'zh_CN': 简体中文;<br/>- 'zh_TW': 繁体中文;<br/> |
| province | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - |  |

##### gender 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 0 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 男 |
| 1 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 女 |
| 2 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 保密 |
| 0 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | - |
| 1 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | - |
| 2 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | - |

##### language 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| en | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | - |
| zh_CN | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | - |
| zh_TW | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | - |

#### GetUserInfoFail 的属性值 @getuserinfofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.getUserInfo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.oauth.getUserInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/login.html#getuserinfo)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html)
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
            <image :src="userInfo.avatarUrl" style="width: 60px;height: 60px;border-radius: 30px;"></image>
          </view>
          <view class="uni-center uni-common-mt">Hello, {{userInfo.nickName}}</view>
        </view>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <!-- #ifdef APP-HARMONY -->
        <button type="primary" @click="hwLogin">华为登录</button>
        <button class="uni-common-mt" type="primary" @click="wxLogin">微信登录</button>
        <!-- #endif -->
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
  const userInfo = computed(() => state.userInfo)
  const testUserInfo = ref<UserInfo | null>(null)

  const clear = () => {
    setUserInfo(null)
    testUserInfo.value = null
    logging.value = false
  }

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
    uni.showLoading({
      title: '微信登录...'
    })
    uni.login({
      provider: 'weixin',
      success(res) {
        uni.hideLoading()
        uni.showModal({
          title: '微信登录成功',
          content: `code: ${res.code}`
        })
      },
      fail(err) {
        uni.hideLoading()
        uni.showToast({
          title: err.errMsg
        })
      }
    })
  }

  function getTestUserInfo() {
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

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

