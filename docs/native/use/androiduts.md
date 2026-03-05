## 配置uts插件

资源导出成功之后，uts插件资源位于`unpackage/resource/app-android/uni_modules`下。

注意：`普通授权版`加密付费uts插件不支持通过原生SDK打包。需要拿到插件源码才可以。一般推荐购买源码授权版。

为方便区分，`uts插件`指前端封装的uni_modules插件；`android uts插件`指根据编译后的`uts插件`生成的安卓原生模块。

### 新建android uts插件模块

点击File->New->New Module...

![](https://web-ext-storage.dcloud.net.cn/native/doc/android/new_modules.png)

点击左侧`Templates`的`Android Library`。

`Language`选择`Kotlin`。

`Module name`建议与uts插件模块名称一致。

点击`Finish`。

*** 
注意：
- `Templates`一定要选择`Android Library`。
- `Language`一定要选择`Kotlin`。
- `Build configuration language`建议选择`Groovy DSL(build.gradle)`。以下教程均按照此模式进行。
***

### 修改android uts插件模块的build.gradle

#### 添加gradle插件

**uni-app可以忽略gradle插件配置。**

在build.gradle的plugins节点下添加`io.dcloud.uts.kotlin`的依赖。参考：

```groovy
plugins {
    ...
    id 'io.dcloud.uts.kotlin'
}
```

#### 添加依赖

将下面内容拷贝到build.gradle中，替换原有的`dependencies`节点。

```groovy
dependencies {
    compileOnly fileTree(include: ['*.aar'], dir: '../app/libs')
	compileOnly fileTree(include: ['*.aar'], dir: './libs')
    compileOnly "com.alibaba:fastjson:1.2.83"
    compileOnly "androidx.core:core-ktx:1.10.1"
    compileOnly 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.8'
    compileOnly 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.8'
}
```

+ **注意：uni-app需要添加如下依赖到build.gradle中**
	
	```groovy
	dependencies {
		compileOnly fileTree(include: ['*.aar'], dir: '../app/libs')
		compileOnly fileTree(include: ['*.aar'], dir: './libs')
		compileOnly 'com.alibaba:fastjson:1.1.46.android'
		compileOnly 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.10'
		compileOnly 'androidx.core:core-ktx:1.6.0'
		compileOnly 'org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.0'
		compileOnly 'org.jetbrains.kotlin:kotlin-reflect:1.6.0'
		compileOnly 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.8'
		compileOnly 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.8'
	}	
	```

****
说明：

android uts插件模块编译时也要依赖基础库。建议直接使用`uniappx`模块下的libs目录。参考：

```groovy
dependencies {
    compileOnly fileTree(include: ['*.aar'], dir: '../uniappx/libs')
	...
}
```

如果插件依赖其他内置模块，可参考：[模块配置](../modules/android/others.md)，将模块对应的配置添加到app项目下。

如果插件依赖其他uts插件，建议优先将依赖的`uts插件`配置成`android uts插件模块`。然后在当前`android uts插件模块`的build.gradle中添加依赖的插件模块。参考：

```groovy
dependencies {
    implementation project(':uts-依赖的android uts插件模块')
	...
}
```

****

### 根据config.json配置应用

如果不包含config.json文件，可以[跳过](#copyresources)此章节。

[config.json配置及参考文档。](../../plugin/uts-plugin.md#androidconfigjson)

如果config.json中不存在下面示例中的任一字段，直接忽略即可。

```json
{
	"abis": [
		"armeabi-v7a","arm64-v8a"
	],
	"dependencies": [
		"androidx.core:core-ktx:1.6.0",
		{
			"id": "com.xxx.richtext:richtext",
			"source": "implementation 'com.xxx.richtext:richtext:3.0.7'"
		}
	],
	"minSdkVersion": 21,
	"project": {
		"plugins": [
			"com.huawei.agconnect"
		],
		"dependencies": [
			"com.huawei.agconnect:agcp:1.6.0.300"
		]
	},
	"components": [{"name": "zl-text","class": "uts.sdk.modules.zlText.ZlTextComponent"}],
	"hooksClass": "uts.sdk.modules.zlText.ZlTextHook"
}
```

**注意：abis、minSdkVersion、dependencies、project在设置android uts插件模块也需要设置到app主模块中。**
- abis
	
	abis表示插件支持的CPU类型，需要将支持的CPU类型添加到android uts插件模块的build.gradle中，参考上面示例，添加内容如下：
	
	```groovy
	android {
		defaultConfig {
			ndk { abiFilters "armeabi-v7a","arm64-v8a" } // 将ndk的内容添加到指定结构下
		}
	}
	```
- minSdkVersion
	
	minSdkVersion表示最小支持的android版本。修改android uts插件模块的build.gradle中的minSdkVersion即可
	
	**注意：部分android studio生成的项目中为minSdk**
	
- dependencies
	
	dependencies为插件依赖的仓储库，需要将dependencies中的依赖添加到android uts插件模块的build.gradle中
	
	对于字符串内容，需要拼接implementation并添加到build.gradle的dependencies下。示例中"androidx.core:core-ktx:1.6.0"可以参考如下内容：
	
	```groovy
	dependencies {
		...
		implementation 'androidx.core:core-ktx:1.6.0'
	}
	```
	
	对于JSON内容，只需要将source对应的内容添加到build.gradle的dependencies下。示例中"id": "com.xxx.richtext:richtext"可以参考如下内容：
	
	```groovy
	dependencies {
		...
		implementation 'com.xxx.richtext:richtext:3.0.7'
	}
	```

- project

	project 为gradle插件的配置。
	
	plugins节点下的内容需要添加到android uts插件模块的build.gradle的plugins下。参考：
	
	```groovy
	plugins {
		...
		id 'com.huawei.agconnect'
	}
	```
	
	dependencies节点下的内容需要添加到项目根目录下的build.gradle的buildscript > dependencies中。参考：
	
	```groovy
	buildscript {
		dependencies {
			...
			classpath "com.huawei.agconnect:agcp:1.6.0.300"
		}
	}
	plugins {
		...
	}
	```
	
	<a id='utscomponents'></a>
	
- components
	
	+ **uni-app x**

		components 为uts组件的注册信息。需要将components对应的内容添加到主模块的build.gradle。参考配置：
		
		::: preview
		
		> build.gradle
	
		```groovy
		defaultConfig {
			buildConfigField "String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"zl-text\\\",\\\"class\\\":\\\"uts.sdk.modules.zlText.ZlTextComponent\\\"}]\""
		}
		```
		
		> build.gradle.kts

		```groovy
		defaultConfig {
			buildConfigField("String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"zl-text\\\",\\\"class\\\":\\\"uts.sdk.modules.zlText.ZlTextComponent\\\"}]\"")
		}
		```
		
		:::
	
		如果主模块的build.gradle已经存在UTSRegisterComponents，需要将现有配置与原有配置合并。参考：
		
		::: preview
		
		> build.gradle
	
		```groovy
		buildConfigField "String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"zl-a\\\",\\\"class\\\":\\\"zlA.ZlAComponent\\\"},{\\\"name\\\":\\\"zl-text\\\",\\\"class\\\":\\\"uts.sdk.modules.zlText.ZlTextComponent\\\"}]\""
		```
		
		> build.gradle.kts

		```groovy
		buildConfigField("String", "UTSRegisterComponents", "\"[{\\\"name\\\":\\\"zl-a\\\",\\\"class\\\":\\\"zlA.ZlAComponent\\\"},{\\\"name\\\":\\\"zl-text\\\",\\\"class\\\":\\\"uts.sdk.modules.zlText.ZlTextComponent\\\"}]\"")
		```
		
		:::
		
	
		**注意：转义符不能删掉，格式一定严格一致。**
	
	+ **uni-app**
		
		uni-app 中注册uts组件，需要将components对应的内容添加到主模块的dcloud_uniplugins.json。参考配置：
		
		```json
		{
			"nativePlugins": [{
				"plugins": [{
					"type": "component",
					"name": "zl-text",
					"class": "uts.sdk.modules.zlText.ZlTextComponent"
				}]
			}]
		}
		```
		
		**注意：dcloud_uniplugins.json位于项目的assets目录下。如果没有需要手动创建。**
	
- hooksClass
	
	hooksClass 为uts插件[应用程序生命周期函数监听。](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#android-%E5%B9%B3%E5%8F%B0)
	
	需要将hooksClass对应的内容添加到主模块的build.gradle中。参考配置
	
	::: preview
	
	> build.gradle
	
	```groovy
	defaultConfig {
		buildConfigField 'String[]', 'UTSHooksClassArray', '{\"uts.sdk.modules.zlText.ZlTextHook\"}'
	}
	```
	
	> build.gradle.kts
	
	```groovy
	defaultConfig {
		buildConfigField("String[]", "UTSHooksClassArray", "\"{\\\"uts.sdk.modules.zlText.ZlTextHook\\\"}\"")
	}
	```
	
	:::
	
	如果主模块的build.gradle已经存在UTSHooksClassArray，需要将现有配置与原有配置合并。参考：
	
	::: preview
	
	> build.gradle
	
	```groovy
	defaultConfig {
		buildConfigField 'String[]', 'UTSHooksClassArray', '{\"uts.sdk.modules.zlText.ZlTextHook\",\"uts.sdk.modules.zla.ZLAHook\"}'
	}
	```
	
	> build.gradle.kts

	```groovy
	defaultConfig {
		buildConfigField("String[]", "UTSHooksClassArray", "{\"uts.sdk.modules.zlText.ZlTextHook\",\"uts.sdk.modules.zla.ZLAHook\"}")
	}
	```
	
	:::
	
	**注意：转义符不能删掉，格式一定严格一致。**
	
	**注意：暂不支持在build.gradle中设置`applicationIdSuffix`，添加`applicationIdSuffix`会导致组件初始化失败。**

### 复制资源@copyresources

根据uts插件的资源目录，将对应的内容拷贝到android uts插件模块下。

**说明：不存在的目录可以不处理。**

#### libs

拷贝uts插件libs下的库到android uts插件模块的libs下，并在android uts插件模块的build.gradle下添加依赖。

```groovy
dependencies {
    ...
	compileOnly fileTree(include: ['*.aar','*.jar'], dir: './libs')
}
```

**注意：uts插件的本地libs下的依赖同样也需要添加到主模块中。**

#### assets

如果存在assets目录，需要将assets文件夹拷贝到`android uts插件模块/src/main/`目录下。

#### res

如果存在res目录，需要将res文件夹拷贝到`android uts插件模块/src/main/`目录下。

#### AndroidManifest.xml

如果存在AndroidManifest.xml文件，需要将AndroidManifest.xml拷贝到`android uts插件模块/src/main/`目录下。

注意：如果AndroidManifest.xml中设置了package字段，必须将此字段删除并将package的内容设置到build.gradle的`namespace`。

#### src

将src目录下的所有文件拷贝到`android uts插件模块/src/main/java`目录下。

### 添加到主项目

将android uts插件模块的依赖添加到主模块和`uniappx`模块的build.gradle的依赖中

::: preview

> build.gradle

```groovy
dependencies {
    ...
	// uts-progressNotification为示例，实际中你需要将uts-progressNotification替换成自己的模块名称
	implementation project(':uts-progressNotification')
}
```

> build.gradle.kts

```groovy
dependencies {
    ...
	// uts-progressNotification为示例，实际中你需要将uts-progressNotification替换成自己的模块名称
	implementation(project(":uts-progressNotification"))
}
```
