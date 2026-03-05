<!-- ## grid-builder -->

::: sourceCode
## grid-builder
:::




### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| padding | Array | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Array)*<br/>长度为 4 的数组，按 top、right、bottom、left 顺序指定内边距 |
| list | Array | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Array)*<br/>需要用于渲染的列表 |
| child-count | Array | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Array)*<br/>完整列表的长度，如果不传则取 list 的长度作为其值 |
| type | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>布局方式 |
| cross-axis-count | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>交叉轴元素数量 |
| max-cross-axis-extent | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>交叉轴元素最大范围 |
| main-axis-gap | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>主轴方向间隔 |
| cross-axis-gap | number | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(number)*<br/>交叉轴方向间隔 |
| @itembuild | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>列表项创建时触发，event.detail = {index}，index 即被创建的列表项序号 |
| @itemdispose | eventhandle | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandle)*<br/>列表项回收时触发，event.detail = {index}，index 即被回收的列表项序号 |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| aligned | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 每行高度由同一行中最大高度子节点决定 |
| masonry | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 瀑布流，根据子元素高度自动布局 |



<!-- UTSCOMJSON.grid-builder.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.wx.skyline.grid-builder)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/grid-builder.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=grid-builder&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=grid-builder&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=grid-builder&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=grid-builder&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=grid-builder)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=grid-builder&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
