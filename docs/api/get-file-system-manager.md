<!-- ## uni.getFileSystemManager() @getfilesystemmanager -->

::: sourceCode
## uni.getFileSystemManager() @getfilesystemmanager

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-fileSystemManager


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-fileSystemManager

:::

获取文件管理器

### getFileSystemManager 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


文件管理器对象，用于操作应用可访问的本地文件空间，在app平台是应用沙盒目录。

可实现目录和文件的创建、删除、改名或改路径、遍历目录、获取文件信息、读写文件。

注意：
- `DCloud-`、`DCloud_`、`uni-`、`uni_`开头的目录和文件是保留目录。开发者自用的文件目录需避免使用这些前缀；

- 读取文件API受具体设备内存大小限制，为了在老旧设备具备更好的兼容性，请避免一次性读取大文件的情况(建议文件大小不要超过16M)；

- [ReadFileSuccessResult](./get-file-system-manager.md#readfilesuccessresult-values) 的data参数以前类型是string，Android平台4.31、iOS平台4.61起为了同时支持arraybuffer，类型改成了‘string | ArrayBuffer’，请在使用时手动as为指定类型；

- app-ios平台4.11版本之前支持的api仅支持在uvue文件中使用文件管理器对象，uts插件中暂不支持； app-ios平台4.61版本后，所有api都支持在uts插件和uvue文件中使用，具体请查看兼容性；

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
##### access 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **AccessOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要判断是否存在的文件/目录路径 (本地路径) |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 通用的正确返回结果回调 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 通用的错误返回结果回调 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 通用的结束返回结果回调 | 

###### FileSystemManagerFail 的属性值 @filesystemmanagerfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1200002 | Web: x; 微信小程序: -; Android: √; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 类型错误。仅支持 base64 / utf-8 / ascii |
| 1300002 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 未找到文件 |
| 1300009 | Web: x; 微信小程序: -; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件描述符错误 |
| 1300010 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 重试 |
| 1300011 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 错误的地址 |
| 1300012 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作阻塞 |
| 1300013 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 无权限 |
| 1300014 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 网络不可达 |
| 1300015 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 未知错误 |
| 1300016 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不是文件夹 |
| 1300017 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文本文件繁忙 |
| 1300018 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件太大 |
| 1300019 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 只读文件系统 |
| 1300020 | Web: x; 微信小程序: -; Android: x; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件名称太长 |
| 1300021 | Web: x; 微信小程序: -; Android: √; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是目录 |
| 1300022 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 参数无效 |
| 1300033 | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 过多符号链接 |
| 1300066 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 目录非空 |
| 1300201 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 系统错误 |
| 1300202 | Web: x; 微信小程序: -; Android: √; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超出文件存储限制的最大尺寸 |
| 1301003 | Web: x; 微信小程序: -; Android: √; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 对目录的非法操作 |
| 1301005 | Web: x; 微信小程序: -; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件已存在 |
| 1301111 | Web: x; 微信小程序: -; Android: 4.13; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | brotli解压失败 |
| 1302003 | Web: x; 微信小程序: -; Android: 4.13; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标志无效 |


#### accessSync(path: string): void; @accesssync
accessSync
FileSystemManager.access 的同步版本
##### accessSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要判断是否存在的文件/目录路径 (本地路径) | 


#### appendFile(options: AppendFileOptions): void; @appendfile
appendFile
在文件结尾追加内容
##### appendFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **AppendFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要追加内容的文件路径 (本地路径) |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定写入文件的字符编码<br/>支持:ascii base64 utf-8<br/>只在 data 类型是 String 时有效 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要追加的文本或二进制数据，类型为 String 或 ArrayBuffer，以前类型是string，iOS平台4.61、Android平台4.31及以后支持arraybuffer |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8字符编码，默认值 |


#### appendFileSync(filePath: string, data: string \| ArrayBuffer, encoding?: string): void; @appendfilesync
appendFileSync
FileSystemManager.appendFile 的同步版本
##### appendFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要追加内容的文件路径 (本地路径) |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要追加的文本或二进制数据,类型为 String 或 ArrayBuffer，Android平台4.31、iOS平台4.61之前前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定写入文件的字符编码支持:ascii base64 utf-8,只在 data 类型是 String 时有效 | 


#### close(options: CloseOptions): void; @close
close
关闭文件
##### close 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CloseOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要被关闭的文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### closeSync(options: CloseSyncOptions): void; @closesync
closeSync
同步关闭文件
##### closeSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CloseSyncOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要被关闭的文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 | 


#### copyFile(options: CopyFileOptions): void; @copyfile
copyFile
复制文件
##### copyFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CopyFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| srcPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源文件路径，支持本地路径 |
| destPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 新文件路径，支持本地路径<br/>- 传入错误路径：比如无权限的路径，返回 error<br/>- 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存<br/>-传入destPath是目录路径且已存在，则返回错误码1300021<br/>-传入destPath是文件路径且已存在，则覆盖写入<br/>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### copyFileSync(srcPath: string, destPath: string): void; @copyfilesync
copyFileSync
FileSystemManager.copyFile 的同步版本
##### copyFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| srcPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源文件路径，支持本地路径 |
| destPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 新文件路径，支持本地路径 | 


#### fstat(options: FStatOptions): void; @fstat
fstat
获取文件的状态信息
##### fstat 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **FStatOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| success | (res: [FStatSuccessResult](#fstatsuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### FStatSuccessResult 的属性值 @fstatsuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stats | [Stats](#stats-values) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Stats 对象，包含了文件的状态信息 |

#### stats 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| mode | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件的类型和存取的权限，对应 POSIX stat.st_mode<br/>注意android中，文件类型只包含是否是目录与文件，<br/>另外在android中这里的权限指的是当前进程对文件或者文件夹是否有读，写，执行的权限，<br/>这里没有与 POSIX stat.st_mode对应的组，其他人等相关权限的数据返回,只有所有者的相关权限 |
| size | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件大小，单位：B，对应 POSIX stat.st_size |
| lastAccessedTime | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime<br/>注意：android中由于系统限制无法获取该数据 |
| lastModifiedTime | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime |

###### Stats 的方法 @stats-values 

###### isDirectory(): boolean; @isdirectory
isDirectory
判断当前文件是否一个目录
###### isDirectory 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.31 | 4.11 | 4.61 | 5.0 |


###### 返回值 

| 类型 |
| :- |
| boolean |
 

###### isFile(): boolean; @isfile
isFile
判断当前文件是否一个普通文件
###### isFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.31 | 4.11 | 4.61 | 5.0 |


###### 返回值 

| 类型 |
| :- |
| boolean |
 


#### fstatSync(options: FStatSyncOptions): Stats; @fstatsync
fstatSync
同步获取文件的状态信息
##### fstatSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **FStatSyncOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 | 

##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [Stats](#stats-values) | Stats 对象，即描述文件状态的对象 |
 

#### ftruncate(options: FTruncateFileOptions): void; @ftruncate
ftruncate
对文件内容进行截断操作
##### ftruncate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **FTruncateFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### ftruncateSync(options: FTruncateFileSyncOptions): void; @ftruncatesync
ftruncateSync
同步对文件内容进行截断操作
##### ftruncateSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **FTruncateFileSyncOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 | 


#### getFileInfo(options: GetFileInfoOptions): void; @getfileinfo
getFileInfo
获取该本地临时文件 或 本地缓存文件 信息
##### getFileInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetFileInfoOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的文件路径 (本地路径) |
| digestAlgorithm | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 计算文件摘要的算法 |
| success | (res: [GetFileInfoSuccessResult](#getfileinfosuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### digestAlgorithm 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| md5 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | md5 算法 |
| sha1 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | sha1 算法 |

###### GetFileInfoSuccessResult 的属性值 @getfileinfosuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| digest | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 按照传入的 digestAlgorithm 计算得出的的文件摘要 |
| size | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件大小，以字节为单位 |


#### getSavedFileList(options: GetSavedFileListOptions): void; @getsavedfilelist
getSavedFileList
获取该已保存的本地缓存文件列表
##### getSavedFileList 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetSavedFileListOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [GetSavedFileListResult](#getsavedfilelistresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### GetSavedFileListResult 的属性值 @getsavedfilelistresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fileList | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件数组。自 `4.71` 起，返回 `unifile://` 协议的路径<br/>返回 `unifile://cache/uni-store/` (uni.env.CACHE_PATH/uni-store/) 目录中的文件列表 |


#### mkdir(options: MkDirOptions): void; @mkdir
mkdir
创建目录
##### mkdir 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MkDirOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 创建的目录路径 (本地路径) |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### mkdirSync(dirPath: string, recursive: boolean): void; @mkdirsync
mkdirSync
FileSystemManager.mkdir 的同步版本
##### mkdirSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 创建的目录路径 (本地路径) |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。 | 


#### open(options: OpenFileOptions): void; @open
open
打开文件，返回文件描述符
##### open 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要追加内容的文件路径 (本地路径) |
| flag | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件系统标志，默认值: 'r' |
| success | (res: [OpenFileSuccessResult](#openfilesuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### flag 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| a | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于追加。 如果文件不存在，则创建该文件 |
| ax | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'a'，但如果路径存在，则失败 |
| a+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和追加。 如果文件不存在，则创建该文件 |
| ax+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'a+'，但如果路径存在，则失败 |
| r | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取。 如果文件不存在，则会发生异常 |
| r+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和写入。 如果文件不存在，则会发生异常 |
| w | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| wx | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'w'，但如果路径存在，则失败 |
| w+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| wx+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'w+'，但如果路径存在，则失败 |

###### OpenFileSuccessResult 的属性值 @openfilesuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符 |


#### openSync(options: OpenFileSyncOptions): string; @opensync
openSync
同步打开文件，返回文件描述符
##### openSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenFileSyncOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要追加内容的文件路径 (本地路径) |
| flag | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件系统标志，默认值: 'r' |

##### flag 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| a | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于追加。 如果文件不存在，则创建该文件 |
| ax | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'a'，但如果路径存在，则失败 |
| a+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和追加。 如果文件不存在，则创建该文件 |
| ax+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'a+'，但如果路径存在，则失败 |
| r | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取。 如果文件不存在，则会发生异常 |
| r+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和写入。 如果文件不存在，则会发生异常 |
| w | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| wx | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'w'，但如果路径存在，则失败 |
| w+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件 |
| wx+ | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 类似于 'w+'，但如果路径存在，则失败 | 

##### 返回值 

| 类型 |
| :- |
| string |
 

#### readFile(options: ReadFileOptions): void; @readfile
readFile
读取本地文件内容
##### readFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReadFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 / utf-8 / ascii,指定读取文件的字符编码，(iOS平台4.61及以后、Android平台4.31及以后)如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，支持相对地址和绝对地址，app-android平台支持代码包文件目录 |
| success | (res: [ReadFileSuccessResult](#readfilesuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 字符编码，默认值 |

###### ReadFileSuccessResult 的属性值 @readfilesuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 读取的内容，类型为 String 或 ArrayBuffer，在4.31以前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer |


#### readFileSync(filePath: string, encoding?: string): string \| ArrayBuffer; @readfilesync
readFileSync
FileSystemManager.readFile 的同步版本参数
##### readFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，支持相对地址和绝对地址，app-android平台支持代码包文件目录 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 / utf-8,指定读取文件的字符编码，(iOS平台4.61及以后、Android平台4.31及以后)如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 | 

##### 返回值 

| 类型 |
| :- |
| string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) |
 

#### read(option: ReadOption): void; @read
read
读文件
##### read 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.31 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **ReadOption** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 数据写入的缓冲区，必须是 ArrayBuffer 实例 |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| length | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要从文件中读取的字节数，默认0 |
| offset | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 缓冲区中的写入偏移量，默认0 |
| position | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件。 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| success | (result: [ReadSuccessCallbackResult](#readsuccesscallbackresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 | 

###### ReadSuccessCallbackResult 的属性值 @readsuccesscallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 被写入的缓存区的对象，即接口入参的 arrayBuffer |
| bytesRead | number | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 实际读取的字节数 |


#### readSync(option: ReadSyncOption): ReadResult; @readsync
readSync
读文件
##### readSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.31 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **ReadSyncOption** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 数据写入的缓冲区，必须是 ArrayBuffer 实例 |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 [FileSystemManager.open](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.open.html) 或 [FileSystemManager.openSync](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.openSync.html) 接口获得 |
| length | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要从文件中读取的字节数，默认0 |
| offset | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 缓冲区中的写入偏移量，默认0 |
| position | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件。 | 

##### 返回值 

| 类型 |
| :- |
| **ReadResult** |

#### ReadResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| arrayBuffer | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 被写入的缓存区的对象，即接口入参的 arrayBuffer |
| bytesRead | number | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 实际读取的字节数 | 

#### readdir(options: ReadDirOptions): void; @readdir
readdir
读取目录内文件列表
##### readdir 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReadDirOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的目录路径 (本地路径) |
| success | (res: [ReadDirSuccessResult](#readdirsuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### ReadDirSuccessResult 的属性值 @readdirsuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| files | Array&lt;string&gt; | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


#### readdirSync(dirPath: string): string[] \| null; @readdirsync
readdirSync
FileSystemManager.readdir 的同步版本
##### readdirSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的目录路径 (本地路径) | 

##### 返回值 

| 类型 | 必备 |
| :- | :- |
| Array&lt;string&gt; | 否 |
 

#### readZipEntry(options: ReadZipEntryOptions): void; @readzipentry
readZipEntry
读取压缩包内的文件
##### readZipEntry 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReadZipEntryOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的压缩包的路径 (本地路径)，app-android平台支持代码包文件目录 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一指定读取文件的字符编码，只在 entries 值为"all"时有效。<br/>4.31及以后版本如果 entries 值为 null 且不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |
| entries | Array&lt;**EntryItem**&gt; | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的压缩包内的文件列表（当不传入时表示读取压缩包内所有文件） |
| success | (res: [EntriesResult](#entriesresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 字符编码，默认值 |

##### entries 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 压缩包内文件路径 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定写入文件的字符编码<br/>支持:ascii base64 utf-8;4.31及以后版本如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容 |

###### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 字符编码，默认值 |

###### EntriesResult 的属性值 @entriesresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| entries | Map\<string, ZipFileItem> | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径 |
| ~~result~~ | Map\<string, ZipFileItem> | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |   **已废弃，使用 entries** |


#### rmdir(options: RmDirOptions): void; @rmdir
rmdir
删除目录
##### rmdir 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RmDirOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要删除的目录路径 (本地路径)<br/>删除特殊目录，只删除子，保留本身<br/>- uni.env.SANDBOX_PATH<br/>- uni.env.CACHE_PATH<br/>- uni.env.USER_DATA_PATH<br/>- uni.env.ANDROID_INTERNAL_SANDBOX_PATH<br/>其他创建的目录可以删除子和本身 |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### rmdirSync(dirPath: string, recursive: boolean): void; @rmdirsync
rmdirSync
FileSystemManager.rmdir 的同步版本
##### rmdirSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dirPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要删除的目录路径 (本地路径) |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。 | 


#### rename(options: RenameOptions): void; @rename
rename
重命名文件。可以把文件从 oldPath 移动到 newPath
##### rename 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RenameOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| oldPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源文件路径，支持本地路径 |
| newPath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 新文件路径，支持本地路径 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### renameSync(oldPath: string, newPath: string): void; @renamesync
renameSync
FileSystemManager.rename 的同步版本
##### renameSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| oldPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源文件路径，支持本地路径 |
| newPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 新文件路径，支持本地路径 | 


#### removeSavedFile(options: RemoveSavedFileOptions): void; @removesavedfile
removeSavedFile
删除该小程序下已保存的本地缓存文件
##### removeSavedFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RemoveSavedFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 需要删除的文件路径 (本地路径) |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### readCompressedFile(options: ReadCompressedFileOptions): void; @readcompressedfile
readCompressedFile
读取指定压缩类型的本地文件内容
##### readCompressedFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReadCompressedFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的文件的路径 (本地用户文件或代码包文件)，app-android平台支持代码包文件目录 |
| compressionAlgorithm | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件压缩类型，目前仅支持 'br'。 |
| success | (res: [ReadCompressedFileResult](#readcompressedfileresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### ReadCompressedFileResult 的属性值 @readcompressedfileresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


#### readCompressedFileSync(filePath: string, compressionAlgorithm: string): string @readcompressedfilesync
readCompressedFileSync
同步读取指定压缩类型的本地文件内容
##### readCompressedFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要读取的文件的路径 (本地用户文件或代码包文件)，app-android平台支持代码包文件目录 |
| compressionAlgorithm | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件压缩类型，目前仅支持 'br'。 | 

##### 返回值 

| 类型 |
| :- |
| string |
 

#### saveFile(options: SaveFileOptions): void; @savefile
saveFile
保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
##### saveFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SaveFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 临时存储文件路径 (本地路径) |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - 传入nil：默认保存到 uni.env.CACHE_PATH/uni-store/ 目录<br/>- 传入错误路径：比如无权限的路径，返回 error<br/>- 传入文件路径：如果上一级目录存在，保存到传入的路径，如存在则覆盖；如果上一级目录不存在，上上级目录也不存在，则先递归创建再保存<br/>- 传入filePath是目录路径且已存在，则返回错误码1300021<br/>- 传入filePath是文件路径且已存在，则覆盖写入<br/>- 判断传入路径尾部是否带斜线，如xxx/path、 xxx/path/，直接视为写入到path文件，如xxx/path/sub.txt 具体的是写入到具体的文件，path是目录 |
| success | (res: [SaveFileSuccessResult](#savefilesuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数，成功保存后删除临时文件 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### SaveFileSuccessResult 的属性值 @savefilesuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| savedFilePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 存储后的文件路径 (本地路径)。自 `4.71` 起，返回 `unifile://` 协议的路径<br/>参数filePath=nil, savedFilePath= unifile://cache/uni-store/xxx<br/>否则savedFilePath= unifile://cache/xxx/unifile://usr/xxx/unifile://sandbox/xxx |


#### saveFileSync(tempFilePath: string, filePath: string \| null): string; @savefilesync
saveFileSync
FileSystemManager.saveFile 的同步版本。自 `4.71` 起，返回 `unifile://` 协议的路径
##### saveFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 临时存储文件路径 (本地路径) |
| filePath | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要存储的文件路径 (本地路径)，文件已经存在时会直接覆盖  传入不存在的路径\ - App 端自动创建并保存 - 微信小程序会报错 | 

##### 返回值 

| 类型 |
| :- |
| string |
 

#### stat(options: StatOptions): void; @stat
stat
获取文件 Stats 对象
##### stat 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **StatOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件/目录路径 (本地路径) |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否递归获取目录下的每个文件的 Stats 信息 |
| success | (res: [StatSuccessResult](#statsuccessresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### StatSuccessResult 的属性值 @statsuccessresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| stats | Array&lt;**FileStats**&gt; | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 微信小程序规则：当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Array，数组的每一项是一个对象，每个对象包含 path 和 stats<br/>uniapp-x规则为避免返回值是联合类型，均返回数组，具体优化如下：<br/>-—— 当 path = 文件路径，返回数组，仅包含本身stats，返回 stats.path= ""<br/>-—— 当 path = 目录路径 && recursive = false，返回数组，仅包含本身stats，返回 stats.path= "/"<br/>-—— 当 path = 目录路径 && recursive = true，返回数组，包含本身stats和其递归子文件stats和目录文件stats |

#### stats 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件/目录路径（相对于传入路径） |
| stats | [Stats](#stats-values) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | Stats 对象，即描述文件状态的对象 |


#### statSync(path : string, recursive : boolean) : FileStats[]; @statsync
statSync
FileSystemManager.stat 的同步版本
##### statSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| path | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件/目录路径 (本地路径) |
| recursive | boolean | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否递归获取目录下的每个文件的 Stats 信息 | 

##### 返回值 

| 类型 |
| :- |
| Array&lt;[FileStats](#filestats-values)&gt; |
 

#### truncate(options: TruncateFileOptions): void; @truncate
truncate
对文件内容进行截断操作
##### truncate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **TruncateFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要截断的文件路径 (本地路径) |
| length | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；<br/>如果 length 大于文件长度，不做处理 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### truncateSync(filePath: string, length?: number): void; @truncatesync
truncateSync
对文件内容进行截断操作 (truncate 的同步版本)
##### truncateSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要截断的文件路径 (本地路径) |
| length | number | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 截断位置，默认0。如果 length 小于文件长度（字节），则只有前面 length 个字节会保留在文件中，其余内容会被删除；如果 length 大于文件长度，不做处理 | 


#### unlink(options: UnLinkOptions): void; @unlink
unlink
删除文件
##### unlink 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UnLinkOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，只支持绝对地址 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### unlinkSync(filePath: string): void; @unlinksync
unlinkSync
FileSystemManager.unlink 的同步版本
##### unlinkSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，只支持绝对地址 | 


#### unzip(options: UnzipFileOptions): void; @unzip
unzip
解压文件
##### unzip 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UnzipFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| zipFilePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源文件路径，支持本地路径, 只可以是 zip 压缩文件 |
| targetPath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 目标目录路径, 支持本地路径 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### writeFile(options: WriteFileOptions): void; @writefile
writeFile
写文件
##### writeFile 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **WriteFileOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | [string.URIString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，只支持绝对地址 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定写入文件的字符编码,<br/>支持:ascii base64 utf-8，默认值是 utf-8，仅在 data 类型是 String 时有效 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 写入的内容，类型为 String 或 ArrayBuffer，之前类型是string，iOS平台4.61及以后、Android平台4.31及以后支持ArrayBuffer类型 |
| success | (res: FileManagerSuccessResult) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 编码格式 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 编码格式 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 编码格式，默认值 |


#### writeFileSync(filePath: string, data: string \| ArrayBuffer, encoding?: string): void; @writefilesync
writeFileSync
FileSystemManager.writeFile 的同步版本
##### writeFileSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.51 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件路径，只支持绝对地址 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要写入的文本或二进制数据,Android平台4.31、iOS平台4.61及以后版本支持ArrayBuffer |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定写入文件的字符编码,支持:ascii base64 utf-8, 默认值是utf-8, 仅在 data 类型是 String 时有效 | 


#### write(options: WriteOptions): void; @write
write
写入文件
##### write 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **WriteOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 写入的内容，类型为 String 或 ArrayBuffer，以前类型是string，iOS平台4.61、Android平台4.31及以后支持ArrayBuffer |
| offset | number | 否 | 0 | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Android平台4.31及以后版本新增，只在 data 类型是 ArrayBuffer 时有效，决定 ArrayBuffer 中要被写入的部位，即 ArrayBuffer 中的索引，默认0 |
| length | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Android平台4.31及以后版本新增，只在 data 类型是 ArrayBuffer 时有效，指定要写入的字节数，默认为 ArrayBuffer 从0开始偏移 offset 个字节后剩余的字节数 |
| position | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Andorid平台4.31及以后版本新增，指定文件开头的偏移量，即数据要被写入的位置。当 position 不传或者传入非 Number 类型的值时，数据会被写入当前指针所在位置。 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 只在 data 类型是 String 时有效，指定写入文件的字符编码，默认为 utf8<br/>支持:ascii base64 utf-8 |
| success | (res: [WriteResult](#writeresult-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用的回调函数 |
| fail | (res: [FileSystemManagerFail](#filesystemmanagerfail-values)) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 字符编码，默认值 |

###### WriteResult 的属性值 @writeresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| bytesWritten | number | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 实际被写入到文件中的字节数（注意，被写入的字节数不一定与被写入的字符串字符数相同） |


#### writeSync(options: WriteSyncOptions): WriteResult; @writesync
writeSync
同步写入文件
##### writeSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | 4.41 | 4.13 | 4.61 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **WriteSyncOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fd | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 文件描述符。fd 通过 FileSystemManager.open 或 FileSystemManager.openSync 接口获得 |
| data | string \| [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.61; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 写入的内容，类型为 String 或 ArrayBuffer，以前类型是string，Android平台4.31、iOS平台4.61起支持ArrayBuffer类型 |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 只在 data 类型是 String 时有效，指定写入文件的字符编码，默认为 utf8<br/>支持:ascii base64 utf-8 |
| length | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 只在 data 类型是 ArrayBuffer 时有效，指定要写入的字节数，默认为 arrayBuffer 从0开始偏移 offset 个字节后剩余的字节数 ，4.31及以后版本新增 |
| offset | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 只在 data 类型是 ArrayBuffer 时有效，决定 arrayBuffe 中要被写入的部位，即 arrayBuffer 中的索引，默认0，4.31及以后版本新增 |
| position | number | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定文件开头的偏移量，即数据要被写入的位置。当 position 不传或者传入非 Number 类型的值时，数据会被写入当前指针所在位置。4.31及以后版本新增 | 

##### encoding 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ascii | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | ascii 字符编码 |
| base64 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | base64 字符编码 |
| utf-8 | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | utf-8 字符编码，默认值 |

##### 返回值 

| 类型 |
| :- |
| [WriteResult](#writeresult-values) |
 
 


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
    <button class="btnstyle" type="primary" @tap="getFileInfoTest"
      id="btn-get-file-info">获取文件信息{{data.getFileInfoFile}}</button>
    <button class="btnstyle" type="primary" @tap="unlinkTest" id="btn-unlink-file">删除文件{{data.unlinkFile}}</button>
    <button class="btnstyle" type="primary" @tap="unlinkAllFileTest"
      id="btn-clear-file">删除文件夹{{data.rmDirFile}}下的所有文件</button>
    <button class="btnstyle" type="primary" @tap="rmdirTest" id="btn-remove-dir">删除文件夹{{data.rmDirFile}}</button>

    <button class="btnstyle" type="primary" @tap="statFileInfoSyncTest"
      id="btn-stat-file-sync">同步递归获取目录files的Stats对象{{data.statFile}}</button>
    <button class="btnstyle" type="primary" @tap="appendFileTest"
      id="btn-append-file">在文件{{data.readFile}}结尾追加内容</button>
    <button class="btnstyle" type="primary" @tap="appendFileSyncTest"
      id="btn-append-file-sync">同步在文件{{data.readFile}}结尾追加内容</button>
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
    <button class="btnstyle" type="primary" @tap="accessFileSyncTest"
      id="btn-access-file-sync">同步判断文件{{data.accessFile}}是否存在</button>
    <button class="btnstyle" type="primary" @tap="renameFileSync"
      id="btn-rename-file-sync">同步重命名文件{{data.renameFromFile}}到{{data.renameToFile}}</button>
    <button class="btnstyle" type="primary" @tap="copyFileSyncTest"
      id="btn-copy-file-sync">同步复制文件{{data.copyFromFile}}到{{data.copyToFile}}</button>
    <button class="btnstyle" type="primary" @tap="removeSavedFileTest" id="btn-remove-saved-file">删除已保存的本地文件</button>
    <button class="btnstyle" type="primary" @tap="getSavedFileListTest"
      id="btn-getsaved-filelist">获取该已保存的本地缓存文件列表</button>
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
    <button class="btnstyle" type="primary" @tap="unzipFileTest" id="btn-unzip-file-sync">解压文件</button>
    <button class="btnstyle" type="primary" @tap="truncateFileSyncTest"
      id="btn-truncate-file-sync">同步对文件{{data.writeFile}}内容进行截断操作</button>
    <button class="btnstyle" type="primary" @tap="readCompressedFileTest"
      id="btn-compressed-file">读取指定压缩类型的本地文件内容</button>
    <button class="btnstyle" type="primary" @tap="readCompressedFileSyncTest"
      id="btn-compressed-file-sync">同步读取指定压缩类型的本地文件内容</button>
    <button class="btnstyle" type="primary" @tap="readZipEntry" id="btn-readzip-entry">读取压缩包内的文件</button>
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
    <button class="btnstyle" type="primary" @tap="getFileInfoByContent">getFileInfo(content://)</button>

    <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="gotoExplore()">前往沙盒文件管理器</button>
    <button class="btnstyle" type="primary" @tap="gotoTestStatic()">前往Static文件测试</button>

    <view style="height: 4px;"></view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type DataType = {
    log : string
    logAble : boolean
    fileListSuccess : string[]
    fileListComplete : string[]
    accessFileRet : string
    lastFailError : UniError
    lastCompleteError : UniError
    readDir : string
    readFileRet : string
    writeFileContent : string
    appendFileContent : string
    getFileInfoAlgorithm : string
    getFileInfoSize : number
    getFileInfoDigest : string
    unlinkFile : string
    accessFile : string
    writeFile : string
    writeData : string
    brFile : string
    temFile : string
    copyFromFile : string
    copyToFile : string
    renameFromFile : string
    renameToFile : string
    getFileInfoFile : string
    statFile : string
    rmDirFile : string
    mkdirFile : string
    readFile : string
    recursiveVal : boolean
    done : boolean
    writeFileEncoding : string
    readFileEncoding : string
    statsRet : Array<FileStats>
    unzipFile : string
    targetZip : string
    renameFileRet : string
    saveFileRet : string
    removeSavedFileRet : string
    fd : string
    closeFileRet : string
    bytesWritten : number
    fstat : Stats | null
    fstatSize : number
    ftruncateRet : string
    readZipFile : string
    getSavedFileListRet : string
    arrayBufferRes : number
    basePath : string
    copyToBasePath : string
    globalTempPath : string
    globalRootPath : string
    globalUserDataPath : string
    testOpenFlataplusWrite:boolean
  }

  const data = reactive({
    log: "",
    /**
     * 自动化测试需要关闭log
     */
    logAble: true,
    fileListSuccess: [] as string[],
    fileListComplete: [] as string[],
    accessFileRet: '',
    lastFailError: new UniError("uni-file-manager", 1300000, "mock error"),
    lastCompleteError: new UniError("uni-file-manager", 1300000, "mock error"),
    readDir: 'a',
    readFileRet: "",
    writeFileContent: "中文 en.\r\n\t换行",
    appendFileContent: "append content",
    getFileInfoAlgorithm: "md5",
    getFileInfoSize: -1,
    getFileInfoDigest: "",
    unlinkFile: 'a/1.txt',
    accessFile: 'a/1.txt',
    writeFile: 'a/1.txt',
    writeData: 'insert data哈哈哈',
    brFile: 'a/1.txt.br',
    temFile: 'a/1.txt',
    copyFromFile: 'a/1.txt',
    copyToFile: 'a/2.txt',
    renameFromFile: 'a/2.txt',
    renameToFile: 'a/3.txt',
    getFileInfoFile: 'a/1.txt',
    statFile: '',
    rmDirFile: 'a',
    mkdirFile: 'a',
    readFile: 'a/1.txt',
    recursiveVal: true,
    done: false,
    writeFileEncoding: "utf-8",
    readFileEncoding: "utf-8",
    statsRet: [] as Array<FileStats>,
    unzipFile: 'zip/1.zip',
    targetZip: "unzip",
    renameFileRet: '',
    saveFileRet: '',
    removeSavedFileRet: '',
    fd: '',
    closeFileRet: '',
    bytesWritten: 0,
    fstat: null as Stats | null,
    fstatSize: 0,
    ftruncateRet: '',
    readZipFile: 'to.zip',
    getSavedFileListRet: '',
    arrayBufferRes: 0,
    testOpenFlataplusWrite:false,
    /**
     * 待测试的全局环境变量
     */
    // #ifdef MP-WEIXIN
    basePath: uni.env.USER_DATA_PATH + '/',
    copyToBasePath: uni.env.USER_DATA_PATH + '/',
    // TODO uni.env类型拉齐
    globalTempPath: uni.env.CACHE_PATH || '',
    globalRootPath: uni.env.SANDBOX_PATH || '',
    globalUserDataPath: uni.env.USER_DATA_PATH + '/',
    // #endif
    // #ifndef MP-WEIXIN
    basePath: uni.env.USER_DATA_PATH,
    copyToBasePath: uni.env.USER_DATA_PATH,
    globalTempPath: uni.env.CACHE_PATH,
    globalRootPath: uni.env.SANDBOX_PATH,
    globalUserDataPath: uni.env.USER_DATA_PATH,
    // #endif
  } as DataType)

  const statFileInfoTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    fileManager.stat({
      path: `${data.basePath}${data.statFile}`, //USER_DATA_PATH
      // path: `${data.globalTempPath}${data.statFile}`, //CACHE_PATH
      recursive: data.recursiveVal,
      success: (res : StatSuccessResult) => {
        if (data.logAble) {
          data.log += 'statFileInfoTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('statFileInfoTest success', res)
        data.statsRet = res.stats
        console.log('data.statsRet', data.statsRet)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'statFileInfoTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('statFileInfoTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("statFileInfoTest complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as StatOptions)
  }

  const getFileInfoTest = () => {
    const fileManager = uni.getFileSystemManager()

    fileManager.getFileInfo({
      filePath: `${data.basePath}${data.getFileInfoFile}`,
      digestAlgorithm: data.getFileInfoAlgorithm,
      success: (res : GetFileInfoSuccessResult) => {
        if (data.logAble) {
          data.log += 'getFileInfoTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.getFileInfoSize = res.size
        data.getFileInfoDigest = res.digest
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'getFileInfoTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as GetFileInfoOptions)
  }
  const copyFileTest = () => {
    const fileManager = uni.getFileSystemManager()

    fileManager.copyFile({
      srcPath: `${data.basePath}${data.copyFromFile}`,
      destPath: `${data.copyToBasePath}${data.copyToFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'copyFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'copyFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as CopyFileOptions)
  }

  const renameFileTest = () => {
    const fileManager = uni.getFileSystemManager()

    fileManager.rename({
      oldPath: `${data.basePath}${data.renameFromFile}`,
      newPath: `${data.basePath}${data.renameToFile}`,
      success: (res) => {
        if (data.logAble) {
          data.log += 'renameFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.renameFileRet = "rename:ok"
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'renameFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        data.done = true
        console.log("complete", res)
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as RenameOptions)
  }

  const readDirTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.readdir({
      dirPath: `${data.basePath}${data.readDir}`,
      success: (res : ReadDirSuccessResult) => {
        if (data.logAble) {
          data.log += 'readDirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fileListSuccess = res.files
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readDirTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        } else {
          data.fileListComplete = (res as ReadDirSuccessResult).files
        }
      }
    } as ReadDirOptions)
  }

  const writeFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()

    fileManager.writeFile({
      filePath: `${data.basePath}${data.writeFile}`,
      data: data.writeFileContent,
      encoding: data.writeFileEncoding,
      success: (res) => {
        if (data.logAble) {
          data.log += 'writeFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'writeFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail')
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        data.done = true
        console.log("complete")
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }

      }
    } as WriteFileOptions)
  }

  const readFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.readFile({
      filePath: `${data.basePath}${data.readFile}`,
      encoding: data.readFileEncoding,
      success: (res : ReadFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'readFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.readFileRet = res.data.toString()
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as ReadFileOptions)
  }

  const rmdirTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.rmdir({
      dirPath: `${data.basePath}${data.rmDirFile}`,
      recursive: data.recursiveVal,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'rmdirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'rmdirTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as RmDirOptions)
  }

  const mkdirTest = () => {
    // 准备测试数据
    const fileManager = uni.getFileSystemManager()

    fileManager.mkdir({
      dirPath: `${data.basePath}${data.mkdirFile}`,
      recursive: data.recursiveVal,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'mkdirTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'mkdirTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        data.done = true
        console.log("complete", res)
      }
    } as MkDirOptions)

  }
  const accessFileTest = () => {
    data.accessFileRet = ''
    const fileManager = uni.getFileSystemManager()
    fileManager.access({
      path: `${data.basePath}${data.accessFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'accessFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.accessFileRet = res.errMsg
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'accessFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        console.log("complete", res)
        data.done = true
      }
    } as AccessOptions)

  }
  const unlinkTest = () => {
    const fileManager = uni.getFileSystemManager()

    fileManager.unlink({
      filePath: `${data.basePath}${data.unlinkFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'unlinkTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unlinkTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
        console.log("complete", res)
        data.done = true
      }
    } as UnLinkOptions)
  }
  const unlinkAllFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.readdir({
      dirPath: `${data.basePath}${data.rmDirFile}`,
      success: (res : ReadDirSuccessResult) => {
        console.log("success to readdir", res)
        res.files.forEach(element => {
          console.log(element)
          let filePath : string
          if (data.rmDirFile.length <= 0) {
            filePath = `${data.basePath}${element}`
          } else {
            filePath = `${data.basePath}${data.rmDirFile}/${element}`
          }
          fileManager.unlink({
            filePath: filePath,
            success: (res : FileManagerSuccessResult) => {
              if (data.logAble) {
                data.log += 'unlinkAllFileTest success:' + JSON.stringify(res) + '\n\n'
              }
              console.log('success unlink', res)
            },
            fail: (res : IUniError) => {
              if (data.logAble) {
                data.log += 'unlinkAllFileTest fail:' + JSON.stringify(res) + '\n\n'
              }
              console.log('fail unlink', res)
              data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

            },
            complete: (res : any) => {
              if (res instanceof UniError) {
                data.lastCompleteError = res
              }
              console.log("complete unlink", res)
              data.done = true
            }
          } as UnLinkOptions)
        });
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unlinkAllFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail to readdir', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete readdir", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        } else {
          data.fileListComplete = (res as ReadDirSuccessResult).files
        }
      }
    } as ReadDirOptions)
  }
  const copyStaticToFilesTest = () => {
    const fileManager = uni.getFileSystemManager()

    fileManager.copyFile({
      srcPath: "/static/list-mock/mock.json",
      destPath: `${data.copyToBasePath}/a/mock.json`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'copyFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'copyFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as CopyFileOptions)
  }
  //start
  const appendFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    fileManager.appendFile({
      filePath: `${data.basePath}${data.writeFile}`,
      data: data.appendFileContent,
      encoding: data.writeFileEncoding,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'appendFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'appendFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail')
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        data.done = true
        console.log("complete")
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }

      }
    } as AppendFileOptions)
  }
  const writeFileSyncTest = (_ : any) => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.writeFileSync(`${data.basePath}${data.writeFile}`, data.writeFileContent, data.writeFileEncoding)
      if (data.logAble) {
        data.log += 'writeFileSyncTest success:' + '\n\n'
      }
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'writeFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const readFileSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      let result = fileManager.readFileSync(
        `${data.basePath}${data.readFile}`,
        data.readFileEncoding)
      if (data.logAble) {
        data.log += 'readFileSyncTest result:' + result + '\n\n'
      }
      data.done = true
      data.readFileRet = result.toString()
    } catch (e) {
      if (data.logAble) {
        data.log += 'readFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const unlinkSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.unlinkSync(
        `${data.basePath}${data.unlinkFile}`)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'unlinkSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const mkdirSyncTest = () => {
    // 准备测试数据
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, data.recursiveVal)
      data.done = true
    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'mkdirSyncTest fail:' + e + '\n\n'
      }
    }

  }
  const rmdirSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      fileManager.rmdirSync(
        `${data.basePath}${data.rmDirFile}`,
        data.recursiveVal)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const readDirSyncTest = () => {
    try {
      const fileManager = uni.getFileSystemManager()
      let res = fileManager.readdirSync(
        `${data.basePath}${data.readDir}`)
      if (data.logAble) {
        data.log += 'readDirTest success:' + JSON.stringify(res) + '\n\n'
      }
      if (res != null) {
        data.fileListSuccess = res
      }
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const accessFileSyncTest = () => {
    data.accessFileRet = ''
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.accessSync(`${data.basePath}${data.accessFile}`)
      data.done = true
      data.accessFileRet = 'access:ok'
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const renameFileSync = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.renameSync(`${data.basePath}${data.renameFromFile}`,
        `${data.basePath}${data.renameToFile}`)
      data.done = true
      data.renameFileRet = "rename:ok"

    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      console.log('renameSync:' + e)
      data.done = true
    }
  }
  const copyFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.copyFileSync(
        `${data.basePath}${data.copyFromFile}`,
        `${data.copyToBasePath}${data.copyToFile}`)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }
  const appendFileSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.appendFileSync(
        `${data.basePath}${data.writeFile}`,
        data.appendFileContent,
        data.writeFileEncoding)
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'rmdirSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }
  }

  const saveFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    fileManager.saveFile({
      tempFilePath: `${data.basePath}${data.temFile}`,
      success: (res : SaveFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
        data.saveFileRet = res.savedFilePath
        data.done = true
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('saveFileTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      },
      complete: (_) => {
        data.done = true
      }
    } as SaveFileOptions)
  }

  const saveFileAndReadFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")

    fileManager.saveFile({
      tempFilePath: `${data.basePath}${data.temFile}`,
      success: (res : SaveFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        fileManager.readFile({
          encoding: 'utf-8',
          filePath: res.savedFilePath,
          success: (res) => {
            data.log += 'saveFileAndReadFileTest 成功:' + JSON.stringify(res.data) + '\n\n'
            console.log('success', res)
            data.readFileRet = 'saveFileAndReadFileTest:ok'
            data.done = true
          },
          fail: (err) => {
            data.log += 'saveFileAndReadFileTest 失败:' + JSON.stringify(err.errMsg) + '\n\n'
            data.done = true
          }
        })

      },

      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('saveFileTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      },
      complete: (_) => {
        data.done = true
      }
    } as SaveFileOptions)
  }

  const saveFileTest1 = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    fileManager.access({
      path: `${data.basePath}local`,
      success: () => {
        if (fileManager.fstatSync({ fd: fileManager.openSync({ filePath: `${data.basePath}local`, flag: "r" }) }).isDirectory()) {
          fileManager.rmdirSync(`${data.basePath}local`, true)
        } else {
          fileManager.unlinkSync(`${data.basePath}local`)
        }
        fileManager.saveFile({
          tempFilePath: `${data.basePath}${data.temFile}`,
          filePath: `${data.basePath}local/1.txt`,
          success: (res : SaveFileSuccessResult) => {
            if (data.logAble) {
              data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
            }
            console.log('success', res)
            data.saveFileRet = res.savedFilePath
            data.done = true
          },
          fail: (res : IUniError) => {
            if (data.logAble) {
              data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
            }
            console.log('saveFileTest fail', res)
            data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

            data.done = true
          },
          complete: (_) => {
            data.done = true
          }
        } as SaveFileOptions)
      },
      fail: () => {
        fileManager.saveFile({
          tempFilePath: `${data.basePath}${data.temFile}`,
          filePath: `${data.basePath}local/1.txt`,
          success: (res : SaveFileSuccessResult) => {
            if (data.logAble) {
              data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
            }
            console.log('success', res)
            data.saveFileRet = res.savedFilePath
            data.done = true
          },
          fail: (res : IUniError) => {
            if (data.logAble) {
              data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
            }
            console.log('saveFileTest fail', res)
            data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

            data.done = true
          },
          complete: (_) => {
            data.done = true
          }
        } as SaveFileOptions)
      }
    })
  }
  const saveFileTest2 = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    fileManager.access({
      path: `${data.basePath}local`,
      success: () => {
        if (fileManager.fstatSync({ fd: fileManager.openSync({ filePath: `${data.basePath}local`, flag: "r" }) }).isDirectory()) {
          fileManager.rmdirSync(`${data.basePath}local`, true)
        } else {
          fileManager.unlinkSync(`${data.basePath}local`)
        }
        fileManager.saveFile({
          tempFilePath: `${data.basePath}${data.temFile}`,
          filePath: `${data.basePath}local`,
          success: (res : SaveFileSuccessResult) => {
            if (data.logAble) {
              data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
            }
            console.log('success', res)
            data.saveFileRet = res.savedFilePath
            data.done = true
          },
          fail: (res : IUniError) => {
            if (data.logAble) {
              data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
            }
            console.log('saveFileTest fail', res)
            data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

            data.done = true
          },
          complete: (_) => {
            data.done = true
          }
        } as SaveFileOptions)
      }
    })
  }
  const saveFileTest3 = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    fileManager.access({
      path: `${data.basePath}local`,
      success: () => {
        if (fileManager.fstatSync({ fd: fileManager.openSync({ filePath: `${data.basePath}local`, flag: "r" }) }).isDirectory()) {
          fileManager.rmdirSync(`${data.basePath}local`, true)
        } else {
          fileManager.unlinkSync(`${data.basePath}local`)
        }

        fileManager.saveFile({
          tempFilePath: `${data.basePath}${data.temFile}`,
          filePath: `${data.basePath}local/`,
          success: (res : SaveFileSuccessResult) => {
            if (data.logAble) {
              data.log += 'saveFileTest success:' + JSON.stringify(res) + '\n\n'
            }
            console.log('success', res)
            data.saveFileRet = res.savedFilePath
            data.done = true
          },
          fail: (res : IUniError) => {
            if (data.logAble) {
              data.log += 'saveFileTest fail:' + JSON.stringify(res) + '\n\n'
            }
            console.log('saveFileTest fail', res)
            data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
            data.done = true
          },
          complete: (_) => {
            data.done = true
          }
        } as SaveFileOptions)
      }
    })
  }
  const saveFileSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    writeFileSyncTest("")
    try {
      fileManager.saveFileSync(
        `${data.basePath}${data.temFile}`, null)
      data.done = true

      //todo 后面打开
      // data.saveFileRet=res
    } catch (e) {
      console.log('saveFileSyncTest:' + e)
      data.done = true
    }
  }
  const unzipFileTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.targetZip}`, true)
    } catch (e) {
      console.error(e)
    }
    fileManager.unzip({
      zipFilePath: '/static/filemanager/to.zip',
      targetPath: `${data.basePath}${data.targetZip}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'unzipFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log('success', res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'unzipFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    } as UnzipFileOptions)
  }

  const getSavedFileListTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.getSavedFileList({
      success: (res : GetSavedFileListResult) => {
        if (data.logAble) {
          data.log += 'getSavedFileListTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("getSavedFileListTest success", res)
        data.fileListSuccess = res.fileList
        data.getSavedFileListRet = "getSavedFileList:ok"
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'getSavedFileListTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('getSavedFileListTest fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.getSavedFileListRet = JSON.stringify(res)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        } else {
          data.fileListComplete = (res as GetSavedFileListResult).fileList
        }
      }
    } as GetSavedFileListOptions)
  }
  const truncateFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.truncate({
      filePath: `${data.basePath}${data.writeFile}`,
      length: 6,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'truncateFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'truncateFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as TruncateFileOptions)
  }
  const truncateFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.truncateSync(
        `${data.basePath}${data.writeFile}`,
        3)
      data.done = true
    } catch (e) {
      console.log(e)
      data.done = true
    }
  }
  const readCompressedFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.readCompressedFile({
      filePath: '/static/filemanager/1.txt.br',
      compressionAlgorithm: "br",
      success: (res : ReadCompressedFileResult) => {
        if (data.logAble) {
          data.log += 'readCompressedFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readCompressedFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    } as ReadCompressedFileOptions)
  }
  const readCompressedFileSyncTest = () => {
    console.log('readCompressedFileSyncTest')
    const fileManager = uni.getFileSystemManager()
    try {
      let result = fileManager.readCompressedFileSync(
        '/static/filemanager/1.txt.br',
        "br")
      if (data.logAble) {
        data.log += result
      }
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'readCompressedFileSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const removeSavedFileTest = () => {
    console.log("removeSavedFileTest enter")
    const fileManager = uni.getFileSystemManager()
    fileManager.removeSavedFile({
      filePath: `${data.basePath}${data.writeFile}`,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'removeSavedFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.removeSavedFileRet = res.errMsg
        console.log("removeSavedFileTest success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'removeSavedFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('removeSavedFileTest fail', res)
      },
      complete: (_) => {
        data.done = true
      }
    } as RemoveSavedFileOptions)
  }

  const statFileInfoSyncTest = (_ : any) => {
    const fileManager = uni.getFileSystemManager()
    try {
      let res = fileManager.statSync(
        // path: `${data.basePath}${data.statFile}`, //USER_DATA_PATH
        `${data.globalTempPath}${data.statFile}`, //CACHE_PATH
        data.recursiveVal)
      if (data.logAble) {
        data.log += 'statFileInfoSyncTest success:' + JSON.stringify(res) + '\n\n'
      }
      data.statsRet = res
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'statFileInfoSyncTest fail:' + e + '\n\n'
      }
      data.done = true
    }

  }
  const openFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.open({
      filePath: `${data.basePath}${data.readFile}`,
      flag: "a",
      success: (res : OpenFileSuccessResult) => {
        if (data.logAble) {
          data.log += 'openFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fd = res.fd
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'openFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }
    } as OpenFileOptions)
  }
  const openFileSyncTest = (param : string, isTest : boolean) : string => {
    const fileManager = uni.getFileSystemManager()
    try {
      let fd = fileManager.openSync({
        filePath: `${data.basePath}${data.readFile}`,
        flag: param,
      } as OpenFileSyncOptions)
      if (data.logAble && isTest) {
        data.log += 'openFileSyncTest success:' + fd + '\n\n'
      }
      if (isTest) {
        data.done = true
      }

      data.fd = fd
      return fd
    } catch (e) {
      if (data.logAble) {
        data.log += 'openFileSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      console.log('fail', e)
      data.done = true
    }
    return ""
  }
  const closeSyncTest = () => {
    console.log('closeSyncTest')
    const fileManager = uni.getFileSystemManager()
    try {
      console.log('closeSync')
      fileManager.closeSync({
        fd: openFileSyncTest('r', false)
      } as CloseSyncOptions)
      if (data.logAble) {
        data.log += 'closeSyncTest success:' + '\n\n'
      }
      data.done = true
      data.closeFileRet = "close:ok"
    } catch (e) {
      if (data.logAble) {
        data.log += 'closeSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      console.log('fail', e)
      data.done = true
    }
  }
  const closeTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.close({
      fd: openFileSyncTest('r', false),
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'closeTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.closeFileRet = res.errMsg
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'closeTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    } as CloseOptions)
  }
  const writeTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.error(e)
    }

    fileManager.write({
      fd: openFileSyncTest('w+', false),
      data: data.writeData,
      encoding: "utf-8",
      success: (res : WriteResult) => {
        if (data.logAble) {
          data.log += 'writeTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.bytesWritten = res.bytesWritten
        data.lastFailError = new UniError('uni-fileSystemManager', 0, 'writeTest success:' + JSON.stringify(res))
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'writeTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, 'writeTest:' + res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    } as WriteOptions)
  }
  const writeSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.error(e)
    }
    fileManager.open({
      filePath: `${data.basePath}${data.readFile}`,
      flag: "r+",
      success: (res : OpenFileSuccessResult) => {
        console.log("success", res)
        if (res.fd.length <= 0) {
          data.done = true
          return
        }
        try {
          let ret = fileManager.writeSync({
            fd: res.fd,
            data: data.writeData,
            encoding: "utf-8"
          } as WriteSyncOptions)
          if (data.logAble) {
            data.log += 'writeSyncTest success:' + JSON.stringify(ret) + '\n\n'
          }
          console.log("success", ret)
          data.done = true
          data.bytesWritten = ret.bytesWritten
        } catch (e) {
          if (data.logAble) {
            data.log += 'writeSyncTest fail:' + JSON.stringify(e) + '\n\n'
          }
          console.log('fail', e)
          data.done = true
        }
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'openFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        data.done = true
      }
    } as OpenFileOptions)

  }
  const fstatTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.fstat({
      fd: openFileSyncTest('r', false),
      success: (res : FStatSuccessResult) => {
        if (data.logAble) {
          data.log += 'fstatTest success:' + JSON.stringify(res) + '\n\n'
        }
        console.log("success", res)
        data.fstat = res.stats
        data.fstatSize = res.stats.size
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'fstatTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (_) => {
        data.done = true
      }

    } as FStatOptions)
  }
  const fstatSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      let stat =
        fileManager.fstatSync({
          fd: openFileSyncTest('r', false),
        } as FStatSyncOptions)
      if (data.logAble) {
        data.log += 'fstatSyncTest success:' + JSON.stringify(stat) + '\n\n'
      }
      data.done = true
      data.fstat = stat
      data.fstatSize = stat.size
    } catch (e) {
      if (data.logAble) {
        data.log += 'fstatSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }
  const ftruncateFileTest = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.ftruncate({
      fd: openFileSyncTest('r+', false),
      length: 6,
      success: (res : FileManagerSuccessResult) => {
        if (data.logAble) {
          data.log += 'ftruncateFileTest success:' + JSON.stringify(res) + '\n\n'
        }
        data.ftruncateRet = res.errMsg
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'ftruncateFileTest fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as FTruncateFileOptions)
  }
  const ftruncateFileSyncTest = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.ftruncateSync({
        fd: openFileSyncTest('r+', false),
        length: 4
      } as FTruncateFileSyncOptions)
      if (data.logAble) {
        data.log += 'ftruncateFileSyncTest success:' + '\n\n'
      }
      data.done = true
      data.ftruncateRet = 'ftruncate:ok'
    } catch (e) {
      if (data.logAble) {
        data.log += 'ftruncateFileSyncTest fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }
  const readZipEntry = () => {
    const fileManager = uni.getFileSystemManager()
    fileManager.readZipEntry({
      filePath: '/static/filemanager/to.zip',
      encoding: 'utf-8',
      success: (res : EntriesResult) => {
        if (data.logAble) {
          data.log += 'readZipEntry success:size=' + res.result + '\n\n'
        }
        console.log("success", res)
      },
      fail: (res : IUniError) => {
        if (data.logAble) {
          data.log += 'readZipEntry fail:' + JSON.stringify(res) + '\n\n'
        }
        console.log('fail', res)
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

      }
    } as ReadZipEntryOptions)
  }

  const testReadFileBuffer = () => {
    const fs = uni.getFileSystemManager()
    fs.readFile({
      filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,

      success: (res) => {

        console.log(res)
        // let uint8Array = new Uint8Array(res.data as ArrayBuffer)
        // for (let i = 0; i < uint8Array.length; i++) {
        // 	console.log(`Byte ${i}: ${uint8Array[i]}`);
        // }
        let float64 = new Float64Array(res.data as ArrayBuffer)
        if (data.logAble) {
          for (let i = 0; i < float64.length; i++) {
            if (data.logAble) {
              data.log += 'testReadFileBuffer success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
            }
          }
        }
        data.arrayBufferRes = float64[1] //1.2222222
        console.log(data.arrayBufferRes)
      },
      fail: (res) => {
        if (data.logAble) {
          data.log += 'testReadFileBuffer fail:' + JSON.stringify(res) + '\n\n'
        }
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)
        console.error(res)
      },
      complete: (res : any) => {
        console.log("complete", res)
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      }
    } as ReadFileOptions)
  }

  const testWriteReadFileBuffer = () => {
    const fs = uni.getFileSystemManager()
    let buffer = new ArrayBuffer(16)
    let float64 = new Float64Array(buffer)
    float64[1] = 1.2222222
    let that = this
    fs.writeFile({
      filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
      // data: 'test some',
      data: buffer,
      // encoding: 'ascii',
      success: (res) => {
        if (data.logAble) {
          data.log += 'testWriteReadFileBuffer ：' + res.errMsg + '\n\n'
        }
        console.log(res)
        // that.testAppendFile()
        testReadFileBuffer()
      },
      fail: (res) => {
        if (data.logAble) {
          data.log += 'testWriteReadFileBuffer fail:' + JSON.stringify(res) + '\n\n'
        }
        data.lastFailError = new UniError(res.errSubject, res.errCode, res.errMsg)

        console.error(res)
        data.done = true
      },
      complete: (_ : any) => {

      }
    } as WriteFileOptions)
  }

  const testReadFileSyncBuffer = () => {
    try {
      const fs = uni.getFileSystemManager()
      let res = fs.readFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, null)
      console.log(res)
      let float64 = new Float64Array(res as ArrayBuffer)
      for (let i = 0; i < float64.length; i++) {
        if (data.logAble) {
          data.log += 'testReadFileSyncBuffer success:' + `Byte ${i}: ${float64[i]}` + '\n\n'
        }
        console.log(`Byte ${i}: ${float64[i]}`);
      }
      data.arrayBufferRes = float64[1] // 1.333
      console.log(data.arrayBufferRes)
    } catch (e) {
      if (data.logAble) {
        data.log += 'testReadFileSyncBuffer fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }

  const testWriteReadFileSyncBuffer = () => {
    try {
      const fs = uni.getFileSystemManager()
      let buffer = new ArrayBuffer(16)
      // let int8 = new Int8Array(buffer)
      // int8[1] = 20
      let float64 = new Float64Array(buffer)
      float64[1] = 1.333
      fs.writeFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, buffer, 'utf-8')
      if (data.logAble) {
        data.log += 'testWriteReadFileSyncBuffer success' + '\n\n'
      }
      testReadFileSyncBuffer()
      data.done = true
    } catch (e) {
      if (data.logAble) {
        data.log += 'testWriteReadFileSyncBuffer fail:' + JSON.stringify(e) + '\n\n'
      }
      data.done = true
    }
  }

  const testWriteReadBuffer = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
      console.error(e)
    }

    let buffer = new ArrayBuffer(24)
    let float64 = new Float64Array(buffer)
    float64[1] = 1.24
    float64[2] = 1.33

    fileManager.write({
      fd: openFileSyncTest('w+', false),
      length: 16,
      offset: 8,
      data: buffer,
      position: 10,
      success: (res : WriteResult) => {
        console.log("success", res)

        const ab = new ArrayBuffer(24)
        fileManager.read({
          arrayBuffer: ab,
          fd: openFileSyncTest('a+', false),
          length: 8,
          position: 10,
          success: (res : ReadSuccessCallbackResult) => {
            console.log(res)
            let value = new Float64Array(res.arrayBuffer)
            for (let i = 0; i < value.length; i++) {
              console.log(`Byte ${i}: ${value[i]}`);
              if (data.logAble) {
                data.log += 'testWriteReadBuffer success:' + `Byte ${i}: ${value[i]}` + '\n\n'
              }
            }
            data.arrayBufferRes = value[0] //1.24
            console.log(data.arrayBufferRes)
          },
          fail: (res) => {
            console.log(res)
            data.done = true
            if (res instanceof UniError) {
              data.lastCompleteError = res
            }
          },
          complete: (res : any) => {
            console.log("complete", res)
            data.done = true
            if (res instanceof UniError) {
              data.lastCompleteError = res
            }
          }
        } as ReadOption)
      },
      fail: (res : IUniError) => {
        data.done = true
        if (res instanceof UniError) {
          data.lastCompleteError = res
        }
      },
      complete: (_) => {

      }

    } as WriteOptions)
  }
  const testWriteReadSyncBuffer = () => {
    const fileManager = uni.getFileSystemManager()
    try {
      fileManager.mkdirSync(`${data.basePath}${data.mkdirFile}`, true)
    } catch (e) {
    }
    try {

      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.11
      float64[2] = 1.33
      let ret = fileManager.writeSync({
        fd: openFileSyncTest('w+', false),
        // data: data.writeData,
        data: buffer,
        length: 16,
        offset: 8,
        position: 10,
        encoding: "utf-8"
      } as WriteSyncOptions)
      console.log("success", ret)

      const ab = new ArrayBuffer(24)
      let res = fileManager.readSync({
        arrayBuffer: ab,
        fd: openFileSyncTest('a+', false),
        length: 8,
        offset: 8,
        position: 10
      } as ReadSyncOption)
      console.log(res)
      let value = new Float64Array(res.arrayBuffer)
      for (let i = 0; i < value.length; i++) {
        if (data.logAble) {
          data.log += 'testWriteReadSyncBuffer success ：' + `Byte ${i}: ${value[i]}` + '\n\n'
        }
      }
      data.done = true
      data.arrayBufferRes = float64[1] //1.11
      console.log(data.arrayBufferRes)
    } catch (e) {
      data.done = true
      console.error(e)
    }
  }


  const testAppendFileBufferSync = () => {
    // 同步接口
    const fs = uni.getFileSystemManager()
    try {
      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.2222222
      float64[2] = 1.33
      let ret = fs.writeSync({
        fd: fs.openSync({ filePath: `${uni.env.USER_DATA_PATH}/hello.txt`, flag: 'w+' } as OpenFileSyncOptions),
        data: buffer,
        length: 16,
        offset: 8,
        position: 10
      } as WriteSyncOptions)
      console.log(ret)


      buffer = new ArrayBuffer(16)
      float64 = new Float64Array(buffer)
      float64[0] = 20
      fs.appendFileSync(`${uni.env.USER_DATA_PATH}/hello.txt`, buffer, null)
      const ab = new ArrayBuffer(32)
      // 打开文件
      // 读取文件到 ArrayBuffer 中
      let readResult = fs.readSync({
        fd: fs.openSync({
          filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
          flag: 'a+',
        } as OpenFileSyncOptions),
        arrayBuffer: ab,
        length: 24,
        position: 10,
        offset: 8
      } as ReadSyncOption)
      console.log(readResult)
      float64 = new Float64Array(readResult.arrayBuffer)

      for (let i = 0; i < float64.length; i++) {
        if (data.logAble) {
          data.log += 'testAppendFileBufferSync success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
        }
        console.log(`Byte ${i}: ${float64[i]}`);
      }
      data.arrayBufferRes = float64[3] //20
      console.log(data.arrayBufferRes)
      data.done = true
    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'testAppendFileBufferSync fail:' + JSON.stringify(e) + '\n\n'
      }
      console.error(e)
    }
  }

  const testAppendFileBuffer = () => {
    // 同步接口
    const fs = uni.getFileSystemManager()
    try {
      let buffer = new ArrayBuffer(24)
      let float64 = new Float64Array(buffer)
      float64[1] = 1.2222222
      float64[2] = 1.33
      let ret = fs.writeSync({
        fd: fs.openSync({ filePath: `${uni.env.USER_DATA_PATH}/hello.txt`, flag: 'w+' } as OpenFileSyncOptions),
        data: buffer,
        length: 16,
        offset: 8,
        position: 10
      } as WriteSyncOptions)
      console.log(ret)

      buffer = new ArrayBuffer(16)
      float64 = new Float64Array(buffer)
      float64[0] = 21
      fs.appendFile({
        filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
        data: buffer,
        success: (res) => {
          console.log(res)
          const ab = new ArrayBuffer(32)
          // 打开文件
          // 读取文件到 ArrayBuffer 中
          let readResult = fs.readSync({
            fd: fs.openSync({
              filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
              flag: 'a+',
            } as OpenFileSyncOptions),
            arrayBuffer: ab,
            length: 24,
            position: 10,
            offset: 8
          } as ReadSyncOption)
          console.log(readResult)
          float64 = new Float64Array(readResult.arrayBuffer)

          for (let i = 0; i < float64.length; i++) {
            console.log(`Byte ${i}: ${float64[i]}`);
            if (data.logAble) {
              data.log += 'testAppendFileBuffer success ：' + `Byte ${i}: ${float64[i]}` + '\n\n'
            }
          }
          data.arrayBufferRes = float64[3] //21
          console.log(data.arrayBufferRes)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (_) => {
          data.done = true
        }
      } as AppendFileOptions)

    } catch (e) {
      data.done = true
      if (data.logAble) {
        data.log += 'testAppendFileBufferSync fail:' + JSON.stringify(e) + '\n\n'
      }
      console.error(e)
    }
  }
  // #ifdef APP
  const testReadFileEncoding = (encoding : string) => {
    console.log('testEncoding', encoding)
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().readFile({
          filePath: e.tempFilePaths[0],
          encoding: encoding,
          success: (res) => {
            console.log('success:', (res.data as string).length)
          }
        })
      }
    })
  }
  const testReadFileArrayBuffer = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().readFile({
          filePath: e.tempFilePaths[0],
          success: (res) => {
            console.log('success:', (res.data as ArrayBuffer).byteLength)
          }
        })
      }
    })
  }
  const testReadFileSyncEncoding = (encoding : string) => {
    console.log('testEncoding', encoding)
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().readFileSync(e.tempFilePaths[0], encoding)
          console.log('success:', (res as string).length)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  const testReadFileSyncArrayBuffer = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().readFileSync(e.tempFilePaths[0], null)
          console.log('success:', (res as ArrayBuffer).byteLength)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  const copyFileByContent = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        uni.getFileSystemManager().copyFile({
          srcPath: e.tempFilePaths[0],
          destPath: uni.env.CACHE_PATH + 'copyFileByContent.jpg',
          complete: (res) => {
            console.log('success:', res)
          }
        })
      }
    })
  }
  const copyFileSyncByContent = () => {
    uni.chooseImage({
      count: 1,
      albumMode: "system",
      sizeType: ["original"],
      sourceType: ["album"],
      success: (e) => {
        console.log(e.tempFilePaths[0])
        try {
          let res = uni.getFileSystemManager().copyFileSync(e.tempFilePaths[0], uni.env.CACHE_PATH + 'copyFileSyncByContent.jpg',)
          console.log('success:', res)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
  // #endif
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
  const getFileInfoByContent = (event : UniPointerEvent) => {
    uni.chooseFile({
      count: 1,
      success(e) {
        console.log(JSON.stringify(e.tempFiles[0].path))
        uni.getFileSystemManager().getFileInfo({
          filePath: e.tempFiles[0].path,
          success(e2) {
            console.log('success:', (e2))
          }
        })
      }
    })
  }

  const testOpenFlagWrite = () => {
    try {
      uni.getFileSystemManager().mkdirSync(`${data.basePath}b/`,true)
      uni.getFileSystemManager().writeFileSync(`${data.basePath}b/t.txt`, "aaa", "utf-8")
    } catch(e:Error){}
    uni.getFileSystemManager().open({
    	filePath : `${data.basePath}b/t.txt`,
    	flag : "a+",
    	success : (res: OpenFileSuccessResult) => {
    		uni.getFileSystemManager().write({
    			fd : res.fd,
    			data : "appended",
    			position : 10,
          success:(e)=> {
            data.testOpenFlataplusWrite = true
          },
          fail:(e)=> {
            data.testOpenFlataplusWrite = false
          }
    		})
    	},
      fail(e) {}
    })
  }

  const testWriteLongString = () =>{
    try {
      uni.getFileSystemManager().mkdirSync(`${data.basePath}b/`,true)
      uni.getFileSystemManager().writeFileSync(`${data.basePath}b/t.txt`, "aaa", "utf-8")
    } catch(e:Error){}
    uni.getFileSystemManager().open({
    	filePath : `${data.basePath}b/t.txt`,
    	flag : "a+",
    	success : (res: OpenFileSuccessResult) => {
    		uni.getFileSystemManager().write({
    			fd : res.fd,
    			data : "appended long strings.appended long strings.appended long strings.appended long strings.appended long strings.",
    			position : 10,
          success:(e)=> {
            data.testOpenFlataplusWrite = true
          },
          fail:(e)=> {
            data.testOpenFlataplusWrite = false
          }
    		})
    	},
      fail(e) {}
    })
  }

  defineExpose({
    data,
    testOpenFlagWrite,
    testWriteLongString
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


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

