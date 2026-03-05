<!-- ## pan-gesture-handler -->

::: sourceCode
## pan-gesture-handler
:::




### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tag | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>声明手势协商时的组件标识 |
| worklet:ongesture | eventhandler | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(eventhandler)*<br/>手势识别成功的回调 |
| worklet:should-response-on-move | callback | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(callback)*<br/>手指移动过程中手势是否响应 |
| worklet:should-accept-gesture | callback | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(callback)*<br/>手势是否应该被识别 |
| simultaneous-handlers | Array.&lt;string&gt; | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Array.&lt;string&gt;)*<br/>声明可同时触发的手势节点 |
| native-view | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>代理的原生节点类型 |

#### worklet:ongesture 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| state | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 手势状态 |
| absoluteX | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 相对于全局的 X 坐标 |
| absoluteY | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 相对于全局的 Y 坐标 |
| deltaX | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 相对上一次，X 轴方向移动的坐标 |
| deltaY | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 相对上一次，Y 轴方向移动的坐标 |
| velocityX | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 手指离开屏幕时的横向速度（pixel per second) |
| velocityY | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | 手指离开屏幕时的纵向速度（pixel per second) |



<!-- UTSCOMJSON.pan-gesture-handler.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.wx.skyline.pan-gesture-handler)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/pan-gesture-handler.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=pan-gesture-handler&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=pan-gesture-handler&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=pan-gesture-handler&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=pan-gesture-handler&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=pan-gesture-handler)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=pan-gesture-handler&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
