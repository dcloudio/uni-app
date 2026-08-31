::: sourceCode
## uni.requestSystemPermission(options) @requestsystempermission
:::

申请系统权限

### requestSystemPermission 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **RequestSystemPermissionOptions** | 是 | Web: x; 微信小程序: x; iOS: x | 请求系统权限参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| permissions | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 申请的系统权限列表 |
| success | (result: [RequestSystemPermissionSuccess](#requestsystempermissionsuccess-values)) => void | 否 | Web: x; 微信小程序: x; iOS: x | 申请系统权限成功回调 |
| fail | (result: [RequestSystemPermissionFail](#requestsystempermissionfail-values)) => void | 否 | Web: x; 微信小程序: x; iOS: x |  |
| complete | (result: any) => void | 否 | Web: x; 微信小程序: x; iOS: x |  | 

#### RequestSystemPermissionSuccess 的属性值 @requestsystempermissionsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| grantedList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 已授权权限列表，仅包含当前系统支持的权限 |
| deniedList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 已拒绝权限列表 |
| doNotAskAgainList | Array&lt;string&gt; | 是 | Web: x; 微信小程序: x; iOS: x | 不在询问权限列表 |

#### RequestSystemPermissionFail 的属性值 @requestsystempermissionfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: x; iOS: x | 错误码 |
| errSubject | string | 是 | Web: x; 微信小程序: x; iOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 微信小程序: x; iOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 微信小程序: x; iOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1560601 | Web: x; 微信小程序: x; iOS: x | 申请权限为空 |
| 1560604 | Web: x; 微信小程序: x; iOS: x | 不支持申请权限 |






<!-- UTSAPIJSON.requestSystemPermission.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.requestSystemPermission)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/request-system-permission.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=requestSystemPermission&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=requestSystemPermission&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=requestSystemPermission&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=requestSystemPermission&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=requestSystemPermission&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=requestSystemPermission)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=requestSystemPermission&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.requestSystemPermission.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |
