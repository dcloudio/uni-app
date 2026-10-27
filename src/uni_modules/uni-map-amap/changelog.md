## 1.4.0 (2026-10-23)
Android 全面拉齐和内置map组件、高德amap组件iOS的功能
## 1.3.0 (2026-09-15)
1. iOS拉齐与内置腾讯map组件的功能, 兼容 VDOM、Vapor 模式；
2. iOS 平台新增折线、多边形、圆、控件和视野包含点功能，支持 `polyline`、`polygons`、`circles`、`controls`、`include-points` 属性。
3. iOS 平台新增地图交互配置，支持 `enable-zoom`、`enable-scroll`、`enable-rotate`、`rotate`、`skew`、`enable-overlooking`、`show-compass`、`enable-3D` 属性。
4. iOS 平台新增地图显示控制，支持 `enable-poi`、`enable-building`、`enable-indoorMap` 属性。
5. iOS 平台新增 `@markertap`、`@controltap`、`@regionchange`、`@updated`、`@tap`、`@anchorpointtap`、`@poitap` 事件。
6. iOS 平台新增 `uni.createAmapContext(mapId, component)` 上下文 API，支持 `getCenterLocation`、`moveToLocation`、`translateMarker`、`includePoints`、`getRegion`、`getScale`、`addMarkers`、`removeMarkers`、`moveAlong`、`addGroundOverlay`、`updateGroundOverlay`、`removeGroundOverlay` 方法。
## 1.2.0（2026-08-19）
1. Android 平台支持Vapor模式；
 
## 1.1.0（2026-08-11）
	1. 支持iOS平台蒸汽、非蒸汽模式；
	2. 对齐 Android 平台 1.0.0 版本功能；

## 1.0.0（2025-11-21）
1. 地图基础功能 ✓

  - 地图显示与初始化
  - 设置/获取中心点和缩放级别(5-20)
  - 设置最小/最大缩放级别
  - 缩放和平移动画支持

  2. 地图主题与图层 ✓

  - 普通地图 (theme: "normal")
  - 卫星地图 (theme: "satellite")
  - 交通路况图层 (enableTraffic)

  3. 定位功能 ✓

  - 显示当前定位点 (showLocation)
  - 定位权限自动请求
  - 定位点样式配置
  - 隐私合规处理

  4. 标记点(Marker)功能 ✓

  - 完整CRUD操作：setMarkers、addMarkers、removeMarkers
  - 支持属性：id、经纬度、图标、宽高、旋转、透明度、锚点、标题
  - 本地和网络图片加载(使用Glide库)
  - 气泡(callout)和标签(label)类型定义已完成
