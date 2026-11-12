> * SDK基于Swift开发，因此原生Objective-C语言开发的应用需要新建一个Swift文件用于添加Swift运行环境以及桥接SDK的API，详情可参考UniAppXDemo工程中的`UniAppBridge`

> **SDK 5.24 及以上**：iOS 使用 `UIScene` 生命周期。请按照下方 `SceneDelegate` 示例接入，不再在 `AppDelegate` 中处理窗口和前后台生命周期。

> **注意**：4.81 之前版本请先升级到 4.81 及以上版本，再按照本文集成 SDK。

## UniAppXSDK API

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

#### 打开并获取应用管理对象

**蒸汽模式 SDK 5.36 及以上支持。**

使用 `UniAppXSDK.open(options:completion:)` 打开应用，在完成回调中获取应用管理对象 `UniAppXSDKApp`，后续通过该对象显示、隐藏或关闭应用。

```swift
import UIKit
import DCloudUniappRuntime

class SDKHostViewController: UIViewController {
    private var sdkApp: UniAppXSDKApp?

    func openUniApp() {
        let options = UniAppXSDKStartOptions()
        options.openType = .push // 需要导航控制器，也可以使用 .present
        options.animationType = .auto
        options.viewController = self
        options.enableBackground = true // 返回原生宿主后保留应用
        options.enableGestureClose = true // 开启 SDK 左边缘返回手势

        UniAppXSDK.open(options: options) { [weak self] result in
            switch result {
            case .success(let app):
                self?.sdkApp = app
                app.onClose = { [weak self] in
                    self?.sdkApp = nil
                    print("uni-app x 应用已关闭")
                }
            case .failure(let error):
                print("打开失败：\(error.localizedDescription)")
            }
        }
    }
}
```

`open` 的完成回调类型为 `(Result<UniAppXSDKApp, UniAppXSDKError>) -> Void`。成功表示应用已创建且展示转场已完成，首页仍可能继续渲染。

SDK 同一时间只管理一个应用实例，应用标识使用宿主 `Info.plist` 中的 `uniapp-x.appid`。SDK 会持有当前实例，也可通过 `UniAppXSDK.currentApp` 获取，类型为 `UniAppXSDKApp?`。已隐藏或正在关闭的实例仍占用该名额，再次调用 `open` 返回 `alreadyRunning`，恢复隐藏实例应调用其 `show` 方法。

原有 `start(options:)` 入口继续支持；需要获取管理对象及处理打开结果时使用 `open(options:completion:)`。

#### UniAppXSDKStartOptions 参数说明

配置启动选项的类。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `appScheme` | `String?` | `nil` | 应用 Scheme，用于深度链接 |
| `appLink` | `String?` | `nil` | 应用链接地址 |
| `openType` | `UniAppXSDKStartOptionsOpenType` | `.push` | 打开方式：push 或 present |
| `enableBackground` | `Bool` | `false` | 返回原生宿主后是否保留应用，详见下方“后台运行”。蒸汽模式 SDK 5.36 及以上支持 |
| `enableGestureClose` | `Bool` | `false` | 是否启用 SDK 左边缘返回手势，支持 push 和 present；返回后按 `enableBackground` 隐藏或销毁应用。蒸汽模式 SDK 5.36 及以上支持 |
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


### 应用管理对象 UniAppXSDKApp

**蒸汽模式 SDK 5.36 及以上支持。**

通过 `open` 的成功回调或 `UniAppXSDK.currentApp` 获取实例。

| 属性 | 类型 | 说明 |
|------|------|------|
| `appID` | `String` | 应用标识，只读 |
| `state` | `UniAppXSDKAppState` | 当前状态，只读 |
| `isVisible` | `Bool` | 当前状态为 `visible` 时返回 `true`，只读 |
| `onClose` | `(() -> Void)?` | 应用完成销毁后的回调，每个实例触发一次 |

`UniAppXSDKAppState` 包含 `starting`（启动中）、`visible`（已显示）、`hiding`（隐藏中）、`hidden`（已隐藏）、`showing`（恢复显示中）、`closing`（关闭中）和 `closed`（已关闭）。

读取 `currentApp`、实例状态以及设置 `onClose` 应在主线程进行。`open`、`show`、`hide`、`close` 可以从任意线程调用，操作和完成回调均在主线程执行。

### 显示与隐藏

**蒸汽模式 SDK 5.36 及以上支持。**

通过应用实例的 `hide` 隐藏应用并返回原生宿主，保留页面和 JS 运行状态；通过同一实例的 `show` 恢复应用。显式调用 `hide` 时，无论 `enableBackground` 的值如何，都会保留实例。

以下方法可添加到上方示例中的 `SDKHostViewController`，通过按钮或业务事件分别调用。

```swift
func hideUniApp() {
    guard let app = sdkApp else { return }

    let options = UniAppXSDKHideOptions()
    options.animationType = .slideOutRight
    options.animationDuration = 0.3 // 单位为秒
    app.hide(options: options) { result in
        switch result {
        case .success:
            print("应用已隐藏，页面状态已保留")
        case .failure(let error):
            print("隐藏失败：\(error.localizedDescription)")
        }
    }
}

func showUniApp() {
    guard let app = sdkApp else { return }

    let options = UniAppXSDKShowOptions()
    options.animationType = .slideInRight
    options.animationDuration = 0.3
    options.viewController = self
    app.show(options: options) { result in
        switch result {
        case .success:
            print("应用已恢复显示")
        case .failure(let error):
            print("显示失败：\(error.localizedDescription)")
        }
    }
}
```

#### UniAppXSDKShowOptions 参数说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `animationType` | `UniAppXSDKShowOptionsAnimationType` | `.auto` | 与 `UniAppXSDKStartOptionsAnimationType` 相同，支持上方列出的全部进入动画 |
| `animationDuration` | `TimeInterval` | `0.35` | 内置动画持续时间，单位为秒 |
| `customAnimationDelegate` | `UniAppXSDKCustomAnimationDelegate?` | `nil` | 使用 `.custom` 时必须设置 |
| `viewController` | `UIViewController?` | `nil` | 恢复显示的宿主控制器，默认从首次打开时所在窗口场景查找当前可见控制器 |

`show` 沿用首次打开时的 push/present 方式和窗口场景。宿主控制器需要已挂载到窗口并可见，push 方式需要导航控制器。

#### UniAppXSDKHideOptions 参数说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `animationType` | `UniAppXSDKHideOptionsAnimationType` | `.auto` | 隐藏动画，取值见下方列表 |
| `animationDuration` | `TimeInterval` | `0.35` | 内置动画持续时间，单位为秒 |
| `customAnimationDelegate` | `UniAppXSDKCustomAnimationDelegate?` | `nil` | 使用 `.custom` 时必须设置 |

隐藏动画支持 `.auto`（系统动画）、`.none`（无动画）、`.slideOutRight`（向右滑出）、`.slideOutLeft`（向左滑出）、`.slideOutTop`（向上滑出）、`.slideOutBottom`（向下滑出）、`.fadeOut`（淡出）和 `.custom`（自定义动画）。

`show`、`hide` 的 `options` 和 `completion` 均可省略，例如 `app.hide()`、`app.show()`。省略 `options` 时复用首次打开的动画配置；传入配置对象时使用该对象的值。`.auto` 动画的时长由 UIKit 控制。

使用 `.custom` 时，宿主代理需要完成与首次打开的 `openType` 对应的 push/pop 或 present/dismiss，并调用一次完成回调。缺少 `customAnimationDelegate` 时返回 `customAnimationDelegateRequired`。

完成回调类型均为 `UniAppXSDKCompletion`，即 `(Result<Void, UniAppXSDKError>) -> Void`。成功时对应转场已完成。已显示时再次 `show`、已隐藏时再次 `hide` 均直接成功；转场期间调用这两个方法返回 `busy`。

### 后台运行

**蒸汽模式 SDK 5.36 及以上支持。**

打开时设置 `UniAppXSDKStartOptions.enableBackground`，控制宿主返回手势或直接移除 SDK 根控制器后的行为。该配置在首次打开时生效。

| enableBackground | 返回原生宿主后的行为 |
|------------------|----------------------|
| `false`（默认值） | 销毁应用，完成后触发实例的 `onClose` |
| `true` | 应用进入 `hidden` 状态，保留页面和 JS Runtime。可通过 `show` 恢复，或通过 `close` 销毁 |

后台运行指返回原生宿主后保留应用实例；宿主应用进入 iOS 系统后台后，执行仍受系统调度及后台能力配置限制。

需要 SDK 左边缘返回手势时，同时设置 `enableGestureClose = true`。该手势支持 push/present，应用内部页面的返回手势优先。首次打开或当前 `show` 使用自定义动画时，返回交互由宿主处理。返回手势取消时应用继续保持显示状态。

显式调用 `hide` 会保留应用；调用 `close`、`UniAppXSDK.exit()` 或 `uni.exit()` 会销毁应用，这些操作的行为独立于 `enableBackground`。

### 退出 SDK 页面
根据您的需求，选择以下方式调用退出SDK
* 原生项目中退出调用`UniAppXSDK.exit()`
* uni-app x项目中退出调用[uni.exit()](https://doc.dcloud.net.cn/uni-app-x/api/exit.html)

#### 通过应用管理对象关闭

**蒸汽模式 SDK 5.36 及以上支持。**

`close(completion:)` 可以关闭正在显示或已经隐藏的实例。以下方法可添加到上方示例中的 `SDKHostViewController`。

```swift
func closeUniApp() {
    sdkApp?.close { result in
        switch result {
        case .success:
            print("应用已完成销毁，可以重新打开")
        case .failure(let error):
            print("关闭失败：\(error.localizedDescription)")
        }
    }
}
```

`completion` 可省略，类型为 `UniAppXSDKCompletion`。成功回调在页面和 Runtime 完成销毁后触发。启动、显示或隐藏转场期间调用 `close`，会等待当前转场结束后关闭。

实例销毁后依次触发 `onClose` 和 `close` 的完成回调；调用 `uni.exit()` 或宿主返回导致销毁时，也会触发 `onClose`。SDK 会在回调前清空 `currentApp`，可在回调中打开新实例。宿主持有实例并设置闭包时，应使用弱引用避免循环持有。

已关闭的实例保持 `closed` 状态，重复调用 `close` 直接成功；调用 `show` 或 `hide` 返回 `closed`。再次启动需通过 `UniAppXSDK.open` 创建新实例。

#### UniAppXSDKError 错误说明

**蒸汽模式 SDK 5.36 及以上支持。**

通过 `open`、`show`、`hide`、`close` 完成回调的 `failure` 分支获取错误。

| 错误 | 说明 |
|------|------|
| `alreadyRunning` | 已有实例，包含隐藏或关闭中的实例 |
| `closed` | 实例已经关闭 |
| `busy` | 实例正处于转场中，或已请求关闭 |
| `invalidHost` | 宿主控制器无效、不可见或窗口场景不匹配 |
| `navigationControllerRequired` | push 方式需要导航控制器 |
| `customAnimationDelegateRequired` | 使用 `.custom` 时缺少自定义动画代理 |
| `creationFailed` | 应用创建失败 |
| `transitionCancelled` | 转场被取消 |
| `transitionFailed` | 控制器层级未达到请求的显示或移除状态 |

### 生命周期集成

5.24 及以上版本使用 `UIScene` 生命周期。先在 `Info.plist` 中声明 scene 配置；`SceneDelegate` 类名需与下方示例保持一致。

```xml
<key>UIApplicationSceneManifest</key>
<dict>
    <key>UIApplicationSupportsMultipleScenes</key>
    <false/>
    <key>UISceneConfigurations</key>
    <dict>
        <key>UIWindowSceneSessionRoleApplication</key>
        <array>
            <dict>
                <key>UISceneConfigurationName</key>
                <string>Default Configuration</string>
                <key>UISceneDelegateClassName</key>
                <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
            </dict>
        </array>
    </dict>
</dict>
```

`AppDelegate` 中初始化 SDK，并配置 scene delegate；窗口创建、前后台切换、URL Scheme 和 Universal Link 回调转发到 `UniAppRootSceneDelegate`。如果工程已有自己的 `SceneDelegate`，请将下面的转发代码合并进去。

```swift
// AppDelegate.swift
import UIKit
import DCloudUniappRuntime

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        UniAppXSDK.initSDK()
        UniAppXSDK.applicationDidFinishLaunchingWithOptions(application, launchOptions)
        return true
    }

    @available(iOS 13.0, *)
    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let configuration = UISceneConfiguration(name: "Default Configuration",
                                                  sessionRole: connectingSceneSession.role)
        configuration.delegateClass = SceneDelegate.self
        return configuration
    }

    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        UniAppXSDK.didRegisterForRemoteNotifications(deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        UniAppXSDK.didFailToRegisterForRemoteNotifications(error)
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                     fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        UniAppXSDK.applicationDidReceiveRemoteNotificationCompletionHandler(application, userInfo, completionHandler)
    }
}
```

```swift
// SceneDelegate.swift
import UIKit
import DCloudUniappRuntime

@available(iOS 13.0, *)
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    private let sdkSceneDelegate = UniAppRootSceneDelegate()

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
        sdkSceneDelegate.scene(scene, willConnectTo: session, options: connectionOptions)
        guard let windowScene = scene as? UIWindowScene else { return }

        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let initialViewController = storyboard.instantiateInitialViewController()!
        window = sdkSceneDelegate.window ?? UIWindow(windowScene: windowScene)
        window?.rootViewController = UINavigationController(rootViewController: initialViewController)
        (UIApplication.shared.delegate as? AppDelegate)?.window = window
        window?.makeKeyAndVisible()
    }

    func sceneDidBecomeActive(_ scene: UIScene) { sdkSceneDelegate.sceneDidBecomeActive(scene) }
    func sceneWillResignActive(_ scene: UIScene) { sdkSceneDelegate.sceneWillResignActive(scene) }
    func sceneWillEnterForeground(_ scene: UIScene) { sdkSceneDelegate.sceneWillEnterForeground(scene) }
    func sceneDidEnterBackground(_ scene: UIScene) { sdkSceneDelegate.sceneDidEnterBackground(scene) }
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        sdkSceneDelegate.scene(scene, openURLContexts: URLContexts)
    }
    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        sdkSceneDelegate.scene(scene, continue: userActivity)
    }
}
```

推送相关回调仍在 `AppDelegate` 中处理；其他生命周期和 URL/Universal Link 回调均在 `SceneDelegate` 中转发。

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
- 蒸汽模式 SDK工程 `UniAppXVaporDemo` 中，`unimoduleTesIosNotification` 为 UTS 插件，用于演示通信示例，UniAppXSample 为对应的 uni-app-x 源码示例工程
- VDOM 模式SDK工程 `UniAppXDemo`工程中，`__UNI__00DC103`为通信示例资源文件，将`Info.plist`中`uniapp-x`节点下的`appid`改为`__UNI__00DC103`，并添加`unimoduleTestIosNotification.xcframework`依赖，即可体验通信示例
