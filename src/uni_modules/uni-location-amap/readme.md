# uni-location-amap

基于高德定位SDK实现的 uni-location 定位服务 provider 插件，依赖 [uni-location](https://ext.dcloud.net.cn/plugin?name=uni-location) 插件。

provider名称：`amap`

> 国内定位结果使用高德坐标系（GCJ-02）。Android 使用高德定位 SDK 11.3.101，HarmonyOS NEXT 使用 11.2.1。

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

## HarmonyOS NEXT（uni-app x 蒸汽模式）

1. 在项目 `manifest.json` 的 `app-harmony.distribute.modules` 下添加 `"uni-location": { "amap": {} }`。如需保留系统定位，也加入 `"system": {}`
2. 在高德控制台为 **HarmonyOS 平台**创建 Key，在项目 `harmony-configs/entry/src/main/module.json5` 的 **module.metadata** 数组中加入下面的对象。已接入鸿蒙高德地图插件的项目可复用同一条配置。[高德 Key 申请说明](https://lbs.amap.com/api/harmonyosnext-location-sdk/guide/create-project/get-key)

 ```json
 { "name": "AMAP_API_KEY", "value": "<YOUR_HARMONY_KEY>" }
 ```

3. 制作自定义基座运行后生效

## uts 语言介绍

uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序平台：编译为JavaScript

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。
