<!-- ## uni.getSystemInfo(options) @getsysteminfo -->

::: sourceCode
## uni.getSystemInfo(options) @getsysteminfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getSystemInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getSystemInfo

:::

> HBuilderX4.13-alpha版本，uniPlatform属性在 app 平台临时调整过，由 `app` 改为 `app-android`、`app-ios`，HBuilderX 4.14-alpha版本已回撤此调整。如果开发者使用HBuilderX4.13-alpha版发布项目时使用了uni-id-common、uni-id、uni-id-pages或uni-id-pages-x，则需要分别升级到如下版本来兼容此次临时调整：uni-id@3.3.32、uni-id-common@1.0.17、uni-id-pages@1.1.20、uni-id-pages-x@1.1.1

异步获取系统信息

### getSystemInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


uni-app 提供了异步(`uni.getSystemInfo`)和同步(`uni.getSystemInfoSync`)的2个API获取系统信息。

按照运行环境层级排序，从底层向上，systemInfo有6个概念：
- `device`：运行应用的设备，如iphone、huawei
- `os`：设备的操作系统，如 ios、andriod、windows、mac、linux
- `rom`：基于操作系统的定制，Android系统特有概念，如miui、鸿蒙
- `host`：运行应用的宿主程序，即OS和应用之间的运行环境，如浏览器、微信等小程序宿主、集成uniMPSDK的App
- `uni`：uni-app框架相关的信息，如uni-app框架的编译器版本、运行时版本
- `app`：开发者的应用相关的信息，如应用名称、版本

因本API涉及的信息越来越多，查询速度会逐渐变慢。由此拆解分出3个新API，[uni.getDeviceInfo](get-device-info.md)、[uni.getAppBaseInfo](get-app-base-info.md)、[uni.getWindowInfo](get-window-info.md)。新API包含的信息更多。

微信小程序已经不推荐使用getSystemInfo，建议使用上述分拆的3个API。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetSystemInfoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [GetSystemInfoResult](#getsysteminforesult-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [GetSystemInfoFail](#getsysteminfofail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetSystemInfoResult 的属性值 @getsysteminforesult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SDKVersion | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 客户端基础库版本<br/> |
| appId | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用appid。<br/> |
| appLanguage | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用设置的语言。<br/> |
| appName | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用名称。<br/> |
| appVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用版本名称。<br/> |
| appVersionCode | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用版本号。<br/> |
| appWgtVersion | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用资源（wgt）的版本名称。<br/> |
| browserName | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 浏览器名称。`App` 端是系统 webview 的名字，比如 wkwebview、chrome。小程序端为空<br/> |
| browserVersion | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 浏览器版本、webview 版本。<br/> |
| deviceId | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备 ID<br/> |
| deviceBrand | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备品牌。如：`apple`、`huawei`。<br/> |
| deviceModel | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备型号<br/> |
| deviceType | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备类型。<br/> |
| devicePixelRatio | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备像素比<br/> |
| deviceOrientation | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备方向。<br/> |
| osName | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 系统名称<br/> |
| osVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统版本。如 ios 版本，andriod 版本<br/> |
| osLanguage | string | 是 | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统语言<br/> |
| osTheme | string | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统主题<br/> |
| screenWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕宽度，单位为px<br/> |
| screenHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕高度，单位为px<br/> |
| statusBarHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 状态栏的高度，单位为px<br/> |
| safeArea | **SafeArea** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在竖屏正方向下的安全区域<br/> |
| safeAreaInsets | **SafeAreaInsets** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在竖屏正方向下的安全区域插入位置<br/> |
| ua | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 用户标识。小程序端为空<br/> |
| uniCompilerVersion | string | 是 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本。<br/> |
| uniPlatform | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni-app 运行平台，与条件编译平台相同。<br/> |
| uniRuntimeVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 运行时版本。<br/> |
| uniCompilerVersionCode | number | 是 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本号。<br/> |
| uniRuntimeVersionCode | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 运行时版本号。<br/> |
| romName | string | 是 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 名称。Android 部分机型获取不到值。iOS 恒为 `ios`<br/> |
| romVersion | string | 是 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 版本号。Android 部分机型获取不到值。iOS 为操作系统版本号（同 `osVersion`）。<br/> |
| windowWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口宽度，单位为px<br/> |
| windowHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口高度，单位为px<br/> |
| windowTop | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离顶部的距离（同CSS变量 `--window-top`），单位为px<br/> |
| windowBottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离底部的距离（同CSS变量 `--window-bottom`），单位为px<br/> |
| osAndroidAPILevel | number | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: x | Android 系统API库的版本。<br/> |
| osHarmonySDKAPIVersion | number | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 鸿蒙系统软件API版本<br/> |
| osHarmonyDisplayVersion | string | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 产品版本，关于本机信息内的软件版本<br/> |
| appTheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前App的主题<br/> |
| hostTheme | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主主题（仅 web、微信小程序支持）<br/> |
| hostVersion | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主版本（仅 web、微信小程序支持）<br/> |
| hostLanguage | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主语言（仅 web、微信小程序支持）<br/> |
| hostName | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主名称（仅 web、微信小程序支持）<br/> |
| hostSDKVersion | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主 SDKVersion（仅 web、微信小程序支持）<br/> |
| hostFontSizeSetting | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主字体大小设置（仅 web、微信小程序支持）<br/> |
| albumAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用相册的开关（仅 iOS 有效）<br/> |
| benchmarkLevel | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `1.8.0`<br/><br/>设备性能等级（仅 Android）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好）<br> 注意：性能等级当前仅反馈真机机型，暂不支持 IDE 模拟器机型<br/> |
| bluetoothEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>蓝牙的系统开关<br/> |
| cameraAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用摄像头的开关<br/> |
| enableDebug | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.15.0`<br/><br/>是否已打开调试。可通过右上角菜单或 [uni.setEnableDebug](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.setEnableDebug.html) 打开调试。<br/> |
| fontSizeSetting | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `1.5.0`<br/><br/>用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准<br/> |
| host | **GetSystemInfoResultHost** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.12.3`<br/><br/>当前小程序运行的宿主环境<br/> |
| locationAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用定位的开关<br/> |
| locationEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>地理位置的系统开关<br/> |
| locationReducedAccuracy | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | `true` 表示模糊定位，`false` 表示精确定位，仅 iOS 支持<br/> |
| microphoneAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用麦克风的开关<br/> |
| notificationAlertAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有提醒的开关（仅 iOS 有效）<br/> |
| notificationAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知的开关<br/> |
| notificationBadgeAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有标记的开关（仅 iOS 有效）<br/> |
| notificationSoundAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有声音的开关（仅 iOS 有效）<br/> |
| phoneCalendarAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.19.3`<br/><br/>允许微信使用日历的开关<br/> |
| wifiEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>Wi-Fi 的系统开关<br/> |
| theme | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.11.0`<br/><br/>系统当前主题，取值为`light`或`dark`，全局配置`"darkmode":true`时才能获取，否则为 undefined （不支持小游戏）<br/><br/>可选值：<br/>- 'dark': 深色主题;<br/>- 'light': 浅色主题;<br/> |
| ~~brand~~ | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 手机品牌。  **已废弃，仅为了向下兼容保留** |
| ~~language~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 程序设置的语言  **已废弃，仅为了向下兼容保留** |
| ~~model~~ | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 手机型号  **已废弃，仅为了向下兼容保留** |
| ~~pixelRatio~~ | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 设备像素比  **已废弃，仅为了向下兼容保留** |
| ~~platform~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 客户端平台  **已废弃，仅为了向下兼容保留** |
| ~~system~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统版本  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersion~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | uni 编译器版本。  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersionCode~~ | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | uni 编译器版本号。  **已废弃，仅为了向下兼容保留** |
| ~~version~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 引擎版本号。  **已废弃，仅为了向下兼容保留** |

#### deviceType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| phone | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pad | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| tv | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| watch | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pc | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| undefined | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| car | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| vr | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| appliance | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### deviceOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| portrait | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 纵向 |
| landscape | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横向 |

#### osName 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| macos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### osTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### safeArea 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角横坐标，单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角横坐标，单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角纵坐标，单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角纵坐标，单位为px<br/> |
| width | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的宽度，单位为px<br/> |
| height | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的高度，单位为px<br/> |

#### safeAreaInsets 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左侧插入位置（距离左边边界距离），单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右侧插入位置（距离右边边界距离），单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区顶部插入位置（距离顶部边界距离），单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域底部插入位置（距离底部边界距离），单位为px<br/> |

#### uniPlatform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| app | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| web | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-weixin | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-alipay | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-baidu | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-toutiao | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-lark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-qq | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-kuaishou | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-jd | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-360 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-union | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-huawei | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### appTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| auto | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### hostTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### host 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 宿主 app 对应的 appId<br/> |

#### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

#### platform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mac | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| ohos | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | - |
| devtools | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | - |

#### GetSystemInfoFail 的属性值 @getsysteminfofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误码 |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误描述信息 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| name | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| message | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




::: warning 注意事项
- appTheme如取值为`auto`，代表跟随系统。此时需查询osTheme获取当前到底是light还是dark。
- 获取OAID、AndroidID等其他设备信息，[见插件市场](https://ext.dcloud.net.cn/search?q=oaid&orderBy=Relevance&uni-appx=1)
- Android端的`windowHeight`属性是有时机的考量的，如果在全局作用域获取`windowHeight`，有可能当前Activity还未加载，所以导航栏和Tabbar的高度是不会计算进去的，稳妥起见，建议在`onReady`或者`onPageShow`内获取`windowheight`。
- `windowHeight`属性是依赖于调用Api时栈顶Page的，比如延迟获取`windowHeight`，很可能页面已经切换了，这时候获取的高度是新的页面的。
- 4.25开始，Android端安全区域top调整为手机状态栏高度
:::

#### romName 返回值说明 @romname

|值|解释|
|:-|:-|
|MIUI|小米|
|EMUI|华为|
|HarmonyOS|华为鸿蒙|
|Magic OS|荣耀|
|ColorOS|oppo|
|Funtouch OS|vivo|
|FLymeOS|魅族|
|SmartisanOS|锤子|

注意：不同rom的版本号规则不同，比如`MIUI`版本号是`V130`，而`HarmonyOS`的版本号是`2.0.0`

#### hostName 返回值说明 @hostname

|值|解释|
|:-|:-|
|WeChat|微信|
|wxwork|微信企业版|
|[百度宿主平台枚举值列表](https://smartprogram.baidu.com/docs/develop/api/device_sys/hostlist/)|百度|
|alipay|支付宝|
|amap|高德|
|DINGTALK|钉钉|
|UC|UC浏览器|
|QUARK|夸克浏览器|
|AK|阿里健康|
|YK|优酷|
|[抖音宿主平台枚举值列表](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/device/system-information/tt-get-system-info/#appname-%E8%AF%B4%E6%98%8E)|抖音系列|
|qq|QQ|
|KUAISHOU|快手|

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-system-info/get-system-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-system-info/get-system-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-system-info/get-system-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-system-info/get-system-info

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <page-head :title="data.title"></page-head>
      <view class="uni-common-mt">
        <view class="uni-list">
          <view class="uni-list-cell" v-for="(item, _) in data.items" style="align-items: center">
            <view class="uni-pd">
              <view class="uni-label" style="width: 180px">{{
                item.label
              }}</view>
            </view>
            <view class="uni-list-cell-db">
              <text class="uni-list-cell-db-text">{{ item.value == '' ? '未获取' : item.value }}</text>
            </view>
          </view>
        </view>
        <view class="uni-padding-wrap">
          <view class="uni-btn-v">
            <button type="primary" @tap="getSystemInfoSync">
              同步获取设备系统信息
            </button>
            <button type="primary" @tap="getSystemInfo" style="margin-top: 20px;">
              异步获取设备系统信息
            </button>
          </view>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  type Item = {
    label : string,
    value : string,
  }

  type DataType = {
    title: string;
    items: Item[];
    screenHeightAtReady: number;
    jest_result: boolean;
  }

  let globalScreenHeight = 0
  try {
    globalScreenHeight = uni.getWindowInfo().screenHeight
  } catch (e) {
    // 兼容本地测试
    console.error(e)
  }

  const data = reactive({
    title: 'getSystemInfo',
    items: [] as Item[],
    screenHeightAtReady: 0,
    jest_result: false,
  } as DataType)

  onReady(() => {
    data.screenHeightAtReady = uni.getSystemInfoSync().screenHeight
    console.log(`全局获取屏幕高度: ${globalScreenHeight}  onReady内获取屏幕高度: ${data.screenHeightAtReady}`);
  })

  const getSystemInfo = () => {
    uni.getSystemInfo({
      success: (res) => {
        data.items = [] as Item[];
        const res_str = JSON.stringify(res);
        const res_obj = JSON.parseObject(res_str);
        const res_map = res_obj!.toMap();
        let keys = [] as string[]
        res_map.forEach((_, key) => {
          keys.push(key);
        });
        keys.sort().forEach(key => {
          const value = res[key];
          if (value != null) {
            const item = {
              label: key,
              value: "" + ((typeof value == "object") ? JSON.stringify(value) : value)
            } as Item;
            data.items.push(item);
          }
        });
      },
    })
  }

  const getSystemInfoSync = () => {
    data.items = [] as Item[];
    const res = uni.getSystemInfoSync()
    const res_str = JSON.stringify(res);
    const res_obj = JSON.parseObject(res_str);
    const res_map = res_obj!.toMap();
    let keys = [] as string[]
    res_map.forEach((_, key) => {
      keys.push(key);
    });
    keys.sort().forEach(key => {
      const value = res[key];
      if (value != null) {
        const item = {
          label: key,
          value: "" + ((typeof value == "object") ? JSON.stringify(value) : value)
        } as Item;
        data.items.push(item);
      }
    });
  }

  //自动化测试例专用
  const jest_getSystemInfo = () : GetSystemInfoResult => {
    return uni.getSystemInfoSync();
  }

  const jest_getScreenHeight_at_different_stages = () => {
    data.jest_result = (globalScreenHeight == data.screenHeightAtReady)
  }

  defineExpose({
    data,
    jest_getSystemInfo,
    jest_getScreenHeight_at_different_stages
  })
</script>

<style>
  .uni-pd {
    padding-left: 15px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getSystemInfo.getSystemInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/info.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getSystemInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getSystemInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getSystemInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getSystemInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getSystemInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getSystemInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.getSystemInfoSync() @getsysteminfosync -->

::: sourceCode
## uni.getSystemInfoSync() @getsysteminfosync

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getSystemInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getSystemInfo

:::

同步获取系统信息

本API是同步API，仅为上面异步API的同步形式，返回值内容没有区别。但由于本API涉及的查询内容较多，耗时长，一般情况下不推荐同步获取。\
如果希望使用同步方式，推荐使用分拆后的API：[uni.getDeviceInfo](./get-device-info.md)、[uni.getWindowInfo](./get-window-info.md)、[uni.getAppBaseInfo](./get-app-base-info.md)。

### getSystemInfoSync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |




### 返回值 

| 类型 |
| :- |
| **GetSystemInfoResult** |

#### GetSystemInfoResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SDKVersion | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 客户端基础库版本<br/> |
| appId | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用appid。<br/> |
| appLanguage | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用设置的语言。<br/> |
| appName | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用名称。<br/> |
| appVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用版本名称。<br/> |
| appVersionCode | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | `manifest.json` 中应用版本号。<br/> |
| appWgtVersion | string | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 应用资源（wgt）的版本名称。<br/> |
| browserName | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 浏览器名称。`App` 端是系统 webview 的名字，比如 wkwebview、chrome。小程序端为空<br/> |
| browserVersion | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 浏览器版本、webview 版本。<br/> |
| deviceId | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备 ID<br/> |
| deviceBrand | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备品牌。如：`apple`、`huawei`。<br/> |
| deviceModel | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备型号<br/> |
| deviceType | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备类型。<br/> |
| devicePixelRatio | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备像素比<br/> |
| deviceOrientation | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 设备方向。<br/> |
| osName | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 系统名称<br/> |
| osVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统版本。如 ios 版本，andriod 版本<br/> |
| osLanguage | string | 是 | - | Web: 4.0; 微信小程序: -; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统语言<br/> |
| osTheme | string | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统主题<br/> |
| screenWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕宽度，单位为px<br/> |
| screenHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 屏幕高度，单位为px<br/> |
| statusBarHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 状态栏的高度，单位为px<br/> |
| safeArea | **SafeArea** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在竖屏正方向下的安全区域<br/> |
| safeAreaInsets | **SafeAreaInsets** | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 在竖屏正方向下的安全区域插入位置<br/> |
| ua | string | 是 | - | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: x | 用户标识。小程序端为空<br/> |
| uniCompilerVersion | string | 是 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本。<br/> |
| uniPlatform | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni-app 运行平台，与条件编译平台相同。<br/> |
| uniRuntimeVersion | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 运行时版本。<br/> |
| uniCompilerVersionCode | number | 是 | - | Web: 4.18; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 编译器版本号。<br/> |
| uniRuntimeVersionCode | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | uni 运行时版本号。<br/> |
| romName | string | 是 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 名称。Android 部分机型获取不到值。iOS 恒为 `ios`<br/> |
| romVersion | string | 是 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | rom 版本号。Android 部分机型获取不到值。iOS 为操作系统版本号（同 `osVersion`）。<br/> |
| windowWidth | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口宽度，单位为px<br/> |
| windowHeight | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 可使用窗口高度，单位为px<br/> |
| windowTop | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离顶部的距离（同CSS变量 `--window-top`），单位为px<br/> |
| windowBottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 内容区域距离底部的距离（同CSS变量 `--window-bottom`），单位为px<br/> |
| osAndroidAPILevel | number | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: x | Android 系统API库的版本。<br/> |
| osHarmonySDKAPIVersion | number | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 鸿蒙系统软件API版本<br/> |
| osHarmonyDisplayVersion | string | 否 | - | Web: x; 微信小程序: x; Android: √; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 产品版本，关于本机信息内的软件版本<br/> |
| appTheme | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.18; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前App的主题<br/> |
| hostTheme | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主主题（仅 web、微信小程序支持）<br/> |
| hostVersion | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主版本（仅 web、微信小程序支持）<br/> |
| hostLanguage | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主语言（仅 web、微信小程序支持）<br/> |
| hostName | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主名称（仅 web、微信小程序支持）<br/> |
| hostSDKVersion | string | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主 SDKVersion（仅 web、微信小程序支持）<br/> |
| hostFontSizeSetting | number | 否 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 宿主字体大小设置（仅 web、微信小程序支持）<br/> |
| albumAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用相册的开关（仅 iOS 有效）<br/> |
| benchmarkLevel | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `1.8.0`<br/><br/>设备性能等级（仅 Android）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好）<br> 注意：性能等级当前仅反馈真机机型，暂不支持 IDE 模拟器机型<br/> |
| bluetoothEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>蓝牙的系统开关<br/> |
| cameraAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用摄像头的开关<br/> |
| enableDebug | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.15.0`<br/><br/>是否已打开调试。可通过右上角菜单或 [uni.setEnableDebug](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.setEnableDebug.html) 打开调试。<br/> |
| fontSizeSetting | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `1.5.0`<br/><br/>用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准<br/> |
| host | **GetSystemInfoResultHost** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.12.3`<br/><br/>当前小程序运行的宿主环境<br/> |
| locationAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用定位的开关<br/> |
| locationEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>地理位置的系统开关<br/> |
| locationReducedAccuracy | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | `true` 表示模糊定位，`false` 表示精确定位，仅 iOS 支持<br/> |
| microphoneAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信使用麦克风的开关<br/> |
| notificationAlertAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有提醒的开关（仅 iOS 有效）<br/> |
| notificationAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知的开关<br/> |
| notificationBadgeAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有标记的开关（仅 iOS 有效）<br/> |
| notificationSoundAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>允许微信通知带有声音的开关（仅 iOS 有效）<br/> |
| phoneCalendarAuthorized | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.19.3`<br/><br/>允许微信使用日历的开关<br/> |
| wifiEnabled | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.6.0`<br/><br/>Wi-Fi 的系统开关<br/> |
| theme | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.11.0`<br/><br/>系统当前主题，取值为`light`或`dark`，全局配置`"darkmode":true`时才能获取，否则为 undefined （不支持小游戏）<br/><br/>可选值：<br/>- 'dark': 深色主题;<br/>- 'light': 浅色主题;<br/> |
| ~~brand~~ | string | 是 | - | Web: x; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 手机品牌。  **已废弃，仅为了向下兼容保留** |
| ~~language~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 程序设置的语言  **已废弃，仅为了向下兼容保留** |
| ~~model~~ | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 手机型号  **已废弃，仅为了向下兼容保留** |
| ~~pixelRatio~~ | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 设备像素比  **已废弃，仅为了向下兼容保留** |
| ~~platform~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 客户端平台  **已废弃，仅为了向下兼容保留** |
| ~~system~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 操作系统版本  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersion~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | uni 编译器版本。  **已废弃，仅为了向下兼容保留** |
| ~~uniCompileVersionCode~~ | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | uni 编译器版本号。  **已废弃，仅为了向下兼容保留** |
| ~~version~~ | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: x | 引擎版本号。  **已废弃，仅为了向下兼容保留** | 

##### deviceType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| phone | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pad | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| tv | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| watch | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| pc | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| car | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| vr | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| appliance | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### deviceOrientation 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| portrait | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 纵向 |
| landscape | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 横向 |

##### osName 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| macos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### osTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### safeArea 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角横坐标，单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角横坐标，单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左上角纵坐标，单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右下角纵坐标，单位为px<br/> |
| width | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的宽度，单位为px<br/> |
| height | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域的高度，单位为px<br/> |

##### safeAreaInsets 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域左侧插入位置（距离左边边界距离），单位为px<br/> |
| right | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域右侧插入位置（距离右边边界距离），单位为px<br/> |
| top | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区顶部插入位置（距离顶部边界距离），单位为px<br/> |
| bottom | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 安全区域底部插入位置（距离底部边界距离），单位为px<br/> |

##### uniPlatform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| app | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| web | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-weixin | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-alipay | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-baidu | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-toutiao | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-lark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-qq | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-kuaishou | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-jd | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mp-360 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-union | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| quickapp-webview-huawei | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### appTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| auto | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### hostTheme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### host 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| appId | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 宿主 app 对应的 appId<br/> |

##### theme 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| dark | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| light | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

##### platform 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| ios | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| android | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| harmonyos | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| mac | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| windows | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| linux | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| ohos | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | - |
| devtools | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | - |


<!-- UTSAPIJSON.getSystemInfoSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getSystemInfo.getSystemInfoSync)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/info.html#getsysteminfosync)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfoSync.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getSystemInfoSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getSystemInfoSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getSystemInfoSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getSystemInfoSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getSystemInfoSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getSystemInfoSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

