开发者使用`uniCloud`的云存储，无需再像传统模式那样单独去购买存储空间、CDN映射、流量采购等；`uniCloud`云存储支持文本、图片和其他由用户生成的内容存储到云端，并提供CDN下载地址，

开发者可在客户端使用云存储API，文件上传成功后，系统会自动生成一个资源链接，开发者需保存该文件地址供后续业务下载使用。

即将支持云函数中使用云存储功能。

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

<!-- |cloudPath				|String		|是		|-			|文件的绝对路径，包含文件名	|仅腾讯云侧支持	| -->
<!-- |onUploadProgress	|Function	|否		|-			|上传进度回调								|仅腾讯云侧支持	| -->

<!-- **注意**

- `cloudPath` 为文件的绝对路径，包含文件名 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、\_、.、、\*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构。[查看详情](https://cloud.tencent.com/document/product/436/13324) -->

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
			});

			// callback
			uniCloud.uploadFile({
				filePath: filePath
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

<!-- ## getTempFileURL(Object getTempFileURLOptions)

获取文件临时下载链接，**仅腾讯云支持**

#### 请求参数

|字段		|类型						|必填	|默认值	|说明								|平台差异说明	|
|:-:		|:-:						|:-:	|:-:	|:-:								|:-:			|
|fileList	|&lt;Array&gt;.String,Object|是		|-		|要获取下载链接的文件 ID 组成的数组	|仅腾讯云支持	|

**fileList**

|字段	|类型	|必填	|说明					|
|:-:	|:-:	|:-:	|:-:					|
|fileID	|String	|是		|文件 ID				|
|maxAge	|Number	|是		|文件链接有效期，单位：秒	|

#### 响应参数

|字段		|类型					|说明							|
|:-:		|:-:					|:-:							|
|code		|String					|状态码，操作成功则为 SUCCESS	|
|message	|String					|错误描述						|
|fileList	|&lt;Array&gt;.Object	|存储下载链接的数组				|
|requestId	|String					|请求序列号，用于错误排查		|

**fileList**

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
 -->
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
