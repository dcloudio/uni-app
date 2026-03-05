## uni-push

uni-app x 在4.81版本支持了FCM渠道，所以文档区分为国内和国外的配置，开发者根据需要集成，**二者配置不能同时集成**。

### 国内

国内推送包括华为、小米、魅族、VIVO、OPPO、荣耀厂商渠道

### Gradle配置

首先需在项目根目录下的build.gradle增加个推仓库源

```
buildscript {
	repositories {
		jcenter()
		google()
	}
}
allprojects {
	repositories {
		jcenter()
		google()
        // 个推的Maven仓库地址。
        maven { 
            url 'https://mvn.getui.com/nexus/content/repositories/releases' 
        }
        // 配置荣耀的Maven仓地址，荣耀厂商推送需要。
        maven {
            url 'https://developer.hihonor.com/repo/'
        }
	}
}
```

项目应用下的build.gradle

```
android {
    defaultConfig {
        manifestPlaceholders = [
            "GETUI_APPID" : "%GETUI_APPID%",
            "PUSH_APPID" : "%PUSH_APPID%",
            "GETUI_APP_ID": "%GETUI_APP_ID%",
            "dcloud_unipush_auto_notification":"%透传时是否自动创建通知，布尔类型%"
            // 厂商推送配置
            //小米
            "XIAOMI_APP_ID":"%XIAOMI_APP_ID%",
            "XIAOMI_APP_KEY":"%XIAOMI_APP_KEY%",
            //魅族
            "MEIZU_APP_ID":"%MEIZU_APP_ID%",
            "MEIZU_APP_KEY":"%MEIZU_APP_KEY%",
            //OPPO
            "OPPO_APP_KEY":"%OPPO_APP_KEY%",
            "OPPO_APP_SECRET":"%OPPO_APP_SECRET%",
            //华为
            "HUAWEI_APP_ID":"%HUAWEI_APP_ID%",
            //vivo
            "VIVO_APP_ID":"%VIVO_APP_ID%",
            "VIVO_APP_KEY":"%VIVO_APP_KEY%",
            //荣耀
            "HONOR_APP_ID":"%HONOR_APP_ID%",
        ]
    }
}

dependencies {
    implementation 'com.getui:gtc-dcloud:3.2.16.7'  //个推核心组件
    implementation('com.getui:gtsdk:3.3.7.0'){ exclude(group: 'com.getui') }  //个推SDK

    // 根据所需厂商选择集成
    implementation 'com.getui.opt:hwp:3.1.2'   // 华为
    implementation 'com.huawei.hms:push:6.11.0.300' // 华为

    implementation 'com.getui.opt:xmp:3.3.1'   // 小米

    implementation 'com.assist-v3:oppo:3.4.0'  // oppo
    implementation 'com.google.code.gson:gson:2.6.2' // oppo
    implementation 'commons-codec:commons-codec:1.6' // oppo
    implementation 'androidx.annotation:annotation:1.1.0' // oppo

    implementation 'com.assist-v3:vivo:3.1.2'  // vivo

    implementation 'com.getui.opt:mzp:3.2.3'   // 魅族

    implementation 'com.getui.opt:honor:3.6.0' // 荣耀
    implementation 'com.hihonor.mcs:push:7.0.61.303' // 荣耀
}


```
`GETUI_APPID`、`PUSH_APPID`和`GETUI_APP_ID` 在开发者中心->uni-push->2.0->消息推送->配置管理->应用配置->AppID，请务必填写一致，`PUSH_APPID`字段是与一键登录出现AppID冲突时优先读取。

厂商相关的字段内容，在开发者中心->uni-push->2.0->厂商推送设置。


### 本地依赖库

|名称                   |备注|
|:--				    |:--|
|uni-push-release.aar   ||

将本地依赖库复制到app项目的libs下。


#### 华为配置


##### Gradle配置

* 需在项目根目录下的build.gradle增加华为推送的仓库地址
```
buildscript {
	repositories {
		jcenter()
		google()
		// 配置HMS Core SDK的Maven仓地址。
		maven {url 'https://developer.huawei.com/repo/'}
	}
	dependencies {
		// 增加agcp配置。
		classpath 'com.huawei.agconnect:agcp:1.6.0.300'
	}
}
allprojects {
	repositories {
		jcenter()
		google()
		// 配置HMS Core SDK的Maven仓地址。
		maven {url 'https://developer.huawei.com/repo/'}
	}
}
```

* 项目应用下的build.gradle

在文件头 apply plugin: 'com.android.application' 下一行添加如下配置。


```
apply plugin: 'com.android.application'
apply plugin: 'com.huawei.agconnect'
```

* 添加添加华为推送的配置文件

登录华为的AppGallery Connect网站，找到需要集成华为推送的应用，在“项目设置 > 常规”页面的“应用”区域，点击`agconnect-services.json`下载配置文件。


将`agconnect-services.json`文件拷贝到应用级根目录下即可。



### 国外

国外推送只包括FCM
#### FCM配置

### Gradle配置

首先需在项目根目录下的build.gradle增加个推仓库源

```
buildscript {
	repositories {
		jcenter()
		google()
	}
	dependencies {
		// 增加agcp配置。
		classpath 'com.google.gms:google-services:4.3.15'
	}
}
allprojects {
	repositories {
		jcenter()
		google()
        // 个推的Maven仓库地址。
        maven { 
            url 'https://mvn.getui.com/nexus/content/repositories/releases' 
        }
	}
}
```

* 项目应用下的build.gradle

在文件头 apply plugin: 'com.android.application' 下一行添加如下配置。


```
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'

android {
    defaultConfig {
        manifestPlaceholders = [
            "GETUI_APPID" : "%GETUI_APPID%",
            "PUSH_APPID" : "%PUSH_APPID%",
            "GETUI_APP_ID": "%GETUI_APP_ID%",
            "dcloud_unipush_auto_notification":"%透传时是否自动创建通知，布尔类型%"
        ]
    }
}

dependencies {
    implementation 'com.getui:sdk-for-gj:4.4.3.17'
    implementation 'com.getui.opt:fcm:3.1.2' 
    implementation 'com.google.firebase:firebase-messaging:23.2.1'
}
```
`GETUI_APPID`、`PUSH_APPID`和`GETUI_APP_ID` 在开发者中心->uni-push->2.0->消息推送->配置管理->应用配置->AppID，请务必填写一致。


* 添加添加FCM的配置文件

登录[FCM网站](https://firebase.google.com/)，找到需要集成FCM的应用，获取`google-services.json`配置文件。


将`google-services.json`文件拷贝到应用级根目录下即可。


### 本地依赖库

|名称                   |备注|
|:--				    |:--|
|uni-push-release.aar   ||

将本地依赖库复制到app项目的libs下。