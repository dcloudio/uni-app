<!-- ## grid-builder -->

::: sourceCode
## grid-builder

> issues: https://issues.dcloud.net.cn/?mid=component.wx.skyline.grid-builder

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/grid-builder.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=grid-builder&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| padding | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>长度为 4 的数组，按 top、right、bottom、left 顺序指定内边距 |
| list | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>需要用于渲染的列表 |
| child-count | Array | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array)*<br/>完整列表的长度，如果不传则取 list 的长度作为其值 |
| type | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>布局方式 |
| cross-axis-count | number | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(number)*<br/>交叉轴元素数量 |
| max-cross-axis-extent | number | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(number)*<br/>交叉轴元素最大范围 |
| main-axis-gap | number | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(number)*<br/>主轴方向间隔 |
| cross-axis-gap | number | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(number)*<br/>交叉轴方向间隔 |
| @itembuild | eventhandle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>列表项创建时触发，event.detail = {index}，index 即被创建的列表项序号 |
| @itemdispose | eventhandle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>列表项回收时触发，event.detail = {index}，index 即被回收的列表项序号 |

#### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| aligned | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 每行高度由同一行中最大高度子节点决定 |
| masonry | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 瀑布流，根据子元素高度自动布局 |



<!-- UTSCOMJSON.grid-builder.component_type -->






