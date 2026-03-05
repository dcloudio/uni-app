<!-- ## page-container -->

::: sourceCode
## page-container
:::

页面容器组件，用于在页面内创建弹出层效果，支持拦截返回操作


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 5.02 | 4.41 | 5.02 | 5.02 | 5.02 | 5.02 |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| show | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 是否显示容器组件 |
| duration | number | 300 | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 动画时长，单位毫秒 |
| z-index | number | 100 | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | z-index 层级 |
| overlay | boolean | true | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 是否显示遮罩层 |
| round | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 是否显示圆角 |
| position | top \| left \| bottom \| right \| center | "bottom" | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 弹出位置，可选值为 `top` `left` `bottom` `right` `center` |
| close-on-slide-down | boolean | false | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 是否在下滑一段距离后关闭 |
| overlay-style | string | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 自定义遮罩层样式 |
| custom-style | string | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 自定义弹出层样式 |
| @beforeenter | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 进入前触发 |
| @enter | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 进入中触发 |
| @afterenter | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 进入后触发 |
| @beforeleave | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 离开前触发 |
| @leave | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 离开中触发 |
| @afterleave | Any | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 离开后触发 |
| @clickoverlay | (event: [UniPointerEvent](/component/common.md#unipointerevent)) => void | - | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 点击遮罩层时触发 |

#### position 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| top | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 顶部 |
| left | Web: 5.02; 微信小程序: x; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 左侧 |
| bottom | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 底部 |
| right | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 右侧 |
| center | Web: 5.02; 微信小程序: 4.41; Android: 5.02; iOS: 5.02; HarmonyOS: 5.02; HarmonyOS(Vapor): 5.02 | 居中 |



<!-- UTSCOMJSON.page-container.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.wx.other.page-container)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/page-container.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=page-container&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=page-container&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=page-container&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=page-container&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=page-container)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=page-container&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
