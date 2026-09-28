<!-- ## ad-drama -->

::: sourceCode
## ad-drama
:::

uni-app x 短剧插件：uni.createDramaAd API 与 ad-drama 组件（独立运行，不依赖其他插件）

ad-drama 组件是短剧广告的组件模式接入方式：内嵌渠道提供的短剧首页 Fragment（native-view），组件挂载即自动加载短剧模块，适合快速接入短剧广告。

与 API 模式（[uni.createDramaAd](../api/create-drama-ad.md)）的区别：组件模式直接使用渠道提供的短剧首页界面（含推荐、榜单等内容分发），无需自行搭建短剧列表页；API 模式则自行搭建列表页，可深度定制样式与业务。

解锁广告由短剧 AAR 内部完成，页面侧无需处理激励视频逻辑。

- uni-ad的业务介绍：[详见](https://uniapp.dcloud.net.cn/uni-ad/)

上述文档是uni-app和uni-app x的通用文档，如遇到uni-app x不一致的文档，需以uni-app x文档为准。

### 开通与配置

1. 开通短剧广告位

   登录 [uni-ad 广告联盟](https://uniad.dcloud.net.cn/) 开通短剧广告，创建短剧广告位后获取广告位标识 `adpid`，传入 ad-drama 组件的属性 `adpid` 中。

2. 配置广告模块

   在 `manifest.json` 的 `app -> distribute -> modules` 下添加 `gm-content` 模块，详见 [manifest uni-ad 模块配置](../collocation/manifest-modules.md#uni-ad)。

3. 配置原生资源与自定义基座

   在项目 `nativeResources/android/assets/` 下添加 `gm_SDK_Setting.json`（穿山甲内容联盟 SDK 配置 + VOD 点播 license），并制作自定义基座。标准基座不包含短剧运行时，会报错 `-5020`。

完整配置说明与错误码见 [uni.createDramaAd](../api/create-drama-ad.md)。




### 兼容性 <Help />
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.21 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 属性 
| 名称 | 类型 | 默认值 |
| :- | :- | :- |
| adpid | string | "" |
| free | number | 1 |
| lock | number | 1 |
| urlCallback | any | null |
| @load | Event |   |
| @error | Event |   |
| @click | Event |   |
| @close | Event |   |

<!-- UTSCOMJSON.ad-drama.fileFormates -->



<!-- UTSCOMJSON.ad-drama.component_type -->



## Tips

+ 组件挂载即自动加载短剧模块，无需手动触发；修改属性后需改变 `key` 使组件整体重建，新的参数才会生效。

+ `@load` 事件可能早于页面 `onMounted` 到达（短剧模块已就绪时，实测提前约 20ms）。依赖 load 时序的业务（如加载计时）应在 `setup` 顶层同步启动，不要放在 `onMounted` 中。

+ 组件属性 `urlCallback` 在模板中可写作 `url-callback`（kebab-case 与驼峰写法均可）。

+ 短剧广告仅支持 Android 平台，且需使用自定义基座。错误码说明见 [uni.createDramaAd 错误码](../api/create-drama-ad.md#错误码)。




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.ad.ad-drama)
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
