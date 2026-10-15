<!-- ## ad-drama -->

::: sourceCode
## ad-drama
:::

uni-app x 短剧插件：uni.createDramaAd API 与 ad-drama 组件（独立运行，不依赖其他插件）

短剧广告：通过短剧内容生态 `穿山甲内容联盟(短剧)` 变现的高价值广告形式。将短剧内容（列表）嵌入自己的应用中，用户免费观看指定集数后，需观看激励视频解锁后续剧集，从而实现广告变现。

ad-drama 组件是短剧广告的组件模式接入方式：组件挂载即自动加载短剧列表，适合快速接入短剧。如需自定义显示短剧列表界面，请使用 API 模式（[uni.createDramaAd](../api/create-drama-ad.md)）接入。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/)
- 示例Demo：[详见](https://gitcode.com/dcloud/uni-ad-drama)

**开通配置广告**

[开通广告步骤详情](https://uniapp.dcloud.net.cn/uni-ad/ad-open.html)

**Tips**
- HBuilder 5.32 版本 app-android 平台支持。
- 使用短剧组件需要先开通穿山甲广告，相关问题请咨询：[uni-ad交流群](https://im.dcloud.net.cn/#/?joinGroup=65d85fc09847e92db03ff81a)。
- 标准基座不包含短剧功能，需勾选广告联盟中的“穿山甲内容联盟(短剧)”，打包自定义基座后运行，否则报错 `-5020` 错误。

### 配置文件

短剧功能使用的“穿山甲内容联盟(短剧)”要求配置 `SDK参数配置` 文件，在穿山甲后台 "内容输出" -> "接入管理" 找到需要接入内容SDK的应用，点击"下载SDK参数配置"：

![](https://lf3-plat.pglstatp-toutiao.com/obj/union-platform/a30bc3001dff716fcf6876da15151ecf.png)

配置文件下载之后重命名为 `gm_SDK_Setting.json`，然后将文件放到到 uni-app x 项目的 `nativeResources\android\assets` 文件夹中。




### 兼容性 <Help />
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.32 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| adpid | string | "" | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧广告位id，在uniAD官网申请广告位 |
| free | number | 1 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 初始可免费观看的剧集数 |
| lock | number | 1 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 单次激励视频可解锁的剧集数 |
| url-callback | DramaUrlCallback \| null | null | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 服务端回调透传参数（userId/extra），激励发放时透传服务器校验 |
| @load | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧加载成功的回调 |
| @error | (event:[UniDramaErrorEvent](#unidramaerrorevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧加载失败的回调 |
| @click | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 点击短剧的回调 |
| @close | (event: [UniNativeViewEvent](/component/common.md#uninativeviewevent)) => void |   | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 5.32; iOS: x; HarmonyOS: x | 短剧关闭的回调 |

<!-- UTSCOMJSON.ad-drama.fileFormates -->



<!-- UTSCOMJSON.ad-drama.component_type -->

### 子组件 @children-tags
不可以嵌套组件





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.ad.ad-drama)
- [插件市场](https://ext.dcloud.net.cn/plugin?id=30115)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=ad-drama&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=ad-drama&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=ad-drama&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=ad-drama&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=ad-drama&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=ad-drama)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=ad-drama&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
