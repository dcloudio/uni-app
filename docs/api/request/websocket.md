### uni.connectSocket(OBJECT)
创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。

> 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|url|String|是|服务器接口地址|小程序中必须是 `wss://` 协议|
|header|Object|否|HTTP Header , header 中不能设置 Referer|小程序|
|method|String|否|默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT|微信小程序|
|protocols|Array&lt;String&gt;|否|子协议数组|H5、微信小程序、百度小程序、头条小程序|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**示例代码**

```javascript
uni.connectSocket({
	url: 'wss://www.example.com/socket',
	data() {
		return {
			x: '',
			y: ''
		};
	},
	header: {
		'content-type': 'application/json'
	},
	protocols: ['protocol1'],
	method: 'GET'
});
```

**返回值**

如果希望返回一个 [socketTask](/api/request/socket-task) 对象，需要至少传入 success / fail / complete 参数中的一个。例如：

```javascript
var socketTask = uni.connectSocket({
	url: 'wss://www.example.com/socket', //仅为示例，并非真实接口地址。
	complete: ()=> {}
});
```

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](/api/README?id=promise-%E5%B0%81%E8%A3%85)

**注意事项**

- 网络请求的 ``超时时间`` 可以统一在 ``manifest.json`` 中配置 [networkTimeout](/collocation/manifest?id=networktimeout)。
- App目前不支持 ``ArrayBuffer`` 类型的数据收发。可以使用 [plus-websocket](https://ext.dcloud.net.cn/plugin?id=647) 插件替代。
- App平台自定义组件模式下，以及支付宝小程序下，所有 `vue` 页面只能使用一个 `websocket` 连接。App下可以使用 [plus-websocket](https://ext.dcloud.net.cn/plugin?id=647) 插件替代实现多链接。
- 微信小程序平台1.7.0 及以上版本，最多可以同时存在5个WebSocket 连接。老版本只支持一个socket连接
- 百度小程序平台自基础库版本 1.9.4 及以后支持多个socket连接。老版本只支持一个socket连接
- QQ小程序平台最多支持同时存在5个socket链接


### uni.onSocketOpen(CALLBACK)
监听WebSocket连接打开事件。

**CALLBACK 返回参数**

|属性|类型|说明|
|:-|:-|:-|
|header|Object|连接成功的 HTTP 响应 Header|

**示例代码：**

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
});
uni.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！');
});
```


### uni.onSocketError(CALLBACK)
监听WebSocket错误。

**示例代码**

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
});
uni.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！');
});
uni.onSocketError(function (res) {
  console.log('WebSocket连接打开失败，请检查！');
});
```

### uni.sendSocketMessage(OBJECT)
通过 WebSocket 连接发送数据，需要先 [uni.connectSocket](/api/request/websocket?id=connectsocket)，并在 [uni.onSocketOpen](/api/request/websocket?id=onsocketopen) 回调之后才能发送。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|data|String/ArrayBuffer|是|需要发送的内容|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例代码**

```javascript
var socketOpen = false;
var socketMsgQueue = [];

uni.connectSocket({
  url: 'wss://www.example.com/socket'
});

uni.onSocketOpen(function (res) {
  socketOpen = true;
  for (var i = 0; i < socketMsgQueue.length; i++) {
    sendSocketMessage(socketMsgQueue[i]);
  }
  socketMsgQueue = [];
});

function sendSocketMessage(msg) {
  if (socketOpen) {
    uni.sendSocketMessage({
      data: msg
    });
  } else {
    socketMsgQueue.push(msg);
  }
}
```

### uni.onSocketMessage(CALLBACK)
监听WebSocket接受到服务器的消息事件。

**CALLBACK 返回参数**

|参数|类型|说明|
|:-|:-|:-|
|data|String/ArrayBuffer|服务器返回的消息|

**示例代码：**

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
});

uni.onSocketMessage(function (res) {
  console.log('收到服务器内容：' + res.data);
});
```

### uni.closeSocket(OBJECT)
关闭 WebSocket 连接。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|code|Number|否|一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）|
|reason|String|否|一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

### uni.onSocketClose(CALLBACK)
监听WebSocket关闭。

```javascript
uni.connectSocket({
  url: 'wss://www.example.com/socket'
});

// 注意这里有时序问题，
// 如果 uni.connectSocket 还没回调 uni.onSocketOpen，而先调用 uni.closeSocket，那么就做不到关闭 WebSocket 的目的。
// 必须在 WebSocket 打开期间调用 uni.closeSocket 才能关闭。
uni.onSocketOpen(function () {
  uni.closeSocket();
});

uni.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！');
});
```
