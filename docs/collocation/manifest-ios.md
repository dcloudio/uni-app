# iOS App配置

## 图标配置 @icon  

应用图标是在手机上安装应用后显示在桌面的图标，可在 manifest.json 的可视化界面配置：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_icon.png)

> 要求使用1024x1024分辨率图标，不要设置圆角（系统会自动处理圆角）  

如果不配置，默认使用iOS提供的图标，效果如下：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_icon_default.png)  

**注意**
- 修改或配置图标后需提交云端打包才能生效


## 启动界面 @splashscreen
App启动时，系统加载应用渲染首页需要一定的时间，为了避免用户等待，手机操作系统提供了特殊的启动界面设计，让用户先看到一个简单的界面，等应用加载完成后正式进入应用首页。

这个界面，即被称为启动封面，也成称为 splash。

当然并非所有App都需要splash，很多系统应用比如计算器、日历都没有splash。

uni-app x中，如不配置splash，则与计算器等应用一致，启动时有轻微闪白，但可以让用户更快的使用首页。

如需配置splash，注意避免splash图与首页风格差异太大。因为uni-app x启动速度非常快，splash只是一闪而过，如果颜色差异太大，会让用户视觉不舒服。

> HBuilderX 4.18+ 版本支持配置启动界面。  
> HBuilderX 4.71 及以上版本iOS平台可视化界面设置调整到`iOS App配置`项中。  

uni-app x 的 app-ios 平台，启动界面有以下策略：
- 不配置
- 自定义storyboard启动界面

Storyboard是Apple提供的一种简化的布局界面，通过xml描述界面，不能编程。
虽然无法制作非常灵活的界面，但满足启动界面是没问题的，比如设定背景色背景图、设定前景文字、图片的位置。
storyboard的优势是启动速度快。在App的真实首页被渲染完成前，可以快速给用户提供一个基于Storyboard的启动屏。

### 制作storyboard文件

storyboard有两种制作方式：

**1.** **直接使用[模板文件(点击下载)](https://native-res.dcloud.net.cn/uni-app/file/CustomStoryboard.zip)中提供的相对常用的 storyboard 模板，可在这个文件的基础上进行自定义（不需要 Mac 及 XCode，详情请查看附件中的 readme 教程）**
此 storyboard 文件适用于各种 iPhone 及 iPad 设备的横竖屏，支持自定义界面元素包括

- 页面背景图片或背景颜色
- 中间显示图片
- 底部显示文字及颜色
注：每一项都是可选的（比如只显示背景图片，只提供背景图片即可）

**2.** 使用xcode自行制作。xcode提供了可视化的制作storyboard的方式，但依赖于mac电脑。在xcode中制作storyboard的教程请自行网络搜索，请注意下面的注意事项。

HBuilderX需要的自定义storyboard文件格式为zip压缩包，里面要求包含XCode使用的.storyboard文件，以及.stroybard文件中使用的png图，如下图所示：

![](https://img.cdn.aliyun.dcloud.net.cn/client/ask/pkg/splash/storyboard.png)

::: warning 注意事项
- zip压缩包中不要包含目录，直接包含.storyboard和.png文件
- 有且只有一个.storyboard文件
- .storyboard文件可以通过xcode生成，也可以使用任何文本编辑器修改其源码，比如对.storyboard文件点右键，使用HBuilderX打开。它本质是一个xml文件。
- png文件名称中的@2x和@3x是适配不同分辨率的图片，系统会自动根据设备dpi选择，可参考[这里](https://www.jianshu.com/p/5b5f47ff87d4)
- 为了避免png文件名称与应用中内置的文件名冲突，建议以dc_launchscreen开头
- 制作 storyboard 时，**请将图片资源直接拖到放工程中，不要放到 imageset 里面，并且图片命名要保证一定的唯一性可参考附件中的示例**
- XCode中创建 storyboard 文件时，**页面元素添加约束时一定要相对于** `Superview`，不然启动图到 loading页面过渡时页面会跳动或者变形
![](https://web-ext-storage.dcloud.net.cn/doc/app/ios/storyboard1.png)#{width="800px"}  
:::

### 使用storyboard文件

打开项目的manifest.json文件，在“App启动界面配置”中的“iOS启动图设置”项下选择自己制作的storyboard文件：

- HBuilderX 4.71 及以上版本  
  在 “iOS App配置” 的 “启动界面配置” -> “自定义storyboard启动界面” 中设置  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_ios_storyboard.png)

- HBuilderX 4.71 以下版本  
  在 “安卓/iOS启动界面配置” 的 “iOS启动图设置” -> “自定义storyboard启动界面” 中设置  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/splashscreen_ios_storyboard_old.png)

### 启动界面方向 @orientation  

启动界面方向由项目 `pages.json` 中配置的 globalStyle -> pageOrientation 属性决定：  
- portrait  
  + iPhone设备，UISupportedInterfaceOrientations~iphone 值使用 UIInterfaceOrientationPortrait。即固定为竖屏正方向显示  
  + iPad设备，UISupportedInterfaceOrientations~ipad 值使用 UIInterfaceOrientationPortrait、UIInterfaceOrientationPortraitUpsideDown。即竖屏显示，根据感应自动决定竖屏正反方向  
- landscape  
  + iPhone设备，UISupportedInterfaceOrientations~iphone 值使用 UIInterfaceOrientationLandscapeLeft、UIInterfaceOrientationLandscapeRight。即横屏显示，根据感应自动决定横屏正反方向  
  + iPad设备，UISupportedInterfaceOrientations~ipad 值使用 UIInterfaceOrientationLandscapeLeft、UIInterfaceOrientationLandscapeRight。即横屏显示，根据感应自动决定横屏正反方向  
- auto  
  + iPhone设备，UISupportedInterfaceOrientations~iphone 值使用 UIInterfaceOrientationPortrait、UIInterfaceOrientationLandscapeLeft、UIInterfaceOrientationLandscapeRight。即自适应显示，根据感应自动决定竖屏正方向或横屏正反方向  
  + iPad设备，UISupportedInterfaceOrientations~ipad 值使用 UIInterfaceOrientationPortrait、UIInterfaceOrientationPortraitUpsideDown。即自适应显示，根据感应自动决定竖屏正反方向或横屏正反方向  

以上UISupportedInterfaceOrientations~iphone、UISupportedInterfaceOrientations~ipad 值云端打包时设置到应用的Info.plist中。

如果同时在项目根目录下 `Info.plist` 配置了 UISupportedInterfaceOrientations~iphone、UISupportedInterfaceOrientations~ipad 值，云端打包会自动合并到应用的Info.plist中。

如果`pages.json` 中没有配置 pageOrientation 属性，也没有在项目根目录下 `Info.plist` 配置 UISupportedInterfaceOrientations~iphone 或 UISupportedInterfaceOrientations~ipad 值，不同设备默认值如下：  

- iPhone  
  默认值为竖屏（HBuilderX4.71及以上版本，HBuilderX4.71以下版本为横竖屏自适应显示），对应原生工程的Info.plist值如下  
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>UISupportedInterfaceOrientations~iphone</key>
      <array>
        <string>UIInterfaceOrientationPortrait</string>
      </array>
    </dict>
  </plist>
  ```

- iPad  
  默认值为横竖屏自适应（支持4个方向），对应原生工程的Info.plist值如下
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>UISupportedInterfaceOrientations~ipad</key>
      <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
      </array>
    </dict>
  </plist>
  ```

**注意**  
iOS平台在iPad设备默认是支持`多任务处理`的，即支持悬浮窗口和拆分视图，这时要求`UISupportedInterfaceOrientations~ipad`的值为同时支持4个方向。云端打包会自动检测应用是否配置关闭支持`多任务处理`，没有关闭则自动补齐iPad设置为横竖屏自适应（支持4个方向），如过需要在iPad设备固定某个方向，需在项目根目录下的[Info.plist]()文件中添加`UIRequiresFullScreen`配置值为`true`，如下：  
```json
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>UIRequiresFullScreen</key>
      <true/>
    </dict>
  </plist>
```



## 可选模块配置 @modules

> HBuilderX 4.71 及以上版本支持可视化界面配置可选模块  

### uni-location（定位） @modulesLocation

定位相关功能使用 [provider机制](../api/provider.md) 实现，uni-app x 项目中使用 [uni.getLocation](../api/get-location.md)，[uni.onLocationChange](../api/location-change.md#onlocationchange)，[uni.offLocationChange](../api/location-change.md#offlocationchange) 等API时依赖此模块。

支持以下定位 provider ：

#### 系统定位 @locationSystem
使用系统自带定位功能，由苹果iOS系统实现

使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “iOS App配置” 的 “可选模块配置” -> “uni-location（定位）” 中勾选 “系统定位”：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_location_system.png)

  也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" -> "uni-location" 下添加 "system" 节点，如下示例：  
  ```json
  {
    "app-ios": {
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

使用 [腾讯位置服务](https://lbs.qq.com/) 的 “iOS定位SDK” 实现，使用前需申请Key。  

> 同时使用 [腾讯地图](#mapTencent) 时，要求使用相同的Key  

使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “iOS App配置” 的 “可选模块配置” -> “uni-location（定位）” 中勾选 “腾讯定位” 并配置 Key：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_location_tencent.png)

  **配置参数**  
  + Key  
    [腾讯位置服务](https://lbs.qq.com/)后台申请的Key  

  也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" -> "uni-location" 下添加 "tencent" 节点，如下示例：  
  ```json
  {
    "app-ios": {
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

  > HBuilder 4.71 以下版本不支持在 manifest.json 中配置 `腾讯位置服务` 申请的 Key，需在项目根目录下添加 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoplist) 文件，将 Key 配置到 TencentLBSAPIKey 节点中，如下示例：  

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>TencentLBSAPIKey</key>
      <string>%从腾讯位置服务申请的Key%</string>
    </dict>
  </plist>
  ```


#### 高精度定位  
应用需要使用高精度定位时还需配置 `NSLocationTemporaryUsageDescriptionDictionary` 的 `PurposeKey`，并说明高精度定位的原因。  

需在项目根目录下添加 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoplist) 文件，配置 NSLocationTemporaryUsageDescriptionDictionary 相关信息，如下示例：  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>

    <key>NSLocationTemporaryUsageDescriptionDictionary</key>
    <dict>
      <key>PurposeKey</key>
      <string>这里需要您临时授权高精度定位权限,一次临时授权时效仅app一个周期内, 每次硬启动都需要临时授权</string>
    </dict>

  </dict>
</plist>
```

### uni-map（地图） @modulesMap

uni-app x 项目中使用 [map](../component/map.md) 组件，[uni.chooseLocation](../api/choose-location.md) API时依赖此模块。

地图是商业服务，授权较贵，如需购买，请点击[获取优惠](https://ask.dcloud.net.cn/explore/map/)。  

#### 腾讯地图 @mapTencent

使用 [腾讯位置服务](https://lbs.qq.com/) 的 “iOS地图SDK” 实现，使用前需申请Key，并在腾讯后台申请 Key 界面勾选“SDK”。  

> 同时使用 [腾讯定位](#locationTencent) 时，要求使用相同的Key  

使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “iOS App配置” 的 “可选模块配置” -> “uni-map（地图）” 中勾选 “腾讯地图” 并配置 Key：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_map_tencent.png)

  **配置参数**  
  + Key  
    [腾讯位置服务](https://lbs.qq.com/)后台申请的Key  

  也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" -> "uni-map" 下添加 "tencent" 节点配置，如下示例：  
  ```json
  {
    "app-ios": {
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

  > HBuilder 4.71 以下版本不支持在 manifest.json 中配置从 `腾讯位置服务` 申请的 Key，需在项目根目录下添加 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoplist) 文件，将 Key 配置到 TencentLBSAPIKey 节点中，如下示例：  

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
    <dict>
      <key>TencentLBSAPIKey</key>
      <string>%从腾讯位置服务申请的Key%</string>
    </dict>
  </plist>
  ```


### uni-payment（支付） @modulesPayment

请求支付功能使用 [provider机制](../api/provider.md) 实现，uni-app x 项目中使用 [uni.requestPayment](../api/request-payment.md) API时依赖此模块。

支持以下支付 provider ：

#### 支付宝支付 @paymentAlipay
使用 “App支付宝客户端SDK” 实现。使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “iOS App配置” 的 “可选模块配置” -> “uni-payment（支付）” 中勾选 “支付宝支付”：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_payment_alipay.png)

  也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" -> "uni-payment" 下添加 "alipay" 节点配置，如下示例：  
  ```json
  {
    "app-ios": {
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
使用 “微信 Open SDK for iOS” 实现，使用前需到[微信开放平台](https://open.weixin.qq.com/)创建移动应用并在开发配置中正确配置`iOS应用`的 Bundle ID 和 Universal Links。  
在uni-app x项目中使用此模块，需在manifest.json中配置：  

- HBuilderX 4.71 及以上版本  
  可视化界面操作在 “iOS App配置” 的 “可选模块配置” -> “uni-payment（支付）” 中勾选 “微信支付” 并配置参数：  
  ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_payment_wxpay.png)

  **配置参数**  
  + APPID  
    [微信开放平台](https://open.weixin.qq.com/)创建移动应用时获取的APPID，以wx开头的字符串  
  + Universal Links  
    [微信开放平台](https://open.weixin.qq.com/)应用的开发配置中设置的 Universal Links 值  

  也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" -> "uni-payment" 下添加 "wxpay" 节点并配置参数，如下示例：  
  ```json
  {
    "app-ios": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "wxpay":{
              "appid": "%微信开放平台申请应用的APPID%",
              "universalLink": "%微信开放平台设置的 Universal Links%"
            }
          }
        }
      }
    }
  }
  ```

- HBuilderX 4.71 以下版本  
  需通过 manifest.json 的`源码视图`在 "app" -> "distribute" -> "modules" -> "uni-payment" 下添加 "wxpay" 节点并配置参数，如下示例：  
  ```json
  {
    "app": {
      "distribute": {
        "modules": {
          "uni-payment":{
            "wxpay":{
              "appid": "%微信开放平台申请应用的APPID%",
              "universalLink": "%微信开放平台设置的 Universal Links%"
            }
          }
        }
      }
    }
  }
  ```


### uni-barcode-scanning（相机组件扫码）@modulesscan  
[camera相机](../component/camera.md)组件的`mode`属性，支持配置扫码模式（scanCode），需勾选此扫码模块。  

在uni-app x项目中使用此模块，需在manifest.json中配置。  

可视化界面操作在 “iOS App配置” 的 “可选模块配置” 勾选 “uni-barcode-scanning（相机组件扫码）”模块：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_barcodescan.png)

也可通过`源码视图`在 "app-ios" -> "distribute" -> "modules" 下添加 "uni-barcode-scanning" 节点，如下示例：
```json
{
  "app-ios": {
    "distribute": {
      "modules": {
        "uni-barcode-scanning":{}
      }
    }
  }
}
```

**注意**  
- 配置或修改可选模块配置后需提交云端打包才能生效  


## URL Schemes @urlSchemes

> HBuilderX 4.71 及以上版本支持可视化配置URL Schemes。  
> HBuilderX 4.71 以下版本未提供 url scheme 配置，需在 app 原生应用配置文件中进行设置，详情参考：[iOS平台 URL Scheme 配置](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#urlscheme)。  

打开项目的manifest.json文件，在 “iOS App配置” 的 “URL Schemes” 中设置，如下示例配置 myapp 和 helloapp 两个值：  
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_urlschemes.png)

**注意**
- uni-app x 项目标准基座已配置 url scheme 值："uniappx"  
- 配置 URL Schemese 需提交云端打包才能生效  

标准基座可通过此网页体验 Url Scheme 启动 App：[https://uniappx.dcloud.net.cn/scheme.html](https://uniappx.dcloud.net.cn/scheme.html)


## 关联域（Associated Domains） @associatedDomains

关联域（Associated Domains）是配置应用通用链接的前置条件，需将通用链接的域名加“applinks:”前缀配置为关联域。如应用需设置通用链接值“https://uniappx.dcloud.net.cn/ulinks”，其域名为“uniappx.dcloud.net.cn”，对应的关联域值则为“applinks:uniappx.dcloud.net.cn”。

> HBuilderX 4.71 及以上版本支持可视化配置关联域（Associated Domains）。  
> HBuilderX 4.71 以下版本未提供 关联域（Associated Domains）配置，需在 app 原生应用配置文件中进行设置，详情参考：[iOS平台 Associated Domains 配置](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#domains)。  

打开项目的manifest.json文件，在 “iOS App配置” 的 “关联域（Associated Domains）” 中设置，如下示例配置 applinks:uniappx.dcloud.net.cn 值：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_associatedDomains.png)

完整通用链接配置参考：[iOS平台通用链接配置教程](https://uniapp.dcloud.net.cn/tutorial/app-ios-capabilities.html#%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5-universal-link)

**注意**
- uni-app x项目标准基座已配置 universal link 值："https://uniappx.dcloud.net.cn/ulink"，但重签名会使得通用链接配置失效，无法通过通用链接启动标准基座
- 配置 Associated Domains 需提交云端打包才能生效


## 应用访问白名单 @urlschemewhitelist

应用访问白名单用于声明当前应用需要检测或跳转的其他应用（或系统功能）的 ​​URL Scheme​​。它的核心作用是 ​​解决 iOS 9 及以上版本的应用间通信限制​​，确保应用能安全地查询或调用其他应用的功能。

> HBuilderX 4.71 及以上版本支持可视化配置应用访问白名单。  
> HBuilderX 4.71 以下版本未提供应用访问白名单配置，需在 app 原生应用配置文件 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoPlist) 中添加 `LSApplicationQueriesSchemes` 数据。  

打开项目的manifest.json文件，在 “iOS App配置” 的 “应用访问白名单” 中设置，如下示例配置 qqmap（腾讯地图）、iosamap（高德地图）、baidumap（百度地图）三个值：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_urlschemewhitelist.png)

**注意**
- 配置 应用访问白名单 需提交云端打包才能生效


## 后台运行能力 @backgroundModes

声明应用在后台（App 进入后台或被挂起时）需要继续执行的任务类型。​​向系统申请特定的后台运行权限​​，确保应用在后台仍能完成必要操作（如播放音乐、获取位置更新等）。

> HBuilderX 4.71 及以上版本支持可视化配置后台运行能力。  
> HBuilderX 4.71 以下版本未提供后台运行能力配置，需在 app 原生应用配置文件 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoPlist) 中添加 `UIBackgroundModes` 数据。  

打开项目的manifest.json文件，在 “iOS App配置” 的 “后台运行能力” 中设置：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_backgroundModes.png)

**注意**
- 配置 后台运行能力 需提交云端打包才能生效


## 隐私信息访问的许可描述 @usageDescription

`隐私信息访问的许可描述`向用户解释应用为何需要访问敏感数据或功能（如相机、相册、位置等），这些描述会在系统首次请求权限时展示给用户，直接影响用户是否授权。

- ​​用户知情权​​：苹果强制要求应用在访问敏感数据前必须明确告知用户用途，遵循“隐私透明化”原则。  
- 权限弹窗内容​​：描述文本会直接显示在系统的权限请求弹窗中（如下图），帮助用户理解授权必要性。  
- 审核合规​​：未提供正确的描述文本会导致 App Store 审核被拒。  

![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_usageCamera.png)

> HBuilderX 4.71 及以上版本支持可视化配置隐私信息访问的许可描述。  
> HBuilderX 4.71 以下版本未提供隐私信息访问的许可描述配置，需在 app 原生应用配置文件中进行设置，详情参考：[iOS隐私信息访问描述配置](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#usagedescription)。  

打开项目的manifest.json文件，在 “iOS App配置” 的 “隐私信息访问的许可描述” 中设置：
![](https://web-ext-storage.dcloud.net.cn/uni-app-x/collocation/ios_usageDescription.png)

使用[uni内置模块](./manifest-modules.md#utsmodules)时，云端打包回自动添加模块需要的隐私信息访问的许可描述，但许可描述信息是通用描述，不一定适合应用的实际使用场景描述，需根据应用的实际情况配置准确的许可描述。

**注意**  
- 配置 隐私信息访问的许可描述 需提交云端打包才能生效


## CFBundleName @cfbundlename

>HBuilder4.34版本新增支持  

iOS平台配置应用内部名称，默认值为“UniAppX”，最多支持15个字符，详细说明参考[苹果官方文档](https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundlename)。  

如需更改应用内部名称，可在项目 manifest.json 文件的 "app" -> "distribute" -> "ios" 节点配置 CFBundleName，如下示例将应用内部名称修改为“MyApp”：
```json
{
  "app": {
    "distribute": {
      "ios": {
        "CFBundleName": "MyApp"
      }
    }
  }
}
```

**注意**  
- 配置 CFBundleName 需提交云端打包才能生效


## UIRequiresFullScreen @uirequiresfullscreen

>HBuilder4.34版本新增支持

iOS平台配置应用在iPad设置是否能够与其他应用程序共享屏幕（分屏显示），需配置应用支持iPad设备时有效，默认值为true（可与其他应用程序共享屏幕）。更多信息参考[苹果官方文档](https://developer.apple.com/documentation/bundleresources/information-property-list/uirequiresfullscreen)。  

如需更改此配置，可在项目 manifest.json 文件的 "app" -> "distribute" -> "ios" 节点配置 UIRequiresFullScreen，如下示例为配置应用不与其他应用共享屏幕：
```json
{
  "app": {
    "distribute": {
      "ios": {
        "UIRequiresFullScreen": false
      }
    }
  }
}
```

**注意**  
- 配置 UIRequiresFullScreen 需提交云端打包才能生效

