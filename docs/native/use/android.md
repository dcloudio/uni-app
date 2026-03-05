# uni-app x 原生SDK Android版


## 准备

- HBuilder X （4.18版本及以上）
- android studio

***
说明：

当前文档正式版基于android studio 2023.2.1 Patch 2。gradle版本为8.4。gradle插件版本为8.2.2。kotlin插件版本为1.9.10。

当前文档alpha版基于Android Studio Narwhal 3 Feature Drop | 2025.1.3。gradle版本为8.14.3。gradle插件版本为8.12.0。kotlin插件版本为2.2.0。
***

## 新建uni-app x模块

点击File->New->New Module...

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/new_uniappx.png)

点击左侧`Templates`的`Android Library`。

`Language`选择`Kotlin`。

`Module name`建议设置为`uniappx`。

点击`Finish`。

**注意**
- `Language` 一定要选择`Kotlin`。
- uni-app x最低支持版本为21，`Minimum SDK`需要选择21及以上的版本。
- `Build configuration language`建议选择`Groovy DSL(build.gradle)`。以下教程均按照此模式进行。

## 工程配置

### 基础库配置

将uts-runtime-release.aar，android-gif-drawable-1.2.28.aar，app-common-release.aar，app-runtime-release.aar，breakpad-build-release.aar，dcloud-layout-release.aar，
framework-release.aar，uni-exit-release.aar，uni-getAccessibilityInfo-release.aar，uni-getAppAuthorizeSetting-release.aar，uni-getAppBaseInfo-release.aar，
uni-getSystemSetting-release.aar，uni-openAppAuthorizeSetting-release.aar，uni-prompt-release.aar，uni-storage-release.aar，uni-getDeviceInfo-release.aar，
uni-getSystemInfo-release.aar，uni-rpx2px-release.aar，uni-theme-release.aar共19个aar拷贝到uni-app x模块的libs下，如果没有libs需要手动创建，参考下图：

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/main_libs_2.jpg)

### 修改build.gradle

修改uniappx模块下的build.gradle

- 添加依赖
	
	将下面的依赖信息添加到build.gradle中
	
	::: preview
	
	> build.gradle
	
	```groovy
	dependencies {
		implementation fileTree(include: ['*.aar'], dir: './libs') // 复制到主模块中需要将`./libs`替换为`../uniappx/libs`
		implementation "androidx.core:core-ktx:1.10.1"
		implementation "androidx.recyclerview:recyclerview:1.3.2"
		implementation "androidx.appcompat:appcompat:1.0.0"
		implementation "androidx.exifinterface:exifinterface:1.3.6"
		implementation "androidx.localbroadcastmanager:localbroadcastmanager:1.0.0@aar"
		implementation "androidx.constraintlayout:constraintlayout:2.1.4"
		implementation "androidx.webkit:webkit:1.6.0"
		implementation "com.google.android.material:material:1.4.0"
		implementation "androidx.viewpager2:viewpager2:1.1.0-beta02"
		implementation "com.alibaba:fastjson:1.2.83"
		implementation "com.facebook.fresco:fresco:3.4.0"
		implementation "com.facebook.fresco:middleware:3.4.0"
		implementation "com.facebook.fresco:animated-gif:3.4.0"
		implementation "com.facebook.fresco:webpsupport:3.4.0"
		implementation "com.facebook.fresco:animated-webp:3.4.0"
		implementation "com.caverock:androidsvg:1.4"
		implementation "com.github.bumptech.glide:glide:4.9.0"
		implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4"
		implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.4"
		implementation "org.jetbrains.kotlin:kotlin-stdlib:2.2.0"
		implementation "org.jetbrains.kotlin:kotlin-reflect:2.2.0"
		implementation "org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1"
		implementation "com.squareup.okhttp3:okhttp:3.12.12"
		implementation "com.github.getActivity:XXPermissions:18.63"
		implementation "net.lingala.zip4j:zip4j:2.11.5"
	}
	```
	
	> build.gradle.kts

	```groovy
	dependencies {
	    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar")))) // 复制到主模块中需要将`./libs`替换为`../uniappx/libs`
	    implementation("androidx.core:core-ktx:1.10.1")
	    implementation("androidx.recyclerview:recyclerview:1.3.2")
	    implementation("androidx.appcompat:appcompat:1.0.0")
	    implementation("androidx.exifinterface:exifinterface:1.3.6")
	    implementation("androidx.localbroadcastmanager:localbroadcastmanager:1.0.0")
	    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
	    implementation("androidx.webkit:webkit:1.6.0")
	    implementation("com.google.android.material:material:1.4.0")
	    implementation("androidx.viewpager2:viewpager2:1.1.0-beta02")
	    implementation("com.alibaba:fastjson:1.2.83")
	    implementation("com.facebook.fresco:fresco:3.4.0")
	    implementation("com.facebook.fresco:middleware:3.4.0")
	    implementation("com.facebook.fresco:animated-gif:3.4.0")
	    implementation("com.facebook.fresco:webpsupport:3.4.0")
	    implementation("com.facebook.fresco:animated-webp:3.4.0")
		implementation("com.caverock:androidsvg:1.4")
	    implementation("com.github.bumptech.glide:glide:4.9.0")
	    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
	    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.4")
	    implementation("org.jetbrains.kotlin:kotlin-stdlib:2.2.0")
	    implementation("org.jetbrains.kotlin:kotlin-reflect:2.2.0")
	    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1")
	    implementation("com.squareup.okhttp3:okhttp:3.12.12")
	    implementation("com.github.getActivity:XXPermissions:18.63")
	    implementation("net.lingala.zip4j:zip4j:2.11.5")
	}
	```
	
	:::
	
- 添加aaptOptions配置

	将aaptOptions配置添加到android节点下
	
	::: preview
	
	> build.gradle
	
	```groovy
    aaptOptions {
        additionalParameters '--auto-add-overlay'
        ignoreAssetsPattern '!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~'
    }
	```
	
	> build.gradle.kts

	```groovy
    androidResources {
        additionalParameters += listOf("--auto-add-overlay")
        ignoreAssetsPattern = "!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~"
    }
	```
	
	:::
	
	***注意：上面的配置需要同时设置到主模块中。***
	
### 配置gradle插件 @gradleplugin

在项目根目录的build.gradle的顶部添加gradle插件的依赖。参考：

```groovy
buildscript {
    dependencies {
		...
        classpath(files('plugins/uts-kotlin-compiler-plugin-0.0.1.jar'))
        classpath(files('plugins/uts-kotlin-gradle-plugin-0.0.1.jar'))
    }
}
```

**注意：文件uts-kotlin-compiler-plugin-0.0.1.jar和uts-kotlin-gradle-plugin-0.0.1.jar位于原生SDK中，示例中放到了项目根目录的`plugins`文件夹下。参考：**

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/gradle_plugins.png)

然后在`uniappx`模块的build.gradle下添加插件`io.dcloud.uts.kotlin`的依赖。参考：

::: preview

> build.gradle

```groovy
plugins {
	...
    id 'io.dcloud.uts.kotlin'
}
```

> build.gradle.kts

```groovy
plugins {
	...
    id("io.dcloud.uts.kotlin")
}
```

:::

**注意：`io.dcloud.uts.kotlin`仅需要配置到uniappx模块和android uts插件模块中。原有的主项目不需要配置。**

### 修改项目的settings.gradle

在项目根路径下的settings.gradle中添加`jitpack`的maven的仓库地址和本地gradle插件的路径配置。参考如下：

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        ...
        maven { url = uri("https://jitpack.io") }
		flatDir { dirs('./plugins/') }
    }
}
```

### 修改项目的gradle.properties

在项目根路径下的gradle.properties中追加如下内容

```groovy
android.useAndroidX=true
android.enableJetifier=true
```

### 修改uniappx模块下的AndroidManifest.xml @androidmanifest  

- 添加activity
	
	将下面内容拷贝到application节点下

	```xml
        <activity
            android:name="io.dcloud.uniapp.UniAppActivity"
            android:configChanges="orientation|keyboard|keyboardHidden|smallestScreenSize|screenLayout|screenSize|mcc|mnc|fontScale|navigation|uiMode"
            android:exported="true"
            android:label="@string/app_name"
            android:screenOrientation="portrait"
            android:theme="@style/UniAppX.Activity.DefaultTheme"
            android:windowSoftInputMode="adjustResize"
            tools:replace="android:label,android:exported,android:theme,android:configChanges,android:windowSoftInputMode,android:screenOrientation">
        </activity>
	```

- 添加appid

	在application节点下添加`DCLOUD_UNI_APPID`节点
	```xml
	<meta-data
		android:name="DCLOUD_UNI_APPID" android:value="替换成应用的appid" />
	```
	
- 修改application

	将`application`节点的`android:name`修改为`io.dcloud.uniapp.UniApplication`

	**注意：如果需要自定义application，必须继承自UniApplication**
	
- 配置应用分发渠道
	
	在application节点下添加`DCLOUD_CHANNEL`节点
	```xml
	<meta-data
		android:name="DCLOUD_CHANNEL" android:value="替换成需要发布的应用分发渠道" />
	```
	
	获取配置的应用分发渠道，可以通过[uni.getAppBaseInfo()](../../api/get-app-base-info.md)。

- 合并AndroidManifest.xml

	如果uni-app x项目根目录下有AndroidManifest.xml文件，你需要按照xml文件的结构将内容拷贝到`uniappx`模块的AndroidManifest.xml中。

### 拷贝资源文件
1. 导出uni-app x项目的资源文件

	选择项目，然后点击：发行 -> 原生App-本地打包 -> 生成本地打包App资源

	![](https://web-ext-storage.dcloud.net.cn/native/doc/android/export.png)

	导出成功之后会在项目的unpackage/resources目录下生成资源文件

	![](https://web-ext-storage.dcloud.net.cn/native/doc/android/resources.png)
	
2. 将app-android目录下与appid对应的目录拷贝到uniappx项目的`assets/apps`目录下
	
	![](https://web-ext-storage.dcloud.net.cn/native/doc/android/app_assets_2.png)
	
	**注意：apps下的appid必须与AndroidManifest.xml的`DCLOUD_UNI_APPID`保持一致。**
	
### 拷贝kt文件
需要将`unkackage/resource/app-android/uniappx/app-android/src/`目录下的所有文件拷贝到uniappx项目的`src/main/java`下

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/copykt.png)

注意：不要破坏原有src下的目录结构。

### 添加到主模块

将uni-app x模块添加到主模块中。

::: preview
	
> build.gradle

```groovy
	dependencies {
		implementation project(':uniappx')
		implementation fileTree(include: ['*.aar'], dir: '../uniappx/libs')
	}
```

> build.gradle.kts
	
```groovy
	dependencies {
		implementation(project(":uniappx"))
		implementation(fileTree(mapOf("dir" to "../uniappx/libs", "include" to listOf("*.aar"))))
	}
```

:::

## 配置内置模块@configmodules

根据`unpackage/resource/{appid}/manifest.json`的配置，添加[内置模块的配置](../modules/android/others.md)。

## uts插件配置

uts插件资源位于`unpackage/resource/app-android/uni_modules`下。如果uni_modules下存在uts插件，需要按照[uts插件配置文档](./androiduts.md)将插件集成到项目中。

以下模块可以忽略配置：
- uni-exit
- uni-getAccessibilityInfo
- uni-getAppAuthorizeSetting
- uni-getAppBaseInfo
- uni-getDeviceInfo
- uni-getSystemInfo
- uni-getSystemSetting
- uni-openAppAuthorizeSetting
- uni-prompt
- uni-storage
- uni-rpx2px
- uni-theme

## 启动

至此，uni-app x 导入原生项目的所有配置已经完成。uni-app x的启动、退出及运行期间通讯可以参考[文档](androidcomm.md)。

