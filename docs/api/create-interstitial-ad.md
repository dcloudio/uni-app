## uni.createInterstitialAd(option) @createinterstitialad

创建插屏广告对象

插屏是一种弹出在屏幕中间的、带有关闭按钮的广告。大部分插屏广告是半屏的，个别广告会全屏。这取决于广告聚合渠道的设置。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/intro.html)

上述文档是uni-app和uni-app x的通用文档，如遇到uni-app x不一致的文档，需以uni-app x文档为准。

开通插屏广告，需在 [https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/) 管理后台开通。

开通时需要进行开发者认证和应用资质审核。

2. 获取和使用广告位id

开通uni-ad后，在[uni-ad后台](https://uniad.dcloud.net.cn/)给应用创建插屏广告位后，需要拿到广告位id（adpid），传入下面的api `createInterstitialAd`中。

3. 配置广告模块

App平台在manifest中配置添加三方广告SDK。具体配置可参考[文档](../collocation/manifest-modules.md#uni-ad)。

打正式包或自定义基座后可生效。标准基座包含的是测试广告位，无法为你产生收益。


### createInterstitialAd 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.31 | 4.31 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **CreateInterstitialAdOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| adpid | string | 是 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 广告位 id |
| adUnitId | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 广告单元 id<br/> | 


### 返回值 

| 类型 |
| :- |
| [InterstitialAd](#interstitialad-values) |

#### InterstitialAd 的方法 @interstitialad-values 

#### show() : Promise\<any> @show
show
广告加载成功之后，调用此方法展示广告
##### show 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |


##### 返回值 

| 类型 |
| :- |
| Promise\<any> |
 

#### load() : Promise\<any> @load
load
加载广告
##### load 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |


##### 返回值 

| 类型 |
| :- |
| Promise\<any> |
 

#### destroy() : void @destroy
destroy
销毁广告
##### destroy 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |



#### onLoad(callback : AdCallBackEvent) : void @onload
onLoad
绑定广告 load 事件的监听器
##### onLoad 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### offLoad(callback : AdCallBackEvent) : void @offload
offLoad
解除绑定 load 事件的监听器
##### offLoad 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onError(callback : AdErrorCallBackEvent) : void @onerror
onError
绑定 error 事件的监听器
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [IUniAdError](#iuniaderror-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 

##### IUniAdError 的属性值 @iuniaderror-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码<br/>- -5001 广告位标识adpid为空，请传入有效的adpid<br/>- -5002 无效的广告位标识adpid，请使用正确的adpid<br/>- -5003 广告位未开通广告，请在广告平台申请并确保已审核通过<br/>- -5004 无广告模块，打包时请配置要使用的广告模块<br/>- -5005 广告加载失败，请稍后重试<br/>- -5006 广告已经展示过了，请重新加载<br/>- -5007 广告不可用或已过期，请重新请求<br/>- -5008 广告不可用或已过期，请重新请求<br/>- -5009 广告类型不符，请检查后再试<br/>- -5011 打包或开通的渠道，不支持此类型广告<br/>- -5013 广告播放失败，请重新加载 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


#### offError(callback : AdErrorCallBackEvent) : void @offerror
offError
解除绑定 error 事件的监听器
##### offError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [IUniAdError](#iuniaderror-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onClose(callback : AdCallBackEvent) : void @onclose
onClose
绑定 close 事件的监听器
##### onClose 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### offClose(callback : AdCallBackEvent) : void @offclose
offClose
解除绑定 close 事件的监听器
##### offClose 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onAdClicked(callback : AdCallBackEvent) : void; @onadclicked
onAdClicked
绑定广告可点击屏幕区域事件的监听器
##### onAdClicked 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.31 | 4.31 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 

 


## Tips

+ uni-app x 标准基座插屏广告测试广告位id为`1111111113`。正式开发需配置自己的广告位id，并且打包自定义基座后生效。
+ 插屏广告目前仅支持API形式，暂不支持组件形式。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-interstitial-ad/create-interstitial-ad.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-interstitial-ad/create-interstitial-ad.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-interstitial-ad/create-interstitial-ad
```uvue
<template>
  <page-head title="插屏广告"></page-head>
  <button :type="btnType" style="margin: 10px;" :disabled="btnDisable" @click="showAd()">{{btnText}}</button>
  <view v-for="(item,index) in errorDetails">{{item}}</view>
</template>

<script setup lang="uts">
  const errorDetails = ref([] as string[])
  const btnText = ref("")
  const btnType = ref("primary")
  const btnDisable = ref(false)
  const interstitialAd = ref(null as InterstitialAd | null)
  const isAdLoadSuccess = ref(false)

  type LoadAdType = ()=>void
  let loadAd:LoadAdType = ()=>{}
  loadAd = () => {
    if (btnDisable.value)
      return
    btnDisable.value = true
    btnText.value = "正在加载广告"
    btnType.value = "primary"
    if (interstitialAd.value == null) {
      interstitialAd.value = uni.createInterstitialAd({
        adpid: "1111111113" //此处为测试广告位，实际开发中请在uni-ad后台申请自己的广告位后替换
      })
      interstitialAd.value!.onError((res) => {
        errorDetails.value.length = 0;
        btnType.value = "warn"
        btnDisable.value = false
        btnText.value = res.errMsg;
        const errors = (res.cause as UniAggregateError | null)?.errors;
        if(errors != null && errors.length > 0) {
          for(var a = 0;a<errors.length;a++) {
            var msg = JSON.stringify(errors[a]);
            errorDetails.value.push(msg);
          }
        }
      })
      interstitialAd.value!.onLoad((_) => {
        errorDetails.value.length = 0;
        btnType.value = "primary"
        btnText.value = "广告加载成功，点击观看"
        btnDisable.value = false
        isAdLoadSuccess.value = true
      })
      interstitialAd.value!.onClose((_) => {
        isAdLoadSuccess.value = false
        loadAd()
      })
    }
    interstitialAd.value!.load().catch(() => { })
  }

  const showAd = () => {
    if (isAdLoadSuccess.value) {
      interstitialAd.value!.show().catch(() => { })
    } else {
      loadAd()
    }
  }

  onReady(() => {
    loadAd()
  })
</script>

<style>

</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ad.createInterstitialAd)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/uni-ad/ad-interstitial.html#api%E8%AF%AD%E6%B3%95)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ad/InterstitialAd.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createInterstitialAd&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createInterstitialAd&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createInterstitialAd&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createInterstitialAd&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createInterstitialAd)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createInterstitialAd&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

