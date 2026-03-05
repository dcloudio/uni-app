<!-- ## uni.getLocation(options) @getlocation -->

::: sourceCode
## uni.getLocation(options) @getlocation

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-location


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-location

:::

获取当前的地理位置、速度

### getLocation 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetLocationOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | system | Web: x; 微信小程序: x; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 定位服务提供商，通过 [uni.getProvider](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) 获取,目前支持系统定位(system)、腾讯定位(tencent)<br/>腾讯定位是4.25版本后支持的；<br/>web端暂不支持provider机制； |
| type | string | 否 | wgs84 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于uni.openLocation的坐标，web端需配置定位 SDK 信息才可支持 gcj02； |
| altitude | boolean | 否 | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度 |
| geocode | boolean | 否 | false | Web: x; 微信小程序: x; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 传入 true 会解析地址；<br/>使用系统定位时平台差异：iOS支持逆地理编码，Android、HarmonyOS 不支持； |
| highAccuracyExpireTime | number | 否 | 3000 | Web: x; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果 |
| isHighAccuracy | boolean | 否 | false | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 开启高精度定位 |
| success | (result: [GetLocationSuccess](#getlocationsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [GetLocationFail](#getlocationfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| wgs84 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: - | wgs84坐标系，系统定位默认取值wgs84，系统定位仅支持wgs84坐标系 |
| gcj02 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: - | gcj02坐标系，腾讯定位默认取值gcj02，腾讯定位仅支持gcj02坐标系 |

#### GetLocationSuccess 的属性值 @getlocationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，范围为-180~180，负数表示西经 |
| speed | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 速度，浮点数，单位m/s |
| accuracy | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 位置的精确度 |
| altitude | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 高度，单位 m |
| verticalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 垂直精度，单位 m（Android 无法获取，返回 0） |
| horizontalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 水平精度，单位 m（Android、HarmonyOS 无法获取，返回 0） |
| address | string | 否 | null | Web: x; 微信小程序: x; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 地址信息 |

#### GetLocationFail 的属性值 @getlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |




### 注意

### 坐标系、系统定位、三方定位等概念

wgs84坐标是国际GPS坐标系，gcj02是中国国内坐标系。同一个位置，2种坐标系数值不同。

中国的地图厂商（如高德、腾讯、百度），仅能使用gcj02坐标。如果将wgs84坐标显示在中国地图上，就会发现偏移。

同理，将gcj02坐标显示在google地图上，也会偏移。

|						|Web					|Android			|iOS					|harmonyOS|微信小程序		|支付宝小程序	|抖音小程序						|
|--					|--						|--						|--						|--				|--						|--						|--										|
|wgs84			|系统定位			|系统定位			|系统定位			|系统定位	|内置定位			|内置定位			|内置定位							|
|gcj02			|需三方SDK定位	|需三方SDK定位	|需三方SDK定位	|系统定位	|内置定位			|内置定位			|内置定位							|
|逆地址解析	|需三方SDK定位	|需三方SDK定位	|系统定位			|系统定位	|需三方SDK定位	|内置定位			|内置定位iOS上有限支持	|

逆地址解析：指传入坐标、返回地址信息（城市、街道等）。

三方SDK定位是需要商业授权的，需要在地图厂商注册开发者账户、创建应用、申请key或secret信息，并且在发行时要把三方SDK打包进去。

地图厂商的商业授权较贵，如需购买，请点击[获取优惠](https://ask.dcloud.net.cn/explore/map/)。

如果运行在微信浏览器中的Web应用，可以使用微信的jssdk的定位能力。此时开发者无需配置自己的key，不涉及商业授权。

Android/iOS手机厂商默认都是wgs84坐标，也即入参type设为system或不填时，只能返回wgs84坐标。

iOS设备的系统定位会返回逆地址解析，即geocode，将坐标转换为城市街道信息。Android设备的系统定位不支持逆地址解析。

某些老型号国产Android Rom（常见于Android6以下）因gms阉割问题不支持系统定位，另部分国产Rom可能不支持高度信息。

纯血鸿蒙手机的系统定位功能较全面，wgs84、gcj02坐标、逆地址解析都支持。

在Android/iOS上，如不使用系统定位，而使用专业地图厂商provider，则可以使用gcj02坐标、逆地址解析geocode功能、以及稳定的所有设备均支持的定位服务。

获取gcj02坐标，有2种方式：
1. 使用国内地图厂商的SDK，也即使用provider，打包时需包含相应模块，并配置向地图厂商申请的key信息。
2. 手机端获取系统定位，拿到wgs84坐标后，使用国内地图厂商的web接口，将wgs84坐标转换为gcj02坐标，web接口也有逆地址解析功能。

不管通过哪种方式获取gcj02坐标，都需要向地图厂商缴纳商业授权费用。DCloud提供了优惠获取地图商业授权的方案，[详见](https://uniapp.dcloud.net.cn/tutorial/app-geolocation.html#lic)

使用三方定位，需要在地图厂商注册账户、创建应用、获取key。然后将key填写到manifest.json中。

Android/iOS平台目前还没有可视化界面，需要在manifest的源码视图中配置。

- app需要在manifest.json文件中配置`uni-location`节点, `HXBuilderX 4.61-`之前为`uni-getLocation`节点，[详见](../collocation/manifest-modules.md#uni-location)
- iOS平台：如果应用需要后台定位能力，需要在 info.plist 中配置 UIBackgroundModes 的 location，注意需Xcode工程中添加相对应 Capabilities 中的 Background Modes，并且勾选 Location updates。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  	<key>UIBackgroundModes</key>
		<array>
			<string>location</string>
		</array>

	</dict>
</plist>
```
- iOS平台：使用内置腾讯定位和iOS14以上高精度定位时，需配置对应的Key，参考[iOS平台配置腾讯定位](../collocation/manifest-ios.md#locationtencent)
- Android平台：使用内置腾讯定位时，需配置对应的Key，参考[Andoird平台配置腾讯定位](../collocation/manifest-android.md#locationTencent)

地图厂商在App端大多会校验包名和证书，请务必保证在地图厂商后台创建的应用，填写的包名、证书摘要，和实际运行的应用匹配，否则无法使用三方定位。

web平台也分系统定位的SDK定位。系统定位只有wgs84坐标。三方SDK定位，在manifest的Web配置中寻找定位和地图。填入key后需注意校验，如果在地图厂商后台开启了域名、ip校验，那么如果Web运行或发行后的域名与地图厂商后台配置的不符，就无法获取定位。

小程序平台的定位，是小程序引擎自身集成的定位SDK。比如微信小程序使用的是腾讯定位、支付宝小程序使用的是高德定位。由小程序平台免费给开发者提供。

### 权限@permission

定位属于隐私权限，不管在浏览器、App还是小程序，都需要用户同意授权才可以获取。

并且普通精度定位和高精度定位的权限也不同。

获取手机端app是否拥有定位权限，请使用API [uni.getAppAuthorizeSetting](get-app-authorize-setting.md)

除了用户未给app赋予定位权限，有的设备可能直接关闭了定位功能。此时可通过 [uni.getSystemSetting](get-system-setting.md) 来获取系统定位开关。

HarmonyOS平台调用此 API 需要申请定位权限`ohos.permission.APPROXIMATELY_LOCATION`、`ohos.permission.LOCATION`，需自行在项目中配置权限。

### 定位的原理和精度

定位包括gps等卫星定位和基站wifi等网络定位。

卫星定位的精度较高，但卫星定位要求手机设备与高空卫星之间没有阻挡，在阴天、室内，卫星定位会受影响。

有时设备可连接的高空卫星数量较少，定位精度就会较差。如果连接不到任何卫星，定位会失败。

而基于基站和wifi路由的网络定位，精度要被卫星定位差很多。网络定位的核心是手机要有网，无需顾忌和高空卫星之间的阻挡。网络定位一般只能知道设备在某个基站周围，但没有很精细的位置。

- 当设备无法获取定位坐标时，需检查：
	* 手机定位开关是否关闭
	* web站或App是否被拒绝了定位权限
	* 设备是否即没有卫星信号又没有网络
	* 使用三方定位时，地图厂商的校验是否通过，web的域名、ip、签名；app的包名、证书摘要，这些信息在地图厂商配置的和实际运行的，是否一致
	* 地图厂商后台的配额是否足够、权限是否开通

- 当设备可以获取坐标，但在地图上有偏差时，需检查：
	* 是否没有卫星信号，只有网络定位的话精度确实有误差
	* 是否没有高精度定位权限
	* 坐标系是否匹配，把wgs84坐标显示在只支持gcj02的中国地图上肯定是会偏差的


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.getLocation)
- [参见uni-app相关文档](http://uniapp.dcloud.io/api/location/location?id=getlocation)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getLocation&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getLocation&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getLocation&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getLocation&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getLocation)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getLocation&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-location/get-location.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-location/get-location.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-location/get-location

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-location/get-location

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <page-head :title="title"></page-head>
    <view style="padding: 4px">
      <text class="hello-text">
        定位功能默认调用操作系统定位API实现。也支持三方SDK定位\n
        部分老款Android手机因gms问题可能导致无法使用系统定位。\n
        Web、Android、iOS平台，gcj国标、逆地理信息等功能需调用腾讯定位。</text>
    </view>

    <view class="uni-padding-wrap uni-common-mt">
      <!-- #ifdef APP-ANDROID || APP-IOS -->
      <view class="uni-list-cell-db">定位服务商provider(如系统定位，腾讯定位等)</view>
      <view class="uni-list" style="margin-bottom: 20px">
        <radio-group @change="radioChangePV">
          <radio class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in providerList" :key="item.id"
            :class="index < providerList.length - 1 ? 'uni-list-cell-line' : ''" :value="item.id"
            :checked="index === currentProvider">
            {{ item.name }}
          </radio>
        </radio-group>
      </view>
      <!-- #endif -->
      <view class="uni-list-cell-db">定位类型</view>
      <view class="uni-list">
        <radio-group @change="radioChange">
          <radio class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value"
            :class="index < items.length - 1 ? 'uni-list-cell-line' : ''" :value="item.value"
            :checked="index === current">
            {{ item.name }}
          </radio>
        </radio-group>
      </view>
      <view class="uni-list-cell uni-list-cell-pd" style="margin-top: 20px">
        <view class="uni-list-cell-db">高度信息</view>
        <switch :checked="altitudeSelect" @change="altitudeChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">开启高精度定位</view>
        <switch :checked="isHighAccuracySelect" @change="highAccuracySelectChange" />
      </view>
      <view class="uni-list-cell uni-list-cell-pd">
        <view class="uni-list-cell-db">是否解析地址信息</view>
        <switch :checked="geocodeSelect" @change="geocodeChange" />
      </view>
      <view class="get-location-result">{{ exeRet }}</view>
      <view class="uni-btn-v">
        <button class="uni-btn" type="default" @tap="getLocationTap">
          获取定位
        </button>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">
  type GetLocationType = 'wgs84' | 'gcj02'
  export type LocationItem = { id : string, name : string, provider ?: UniProvider }
  export type ItemType = { value : GetLocationType, name : GetLocationType }
  export type JestData = {
    jest_provider: string
    jest_type: GetLocationType
    jest_isAltitude: boolean
    jest_isGeocode: boolean
    jest_isHighAccuracy: boolean
    jest_altitude: number
    jest_longitude: number
    jest_latitude: number
    jest_address: string
    jest_errCode: number
    jest_complete: boolean
  }

  const title = ref<string>('get-location')
  const altitudeSelect = ref<boolean>(false)
  const isHighAccuracySelect = ref<boolean>(false)
  const geocodeSelect = ref<boolean>(false)
  const exeRet = ref<string>('')
  const items = ref<ItemType[]>([
    {
      value: 'wgs84',
      name: 'wgs84'
    },
    {
      value: 'gcj02',
      name: 'gcj02'
    }
  ])
  const providerList = ref<LocationItem[]>([])
  const current = ref<number>(0)
  const currentProvider = ref<number>(0)
  const jestData = reactive<JestData>({
    jest_provider: '',
    jest_type: 'wgs84' as GetLocationType,
    jest_isAltitude: false,
    jest_isGeocode: false,
    jest_isHighAccuracy: false,
    jest_altitude: -1000,
    jest_longitude: 200,
    jest_latitude: 100,
    jest_address: '',
    jest_errCode: 0,
    jest_complete: false
  })

  const getProvider = () => {
    // #ifdef APP

    let provider = uni.getProviderSync({
      service: "location",
    } as GetProviderSyncOptions)
    console.log(provider)
    provider.providerObjects.forEach((value : UniProvider) => {
      var currentProvider = value
      // if (value.id == 'system') {
      //   currentProvider = value as UniLocationSystemProvider
      // } else if (value.id == 'tencent') {
      //   currentProvider = value as UniLocationTencentProvider
      // }
      providerList.value.push({
        name: currentProvider.description,
        id: currentProvider.id,
        provider: currentProvider
      } as LocationItem);
    })

    providerList.value.forEach((value, index) => {
      if (value.id == "system") {
        currentProvider.value = index
      }
    })
    // #endif
  }

  const altitudeChange = (e : UniSwitchChangeEvent) => {
    altitudeSelect.value = e.detail.value
  }

  const geocodeChange = (e : UniSwitchChangeEvent) => {
    geocodeSelect.value = e.detail.value
  }

  const highAccuracySelectChange = (e : UniSwitchChangeEvent) => {
    isHighAccuracySelect.value = e.detail.value
  }

  const radioChange = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].value === e.detail.value) {
        current.value = i;
        break;
      }
    }
  }

  const radioChangePV = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < providerList.value.length; i++) {
      if (providerList.value[i].id === e.detail.value) {
        currentProvider.value = i;
        break;
      }
    }
    if (e.detail.value == "system") {
      current.value = 0
    } else if (e.detail.value == "tencent") {
      current.value = 1
    }
  }

  const getLocationTap = () => {
    // #ifdef APP
    if (providerList.value.length == 0) {
      uni.showToast({
        title: '未获取到provider，请确定基座中包含location功能',
        icon: "error"
      })
      console.log("未获取到provider，请确定基座中包含location功能")
      return
    }
    // #endif
    uni.showLoading({
      title: '定位中'
    })
    uni.getLocation(({
      // #ifdef APP
      provider: providerList.value[currentProvider.value].id,
      // #endif
      type: items.value[current.value].value,
      altitude: altitudeSelect.value,
      isHighAccuracy: isHighAccuracySelect.value,
      geocode: geocodeSelect.value,
      success: (res : any) => {
        uni.hideLoading()
        exeRet.value = JSON.stringify(res)
      },
      fail: (res : any) => {
        uni.hideLoading()
        exeRet.value = JSON.stringify(res)
      },
      complete: (res : any) => {
        uni.hideLoading()
        exeRet.value = JSON.stringify(res)
      }
    }));
  }

  // 仅用于自动化测试
  const jestGetLocation = () => {
    jestData.jest_complete = false
    jestData.jest_errCode = 0
    uni.getLocation(({
      // #ifdef APP
      provider: jestData.jest_provider,
      // #endif
      type: jestData.jest_type,
      altitude: jestData.jest_isAltitude,
      isHighAccuracy: jestData.jest_isHighAccuracy,
      geocode: jestData.jest_isGeocode,
      success: (res) => {
        if (res.address != null) {
          jestData.jest_address = res.address!
        }
        jestData.jest_longitude = res.longitude
        jestData.jest_latitude = res.latitude
        jestData.jest_altitude = res.altitude
        jestData.jest_complete = true
      },
      fail: (err) => {
        jestData.jest_errCode = err.errCode
        jestData.jest_complete = true
      }
    }));
  }

  onLoad(() => {
    // #ifdef APP
    getProvider()
    // #endif
  })

  defineExpose({
    jestData,
    jestGetLocation
  })
</script>

<style>
  .get-location-result {
    /* #ifdef WEB || MP */
    word-break: break-all;
    /* #endif */
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



## 定位provider对象描述 @providerdes

UniLocationSystemProvider(系统定位)继承自[UniProvider](./provider.md#uniprovider)

UniLocationTencentProvider(腾讯定位)继承自[UniProvider](./provider.md#uniprovider)

## 自定义定位provider接入到uni API @customprovider

背景：目前uni-app x引擎已经内置了系统定位、腾讯定位。但还有高德定位等其他定位SDK。

以往这些SDK可以通过独立插件的方式集成到uni-app x中，但需要提供单独的API给开发者使用，无法使用uni.getLocation。

uni-app x从4.25起，开放了App平台的provider自接入机制，让三方SDK可以以[provider](./provider.md)方式被开发者集成。

开发一个UTS插件，对接uni规范化的API、错误信息描述等实现自己的定位插件，这样插件使用者就可以通过uni的标准API使用三方SDK。

举个例子，用户想使用uni.getLocation()的方式调用高德定位，但是内置定位api不支持，

那只需要按照下面四个步骤实现即可:

第一步，新建一个UTS插件，在interface.uts 中定义接口，继承 UniLocationProvider，代码如下

```ts
export interface UniLocationAMapProvider extends UniLocationProvider{}
```

第二步，在app-android或者app-ios的index.uts中实现接口，代码如下

```ts
import { UniLocationAMapProvider } from '../interface';

export class UniLocationAMapProviderImpl implements UniLocationAMapProvider{

	override id : String = 'amap' //id必须有插件作者前缀，避免冲突，避免不同插件作者的插件id重名

	override description : String = "高德地图"

	override isAppExist : boolean | null = null

	override getLocation(options : GetLocationOptions) {
		//todo 具体逻辑，接收uni规范的入参，进行业务处理，返回uni规范的返回值。如遇到错误，按uni的规范返回错误码
	}

	constructor() {
	}

}
```

第三步，在manifest.json中配置

```ts
  "app": {
    "distribute": {
      /* android打包配置 */
      "modules": {
        "uni-location":{
          "amap":{}
        }
      }
    }
  }
```

第四步，打包自定义基座然后运行

通过以上步骤就可以实现自定义定位provider接入到uni API。

由于uni-app x自带的腾讯定位，也是基于provider注册机制开发的，可参考[腾讯定位插件的实现源码](https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-location-tencent)

App平台，腾讯定位SDK，除了本API封装的功能，还有一些其他功能。如开发者需要调用这些SDK的其他API，可以使用uts直接调用，同样参考上述源码。

## 历史变更
- Web平台本API调用了腾讯地图的免费gcj02坐标转换接口，该接口从2024年7月18日起被腾讯下线，导致老版本中本API无法使用。请立即升级到 `uni-app 4.24版`。

升级后注意：
1. manifest中配置好自己的地图厂商key
2. 确保在地图厂商那里配额足够
3. 确保在地图厂商那里有周边服务的权限。否则无法获取周围地址
4. 确保自己的域名在地图厂商那里正确配置了域名白名单
