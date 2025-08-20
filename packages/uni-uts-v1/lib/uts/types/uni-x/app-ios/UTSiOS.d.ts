interface UTSiOS {
	/**
	 * 获取当前 app 显示的 UIViewController。
	 * @return 当前 app 显示的 UIViewController
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getCurrentViewController
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getCurrentViewController() : UIViewController;
	/**
	 * 获取当前app的keyWindow。
	 * @return 当前app的keyWindow.
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getKeyWindow
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getKeyWindow() : UIWindow;
	/**
	 * 获取指定的颜色。
	 * @param value 需要转换的代表色值的字符串，支持一下格式：精简写法的十六进制 如：#f00，十六进制 如：#ff0000，RGB 如：rgb(255, 0, 0)，RGBA 如:rgba(255, 0, 0, 0.5)，色值关键字，如： red
	 * @return UIColor 实例对象 注：如转换失败 默认会返回 黑色
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#colorWithString
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	colorWithString(value: string) : UIColor;
	/**
	 * 获取资源文件的原生平台路径。
	 * @param resourceName 资源文件相对于项目的绝对路径, 如：“/static/logo.png”
	 * @return 该资源在原生平台的路径
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getResourcePath
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getResourcePath(resourceName: string) : string;
	/**
	 * 是否是模拟器。
	 * @return 当前是模拟器 true, 当前是真机：false
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#isSimulator
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	isSimulator() : boolean;
	/**
	 * 获取设备 deviceId。
	 * @return 当前设备的 deviceId
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getDeviceId
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getDeviceId() : string;
	/**
	 * 获取设备型号。
	 * @require 当前设备的设备型号
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getModel
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getModel() : string;
	/**
	 * 获取当前应用的 UserAgent。
	 * @return 当前应用的 UserAgent。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getUserAgent
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getUserAgent() : string;
	/**
	 * 获取当前运行的app的AppId。
	 * @return 当前运行的app的AppId。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppId
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getAppId() : string;
	/**
	 * 获取当前运行app的dataPath
	 * @return 当前运行app的dataPath。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getDataPath
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getDataPath() : string;
	/**
	 * 获取当前运行环境是否是unimp。
	 * @return 是否是unimp。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#isUniMp
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	isUniMp() : boolean;
	/**
	 * 获取manifest.json 中配置的应用名称
	 * @return 应用名称。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppName
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getAppName() : string;
	/**
	 * 获取manifest.json 中配置的应用版本名称。
	 * @return 应用版本名称。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppVersion
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getAppVersion() : string;
	/**
	 * 获取manifest.json 中配置的应用版本号。
	 * @return 应用版本号。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppVersionCode
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	       "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getAppVersionCode() : string;
	/**
	 * 获取操作系统设置的语言。
	 * @return os language。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getOsLanguage
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getOsLanguage() : string;
	/**
	 * 获取应用资源（wgt）的版本名称。
	 * @return 应用资源（wgt）的版本名称。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppWgtVersion
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  	    	 "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getAppWgtVersion() : string;
	/**
	 * 获取小程序宿主语言。
   * @deprecated 已废弃
	 * @return 小程序宿主语言。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getHostLanguage
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        }
	 *    }
	 * }
	 */
	getHostLanguage() : string;
	/**
	 * 获取小程序宿主版本。
   * @deprecated 已废弃
	 * @return 小程序宿主版本。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getHostVersion
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        }
	 *    }
	 * }
	 */
	getHostVersion() : string;
	/**
	 * 获取小程序宿主名称。
   * @deprecated 已废弃
	 * @return 小程序宿主名称。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getHostName
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		     	 "unixVer": "x"
	 *        }
	 *    }
	 * }
	 */
	getHostName() : string;
	/**
	 * 获取小程序宿主包名。
   * @deprecated 已废弃
	 * @return 小程序宿主包名。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getHostPackageName
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        }
	 *    }
	 * }
	 */
	getHostPackageName() : string;
	/**
	 * 获取系统当前主题，取值为light或dark。
   * @deprecated 已废弃
	 * @return 系统当前主题。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getHostTheme
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  	    	 "uniVer": "x",
	 * 		    	 "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        }
	 *    }
	 * }
	 */
	getHostTheme() : string;
	/**
	 * 获取引擎版本号。
	 * @return 引擎版本号。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getInnerVersion
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getInnerVersion() : string;
	/**
	 * 获取系统设置信息。
	 * @return 系统设置信息。
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getSystemSetting
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 			     "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	getSystemSetting() : Map<string, any>;
	/**
	 * 获取当前是否是基座环境。
	 * @return 基座环境 true, 线上环境： false。
   * @internal
	 * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#isBaseIpa
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *           "osVer": "x",
	 *  		     "uniVer": "x",
	 * 			     "unixVer": "x"
	 *        },
	 *        "ios": {
	 *           "osVer": "12.0",
	 *  		     "uniVer": "√",
	 * 		    	 "unixVer": "4.11"
	 *        }
	 *    }
	 * }
	 */
	isBaseIpa() : boolean;
  /**
   * 获取系统当前主题。
   * @return 系统当前主题信息。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getOsTheme
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  getOsTheme() : string;
  /**
   * 监听系统主题变化（需要调用取消监听避免内存泄露）。
   * @param callback 监听函数
   * @return 监听id。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#onOsThemeChange
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  onOsThemeChange(callback: (theme: string) => void) : number;
  /**
   * 取消监听系统主题变化。
   * @param callbackId 监听id
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#offOsThemeChange
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  offOsThemeChange(callbackId: number): void;
  /**
   * 获取App当前主题。
   * @return App当前主题信息。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#getAppTheme
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  getAppTheme() : string;
  /**
   * 设置App当前主题。
   * @param theme 要设置的主题信息
   * @return App当前主题信息。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#setAppTheme
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  setAppTheme(theme: string) : void;
  /**
   * 监听app theme变化（需要调用取消监听避免内存泄露）。
   * @param callback 监听函数
   * @return 监听id。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#onAppThemeChange
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  onAppThemeChange(callback: (theme: string) => void) : number;
  /**
   * 取消监听app theme变化。
   * @param callbackId 监听id
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#offAppThemeChange
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "√",
   * 			     "unixVer": "4.18"
   *        }
   *    }
   * }
   */
  offAppThemeChange(callbackId: number): void;
  /**
   * 销毁指定的原生实例对象。
   * @param obj 要销毁的对象。
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#destroyInstance
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  		     "uniVer": "4.25",
   * 			     "unixVer": "4.25"
   *        }
   *    }
   * }
   */
  destroyInstance(obj: AnyObject): void;
  /**
   * 将文件的项目相对地址转换为运行期对应的绝对地址
   *
   * @tutorial https://uniapp.dcloud.net.cn/uts/UTSiOS.html#convert2AbsFullPath
   * @param inputPath 待转换的文件相对路径
   * @return 转换后文件绝对路径
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *  		     "uniVer": "x",
   * 			     "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "12.0",
   *  	    	 "uniVer": "4.11",
   * 			     "unixVer": "4.11"
   *        }
   *    }
   * }
   */
  convert2AbsFullPath(inputPath: string):string;
}


declare var UTSiOS : UTSiOS;
