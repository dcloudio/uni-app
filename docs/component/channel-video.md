<!-- ## channel-video -->

::: sourceCode
## channel-video

> issues: https://issues.dcloud.net.cn/?mid=component.wx.other.channel-video

:::




### 兼容性 <Help />
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/component/channel-video.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=channel-video&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| feed-id | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>仅视频号视频与小程序同主体时生效。若内嵌非同主体视频，请使用 feed-token。 |
| finder-user-name | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>视频号 id，以“sph”开头的id，可在视频号助手获取。视频号必须与当前小程序相同主体。 |
| feed-token | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>仅内嵌小程序非同主体视频号视频时使用，获取方式参考[本指引](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/channels-activity#feed-token)。 |
| autoplay | string | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(string)*<br/>是否自动播放。仅视频号视频与小程序同主体时支持设置为 true。 |
| loop | boolean | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(boolean)*<br/>是否循环播放 |
| muted | boolean | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(boolean)*<br/>是否静音播放 |
| object-fit | boolean | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(boolean)*<br/>当视频大小与 video 容器大小不一致时，视频的表现形式 |
| @error | eventhandle | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | *(eventhandle)*<br/>视频播放出错时触发 |

#### object-fit 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| contain | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 包含 |
| fill | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 填充 |
| cover | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 覆盖 |



<!-- UTSCOMJSON.channel-video.component_type -->






