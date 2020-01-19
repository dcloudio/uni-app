## uniCloud.uploadFile(Object uploadFileOptions)

上传文件至云开发存储服务。**目前仅腾讯云支持此接口**

**uploadFileOptions参数说明**

| 字段				| 类型					| 必填| 说明																																															|
| ---					| ---						| ---	| ---																																																|
| cloudPath		| string				| 是	| 文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等。																|
| fileContent	| fs.ReadStream	| 是	| buffer或要上传的文件 [可读流](https://nodejs.org/api/stream.html#stream_class_stream_readable) 。	|

**响应参数**

| 字段			| 类型	| 必填| 说明																			|
| ---				| ---		| ---	| ---																				|
| code			| string| 否	| 状态码，操作成功则不返回。								|
| message		| string| 否	| 错误描述。																|
| fileID		| fileID| 是	| 文件唯一 ID，用来访问文件，建议存储起来。	|
| requestId	| string| 否	| 请求序列号，用于错误排查。								|

**示例代码**

```javascript
const fs = require("fs");

let result = await uniCloud.uploadFile({
    cloudPath: "test-admin.jpeg",
    fileContent: fs.createReadStream(`${__dirname}/cos.jpeg`)
});
```

## uniCloud.getTempFileURL(Object getTempFileURLOptions)

获取文件下载链接，**目前仅腾讯云支持**

**getTempFileURLOptions参数说明**

| 字段		| 类型								| 必填| 说明												|
| ---			| ---									| ---	| ---													|
| fileList| &lt;Array&gt;.string| 是	| 要下载的文件 ID 组成的数组。|

**fileList字段**

| 字段	| 类型		| 必填| 说明						|
| ---		| ---			| ---	| ---							|
| fileID| string	| 是	| 文件 ID。				|
| maxAge| Integer	| 是	| 文件链接有效期。|

**响应参数**

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

**示例代码**

```javascript
let result = await uniCloud.getTempFileURL({
    fileList: ['cloud://test-28farb/a.png']
});
```

## uniCloud.deleteFile(Object deleteFileOptions)

删除云端文件。

**deleteFileOptions参数说明**

| 字段		| 类型								| 必填| 说明												|
| ---			| ---									| ---	| ---													|
| fileList| &lt;Array&gt;.string| 是	| 要删除的文件 ID 组成的数组。|

**响应参数**

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

**示例代码**

```javascript
let result = await uniCloud.deleteFile({
    fileList: [
        "cloud://test-28farb/a.png"
    ]
});
```

## uniCloud.downloadFile(Object downloadFileOptions)

下载已上传至云开发的文件至本地（默认本地根目录/root）。

**downloadFileOptions参数说明**

| 字段				| 类型	| 必填| 说明										|
| ---					| ---		| ---	| ---											|
| fileID			| string| 是	| 要下载的文件的 ID。			|
| tempFilePath| string| 否	| 下载的文件要存储的位置。|

**响应参数**

| 字段				| 类型	| 必填| 说明																										|
| ---					| ---		| ---	| ---																											|
| code				| string| 否	| 状态码，操作成功则不返回。															|
| message			| string| 否	| 错误描述。																							|
| fileContent	| Buffer| 否	| 下载的文件的内容。如果传入 tempFilePath 则不返回该字段。|
| requestId		| string| 否	| 请求序列号，用于错误排查。															|

**示例代码**

```javascript
let result = await uniCloud.downloadFile({
    fileID: "cloud://aa-99j9f/my-photo.png",
    // tempFilePath: '/tmp/test/storage/my-photo.png'
});
```