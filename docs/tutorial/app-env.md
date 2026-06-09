# app平台 uni-app x 项目云端打包环境  

> uni-app 项目云端打包环境参考[这里](https://uniapp.dcloud.net.cn/tutorial/app-env.html)

## Android平台云端打包环境  

> 使用 gradle 脚本编译  

### HBuilderX5.09及以上版本云端打包环境
- Android 编译 SDK（compileSdk）： 36  
- Android 构建工具（buildToolsVersion）：35.0.0  
- Gradle：8.14.3  
- Android Gradle 插件（com.android.tools.build:gradle）：8.12.0  
- Kotlin Android 插件（org.jetbrains.kotlin.android）：2.2.0  
- JDK：17 （[Amazon corretto 17.0.12.7.1](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/what-is-corretto-17.html)）  

### HBuilderX4.81及以上版本云端打包环境
- Android 编译 SDK（compileSdk）： 35  
- Android 构建工具（buildToolsVersion）：35.0.0  
- Gradle：8.14.3  
- Android Gradle 插件（com.android.tools.build:gradle）：8.12.0  
- Kotlin Android 插件（org.jetbrains.kotlin.android）：2.2.0  
- JDK：17 （[Amazon corretto 17.0.12.7.1](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/what-is-corretto-17.html)）  

### HBuilderX4.76及以下版本云端打包环境
- Android 编译 SDK（compileSdk）： 35  
- Android 构建工具（buildToolsVersion）：35.0.0  
- Gradle：8.11.1  
- Android Gradle 插件（com.android.tools.build:gradle）：8.7.3  
- Kotlin Android 插件（org.jetbrains.kotlin.android）：1.9.10  
- JDK：17 （[Amazon corretto 17.0.12.7.1](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/what-is-corretto-17.html)）  

### HBuilderX4.57及以下版本云端打包环境
- Android 编译 SDK（compileSdk）： 34  
- Android 构建工具（buildToolsVersion）：34.0.0  
- Gradle：8.5  
- Android Gradle 插件（com.android.tools.build:gradle）：8.2.2  
- Kotlin Android 插件（org.jetbrains.kotlin.android）：1.9.10  
- JDK：17 （[Amazon corretto 17.0.12.7.1](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/what-is-corretto-17.html)）  

### 默认仓储服务器地址@repositories  
云端打包环境默认使用以下仓储服务器：  
```groovy
  repositories {
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/public' }

    google()
    mavenCentral()
    maven { url 'https://jitpack.io' }
    maven { url 'https://developer.huawei.com/repo/' }
    maven { url 'https://developer.hihonor.com/repo/' }
    maven { url 'https://mvn.getui.com/nexus/content/repositories/releases/' }
  }

```

**注意**  
HBuilderX4.36+版本开始uts插件支持添加自定义仓储服务器，详情参考：uts插件开发中的[Android原生配置](../plugin/uts-plugin.md#androidconfigjson)。  


## iOS平台云端打包环境  

> 使用 XCode 的 xcodebuild 命令编译  

**从2026年3月12号开始HBuilderX4.76及以上alpha版本云端打包环境已升级为XCode26**  
**从2026年3月22号开始HBuilderX4.66及以上release版本云端部分打包机环境升级为XCode26**
- XCode: 26.3  
- iOS SDK: 26.2  
- pod仓库：https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  

### HBuilderX5.05及以上版本云端打包环境
- XCode: 26.3  
- iOS SDK: 26.2  
- pod仓库：https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  

**更新XCode26.3后最低支持iOS13系统**

### HBuilderX4.41及以上版本云端打包环境
- XCode: 16.1  
- iOS SDK: 18.1  
- pod仓库：https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  

### HBuilderX4.36及以下版本云端打包环境（不推荐使用）
- XCode：15.4  
- iOS SDK：17.5  
- pod仓库：https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git  

