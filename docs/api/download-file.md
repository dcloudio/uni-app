<!-- ## uni.downloadFile(options) @downloadfile -->

::: sourceCode
## uni.downloadFile(options) @downloadfile

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-network


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-network

:::

下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。

### downloadFile 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


下载文件常见场景是apk的下载更新，[app升级中心](https://doc.dcloud.net.cn/uniCloud/upgrade-center.html)是一个现成的开源项目，实现下载进度在通知栏显示等复杂交互，可直接使用。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **DownloadFileOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 下载资源的 url |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | Web: -; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: - | HTTP 请求 Header，header 中不能设置 Referer |
| filePath | string | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定文件下载路径<br/>支持相对路径与绝对路径，例：<br/>`/imgs/pic.png`、`/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/temp/imgs/pic.png`<br/>并且支持指定下载目录，例：<br/>`/imgs/`<br/>支持uni.env的平台兼容性：Android自3.9开始支持uni.env，iOS自4.13开始支持uni.env |
| timeout | number | 否 | 120000 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时时间，单位 ms |
| success | (result: [DownloadFileSuccess](#downloadfilesuccess-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} |
| fail | (result: [DownloadFileFail](#downloadfilefail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 结束的回调函数（调用成功、失败都会执行） |
| enableHttp2 | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.4`<br/><br/>是否开启 http2<br/> |
| enableProfile | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否开启 profile，默认开启。开启后可在接口回调的 res.profile 中查看性能调试信息。<br/> |
| enableQuic | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.4`<br/><br/>是否开启 Quic/h3 协议（iOS 微信目前使用 gQUIC-Q43；Android 微信在 v8.0.54 前使用 gQUIC-Q43，v8.0.54 开始使用 IETF QUIC，即 h3 协议；PC微信使用 IETF QUIC，即 h3 协议）<br/> |
| useHighPerformanceMode | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.4.1`<br/><br/>使用高性能模式，暂仅支持 Android，默认关闭。该模式下有更优的网络性能表现。<br/> | 

#### DownloadFileSuccess 的属性值 @downloadfilesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 临时文件路径，下载后的文件会存储到一个临时文件 |
| statusCode | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的 HTTP 状态码 |
| filePath | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 用户文件路径 (本地路径)。传入 filePath 时会返回，跟传入的 filePath 一致<br/> |
| profile | **DownloadFileSuccessProfile** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.4`<br/><br/>网络请求过程中一些调试信息，[查看详细说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/network.html)<br/> |

#### profile 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSLconnectionEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | SSL建立完成的时间,如果不是安全连接,则值为 0<br/> |
| SSLconnectionStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | SSL建立连接的时间,如果不是安全连接,则值为 0<br/> |
| connectEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间。注意这里握手结束，包括安全连接建立完成、SOCKS 授权通过<br/> |
| connectStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等。注意如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间<br/> |
| domainLookUpEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等<br/> |
| domainLookUpStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等<br/> |
| downstreamThroughputKbpsEstimate | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 评估当前网络下载的kbps<br/> |
| estimate_nettype | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 评估的网络状态 unknown, offline, slow 2g, 2g, 3g, 4g, last/0, 1, 2, 3, 4, 5, 6<br/> |
| fetchStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 组件准备好使用 HTTP 请求抓取资源的时间，这发生在检查本地缓存之前<br/> |
| httpRttEstimate | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 协议层根据多个请求评估当前网络的 rtt（仅供参考）<br/> |
| peerIP | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前请求的IP<br/> |
| port | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前请求的端口<br/> |
| protocol | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 使用协议类型，有效值：http1.1, h2, quic, unknown<br/> |
| receivedBytedCount | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 收到字节数<br/> |
| redirectEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内部的重定向才算，否则值为 0<br/> |
| redirectStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0<br/> |
| requestEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP请求读取真实文档结束的时间<br/> |
| requestStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存。连接错误重连时，这里显示的也是新建立连接的时间<br/> |
| responseEnd | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存<br/> |
| responseStart | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存<br/> |
| rtt | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当次请求连接过程中实时 rtt<br/> |
| sendBytesCount | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 发送的字节数<br/> |
| socketReused | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否复用连接<br/> |
| throughputKbps | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 当前网络的实际下载kbps<br/> |
| transportRttEstimate | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 传输层根据多个请求评估的当前网络的 rtt（仅供参考）<br/> |
| usingHighPerformanceMode | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否走到了高性能模式。基础库 v3.3.4 起支持。<br/> |

#### DownloadFileFail 的属性值 @downloadfilefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 5 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口超时 |
| 1000 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 服务端系统错误 |
| 100001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | json数据解析错误 |
| 100002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息json解析失败 |
| 100003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | json解析类型转换失败 |
| 600003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络中断 |
| 600008 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | data参数类型不合法 |
| 600009 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | URL格式不合法 |
| 602001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | request系统错误 |


### 注意事项

* 当目录下有同名文件时，文件名会增加数字后缀，例如：目录下abc.txt已经存在，此时下载此文件名的文件到此目录时，下载后的文件会命名为abc(1).txt。
* App-Android下载的默认目录为外置应用沙盒目录下的cache目录。如果手机磁盘空间不足，系统清理工具会清理cache目录。
	+ 如需主动删除下载文件，使用[uni.getFileSystemManager](get-file-system-manager.md)。
	+ 默认下载路径为外置应用沙盒目录`uni.env.CACHE_PATH/cache/uni-download`。但在HBuilderX 3.99前有过几次变更，3.98的目录是`uni.env.CACHE_PATH/cache/uniDownloads`，而3.98之前则不在cache目录下。

### 返回值 

| 类型 |
| :- |
| [DownloadTask](#downloadtask-values) |

#### DownloadTask 的方法 @downloadtask-values 

#### abort(): void, @abort
abort
中断下载任务
##### abort 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |



#### onProgressUpdate(callback: DownloadFileProgressUpdateCallback): void, @onprogressupdate
onProgressUpdate
监听下载进度变化。
##### onProgressUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnProgressDownloadResult](#onprogressdownloadresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### OnProgressDownloadResult 的属性值 @onprogressdownloadresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| progress | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 下载进度百分比 |
| totalBytesWritten | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 已经下载的数据长度，单位 Bytes |
| totalBytesExpectedToWrite | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预期需要下载的数据总长度，单位 Bytes |

 


::: danger 注意事项
- 在4.25版本iOS平台增加了Task原生对象自动销毁的逻辑，即下载完成后自动释放原生的Task对象，建议开发者在`complete`回调中置空Task对象，例

```typescript
complete: () => {
            this.task = null
          },
```

如不释放，在调用Task对象的方法将导致控制台报错：
`error: instance object does not exist: id:15`

:::

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/download-file/download-file.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/download-file/download-file.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/download-file/download-file

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/download-file/download-file

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <page-head :title="data.title"></page-head>
      <view>
        <view v-if="data.imageSrc">
          <image class="img" :src="data.imageSrc" mode="aspectFit" />
        </view>
        <view v-else style="margin: 10px;">
          <text class="uni-hello-text">点击按钮下载服务端示例图片（下载网络文件到本地临时目录）</text>
          <button type="primary" @tap="downloadImage">下载</button>
        </view>
        <view style="margin: 10px;">
          <text class="uni-hello-text">下载接口的Content-Disposition中的filename非法值例子</text>
          <button type="primary" @tap="downloadErrorFilename">下载</button>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
  import {
    testInovkeDownloadFile,
    CommonOptions
  } from '@/uni_modules/test-invoke-network-api'
  // #endif

  type DataType = {
    title: string;
    imageSrc: string;
    task: DownloadTask | null;
    jest_result: boolean;
    jest_callback_triggred: boolean;
  }

  const data = reactive({
    title: 'downloadFile',
    imageSrc: '',
    task: null,
    //自动化测试例专用
    jest_result: false,
    jest_callback_triggred: false
  } as DataType)

  onUnload(() => {
    // data.imageSrc = '';
    uni.hideLoading();
    data.task?.abort();
  })

  const downloadImage = () => {
    uni.showLoading({
      title: '下载中'
    })
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/hello-uni-app-x/uni-app.png",
      success: (res) => {
        console.log('downloadFile success, res is', res.tempFilePath)
        data.imageSrc = res.tempFilePath;
      },
      fail: (err) => {
        console.log('downloadFile fail, err is:', err)
      },
      complete: (res) => {
        uni.hideLoading();
        data.task = null;
      }
    });
    data.task?.onProgressUpdate((update) => {
      console.log("progress : ", update.progress);
    })
  }

  const downloadErrorFilename = () => {
    data.task = uni.downloadFile({
      url:"https://qiniu-web-assets.dcloud.net.cn/uni-app-x/static/file/test9.txt",
      success: (res) => {
        console.log('downloadFile success, res is', res.tempFilePath)
      },
      fail: (err) => {
        console.log('downloadFile fail, err is:', err)
      }
    })
  }




  //自动化测试例专用
  const jest_downloadFile = () => {
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/hello-uni-app-x/uni-app.png",
      success: () => {
        data.jest_result = true
        data.jest_callback_triggred = true
      },
      fail: () => {
        data.jest_result = false
        data.jest_callback_triggred = true
      }
    });
  }

  const jest_downloadFile_with_uni_env = () => {
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/hello-uni-app-x/uni-app.png",
      filePath: `${uni.env.CACHE_PATH}/a/b/`,
      success: () => {
        data.jest_result = true
        data.jest_callback_triggred = true
      },
      fail: () => {
        data.jest_result = false
        data.jest_callback_triggred = true
      }
    });
  }

  const jest_cookie_download = (needCookie : boolean) => {
    data.task = uni.downloadFile({
      url: "https://request.dcloud.net.cn/api/http/header/download",
      success: () => {
        data.jest_result = needCookie ? true : false;
        data.jest_callback_triggred = true
      },
      fail: () => {
        data.jest_result = needCookie ? false : true;
      }
    });
  }

  const jest_set_cookie = () => {
    uni.request({
      url: "https://request.dcloud.net.cn/api/http/header/setCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: true,
      firstIpv4: false,
      success: () => {
        jest_cookie_download(true)
      },
      fail: () => {
        data.jest_result = false;
        data.jest_callback_triggred = true
      },
    });
  }

  const jest_delete_cookie = () => {
    uni.request({
      url: "https://request.dcloud.net.cn/api/http/header/deleteCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: true,
      firstIpv4: false,
      success: () => {
        jest_cookie_download(false)
      },
      fail: () => {
        data.jest_result = false;
        data.jest_callback_triggred = true
      },
    });
  }

  const jest_uts_module_invoked = () => {
    // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
    testInovkeDownloadFile({
      success: (res : any) => {
        data.jest_result = true
        data.jest_callback_triggred = true
      },
      fail: (err : any) => {
        data.jest_result = false
        data.jest_callback_triggred = true
      }
    } as CommonOptions)
    // #endif
  }

  const jest_special_characters_download = () => {
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/hello-uni-app-x/1789834995055525889-你好%23你好.png",
      success: () => {
        data.jest_result = true;
        data.jest_callback_triggred = true
      },
      fail: () => {
        data.jest_result = false;
        data.jest_callback_triggred = true
      }
    });
  }

  const jest_download_call_timeout = () => {
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/video/sample/2minute-demo-10k.mp4",
      timeout: 3000,
      fail: () => {
        data.jest_result = false;
      }
    })
    setTimeout(() => {
      data.jest_result = true;
    }, 4000)
  }

  defineExpose({
    data,
    jest_downloadFile,
    jest_downloadFile_with_uni_env,
    jest_set_cookie,
    jest_delete_cookie,
    jest_uts_module_invoked,
    jest_special_characters_download,
    jest_download_call_timeout
  })
</script>

<style>
  .img {
    margin: 0 auto;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.downloadFile)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/network-file.html#downloadfile)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/DownloadTask.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=downloadFile&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=downloadFile&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=downloadFile&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=downloadFile&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=downloadFile)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=downloadFile&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## tips

- 下载后的文件，如需分享或使用三方应用打开，在Android7上需要使用FileProvider。
- web端并不会将文件下载到文件系统内，而是保存在js的File对象内，以供其他接口（如canvas、uploadFile）使用
