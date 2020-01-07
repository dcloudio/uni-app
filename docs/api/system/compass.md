### uni.onCompassChange(CALLBACK)
监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用 ``uni.stopCompass`` 停止监听。

**CALLBACK 返回参数**

|参数|类型|说明|
|:-|:-|:-|
|direction|Number|面对的方向度数|

**Tips**
- H5端获取罗盘信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。

**示例**

```javascript
uni.onCompassChange(function (res) {
	console.log(res.direction);
});
```

### uni.startCompass(OBJECT)
开始监听罗盘数据。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|x|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.startCompass();
```

### uni.stopCompass(OBJECT)
停止监听罗盘数据。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.stopCompass();
```
