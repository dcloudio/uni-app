<!-- ## functional-page-navigator -->

::: sourceCode
## functional-page-navigator

> issues: https://issues.dcloud.net.cn/?mid=component.wx.other.functional-page-navigator

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/functional-page-navigator.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=functional-page-navigator&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| version | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>跳转到的小程序版本，**线上版本必须设置为 release** |
| name | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>要跳转到的功能页 |
| args | object | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(object)*<br/>功能页参数，参数格式与具体功能页相关 |
| @success | eventhandler | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandler)*<br/>功能页返回，且操作成功时触发， detail 格式与具体功能页相关 |
| @fail | eventhandler | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandler)*<br/>功能页返回，且操作失败时触发， detail 格式与具体功能页相关 |
| @cancel | eventhandler | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandler)*<br/>因用户操作从功能页返回时触发 |

#### version 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| develop | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 开发版 |
| trial | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 体验版 |
| release | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 正式版 |

#### name 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| loginAndGetUserInfo | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | [用户信息功能页](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages/user-info.html) |
| requestPayment | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | [支付功能页](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages/request-payment.html) |
| chooseAddress | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | [收货地址功能页](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages/choose-address.html) |
| chooseInvoice | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | [获取发票功能页](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages/choose-invoice.html) |
| chooseInvoiceTitle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | [获取发票抬头功能页](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/functional-pages/choose-invoice-title.html) |



<!-- UTSCOMJSON.functional-page-navigator.component_type -->






