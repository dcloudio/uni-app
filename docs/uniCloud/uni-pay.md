## 简介

`uni-pay`为`uniCloud`开发者提供了简单、易用、统一的支付能力封装。让开发者无需研究支付宝、微信等支付平台的后端开发、无需为它们编写不同代码，拿来即用，屏蔽差异。

`uni-app`前端已经封装的全端支付 api `uni.requestPayment`，现在服务端也封装好了`uni-pay for uniCloud`，从此开发者可以极快的完成前后一体的支付业务。

目前已封装 App 端（微信支付和支付宝支付）、微信小程序、支付宝小程序的支付能力。

`uni-pay`是开源 sdk，可放心使用。本插件还包含示例工程，配置自己在微信和支付宝申请的相关配置后即可运行。

**须知**

- uni-pay 对入参和返回值均做了驼峰转化，开发者在对照微信支付或者支付宝支付对应的文档时需要注意。
- 特殊参数`appId`、`mchId`需注意大小写
- 所有金额被统一为以分为单位
- 为避免无关参数干扰此文档仅列举必填参数，其余参数请参照[微信支付-小程序](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)、[微信支付-App](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1)、[支付宝支付-小程序](https://opendocs.alipay.com/apis/api_1/alipay.trade.create)、[支付宝支付-App](https://opendocs.alipay.com/apis/api_1/alipay.trade.app.pay)
- 微信支付沙箱环境不支持小程序支付，另外此沙箱环境只可以跑微信提供的测试用例不可以随意测试
- 无论是微信还是支付宝，沙箱环境都不确保稳定，如果使用沙箱的过程中遇到疑难问题建议切换成正式环境测试

## 引入 uni-pay

开发者可以自行选择是从插件市场导入还是从 npm 安装，引入方式略有不同，请看下面示例

```js
// 插件市场导入
const uniPay = require('uni-pay')

// npm安装
const uniPay = require('@dcloudio/uni-pay')
```

## 初始化

进行初始化操作返回 uni-pay 实例

### 微信支付

**入参说明**

|   参数名   |  类型   |  必填  |                        默认值                        |                  说明                  |
| :--------: | :-----: | :----: | :--------------------------------------------------: | :------------------------------------: |
|   appId    | String  |   是   |                          -                           |     当前应用在对应支付平台的 appId     |
|   mchId    | String  |   是   |                          -                           |                 商户号                 |
|    key     | String  |   是   |                          -                           |            支付商户 md5 key            |
|    pfx     | String  | Buffer |                   使用退款功能必填                   |                   -                    | 微信支付商户 API 证书，主要用于退款 |
|  timeout   | Number  |   否   |                         5000                         |        请求超时时间，单位：毫秒        |
|  signType  | String  |   否   |                         MD5                          |                签名类型                |
|  sandbox   | Boolean |   否   |                        false                         |            是否启用沙箱环境            |
| clientType | String  |   否   | 默认自动获取客户端类型，同 `context` 内的 `PLATFORM` | 客户端类型，主要用于返回客户端支付参数 |

```js
const uniPayIns = uniPay.initWeixin({
  appId: 'your appId',
  mchId: 'your mchId',
  key: 'you parterner key',
  pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
})
```

### 支付宝支付

**入参说明**

|     参数名      |  类型   | 必填 |                        默认值                        |                  说明                  |
| :-------------: | :-----: | :--: | :--------------------------------------------------: | :------------------------------------: |
|      appId      | String  |  是  |                          -                           |     当前应用在对应支付平台的 appId     |
|   privateKey    | String  |  是  |                          -                           |             应用私钥字符串             |
| alipayPublicKey | String  |  是  |                          -                           |          支付宝公钥，验签使用          |
|     keyType     | String  |  否  |                        PKCS8                         |           应用私钥字符串类型           |
|     timeout     | Number  |  否  |                         5000                         |        请求超时时间，单位：毫秒        |
|    signType     | String  |  否  |                         RSA2                         |                签名类型                |
|     sandbox     | Boolean |  否  |                        false                         |            是否启用沙箱环境            |
|   clientType    | String  |  否  | 默认自动获取客户端类型，同 `context` 内的 `PLATFORM` | 客户端类型，主要用于返回客户端支付参数 |

```js
const uniPayIns = uniPay.initAlipay({
  appId: 'your appId',
  privateKey: 'your privateKey',
  alipayPublicKey: 'you alipayPublicKey', // 使用支付时需传递此值做返回结果验签
})
```

## Api 列表

### 获取支付参数

`uniPayIns.getOrderInfo`，此接口仅支持微信小程序、支付宝小程序、App 平台

**入参说明**

|   参数名   |  类型  |                必填                | 默认值 |                                    说明                                    |         支持平台         |
| :--------: | :----: | :--------------------------------: | :----: | :------------------------------------------------------------------------: | :----------------------: |
|   openid   | String |    支付宝小程序、微信小程序必填    |   -    |                  通过对应 uniAccount 的 code2Session 获取                  | 支付宝小程序、微信小程序 |
|  subject   | String | 支付宝支付必填，微信支付时忽略此项 |   -    |                                  订单标题                                  |        支付宝支付        |
|    body    | String |            微信支付必填            |   -    |                                  商品描述                                  |         微信支付         |
| outTradeNo | String |                必填                |   -    | 商户订单号,64 个字符以内、只能包含字母、数字、下划线；需保证在商户端不重复 |                          |
|  totalFee  | Number |                必填                |   -    |                             订单金额，单位：分                             | 支付宝小程序、微信小程序 |
| notifyUrl  | String |                必填                |   -    |                              支付结果通知地址                              |                          |

**返回值说明**

|  参数名   |  类型  |  说明  |                                支持平台                                |
| :-------: | :----: | :----: | :--------------------------------------------------------------------: |
| orderInfo | Object | String | 客户端支付所需参数，直接返回给客户端即可，下面会介绍如何搭配客户端使用 |  |

**使用示例**

```js
// 云函数 - getOrderInfo
exports.main = async function (event,context) {
	let	orderInfo = await uniPayIns.getOrderInfo({
		openid: 'user openid',
		subject: '订单标题', // 微信支付时不可填写此项
		body: '商品描述',
		outTradeNo: '商户订单号',
		totalFee: 1, // 金额，单位分
		notifyUrl: 'https://xxx.xx' // 支付结果通知地址
	})
	return {
		orderInfo
	}
}

// 客户端
uniCloud.callFunction({
	name: 'getOrderInfo',
	success(res) {
		uni.requestPayment({
      // #ifdef APP-PLUS
      provider: selectedProvider, // App端此参数必填，可以通过uni.getProvider获取
      // #endif
      // #ifdef MP-WEIXIN
      ...res.result.orderInfo,
      // #endif
      // #ifdef APP-PLUS || MP-ALIPAY
      orderInfo: res.result.orderInfo,
      // #endif
			...res.result.orderInfo
			success(){},
			fail(){}
		})
	}
})
```

### 查询订单

`uniPayIns.orderQuery`, 根据商户订单号或者平台订单号查询订单信息，主要用于未接收到支付通知时可以使用此接口进行支付结果验证

**入参说明**

|    参数名     |  类型  |          必填           | 默认值 |    说明    | 支持平台 |
| :-----------: | :----: | :---------------------: | :----: | :--------: | :------: |
|  outTradeNo   | String | 和 transactionId 二选一 |   -    | 商户订单号 |          |
| transactionId | String |  和 outTradeNo 二选一   |   -    | 平台订单号 |          |

**返回值说明**

|       参数名       |  类型  |                                                                                                                                                                          说明                                                                                                                                                                          | 支持平台 |
| :----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: |
|       appId        | String |                                                                                                                                                                   平台分配的应用 ID                                                                                                                                                                    | 微信支付 |
|       mchId        | String |                                                                                                                                                                         商户号                                                                                                                                                                         | 微信支付 |
|     outTradeNo     | String |                                                                                                                                                                       商户订单号                                                                                                                                                                       |          |
|   transactionId    | String |                                                                                                                                                                       平台订单号                                                                                                                                                                       |          |
|     tradeState     | String | 订单状态 ，微信支付： SUCCESS—支付成功，REFUND—转入退款，NOTPAY—未支付，CLOSED—已关闭，REVOKED—已撤销（刷卡支付），USERPAYING--用户支付中，PAYERROR--支付失败(其他原因，如银行返回失败)。支付宝支付：USERPAYING（交易创建，等待买家付款）、CLOSED（未付款交易超时关闭，或支付完成后全额退款）、SUCCESS（交易支付成功）、FINISHED（交易结束，不可退款） |          |
|      totalFee      | Number |                                                                                                                                                                  标价金额 ，单位：分                                                                                                                                                                   |          |
| settlementTotalFee | Number |                                                                                                                                                                 应结订单金额，单位：分                                                                                                                                                                 |          |
|      cashFee       | Number |                                                                                                                                                                 现金支付金额，单位：分                                                                                                                                                                 |          |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.orderQuery({
    outTradeNo: 'outTradeNo',
  })
  return res
}
```

### 关闭订单

`uniPayIns.closeOrder`，用于交易创建后，用户在一定时间内未进行支付，可调用该接口直接将未付款的交易进行关闭，避免重复支付。

**注意**

- 微信支付：订单生成后不能马上调用关单接口，最短调用时间间隔为 5 分钟。

**入参说明**

|    参数名     |  类型  |                        必填                         | 默认值 |    说明    |  支持平台  |
| :-----------: | :----: | :-------------------------------------------------: | :----: | :--------: | :--------: |
|  outTradeNo   | String | 使用微信时必填，使用支付宝时和 transactionId 二选一 |   -    | 商户订单号 |            |
| transactionId | String |          使用支付宝时和 outTradeNo 二选一           |   -    | 平台订单号 | 支付宝支付 |

**返回值说明**

|    参数名     |  类型  |       说明        |  支持平台  |
| :-----------: | :----: | :---------------: | :--------: |
|     appId     | String | 平台分配的应用 ID |  微信支付  |
|     mchId     | String |      商户号       |  微信支付  |
|  outTradeNo   | String |    商户订单号     | 支付宝支付 |
| transactionId | String |    平台订单号     | 支付宝支付 |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.closeOrder({
    outTradeNo: 'outTradeNo',
  })
  return res
}
```

### 撤销订单

`uniPayIns.cancelOrder`，**此接口仅支付宝支持**，支付交易返回失败或支付系统超时，调用该接口撤销交易。如果此订单用户支付失败，支付宝系统会将此订单关闭；如果用户支付成功，支付宝系统会将此订单资金退还给用户。 注意：只有发生支付系统超时或者支付结果未知时可调用撤销，其他正常支付的单如需实现相同功能请调用申请退款 API。提交支付交易后调用【查询订单 API】，没有明确的支付结果再调用【撤销订单 API】。

**入参说明**

|    参数名     |  类型  |          必填           | 默认值 |    说明    |  支持平台  |
| :-----------: | :----: | :---------------------: | :----: | :--------: | :--------: |
|  outTradeNo   | String | 和 transactionId 二选一 |   -    | 商户订单号 | 支付宝支付 |
| transactionId | String |  和 outTradeNo 二选一   |   -    | 平台订单号 | 支付宝支付 |

**返回值说明**

|    参数名     |  类型  |    说明    |  支持平台  |
| :-----------: | :----: | :--------: | :--------: |
|  outTradeNo   | String | 商户订单号 | 支付宝支付 |
| transactionId | String | 平台订单号 | 支付宝支付 |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.cancelOrder({
    outTradeNo: 'outTradeNo',
  })
  return res
}
```

### 申请退款

`uniPayIns.refund`,当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家。

**微信支付注意事项**

1. 交易时间超过一年的订单无法提交退款
2. 微信支付退款支持单笔交易分多次退款，多次退款需要提交原支付订单的商户订单号和设置不同的退款单号。申请退款总金额不能超过订单金额。 一笔退款失败后重新提交，请不要更换退款单号，请使用原商户退款单号
3. 请求频率限制：150qps，即每秒钟正常的申请退款请求次数不超过 150 次，错误或无效请求频率限制：6qps，即每秒钟异常或错误的退款申请请求不超过 6 次
4. 每个支付订单的部分退款次数不能超过 50 次
5. 如果同一个用户有多笔退款，建议分不同批次进行退款，避免并发退款导致退款失败

**入参说明**

|    参数名     |  类型  |             必填             | 默认值 |     说明     | 支持平台 |
| :-----------: | :----: | :--------------------------: | :----: | :----------: | :------: |
|  outTradeNo   | String |   和 transactionId 二选一    |   -    |  商户订单号  |          |
| transactionId | String |     和 outTradeNo 二选一     |   -    |  平台订单号  |          |
|  outRefundNo  | String | 微信支付必填，支付宝支付选填 |   -    | 商户退款单号 |          |
|   totalFee    | Number |         微信支付必填         |   -    |  订单总金额  | 微信支付 |
|   refundFee   | Number |             必填             |   -    |  退款总金额  | 微信支付 |
| refundFeeType | String |             选填             |   -    |   货币种类   |          |
|  refundDesc   | String |             选填             |   -    |   退款原因   |          |
|   notifyUrl   | String |  微信支付选填，支付宝不支持  |   -    | 退款通知 url | 微信支付 |

**返回值说明**

|    参数名     |  类型  |     说明     | 支持平台 |
| :-----------: | :----: | :----------: | :------: |
|  outTradeNo   | String |  商户订单号  |          |
| transactionId | String |  平台订单号  |          |
|  outRefundNo  | String | 商户退款单号 | 微信支付 |
|   refundId    | String | 平台退款单号 |          |
|   refundFee   | Number |  退款总金额  |          |
| cashRefundFee | Number | 现金退款金额 |          |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.refund({
    outTradeNo: '商户订单号',
    outRefundNo: '商户退款单号', // 支付宝可不填此项
    totalFee: 1, // 订单总金额，支付宝可不填此项
    refundFee: 1, // 退款总金额
  })
  return res
}
```

### 查询退款

`uniPayIns.refundQuery`，提交退款申请后，通过调用该接口查询退款状态。

**入参说明**

|    参数名     |  类型  |                     必填                      | 默认值 |                                        说明                                        | 支持平台 |
| :-----------: | :----: | :-------------------------------------------: | :----: | :--------------------------------------------------------------------------------: | :------: |
|  outTradeNo   | String | 微信支付四选一，支付宝和 transactionId 二选一 |   -    |                                     商户订单号                                     |          |
| transactionId | String |  微信支付四选一，支付宝和 outTradeNo 二选一   |   -    |                                     平台订单号                                     |          |
|  outRefundNo  | String |          微信支付四选一，支付宝必填           |   -    |                                    商户退款单号                                    |          |
|   refundId    | String |                微信支付四选一                 |   -    |                                    平台退款单号                                    | 微信支付 |
|    offset     | Number |                 微信支付选填                  |   -    | 偏移量，当部分退款次数超过 10 次时可使用，表示返回的查询结果从这个偏移量开始取记录 |          |

**注意**

- `outRefundNo`为使用支付宝请求退款接口时，传入的商户退款单号。如果在退款请求时未传入，则该值为创建交易时的商户订单号即`outTradeNo`

**返回值说明**

|     参数名     |              类型               |             说明             |  支持平台  |
| :------------: | :-----------------------------: | :--------------------------: | :--------: |
|   outTradeNo   |             String              |          商户订单号          |            |
| transactionId  |             String              |          平台订单号          |            |
|    totalFee    |             Number              |           订单金额           |            |
|    refundId    |             String              |  平台退款单号，仅支付宝返回  |            |
|   refundFee    |             Number              |          退款总金额          |            |
|   refundDesc   |             String              |           退款理由           |            |
|   refundList   |     Array&lt;refundItem&gt;     | 分笔退款信息，仅微信支付返回 |  微信支付  |
| refundRoyaltys | Array&lt;refundRoyaltysItem&gt; | 退分账明细信息，仅支付宝返回 | 支付宝支付 |

**refundItem 说明**

|       参数名        |          类型           |                                                                                                           说明                                                                                                           | 支持平台 |
| :-----------------: | :---------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: |
|     outRefundNo     |         String          |                                                                                                       商户退款单号                                                                                                       |          |
|      refundId       |         String          |                                                                                                       平台退款单号                                                                                                       |          |
|    refundChannel    |         String          |                                           退款渠道，ORIGINAL—原路退款，BALANCE—退回到余额，OTHER_BALANCE—原账户异常退到其他余额账户，OTHER_BANKCARD—原银行卡异常退到其他银行卡                                           |          |
|      refundFee      |         Number          |                                                                                                       申请退款金额                                                                                                       |          |
| settlementRefundFee |         Number          |                                                                      退款金额,退款金额=申请退款金额-非充值代金券退款金额，退款金额&lt;=申请退款金额                                                                      |          |
|    refundStatus     |         String          | 退款状态，SUCCESS—退款成功，REFUNDCLOSE—退款关闭，PROCESSING—退款处理中，CHANGE—退款异常，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，可前往商户平台（pay.weixin.qq.com）-交易中心，手动处理此笔退款。 |          |
|   couponRefundFee   |         Number          |                                                                                                     总代金券退款金额                                                                                                     |          |
|  couponRefundCount  |         Number          |                                                                                                    退款代金券使用数量                                                                                                    |          |
|    refundAccount    |         String          |                                                                                                       退款资金来源                                                                                                       |          |
|  refundRecvAccout   |         String          |                                                                                                       退款入账账户                                                                                                       |          |
|  refundSuccessTime  |         String          |                                                                                                       退款成功时间                                                                                                       |          |
|     couponList      | Array&lt;couponItem&gt; |                                                                                                       分笔退款信息                                                                                                       |          |

**couponItem 说明**

|     参数名      |  类型  |        说明        | 支持平台 |
| :-------------: | :----: | :----------------: | :------: |
|   couponType    | String |     代金券类型     |          |
| couponRefundId  | String |   退款代金券 ID    |          |
| couponRefundFee | String | 单个代金券退款金额 |          |

**refundRoyaltysItem 说明**

|   参数名    |  类型  |                                                                           说明                                                                            | 支持平台 |
| :---------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: |
| fundChannel | String |                                                                    交易使用的资金渠道                                                                     |          |
|  bankCode   | String |                                                                  银行卡支付时的银行代码                                                                   |          |
|   amount    | Number |                                                                该支付工具类型所使用的金额                                                                 |          |
| realAmount  | Number |                                                                     渠道实际付款金额                                                                      |          |
|  fundType   | String | 渠道所使用的资金类型,目前只在资金渠道(fund_channel)是银行卡渠道(BANKCARD)的情况下才返回该信息(DEBIT_CARD:借记卡,CREDIT_CARD:信用卡,MIXED_CARD:借贷合一卡) |          |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.refundQuery({
    outTradeNo: '商户订单号',
    outRefundNo: '商户退款单号', // 支付宝必填
  })
  return res
}
```

### 下载交易账单

`uniPayIns.downloadBill`，商户可以通过该接口下载历史交易清单。**仅微信支付支持**

**注意：**

1. 微信侧未成功下单的交易不会出现在对账单中。支付成功后撤销的交易会出现在对账单中，跟原支付单订单号一致；
2. 微信在次日 9 点启动生成前一天的对账单，建议商户 10 点后再获取；
3. 对账单中涉及金额的字段单位为“元”。
4. 对账单接口只能下载三个月以内的账单。
5. 对账单是以商户号纬度来生成的，如一个商户号与多个 appid 有绑定关系，则使用其中任何一个 appid 都可以请求下载对账单。对账单中的 appid 取自交易时候提交的 appid，与请求下载对账单时使用的 appid 无关。

**入参说明**

|  参数名  |  类型  | 必填 | 默认值 |                                                                                              说明                                                                                              | 支持平台 |
| :------: | :----: | :--: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------: |
| billDate | String | 必填 |   -    |                                                                                下载对账单的日期，格式：20140603                                                                                |          |
| billType | String | 选填 |  ALL   | ALL（默认值），返回当日所有订单信息（不含充值退款订单）,SUCCESS，返回当日成功支付的订单（不含充值退款订单）,REFUND，返回当日退款订单（不含充值退款订单）,RECHARGE_REFUND，返回当日充值退款订单 |          |

**返回值说明**

| 参数名  |  类型  |           说明           | 支持平台 |
| :-----: | :----: | :----------------------: | :------: |
| content | String | 文本表格的方式返回的数据 |          |

`content`示例如下

**当日所有订单**
交易时间,公众账号 ID,商户号,子商户号,设备号,微信订单号,商户订单号,用户标识,交易类型,交易状态,付款银行,货币种类,总金额,代金券或立减优惠金额,微信退款单号,商户退款单号,退款金额, 代金券或立减优惠退款金额，退款类型，退款状态,商品名称,商户数据包,手续费,费率

**当日成功支付的订单**
交易时间,公众账号 ID,商户号,子商户号,设备号,微信订单号,商户订单号,用户标识,交易类型,交易状态,付款银行,货币种类,总金额, 代金券或立减优惠金额,商品名称,商户数据包,手续费,费率

**当日退款的订单**
交易时间,公众账号 ID,商户号,子商户号,设备号,微信订单号,商户订单号,用户标识,交易类型,交易状态,付款银行,货币种类,总金额, 代金券或立减优惠金额,退款申请时间,退款成功时间,微信退款单号,商户退款单号,退款金额, 代金券或立减优惠退款金额,退款类型,退款状态,商品名称,商户数据包,手续费,费率

从第二行起，为数据记录，各参数以逗号分隔，参数前增加`符号，为标准键盘 1 左边键的字符，字段顺序与表头一致。

倒数第二行为订单统计标题，最后一行为统计数据

总交易单数，总交易额，总退款金额，总代金券或立减优惠退款金额，手续费总金额

举例如下：

```
交易时间,公众账号ID,商户号,子商户号,设备号,微信订单号,商户订单号,用户标识,交易类型,交易状态,付款银行,货币种类,总金额,代金券或立减优惠金额,微信退款单号,商户退款单号,退款金额,代金券或立减优惠退款金额,退款类型,退款状态,商品名称,商户数据包,手续费,费率
`2014-11-10 16：33：45,`wx2421b1c4370ec43b,`10000100,`0,`1000,`1001690740201411100005734289,`1415640626,`085e9858e3ba5186aafcbaed1,`MICROPAY,`SUCCESS,`OTHERS,`CNY,`0.01,`0.0,`0,`0,`0,`0,`,`,`被扫支付测试,`订单额外描述,`0,`0.60%
`2014-11-10 16：46：14,`wx2421b1c4370ec43b,`10000100,`0,`1000,`1002780740201411100005729794,`1415635270,`085e9858e90ca40c0b5aee463,`MICROPAY,`SUCCESS,`OTHERS,`CNY,`0.01,`0.0,`0,`0,`0,`0,`,`,`被扫支付测试,`订单额外描述,`0,`0.60%
总交易单数,总交易额,总退款金额,总代金券或立减优惠退款金额,手续费总金额
`2,`0.02,`0.0,`0.0,`0
```

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.downloadBill({
    billDate: '20200202',
  })
  return res
}
```

### 下载资金账单

`uniPayIns.downloadFundflow`,商户可以通过该接口下载自 2017 年 6 月 1 日起的历史资金流水账单。**仅微信支持**

**说明：**

1. 资金账单中的数据反映的是商户微信账户资金变动情况；
2. 当日账单在次日上午 9 点开始生成，建议商户在上午 10 点以后获取；
3. 资金账单中涉及金额的字段单位为“元”。

**入参说明**

|   参数名    |  类型  | 必填 | 默认值 |                                  说明                                   | 支持平台 |
| :---------: | :----: | :--: | :----: | :---------------------------------------------------------------------: | :------: |
|  billDate   | String | 必填 |   -    |                    下载对账单的日期，格式：20140603                     |          |
| accountType | String | 选填 | Basic  | 账单的资金来源账户：Basic 基本账户，Operation 运营账户，Fees 手续费账户 |          |

**返回值说明**

| 参数名  |  类型  |           说明           | 支持平台 |
| :-----: | :----: | :----------------------: | :------: |
| content | String | 文本表格的方式返回的数据 |          |

`content`示例如下

- 第一行为表头

记账时间,微信支付业务单号,资金流水单号,业务名称,业务类型,收支类型,收支金额（元）,账户结余（元）,资金变更提交申请人,备注,业务凭证号

- 从第二行起，为资金流水数据，各参数以逗号分隔，参数前增加`符号，为标准键盘 1 左边键的字符，字段顺序与表头一致

- 倒数第二行为资金账单统计标题

资金流水总笔数,收入笔数,收入金额,支出笔数,支出金额

- 最后一行为统计数据

账单示例如下：

```
记账时间,微信支付业务单号,资金流水单号,业务名称,业务类型,收支类型,收支金额（元）,账户结余（元）,资金变更提交申请人,备注,业务凭证号

`2018-02-01 04:21:23,`50000305742018020103387128253,`1900009231201802015884652186,`退款,`退款,`支出,`0.02,`0.17,`system,`缺货,`REF4200000068201801293084726067

资金流水总笔数,收入笔数,收入金额,支出笔数,支出金额

`20.0,`17.0,`0.35,`3.0,`0.18
```

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.downloadFundflow({
    billDate: '20200202',
  })
  return res
}
```

### 支付结果通知处理

`uniPayIns.verifyPaymentNotify`，用于在使用云函数 Url 化的云函数内检验并处理支付结果。

**入参说明**

只接收对应云函数的`event`作为参数

**返回值说明**

|    参数名     |  类型  |                        说明                         | 支持平台 |
| :-----------: | :----: | :-------------------------------------------------: | :------: |
|   totalFee    | Number |                     订单总金额                      |          |
|    cashFee    | Number |                    现金支付金额                     |          |
|    feeType    | String |                      货币类别                       |          |
|  outTradeNo   | String |                     商户订单号                      |          |
| transactionId | String |                     平台订单号                      |          |
|    timeEnd    | String |         支付完成时间，格式为 yyyyMMddHHmmss         |          |
|    openid     | String |                       用户 id                       |          |
|  returnCode   | String | 值 SUCCESS 时为支付成功，通常需要校验订单金额等参数 |          |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.verifyPaymentNotify(event)
  return res
}
```

### 退款结果通知

`uniPayIns.verifyRefundNotify`，用于在使用云函数 Url 化的云函数内检验并处理支付结果。

**入参说明**

只接收对应云函数的`event`作为参数

**返回值说明**

|       参数名        |  类型  |                         说明                          | 支持平台 |
| :-----------------: | :----: | :---------------------------------------------------: | :------: |
|      totalFee       | Number |                      订单总金额                       |          |
|      refundFee      | Number |                     申请退款金额                      |          |
| settlementTotalFee  | Number |                     应结订单金额                      |          |
| settlementRefundFee | Number |                       退款金额                        |          |
|     outTradeNo      | String |                      商户订单号                       |          |
|    transactionId    | String |                      平台订单号                       |          |
|      refundId       | String |                     平台退款单号                      |          |
|     outRefundNo     | String |                     商户退款单号                      |          |
|    refundStatus     | String | SUCCESS-退款成功,CHANGE-退款异常,REFUNDCLOSE—退款关闭 |          |
|    refundAccount    | String |                     退款资金来源                      |          |
|  refundRecvAccout   | String |                     退款入账账户                      |          |

**使用示例**

```js
exports.main = async function (event) {
  let res = await uniPayIns.verifyRefundNotify(event)
  return res
}
```
