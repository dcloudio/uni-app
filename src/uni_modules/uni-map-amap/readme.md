# uni-map-amap

当前版本：`1.3.0`

`uni-map-amap` 是基于高德地图原生 SDK 实现的 uni-app x 地图组件。
 自 `1.1.0` 起支持iOS，iOS 功能与 Android之前保持一致。
 自 `1.2.0` 起Android支持Vapor模式。
 自 `1.3.0` 起iOS全面拉齐与内置map组件的功能差异，兼容VDOM、Vapor模式
 自 `1.4.0` 起Android全面拉齐与内置map组件的功能差异。
 

## 平台支持

| 平台 | 支持版本 |
| --- | --- |
| Android | Android 5.0（API 21）及以上 |
| iOS | iOS 13.0 及以上 |

## 高德地图 API Key 配置

Android 和 iOS 使用不同类型的 Key，需要分别在高德开放平台创建并配置。

### 1. 申请 API Key

1. 访问[高德开放平台](https://lbs.amap.com/)并登录开发者账号。
2. 进入控制台，创建新应用或选择已有应用。
3. Android 端创建 Android Key，并填写应用包名和 SHA1。
4. iOS 端创建 iOS Key，并填写应用 Bundle Identifier。

### 2. Android 配置

在 `uni_modules/uni-map-amap/utssdk/app-android/AndroidManifest.xml` 的 `<application>` 标签内配置 Android Key：

```xml
<meta-data
    android:name="com.amap.api.v2.apikey"
    android:value="your_android_api_key" />
```

将 `your_android_api_key` 替换为高德开放平台生成的 Android Key。

插件已在 `AndroidManifest.xml` 中声明地图和定位所需权限。使用定位功能时，应用还需要在运行时向用户申请定位权限。

### 3. iOS 配置

在 `uni_modules/uni-map-amap/utssdk/app-ios/Info.plist` 中配置 iOS Key：

```xml
<key>AMapAPIKey</key>
<string>your_ios_api_key</string>
```

将 `your_ios_api_key` 替换为高德开放平台生成的 iOS Key，并确保申请 Key 时填写的 Bundle Identifier 与当前应用一致。

使用定位功能时，还需要在同一文件中配置定位用途说明：

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>我们需要获取您的位置信息以提供定位服务</string>
```

插件已配置 iOS 原生依赖 `AMap3DMap 11.2.000`

## 与内置 map 组件的功能差异

内置 map 组件由腾讯地图提供，在 App 平台 Android / iOS / Harmony 能力对齐。本插件基于高德地图实现，支持 Android 与 iOS，暂不支持 Harmony，差异如下。

### 属性差异

| 属性 | 腾讯地图 | 本插件高德 Android | 本插件高德 iOS | 本插件高德 Harmony |
| --- | :-: | :-: | :-: | :-: |
| **基础** | | | | |
| longitude | ✓ |  1.0.0+ |  1.1.0+ | x |
| latitude | ✓ |  1.0.0+ |  1.1.0+ | x |
| scale | ✓ |  1.0.0+ |  1.1.0+ | x |
| theme | ✓ |  1.0.0+ |  1.1.0+ | x |
| min-scale | ✓ |  1.0.0+ |  1.1.0+ | x |
| max-scale | ✓ |  1.0.0+ |  1.1.0+ | x |
| layer-style | ✓ |  1.0.0+ |  1.1.0+ | x |
| markers | ✓ |  1.0.0+  |  1.1.0+  | x |
| show-location | ✓ |  1.0.0+ |  1.1.0+ | x |
| enable-satellite | ✓ |  1.0.0+ |  1.1.0+ | x |
| enable-traffic | ✓ |  1.0.0+ |  1.1.0+ | x |
| **覆盖物** | | | | |
| polyline | ✓ | 1.4.0+ | 1.3.0+ | x |
| polygons | ✓ | 1.4.0+ | 1.3.0+ | x |
| circles | ✓ | 1.4.0+ | 1.3.0+ | x |
| controls | ✓ | 1.4.0+ | 1.3.0+ | x |
| include-points | ✓ | 1.4.0+ | 1.3.0+ | x |
| **手势视角** | | | | |
| enable-zoom | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-scroll | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-rotate | ✓ | 1.4.0+ | 1.3.0+ | x |
| rotate | ✓ | 1.4.0+ | 1.3.0+ | x |
| skew | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-overlooking | ✓ | 1.4.0+ | 1.3.0+ | x |
| show-compass | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-3D | ✓ | 1.4.0+ | 1.3.0+ | x |
| **显示控制** | | | | |
| show-scale | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-poi | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-building | ✓ | 1.4.0+ | 1.3.0+ | x |
| enable-indoorMap | ✓ | 1.4.0+ | 1.3.0+ | x |


### 事件差异

| 事件 | 腾讯地图 | 本插件高德 Android | 本插件高德 iOS | 本插件高德 Harmony |
| --- | :-: | :-: | :-: | :-: |
| @markertap | ✓ | 1.4.0+ | 1.3.0+ | x |
| @controltap | ✓ | 1.4.0+ | 1.3.0+ | x |
| @regionchange | ✓ | 1.4.0+ | 1.3.0+ | x |
| @updated | ✓ | 1.4.0+ | 1.3.0+ | x |
| @tap | ✓ | 1.4.0+ | 1.3.0+ | x |
| @callouttap | ✓ | 1.4.0+ | 1.3.0+ | x |
| @anchorpointtap | ✓ | 1.4.0+ | 1.3.0+ | x |
| @poitap | ✓ | 1.4.0+ | 1.3.0+ | x |

### 上下文 createMapContext API 差异

腾讯地图内置 map 组件可通过 `uni.createMapContext(mapId)` 获取上下文对象（MapContext），调用 `getCenterLocation`、`moveToLocation`、`translateMarker`、`includePoints`、`getRegion`、`getScale`、`addMarkers`、`removeMarkers`、`moveAlong`、`addGroundOverlay` 系列等方法。

本插件通过 `uni.createAmapContext(mapId, component)` 获取高德地图上下文对象。Android 自 `1.4.0` 起支持，iOS 自 `1.3.0` 起支持并兼容 VDOM 与 Vapor 模式。

| 方法 | 本插件高德 Android | 本插件高德 iOS | 说明 |
| --- | :-: | :-: | --- |
| `getCenterLocation` | 1.4.0+ | 1.3.0+ | 获取当前地图中心点 |
| `moveToLocation` | 1.4.0+ | 1.3.0+ | 移动到指定位置或当前位置 |
| `translateMarker` | 1.4.0+ | 1.3.0+ | 移动指定标记点 |
| `includePoints` | 1.4.0+ | 1.3.0+ | 将指定坐标包含在可视区域内 |
| `getRegion` | 1.4.0+ | 1.3.0+ | 获取当前地图可视区域 |
| `getScale` | 1.4.0+ | 1.3.0+ | 获取当前缩放级别 |
| `addMarkers` | 1.4.0+ | 1.3.0+ | 添加标记点 |
| `removeMarkers` | 1.4.0+ | 1.3.0+ | 删除标记点 |
| `moveAlong` | 1.4.0+ | 1.3.0+ | 沿路径移动标记点 |
| `addGroundOverlay` | 1.4.0+ | 1.3.0+ | 添加地面覆盖物 |
| `updateGroundOverlay` | 1.4.0+ | 1.3.0+ | 更新地面覆盖物 |
| `removeGroundOverlay` | 1.4.0+ | 1.3.0+ | 删除地面覆盖物 |

上下文方法在地图实例尚未初始化、API Key 无效或地图实例已销毁时会通过 `fail` 和 `complete` 回调返回错误。

## 注意事项

- API Key 配置错误或与应用包名、Bundle Identifier 不匹配时，地图可能无法通过鉴权。
- 上架应用前，请根据实际业务完善隐私政策和权限用途说明。
- Android 与 iOS 的 API Key 不能混用。
- 由于该插件有三方依赖，因此开发调试时需要自定义基座；
- iOS、Android 均支持 Vapor、VDOM 模式；不同模式下组件根节点结构由框架自动适配，业务侧无需修改地图组件调用方式。
