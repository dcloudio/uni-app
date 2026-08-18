# manifest.json

`manifest.json` 是 uni-app x 项目的配置文件，用于设置应用的名称、版本、图标等信息。在 HBuilderX 中创建项目时此文件保存在根目录。

uni-app x 默认没有splash启动界面，因uni-app x打包后启动速度非常快，可以自己做一个简单的uvue页面来当做splash。HBuilderX3.99+版本新增支持配置splash启动界面，详情参考[启动界面配置](manifest-splashscreen.md)。

uni-app x 目前不提供内置模块选择，而是提供了摇树机制自动选择内置模块，详情参考[模块配置](manifest-modules.md#treeshaking)。

## 配置项列表



| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| appid | string | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | [DCloud AppID 使用说明](https://ask.dcloud.net.cn/article/35907) |
| name | string | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 应用名称 |
| description | string | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 应用描述 |
| versionName | string | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 应用版本名称 |
| versionCode | integer | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 应用版本号，必须是整数，取值范围1~2147483647；升级时必须高于上一次设置的值。 |
| locale | '' | Web: x; Android: x; iOS: x | 默认语言 |
| fallbackLocale | '' | Web: x; Android: x; iOS: x | 默认回退语言 |
| uni-app-x | [uni-app-x 配置项列表](#manifest-uni-app-x) | Web: 4.0; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | 存在uni-app-x节点则表示为uni-app x项目 |
| app | [app 配置项列表](#manifest-app) | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61 | App平台（原生App）配置 |
| app-android | [app-android 配置项列表](#manifest-app-android) | Web: x; 微信小程序: x; Android: 4.71; iOS: x; HarmonyOS: x | App-Android平台配置 |
| app-ios | [app-ios 配置项列表](#manifest-app-ios) | Web: x; 微信小程序: x; Android: x; iOS: 4.71; HarmonyOS: x | iOS App平台配置 |
| app-harmony | [app-harmony 配置项列表](#manifest-app-harmony) | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61 | HarmonyOS平台配置 |
| web | [web 配置项列表](#manifest-web) | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | Web平台配置 |
| mp-weixin | [mp-weixin 配置项列表](#manifest-mp-weixin) | Web: x; 微信小程序: √; Android: x; iOS: x; HarmonyOS: x |   |
| __hbuilderx | [__hbuilderx 配置项列表](#manifest-hbuilderx) | Web: x; Android: 4.31; iOS: 4.31 | 用于HBuilderX可视化界面相关操作配置 |

**注意**
- `appid` 由 DCloud 云端分配，主要用于 DCloud 相关的云服务，请勿自行修改。[详见](https://ask.dcloud.net.cn/article/35907)
- `uni-app-x` 节点必须存在，它是一个项目是否是 uni-app x项目的核心标识。
	* 缺少该节点时，HBuilderX 会把项目识别为 uni-app js引擎版项目（方形项目图标）。
	* 含有该节点时，HBuilderX 会把项目识别为 uni-app x 项目，项目图标是圆形的。

### UNI-APP-X配置 @manifest-uni-app-x

存在uni-app-x节点则表示为uni-app x项目

| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| 4.0 | 3.9 | 4.11 | 4.61 |

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| flex-direction | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse' | "column" | Web: 4.0; Android: 5.0; iOS: 5.0; HarmonyOS: 5.0 | uvue页面默认flex排列方向 |
| vapor | boolean | false | Web: 4.0; Android(VDOM): x; Android(Vapor): 5.21; iOS(VDOM): x; iOS(Vapor): 5.11; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.0 | 是否启用蒸汽模式 |
| styleIsolationVersion | '2' | "2" | Web: 5.0; Android: 5.0; iOS: 5.0; HarmonyOS: 5.0 | 样式隔离策略 |
| vapor-render-target | 'bytecode' \| 'nativecode' | "bytecode" | Web: x; Android: x; iOS: x; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.11 | 视图层编译目标 |

### APP配置 @manifest-app

App平台（原生App）配置

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 |

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| defaultAppTheme | 'auto' \| 'light' \| 'dark' | "light" | Android: 4.18; iOS: 4.18 | 应用默认主题，可取值 light/dark/auto，默认值为 light。应用主题适配[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/themejson.html) |
| distribute | [distribute 配置项列表](#app-distribute) |  |   | App平台发布配置 |
| initPrivacyAuthorization | 'auto' \| 'agree' \| 'disagree' | "auto" | Android: 4.31; iOS: 4.31; HarmonyOS: x | 隐私协议初始状态，可取值 auto/agree/disagree，默认值为 auto。获取应用隐私协议状态相关api[参考文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) |

uni-app 项目可配置原生的隐私弹框。这是因为开发者的js执行较慢，在原生代码获取隐私前来不及弹框，不能满足先弹隐私政策后采集数据的合规要求。

但uni-app x 项目是原生驱动执行的，开发者的代码执行非常快，无需再提供隐私政策弹框配置。自行弹框即可。

但开发者需注意在用户同意隐私政策前，不要采集涉及隐私的数据。如果违反当地法律或应用商店的要求，会无法上架应用商店甚至被处罚。

hello uni-app x中提供了基于dialogPage的隐私政策弹框示例代码，在app.uvue的代码中搜索`uni.getPrivacySetting`可见，[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/App.uvue)

该示例代码在应用启动的onLauch中，判断隐私协议是否已经被同意，未同意的话通过dialogPage弹出一个页面，该页面有隐私协议的内容及同意、取消按钮。
其中同意按钮为[button组件](../component/button.md)的`open-type=agreePrivacyAuthorization`


#### DISTRIBUTE配置 @app-distribute

App平台发布配置



| 属性 | 类型 | 默认值 | 描述 |
| :- | :- | :- | :- |
| syncDebug | boolean | "false" | 是否为自定义调试基座 |
| icons | [icons 配置项列表](#distribute-icons) |  | Android、iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。 |
| splashScreens | [splashScreens 配置项列表](#distribute-splashscreens) |  | Android、iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html) |
| android | [android 配置项列表](#distribute-android) |  | App-Android平台发布配置 |
| ios | [ios 配置项列表](#distribute-ios) |  | IOS配置 |
| modules | [modules 配置项列表](#distribute-modules) |  | app内置模块配置 |

##### App端图标配置 @distribute-icons

Android、iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| android | [android 配置项列表](#icons-android) | Android图标配置 |
| ios | [ios 配置项列表](#icons-ios) | iOS图标配置 |

**注意**
- App端图片相关配置，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改
- manifest中只能配置一个icon。如需在应用发布后动态修改icon，可在插件市场搜索[动态图标插件](https://ext.dcloud.net.cn/search?q=%E5%8A%A8%E6%80%81%E5%9B%BE%E6%A0%87&orderBy=Relevance&cat1=8&cat2=81)。

###### Android图标配置 @icons-android

<!-- MANIFESTJSON.app_distribute_icons_android.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| hdpi | string | 高分屏设备应用图标，分辨率要求72x72 |
| xhdpi | string | 720P高分屏设备应用图标，分辨率要求96x96 |
| xxhdpi | string | 1080P高分屏设备应用图标，分辨率要求144x144 |
| xxxhdpi | string | 2K屏设备应用图标，分辨率要求192x192 |

> 必须使用 `png` 格式图标

###### iOS图标配置 @icons-ios

<!-- MANIFESTJSON.app_distribute_icons_ios.description -->



> 必须使用 `png` 格式图标，图片中不能存在透明区域

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appstore | string | iPhone/iPad设备应用图标，分辨率要求 1024x1024 |

##### App端启动界面配置 @distribute-splashScreens

Android、iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html)


###### Android平台启动界面配置 @splashScreens-android

<!-- MANIFESTJSON.app_distribute_splashScreens_android.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| ldpi | string | 适用于（mdpi）密度屏幕（~120dpi），建议分辨率 240x320。此类设备不常见，通常可以不用配置此项。 |
| mdpi | string | 适用于（mdpi）密度屏幕（~160dpi），建议分辨率 320x480。此类设备不常见，通常可以不用配置此项。 |
| hdpi | string | 适用于（hdpi）密度屏幕（~240dpi），建议分辨率 480x800。此类设备不常见，通常可以不用配置此项。 |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 720x1280 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 1080x1920 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 2160x3840 |


###### Android12启动界面配置 @splashScreen-_android12

适配支持Android12启动界面。无此配置项表示不适配支持Android12启动界面。



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| background | string | 仅在Android12及以上设备生效，默认值为白色 |
| icon | [icon 配置项列表](#android12-icon) | Android12启动界面中部Logo图标 |
| brand | [brand 配置项列表](#android12-brand) | Android12启动界面底部品牌图标 |


###### Android12启动界面Logo图标配置 @android12-icon

<!-- MANIFESTJSON.app_distribute_splashScreens_android12_icon.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 480x480 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 720x720 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 960x960 |

###### Android12启动界面底部品牌图标 @android12-brand

<!-- MANIFESTJSON.app_distribute_splashScreens_android12_brand.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 400x160 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 600x240 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 800x320 |

##### ANDROID配置 @distribute-android

App-Android平台发布配置



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| permissions | Array\<string> |  | Android: 4.53; iOS: x | 额外添加的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#incloudpermissions) |
| excludePermissions | Array\<string> |  | Android: 4.53; iOS: x | 强制移除的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#excludepermissions) |
| minSdkVersion | integer | 21 | Android: 3.9; iOS: x | 应用兼容的最低Android版本（API等级） [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#minsdkversion) |
| targetSdkVersion | integer | 32 | Android: 3.9; iOS: x | 应用适配的目标Android版本（API等级），部分应用市场要求设置较高的targetSdkVersion才能提交审核 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#targetsdkversion) |
| abiFilters | Array\<'armeabi-v7a' \| 'arm64-v8a' \| 'x86' \| 'x86_64'> | \["arm64-v8a"\] | Android: 3.9; iOS: x | 应用支持的CPU类型 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#abifilters) |
| enableResourceOptimizations | boolean | "true" | Android: 4.33; iOS: x | 是否开启Android原生res资源文件优化，开启后res资源文件名称会被混淆 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#enableresourceoptimizations) |
| aaptOptions | Array\<string> |  | Android: 4.31; iOS: x | aaptOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#aaptoptions) |
| buildFeatures | Array\<string> |  | Android: 4.31; iOS: x | buildFeatures 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#buildfeatures) |
| packagingOptions | Array\<string> |  | Android: 4.27; iOS: x | packagingOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#packagingoptions) |

###### manifestPlaceholders @manifestplaceholders

manifest.json中不提供配置 `manifestPlaceholders` 数据，如果应用使用的插件或三方SDK需要使用，可在项目的 `nativeResources/android/manifestPlaceholders.json` 文件中配置，详情参考[Android原生应用清单文件和资源](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#manifestplaceholders)。


##### IOS配置 @distribute-ios

<!-- MANIFESTJSON.app_distribute_ios.description -->



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| devices | 'iphone' \| 'ipad' \| 'universal' | "auto" | Android: x; iOS: 4.11 | iOS支持的设备 |
| CFBundleName | string | "UniAppX" | Android: x; iOS: 4.34 | 应用内部名称（可作为开发者标识），最多可使用15个字符，[详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#cfbundlename) |
| UIRequiresFullScreen | boolean | "false" | Android: x; iOS: 4.34 | 在iPad设备是否全屏显示，设置为false表示应用能够与其他应用共享屏幕显示（分屏显示） [详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#uirequiresfullscreen) |


##### distribute modules 配置项列表 @distribute-modules

app内置模块配置



| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| uni-ad | [uni-ad 配置项列表](#modules-uni-ad) | Android: 4.0; iOS: 4.22 | [uni-ad广告联盟](https://uniad.dcloud.net.cn/)模块 |
| uni-canvas | object | Android: 4.25; iOS: 4.25 | [canvas画布](https://doc.dcloud.net.cn/uni-app-x/component/canvas.html)组件模块（HBuilderX4.25+） |
| uni-cloud-client | object | Android: 4.25; iOS: 4.25 | [uniCloud云函数/云对象](https://doc.dcloud.net.cn/uniCloud/cf-functions.html)模块（HBuilderX4.25+） |
| uni-createRequestPermissionListener | object | Android: 4.0; iOS: x | [监听权限申请](https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html)模块（HBuilderX4.0+） |
| uni-createWebviewContext | object | Android: 4.0; iOS: x | 创建[web-view 组件的上下文对象](https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html)模块 |
| uni-facialRecognitionVerify | object | Android: 3.91; iOS: 4.11 | [uni实人认证](https://doc.dcloud.net.cn/uni-app-x/api/facial-recognition-meta-info.html)模块 |
| uni-fileSystemManager | object | Android: 3.91; iOS: 4.11 | [文件管理](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html)模块 |
| uni-location | [uni-location 配置项列表](#modules-uni-location) | Android: 3.91; iOS: 4.11 | [系统定位](https://doc.dcloud.net.cn/uni-app-x/api/get-location.html)模块, HBuilderX 4.61- 之前是`uni-getLocation` |
| uni-getNetworkType | object | Android: 3.91; iOS: 4.11 | [获取网络类型](https://doc.dcloud.net.cn/uni-app-x/api/get-network-type.html)模块 |
| uni-installApk | object | Android: 3.99; iOS: x | [安装apk](https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html)模块 |
| uni-payment | [uni-payment 配置项列表](#modules-uni-payment) | Android: 4.02; iOS: 4.18 | [请求支付](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)模块 |
| uni-getProvider | object | Android: 4.11; iOS: 4.11 | [获取服务供应商](https://doc.dcloud.net.cn/uni-app-x/api/get-provider.html#getprovider)模块 |
| uni-push | object | Android: 3.97; iOS: 4.11 | [统一推送](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html)模块 |
| uni-media | object | Android: 3.91; iOS: 4.11 | [多媒体](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html)模块 |
| uni-network | object | Android: 3.91; iOS: 4.11 | [网络请求（文件上传/下载）](https://doc.dcloud.net.cn/uni-app-x/api/network-summarize.html)模块 |
| uni-virtualPayment | object | Android: x; iOS: 4.25 | [虚拟支付](https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html)模块 |
| uni-video | object | Android: 3.91; iOS: 4.11 | [video视频组件](https://doc.dcloud.net.cn/uni-app-x/component/video.html)模块 |
| uni-websocket | object | Android: 3.91; iOS: 4.11 | [WebSocket](https://doc.dcloud.net.cn/uni-app-x/api/websocket.html)模块 |
| uni-verify | object | Android: 3.99; iOS: 4.18 | [一键登录](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html)模块 |


###### uni-ad 配置项列表 @modules-uni-ad

[uni-ad广告联盟](https://uniad.dcloud.net.cn/)模块

| Android | iOS |
| :- | :- |
| 4.0 | 4.22 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| gdt | object | 腾讯优量汇广告联盟 |
| gm | object | 穿山甲GroMore |
| ks | object | 快手广告联盟 |
| sgm | object | Sigmob广告联盟 |
| bd | object | 百度百青藤广告联盟 |


###### uni-location 配置项列表 @modules-uni-location

[系统定位](https://doc.dcloud.net.cn/uni-app-x/api/get-location.html)模块, HBuilderX 4.61- 之前是`uni-getLocation`

| Android | iOS |
| :- | :- |
| 3.91 | 4.11 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| system | object | 系统定位 |
| tencent | object | 腾讯定位 |


###### uni-payment 配置项列表 @modules-uni-payment

[请求支付](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)模块

| Android | iOS |
| :- | :- |
| 4.02 | 4.18 |

| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| alipay | object | Android: 3.91; iOS: 4.18 | 支付宝支付 |
| wxpay | [wxpay 配置项列表](#uni-payment-wxpay) | Android: 4.11; iOS: 4.18 | 微信支付 |


###### uni-payment-wxpay 配置项列表 @uni-payment-wxpay

微信支付

| Android | iOS |
| :- | :- |
| 4.11 | 4.18 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| android | object | android平台微信支付配置信息 |
| ios | [ios 配置项列表](#wxpay-ios) | ios平台微信支付配置信息 |


###### wxpay ios 配置项列表 @wxpay-ios

ios平台微信支付配置信息



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appid | string | 微信开放平台申请的应用ID（AppID） |
| universalLink | string | 通用链接（Universal Link），配置方式参考：[iOS通用链接](https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5-universal-link) |



### 安卓App配置 @manifest-app-android

App-Android平台配置

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.71 | x | x |

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| defaultAppTheme | 'auto' \| 'light' \| 'dark' | "light" | Android: 4.18 | 应用默认主题，可取值 light/dark/auto，默认值为 light。应用主题适配[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/themejson.html) |
| distribute | [distribute 配置项列表](#app-android-distribute) |  |   | Android平台发布配置 |
| initPrivacyAuthorization | 'auto' \| 'agree' \| 'disagree' | "auto" | Android: 4.31 | 隐私协议初始状态，可取值 auto/agree/disagree，默认值为 auto。获取应用隐私协议状态相关api[参考文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) |


#### DISTRIBUTE配置 @app-android-distribute

Android平台发布配置



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| syncDebug | boolean | "false" |   | 是否为自定义调试基座 |
| icons | [icons 配置项列表](#distribute-icons) |  |   | Android平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。 |
| splashScreens | [splashScreens 配置项列表](#distribute-splashscreens) |  |   | Android平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#splashscreen) |
| modules | [modules 配置项列表](#distribute-modules) |  |   | app内置模块配置 |
| permissions | Array\<string> |  | Android: 4.53 | 额外添加的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#incloudpermissions) |
| excludePermissions | Array\<string> |  | Android: 4.53 | 强制移除的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#excludepermissions) |
| minSdkVersion | integer | 21 | Android: 3.9 | 应用兼容的最低Android版本（API等级） [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#minsdkversion) |
| targetSdkVersion | integer | 32 | Android: 3.9 | 应用适配的目标Android版本（API等级），部分应用市场要求设置较高的targetSdkVersion才能提交审核 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#targetsdkversion) |
| abiFilters | Array\<'armeabi-v7a' \| 'arm64-v8a' \| 'x86' \| 'x86_64'> | \["arm64-v8a"\] | Android: 3.9 | 应用支持的CPU类型 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#abifilters) |
| enableResourceOptimizations | boolean | "true" | Android: 4.33 | 是否开启Android原生res资源文件优化，开启后res资源文件名称会被混淆 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#enableresourceoptimizations) |
| aaptOptions | Array\<string> |  | Android: 4.31 | aaptOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#aaptoptions) |
| buildFeatures | Array\<string> |  | Android: 4.31 | buildFeatures 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#buildfeatures) |
| packagingOptions | Array\<string> |  | Android: 4.27 | packagingOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#packagingoptions) |


##### Android平台图标配置 @distribute-icons

Android平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| hdpi | string | 高分屏设备应用图标，分辨率要求72x72 |
| xhdpi | string | 720P高分屏设备应用图标，分辨率要求96x96 |
| xxhdpi | string | 1080P高分屏设备应用图标，分辨率要求144x144 |
| xxxhdpi | string | 2K屏设备应用图标，分辨率要求192x192 |


##### Android平台启动界面配置 @distribute-splashscreens

Android平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#splashscreen)



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| default | [default 配置项列表](#splashscreens-default) | Android平台启动图配置 |
| background | string | 仅在Android12及以上设备生效，默认值为白色 |
| icon | [icon 配置项列表](#splashscreens-icon) | Android12启动界面中部Logo图标 |
| brand | [brand 配置项列表](#splashscreens-brand) | Android12启动界面底部品牌图标 |


###### Android平台启动图配置 @splashscreens-default

<!-- MANIFESTJSON.app-android_distribute_splashScreens_default.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| ldpi | string | 适用于（mdpi）密度屏幕（~120dpi），建议分辨率 240x320。此类设备不常见，通常可以不用配置此项。 |
| mdpi | string | 适用于（mdpi）密度屏幕（~160dpi），建议分辨率 320x480。此类设备不常见，通常可以不用配置此项。 |
| hdpi | string | 适用于（hdpi）密度屏幕（~240dpi），建议分辨率 480x800。此类设备不常见，通常可以不用配置此项。 |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 720x1280 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 1080x1920 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 2160x3840 |


###### Android12启动界面中部Logo图标 @splashscreens-icon

<!-- MANIFESTJSON.app-android_distribute_splashScreens_icon.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 480x480 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 720x720 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 960x960 |


###### Android12启动界面底部品牌图标 @splashscreens-brand

<!-- MANIFESTJSON.app-android_distribute_splashScreens_brand.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| xhdpi | string | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 400x160 |
| xxhdpi | string | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 600x240 |
| xxxhdpi | string | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 800x320 |


###### modulesuni-location 配置项列表 @modules-uni-location

[Android平台uni-location（定位）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#moduleslocation)模块Provider配置

| Android |
| :- |
| 3.91 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| system | object | 系统定位 |
| tencent | [tencent 配置项列表](#uni-location-tencent) | 腾讯定位 |


###### uni-locationtencent 配置项列表 @uni-location-tencent

腾讯定位



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| key | string | 腾讯位置服务后台申请的Key |


###### modulesuni-map 配置项列表 @modules-uni-map

[Android平台uni-map（地图）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulesmap)模块Provider配置

| Android |
| :- |
| 4.31 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| tencent | [tencent 配置项列表](#uni-map-tencent) | 腾讯地图 |


###### uni-maptencent 配置项列表 @uni-map-tencent

腾讯地图



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| key | string | 腾讯位置服务后台申请的Key |


###### modulesuni-payment 配置项列表 @modules-uni-payment

[Android平台uni-payment（支付）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#modulespayment)模块Provider配置

| Android |
| :- |
| 4.02 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| alipay | object | 支付宝支付 |
| wxpay | object | 微信支付 |


### iOS App配置 @manifest-app-ios

iOS App平台配置

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | x | 4.71 | x |

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| defaultAppTheme | 'auto' \| 'light' \| 'dark' | "light" | Android: 4.18 | 应用默认主题，可取值 light/dark/auto，默认值为 light。应用主题适配[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/themejson.html) |
| distribute | [distribute 配置项列表](#app-ios-distribute) |  |   | iOS平台发布配置 |
| initPrivacyAuthorization | 'auto' \| 'agree' \| 'disagree' | "auto" | Android: 4.31 | 隐私协议初始状态，可取值 auto/agree/disagree，默认值为 auto。获取应用隐私协议状态相关api[参考文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) |


#### DISTRIBUTE配置 @app-ios-distribute

iOS平台发布配置



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| syncDebug | boolean | "false" |   | 是否为自定义调试基座 |
| icons | [icons 配置项列表](#distribute-icons) |  |   | iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。 |
| splashScreens | [splashScreens 配置项列表](#distribute-splashscreens) |  |   | iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#splashscreen) |
| modules | [modules 配置项列表](#distribute-modules) |  |   | app内置模块配置 |
| devices | 'iphone' \| 'ipad' \| 'universal' | "auto" | iOS: 4.11 | iOS支持的设备 |
| CFBundleName | string | "UniAppX" | iOS: 4.34 | 应用内部名称（可作为开发者标识），最多可使用15个字符，[详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#cfbundlename) |
| UIRequiresFullScreen | boolean | "false" | iOS: 4.34 | 在iPad设备是否全屏显示，设置为false表示应用能够与其他应用共享屏幕显示（分屏显示） [详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#uirequiresfullscreen) |


##### iOS平台图标配置 @distribute-icons

iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appstore | string | iPhone/iPad设备应用图标，分辨率要求 1024x1024 |


##### iOS平台启动界面配置 @distribute-splashscreens

iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#splashscreen)



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| storyboard | string | 用于iOS平台自定义storyboard启动界面，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html#ios) |


##### distribute modules 配置项列表 @distribute-modules

app内置模块配置



| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| uni-location | [uni-location 配置项列表](#modules-uni-location) | iOS: 4.11 | [iOS平台uni-location（定位）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#moduleslocation)模块Provider配置 |
| uni-map | [uni-map 配置项列表](#modules-uni-map) | iOS: 4.31 | [iOS平台uni-map（地图）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulesmap)模块Provider配置 |
| uni-payment | [uni-payment 配置项列表](#modules-uni-payment) | iOS: 4.18 | [iOS平台uni-payment（支付）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulespayment)模块Provider配置 |


###### modulesuni-location 配置项列表 @modules-uni-location

[iOS平台uni-location（定位）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#moduleslocation)模块Provider配置

| iOS |
| :- |
| 4.11 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| system | object | 系统定位 |
| tencent | [tencent 配置项列表](#uni-location-tencent) | 腾讯定位 |


###### uni-locationtencent 配置项列表 @uni-location-tencent

腾讯定位



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| key | string | 腾讯位置服务后台申请的Key |


###### modulesuni-map 配置项列表 @modules-uni-map

[iOS平台uni-map（地图）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulesmap)模块Provider配置

| iOS |
| :- |
| 4.31 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| tencent | [tencent 配置项列表](#uni-map-tencent) | 腾讯地图 |


###### uni-maptencent 配置项列表 @uni-map-tencent

腾讯地图



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| key | string | 腾讯位置服务后台申请的Key |


###### modulesuni-payment 配置项列表 @modules-uni-payment

[iOS平台uni-payment（支付）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulespayment)模块Provider配置

| iOS |
| :- |
| 4.18 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| alipay | object | 支付宝支付 |
| wxpay | [wxpay 配置项列表](#uni-payment-wxpay) | 微信支付 |


###### uni-paymentwxpay 配置项列表 @uni-payment-wxpay

微信支付



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appid | string | 微信开放平台创建移动应用时获取的APPID，以wx开头的字符串 |
| universalLink | string | 微信开放平台的应用开发配置中设置的 Universal Links 值 |


### HarmonyOS配置 @manifest-app-harmony

HarmonyOS平台配置

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | x | x | 4.61 |

| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| distribute | [distribute 配置项列表](#app-harmony-distribute) | HarmonyOS: 4.61 | HarmonyOS分发配置 |


#### app-harmonydistribute 配置项列表 @app-harmony-distribute

HarmonyOS分发配置

| HarmonyOS |
| :- |
| 4.61 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| modules | [modules 配置项列表](#distribute-modules) | HarmonyOS分发模块配置 |


##### distribute modules 配置项列表 @distribute-modules

HarmonyOS分发模块配置



| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| uni-location-system | object | HarmonyOS: 4.61 | 系统定位模块 |
| uni-map-tencent | object | HarmonyOS: 4.61 | 腾讯地图模块 |
| uni-oauth | [uni-oauth 配置项列表](#modules-uni-oauth) |   | 华为OAuth模块 |
| uni-share | [uni-share 配置项列表](#modules-uni-share) | HarmonyOS: 4.75 | share 模块 |
| uni-payment-alipay | object | HarmonyOS: 4.61 | 支付宝支付模块 |
| uni-payment-wxpay | object | HarmonyOS: 4.61 | 微信支付模块 |
| uni-push | object | HarmonyOS: 4.61 | 统一推送模块 |
| uni-verify | object | HarmonyOS: 4.61 | 一键登录模块 |
| uni-facialVerify | object | HarmonyOS: 4.61 | uni实人认证模块 |


###### modulesuni-oauth 配置项列表 @modules-uni-oauth

华为OAuth模块



| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| huawei | object | HarmonyOS: 4.61 | 华为OAuth模块 |
| weixin | [weixin 配置项列表](#uni-oauth-weixin) | HarmonyOS: 4.75 | 微信OAuth模块 |


###### uni-oauthweixin 配置项列表 @uni-oauth-weixin

微信OAuth模块

| HarmonyOS |
| :- |
| 4.75 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appid | string | 微信开放平台申请的应用ID（AppID） |


###### modulesuni-share 配置项列表 @modules-uni-share

share 模块

| HarmonyOS |
| :- |
| 4.75 |

| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| weixin | [weixin 配置项列表](#uni-share-weixin) | HarmonyOS: 4.75 | 微信 share 模块 |


###### uni-shareweixin 配置项列表 @uni-share-weixin

微信 share 模块

| HarmonyOS |
| :- |
| 4.75 |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appid | string | 微信开放平台申请的应用ID（AppID） |


### Web配置 @manifest-web

Web平台配置

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | x | x | x | x |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| title | string | 默认为应用名称 |
| template | string | 默认为空可定制生成的html代码，参考：https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-template |
| router | [router 配置项列表](#web-router) |   |
| devServer | [devServer 配置项列表](#web-devserver) |   |
| optimization | [optimization 配置项列表](#web-optimization) |   |
| unipush | [unipush 配置项列表](#web-unipush) |   |
| sdkConfigs | [sdkConfigs 配置项列表](#web-sdkconfigs) |   |
| darkmode | boolean | 是否开启暗黑模式 |


#### web router 配置项列表 @web-router

<!-- MANIFESTJSON.web_router.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| mode | 'hash' \| 'history' | hash|history，二选一 |
| base | string | 例：/web/，代表在域名的/web/目录下部署运行。如设为./，则代表相对路径，支持file协议打开，此时路由模式强制为hash模式。 |


#### web devServer 配置项列表 @web-devserver

<!-- MANIFESTJSON.web_devServer.description -->



| 属性 | 类型 | 描述 |
| :- | :- | :- |
| port | integer | 参考：https://uniapp.dcloud.net.cn/collocation/manifest.html#devserver |
| https | boolean |  |


#### web optimization 配置项列表 @web-optimization

<!-- MANIFESTJSON.web_optimization.description -->



| 属性 | 类型 |
| :- | :- |
| treeShaking | [treeShaking 配置项列表](#optimization-treeshaking) |


##### treeShaking 配置项列表 @optimization-treeshaking

<!-- MANIFESTJSON.web_optimization_treeShaking.description -->



| 属性 | 类型 |
| :- | :- |
| enable | boolean |


#### web unipush 配置项列表 @web-unipush

<!-- MANIFESTJSON.web_unipush.description -->



| 属性 | 类型 |
| :- | :- |
| enable | boolean |


#### web sdkConfigs 配置项列表 @web-sdkconfigs

<!-- MANIFESTJSON.web_sdkConfigs.description -->



| 属性 | 类型 |
| :- | :- |
| maps | [maps 配置项列表](#sdkconfigs-maps) |


##### 定位和地图（只能选一个） @sdkconfigs-maps





| 属性 | 类型 |
| :- | :- |
| tencent | [tencent 配置项列表](#maps-tencent) |
| google | [google 配置项列表](#maps-google) |
| amap | [amap 配置项列表](#maps-amap) |


###### 腾讯地图，旧配置项为qqmap @maps-tencent





| 属性 | 类型 |
| :- | :- |
| key | string |


###### 谷歌地图 @maps-google





| 属性 | 类型 |
| :- | :- |
| key | string |


###### samap 配置项列表 @maps-amap

<!-- MANIFESTJSON.web_sdkConfigs_maps_amap.description -->



| 属性 | 类型 |
| :- | :- |
| key | string |
| securityJsCode | string |
| serviceHost | string |

### mp-weixin 配置项列表 @manifest-mp-weixin

<!-- MANIFESTJSON.mp-weixin.description -->

| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | √ | x | x | x |

| 属性 | 类型 | 描述 |
| :- | :- | :- |
| appid | string | 微信小程序的AppID，登录 https://mp.weixin.qq.com 申请 |
| setting | object | 微信小程序项目设置，参考 https://uniapp.dcloud.net.cn/collocation/manifest?id=setting |
| functionalPages | boolean | 微信小程序是否启用插件功能页，默认关闭 |
| requiredBackgroundModes | array | 微信小程序需要在后台使用的能力,详见 https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#requiredbackgroundmodes |
| plugins | object | 使用到的插件，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html |
| resizable | boolean | 在iPad上小程序是否支持屏幕旋转，默认关闭 |
| navigateToMiniProgramAppIdList | array | 需要跳转的小程序列表，详见 https://developers.weixin.qq.com/minigame/dev/reference/configuration/app.html#navigateToMiniProgramAppIdList |
| permission | object | 微信小程序接口权限相关设置，比如申请位置权限必须填此处详见 https://developers.weixin.qq.com/miniprogram/dev/framework/config.html |
| workers | string | Worker 代码放置的目录。 详见 https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html |
| optimization | object | 对微信小程序的优化配置 |
| cloudfunctionRoot | string | 配置云开发目录，参考 https://uniapp.dcloud.net.cn/collocation/manifest?id=cloudfunctionRoot |
| scopedSlotsCompiler | string | Vue2 作用域插槽编译模式，uni-app 3.1.19+ 开始支持，可选：legacy、auto、augmented，默认：auto |
| mergeVirtualHostAttributes | boolean | 合并由 Vue 组件编译而成的小程序组件虚拟节点外层属性，目前仅支持 id（v4.42+）、style（v3.5.1+）、class（v3.5.1+）以及 v-show 指令生成的 hidden（v4.41+） 属性 |
| slotMultipleInstance | boolean | 模拟单个作用域插槽渲染为多个实例，此配置仅限 Vue2 环境 3.7.12+，Vue3 环境已默认支持 |
| embeddedAppIdList | array | 要半屏跳转的小程序appid。详见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html |
| requiredPrivateInfos | array | 地理位置相关接口。详见 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredPrivateInfos |
| lazyCodeLoading | string | 目前仅支持值 requiredComponents，代表开启小程序按需注入特性，详见 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#lazyCodeLoading |
| enableVirtualHost | boolean | 是否为组件启用virtualHost，默认启用 |
| darkmode | boolean | 是否开启暗黑模式 |

### HBuilderX配置 @manifest-__hbuilderx

用于HBuilderX可视化界面相关操作配置

| Web | Android | iOS |
| :- | :- | :- |
| x | 4.31 | 4.31 |

| 属性 | 类型 | 兼容性 | 描述 |
| :- | :- | :- | :- |
| channel_list | array | Android: 4.31; iOS: x | 云端打包时配置的自定义渠道信息 |


## 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=collocation.manifest_json)
