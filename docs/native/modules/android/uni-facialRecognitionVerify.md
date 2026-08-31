## uni-facialRecognitionVerify

### 本地依赖库

|本地依赖库名称																	|
|:--																			|
|aliyun-base-2.3.16.1-240418145504.aar											|
|aliyun-facade-2.3.16.1-240418145504.aar										|
|aliyun-face-2.3.16.1-240418145504.aar											|
|aliyun-faceaudio-2.3.16.1-240418145504.aar										|
|aliyun-facelanguage-2.3.16.1-240418145504.aar									|
|aliyun-photinus-2.3.16.1-240418145504.aar										|
|aliyun-wishverify-2.3.16.1-240418145504.aar									|
|Android-AliyunFaceGuard-10049.aar												|
|APSecuritySDK-deepSec-7.0.1.20240415.jiagu.aar									|
|facialRecognitionVerify-support-release.aar									|
|uni-facialVerify-release.aar（原为：uni-facialRecognitionVerify-release.aar）	|

将本地依赖库复制到app项目的libs下

### 线上依赖库

::: preview

> build.gradle

```groovy
dependencies {
    implementation 'com.squareup.okhttp3:okhttp:3.11.0'
    implementation 'com.squareup.okio:okio:1.14.0'
    implementation 'com.alibaba:fastjson:1.2.83_noneautotype'
    implementation 'com.aliyun.dpa:oss-android-sdk:2.9.11'
}
```

> build.gradle.kts

```groovy
dependencies {
    implementation("com.squareup.okhttp3:okhttp:3.11.0")
    implementation("com.squareup.okio:okio:1.14.0")
    implementation("com.alibaba:fastjson:1.2.83_noneautotype")
    implementation("com.aliyun.dpa:oss-android-sdk:2.9.11")
}
```

:::


将线上依赖库添加到app项目的build.gradle下

### 插件注册

VDOM模式无需注册。蒸汽模式（Vapor）需要方法注册，将以下内容添加到主模块的build.gradle。

::: preview

> build.gradle

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSMethodRegister', '"uts.sdk.modules.DCloudUniFacialVerify.UniUTSMethodRegister"'
}
```

> build.gradle.kts

```groovy
defaultConfig {
    buildConfigField("String", "UTSMethodRegister", "\"uts.sdk.modules.DCloudUniFacialVerify.UniUTSMethodRegister\"")
}
```

:::