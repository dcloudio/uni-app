## uni.getUniVerifyManager() @getuniverifymanager

获取一键登录管理对象

### getUniVerifyManager 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 4.42 | 4.42 | 4.61 | 5.0 |


::: info

App一键登录，封装了个推的一键登录sdk，其内部再次封装了中国三大电信运营商提供的sdk。通过运营商提供的服务，可以在手机sim卡信号正常的情况下，通过云端接口获取到当前用户的手机号。

使用一键登录可以点一下直接以当前手机号登录。不再需要短信验证码，而且费用比短信验证码便宜。

App一键登录的优势：
1. 对比短信验证码登录
- 对开发者而言
	* 每条短信费用更贵，一键登录便宜
	* 短信模板审核慢，通过率低
	* 短信发送成功耗时久，可能几十秒，容易被拒收，如果用户收不到短信验证码就流失了
	* 短信验证码无法规避打码平台，容易被黑产攻击，一键登录更安全。
- 对用户而言，输入手机号耗时、等待短信验证码耗时、输入验证码耗时，等待体验比一键登录差很多。
1. 对比微信登录
- 中国法律要求开发者在提供互联网服务时备案其用户的手机号。与其微信登录后再次要求用户输入短信验证码来绑定手机号，不如直接一键登录。
- 在iOS上，一旦使用微信登录，就必须同时加入Apple登录。Apple登录的用户无法再次有效触达，只能再次要求用户输入短信验证码绑定手机号，体验非常差。不如直接一键登录。使用一键登录时Appstore不会要求必须同时使用Apple登录。

一键登录涉及业务开通和付费，因为安全问题又涉及客户端和服务器交互，有较多文档：
1. 业务介绍：介绍业务流程、开通和付费。[详见](https://uniapp.dcloud.net.cn/univerify.html)
2. 客户端API，在手机端获取openId、accessToken，详情参考下文
3. 服务器API，使用openId、accessToken换取手机号码，完成登录业务流程，[详见](https://doc.dcloud.net.cn/uniCloud/uni-login/dev.html)

uni-id-pages插件，已经内置一键登录，从云端到客户端均已开发好并开源，推荐使用。[详情](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)

一键登录有标准登录模式(login方法)和自定义登录模式(customLogin方法)。标准模式是uni-app封装好的UI界面，自定义模式是开发者自己布局界面。[见下](#custom-specification-requirement)

:::

### 调整注意 @typechange

:::warning
从HBuilderX `4.41+`，调整了一批API的命名规范，修复了错误的大小写、给全局类型补充了Uni前缀，具体见下：

1. `uni.getUniverifyManager()` 废弃，请使用 `uni.getUniVerifyManager()`
2. getUniVerifyManager 的方法的`参数类型`进行了调整

比如之前类型叫`LoginOptions`，改名为了`UniVerifyManagerLoginOptions`，加上了`UniVerifyManager`前缀。

本调整是因为未来会增加更多登录方式，一键登录的参数类型占用通用的名称`LoginOptions`不合适。

涉及名单如下：
- PreLoginOptions 变更为 UniVerifyManagerPreLoginOptions
- LoginOptions 变更为 UniVerifyManagerLoginOptions
- CustomLoginOptions 变更为 UniVerifyManagerCustomLoginOptions
- PreLoginSuccess 变更为 UniVerifyManagerPreLoginSuccess
- PreLoginFail 变更为 UniVerifyManagerPreLoginFail
- PreLoginComplete 变更为 UniVerifyManagerPreLoginComplete
- LoginSuccess 变更为 UniVerifyManagerLoginSuccess
- LoginFail 变更为 UniVerifyManagerLoginFail
- LoginComplete 变更为 UniVerifyManagerLoginComplete

注意在4.41以前的版本，仍需使用无前缀的老类型名称。

一般情况下，开发者无需手动 as 返回值类型，uni-app x 会自动推导类型。早期的示例代码有 as ，新版示例已经去掉。

:::



### 返回值 

| 类型 |
| :- |
| [UniVerifyManager](#univerifymanager-values) |

#### UniVerifyManager 的方法 @univerifymanager-values 

#### preLogin(options : UniVerifyManagerPreLoginOptions) : void @prelogin
preLogin
预登录
##### preLogin 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.99 | 4.18 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniVerifyManagerPreLoginOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 预登录参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [UniVerifyManagerPreLoginSuccess](#univerifymanagerpreloginsuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| fail | (err: [UniVerifyManagerPreLoginFail](#univerifymanagerpreloginfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

###### UniVerifyManagerPreLoginSuccess 的属性值 @univerifymanagerpreloginsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| number | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 手机号（脱敏） |
| slogan | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 运营商slogan，如移动：中国移动提供认证服务，联通：认证服务由联通统一认证提供，电信：天翼账号提供认证服务 |
| privacyName | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 运营商隐私协议名称，如移动：中国移动认证服务条款，联通：联通统一认证服务条款，电信：天翼账号服务与隐私协议 |
| privacyUrl | string | 是 | - | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 运营商隐私协议url地址 |

###### UniVerifyManagerPreLoginFail 的属性值 @univerifymanagerpreloginfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1000 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前应用appid尚未开通uni一键登录 |
| 1001 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用所有者账号信息异常，请检查账号一键登录服务是否正常 |
| 1002 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用所有者账号信息异常，请检查账号余额是否充足 |
| 1004 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni一键登录应用不存在 |
| 4001 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 参数异常 |
| 30001 | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消登录 |
| 30004 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 其他错误 |
| 30005 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预登录失败 |
| 30006 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一键登录失败 |
| 30007 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预登录失效 |
| 30008 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 上一个请求正在进行中，请稍后重试 |
| 40001 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 自定义授权页面未同意隐私条款 |
| 40002 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 自定义授权页不合规，请参考文档修改 |


#### login(options : UniVerifyManagerLoginOptions) : void @login
login
标准登录
##### login 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.99 | 4.18 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniVerifyManagerLoginOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 登录参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| uniVerifyStyle | **UniVerifyManagerLoginStyle** | 否 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 登录页样式 |
| success | (res: [UniVerifyManagerLoginSuccess](#univerifymanagerloginsuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| fail | (err: [UniVerifyManagerLoginFail](#univerifymanagerloginfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| ~~univerifyStyle~~ | [UniVerifyManagerLoginStyle](#univerifymanagerloginstyle-values) | 否 | - | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 |   **已废弃，建议使用 uniVerifyStyle** | 

##### uniVerifyStyle 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fullScreen | boolean | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否全屏 |
| logoPath | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | logo路径 |
| backgroundColor | string | 否 | - | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 登录页背景色 |
| loginBtnText | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 登录按钮文字 |

###### UniVerifyManagerLoginSuccess 的属性值 @univerifymanagerloginsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| openId | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 登录授权唯一标识 |
| accessToken | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | token |

###### UniVerifyManagerLoginFail 的属性值 @univerifymanagerloginfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1000 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前应用appid尚未开通uni一键登录 |
| 1001 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用所有者账号信息异常，请检查账号一键登录服务是否正常 |
| 1002 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用所有者账号信息异常，请检查账号余额是否充足 |
| 1004 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni一键登录应用不存在 |
| 4001 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 参数异常 |
| 30001 | Web: x; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消登录 |
| 30004 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 其他错误 |
| 30005 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预登录失败 |
| 30006 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一键登录失败 |
| 30007 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预登录失效 |
| 30008 | Web: x; 微信小程序: -; Android: 3.99; iOS: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 上一个请求正在进行中，请稍后重试 |
| 40001 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 自定义授权页面未同意隐私条款 |
| 40002 | Web: x; 微信小程序: -; Android: 4.41; iOS: 4.41; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 自定义授权页不合规，请参考文档修改 |


#### customLogin(options : UniVerifyManagerCustomLoginOptions) : void @customlogin
customLogin
自定义授权页登录
##### customLogin 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.41 | 4.41 | 4.71 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniVerifyManagerCustomLoginOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 自定义登录页登录参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| numberTextElement | [UniElement](/api/dom/unielement.md) | 是 | - | Web: x; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 号码栏，仅支持使用text组件 |
| sloganTextElement | [UniElement](/api/dom/unielement.md) | 是 | - | Web: x; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 品牌露出，仅支持使用text组件 |
| loginButtonElement | [UniElement](/api/dom/unielement.md) | 是 | - | Web: x; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 登录按钮，仅支持使用button组件 |
| privacyCheckBoxElement | [UniElement](/api/dom/unielement.md) | 是 | - | Web: x; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 隐私确认，仅支持使用checkbox组件 |
| privacyTextElement | [UniElement](/api/dom/unielement.md) | 是 | - | Web: x; 微信小程序: -; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 隐私标题，仅支持使用text组件 |
| success | (res: [UniVerifyManagerLoginSuccess](#univerifymanagerloginsuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| fail | (err: [UniVerifyManagerLoginFail](#univerifymanagerloginfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### close() : void @close
close
关闭授权页(仅支持标准登录)
##### close 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.99 | 4.18 | 4.61 | 5.0 |



#### isPreLoginValid() : boolean @ispreloginvalid
isPreLoginValid
预登录是否有效
##### isPreLoginValid 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.99 | 4.18 | 4.61 | 5.0 |


##### 返回值 

| 类型 |
| :- |
| boolean |
 
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.loginVerify.getUniVerifyManager)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/login.html#getuniverifymanager)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getUniVerifyManager&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getUniVerifyManager&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getUniVerifyManager&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getUniVerifyManager&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getUniVerifyManager&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getUniVerifyManager)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getUniVerifyManager&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-uni-verify-manager/get-uni-verify-manager.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-uni-verify-manager/get-uni-verify-manager.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-uni-verify-manager/get-uni-verify-manager
```uvue
<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="uni-btn-v uni-common-mt">
        <button type="default" @click="verify(false)">一键登录（半屏）</button>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="default" @click="verify(true)">一键登录（全屏）</button>
      </view>
      <view class="uni-btn-v uni-common-mt">
        <button type="default" @click="customLoginIn()">一键登录（自定义页面）</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="uts">
  const title = ref('一键登录')
  const uniVerifyManager = ref(null as UniVerifyManager | null)
  const phone = ref('')
  const slogan = ref('')
  const privacyName = ref('')
  const privacyUrl = ref('')

  const preLogin = (callback: (() => void)) => {
    uniVerifyManager.value?.preLogin({
      success: (res) => {
        phone.value = res.number;
        slogan.value = res.slogan;
        privacyName.value = res.privacyName;
        privacyUrl.value = res.privacyUrl;
        console.log("pre login success");
        callback();
      },
      fail: (err) => {
        console.error("pre login fail => " + JSON.stringify(err));
        const hasCauseMessage = (err.cause?.cause?.message ?? '').length > 0
        uni.showModal({
          title: '预登录失败',
          content: hasCauseMessage ? JSON.parseObject(err.cause?.cause?.message ?? '')?.getString("errorDesc") : err.errMsg,
          showCancel: false
        });
      }
    });
  }

  const pushCustomPage = () => {
    const url = '/pages/API/get-uni-verify-manager/uni-verify-custom-page?phone=' + phone.value + '&slogan=' + slogan.value + '&name=' + privacyName.value + '&link=' + privacyUrl.value;
    uni.openDialogPage({
      url: url,
      animationType: 'slide-in-bottom',
      success(res) {
        console.log("成功打开自定义登录页面");
      },
      fail(err) {
        console.log(err);
      }
    })
  }

  const customLoginIn = () => {
    if('production' === process.env.NODE_ENV && '__UNI__HelloUniAppX'===uni.getAppBaseInfo().appId){
      uni.showModal({
        title: '提示',
        content: '一键登录为收费功能，当前环境暂不支持。请在HBuilderX中新建Hello uni-app x项目真机运行体验！',
        showCancel: false
      })
      return
    }
    const isPreLoginValid = uniVerifyManager.value?.isPreLoginValid() ?? false;
    if (isPreLoginValid) {
      pushCustomPage();
    } else {
      preLogin(() => {
        pushCustomPage();
      })
    }
  }

  const takePhoneNumber = (accessToken: string, openId: string) => {
    // 云函数取号
    uniCloud.callFunction({
      name: 'univerify',
      data: {
        access_token: accessToken, // 客户端一键登录接口返回的access_token
        openid: openId // 客户端一键登录接口返回的openid
      }
    }).then(res => {
      // 关闭登录页
      uniVerifyManager.value?.close();
      setTimeout(() => {
        uni.showModal({
          title: '取号成功',
          content: res.result.getJSON("res")?.getString("phoneNumber"),
          showCancel: false
        });
      }, 100);
    }).catch(err => {
      console.error(JSON.stringify(err));
      // 关闭登录页
      uniVerifyManager.value?.close();
      setTimeout(() => {
        uni.showModal({
          title: '取号失败',
          content: (err as Error).message,
          showCancel: false
        });
      }, 100);
    });
  }

  const login = (fullScreen: boolean) => {
    uniVerifyManager.value?.login({
      uniVerifyStyle:{
        fullScreen: fullScreen,
        loginBtnText: "一键登录",
        logoPath: "/static/test-image/logo.png"
      },
      success: (res) => {
        console.log("login success => " + JSON.stringify(res));
        takePhoneNumber(res.accessToken,res.openId);
      },
      fail: (err) => {
        console.error("login fail => " + err);
        const hasCauseMessage = (err.cause?.cause?.message ?? '').length > 0
        uni.showModal({
          title: '登录失败',
          content: hasCauseMessage ? JSON.parseObject(err.cause?.cause?.message ?? "")?.getString("errorDesc") : err.errMsg,
          showCancel: false
        });
      }
    });
  }

  const verify = (fullScreen: boolean) => {
    if('production' === process.env.NODE_ENV && '__UNI__HelloUniAppX'===uni.getAppBaseInfo().appId){
      uni.showModal({
        title: '提示',
        content: '一键登录为收费功能，当前环境暂不支持。请在HBuilderX中新建Hello uni-app x项目真机运行体验！',
        showCancel: false
      })
      return
    }
    // 校验预登录是否有效
    const isPreLoginValid = uniVerifyManager.value?.isPreLoginValid() ?? false;
    if (isPreLoginValid) {
      // 预登录有效，执行登录
      login(fullScreen);
    } else {
      // 预登录无效，执行预登录
      preLogin(() => {
        login(fullScreen);
      })
    }
  }

  onLoad(() => {
    uniVerifyManager.value = uni.getUniVerifyManager();
    // 预登录
    preLogin(() => { });
  })
</script>

```
:::

## cause个推sdk错误码及运营商错误码汇总

上述API不管是预登录还是登录，失败时返回的uni Error错误对象，有一个属性cause，它表示底层的错误来源，这里包含了个推的个验sdk和运营商sdk的详细信息。比如没有sim卡或未开启蜂窝网络。

在大多数情况下，开发者需要把这些更为详细的错误提示给用户，以引导用户正确使用一键登录。

### 个推sdk错误码 @getui-error-code

| 错误码 | 错误信息 |
|---|---|
| -10000 | sdk没有初始化，请先初始化sdk |
| -10001 | sdk初始化失败，详见整体msg内容 |
| -10003 | 接口请求超时，请稍后重试、加大超时时间或者检查网络 |
| -10006 | 上一个请求正在进行中，请稍后重试 |
| -10009 | 其他错误，详见整体msg内容，比如metadata字段等会有更详细的内容 |
| -20100 | 传入参数错误 |
| -20101 | appid为空，请检查 build.gradle 字段 GETUI_APPID |
| -20102 | appid无效或者签名无效 |
| -20104 | 预登录无效，请先进行预登录 |
| -20200 | 无网络可用，请检查手机网络、或者稍后重试 |
| -20201 | 未插手机电话卡 |
| -20202 | 未开启蜂窝网络 |
| -20203 | 不支持的运营商，请检查手机是否成功连接运营商、以及sdk支持该运营商 |
| -20301 | 登录授权页退出 |
| -20500 | 获取运营商APPID失败，请重启应用重试、或者联系技术支持 |
| -30001 | 服务器返回的其他错误，详见整体msg内容 |
| -40001 | 运营商返回的其他错误，详见整体msg内容，比如metadata字段等会有更详细的内容 |

### 移动错误码 @cm-error-code

| 错误码 | 错误信息 |
|---|---|
| 102101 | 无网络 |
| 102102 | 网络异常 |
| 102103 | 未开启数据网络 |
| 102203 | 输入参数错误 |
| 102223 | 数据解析异常，一般是卡欠费 |
| 102507 | 登录超时（授权页点登录按钮时） |
| 103101 | 请求签名错误（若发生在客户端，可能是 appkey 传错，可检查是否跟 appsecret 弄混，或者有空格。若发生在服务端接口，需要检查验签方式是 MD5 还是 RSA，如果是 MD5，则排查 signType 字段，若为 appsecret，需确认是否误用了 appkey 生签。如果是 RSA，需要检查使用的私钥跟报备的公钥是否对应和报文拼接是否符合文档要求。） |
| 103102 | 包签名错误（社区填写的 appid 和对应的包名包签名必须一致） |
| 103111 | 网关 IP 错误（检查是否开了 vpn 或者境外 ip） |
| 103119 | appid 不存在（检查传的 appid 是否正确或是否有空格） |
| 103211 | 其他错误，（常见于报文格式不对，先请检查是否符合这三个要求：a、json 形式的报文交互必须是标准的 json 格式；b、发送时请设置content type 为 application/json；c、参数类型都是 String。如有需要请联系 qq 群 609994083 内的移动认证开发） |
| 103412 | 无效的请求（1.加密方式错误；2.非 json 格式；3.空请求等） |
| 103414 | 参数校验异常 |
| 103511 | 服务器 ip 白名单校验失败 |
| 103811 | token 为空 |
| 103902 | scrip 失效（客户端高频调用请求 token 接口） |
| 103911 | token 请求过于频繁，10 分钟内获取 token 且未使用的数量不超过30 个 |
| 104201 | token 已失效或不存在（重复校验或失效） |
| 105001 | 联通取号失败 |
| 105002 | 移动取号失败（一般是物联网卡） |
| 105003 | 电信取号失败 |
| 105012 | 不支持电信取号 |
| 105013 | 不支持联通取号 |
| 105018 | token 权限不足（使用了本机号码校验的 token 获取号码） |
| 105019 | 应用未授权（未在开发者社区勾选能力） |
| 105021 | 当天已达取号限额 |
| 105302 | appid 不在白名单 |
| 105312 | 余量不足（体验版到期或套餐用完） |
| 105313 | 非法请求 |
| 200002 | 用户未安装 sim 卡 |
| 200010 | 无法识别 sim 卡或没有 sim 卡 |
| 200023 | 请求超时 |
| 200005 | 用户未授权（READ_PHONE_STATE） |
| 200020 | 授权页关闭 |
| 200021 | 数据解析异常（一般是卡欠费） |
| 200022 | 无网络 |
| 200023 | 请求超时 |
| 200024 | 数据网络切换失败 |
| 200025 | 其他错误（socket、系统未授权数据蜂窝权限等，如需要协助，请加入 qq 群发问） |
| 200026 | 输入参数错误 |
| 200027 | 未开启数据网络或网络不稳定 |
| 200028 | 网络异常 |
| 200038 | 异网取号网络请求失败 |
| 200039 | 异网取号网关取号失败 |
| 200040 | UI 资源加载异常 |
| 200050 | EOF 异常 |
| 200072 | CA 根证书校验失败 |
| 200080 | 本机号码校验仅支持移动手机号 |
| 200082 | 服务器繁忙 |
| 200087 | 授权页成功调起 |

### 联通错误码 @cu-error-code

| 错误码 | 错误信息 |
|---|---|
| 100 | 应用未授权 |
| 101 | 应用秘钥错误 |
| 102 | 应用无效 |
| 103 | 应用未授权该 IP 访问 |
| 104 | 应用访问次数不足 |
| 105 | 应用包名不正确 |
| 106 | 应用状态非法 |
| 107 | 商户状态非法 |
| 108 | 商户请求次数超限额 |
| 200 | tokenId 无效 |
| 201 | token 已失效 |
| 202 | token 未授权该应用访问 |
| 203 | 登录鉴权级别不满足接口鉴权要求 |
| 300 | 接口未开放 |
| 301 | 应用未授权码访问该接口 |
| 302 | IP 未授权码访问该接口 |
| 303 | 应用访问接口次数超日限额 |
| 400 | 请求参数为空 |
| 401 | 请求参数不完整 |
| 402 | 请求参数非法 |
| 600 | 请求非法 |
| 1000 | 请求解析错误 |
| 1001 | 请求已失效 |
| 1002 | 验签失败 |
| 1003 | 授权码已过期 |
| 1004 | 加密方式不支持 |
| 1005 | RSA 加密错误 |
| 1010 | 服务间访问失败 |
| 1011 | 服务间访问错误 |
| 3010 | 网关取号错误 |
| 3012 | 网关取号失败 |
| 3013 | 电信网关取号失败 |
| 3014 | 电信网关取号错误 |
| 3016 | 移动网关取号失败 |
| 3017 | 移动网关取号错误 |
| 3050 | 取号网关内部错误 |
| 3057 | 网关鉴权码查找号码失败 |
| 3058 | 网关鉴权码格式错误 |
| 3059 | 网关鉴权码已失效 |
| 3060 | 网关账号认证失败 |
| 3061 | 网关取号配额不足 |
| 3062 | IP 未授权访问网关 |
| 3063 | 网关并发连接数受限 |
| 3064 | 访问网关参数非法 |
| 3065 | 未授权访问该网关能力 |
| 3066 | 网关服务暂时不可用 |

### 电信错误码 @ct-error-code

| 错误码 | 错误信息 |
|---|---|
| -64 | permission-denied(无权限访问) |
| -65 | API-request-rates-Exceed-Limitations(调用接口超限) |
| -10001 | 取号失败 |
| -10002 | 参数错误 |
| -10003 | 解密失败 |
| -10004 | ip受限 |
| -10005 | 异网取号回调参数异常 |
| -10006 | Mdn取号失败，且属于电信网络 |
| -10007 | 重定向到异网取号 |
| -10008 | 超过预设取号阈值 |
| -10009 | 时间戳过期 |
| -20005 | sign-invalid（签名错误） |
| -20006 | 应用不存在 |
| -20007 | 公钥数据不存在 |
| -20100 | 内部解析错误 |
| -20102 | 加密参数解析失败 |
| -30001 | 时间戳非法 |
| -30003 | topClass失效，请查看5.3+5.4常见问题。 |
| 51002 | 参数为空 |
| 51114 | 无法获取手机号数据 |
| 80000 | 请求超时 |
| 80001 | 请求网络异常 |
| 80002 | 响应码错误 |
| 80003 | 无网络连接 |
| 80004 | 移动网络未开启 |
| 80005 | Socket超时异常 |
| 80006 | 域名解析异常 |
| 80007 | IO异常 |
| 80008 | No route to host |
| 80009 | nodename nor servname provided, or not known |
| 80010 | Socket closed by remote peer |
| 80100 | 登录结果为空 |
| 80101 | 登录结果异常 |
| 80102 | 预登录异常 |
| 80103 | SDK未初始化 |
| 80104 | 未调用预登录接口 |
| 80105 | 加载nib文件异常 |
| 80200 | 用户关闭界面 |
| 80201 | 其他登录方式 |
| 80800 | WIFI切换异常 |
| 80801 | WIFI切换超时 |

## 关于login(标准登录)与customLogin(自定义页面登录)
三大电信运营商对一键登录在App端如何使用有一套规范，开发者必须遵守这套规范，否则会被停止服务。

uni-app x为开发者提供了两种使用方式来合规的使用一键登录：

### 标准登录
uni-app框架预置了一个全屏和半屏的界面模板，该页面已经遵守了运营商的规范。

开发者的代码首先调用预登录，预登录成功后，调用`login`方法拉起授权页面，登录成功后通过`close`方法关闭页面。

此方式的优点是方便快捷、无需开发界面UI，缺点是预置页面无法自定义。

### 自定义页面登录@custom-specification-requirement
> HBuilderX 4.41+

调用预登录接口如果成功，会返回4项内容：
1. number：带掩码的手机号
2. slogan：运营商品牌（中国移动|中国联通|中国电信）
3. privacyName：运营商协议名称
4. privacyUrl：运营商协议在线地址

开发者需要根据运营商的规范要求在自己的登录页面上呈现上述信息。

运营商对一键登录界面的规范要求是，页面必须有5个UI要素，包括：
1. 含掩码的手机号码(numberTextElement)：从预登录接口获取。必须使用[text组件](https://doc.dcloud.net.cn/uni-app-x/component/text.html)呈现在界面上。
2. 运营商品牌(sloganTextElement)：从预登录接口获取。必须使用[text组件](https://doc.dcloud.net.cn/uni-app-x/component/text.html)呈现在界面上。
3. 同意协议的checkbox(privacyCheckBoxElement)：自行使用[checkbox组件](https://doc.dcloud.net.cn/uni-app-x/component/checkbox.html)构造在界面上。不可默认勾选，必须让终端用户手动勾选。
4. 协议名称(privacyTextElement)：从预登录接口获取。必须使用[text组件](https://doc.dcloud.net.cn/uni-app-x/component/text.html)呈现在界面上，放置在privacyCheckBoxElement后面，text的样式需有可点击效果，点击后需要通过webview打开运营商的在线协议地址(privacyUrl)
5. 登录按钮(LoginButton)：自行使用[button组件](https://doc.dcloud.net.cn/uni-app-x/component/button.html)实现。必须包含“登录”或“注册”等文字，不得诱导用户授权，必须让终端用户手动点击，不可自动发起。

- 开发者不得通过任何技术手段将上述授权页面的五个必要元素内容隐藏、覆盖、或者动态变更。
- 对于接入一键登录并上线的应用，运营商会对上线的应用授权页面做审查，如果有出现未按要求弹出或设计授权页面的，将关闭应用的认证取号服务。

uvue页面放置好上述5个UniElement后，在页面的登录按钮点击事件内调用`customLogin`方法，入参传入上述五个UI元素的UniElement对象。uni-app x框架会校验这些UniElement是否遵守了运营商规范。
如果不符合规范会抛出错误（见错误码表），如符合规范会继续调用运营商的接口。

注意：如果使用三方UI库里的checkbox和button组件，可能无法获取到正确的UniCheckboxElement和UniButtonElement。此时建议改用uni-app x的标准内置组件。

登录成功后通过`uni.navigateBack()`或`uni.closeDialogPage()`等方式关闭授权页。

hello uni-app x里有完整的自定义登录的示例代码，该示例中：
1. 首先在[预登录页面](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/API/get-univerify-manager/get-univerify-manager.uvue)获取运营商返回的4项内容。点击自定义一键登录后弹出[dialogPage](./dialog-page.md)，并通过页面地址传参方式，将4项内容传给自定义登录页面。实际开发中，你可以使用dialogPage，也可以使用一个普通页面。
2. 在[自定义一键登录页面](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/API/get-univerify-manager/univerify-custom-page.uvue)，按规范放置合适的UniElement，点击登录后调用`customLogin`方法。登录成功后调用`uni.closeDialogPage()`关闭。

## Tips
- 一键登录并非100%成功，手机没有sim卡、蜂窝网络未开启、当时手机没有蜂窝网信号是最常见的原因，更多错误见上方的错误码列表。在一键登录无法使用时，可转为短信验证码登录。在[uni-id-pages](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)里已经集成了相关逻辑，无需自己开发。[详情](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)
- 一键登录支持标准基座真机运行，涉及费用扣除开发者的费用。无需自定义基座。(APP-iOS平台标准基座仅支持使用默认的Bundle ID测试，若使用其他Bundle ID需要自定义基座)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

