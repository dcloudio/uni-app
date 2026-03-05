## 集成/制作DCloudUTSExtAPI

### 新建原生工程
1. 启动`Xcode`，点击`File->New->Project`，选择`Framework`点击`Next`
2. `Product Name`中填写`DCloudUTSExtAPI`，点击`Next`即可完成创建


### 工程环境设置
`Target -> General -> Minimum Deployments` 选择 `12.0`  

`Target -> Build Settings -> Mach-O Type` 设置为`Dynamic Library`  

`Target -> Build Settings -> Other Linker Flags` 中添加`-ObjC`, 字母o和c大写  

`Target -> Build Settings -> Enable Module Verifier` 设置为`NO`  

`Target -> Build Settings -> Build Libraries for Distribution` 设置为`YES`  

`Target -> Build Settings -> Framework Search Paths` 中添加SDK的Libs目录（操作方法：双击展开`Framework Search Paths`将`SDK/Libs`文件夹拖入即可）  

### 配置基础模块(必须)
将以下源文件(`SDK/ExtApiSrc 目录下`)、依赖库(`SDK/Libs 目录下`)添加到`DCloudUTSExtAPI`工程中，并将依赖库均设置为`Do Not Embed`

| 源文件 | 依赖库 | 资源文件 |
| ---   | ---| ---|
| UTSOC.h <br> UTSOC.mm <br> uni-getAppAuthorizeSetting-index.swift <br> uni-getAppBaseInfo-index.swift <br> uni-getDeviceInfo-index.swift <br> uni-getSystemInfo-index.swift <br> uni-getSystemSetting-index.swift <br> uni-openAppAuthorizeSetting-index.swift <br> uni-prompt-index.swift <br> uni-rpx2px-index.swift <br> uni-storage-index.swift <br> uni-theme-index.swift <br> uni-getElementById-DCUniGetElementById.swift <br> uni-getElementById-index.swift <br> uni-crash-index.swift <br> uni-crash-UniCrashManager.swift <br> uni-privacy-index.swift <br> uni-dialogPage-index.swift <br> uni-dialogPage-native.swift <br> uni-event-index.swift <br> uni-event-native.swift <br> uni-exit-index.swift <br> uni-actionSheet-index.swift <br> uni-modal-index(4.61+)  <br> uni-prompt-UniAlert-DCActionSheetActionCell.swift(4.61+) <br> uni-prompt-UniAlert-DCActionSheetController.swift(4.61+) <br> uni-prompt-UniAlert-DCActionSheetHeader.swift(4.61+) <br> uni-prompt-UniAlert-DCAlertContentView.swift(4.61+) <br> uni-prompt-UniAlert-DCAlertControllerUtil.swift(4.61+) <br> uni-prompt-UniAlert-DCAlertView.Blocks.swift(4.61+) <br> uni-prompt-UniAlert-DCAlertViewController.swift(4.61+) <br> uni-prompt-UniAlert-DCBottomMenuController.swift(4.61+) <br> uni-prompt-UniAlert-DCloudAlertControllerComponents.swift(4.61+) <br> uni-prompt-UniAlert-DCloudTextView.swift(4.61+) <br> uni-prompt-UniAlert-DCRIButtonItem.swift(4.61+) <br> uni-prompt-UniAlert-UIView.Layout.swift(4.61+) <br> uni-prompt-UniToast-MCToast.swift(4.61+) <br> uni-prompt-UniToast-MCToast+Loading.swift(4.61+) <br> uni-prompt-UniToast-MCToast+Remove.swift(4.61+) <br> uni-prompt-UniToast-MCToast+Status.swift(4.61+) <br> uni-prompt-UniToast-MCToast+StatusBar.swift(4.61+) <br> uni-prompt-UniToast-MCToast+Text.swift(4.61+) <br> uni-prompt-UniToast-MCToastConfig.swift(4.61+) <br> uni-prompt-UniToast-MCToastHelper.swift(4.61+) <br>| DCloudUniappRuntime.xcframework <br> DCloudUTSFoundation.xcframework <br> DCUniToast.xcframework <br> DCloudAlertController.xcframework <br> KSCrash.xcframework <br> storage.framework| uts-config.json |

### 配置其他模块(可选)
根据资源文件中的`manifest.json`文件包含的模块名称，选择以下源文件(`SDK/ExtApiSrc 目录下`)、依赖库(`SDK/Libs 目录下`)添加到DCloudUTSExtAPI工程中，依赖库均设置为`Do Not Embed`
| 模块名称 | 源文件 | 依赖库 | 系统依赖库 |
|---|---|---|---|
| uni-createWebviewContext | uni-createWebviewContext-index.swift | | |
| uni-getProvider | uni-getProvider-index.swift | | |
| uni-network | uni-network-index.swift | | |
| uni-getNetworkType | uni-getNetworkType-index.swift | | |
| uni-websocket | uni-websocket-index.swift | websocket.xcframework <br> Starscream.xcframework | |
| uni-canvas |  | DCloudUniCanvas.xcframework | |
| uni-media | uni-media-index.swift <br>uni-media-utils-UniChooseFileManager.swift(4.61+)| DCloudMediaPicker.xcframework |  AssetsLibrary <br> Photos <br> AVFoundation <br> CoreServices <br> CoreFoundation <br> CoreGraphics <br> CoreImage <br> GLKit <br> MetalKit <br> MobileCoreServices <br> QuartzCore <br> ImageIO <br> MediaPlayer <br> CoreText  |
| uni-payment-alipay | uni-payment-alipay-index.swift <br> uni-payment-index.swift | AlipaySDK.xcframework |c++ <br> z <br> SystemConfiguration <br> CoreTelephony <br> QuartzCore <br> CoreText <br> CoreGraphics <br> CFNetwork <br> CoreMotion |
| uni-payment-wxpay | uni-payment-wxpay-index.swift <br> uni-payment-index.swift | libWeChatSDK.a | CoreGraphics <br> WebKit <br> Security |
| uni-virtualPayment | uni-virtualPayment-index.swift <br> uni-virtualPayment-ProductService.swift <br> uni-virtualPayment-PurchaseService.swift <br> uni-virtualPayment-Types.swift <br> uni-virtualPayment-UniProduct.swift <br> uni-virtualPayment-UniPurchase.swift <br> uni-virtualPayment-UniStoreKit+Closure.swift <br> uni-virtualPayment-UniStoreKit.swift | | StoreKit |
| uni-getLocation-system | ~~uni-getLocation-system-index.swift~~ <br> ~~uni-getLocation-index.swift~~ <br>(4.61+使用) <br> uni-location-index.swift <br> uni-location-system-index <br> | | |
| uni-getLocation-tencent | ~~uni-getLocation-tencent-index.swift~~ <br> ~~uni-getLocation-index.swift~~ <br> (4.61+使用) <br> uni-location-tencent-index.swift <br> uni-location-index.swift | TencentLBS.framework | libz.1.2.5.tbd |
| uni-video | uni-video-index.swift | DCUniVideo.xcframework、IJKMediaFrameworkWithSSL.xcframework、UniDCSVProgressHUD.xcframework | |
| uni-push | uni-push-index.swift | GTCommonSDK.xcframework <br> GTSDK.xcframework <br> ZXSDK.framework | c++ <br> resolv <br> z <br> sqlite3 <br> MobileCoreServices <br> Security <br> SystemConfiguration <br> CoreTelephony <br> AVFoundation <br> UserNotifications <br> AdSupport |
| uni-verify | uni-verify-index.swift <br> uni-network-index.swift | GTCommonSDK.xcframework <br> GeYanSdk.xcframework | resolv.9 <br> c++ <br> z <br> sqlite3.0、WebKit <br> CoreFoundation <br> Network <br> AdSupport |
| uni-ad | uni-ad-index.swift | DCUniAdFoundation.xcframework | |
| uni-facialRecognitionVerify | ~~uni-facialRecognitionVerify-index.swift~~ <br>(4.61+使用)uni-facialVerify-index.swift| AliyunFaceAuthFacade.framework <br> AliyunMobileRPC.framework <br> AliyunOSSiOS.framework <br> APBToygerFacade.framework <br> APPSecuritySDK.framework <br> BioAuthAPI.framework <br> BioAuthEngine.framework <br> deviceiOS.framework <br> DTFIdentityManager.framework <br> DTFSensorServices.framework <br> DTFUIModule.framework <br> DTFUtility.framework <br> MPRemoteLogging.framework <br> ToygerNative.framework <br> ToygerService.framework | c++ <br> z <br> resolv <br> c++.1 <br> c++abi <br> z.1.2.8 <br> Accelerate <br> AssetsLibrary <br> QuartzCore <br> CoreFoundation <br> CoreLocation <br> ImageIO <br> CoreMedia <br> CoreMotion <br> AVFoundation <br> WebKit <br> AudioToolbox <br> CFNetwork <br> MobileCoreServices <br> SystemConfiguration <br> CoreTelephony <br> QuartzCore <br> CoreGraphics、AdSupport |
| uni-cloud-client | uni-websocket-index.swift <br> uni-network-index.swift <br> uni-media-index.swift| DCloudMediaPicker.xcframework |AssetsLibrary <br> Photos <br> AVFoundation <br> CoreServices <br> CoreFoundation <br> CoreGraphics <br> CoreImage <br> GLKit <br> MetalKit <br> MobileCoreServices <br> QuartzCore <br> ImageIO <br> MediaPlayer <br> CoreText|
| uni-map-tencent | uni-map-tencent-animation-AnimationLocation.swift <br> uni-map-tencent-circle-DCCircle.swift <br> uni-map-tencent-circle-DCCircleModel.swift <br> uni-map-tencent-control-DCControl.swift <br> uni-map-tencent-control-DCControlModel.swift <br> uni-map-tencent-DCLatLng.swift <br> uni-map-tencent-ground-DCGroundOverlayModel.swift <br> uni-map-tencent-IInternalMap.swift <br> uni-map-tencent-index.swift <br> uni-map-tencent-marker-DCMakerModel.swift <br> uni-map-tencent-marker-DCMarker.swift <br> uni-map-tencent-polygon-DCPolygon.swift <br> uni-map-tencent-polygon-DCPolygonModel.swift <br> uni-map-tencent-polyline-DCPolyline.swift <br> uni-map-tencent-polyline-DCPolylineModel.swift <br> uni-map-tencent-TencentMapImpl.swift | QMapFoundationKit.framework <br> QMapKit.framework <br> QMapSDKUtils.framework <br> QMapVisualPlugin.framework | sqlite3 <br> c++|
| uni-chooseLocation | uni-chooseLocation-index.swift| | |
| uni-shareWithSystem | uni-shareWithSystem-index.swift| | |
| uni-createInnerAudioContext | uni-createInnerAudioContext-index.swift <br> uni-createInnerAudioContext-UniAudioPlayer.swift| | MediaPlayer |
| uni-getBackgroundAudioManager | uni-getBackgroundAudioManager-index.swift <br> uni-getBackgroundAudioManager-UniBackgroundAudioManager.swift|  CocoaAsyncSocket.xcframework <br> KTVHTTPCache.xcframework | MediaPlayer |
| uni-previewImage | uni-previewImage-index.swift | | |
| uni-chooseMedia | uni-chooseMedia-index.swift | | |
| uni-requestMerchantTransfer(4.61+) | uni-requestMerchantTransfer-index.swift | libWeChatSDK.a | CoreGraphics <br> WebKit <br> Security <br> |
| uni-recorder(4.61+) | uni-recorder-index.swift <br> uni-recorder-UniAudioRecorderManager.swift| | |
| uni-camera(4.61+) (依赖uni-media) | uni-camera-index.swift <br>  uni-camera-CameraImpl.swift <br> uni-camera-CameraManager.swift |||
| uni-fileSystemManager(4.61+) | uni-fileSystemManager-index.swift <br> uni-fileSystemManager-InnerFileSystemManager.swift <br> uni-fileSystemManager-UniFileSystemManager.swift <br> uni-fileSystemManager-UniFileSystemManagerStats.swift| pod 'ZIPFoundation', '~> 0.9' |  |
| uni-sse(4.63+) | uni-sse-index.swift <br> uni-sse-EventSource-Event.swift <br> uni-sse-EventSource-EventSource.swift <br> uni-sse-EventSource-EventStreamParser.swift| | |
| uni-makePhoneCall(4.63+) | uni-makePhoneCall-index.swift | | |
| uni-barcode-scanning(4.71+)(依赖uni-camera) | uni-barcode-scanning-index.swift <br> uni-barcode-scanning-Scanner.swift| pod 'GoogleMLKit/BarcodeScanning', '~> 6.0.0' | |
| uni-scanCode(4.71+)(依赖uni-barcode-scanning) | uni-scanCode-index.swift| | |
| uni-clipboard(4.71+) | uni-clipboard-index.swift | | |
| uni-keyboard(4.71+) | uni-keyboard-index.swift | | |
| uni-rich-text(4.71+) | uni-rich-text-index.swift | | |
| uni-openDocument(4.71+)(依赖uni-fileSystemManager) | uni-openDocument-index.swift | | |
| uni-live-pusher(4.81+) | uni-live-pusher-index.swift | HappyDNS.framework <br> PLMediaStreamingKit.xcframework | |
| uni-live-player(4.81+) | uni-live-player-index.swift | qplayer2_core.xcframework | AVFoundation <br> AudioToolbox <br> QuartzCore<br> OpenGLES <br> CoreVideo<br> CoreMedia <br> VideoToolbox <br> c++ <br> bz2 <br> iconv <br> z <br> |

### 配置uts-config.json(可选)

在`DCloudUTSExtAPI`工程中新建 `uts-config.json` 文件，
`uni-video`模块需要添加如下配置
```
{
	"components": [{
		"name": "video",
		"class": "UTSSDKModulesDCloudUniVideoVideoComponent",
		"delegateClass": "VideoComponentRegister"
	}]
}
```

`uni-push`模块需要添加如下配置
```
{
	"hooksClasses": [
		"UTSSDKModulesDCloudUniPushHookProxy"
	]
}
```


`uni-payment-alipay`模块需要添加如下配置
```
{
	"hooksClasses": [
		"UTSSDKModulesDCloudUniPaymentAlipayAlipayHookProxy"
	],
	"providers": [{
		"name": "alipay",
		"service": "payment",
		"class": "UTSSDKModulesDCloudUniPaymentAlipayUniPaymentAlipayProvider"
	}]
}
```

`uni-payment-wxpay`模块需要添加如下配置
```
{
	"hooksClasses": [
		"UTSSDKModulesDCloudUniPaymentWxpayWxpayHookProxy"
	],
	"providers": [{
		"name": "wxpay",
		"service": "payment",
		"class": "UTSSDKModulesDCloudUniPaymentWxpayUniPaymentWxpayProvider"
	}]
}
```  

`uni-getLocation-systemy`模块需要添加如下配置
  ```
{
	"providers": [{
		"name":"system",
		"service":"location",
		"class":"UTSSDKModulesDCloudUniGetLocationSystemUniLocationSystemProviderImpl"
	}]
}
``` 

`uni-getLocation-tencent`模块需要添加如下配置
  ```
{
	"providers": [{
		"name":"tencent",
		"service":"location",
		"class":"UTSSDKModulesDCloudUniGetLocationTencentUniLocationTencentProviderImpl"
	}]
}
``` 

`uni-map-tencent`模块需要添加如下配置
  ```
{
    "components": [{
		"name": "map",
		"class": "UTSSDKModulesDCloudUniMapMapComponent",
		"delegateClass": "UniMapComponentRegister"
	}]
}
``` 

`uni-requestMerchantTransfer`模块需要添加如下配置
  ```
{
    "hooksClasses": [
		"UTSSDKModulesDCloudUniRequestMerchantTransferWxpayManagerHookProxy"
	]
}
```

`uni-camera`模块需要添加如下配置
  ```
{
   "components": [{
		"name": "camera",
		"class": "UTSSDKModulesDCloudUniCameraComponent",
		"delegateClass": "UniCameraComponentRegister"
	}]
}
```  

`uni-barcode-scanning`模块需要添加如下配置
  ```
{
   "hooksClasses": [
		"UTSSDKModulesDCloudUniBarcodeScanningAppHookProxy"
	]
}
```  

`uni-rich-text`模块需要添加如下配置
  ```
{
    "components": [{
      "type": "customElement",
		"name": "rich-text",
		"class": "UTSSDKModulesDCloudUniRichTextUniRichTextElement",
		"delegateClass": "UniRichTextElementRegister"
	}]
}
```
  

`uts-config.json`配置示例图     
   
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/utsconfig.png)


### 隐私清单
> 新建隐私清单：`Command + N`选择`App Privacy`点击`Next`，文件名称必须为`PrivacyInfo`

集成`uni-media`模块需要填写如下隐私清单
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/unimedia_privacyinfo.png)

集成`uni-payment-wxpay`模块需要填写如下隐私清单
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/uniwxpay_privacyinfo.png)


### 编译导出DCloudUTSExtAPI.xcframework
选择构建目标(Any iOS Device/Any iOS Simulator Device)，在菜单栏中，选择`Product -> Build`（或使用快捷键`Command + B`），分别编译出真机以及模拟器的Framework文件。
在菜单栏中，选择`Product -> Show Build Floder in Finder` 获取编译产物所在路径。
使用xcodebuild命令行创建xcframework
```
xcodebuild -create-xcframework -framework 真机路径/DCloudUTSExtAPI.framework -framework 模拟器路径/DCloudUTSExtAPI.framework -output 导出路径/DCloudUTSExtAPI.xcframework
```
导出成功后，将 `DCloudUTSExtAPI.xcframework` 添加到主工程，并设置为 `Embed && Sign` 


> `Apple芯片`的设备编译模拟器需要在菜单栏中点击 `Product -> Destination -> Show All Run Destinations` ，然后选择 `Rosetta模拟器` 编译



## 主工程配置
根据资源文件中的`manifest.json`文件包含的模块名称，根据下述相关模块文档向`主工程`添加依赖以及工程配置

## uni-prompt
### 添加依赖库以及资源文件
| 资源文件 |
|---|
|  uni-prompt.bundle |

## uni-canvas
### 添加依赖库以及资源文件
| 依赖库 |
|---|
|  DCloudUniCanvas.xcframework`（Embed & Sign）`  |


## uni-media

### 添加依赖库以及资源文件
| 依赖库 | 资源文件 |
|---|---|
| DCloudPermissionAlbum.xcframework <br> DCloudPermissionCamera.xcframework <br> DCloudPermissionMicrophone.xcframework | DCMediaEditingController.bundle <br> DCTZImagePickerController.bundle |

### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`、`麦克风权限描述(NSMicrophoneUsageDescription)`、`相册读写权限描述(NSPhotoLibraryUsageDescription)`、`相册写权限描述(NSPhotoLibraryAddUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要您的同意，才能使用麦克风，以便于录制音频</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>需要您的同意，才能访问相册，以便于图像选取</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>需要您的同意，才能访问相册，以便于保存图像</string>
</dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/unimedia_permission.png)

## uni-chooseMedia

### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`、`麦克风权限描述(NSMicrophoneUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要您的同意，才能使用麦克风，以便于录制音频</string>
</dict>
```

## uni-getLocation-system
### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionLocation.xcframework |

### Info.plist
添加`仅运行期间使用定位权限描述(NSLocationWhenInUseUsageDescription)`、`始终使用定位权限描述(NSLocationAlwaysAndWhenInUseUsageDescription)`、`使用临时位置权限描述(NSLocationTemporaryUsageDescriptionDictionary)`

```
	<dict>
		<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
		<string>需要您的同意，才能访问位置信息</string>
		<key>NSLocationWhenInUseUsageDescription</key>
		<string>需要您的同意，才能在仅运行期间获取位置信息</string>
		<key>NSLocationTemporaryUsageDescriptionDictionary</key>
		<dict>
			<key>YourPurposeKey</key>
			<string>这里需要您临时授权高精度定位权限,一次临时授权时效仅app一个周期内, 每次硬启动都需要临时授权</string>
		</dict>
	</dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/location_permission.png)

## uni-getLocation-tencent
### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionLocation.xcframework |

### Info.plist
1. 添加`仅运行期间使用定位权限描述(NSLocationWhenInUseUsageDescription)`、`始终使用定位权限描述(NSLocationAlwaysAndWhenInUseUsageDescription)`、`使用临时位置权限描述(NSLocationTemporaryUsageDescriptionDictionary)`

    ```
    	<dict>
    		<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    		<string>需要您的同意，才能访问位置信息</string>
    		<key>NSLocationWhenInUseUsageDescription</key>
    		<string>需要您的同意，才能在仅运行期间获取位置信息</string>
    		<key>NSLocationTemporaryUsageDescriptionDictionary</key>
    		<dict>
    			<key>YourPurposeKey</key>
    			<string>这里需要您临时授权高精度定位权限,一次临时授权时效仅app一个周期内, 每次硬启动都需要临时授权</string>
    		</dict>
    	</dict>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/location_permission.png)
2. 添加 `TencentLBSAPIKey` 配置项
    ```
    <key>TencentLBSAPIKey</key>
    <string>此处填写腾讯定位的ApiKey</string>
    ```


## uni-map-tencent

### 添加依赖库以及资源文件
| 依赖库 |  资源文件 |
|---|---|
| DCloudPermissionLocation.xcframework | uni-map-tencent.bundle | 

### Info.plist
1. 添加`仅运行期间使用定位权限描述(NSLocationWhenInUseUsageDescription)`  
    ```
    	<dict>
    		<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    		<string>需要您的同意，才能访问位置信息</string>
    	</dict>
    ```
2. 添加 `TencentLBSAPIKey` 配置项
    ```
    <key>TencentLBSAPIKey</key>
    <string>此处填写腾讯地图的ApiKey</string>
    ```

## uni-payment-alipay

### 添加依赖库以及资源文件
| 资源文件 |
|---|
| AlipaySDK.bundle |

### Info.plist
1. 添加 `白名单(LSApplicationQueriesSchemes)`
    ```
    <key>LSApplicationQueriesSchemes</key>
    <array>
    	<string>safepay</string>
    	<string>alipay</string>
    </array>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/alipay_queriesSchemes.png)

2. 添加 `URLSchemes(CFBundleURLTypes)`，`$appid_md5`建议使用`alipay`的`appid`的md5值
    ```
    <key>CFBundleURLTypes</key>
    <array>
    	<dict>
    		<key>CFBundleTypeRole</key>
    		<string>Editor</string>
    		<key>CFBundleURLName</key>
    		<string>Alipay</string>
    		<key>CFBundleURLSchemes</key>
    		<array>
    			<string>alipay$appid_md5</string>
    		</array>
    	</dict>
    </array>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/alipay_urlTypes.png)

3. 添加 `Alipay` 配置项
    ```
    <key>Alipay</key>
    <dict>
    	<key>universalLink</key>
    	<string>此处填写通用链接</string>
    </dict>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/alipay_info.png)


### Capability
`Target -> Signing & Capabilities` 点击 左上角`+ Capability `添加`Associated Domains`，将配置了 `Universal Links` 的域名加到 Domains 配置中
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/associated_domains.png)


## uni-payment-wxpay

### Info.plist
1. 添加 `白名单(LSApplicationQueriesSchemes)`
    ```
    <key>LSApplicationQueriesSchemes</key>
    <array>
    	<string>weixin</string>
    	<string>weixinULAPI</string>
    	<string>weixinURLParamsAPI</string>
    </array>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/wechat_queriesSchemes.png)

2. 添加 `URLSchemes(CFBundleURLTypes)`
    ```
    <key>CFBundleURLTypes</key>
    <array>
    	<dict>
    		<key>CFBundleTypeRole</key>
    		<string>Editor</string>
    		<key>CFBundleURLName</key>
    		<string>WeChat</string>
    		<key>CFBundleURLSchemes</key>
    		<array>
    			<string>微信的appid</string>
    		</array>
    	</dict>
    </array>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/wechat_urltypes.png)

3. 添加 `WeChat` 配置项
    ```
    <key>WeChat</key>
    <dict>
    	<key>appid</key>
    	<string>此处填写微信的appid</string>
    	<key>universalLink</key>
    	<string>此处填写微信开放平台注册的通用链接</string>
    </dict>
    ```
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/wechat_info.png)

### Capability
`Target -> Signing & Capabilities` 点击 左上角`+ Capability `添加`Associated Domains`，将配置了 `Universal Links` 的域名加到 Domains 配置中
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/associated_domains.png)


## uni-push

### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionPush.xcframework |

### Info.plist
1. 添加`通知权限描述(NSUserNotificationsUsageDescription)`
    ![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/unipush_permission.png)

2. 添加 `getui` 配置项
```
    <key>getui</key>
    <dict>
    	<key>appid</key>
    	<string>此处填写getui的appid</string>
    	<key>appKey</key>
    	<string>此处填写getui的appKey</string>
    	<key>appSecret</key>
    	<string>此处填写getui的appSecret</string>
    </dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/unipush_info.png)


### Capability
`Target -> Signing & Capabilities` 点击 左上角`+ Capability `，
分别添加`Access Wi-Fi Information`、`Push Notifications`、`Time Sensitive Notifications`
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/unipush_capability.png)


## uni-verify

### Info.plist
1. 添加 `geyan` 配置项
```
    <key>geyan</key>
    <dict>
    	<key>appid</key>
    	<string>此处填写geyan的appid</string>
    </dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/geyan_info.png)


## uni-facialRecognitionVerify
### 添加依赖库以及资源文件
| 依赖库 | 资源文件 |
|---|---|
| DCloudPermissionCamera.xcframework | APBToygerFacade.bundle <br> BioAuthEngine.bundle <br> ToygerNative.bundle |

### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
</dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/camera_permission.png)
  
  
## uni-getBackgroundAudioManager

### 添加依赖库以及资源文件
| 依赖库 |
|---|
| CocoaAsyncSocket.xcframework`（Embed & Sign）` <br> KTVHTTPCache.xcframework`（Embed & Sign）` |

### Capability
`Target -> Signing & Capabilities` 点击 左上角`+ Capability `，
添加`Background Modes`后勾选`Audio,ApiPlay,and Picture in Picture`选项，如图
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/backgroundmodes_audio.jpg)
  
## uni-recorder
### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionCamera.xcframework <br> DCloudPermissionMicrophone.xcframework |
### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`、`麦克风权限描述(NSMicrophoneUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要您的同意，才能使用麦克风，以便于录制音频</string>
</dict>
```

## uni-live-pusher
### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionCamera.xcframework <br> DCloudPermissionMicrophone.xcframework |
### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`、`麦克风权限描述(NSMicrophoneUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要您的同意，才能使用麦克风，以便于录制音频</string>
</dict>
```

## uni-live-player
### 添加依赖库以及资源文件
| 依赖库 |
|---|
| DCloudPermissionCamera.xcframework <br> DCloudPermissionMicrophone.xcframework |
### Info.plist
添加`相机权限描述(NSCameraUsageDescription)`、`麦克风权限描述(NSMicrophoneUsageDescription)`
```  
<dict>
	<key>NSCameraUsageDescription</key>
	<string>需要您的同意，才能使用摄像头，以便于相机拍摄</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>需要您的同意，才能使用麦克风，以便于录制音频</string>
</dict>
```

## uni-ad
### 基础广告(必须)
#### 添加依赖库以及资源文件
| 依赖库 | 资源文件 |
|---|---|
| DCUniAdFoundation.xcframework`（Embed & Sign）` | DCUniAdSDK.bundle |

#### Info.plist
进入[uni-ad后台](https://uniad.dcloud.net.cn/)，复制首页中的联盟ID,将其添加到`uniapp-x` 节点下的 `unionid` 字段中

```	
<key>uniapp-x</key>
<dict>
	<key>unionid</key>
	<string>广告联盟id，如未开通uniad可不填</string>
</dict>
```
![](https://web-ext-storage.dcloud.net.cn/native/doc/iOS/uniappx_app_info.png)

### 增强广告-国内(可选)
#### 添加依赖库以及资源文件
| 广告渠道 | 依赖库 | 资源文件 |  系统库 |
|---|---|---|---|
| 优量汇 | DCUniAdGdt.xcframework <br> libGDTMobSDK.a <br> DCloudPermissionIDFA.xcframework |  | AppTrackingTransparency <br> AdSupport <br> CoreLocation <br> QuartzCore <br> SystemConfiguration <br> CoreTelephony <br> Security <br> StoreKit <br> AVFoundation <br> WebKit <br> JavaScriptCore <br> z <br> xml2 <br> sqlite3 <br> c++ |
| Gromore | DCUniAdGm.xcframework <br> CSJMediation.xcframework <br> BUAdSDK.xcframework <br> DCloudPermissionIDFA.xcframework | CSJAdSDK.bundle | AppTrackingTransparency <br> Accelerate <br> AdSupport <br> AudioToolbox <br> AVFoundation <br> CoreGraphics <br> CoreImage <br> CoreLocation <br> CoreMotion <br> CoreMedia <br> CoreTelephony <br> CoreText <br> ImageIO <br> JavaScriptCore <br> MapKit <br> MediaPlayer <br> MobileCoreServices <br> QuartzCore <br> SystemConfiguration <br> Security <br> StoreKit <br> WebKit <br> DeviceCheck <br> z <br> xml2 <br> sqlite3 <br> c++ <br> bz2 <br> iconv <br> resolv.9 <br> c++abi |
| 快手 | DCUniAdKs.xcframework <br> DCloudPermissionIDFA.xcframework <br> KSAdSDK.xcframework`（Embed & Sign）` |  | AppTrackingTransparency <br> AdSupport <br> MobileCoreServices <br> CoreGraphics <br> CoreData <br> CoreLocation <br> MediaPlayer <br> CoreMedia <br> WebKit <br> Accelerate <br> AVKit <br> MessageUI <br> QuickLook <br> AddressBook <br> CoreMotion <br> QuartzCore <br> SystemConfiguration <br> CoreTelephony <br> Security <br> StoreKit <br> AVFoundation <br> WebKit <br> z <br> resolv.9 <br> sqlite3 <br> c++ <br> c++abi |
| 百度 | DCUniAdBd.xcframework <br> DCloudPermissionIDFA.xcframework <br> BaiduMobAdSDK.framework | baidumobadsdk.bundle | AppTrackingTransparency <br> AdSupport <br> StoreKit <br> SafariServices <br> MessageUI <br> CoreMedia <br> CoreMotion <br> SystemConfiguration <br> CoreLocation <br> CoreTelephony <br> AVFoundation <br> Webkit <br> c++ |
| Sigmob | DCUniAdSgm.xcframework <br> DCloudPermissionIDFA.xcframework <br> WindSDK.xcframework <br> WindFoundation.xcframework |  | AppTrackingTransparency <br> AdSupport <br> StoreKit <br> CFNetwork <br> CoreMedia <br> CoreGraphics <br> AVFoundation <br> CoreLocation <br> CoreTelephony <br> SafariServices <br> MobileCoreServices <br> WebKit <br> SystemConfiguration <br> ImageIO <br> z <br> sqlite3 |
| 章鱼 | OctUniAdSDK.xcframework <br> DCloudPermissionIDFA.xcframework <br> OctCore.xcframework <br> OctAdSDK.xcframework | OctAdSDK.bundle <br> OctCore.bundle | AppTrackingTransparency <br> AdSupport <br> c++|
| 泛连(4.61+) | FLAdSaas.xcframework <br> FLAdUniAdapter.xcframework <br> DCloudPermissionIDFA.xcframework |  | AppTrackingTransparency <br> AdSupport|
| 华夏乐游(4.61+) | DCUniAdYT.xcframework <br> YouTuiAdSDK.xcframework <br> DCloudPermissionIDFA.xcframework | YouTuiAdSDK.bundle | AppTrackingTransparency <br> AdSupport|


### 增强广告-国际(可选)
#### 添加依赖库以及资源文件
| 广告渠道 | 依赖库 | 资源文件 |  系统库 |
|---|---|---|---|
| Google AdMob | DCUniAdGg.xcframework <br> DCloudPermissionIDFA.xcframework <br> UserMessagingPlatform.xcframework | | |
| Pangle | PangleAdapter.xcframework <br> DCloudPermissionIDFA.xcframework <br> BURelyFoundation_Global.xcframework.xcframework <br> PAGAdSDK.xcframework | PAGAdSDK.bundle | StoreKit<br>MobileCoreServices<br>WebKit<br>MediaPlayer<br>CoreMedia<br>CoreLocation<br>AVFoundation<br>CoreTelephony<br>SystemConfiguration<br>AdSupport<br>CoreMotion<br>JavaScriptCore<br>DeviceCheck<br>resolv.9<br>c++<br>libc++abi<br>z<br>sqlite3 |
| InMobi | InMobiSDK.xcframework <br> DCloudPermissionIDFA.xcframework <br> InMobiAdapter.xcframework | | sqlite3.0 <br> z <br> WebKit|
| IronSource | IronSource.xcframework <br> DCloudPermissionIDFA.xcframework <br> IronSourceAdapter.xcframework | | |
| Liftoff | VungleAdsSDK.xcframework <br> DCloudPermissionIDFA.xcframework <br> LiftoffMonetizeAdapter.xcframework | | AdSupport <br> AudioToolbox <br> AVFoundation <br> CFNetwork <br> CoreGraphics <br> CoreMedia <br> MediaPlayer <br> QuartzCore <br> StoreKit <br> SystemConfiguration <br> z |
| Mintegral | MintegralAdapter.xcframework <br> DCloudPermissionIDFA.xcframework <br> MTGSDK.xcframework <br> MTGSDKBanner.xcframework <br> MTGSDKBidding.xcframework <br> MTGSDKInterstitialVideo.xcframework <br> MTGSDKNativeAdvanced.xcframework <br> MTGSDKNewInterstitial.xcframework <br> MTGSDKReward.xcframework <br> MTGSDKSplash.xcframework | | |
| UnityAds | UnityAds.xcframework <br> DCloudPermissionIDFA.xcframework <br> UnityAdapter.xcframework | | |

> 集成Pangle、InMobi、IronSource、Liftoff、Mingetral、UnityAds渠道必须集成Google AdMob
> 国际广告需要在[uni-AD后台](https://uniad.dcloud.net.cn/)后台审核通过之后才可以集成。审核通过之后可以连续客服获取国际广告SDK及配置。

#### Info.plist
添加`IDFA权限描述(NSUserTrackingUsageDescription)`
```  
<dict>
	<key>NSUserTrackingUsageDescription</key>
	<string>获取标记权限向您提供更优质、安全的个性化服务及内容，未经同意我们不会用于其他目的；开启后，您也可以前往系统“设置-隐私 ”中随时关闭</string>
</dict>
```

开通 `Google AdMob` 渠道必须添加以下
```  
<dict>
	<key>GADApplicationIdentifier</key>
	<string>填写您的Google Admob 应用ID</string>
</dict>
```

开通 `快手、Sigmob、百度` 渠道建议添加以下权限描述  

```
    	<dict>
    		<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
    		<string>需要您的同意，才能访问位置信息</string>
    		<key>NSLocationWhenInUseUsageDescription</key>
    		<string>需要您的同意，才能在仅运行期间获取位置信息</string>
    	</dict>
```


#### 隐私清单
开通 `优量汇、Gromore` 渠道需要将该渠道的隐私清单内容手动合并到`主工程`的隐私清单文件中，详见目录`SDK/PrivacyInfo/优量汇`，`SDK/PrivacyInfo/Gromore`