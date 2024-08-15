import { UIApplication, UILocalNotification } from 'UIKit';
import { Data, NSError, NSUserActivity } from 'Foundation';
import { AnyHashable, UnsafeMutablePointer, CChar } from 'Swift';

interface UTSiOSHookProxy {
	/**
	 * uts 插件创建时的回调。
   * 此回调的准确时机对应于 OC 类的 load() 函数调用时机。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#onCreate
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	onCreate() : void;
	/**
	 * 应用正常启动时 (不包括已在后台转到前台的情况)的回调函数。
	 * 可以在此回调函数做一些初始化操作，比如初始依赖的SDK等。注意：不要在此回调函数里做耗时操作，以免影响 app 的启动速度。
   * @param application   App 的 UIApplicationDelegate 对象。
   * @param launchOptions 启动参数。默认值为 null (用户通过点击 push 通知启动应用时，该参数内会包含通知的信息)
   * @return 返回一个 boolean 值，正常返回true。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationDidFinishLaunchingWithOptions
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationDidFinishLaunchingWithOptions(application ?: UIApplication, launchOptions ?: Map<UIApplication.LaunchOptionsKey, any>) : boolean;
	/**
	 * 远程通知注册成功时的回调函数。
   * 可以在此函数里将 deviceToken 发送给服务端。
   * @param deviceToken 设备的推送令牌
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#didRegisterForRemoteNotifications
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.18"
	 *        }
	 *    }
	 * }
	 */
	didRegisterForRemoteNotifications(deviceToken ?: Data) : void;
	/**
	 * 远程通知注册失败时的回调函数。
	 * @param error 失败的原因。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#didFailToRegisterForRemoteNotifications
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.18"
	 *        }
	 *    }
	 * }
	 */
	didFailToRegisterForRemoteNotifications(error ?: NSError) : void;
	/**
	 * 应用收到远程通知时的回调函数。(iOS 10.0之后废弃)
   * 当应用在前台运行中，收到远程通知时(不会弹出系统通知界面)，会回调这个方法；当应用在后台状态时，点击push消息启动应用，也会回调这个方法；当应用完全没有启动时，点击push消息启动应用，就不会回调这个方法。
	 * @param userInfo 收到的远程通知信息。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#didReceiveRemoteNotification
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.18"
	 *        }
	 *    }
	 * }
	 */
	didReceiveRemoteNotification(userInfo ?: Map<AnyHashable, any>) : void;
	/**
	 * 应用收到本地通知时的回调函数。(iOS 10.0之后废弃)
	 * @param notification 接收到的本地通知
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#didReceiveLocalNotification
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.18"
	 *        }
	 *    }
	 * }
	 */
	didReceiveLocalNotification(notification ?: UILocalNotification) : void;
	/**
	 * 通过 url scheme 方式唤起 app 时的回调函数。(iOS9 之前的系统回调此方法，iOS9 之后的系统请使用 applicationOpenURLOptions)
	 * @param application App 的 UIApplicationDelegate 对象。
   * @param url 要打开的URL资源。该资源可以是网络资源或文件。
   * @return 如果成功处理请求，则为true;如果尝试打开URL资源失败，则为false。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationHandleOpenURL
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationHandleOpenURL(application ?: UIApplication, url ?: URL) : boolean;
	/**
	 * 通过 url scheme 方式唤起 app 时的回调函数。
	 * @param application App 的 UIApplicationDelegate 对象。
	 * @param url 要打开的URL资源。该资源可以是网络资源或文件。
   * @param options URL处理选项的字典, 默认值为 null 。
	 * @return 如果成功处理请求，则为true;如果尝试打开URL资源失败，则为false。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationOpenURLOptions
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationOpenURLOptions(app ?: UIApplication, url ?: URL, options ?: Map<UIApplication.OpenURLOptionsKey, any>) : boolean;
	/**
	 * 当应用从活动状态主动变为非活动状态的时的回调函数。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationWillResignActive
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationWillResignActive(application ?: UIApplication) : void;
	/**
	 * 应用完全激活时的回调函数。
   * 应用程序冷启动或者从后台转到前台后都会完全激活应用程序。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationDidBecomeActive
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationDidBecomeActive(application ?: UIApplication) : void;
	/**
	 * 应用程序进入后台时的回调函数。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationDidEnterBackground
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationDidEnterBackground(application ?: UIApplication) : void;
	/**
	 * 当应用在后台状态，将要进入到前台运行时的回调函数。
	 * 应用程序冷启动时不会回调此方法。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationWillEnterForeground
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationWillEnterForeground(application ?: UIApplication) : void;
	/**
	 * 应用程序的 main 函数。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationMain
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationMain(argc: Int32, argv: UnsafeMutablePointer<UnsafeMutablePointer<CChar> | null>) : void;
	/**
	 * 当应用程序接收到与用户活动相关的数据时调用此方法，例如，当用户使用 Universal Link 唤起应用时。
   * @param application  App 的 UIApplicationDelegate 对象。
   * @param userActivity 包含与用户正在执行的任务相关联的数据的活动对象。使用这些数据来继续用户在iOS应用中的活动。
   * @param restorationHandler 需要执行的回调，该回调是可选的，默认值为 null。
	 * @return true表示你的应用处理了这个活动，false表示让iOS知道你的应用没有处理这个活动。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOSHookProxy.html#applicationContinueUserActivityRestorationHandler
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	       "uniVer": "3.97+",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	applicationContinueUserActivityRestorationHandler(application ?: UIApplication, userActivity ?: NSUserActivity, restorationHandler ?: ((res ?: [any]) => void)) : boolean;
}
