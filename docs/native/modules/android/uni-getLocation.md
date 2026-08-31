## uni-getLocation

### system 

|本地依赖库名称																							|
|:--																									|
|uni-location-release.aar、uni-location-system-release.aar（原为：uni-getLocation-system-release.aar）	|

#### 插件注册

以下配置在 VDOM 和 蒸汽模式（Vapor）下均适用，将内容添加到主模块的build.gradle。

##### 4.61之后配置

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '"[{\"name\":\"system\",\"service\":\"location\",\"class\":\"uts.sdk.modules.DCloudUniLocationSystem.UniLocationSystemProviderImpl\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"system\\\",\\\"service\\\":\\\"location\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLocationSystem.UniLocationSystemProviderImpl\\\"}]\"")
}
```

:::

##### 4.61之前配置

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '"[{\"name\":\"system\",\"service\":\"location\",\"class\":\"uts.sdk.modules.DCloudUniGetLocationSystem.UniLocationSystemProviderImpl\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"system\\\",\\\"service\\\":\\\"location\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniGetLocationSystem.UniLocationSystemProviderImpl\\\"}]\"")
}
```

:::

### tencent

项目应用下的build.gradle添加：

::: preview

> build.gradle

```groovy
dependencies {
    implementation "com.tencent.map.geolocation:TencentLocationSdk-openplatform:7.5.4.8"
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.tencent.map.geolocation:TencentLocationSdk-openplatform:7.5.4.8")
}
```

:::

|本地依赖库名称						|
|:--								|
|uni-location-release.aar、uni-location-tencent-release.aar（原为：uni-getLocation-tencent-release.aar）|

#### 插件注册

以下配置在 VDOM 和 蒸汽模式（Vapor）下均适用，将内容添加到主模块的build.gradle。

##### 4.61之后配置

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '"[{\"name\":\"tencent\",\"service\":\"location\",\"class\":\"uts.sdk.modules.DCloudUniLocationTencent.UniLocationTencentProviderImpl\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"tencent\\\",\\\"service\\\":\\\"location\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniLocationTencent.UniLocationTencentProviderImpl\\\"}]\"")
}
```

:::

##### 4.61之前配置

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSRegisterProviders', '"[{\"name\":\"tencent\",\"service\":\"location\",\"class\":\"uts.sdk.modules.DCloudUniGetLocationTencent.UniLocationTencentProviderImpl\"}]"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSRegisterProviders", "\"[{\\\"name\\\":\\\"tencent\\\",\\\"service\\\":\\\"location\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniGetLocationTencent.UniLocationTencentProviderImpl\\\"}]\"")
}
```

:::