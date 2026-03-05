<!-- ## uni.createVideoContext(videoId, component?) @createvideocontext -->

::: sourceCode
## uni.createVideoContext(videoId, component?) @createvideocontext

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-video


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-video

:::

创建并返回 video 上下文 videoContext 对象

参考：[video组件](../component/video.md)

### createVideoContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| videoId | [string.VideoIdString](/uts/data-type.md#ide-string) | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


在video组件上设置id属性，即可通过本API获取该组件的上下文对象（videoContext ）。

在不传入第2个component参数时，默认从页面栈顶的页面来查找这个video。
```js
let v1 = uni.createVideoContext("video1")
```

但在页面、组件，可能出现id重复的情况，还可能因为调用时机的不同，想定位不同页面的video id。此时就需要传入第2个参数component。

所有vue组件都有ComponentPublicInstance实例，页面上也有组件实例。

如果传入组件实例，就从这个组件中查询指定的id。这样查找范围更小、查找速度也更快。

在选项式和组合式中，获取组件实例略有差别。

- 选项式中，this代表当前vue实例。如果是在页面的export default内、函数外使用this，即代表该页面的组件实例。
```js
let v1 = uni.createVideoContext("video1", this)
```
- 组合式中，通过getCurrentInstance()!.proxy! 获取当前页面的组件实例。
```js
let v1 = uni.createVideoContext("video1", getCurrentInstance()!.proxy!)
```
### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [VideoContext](#videocontext-values) | video组件上下文对象 | 否 |

#### VideoContext 的方法 @videocontext-values 

#### play(): void; @play
play
播放
##### play 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### pause(): void; @pause
pause
暂停
##### pause 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### seek(position: number): void; @seek
seek
跳转到指定位置
##### seek 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| position | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 跳转到指定位置(秒) | 


#### stop(): void; @stop
stop
停止视频
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### sendDanmu(danmu: Danmu): void; @senddanmu
sendDanmu
发送弹幕
##### sendDanmu 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| danmu | **Danmu** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | text, color |

#### danmu 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 弹幕文字 |
| color | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 弹幕颜色 |
| time | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示时刻 | 


#### playbackRate(rate: number): void; @playbackrate
playbackRate
设置倍速播放
##### playbackRate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| rate | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | , 支持倍率 0.5/0.8/1.0/1.25/1.5 | 


#### requestFullScreen(direction?: RequestFullScreenOptions \| null): void; @requestfullscreen
requestFullScreen
进入全屏
##### requestFullScreen 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| direction | **RequestFullScreenOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | , 0\|正常竖向, 90\|屏幕逆时针90度, -90\|屏幕顺时针90度 |

#### direction 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| direction | 90 \| any | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: - | direction | 


#### exitFullScreen(): void; @exitfullscreen
exitFullScreen
退出全屏
##### exitFullScreen 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


 


<!-- UTSAPIJSON.createVideoContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createVideoContext)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/media/video-context.html#createvideocontext)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/VideoContext.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createVideoContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createVideoContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createVideoContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createVideoContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createVideoContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createVideoContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


示例代码另见[video组件](../component/video.md)
