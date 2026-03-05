<!-- ## ad -->

::: sourceCode
## ad
:::

广告

ad组件是一种展现在页面中间的广告。它可以用于banner广告，也可以用于信息流广告。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/intro.html)

上述文档是uni-app和uni-app x的通用文档，如遇到uni-app x不一致的文档，需以uni-app x文档为准。

开通广告，需在 [https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/) 管理后台开通。

开通时需要进行开发者认证和应用资质审核。

2. 获取和使用广告位id

开通uni-ad后，在[uni-ad后台](https://uniad.dcloud.net.cn/)给应用创建信息流广告位后，需要拿到广告位id（adpid），传入ad组件的属性 `adpid`中。

3. 配置广告模块

App平台在manifest中配置添加三方广告SDK。具体配置可参考[文档](../collocation/manifest-modules.md#uni-ad)。

打正式包或自定义基座后可生效。标准基座包含的是测试广告位，无法为你产生收益。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.31 | 4.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: x; HarmonyOS(Vapor): - | 广告位id，在uniAD官网申请广告位 |
| unit-id | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>广告单元id，可在[小程序管理后台](https://mp.weixin.qq.com)的流量主模块新建 |
| ad-intervals | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>广告自动刷新的间隔时间，单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新） |
| ad-type | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>广告类型，默认为展示banner，可通过设置该属性为`video`展示视频广告, `grid`为格子广告 |
| ad-theme | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/> |
| @load | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: x; HarmonyOS(Vapor): - | 广告加载成功的回调 |
| @close | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: x; HarmonyOS(Vapor): - | 广告关闭的回调 |
| @error | (e:[UniAdErrorEvent](#uniaderrorevent)) => void | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: x; HarmonyOS(Vapor): - | 广告加载失败的回调 |


### 事件
#### UniAdErrorEvent


##### UniAdErrorEvent 的属性值
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| detail | **IUniAdError** | 是 | - | - | - |
| bubbles | boolean | 是 | - | - | 是否冒泡 |
| cancelable | boolean | 是 | - | - | 是否可以取消 |
| type | string | 是 | - | - | 事件类型 |
| target | [UniElement](/api/dom/unielement.md) | 否 | - | - | 触发事件的组件 |
| currentTarget | [UniElement](/api/dom/unielement.md) | 否 | - | - | 当前组件 |
| timeStamp | Long | 是 | - | - | 事件发生时的时间戳 |

#### detail 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | - | 错误码<br/>- -5001 广告位标识adpid为空，请传入有效的adpid<br/>- -5002 无效的广告位标识adpid，请使用正确的adpid<br/>- -5003 广告位未开通广告，请在广告平台申请并确保已审核通过<br/>- -5004 无广告模块，打包时请配置要使用的广告模块<br/>- -5005 广告加载失败，请稍后重试<br/>- -5006 广告已经展示过了，请重新加载<br/>- -5007 广告不可用或已过期，请重新请求<br/>- -5008 广告不可用或已过期，请重新请求<br/>- -5009 广告类型不符，请检查后再试<br/>- -5011 打包或开通的渠道，不支持此类型广告<br/>- -5013 广告播放失败，请重新加载 |
| errSubject | string | 是 | - | - | 统一错误主题（模块）名称 |
| data | any | 否 | - | - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | - | - |


##### UniAdErrorEvent 的方法
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stopPropagation | () => void | 是 | - | - | 阻止当前事件的进一步传播 |
| preventDefault | () => void | 是 | - | - | 阻止当前事件的默认行为 |


<!-- UTSCOMJSON.ad.component_type -->

### 子组件 @children-tags
不可以嵌套组件

## Tips

+ uni-app x 标准基座信息流广告测试广告位id为`1111111111`。正式开发需配置自己的广告位id，并且打包自定义基座后生效。
+ `<ad>` 组件测试广告位是上图下文，uni-ad后台申请的广告位默认左图右文。
+ 信息流广告不需要设置`height`属性，广告渲染成功之后会自动撑开。

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/ad/ad.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/ad/ad.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/ad/ad
```uvue
<template>
  <view>
    <page-head title="信息流广告"></page-head>
    <!-- #ifndef MP -->
    <ad adpid="1111111111" style="width: 100%;" @load="loadFun" @error="errorFun"></ad>
    <!-- #endif -->
    <!-- #ifdef MP -->
    <view class="uni-center">微信小程序平台暂不支持测试广告位，需要开通uni-ad后可测试</view>
    <!-- #endif -->
    <view v-if="tips" class="uni-center">信息流广告加载失败，请退出当前页面重试。</view>
    <button @click="pushList">列表-信息流</button>
    <button @click="pushVideoAd">视频贴片-非全屏</button>
    <button @click="pushVideoAdL">视频贴片-横向全屏</button>
    <button @click="pushVideoAdP">视频贴片-竖向全屏</button>
  </view>
</template>

<script setup lang="uts">
  const tips = ref(false)

  const pushList = () => {
    uni.navigateTo({
      url: '/pages/component/ad/list-view-ad',
    })
  }

  const pushVideoAd = () => {
    uni.navigateTo({
      url: '/pages/component/ad/video-ad',
    })
  }

  const pushVideoAdL = () => {
    uni.navigateTo({
      url: '/pages/component/ad/landscape-video-ad',
    })
  }

  const pushVideoAdP = () => {
    uni.navigateTo({
      url: '/pages/component/ad/portrait-video-ad',
    })
  }

  const loadFun = () => {
    uni.showToast({
      position: "bottom",
      title: "信息流广告加载成功"
    })
  }

  const errorFun = () => {
    tips.value = true;
  }

</script>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.ad.ad)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/ad.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/ad.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=ad&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=ad&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=ad&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=ad&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=ad)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=ad&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
