<!-- ## flow-item -->

::: sourceCode
## flow-item
:::

> 组件类型：UniFlowItemElement 

 waterflow组件的唯一合法子组件


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.41 | 4.81 | 5.02 |


waterflow 的子组件，配合 waterflow 内部业务实现 flow-item 回收复用，实现高性能的瀑布流长列表组件。flow-item 组件宽度由 waterflow 的 cross-axis-count 属性决定，所以设置与宽度相关的style样式都不生效。

flow-item 宽度计算公式：((waterflow的width - waterflow的左右的padding值域 - waterflow的border-width的值域) - (cross-axis-count - 1) * cross-axis-gap) / cross-axis-count

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| type | number | 0 | Web: x; 微信小程序: x; Android: 4.41; iOS: 4.41; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.02 | 对应flow-item的类型 waterflow 将对同类型条目进行复用，所以合理的类型拆分，可以很好地提升 waterflow 性能 |

### flow-item复用机制

waterflow 与 list-view 实现机制几乎一致，所以 flow-item 与 list-item 组件复用机制是一样的，请参考：[list-item复用机制](list-item.md#list-item复用机制)



<!-- UTSCOMJSON.flow-item.component_type -->

### 子组件 @children-tags
支持所有组件




### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.waterflow.flow-item)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=flow-item&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=flow-item&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=flow-item&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=flow-item&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=flow-item&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=flow-item)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=flow-item&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
