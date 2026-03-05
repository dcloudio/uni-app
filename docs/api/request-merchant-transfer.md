<!-- ## uni.requestMerchantTransfer(options) @requestmerchanttransfer -->

::: sourceCode
## uni.requestMerchantTransfer(options) @requestmerchanttransfer

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-requestMerchantTransfer


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-requestMerchantTransfer

:::

商家转账用户确认模式下，拉起页面请求用户确认收款

::: info
uni.requestMerchantTransfer 是​商家转账到用户零钱的API，适用于需要向用户直接发放资金（如提现、奖励发放、活动返现）的场景。

注意：
  - 开发者需在[微信支付商户平台/合作伙伴平台-产品中心](https://pay.weixin.qq.com/)，申请开通商家转账
  - 具体流程请参考[微信商家转账文档](https://pay.weixin.qq.com/doc/v3/merchant/4012711988)
  - app-ios 需要在可视化界面配置scheme、universalLink 参数，详见 [iOS配置/uni-payment(支付)/微信支付](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#paymentweixin)
  - 该功能支持 uniapp 项目，请使用插件[uni-requestMerchantTransfer](https://ext.dcloud.net.cn/plugin?id=22283)
:::

### requestMerchantTransfer 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.61 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RequestMerchantTransferOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| mchId | string | 是 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 商户号 |
| package | string | 是 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 商家转账付款单跳转收款页 pkg 信息,商家转账付款单受理成功时返回给商户 |
| appId | string | 否 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 商户 appId（微信平台appid），普通模式下必填，服务商模式下，appId 和 subAppId 二选一填写 |
| openId | string | 否 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 收款用户 openId， 对应传入的商户 appId 下，某用户的 openId |
| subAppId | string | 否 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 子商户 appId（微信平台子appid)，服务商模式下，appId 和 subAppId 二选一填写 |
| subMchId | string | 否 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 子商户号，服务商模式下必填 |
| success | (res: [RequestMerchantTransferGeneralCallbackResult](#requestmerchanttransfergeneralcallbackresult-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [RequestMerchantTransferGeneralCallbackResult](#requestmerchanttransfergeneralcallbackresult-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: [RequestMerchantTransferGeneralCallbackResult](#requestmerchanttransfergeneralcallbackresult-values)) => void | 否 | - | Web: x; 微信小程序: 4.61; Android: 4.61; iOS: 4.61; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### RequestMerchantTransferGeneralCallbackResult 的属性值 @requestmerchanttransfergeneralcallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.payment.requestMerchantTransfer)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/plugins/request-merchant-transfer.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestMerchantTransfer.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=requestMerchantTransfer&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=requestMerchantTransfer&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=requestMerchantTransfer&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=requestMerchantTransfer&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=requestMerchantTransfer)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=requestMerchantTransfer&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/request-merchant-transfer/request-merchant-transfer.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/request-merchant-transfer/request-merchant-transfer.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/request-merchant-transfer/request-merchant-transfer
```uvue
<template>
  <view class="content">
    <button class="button" @click="pay">支付0.2元</button>
    <button class="button" @click="transfer" :disabled="disabled">接受0.1元转账</button>
    <view class="tips" v-if="disabled" style="color: #ff5a5f;">请先支付 0.2 元，才能体验接收转账 0.1 元</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="tips" v-else><text style="color: #42b983;">若已支付 0.2 元，请点击“接受0.1元转账”按钮</text></view>
    <!-- #endif -->

    <!-- #ifndef MP-WEIXIN -->
    <view class="tips" v-else><text style="color: #42b983;">已支付 0.2 元，请点击“接受0.1元转账”按钮</text></view>
    <!-- #endif -->
  </view>
</template>

<script setup lang="uts">
  const outTradeNo = ref<string>("")
  const disabled = ref<boolean>(true)
  const openid = ref<string>("")

  const getBundleId = (): string | null => {
    let baseInfo = uni.getAppBaseInfo();
    let bundleId : string | null;
    // #ifdef APP-ANDROID
    bundleId = baseInfo.packageName;
    // #endif
    // #ifdef APP-IOS
    bundleId = baseInfo.bundleId;
    // #endif
    // #ifdef MP-WEIXIN
    bundleId = uni.getAccountInfoSync().miniProgram.appId;
    // #endif
    return bundleId;
  }

  // #ifdef MP-WEIXIN
  const getOpenId = () => {
    uni.showLoading({
      title: "请稍等...",
      mask: true
    });
    let bundleId = getBundleId();
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
            openid.value = res.data.openid;
            console.log('openid: ', openid.value);
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

  const pay = () => {
    let bundleId = getBundleId();
    let random = Math.floor(Math.random() * 9000) + 1000;
    outTradeNo.value = `test${Date.now()}${random}`;
    console.log('outTradeNo: ', outTradeNo.value)
    disabled.value = true;
    uni.showLoading({
      title: "请求中..."
    });
    // #ifdef APP
    const getProviderRes = uni.getProviderSync({
      service: "payment"
    });
    if (getProviderRes.providerIds.indexOf("wxpay") == -1) {
      uni.showToast({
        title: "未添加微信支付依赖",
        icon: 'error'
      });
      uni.hideLoading();
      return;
    }
    // #endif
    uni.request({
      url: "https://env-00jxt67zj8kj.dev-hz.cloudbasefunction.cn/uni-pay-api/getOrderInfo",
      method: "GET",
      data: {
        outTradeNo: outTradeNo.value,
        bundleId,
        openid: openid.value
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
        // #ifdef MP-WEIXIN
        setTimeout(() => {
          disabled.value = false;
        }, 3000);
        // #endif
        uni.requestPayment({
          provider: "wxpay",
          orderInfo: orderInfo,
          // #ifdef MP-WEIXIN
          ...JSON.parse(orderInfo),
          // #endif
          success: (res) => {
            console.log('res: ', res)
            uni.showToast({
              title: "支付成功",
              icon: 'success'
            });
            disabled.value = false;
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

  const transfer = () => {
    uni.showLoading({
      title: "请求中..."
    });
    try {
      let bundleId = getBundleId();
      uni.request({
        url: "https://env-00jxt67zj8kj.dev-hz.cloudbasefunction.cn/uni-pay-api/transfer",
        method: "GET",
        data: {
          outTradeNo: outTradeNo.value,
          bundleId
        },
        success: (res) => {
          let data = res.data as UTSJSONObject;
          if (data['errCode'] != null && typeof data['errCode'] == "number" && data['errCode'] == 0) {
            let options = data['options'] as UTSJSONObject;
            uni.requestMerchantTransfer({
              mchId: options['mchId'] as string,
              appId: options['appId'] as string,
              package: options['package'] as string,
              success: (res) => {
                uni.hideLoading();
                console.log('res: ', res)
                uni.showToast({
                  title: "转账成功",
                  icon: 'success'
                });
                disabled.value = true;
              },
              fail: (err) => {
                uni.hideLoading();
                let errMsg = err.errMsg;
                if (errMsg == "requestMerchantTransfer:fail cancel") {
                  errMsg = "取消转账";
                }
                uni.showToast({
                  title: errMsg,
                  icon: 'none'
                });
                console.error("转账失败", err);
              }
            });
          } else {
            uni.hideLoading();
            if (data['errMsg'] != null) {
              uni.showModal({
                title: "提示",
                content: data['errMsg'] as string,
                showCancel: false
              });
            }
            return;
          }
        },
        fail: (err) => {
          console.error("request-err", err);
          uni.hideLoading();
        }
      });
    } catch (err) {
      console.error('err: ', err)
      uni.showToast({
        title: "运行异常",
        icon: 'error'
      });
      uni.hideLoading();
    }
  }

  onLoad(() => {
    // outTradeNo.value = "test17404775193789726";
    // disabled.value = false;
    // #ifdef MP-WEIXIN
    getOpenId();
    // #endif
  })

</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .button {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .tips {
    color: #999;
    font-size: 14px;
  }
</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

