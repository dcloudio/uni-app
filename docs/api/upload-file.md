<!-- ## uni.uploadFile(options) @uploadfile -->

::: sourceCode
## uni.uploadFile(options) @uploadfile

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-network


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-network

:::

将本地资源上传到开发者服务器。

### uploadFile 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


推荐上传到uniCloud，uniCloud提供了更便宜CDN和更好的易用性，[详见](https://doc.dcloud.net.cn/uniCloud/ext-storage/intro.html)

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UploadFileOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器 url |
| filePath | string | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要上传文件资源的路径, 支持uni.env |
| name | string | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 |
| files | Array&lt;**UploadFileOptionFiles**&gt; | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要上传的文件列表。 |
| header | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | HTTP 请求 Header, header 中不能设置 Referer |
| formData | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | null | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | HTTP 请求中其他额外的 form data |
| timeout | number | 否 | 120000 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时时间，单位 ms |
| success | (result: [UploadFileSuccess](#uploadfilesuccess-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 成功返回的回调函数 |
| fail | (result: [UploadFileFail](#uploadfilefail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 结束的回调函数（调用成功、失败都会执行） |
| enableHttp2 | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.4`<br/><br/>是否开启 http2<br/> |
| enableProfile | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否开启 profile，默认开启。开启后可在接口回调的 res.profile 中查看性能调试信息。目前仅 iOS 端支持。<br/> |
| enableQuic | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.10.4`<br/><br/>是否开启 Quic/h3 协议（iOS 微信目前使用 gQUIC-Q43；Android 微信在 v8.0.54 前使用 gQUIC-Q43，v8.0.54 开始使用 IETF QUIC，即 h3 协议；PC微信使用 IETF QUIC，即 h3 协议）<br/> |
| useHighPerformanceMode | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.4.1`<br/><br/>使用高性能模式，暂仅支持 Android，默认关闭。该模式下有更优的网络性能表现。<br/> | 

##### files 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 否 | "file" | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | multipart 提交时，表单的项目名，默认为 file，如果 name 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。 |
| uri | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要上传文件资源的路径 |
| file | any | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | 要上传的文件对象 |

#### UploadFileSuccess 的属性值 @uploadfilesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的数据 |
| statusCode | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 开发者服务器返回的 HTTP 状态码 |

#### UploadFileFail 的属性值 @uploadfilefail-values 

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


### 返回值 

| 类型 |
| :- |
| [UploadTask](#uploadtask-values) |

#### UploadTask 的方法 @uploadtask-values 

#### abort(): void, @abort
abort
中断上传任务。
##### abort 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |



#### onProgressUpdate(callback: UploadFileProgressUpdateCallback): void, @onprogressupdate
onProgressUpdate
监听上传进度变化。
##### onProgressUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnProgressUpdateResult](#onprogressupdateresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### OnProgressUpdateResult 的属性值 @onprogressupdateresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| progress | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 上传进度百分比 |
| totalBytesSent | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 已经上传的数据长度，单位 Bytes |
| totalBytesExpectedToSend | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 预期需要上传的数据总长度，单位 Bytes |

 


::: danger 注意事项
- 在4.25版本iOS平台增加了Task原生对象自动销毁的逻辑，即上传完成后自动释放原生的Task对象，建议开发者在`complete`回调中置空Task对象，例

```typescript
complete: () => {
            this.task = null
          },
```

如不释放，在调用Task对象的方法将导致控制台报错：
`error: instance object does not exist: id:15`

:::


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/upload-file/upload-file.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/upload-file/upload-file.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/upload-file/upload-file

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/upload-file/upload-file

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <page-head :title="data.title"></page-head>
      <view class="uni-padding-wrap uni-common-mt">
        <view class="demo">
          <image v-if="data.imageSrc" :src="data.imageSrc" class="image" mode="widthFix"></image>
          <text v-else class="uni-hello-addfile" @click="chooseImage">+ 选择图片</text>
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
    testInovkeUploadFile,
    CommonOptions
  } from '@/uni_modules/test-invoke-network-api'
  // #endif

  type DataType = {
    title: string;
    imageSrc: string;
    task: UploadTask | null;
    jest_result: boolean;
  }

  const data = reactive({
    title: 'uploadFile',
    imageSrc: '',
    task: null,
    //自动化测试例专用
    jest_result: false,
  } as DataType)

  onUnload(() => {
    data.imageSrc = '';
    uni.hideLoading();
    data.task?.abort();
  })

  const chooseImage = () => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])
        var imageSrc = res.tempFilePaths[0]
        uni.showLoading({
          title: '上传中'
        })
        data.task = uni.uploadFile({
          url: 'https://unidemo.dcloud.net.cn/upload', //仅为示例，非真实的接口地址
          filePath: imageSrc,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: (res) => {
            console.log('uploadImage success, res is:', res)
            uni.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
            data.imageSrc = imageSrc
          },
          fail: (err) => {
            console.log('uploadImage fail', err);
            uni.showModal({
              content: err.errMsg,
              showCancel: false
            });
          },
          complete: (res) => {
            uni.hideLoading();
            data.task = null
          }
        });
      },
      fail: (err) => {
        console.log('chooseImage fail', err)
      }
    })
  }

  //自动化测试例专用
  const jest_uploadFile = () => {
    const imageSrc = "/static/test-image/logo.png";
    uni.uploadFile({
      url: 'https://unidemo.dcloud.net.cn/upload', //仅为示例，非真实的接口地址
      filePath: imageSrc,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: () => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      },
    })
  }

  const jest_uploadFile_with_uni_env = () => {
    /**
     * 微信小程序只支持USER_DATA_PATH，且子目录未创建的情况下不能直接下载到子目录内
     */
    const filePath = `${uni.env.USER_DATA_PATH}/uni-app.png`
    uni.downloadFile({
      url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png",
      filePath: filePath,
      success: () => {
        uni.uploadFile({
          url: 'https://unidemo.dcloud.net.cn/upload', //仅为示例，非真实的接口地址
          filePath: filePath,
          name: 'file',
          success: () => {
            data.jest_result = true;
          },
          fail: () => {
            data.jest_result = false;
          },
        })
      },
      fail: () => {
        data.jest_result = false
      }
    });
  }

  const jest_cookie_upload = (needCookie : boolean) => {
    const imageSrc = "/static/test-image/logo.png";
    uni.uploadFile({
      url: 'https://request.dcloud.net.cn/api/http/header/upload',
      filePath: imageSrc,
      name: 'file',
      success: (res : UploadFileSuccess) => {
        const responseData = JSON.parseObject(res.data)
        const errCode = responseData?.getNumber("errCode")
        if (errCode != null && errCode == 1000) {
          data.jest_result = needCookie ? false : true;
        } else {
          data.jest_result = needCookie ? true : false;
        }
      },
      fail: () => {
        data.jest_result = false;
      },
    })
  }

  const jest_set_cookie = () => {
    uni.request({
      url: "https://request.dcloud.net.cn/api/http/header/setCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        jest_cookie_upload(true)
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_delete_cookie = () => {
    uni.request({
      url: "https://request.dcloud.net.cn/api/http/header/deleteCookie",
      method: "GET",
      timeout: 6000,
      sslVerify: false,
      withCredentials: false,
      firstIpv4: false,
      success: () => {
        jest_cookie_upload(false)
      },
      fail: () => {
        data.jest_result = false;
      },
    });
  }

  const jest_files_upload = () => {
    const imageSrc = "/static/test-image/logo.png";
    uni.uploadFile({
      url: 'https://unidemo.dcloud.net.cn/upload',
      files: [
        {
          name: "file1",
          uri: imageSrc
        } as UploadFileOptionFiles,
        {
          name: "file2",
          uri: imageSrc
        } as UploadFileOptionFiles
      ],
      success: (res : UploadFileSuccess) => {
        if (res.statusCode == 200) {
          data.jest_result = true;
        }
      },
      fail: () => {
        data.jest_result = false;
      },
    })
  }

  const jest_uts_module_invoked = () => {
    // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
    testInovkeUploadFile({
      success: (res : any) => {
        data.jest_result = true
      },
      fail: (err : any) => {
        data.jest_result = false
      }
    } as CommonOptions)
    // #endif
  }

  const jest_uploadFileWithoutFile = () => {
    const imageSrc = "/static/test-image/logo.png";
    uni.uploadFile({
      url: 'https://unidemo.dcloud.net.cn/upload', //仅为示例，非真实的接口地址
      formData: {
        'user': 'test'
      },
      success: (res) => {
        console.log("success: ",res);
        data.jest_result = true;
      },
      fail: (err) => {
        console.log("fail: ", err);
        data.jest_result = false;
      },
    })
  }

  const jest_uploadFileVerifyUA = () => {
    uni.uploadFile({
      url: 'https://request.dcloud.net.cn/api/http/header/upload',
      header:{
        "User-Agent":"custom"
      },
      formData: {
        'user': 'test'
      },
      success: (res : UploadFileSuccess) => {
        const responseData = JSON.parseObject(res.data)
        const innerData = responseData?.getJSON("data")
        const header = innerData?.getJSON("requestHeaders")
        const uas = header?.getArray("user-agent")
        if(uas != null) {
          data.jest_result = (uas.length == 1)
        }
      },
      fail: () => {
        data.jest_result = false;
      },
    })
  }

  defineExpose({
    data,
    jest_uploadFile,
    jest_uploadFile_with_uni_env,
    jest_set_cookie,
    jest_delete_cookie,
    jest_files_upload,
    jest_uts_module_invoked,
    jest_uploadFileWithoutFile,
    jest_uploadFileVerifyUA
  })
</script>

<style>
  .image {
    width: 100%;
  }

  .demo {
    background: #fff;
    padding: 25px;
    justify-content: center;
    align-items: center;
  }

  .uni-hello-addfile {
    text-align: center;
    background: #fff;
    padding: 25px;
    margin-top: 10px;
    font-size: 19px;
    color: #808080;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.uploadFile)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/request/network-file.html#uploadfile)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/UploadTask.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=uploadFile&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=uploadFile&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=uploadFile&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=uploadFile&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=uploadFile)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=uploadFile&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


**注意**

- web端上传文件时仅能使用downloadFile、chooseImage等返回文件对象的接口的返回值作为要上传的文件
