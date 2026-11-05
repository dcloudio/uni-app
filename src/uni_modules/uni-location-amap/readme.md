# uni-location-amap

基于高德定位SDK实现的 uni-location 定位服务 provider 插件，依赖 [uni-location](https://ext.dcloud.net.cn/plugin?name=uni-location) 插件。

provider名称：`amap`

> 基于高德定位SDK 11.3.101 实现，定位SDK在国内返回高德类型坐标（GCJ-02）。

## 支持的API

API声明均由 uni-location 插件提供，本插件仅提供 provider 实现：

- uni.getLocation
- uni.onLocationChange
- uni.offLocationChange
- uni.onLocationChangeError
- uni.offLocationChangeError
- uni.startLocationUpdate
- uni.stopLocationUpdate
- uni.startLocationUpdateBackground

## 使用方式

在调用API时通过 `provider: 'amap'` 指定使用高德定位：

```ts
uni.getLocation({
	provider: 'amap',
	type: 'gcj02',
	success: function (res) {
		console.log('当前位置的经度：' + res.longitude);
		console.log('当前位置的纬度：' + res.latitude);
	}
});
```

## Android 平台

1. 申请高德key

[申请网址](https://console.amap.com/dev/key/appcreate)

2. 配置key到插件中

修改项目根目录下 AndroidManifest.xml
`<meta-data android:name="com.amap.api.v2.apikey" android:value="您申请的Key" />`

3. 制作自定义基座运行后生效

## uts 语言介绍
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序平台：编译为JavaScript

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。
