<!-- ## uni.openDocument(options?) @opendocument -->

::: sourceCode
## uni.openDocument(options?) @opendocument

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-openDocument


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-openDocument

:::

打开文档

### openDocument 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | 4.71 | 4.71 | 4.71 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenDocumentOptions** | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.openDocument参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| filePath | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件路径，仅支持本地路径 |
| fileType | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 文件类型，指定文件类型打开文件，微信小程序仅支持类型：doc, xls, ppt, pdf, docx, xlsx, pptx，App端由系统打开，原则上可以打开任意文件； |
| success | (res: OpenDocumentSuccess) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.openDocument成功回调函数定义 |
| fail | (res: [OpenDocumentFail](#opendocumentfail-values)) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.openDocument失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.openDocument完成回调函数定义 |
| showMenu | boolean | 否 | - | Web: x; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.11.0`<br/><br/>是否显示右上角菜单<br/> | 

#### OpenDocumentFail 的属性值 @opendocumentfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1300601 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 路径无效 |
| 1300602 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 文件不存在 |
| 1300603 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 不支持该文件类型 |
| 1300604 | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; iOS uni-app x UTS 插件: 4.71; HarmonyOS: 4.71; HarmonyOS(Vapor): 5.0 | 其他未知错误 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-document/open-document.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-document/open-document.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-document/open-document
```uvue
<template>
    <page-head :title="title"></page-head>
    <!-- #ifdef APP -->
    <scroll-view direction="vertical" style="flex:1">
    <!-- #endif -->
      <view class="uni-common-mt">
        <button v-for="(item, index) in fileList" :key="index" @click="openDocument(item)" style="margin: 10px;">
          打开 {{item.type}} 文件
        </button>
      </view>
    <!-- #ifdef APP -->
    </scroll-view>
    <!-- #endif -->
</template>

<script setup lang="uts">
  type FileItem = {
    type : string,
    url : string
  }

  const title = 'openDocument'
  const fileList = ref<Array<FileItem>>([
    {
      type: 'pdf',
      url: 'https://web-assets.dcloud.net.cn/unidoc/zh/helloworld.pdf'
    },
    {
      type: 'doc',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.doc'
    },
    {
      type: 'docx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.docx'
    },
    {
      type: 'ppt',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.ppt'
    },
    {
      type: 'pptx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.pptx'
    },
    {
      type: 'xls',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.xls'
    },
    {
      type: 'xlsx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.xlsx'
    },
    {
      type: 'zip',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/to.zip'
    },
    {
      type: 'br',
      url: '/static/filemanager/1.txt.br'
    },
    {
      type: 'mp3',
      url: '/static/test-audio/ForElise.mp3'
    },
    {
      type: 'mp4',
      url: '/static/test-video/10second-demo.mp4'
    },
    {
      type: 'svg',
      url: '/static/test-image/logo.svg'
    }
  ])

  const openDocument = (item : FileItem) => {

    if (item.url.startsWith('http')) {
      uni.showLoading({
        title: '下载中',
        mask: true
      })
      uni.downloadFile({
        url: item.url,
        success: (res) => {
          uni.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              uni.hideLoading()
              console.log('打开文档成功')
            },
            fail: (err) => {
              uni.hideLoading()
              console.log('打开文档失败', err)
              uni.showToast({
                title: '错误码：' + err.errCode.toString(),
                icon: "error"
              })
            }
          })
        },
        fail: (err) => {
          uni.hideLoading()
          console.log('下载失败', err)
          uni.showToast({
            title: '下载失败：' + err.errCode.toString(),
            icon: "error"
          })
        }
      })
    } else {
      uni.openDocument({
        filePath: item.url,
        success: () => {
          console.log('打开文档成功')
        },
        fail: (err) => {
          console.log('打开文档失败', err)
          uni.showToast({
            title: '错误码：' + err.errCode.toString(),
            icon: "error"
          })
        }
      })
    }


  }
</script>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.file.openDocument)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/file/file.html#opendocument)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.openDocument.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=openDocument&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=openDocument&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=openDocument&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=openDocument&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=openDocument)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=openDocument&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-document/open-document.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-document/open-document.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-document/open-document
```uvue
<template>
    <page-head :title="title"></page-head>
    <!-- #ifdef APP -->
    <scroll-view direction="vertical" style="flex:1">
    <!-- #endif -->
      <view class="uni-common-mt">
        <button v-for="(item, index) in fileList" :key="index" @click="openDocument(item)" style="margin: 10px;">
          打开 {{item.type}} 文件
        </button>
      </view>
    <!-- #ifdef APP -->
    </scroll-view>
    <!-- #endif -->
</template>

<script setup lang="uts">
  type FileItem = {
    type : string,
    url : string
  }

  const title = 'openDocument'
  const fileList = ref<Array<FileItem>>([
    {
      type: 'pdf',
      url: 'https://web-assets.dcloud.net.cn/unidoc/zh/helloworld.pdf'
    },
    {
      type: 'doc',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.doc'
    },
    {
      type: 'docx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.docx'
    },
    {
      type: 'ppt',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.ppt'
    },
    {
      type: 'pptx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.pptx'
    },
    {
      type: 'xls',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.xls'
    },
    {
      type: 'xlsx',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/helloworld.xlsx'
    },
    {
      type: 'zip',
      url: 'https://web-ext-storage.dcloud.net.cn/uni-app-x/file/to.zip'
    },
    {
      type: 'br',
      url: '/static/filemanager/1.txt.br'
    },
    {
      type: 'mp3',
      url: '/static/test-audio/ForElise.mp3'
    },
    {
      type: 'mp4',
      url: '/static/test-video/10second-demo.mp4'
    },
    {
      type: 'svg',
      url: '/static/test-image/logo.svg'
    }
  ])

  const openDocument = (item : FileItem) => {

    if (item.url.startsWith('http')) {
      uni.showLoading({
        title: '下载中',
        mask: true
      })
      uni.downloadFile({
        url: item.url,
        success: (res) => {
          uni.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              uni.hideLoading()
              console.log('打开文档成功')
            },
            fail: (err) => {
              uni.hideLoading()
              console.log('打开文档失败', err)
              uni.showToast({
                title: '错误码：' + err.errCode.toString(),
                icon: "error"
              })
            }
          })
        },
        fail: (err) => {
          uni.hideLoading()
          console.log('下载失败', err)
          uni.showToast({
            title: '下载失败：' + err.errCode.toString(),
            icon: "error"
          })
        }
      })
    } else {
      uni.openDocument({
        filePath: item.url,
        success: () => {
          console.log('打开文档成功')
        },
        fail: (err) => {
          console.log('打开文档失败', err)
          uni.showToast({
            title: '错误码：' + err.errCode.toString(),
            icon: "error"
          })
        }
      })
    }


  }
</script>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

