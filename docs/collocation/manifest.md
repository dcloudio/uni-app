# manifest.json

`manifest.json` 是 uni-app x 项目的配置文件，用于设置应用的名称、版本、图标等信息。在 HBuilderX 中创建项目时此文件保存在根目录。

uni-app x 默认没有splash启动界面，因uni-app x打包后启动速度非常快，可以自己做一个简单的uvue页面来当做splash。HBuilderX3.99+版本新增支持配置splash启动界面，详情参考[启动界面配置](manifest-splashscreen.md)。

uni-app x 目前不提供内置模块选择，而是提供了摇树机制自动选择内置模块，详情参考[模块配置](manifest-modules.md#treeshaking)。

## 配置项列表

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appid | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | [DCloud AppID 使用说明](https://ask.dcloud.net.cn/article/35907) |
| name | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 应用名称 |
| description | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 应用描述 |
| versionName | string | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 应用版本名称 |
| versionCode | integer | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 应用版本号，必须是整数，取值范围1~2147483647；升级时必须高于上一次设置的值。 |
| locale | '' | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 默认语言 |
| fallbackLocale | '' | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 默认回退语言 |
| uni-app-x | [uni-app-x 配置项列表](#manifest-uni-app-x) | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 存在uni-app-x节点则表示为uni-app x项目 |
| app | [app 配置项列表](#manifest-app) | - | Web: x; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | App平台（原生App）配置 |
| app-android | [app-android 配置项列表](#manifest-app-android) | - | Web: -; 微信小程序: -; Android: 4.71; iOS: -; HarmonyOS: -; HarmonyOS(Vapor): - | App-Android平台配置 |
| app-ios | [app-ios 配置项列表](#manifest-app-ios) | - | Web: -; 微信小程序: -; Android: -; iOS: 4.71; HarmonyOS: -; HarmonyOS(Vapor): - | iOS App平台配置 |
| app-harmony | [app-harmony 配置项列表](#manifest-app-harmony) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | HarmonyOS平台配置 |
| web | [web 配置项列表](#manifest-web) | - | Web: 4.0; 微信小程序: -; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | Web平台配置 |
| mp-weixin | [mp-weixin 配置项列表](#manifest-mp-weixin) | - | - | - |
| __hbuilderx | [__hbuilderx 配置项列表](#manifest-__hbuilderx) | - | Web: x; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: -; HarmonyOS(Vapor): - | 用于HBuilderX可视化界面相关操作配置 |

**注意**
- `appid` 由 DCloud 云端分配，主要用于 DCloud 相关的云服务，请勿自行修改。[详见](https://ask.dcloud.net.cn/article/35907)
- `uni-app-x` 节点必须存在，它是一个项目是否是 uni-app x项目的核心标识。
	* 缺少该节点时，HBuilderX 会把项目识别为 uni-app js引擎版项目（方形项目图标）。
	* 含有该节点时，HBuilderX 会把项目识别为 uni-app x 项目，项目图标是圆形的。

### UNI-APP-X配置 @manifest-uni-app-x

存在uni-app-x节点则表示为uni-app x项目

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| flex-direction | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse' | "column" | - | uvue页面默认flex排列方向 |


### APP配置 @manifest-app

App平台（原生App）配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| defaultAppTheme | 'auto' \| 'light' \| 'dark' | "light" | Web: -; 微信小程序: -; Android: 4.18; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 应用默认主题，可取值 light/dark/auto，默认值为 light。应用主题适配[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/themejson.html) |
| distribute | [distribute 配置项列表](#app-distribute) | - | - | App平台发布配置 |
| initPrivacyAuthorization | 'auto' \| 'agree' \| 'disagree' | "auto" | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x; HarmonyOS(Vapor): - | 隐私协议初始状态，可取值 auto/agree/disagree，默认值为 auto。获取应用隐私协议状态相关api[参考文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) |

uni-app 项目可配置原生的隐私弹框。这是因为开发者的js执行较慢，在原生代码获取隐私前来不及弹框，不能满足先弹隐私政策后采集数据的合规要求。

但uni-app x 项目是原生驱动执行的，开发者的代码执行非常快，无需再提供隐私政策弹框配置。自行弹框即可。

但开发者需注意在用户同意隐私政策前，不要采集涉及隐私的数据。如果违反当地法律或应用商店的要求，会无法上架应用商店甚至被处罚。

hello uni-app x中提供了基于dialogPage的隐私政策弹框示例代码，在app.uvue的代码中搜索`uni.getPrivacySetting`可见，[详见](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/App.uvue)

该示例代码在应用启动的onLauch中，判断隐私协议是否已经被同意，未同意的话通过dialogPage弹出一个页面，该页面有隐私协议的内容及同意、取消按钮。
其中同意按钮为[button组件](../component/button.md)的`open-type=agreePrivacyAuthorization`


#### DISTRIBUTE配置 @app-distribute

App平台发布配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| syncDebug | boolean | "false" | - | 是否为自定义调试基座 |
| icons | [icons 配置项列表](#distribute-icons) | - | - | Android、iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。 |
| splashScreens | [splashScreens 配置项列表](#distribute-splashscreens) | - | - | Android、iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html) |
| android | [android 配置项列表](#distribute-android) | - | - | App-Android平台发布配置 |
| ios | [ios 配置项列表](#distribute-ios) | - | - | IOS配置 |
| modules | [modules 配置项列表](#distribute-modules) | - | - | app内置模块配置 |


##### App端图标配置 @distribute-icons

iOS平台应用图标配置。云打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改。

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appstore | string | - | - | iPhone/iPad设备应用图标，分辨率要求 1024x1024 |

**注意**
- App端图片相关配置，建议在HBuilderX中 manifest.json 的可视化界面操作，不推荐手动在源码视图中修改
- manifest中只能配置一个icon。如需在应用发布后动态修改icon，可在插件市场搜索[动态图标插件](https://ext.dcloud.net.cn/search?q=%E5%8A%A8%E6%80%81%E5%9B%BE%E6%A0%87&orderBy=Relevance&cat1=8&cat2=81)。

###### Android图标配置 @icons-android

<!-- MANIFESTJSON.icons_android.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| hdpi | string | - | - | 高分屏设备应用图标，分辨率要求72x72 |
| xhdpi | string | - | - | 720P高分屏设备应用图标，分辨率要求96x96 |
| xxhdpi | string | - | - | 1080P高分屏设备应用图标，分辨率要求144x144 |
| xxxhdpi | string | - | - | 2K屏设备应用图标，分辨率要求192x192 |

> 必须使用 `png` 格式图标

###### iOS图标配置 @icons-ios

<!-- MANIFESTJSON.icons_ios.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appstore | string | - | - | iPhone/iPad设备应用图标，分辨率要求 1024x1024 |

> 必须使用 `png` 格式图标，图片中不能存在透明区域

<!-- MANIFESTJSON.icons_ios.compatibility -->

##### App端启动界面配置 @distribute-splashScreens

iOS平台应用启动界面配置。云端打包后生效，建议在HBuilderX中 manifest.json 的可视化界面操作，[参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#splashscreen)


###### Android平台启动界面配置 @splashScreens-android

<!-- MANIFESTJSON.splashScreens_android.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| ldpi | string | - | - | 适用于（mdpi）密度屏幕（~120dpi），建议分辨率 240x320。此类设备不常见，通常可以不用配置此项。 |
| mdpi | string | - | - | 适用于（mdpi）密度屏幕（~160dpi），建议分辨率 320x480。此类设备不常见，通常可以不用配置此项。 |
| hdpi | string | - | - | 适用于（hdpi）密度屏幕（~240dpi），建议分辨率 480x800。此类设备不常见，通常可以不用配置此项。 |
| xhdpi | string | - | - | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 720x1280 |
| xxhdpi | string | - | - | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 1080x1920 |
| xxxhdpi | string | - | - | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 2160x3840 |


###### Android12启动界面配置 @splashScreen-_android12

适配支持Android12启动界面。无此配置项表示不适配支持Android12启动界面。

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| background | string | - | - | 仅在Android12及以上设备生效，默认值为白色 |
| icon | [icon 配置项列表](#android12-icon) | - | - | Android12启动界面中部Logo图标 |
| brand | [brand 配置项列表](#android12-brand) | - | - | Android12启动界面底部品牌图标 |


###### Android12启动界面Logo图标配置 @android12-icon

<!-- MANIFESTJSON.android12_icon.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| xhdpi | string | - | - | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 480x480 |
| xxhdpi | string | - | - | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 720x720 |
| xxxhdpi | string | - | - | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 960x960 |

###### Android12启动界面底部品牌图标 @android12-brand

<!-- MANIFESTJSON.android12_brand.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| xhdpi | string | - | - | 适用于（xhdpi）密度屏幕（~320dpi），建议分辨率 400x160 |
| xxhdpi | string | - | - | 适用于（xxhdpi）密度屏幕（~480dpi），建议分辨率 600x240 |
| xxxhdpi | string | - | - | 适用于（xxxhdpi）密度屏幕（~640dpi），建议分辨率 800x320 |

<!-- MANIFESTJSON.android12_brand.compatibility -->

##### ANDROID配置 @distribute-android

App-Android平台发布配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| permissions | Array\<string> | - | Web: -; 微信小程序: -; Android: 4.53; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 额外添加的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#incloudpermissions) |
| excludePermissions | Array\<string> | - | Web: -; 微信小程序: -; Android: 4.53; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 强制移除的权限 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#excludepermissions) |
| minSdkVersion | integer | 21 | Web: -; 微信小程序: -; Android: 3.9; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 应用兼容的最低Android版本（API等级） [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#minsdkversion) |
| targetSdkVersion | integer | 32 | Web: -; 微信小程序: -; Android: 3.9; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 应用适配的目标Android版本（API等级），部分应用市场要求设置较高的targetSdkVersion才能提交审核 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#targetsdkversion) |
| abiFilters | Array\<'armeabi-v7a' \| 'arm64-v8a' \| 'x86' \| 'x86_64'> | ["arm64-v8a"\] | Web: -; 微信小程序: -; Android: 3.9; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 应用支持的CPU类型 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#abifilters) |
| enableResourceOptimizations | boolean | "true" | Web: -; 微信小程序: -; Android: 4.33; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启Android原生res资源文件优化，开启后res资源文件名称会被混淆 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#enableresourceoptimizations) |
| aaptOptions | Array\<string> | - | Web: -; 微信小程序: -; Android: 4.31; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | aaptOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#aaptoptions) |
| buildFeatures | Array\<string> | - | Web: -; 微信小程序: -; Android: 4.31; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | buildFeatures 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#buildfeatures) |
| packagingOptions | Array\<string> | - | Web: -; 微信小程序: -; Android: 4.27; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | packagingOptions 配置项 [参考文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#packagingoptions) |

###### manifestPlaceholders @manifestplaceholders

manifest.json中不提供配置 `manifestPlaceholders` 数据，如果应用使用的插件或三方SDK需要使用，可在项目的 `nativeResources/android/manifestPlaceholders.json` 文件中配置，详情参考[Android原生应用清单文件和资源](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#manifestplaceholders)。


##### IOS配置 @distribute-ios

<!-- MANIFESTJSON.distribute_ios.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| devices | 'iphone' \| 'ipad' \| 'universal' | "auto" | Web: -; 微信小程序: -; Android: x; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | iOS支持的设备 |
| CFBundleName | string | "UniAppX" | Web: -; 微信小程序: -; Android: x; iOS: 4.34; HarmonyOS: -; HarmonyOS(Vapor): - | 应用内部名称（可作为开发者标识），最多可使用15个字符，[详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#cfbundlename) |
| UIRequiresFullScreen | boolean | "false" | Web: -; 微信小程序: -; Android: x; iOS: 4.34; HarmonyOS: -; HarmonyOS(Vapor): - | 在iPad设备是否全屏显示，设置为false表示应用能够与其他应用共享屏幕显示（分屏显示） [详情参考](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#uirequiresfullscreen) |

<!-- MANIFESTJSON.distribute_ios.compatibility -->


##### distribute modules 配置项列表 @distribute-modules

HarmonyOS分发模块配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| uni-location-system | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 系统定位模块 |
| uni-map-tencent | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 腾讯地图模块 |
| uni-oauth | [uni-oauth 配置项列表](#modules-uni-oauth) | - | - | 华为OAuth模块 |
| uni-share | [uni-share 配置项列表](#modules-uni-share) | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.75; HarmonyOS(Vapor): - | share 模块 |
| uni-payment-alipay | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 支付宝支付模块 |
| uni-payment-wxpay | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 微信支付模块 |
| uni-push | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 统一推送模块 |
| uni-verify | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 一键登录模块 |
| uni-facialVerify | object | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: 4.61; HarmonyOS(Vapor): - | uni实人认证模块 |

<!-- MANIFESTJSON.distribute_modules.compatibility -->


###### uni-ad 配置项列表 @modules-uni-ad

[uni-ad广告联盟](https://uniad.dcloud.net.cn/)模块

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| gdt | object | - | - | 腾讯优量汇广告联盟 |
| gm | object | - | - | 穿山甲GroMore |
| ks | object | - | - | 快手广告联盟 |
| sgm | object | - | - | Sigmob广告联盟 |
| bd | object | - | - | 百度百青藤广告联盟 |

<!-- MANIFESTJSON.modules_uni-ad.compatibility -->


###### uni-location 配置项列表 @modules-uni-location

<!-- MANIFESTJSON.modules_uni-getLocation.description -->

<!-- MANIFESTJSON.modules_uni-getLocation.table -->

<!-- MANIFESTJSON.modules_uni-getLocation.compatibility -->


###### uni-payment 配置项列表 @modules-uni-payment

[iOS平台uni-payment（支付）](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-ios.html#modulespayment)模块Provider配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| alipay | object | - | - | 支付宝支付 |
| wxpay | [wxpay 配置项列表](#uni-payment-wxpay) | - | - | 微信支付 |

<!-- MANIFESTJSON.modules_uni-payment.compatibility -->


###### uni-payment-wxpay 配置项列表 @uni-payment-wxpay

微信支付

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appid | string | - | - | 微信开放平台创建移动应用时获取的APPID，以wx开头的字符串 |
| universalLink | string | - | - | 微信开放平台的应用开发配置中设置的 Universal Links 值 |

<!-- MANIFESTJSON.uni-payment_wxpay.compatibility -->


###### wxpay ios 配置项列表 @wxpay-ios

ios平台微信支付配置信息

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appid | string | - | - | 微信开放平台申请的应用ID（AppID） |
| universalLink | string | - | - | 通用链接（Universal Link），配置方式参考：[iOS通用链接](https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5-universal-link) |

<!-- MANIFESTJSON.wxpay_ios.compatibility -->


### Web配置 @manifest-web

Web平台配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| title | string | - | - | 默认为应用名称 |
| template | string | - | - | 默认为空可定制生成的html代码，参考：https://uniapp.dcloud.net.cn/collocation/manifest.html#h5-template |
| router | [router 配置项列表](#web-router) | - | - | - |
| devServer | [devServer 配置项列表](#web-devserver) | - | - | - |
| optimization | [optimization 配置项列表](#web-optimization) | - | - | - |
| unipush | [unipush 配置项列表](#web-unipush) | - | - | - |
| sdkConfigs | [sdkConfigs 配置项列表](#web-sdkconfigs) | - | - | - |
| darkmode | boolean | - | - | 是否开启暗黑模式 |

<!-- MANIFESTJSON.manifest_web.compatibility -->


#### web router 配置项列表 @web-router

<!-- MANIFESTJSON.web_router.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| mode | 'hash' \| 'history' | - | - | hash|history，二选一 |
| base | string | - | - | 例：/web/，代表在域名的/web/目录下部署运行。如设为./，则代表相对路径，支持file协议打开，此时路由模式强制为hash模式。 |

<!-- MANIFESTJSON.web_router.compatibility -->


#### web devServer 配置项列表 @web-devserver

<!-- MANIFESTJSON.web_devServer.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| port | integer | - | - | 参考：https://uniapp.dcloud.net.cn/collocation/manifest.html#devserver |
| https | boolean | - | - |  |

<!-- MANIFESTJSON.web_devServer.compatibility -->


#### web optimization 配置项列表 @web-optimization

<!-- MANIFESTJSON.web_optimization.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| treeShaking | [treeShaking 配置项列表](#optimization-treeshaking) | - | - | - |

<!-- MANIFESTJSON.web_optimization.compatibility -->


##### treeShaking 配置项列表 @optimization-treeshaking

<!-- MANIFESTJSON.optimization_treeShaking.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| enable | boolean | - | - |  |

<!-- MANIFESTJSON.optimization_treeShaking.compatibility -->


#### web unipush 配置项列表 @web-unipush

<!-- MANIFESTJSON.web_unipush.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| enable | boolean | - | - |  |

<!-- MANIFESTJSON.web_unipush.compatibility -->


#### web sdkConfigs 配置项列表 @web-sdkconfigs

<!-- MANIFESTJSON.web_sdkConfigs.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| maps | [maps 配置项列表](#sdkconfigs-maps) | - | - |  |

<!-- MANIFESTJSON.web_sdkConfigs.compatibility -->


##### 定位和地图（只能选一个） @sdkconfigs-maps



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| tencent | [tencent 配置项列表](#maps-tencent) | - | - |  |
| google | [google 配置项列表](#maps-google) | - | - |  |
| amap | [amap 配置项列表](#maps-amap) | - | - | - |

<!-- MANIFESTJSON.sdkConfigs_maps.compatibility -->


###### 腾讯地图，旧配置项为qqmap @maps-tencent



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| key | string | - | - |  |

<!-- MANIFESTJSON.maps_tencent.compatibility -->


###### 谷歌地图 @maps-google



| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| key | string | - | - |  |

<!-- MANIFESTJSON.maps_google.compatibility -->


###### samap 配置项列表 @maps-amap

<!-- MANIFESTJSON.maps_amap.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| key | string | - | - |  |
| securityJsCode | string | - | - |  |
| serviceHost | string | - | - |  |

<!-- MANIFESTJSON.maps_amap.compatibility -->

### mp-weixin 配置项列表 @manifest-mp-weixin

<!-- MANIFESTJSON.manifest_mp-weixin.description -->

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| appid | string | - | - | 微信小程序的AppID，登录 https://mp.weixin.qq.com 申请 |
| setting | object | - | - | 微信小程序项目设置，参考 https://uniapp.dcloud.net.cn/collocation/manifest?id=setting |
| functionalPages | boolean | - | - | 微信小程序是否启用插件功能页，默认关闭 |
| requiredBackgroundModes | array | - | - | 微信小程序需要在后台使用的能力,详见 https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#requiredbackgroundmodes |
| plugins | object | - | - | 使用到的插件，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html |
| resizable | boolean | - | - | 在iPad上小程序是否支持屏幕旋转，默认关闭 |
| navigateToMiniProgramAppIdList | array | - | - | 需要跳转的小程序列表，详见 https://developers.weixin.qq.com/minigame/dev/reference/configuration/app.html#navigateToMiniProgramAppIdList |
| permission | object | - | - | 微信小程序接口权限相关设置，比如申请位置权限必须填此处详见 https://developers.weixin.qq.com/miniprogram/dev/framework/config.html |
| workers | string | - | - | Worker 代码放置的目录。 详见 https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html |
| optimization | object | - | - | 对微信小程序的优化配置 |
| cloudfunctionRoot | string | - | - | 配置云开发目录，参考 https://uniapp.dcloud.net.cn/collocation/manifest?id=cloudfunctionRoot |
| scopedSlotsCompiler | string | - | - | Vue2 作用域插槽编译模式，uni-app 3.1.19+ 开始支持，可选：legacy、auto、augmented，默认：auto |
| mergeVirtualHostAttributes | boolean | - | - | 合并由 Vue 组件编译而成的小程序组件虚拟节点外层属性，目前仅支持 id（v4.42+）、style（v3.5.1+）、class（v3.5.1+）以及 v-show 指令生成的 hidden（v4.41+） 属性 |
| slotMultipleInstance | boolean | - | - | 模拟单个作用域插槽渲染为多个实例，此配置仅限 Vue2 环境 3.7.12+，Vue3 环境已默认支持 |
| embeddedAppIdList | array | - | - | 要半屏跳转的小程序appid。详见 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/openEmbeddedMiniProgram.html |
| requiredPrivateInfos | array | - | - | 地理位置相关接口。详见 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#requiredPrivateInfos |
| lazyCodeLoading | string | - | - | 目前仅支持值 requiredComponents，代表开启小程序按需注入特性，详见 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#lazyCodeLoading |
| enableVirtualHost | boolean | - | - | 是否为组件启用virtualHost，默认启用 |
| darkmode | boolean | - | - | 是否开启暗黑模式 |

<!-- MANIFESTJSON.manifest_mp-weixin.compatibility -->

### HBuilderX配置 @manifest-__hbuilderx

用于HBuilderX可视化界面相关操作配置

| 属性 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- |
| channel_list | array | - | Web: -; 微信小程序: -; Android: 4.31; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 云端打包时配置的自定义渠道信息 |

<!-- MANIFESTJSON.manifest___hbuilderx.compatibility -->


## 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=collocation.manifest_json)
