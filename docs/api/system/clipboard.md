**剪贴板 API 平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|
### uni.setClipboardData(OBJECT)
设置系统剪贴板的内容。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|data|String|是|需要设置的内容|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例**

```javascript
uni.setClipboardData({
	data: 'hello',
	success: function () {
		console.log('success');
	}
});
```

### uni.getClipboardData(OBJECT)
获取系统剪贴板内容。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|data|String|剪贴板的内容|

**示例**

```javascript
uni.getClipboardData({
	success: function (res) {
		console.log(res.data);
	}
});
```

#### **注意**

- 设置剪贴板内容后，小程序平台会自动弹出轻提示。App平台默认与小程序保持一致策略。如不希望在App平台弹出提示，可使用Native.js自行操作剪贴板，插件市场有封装好的示例[https://ext.dcloud.net.cn/plugin?id=712](https://ext.dcloud.net.cn/plugin?id=712)。也可以在设置剪切板后立即uni.hideToast()。
- H5的复制粘贴，可去插件市场搜索[剪贴板](https://ext.dcloud.net.cn/search?q=%E5%89%AA%E8%B4%B4%E6%9D%BF)
