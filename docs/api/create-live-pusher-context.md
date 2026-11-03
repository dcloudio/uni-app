<!-- ## uni.createLivePusherContext() @createlivepushercontext -->

::: sourceCode
## uni.createLivePusherContext(livePusherId, component?) @createlivepushercontext

> issues: https://issues.dcloud.net.cn/?mid=api.component.createLivePusherContext

:::

创建并返回 live-pusher 组件上下文 LivePusherContext 对象

参考文档：
[live-pusher组件文档](../component/live-pusher.md)

### createLivePusherContext 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=createLivePusherContext&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.81","4.81","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| livePusherId | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 |   | 


### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [LivePusherContext](#livepushercontext-values) | live-pusher 组件上下文对象 | 否 |

#### LivePusherContext 的方法 @livepushercontext-values 

#### start(options? : LivePusherOptions) : void @start
start
开始推流
##### start 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### stop(options? : LivePusherOptions) : void @stop
stop
停止推流
##### stop 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### switchCamera(options? : LivePusherOptions) : void @switchcamera
switchCamera
切换前后摄像头
##### switchCamera 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### toggleTorch(options? : LivePusherOptions) : void @toggletorch
toggleTorch
开关闪光灯
##### toggleTorch 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### pause(options? : LivePusherOptions) : void @pause
pause
暂停推流
##### pause 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### resume(options? : LivePusherOptions) : void @resume
resume
恢复推流
##### resume 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### getMaxZoom(options? : LivePusherOptions) : void @getmaxzoom
getMaxZoom
获取最大缩放值
##### getMaxZoom 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### setZoom(zoom : number, options? : LivePusherOptions) : void @setzoom
setZoom
设置缩放
##### setZoom 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| zoom | number | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### startPreview(options? : LivePusherOptions) : void @startpreview
startPreview
开启摄像头预览
##### startPreview 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### stopPreview(options? : LivePusherOptions) : void @stoppreview
stopPreview
关闭摄像头预览
##### stopPreview 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### snapshot(options? : LivePusherOptions) : void @snapshot
snapshot
快照
##### snapshot 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 



#### sendMessage(message : string, options? : LivePusherOptions) : void @sendmessage
sendMessage

##### sendMessage 兼容性 <Help /> 
Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| message | string | 是 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |
| options | **LivePusherOptions** | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; HarmonyOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | Web: x; 微信小程序: x; 支付宝小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 


 


<!-- UTSAPIJSON.createLivePusherContext.example -->



示例代码另见[live-pusher组件文档](../component/live-pusher.md)

<!-- UTSAPIJSON.createLivePusherContext.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

