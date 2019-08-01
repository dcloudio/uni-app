**SocketTask** 由 [uni.connectSocket()](/api/request/websocket?id=connectsocket) 接口创建。

**平台差异说明**

支付宝小程序、头条小程序，没有明确的文档来具体说明这个对象，而是指向了 [Web Websocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 对象。

### SocketTask.onMessage(CALLBACK)
监听 WebSocket 接受到服务器的消息事件

**回调函数**

`Function`

WebSocket 接受到服务器的消息事件的回调函数

**回调函数中的参数**

`Object`

|属性|类型|说明|
|:-|:-|:-|
|data|String/ArrayBuffer|服务器返回的消息|

### SocketTask.send(OBJECT)
通过 WebSocket 连接发送数据

**参数**

|属性|类型|是否必填|说明|
|:-|:-|:-|:-|
|data|String/ArrayBuffer|是|需要发送的内容|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

### SocketTask.close(OBJECT)
关闭 WebSocket 连接

**参数**

|属性|类型|默认值|是否必填|说明|
|:-|:-|:-|:-|:-|
|code|Number|1000（表示正常关闭连接）|否|一个数字值表示关闭连接的状态号，表示连接被关闭的原因。|
|reason|String||否|一个可读的字符串，表示连接被关闭的原因。|
|success|Function||否|接口调用成功的回调函数|
|fail|Function||否|接口调用失败的回调函数|
|complete|Function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

### SocketTask.onOpen(CALLBACK)
监听 WebSocket 连接打开事件

**回调函数**

`Function`

WebSocket 连接打开事件的回调函数

**回调函数中的参数**

`Object`

|属性|类型|说明|
|:-|:-|:-|
|data|String/ArrayBuffer|服务器返回的消息|

### SocketTask.onClose(CALLBACK)
监听 WebSocket 连接关闭事件

**回调函数**

`Function`

WebSocket 连接关闭事件的回调函数

### SocketTask.onError(CALLBACK)
监听 WebSocket 错误事件

**回调函数**

`Function`

WebSocket 错误事件的回调函数

**回调函数中的参数**

`Object`

|属性|类型|说明|
|:-|:-|:-|
|errMsg|String|错误信息|