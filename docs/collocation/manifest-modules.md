# modules

## 模块的摇树@treeShaking

> HBuilderX 4.63之前的版本鸿蒙平台不支持根据使用情况自动添加模块，HBuilderX 4.63及之后的版本鸿蒙平台支持根据使用情况自动添加模块。鸿蒙平台独立于基础库之外的模块列表和安卓iOS不一致，详情参考：[鸿蒙平台模块配置](./manifest-harmony.md#modules)

uni-app x的Android基础库体积是7M，打包后的apk体积是基础库的体积加上开发者的代码及代码引用的模块的体积。有些模块涉及so库，覆盖的cpu指令越多，包体积越大。

在uni-app js引擎版中，内置模块如video，是开发者在manifest.json中手动勾选配置的。

但在uni-app x中，不需要手动配置。

HBuilderX3.93版本起，编译器支持扫描代码，摇树treeShaking，自动引入或剔除不需要的内置模块。

如应用中没有使用video组件相关功能，将不再包含video内置模块，减少安装包体积。

**摇树注意事项：**  
当你打包自定义基座时，如果你的工程代码没有使用video、定位、相册、摄像头等涉及三方sdk或敏感权限的api，打出的自定义基座包就不会包含这些组件和api的功能，那么在这些自定义基座上运行时，调用相关的组件和api就会报错。  
此时您需要在工程中写相关的代码，如引用video组件或调用定位api，保存代码后重新打包自定义基座，才会包含相关模块。

您在工程中下载的ext api、三方uts插件也同理，没有引用就不会打进去。

摇树不支持 `provider` 机制，定位（[uni-location](#uni-location), `HBuilderX4.61-`之前模块名字是 `uni-getLocation`） 和 支付（[uni-payment](#uni-payment)） 模块需要手动配置使用 Provider 依赖的三方SDK模块。

### app平台支持摇树的内置模块列表@utsmodules

- uni-ad
  [广告联盟](https://uniad.dcloud.net.cn/)模块（`HBuilderX4.0+`）  
    + 包括API：[uni.createRewardedVideoAd](../api/create-rewarded-video-ad.md)、[uni.createInterstitialAd](../api/create-interstitial-ad.md)
    + 依赖的模块：无
  
  注意：此模块仅包含基础广告模块，配置聚合广告平台需手动配置，详情参考[uni-ad](#uni-ad)章节

- uni-canvas
  [canvas画布组件](../component/canvas.md)模块（`HBuilderX4.25+`）
    + 包括内置组件：[canvas](../component/canvas.md)
    + 包括API：[uni.createCanvasContextAsync](../api/create-canvas-context-async.md)、[CanvasRenderingContext2D](../api/canvasrenderingcontext2d.md)、[UniCanvasElement](../dom/unicanvaselement.md)
    + 依赖的模块：无

- uni-chooseLocation
  [使用地图选择位置](../api/choose-location.md)模块（`HBuilderX4.33+`）
    + 包括API：[uni.chooseLocation](../api/choose-location.md)
    + 依赖的模块：uni-location(`HBuilderX4.61-`之前模块名字是 `uni-getLocation`)、uni-cloud-client、

- uni-cloud-client
  调用uniCloud[云函数/云对象](https://doc.dcloud.net.cn/uniCloud/cf-functions.html)模块
    + 包括API：[uniCloud.importObject](https://doc.dcloud.net.cn/uniCloud/cloud-obj.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%B0%83%E7%94%A8)、[uniCloud.callFunction](https://doc.dcloud.net.cn/uniCloud/cf-callfunction.html#callfunction%E6%96%B9%E6%B3%95)
    + 依赖的模块：uni-media、uni-network、uni-map-tencent

- uni-createInnerAudioContext
  [音频](../api/create-inner-audio-context.md)模块（`HBuilderX4.33+`）
    + 包括API：[uni.createInnerAudioContext](../api/create-inner-audio-context.md#createinneraudiocontext)
    + 依赖的模块：无

- uni-createRequestPermissionListener
  监听权限申请模块（`HBuilderX4.0+`）
    + 包括API：[uni.createRequestPermissionListener](../api/create-request-permission-listener.md)
    + 依赖的模块：无

  注意：HBuilderX4.0版本新增，仅App-Android平台支持。

- uni-createWebviewContext
  创建 web-view 组件的上下文对象模块
    + 包括API：[uni.createWebviewContext](../api/create-webview-context.md)
    + 依赖的模块：无

- uni-facialRecognitionVerify
  [uni实人认证](https://doc.dcloud.net.cn/uniCloud/frv/intro.html)模块
    + 包括API：[uni.getFacialRecognitionMetaInfo](../api/facial-recognition-verify.md#getfacialrecognitionmetainfo)、[uni.startFacialRecognitionVerify](../api/facial-recognition-verify.md#startfacialrecognitionverify)
    + 依赖的模块：无

- uni-fileSystemManager
  文件管理模块（`HBuilderX3.99+`）
    + 包括API：[uni.getFileSystemManager](../api/get-file-system-manager.md)
    + 依赖的模块：无

- uni-location(`HBuilderX4.61-`之前模块名字是 `uni-getLocation`)
  定位模块
    + 包括API：[uni.getLocation](../api/get-location.md)
    + 依赖的模块：无

  注意：此模块仅包含定位provider管理功能，需手动配置使用的定位实现模块，详情参考[uni-location](#uni-location)章节

- uni-getNetworkType
  获取网络类型模块
    + 包括API：[uni.getNetworkType](../api/get-network-type.md)
    + 依赖的模块：无

- uni-getProvider
  获取服务供应商模块（`HBuilderX4.11+`）
    + 包括API：[uni.getProvider](../api/get-provider.md#getprovider)
    + 依赖的模块：无

- uni-installApk
  安装apk模块（`HBuilderX3.99+`）
    + 包括API：[uni.installApk](../api/install-apk.md)
    + 依赖的模块：无
  
  注意：仅App-Android平台支持。

- uni-map-tencent
  [map地图组件](../component/map.md)模块（`HBuilderX4.31+`）
    + 包括内置组件：[map](../component/map.md)
    + 包括API：[uni.createMapContext](../api/create-map-context.md)
    + 依赖的模块：无

- uni-media
  多媒体相关API模块
    + 包括API：[uni.chooseImage](../api/choose-image.md)、[uni.saveImageToPhotosAlbum](../api/save-image-to-photos-album.md)、[uni.getImageInfo](../api/get-image-info.md)、[uni.compressImage](../api/compress-image.md)、[uni.chooseVideo](../api/choose-video.md)、[uni.saveVideoToPhotosAlbum](../api/save-video-to-photos-album.md)、[uni.getVideoInfo](../api/get-video-info.md)、[uni.compressVideo](../api/compress-video.md)
    + 依赖的模块：无

- uni-network
  网络请求（文件上传/下载）模块
    + 包括API：[uni.downloadFile](../api/download-file.md)、[uni.request](../api/request.md)、[uni.uploadFile](../api/upload-file.md)
    + 依赖的模块：无

- uni-payment
  uni-payment请求支付模块
    + 包括API：[uni.requestPayment](../api/request-payment.md)
    + 依赖的模块：无
  
  注意：此模块仅包含基础支付模块，需手动配置支付方式，详情参考[uni-payment](#uni-payment)章节

- uni-push
  [uni-push统一推送](https://uniapp.dcloud.net.cn/unipush-v2.html)模块（`HBuilderX3.97+`）
    + 包括API：[uni.createPushMessage](../api/push.md#createpushmessage)、[uni.getPushClientId](../api/push.md#getpushclientid)、[uni.offPushMessage](../api/push.md#offpushmessage)、[uni.onPushMessage](../api/push.md#onpushmessage)
    + 依赖的模块：无

- uni-shareWithSystem
  [系统分享](../api/share-with-system.md)模块（`HBuilderX4.33+`）
    + 包括API：[uni.shareWithSystem](../api/share-with-system.md#sharewithsystem)
    + 依赖的模块：无

- uni-verify
  [App一键登录](../api/get-univerify-manager.md)模块（`HBuilderX3.99+`）
    + 包括API：[uni.getUniverifyManager](../api/get-univerify-manager.md#getuniverifymanager)、[UniverifyManager.preLogin](../api/get-univerify-manager.md#prelogin)、[UniverifyManager.login](../api/get-univerify-manager.md#login)
    + 依赖的模块：无

- uni-video
  [video视频组件](../component/video.md)模块
    + 包括内置组件：[video](../component/video.md)
    + 包括API：[uni.createVideoContext](../api/create-video-context.md)
    + 依赖的模块：无

- uni-virtualPayment
  虚拟支付模块（`HBuilderX4.25+`）
    + 包括API：[uni.requestVirtualPayment](../api/virtual-payment.md#requestvirtualpayment)、[uni.getVirtualPaymentManager](../api/virtual-payment.md#getvirtualpaymentmanager)
    + 依赖的模块：无

- uni-websocket
  WebSocket模块
    + 包括API：[uni.connectSocket](../api/websocket-global.md)、[uni.onSocketOpen](../api/websocket-global.md#onsocketopen)、[uni.onSocketError](../api/websocket-global.md#onsocketerror)、[uni.sendSocketMessage](../api/websocket-global.md#sendsocketmessage)、[uni.onSocketMessage](../api/websocket-global.md#onsocketmessage)、[uni.closeSocket](../api/websocket-global.md#closesocket)、[uni.onSocketClose](../api/websocket-global.md#onsocketclose)
    + 依赖的模块：无

再次强调，以上模块不属于ext组件或api，是内置模块。但如果你的代码中没有使用这些组件和api，打正式包或自定义基座时会被摇掉。

**注意**

uts插件中暂不支持摇树，如果uts插件中使用了以上模块，需在使用此uts插件的 uni-app x 项目 manifest.json 文件中手动添加：  

- HBuilderX 4.71 及以上版本  
  + Android平台  
    需通过 manifest.json 的`源码视图`在 "app-android" -> "distribute" -> "modules" 下手动添加对应节点：  
    ```json
    {
      "app-android": {
        "distribute": {
          //以下示例手动添加  uni-media  模块
          modules:{
            "uni-media":{}
          }
        }
      }
    }
    ```
  + iOS平台  
    需通过 manifest.json 的`源码视图`在 "app-ios" -> "distribute" -> "modules" 下手动添加对应节点：  
    ```json
    {
      "app-ios": {
        "distribute": {
          //以下示例手动添加  uni-media  模块
          modules:{
            "uni-media":{}
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
        //以下示例手动添加  uni-media  模块
        modules:{
          "uni-media":{}
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


[uni-ad](https://uniad.dcloud.net.cn/) 是DCloud提供的聚合广告服务，使用前需先登录 [uni-ad 广告联盟](https://uniad.dcloud.net.cn/) 开通。

在uni-app x客户端，uni-ad是一个独立模块。该SDK已经在工信部完成SDK备案，确保隐私合规。

广告包括很多形式，其中有的需要开发代码调用，比如激励视频广告，另参考：[uni.createRewardedVideoAd](../api/create-rewarded-video-ad.md)

使用开屏广告不需要调用任何API，应用启动时会自动拉取并展示开屏广告。

这也导致 uni-ad 模块无法参与摇树。需要开发者在 manifest.json 中手动配置，打包后才能生效。

使用 uni-ad 模块需在 manifest.json 文件中添加 uni-ad 节点，并配置使用的广告 SDK。

::: tip Tips
为确保隐私合规及广告的正常展示，开发者需要在用户同意隐私政策时，主动调用[UTSAndroid.setPrivacyAgree(true)](../uts/utsandroid.md#setprivacyagree-state-boolean-void)。参考代码：
```uts
// #ifdef APP-ANDROID
UTSAndroid.setPrivacyAgree(true)
// #endif
```
:::
### 配置三方广告SDK

::: tip Tips  
HBuilderX4.31 支持打包界面直接勾选广告渠道，参考[App打包配置](../tutorial/app-package.md#uniad)。
:::

也可通过 manfiest.json 的 `源码视图` 在 app -> distribute -> modules 下添加 uni-ad 节点：
```json
	modules:{
		"uni-ad":{
			"gdt":{},
			"gm":{},
			"ks":{},
			"sigmob":{},
			"bd":{}
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

添加相应的节点，云端打包就会将对应的广告平台 SDK 打包到最终安装包中。

注意：
- 穿山甲GroMore、快手广告联盟、腾讯优量汇广告联盟、泛连仅支持`armeabi-v7a`和`arm64-v8a`两个CPU平台。

::: warning 注意事项
开屏广告展示前会先显示`splash启动界面`，等待开屏广告服务器返回数据后渲染开屏广告，超过2.5秒未成功加载广告则不显示开屏广告，直接进入应用首页。
app平台默认`启动界面`为白色（暗黑模式下为黑色），为了避免等待加载开屏广告时白屏，建议开通开屏广告后在manifest中配置`启动界面`，详情参考[splash启动界面](./manifest-splashscreen.md)
:::

#### 广告缓存

广告SDK在运行时可能会下载apk安装文件，占用手机的存储空间。下表列举了广告SDK的apk下载路径。开发者可以按需删除指定apk文件。

::: warning Tips
1. 广告平台内部会有清缓存的逻辑，达到一定条件之后，广告平台会自动删除。
2. 建议仅删除apk格式的文件，如果删除整个文件夹可能会造成广告加载速度变慢，部分广告平台功能受影响。由于部分广告平台直接下载apk到`cache`或`files`目录下，直接删除可能会造成应用部分功能异常。
3. 国际广告受google play上架限制，没有下载类广告。部分国内广告由于没有下载类广告的投放，也不会下载apk文件。
:::

| 广告平台名称				|apk缓存路径																								|
|:--								|:--																											|
|腾讯优量汇广告联盟	|/sdcard/Android/data/应用包名/cache/com_qq_e_download/apk	|
|穿山甲GroMore			|	/sdcard/Android/data/应用包名/files/Download							|
|	快手广告联盟				|/sdcard/Android/data/应用包名/files/ksadsdk/Download			|
|百度百青藤广告联盟	|	/sdcard/Android/data/应用包名/files/bddownload						|
|Sigmob广告联盟			|	/data/data/应用包名/cache/wind/webCache/									|
|AdScope倍孜广告		|	/sdcard/Android/data/应用包名/files/Beizi/download/			|
|Octopus章鱼移动广告	|/sdcard/Android/data/应用包名/files/Octopus/download/			|
|泛连								|/data/data/应用包名/cache/																|

## uni-payment@uni-payment
> HBuilderX 4.11+ 新增支持 uni-payment 请求支付 
> app-ios平台支付模块需HBuilderX4.18及以上版本

在uni-app x客户端，uni-payment是一个独立模块。需要开发者在 manifest.json 中手动配置，并提交云端打包后才能生效。

使用 uni-payment 模块需在 manifest.json 文件中配置Provider：  
- [Android平台](manifest-android.md#modulesPayment)  
- [iOS平台](manifest-ios.md#modulesPayment)  


## uni-location@uni-location
> HBuilderX 4.61- 之前模块名是 `uni-getLocation`
> HBuilderX 4.25+ 新增支持 provider 机制的获取定位API（支持system、tencent定位）

在uni-app x客户端，uni-location是一个独立模块。需要开发者在 manifest.json 中手动配置，并提交云端打包后才能生效。

使用 uni-location 模块需在 manifest.json 文件中配置Provider：  
- [Android平台](manifest-android.md#modulesLocation)  
- [iOS平台](manifest-ios.md#modulesLocation)  


## uni-map-tencent@uni-map-tencent

### 配置腾讯地图SDK的参数

使用腾讯地图需到 [腾讯位置服务](https://lbs.qq.com/) 官网申请TencentLBSAPIKey，并配置到应用中。 

- [Android平台](manifest-android.md#mapTencent)  
- [iOS平台](manifest-ios.md#mapTencent)  

#### Harmony平台配置腾讯地图Key @uni-map-tencent-harmony-key

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

同时还需要在 manifest.json 内配置 app.distribute.modules.uni-map，如下所示

```json
"app" : {
	"distribute" : {
		"modules" : {
			"uni-map" : {
				"tencent" : {}
			}
		}
	}
}
```

如果你用到了地图的定位功能，比如显示定位坐标，那么还需要配置定位模块，如下所示
`HBuilderX4.61-`之前模块名字是 `uni-getLocation`

```json
"app" : {
	"distribute" : {
		"modules" : {
			"uni-location" : {
				"system" : {},
				"tencent": {}
			},
			"uni-map" : {
				"tencent" : {}
			}
		}
	}
}
```

同时定位需要申请鸿蒙权限，修改 `/harmony-configs/entry/src/main/module.json5` 文件（如果没有这需要从鸿蒙基座复制）

注意：请修改reason内的字符串变量为你自己的值

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
uni-push是DCloud与合作伙伴个推共同推出的统一推送服务。  
包括在线推送、离线推送，离线推送聚合了Apple、华为、小米、OPPO、VIVO、魅族、荣耀(3.99+)、Google等多个手机厂商的推送通道。可在[DCloud开发者中心](https://dev.dcloud.net.cn/)申请开通及配置离线推送相关的厂商设置，详情参考文档[uni-push介绍](https://uniapp.dcloud.net.cn/unipush-v2.html)。  

- Android平台  
  可在manifest.json中配置离线推送使用的厂商推送SDK，详情参考[Android平台配置uni-push厂商推送SDK](./manifest-android.md#modulespush)。  
- iOS平台  
  根据摇树结果决定是否包含此模块，由于苹果厂商推送无需额外配置，包含uni-push模块就支持苹果厂商推送。  
