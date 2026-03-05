## uni-map-tencent


### Gradle配置

首先需在项目根目录下的build.gradle增加仓库源

```
allprojects {
	repositories {
		jcenter()
		google()
        maven{
            url "https://oss.sonatype.org/content/groups/public"
        }
	}
}
```

项目应用下的build.gradle

```

android {
    defaultConfig {
        buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniMapTencent.UniMapTencentExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'
    }
}

dependencies {
    implementation 'com.tencent.map:tencent-map-vector-sdk:5.6.0'
    implementation 'com.tencent.map:sdk-utilities:1.0.9'
    implementation 'com.tencent.map.geolocation:TencentLocationSdk-openplatform:7.5.4.3'
    implementation 'com.github.bumptech.glide:glide:4.16.0'
}
```

### 本地依赖库

|名称                   |备注|
|:--				    |:--|
|uni-map-tencent-release.aar   ||

将本地依赖库复制到app项目的libs下。


### AndroidManifest.xml配置

首先在腾讯位置服务官网申请api key, [文档](https://lbs.qq.com/mobile/androidMapSDK/developerGuide/getKey)

在AndroidManifest.xml中添加api key，如下：

```

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
	<application>
		<meta-data android:name="TencentMapSDK" android:value="申请的apikey" />
	</application>
</manifest>

```


### 插件注册

将以下内容添加到主模块的build.gradle。

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniMapTencent.UniMapTencentExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'
}
```

