### uni.getNetworkType(OBJECT)
获取网络类型。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|是|接口调用成功，返回网络类型 networkType|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|说明|
|:-|:-|
|networkType|网络类型|

**networkType 有效值**

|值|说明|平台差异说明|
|:-|:-|:-|
|wifi|wifi 网络||
|2g|2g 网络||
|3g|3g 网络||
|4g|4g 网络||
|ethernet|有线网络|App|
|unknown|Android 下不常见的网络类型||
|none|无网络|&nbsp;|

**示例**

```javascript
uni.getNetworkType({
	success: function (res) {
		console.log(res.networkType);
	}
});
```

### uni.onNetworkStatusChange(CALLBACK)
监听网络状态变化。

**CALLBACK 返回参数**

|参数|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|isConnected|Boolean|当前是否有网络连接|字节跳动小程序不支持|
|networkType|String|网络类型|&nbsp;|

**示例**

```javascript
uni.onNetworkStatusChange(function (res) {
	console.log(res.isConnected);
	console.log(res.networkType);
});
```