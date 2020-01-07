### uni.scanCode(OBJECT)
调起客户端扫码界面，扫码成功后返回对应的结果。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-:|
|onlyFromCamera|Boolean|否|是否只能从相机扫码，不允许从相册选择图片|头条小程序不支持此参数|
|scanType|Array|否|扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。|头条小程序不支持此参数，支付宝只支持条码和二维码|
|success|Function|否|接口调用成功的回调，返回内容详见返回参数说明。||
|fail|Function|否|接口调用失败的回调函数（识别失败、用户取消等情况下触发）||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**success 返回参数说明**

|参数|说明|平台差异说明|
|:-|:-|:-|
|result|所扫码的内容||
|scanType|所扫码的类型|App、微信小程序、百度小程序、QQ小程序|
|charSet|所扫码的字符集|App、微信小程序、百度小程序、QQ小程序|
|path|当所扫的码为当前应用的合法二维码时，会返回此字段，内容为二维码携带的 path。|App、微信小程序、百度小程序、QQ小程序|

**示例**

```javascript
// 允许从相机和相册扫码
uni.scanCode({
	success: function (res) {
		console.log('条码类型：' + res.scanType);
		console.log('条码内容：' + res.result);
	}
});

// 只允许通过相机扫码
uni.scanCode({
	onlyFromCamera: true,
	success: function (res) {
		console.log('条码类型：' + res.scanType);
		console.log('条码内容：' + res.result);
	}
});

// 调起条码扫描
uni.scanCode({
	scanType: 'barCode',
	success: function (res) {
		console.log('条码类型：' + res.scanType);
		console.log('条码内容：' + res.result);
	}
});
```

**Tip**

- App-vue如果想自定义扫码，可参考[uni-app中如何使用5+的原生界面控件](http://ask.dcloud.net.cn/article/35036)和[plus.barcode API](https://www.html5plus.org/doc/zh_cn/barcode.html)
- App-nvue，支持barcode组件，可自定义扫码界面。[详见](https://uniapp.dcloud.io/component/barcode)。App端自定义扫码界面，建议使用nvue方式。
- 微信小程序自定义扫码界面，可使用camera组件。[详见](https://uniapp.dcloud.io/component/camera)
- 微信内嵌浏览器运行H5版时，可通过js sdk实现扫码，需要引入一个单独的js，[详见](https://ask.dcloud.net.cn/article/35380)
- 在扫码界面点击返回也会进入 `fail` 回调中
- 支付宝小程序不支持 `success` 回调中的 `scanType`，`charSet`，`path`
