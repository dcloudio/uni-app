## uni-verify

### 本地依赖库

|名称                   |
|:--				    |
|uni-verify-release.aar |
|GY-3.1.6.3-release.aar	|

将本地依赖库复制到app项目的libs下。

### 线上依赖库

1. 在项目根目录下的settings.gradle中增加个推仓库源。

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
		...
        maven {
            url 'https://mvn.getui.com/nexus/content/repositories/releases'
        }
    }
}
```

2. 将线上依赖库添加到app项目的build.gradle下。

```groovy
dependencies {
    implementation "com.getui:gtc-dcloud:3.2.16.7"
}
```

### 配置应用ID

在app项目下的build.gradle配置一键登录的应用ID。

```groovy
android {
    defaultConfig {
        manifestPlaceholders = [
			"GETUI_APPID" : "%GETUI_APPID%",
            "GY_APP_ID" : "%GY_APP_ID%",
        ]
    }
}
```

GETUI_APPID与GY_APP_ID对应[开发者中心](https://dev.dcloud.net.cn/)一键登录->基础配置->一键登录应用ID，GETUI_APPID与GY_APP_ID取值相同。

### 插件注册

将以下内容添加到主模块的build.gradle。

```groovy
defaultConfig {
    buildConfigField 'String', 'UTSEasyCom', '\"[{\\\"class\\\":\\\"uts.sdk.modules.DCloudUniVerify.UniVerifyExtApiPagesRegister\\\",\\\"method\\\":\\\"register\\\"}]\"'
}
```
