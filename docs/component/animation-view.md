<!-- ## animation-view -->

::: sourceCode
## animation-view

> issues: https://issues.dcloud.net.cn/?mid=component.media.animation-view


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-animation-view/components/animation-view

:::

Lottie 动画

> 本 Component 是 uni ext component，需下载插件：[animation-view](https://ext.dcloud.net.cn/plugin?id=28623)



### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=animation-view&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=animation-view&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["√","√","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","3.9","4.11","5.0"]],"status":"PARTIALLY_SUPPORTED"}' />


标准基座并不包含本插件，下载插件后需编写调用代码并打包自定义基座才可运行。

### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | "" | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 动画资源地址，目前只支持绝对路径 |
| loop | boolean | false | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 动画是否循环播放 |
| autoplay | boolean | false | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 动画是否自动播放 |
| action | string | "stop" | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 动画操作，可取值 play、pause、stop |
| hidden | boolean | false | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 是否隐藏动画 |
| @ended | (event: [UniEvent](/component/common.md#unievent)) => void |   | Web: √; 微信小程序: x; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 |   |

#### action 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| play | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 播放 |
| pause | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 暂停 |
| stop | Web: √; 微信小程序: √; 支付宝小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 5.0 | 停止 |



### 子组件 @children-tags
不可以嵌套组件



### 参见
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/animation-view.html)

