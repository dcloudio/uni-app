开发者使用`uniCloud`的云存储，无需再像传统模式那样单独去购买存储空间、CDN映射、流量采购等；

并且`uniCloud`的阿里云云存储和cdn，免费提供给开发者使用！

如果您还未开通过uniCloud，请在web界面开通：[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)

云存储的上传方式有3种：
1. web界面：即在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/) web控制台，点击云存储，通过web界面进行文件上传。该管理界面同时提供了资源浏览、删除等操作界面。
2. 客户端API或组件上传：在前端js中编写`uniCloud.uploadFile`，或者使用uni ui的[FilePicker组件](https://ext.dcloud.net.cn/plugin?id=4079)，文件选择+上传均封装完毕。
3. 云函数上传文件到云存储：即在云函数js中编写`uniCloud.uploadFile`

**注意：**
- 前端和云函数端，均有一个相同名称的api：`uniCloud.uploadFile`。请不要混淆。
- 前端还有一个`uni.uploadFile`的API，那个API用于连接非uniCloud的上传使用。请不要混淆。

文件上传成功后，系统会自动生成一个https链接或临时文件id，开发者应保存该文件地址供后续业务下载使用。

在使用腾讯云时如果访问云存储文件提示`The requested URL '/1123.jpg' was not found on this server`这种错误，一般是cdn流量用尽导致的。可以升级配置或转为按量计费（目前仅支持企业类型认证的账号可以使用按量计费的服务空间）。

在允许用户上传图片的应用里，违规检测是必不可少的，为此uniCloud提供了内容安全检测模块，可以很方便的实现图片鉴黄等功能。详情参考：[内容安全](https://ext.dcloud.net.cn/plugin?id=5460)

## 客户端API

在uni-app前端进行云存储的操作（不是在云函数里操作），包括在前端上传、删除文件。

### uploadFile(Object object)@uploadfile

直接上传文件到云存储。

客户端上传文件到云函数、云函数再上传文件到云存储，这样的过程会导致文件流量带宽耗费较大。所以一般上传文件都是客户端直传。

**阿里云单文件大小限制为100M，腾讯云单文件最大为5G**

**支付宝小程序开发工具上传文件到腾讯云时可能会返回失败，请以真机为准**

**各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。[参考](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e4%b8%ad%e4%bd%bf%e7%94%a8unicloud%e7%9a%84%e7%99%bd%e5%90%8d%e5%8d%95%e9%85%8d%e7%bd%ae)**

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
- 阿里云目前由于安全原因暂时禁止云存储内上传html文件

**关于腾讯云是否有权限覆盖/删除云端文件**

腾讯云使用[自定义登录](uniCloud/authentication.md)的方式确定用户身份。以下以默认权限”所有用户可读，仅创建者及管理员可写“为例进行讲解

默认情况下用户以匿名身份登录（为了方便暂时称此身份为“匿名用户A”）

  - 云端路径不存在则可以成功上传。
  - 云端路径存在并且是匿名用户A创建的可以成功上传
  - 云端路径存在并且并非匿名用户A创建的会上传失败

匿名用户A身份过期之后再次获取的身份并不是”匿名用户A“（暂记为”匿名用户B“），这时匿名用户B是没有权限覆盖匿名用户A上传的文件的。

如果使用了[自定义登录](uniCloud/authentication.md)，那么云存储就可以确定用户身份，这时候用户可以覆盖自己上传的文件，删除同理。

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
- uniCloud.uploadFile 只有上传，没有文件选择。uni ui的封装了[FilePicker组件](https://ext.dcloud.net.cn/plugin?id=4079)，从选择到上传一条龙。

### getTempFileURL(Object object)

**平台兼容性**

|阿里云						|腾讯云	|
|----							|----		|
|HBuilderX 3.1.0+	|√			|

腾讯云获取文件临时下载链接。自HBuilderX 3.1.0起阿里云也支持此接口，仅为抹平和腾讯云的接口差异

#### 请求参数

|字段		|类型						|必填	|默认值	|说明								|平台差异说明	|
|:-:		|:-:						|:-:	|:-:	|:-:								|:-:			|
|fileList	|&lt;Array&gt;.String,Object|是		|-		|要获取下载链接的文件 ID 组成的数组	|仅腾讯云支持	|

**请求参数中的fileList**

|字段	|类型	|必填	|说明					|
|:-:	|:-:	|:-:	|:-:					|
|fileID	|String	|是		|文件 ID				|

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

// callback方式，与promise方式二选一
uniCloud.getTempFileURL({
	fileList: ['cloud://test-28farb/a.png'],
	success() {},
	fail() {},
	complete() {}
});
```

### chooseAndUploadFile(Object object)@chooseanduploadfile

> HBuilderX 3.1.0起支持

通过ui界面选择文件（图片/视频）并直接上传到云存储。

同时提供了选择回调事件，方便对选择后的图片进行压缩等二次处理，然后再上传。

#### 客户端平台兼容性

此接口根据type不同接收兼容性也略有差异

**选择图片，type:'image'**

|App|H5	|微信小程序	|支付宝小程序	  |百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:|:-:				|:-:					|:-:				|:-:				|:-:			|
|√	|√	|√					|√						|√					|√					|√				|

**选择视频，type:'video'**

|App|H5	|微信小程序	|支付宝小程序	  |百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:|:-:				|:-:					|:-:				|:-:				|:-:			|
|√	|√	|√					|√						|√					|√					|√				|

**选择任意文件，type:'all'**

|App|H5	|微信小程序								|支付宝小程序	|百度小程序	|字节小程序	|QQ小程序	|
|:-:|:-:|:-:											|:-:					|:-:				|:-:				|:-:			|
|×	|√	|√（仅支持选择聊天文件）	|×						|×					|×					|×				|

#### 请求参数

此接口根据type不同接收不同参数

**选择图片，type:'image'**

|字段				|类型		|必填	|说明																															|
|:-:				|:-:		|----	|:-:																															|
|type				|String	|是		|文件类型，image（图片）、video（视频）、all（任意文件）					|
|count			|Number	|否		|文件数量，默认9																													|
|extension	|Array	|否		|文件后缀																													|
|sizeType		|Array	|否		|original 原图，compressed 压缩图，默认二者都有，type为image时生效|
|sourceType	|Array	|否		|album 从相册选图，camera 使用相机，默认二者都有									|

**选择视频，type:'video'**

|字段				|类型		|必填	|说明																										|
|:-:				|:-:		|----	|:-:																										|
|type				|String	|是		|文件类型，image（图片）、video（视频）、all（任意文件）|
|extension	|Array	|否		|文件后缀																								|
|camera			|String	|否		|摄像切换，front（前置摄像头）、back（后置摄像头）			|
|compressed	|Boolean|否		|是否压缩所选的视频源文件，默认值为true，需要压缩，type	|
|sourceType	|Array	|否		|album 从相册选图，camera 使用相机，默认二者都有				|

**选择文件，type:all**

|字段			|类型		|必填	|说明																										|
|:-:			|:-:		|----	|:-:																										|
|type			|String	|是		|文件类型，image（图片）、video（视频）、all（任意文件）|
|count		|Number	|否		|文件数量																								|
|extension|Array	|否		|文件后缀																								|

**说明**

- 选择视频时没有count参数，表现为一次仅能选择一个
- count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。

#### 回调方法

**onChooseFile(Object OnChooseFileRes)**

选择图片的回调事件。方便对选择后的图片进行压缩、裁剪等二次处理，然后再上传。

OnChooseFileRes结构如下

```js
{
  errMsg: '',
  tempFilePaths: [], // 临时文件路径数组，chooseVideo/chooseImage/chooseFile接口返回的tempFilePath组成的数组
  tempFiles: [] // 临时文件组成的数组
}
```

如果onChooseFile回调有返回值，此返回值会用来替换实际选择的文件，用以上传。可以在此回调内对文件进行额外的处理，通过在onChooseFile内返回一个promise来阻塞上传，在此期间可以对文件进行额外处理。

例：

```js
function cropImg(file) {
  return new Promise((resolve, reject) => {
    let ext
    let filePathProcessed = file.path // 处理结果
    // #ifdef H5
    ext = file.name.split('.').pop()
    resolve({
      path: filePathProcessed,
      ext,
      fileType: file.fileType
    })
    // #endif
    // #ifndef H5
    uni.getImageInfo({
      src: file.path,
      success(info) {
        ext = info.type.toLowerCase()
        resolve({
          path: filePathProcessed,
          ext,
          fileType: file.fileType
        })
      },
      fail(err) {
        reject(new Error(err.errMsg || '未能获取图片类型'))
      }
    })
    // #endif
  })
}

uniCloud.chooseAndUploadFile({
  type: 'image',
  onChooseFile(res) {
    const processAll = []
    for (let i = 0; i < res.tempFiles.length; i++) {
      processAll.push(cropImg(res.tempFiles[i]))
    }
    return Promise.all(processAll).then((fileList) => {
      let result = {
        tempFilePaths: []
      }
      result.tempFiles = fileList.map((fileItem, index) => {
        result.tempFilePaths.push(fileItem.path)
        return {
          path: fileItem.path,
          cloudPath: '' + Date.now() + index + '.' + fileItem.ext, // 云端路径，这里随便生成了一个
          fileType: fileItem.fileType
        }
      })
      return result
    })
  }
}).then(res => {
  console.log(res)
})
```


**OnUploadProgress(Object OnUploadProgressRes)**

上传进度的回调

OnUploadProgressRes结构如下

```js
{
  index: 0, // 触发此回调的文件序号
  loaded: 256, // 已上传大小
  total: 1024, // 总大小
  tempFilePath: '', // 本地临时文件路径
  tempFile: {} // 本地文件对象
}
```

#### 响应参数

成功回调内的响应参数形式如下

```js
{
  errMsg: '', // 错误信息
  tempFilePaths: [], // 本地临时文件路径组成的数组
  tempFiles: [] // 文件对象数组，每项上都被追加了一个url属性，值为文件上传得到的fileID
}
```

#### 示例

```js
// promise方式
uniCloud.chooseAndUploadFile({
		type: 'image'
	})
	.then(res => {});

// callback方式，与promise方式二选一
uniCloud.chooseAndUploadFile({
	type: 'image',
	success(res) {},
	fail() {},
	complete() {}
});
```

### deleteFile(Object object)

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

## 云函数API

在云函数中操作云存储文件（不是在前端），包括在云函数里上传、删除云存储文件。

### uniCloud.uploadFile(Object uploadFileOptions)@clouduploadfile

**云函数**内上传文件至云存储。

如果是从客户端上传文件，一般不建议先把文件从客户端上传到云函数，再由云函数上传到云存储，而是建议客户端直传云存储。详见：[https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile](https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile)

**平台兼容性**

|阿里云						|腾讯云	|
|----							|----		|
|HBuilderX 3.1.0+	|√			|

HBuilderX 3.1.0之前版本如使用阿里云，请在客户端通过`uniCloud.uploadFile`进行上传

#### 请求参数

**uploadFileOptions参数说明**

| 字段				| 类型	| 必填| 说明																															|
| ---					| ---		| ---	| ---																																|
| cloudPath		| string| 是	| 文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等。|
| fileContent	| -			| 是	| 文件内容，请看下方说明																						|

**说明**

- 腾讯云支持在fileContent内传[可读流](https://nodejs.org/api/stream.html#stream_class_stream_readable) 或buffer
- 阿里云支持在fileContent内传文件绝对路径或buffer

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

### uniCloud.getTempFileURL(Object getTempFileURLOptions)@cloudgettempfileurl

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

### uniCloud.deleteFile(Object deleteFileOptions)@clouddeletefile

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
        "cloud://test-28farb/a.png" // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
    ]
});
```

### uniCloud.downloadFile(Object downloadFileOptions)@clouddownloadfile

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

## 数据处理

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

- 阿里云的云存储暂不支持分目录。阿里云的前端网页托管支持分目录。
- 阿里云的云存储和cdn没有限制。腾讯云的免费版有一定用量限制，[详见](https://uniapp.dcloud.io/uniCloud/faq?id=unicloud%e8%b4%b9%e7%94%a8%e8%b4%b5%e4%b8%8d%e8%b4%b5%ef%bc%9f)
