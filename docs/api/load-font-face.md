<!-- ## uni.loadFontFace(options) @loadfontface -->

::: sourceCode
## uni.loadFontFace(options) @loadfontface

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-loadFontFace


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-loadFontFace

:::

动态加载网络字体


### loadFontFace 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.10 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **LoadFontFaceOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| global | boolean | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: x; HarmonyOS: x | 是否全局生效微信小程序 '2.10.0'起支持全局生效。需在 app.uvue 中调用。 |
| family | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.10; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 定义的字体名称 |
| source | [string.FontURIString](/uts/data-type.md#ide-string) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.10; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 字体资源的地址, App-Android 平台不支持 woff、woff2 格式字体文件 |
| desc | **LoadFontFaceOptionDesc** | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: 4.10; HarmonyOS: x | 可选的字体描述符 |
| success | (result: [LoadFontFaceSuccess](#loadfontfacesuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.10; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (error: [LoadFontFaceFail](#loadfontfacefail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.10; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (res: [LoadFontFaceComplete](#loadfontfacecomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.10; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） |
| scopes | Array&lt;any&gt; | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 字体作用范围，可选值为 webview / native / skyline，默认全选，设置 native 可在 Canvas 2D 下使用<br/> | 

##### desc 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| style | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| weight | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| variant | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### LoadFontFaceSuccess 的属性值 @loadfontfacesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### LoadFontFaceFail 的属性值 @loadfontfacefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| status | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 加载字体结果<br/> |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 4 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 框架内部异常 |
| 99 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | page is not ready |
| 101 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |
| 100001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | family is null |
| 100002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | source is null |
| 200001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | local font not found |
| 300001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | same source task is loading |
| 300002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | download fail |

#### LoadFontFaceComplete 的属性值 @loadfontfacecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**LoadFontFaceSuccess**> | 否 |

#### Promise\<LoadFontFaceSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 注意事项
- `app-ios 平台` 加载字体一定是全局生效，不支持通过global属性设置为非全局生效
- source 属性指定自定义字体路径，支持本地文件路径、远程地址，app 平台 4.33 版本开始支持 base64 格式数据；必须使用`url()`包裹。可能某些平台不包裹也可以生效，但标准规范是包裹，按标准写法才能全端生效。如下：
  ```uts
  uni.loadFontFace({
    global: true,
    family: 'UniFontFamily',
    source: "url('/static/font/uni.ttf')", //需使用url方法包裹。本地字体请放在/static目录下，否则打包时不会把字体文件打进去。也支持网络字体
    success() {
      console.log('global loadFontFace uni.ttf success')
    },
    fail(error) {
      console.warn('global loadFontFace uni.ttf fail', error.errMsg)
    },
  })
  ```
- `HarmonyOS 注意事项`
  1. 使用 [@ohos.font](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V13/js-apis-font-V13?ha_source=Dcloud&ha_sourceId=89000448) 实现
    - [x] ttf
    - [x] otf
  2. base64 格式字体是通过转换成 buffer 保存在磁盘上并引入实现的，因此页面上过多的使用 base64 可能会有性能问题
  3. HarmonyOS 字体都是全局生效的

不同平台支持的字体格式不同，另见[css字体](../css/font-family.md)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/load-font-face/load-font-face.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/load-font-face/load-font-face.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/load-font-face/load-font-face

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/load-font-face/load-font-face

>示例
```vue
<template>
  <page-head title="loadFontFace"></page-head>
  <view class="uni-padding-wrap">
    <text class="font-size-20">全局加载字体：</text>
    <text class="font-size-20 line-height-40" style="font-family: UniFontFamily">font-family: uni.ttf</text>
    <view style="flex-direction: row;">
      <!-- 微信小程序只支持加载网络字体 -->
      <!-- #ifdef MP-WEIXIN -->
      <text class="font-size-20" style="font-family: UniFontFamily2;">{{data.uniIcon3}}</text>
      <text class="icon-text">\ue102</text>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <text class="font-size-20" style="font-family: UniFontFamily;">{{data.uniIcon1}}</text>
      <text class="icon-text">\ue100</text>
      <text class="font-size-20" style="font-family: UniFontFamily;">{{data.uniIcon2}}</text>
      <text style="margin-left:5px;line-height:22px;">\ue101</text>
      <!-- #endif -->
    </view>
    <!-- #ifndef APP-HARMONY -->
    <text class="uni-common-mt font-size-20">非全局加载字体：</text>
    <!-- #endif -->
    <text class="font-size-20 line-height-40">font-family: uni.ttf(base64格式)</text>
    <view style="flex-direction: row;">
      <text class="font-size-20" style="font-family: UniFontFamily2;">{{data.uniIcon3}}</text>
      <text class="icon-text">\ue102</text>
    </view>
    <text class="font-size-20 line-height-40" style="font-family: AlimamaDaoLiTiTTF">font-family: 阿里妈妈刀隶体-ttf
      (网络字体下载后生效)</text>
    <text class="font-size-20 line-height-40" style="font-family: AlimamaDaoLiTiOTF">font-family:
      阿里妈妈刀隶体-otf</text>

    <!-- #ifdef APP-IOS -->
    <text class="item" style="font-family: AlimamaDaoLiTiWOFF">font-family: 阿里妈妈刀隶体-woff</text>
    <text class="item" style="font-family: AlimamaDaoLiTiWOFF2">font-family: 阿里妈妈刀隶体-woff2</text>
    <!-- #endif -->
    <button class="uni-btn" @click="navigateToChild">跳转子页面测试字体生效范围</button>
  </view>
</template>
<script setup lang="uts">
  type DataType = {
    uniIcon1: string;
    uniIcon2: string;
    uniIcon3: string;
    successTriggeredNum: number;
    loadFontStatus: Array<boolean>;
  }

  const data = reactive({
    uniIcon1: '\ue100',
    uniIcon2: '\ue101',
    uniIcon3: '\ue102',
    successTriggeredNum: 0,
    // 字体加载状态数组
    loadFontStatus: [false, false, false, false],
  } as DataType)

  const navigateToChild = () => {
    uni.navigateTo({
      url: '/pages/API/load-font-face/load-font-face-child',
    })
  }

  onLoad(() => {
    let status1 = false
    uni.loadFontFace({
      global: true,
      family: 'UniFontFamily',
      source: "url('/static/font/uni.ttf')",
      success() {
        data.successTriggeredNum++;
        status1 = true;
      },
      fail(error) {
        console.warn('global loadFontFace uni.ttf fail', error.errMsg)
        status1 = false;
      },
      complete: () => {
        console.log('uni-font-family complete')
        // 在complete中检查状态，如果都为true则认为测试通过
        if (status1 == true) {
          data.loadFontStatus[0] = true;
        }
      }
    })
    let status2 = false
    uni.loadFontFace({
      family: 'UniFontFamily2',
      source: "url(data:font/ttf;charset=utf-8;base64,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)",
      success() {
        data.successTriggeredNum++;
        status2 = true;
        console.log('loadFontFace uni.ttf(base64 format) success')
      },
      fail(error) {
        status2 = false;
        console.warn('loadFontFace uni.ttf(base64 format) fail', error.errMsg)
      },
      complete:()=> {
        // 在complete中检查状态，如果都为true则认为测试通过
        if (status2 == true) {
          data.loadFontStatus[1] = true;
        }
      }
    })
    // 重置回调状态
    let status3 = false
    uni.loadFontFace({
      family: 'AlimamaDaoLiTiTTF',
      source:
        "url('https://qiniu-web-assets.dcloud.net.cn/uni-app-x/static/font/AlimamaDaoLiTi.ttf')",
      success() {
        data.successTriggeredNum++;
        status3 = true;
        console.log('loadFontFace Remote AlimamaDaoLiTi.ttf success')
      },
      fail(error) {
        status3 = false;
        console.warn('loadFontFace Remote AlimamaDaoLiTi.ttf fail', error.errMsg)
      },
      complete:()=> {
        if (status3 == true) {
          data.loadFontStatus[2] = true;
        }
      }
    })
    // 重置回调状态
    let status4 = false
    uni.loadFontFace({
      family: 'AlimamaDaoLiTiOTF',
      source: "url('/static/font/AlimamaDaoLiTi.otf')",
      success() {
        data.successTriggeredNum++;
        status4 = true;
        console.log('loadFontFace AlimamaDaoLiTi.otf success')
      },
      fail(error) {
        status4 = false;
        console.warn('loadFontFace AlimamaDaoLiTi.otf fail', error.errMsg)
      },
      complete:()=> {
        if (status4 == true) {
          data.loadFontStatus[3] = true;
        }
      }
    })
    // #ifdef APP-IOS
    data.loadFontStatus.push(false, false);

    // 重置回调状态
    let status5 = false
    uni.loadFontFace({
      family: 'AlimamaDaoLiTiWOFF',
      source: "url('/static/app-ios/AlimamaDaoLiTi.woff')",
      success() {
        data.successTriggeredNum++;
        status5 = true;
        console.log('loadFontFace AlimamaDaoLiTi.woff success')
      },
      fail(error) {
        status5 = false;
        console.warn('loadFontFace AlimamaDaoLiTi.woff fail', error.errMsg)
      },
      complete:()=> {
        if (status5 == true) {
          data.loadFontStatus[4] = true;
        }
      }
    })
    // 重置回调状态
    let status6 = false
    uni.loadFontFace({
      family: 'AlimamaDaoLiTiWOFF2',
      source: "url('/static/app-ios/AlimamaDaoLiTi.woff2')",
      success() {
        data.successTriggeredNum++;
        status6 = true;
        console.log('loadFontFace AlimamaDaoLiTi.woff2 success')
      },
      fail(error) {
        status6 = false;
        console.warn('loadFontFace AlimamaDaoLiTi.woff2 fail', error.errMsg)
      },
      complete:()=> {
        if (status6 == true) {
          data.loadFontStatus[5] = true;
        }
      }
    })
    // #endif

  })

  defineExpose({
    data
  })
</script>

<style>
  .font-size-20 {
    font-size: 20px;
  }

  .line-height-40 {
    line-height: 40px;
  }

  .icon-text{
    margin-left:5px;
    margin-right: 20px;
    line-height:22px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.loadFontFace)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/font.html#loadfontface)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=loadFontFace&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=loadFontFace&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=loadFontFace&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=loadFontFace&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=loadFontFace)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=loadFontFace&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

