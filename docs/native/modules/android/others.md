## API与对应的库参照表

|模块名称								|本地依赖库															|线上依赖库																																															|依赖的模块																								|插件注册信息																																																																																																																								|
|:--								|:--																|:--																																																|:--																									|:--																																																																																																																									|
|uni-createRequestPermissionListener|uni-createRequestPermissionListener-release.aar					|-																																																	|-																										|-																																																																																																																										|
|uni-createWebviewContext			|uni-createWebviewContext-release.aar								|androidx.webkit:webkit:1.6.0																																										|-																										|-																																																																																																																										|
|uni-fileSystemManager				|uni-fileSystemManager-release.aar									|org.brotli:dec:0.1.2																																												|-																										|-																																																																																																																										|
|uni-getNetworkType					|uni-getNetworkType-release.aar										|-																																																	|-																										|-																																																																																																																										|
|uni-installApk						|uni-installApk-release.aar											|-																																																	|-																										|-																																																																																																																										|
|uni-network						|uni-network-release.aar											|com.squareup.okhttp3:okhttp:3.12.12																																								|-																										|-																																																																																																																										|
|uni-websocket						|uni-websocket-release.aar											|com.squareup.okhttp3:okhttp:3.12.12																																								|-																										|-																																																																																																																										|
|uni-cloud-client					|uni-cloud-client-release.aar										|-																																																	|uni-network<br/>uni-storage<br/>uni-prompt<br/>uni-media<br/>uni-websocket<br/>uni-showLoading			|-																																																																																																																										|
|uni-media							|uni-media-release.aar<br/>nativeobj-preview-release.aar			|com.github.bumptech.glide:glide:4.9.0<br/>androidx.recyclerview:recyclerview:1.0.0<br/>androidx.appcompat:appcompat:1.6.1<br/>androidx.activity:activity-ktx:1.9.2									|uni-prompt<br/>uni-actionSheet																								|-																																																																																																																										|
|uni-privacy						|uni-privacy-release.aar											|-																																																	|-																										|-																																																																																																																										|
|uni-getProvider					|uni-getProvider-release.aar										|-																																																	|-																										|-																																																																																																																										|
|uni-shareWithSystem				|uni-shareWithSystem-release.arr									|-																																																	|-																										|```buildConfigField 'String[]', 'UTSHooksClassArray', '{\"uts.sdk.modules.uniShareWithSystem.ShareWithSystemHook\"}'```																																																																																												|
|uni-createInnerAudioContext		|uni-createInnerAudioContext-release.aar							|com.google.android.exoplayer:exoplayer-core:2.18.0																																					|uni-network																							|-																																																																																																																										|
|uni-getBackgroundAudioManager		|uni-getBackgroundAudioManager-release.aar							|com.google.android.exoplayer:exoplayer-core:2.18.0																																					|uni-network																							|-																																																																																																																										|
|uni-chooseLocation					|uni-chooseLocation-release.aar										|-																																																	|uni-theme<br/>uni-getLocation<br/>uni-cloud-client<br/>uni-getLocation<br/>uni-map-tencent				|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniChooseLocation.UniChooseLocationExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																											|
|uni-actionSheet					|uni-actionSheet-release.aar										|-																																																	|-																										|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniActionSheet.UniActionSheetExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																													|
|uni-previewImage					|uni-previewImage-release.aar										|-																																																	|uni-media<br/>uni-network<br/>uni-fileSystemManager<br/>uni-storage<br/>uni-prompt<br/>uni-actionSheet	|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																												|
|uni-chooseMedia					|uni-chooseMedia-release.aar										|androidx.appcompat:appcompat:1.6.1<br/>androidx.activity:activity-ktx:1.9.2																														|uni-actionSheet																						|-																																																																																																																										|
|uni-arrayBufferToBase64			|uni-arrayBufferToBase64-release.aar								|-																																																	|-																										|-																																																																																																																										|
|uni-base64ToArrayBuffer			|uni-base64ToArrayBuffer-release.aar								|-																																																	|-																										|-																																																																																																																										|
|uni-sse							|uni-sse-release.aar												|com.squareup.okhttp3:okhttp-sse:3.12.12																																							|-																										|-																																																																																																																										|
|uni-modal							|uni-modal-release.aar												|-																																																	|-																										|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniModal.UniModalExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																																|
|uni-camera							|uni-camera-release.aar												|androidx.camera:camera-core:1.4.1<br/>androidx.camera:camera-camera2:1.4.1<br/>androidx.camera:camera-lifecycle:1.4.1<br/>androidx.camera:camera-view:1.4.1<br/>androidx.appcompat:appcompat:1.7.0	|uni-media																								|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniCamera.UniCameraExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																														|
|uni-requestMerchantTransfer		|uni-requestMerchantTransfer-release.aar							|com.tencent.mm.opensdk:wechat-sdk-android:6.8.0																																					|-																										|-																																																																																																																										|
|uni-recorder						|uni-recorder-release.aar<br/>audio-mp3aac-release.aar				|com.google.android.exoplayer:exoplayer-core:2.18.0																																					|-																										|-																																																																																																																										|
|uni-makePhoneCall					|uni-makePhoneCall-release.aar										|-																																																	|-																										|-																																																																																																																										|
|uni-clipboard						|uni-clipboard-release.aar											|-																																																	|-																										|-																																																																																																																										|
|uni-keyboard						|uni-keyboard-release.aar											|-																																																	|-																										|-																																																																																																																										|
|uni-openDocument					|uni-openDocument-release.aar										|-																																																	|uni-fileSystemManager																					|```buildConfigField 'String[]', 'UTSHooksClassArray', '{\"uts.sdk.modules.DCloudUniOpenDocument.UniOpenDocumentHookProxy\"}'```																																																																																										|
|uni-barcode-scanning				|uni-barcode-scanning-release.aar									|androidx.camera:camera-core:1.4.1<br/>com.google.mlkit:barcode-scanning:17.2.0<br/>com.github.albfernandez:juniversalchardet:2.0.4																	|uni-camera<br/>uni-getSystemInfo																		|```buildConfigField 'String[]', 'UTSHooksClassArray', '{\"uts.sdk.modules.DCloudUniBarcodeScanning.AppHookProxy"}'```																																																																																													|
|uni-match-media					|uni-match-media-release.aar										|-																																																	|uni-getDeviceInfo																						|HBuilderX 5.0及之后版本配置：<br/>```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"type\\\":\\\"customElement\\\",\\\"name\\\":\\\"match-media\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniMatchMedia.UniMatchMediaElementRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																																																																										|
|uni-scanCode						|uni-scanCode-release.aar											|androidx.camera:camera-core:1.4.1<br/>androidx.appcompat:appcompat:1.7.0																															|uni-camera<br/>uni-barcode-scanning<br/>uni-media<br/>uni-getSystemInfo								|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniScanCode.UniScanCodeExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																														|
|uni-rich-text						|uni-rich-text-release.aar											|-																																																	|-																										|HBuilderX 5.0之前版本配置：<br/>```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"type\\\":\\\"customElement\\\",\\\"name\\\":\\\"rich-text\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniRichText.UniRichTextElementRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```<br/>HBuilderX 5.0及之后版本配置：<br/>```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniRichText.UniRichTextExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```	|
|uni-live-player					|uni-live-player-release.aar										|com.qiniu:qplayer2-core:1.5.0																																										|-																										|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLivePlayer.UniLivePlayerExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																												|
|uni-live-pusher					|uni-live-pusher-release.aar<br/>pldroid-media-streaming-3.1.6.jar	|androidx.core:core:1.10.1<br/>android.arch.lifecycle:extensions:1.1.1<br/>com.qiniu:happy-dns:1.0.0																								|uni-fileSystemManager<br/>uni-network																	|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLivePusher.UniLivePusherExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																												|
|uni-loading						|uni-loading-release.aar											|																																																	|																										|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLoading.UniLoadingExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																														|
|uni-showLoading					|uni-showLoading-release.aar										|																																																	|uni-theme<br/>uni-getSystemInfo<br/>uni-loading														|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniShowLoading.UniShowLoadingExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																													|
|uni-web-view						|uni-web-view-release.aar											|androidx.webkit:webkit:1.6.0<br/>androidx.appcompat:appcompat:1.1.0																																|																										|```buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniWebView.UniWebViewExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'```																																																																														|

各模块对应的API可参考文档[App端支持的内置模块列表](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#utsmodules)

## 配置

根据编译出来的`unpackage/resource/app-android/{appid}/www/manifest.json`中的`app->distribute->modules`下的模块配置。

### 配置本地依赖库

将上表中本地依赖库对应的aar拷贝到app模块的libs目录下

### 配置线上依赖库

将上表中的线上依赖库添加到app模块的build.gradle中。以`uni-network`为例，参考：

::: preview

> build.gradle

```groovy
	dependencies {
		implementation 'com.squareup.okhttp3:okhttp:3.12.12'
	}
```

> build.gradle.kts

```groovy
	dependencies {
		implementation("com.squareup.okhttp3:okhttp:3.12.12")
	}
```

:::

### 插件注册

将上表中的`插件注册信息`拷贝到build.gradle的defaultConfig节点下。以`uni-previewImage`为例，参考

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniPreviewImage.UniPreviewImageExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

:::

## 其他模块

### canvas

#### 本地依赖库

|名称								|
|:--								|
|uni-canvas-release.aar				|
|uni-canvas-component-release.aar	|

#### 组件注册

将以下内容添加到主模块的build.gradle，详见[根据configjson配置应用](../../use/androiduts.md#utscomponents)。

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"canvas\\\",\\\"class\\\":\\\"io.dcloud.canvas.CanvasComponent\\\",\\\"node\\\":\\\"io.dcloud.canvas.UniCanvasElementImpl\\\"}]\""
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"canvas\\\",\\\"class\\\":\\\"io.dcloud.canvas.CanvasComponent\\\",\\\"node\\\":\\\"io.dcloud.canvas.UniCanvasElementImpl\\\"}]\"")
}
```

:::

[uni-ad](/native/modules/android/uni-ad.md)

[uni-video](/native/modules/android/uni-video.md)

[uni-push](/native/modules/android/uni-push.md)

[uni-facialRecognitionVerify](/native/modules/android/uni-facialRecognitionVerify.md)

[uni-verify](/native/modules/android/uni-verify.md)

[uni-payment](/native/modules/android/uni-payment.md)

[uni-map-tencent](/native/modules/android/uni-map-tencent.md)

[uni-getLocation](/native/modules/android/uni-getLocation.md)
