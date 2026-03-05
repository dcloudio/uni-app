<!-- ## animation-view -->

::: sourceCode
## animation-view

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-animation-view


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-animation-view

:::

Lottie 动画

> 本 Component 是 uni ext component，需下载插件：[animation-view](https://ext.dcloud.net.cn/plugin?name=uni-animation-view)



### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.9 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


标准基座并不包含本插件，下载插件后需编写调用代码并打包自定义基座才可运行。

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | "" | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 动画资源地址，目前只支持绝对路径 |
| loop | boolean | false | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 动画是否循环播放 |
| autoplay | boolean | false | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 动画是否自动播放 |
| action | string | "stop" | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 动画操作，可取值 play、pause、stop |
| hidden | boolean | false | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否隐藏动画 |
| @ended | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | - |

#### action 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| play | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 播放 |
| pause | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 暂停 |
| stop | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 停止 |



### 子组件 @children-tags
不可以嵌套组件




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.media.animation-view)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/animation-view.html)
- [插件市场](https://ext.dcloud.net.cn/plugin?id=10674)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=animation-view&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=animation-view&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=animation-view&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=animation-view&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=animation-view&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=animation-view)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=animation-view&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
