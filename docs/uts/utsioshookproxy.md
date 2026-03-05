# UTSiOSHookProxy

应用程序生命周期回调协议，此协议内的所有函数均由 app 调用，开发者可按需实现对应时机的回调函数。具体的使用方法[详见](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#hooksclass)

## 应用程序生命周期回调函数


### onCreate()

uts 插件创建时的回调。<br/>此回调的准确时机对应于 OC 类的 load() 函数调用时机。



**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationDidFinishLaunchingWithOptions(application, launchOptions)

应用正常启动时 (不包括已在后台转到前台的情况)的回调函数。<br/>可以在此回调函数做一些初始化操作，比如初始依赖的SDK等。注意：不要在此回调函数里做耗时操作，以免影响 app 的启动速度。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | App 的 UIApplicationDelegate 对象。 |
| launchOptions | Map\<UIApplication.LaunchOptionsKey, any> | 否 | - | - | 启动参数。默认值为 null (用户通过点击 push 通知启动应用时，该参数内会包含通知的信息) | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 返回一个 boolean 值，正常返回true。 | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### didRegisterForRemoteNotifications(deviceToken)

远程通知注册成功时的回调函数。<br/>可以在此函数里将 deviceToken 发送给服务端。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| deviceToken | Data | 否 | - | - | 设备的推送令牌 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### didFailToRegisterForRemoteNotifications(error)

远程通知注册失败时的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| error | NSError | 否 | - | - | 失败的原因。 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### didReceiveRemoteNotification(userInfo)

应用收到远程通知时的回调函数。(iOS 10.0之后废弃)<br/>当应用在前台运行中，收到远程通知时(不会弹出系统通知界面)，会回调这个方法；当应用在后台状态时，点击push消息启动应用，也会回调这个方法；当应用完全没有启动时，点击push消息启动应用，就不会回调这个方法。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| userInfo | Map\<AnyHashable, any> | 否 | - | - | 收到的远程通知信息。 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### didReceiveLocalNotification(notification)

应用收到本地通知时的回调函数。(iOS 10.0之后废弃)

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| notification | UILocalNotification | 否 | - | - | 接收到的本地通知 | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationHandleOpenURL(application, url)

通过 url scheme 方式唤起 app 时的回调函数。(iOS9 之前的系统回调此方法，iOS9 之后的系统请使用 applicationOpenURLOptions)

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | App 的 UIApplicationDelegate 对象。 |
| url | URL | 否 | - | - | 要打开的URL资源。该资源可以是网络资源或文件。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果成功处理请求，则为true;如果尝试打开URL资源失败，则为false。 | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationOpenURLOptions(app, url, options)

通过 url scheme 方式唤起 app 时的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| app | UIApplication | 否 | - | - | - |
| url | URL | 否 | - | - | 要打开的URL资源。该资源可以是网络资源或文件。 |
| options | Map\<UIApplication.OpenURLOptionsKey, any> | 否 | - | - | URL处理选项的字典, 默认值为 null 。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 如果成功处理请求，则为true;如果尝试打开URL资源失败，则为false。 | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationWillResignActive(application)

当应用从活动状态主动变为非活动状态的时的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationDidBecomeActive(application)

应用完全激活时的回调函数。<br/>应用程序冷启动或者从后台转到前台后都会完全激活应用程序。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationDidEnterBackground(application)

应用程序进入后台时的回调函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationWillEnterForeground(application)

当应用在后台状态，将要进入到前台运行时的回调函数。<br/>应用程序冷启动时不会回调此方法。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationMain(argc, argv)

应用程序的 main 函数。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| argc | Int32 | 是 | - | - | - |
| argv | UnsafeMutablePointer\<UnsafeMutablePointer\<CChar> \| null> | 是 | - | - | - | 


**返回值**
| 类型 |
| :- |
| void | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### applicationContinueUserActivityRestorationHandler(application, userActivity, restorationHandler)

当应用程序接收到与用户活动相关的数据时调用此方法，例如，当用户使用 Universal Link 唤起应用时。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| application | UIApplication | 否 | - | - | App 的 UIApplicationDelegate 对象。 |
| userActivity | NSUserActivity | 否 | - | - | 包含与用户正在执行的任务相关联的数据的活动对象。使用这些数据来继续用户在iOS应用中的活动。 |
| restorationHandler | (res?: any) => void | 否 | - | - | 需要执行的回调，该回调是可选的，默认值为 null。 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | true表示你的应用处理了这个活动，false表示让iOS知道你的应用没有处理这个活动。 | 


**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |



### 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=uts.platformObject.UTSiOSHookProxy)
