## uni-oauth

### 微信登录

项目应用下的build.gradle添加：

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.tencent.mm.opensdk:wechat-sdk-android:6.8.0'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.tencent.mm.opensdk:wechat-sdk-android:6.8.0")
}
```

:::

|本地依赖库名称									|
|:--											|
|uni-oauth-release.aar	|
|uni-oauth-weixin-release.aar	|
|uni-weixin-common-release.aar |

#### 插件注册

以下配置在 VDOM 和 蒸汽模式（Vapor）下均适用，将内容添加到主模块的build.gradle。

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"weixin\\\",\\\"service\\\":\\\"oauth\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniOauthWeixin.UniOAuthWeixinProviderImpl\\\"}]\""
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"weixin\\\",\\\"service\\\":\\\"oauth\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniOauthWeixin.UniOAuthWeixinProviderImpl\\\"}]\"")
}
```

:::

蒸汽模式（Vapor）还需依赖 `uni-event`。

### 注意

1. 同时导入微信登录和微信分享模块时，`uni-weixin-common-release.aar`只保留一个即可。