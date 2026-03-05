## cover-image

覆盖在原生组件之上的图片视图，可覆盖的原生组件同cover-view，支持嵌套在cover-view里。

cover-image 在uni-app x的app、web、微信小程序上，已废弃，使用 image 即可。

在其他小程序平台，某些原生组件（如map、canvas、video）不支持同层渲染，仍需要 cover-image 来覆盖。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.53 | 4.53 | 4.61 | - |


::: warning 注意
app 端并不是在运行时实现了 cover-image 组件，仅仅是编译器把 cover-image 编译为了 image。运行时获取到的Dom仍然是UniImageElement。
:::

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| src | string([string.ImageURIString](/uts/data-type.md#ide-string)) | - | Web: 4.0; 微信小程序: 4.41; Android: 4.53; iOS: 4.53; HarmonyOS: -; HarmonyOS(Vapor): - | 图标路径，支持临时路径、网络地址（1.6.0起支持）。暂不支持base64格式。 |
| referrer-policy | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>格式固定为 `https://servicewechat.com/{appid}/{version}/page-frame.html`，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本； |
| @load | eventhandle | - | Web: 4,0; 微信小程序: 4.41; Android: 4.53; iOS: 4.53; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>图片加载成功时触发 |
| @error | eventhandle | - | Web: 4,0; 微信小程序: 4.41; Android: 4.53; iOS: 4.53; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>图片加载失败时触发 |

#### referrer-policy 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| origin | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 发送完整的referrer |
| no-referrer | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 不发送 |



<!-- UTSCOMJSON.cover-image.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.cover.cover-image)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/cover-image.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/cover-image.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=cover-image&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=cover-image&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=cover-image&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=cover-image&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=cover-image)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=cover-image&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
