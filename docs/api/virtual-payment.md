# 虚拟支付

一些平台，对非实物交易，比如vip会员、游戏道具，会进行支付分账。

比如Apple要求在iOS上的所有虚拟商品交易必须且只能使用应用内支付IAP，比如微信小程序对网剧的虚拟支付要求。

此时开发者需要按照平台的规范开发虚拟支付。

本文档仅对各平台虚拟支付的API进行封装，具体业务仍需参考平台自身的文档。不符合平台要求会导致无法通过上架审核。

一般而言，开发者需要在平台后台上架虚拟商品，获取产品id，然后在客户端发起虚拟支付请求，传入产品id等参数，进行支付。

虚拟支付请求发起后，平台会要求手机用户付款，用户会付款到平台，平台再扣除分成后结算给开发者。

平台一般还会有查询订单、关闭订单等API，只不过有的是客户端API，有的是服务器API。

目前uni-app x中，虚拟支付有两个api：
1. uni.requestVirtualPayment(options)：发起虚拟支付请求。
2. uni.getVirtualPaymentManager()：获取各平台虚拟支付的管理类，在该对象上会挂载平台专有的一些API。当需要平台扩展功能时，则需要使用本API。

::: warning Note：
1. iOS平台采用Apple新提供的框架StoreKit2实现IAP，该框架目前仅支持iOS15.0及以上版本；
2. 为了避免Apple Store审核不过，请在iOS15.0版本以下，关闭项目中的购买入口；
:::

支付不仅需要客户端开发，也需要服务器开发。
[uni-pay](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app-x.html#appleiap)是一个云端一体的开源组件，下载这个插件，客户端和服务器代码都已封装好，开发者填入参数即可使用。[详见](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app-x.html)

<!-- ## uni.requestVirtualPayment(options) @requestvirtualpayment -->

::: sourceCode
## uni.requestVirtualPayment(options) @requestvirtualpayment

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-virtualPayment


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-virtualPayment

:::

请求支付

### requestVirtualPayment 兼容性 
| Web | 微信小程序 | Android | iOS 系统版本 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 15.0 | 4.25 | - |


uni.requestVirtualPayment是一个统一各平台虚拟支付客户端API。

> 在uni-app中，iOS的IAP是放置在uni.requestPayment中的。但后期微信小程序独立了虚拟支付的API。考虑到Apple、微信、鸿蒙next都有虚拟支付，所以在uni-app x中，也独立出了单独的虚拟支付的API。

目前本API仅支持IAP。待uni-app x可以编译为微信小程序和鸿蒙hap时，也会支持相应的虚拟支付。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RequestVirtualPaymentOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| apple | **AppleIAPOptions** | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 苹果IAP的参数 |
| success | (result: [RequestVirtualPaymentSuccess](#requestvirtualpaymentsuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [RequestVirtualPaymentFail](#requestvirtualpaymentfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| mode | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 支付的类型, 不同的支付类型有各自额外要传的附加参数<br/><br/>可选值：<br/>- 'short_series_goods': 道具直购;<br/>- 'short_series_coin': 代币充值;<br/> |
| paySig | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - |  |
| signData | **RequestVirtualPaymentOptionsSignData** | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 具体支付参数见signData, 该参数需以string形式传递, 例如signData: '{"offerId":"123","buyQuantity":1,"env":0,"currencyType":"CNY","productId":"testproductId","goodsPrice":10,"outTradeNo":"xxxxxx","attach":"testdata"}'<br/> |
| signature | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - |  | 

##### apple 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| productId | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 产品id，在苹果开发者中心配置 |
| appAccountToken | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 透传参数，一般用于标记订单和用户的关系，可以用来验证和关联用户账户和购买记录 |
| quantity | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 购买数量，默认是1，最小值是1，最大值是10 |
| promotionalOffer | **AppleIAPPromotionalOffer** | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 促销优惠参数说明 |

###### promotionalOffer 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| offerIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 促销id |
| keyIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 密钥 |
| nonce | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 唯一id (必须小写 24小时有效) |
| signature | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 签名 |
| timestamp | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 创建证书的时间戳(毫秒 24小时有效) |

##### mode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| short_series_goods | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - | - |
| short_series_coin | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - | - |

##### signData 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| attach | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 透传数据, 发货通知时会透传给开发者<br/> |
| buyQuantity | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 购买数量<br/> |
| currencyType | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 币种<br/><br/>可选值：<br/>- 'CNY': 人民币;<br/> |
| offerId | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 在米大师侧申请的应用 id, mp-支付基础配置中的offerid<br/> |
| outTradeNo | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 业务订单号, 每个订单号只能使用一次, 重复使用会失败(极端情况不保证唯一, 不建议业务强依赖唯一性).  要求8-32个字符内, 只能是数字、大小写字母、符号 _-\|*@组成, 不能以下划线(_)开头<br/> |
| env | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 环境配置, 0 米大师正式环境, 1 米大师沙箱环境, 默认为 0<br/> |
| goodsPrice | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 道具单价(分), **该字段仅mode=short_series_goods时需要必填**, 用来校验价格与后台道具价格是否一致, 避免用户在业务商城页看到的价格与实际价格不一致导致投诉<br/> |
| productId | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: -; HarmonyOS: - | 道具ID, **该字段仅mode=short_series_goods时需要必填**<br/> |

#### RequestVirtualPaymentSuccess 的属性值 @requestvirtualpaymentsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| apple | **AppleIAPTransactionOptions** | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 支付成功返回结果 |

#### apple 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| productId | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 产品id，和苹果开发者中心配置的一样 |
| appAccountToken | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 透传参数，一般用于标记订单和用户的关系，可以用来验证和关联用户账户和购买记录 |
| quantity | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 购买数量 |
| transactionDate | Date | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 交易日期，示例 2022-01-01 08:00:00 |
| transactionIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 交易唯一标识 |
| originalTransactionDate | Date | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 原始交易日期，示例 2022-01-01 08:00:00 |
| originalTransactionIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 原始交易唯一标识 |
| jsonRepresentation | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 支付票据 |

#### RequestVirtualPaymentFail 的属性值 @requestvirtualpaymentfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 700000 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 其他未知错误。 |
| 700600 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 正在处理中，支付结果未知 |
| 700601 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 用户中途取消。 |
| 700602 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 网络连接出错。 |
| 700604 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 不允许App内购买项目, 请授权应用内购买权限。 |
| 700605 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 产品无效。 |
| 700606 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 促销信息错误。 |
| 700607 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 缺少支付参数。 |
| 700800 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 只支持iOS15以上的版本。 |




### 注意事项
1. uni.requestVirtualPayment api 适用Apple虚拟产品类型说明
::: warning requestVirtualPayment iOS平台说明：
uni.requestVirtualPayment api 适用于消耗性类型、非消耗性类型、自动续期订阅类型、非自动续期订阅类型产品的购买。
1. 消耗性类型：该类型的产品可以设置购买数量，默认是1，最大值是10；
2. 非消耗性类型、自动续期订阅类型、非自动续期订阅类型: 这些类型的产品购买数量设置无效，数量只能是1;
3. 非消耗性类型：该类型产品一个appleId只能购买一次，可以在任何登录该appleId账号的设备上通过restoreTransactions api获取。
:::

2. 请求支付可选参数 appAccountToken 说明
::: warning AppleIAPOptions 参数 appAccountToken 说明：
1. 参数功能：透传参数，一般用于标记订单和用户的关系，可以用来验证和关联用户账户和购买记录，功能类似 StoreKit1 中 applicationUsername 参数；
2. 建议开发者每笔支付传入该参数，该参数在Apple新提供的框架StoreKit2中会和每笔交易始终一一对应存在，不存在像 StoreKit1 中 applicationUsername 参数会丢的情况；
3. 对接Apple新提供的框架StoreKit2，appAccountToken需要是符合uuid规则的字符串，如："123eaaaa-e89b-12d3-a456-42661417400b"，必须将orderId信息转换为符合uuid规则的字符串，否则无效；
:::

3. 沙盒环境测试IAP的相关说明
::: warning 沙盒环境测试IAP的相关说明：
1. IAP仅支持真机测试，并且需要打自定义基座；
2. 打自定义基座前，需要替换该示例项目中 productList 列表中的 id 为自己在 Apple Connect 对应app中创建的产品ID；
3. 如果购买弹出 ‘不允许App内购买项目’ 的系统框，需要开启应用内购买权限 [具体操作详见](https://support.apple.com/zh-cn/102470)；
4. 测试前需要在 Apple Connect 中添加沙盒测试账号 [详见](https://appstoreconnect.apple.com/access/users/sandbox)；
5. 如果使用未添加的沙盒测试账号购买，会弹出系统提示框：‘此 Apple 账户无权在 App 内购买’，需要更换已经添加的账号测试；
:::


<!-- UTSAPIJSON.requestVirtualPayment.example -->
```ts
uni.requestVirtualPayment({
  apple: {
    productId: e.id,
    appAccountToken: "123eaaaa-e89b-12d3-a456-42661417400b",
    quantity: e.quantity ?? 1,
  },
  success: (res) => {
    uni.hideLoading()
    console.log("购买成功：该productId= " + res.apple?.productId)
    //TODO: 开发者server验证逻辑

    //经过开发者server验证成功后请结束该交易
	const virtualPaymentManager = uni.getVirtualPaymentManager()
    virtualPaymentManager.finishTransaction({
      transaction: res.apple,
      success: (r) => {
        console.log("关单成功, 该productId= " + res.apple?.productId)
      },
      fail: (e) => {
        console.log("关单失败, 该productId= " + res.apple?.productId)
      }
    })
  },
  fail: (e) => {
    uni.hideLoading()
    console.log("购买失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
  }
})
```
## uni.getVirtualPaymentManager() @getVirtualPaymentManager

获取各平台虚拟支付的管理类，用于操作各平台专有的API。

### getVirtualPaymentManager 兼容性 
| Web | 微信小程序 | Android | iOS 系统版本 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 15.0 | 4.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |



uni.getVirtualPaymentManager(): 用来创建各个平台虚拟支付的管理类，暂时仅支持iOS平台IAP支付。

### 持有方法：
1. restoreTransactions(options): 获取苹果服务器已支付的交易列表

2. getUnfinishedTransactions(options): 获取苹果服务器已支付且未关闭的交易列表

3. finishTransaction(options): 关闭苹果服务器订单

### 返回值 

| 类型 | 描述 |
| :- | :- |
| () => [VirtualPaymentManager](#virtualpaymentmanager-values) | virtual-payment的管理类 |

#### VirtualPaymentManager 的方法 @virtualpaymentmanager-values 

#### restoreTransactions(options: AppleIAPRestoreOptions): void; @restoretransactions
restoreTransactions
恢复苹果服务器已支付的交易列表
##### restoreTransactions 兼容性 
| Web | 微信小程序 | Android | iOS 系统版本 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | x | 15.0 | 4.25 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **AppleIAPRestoreOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [AppleIAPRestoreSuccess](#appleiaprestoresuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [AppleIAPRestoreFail](#appleiaprestorefail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### AppleIAPRestoreSuccess 的属性值 @appleiaprestoresuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| transactions | Array&lt;**AppleIAPTransactionOptions**&gt; | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 返回的交易列表 |

#### transactions 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| productId | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 产品id，和苹果开发者中心配置的一样 |
| appAccountToken | string | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 透传参数，一般用于标记订单和用户的关系，可以用来验证和关联用户账户和购买记录 |
| quantity | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 购买数量 |
| transactionDate | Date | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 交易日期，示例 2022-01-01 08:00:00 |
| transactionIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 交易唯一标识 |
| originalTransactionDate | Date | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 原始交易日期，示例 2022-01-01 08:00:00 |
| originalTransactionIdentifier | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 原始交易唯一标识 |
| jsonRepresentation | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: - | 支付票据 |

###### AppleIAPRestoreFail 的属性值 @appleiaprestorefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 700600 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | apple restore 请求失败。 |
| 700601 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 用户中途取消。 |
| 700602 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 网络连接出错。 |
| 700800 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 只支持iOS15以上的版本。 |


#### getUnfinishedTransactions(options: AppleIAPUnfinishedTransactionOptions): void; @getunfinishedtransactions
getUnfinishedTransactions
获取苹果服务器已支付且未关闭的交易列表
##### getUnfinishedTransactions 兼容性 
| Web | 微信小程序 | Android | iOS 系统版本 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | x | 15.0 | 4.25 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **AppleIAPUnfinishedTransactionOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [AppleIAPUnfinishedTransactionSuccess](#appleiapunfinishedtransactionsuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [AppleIAPUnfinishedTransactionFail](#appleiapunfinishedtransactionfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### AppleIAPUnfinishedTransactionSuccess 的属性值 @appleiapunfinishedtransactionsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| transactions | Array&lt;[AppleIAPTransactionOptions](#appleiaptransactionoptions-values)&gt; | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 返回的交易列表 |

###### AppleIAPUnfinishedTransactionFail 的属性值 @appleiapunfinishedtransactionfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 错误码<br/>- 700800  只支持iOS15以上的版本。 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |


#### finishTransaction(options: AppleIAPFinishTransactionOptions): void; @finishtransaction
finishTransaction
关闭苹果服务器订单
##### finishTransaction 兼容性 
| Web | 微信小程序 | Android | iOS 系统版本 | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | - | x | 15.0 | 4.25 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **AppleIAPFinishTransactionOptions** | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| transaction | [AppleIAPTransactionOptions](#appleiaptransactionoptions-values) | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 交易对象 |
| success | (result: [AppleIAPFinishTransactionSuccess](#appleiapfinishtransactionsuccess-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [AppleIAPFinishTransactionFail](#appleiapfinishtransactionfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### AppleIAPFinishTransactionSuccess 的属性值 @appleiapfinishtransactionsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| state | boolean | 否 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 关单状态 |

###### AppleIAPFinishTransactionFail 的属性值 @appleiapfinishtransactionfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 700600 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 没有该交易。 |
| 700800 | Web: x; 微信小程序: -; Android: x; iOS 系统版本: 15.0; iOS: 4.25; HarmonyOS: x | 只支持iOS15以上的版本。 |

 

### 注意事项
1. restoreTransactions(options): 获取苹果服务器已支付的交易列表
::: warning restoreTransactions api iOS平台说明：
restoreTransactions api 适用于非消耗性类型、自动续期订阅类型、非自动续期订阅类型产品的购买。
1. 非消耗性类型: 返回每个已购买的非消耗性类型产品的购买记录；
2. 自动续期订阅类型: 返回每个已购买的自动续期订阅类型产品的最新购买记录，沙盒账号最多可自动续订 12 次；
3. 非自动续期订阅类型: 返回每个已购买的非自动续期订阅类型产品的最新购买记录, 该类型订阅可以连续多次购买，开发者需要自己的后台计算产品过期的时间；
4. 不能用来恢复消耗性类型的购买记录。
:::

2. getUnfinishedTransactions(options): 获取苹果服务器已支付且未关闭的交易列表
::: warning getUnfinishedTransactions api iOS平台说明：
getUnfinishedTransactions api 适用于获取未完成的各种类型产品的购买记录（用来防止丢单）。
1. 比如用户点击购买已经付款成功，但因网络、手机没电关机等特殊情况，Apple IAP没有返回客户端对应的购买凭证，从而导致无法finish该交易导致的丢单，可以在需要的地方调用该api获得此类未finished的交易记录;
2. 针对消耗性类型产品交易，只能通过该api获取未finished的交易，防止丢单；
3. 对于其他类型产品未finished交易, 不仅可以通过该api获取，也可以通过restoreTransactions api (也可获取已经finished的交易)获取；
4. 对于自动续期订阅类型产品的续订交易，建议在每次app启动的时候调用该api判断是否续订成功；
:::

3. finishTransaction(options): 关闭苹果服务器订单
::: warning finishTransaction api iOS平台说明：
finishTransaction api 适用于各种类型产品的购买经自己服务器验证成功后，用来关闭苹果服务器对应订单。
:::
<!-- UTSAPIJSON.getVirtualPaymentManager.example -->

```ts
//创建虚拟支付管理类
const virtualPaymentManager = uni.getVirtualPaymentManager()

//获取苹果服务器已支付的交易列表
virtualPaymentManager.restoreTransactions({
    success: (res) => {
        uni.hideLoading()
        console.log("restore成功的交易个数：" + res.transactions.length)
        res.transactions.forEach(transaction => {

        //TODO: 开发者server验证逻辑

        console.log("restore成功的交易productId= " + transaction.productId)
        })
    },
    fail: (e) => {
        uni.hideLoading()
        console.log("restore失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
    }
})

//获取苹果服务器已支付且未关闭的交易列表
virtualPaymentManager.getUnfinishedTransactions({
  success: (res) => {
    uni.hideLoading()
    console.log("获取未结束的订单列表个数：" + res.transactions.length)

    res.transactions.forEach(transaction => {
      console.log("getUnfinishedTransactions成功的交易productId= " + transaction.productId)
      //TODO: 开发者server验证逻辑

      //经过开发者server验证成功后关闭苹果服务器订单
      virtualPaymentManager.finishTransaction({
        transaction: transaction,
        success: (r) => {
          console.log("关单成功, 该productId= " + transaction.productId)
        },
        fail: (e) => {
          console.log("关单失败, 该productId= " + transaction.productId)
        }
      })
    })
  },
  fail: (e) => {
    uni.hideLoading()
    console.log("获取未结束的订单列表失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
  }
})
```

## 开发者验单逻辑说明：
::: warning 验单说明：
1. 开发者服务器的验单流程完全由开发者自己实现，该流程不受框架影响。
2. 与IAP相关的服务器逻辑比较复杂，Uni 封装了相关的插件 uni-pay，不但减少开发者服务器相关开发的工作量，而且可以高效接入IAP功能，推荐使用 uni-pay 插件。[uni-pay](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app-x.html#appleiap)是一个云端一体的开源组件，下载这个插件，客户端和服务器代码都已封装好，开发者填入参数即可使用。[详见](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app-x.html)
:::

### 验单涉及到的api：
1. uni.requestVirtualPayment() :购买成功并且获取到对应的交易信息，需要先验单成功，再通过uni.getVirtualPaymentManager().finishTransaction 关单；
2. uni.getVirtualPaymentManager().getUnfinishedTransactions() :获取苹果服务器已支付且未关闭的交易列表后，每笔交易都需要先验单成功，再通过uni.getVirtualPaymentManager().finishTransaction 关单；

### 服务器验单机制：
1. 服务器调用Apple 提供的验单api，具体参考[Apple 文档](https://developer.apple.com/documentation/appstoreserverapi/get_transaction_info)
正式环境：https://api.storekit.itunes.apple.com/inApps/v1/transactions/{transactionId}
Sandbox环境：https://api.storekit-sandbox.itunes.apple.com/inApps/v1/transactions/{transactionId}

2. 由于当前采用Apple 最新的StoreKit 2.0 版本，所以验单api不同于StoreKit 1.0版本Apple提供的验单api，详见已废弃的[StoreKit 1.0版本Apple提供的验单api](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)

### 使用App Store Server Notifications V2 机制
该通知机制是当发生有效购买后 Apple 服务器主动通知开发者自己服务器具体交易信息的机制，需要开发者自己的服务器按照Apple相关要求进行正确配置后才能生效。

具体参考相关文档：
1. [App Store Server API](https://developer.apple.com/documentation/appstoreserverapi)
2. [Enabling App Store Server Notifications](https://developer.apple.com/documentation/appstoreservernotifications/enabling_app_store_server_notifications)
3. [Enter server URLs for App Store Server Notifications](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/enter-server-urls-for-app-store-server-notifications)


## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/virtual-payment/virtual-payment.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/virtual-payment/virtual-payment.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/virtual-payment/virtual-payment
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <page-head title="虚拟支付"></page-head>
    <view style="padding-left: 20px; padding-right: 20px;">
      <text>
        requestVirtualPayment api 适用于消耗性类型、非消耗性类型、自动续期订阅类型、非自动续期订阅类型产品的购买。\n\n
        1. 消耗性类型：该类型的产品可以设置购买数量，默认是1，最大值是10； \n
        2. 非消耗性类型、自动续期订阅类型、非自动续期订阅类型: 这些类型的产品购买数量设置无效，数量只能是1; \n
        3. 非消耗性类型：该类型产品一个appleId只能购买一次，可以在任何登陆该appleId账号的设备上restore获取。
      </text>
      <button style="margin-top: 20px;" type="primary" v-for="(item,index) in productList" :key="index"
        @click="requestVirtualPayment(item)">{{item.name}}</button>

      <text>
        \nrestoreTransactions api 适用于非消耗性类型、自动续期订阅类型、非自动续期订阅类型产品的购买。\n\n
        1. 非消耗性类型: 返回每个已购买的非消耗性类型产品的购买记录；\n
        2. 自动续期订阅类型: 返回每个已购买的自动续期订阅类型产品的最新购买记录，沙盒账号最多可自动续订 12 次；\n
        3. 非自动续期订阅类型: 返回每个已购买的非自动续期订阅类型产品的最新购买记录, 该类型订阅可以连续多次购买，开发者需要自己的后台计算产品过期的时间。\n
        Note: 不能用来恢复消耗性类型的购买记录。
      </text>
      <button style="margin-top: 20px;" type="primary" @click="restoreTransactions">恢复购买订单列表</button>

      <text>
        \ngetUnfinishedTransactions api 适用于获取未完成的各种类型产品的购买记录（用来防止丢单）。\n\n
        1. 比如用户点击购买已经付款成功，但因网络、手机没电关机等特殊情况，Apple IAP
        没有返回客户端对应的购买凭证，从而导致无法finish该交易导致的丢单，可以在需要的地方调用该api获得此类未finished的交易记录; \n
        2. 针对消耗性类型产品交易，只能通过该api获取未finished的交易，防止丢单；\n
        3. 对于其他类型产品未finished交易, 不仅可以通过该api获取，也可以通过restoreTransactions api (也可获取已经finished的交易)获取；
      </text>
      <button style="margin-top: 20px; margin-bottom: 50px;" type="primary"
        @click="getUnfinishedTransactions">获取未结束的订单列表</button>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>


<script setup lang="uts">
  export type PayItem = { id : string, name : string, quantity ?: number }

  const productList = ref<PayItem[]>([])
  const virtualPaymentManager = ref<Object>(Object)

  const getPackageName = (): string => {
    const res = uni.getAppBaseInfo();
    let packageName : string = ""

    // #ifdef APP-ANDROID
    packageName = res.packageName
    // #endif

    // #ifdef APP-IOS
    packageName = res.bundleId
    // #endif

    return packageName
  }

  const isDebug = (): boolean => {
    if (getPackageName() == 'io.dcloud.uniappx') {
      return true
    }
    return false
  }

  const isProd = (): boolean => {
    if (getPackageName() == 'io.dcloud.hellouniappx') {
      return true
    }
    return false
  }

  const isCustom = (): boolean => {
    if (isDebug() == false && isProd() == false) {
      return true
    }
    return false
  }

  const initProductList = () => {
    productList.value.push({
      name: '消耗性产品：个人赞助1元',
      id: isDebug() ? "uniappx.consumable.sponsor_1" : "uniappx.consumable.sponsor1",
      quantity: 1
    } as PayItem);

    productList.value.push({
      name: '消耗性产品：金牌赞助5元, 数量=2',
      id: isDebug() ? "uniappx.consumable.sponsor_50" : "uniappx.consumable.sponsor50",
      quantity: 2
    } as PayItem);

    productList.value.push({
      name: '非消耗性产品: 赞助特效1元',
      id: isDebug() ? "uniappx.nonconsumable.sponsorskin_1" : "uniappx.nonconsumable.sponsorskin1"
    } as PayItem);

    // productList.value.push({
    //   name: '自动续期订阅产品：每月定期赞助1元',
    //   id: isDebug() ? "uniappx.autorenewable.monthly_1" : "uniappx.autorenewable.monthly1"
    // } as PayItem);

    productList.value.push({
      name: '非自动续期订阅产品：月赞助1元',
      id: isDebug() ? "uniappx.nonrenewable.monthly_1" : "uniappx.nonrenewable.monthly1"
    } as PayItem);

    // productList.value.push({
    //   name: '测试不存在的产品',
    //   id: "uniappx.nonrenewable.none"
    // } as PayItem);
  }

  onLoad(() => {
    virtualPaymentManager.value = uni.getVirtualPaymentManager()
    initProductList()
  })

  const requestVirtualPayment = (e: PayItem) => {
    uni.showLoading({
      title: "",
      mask: true
    });

    uni.requestVirtualPayment({
      //需要将orderId转换为如下符合UUID规则的字符串，然后赋值给参数appAccountToken, 传入不符合UUID规则的字符串无效
      apple: {
        productId: e.id,
        appAccountToken: "123eaaaa-e89b-12d3-a456-42661417400b",
        quantity: e.quantity ?? 1,
      },
      success: (res) => {
        uni.hideLoading()
        console.log("购买成功：该productId= " + res.apple?.productId)
        //TODO: 开发者server验证逻辑

        //经过开发者server验证成功后请结束该交易
        uni.showToast({
          title: "购买成功：" + res.apple?.productId,
          icon: 'success'
        })

        virtualPaymentManager.value.finishTransaction({
          transaction: res.apple,
          success: (r) => {
            console.log("关单成功, 该productId= " + res.apple?.productId)
          },
          fail: (e) => {
            console.log("关单失败, 该productId= " + res.apple?.productId)
          }
        })
      },
      fail: (e) => {
        uni.hideLoading()
        console.log("购买失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
        uni.showToast({
          title: "购买失败错误码：" + e.errCode,
          icon: 'error'
        })
      }
    })
  }

  const restoreTransactions = () => {
    uni.showLoading({
      title: "",
      mask: true
    });

    virtualPaymentManager.value.restoreTransactions({
      success: (res) => {
        uni.hideLoading()
        console.log("restore成功的交易个数：" + res.transactions.length)
        res.transactions.forEach(transaction => {

          //TODO: 开发者server验证逻辑

          console.log("restore成功的交易productId= " + transaction.productId)
        })
        uni.showToast({
          title: "restore成功的交易个数：" + res.transactions.length,
          icon: 'success'
        })
      },
      fail: (e) => {
        uni.hideLoading()
        console.log("restore失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
        uni.showToast({
          title: "restore失败错误码：" + e.errCode,
          icon: 'error'
        })
      }
    })
  }

  const getUnfinishedTransactions = () => {
    uni.showLoading({
      title: "",
      mask: true
    });

    virtualPaymentManager.value.getUnfinishedTransactions({
      success: (res) => {
        uni.hideLoading()
        console.log("获取未结束的订单列表个数：" + res.transactions.length)
        uni.showToast({
          title: "获取未结束的订单列表个数：" + res.transactions.length,
          icon: 'success'
        })

        res.transactions.forEach(transaction => {

          console.log("getUnfinishedTransactions成功的交易productId= " + transaction.productId)
          //TODO: 开发者server验证逻辑

          //经过开发者server验证成功后请结束该交易
          virtualPaymentManager.value.finishTransaction({
            transaction: transaction,
            success: (r) => {
              console.log("关单成功, 该productId= " + transaction.productId)
            },
            fail: (e) => {
              console.log("关单失败, 该productId= " + transaction.productId)
            }
          })
        })
      },
      fail: (e) => {
        uni.hideLoading()
        console.log("获取未结束的订单列表失败：errSubject= " + e.errSubject + ", errCode= " + e.errCode + ", errMsg= " + e.errMsg)
        uni.showToast({
          title: "获取未结束的订单列表失败错误码" + e.errCode,
          icon: 'error'
        })
      }
    })
  }

</script>

```
:::
