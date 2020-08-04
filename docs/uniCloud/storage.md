开发者使用`uniCloud`的云存储，无需再像传统模式那样单独去购买存储空间、CDN映射、流量采购等；

`uniCloud`的云存储和cdn，免费提供给开发者使用！

云存储的上传方式有3种：
1. web界面：即在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/) web控制台，点击云存储，通过web界面进行文件上传。该管理界面同时提供了资源浏览、删除等操作界面。
2. 客户端API上传：即在前端js中编写`uniCloud.uploadFile`
3. 云函数上传文件到云存储：即在云函数js中编写`uniCloud.uploadFile`

**注意：**
- 前端和云函数端，均有一个相同名称的api：`uniCloud.uploadFile`。请不要混淆。
- 前端还有一个`uni.uploadFile`的API，那个API用于连接非uniCloud的上传使用。请不要混淆。

文件上传成功后，系统会自动生成一个https链接或临时文件id，开发者应保存该文件地址供后续业务下载使用。

# 客户端API

在uni-app前端进行云存储的操作（不是在云函数里操作），包括在前端上传、删除文件。

## uploadFile(Object object)

直接上传文件到云存储。

客户端上传文件到云函数、云函数再上传文件到云存储，这样的过程会导致文件流量带宽耗费较大。所以一般上传文件都是客户端直传。

**阿里云单文件大小限制为100M，腾讯云单文件最大为5G**

**支付宝小程序开发工具上传文件到腾讯云时可能会返回失败，请以真机为准**

**各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。[参考](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e4%b8%ad%e4%bd%bf%e7%94%a8unicloud%e7%9a%84%e7%99%bd%e5%90%8d%e5%8d%95%e9%85%8d%e7%bd%ae)**

阿里云uploadFile API方式只允许上传以下文件类型（后续可能会调整），如果要上传其他类型可以通过web控制台上传。腾讯云没有文件类型限制。

```js
{
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  mp3: 'audio/mp3',
  mp4: 'video/mp4',
  ogg: 'audio/ogg',
  webm: 'video/webm'
}
```

#### 请求参数
**Object object**

|参数名						|类型			|必填	|默认值	|说明																														|平台差异说明							|
|:-:							|:-:			|:-:	|:-:		|:-:																														|:-:											|
|filePath					|String		|是		|-			|要上传的文件对象																								|-												|
|cloudPath				|String		|是		|-			|文件的绝对路径，包含文件名																			|-	|
|fileType					|String		|-		|-			|文件类型，支付宝小程序、钉钉小程序必填，可选image、video、audio|-												|
|onUploadProgress	|Function	|否		|-			|上传进度回调																										|-												|

**注意**

- 使用阿里云时，`cloudPath`为云端文件名，请勿使用非法字符
- 腾讯云`cloudPath` 为文件的绝对路径，包含文件名 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、\_、.、、\*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构。
- 腾讯云`cloudPath`为文件标识，相同的`cloudPath`会覆盖，如果没有权限覆盖则会上传失败。阿里云以自动生成的ID为文件标识，不会存在覆盖问题

#### 响应参数

|字段		|类型	|说明														|
|:-:		|:-:	|:-:														|
|fileID		|String	|文件唯一 ID，用来访问文件，建议存储起来	|
|requestId	|String	|请求序列号，用于错误排查									|

#### 示例代码

<!-- 
cloudPath: 'test-admin.jpeg',
filePath: filePath,
onUploadProgress: function(progressEvent) {
  console.log(progressEvent);
  var percentCompleted = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
}
 -->

```javascript
//前端代码
uni.chooseImage({
	count: 1,
	success(res) {
		console.log(res);
		if (res.tempFilePaths.length > 0) {
			let filePath = res.tempFilePaths[0]
			//进行上传操作

			// promise方式
			const result = await uniCloud.uploadFile({
				filePath: filePath,
        cloudPath: 'a.jpg',
				onUploadProgress: function(progressEvent) {
			          console.log(progressEvent);
			          var percentCompleted = Math.round(
			            (progressEvent.loaded * 100) / progressEvent.total
			          );
			        }
			});

			// callback方式，与promise方式二选一即可
			uniCloud.uploadFile({
				filePath: filePath,
        cloudPath: 'a.jpg',
        onUploadProgress: function(progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
				},
				success() {},
				fail() {},
				complete() {}
			});
			
		}
	}
});

```

**Tips**

- 阿里云返回的fileID为链接形式可以直接使用，腾讯云返回的为cloud://形式，如需展示需要调用getTempFileURL获取链接

## getTempFileURL(Object object)

腾讯云获取文件临时下载链接。

**平台兼容性**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#### 请求参数

|字段		|类型						|必填	|默认值	|说明								|平台差异说明	|
|:-:		|:-:						|:-:	|:-:	|:-:								|:-:			|
|fileList	|&lt;Array&gt;.String,Object|是		|-		|要获取下载链接的文件 ID 组成的数组	|仅腾讯云支持	|

**请求参数中的fileList**

|字段	|类型	|必填	|说明					|
|:-:	|:-:	|:-:	|:-:					|
|fileID	|String	|是		|文件 ID				|
<!-- |maxAge	|Number	|是		|文件链接有效期，单位：秒	| -->

<!-- **注意**

- `maxAge`在配置所有人可读权限时不生效 -->

#### 响应参数

|字段		|类型					|说明							|
|:-:		|:-:					|:-:							|
|fileList	|&lt;Array&gt;.Object	|存储下载链接的数组				|
|requestId	|String					|请求序列号，用于错误排查		|

**响应参数中的fileList**

|字段		|类型	|说明			|
|:-:		|:-:	|:-:			|
|fileID		|String	|文件 ID		|
|tempFileURL|String	|文件访问链接	|

#### 示例代码

```javascript
// 客户端获取临时文件示例源码
// promise方式
uniCloud.getTempFileURL({
		fileList: ['cloud://test-28farb/a.png']
	})
	.then(res => {});

// callback方式，与promise方式二选一即可
uniCloud.getTempFileURL({
	fileList: ['cloud://test-28farb/a.png'],
	success() {},
	fail() {},
	complete() {}
});
```

## deleteFile(Object object)

客户端删除云存储文件。

不建议使用此API。删除云存储文件是一个高危操作，应该由云函数进行权限校验后由云函数来删除云存储的文件。
- 阿里云不支持此API，前端运行此API会报权限错误
- 腾讯云支持此API，如若使用，需搭配腾讯云提供的自定义登录和权限设置使用

#### 请求参数

**Object object**

|字段		|类型					|必填	|说明						|
|:-:		|:-:					|----	|:-:						|
|fileList	|&lt;Array&gt;.String	|是		|要删除的文件 ID 组成的数组，**阿里云只支持一次删除一个文件**|

#### 响应参数

|字段		|类型					|必填	|说明						|
|:-:		|:-:					|:-:	|:-:						|
|fileList	|&lt;Array&gt;.Object	|否		|删除结果组成的数组			|
|requestId	|String					|否		|请求序列号，用于错误排查	|

**fileList定义**

|字段	|类型	|必填	|说明						|
|:-:	|:-:	|:-:	|:-:						|
|fileID	|String	|是		|文件 ID					|

#### 示例代码

```javascript
// 客户端删除云文件示例源码
// promise
uniCloud
  .deleteFile({
    fileList: ['cloud://jimmytest-088bef/1534576354877.jpg']
  })
  .then(res => {});

// callback
uniCloud.deleteFile(
  {
    fileList: ['cloud://jimmytest-088bef/1534576354877.jpg'],
	success(){},
	fail(){},
	complete(){}
  }
);
```

# 云函数API

在云函数中操作云存储文件（不是在前端），包括在云函数里上传、删除云存储文件。

## uniCloud.uploadFile(Object uploadFileOptions)

**云函数**内上传文件至云存储。

如果是从客户端上传文件，一般不建议先把文件从客户端上传到云函数，再由云函数上传到云存储，而是建议客户端直传云存储。详见：[https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile](https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile)

**平台兼容性**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

如使用阿里云，请在客户端通过上传api进行上传，详见：[https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile](https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile)

#### 请求参数
**uploadFileOptions参数说明**

| 字段				| 类型					| 必填| 说明																																															|
| ---					| ---						| ---	| ---																																																|
| cloudPath		| string				| 是	| 文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等。																|
| fileContent	| fs.ReadStream	| 是	| buffer或要上传的文件 [可读流](https://nodejs.org/api/stream.html#stream_class_stream_readable) 。	|

#### 响应参数

| 字段			| 类型	| 必填| 说明																			|
| ---				| ---		| ---	| ---																				|
| fileID		| fileID| 是	| 文件唯一 ID，用来访问文件，建议存储起来。	|
| requestId	| string| 否	| 请求序列号，用于错误排查。								|

#### 示例代码

```javascript
// 云函数上传文件示例代码
const fs = require("fs");

let result = await uniCloud.uploadFile({
    cloudPath: "test-admin.jpeg",
    fileContent: fs.createReadStream(`${__dirname}/cos.jpeg`)
});
```

## uniCloud.getTempFileURL(Object getTempFileURLOptions)

**云函数**获取文件下载链接。

**平台兼容性**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#### 请求参数

**getTempFileURLOptions参数说明**

| 字段		| 类型								| 必填| 说明												|
| ---			| ---									| ---	| ---													|
| fileList| &lt;Array&gt;.string| 是	| 要下载的文件 ID 组成的数组。|

**fileList字段**

| 字段	| 类型		| 必填| 说明						|
| ---		| ---			| ---	| ---							|
| fileID| string	| 是	| 文件 ID。				|
<!-- | maxAge| Integer	| 是	| 文件链接有效期。| -->

#### 响应参数

| 字段			| 类型								| 必填| 说明													|
| ---				| ---									| ---	| ---														|
| fileList	| &lt;Array&gt;.object| 否	| 存储下载链接的数组。					|
| requestId	| string							| 否	| 请求序列号，用于错误排查。		|

**fileList字段**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| fileID			| string| 是	| 文件 ID。									|
| tempFileURL	| string| 是	| 文件访问链接。						|

#### 示例代码

```javascript
let result = await uniCloud.getTempFileURL({
    fileList: ['cloud://test-28farb/a.png']
});
```

## uniCloud.deleteFile(Object deleteFileOptions)

**云函数**删除云存储文件。

删除云存储文件是高危操作，不建议在客户端操作，而建议在云函数中操作。

#### 请求参数

**deleteFileOptions参数说明**

| 字段		| 类型								| 必填| 说明												|
| ---			| ---									| ---	| ---													|
| fileList| &lt;Array&gt;.string| 是	| 要删除的文件 ID 组成的数组。|

#### 响应参数

| 字段			| 类型								| 必填| 说明											|
| ---				| ---									| ---	| ---												|
| fileList	| &lt;Array&gt;.object| 否	| 删除结果组成的数组。			|
| requestId	| string							| 否	| 请求序列号，用于错误排查。|

**fileList字段**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| fileID | string | 是 | 文件 ID。 |

#### 示例代码

```javascript
// 云函数删除文件示例代码
let result = await uniCloud.deleteFile({
    fileList: [
        "cloud://test-28farb/a.png"
    ]
});
```

## uniCloud.downloadFile(Object downloadFileOptions)

**云函数**下载已上传至云开发的文件至本地（默认本地根目录/root）。

**平台兼容性**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#### 请求参数

**downloadFileOptions参数说明**

| 字段				| 类型	| 必填| 说明										|
| ---					| ---		| ---	| ---											|
| fileID			| string| 是	| 要下载的文件的 ID。			|
| tempFilePath| string| 否	| 下载的文件要存储的位置。|

#### 响应参数

| 字段				| 类型	| 必填| 说明																										|
| ---					| ---		| ---	| ---																											|
| fileContent	| Buffer| 否	| 下载的文件的内容。如果传入 tempFilePath 则不返回该字段。|
| requestId		| string| 否	| 请求序列号，用于错误排查。															|

#### 示例代码

```javascript
let result = await uniCloud.downloadFile({
    fileID: "cloud://aa-99j9f/my-photo.png",
    // tempFilePath: '/tmp/test/storage/my-photo.png'
});
```

# 数据处理

**仅阿里云支持**

使用阿里云作为服务商时，云存储支持直接使用**restful api**对资源进行处理，下表列出支持的操作类型。

|功能			|操作参数	|参考文档																													|
|:-:			|:-:		|:-:																														|
|图片缩放		|resize		|[点击查看](https://help.aliyun.com/document_detail/44688.html?spm=a2c4g.11186623.2.10.274651b0YkQ5hE#concept-hxj-c4n-vdb)	|
|图片裁剪		|crop		|[点击查看](https://help.aliyun.com/document_detail/44693.html?spm=a2c4g.11186623.2.11.274651b0YkQ5hE#concept-bbn-14s-vdb)	|
|图片旋转		|rotate		|[点击查看](https://help.aliyun.com/document_detail/44690.html?spm=a2c4g.11186623.2.12.274651b0YkQ5hE#concept-yvv-25t-vdb)	|
|图片锐化调节		|sharpen	|[点击查看](https://help.aliyun.com/document_detail/44700.html?spm=a2c4g.11186623.2.13.274651b0YkQ5hE#concept-cyw-zzt-vdb)	|
|图片格式转换		|format		|[点击查看](https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.2.14.274651b0YkQ5hE#concept-mf3-md5-vdb)	|
|图片质量调节		|quality	|[点击查看](https://help.aliyun.com/document_detail/44705.html?spm=a2c4g.11186623.2.15.274651b0YkQ5hE#concept-exc-qp5-vdb)	|
|图片水印		|watermark	|[点击查看](https://help.aliyun.com/document_detail/44957.html?spm=a2c4g.11186623.2.16.274651b0YkQ5hE#concept-hrt-sv5-vdb)	|
|视频截帧		|snapshot	|[点击查看](https://help.aliyun.com/document_detail/64555.html?spm=a2c4g.11186623.2.17.274651b0YkQ5hE#concept-kz1-cwc-wdb)	|

**Tips**

阿里云的云存储暂不支持分目录。阿里云的前端网页托管支持分目录。
