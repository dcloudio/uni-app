## uni-share

### 微信分享

项目应用下的build.gradle添加：

```
dependencies {
    implementation 'com.tencent.mm.opensdk:wechat-sdk-android:6.8.0'
}
```

|本地依赖库名称									|
|:--											|
|uni-share-release.aar	|
|uni-share-weixin-release.aar	|
|uni-weixin-common-release.aar |

#### 插件注册

将以下内容添加到主模块的build.gradle。

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"weixin\\\",\\\"service\\\":\\\"share\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniShareWeixin.UniShareWeixinProviderImpl\\\"}]\""
}
```

### 注意

1. 同时导入微信分享和微信登录模块时，`uni-weixin-common-release.aar`只保留一个即可。