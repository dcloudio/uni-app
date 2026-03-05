<!-- ## functional-page-navigator -->

::: sourceCode
## functional-page-navigator
:::

-


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| version | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>跳转到的小程序版本，**线上版本必须设置为 release** |
| name | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>要跳转到的功能页 |
| args | object | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(object)*<br/>功能页参数，参数格式与具体功能页相关 |
| @success | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>功能页返回，且操作成功时触发， detail 格式与具体功能页相关 |
| @fail | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>功能页返回，且操作失败时触发， detail 格式与具体功能页相关 |
| @cancel | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>因用户操作从功能页返回时触发 |

#### version 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| develop | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 开发版 |
| trial | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 体验版 |
| release | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 正式版 |

#### name 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| loginAndGetUserInfo | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | [用户信息功能页](../framework/plugin/functional-pages/user-info.md) |
| requestPayment | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | [支付功能页](../framework/plugin/functional-pages/request-payment.md) |
| chooseAddress | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | [收货地址功能页](../framework/plugin/functional-pages/choose-address.md) |
| chooseInvoice | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | [获取发票功能页](../framework/plugin/functional-pages/choose-invoice.md) |
| chooseInvoiceTitle | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | [获取发票抬头功能页](../framework/plugin/functional-pages/choose-invoice-title.md) |



<!-- UTSCOMJSON.functional-page-navigator.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.wx.other.functional-page-navigator)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/functional-page-navigator.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=functional-page-navigator&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=functional-page-navigator&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=functional-page-navigator&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=functional-page-navigator&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=functional-page-navigator)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=functional-page-navigator&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
