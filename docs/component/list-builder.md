<!-- ## list-builder -->

::: sourceCode
## list-builder

> issues: https://issues.dcloud.net.cn/?mid=component.wx.skyline.list-builder

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/list-builder.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=list-builder&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| padding | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>长度为 4 的数组，按 top、right、bottom、left 顺序指定内边距 |
| type | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>类型，默认为定高模式 |
| list | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>需要用于渲染的列表 |
| child-count | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>完整列表的长度，如果不传则取 list 的长度作为其值 |
| child-height | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>列表项的高度，当 type 为 static 时必须传入 |
| @itembuild | eventhandle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>列表项创建时触发，event.detail = {index}，index 即被创建的列表项序号 |
| @itemdispose | eventhandle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>列表项回收时触发，event.detail = {index}，index 即被回收的列表项序号 |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| static | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 定高模式，所有列表项等高，需要传入 child-height |
| dynamic | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 不定高模式 |



<!-- UTSCOMJSON.list-builder.component_type -->






