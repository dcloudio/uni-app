<!-- ## uni.getFileSystemManager() @getfilesystemmanager -->

::: sourceCode
## uni.getFileSystemManager() @getfilesystemmanager

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-fileSystemManager


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-fileSystemManager

:::

获取文件管理器

### getFileSystemManager 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |


文件管理器对象，用于操作应用可访问的本地文件空间，在app平台是应用沙盒目录。

可实现目录和文件的创建、删除、改名或改路径、遍历目录、获取文件信息、读写文件。

注意：
- `DCloud-`、`DCloud_`、`uni-`、`uni_`开头的目录和文件是保留目录。开发者自用的文件目录需避免使用这些前缀；

- 读取文件API受具体设备内存大小限制，为了在老旧设备具备更好的兼容性，请避免一次性读取大文件的情况(建议文件大小不要超过16M)；

- [ReadFileSuccessResult](./get-file-system-manager.md#readfilesuccessresult-values) 的data参数以前类型是string，Android平台4.31、iOS平台4.61起为了同时支持arraybuffer，类型改成了‘string | ArrayBuffer’，请在使用时手动as为指定类型；

:::warning 注意

##### 为了和微信小程序保持一致，`HBuilderX 4.71+` 涉及如下API调整

| 相关 API                | 升级前                                                                                                                                                          | 升级后                                                                                                                                                                                                                                                                                                                                                 |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `stat` / `statSync`    | - 返回路径是系统绝对路径                                                                                                                                   | - 返回路径是相对参数path的相对路径  <br> * 微信小程序规则：当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Array，数组的每一项是一个对象，每个对象包含 path 和 stats  <br> * uniapp-x规则为避免返回值是联合类型，均返回数组，具体优化如下: <br> --- 当 path = 文件路径，返回数组，仅包含本身stats，返回 stats.path= "" <br> --- 当 path = 目录路径 && recursive = false，返回数组，仅包含本身stats，返回 stats.path= "/" <br> --- 当 path = 目录路径 && recursive = true，返回数组，包含本身stats和其递归子文件stats和目录文件stats                                                                                                                                                                                                                                                                                                                    |
| `saveFile` / `saveFileSync` | **参数 `filePath`**  <br> - 传入nil：默认保存到 `uni.env.USER_DATA_PATH` 目录  <br> - 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存  <br> - 传入目录路径：如果存在，保存到filePath/截取tempFilePath的文件名；如果不存在，先创建再保存  <br> - 传入错误路径：比如无权限的路径，返回 error <br> <br> **返回路径 `savedFilePath`** <br> - 返回绝对路径   | **参数 `filePath`** <br> - 传入nil：默认保存到 `uni.env.CACHE_PATH/uni-store/` 目录 <br> - 传入错误路径：比如无权限的路径，返回 error  <br> - 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存 <br> -传入filePath是目录路径且已存在，则返回错误码`1300021`   <br>  -传入filePath是文件路径且已存在，则覆盖写入  <br>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 <br> <br> **返回路径 `savedFilePath`** <br> - 使用 `unifile://` 路径, 如果参数filePath=nil, savedFilePath= `unifile://cache/uni-store/xxx`; 否则savedFilePath= `unifile://cache/xxx`/`unifile://usr/xxx`/`unifile://sandbox/xxx` <br>  <br> **其他** <br> - 成功保存后删除临时文件 |
| `getSavedFileList`     | 返回 `uni.env.USER_DATA_PATH` 目录中的文件列表, 均绝对路径                                                                                                                            | 返回 `unifile://cache/uni-store/`(uni.env.CACHE_PATH/uni-store/) 目录中的文件列表                                                                                                                                                                                                                                                            |
| `rmdir` / `rmdirSync`  | iOS 无法删除空的 `uni.env.USER_DATA_PATH`、`uni.env.CACHE_PATH` 目录（系统限制）<br>Android/Harmony 可删除任意目录                                                         | **删除特殊目录，只删除子，保留本身**  <br>  - `uni.env.SANDBOX_PATH` <br> - `uni.env.CACHE_PATH` <br>  - `uni.env.USER_DATA_PATH` <br> - `uni.env.ANDROID_INTERNAL_SANDBOX_PATH` <br> <br> **其他创建的目录可以删除子和本身**  <br>                                                                                                                                                                                   |
| `copyFile` / `copyFileSync` | **参数 `destPath`**  <br> - 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存  <br> - 传入目录路径：如果存在，保存到destPath/截取tempFilePath的文件名；如果不存在，先创建再保存  <br> - 传入错误路径：比如无权限的路径，返回 error <br>  | **参数 `destPath`** <br>  <br> - 传入错误路径：比如无权限的路径，返回 error  <br> - 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存 <br> -传入destPath是目录路径且已存在，则返回错误码`1300021`   <br>  -传入destPath是文件路径且已存在，则覆盖写入  <br>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 <br> <br> |


##### iOS 无返回值同步api说明：
1. 在uvue中不能依赖无返回值的同步api，因为iOS目前无法在uvue层面捕获失败，仅可用于调试，不能用于运行，try···catch无效，不会进入catch回调；
2. 用于调试时：无返回值的同步api可以通过控制台看到具体的失败或成功console log；
3. 相关api：writeFileSync、unlinkSync、truncateSync、removeSavedFile、renameSync、rmdirSync、mkdirSync、ftruncateSync、copyFileSync、closeSync、appendFileSync、accessSync

:::





### 返回值 

| 类型 |
| :- |
| [FileSystemManager](#filesystemmanager-values) |

#### FileSystemManager 的方法 @filesystemmanager-values 

#### access(options: AccessOptions): void; @access
access
判断文件/目录是否存在
##### access 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **AccessOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要判断是否存在的文件/目录路径 (本地路径) |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### accessSync(path: string): void; @accesssync
accessSync
FileSystemManager.access 的同步版本
##### accessSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: x | 要判断是否存在的文件/目录路径 (本地路径) | 



#### appendFile(options: AppendFileOptions): void; @appendfile
appendFile
在文件结尾追加内容
##### appendFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **AppendFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要追加内容的文件路径 (本地路径) |
| encoding | string | 否 | Web: x | 指定写入文件的字符编码<br/>支持:ascii base64 utf-8<br/>只在 data 类型是 String 时有效 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 要追加的文本或二进制数据，类型为 String 或 ArrayBuffer，以前类型是string，iOS平台4.61、Android平台4.31及以后支持arraybuffer |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii字符编码 |
| "base64" | Web: x | base64字符编码 |
| "utf-8" | Web: x | utf-8字符编码，默认值 |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### appendFileSync(filePath: string, data: string \| ArrayBuffer, encoding?: string): void; @appendfilesync
appendFileSync
FileSystemManager.appendFile 的同步版本
##### appendFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 要追加内容的文件路径 (本地路径) |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x | 要追加的文本或二进制数据,类型为 String 或 ArrayBuffer，Android平台4.31、iOS平台4.61之前前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer |
| encoding | string | 否 | Web: x | 指定写入文件的字符编码支持:ascii base64 utf-8,只在 data 类型是 String 时有效 | 



#### close(options: CloseOptions): void; @close
close
关闭文件
##### close 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **CloseOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 需要被关闭的文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### closeSync(options: CloseSyncOptions): void; @closesync
closeSync
同步关闭文件
##### closeSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **CloseSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 需要被关闭的文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 | 



#### copyFile(options: CopyFileOptions): void; @copyfile
copyFile
复制文件
##### copyFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **CopyFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| srcPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 源文件路径，支持本地路径 |
| destPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 新文件路径，支持本地路径<br/>- 传入错误路径：比如无权限的路径，返回 error<br/>- 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存<br/>-传入destPath是目录路径且已存在，则返回错误码1300021<br/>-传入destPath是文件路径且已存在，则覆盖写入<br/>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### copyFileSync(srcPath: string, destPath: string): void; @copyfilesync
copyFileSync
FileSystemManager.copyFile 的同步版本
##### copyFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| srcPath | string | 是 | Web: x | 源文件路径，支持本地路径 |
| destPath | string | 是 | Web: x | 新文件路径，支持本地路径 | 



#### fstat(options: FStatOptions): void; @fstat
fstat
获取文件的状态信息
##### fstat 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **FStatOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| success | (res: [FStatSuccessResult](#fstatsuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FStatSuccessResult 的属性值 @fstatsuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| stats | [Stats](#stats-values) | 是 | Web: x | Stats 对象，包含了文件的状态信息 |

#### stats 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| mode | number | 是 | Web: x | 文件的类型和存取的权限，对应 POSIX stat.st_mode<br/>注意android中，文件类型只包含是否是目录与文件，<br/>另外在android中这里的权限指的是当前进程对文件或者文件夹是否有读，写，执行的权限，<br/>这里没有与 POSIX stat.st_mode对应的组，其他人等相关权限的数据返回,只有所有者的相关权限 |
| size | number | 是 | Web: x | 文件大小，单位：B，对应 POSIX stat.st_size |
| lastAccessedTime | number | 是 | Web: x | 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime<br/>注意：android中由于系统限制无法获取该数据 |
| lastModifiedTime | number | 是 | Web: x | 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime |

###### Stats 的方法 @stats-values 

###### isDirectory(): boolean; @isdirectory
isDirectory
判断当前文件是否一个目录
###### isDirectory 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### isFile(): boolean; @isfile
isFile
判断当前文件是否一个普通文件
###### isFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### fstatSync(options: FStatSyncOptions): Stats; @fstatsync
fstatSync
同步获取文件的状态信息
##### fstatSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **FStatSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 | 


##### 返回值 

| 类型 |
| :- |
| [Stats](#stats-values) |

#### Stats 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| mode | number | 是 | Web: x | 文件的类型和存取的权限，对应 POSIX stat.st_mode<br/>注意android中，文件类型只包含是否是目录与文件，<br/>另外在android中这里的权限指的是当前进程对文件或者文件夹是否有读，写，执行的权限，<br/>这里没有与 POSIX stat.st_mode对应的组，其他人等相关权限的数据返回,只有所有者的相关权限 |
| size | number | 是 | Web: x | 文件大小，单位：B，对应 POSIX stat.st_size |
| lastAccessedTime | number | 是 | Web: x | 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime<br/>注意：android中由于系统限制无法获取该数据 |
| lastModifiedTime | number | 是 | Web: x | 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime |
###### Stats 的方法 @stats-values 

###### isDirectory(): boolean; @isdirectory
isDirectory
判断当前文件是否一个目录
###### isDirectory 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### isFile(): boolean; @isfile
isFile
判断当前文件是否一个普通文件
###### isFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 
 

#### ftruncate(options: FTruncateFileOptions): void; @ftruncate
ftruncate
对文件内容进行截断操作
##### ftruncate 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **FTruncateFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 是 | Web: x | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### ftruncateSync(options: FTruncateFileSyncOptions): void; @ftruncatesync
ftruncateSync
同步对文件内容进行截断操作
##### ftruncateSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **FTruncateFileSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 是 | Web: x | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 | 



#### getFileInfo(options: GetFileInfoOptions): void; @getfileinfo
getFileInfo
获取该本地临时文件 或 本地缓存文件 信息
##### getFileInfo 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **GetFileInfoOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要读取的文件路径 (本地路径) |
| digestAlgorithm | string | 否 | Web: x | 计算文件摘要的算法，不传默认使用 "md5" |
| success | (res: [GetFileInfoSuccessResult](#getfileinfosuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### digestAlgorithm 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "md5" | Web: x | md5 算法 |
| "sha1" | Web: x | sha1 算法 |
| "sha256" | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: 5.31; iOS: 5.31; HarmonyOS: 5.31 | sha256 算法 |
| "none" | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: 5.31; iOS: 5.31; HarmonyOS: 5.31 | 不计算摘要，digest 字段返回空字符串 |

###### GetFileInfoSuccessResult 的属性值 @getfileinfosuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| digest | string | 是 | Web: x | 按照传入的 digestAlgorithm 计算得出的的文件摘要 |
| size | number | 是 | Web: x | 文件大小，以字节为单位 |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### getSavedFileList(options: GetSavedFileListOptions): void; @getsavedfilelist
getSavedFileList
获取该已保存的本地缓存文件列表
##### getSavedFileList 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **GetSavedFileListOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [GetSavedFileListResult](#getsavedfilelistresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### GetSavedFileListResult 的属性值 @getsavedfilelistresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fileList | Array&lt;string&gt; | 是 | Web: x | 文件数组。自 `4.71` 起，返回 `unifile://` 协议的路径<br/>返回 `unifile://cache/uni-store/` (uni.env.CACHE_PATH/uni-store/) 目录中的文件列表 |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### mkdir(options: MkDirOptions): void; @mkdir
mkdir
创建目录
##### mkdir 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **MkDirOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 创建的目录路径 (本地路径) |
| recursive | boolean | 是 | Web: x | 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### mkdirSync(dirPath: string, recursive: boolean): void; @mkdirsync
mkdirSync
FileSystemManager.mkdir 的同步版本
##### mkdirSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | Web: x | 创建的目录路径 (本地路径) |
| recursive | boolean | 是 | Web: x | 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。 | 



#### open(options: OpenFileOptions): void; @open
open
打开文件，返回文件描述符
##### open 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **OpenFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要追加内容的文件路径 (本地路径) |
| flag | string | 是 | Web: x | 文件系统标志，默认值: 'r' |
| success | (res: [OpenFileSuccessResult](#openfilesuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### flag 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "a" | Web: x | 打开文件用于追加。 如果文件不存在，则创建该文件 |
| "ax" | Web: x | 类似于 'a'，但如果路径存在，则失败 |
| "a+" | Web: x | 打开文件用于读取和追加。 如果文件不存在，则创建该文件 |
| "ax+" | Web: x | 类似于 'a+'，但如果路径存在，则失败 |
| "r" | Web: x | 打开文件用于读取。 如果文件不存在，则会发生异常 |
| "r+" | Web: x | 打开文件用于读取和写入。 如果文件不存在，则会发生异常 |
| "w" | Web: x | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| "wx" | Web: x | 类似于 'w'，但如果路径存在，则失败 |
| "w+" | Web: x | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| "wx+" | Web: x | 类似于 'w+'，但如果路径存在，则失败 |

###### OpenFileSuccessResult 的属性值 @openfilesuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符 |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### openSync(options: OpenFileSyncOptions): string; @opensync
openSync
同步打开文件，返回文件描述符
##### openSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **OpenFileSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要追加内容的文件路径 (本地路径) |
| flag | string | 是 | Web: x | 文件系统标志，默认值: 'r' |

##### flag 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "a" | Web: x | 打开文件用于追加。 如果文件不存在，则创建该文件 |
| "ax" | Web: x | 类似于 'a'，但如果路径存在，则失败 |
| "a+" | Web: x | 打开文件用于读取和追加。 如果文件不存在，则创建该文件 |
| "ax+" | Web: x | 类似于 'a+'，但如果路径存在，则失败 |
| "r" | Web: x | 打开文件用于读取。 如果文件不存在，则会发生异常 |
| "r+" | Web: x | 打开文件用于读取和写入。 如果文件不存在，则会发生异常 |
| "w" | Web: x | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| "wx" | Web: x | 类似于 'w'，但如果路径存在，则失败 |
| "w+" | Web: x | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| "wx+" | Web: x | 类似于 'w+'，但如果路径存在，则失败 | 


##### 返回值 

| 类型 |
| :- |
| string |
 

#### readFile(options: ReadFileOptions): void; @readfile
readFile
读取本地文件内容
##### readFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ReadFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| encoding | string | 否 | Web: x | base64 / utf-8 / ascii,指定读取文件的字符编码，(iOS平台4.61及以后、Android平台4.31及以后)如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 文件路径，支持相对地址和绝对地址，app-android平台支持代码包文件目录 |
| success | (res: [ReadFileSuccessResult](#readfilesuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 字符编码 |
| "base64" | Web: x | base64 字符编码 |
| "utf-8" | Web: x | utf-8 字符编码，默认值 |

###### ReadFileSuccessResult 的属性值 @readfilesuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.11; HarmonyOS: 4.61 | 读取的内容，类型为 String 或 ArrayBuffer，在4.31以前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### readFileSync(filePath: string, encoding?: string): string \| ArrayBuffer; @readfilesync
readFileSync
FileSystemManager.readFile 的同步版本参数
##### readFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 文件路径，支持相对地址和绝对地址，app-android平台支持代码包文件目录 |
| encoding | string | 否 | Web: x | base64 / utf-8,指定读取文件的字符编码，(iOS平台4.61及以后、Android平台4.31及以后)如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | data文件内容, iOS平台4.61及以后、Android平台4.31及以后支持ArrayBuffer |
 

#### read(option: ReadOption): void; @read
read
读文件
##### read 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **ReadOption** | 是 | Web: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 |   | 数据写入的缓冲区，必须是 ArrayBuffer 实例 |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 否 | Web: x | 要从文件中读取的字节数，默认0 |
| offset | number | 否 | Web: x | 缓冲区中的写入偏移量，默认0 |
| position | number | 否 | Web: x | 文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件。 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| success | (result: [ReadSuccessCallbackResult](#readsuccesscallbackresult-values)) => void | 否 | Web: x | 接口调用成功的回调函数 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |

###### ReadSuccessCallbackResult 的属性值 @readsuccesscallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 被写入的缓存区的对象，即接口入参的 arrayBuffer |
| bytesRead | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 实际读取的字节数 |



#### readSync(option: ReadSyncOption): ReadResult; @readsync
readSync
读文件
##### readSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **ReadSyncOption** | 是 | Web: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 数据写入的缓冲区，必须是 ArrayBuffer 实例 |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 [FileSystemManager.open](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.open.html) 或 [FileSystemManager.openSync](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.openSync.html) 接口获得 |
| length | number | 否 | Web: x | 要从文件中读取的字节数，默认0 |
| offset | number | 否 | Web: x | 缓冲区中的写入偏移量，默认0 |
| position | number | 否 | Web: x | 文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件。 | 


##### 返回值 

| 类型 |
| :- |
| **ReadResult** |

#### ReadResult 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 被写入的缓存区的对象，即接口入参的 arrayBuffer |
| bytesRead | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 实际读取的字节数 | 

#### readdir(options: ReadDirOptions): void; @readdir
readdir
读取目录内文件列表
##### readdir 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ReadDirOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要读取的目录路径 (本地路径) |
| success | (res: [ReadDirSuccessResult](#readdirsuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### ReadDirSuccessResult 的属性值 @readdirsuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| files | Array&lt;string&gt; | 是 | Web: x |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### readdirSync(dirPath: string): string\[] \| null; @readdirsync
readdirSync
FileSystemManager.readdir 的同步版本
##### readdirSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | Web: x | 要读取的目录路径 (本地路径) | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| Array&lt;string&gt; | 否 |
 

#### readZipEntry(options: ReadZipEntryOptions): void; @readzipentry
readZipEntry
读取压缩包内的文件
##### readZipEntry 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ReadZipEntryOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要读取的压缩包的路径 (本地路径)，app-android平台支持代码包文件目录 |
| encoding | string | 否 | Web: x | 统一指定读取文件的字符编码，只在 entries 值为"all"时有效。<br/>4.31及以后版本如果 entries 值为 null 且不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |
| entries | Array&lt;**EntryItem**&gt; | 否 | Web: x | 要读取的压缩包内的文件列表（当不传入时表示读取压缩包内所有文件） |
| success | (res: [EntriesResult](#entriesresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 字符编码 |
| "base64" | Web: x | base64 字符编码 |
| "utf-8" | Web: x | utf-8 字符编码，默认值 |

##### entries 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: x | 压缩包内文件路径 |
| encoding | string | 否 | Web: x | 指定写入文件的字符编码<br/>支持:ascii base64 utf-8;4.31及以后版本如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |

###### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 字符编码 |
| "base64" | Web: x | base64 字符编码 |
| "utf-8" | Web: x | utf-8 字符编码，默认值 |

###### EntriesResult 的属性值 @entriesresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| entries | Map\<string, ZipFileItem> | 是 | Web: x | 文件路径 |
| ~~result~~ | Map\<string, ZipFileItem> | 是 | Web: x |   **已废弃，使用 entries** |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### rmdir(options: RmDirOptions): void; @rmdir
rmdir
删除目录
##### rmdir 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **RmDirOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要删除的目录路径 (本地路径)<br/>删除特殊目录，只删除子，保留本身<br/>- uni.env.SANDBOX_PATH<br/>- uni.env.CACHE_PATH<br/>- uni.env.USER_DATA_PATH<br/>- uni.env.ANDROID_INTERNAL_SANDBOX_PATH<br/>其他创建的目录可以删除子和本身 |
| recursive | boolean | 是 | Web: x | 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### rmdirSync(dirPath: string, recursive: boolean): void; @rmdirsync
rmdirSync
FileSystemManager.rmdir 的同步版本
##### rmdirSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | Web: x | 要删除的目录路径 (本地路径) |
| recursive | boolean | 是 | Web: x | 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。 | 



#### rename(options: RenameOptions): void; @rename
rename
重命名文件。可以把文件从 oldPath 移动到 newPath
##### rename 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **RenameOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| oldPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 源文件路径，支持本地路径 |
| newPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 新文件路径，支持本地路径 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### renameSync(oldPath: string, newPath: string): void; @renamesync
renameSync
FileSystemManager.rename 的同步版本
##### renameSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| oldPath | string | 是 | Web: x | 源文件路径，支持本地路径 |
| newPath | string | 是 | Web: x | 新文件路径，支持本地路径 | 



#### removeSavedFile(options: RemoveSavedFileOptions): void; @removesavedfile
removeSavedFile
删除该小程序下已保存的本地缓存文件
##### removeSavedFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **RemoveSavedFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 需要删除的文件路径 (本地路径) |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### readCompressedFile(options: ReadCompressedFileOptions): void; @readcompressedfile
readCompressedFile
读取指定压缩类型的本地文件内容
##### readCompressedFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ReadCompressedFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要读取的文件的路径 (本地用户文件或代码包文件)，app-android平台支持代码包文件目录 |
| compressionAlgorithm | string | 是 | Web: x | 文件压缩类型，目前仅支持 'br'。 |
| success | (res: [ReadCompressedFileResult](#readcompressedfileresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### ReadCompressedFileResult 的属性值 @readcompressedfileresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| data | string | 是 | Web: x |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### readCompressedFileSync(filePath: string, compressionAlgorithm: string): string @readcompressedfilesync
readCompressedFileSync
同步读取指定压缩类型的本地文件内容
##### readCompressedFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | x |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 要读取的文件的路径 (本地用户文件或代码包文件)，app-android平台支持代码包文件目录 |
| compressionAlgorithm | string | 是 | Web: x | 文件压缩类型，目前仅支持 'br'。 | 


##### 返回值 

| 类型 |
| :- |
| string |
 

#### saveFile(options: SaveFileOptions): void; @savefile
saveFile
保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
##### saveFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **SaveFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tempFilePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 临时存储文件路径 (本地路径) |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 否 | Web: x | - 传入nil：默认保存到 uni.env.CACHE_PATH/uni-store/ 目录<br/>- 传入错误路径：比如无权限的路径，返回 error<br/>- 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存<br/>- 传入filePath是目录路径且已存在，则返回错误码1300021<br/>- 传入filePath是文件路径且已存在，则覆盖写入<br/>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 |
| success | (res: [SaveFileSuccessResult](#savefilesuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### SaveFileSuccessResult 的属性值 @savefilesuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| savedFilePath | string | 是 | Web: x | 存储后的文件路径 (本地路径)。自 `4.71` 起，返回 `unifile://` 协议的路径<br/>参数filePath=nil, savedFilePath= unifile://cache/uni-store/xxx<br/>否则savedFilePath= unifile://cache/xxx/unifile://usr/xxx/unifile://sandbox/xxx |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### saveFileSync(tempFilePath: string, filePath: string): string; @savefilesync
saveFileSync
FileSystemManager.saveFile 的同步版本。自 `4.71` 起，返回 `unifile://` 协议的路径
##### saveFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | Web: x | 临时存储文件路径 (本地路径) |
| filePath | string | 否 | Web: x | 要存储的文件路径 (本地路径)，文件已经存在时会直接覆盖  传入不存在的路径\ - App 端自动创建并保存 - 微信小程序会报错 | 


##### 返回值 

| 类型 |
| :- |
| string |
 

#### stat(options: StatOptions): void; @stat
stat
获取文件 Stats 对象
##### stat 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **StatOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 文件/目录路径 (本地路径) |
| recursive | boolean | 是 | Web: x | 是否递归获取目录下的每个文件的 Stats 信息 |
| success | (res: [StatSuccessResult](#statsuccessresult-values)) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### StatSuccessResult 的属性值 @statsuccessresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| stats | Array&lt;**FileStats**&gt; | 是 | Web: x | 微信小程序规则：当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Array，数组的每一项是一个对象，每个对象包含 path 和 stats<br/>uniapp-x规则为避免返回值是联合类型，均返回数组，具体优化如下：<br/>-—— 当 path = 文件路径，返回数组，仅包含本身stats，返回 stats.path= ""<br/>-—— 当 path = 目录路径 && recursive = false，返回数组，仅包含本身stats，返回 stats.path= "/"<br/>-—— 当 path = 目录路径 && recursive = true，返回数组，包含本身stats和其递归子文件stats和目录文件stats |

#### stats 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: x | 文件/目录路径（相对于传入路径） |
| stats | [Stats](#stats-values) | 是 | Web: x | Stats 对象，即描述文件状态的对象 |

##### stats 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| mode | number | 是 | Web: x | 文件的类型和存取的权限，对应 POSIX stat.st_mode<br/>注意android中，文件类型只包含是否是目录与文件，<br/>另外在android中这里的权限指的是当前进程对文件或者文件夹是否有读，写，执行的权限，<br/>这里没有与 POSIX stat.st_mode对应的组，其他人等相关权限的数据返回,只有所有者的相关权限 |
| size | number | 是 | Web: x | 文件大小，单位：B，对应 POSIX stat.st_size |
| lastAccessedTime | number | 是 | Web: x | 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime<br/>注意：android中由于系统限制无法获取该数据 |
| lastModifiedTime | number | 是 | Web: x | 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime |

###### Stats 的方法 @stats-values 

###### isDirectory(): boolean; @isdirectory
isDirectory
判断当前文件是否一个目录
###### isDirectory 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### isFile(): boolean; @isfile
isFile
判断当前文件是否一个普通文件
###### isFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### statSync(path : string, recursive : boolean) : FileStats\[]; @statsync
statSync
FileSystemManager.stat 的同步版本
##### statSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: x | 文件/目录路径 (本地路径) |
| recursive | boolean | 是 | Web: x | 是否递归获取目录下的每个文件的 Stats 信息 | 


##### 返回值 

| 类型 |
| :- |
| Array&lt;**FileStats**&gt; |

#### Array&lt;FileStats&gt; 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: x | 文件/目录路径（相对于传入路径） |
| stats | [Stats](#stats-values) | 是 | Web: x | Stats 对象，即描述文件状态的对象 |

##### stats 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| mode | number | 是 | Web: x | 文件的类型和存取的权限，对应 POSIX stat.st_mode<br/>注意android中，文件类型只包含是否是目录与文件，<br/>另外在android中这里的权限指的是当前进程对文件或者文件夹是否有读，写，执行的权限，<br/>这里没有与 POSIX stat.st_mode对应的组，其他人等相关权限的数据返回,只有所有者的相关权限 |
| size | number | 是 | Web: x | 文件大小，单位：B，对应 POSIX stat.st_size |
| lastAccessedTime | number | 是 | Web: x | 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime<br/>注意：android中由于系统限制无法获取该数据 |
| lastModifiedTime | number | 是 | Web: x | 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime |
###### Stats 的方法 @stats-values 

###### isDirectory(): boolean; @isdirectory
isDirectory
判断当前文件是否一个目录
###### isDirectory 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### isFile(): boolean; @isfile
isFile
判断当前文件是否一个普通文件
###### isFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.31 | 4.11 | 4.61 |



###### 返回值 

| 类型 |
| :- |
| boolean |
 
 

#### truncate(options: TruncateFileOptions): void; @truncate
truncate
对文件内容进行截断操作
##### truncate 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **TruncateFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 要截断的文件路径 (本地路径) |
| length | number | 是 | Web: x | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### truncateSync(filePath: string, length?: number): void; @truncatesync
truncateSync
对文件内容进行截断操作 (truncate 的同步版本)
##### truncateSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 要截断的文件路径 (本地路径) |
| length | number | 否 | Web: x | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理 | 



#### unlink(options: UnLinkOptions): void; @unlink
unlink
删除文件
##### unlink 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **UnLinkOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 文件路径，只支持绝对地址 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### unlinkSync(filePath: string): void; @unlinksync
unlinkSync
FileSystemManager.unlink 的同步版本
##### unlinkSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 文件路径，只支持绝对地址 | 



#### unzip(options: UnzipFileOptions): void; @unzip
unzip
解压文件
##### unzip 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **UnzipFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| zipFilePath | string | 是 | Web: x | 源文件路径，支持本地路径, 只可以是 zip 压缩文件 |
| targetPath | string | 是 | Web: x | 目标目录路径, 支持本地路径 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### unzipSync(options: UnzipSyncOptions): boolean; @unzipsync
unzipSync
解压文件
##### unzipSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| x | x | x | 5.31 | 5.31 | 7.0 (26.0.0) | 5.31 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **UnzipSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| zipFilePath | string | 是 | Web: x | 源文件路径，支持本地路径, 只可以是 zip 压缩文件 |
| targetPath | string | 是 | Web: x | 目标目录路径, 支持本地路径 | 


##### 返回值 

| 类型 |
| :- |
| boolean |
 

#### writeFile(options: WriteFileOptions): void; @writefile
writeFile
写文件
##### writeFile 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **WriteFileOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | Web: x | 文件路径，只支持绝对地址 |
| encoding | string | 否 | Web: x | 指定写入文件的字符编码,<br/>支持:ascii base64 utf-8，默认值是 utf-8，仅在 data 类型是 String 时有效 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.11; HarmonyOS: 4.61 | 写入的内容，类型为 String 或 ArrayBuffer，之前类型是string，iOS平台4.61及以后、Android平台4.31及以后支持ArrayBuffer类型 |
| success | (res: FileManagerSuccessResult) => void | 否 | Web: x | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | Web: x | 通用的结束返回结果回调 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 编码格式 |
| "base64" | Web: x | base64 编码格式 |
| "utf-8" | Web: x | utf-8 编码格式，默认值 |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### writeFileSync(filePath: string, data: string \| ArrayBuffer, encoding?: string): void; @writefilesync
writeFileSync
FileSystemManager.writeFile 的同步版本
##### writeFileSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.51 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| filePath | string | 是 | Web: x | 文件路径，只支持绝对地址 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x | 要写入的文本或二进制数据,Android平台4.31、iOS平台4.61及以后版本支持ArrayBuffer |
| encoding | string | 否 | Web: x | 指定写入文件的字符编码,支持:ascii base64 utf-8, 默认值是utf-8, 仅在 data 类型是 String 时有效 | 



#### write(options: WriteOptions): void; @write
write
写入文件
##### write 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **WriteOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 |  | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 |  | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 写入的内容，类型为 String 或 ArrayBuffer，以前类型是string，iOS平台4.61、Android平台4.31及以后支持ArrayBuffer |
| offset | number | 否 | 0 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | Android平台4.31及以后版本新增，只在 data 类型是 ArrayBuffer 时有效，决定 ArrayBuffer 中要被写入的部位，即 ArrayBuffer 中的索引，默认0 |
| length | number | 否 |  | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | Android平台4.31及以后版本新增，只在 data 类型是 ArrayBuffer 时有效，指定要写入的字节数，默认为 ArrayBuffer 从0开始偏移 offset 个字节后剩余的字节数 |
| position | number | 否 |  | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: x; HarmonyOS: 4.61 | Andorid平台4.31及以后版本新增，指定文件开头的偏移量，即数据要被写入的位置。当 position 不传或者传入非 Number 类型的值时，数据会被写入当前指针所在位置。 |
| encoding | string | 否 |  | Web: x | 只在 data 类型是 String 时有效，指定写入文件的字符编码，默认为 utf8<br/>支持:ascii base64 utf-8 |
| success | (res: [WriteResult](#writeresult-values)) => void | 否 |  | Web: x | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 |  | Web: x | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 |  | Web: x | 通用的结束返回结果回调 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 字符编码 |
| "base64" | Web: x | base64 字符编码 |
| "utf-8" | Web: x | utf-8 字符编码，默认值 |

###### WriteResult 的属性值 @writeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| bytesWritten | number | 是 | Web: x | 实际被写入到文件中的字节数（注意，被写入的字节数不一定与被写入的字符串字符数相同） |

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x | 错误码 |
| errSubject | string | 是 | Web: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 未找到文件 |
| 1300009 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 文件描述符错误 |
| 1300010 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 重试 |
| 1300011 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 错误的地址 |
| 1300012 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 操作阻塞 |
| 1300013 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 无权限 |
| 1300014 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 网络不可达 |
| 1300015 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 未知错误 |
| 1300016 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 不是文件夹 |
| 1300017 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文本文件繁忙 |
| 1300018 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件太大 |
| 1300019 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 只读文件系统 |
| 1300020 | Web: x; Android: x; iOS: 4.61; HarmonyOS: 4.61 | 文件名称太长 |
| 1300021 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 是目录 |
| 1300022 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 参数无效 |
| 1300033 | Web: x; Android: x; iOS: x; HarmonyOS: 4.61 | 过多符号链接 |
| 1300066 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 目录非空 |
| 1300201 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 系统错误 |
| 1300202 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; Android: √; iOS: 4.61; HarmonyOS: 4.61 | 对目录的非法操作 |
| 1301005 | Web: x; Android: √; iOS: 4.11; HarmonyOS: 4.61 | 文件已存在 |
| 1301111 | Web: x; Android: 4.13; iOS: x; HarmonyOS: 4.61 | brotli解压失败 |
| 1302003 | Web: x; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61 | 标志无效 |



#### writeSync(options: WriteSyncOptions): WriteResult; @writesync
writeSync
同步写入文件
##### writeSync 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 5.31 | 4.13 | 4.61 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **WriteSyncOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| fd | string | 是 | Web: x | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61 | 写入的内容，类型为 String 或 ArrayBuffer，以前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer类型 |
| encoding | string | 否 | Web: x | 只在 data 类型是 String 时有效，指定写入文件的字符编码，默认为 utf8<br/>支持:ascii base64 utf-8 |
| length | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: x; HarmonyOS: 4.61 | 只在 data 类型是 ArrayBuffer 时有效，指定要写入的字节数，默认为 arrayBuffer 从0开始偏移 offset 个字节后剩余的字节数 ，4.31及以后版本新增 |
| offset | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: x; HarmonyOS: 4.61 | 只在 data 类型是 ArrayBuffer 时有效，决定 arrayBuffer 中要被写入的部位，即 arrayBuffer 中的索引，默认0，4.31及以后版本新增 |
| position | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.31; iOS: x; HarmonyOS: 4.61 | 指定文件开头的偏移量，即数据要被写入的位置。当 position 不传或者传入非 Number 类型的值时，数据会被写入当前指针所在位置。4.31及以后版本新增 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "ascii" | Web: x | ascii 字符编码 |
| "base64" | Web: x | base64 字符编码 |
| "utf-8" | Web: x | utf-8 字符编码，默认值 |


##### 返回值 

| 类型 |
| :- |
| **WriteResult** |

#### WriteResult 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| bytesWritten | number | 是 | Web: x | 实际被写入到文件中的字节数（注意，被写入的字节数不一定与被写入的字符串字符数相同） | 
 


### 特殊说明

- app-ios平台4.11版本之前支持的api仅支持在uvue文件中使用文件管理器对象，uts插件中暂不支持； 4.61版本后，所有api都支持在uts插件和uvue文件中使用，具体请查看兼容性

- app-android平台API不支持代码包文件目录

- app-android平台content:/\/ 路径文件是只读的


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.file.getFileSystemManager)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/file/getFileSystemManager.html#getfilesystemmanager)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getFileSystemManager&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getFileSystemManager&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getFileSystemManager&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getFileSystemManager&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getFileSystemManager)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getFileSystemManager&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-file-system-manager/get-file-system-manager.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-file-system-manager/get-file-system-manager.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-file-system-manager/get-file-system-manager
```uvue
<template>
  <!-- #ifdef APP -->
  <page-intro content="本页演示文件系统 API：递归获取目录、创建文件夹、读写/复制/重命名/删除文件、同步与异步接口等，操作结果在日志区展示。"></page-intro>
  <text>显示简易操作日志(可滚动查看),详细日志需真机运行查看</text><button size="mini" @click="data.log=''">清空日志</button>
  <scroll-view style="max-height: 300px;">
    <text style="margin: 2px; padding: 2px; border: 1px solid #000000;">{{ data.log }}</text>
  </scroll-view>
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <!-- #ifdef MP -->
    <text style="margin: 2px; padding: 2px; border: 1px solid #000000;">{{ data.log }}</text>
    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="statFileInfoTest"
      id="btn-stat-file">递归获取目录files的Stats对象{{data.statFile}}</button>
    <button class="btnstyle" type="primary" @tap="mkdirTest" id="btn-mkdir">创建文件夹{{data.mkdirFile}}</button>
    <button class="btnstyle" type="primary" @tap="writeFileTest" id="btn-write-file">覆盖写入文件{{data.writeFile}}</button>
    <button class="btnstyle" type="primary" @tap="readDirTest" id="btn-read-dir">读取文件夹{{data.readDir}}</button>
    <button class="btnstyle" type="primary" @tap="readFileTest" id="btn-read-file">读取文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="copyFileTest"
      id="btn-copy-file">复制文件{{data.copyFromFile}}到{{data.copyToFile}}</button>
    <button class="btnstyle" type="primary" @tap="renameFileTest"
      id="btn-rename-file">重命名文件{{data.renameFromFile}}到{{data.renameToFile}}</button>
    <button class="btnstyle" type="primary" @tap="accessFileTest"
      id="btn-access-file">判断文件{{data.accessFile}}是否存在</button>
    <button class="btnstyle" type="primary" @tap="unlinkTest" id="btn-unlink-file">删除文件{{data.unlinkFile}}</button>
    <button class="btnstyle" type="primary" @tap="unlinkAllFileTest"
      id="btn-clear-file">删除文件夹{{data.rmDirFile}}下的所有文件</button>
    <button class="btnstyle" type="primary" @tap="rmdirTest" id="btn-remove-dir">删除文件夹{{data.rmDirFile}}</button>

    <!-- #ifndef MP-ALIPAY -->
    <button class="btnstyle" type="primary" @tap="statFileInfoSyncTest"
      id="btn-stat-file-sync">同步递归获取目录files的Stats对象{{data.statFile}}</button>
    <button class="btnstyle" type="primary" @tap="appendFileTest"
      id="btn-append-file">在文件{{data.readFile}}结尾追加内容</button>
    <button class="btnstyle" type="primary" @tap="appendFileSyncTest"
      id="btn-append-file-sync">同步在文件{{data.readFile}}结尾追加内容</button>
    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="writeFileSyncTest"
      id="btn-write-file-sync">同步覆盖写入文件{{data.writeFile}}</button>
    <button class="btnstyle" type="primary" @tap="readFileSyncTest"
      id="btn-read-file-sync">同步读取文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="unlinkSyncTest"
      id="btn-unlink-file-sync">同步删除文件{{data.unlinkFile}}</button>
    <button class="btnstyle" type="primary" @tap="mkdirSyncTest" id="btn-mkdir-sync">同步创建文件夹{{data.mkdirFile}}</button>
    <button class="btnstyle" type="primary" @tap="rmdirSyncTest"
      id="btn-remove-dir-sync">同步删除文件夹{{data.rmDirFile}}</button>
    <button class="btnstyle" type="primary" @tap="readDirSyncTest"
      id="btn-read-dir-sync">同步读取文件夹{{data.readDir}}</button>
    <!-- #ifndef MP-ALIPAY -->
    <button class="btnstyle" type="primary" @tap="accessFileSyncTest"
      id="btn-access-file-sync">同步判断文件{{data.accessFile}}是否存在</button>
    <button class="btnstyle" type="primary" @tap="renameFileSync"
      id="btn-rename-file-sync">同步重命名文件{{data.renameFromFile}}到{{data.renameToFile}}</button>
    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="copyFileSyncTest"
      id="btn-copy-file-sync">同步复制文件{{data.copyFromFile}}到{{data.copyToFile}}</button>
    <!-- #ifndef MP-ALIPAY -->
    <button class="btnstyle" type="primary" @tap="removeSavedFileTest" id="btn-remove-saved-file">删除已保存的本地文件</button>
    <button class="btnstyle" type="primary" @tap="getSavedFileListTest"
      id="btn-getsaved-filelist">获取该已保存的本地缓存文件列表</button>
    <!-- #endif -->
    <!-- #ifndef MP-ALIPAY -->
    <button class="btnstyle" type="primary" @tap="truncateFileTest"
      id="btn-truncate-file">对文件{{data.writeFile}}内容进行截断操作</button>
    <button class="btnstyle" type="primary" @tap="openFileTest" id="btn-open-file">打开文件{{data.readFile}}，返回描述符</button>
    <button class="btnstyle" type="primary" @tap="openFileSyncTest('r',true)"
      id="btn-open-file-sync">同步打开文件{{data.readFile}}，返回描述符</button>
    <button class="btnstyle" type="primary" @tap="closeTest" id="btn-close-file">通过文件描述符关闭文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="closeSyncTest"
      id="btn-close-file-sync">通过文件描述符同步关闭文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="writeTest" id="btn-write">通过文件描述符写入文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="writeSyncTest"
      id="btn-write-sync">同步通过文件描述符写入文件{{data.readFile}}</button>
    <button class="btnstyle" type="primary" @tap="fstatTest"
      id="btn-fstat-file">通过文件描述符获取{{data.statFile}}的状态信息</button>
    <button class="btnstyle" type="primary" @tap="fstatSyncTest"
      id="btn-fstat-file-sync">同步通过文件描述符获取{{data.statFile}}的状态信息</button>
    <button class="btnstyle" type="primary" @tap="ftruncateFileTest"
      id="btn-ftruncate-file">通过文件描述符对文件{{data.writeFile}}内容进行截断</button>
    <button class="btnstyle" type="primary" @tap="ftruncateFileSyncTest"
      id="btn-ftruncate-file-sync">同步通过文件描述符对文件{{data.writeFile}}内容进行截断</button>
    <button class="btnstyle" type="primary" @tap="testWriteReadFileBuffer" id="btn-writereadfile-buffer">写入/读取
      ArrayBuffer</button>
    <button class="btnstyle" type="primary" @tap="testWriteReadBuffer" id="btn-writeread-buffer">通过文件描述符写入/读取
      ArrayBuffer</button>
    <button class="btnstyle" type="primary" @tap="testWriteReadSyncBuffer" id="btn-writereadsync-buffer">通过文件描述符同步写入/读取
      ArrayBuffer</button>
    <button class="btnstyle" type="primary" @tap="testAppendFileBuffer" id="btn-appendfile-buffer">在文件末尾追加
      ArrayBuffer</button>
    <button class="btnstyle" type="primary" @tap="testAppendFileBufferSync" id="btn-appendfilesync-buffer">同步在文件末尾追加
      ArrayBuffer</button>
    <!-- #endif -->

    <!-- #ifdef APP -->
    <button class="btnstyle" type="primary" @tap="copyStaticToFilesTest"
      id="btn-copyStatic-file">从static目录复制文件到a目录</button>
    <button class="btnstyle" type="primary" @tap="saveFileTest" id="btn-save-file">保存临时文件到本地, filePath=null</button>
    <button class="btnstyle" type="primary" @tap="saveFileTest1" id="btn-save-file1">保存临时文件到本地,
      filePath=xxx/path.txt</button>
    <button class="btnstyle" type="primary" @tap="saveFileTest2" id="btn-save-file2">保存临时文件到本地,
      filePath=xxx/path</button>
    <button class="btnstyle" type="primary" @tap="saveFileTest3" id="btn-save-file3">保存临时文件到本地,
      filePath=xxx/path/</button>

    <button class="btnstyle" type="primary" @tap="saveFileAndReadFileTest" id="btn-save-file-read-file">saveFile成功后验证是否可以readFile</button>
    <button class="btnstyle" type="primary" @tap="saveFileSyncTest" id="btn-save-file-sync">同步保存临时文件到本地</button>
    <button class="btnstyle" type="primary" @tap="unzipFileTest" id="btn-unzip-file">解压文件</button>
    <!-- #ifdef VUE3-VAPOR -->
    <button class="btnstyle" type="primary" @tap="unzipFileSyncTest" id="btn-unzip-file-sync">同步解压文件</button>
    <!-- #endif -->
    <!-- #ifndef MP-ALIPAY -->
    <button class="btnstyle" type="primary" @tap="truncateFileSyncTest"
      id="btn-truncate-file-sync">同步对文件{{data.writeFile}}内容进行截断操作</button>
    <button class="btnstyle" type="primary" @tap="readCompressedFileTest"
      id="btn-compressed-file">读取指定压缩类型的本地文件内容</button>
    <button class="btnstyle" type="primary" @tap="readCompressedFileSyncTest"
      id="btn-compressed-file-sync">同步读取指定压缩类型的本地文件内容</button>
    <button class="btnstyle" type="primary" @tap="readZipEntry" id="btn-readzip-entry">读取压缩包内的文件</button>
    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="testWriteReadFileSyncBuffer" id="btn-writereadfilesync-buffer">同步写入/读取
      ArrayBuffer</button>
    <button class="btnstyle" type="primary" @tap="testReadFileEncoding('base64')">readFile(content://base64)</button>
    <button class="btnstyle" type="primary" @tap="testReadFileEncoding('utf-8')">readFile(content://utf-8)</button>
    <button class="btnstyle" type="primary" @tap="testReadFileEncoding('ascii')">readFile(content://ascii)</button>
    <button class="btnstyle" type="primary" @tap="testReadFileArrayBuffer()">readFile(content://arraybuffer)</button>
    <button class="btnstyle" type="primary"
      @tap="testReadFileSyncEncoding('base64')">readFileSync(content://base64)</button>
    <button class="btnstyle" type="primary"
      @tap="testReadFileSyncEncoding('utf-8')">readFileSync(content://utf-8)</button>
    <button class="btnstyle" type="primary"
      @tap="testReadFileSyncEncoding('ascii')">readFileSync(content://ascii)</button>
    <button class="btnstyle" type="primary"
      @tap="testReadFileSyncArrayBuffer()">readFileSync(content://arraybuffer)</button>
    <button class="btnstyle" type="primary" @tap="copyFileByContent()">copyFile(content://)</button>
    <button class="btnstyle" type="primary" @tap="copyFileSyncByContent()">copyFileSync(content://)</button>

    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="gotoExplore()">前往沙盒文件管理器</button>
    <button class="btnstyle" type="primary" @tap="gotoTestStatic()">前往Static文件测试</button>
    <button class="btnstyle" type="primary" @tap="gotoGetFileInfo()">前往getFileInfo摘要测试</button>
    <view style="height: 4px;"></view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="ts">
  import { createFileSystemManagerState } from './file-system-manager-state.ts'
  import { createBasicAsyncActions } from './file-system-manager-basic-async-actions.ts'
  import { createBasicSyncActions } from './file-system-manager-basic-sync.ts'
  import { createStorageActions } from './file-system-manager-storage-actions.ts'
  import { createFdActions } from './file-system-manager-fd.ts'
  import { createBufferActions } from './file-system-manager-buffer.ts'
  import { createContentActions } from './file-system-manager-content.ts'

  const data = reactive(createFileSystemManagerState())

  const {
    statFileInfoTest,
    copyFileTest,
    renameFileTest,
    readDirTest,
    writeFileTest,
    readFileTest,
    rmdirTest,
    mkdirTest,
    accessFileTest,
    unlinkTest,
    unlinkAllFileTest,
    copyStaticToFilesTest,
    // #ifndef MP-ALIPAY
    appendFileTest,
    // #endif
  } = createBasicAsyncActions(data)

  const {
    writeFileSyncTest,
    readFileSyncTest,
    unlinkSyncTest,
    mkdirSyncTest,
    rmdirSyncTest,
    readDirSyncTest,
    copyFileSyncTest,
    // #ifndef MP-ALIPAY
    accessFileSyncTest,
    renameFileSync,
    appendFileSyncTest,
    statFileInfoSyncTest,
    // #endif
  } = createBasicSyncActions(data)

  const {
    unzipFileTest,
    unzipFileSyncTest,
    // #ifndef MP-ALIPAY
    saveFileTest,
    saveFileAndReadFileTest,
    saveFileTest1,
    saveFileTest2,
    saveFileTest3,
    saveFileSyncTest,
    getSavedFileListTest,
    truncateFileTest,
    truncateFileSyncTest,
    readCompressedFileTest,
    readCompressedFileSyncTest,
    removeSavedFileTest,
    // #endif
  } = createStorageActions(data, writeFileSyncTest)

  const {
    // #ifndef MP-ALIPAY
    openFileTest,
    openFileSyncTest,
    closeSyncTest,
    closeTest,
    writeTest,
    writeSyncTest,
    fstatTest,
    fstatSyncTest,
    ftruncateFileTest,
    ftruncateFileSyncTest,
    readZipEntry,
    // #endif
  } = createFdActions(data)

  const {
    testReadFileBuffer,
    testWriteReadFileBuffer,
    testReadFileSyncBuffer,
    testWriteReadFileSyncBuffer,
    // #ifndef MP-ALIPAY
    testWriteReadBuffer,
    testWriteReadSyncBuffer,
    testAppendFileBufferSync,
    testAppendFileBuffer,
    // #endif
  } = createBufferActions(
    data
    // #ifndef MP-ALIPAY
    , openFileSyncTest
    // #endif
  )

  const {
    // #ifdef APP
    testReadFileEncoding,
    testReadFileArrayBuffer,
    testReadFileSyncEncoding,
    testReadFileSyncArrayBuffer,
    copyFileByContent,
    copyFileSyncByContent,
    // #endif
    // #ifndef MP-ALIPAY
    testOpenFlagWrite,
    testWriteLongString,
    // #endif
  } = createContentActions(data)

  const gotoExplore = () => {
    uni.navigateTo({
      url: "/pages/API/get-file-system-manager/filemanage"
    })
  }
  const gotoTestStatic = () => {
    uni.navigateTo({
      url: "/pages/API/get-file-system-manager/testStatic"
    })
  }
  const gotoGetFileInfo = () => {
    uni.navigateTo({
      url: "/pages/API/get-file-system-manager/getFileInfo"
    })
  }

  defineExpose({
    data,
    // #ifndef MP-ALIPAY
    testOpenFlagWrite,
    testWriteLongString
    // #endif
  })
</script>

<style>
  .btnstyle {
    margin: 4px;
  }
</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

