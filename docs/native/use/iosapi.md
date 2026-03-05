> * SDK基于Swift开发，因此原生Objective-C语言开发的应用需要新建一个Swift文件用于添加Swift运行环境以及桥接SDK的API，详情可参考UniAppXDemo工程中的`UniAppBridge`

- **SDK 4.81+**：使用新的 UniAppXSDK API（推荐）
- **SDK 4.81 之前**：使用旧的 UniSDKEngine API

## SDK 4.81+ 新 API（推荐）

### 初始化 SDK

```swift
import DCloudUniappRuntime

// 初始化 SDK
UniAppXSDK.initSDK()
```
### 打开 SDK 页面

```swift
let options = UniAppXSDKStartOptions.init()
options.appScheme = "your-app-scheme"
options.appLink = "your-app-link"
options.openType = .push
options.animationType = .auto

UniAppXSDK.start(options: options)
```

#### UniAppXSDKStartOptions 参数说明

配置启动选项的类。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `appScheme` | `String?` | `nil` | 应用 Scheme，用于深度链接 |
| `appLink` | `String?` | `nil` | 应用链接地址 |
| `openType` | `UniAppXSDKStartOptionsOpenType` | `.push` | 打开方式：push 或 present |
| `animationType` | `UniAppXSDKStartOptionsAnimationType` | `.auto` | 动画类型 |
| `animationDuration` | `TimeInterval` | `0.35` | 动画持续时间（秒） |
| `customAnimationDelegate` | `UniAppXSDKCustomAnimationDelegate?` | `nil` | 自定义动画代理 |
| `viewController` | `UIViewController?` | `nil` | 指定的视图控制器 |

##### 动画类型 (UniAppXSDKStartOptionsAnimationType)
- `.auto` - 使用系统默认动画
- `.none` - 无动画
- `.slideInRight` - 从右侧滑入
- `.slideInLeft` - 从左侧滑入
- `.slideInTop` - 从顶部滑入
- `.slideInBottom` - 从底部滑入
- `.fadeIn` - 淡入效果
- `.zoomOut` - 放大进入
- `.zoomFadeOut` - 放大淡入
- `.popIn` - 弹出效果
- `.custom` - 使用自定义动画代理

##### 自定义动画代理 (UniAppXSDKCustomAnimationDelegate)

实现自定义动画效果，示例如下：
```swift
class ViewController: UniAppXSDKCustomAnimationDelegate {
    public func customEnterAnimation(fromVC: UIViewController, toVC: UIViewController, completion: @escaping (Bool) -> Void) {
        // Push 模式: 添加到导航控制器
        if let navController = fromVC.navigationController {
            navController.view.addSubview(toVC.view)
            toVC.view.frame = navController.view.bounds

            toVC.view.transform = CGAffineTransform(translationX: navController.view.bounds.width, y: 0)
                .concatenating(CGAffineTransform(scaleX: 0.8, y: 0.8))
            toVC.view.alpha = 0.7

            UIView.animate(withDuration: 0.6, delay: 0, options: .curveEaseInOut) {
                toVC.view.transform = .identity
                toVC.view.alpha = 1.0
            } completion: { finished in
                navController.pushViewController(toVC, animated: false)
                toVC.view.removeFromSuperview()
                completion(finished)
            }
        } else {
            //如果没有导航控制器你可以 用present方式跳转 实现其他动画效果
            completion(true)
        }
    }
    
    
    public func customExitAnimation(currentVC: UIViewController, completion: @escaping (Bool) -> Void) {
        // Push 模式的退出动画：简单翻页效果
        if let navController = currentVC.navigationController {
            let viewControllers = navController.viewControllers
            if viewControllers.count > 1 {
                navController.popViewController(animated: false)
                navController.view.addSubview(currentVC.view)
                currentVC.view.frame = navController.view.bounds

                UIView.animate(withDuration: 0.6, delay: 0, options: .curveEaseInOut) {
                    currentVC.view.transform = CGAffineTransform(translationX: -navController.view.bounds.width, y: 0)
                        .concatenating(CGAffineTransform(scaleX: 0.8, y: 0.8))
                    currentVC.view.alpha = 0.7
                } completion: { finished in
                    currentVC.view.removeFromSuperview()
                    completion(finished)
                }
            } else {
                completion(true)
            }
        } else {
            completion(true)
        }
    }
}

// 使用自定义动画
options.customAnimationDelegate = self
options.animationType = .custom
```


### 退出 SDK 页面
根据您的需求，选择以下方式调用退出SDK
* 原生项目中退出调用`UniAppXSDK.exit()`
* uni-app x项目中退出调用[uni.exit()](https://doc.dcloud.net.cn/uni-app-x/api/exit.html)

### 生命周期集成
```swift
import UIKit
import DCloudUniappRuntime

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // 集成 uni-app x 生命周期
        UniAppXSDK.applicationDidFinishLaunchingWithOptions(application, launchOptions)
        
        return true
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        UniAppXSDK.didRegisterForRemoteNotifications(deviceToken)
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        UniAppXSDK.didFailToRegisterForRemoteNotifications(error)
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        UniAppXSDK.applicationDidReceiveRemoteNotificationCompletionHandler(application, userInfo, completionHandler)
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return UniAppXSDK.applicationOpenURLOptions(app, url, options)
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        UniAppXSDK.applicationWillResignActive(application)
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        UniAppXSDK.applicationDidBecomeActive(application)
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        UniAppXSDK.applicationDidEnterBackground(application)
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        UniAppXSDK.applicationWillEnterForeground(application)
    }
    
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return UniAppXSDK.applicationContinueUserActivityRestorationHandler(application, userActivity, restorationHandler)
    }
}
```

## SDK 4.81 之前旧 API

### 初始化 SDK

```swift
import DCloudUniappRuntime

// 在 AppDelegate 的 didFinishLaunchingWithOptions 中初始化
UniSDKEngine.shared.create()
```

### 打开 SDK 页面

```swift
// 检查并创建应用实例
if UniSDKEngine.shared.getAppManager()?.getCurrentApp() == nil {
    // uni.exit()方法会销毁app,所以在这里需要判断currentApp是否为空
    UniSDKEngine.shared.getAppManager()?.create()
}
let viewController = UniAppRootViewController()
self.navigationController?.pushViewController(viewController, animated: true)
```

### 退出 SDK 页面

仅支持在 uni-app x 中调用[uni.exit()](https://doc.dcloud.net.cn/uni-app-x/api/exit.html)退出

### 生命周期集成

```swift
import UIKit
import DCloudUniappRuntime

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // 在 AppDelegate 的 didFinishLaunchingWithOptions 中初始化
        UniSDKEngine.shared.create()
        
        // 在 AppDelegate 的 didFinishLaunchingWithOptions 调用
        UniSDKEngine.applicationDidFinishLaunchingWithOptions(application, launchOptions)
        
        return true
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
        // 在 AppDelegate 的 applicationDidBecomeActive 调用
        UniSDKEngine.applicationDidBecomeActive(application)
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        // 在 AppDelegate 的 applicationWillResignActive 调用
        UniSDKEngine.applicationWillResignActive(application)
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // 在 AppDelegate 的 applicationDidEnterBackground 调用
        UniSDKEngine.applicationDidEnterBackground(application)
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        // 在 AppDelegate 的 applicationWillEnterForeground 调用
        UniSDKEngine.applicationWillEnterForeground(application)
    }
    
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        // 在 AppDelegate 的 openURL 调用
        return UniSDKEngine.applicationOpenURLOptions(app, url, options)
    }
    
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // 在 AppDelegate 的 continueUserActivity 调用
        return UniSDKEngine.applicationContinueUserActivityRestorationHandler(application, userActivity, restorationHandler)
    }
    
    // 监听推送相关函数回调(可选)
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        // 在 AppDelegate 的 didRegisterForRemoteNotificationsWithDeviceToken 调用
        UniSDKEngine.didRegisterForRemoteNotifications(deviceToken)
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        // 在 AppDelegate 的 didFailToRegisterForRemoteNotificationsWithError 调用
        UniSDKEngine.didFailToRegisterForRemoteNotifications(error)
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        // 在 AppDelegate 的 didReceiveRemoteNotification 调用
        UniSDKEngine.applicationDidReceiveRemoteNotificationCompletionHandler(application, userInfo, completionHandler)
    }
}
```


## 通信
iOS平台目前不支持直接在uvue页面调用原生API，开发者可通过UTS插件`发送/接收 通知消息`实现与原生App通信，具体实现代码如下：

### 原生APP向SDK发消息
UTS插件添加监听：
``` ts
const name = "com.ios.notification.name1"; //通知消息标识
const notificationName = new Notification.Name(name);
const method = Selector("handleReceiveMessage:")//接收通知消息的方法名
NotificationCenter.default.addObserver(this, selector = method, name = notificationName, object = null)
```

``` ts
@objc static handleReceiveMessage(notification : Notification) {
	let userInfo = notification.userInfo
	if(userInfo != null){
		const message = userInfo!["msg"];
	}
}
```

原生发送通知消息：
``` swift
let name = "com.ios.notification.name1"; //通知消息标识
let message = "消息内容";
let userInfo: [AnyHashable: Any] = [
    "msg": message // 你可以在这里放置任何需要传递的信息
]
NotificationCenter.default.post(name: Notification.Name(name), object: nil, userInfo: userInfo)
```    


### SDK向原生APP发消息
原生添加通知监听：
``` swift
const name = "com.ios.notification.name2"; //通知消息标识
NotificationCenter.default.addObserver(self, selector: #selector(handleNotification(_:)), name: Notification.Name(name), object: nil)
```

``` swift
@objc func handleNotification(_ notification: Notification) {
    if let message = (notification.userInfo?["msg"] as? String) {
        // 使用message
        print(message)
    }
}
```
   
UTS插件发送消息：
``` ts
const name = "com.ios.notification.name2"; //通知消息标识
const message = "消息内容";
const notificationName = new Notification.Name(name);
const userInfo = new Map<string,any>()
userInfo.set("msg", message); // 你可以在这里放置任何需要传递的信息
NotificationCenter.default.post(name = notificationName, object = null, userInfo = userInfo);
```

> 注意：消息接收方必须在发送通知前添加监听事件，否则收不到消息 

### 运行示例
`UniAppXDemo`工程中，`__UNI__00DC103`为通信示例资源文件，将`Info.plist`中`uniapp-x`节点下的`appid`改为`__UNI__00DC103`，并添加`unimoduleTestIosNotification.xcframework`依赖，即可体验通信示例
