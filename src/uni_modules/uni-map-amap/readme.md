# uni-map-amap

当前版本：`1.5.0`

`uni-map-amap` 是基于高德地图原生 SDK 实现的 uni-app x 地图组件。
自 `1.1.0` 起支持 iOS，iOS 功能与 Android 之前保持一致；
自 `1.2.0` 起 Android 支持 Vapor 模式；
自 `1.3.0` 起 iOS 全面拉齐与内置 map 组件的功能差异，兼容 VDOM、Vapor 模式；
自 `1.4.0` 起 Android 全面拉齐与内置 map 组件的功能差异。
自 `1.5.0` 起支持 Harmony，仅支持 Vapor 模式。

## 平台支持

| 平台    | 支持版本                                                            |
| ------- | ------------------------------------------------------------------- |
| Android | Android 5.0（API 21）及以上                                         |
| iOS     | iOS 13.0 及以上                                                     |
| Harmony | API 20 及以上，仅支持 Vapor（bytecode），要求 HBuilderX 5.34 及以上 |

## 高德地图 API Key 配置

Android、iOS 和 Harmony 使用不同类型的 Key，需要分别在高德开放平台创建并配置。

### 1. 申请 API Key

1. 访问[高德开放平台](https://lbs.amap.com/)并登录开发者账号。
2. 进入控制台，创建新应用或选择已有应用。
3. Android 端创建 Android Key，并填写应用包名和 SHA1。
4. iOS 端创建 iOS Key，并填写应用 Bundle Identifier。
5. Harmony 端创建 Harmony Key，并填写实际应用标识和签名信息。

### 2. Android 配置

在 `uni_modules/uni-map-amap/utssdk/app-android/AndroidManifest.xml` 的 `<application>` 标签内配置 Android Key(不需要配置 manifest.json)：

```xml
<meta-data
    android:name="com.amap.api.v2.apikey"
    android:value="your_android_api_key" />
```

将 `your_android_api_key` 替换为高德开放平台生成的 Android Key。

插件已在 `AndroidManifest.xml` 中声明地图和定位所需权限。使用定位功能时，应用还需要在运行时向用户申请定位权限。

### 3. iOS 配置

在 `uni_modules/uni-map-amap/utssdk/app-ios/Info.plist` 中配置 iOS Key(不需要配置 manifest.json)：

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

### 4. Harmony 配置

在宿主项目 `harmony-configs/entry/src/main/module.json5` 的 `module.metadata` 数组中添加以下配置，保留已有配置项：

```json5
{ name: 'AMAP_API_KEY', value: 'your_harmony_api_key' }
```

将 `your_harmony_api_key` 替换为高德开放平台生成的 Harmony Key，并确保应用标识、签名与申请 Key 时一致。修改后重新打包自定义基座。

插件已声明 `ohos.permission.INTERNET`、`ohos.permission.APPROXIMATELY_LOCATION` 和 `ohos.permission.LOCATION`，首次使用定位时申请运行时权限。高德 `@amap/amap_lbs_map3d`、`@amap/amap_lbs_common`、`@amap/amap_lbs_location` 依赖均固定为 `11.2.1`。

当前 Demo 由鸿蒙 `AmapMap` 内部直接设置高德 SDK 隐私状态并初始化地图，不等待 `agreePrivacyAuthorization`；系统定位权限仍在实际使用时申请。

## 与内置 map 组件的功能差异

内置 map 组件由腾讯地图提供，在 App 平台 Android / iOS / Harmony 能力对齐。本插件基于高德地图实现，支持 Android、iOS 和 Harmony（仅 Vapor），差异如下。

### 属性差异

| 属性               | 腾讯地图 | 本插件高德 Android | 本插件高德 iOS | 本插件高德 Harmony |
| ------------------ | :------: | :----------------: | :------------: | :----------------: |
| **基础**           |          |                    |                |                    |
| longitude          |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| latitude           |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| scale              |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| theme              |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| min-scale          |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| max-scale          |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| layer-style        |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| markers            |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| show-location      |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| enable-satellite   |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| enable-traffic     |    ✓     |       1.0.0+       |     1.1.0+     |       1.5.0+       |
| **覆盖物**         |          |                    |                |                    |
| polylines          |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| polygons           |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| circles            |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| controls           |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| include-points     |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| **手势视角**       |          |                    |                |                    |
| enable-zoom        |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-scroll      |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-rotate      |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| rotate             |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| skew               |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-overlooking |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| show-compass       |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-3D          |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| **显示控制**       |          |                    |                |                    |
| show-scale         |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-poi         |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-building    |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| enable-indoorMap   |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |

### 事件差异

| 事件            | 腾讯地图 | 本插件高德 Android | 本插件高德 iOS | 本插件高德 Harmony |
| --------------- | :------: | :----------------: | :------------: | :----------------: |
| @markertap      |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @controltap     |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @regionchange   |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @updated        |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @tap            |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @callouttap     |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @anchorpointtap |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |
| @poitap         |    ✓     |       1.4.0+       |     1.3.0+     |       1.5.0+       |

### 上下文 createMapContext API 差异

腾讯地图内置 map 组件可通过 `uni.createMapContext(mapId)` 获取上下文对象（MapContext），调用 `getCenterLocation`、`moveToLocation`、`translateMarker`、`includePoints`、`getRegion`、`getScale`、`addMarkers`、`removeMarkers`、`moveAlong`、`addGroundOverlay` 系列等方法。

本插件通过 `uni.createAmapContext(mapId, component)` 获取高德地图上下文对象。Android 自 `1.4.0` 起支持，iOS 自 `1.3.0` 起支持并兼容 VDOM 与 Vapor 模式。Harmony 自 `1.5.0` 起在 Vapor 模式下支持下表全部方法。

| 方法                  | 本插件高德 Android | 本插件高德 iOS | 说明                       |
| --------------------- | :----------------: | :------------: | -------------------------- |
| `getCenterLocation`   |       1.4.0+       |     1.3.0+     | 获取当前地图中心点         |
| `moveToLocation`      |       1.4.0+       |     1.3.0+     | 移动到指定位置或当前位置   |
| `translateMarker`     |       1.4.0+       |     1.3.0+     | 移动指定标记点             |
| `includePoints`       |       1.4.0+       |     1.3.0+     | 将指定坐标包含在可视区域内 |
| `getRegion`           |       1.4.0+       |     1.3.0+     | 获取当前地图可视区域       |
| `getScale`            |       1.4.0+       |     1.3.0+     | 获取当前缩放级别           |
| `addMarkers`          |       1.4.0+       |     1.3.0+     | 添加标记点                 |
| `removeMarkers`       |       1.4.0+       |     1.3.0+     | 删除标记点                 |
| `moveAlong`           |       1.4.0+       |     1.3.0+     | 沿路径移动标记点           |
| `addGroundOverlay`    |       1.4.0+       |     1.3.0+     | 添加地面覆盖物             |
| `updateGroundOverlay` |       1.4.0+       |     1.3.0+     | 更新地面覆盖物             |
| `removeGroundOverlay` |       1.4.0+       |     1.3.0+     | 删除地面覆盖物             |

上下文方法在地图实例尚未初始化、API Key 无效或地图实例已销毁时会通过 `fail` 和 `complete` 回调返回错误。

标记点动画正常执行时，成功回调时机按平台区分：

| 平台             | `translateMarker` | `moveAlong`    |
| ---------------- | ----------------- | -------------- |
| Android          | 动画结束后        | 动画结束后     |
| iOS              | 动画成功发起后    | 动画完成后     |
| Harmony（Vapor） | 动画成功发起后    | 动画成功发起后 |

无实际动画时可能立即返回；取消或失败的回调行为沿用各端现有实现。`moveToLocation`、`includePoints` 的成功回调也不保证相机动画已经完成；需要稳定视野时，等待本次 `regionchange` 的 `end` 并留出绘制时间。目标与当前相机状态相同时，SDK 可能不产生新的视野变化事件。

## 注意事项

- API Key 配置错误或与应用包名、Bundle Identifier 不匹配时，地图可能无法通过鉴权。
- 上架应用前，请根据实际业务完善隐私政策和权限用途说明。
- Android、iOS 与 Harmony 的 API Key 不能混用。
- 由于该插件有三方依赖，因此开发调试时需要自定义基座；
- iOS、Android 均支持 Vapor、VDOM 模式；Harmony 仅支持 Vapor 模式。
- Harmony 的 `updated` 在初始配置应用后的首次有效绘制时派发一次，不表示在线瓦片全部加载完成。
- Harmony 地图样式优先级：`enable-satellite=true` 或 `theme="satellite"` → 有效非默认 `layer-style` → `theme`。
- Harmony 由 `AmapMap` 内部管理原生前后台和页面可见性；切页以原生页面实际显示、隐藏为准，与 Vue 页面钩子时机可能不同。地图在页面内滚出可视区域不会被当作页面隐藏。
