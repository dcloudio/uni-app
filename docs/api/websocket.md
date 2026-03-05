::: warning 注意事项

[uni.onSocketOpen](#onsocketopen)、[uni.onSocketError](#onsocketerror)、[uni.sendSocketMessage](#sendsocketmessage)、[uni.onSocketMessage](#onsocketmessage)、[uni.closeSocket](#closesocket)、[uni.onSocketClose](#onsocketclose) 操作的是应用全局范围创建的第一个 WebSocket 连接，当应用中存在多个 WebSocket 连接时，不能通过以上方法进行操作管理。这时需要通过 [uni.connectSocket](#connectsocket) 返回的 SocketTask 对象的 onOpen、onError、send、onMessage、close、onClose 方法进行操作。

为了有更好的兼容性，不要使用 uni 上已废弃的 [uni.onSocketOpen](#onsocketopen)、[uni.onSocketError](#onsocketerror)、[uni.sendSocketMessage](#sendsocketmessage)、[uni.onSocketMessage](#onsocketmessage)、[uni.closeSocket](#closesocket)、[uni.onSocketClose](#onsocketclose) 等方法。

:::


<!-- ## uni.connectSocket(options) @connectsocket -->

::: sourceCode
## uni.connectSocket(options) @connectsocket

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

创建一个 WebSocket 连接。

### connectSocket 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ConnectSocketOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器接口地址 |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: - | HTTP 请求 Header，header 中不能设置 Referer |
| protocols | Array&lt;string&gt; | 否 | null | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: - | 子协议数组 |
| success | (result: [ConnectSocketSuccess](#connectsocketsuccess-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ConnectSocketFail](#connectsocketfail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| forceCellularNetwork | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.29.0`<br/><br/>强制使用蜂窝网络发送请求<br/> |
| perMessageDeflate | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.8.0`<br/><br/>是否开启压缩扩展<br/> |
| tcpNoDelay | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.4.0`<br/><br/>建立 TCP 连接的时候的 TCP_NODELAY 设置<br/> |
| timeout | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.0`<br/><br/>超时时间，单位为毫秒<br/> | 

#### ConnectSocketSuccess 的属性值 @connectsocketsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ConnectSocketFail 的属性值 @connectsocketfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码<br/>- 600009 URL格式不合法 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 |
| :- |
| [SocketTask](#sockettask-values) |

#### SocketTask 的方法 @sockettask-values 

#### send(options: SendSocketMessageOptions): void; @send
send
通过 WebSocket 连接发送数据
##### send 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SendSocketMessageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要发送的内容, app平台从 4.61 版本开始支持ArrayBuffer |
| success | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [SendSocketMessageFail](#sendsocketmessagefail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### SendSocketMessageFail 的属性值 @sendsocketmessagefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 10001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 发送数据超限，发送队列不能超过16M大小。 |
| 10002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | websocket未连接 |
| 602001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | websocket系统错误 |


#### close(options: CloseSocketOptions): void; @close
close
关闭 WebSocket 连接
##### close 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CloseSocketOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| code | number | 否 | 1000 | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭） |
| reason | string | 否 | "" | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符） |
| success | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### onOpen(callback: (result: OnSocketOpenCallbackResult) => void): void; @onopen
onOpen
监听 WebSocket 连接打开事件
##### onOpen 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnSocketOpenCallbackResult](#onsocketopencallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### OnSocketOpenCallbackResult 的属性值 @onsocketopencallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| header | any | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 连接成功的 HTTP 响应 Header |


#### onClose(callback: (result: any) => void): void; @onclose
onClose
监听 WebSocket 连接关闭事件
##### onClose 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onError(callback: (result: GeneralCallbackResult) => void): void; @onerror
onError
监听 WebSocket 错误
##### onError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### onMessage(callback: (result: OnSocketMessageCallbackResult) => void): void; @onmessage
onMessage
监听 WebSocket 接受到服务器的消息事件
##### onMessage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnSocketMessageCallbackResult](#onsocketmessagecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### OnSocketMessageCallbackResult 的属性值 @onsocketmessagecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 服务器返回的消息, app平台从 4.61 版本开始支持ArrayBuffer |

 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.connectSocket)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#connectsocket)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/SocketTask.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=connectSocket&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=connectSocket&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=connectSocket&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=connectSocket&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=connectSocket)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=connectSocket&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.~~onSocketOpen(options)~~ @onsocketopen -->

::: sourceCode
## uni.~~onSocketOpen(options)~~ @onsocketopen

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

监听WebSocket连接打开事件。  **已废弃，使用 SocketTask 的 onOpen 替换。**

### onSocketOpen 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | (result: [OnSocketOpenCallbackResult](#onsocketopencallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.onSocketOpen)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketopen)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketOpen.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onSocketOpen&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onSocketOpen&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onSocketOpen&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onSocketOpen&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onSocketOpen)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onSocketOpen&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.~~onSocketError(callback)~~ @onsocketerror -->

::: sourceCode
## uni.~~onSocketError(callback)~~ @onsocketerror

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

监听WebSocket错误。  **已废弃，使用 SocketTask 的 onError 替换。**

### onSocketError 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnSocketErrorCallbackResult](#onsocketerrorcallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnSocketErrorCallbackResult 的属性值 @onsocketerrorcallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.onSocketError)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketerror)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketError.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onSocketError&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onSocketError&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onSocketError&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onSocketError&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onSocketError)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onSocketError&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.~~sendSocketMessage(options)~~ @sendsocketmessage -->

::: sourceCode
## uni.~~sendSocketMessage(options)~~ @sendsocketmessage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

通过 WebSocket 连接发送数据，需要先 uni.connectSocket，并在 uni.onSocketOpen 回调之后才能发送。  **已废弃，使用 SocketTask 的 send 替换。**

### sendSocketMessage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SendSocketMessageOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要发送的内容, app平台从 4.61 版本开始支持ArrayBuffer |
| success | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [SendSocketMessageFail](#sendsocketmessagefail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SendSocketMessageFail 的属性值 @sendsocketmessagefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 10001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 发送数据超限，发送队列不能超过16M大小。 |
| 10002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | websocket未连接 |
| 602001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | websocket系统错误 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.sendSocketMessage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#sendsocketmessage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.sendSocketMessage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=sendSocketMessage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=sendSocketMessage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=sendSocketMessage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=sendSocketMessage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=sendSocketMessage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=sendSocketMessage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 注意事项

* 出于性能的权衡，在底层实现上发送队列占用的内存不能超过16M，一旦超过将导致连接被关闭。

<!-- ## uni.~~onSocketMessage(callback)~~ @onsocketmessage -->

::: sourceCode
## uni.~~onSocketMessage(callback)~~ @onsocketmessage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

监听WebSocket接受到服务器的消息事件。  **已废弃，使用 SocketTask 的 onMessage 替换。**

### onSocketMessage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnSocketMessageCallbackResult](#onsocketmessagecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnSocketMessageCallbackResult 的属性值 @onsocketmessagecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | any | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 服务器返回的消息, app平台从 4.61 版本开始支持ArrayBuffer |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.onSocketMessage)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketmessage)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketMessage.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onSocketMessage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onSocketMessage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onSocketMessage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onSocketMessage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onSocketMessage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onSocketMessage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.~~closeSocket(options)~~ @closesocket -->

::: sourceCode
## uni.~~closeSocket(options)~~ @closesocket

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

关闭 WebSocket 连接。  **已废弃，使用 SocketTask 的 close 替换。**

### closeSocket 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CloseSocketOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| code | number | 否 | 1000 | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭） |
| reason | string | 否 | "" | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符） |
| success | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [GeneralCallbackResult](#generalcallbackresult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.closeSocket)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#closesocket)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.closeSocket.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=closeSocket&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=closeSocket&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=closeSocket&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=closeSocket&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=closeSocket)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=closeSocket&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.~~onSocketClose(callback)~~ @onsocketclose -->

::: sourceCode
## uni.~~onSocketClose(callback)~~ @onsocketclose

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-websocket


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-websocket

:::

监听WebSocket关闭。  **已废弃，使用 SocketTask 的 onClose 替换。**

### onSocketClose 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnSocketCloseCallbackResult](#onsocketclosecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnSocketCloseCallbackResult 的属性值 @onsocketclosecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| code | number | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。 |
| reason | string | 是 | - | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 一个可读的字符串，表示连接被关闭的原因。 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.websocket.onSocketClose)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/websocket.html#onsocketclose)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.onSocketClose.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onSocketClose&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onSocketClose&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onSocketClose&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onSocketClose&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onSocketClose)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onSocketClose&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/websocket/websocket.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/websocket/websocket.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/websocket/websocket

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/websocket/websocket

>示例
```vue
<template>
  <page-head title="websocket通讯示例"></page-head>
  <view class="uni-padding-wrap">
    <view class="uni-btn-v">
      <text class="websocket-msg">{{ showMsg }}</text>
      <button class="uni-btn-v" type="primary" @click="connect">
        连接websocket服务
      </button>
      <button class="uni-btn-v" v-show="connected" type="primary" @click="send">
        发送一条消息
      </button>
      <button class="uni-btn-v" type="primary" @click="close">
        断开websocket服务
      </button>
      <text class="websocket-tips">发送消息后会收到一条服务器返回的消息（与发送的消息内容一致）</text>
      <text
        class="websocket-tips">web端和小程序端uni-push功能、app-android端和app-ios端的web-view组件日志回显、app-harmony端的日志回显会占用一个socket链接，此时使用全局的socket
        api会引发混乱。应使用socketTask操作websocket链接。</text>
      <text class="websocket-tips">小程序端日志回显功能也会占用一个socket链接，如果不希望使用此功能可以在HBuilderX控制台关闭日志回显。</text>
      <button class="uni-btn-v" type="primary" @click="goSocketTask">
        跳转 socketTask 示例
      </button>
    </view>
  </view>
</template>

<script setup lang="uts">
  const connected = ref(false)
  const connecting = ref(false)
  const msg = ref('')
  const roomId = ref('')
  const platform = ref('')

  const showMsg = computed(() : string => {
    if (connected.value) {
      if (msg.value.length > 0) {
        return '收到消息：' + msg.value
      } else {
        return '等待接收消息'
      }
    } else {
      return '尚未连接'
    }
  })

  onLoad(() => {
    platform.value = uni.getDeviceInfo().platform as string
  })

  onUnload(() => {
    uni.closeSocket({
      code: 1000,
      reason: 'close reason from client',
      success: (res : any) => {
        console.log('uni.closeSocket success', res)
      },
      fail: (err : any) => {
        console.log('uni.closeSocket fail', err)
      },
    } as CloseSocketOptions)
    uni.hideLoading()
  })

  const connect = () => {
    if (connected.value || connecting.value) {
      uni.showModal({
        content: '正在连接或者已经连接，请勿重复连接',
        showCancel: false,
      })
      return
    }
    connecting.value = true
    uni.showLoading({
      title: '连接中...',
    })
    uni.connectSocket({
      url: 'wss://websocket.dcloud.net.cn',
      header:{
        "test":"uniapp x"
      },
      protocols: null,
      success: (res : any) => {
        // 这里是接口调用成功的回调，不是连接成功的回调，请注意
        console.log('uni.connectSocket success', res)
      },
      fail: (err : any) => {
        // 这里是接口调用失败的回调，不是连接失败的回调，请注意
        console.log('uni.connectSocket fail', err)
      },
    })
    uni.onSocketOpen((res) => {
      connecting.value = false
      connected.value = true
      uni.hideLoading()

      uni.showToast({
        icon: 'none',
        title: '连接成功',
      })
      console.log('onOpen', res)
    })
    uni.onSocketError((err) => {
      connecting.value = false
      connected.value = false
      uni.hideLoading()

      uni.showModal({
        content: '连接失败，可能是websocket服务不可用，请稍后再试',
        showCancel: false,
      })
      console.log('onError', err)
    })
    uni.onSocketMessage((res) => {
      if (res.data instanceof ArrayBuffer) {
        var int8 = new Int8Array(res.data)
        msg.value = int8.toString()
        console.log('onMessage', res)
      } else {
        msg.value = res.data as string
        console.log('onMessage', res)
      }
    })
    uni.onSocketClose((res) => {
      connected.value = false
      msg.value = ''
      console.log('onClose', res)
    })
  }

  const send = () => {
    uni.sendSocketMessage({
      data:
        'from ' +
        platform.value +
        ' : ' +
        parseInt((Math.random() * 10000).toString()).toString(),
      success: (res : any) => {
        console.log(res)
      },
      fail: (err : any) => {
        console.log(err)
      },
    } as SendSocketMessageOptions)
  }

  const close = () => {
    uni.closeSocket({
      code: 1000,
      reason: 'close reason from client',
      success: (res : any) => {
        console.log('uni.closeSocket success', res)
      },
      fail: (err : any) => {
        console.log('uni.closeSocket fail', err)
      },
    } as CloseSocketOptions)
  }

  const goSocketTask = () => {
    uni.navigateTo({
      url: '/pages/API/websocket/socketTask',
    })
  }

</script>

<style>
  .uni-btn-v {
    padding: 5px 0;
  }

  .uni-btn-v {
    margin: 10px 0;
  }

  .websocket-msg {
    padding: 40px 0px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: #666666;
  }

  .websocket-tips {
    padding: 10px 0px;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    color: #666666;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

