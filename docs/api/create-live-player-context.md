<!-- ## uni.createLivePlayerContext() @createliveplayercontext -->

::: sourceCode
## uni.createLivePlayerContext(livePlayerId, component?) @createliveplayercontext
:::

创建并返回 live-player 组件上下文 LivePlayerContext 对象

参考文档：
[live-player组件文档](../component/live-player.md)

### createLivePlayerContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.81 | 4.81 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| livePlayerId | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x |  |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x |  | 


### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [LivePlayerContext](#liveplayercontext-values) | live-player 组件上下文对象 | 否 |

#### LivePlayerContext 的方法 @liveplayercontext-values 

#### play(options?: LivePlayerOptions) : void @play
play
播放
##### play 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **LivePlayerOptions** | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: UTSJSONObject) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (res: UTSJSONObject) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### pause(options?: LivePlayerOptions) : void @pause
pause
暂停
##### pause 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 


#### stop(options?: LivePlayerOptions) : void @stop
stop
停止
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 


#### resume(options?: LivePlayerOptions) : void @resume
resume
恢复
##### resume 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 


#### mute(options?: LivePlayerOptions): void @mute
mute
静音
##### mute 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 


#### requestFullScreen(options?: LivePlayerOptions): void @requestfullscreen
requestFullScreen
全屏
##### requestFullScreen 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 


#### exitFullScreen(options?: LivePlayerOptions): void @exitfullscreen
exitFullScreen
退出全屏
##### exitFullScreen 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.81 | 4.81 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [LivePlayerOptions](#liveplayeroptions-values) | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: x | 方法调用参数 | 

 


<!-- UTSAPIJSON.createLivePlayerContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createLivePlayerContext)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/live-player-context.html#createLivePlayerContext)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createLivePlayerContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createLivePlayerContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createLivePlayerContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createLivePlayerContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createLivePlayerContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createLivePlayerContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

示例代码另见[live-player组件文档](../component/live-player.md)

<!-- UTSAPIJSON.createLivePlayerContext.example -->

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

