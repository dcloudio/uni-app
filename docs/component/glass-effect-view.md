::: sourceCode
## glass-effect-view
:::

> 组件类型：UniGlassEffectViewElement 

 玻璃效果视图容器。iOS 26 及以上使用系统液态玻璃效果，iOS 26 以下降级为系统毛玻璃效果。




### 兼容性 <Help />
| Web | 微信小程序 | Android | iOS 系统版本 | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 15.0 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| glass-style | string | "regular" | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 15.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 玻璃效果样式 |
| interactive | boolean | false | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 26.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 是否启用液态玻璃的交互行为，仅 iOS 26 及以上生效 |
| tint-color | string([string.ColorString](/uts/data-type.md#ide-string)) |   | Web: x; 微信小程序: x; Android: x; iOS 系统版本: 26.0; iOS(VDOM): x; iOS(Vapor): 5.25; HarmonyOS: x | 施加在液态玻璃效果上的着色，仅 iOS 26 及以上生效 |

#### glass-style 的属性描述

| 合法值 | 描述 |
| :- | :- |
| regular | 常规玻璃效果 |
| clear | 更通透的玻璃效果 |

<!-- UTSCOMJSON.glass-effect-view.fileFormates -->



<!-- UTSCOMJSON.glass-effect-view.component_type -->

### 子组件 @children-tags
支持所有组件

### Tips@tips

- iOS26以下：组件降级为系统毛玻璃效果，"regular" 映射为系统标准毛玻璃材质，"clear" 映射为更轻、更透明的毛玻璃材质，interactive、tint-color 属性将不生效。
- 玻璃材质需要实时采样和合成背景内容。大量创建、重叠或在长列表中频繁复用玻璃组件可能增加 GPU 合成开销造成卡顿。




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.glass-effect-view)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=glass-effect-view&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=glass-effect-view&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=glass-effect-view&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=glass-effect-view&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=glass-effect-view&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=glass-effect-view)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=glass-effect-view&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
