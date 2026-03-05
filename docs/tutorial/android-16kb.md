## 概述  
随着设备制造商为设备配备更多 RAM 以优化性能，许多制造商将采用更大的页面大小（例如 16 KB）。为了迎接这些即将推出的设备，Google Play 推出了一项新的兼容性要求：  
自 2025 年 11 月 1 日起，提交到 Google Play 且以 Android15（API 级别 35）及更高版本的设备为目标平台的所有新应用和现有应用更新都必须支持 16KB 的页面大小。  
如需详细了解此兼容性要求，请参阅[Google官方博文](https://android-developers.googleblog.com/2025/05/prepare-play-apps-for-devices-with-16kb-page-size.html)。

> HBuilderX4.81版本已适配支持 16KB 内存页面大小

## 不支持 16KB 的模块  
虽然 uni-app x 核心功能模块已适配支持 16KB 内存页面大小，但部分涉及三方 SDK 的模块仍未完全适配支持。  

### [live-pusher 组件](../component/live-pusher.md)
`uni-live-pusher`模块是由 DCloud 的合作伙伴七牛提供并实现 live-pusher 组件相关功能，此模块依赖七牛的多媒体SDK，但该 SDK 目前未适配支持 16KB 内存页面大小。  
建议应用用于提交 Google Play 时不要使用此功能。  

涉及的so库文件列表：
- libpldroid_mmprocessing.so
- libpldroid_streaming_aac_encoder.so
- libpldroid_streaming_amix.so
- libpldroid_streaming_core.so
- libpldroid_streaming_h264_encoder.so
- libpldroid_streaming_puic.so
- libpldroid_streaming_srt.so


### [live-player 组件](../component/live-player.md)
`uni-live-player`模块是由 DCloud 的合作伙伴七牛提供并实现 live-player 组件相关功能，此模块依赖七牛的多媒体SDK，但该 SDK 目前未适配支持 16KB 内存页面大小。  
建议应用用于提交 Google Play 时不要使用此功能。  

涉及的so库文件列表：
- libavcodec.so
- libavformat.so
- libavutil.so
- libcrypto.1.1.so
- libcurl.so
- libqplayer2-core.so
- libsoundtouch.so
- libsrt.so
- libssl.1.1.so
- libswresample.so
- libyuv.so
- libpldroid_streaming_srt.so 


### [uni-ad](https://uniapp.dcloud.net.cn/uni-ad/)
`uni-ad`使用国内广告渠道SDK 仅支持国内环境，建议应用用于提交 Google Play 时不要使用国内渠道 SDK。  

涉及的so库文件列表：
- libplt-base.so
- libsgcore.so
- libti-monitor.so


国外广告 `applovin`、`pangle(海外穿山甲)` 广告渠道 SDK 未适配支持 16KB 内存页面大小，需等待官方升级相关 SDK 版本解决。  
如果应用用于提交 Google Play 时不要包含这些广告渠道 SDK。  

涉及的so库文件列表：
- libapplovin-native-crash-report.so
- libnms.so
- libpglarmor.so
- libtobEmbedPageEncrypt.so


### [uni-push](../api/uni-push.md)
`uni-push`是由 DCloud 与合作伙伴个推共同推出的统一推送服务，在国内环境下，该服务依赖`卓信ID SDK`，但该 SDK 目前未适配支持 16KB 内存页面大小。  
为满足 Google Play 的要求，应用在提交至 Google Play 时需避免使用`卓信ID SDK`。按以下方式配置，使用`uni-push`时将不会包含`卓信ID SDK`：  
1. 项目manifest.json可视化界面，在 “安卓App配置” 下的 “uni-push（消息推送）” 中只勾选 “Google FCM推送SDK”  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/uni-push/android-16k-unipush-fcm.png)  
2. 云端打包界面，在 “打包格式” 下勾选 “AAB(谷歌商店仅支持aab)”  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/uni-push/android-16k-unipush-aab.png)

涉及的so库文件列表：
- libzxprotect.so


### [uni实人认证](../api/facial-recognition-meta-info.md)  
`uni实人认证`功能仅支持国内环境，建议应用用于提交 Google Play 时不要使用此功能。

涉及的so库文件列表：
- libaliyunaf.so  
- libfacedevice.so  


### [腾讯地图](../component/map.md)  
腾讯地图使用的 SDK 版本为 `5.8.3`，暂未更新到最新版本，需等待官方升级腾讯地图SDK版本适配。

使用腾讯地图SDK的API：
- [uni.createMapContext](../api/create-map-context.md)
- [uni.chooseLocation](../api/choose-location.md)

涉及的so库文件列表：
- libtxmapengine.so
- libtxmapvis.so


