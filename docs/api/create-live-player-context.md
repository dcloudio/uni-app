<!-- ## uni.createLivePlayerContext() @createliveplayercontext -->

::: sourceCode
## uni.createLivePlayerContext(livePlayerId, component?) @createliveplayercontext

> issues: https://issues.dcloud.net.cn/?mid=api.component.createLivePlayerContext

:::

创建并返回 live-player 组件上下文 LivePlayerContext 对象

参考文档：
[live-player组件文档](../component/live-player.md)

### createLivePlayerContext 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=createLivePlayerContext&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.81","4.81","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| livePlayerId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 |   | 


### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [LivePlayerContext](#liveplayercontext-values) | live-player 组件上下文对象 | 否 |

#### LivePlayerContext 的方法 @liveplayercontext-values 

#### play(options?: LivePlayerOptions) : void @play
play
播放
##### play 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### pause(options?: LivePlayerOptions) : void @pause
pause
暂停
##### pause 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### stop(options?: LivePlayerOptions) : void @stop
stop
停止
##### stop 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### resume(options?: LivePlayerOptions) : void @resume
resume
恢复
##### resume 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### mute(options?: LivePlayerOptions): void @mute
mute
静音
##### mute 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### requestFullScreen(options?: LivePlayerOptions): void @requestfullscreen
requestFullScreen
全屏
##### requestFullScreen 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### exitFullScreen(options?: LivePlayerOptions): void @exitfullscreen
exitFullScreen
退出全屏
##### exitFullScreen 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 


 


<!-- UTSAPIJSON.createLivePlayerContext.example -->



示例代码另见[live-player组件文档](../component/live-player.md)

<!-- UTSAPIJSON.createLivePlayerContext.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

