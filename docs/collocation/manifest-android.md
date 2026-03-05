# 安卓App配置

## 图标配置 @icon  

应用图标是在手机上安装应用后显示在桌面的图标，可在 manifest.json 的可视化界面配置：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_icon.png)

如果不配置，默认使用以下图标：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_icon_default.png)#{width="96px"}  

**注意**
- 修改或配置图标后需提交云端打包才能生效


### 圆形图标配置 @iconround  
Android8及以上系统在Google Pixel手机中应用图标在某些地方是圆形的，仅配置普通图标会导致显示较小，可通过以下方法配置适配：

- 在项目的AndroidManifest.xml中的application节点添加android:roundIcon属性配置应用使用圆形图标  
  ```xml
  <?xml version="1.0" encoding="utf-8"?>  
  <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
    <application
      android:roundIcon="@drawable/icon_round" >
    </application>
  </manifest>
  ```

- 在项目的nativeResources\android\res\drawable-xxhdpi目录下添加圆形图标文件icon_round.png

> 注意：需提交云端打包后才能生效  


## 启动界面 @splashscreen  
App启动时，系统加载应用渲染首页需要一定的时间，为了避免用户等待，手机操作系统提供了特殊的启动界面设计，让用户先看到一个简单的界面，等应用加载完成后正式进入应用首页。

这个界面，即被称为启动封面，也成称为 splash。

当然并非所有App都需要splash，很多系统应用比如计算器、日历都没有splash。

uni-app x中，如不配置splash，则与计算器等应用一致，启动时有轻微闪白，但可以让用户更快的使用首页。

如需配置splash，注意避免splash图与首页风格差异太大。因为uni-app x启动速度非常快，splash只是一闪而过，如果颜色差异太大，会让用户视觉不舒服。

> HBuilderX 3.99+ 版本支持配置启动界面  
> HBuilderX 4.71 及以上版本Andrid平台可视化界面设置调整到`安卓App配置`项中

uni-app x 的 app-android 平台，启动界面有以下策略：
- 不配置
- 启动图片
- Google SplashScreen

### 启动图配置 @splascreenDefault  

打开项目的manifest.json文件，在可视化界面中配置各分辨率启动图：  

- HBuilderX 4.71 及以上版本  
  在 “安卓App配置” 的 “启动界面配置” -> “启动图配置” 中设置  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android.png)#{width="800px"}  

- HBuilderX 4.71 以下版本  
  在 “安卓/iOS启动界面配置” 的 “Android启动图设置” 中设置  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_old.png)#{width="800px"}  

> 推荐使用`.9.png`来适配不同分辨率。

#### .9.png图 @9png  

manifest虽然可以定义3种标准分辨率的启动图配置，而实际上存在很多不同分辨率的手机，导致启动图在一些不常见的设备会进行拉伸或压缩引起变形。

为了解决此问题，Google推出了可以适配各种尺寸的一种图片格式“.9.png”。它可以指定特定的区域进行拉伸而不失真。

**使用.9.png的优点**
1. 避免在非标准分辨率手机上缩放变形
2. 可以只配置1张或多张图片适配更多分辨率，减少apk的体积（推荐至少配置1080P高分屏启动图片）

**.9.png图片和普通png图片的差异**
1. .9.png图片和一般图片的区别在于.9.png图片有四条黑边，而一般的图片没有，这四条黑边就是用来拉伸和指定显示位置的
2. 使用.9.png图片后，整个图片应该是包裹着你想要显示的内容的，而没有使用的话整个图片将会被拉伸

**制作.9.png图片**
Android Studio 已经集成 .9.png 图片编辑工具，使用详情可参考 Android 官方文档：[Create resizable bitmaps (9-patch files)](https://developer.android.google.cn/studio/write/draw9patch)  

详细制作步骤可参考链接：[Android中.9图片的含义及制作教程](https://www.jianshu.com/p/3fd048644e3f)

也可以使用在线.9.png生成工具：[http://inloop.github.io/shadow4android/](http://inloop.github.io/shadow4android/)

>.9.png作为启动图使用时注意以下事项：  
> 不要使用圆角图，图片内容区域不要包含透明信息（4条黑边可以有透明信息）  
> 为了有更好的兼容性，右侧和底部黑边应该拉满完整区域，不拉满可能在部分设备会显示灰色区域  

**.9.png配置使用**
打开项目的manifest.json文件，在“App启动界面配置”中的“Android启动界面设置”项下，在各分辨率启动图设置框选择需要使用的.9.png图片（图片尺寸请按照提示尺寸对应上传），保存后提交云端打包即可。
> 不同尺寸的启动图是为了适配不同分辨率的手机，所以提交打包时请务必上传不同尺寸的启动图，切忌上传多张同尺寸启动图

可以参考开发者在[插件市场](https://ext.dcloud.net.cn/search?q=.9)做好的.9样例工程

### Google SplashScreen配置 @splashscreenAndroid12

Android 12（API 31）开始强制开启 [SplashScreen](https://developer.android.google.cn/guide/topics/ui/splash-screen?hl=zh-cn) 。

这个启动界面不是静态图片，而是自定义启动封面的背景颜色、居中logo图标、底部品牌图标。

如果不配置SplashScreen，在Android 12及以上系统的官方Rom和部分三方Rom上，默认会显示白色背景+居中的应用图标，不会显示配置的splash启动图。

但大部分国产Rom默认关闭了这个效果。所以这是一个非常碎片化的问题，在不同的Android版本、不同的Rom上有差异。

海外手机大多支持SplashScreen，而国内手机大多不支持。

在支持的Rom上表现形式如下图，启动后会看到下面的界面，然后直接进入应用主页。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_example.png)#{width="480px"}

项目的manifest.json文件中，在“App启动界面配置”中的“Google SplashScreen配置”项下，可以配置背景颜色及各设备分辨率的居中logo图标、底部品牌图标。

#### 配置启动界面背景颜色  

可选配置，默认白色。系统设置为暗色模式时默认为黑色。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_bg.png)

**适配暗色模式**  
可单独设置暗色模式下的启动界面背景色。如果仅设置了默认背景色，则暗黑模式下也使用默认背景色。  

- HBuilderX 4.75 及以上版本  
  可通过`源码视图`在 "app-android" -> "distribute" -> "splashScreens" 下添加 "background@night" 节点，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "splashScreens": {
          "background@night": "#000000"
        }
      }
    }
  }
  ```


::: warning 注意事项

HBuilderX4.75及以上版本，如果没有配置启动图，配置启动界面背景颜色在Android12以下设备生效；如果配置启动图则背景颜色仅在Android12及以上设备生效。  
:::

#### 配置启动界面中部Logo图标  

可选配置，默认为应用启动图标。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_logo.png)

- 带有图标背景的Logo图标  
  Logo图标尺寸必须为 240×240 dp，并且位于直径 160 dp 的圆圈内，圆圈以外的所有内容将不可见（被遮盖）。  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_logo_dim.png)  
  对应以下密度屏幕的分辨率：
  + xhdpi（320dpi）  
    Logo图标分辨率为 480x480 px，并且位于直径 320 px 的圆圈内  
  + xxhdpi（480dpi）  
    Logo图标分辨率为 720x720 px，并且位于直径 480 px 的圆圈内  
  + xxxhdpi（640dpi）  
    Logo图标分辨率为 960x960 px，并且位于直径 640 px 的圆圈内  

- 无图标背景的Logo图标  
  Logo图标尺寸必须为 288×288 dp，并且位于直径 192 dp 的圆圈内，圆圈以外的所有内容将不可见（被遮盖）。  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_logo_trandim.png)  
  对应以下密度屏幕的分辨率：
  + xhdpi（320dpi）  
    Logo图标分辨率为 576x576 px，并且位于直径 384 px 的圆圈内  
  + xxhdpi（480dpi）  
    Logo图标分辨率为 864x864 px，并且位于直径 576 px 的圆圈内  
  + xxxhdpi（640dpi）  
    Logo图标分辨率为 1152x1152 px，并且位于直径 768 px 的圆圈内  

> 如需适配其它分辨率设备，可在项目 nativeResources -> android -> res 目录下添加对应 drawable 目录，放置名称为 `uniappx_splashscreen_icon.png` 的Logo图标  

#### 配置启动界面底部品牌图标  

可选配置，默认底部不显示品牌图标。

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_android_brand.png)

底部品牌图标尺寸必须为 200x80 dp，对应以下密度屏幕的分辨率：
  + xhdpi（320dpi）  
    品牌图标分辨率为 400x160 px  
  + xxhdpi（480dpi）  
    品牌图标分辨率为 600x240 px  
  + xxxhdpi（640dpi）  
    品牌图标分辨率为 800x320 px  

> 如需适配其它分辨率设备，可在项目 nativeResources -> android -> res 目录下添加对应 drawable 目录，放置名称为 `uniappx_splashscreen_brand.png` 的品牌图标  


**Tips**

+ Android启动图设置需提交云端打包后才能生效
+ 配置Android 12应用启动界面后仅影响Android 12及以上版本应用启动界面，Android 12以下版本依然使用启动图展示splash
+ Android 12启动界面中部logo图标在部分系统设备会被裁剪成圆形，部分设备不会裁剪，需要注意圆形logo适配

### 不同Splash方式的选择参考 @splashscreenSelect  

Splash是因为主界面渲染慢，给用户一个等待过渡。但注意复杂的Splash，也一样会影响启动速度。

1. 如不需要splash

不配置启动图，在SplashScreen中配置一个小的白色Logo图。\
这样在所有Rom中启动都不会有splash效果。\
如果不在SplashScreen配置白色小图，那么在支持SplashScreen的Rom上，启动会在中间渲染App的icon图标。当然这样一个小图也不会占用太多渲染资源。

2. 如需要splash

那么首先需要配置启动图，确保不支持SplashScreen的手机上显示这个启动图。\
然后Google SplashScreen配置中配置背景色、居中Logo图标和底部品牌图标，在支持SplashScreen的手机上，启动封面会变成这个效果。

3. 如只配启动图会怎么样？

在不支持SplashScreen的手机上，会显示启动图；在支持SplashScreen的手机上，不会显示启动图，而是会显示白底（暗黑模式显示黑底）背景+居中应用图标。

4. 如只配置SplashScreen会怎么样？

在支持SplashScreen的手机上会显示您的配置。在不支持SplashScreen的手机上会闪白，相当于没有Splash效果。

5. 为什么不能像uni-app js引擎版那样提供一个转圈logo的默认Splash来简化这个事情？

uni-app js引擎版的Android App启动时那个默认的logo转圈效果，其实不是splash，是应用启动后原生view绘制的一个动画。所以点击桌面应用图标后界面不会立即有反应。这个设计影响启动速度，在uni-app x上被废弃了。

### Android平台splash关闭时机 @splashscreenClose  

splash默认是在首页onShow时关闭。但可配置，打开项目的manifest.json文件，选择源码视图，在app->splashScreen节点下设置autoClose值域，控制splash关闭时机，默认onShow。

**autoClose取值范围:**

|值域		|说明																		|
|--			|--																			|
|onShow	|首页页面生命周期触发onShow时关闭splash	|
|onReady|首页页面生命周期触发onReady时关闭splash|

onReady触发时机要比onShow晚一些。

暂不支持其他方式关闭splash。

配置示例：

- HBuilderX 4.71 及以上版本  
  ```json
  {
    "app-android" : {
      "splashScreen" : {
        "autoClose" : "onReady"
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  ```json
  {
    "app" : {
      "splashScreen" : {
        "autoClose" : "onReady"
      }
    }
  }
  ```

::: warning 注意
- splash关闭时机中描述的`首页`，指的是第一个真正显示的页面，如项目中pages.json第一个页面A在onLoad生命周期被关闭重新跳转了一个新页面B并显示，则B页面就是`首页`，原因是显示的是页面B，A页面并未显示，
如果是在页面A的onShow或更晚的生命周期关闭在跳转或直接跳转，则页面A是`首页`，因为页面A已经显示符合第一个真正显示的页面。  
- splash关闭后才显示开屏广告  
:::

### 不同启动方式对splash的影响 @splashscreenStart  

应用的启动有冷启动、温启动、切换到前台，这三种方式splash展示时间是有区别的。

1. 应用冷启动\
指首次启动或被kill掉进程后的启动，冷启动时初始化环境，数据加载等会占用一些启动时间，所以splash展示时间长一些。

2. 切换至前台\
应用未被关闭，再次启动只是激活到前台，此时不显示splash。

3. 温启动\
指应用的activity退出但进程仍未被手机系统回收。此时启动，由于不会再初始化环境，加载数据等操作，所以相对启动时间较少，splash展示时间也会缩短。

由于uni-app x默认在app.uvue里使用了uni.exit，这种退出方式只关闭了activity，没有关闭应用进程。如果rom没有回收掉App进程时再启动该App，就会触发温启动。此时splash会一闪而过。

当然App如何退出是开发者自己定义的。很多Android App直接单击back隐藏在后台，不弹toast询问用户是否退出。此时也可以避免温启动的splash快闪。这种方式的开发详见[切换应用到后台](../api/exit.md#back)。


## 可选模块配置 @modules  

> HBuilderX 4.71 及以上版本支持可视化界面配置  

### uni-location（定位） @modulesLocation  

定位相关功能使用 [provider机制](../api/provider.md) 实现，uni-app x 项目中使用 [uni.getLocation](../api/get-location.md)，[uni.onLocationChange](../api/location-change.md#onlocationchange)，[uni.offLocationChange](../api/location-change.md#offlocationchange) 等API时依赖此模块。

支持以下定位 provider ：

#### 系统定位 @locationSystem  
使用系统自带定位功能，由ROM系统实现。使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “可选模块配置” -> “uni-location（定位）” 中勾选 “系统定位”：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_location_system.png)

  也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" -> "uni-location" 下添加 "system" 节点，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-location":{
            "system":{}
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-location" 下添加 "system" 节点，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-location":{
            "system":{}
          }
        }
      }
    }
  }
  ```

#### 腾讯定位 @locationTencent  
使用 [腾讯位置服务](https://lbs.qq.com/) 的 “Android定位SDK” 实现，使用前需申请Key。

> 同时使用 [腾讯地图](#mapTencent) 时，要求使用相同的Key  

使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “可选模块配置” -> “uni-location（定位）” 中勾选 “腾讯定位” 并配置 Key：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_location_tencent.png)

  **配置参数**  
  + Key  
    [腾讯位置服务](https://lbs.qq.com/)后台申请的Key  

  也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" -> "uni-location" 下添加 "tencent" 节点，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-location":{
            "tencent":{
              "key": "%从腾讯位置服务申请的Key%"
            }
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-location" 下添加 "tencent" 节点，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-location":{
            "tencent":{}
          }
        }
      }
    }
  }
  ```

  > HBuilder 4.71 以下版本不支持在 manifest.json 中配置 `腾讯位置服务` 申请的 Key，需在项目根目录下添加 [AndroidManifest.xml](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#%E5%BA%94%E7%94%A8%E6%B8%85%E5%8D%95%E6%96%87%E4%BB%B6-androidmanifest-xml) 文件，将 Key 配置到 application 下的 meta-data 节点中，如下示例：

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools"
  >
    <application>

      <!-- 将申请到的 Key 配置在 android:value 属性中 -->
      <meta-data android:name="TencentMapSDK" android:value="%从腾讯位置服务申请的Key%" />

    </application>

  </manifest>
  ```


### uni-map（地图） @modulesMap  

uni-app x 项目中使用 [map](../component/map.md) 组件，[uni.chooseLocation](../api/choose-location.md) API时依赖此模块。  

地图是商业服务，授权较贵，如需购买，请点击[获取优惠](https://ask.dcloud.net.cn/explore/map/)。  

#### 腾讯地图 @mapTencent  

使用 [腾讯位置服务](https://lbs.qq.com/) 的 “Android地图SDK” 实现，使用前需申请Key，并在腾讯后台申请 Key 界面勾选“SDK”。  

> 同时使用 [腾讯定位](#locationTencent) 时，要求使用相同的Key  

使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “可选模块配置” -> “uni-map（地图）” 中勾选 “腾讯地图” 并配置 Key：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_map_tencent.png)

  **配置参数**  
  + Key  
    [腾讯位置服务](https://lbs.qq.com/)后台申请的Key  

  也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" -> "uni-map" 下添加 "tencent" 节点配置，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-map":{
            "tencent":{
              "key": "%从腾讯位置服务申请的Key%"
            }
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-map" 下添加 "tencent" 节点，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-map":{
            "tencent":{}
          }
        }
      }
    }
  }
  ```

  > HBuilder 4.71 以下版本不支持在 manifest.json 中配置从 `腾讯位置服务` 申请的 Key，需在项目根目录下添加 [AndroidManifest.xml](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#%E5%BA%94%E7%94%A8%E6%B8%85%E5%8D%95%E6%96%87%E4%BB%B6-androidmanifest-xml) 文件，将 Key 配置到 application 下的 meta-data 节点中，如下示例：

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools"
  >
    <application>

      <!-- 将申请到的 Key 配置在 android:value 属性中 -->
      <meta-data android:name="TencentMapSDK" android:value="%从腾讯位置服务申请的Key%" />

    </application>

  </manifest>
  ```


### uni-payment（支付） @modulesPayment  

请求支付功能使用 [provider机制](../api/provider.md) 实现，uni-app x 项目中使用 [uni.requestPayment](../api/request-payment.md) API时依赖此模块。

支持以下支付 provider ：

#### 支付宝支付 @paymentAlipay  
使用 “App支付宝客户端SDK” 实现。使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “可选模块配置” -> “uni-payment（支付）” 中勾选 “支付宝支付”：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_payment_alipay.png)

  也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" -> "uni-payment" 下添加 "alipay" 节点配置，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "alipay":{}
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-payment" 下添加 "alipay" 节点，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "alipay":{}
          }
        }
      }
    }
  }
  ```


#### 微信支付 @paymentWeixin  
使用 “微信 Open SDK for Android” 实现，使用前需到[微信开放平台](https://open.weixin.qq.com/)创建移动应用并在开发配置中正确配置`Android应用`的包名和签名。

在uni-app x项目中使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “可选模块配置” -> “uni-payment（支付）” 中勾选 “微信支付”：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_payment_wxpay.png)

  也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" -> "uni-payment" 下添加 "wxpay" 节点，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "wxpay":{}
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-payment" 下添加 "wxpay" 节点，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "wxpay":{}
          }
        }
      }
    }
  }
  ```


### uni-barcode-scanning（相机组件扫码）@modulesscan  
> HBuilderX 4.71 及以上版本新增支持  

[camera相机](../component/camera.md)组件的`mode`属性，支持配置扫码模式（scanCode），需勾选此扫码模块。  

在uni-app x项目中使用此模块，需在manifest.json中配置。  

可视化界面操作在 “安卓App配置” 的 “可选模块配置” 勾选 “uni-barcode-scanning（相机组件扫码）”模块：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_barcodescan.png)

也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" 下添加 "uni-barcode-scanning" 节点，如下示例：
```json
{
  "app-android": {
    "distribute": {
      "modules": {
        "uni-barcode-scanning":{}
      }
    }
  }
}
```

### uni-push（消息推送） @modulespush  
> HBuilderX 4.71 及以上版本新增支持配置厂商推送SDK  

uni-push是DCloud与合作伙伴个推共同推出的统一推送服务。  
包括在线推送、离线推送，离线推送聚合了Apple、华为、小米、OPPO、VIVO、魅族、荣耀(3.99+)、Google等多个手机厂商的推送通道。  
如果在 manifest.json 中不勾选`uni-push（消息推送）`模块，云端打包会根据摇树结果决定是否包含此模块，若摇树结果需要使用此模块，会根据uni-push后台配置的离线推送厂商通道自动添加对应的厂商推送SDK。  
如果在manifest.json 中勾选`uni-push（消息推送）`模块，云端打包则根据 manifest.json 中的配置添加厂商推送SDK。  

可视化界面操作在 “安卓App配置” 的 “可选模块配置” 勾选 “uni-push（消息推送）”模块，根据需求勾选厂商推送SDK：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_unipush.png)

也可通过`源码视图`在 "app-android" -> "distribute" -> "modules" 下添加 "uni-barcode-scanning" 节点，如下示例：
```json
{
  "app-android": {
    "distribute": {
      "modules": {
				"uni-push": {
          "hms": {},    //华为厂商推送SDK
          "oppo": {},   //OPPO厂商推送SDK
          "vivo": {},   //VIVO厂商推送SDK
          "xiaomi": {}, //小米厂商推送SDK
          "meizu": {},  //魅族厂商推送SDK
          "honor": {},  //荣耀厂商推送SDK
          "fcm": {}     //Google FCM推送SDK
        }
      }
    }
  }
}
```


**注意**
- 配置或修改可选模块配置后需提交云端打包才能生效



## 权限配置 @permissions  

uni-app x项目使用[uni内置模块](./manifest-modules.md#utsmodules)时，云端打包会自动添加模块、插件声明需要的Android权限，也可以额外添加或强制移除某些权限。

> HBuilderX4.54以前的版本，需在项目的[AndroidManifest.xml](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#permissions)中手动编辑添加Android权限  
> HBuilderX4.54及以上版本，支持在项目的 manifest.json 中配置额外添加或强制移除Android权限  

### 额外添加的权限 @incloudpermissions  

应用云端打包时，如果希望额外添加Android权限，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “权限配置” -> “额外添加的权限” 中添加：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_permissions.png)

  也可通过`源码视图`在 "app-android" -> "distribute" 下添加 "permissions" 节点，如下示例配置应用额外添加 android.permission.REQUEST_INSTALL_PACKAGES 权限：  
  ```json
  {
    "app-android": {
      "distribute": {
        "permissions": [
          "<uses-permission android:name=\"android.permission.REQUEST_INSTALL_PACKAGES\"/>"
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "android" 下添加 "permissions" 节点，如下示例配置应用额外添加 android.permission.REQUEST_INSTALL_PACKAGES 权限：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "permissions": [
            "<uses-permission android:name=\"android.permission.REQUEST_INSTALL_PACKAGES\"/>"
          ]
        }
      }
    }
  }
  ```

**注意**  
- `源码视图`设置时 android:name 字段值使用的双引号前面需要加转义斜线“\”  
- 配置或修改权限后需提交云端打包才能生效  

### 强制移除的权限 @excludepermissions  

应用云端打包时，如果希望不包含内置模块、插件声明需要的Android权限，可在manifest.json中配置需强制移除的权限：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “权限配置” -> “强制移除的权限” 中添加：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_permissions_exclude.png)

  也可通过`源码视图`在 "app-android" -> "distribute" 下添加 "excludePermissions" 节点，如下示例配置应用强制移除 android.permission.READ_MEDIA_IMAGES、android.permission.READ_MEDIA_VIDEO 权限：  
  ```json
  {
    "app-android": {
      "distribute": {
        "excludePermissions": [
          "<uses-permission android:name=\"android.permission.READ_MEDIA_IMAGES\"/>",
          "<uses-permission android:name=\"android.permission.READ_MEDIA_VIDEO\"/>"
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "android" 下添加 "excludePermissions" 节点，如下示例配置应用强制移除 android.permission.READ_MEDIA_IMAGES、android.permission.READ_MEDIA_VIDEO 权限：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "excludePermissions": [
            "<uses-permission android:name=\"android.permission.READ_MEDIA_IMAGES\"/>",
            "<uses-permission android:name=\"android.permission.READ_MEDIA_VIDEO\"/>"
          ]
        }
      }
    }
  }
  ```

**注意**  
- `源码视图`设置时 android:name 字段值使用的双引号前面需要加转义斜线“\”  
- 强制移除的权限优先级高于额外添加的权限，也就是某个权限如果同时配置了额外添加和强制移除，最终打包结果是移除此权限  
- 配置或修改权限后需提交云端打包才能生效  


## minSdkVersion @minsdkversion  

> HBuilderX 4.71 及以上版本支持可视化配置 minSdkVersion  

minSdkVersion用于指定应用兼容的最低Android版本（API等级），uni-app x 项目默认值为21（即最低支持Android5）。 如果APP某些功能无法支持低版本Android系统的设备，可以配置minSdkVersion确保APP只能安装到指定Android版本及以上的设备。

minSdkVersion值为Number类型，且必须为正整数，取值范围参考[Android版本列表](#apilevellist)中的API等级。

> App升级时 minSdkVersion 只能增加不能降低，也就是说 minSdkVersion 高的App无法被 minSdkVersion 低的App覆盖安装，开发者需要注意！

如需更改此值，可在项目 manifest.json 文件中配置： 

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “安卓App配置” 的 “miniSdkVersion” 中设置，如下示例配置 miniSdkVersion 值为 26（Android 8）：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_miniSdkVersion.png)

  也可通过`源码视图`在 "app-android" -> "distribute" 节点配置 miniSdkVersion  
  ```json
  {
    "app-android": {
      "distribute": {
          "minSdkVersion": 26
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 minSdkVersion，如下示例：    
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "minSdkVersion": 26
        }
      }
    }
  }
  ```

**注意**  
- 配置或修改 miniSdkVersion 后需提交云端打包才能生效  


## targetSdkVersion @targetsdkversion  

> HBuilderX 4.71 及以上版本支持可视化配置 targetSdkVersion  

targetSdkVersion用于指定应用的目标Android版本（API等级），uni-app x 项目默认值为32（即Android12L）。

设置targetSdkVersion值表示App适配的Android版本（API等级），设置低版本的targetSdkVersion会使APP兼容模式运行，也就可能无法用到新系统的特性，甚至在兼容模式下运行可能存在安全漏洞等问题。 随着Android系统的升级，一些应用市场会要求设置较高的targetSdkVersion才可以提交，HBuilderX中可在项目的manifest.json中进行配置。

targetSdkVersion值为Number类型，且必须为正整数，取值范围参考[Android版本列表](#apilevellist)中的API等级。

> App升级时 targetSdkVersion 只能增加不能降低，也就是说 targetSdkVersion 高的App无法被 targetSdkVersion 低的App覆盖安装，开发者需要注意！
> Android 15 设备对 targetSdkVersion 版本有要求，低于24无法正常在android 15设备上正常安装，开发者需要注意！

如需更改此值，可在项目 manifest.json 文件中配置：  

- HBuilderX 4.71 及以上版本  
  打开项目的manifest.json文件，在 “安卓App配置” 的 “targetSdkVersion” 中设置，如下示例配置 targetSdkVersion 值为 35（Android 15）：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_targetSdkVersion.png)

  也可通过`源码视图`在 "app-android" -> "distribute" 节点配置 targetSdkVersion  
  ```json
  {
    "app-android": {
      "distribute": {
          "targetSdkVersion": 35
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 targetSdkVersion，如下示例配置 targetSdkVersion 值为 35（Android 15）：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "targetSdkVersion": 35
        }
      }
    }
  }
  ```

**注意**
- 配置 targetSdkVersion 需提交云端打包才能生效


## URL Schemes @urlSchemes  

> HBuilderX 4.71 及以上版本支持可视化配置 URL Schemes  
> HBuilderX 4.71 以下版本未提供 URL Schemes 配置，需在 app 原生应用配置文件中进行设置，详情参考：[Android平台 URL Schemes 配置](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#urlscheme)。

打开项目的manifest.json文件，在 “安卓App配置” 的 “URL Schemes” 中设置，如下示例配置 myapp 和 helloapp 两个值：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_urlschemes.png)

**注意**
- uni-app x项目标准基座已配置 URL Scheme 值："uniappx"
- 配置 URL Schemes 需提交云端打包才能生效

标准基座可通过此网页体验 URL Scheme 启动 App：[https://uniappx.dcloud.net.cn/scheme.html](https://uniappx.dcloud.net.cn/scheme.html)


## 应用支持CPU类型（abiFilters） @abifilters  

> HBuilderX 4.71 及以上版本支持可视化配置 abiFilters  

Android平台配置CPU类型针对的是为了提高运行效率使用C/C++语言开发生成的so库，需要为各cpu类型平台单独编译生成对应指令的so库。Java语言开发的代码运行在虚拟机中，由虚拟机适配CPU类型，不涉及到此问题。

uni-app x 项目已适配支持以下主流CPU类型：  
- armeabi-v7a  
  第7代及以上的ARM处理器（ARM32位），大多数老手机使用此CPU类型
- arm64-v8a  
  第8代、64位ARM处理器（ARM64位），2017年后发布的设备使用此CPU类型，可以兼容使用armeabi-v7a的so库  
  2022年8月国内应用商店要求新上架的应用必须兼容64为ARM硬件  
- x86  
  少部分平板使用x86，AS模拟器中选了intel x86时使用x86处理器，以及其它常用三方模拟器通常使用x86
- x86_64
  部分平板使用，大多数模拟器使用64为的x86处理器

uni-app x 项目云端打包默认仅包含“arm64-v8a”，如需支持其它CPU类型，可在项目 manifest.json 文件中配置。  

- HBuilderX 4.71 及以上版本  
  打开项目的manifest.json文件，在 “安卓App配置” 的 “应用支持CPU类型（abiFilters）” 中设置：
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/android_abifilters.png)

  也可通过`源码视图`在 "app-android" -> "distribute" 节点配置 abiFilters，如下示例配置支持 armeabi-v7a、arm64-v8a、x86、x86_64 CPU类型：  
  ```json
  {
    "app-android": {
      "distribute": {
        "abiFilters": [
          "armeabi-v7a",
          "arm64-v8a",
          "x86",
          "x86_64"
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 abiFilters，如下示例配置支持 armeabi-v7a、arm64-v8a、x86、x86_64 CPU类型：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "abiFilters": [
            "armeabi-v7a",
            "arm64-v8a",
            "x86",
            "x86_64"
          ]
        }
      }
    }
  }
  ```

**注意**
- 支持的CPU类型越多，安装包会越大  
- 使用uts插件时，如果插件也包含或依赖使用了so库，需确认插件是否支持配置CPU类型，如果插件不支持可能会导致应用运行异常  
- 配置 abiFilters 需提交云端打包才能生效

## 渠道信息配置 @channel  

> HBuilder4.31版本新增支持

uni-app x 的渠道信息配置，云端需在“App打包”界面配置，详情参考[配置渠道包](../tutorial/app-package.md#channel)。

离线打包时需在原生工程中配置，详情参考[Android平台配置应用渠道包](../native/use/android.md#androidmanifest)。


## manifestPlaceholders @manifestplaceholders  

manifest.json中不提供配置 `manifestPlaceholders` 数据，如果应用使用的插件或三方SDK需要使用，可在项目的 `nativeResources/android/manifestPlaceholders.json` 文件中配置，详情参考[Android原生应用清单文件和资源](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-android.html#manifestplaceholders)。


## enableResourceOptimizations @enableresourceoptimizations  

> HBuilder4.33版本新增支持 enableResourceOptimizations 配置项

Android平台云端打包时原生工程 gradle.properties 的 android.enableResourceOptimizations 配置项，配置是否开启Android原生res资源文件优化，开启后res资源文件名称会被混淆，默认值为 ture，如不希望混淆原生res资源文件名称，可在项目 manifest.json 文件的`源码视图`配置：

- HBuilderX 4.71 及以上版本  
  需通过`源码视图`在 "app-android" -> "distribute" -> "android" 节点配置 enableResourceOptimizations，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "enableResourceOptimizations": false
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 enableResourceOptimizations，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "enableResourceOptimizations": false
        }
      }
    }
  }
  ```

**注意**  
- 配置 enableResourceOptimizations 需提交云端打包才能生效


## aaptOptions @aaptoptions  

> HBuilder4.31版本新增支持

Android平台云端打包时原生工程应用 build.gradle 的 aaptOptions配置项，支持的属性参考：[Android官方文档](https://developer.android.google.cn/reference/tools/gradle-api/7.1/com/android/build/api/dsl/AaptOptions?hl=en)。  

需在项目 manifest.json 文件的`源码视图`配置：  

- HBuilderX 4.71 及以上版本  
  需通过`源码视图`在 "app-android" -> "distribute" -> "android" 节点配置 aaptOptions，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "aaptOptions": [
            "noCompress 'png', 'jpg', 'jpeg'"  //配置禁止对 png、jpg、jpeg格式的文件进行压缩
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 aaptOptions，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "aaptOptions": [
              "noCompress 'png', 'jpg', 'jpeg'"  //配置禁止对 png、jpg、jpeg格式的文件进行压缩
          ]
        }
      }
    }
  }
  ```

**注意**  
- 云端打包默认包含以下配置：  
 + additionalParameters '--auto-add-overlay'
 + ignoreAssetsPattern '!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~'
- 配置 aaptOptions 需提交云端打包才能生效

## buildFeatures @buildfeatures  

> HBuilder4.31版本新增支持

Android平台云端打包时原生工程应用 build.gradle 的 buildFeatures 配置项，支持的属性参考：[Android官方文档](https://developer.android.google.cn/reference/tools/gradle-api/7.1/com/android/build/api/dsl/BuildFeatures?hl=en)。  

需在项目 manifest.json 文件的`源码视图`配置：  

- HBuilderX 4.71 及以上版本  
  需通过`源码视图`在 "app-android" -> "distribute" 节点配置 buildFeatures，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "buildFeatures": [
          "viewBinding true",  //开启dataBinding
          "dataBinding true"   //开启viewBinding
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 buildFeatures，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "buildFeatures": [
            "viewBinding true",  //开启dataBinding
            "dataBinding true"   //开启viewBinding
          ]
        }
      }
    }
  }
  ```

**注意**  
- 配置 buildFeatures 需提交云端打包才能生效


## packagingOptions @packagingoptions  

Android平台云端打包时原生工程应用 build.gradle 的 packagingOptions 配置项，支持的属性参考：[Android官方文档](https://developer.android.google.cn/reference/tools/gradle-api/7.4/com/android/build/api/dsl/PackagingOptions)。  

需在项目 manifest.json 文件的`源码视图`配置：  

- HBuilderX 4.71 及以上版本  
  需通过`源码视图`在 "app-android" -> "distribute" 节点配置 packagingOptions，如下示例：  
  ```json
  {
    "app-android": {
      "distribute": {
        "packagingOptions": [
          "exclude 'META-INF/LICENSE'",    //排除文件META-INF/LICENSE
          "exclude 'META-INF/LICENSE.txt'" //排除文件META-INF/LICENSE.txt
        ]
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过`源码视图`在 "app" -> "distribute" -> "android" 节点配置 packagingOptions，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "android": {
          "packagingOptions": [
            "exclude 'META-INF/LICENSE'",    //排除文件META-INF/LICENSE
            "exclude 'META-INF/LICENSE.txt'" //排除文件META-INF/LICENSE.txt
          ]
        }
      }
    }
  }
  ```


**注意**  
- 云端打包默认包含以下配置：
  + pickFirst 'lib/*/libstlport_shared.so'
  + pickFirst 'lib/*/libc++_shared.so'
- 配置 packagingOptions 需提交云端打包才能生效


## Android版本列表 @apilevellist  
API等级与Android版本对应列表如下：
| API等级 | Android版本号 | Android版本名称 |  
| :-- | :-- | :-- |  
| 36 | Android16 | Android W |  
| 35 | Android15 | Android V, Vanilla Ice Cream |  
| 34 | Android14 | Android U, Upside Down Cake |  
| 33 | Android13 | Android T, Tiramisu |  
| 32 | Android12L | Android Sv2 |  
| 31 | Android12 | Android S, Snow Cone |  
| 30 | Android11 | Android R, Red Velvet Cake |  
| 29 | Android10 | Android Q, Quince Tart |  
| 28 | Android9 | Android P, Pie |  
| 27 | Android8.1 | Android O_MR1 |  
| 26 | Android8.0 | Android O, Oreo |  
| 25 | Android7.1 | Android N_MR1 |  
| 24 | Android7.0 | Android N, Nougat |  
| 23 | Android6.0 | Android M, Marshmallow |  
| 22 | Android5.1 | Android L_MR1 |  
| 21 | Android5.0 | Android L, Lollipop |  


以上仅列出uni-app x支持的版本信息，完整API级别信息请参考Google官方文档[Android API级别说明](https://developer.android.com/guide/topics/manifest/uses-sdk-element?hl=zh-cn#ApiLevels)。  
