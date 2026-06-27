# 文件系统

>  [uni.env 参见](./env.md)

除了web，在App和小程序上都有访问文件系统的能力。

开发者可以通过API [uni.getFileSystemManager](get-file-system-manager.md)获取到文件系统管理器，进一步对文件目录进行增删改查。
```uts
const fs = uni.getFileSystemManager()
```

uni-app x框架因为需要也会产生一些文件在CACHE目录中，比如拍照、截图等API。下文会介绍框架已经使用了哪些目录和文件。

注意：`DCloud-`、`DCloud_`、`uni-`、`uni_`开头的目录和文件是保留目录。开发者自用的文件目录需避免使用这些前缀。

文件主要分两大类，代码包和本地磁盘文件：
- 代码包文件：指 uni-app x 项目目录中添加的文件，比如static目录下的文件。Android发行后存放在assets目录下。只读。
	+ assets
	+ hybrid
	+ static
	+ uni_modules
- 本地磁盘文件：指应用在手机端运行时可访问的磁盘文件。又分以下目录：
	+ 应用外置沙盒目录（`uni.env.SANDBOX_PATH`）：手机应用的沙盒目录，其中包括缓存文件目录和用户文件目录。在文件管理器中可看到。
		* 缓存文件目录（`uni.env.CACHE_PATH`）：手机运行过程中框架保存缓存文件的目录（cache），系统空间不足时会被自动清理掉
		* 用户文件目录（`uni.env.USER_DATA_PATH`）：提供给开发者操作的本地文件目录（files）
	+ 应用内置沙盒目录（`uni.env.ANDROID_INTERNAL_SANDBOX_PATH`）：存放框架的网络缓存（如网络图片、视频、web-view的缓存）、storage。
	+ 沙盒外目录

**uts插件开发**  
在uts插件开发中调用系统 API 时可能需要平台相关的绝对路径，可以通过以下方式进行转换：  
- app-android平台  
  [UTSAndroid.convert2AbsFullPath](../uts/utsandroid.md#convert2absfullpath)  
- app-ios平台  
  [UTSiOS.convert2AbsFullPath](../uts/utsios.md#convert2absfullpath)  

## 代码包文件@package

代码包文件，是源码工程中的静态资源文件，由编译器打包到发行包（如apk）中。全平台都如此。

uni-app x的应用在安装后，代码包文件有4个目录：
- assets
- hybrid
- static
- uni_modules

这些目录的来源和作用，[详见](../compiler/README.md#static)

assets目录下文件有随机数的存在，很难使用FileSystemManager访问；hybrid下的文件用于web-view组件。\
所以通过FileSystemManager访问较多的是static目录。

FileSystemManager访问代码包文件时，直接写文件路径，如：/static/uni.png、/uni_modules/xxx/static/clear.png。

**示例**

假设static目录下有如下文件："/static/list-mock/mock.json"，要copy到沙盒的files目录（该目录的介绍详见下一章节），可使用如下代码：
```ts
let fileManager = uni.getFileSystemManager()

fileManager.copyFile({
  srcPath: "/static/list-mock/mock.json",
  destPath: `${uni.env.USER_DATA_PATH}/mock.json`,
  success: function (res : FileManagerSuccessResult) {
    console.log('success', res)
  },
  fail: function (res : UniError) {
    console.log('fail', res)
  },
  complete: function (res : any) {
    console.log("complete", res)
  }
} as CopyFileOptions)
```

> 注意：代码包文件只读，无法动态修改或删除。修改代码包文件一般会copy到沙盒目录后再修改。

### 真机运行时代码包文件目录 @packageDebug  

**注意：真机运行时代码包文件目录有特殊处理**  

Android/iOS端真机运行期间，为了实现动态性，将代码包文件同步到`应用沙盒目录`下的特定目录：
- Android平台
	保存在应用专属存储空间的外置存储空间根目录下的apps目录，通常为“/sdcard/Android/data/%应用包名%/apps/%应用AppID%/www/”
- iOS平台
	保存在应用沙盒目录下的Documents/uni-app-x目录，通常为“/%应用沙盒目录%/Documents/uni-app-x/apps/%应用AppID%/www/”

请开发者不要使用FileManage API操作应用代码包文件。虽然真机运行时可以访问，但打包后代码包不在沙盒中，无法再访问。

## 本地磁盘文件@disk
本地磁盘文件分沙盒内和沙盒外。

沙盒内是指应用安装到设备（通常指手机）后，系统会提供一块独立的文件存储区域。以应用维度隔离，即在同一台设备，不同应用间的本地磁盘文件不能直接相互访问。

而沙盒目录，又分内置和外置。外置可以在Android手机自带的系统文件管理器里看到，并且用户可以改动。内置的保护级别更高，无法在系统文件管理器中看到。

本地磁盘文件路径格式为：
```
{{协议名}}://文件路径
```
> App端，协议名为"unifile"，不应该直接拼写协议名路径访问本地磁盘文件，推荐使用uni.env中的目录常量获取本地磁盘文件目录的路径。

**通过uni.env的目录常量访问本地磁盘文件**

uni-app x提供了一批uni.env常量，来指定不同的可访问目录。

以下示例为在`用户数据目录`下写入hello.txt文件：
```ts
const fs = uni.getFileSystemManager();
fs.writeFile({
	filePath: `${uni.env.USER_DATA_PATH}/hello.txt`,
	data: 'hello uni-app x!',
	encoding: 'utf-8'
} as WriteFileOptions);
```


### 外置应用沙盒目录@sandbox
目录常量名称：`uni.env.SANDBOX_PATH`

App端专有目录，为应用沙盒根目录，其下包含了`缓存文件目录`和`用户数据目录`，真机运行时还包括应用资源目录。此目录在不同平台差异较大，不建议直接使用此目录，建议直接按需使用下方的缓存目录`uni.env.CACHE_PATH`和数据目录`uni.env.USER_DATA_PATH`。

沙盒实际保存的目录在不同平台存在差异：
- Android平台
	应用专属存储空间的外置存储空间根目录，通常为“/Android/data/%应用包名%/”，其下的cache目录为`缓存文件目录`，其下的files目录为`用户数据目录`
- iOS平台
	应用沙盒虚拟目录，其下包括Documents、Library、tmp目录，此目录只可读，不可创建其它目录

本目录可以在Android系统的文件管理器中看到。用户在文件管理器中可以查阅删改。

App和小程序上都给应用提供了文件沙盒系统（SANDBOX）。即App或小程序可以访问自己的沙盒文件系统，不同的应用之间是隔离的，应用默认无法访问自己沙盒之外的文件系统。

较早期的Android没有外部文件访问权限，目前主流的Android均已补充这块的权限，并且该权限管理越来越严格。

所以一般应用可以自由的访问自己的沙盒文件系统。想访问自己沙盒之外的公共目录，App需要额外申请权限。

当然如果手机被root，沙盒机制也会失效，将可以被其他app操作。

应用沙盒目录SANDBOX下，一般有3类概念：
1. 数据文件USER_DATA：存放应用启动后创造、下载的，用户所需要的数据。需要应用自己提供清理方式。
2. 缓存CACHE：不重要的文件，当磁盘空间不足时，OS会清除该目录以回收磁盘空间。
3. 临时文件TEMP：在鸿蒙系统和小程序上有这个概念，随时都会被清理，基本上就是一次性使用。

在Android的设置->应用详情中，可以看到应用所占空间有3部分：应用本身、数据文件、缓存文件。
当用户点击清空缓存时，即清空了CACHE目录。当用户点击了清空用户数据后，即清空了USER_DATA目录，应用即回到了刚安装的状态。

#### 缓存目录cache@cache
目录常量名称：`uni.env.CACHE_PATH`

缓存文件目录，保存应用运行过程中产生的缓存文件。操作系统或小程序宿主会在存储空间不足时清除缓存文件，因此不要在此目录中保存应用的关键业务数据文件。

实际保存的目录在不同平台存在差异：
- Android平台
	应用专属存储空间的外置存储空间根目录下的cache目录，通常为“/Android/data/%应用包名%/cache/”
- iOS平台
	应用沙盒目录下的Library/Caches目录

uni-app x的部分内置API，在App平台会产生临时文件会放置在本cache目录，如：
- uni.downloadFile下载的文件
- uni.chooseImage、uni.chooseVideo、uni.chooseMedia(iOS平台)拍摄或选择的相册文件
- uni.compressImage、uni.compressVideo压缩后的文件
- uni.getImageInfo网络图片下载到本地的文件
- uni.createInnerAudioContext缓存的网络audio文件
- uni.getBackgroundAudioManager缓存的网络audio文件
- uni.getRecorderManager录音存储的audio文件
- dom element的截图API

从HBuilderX 3.99起，定义如下缓存目录的使用规范。

在`uni.env.CACHE_PATH`目录下，uni官方使用了如下目录，请开发者避免使用uni-开头的目录：
- uni-download // uni.downloadFile的默认下载地址 （在HBuilderX 3.98时曾使用目录uniDownloads，从3.99起调整为uni-download）
- uni-media // uni.chooseImage、uni.chooseVideo拍摄或选择的相册文件，uni.compressImage、uni.compressVideo压缩后的文件，uni.getImageInfo网络图片下载到本地的文件
  * iOS平台uni.chooseMedia拍摄或选择的相册文件
- uni-snapshot // element takeSnapShot截图APi存储的路径
- uni-audio //存放网络缓存音频文件
- uni-recorder //存放录音文件
- uni-store // uni.getFileSystemManager().saveFile/saveFileSync 默认保存路径
- uni-crash //存放崩溃日志
	* java //java、kotlin层崩溃日志
	* c //c、so库崩溃日志

App平台上述API在调用后产生在cache目录的文件，需要自行判断后续是否还要使用。\n
如需要使用，则需调用 `uni.getFileSystemManager` 的API把要使用的文件挪到用户数据目录（`USER_DATA_PATH`）下；\n
如不再使用，最好是调用API把文件删掉。如果不删，那就是等着OS的磁盘清理工具来回收。

#### 用户数据目录files@files
目录常量名称：`uni.env.USER_DATA_PATH`

App端和小程序提供了用户文件目录，用于开发者在应用运行期读写文件，此目录不会被操作系统自动清除，由开发者自主管理。

实际保存的目录在不同平台存在差异：
- Android平台
	应用专属存储空间的外置存储空间根目录下的files目录，通常为“/sdcard/Android/data/%应用包名%/files/”
- iOS平台
	应用沙盒目录下的Documents目录  
	此目录下保留 uni-app-x 子目录用于真机运行时使用，避免业务代码操作此目录，[详情](#packageDebug)  

### 内置应用沙盒目录@internalsandbox

目录常量名称：`uni.env.ANDROID_INTERNAL_SANDBOX_PATH`

仅Android支持。该目录无法在手机自带的文件管理器中查看，用户无法修改。除非手机被root。

uni-app x框架的一些内置组件和API会涉及缓存文件，存放到本目录，如：
- image/video组件的网络图片视频缓存
- web-view组件的缓存

FileSystemManager目前对内置应用沙盒目录为只读。如需写入，需开发uts插件。

### 沙盒外目录
FileSystemManager API暂不支持访问沙盒外目录。

保存图片和视频到相册，有专门的API：[uni.saveImageToPhotosAlbum](./save-image-to-photos-album.md)、[uni.saveVideoToPhotosAlbum](./save-video-to-photos-album.md)、

如还想访问以上API不支持的目录，需开发uts插件。

## 常见问题  
### 文件路径中字母大小写敏感问题@casesensitive  
- Android平台  
	+ 本地磁盘文件路径中字母大小写不敏感，真机运行时会将应用资源同步到设备的SD卡中，此时路径中字母大小写不敏感  
	+ 代码包文件中的文件打包后到apk中后，由于Android系统的要求是大小写敏感，因此发布为后应用资源路径中的字母大小写敏感  
- iOS平台  
	+ iOS真机文件路径中字母大小写敏感  
	+ iOS模拟器文件路径中字母大小写不敏感  

> 为了有更好的兼容性，建议处理文件路径时按大小写敏感原则处理  
