<!-- ## scale-gesture-handler -->

::: sourceCode
## scale-gesture-handler

> issues: https://issues.dcloud.net.cn/?mid=component.wx.skyline.scale-gesture-handler

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/scale-gesture-handler.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=scale-gesture-handler&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| tag | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>声明手势协商时的组件标识 |
| worklet:ongesture | eventhandler | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandler)*<br/>手势识别成功的回调 |
| worklet:should-response-on-move | callback | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(callback)*<br/>手指移动过程中手势是否响应 |
| worklet:should-accept-gesture | callback | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(callback)*<br/>手势是否应该被识别 |
| simultaneous-handlers | Array.&lt;string&gt; | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(Array.&lt;string&gt;)*<br/>声明可同时触发的手势节点 |
| native-view | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>代理的原生节点类型 |

#### worklet:ongesture 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| state | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 手势状态 |
| focalX | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 中心点相对于全局的X坐标 |
| focalY | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 中心点相对于全局的Y坐标 |
| focalDeltaX | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 相对上一次，中心点在X轴方向移动的坐标 |
| focalDeltaY | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 相对上一次，中心点在Y轴方向移动的坐标 |
| scale | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 放大或缩小的比例 |
| horizontalScale | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | scale的横向分量 |
| verticalScale | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | scale的纵向分量 |
| rotation | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 旋转角（单位：弧度） |
| velocityX | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 手指离开屏幕时的横向速度（pixel per second) |
| velocityY | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 手指离开屏幕时的纵向速度（pixel per second) |
| pointerCount | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 跟踪的手指数 |



<!-- UTSCOMJSON.scale-gesture-handler.component_type -->






