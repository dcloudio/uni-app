开发者使用`uniCloud`的云存储，无需再像传统模式那样单独去购买存储空间、CDN映射、流量采购等；`uniCloud`云存储支持文本、图片和其他由用户生成的内容存储到云端，并提供CDN下载地址，

开发者可在客户端使用云存储API，文件上传成功后，系统会自动生成一个资源链接，开发者需保存该文件地址供后续业务下载使用。

即将支持云函数中使用云存储功能。

# 客户端API

## uploadFile(Object object)

上传文件到云存储，**阿里云单文件大小限制为100M，腾讯云单文件最大为5G**

**阿里云支持的文件类型**

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

|参数名						|类型			|必填	|默认值	|说明												|平台差异说明		|
|:-:							|:-:			|:-:	|:-:		|:-:												|:-:						|
|filePath					|String		|是		|-			|要上传的文件对象						|-							|
|cloudPath				|String		|-		|-			|文件的绝对路径，包含文件名	|阿里云非必填，腾讯云必填	|
|onUploadProgress	|Function	|否		|-			|上传进度回调								|-	|

**注意**

- 使用阿里云时，`cloudPath`为云端文件名，请勿使用非法字符
- 腾讯云`cloudPath` 为文件的绝对路径，包含文件名 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、\_、.、、\*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构。
- 腾讯云`cloudPath`为文件标识，相同的`cloudPath`会覆盖，如果没有权限覆盖则会上传失败

#### 响应参数

|字段		|类型	|说明														|
|:-:		|:-:	|:-:														|
|code		|String	|状态码，操作成功则不返回									|
|message	|String	|错误描述													|
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
uni.chooseImage({
	count: 1,
	success(res) {
		console.log(res);
		if (res.tempFilePaths.length > 0) {
			let filePath = res.tempFilePaths[0]
			//进行上传操作

			// promise
			const result = await uniCloud.uploadFile({
				filePath: filePath
				onUploadProgress: function(progressEvent) {
			          console.log(progressEvent);
			          var percentCompleted = Math.round(
			            (progressEvent.loaded * 100) / progressEvent.total
			          );
			        }
			});

			// callback
			uniCloud.uploadFile({
				filePath: filePath
				},
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

- 阿里云返回的fileID为链接形式

## getTempFileURL(Object object)

获取文件临时下载链接。

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
|maxAge	|Number	|是		|文件链接有效期，单位：秒	|

**注意**

- `maxAge`在配置所有人可读权限时不生效

#### 响应参数

|字段		|类型					|说明							|
|:-:		|:-:					|:-:							|
|code		|String					|状态码，操作成功则为 SUCCESS	|
|message	|String					|错误描述						|
|fileList	|&lt;Array&gt;.Object	|存储下载链接的数组				|
|requestId	|String					|请求序列号，用于错误排查		|

**响应参数中的fileList**

|字段		|类型	|说明			|
|:-:		|:-:	|:-:			|
|fileID		|String	|文件 ID		|
|tempFileURL|String	|文件访问链接	|

#### 示例代码

```javascript
// promise
uniCloud.getTempFileURL({
		fileList: ['cloud://test-28farb/a.png']
	})
	.then(res => {});

// callback
uniCloud.getTempFileURL({
	fileList: ['cloud://test-28farb/a.png'],
	success() {},
	fail() {},
	complete() {}
});
```

## deleteFile(Object object)

删除云端文件

#### 请求参数

**Object object**

|字段		|类型					|必填	|说明						|
|:-:		|:-:					|----	|:-:						|
|fileList	|&lt;Array&gt;.String	|是		|要删除的文件 ID 组成的数组，**阿里云只支持一次删除一个文件**|

#### 响应参数

|字段		|类型					|必填	|说明						|
|:-:		|:-:					|:-:	|:-:						|
|code		|String					|否		|状态码，操作成功则不返回	|
|message	|String					|否		|错误描述					|
|fileList	|&lt;Array&gt;.Object	|否		|删除结果组成的数组			|
|requestId	|String					|否		|请求序列号，用于错误排查	|

**fileList定义**

|字段	|类型	|必填	|说明						|
|:-:	|:-:	|:-:	|:-:						|
|code	|String	|否		|删除结果，成功为 SUCCESS	|
|fileID	|String	|是		|文件 ID					|

#### 示例代码

```javascript
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

<!-- ### 下载文件

downloadFile(Object)

请求参数

| 字段 | 类型 | 必填 | 说明
| :-: | :-: | :-: | :-: |
| fileID | String | 是 | 要下载的文件的id
| tempFilePath | String | 否 | 下载的文件要存储的位置

响应参数

| 字段 | 类型 | 必填 | 说明
| :-: | :-: | :-: | :-: |
| code | String | 否 | 状态码，操作成功则不返回
| message | String | 否 | 错误描述
| fileContent | Buffer | 否 | 下载的文件的内容。如果传入tempFilePath则不返回该字段
| requestId | String | 否 | 请求序列号，用于错误排查

示例代码

```javascript
let result = await tcb.downloadFile({
    fileID: "cloud://aa-99j9f/my-photo.png",
    // tempFilePath: '/tmp/test/storage/my-photo.png',
	success(){},
	fail(){},
	complete(){}
});
``` -->
# 云函数API

## uniCloud.uploadFile(Object uploadFileOptions)

**云函数**内上传文件至云开发存储服务。

**平台兼容性**

客户端上传文件没有此兼容性差异

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#### 请求参数
**uploadFileOptions参数说明**

| 字段				| 类型					| 必填| 说明																																															|
| ---					| ---						| ---	| ---																																																|
| cloudPath		| string				| 是	| 文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等。																|
| fileContent	| fs.ReadStream	| 是	| buffer或要上传的文件 [可读流](https://nodejs.org/api/stream.html#stream_class_stream_readable) 。	|

#### 响应参数

| 字段			| 类型	| 必填| 说明																			|
| ---				| ---		| ---	| ---																				|
| code			| string| 否	| 状态码，操作成功则不返回。								|
| message		| string| 否	| 错误描述。																|
| fileID		| fileID| 是	| 文件唯一 ID，用来访问文件，建议存储起来。	|
| requestId	| string| 否	| 请求序列号，用于错误排查。								|

#### 示例代码

```javascript
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
| maxAge| Integer	| 是	| 文件链接有效期。|

#### 响应参数

| 字段			| 类型								| 必填| 说明													|
| ---				| ---									| ---	| ---														|
| code			| string							| 否	| 状态码，操作成功则为 SUCCESS。|
| message		| string							| 否	| 错误描述。										|
| fileList	| &lt;Array&gt;.object| 否	| 存储下载链接的数组。					|
| requestId	| string							| 否	| 请求序列号，用于错误排查。		|

**fileList字段**

| 字段				| 类型	| 必填| 说明											|
| ---					| ---		| ---	| ---												|
| code				| string| 否	| 删除结果，成功为 SUCCESS。|
| fileID			| string| 是	| 文件 ID。									|
| tempFileURL	| string| 是	| 文件访问链接。						|

#### 示例代码

```javascript
let result = await uniCloud.getTempFileURL({
    fileList: ['cloud://test-28farb/a.png']
});
```

## uniCloud.deleteFile(Object deleteFileOptions)

**云函数**删除云端文件。

#### 请求参数

**deleteFileOptions参数说明**

| 字段		| 类型								| 必填| 说明												|
| ---			| ---									| ---	| ---													|
| fileList| &lt;Array&gt;.string| 是	| 要删除的文件 ID 组成的数组。|

#### 响应参数

| 字段			| 类型								| 必填| 说明											|
| ---				| ---									| ---	| ---												|
| code			| string							| 否	| 状态码，操作成功则不返回。|
| message		| string							| 否	| 错误描述									|
| fileList	| &lt;Array&gt;.object| 否	| 删除结果组成的数组。			|
| requestId	| string							| 否	| 请求序列号，用于错误排查。|

**fileList字段**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| code | string | 否 | 删除结果，成功为SUCCESS。 |
| fileID | string | 是 | 文件 ID。 |

#### 示例代码

```javascript
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
| code				| string| 否	| 状态码，操作成功则不返回。															|
| message			| string| 否	| 错误描述。																							|
| fileContent	| Buffer| 否	| 下载的文件的内容。如果传入 tempFilePath 则不返回该字段。|
| requestId		| string| 否	| 请求序列号，用于错误排查。															|

#### 示例代码

```javascript
let result = await uniCloud.downloadFile({
    fileID: "cloud://aa-99j9f/my-photo.png",
    // tempFilePath: '/tmp/test/storage/my-photo.png'
});
```
