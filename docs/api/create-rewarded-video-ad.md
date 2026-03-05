## uni.createRewardedVideoAd(option) @createrewardedvideoad

创建激励视频广告对象

激励视频，顾名思义，播放一段视频广告，手机用户看完广告后需向其发放奖励。

激励视频是一种播放时间较长、CPM单价较高的广告类型，是广告变现中的优质工具。

1. 开通激励视频，需在 [https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/) 管理后台开通。

uni-ad是DCloud提供的聚合广告平台，激励视频的广告来源主要来自于聚合的优量汇、穿山甲、快手、百度、sigmob，通过竞价模型优先展示出价高的广告。

开通时需要进行开发者认证和应用资质审核。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/)
- 激励视频的业务：[详见](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html)

上述文档是uni-app和uni-app x的通用文档，如遇到uni-app x不一致的文档，需以uni-app x文档为准。

1. 获取和使用广告位id

开通uni-ad后，在[uni-ad后台](https://uniad.dcloud.net.cn/)给App创建激励视频广告位后，需要拿到广告位id（adpid），传入下面的api `createRewardedVideoAd `中。

3. 配置广告模块

App平台在manifest中配置添加三方广告SDK。具体配置可参考[文档](../collocation/manifest-modules.md#uni-ad)。

打正式包或自定义基座后可生效。标准基座包含的是测试广告位，无法为你产生收益。

4. 发放奖励

激励视频播放完毕后，需给手机用户发放奖励。一般是虚拟权益，如游戏道具、查看优质内容（小说、代码、图片、音视频）的资质、vip会员时长。

如果手机用户未看完视频广告，中途退出广告，则不发放奖励。

但为了防止客户端伪造看完广告的凭据，播放完毕广告是由服务器来做回调的。这是业内通行的安全方案，包括支付也是服务器回调。

由uniCloud服务器从各家广告平台接受到视频播放完毕后，通知业务服务进行奖励发放。[详见](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html#callback)

### createRewardedVideoAd 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.0 | 4.22 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **CreateRewardedVideoAdOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| adpid | string | 是 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 广告位 id |
| urlCallback | **UrlCallbackOptions** | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 服务器回调透传参数 |
| adUnitId | string | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 广告单元 id<br/> |
| disableFallbackSharePage | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.7.1`<br/><br/>是否禁用分享页，默认为false<br/> |
| multiton | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.8.0`<br/><br/>是否启用多例模式，默认为false<br/> | 

##### urlCallback 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| userId | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 透传到服务器端的userId |
| extra | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 透传到服务器端的extra，不推荐设置过于复杂的字符串 |


### 返回值 

| 类型 |
| :- |
| [RewardedVideoAd](#rewardedvideoad-values) |

#### RewardedVideoAd 的方法 @rewardedvideoad-values 

#### show() : Promise\<any> @show
show
广告加载成功之后，调用此方法展示广告
##### show 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |


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
| x | - | 4.0 | 4.22 | - |


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
| x | - | 4.0 | 4.22 | - |



#### onLoad(callback : AdCallBackEvent) : void @onload
onLoad
绑定广告 load 事件的监听器
##### onLoad 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### offLoad(callback : AdCallBackEvent) : void @offload
offLoad
解除绑定 load 事件的监听器
##### offLoad 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

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
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [IUniAdError](#iuniaderror-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

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
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [IUniAdError](#iuniaderror-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onClose(callback : AdCloseCallBackEvent) : void @onclose
onClose
绑定 close 事件的监听器
##### onClose 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [VideoAdClose](#videoadclose-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### VideoAdClose 的属性值 @videoadclose-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| isEnded | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | true表示广告播放完毕或者达到发放奖励的条件 |


#### offClose(callback : AdCloseCallBackEvent) : void @offclose
offClose
解除绑定 close 事件的监听器
##### offClose 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [VideoAdClose](#videoadclose-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onAdClicked(callback : AdCallBackEvent) : void; @onadclicked
onAdClicked
绑定广告可点击屏幕区域事件的监听器
##### onAdClicked 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - | 


#### onVerify(callback : AdVerifyCallBackEvent) : void; @onverify
onVerify
绑定 verify 事件的监听器
##### onVerify 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | - | 4.0 | 4.22 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

 


## Tips

+ uni-app x 标准基座激励视频广告测试广告位id为`1507000689`。正式开发需配置自己的广告位id，并且打包自定义基座后生效。
+ 激励视频广告目前仅支持API形式，暂不支持组件形式。
+ 部分广告渠道不支持模拟器，最终效果及服务器回调应以真机为准。

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-rewarded-video-ad/create-rewarded-video-ad.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-rewarded-video-ad/create-rewarded-video-ad.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-rewarded-video-ad/create-rewarded-video-ad
```uvue
<template>
  <page-head title="激励视频广告"></page-head>
  <button :type="btnType" style="margin: 10px;" :disabled="btnDisable" @click="showAd()">{{btnText}}</button>
  <view v-for="(item,index) in errorDetails">{{item}}</view>
</template>

<script setup lang="uts">
  const errorDetails = ref([] as string[])
  const btnText = ref("")
  const btnType = ref("primary")
  const btnDisable = ref(false)
  const rewardAd = ref(null as RewardedVideoAd | null)
  const isAdLoadSuccess = ref(false)

  type LoadAdType = () => void
  let loadAd: LoadAdType = () => {}
  loadAd = () => {
    if (btnDisable.value)
      return
    btnDisable.value = true
    btnText.value = "正在加载广告"
    btnType.value = "primary"
    if (rewardAd.value == null) {
      rewardAd.value = uni.createRewardedVideoAd({
        adpid: "1507000689" //此处为测试广告位，实际开发中请在uni-ad后台申请自己的广告位后替换
      })
      rewardAd.value!.onError((res) => {
        errorDetails.value.length = 0;
        btnType.value = "warn"
        btnDisable.value = false
        btnText.value = res.errMsg;
        const errors = (res.cause as UniAggregateError|null)?.errors;
        if(errors != null && errors.length > 0) {
          for(var a = 0;a<errors.length;a++) {
            var msg = JSON.stringify(errors[a]);
            errorDetails.value.push(msg);
          }
        }
      })
      rewardAd.value!.onLoad((_) => {
        errorDetails.value.length = 0;
        btnType.value = "primary"
        btnText.value = "广告加载成功，点击观看"
        btnDisable.value = false
        isAdLoadSuccess.value = true
      })
      rewardAd.value!.onClose((e) => {
        // 测试广告位无法通过服务器回调。实际开发中，使用自己的广告位后，需参考uni-ad文档编写服务器回调的代码，在服务端发放奖励
        isAdLoadSuccess.value = false
        uni.showToast({
          title: "激励视频" + (e.isEnded ? "" : "未") + "播放完毕",
          position: "bottom"
        })
        loadAd()
      })
    }
    rewardAd.value!.load().catch(()=>{})
  }

  const showAd = () => {
    if (isAdLoadSuccess.value) {
      rewardAd.value!.show().catch(()=>{})
    } else {
      loadAd()
    }
  }

  onReady(() => {
    loadAd()
  })

  onPageHide(() => {
    console.log("Page Hide");
  })
</script>

<style>

</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ad.createRewardedVideoAd)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html#api%E8%AF%AD%E6%B3%95)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ad/RewardedVideoAd.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createRewardedVideoAd&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createRewardedVideoAd&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createRewardedVideoAd&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createRewardedVideoAd&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createRewardedVideoAd)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createRewardedVideoAd&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

