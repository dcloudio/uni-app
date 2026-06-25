# App 模块配置

## 模块摇树 @treeShaking

> HBuilderX 4.63 之前的版本，鸿蒙平台不支持根据使用情况自动添加模块；HBuilderX 4.63 及之后的版本，鸿蒙平台支持根据使用情况自动添加模块。鸿蒙平台独立于基础库之外的模块列表与 Android、iOS 不一致，详情参考：[鸿蒙平台模块配置](./manifest-harmony.md#modules)

uni-app x 的 Android 平台（VDOM模式）基础库体积约 7M，打包后的 APK 体积由基础库、开发者代码以及代码引用的模块共同组成。有些模块包含 .so 库，支持的 CPU 架构越多，包体积越大。

在 uni-app js 引擎版中，video 等内置模块需要开发者在 manifest.json 中手动勾选配置。

在 uni-app x 中，多数内置模块可通过摇树自动添加，一般不需要手动配置。

HBuilderX 3.93 起，编译器支持扫描代码并进行 tree shaking（摇树），自动引入代码中使用到的内置模块，剔除未使用的内置模块。

如应用中没有使用 video 组件相关功能，将不再包含 video 内置模块，从而减少安装包体积。

**摇树注意事项：**
当你打包自定义基座时，如果工程代码没有使用 video、定位、相册、摄像头等涉及三方 SDK 或敏感权限的组件/API，打出的自定义基座就不会包含这些组件/API 对应的模块。在这些自定义基座上运行时，再调用相关组件/API 就会报错。
此时需要在工程中加入相关代码，例如引用 video 组件或调用定位 API，保存代码后重新打包自定义基座，才会包含相关模块。

工程中下载的 ext API、三方 uts 插件也同理，没有引用就不会打进安装包。

摇树只能识别基础模块是否被使用，不能自动判断 `provider` 机制下具体要使用哪一个服务商 SDK。因此定位（[uni-location](#uni-location)，HBuilderX 4.61 之前模块名为 `uni-getLocation`）、支付（[uni-payment](#uni-payment)）、登录（[uni-oauth](#uni-oauth)）和分享（[uni-share](#uni-share)）等模块，可以由摇树添加基础模块，但仍需手动配置实际使用的 provider 及其依赖的三方 SDK。

### App 平台支持摇树的模块列表 @utsmodules

- uni-oauth
  三方登录模块 （`HBuilderX 5.08+`）
    + 包括 API：[uni.login](../api/sign-in.md#login)
    + 依赖的模块：无

  注意：此模块仅包含基础登录模块，需手动配置需要使用的登录方式，详情参考[uni-oauth](#uni-oauth)章节

- uni-share
  三方分享模块 （`HBuilderX 5.08+`）
    + 包括 API：[uni.share](../api/share.md)
    + 依赖的模块：无

  注意：此模块仅包含基础分享模块，需手动配置需要使用的分享方式，详情参考[uni-share](#uni-share)章节

- uni-ad
  [广告联盟](https://uniad.dcloud.net.cn/)模块（`HBuilderX 4.0+`）
    + 包括 API：[uni.createRewardedVideoAd](../api/create-rewarded-video-ad.md)、[uni.createInterstitialAd](../api/create-interstitial-ad.md)
    + 依赖的模块：无

  注意：此模块仅包含基础广告模块，配置聚合广告平台需手动配置，详情参考[uni-ad](#uni-ad)章节

- uni-canvas
  [画布（canvas）组件](../component/canvas.md)模块（`HBuilderX 4.25+`）
    + 包括内置组件：[canvas](../component/canvas.md)
    + 包括 API：[uni.createCanvasContextAsync](../api/create-canvas-context-async.md)、[CanvasRenderingContext2D](../api/canvasrenderingcontext2d.md)、[UniCanvasElement](../api/dom/unicanvaselement.md)
    + 依赖的模块：无

- uni-chooseLocation
  [使用地图选择位置](../api/choose-location.md)模块（`HBuilderX 4.33+`）
    + 包括 API：[uni.chooseLocation](../api/choose-location.md)
    + 依赖的模块：uni-location（HBuilderX 4.61 之前模块名为 `uni-getLocation`）、uni-map-tencent

- uni-cloud-client
  调用 uniCloud [云函数/云对象](https://doc.dcloud.net.cn/uniCloud/cf-functions.html)模块
    + 包括 API：[uniCloud.importObject](https://doc.dcloud.net.cn/uniCloud/cloud-obj.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E7%94%A8)、[uniCloud.callFunction](https://doc.dcloud.net.cn/uniCloud/cf-callfunction.html#callfunction%E6%96%B9%E6%B3%95)
    + 依赖的模块：uni-network

- uni-createInnerAudioContext
  [音频](../api/create-inner-audio-context.md)模块（`HBuilderX 4.33+`）
    + 包括 API：[uni.createInnerAudioContext](../api/create-inner-audio-context.md#createinneraudiocontext)
    + 依赖的模块：无

- uni-createRequestPermissionListener
  监听权限申请模块（`HBuilderX 4.0+`）
    + 包括 API：[uni.createRequestPermissionListener](../api/create-request-permission-listener.md)
    + 依赖的模块：无

  注意：HBuilderX 4.0 版本新增，仅 App-Android 平台支持。

- uni-createWebviewContext
  创建 web-view 组件的上下文对象模块
    + 包括 API：[uni.createWebviewContext](../api/create-webview-context.md)
    + 依赖的模块：无

- uni-facialRecognitionVerify
  [uni 实人认证](https://doc.dcloud.net.cn/uniCloud/frv/intro.html)模块
    + 包括 API：[uni.getFacialRecognitionMetaInfo](../api/facial-recognition-verify.md#getfacialrecognitionmetainfo)、[uni.startFacialRecognitionVerify](../api/facial-recognition-verify.md#startfacialrecognitionverify)
    + 依赖的模块：无

- uni-fileSystemManager
  文件管理模块（`HBuilderX 3.99+`）
    + 包括 API：[uni.getFileSystemManager](../api/get-file-system-manager.md)
    + 依赖的模块：无

- uni-location（HBuilderX 4.61 之前模块名为 `uni-getLocation`）
  定位模块
    + 包括 API：[uni.getLocation](../api/get-location.md)
    + 依赖的模块：无

  注意：此模块仅包含定位 provider 管理功能，需手动配置使用的定位实现模块，详情参考[uni-location](#uni-location)章节

- uni-getNetworkType
  获取网络类型模块
    + 包括 API：[uni.getNetworkType](../api/get-network-type.md)
    + 依赖的模块：无

- uni-getProvider
  获取服务供应商模块（`HBuilderX 4.11+`）
    + 包括 API：[uni.getProvider](../api/get-provider.md#getprovider)
    + 依赖的模块：无

- uni-installApk
  安装 APK 模块（`HBuilderX 3.99+`）
    + 包括 API：[uni.installApk](../api/install-apk.md)
    + 依赖的模块：无

  注意：仅 App-Android 平台支持。

- uni-map-tencent
  [map 地图组件](../component/map.md)模块（`HBuilderX 4.31+`）
    + 包括内置组件：[map](../component/map.md)
    + 包括 API：[uni.createMapContext](../api/create-map-context.md)
    + 依赖的模块：无

- uni-media
  多媒体相关 API 模块
    + 包括 API：[uni.chooseImage](../api/choose-image.md)、[uni.saveImageToPhotosAlbum](../api/save-image-to-photos-album.md)、[uni.getImageInfo](../api/get-image-info.md)、[uni.compressImage](../api/compress-image.md)、[uni.chooseVideo](../api/choose-video.md)、[uni.saveVideoToPhotosAlbum](../api/save-video-to-photos-album.md)、[uni.getVideoInfo](../api/get-video-info.md)、[uni.compressVideo](../api/compress-video.md)
    + 依赖的模块：无

- uni-network
  网络请求（文件上传/下载）模块
    + 包括 API：[uni.downloadFile](../api/download-file.md)、[uni.request](../api/request.md)、[uni.uploadFile](../api/upload-file.md)
    + 依赖的模块：无

- uni-payment
  请求支付模块
    + 包括 API：[uni.requestPayment](../api/request-payment.md)
    + 依赖的模块：无

  注意：此模块仅包含基础支付模块，需手动配置支付方式，详情参考[uni-payment](#uni-payment)章节

- uni-push
  [统一推送](https://uniapp.dcloud.net.cn/unipush-v2.html)模块（`HBuilderX 3.97+`）
    + 包括 API：[uni.createPushMessage](../api/push.md#createpushmessage)、[uni.getPushClientId](../api/push.md#getpushclientid)、[uni.offPushMessage](../api/push.md#offpushmessage)、[uni.onPushMessage](../api/push.md#onpushmessage)
    + 依赖的模块：无

- uni-shareWithSystem
  [系统分享](../api/share-with-system.md)模块（`HBuilderX 4.33+`）
    + 包括 API：[uni.shareWithSystem](../api/share-with-system.md#sharewithsystem)
    + 依赖的模块：无

- uni-verify
  [App 一键登录](../api/get-univerify-manager.md)模块（`HBuilderX 3.99+`）
    + 包括 API：[uni.getUniverifyManager](../api/get-univerify-manager.md#getuniverifymanager)、[UniverifyManager.preLogin](../api/get-univerify-manager.md#prelogin)、[UniverifyManager.login](../api/get-univerify-manager.md#login)
    + 依赖的模块：无

- uni-video
  [视频（video）组件](../component/video.md)模块
    + 包括内置组件：[video](../component/video.md)
    + 包括 API：[uni.createVideoContext](../api/create-video-context.md)
    + 依赖的模块：无

- uni-virtualPayment
  虚拟支付模块（`HBuilderX 4.25+`）
    + 包括 API：[uni.requestVirtualPayment](../api/virtual-payment.md#requestvirtualpayment)、[uni.getVirtualPaymentManager](../api/virtual-payment.md#getvirtualpaymentmanager)
    + 依赖的模块：无

- uni-websocket
  WebSocket 模块
    + 包括 API：[uni.connectSocket](../api/websocket-global.md)、[uni.onSocketOpen](../api/websocket-global.md#onsocketopen)、[uni.onSocketError](../api/websocket-global.md#onsocketerror)、[uni.sendSocketMessage](../api/websocket-global.md#sendsocketmessage)、[uni.onSocketMessage](../api/websocket-global.md#onsocketmessage)、[uni.closeSocket](../api/websocket-global.md#closesocket)、[uni.onSocketClose](../api/websocket-global.md#onsocketclose)
    + 依赖的模块：无

再次强调，以上模块不属于 ext 组件或 ext API，而是内置模块。但如果代码中没有使用这些组件或 API，打正式包或自定义基座时会被摇树剔除。


### 手动配置使用的模块

uts 插件中暂不支持摇树。如果 uts 插件中使用了以上模块，需在使用此 uts 插件的 uni-app x 项目 manifest.json 文件中手动添加对应模块：

- HBuilderX 4.71 及以上版本  
  + Android 平台  
    需通过 manifest.json 的`源码视图`在 "app-android" -> "distribute" -> "modules" 下手动添加对应节点：
    ```json
    {
      "app-android": {
        "distribute": {
          // 以下示例手动添加 uni-media 模块
          "modules": {
            "uni-media": {}
          }
        }
      }
    }
    ```
  + iOS 平台  
    需通过 manifest.json 的`源码视图`在 "app-ios" -> "distribute" -> "modules" 下手动添加对应节点：
    ```json
    {
      "app-ios": {
        "distribute": {
          // 以下示例手动添加 uni-media 模块
          "modules": {
            "uni-media": {}
          }
        }
      }
    }
    ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" 下手动添加对应节点：
  ```json
  {
    "app": {
      "distribute": {
        // 以下示例手动添加 uni-media 模块
        "modules": {
          "uni-media": {}
        }
      }
    }
  }
  ```



## uni-ad@uni-ad

**开屏广告兼容性**

|Web|Android|iOS	|
|--	|--			|--		|
|x	|3.99		|4.22	|


[uni-ad](https://uniad.dcloud.net.cn/) 是 DCloud 提供的聚合广告服务，使用前需先登录 [uni-ad 广告联盟](https://uniad.dcloud.net.cn/) 开通。

在 uni-app x 客户端，uni-ad 是一个独立模块。该 SDK 已经在工信部完成 SDK 备案，确保隐私合规。

广告包括很多形式，其中有的需要开发代码调用，比如激励视频广告，另参考：[uni.createRewardedVideoAd](../api/create-rewarded-video-ad.md)

使用开屏广告不需要调用任何 API，应用启动时会自动拉取并展示开屏广告。

这也导致 uni-ad 的广告渠道 SDK 无法完全依赖摇树决定，需要开发者在 manifest.json 中手动配置，打包后才能生效。

使用 uni-ad 模块需在 manifest.json 文件中添加 uni-ad 节点，并配置使用的广告 SDK。

::: tip Tips
为确保隐私合规及广告的正常展示，开发者需要在用户同意隐私政策时，主动调用[UTSAndroid.setPrivacyAgree(true)](../uts/utsandroid.md#setprivacyagree-state-boolean-void)。参考代码：
```uts
// #ifdef APP-ANDROID
UTSAndroid.setPrivacyAgree(true)
// #endif
```
:::
### 配置三方广告 SDK

::: tip Tips
HBuilderX 4.31 支持打包界面直接勾选广告渠道，参考[App打包配置](../tutorial/app-package.md#uniad)。
:::

也可通过 manifest.json 的`源码视图`手动添加 uni-ad 节点：

- HBuilderX 4.71 及以上版本  
  Android 平台需在 "app-android" -> "distribute" -> "modules" 下添加：
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-ad": {
            "gdt": {},
            "gm": {},
            "ks": {},
            "sigmob": {},
            "bd": {}
          }
        }
      }
    }
  }
  ```
  iOS 平台需在 "app-ios" -> "distribute" -> "modules" 下添加：
  ```json
  {
    "app-ios": {
      "distribute": {
        "modules": {
          "uni-ad": {
            "gdt": {},
            "gm": {},
            "ks": {},
            "sigmob": {},
            "bd": {}
          }
        }
      }
    }
  }
  ```


- HBuilderX 4.71 以下版本  
  需在 "app" -> "distribute" -> "modules" 下添加：
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-ad": {
            "gdt": {},
            "gm": {},
            "ks": {},
            "sigmob": {},
            "bd": {}
          }
        }
      }
    }
  }
  ```

其中 uni-ad 下的节点表示要聚合的广告平台：

| 标识		| 广告平台名称			|Web|Android|iOS	|
| :-		| :-					|:-	|:-		|:-		|
| gdt		| 腾讯优量汇广告联盟		|x	|3.99	|4.22	|
| gm		| 穿山甲GroMore			|x	|3.99	|4.22	|
| ks		| 快手广告联盟			|x	|3.99	|4.22	|
| bd		| 百度百青藤广告联盟		|x	|3.99	|4.22	|
| sigmob	| Sigmob广告联盟			|x	|3.99	|4.22	|
| hw		| 华为鲸鸿动能			|x	|4.31	|x		|
| bz		| AdScope倍孜广告		|x	|4.31	|x		|
| zy		| Octopus章鱼移动广告		|x	|4.31	|4.31	|
| fl		| 泛连					|x	|4.31	|x		|
| jl		| 聚力阅盟				|x	|4.31	|x		|
| gg		| google AdMob			|x	|4.31	|4.31	|
| pg		| Pangle				|x	|4.31	|4.31	|
| inmobi	| inMobi				|x	|4.31	|4.31	|
| ironsource| ironSource			|x	|4.31	|4.31	|
| liftoff	| Liftoff				|x	|4.31	|4.31	|
| meta		| Meta Audience Network	|x	|4.31	|4.31	|
| mintegral	| Mintegral				|x	|4.31	|4.31	|
| unity		| Unity Ads				|x	|4.31	|4.31	|
| applovin		| AppLovin			|x	|4.81	|4.81	|

添加相应节点后，云端打包会将对应广告平台 SDK 打包到最终安装包中。

注意：
- 穿山甲 GroMore、快手广告联盟、腾讯优量汇广告联盟、泛连仅支持 `armeabi-v7a` 和 `arm64-v8a` 两个 CPU 架构。

::: warning 注意事项
开屏广告展示前会先显示`splash启动界面`，等待开屏广告服务器返回数据后渲染开屏广告，超过 2.5 秒未成功加载广告则不显示开屏广告，直接进入应用首页。
App 平台默认`启动界面`为白色（暗黑模式下为黑色）。为了避免等待加载开屏广告时白屏，建议开通开屏广告后在 manifest 中配置`启动界面`，详情参考[splash启动界面](./manifest-splashscreen.md)。
:::

#### 广告缓存

广告 SDK 在运行时可能会下载 APK 安装文件，占用手机存储空间。下表列举了广告 SDK 的 APK 下载路径。开发者可以按需删除指定 APK 文件。

::: warning Tips
1. 广告平台内部会有清缓存的逻辑，达到一定条件之后，广告平台会自动删除。
2. 建议仅删除 APK 格式的文件。如果删除整个文件夹，可能会造成广告加载速度变慢，部分广告平台功能受影响。由于部分广告平台直接下载 APK 到 `cache` 或 `files` 目录下，直接删除可能会造成应用部分功能异常。
3. 国际广告受 Google Play 上架限制，没有下载类广告。部分国内广告由于没有下载类广告投放，也不会下载 APK 文件。
:::

| 广告平台名称				|APK缓存路径																								|
|:--								|:--																											|
|腾讯优量汇广告联盟	|/sdcard/Android/data/应用包名/cache/com_qq_e_download/apk	|
|穿山甲GroMore			|	/sdcard/Android/data/应用包名/files/Download							|
|	快手广告联盟				|/sdcard/Android/data/应用包名/files/ksadsdk/Download			|
|百度百青藤广告联盟	|	/sdcard/Android/data/应用包名/files/bddownload						|
|Sigmob广告联盟			|	/data/data/应用包名/cache/wind/webCache/									|
|AdScope倍孜广告		|	/sdcard/Android/data/应用包名/files/Beizi/download/			|
|Octopus章鱼移动广告	|/sdcard/Android/data/应用包名/files/Octopus/download/			|
|泛连								|/data/data/应用包名/cache/																|


## uni-oauth@uni-oauth
> HBuilderX 5.08+ 新增支持 uni-oauth 三方登录

uni-app x 项目中 uni-oauth 基于 [provider](../api/provider.md) 机制实现。
需在 `manifest.json` 中手动配置三方登录服务供应商：
- [Android 平台](manifest-android.md#modulesoauth)
- [iOS 平台](manifest-ios.md#modulesoauth)

**注意**
- 标准基座已包含 `微信登录`
- 自定义基座需提交云端打包后才能生效


## uni-share@uni-share
> HBuilderX 5.08+ 新增支持 uni-share 分享

uni-app x 项目中 uni-share 基于 [provider](../api/provider.md) 机制实现。
需在 `manifest.json` 中手动配置三方分享服务供应商：
- [Android 平台](manifest-android.md#modulesshare)
- [iOS 平台](manifest-ios.md#modulesshare)

**注意**
- 标准基座已包含 `微信分享`
- 自定义基座需提交云端打包后才能生效


## uni-payment@uni-payment
> HBuilderX 4.11+ 新增支持 uni-payment 请求支付
> app-ios 平台支付模块需 HBuilderX 4.18 及以上版本

uni-app x 项目中 uni-payment 基于 [provider](../api/provider.md) 机制实现。
需在 `manifest.json` 中手动配置三方支付服务供应商：
- [Android 平台](manifest-android.md#modulespayment)
- [iOS 平台](manifest-ios.md#modulespayment)

**注意**
- 标准基座已包含 `微信支付`、`支付宝支付`
- 自定义基座需提交云端打包后才能生效


## uni-location@uni-location
> HBuilderX 4.61 之前模块名是 `uni-getLocation`
> HBuilderX 4.25+ 新增支持 provider 机制的获取定位 API（支持 `system`、`tencent` 定位）

uni-app x 项目中 uni-location 基于 [provider](../api/provider.md) 机制实现。
需在 `manifest.json` 中手动配置三方定位服务供应商：
- [Android 平台](manifest-android.md#moduleslocation)
- [iOS 平台](manifest-ios.md#moduleslocation)

**注意**
- 标准基座已包含 `系统定位`、`腾讯定位`
- 自定义基座需提交云端打包后才能生效


## uni-map-tencent@uni-map-tencent

目前地图模块仅支持腾讯地图作为服务商。虽然支持通过摇树自动添加模块，但由于仍需手动配置腾讯地图 SDK 的各项参数，因此无法完全依赖摇树。

### 配置腾讯地图 SDK 的参数

使用腾讯地图需到 [腾讯位置服务](https://lbs.qq.com/) 官网申请 `TencentLBSAPIKey`，并配置到应用中。

- [Android 平台](manifest-android.md#maptencent)
- [iOS 平台](manifest-ios.md#maptencent)

#### Harmony 平台配置腾讯地图 Key @uni-map-tencent-harmony-key

在项目根目录下添加 `/harmony-configs/entry/src/main/module.json5` 文件（目录没有就新建），将申请的 key 配置到 metadata 属性中，文件内容如下：

```json5
{
  "module": {
    "name": "entry",
    "type": "entry",
    "description": "$string:module_desc",
    "mainElement": "EntryAbility",
    "deviceTypes": [
      "phone",
      "tablet",
      "2in1"
    ],
    "deliveryWithInstall": true,
    "installationFree": false,
    "pages": "$profile:main_pages",
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "description": "$string:EntryAbility_desc",
        "icon": "$media:layered_image",
        "label": "$string:EntryAbility_label",
        "startWindowIcon": "$media:startIcon",
        "startWindowBackground": "$color:start_window_background",
        "exported": true,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ]
      }
    ],
    "metadata": [
      {
        "name": "TENCENT_MAP_KEY",
        "value": "你的腾讯地图Key"
      }
    ],
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```

同时还需要在 manifest.json 内配置 `app.distribute.modules.uni-map`，如下所示：

```json
{
  "app": {
    "distribute": {
      "modules": {
        "uni-map": {
          "tencent": {}
        }
      }
    }
  }
}
```

如果你用到了地图的定位功能，比如显示定位坐标，那么还需要配置定位模块，如下所示。
HBuilderX 4.61 之前模块名为 `uni-getLocation`。

```json
{
  "app": {
    "distribute": {
      "modules": {
        "uni-location": {
          "system": {},
          "tencent": {}
        },
        "uni-map": {
          "tencent": {}
        }
      }
    }
  }
}
```

同时定位需要申请鸿蒙权限，修改 `/harmony-configs/entry/src/main/module.json5` 文件（如果没有该文件，需要从鸿蒙基座复制）。

注意：请将 `reason` 内的字符串变量修改为你自己的值。

```json5
{
	"module": {
		// ...其他配置
		// 权限配置
		"requestPermissions": [
			{
				"name": "ohos.permission.INTERNET"
			},
			{
				"name": "ohos.permission.LOCATION",
				"usedScene": {},
				"reason": "$string:EntryAbility_label"
			},
			{
				"name": "ohos.permission.APPROXIMATELY_LOCATION",
				"usedScene": {},
				"reason": "$string:EntryAbility_label"
			}
		]
	}
}
```


## uni-push @uni-push
uni-push 是 DCloud 与合作伙伴个推共同推出的统一推送服务。
包括在线推送、离线推送，离线推送聚合了 Apple、华为、小米、OPPO、VIVO、魅族、荣耀（3.99+）、Google 等多个手机厂商的推送通道。

虽然支持通过摇树自动添加 uni-push 模块，但离线推送的手机厂商通道需要在[DCloud开发者中心](https://dev.dcloud.net.cn/)申请开通及配置离线推送相关的厂商设置，详情参考文档[uni-push介绍](https://uniapp.dcloud.net.cn/unipush-v2.html)。

- Android 平台
  可在 manifest.json 中配置离线推送使用的厂商推送 SDK，详情参考[Android 平台配置 uni-push 厂商推送 SDK](./manifest-android.md#modulespush)。
- iOS 平台
  根据摇树结果决定是否包含此模块。苹果厂商推送无需额外配置，包含 uni-push 模块后即可支持苹果厂商推送。
