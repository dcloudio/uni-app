# uts-tencentgeolocation腾讯定位插件使用文档

## Android 平台

1. 申请腾讯地图key

[申请网址](https://lbs.qq.com/mobile/androidMapSDK/developerGuide/getKey)

2. 配置key到插件中

修改项目根目录下 AndroidManifest.xml
`<meta-data android:name="TencentMapSDK" android:value="您申请的Key" />`

3. 打包自定义基座

注意将`uts-tencentgeolocation/utssdk/app-android/libs/androix-core-1.0.0.jar`先移到其他目录。

4. 运行自定义基座

注意打包自定义基座后将androix-core-1.0.0.jar移回原位，然后真机运行自定义基座。这个临时的移出移入问题后续会升级解决，详见uts插件开发文档的[临时注意](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#tempnotice)。

## iOS 平台

1.申请腾讯地图key

[申请网址](https://lbs.qq.com/mobile/androidMapSDK/developerGuide/getKey)

2.配置key到插件中

将申请的key配置到插件目录下 app-ios -> info.plist 中 TencentLBSAPIKey 对应的值

```xml
<key>TencentLBSAPIKey</key>
<string>您申请的Key</string>
```

3.配置访问位置权限描述信息

选中工程中的 manifest.json -> App权限配置 -> iOS隐私信息访问的许可描述，分别配置下列权限描述信息

- NSLocationAlwaysUsageDescription
- NSLocationWhenInUseUsageDescription
- NSLocationAlwaysAndWhenInUseUsageDescription

4.制作自定义基座运行后生效

## 相关开发文档

- [UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
- [UTS 原生插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)