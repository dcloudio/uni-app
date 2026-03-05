# app平台标准基座  

在HBuilderX中，运行iOS/Android应用时，DCloud提供了运行基座的概念。

运行基座的存在，可以让开发者的代码动态运行在基座之上，无需经过完整的打包流程，也无需在本地配置原生的打包环境。

这样开发者就可以快捷的把代码跑起来，在手机上看效果。

运行基座又分标准基座和自定义基座。
标准基座使用的是DCloud的包名、证书和三方SDK配置。
如果开发者要修改这些信息，则需要自定义基座。

## Android平台标准基座信息  
- 包名： io.dcloud.uniappx  
- 签名信息：  
    + SHA256：5975dd84fbd6648be4afdfe4cc3025b4c9f8eb6131519e44ff15511a0ab9a7d3
    + SHA1：71544e0a6f064614e83f6ad2a4f318df349c1295
    + MD5：957764ac1b55e0c38bae22ba2a145b98
- 注册的Url Scheme：uniappx

## iOS平台标准基座信息  
- 包名： io.dcloud.uniappx  
- Capabilities（苹果开发者平台开启的能力）：  
    + Access Wi-Fi Information
    + Associated Domains
    + Push Notifications
    + Sign In with Apple
    + Time Sensitive Notifications
- 注册的Url Scheme: uniappx  
- 注册的通用链接：https://uniappx.dcloud.net.cn/ulink  

注意：ios平台标准基座需要重签名才能使用，重签名后会改变包名信息，从而导致注册的通用链接失效。

## 标准基座包含的功能模块  
- uni-ad：[uni-ad广告联盟](https://uniad.dcloud.net.cn/)  
    + gdt：腾讯优量汇广告联盟SDK  
- uni-canvas：[canvas画布组件](../component/canvas.md)
- uni-cloud-client：[uniCloud云函数/云对象](https://doc.dcloud.net.cn/uniCloud/cf-functions.html)
- uni-createRequestPermissionListener：[Android平台监听权限申请](../api/create-request-permission-listener.md)  
- uni-createWebviewContext：[创建 web-view 组件的上下文对象](../api/create-webview-context.md)
- uni-facialRecognitionVerify：[uni实人认证](https://doc.dcloud.net.cn/uniCloud/frv/intro.html)
- uni-fileSystemManager：[文件管理](../api/get-file-system-manager.md)
- uni-location：[获取位置信息](../api/get-location.md) `HBuilderX 4.61-`之前是 `uni-getLocation` 模块名
    + system: 系统定位
    + tencent：腾讯定位
- uni-getNetworkType：[获取网络类型](../api/get-network-type.md)
- uni-getProvider: [获取服务供应商](../api/get-provider.md#getprovider)
- uni-installApk：[Android平台安装apk](../api/install-apk.md)
- uni-media：[多媒体相关API](../api/choose-image.md)
- uni-network：[网络请求（文件上传/下载）](../api/request.md)
- uni-payment：[请求支付](../api/request-payment.md)
    + alipay：支付宝支付
    + wxpay：微信支付
- uni-push：[uni-push统一推送](https://uniapp.dcloud.net.cn/unipush-v2.html)
- uni-verify：[一键登录](../api/get-univerify-manager.md)
- uni-video：[video视频组件](../component/video.md)
- uni-virtualPayment：[虚拟支付](../api/virtual-payment.md#requestvirtualpayment)
- uni-websocket：[WebSocket](../api/websocket-global.md)

## Android平台包含的权限
Android平台标准基座尽量包含所有可能用到的权限，以便在开发过程中可调用所有系统API。
包含以下权限：
```xml
	<!-- 网络权限 -->
	<uses-permission android:name="android.permission.INTERNET" />
	<!-- 存储卡权限 -->
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

	<!-- 通过GPS得到精确位置 -->
	<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
	<!-- 通过网络得到粗略位置 -->
	<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
	<!-- 访问网络，某些位置信息需要从网络服务器获取 -->
	<uses-permission android:name="android.permission.INTERNET" />
	<!-- 访问WiFi状态，需要WiFi信息用于网络定位 -->
	<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
	<!-- 修改WiFi状态，发起WiFi扫描, 需要WiFi信息用于网络定位 -->
	<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
	<!-- 访问网络状态, 检测网络的可用性，需要网络运营商相关信息用于网络定位 -->
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<!-- 访问网络的变化, 需要某些信息用于网络定位 -->
	<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
	<!-- 蓝牙扫描权限 -->
	<uses-permission android:name="android.permission.BLUETOOTH" />
	<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
	<uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
	<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
	<!-- 前台service权限 -->
	<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
	<!-- 后台定位权限 -->
	<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
	<!-- A-GPS辅助定位权限，方便GPS快速准确定位 -->
	<uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
	<!-- 安装应用权限 -->
	<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

	<!-- 其它权限 -->
	<uses-permission android:name="android.permission.ACCESS_CHECKIN_PROPERTIES"/>
	<uses-permission android:name="android.permission.ACCESS_MOCK_LOCATION"/>
	<uses-permission android:name="android.permission.ACCESS_SURFACE_FLINGER"/>
	<uses-permission android:name="android.permission.ADD_SYSTEM_SERVICE"/>
	<uses-permission android:name="android.permission.BATTERY_STATS"/>
	<uses-permission android:name="android.permission.BRICK"/>
	<uses-permission android:name="android.permission.BROADCAST_PACKAGE_REMOVED"/>
	<uses-permission android:name="android.permission.BROADCAST_STICKY"/>
	<uses-permission android:name="android.permission.CALL_PHONE"/>
	<uses-permission android:name="android.permission.CALL_PRIVILEGED"/>
	<uses-permission android:name="android.permission.CAMERA"/>
	<uses-permission android:name="android.permission.CHANGE_COMPONENT_ENABLED_STATE"/>
	<uses-permission android:name="android.permission.CHANGE_CONFIGURATION"/>
	<uses-permission android:name="android.permission.CLEAR_APP_CACHE"/>
	<uses-permission android:name="android.permission.CLEAR_APP_USER_DATA"/>
	<uses-permission android:name="android.permission.DELETE_CACHE_FILES"/>
	<uses-permission android:name="android.permission.DELETE_PACKAGES"/>
	<uses-permission android:name="android.permission.DEVICE_POWER"/>
	<uses-permission android:name="android.permission.DIAGNOSTIC"/>
	<uses-permission android:name="android.permission.DISABLE_KEYGUARD"/>
	<uses-permission android:name="android.permission.DUMP"/>
	<uses-permission android:name="android.permission.EXPAND_STATUS_BAR"/>
	<uses-permission android:name="android.permission.FACTORY_TEST"/>
	<uses-permission android:name="android.permission.FLASHLIGHT"/>
	<uses-permission android:name="android.permission.FORCE_BACK"/>
	<uses-permission android:name="android.permission.FOTA_UPDATE"/>
	<uses-permission android:name="android.permission.GET_ACCOUNTS"/>
	<uses-permission android:name="android.permission.GET_PACKAGE_SIZE"/>
	<uses-permission android:name="android.permission.GET_TASKS"/>
	<uses-permission android:name="android.permission.HARDWARE_TEST"/>
	<uses-permission android:name="android.permission.INJECT_EVENTS"/>
	<uses-permission android:name="android.permission.INSTALL_PACKAGES"/>
	<uses-permission android:name="android.permission.INTERNAL_SYSTEM_WINDOW"/>
	<uses-permission android:name="android.permission.INTERNET"/>
	<uses-permission android:name="android.permission.MANAGE_APP_TOKENS"/>
	<uses-permission android:name="android.permission.MASTER_CLEAR"/>
	<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
	<uses-permission android:name="android.permission.MODIFY_PHONE_STATE"/>
	<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
	<uses-permission android:name="android.permission.NFC"/>
	<uses-permission android:name="android.permission.PERSISTENT_ACTIVITY"/>
	<uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS"/>
	<uses-permission android:name="android.permission.READ_CALENDAR"/>
	<uses-permission android:name="android.permission.READ_CONTACTS"/>
	<uses-permission android:name="android.permission.READ_FRAME_BUFFER"/>
	<uses-permission android:name="android.permission.READ_INPUT_STATE"/>
	<uses-permission android:name="android.permission.READ_LOGS"/>
	<uses-permission android:name="android.permission.READ_OWNER_DATA"/>
	<uses-permission android:name="android.permission.READ_SMS"/>
	<uses-permission android:name="android.permission.READ_SYNC_SETTINGS"/>
	<uses-permission android:name="android.permission.READ_SYNC_STATS"/>
	<uses-permission android:name="android.permission.REBOOT"/>
	<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
	<uses-permission android:name="android.permission.RECEIVE_MMS"/>
	<uses-permission android:name="android.permission.RECEIVE_SMS"/>
	<uses-permission android:name="android.permission.RECEIVE_WAP_PUSH"/>
	<uses-permission android:name="android.permission.RECORD_AUDIO"/>
	<uses-permission android:name="android.permission.REORDER_TASKS"/>
	<uses-permission android:name="android.permission.RESTART_PACKAGES"/>
	<uses-permission android:name="android.permission.SEND_SMS"/>
	<uses-permission android:name="android.permission.SET_ACTIVITY_WATCHER"/>
	<uses-permission android:name="android.permission.SET_ALWAYS_FINISH"/>
	<uses-permission android:name="android.permission.SET_ANIMATION_SCALE"/>
	<uses-permission android:name="android.permission.SET_DEBUG_APP"/>
	<uses-permission android:name="android.permission.SET_ORIENTATION"/>
	<uses-permission android:name="android.permission.SET_PREFERRED_APPLICATIONS"/>
	<uses-permission android:name="android.permission.SET_PROCESS_FOREGROUND"/>
	<uses-permission android:name="android.permission.SET_PROCESS_LIMIT"/>
	<uses-permission android:name="android.permission.SET_TIME_ZONE"/>
	<uses-permission android:name="android.permission.SET_WALLPAPER"/>
	<uses-permission android:name="android.permission.SET_WALLPAPER_HINTS"/>
	<uses-permission android:name="android.permission.SIGNAL_PERSISTENT_PROCESSES"/>
	<uses-permission android:name="android.permission.STATUS_BAR"/>
	<uses-permission android:name="android.permission.SUBSCRIBED_FEEDS_READ"/>
	<uses-permission android:name="android.permission.SUBSCRIBED_FEEDS_WRITE"/>
	<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
	<uses-permission android:name="android.permission.VIBRATE"/>
	<uses-permission android:name="android.permission.WAKE_LOCK"/>
	<uses-permission android:name="android.permission.WRITE_APN_SETTINGS"/>
	<uses-permission android:name="android.permission.WRITE_CALENDAR"/>
	<uses-permission android:name="android.permission.WRITE_CONTACTS"/>
	<uses-permission android:name="android.permission.WRITE_GSERVICES"/>
	<uses-permission android:name="android.permission.WRITE_OWNER_DATA"/>
	<uses-permission android:name="android.permission.WRITE_SETTINGS"/>
	<uses-permission android:name="android.permission.WRITE_SMS"/>
	<uses-permission android:name="android.permission.WRITE_SYNC_SETTINGS"/>
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
	<uses-permission android:name="com.android.launcher.permission.INSTALL_SHORTCUT"/>
	<uses-permission android:name="com.android.launcher.permission.UNINSTALL_SHORTCUT"/>
	<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```
