### uni.uploadFile(OBJECT)
将本地资源上传到开发者服务器，客户端发起一个 ``POST`` 请求，其中 ``content-type`` 为 ``multipart/form-data``。  
如页面通过 [uni.chooseImage](api/media/image?id=chooseimage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。另外选择和上传非图像、视频文件参考：[https://ask.dcloud.net.cn/article/35547](https://ask.dcloud.net.cn/article/35547)。

> 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|url|String|是|开发者服务器 url||
|files|Array|否|需要上传的文件列表。**使用 files 时，filePath 和 name 不生效。**|App、H5（ 2.7.0+）|
|fileType|String|见平台差异说明|文件类型，image/video/audio|仅支付宝小程序，且必填。|
|filePath|String|是|要上传文件资源的路径。||
|name|String|是|文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容||
|header|Object|否|HTTP 请求 Header, header 中不能设置 Referer。||
|formData|Object|否|HTTP 请求中其他额外的 form data||
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**注意**：

- App支持多文件上传，微信小程序只支持单文件上传，传多个文件需要反复调用本API。所以跨端的写法就是循环调用本API。
- hello uni-app中的客服反馈，支持多图上传。[uni-app插件市场](https://ext.dcloud.net.cn/)中也有多个封装的组件。
- App平台选择和上传非图像、视频文件，参考[https://ask.dcloud.net.cn/article/35547](https://ask.dcloud.net.cn/article/35547)
- 网络请求的 ``超时时间`` 可以统一在 ``manifest.json`` 中配置 [networkTimeout](/collocation/manifest?id=networktimeout)。

**files参数说明**

files 参数是一个 file 对象的数组，file 对象的结构如下：

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|name|String|否|multipart 提交时，表单的项目名，默认为 file|
|uri|String|是|文件的本地地址|

Tip:

- 如果 ``name`` 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|data|String|开发者服务器返回的数据|
|statusCode|Number|开发者服务器返回的 HTTP 状态码|

**示例**

```javascript
uni.chooseImage({
	success: (chooseImageRes) => {
		const tempFilePaths = chooseImageRes.tempFilePaths;
		uni.uploadFile({
			url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
			filePath: tempFilePaths[0],
			name: 'file',
			formData: {
				'user': 'test'
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
			}
		});
	}
});
```

**返回值**

如果希望返回一个 `uploadTask` 对象，需要至少传入 success / fail / complete 参数中的一个。例如：

```javascript
var uploadTask = uni.uploadFile({
	url: 'https://www.example.com/upload', //仅为示例，并非真实接口地址。
	complete: ()=> {}
});
uploadTask.abort();
```

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](/api/README?id=promise-%E5%B0%81%E8%A3%85)

通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。

**uploadTask 对象的方法列表**

|方法|参数|说明|
|:-|:-|:-|
|abort||中断上传任务|
|onProgressUpdate|callback|监听上传进度变化|
|onHeadersReceived|callback|监听 HTTP Response Header 事件。会比请求完成事件更早,仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.onHeadersReceived.html)|    
|offProgressUpdate|callback|取消监听上传进度变化事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.offProgressUpdate.html)|
|offHeadersReceived|callback|取消监听 HTTP Response Header 事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.offHeadersReceived.html)|

**onProgressUpdate 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|progress|Number|上传进度百分比|
|totalBytesSent|Number|已经上传的数据长度，单位 Bytes|
|totalBytesExpectedToSend|Number|预期需要上传的数据总长度，单位 Bytes|

**示例**

```javascript
uni.chooseImage({
	success: (chooseImageRes) => {
		const tempFilePaths = chooseImageRes.tempFilePaths;
		const uploadTask = uni.uploadFile({
			url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
			filePath: tempFilePaths[0],
			name: 'file',
			formData: {
				'user': 'test'
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
			}
		});

		uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

			// 测试条件，取消上传任务。
			if (res.progress > 50) {
				uploadTask.abort();
			}
		});
	}
});
```

### uni.downloadFile(OBJECT)
下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。

> 在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|url|String|是|下载资源的 url|
|header|Object|否|HTTP 请求 Header, header 中不能设置 Referer。|
|success|Function|否|下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**注：文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile](/api/file/file?id=savefile)，才能在应用下次启动时访问得到。**

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|tempFilePath|String|临时文件路径，下载后的文件会存储到一个临时文件|
|statusCode|Number|开发者服务器返回的 HTTP 状态码|

**注意**
- 网络请求的 ``超时时间`` 可以统一在 ``manifest.json`` 中配置 [networkTimeout](/collocation/manifest?id=networktimeout)。

**示例**

```javascript
uni.downloadFile({
	url: 'https://www.example.com/file/test', //仅为示例，并非真实的资源
	success: (res) => {
		if (res.statusCode === 200) {
			console.log('下载成功');
		}
	}
});
```

**返回值**

如果希望返回一个 `downloadTask` 对象，需要至少传入 success / fail / complete 参数中的一个。例如：

```javascript
var downloadTask = uni.downloadFile({
	url: 'https://www.example.com/file/test', //仅为示例，并非真实接口地址。
	complete: ()=> {}
});
downloadTask.abort();
```

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](/api/README?id=promise-%E5%B0%81%E8%A3%85)

通过 `downloadTask`，可监听下载进度变化事件，以及取消下载任务。

**downloadTask 对象的方法列表**

|方法|参数|说明|最低版本|
|:-|:-|:-|:-|
|abort||中断下载任务|*|
|onProgressUpdate|callback|监听下载进度变化|*|
|onHeadersReceived|callback|监听 HTTP Response Header 事件，会比请求完成事件更早,仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.onHeadersReceived.html)|    
|offProgressUpdate|callback|取消监听下载进度变化事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.offProgressUpdate.html)|
|offHeadersReceived|callback|取消监听 HTTP Response Header 事件，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/DownloadTask.offHeadersReceived.html)|

**onProgressUpdate 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|progress|Number|下载进度百分比|
|totalBytesWritten|Number|已经下载的数据长度，单位 Bytes|
|totalBytesExpectedToWrite|Number|预期需要下载的数据总长度，单位 Bytes|

**示例**

```javascript
const downloadTask = uni.downloadFile({
	url: 'http://www.example.com/file/test', //仅为示例，并非真实的资源
	success: (res) => {
		if (res.statusCode === 200) {
			console.log('下载成功');
		}
	}
});

downloadTask.onProgressUpdate((res) => {
	console.log('下载进度' + res.progress);
	console.log('已经下载的数据长度' + res.totalBytesWritten);
	console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);

	// 测试条件，取消下载任务。
	if (res.progress > 50) {
		downloadTask.abort();
	}
});
```