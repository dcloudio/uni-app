### uni.requestPayment(OBJECT)
支付

uni.requestPayment是一个统一各平台的客户端支付API，不管是在某家小程序还是在App中，客户端均使用本API调用。

本API运行在各端时，会自动转换为各端的原生支付调用API。

虽然客户端API统一了，但各平台的支付申请开通、配置回填、服务器开发，仍然需要看各个平台本身的支付文档。

比如微信有App支付、小程序支付、H5支付等不同的申请入口和使用流程，对应到uni-app，在App端要申请和使用微信的App支付，而小程序端则申请和使用微信的小程序支付。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|[说明](/api/plugins/payment?id=h5-payment)|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-||
|provider|String|是|服务提供商，通过 [uni.getProvider](/api/plugins/provider) 获取。||
|orderInfo|String/Object|是|订单数据，[注意事项](/api/plugins/payment?id=orderinfo)|App、支付宝小程序、百度小程序、头条小程序|
|timeStamp|String|微信小程序必填|时间戳从1970年1月1日至今的秒数，即当前的时间。|微信小程序|
|nonceStr|String|微信小程序必填|随机字符串，长度为32个字符以下。|微信小程序|
|package|String|微信小程序必填|统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。|微信小程序|
|signType|String|微信小程序必填|签名算法，暂支持 MD5。|微信小程序|
|paySign|String|微信小程序必填|签名，具体签名方案参见 [微信小程序支付文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3)|微信小程序|
|bannedChannels|Array&lt;String&gt;|否|需要隐藏的支付方式，详见 [百度小程序支付文档](https://smartprogram.baidu.com/docs/develop/api/open_payment/#requestPolymerPayment/)|百度小程序|
|service|Number|头条小程序必填|固定值：1（拉起小程序收银台）开发者如果不希望使用头条小程序收银台，service设置为3/4时，可以直接拉起微信/支付宝进行支付：service=3： 微信API支付，不拉起小程序收银台；service=4： 支付宝API支付，不拉起小程序收银台。其中service=3、4，仅在1.35.0.1+基础库(头条743+)支持|头条小程序|
|_debug|Number|否|仅限调试用，上线前去掉该参数。_debug=1时，微信支付期间可以看到中间报错信息，方便调试|头条小程序|
|getOrderStatus|Function|头条小程序必填|商户前端实现的查询支付订单状态方法（该方法需要返回个Promise对象）。 service=3、4时不需要传。|头条小程序|
|success|Function|否|接口调用成功的回调||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|


#### 注意事项
- 头条小程序支付接口调整使用时请注意[发起头条支付](https://developer.toutiao.com/dev/cn/mini-app/develop/open-capacity/payment/pay)

#### orderInfo 注意事项@orderInfo
1. 百度小程序的 orderInfo 为 Object 类型，详细的数据结构，参考：[百度收银台支付](https://smartprogram.baidu.com/docs/develop/api/open_payment/#requestPolymerPayment/)。
2. 支付宝小程序的 orderInfo(支付宝的规范为 tradeNO) 为 String 类型，表示支付宝交易号。
3. 头条小程序的 orderInfo 为 Object 类型，详见：[发起头条支付](https://developer.toutiao.com/dev/cn/mini-app/develop/open-capacity/payment/pay)
4. 由于头条新版支付接口要求版本较高，在不支持新版支付接口的情况下仍会对应旧版支付接口，此时 orderInfo 对应头条小程序 data， 详见：[头条支付旧版接口](https://developer.toutiao.com/dev/cn/mini-app/develop/open-capacity/payment/requestpayment-deprecated)。用户可以使用 tt.pay 判断是否支持新版接口。另外需要注意头条小程序在`1.35.0+`版本基础库支持了 canIUse ，在`1.19.4+`版本基础库支持了新版支付接口 tt.pay ，所以应避免使用 canIUse 判断是否为新版接口。
5. App端，支付宝支付和微信支付 orderInfo 均为 String 类型。
6. App端，苹果应用内支付 orderInfo 为Object 类型，{productid: 'productid'}。

#### H5 平台@h5-payment
- 普通浏览器平台的支付，仍然是常规web做法。uni-app未封装。
- 在普通浏览器里也可以调起微信进行支付，这个在微信叫做H5支付，此功能未开放给普通开发者，需向微信单独申请，[详见](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1)
- 微信内嵌浏览器运行H5版时，可通过js sdk实现微信支付，需要引入一个单独的js，[详见](https://ask.dcloud.net.cn/article/35380)

**各平台支持的支付情况说明**
- 微信小程序里只支持微信小程序支付，在 [微信商户平台](https://pay.weixin.qq.com) 申请支付时，选择公众号支付。
- App 里支持微信sdk支付、支付宝sdk支付、苹果iap应用内支付，在各平台申请支付时选择 App 支付。
- 其他支付（如银联）请使用web-view组件以H5方式实现。
- 支付宝小程序只支持支付宝支付。
- 百度小程序为百度支付，其二次封装了度小满、支付宝、微信支付。
- Hello uniapp 里演示了各种支付（iap支付见社区文章底部的赞助按钮），同时该示例开源了对应的服务端源码，参考：[https://github.com/dcloudio/H5P.Server/tree/master/payment](https://github.com/dcloudio/H5P.Server/tree/master/payment)。

### App平台支付流程

流程：支付平台功能申请 -> ``manifest.json`` 里配置支付参数 -> ``uni-app`` 里调用 API 进行支付

#### App支付功能申请

1. 支付宝App支付功能申请

    登录支付宝账号，创建应用接入支付宝App支付能力，包括以下步骤：

    - 创建应用（获取appid） 
    - 开通App支付功能 
    - 配置密钥（获取公钥、私钥） 
    
  具体可参考支付宝官方文档： [App支付快速接入](https://docs.open.alipay.com/204/105297/)

2. 微信App支付功能申请

    - 到 [微信开放平台](https://open.weixin.qq.com/) 申请移动应用并开通支付功能，申请应用后可以获取 AppID 和 AppSecret 值
    - 应用接入 [微信商户平台](https://pay.weixin.qq.com)，选择 App 支付
    - 开通支付功能后可获取支付业务服务器配置数据：PARTNER（财付通商户号）、PARTNER_KEY（财付通密钥）、PAYSIGNKEY（支付签名密钥）
	- 需要将从微信开放平台申请的appid，填回到 manifest-App SDK配置-支付-微信支付 中。打包后生效。
    
  具体可参考微信官方文档： [移动应用开发](https://open.weixin.qq.com/cgi-bin/frame?t=home/app_tmpl&lang=zh_CN)
  
  注意微信的App支付、小程序支付、H5支付是不同的体系。微信小程序支付在 [微信商户平台](https://pay.weixin.qq.com) 申请支付时，选择公众号支付；普通浏览器里也可以调起微信进行支付，这个在微信叫做H5支付，此功能未开放给普通开发者，需向微信单独申请，[详见](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1)

3. 苹果iap应用内支付申请

    使用苹果开发者账号登录 [App Store Connect](https://appstoreconnect.apple.com)，在应用的功能选项卡页面，添加 App 内购项目。注意：
    - 内购项目的各信息需要填写完整，然后保存，此时内购项目的状态应该是准备提交，当提交应用通过审核后，状态则变为已批准
    - 测试时，建议使用测试证书打一个自定义的 iOS 基座进行测试
    - 在应用 TestFight 的选项卡添加 App Store Connect 用户，测试支付时可以使用此用户帐号进行测试
    - orderInfo 的 productid 是自己填写的产品 ID
    - 调用 ``uni.requestPayment`` 前必须先使用 5+Plus 的方法调用 requestOrder 获取订单信息，否则会导致无法支付
    - 更多可参考：[https://ask.dcloud.net.cn/article/497](https://ask.dcloud.net.cn/article/497)
    
#### manifest.json里配置相关参数

1. 在`manifest.json - App模块权限选择` 中勾选 payment(支付)
2. 在 `manifest.json - App SDK配置` 中，勾选需要的支付平台，目前有微信支付、支付宝支付、苹果应用内支付(IAP)，其中微信支付需要填写从微信开放平台获取的AppID
![](http://img-cdn-qiniu.dcloud.net.cn/uploads/article/20190520/4c674701c469a258aeb69b803d3c97db.png)
<!-- ![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/pay1.png) -->
<!-- 临时把老图注掉，替换正式地址时再把老图地址放开 -->
3. 这些配置需要打包生效，真机运行仍然是HBuilder基座的设置，可使用自定义基座调试。离线打包请参考离线打包文档在原生工程中配置。
4. 配置并打包后，通过`uni.getProvider`可以得到配置的结果列表，注意这里返回的是manifest配置的，与手机端是否安装微信、支付宝无关。

如果手机端未安装支付宝，调用时会启动支付宝的wap页面登陆，如果已安装相应客户端，会启动其客户端登陆。

#### uni-app里开发

- 前端：使用 ``uni.request`` 请求服务端接口，得到订单数据，使用 ``uni.requestPayment`` 向支付平台发起支付请求，拉起支付平台的客户端进行支付。在hello uni-app里详细代码。
- 服务端：PHP可参考 [https://github.com/dcloudio/H5P.Server/tree/master/payment](https://github.com/dcloudio/H5P.Server/tree/master/payment)。

#### FAQ

- Q：如何使用ping++等聚合支付
  A：uni-app的js API 已经完成跨端统一，客户端无需使用三方聚合支付。仅在服务器端使用三方聚合支付即可。

- Q：App端如何使用其他支付，比如银联、PayPal。
  A：1、可以在web-view组件里使用它们的wap版支付；2、可以集成原生sdk，插件市场均有，[详见](https://ext.dcloud.net.cn/search?q=%E6%94%AF%E4%BB%98)。也可以自行开发原生插件，开发文档见[https://ask.dcloud.net.cn/article/35428](https://ask.dcloud.net.cn/article/35428)。

- Q：Appstore审核报PGPay SDK不允许上架的问题
  A：数字类产品（比如购买会员等不需要配送实物的商品），Apple规定必须使用苹果IAP应用内支付，给Apple分成30%。打包的时候不要勾选微信或支付宝等其他支付方式。如果你提交的包里包含了微信支付宝等支付的sdk，即使没使用，Appstore也会认为你有隐藏方式，以后会绕过iap，不给Apple分成，因此拒绝你的App上线。云打包时，manifest里选上支付模块，但sdk配置里去掉微信支付和支付宝支付。很多开发者的Android版是包含微信和支付宝支付的，此时注意分开判断。详见[https://ask.dcloud.net.cn/article/36447](https://ask.dcloud.net.cn/article/36447)

**示例**

App 支付

```javascript
uni.requestPayment({
    provider: 'alipay',
    orderInfo: 'orderInfo', //微信、支付宝订单数据
    success: function (res) {
        console.log('success:' + JSON.stringify(res));
    },
    fail: function (err) {
        console.log('fail:' + JSON.stringify(err));
    }
});
```

微信小程序支付

```javascript
// 仅作为示例，非真实参数信息。
uni.requestPayment({
    provider: 'wxpay',
	timeStamp: String(Date.now()),
	nonceStr: 'A1B2C3D4E5',
	package: 'prepay_id=wx20180101abcdefg',
	signType: 'MD5',
	paySign: '',
	success: function (res) {
		console.log('success:' + JSON.stringify(res));
	},
	fail: function (err) {
		console.log('fail:' + JSON.stringify(err));
	}
});
```

苹果应用内支付

```html
<template>
    <view>
        <view class="uni-list">
            <radio-group @change="applePriceChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in priceList" :key="index">
                    {{item.text}}
                    <radio :value="item.value" :checked="item.checked" />
                </label>
            </radio-group>
        </view>
        <view class="uni-padding-wrap">
            <button class="ipaPayBtn" @click="requestPayment" :loading="loading" :disabled="disabled">确认支付</button>
        </view>
    </view>
    </view>
</template>
```

```javascript
<script>
    let iapChannel = null,
        productId = 'HelloUniappPayment1',
        productIds = ['HelloUniappPayment1', 'HelloUniappPayment6'];
    export default {
        data() {
            return {
                title: 'request-payment',
                loading: false,
                disabled: true,
                priceList: [{
                    value: 'HelloUniappPayment1',
                    text: '支付1元',
                    checked: true
                }, {
                    value: 'HelloUniappPayment6',
                    text: '支付6元',
                    checked: false
                }]
            }
        },
        onLoad: function() {
            plus.payment.getChannels((channels) => {
                console.log("获取到channel" + JSON.stringify(channels))
                for (var i in channels) {
                    var channel = channels[i];
                    if (channel.id === 'appleiap') {
                        iapChannel = channel;
                        this.requestOrder();
                    }
                }
                if(!iapChannel){
                    this.errorMsg()
                }
            }, (error) => {
                this.errorMsg()
            });
        },
        methods: {
            requestOrder() {
                uni.showLoading({
                	title:'检测支付环境...'
                })
                iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
                    this.disabled = false;
                    console.log('requestOrder success666: ' + JSON.stringify(orderList));
                    uni.hideLoading();
                }, (e) => {
                    console.log('requestOrder failed: ' + JSON.stringify(e));
                    uni.hideLoading();
                    this.errorMsg()
                });
            },
            requestPayment(e) {
                this.loading = true;
                uni.requestPayment({
                    provider: 'appleiap',
                    orderInfo: {
                        productid: productId
                    },
                    success: (e) => {
                        uni.showModal({
                            content: "感谢您的赞助",
                            showCancel: false
                        })
                    },
                    fail: (e) => {
                        uni.showModal({
                            content: "支付失败,原因为: " + e.errMsg,
                            showCancel: false
                        })
                    },
                    complete: () => {
                        console.log("payment结束")
                        this.loading = false;
                    }
                })
            },
            applePriceChange(e) {
                productId = e.detail.value;
            },
            errorMsg(){
                uni.showModal({
                    content: "暂不支持苹果 iap 支付",
                    showCancel: false
                })
            }
        }
    }
</script>
```
