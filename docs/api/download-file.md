<!-- ## uni.downloadFile(options) @downloadfile -->

::: sourceCode
## uni.downloadFile(options) @downloadfile

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-network


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-network

:::

下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。

### downloadFile 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 |


下载文件常见场景是apk的下载更新，[app升级中心](https://doc.dcloud.net.cn/uniCloud/upgrade-center.html)是一个现成的开源项目，实现下载进度在通知栏显示等复杂交互，可直接使用。

### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **DownloadFileOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 |  | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 下载资源的 url |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | 微信小程序: 4.41; Android: 3.91; iOS: 4.11 | HTTP 请求 Header，header 中不能设置 Referer |
| filePath | string | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 指定文件下载路径<br/>支持相对路径与绝对路径，例：<br/>`/imgs/pic.png`、`/storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/temp/imgs/pic.png`<br/>并且支持指定下载目录，例：<br/>`/imgs/`<br/>支持uni.env的平台兼容性：Android自3.9开始支持uni.env，iOS自4.13开始支持uni.env |
| timeout | number | 否 | 120000 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 超时时间，单位 ms |
| success | (result: [DownloadFileSuccess](#downloadfilesuccess-values)) => void | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} |
| fail | (result: [DownloadFileFail](#downloadfilefail-values)) => void | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 结束的回调函数（调用成功、失败都会执行） | 

#### DownloadFileSuccess 的属性值 @downloadfilesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| tempFilePath | string | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 临时文件路径，下载后的文件会存储到一个临时文件 |
| statusCode | number | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 开发者服务器返回的 HTTP 状态码 |

#### DownloadFileFail 的属性值 @downloadfilefail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 错误码 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

#### errCode 的属性描述

| 合法值 | 描述 |
| :- | :- |
| 5 | 接口超时 |
| 1000 | 服务端系统错误 |
| 100001 | json数据解析错误 |
| 100002 | 错误信息json解析失败 |
| 100003 | json解析类型转换失败 |
| 600003 | 网络中断 |
| 600008 | data参数类型不合法 |
| 600009 | URL格式不合法 |
| 600010 | Cronet模块加载失败 |
| 602001 | request系统错误 |


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
##### abort 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 |




#### onProgressUpdate(callback: DownloadFileProgressUpdateCallback): void, @onprogressupdate
onProgressUpdate
监听下载进度变化。
##### onProgressUpdate 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (result: [OnProgressDownloadResult](#onprogressdownloadresult-values)) => void | 是 | 

##### OnProgressDownloadResult 的属性值 @onprogressdownloadresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| progress | number | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 下载进度百分比 |
| totalBytesWritten | number | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 已经下载的数据长度，单位 Bytes |
| totalBytesExpectedToWrite | number | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; HarmonyOS: 4.61 | 预期需要下载的数据总长度，单位 Bytes |


 


::: danger 注意事项
- 在4.25版本iOS平台增加了Task原生对象自动销毁的逻辑，即下载完成后自动释放原生的Task对象，建议开发者在`complete`回调中置空Task对象，例

```typescript
let task : DownloadTask | null = null

task = uni.downloadFile({
	url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png',
	complete: () => {
		task = null
	},
})
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
  <!-- #ifdef APP && !VUE3-VAPOR -->
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
      </view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
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
      },
      complete: () => {
        data.task = null
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
      },
      complete: () => {
        data.task = null
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
      },
      complete: () => {
        data.task = null
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
      },
      complete: () => {
        data.task = null
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
      },
      complete: () => {
        data.task = null
      }
    });
  }

  const jest_download_call_timeout = () => {
    data.task = uni.downloadFile({
      url: "https://web-assets.dcloud.net.cn/video/sample/2minute-demo-10k.mp4",
      timeout: 3000,
      fail: () => {
        data.jest_result = false;
      },
      complete: () => {
        data.task = null
      }
    })
    setTimeout(() => {
      data.jest_result = true;
    }, 4000)
  }

  const jest_download_long_url = () => {
    data.task = uni.downloadFile({
      url: "https://request.dcloud.net.cn/WsQkvvoLPbLFRoZB3NZOhgR8bMbjvpMZMmnzhlH1UtAzbVaOqokI9NBhqgc0pUVesJVQeJoTXjCbuAHqsoGJryxzjo4xf2bR75GTfOgJ5mfDDoX31DY9HTQ0mgLwTlt43MWsRobR22r6qwJYRaZW4yLthUX1BSzckZS9OeKzyV2r3dizxkbAPV3j5toN5qjUq5gYJOHbWfOEdwCA6tftgEGzc3eb6Deed0ngLtNnYYcVOWCzXk24jhYP87g9yh1o9kowdQXUMv4mhwxbvvulLTDC470HqLT1cLm7iuh38L1c8EdMJ6xSCO8y1mxKDzczA0W29mzf54jUfuO7OodX9ZJeFQhCptm73P8oSzyc57BaP9zecVN0u1LwPa4cyj1vMleUSfI2lSzT5PIt2YCojkFEunuFWHRq5vtDQ2ZXQGYIJqSmBDDsVXMAlHAC91F1uWsuC67GgcAPMtrXAyB8HbCA4fiP9iYsKmkKKwMUFx04ehsabTuWnOO6Oms14wrqghKGUJKKXdCaYomcCrRDRUOjIm3NwRKqUN1cHiHI9cxXQbWD8FFb8qBEPrrFscog2dHhQyM8nBbdrk9Lc99ao7bE1s39qiYxSZPnSdfHVb0zfgg9vkm0DTd47pTHz3qOhtWLgNLBLTsCf3HMVG4yZgGcenX3XG2Z6OgG6Pm1DsimJfZtzYU78Cbbp395mdnX6bj3bNNzraV6JVLLiI6diJwtdipIMBFle0t0S0eWMNSGUiZHDwjVTGibHK4PTSd6VkJbBcxSxdmdApn1LiSmxJTciH0auKrSzriVxjDGyQ2bnqyStG",
      success: () => {
        data.jest_result = true;
        data.jest_callback_triggred = true
      },
      fail: () => {
        data.jest_result = false;
        data.jest_callback_triggred = true
      },
      complete: () => {
        data.task = null
      }
    });
  }

  defineExpose({
    data,
    jest_downloadFile,
    jest_downloadFile_with_uni_env,
    jest_set_cookie,
    jest_delete_cookie,
    jest_uts_module_invoked,
    jest_special_characters_download,
    jest_download_call_timeout,
    jest_download_long_url
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
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=downloadFile&doc_type=miniprogram)
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


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |


## tips

- 下载后的文件，如需分享或使用三方应用打开，在Android7上需要使用FileProvider。
- web端并不会将文件下载到文件系统内，而是保存在js的File对象内，以供其他接口（如canvas、uploadFile）使用
