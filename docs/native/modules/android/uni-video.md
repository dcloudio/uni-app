## uni-video

**HBuilderX 5.08以上版本配置**

### 本地依赖库

|名称					|
|:--					|
|uni-video-release.aar	|

将本地依赖库复制到app项目的libs下。

### 线上依赖库
|名称										|
|:--										|
|androidx.media3:media3-exoplayer:1.8.0		|
|androidx.media3:media3-exoplayer-hls:1.8.0	|

### 模块依赖

|名称					|
|:--					|
|uni-fileSystemManager	|
|uni-getSystemInfo		|

### 组件注册

将以下内容添加到主模块的build.gradle，详见[根据configjson配置应用](../../use/androiduts.md#utscomponents)。

```groovy
defaultConfig {
    buildConfigField("String", "UTSEasyCom", "\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniVideo.UniVideoExtApiComponentsRegister\\\",\\\"method\\\":\\\"register\\\"}]\"")
}
```

**HBuilderX 5.08以下版本配置**

### 本地依赖库

|名称					|
|:--					|
|uni-video-release.aar	|
|ijkplayer.aar			|
|videoplayer.aar		|

将本地依赖库复制到app项目的libs下。

### 线上依赖库
|名称									|
|:--									|
|com.github.bumptech.glide:glide:4.9.0	|
|androidx.annotation:annotation:1.1.0	|
|androidx.core:core:1.1.0				|

将线上依赖库添加到app项目的build.gradle下。

### 组件注册

将以下内容添加到主模块的build.gradle，详见[根据configjson配置应用](../../use/androiduts.md#utscomponents)。

```groovy
defaultConfig {
    buildConfigField "String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"video\\\",\\\"class\\\":\\\"uts.sdk.modules.DCloudUniVideo.VideoComponent\\\"}]\""
}
```