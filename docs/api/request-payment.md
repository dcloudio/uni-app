<!-- ## uni.requestPayment(options) @requestpayment -->

::: sourceCode
## uni.requestPayment(options) @requestpayment

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-payment


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-payment

:::

请求支付

### requestPayment 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.02 | 4.18 | 4.61 | 5.0 |


uni.requestPayment是一个统一各平台的客户端支付API，客户端均使用本API调用支付。

本API运行在各端时，会自动转换为各端的原生支付调用API。

注意支付不仅仅需要客户端的开发，还需要服务端开发。虽然客户端API统一了，但各平台的支付申请开通、配置回填仍然需要看各个平台本身的支付文档。

比如微信有App支付的申请入口和使用流程，对应到uni-app，在App端要申请微信的App支付。

如果服务端使用[uniCloud](https://uniapp.dcloud.io/uniCloud/README)，那么官方提供了[uniPay](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app.html)云端统一支付服务，把App、微信小程序、支付宝小程序里的服务端支付开发进行了统一的封装。

前端统一的`uni.requestPayment`和云端统一的`uniPay`搭配，可以极大提升支付业务的开发效率，强烈推荐给开发者使用。`uniPay`的文档另见：[https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app.html](https://doc.dcloud.net.cn/uniCloud/uni-pay/uni-app.html)

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RequestPaymentOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 是 | - | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 支付服务提供商，通过 [uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) 获取,目前支持支付宝支付(alipay),微信支付(wxpay) |
| orderInfo | string | 是 | - | Web: x; 微信小程序: x; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 订单数据 |
| success | (result: [RequestPaymentSuccess](#requestpaymentsuccess-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [RequestPaymentFail](#requestpaymentfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） |
| nonceStr | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 随机字符串，长度为32个字符以下<br/> |
| package | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***<br/> |
| paySign | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 签名，具体见微信支付文档<br/> |
| timeStamp | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数，即当前的时间<br/> |
| signType | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 签名算法，应与后台下单时的值一致<br/><br/>可选值：<br/>- 'MD5': 仅在 v2 版本接口适用;<br/>- 'HMAC-SHA256': 仅在 v2 版本接口适用;<br/>- 'RSA': 仅在 v3 版本接口适用;<br/> |

##### signType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| MD5 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| HMAC-SHA256 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| RSA | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 

#### RequestPaymentSuccess 的属性值 @requestpaymentsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 返回数据 |

#### RequestPaymentFail 的属性值 @requestpaymentfail-values 

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
| 700000 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 其它支付错误。 |
| 700600 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 正在处理中，支付结果未知（有可能已经支付成功），请查询商家订单列表中订单的支付状态 |
| 700601 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 用户中途取消。 |
| 700602 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 网络连接出错。 |
| 700603 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 支付结果未知（有可能已经支付成功），请查询商家订单列表中订单的支付状态。 |
| 700604 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 微信没有安装。 |
| 700605 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 服务供应商获取失败。 |
| 700607 | Web: x; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 支付未完成。 |
| 700608 | Web: x; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 服务商返回参数错误。 |
| 700800 | Web: x; 微信小程序: -; Android: x; iOS: 4.18; HarmonyOS: x | 没有配置对应的URL Scheme。 |
| 700801 | Web: x; 微信小程序: -; Android: x; iOS: 4.18; HarmonyOS: x | 没有配置对应的Universal Link。 |
| 701100 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 订单支付失败。 |
| 701110 | Web: x; 微信小程序: -; Android: 4.02; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 重复请求。 |


### orderInfo参数说明

 - 支付宝支付
  App 支付请求参数字符串，主要包含商家的订单信息，key=value 形式，以 & 连接。示例
  ```
  app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%
  22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%
  91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22
  %2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&charset=utf-8&method=alipay.trade.app.pay&sign_type=R
  SA2&timestamp=2016-08-15%2012%3A12%3A15&version=1.0&sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552
  EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJd
  hIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D<br>
  ```
  [更多详情参考[支付宝官方文档](https://opendocs.alipay.com/open/204/105296?pathHash=22ed0058&ref=api)]

 -  微信支付
  App 支付请求参数字符串,需要打自定义基座。示例
  ```json
  {
   "appid":"wxd569c7238830733b",
   "noncestr":"6N47VnR42bqIm4xq",
   "package":"Sign=WXPay",
   "partnerid":"1230636401",
   "prepayid":"wx26174750316675ac54b89c224eb3250000",
   "timestamp":1711446470,
   "sign":"EE987459B9CFF6462462147130110D31"
  }
  ```
  [更多详情参考[微信官方文档]( https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)]






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.payment.requestPayment)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/payment.html#requestpayment)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=requestPayment&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=requestPayment&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=requestPayment&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=requestPayment&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=requestPayment)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=requestPayment&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 支付provider对象描述 @providerdes

UniPaymentAlipayProvider(支付宝支付)继承自 [UniProvider](./provider.md#uniprovider)

UniPaymentWxpayProvider(微信支付)继承自 [UniProvider](./provider.md#uniprovider)，特有字段说明：

| 名称           | 类型      | 必备 | 默认值  | 描述                                  |
| -------------- | --------- | ---- | ------ | ------------------------------------- |
| isWeChatInstalled     | boolean   | 是    | -      | 判断微信是否安装 |


### 支付SDK错误码

支付失败时可通过错误回调参数`IRequestPaymentFail`中的`cause`属性获取支付SDK的源错误信息，类型为[SourceError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#sourceerror)，其包含 code 属性存储了支付SDK的原始错误码。

#### 支付宝支付
| 支付宝错误码 | 错误信息 |
|---|---|
| 9000 | 订单支付成功 |
| 8000 | 正在处理中，支付结果未知（有可能已经支付成功），请查询商家订单列表中订单的支付状态 |
| 4000 | 订单支付失败 |
| 5000 | 重复请求 |
| 6001 | 用户中途取消 |
| 6002 | 网络连接出错 |
| 6004 | 支付结果未知（有可能已经支付成功），请查询商家订单列表中订单的支付状态 |
|  其它  | 其它支付错误 |

#### 微信支付

| 微信支付错误码 | 错误信息 |
|---|---|
| 0 | 成功 |
| -1 | 可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常原因等 |
| -2 | 无需处理。发生场景：用户不支付了，点击取消，返回APP |
| -3 | 发送失败 |
| -4 | 授权被拒绝 |
| -5 | 不支持 |
| -6 | 禁止 |
| 其它 | 其它支付错误 |

### 注意
- App平台开发支付宝支付，无需自定义基座，真机运行可直接开发
- App平台判断微信是否安装可以通过`uni.getProvider`的方式，详见[uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html#getprovider)
- 在4.25版本前使用微信支付，Android需要在隐私协议弹框后调用微信sdk

```ts
   uni.getProvider({
      service: "payment",
      success: (e) => {
         const provider = e.providers.find((item): boolean => {
            return item.id == 'wxpay'
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
         console.log("获取支付通道失败：", e);
      }
   })
```

- **app需要在根目录manifest.json文件中配置`uni-payment`节点，详见 [https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-payment模块配置](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-payment)**
- app 在`HBuilderX 4.71+`支持可视化界面配置，各平台配置请参考：
  [app-ios平台](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulespayment)、
  [app-android平台](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulespayment)、
  [app-harmony平台](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-harmony.html#modulespayment)
- app-android平台微信支付需要4.11及以上版本
- app-ios平台微信支付需要4.18及以上版本
- 关于支付宝支付，当传入orderinfo参数后，app-android平台可以成功调用支付宝，但app-ios平台有时会出现奔溃&卡顿，这时候需要检测后端 ‘out_trade_no’ 参数是否设置为string类型，参考[支付宝文档：业务请求参数](https://opendocs.alipay.com/open/cd12c885_alipay.trade.app.pay)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/request-payment/request-payment.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/request-payment/request-payment.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/request-payment/request-payment
```uvue
<template>
  <page-head title="发起支付"></page-head>
  <view class="uni-common-mt" style="padding: 0 10px;">
    <text>如对当前页面的支付示例功能有任何疑问，通过电子邮件：service@dcloud.io 联系我们</text>
  </view>
  <template v-if="providerList.length > 0">
    <button style="margin-top: 20px;" type="primary" v-for="(item,index) in providerList" :key="index"
      @click="requestPayment(item)">{{item.name}}</button>
  </template>
</template>

<script setup lang="uts">
  export type PayItem = { id : string, name : string, provider ?: UniProvider }

  type DataType = {
    btnText : string,
    btnType : string,
    orderInfo : string,
    errorCode : number,
    errorMsg : string,
    complete : boolean,
    fail : boolean,
    outTradeNo : string,
    openid : string
  }

  const providerList = ref([] as PayItem[])
  // 自动化测试
  const data = reactive({
    btnText: "支付宝支付",
    btnType: "primary",
    orderInfo: "",
    errorCode: 0,
    errorMsg: "",
    complete: false,
    fail: false,
    outTradeNo: "",
    openid: ""
  } as DataType)

  const payAli = (id : string) => {
    uni.showLoading({
      title: "请求中..."
    })
    uni.request({
      url: 'https://demo.dcloud.net.cn/payment/alipay/?total=0.01',
      method: 'GET',
      timeout: 6000,
      success: (res) => {
        data.orderInfo = JSON.stringify(res.data);
        console.log("====" + data.orderInfo)
        uni.hideLoading()
        uni.requestPayment({
          provider: id,
          orderInfo: res.data as string,
          fail: (res) => {
            console.log(JSON.stringify(res))
            data.errorCode = res.errCode
            uni.showToast({
              icon: 'error',
              title: 'errorCode:' + data.errorCode
            });
          },
          success: (res) => {
            console.log(JSON.stringify(res))
            uni.showToast({
              icon: 'success',
              title: '支付成功'
            });
          }
        })
      },
      fail: (e) => {
        console.log(e)
        uni.hideLoading()
      },
    });
  }

  const payWX = (id : string) => {
    uni.showLoading({
      title: "请求中..."
    })
    let url = 'https://demo.dcloud.net.cn/payment/wxpayv3.__UNI__uniappx/?total=0.01'
    const res = uni.getAppBaseInfo();
    let packageName : string | null

    // #ifdef APP-ANDROID
    packageName = res.packageName
    // #endif

    // #ifdef APP-IOS
    packageName = res.bundleId
    // #endif

    if (packageName == 'io.dcloud.hellouniappx') {//hello uniappx
      url = 'https://demo.dcloud.net.cn/payment/wxpayv3.__UNI__HelloUniAppX/?total=0.01'
    }
    uni.request({
      url: url,
      method: 'GET',
      timeout: 6000,
      header: {
        "Content-Type": "application/json"
      } as UTSJSONObject,
      success: (res) => {
        console.log(res.data)
        uni.hideLoading()
        uni.requestPayment({
          provider: id,
          orderInfo: JSON.stringify(res.data),
          fail: (res) => {
            console.log(JSON.stringify(res))
            data.errorCode = res.errCode
            uni.showToast({
              duration: 5000,
              icon: 'error',
              title: 'errorCode:' + data.errorCode,
            });
          },
          success: (res) => {
            console.log(JSON.stringify(res))
            uni.showToast({
              duration: 5000,
              icon: 'success',
              title: '支付成功'
            });
          }
        })
      },
      fail: (res) => {
        uni.hideLoading()
        console.log(res)
      },
    });
  }

  const payMpWexin = () => {
    let bundleId = uni.getAccountInfoSync().miniProgram.appId;
    let random = Math.floor(Math.random() * 9000) + 1000;
    data.outTradeNo = `test${Date.now()}${random}`;
    console.log('outTradeNo: ', data.outTradeNo)
    uni.showLoading({
      title: "请求中..."
    });
    uni.request({
      url: "https://env-00jxt67zj8kj.dev-hz.cloudbasefunction.cn/uni-pay-api/getOrderInfo",
      method: "GET",
      data: {
        outTradeNo: data.outTradeNo,
        bundleId,
        openid: data.openid,
        totalFee: 1
      },
      success: (res) => {
        uni.hideLoading();
        let data = res.data as UTSJSONObject;
        let errCode = data['errCode'] as number;
        if (errCode != 0) {
          uni.showModal({
            title: "提示",
            content: data['errMsg'] as string,
            showCancel: false
          });
          return;
        }
        let orderInfo = data["orderInfo"] as string;
        console.log('orderInfo: ', orderInfo)
        uni.requestPayment({
          provider: "wxpay",
          orderInfo: orderInfo,
          ...JSON.parse(orderInfo),
          success: (res) => {
            console.log('res: ', res)
            uni.showToast({
              title: "支付成功",
              icon: 'success'
            });
          },
          fail: (err) => {
            console.error("err", err);
            uni.hideLoading();
            uni.showToast({
              title: "支付失败",
              icon: 'error'
            });
          }
        });
      },
      fail: (err) => {
        uni.hideLoading();
        console.error("request-err", err);
      }
    });
  }

  const requestPayment = (e : PayItem) => {
    const provider = e.id
    // #ifdef APP
    if (provider == "alipay") {
      payAli(provider)
    } else if (provider == "wxpay") {
      // #ifdef APP-ANDROID
      if (e.provider != null && e.provider instanceof UniPaymentWxpayProvider && !((e.provider as UniPaymentWxpayProvider).isWeChatInstalled)) {
        uni.showToast({
          title: "微信没有安装",
          icon: 'error'
        })
      } else {
        payWX(provider)
      }
      // #endif
      // #ifdef APP-IOS || APP-HARMONY
      if (e.provider != null && ((e.provider as UniPaymentWxpayProvider).isWeChatInstalled == undefined || ((e.provider as UniPaymentWxpayProvider).isWeChatInstalled != null && (e.provider as UniPaymentWxpayProvider).isWeChatInstalled == false))) {
        uni.showToast({
          title: "微信没有安装",
          icon: 'error'
        })
      } else {
        payWX(provider)
      }
      // #endif
    }
    // #endif

    // #ifdef MP-WEIXIN
    payMpWexin()
    // #endif
  }

  // #ifdef MP-WEIXIN
  const getOpenId = () => {
    uni.showLoading({
      title: "请稍等...",
      mask: true
    });
    let bundleId = uni.getAccountInfoSync().miniProgram.appId;
    uni.login({
      provider: 'weixin',
      success: (res) => {
        uni.request({
          url: "https://env-00jxt67zj8kj.dev-hz.cloudbasefunction.cn/uni-pay-api/getOpenId",
          method: "GET",
          data: {
            code: res.code,
            bundleId
          },
          success: (res) => {
            uni.hideLoading();
            data.openid = res.data.openid;
            console.log('openid: ', data.openid);
          },
          fail: (err) => {
            uni.hideLoading();
            console.error("request-err", err);
          }
        });
      }
    })
  }
  // #endif

  //自动化测试使用
  const jest_pay = () => {
    uni.requestPayment({
      provider: "alipay",
      orderInfo: data.orderInfo,
      fail: (res : RequestPaymentFail) => {
        data.errorCode = res.errCode
        data.complete = true
        data.fail = true
      },
      success: (res : RequestPaymentSuccess) => {
        console.log(JSON.stringify(res))
        data.complete = true
        data.fail = false
      }
    } as RequestPaymentOptions)
  }

  onLoad(() => {
    // #ifdef APP
    let provider = uni.getProviderSync({
      service: "payment",
    } as GetProviderSyncOptions)
    console.log(provider)
    provider.providerObjects.forEach((value : UniProvider) => {
      switch (value.id) {
        case 'alipay':
          var aliPayProvider = value as UniPaymentAlipayProvider
          console.log('alipay', aliPayProvider)
          providerList.value.push({
            name: aliPayProvider.description,
            id: aliPayProvider.id,
            provider: aliPayProvider
          } as PayItem);
          break;
        case 'wxpay':
          var wxPayProvider = value as UniPaymentWxpayProvider
          console.log('wxpay', wxPayProvider)
          providerList.value.push({
            name: wxPayProvider.description,
            id: wxPayProvider.id,
            provider: wxPayProvider
          } as PayItem);
          break;
        default:
          break;
      }
    })
    // #endif

    // #ifdef MP-WEIXIN
    getOpenId()
    providerList.value.push({
      name: '微信支付',
      id: 'wxpay'
    } as PayItem);
    // #endif
  })

  defineExpose({
    data,
    jest_pay
  })

</script>


```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## API源码和更多SDK功能

App平台，微信和支付宝的SDK，除了requestPayment API封装的功能，还有一些其他功能。如开发者需要调用这些SDK的其他API，可以使用uts直接调用（注意打包时勾选相应的模块）

可以参考uni.requestPayment的源码，也是通过uts调用这2个原生SDK：
- [支付宝](https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-payment-alipay)
- [微信](https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-payment-wxpay)

## 自定义支付provider接入到uni API @customprovider

背景：目前uni-app x引擎已经内置了支付宝支付、微信支付。但支付SDK还有很多，比如银联SDK。

以往这些SDK可以通过独立插件的方式集成到uni-app x中，但需要提供单独的API给开发者使用。

uni-app x从4.25起，开放了provider自接入机制，让三方SDK可以以[provider](./provider.md)方式被开发者集成。

开发一个UTS插件，对接uni规范化的API、错误信息描述等实现自己的支付插件，这样插件使用者就可以通过uni的标准API使用三方SDK。

举个例子，开发者想使用uni.requestPayment()的方式调用XX支付，但是内置支付api不支持，

那只需要按照下面四个步骤实现即可:

第一步，新建一个UTS插件，在interface.uts 中定义接口，继承UniPaymentProvider，代码如下

```ts
export interface UniPaymentAlipayProvider extends UniPaymentProvider{}
```

第二步，在app-android或者app-ios的index.uts中实现接口，代码如下

```ts
import { UniPaymentAlipayProvider } from '../interface.uts'
export class UniPaymentAlipayProviderImpl implements UniPaymentAlipayProvider{
	override id : String = "XX" // id必须有插件作者前缀，避免冲突，避免不同插件作者的插件id重名
	override description : String = "XX的描述"
	override isAppExist : boolean | null = null

	constructor(){}

	override requestPayment(options : RequestPaymentOptions) {
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
        "uni-payment":{
          "XX":{}
        }
      }
    }
  }
```

第四步，打包自定义基座然后运行

由于uni-app x内置的支付API也是基于这套规范实现的，所以推荐参考
[uni-app x支付宝支付插件的实现源码](https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-payment-alipay)
