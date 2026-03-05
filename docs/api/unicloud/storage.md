## uploadFile(options) @uploadfile

上传文件到云存储

### uploadFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [UniCloudUploadFileOptions](#uniclouduploadfileoptions-values) | 是 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | - | 文件路径 |
| cloudPath | string | 是 | - | - | 云端路径 |
| cloudPathAsRealPath | boolean | 否 | - | - | 是否以云端路径是否为真实路径保存上传的文件 | 

### UniCloudUploadFileOptions 的方法 @uniclouduploadfileoptions-values 

### onUploadProgress: (options: UniCloudUploadProgress) => any @onuploadprogress
onUploadProgress
上传进度回调
#### onUploadProgress 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniCloudUploadProgress** | 是 | - | - | 上传进度回调参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| loaded | number | 是 | - | - | 已上传大小 |
| total | number | 是 | - | - | 总大小 | 

#### 返回值 

| 类型 |
| :- |
| any |
 


### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudUploadFileResult**> |

#### Promise\<UniCloudUploadFileResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | - | 文件路径 |
| fileID | string | 是 | - | - | 文件id | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.cloudStorage.uploadFile)

<!-- UTSUNICLOUDAPIJSON.uploadFile.example -->

## chooseAndUploadFile(options) @chooseanduploadfile

选择并上传文件

### chooseAndUploadFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | [UniCloudChooseAndUploadFileOptions](#unicloudchooseanduploadfileoptions-values) | 是 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| sourceType | Array&lt;string&gt; | 否 | - | - |  |
| count | number | 否 | - | - |  |
| sizeType | Array&lt;string&gt; | 否 | - | - |  |
| extension | Array&lt;string&gt; | 否 | - | - |  |
| compressed | boolean | 否 | - | - |  |
| maxDuration | number | 否 | - | - |  |
| camera | string | 否 | - | - | - |
| crop | ChooseImageCropOptions | 否 | - | - |  |
| type | string | 是 | - | - | - |

##### sourceType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| album | - | - |
| camera | - | - |

##### sizeType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| original | - | - |
| compressed | - | - |

##### camera 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| front | - | - |
| back | - | - |

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| image | - | - |
| video | - | - |
| all | - | - | 

### UniCloudChooseAndUploadFileOptions 的方法 @unicloudchooseanduploadfileoptions-values 

### onChooseFile: (arg: UniCloudChooseAndUploadFileResult) => void \| null @onchoosefile
onChooseFile

#### onChooseFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | **UniCloudChooseAndUploadFileResult** | 是 | - | - | - |

#### arg 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFiles | Array&lt;**UniCloudChooseAndUploadFileItem**&gt; | 是 | - | - | - |
| tempFilePaths | Array&lt;string&gt; | 是 | - | - | - | 

##### tempFiles 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | - | - |
| path | string | 是 | - | - | - |
| cloudPath | string | 是 | - | - | - |
| cloudPathAsRealPath | boolean | 否 | - | - |  |
| url | string | 否 | - | - |  |
| errMsg | string | 否 | - | - |  |


### onUploadProgress: (arg: UniCloudChooseAndUploadFileProgressEvent) => void \| null @onuploadprogress
onUploadProgress

#### onUploadProgress 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | - | - | - | - |

#### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arg | **UniCloudChooseAndUploadFileProgressEvent** | 是 | - | - | - |

#### arg 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | - | - |
| loaded | number | 是 | - | - | - |
| total | number | 是 | - | - | - |
| tempFilePath | string | 是 | - | - | - |
| tempFile | [UniCloudChooseAndUploadFileItem](#unicloudchooseanduploadfileitem-values) | 是 | - | - | - | 



### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudChooseAndUploadFileResult**> |

#### Promise\<UniCloudChooseAndUploadFileResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFiles | Array&lt;**UniCloudChooseAndUploadFileItem**&gt; | 是 | - | - | - |
| tempFilePaths | Array&lt;string&gt; | 是 | - | - | - | 

##### tempFiles 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | - | - |
| path | string | 是 | - | - | - |
| cloudPath | string | 是 | - | - | - |
| cloudPathAsRealPath | boolean | 否 | - | - |  |
| url | string | 否 | - | - |  |
| errMsg | string | 否 | - | - |  |



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.cloudStorage.getTempFileURL)

<!-- UTSUNICLOUDAPIJSON.chooseAndUploadFile.example -->

**注意**

- 4.18之前uni-app-x在app端仅支持选择图片，即type参数仅能设为`image`。
- 4.18及之后的版本uni-app-x在app端仅支持选择图片、视频，即type参数仅能设为`image`、`video`。

## getTempFileURL(options) @gettempfileurl

获取文件临时URL

### getTempFileURL 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniCloudGetTempFileURLOptions** | 是 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fileList | Array&lt;string&gt; | 是 | - | - | 文件列表 | 


### 返回值 

| 类型 |
| :- |
| Promise\<**UniCloudGetTempFileURLResult**> |

#### Promise\<UniCloudGetTempFileURLResult> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fileList | Array&lt;**UniCloudGetTempFileURLResultItem**&gt; | 是 | - | - | 文件列表 |

##### fileList 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fileID | string | 是 | - | - | 文件id |
| tempFileURL | string | 是 | - | - | 文件临时url | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.cloudStorage.chooseAndUploadFile)

<!-- UTSUNICLOUDAPIJSON.unicloud-file-api.example -->
