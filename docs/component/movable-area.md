<!-- ## movable-area -->

::: sourceCode
## movable-area
:::

movable-view 的可移动区域


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


之所以有movable-area和movable-view，是因为逻辑层和视图层分离，从视图层发送数据给逻辑层，处理后再传回视图层会产生损耗，导致拖动卡顿。

于是通过一个框架实现好的组件，在视图层内部处理拖动，避免来回通信。

在uni-app和小程序上确实存在这个问题，但在uni-app x的web和app上其实都不存在通信损耗。

在hello uni-app x里有示例，可以自由的监听view的拖动并移动其位置。[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/component/general-event/touch-event.uvue)

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| scale-area | boolean | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(Boolean)*<br/>当里面的movable-view设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个movable-area |



<!-- UTSCOMJSON.movable-area.component_type -->






### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.movable.movable-area)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/movable-area.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=movable-area&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=movable-area&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=movable-area&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=movable-area&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=movable-area)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=movable-area&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
