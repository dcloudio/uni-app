<!-- ## force-press-gesture-handler -->

::: sourceCode
## force-press-gesture-handler

> issues: https://issues.dcloud.net.cn/?mid=component.wx.skyline.force-press-gesture-handler

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/force-press-gesture-handler.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=force-press-gesture-handler&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| tag | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>声明手势协商时的组件标识 |
| worklet:ongesture | eventhandler | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandler)*<br/>手势识别成功的回调 |
| worklet:should-accept-gesture | callback | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(callback)*<br/>手势是否应该被识别 |
| simultaneous-handlers | Array.&lt;string&gt; | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array.&lt;string&gt;)*<br/>声明可同时触发的手势节点 |
| native-view | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>代理的原生节点类型 |

#### worklet:ongesture 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| state | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 手势状态 |
| absoluteX | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 相对于全局的 X 坐标 |
| absoluteY | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 相对于全局的 Y 坐标 |
| pressure | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 压力大小 |



<!-- UTSCOMJSON.force-press-gesture-handler.component_type -->






