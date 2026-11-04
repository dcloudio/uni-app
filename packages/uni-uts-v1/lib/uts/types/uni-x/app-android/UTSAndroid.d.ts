import Context from 'android.content.Context'
import Activity from 'android.app.Activity';
/**ss
 * 任务分发器
 */
declare class UTSTaskDispatcher {
  /**
     在当前任务分发器 异步执行任务
     @param action 任务函数
     @param param 任务函数需要的参数
   */
  async(action : (action : any | null) => void, param ?: any | null) : void
}

/**
 * 监听隐私协议状态改变回调函数参数
 * @internal
 */
declare class PrivacyOption {
  /**
     是否同意用户隐私协议
  */
  isAgree : boolean;
}

/**
 * since 4.81 update kotlin 2.2.0
 */
interface UTSAndroid {

  Suppress(...args:string[]):void;

  /**
     监听 App配置发生变化, 对应 android原生 onAppConfigChange
     @param 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onappconfigchange
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppConfigChange(callback : (res : UTSJSONObject) => void) : void;

  /**
     onAppConfigChange 对应的反注册函数
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappconfigchange
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppConfigChange(callback ?: (res : UTSJSONObject) => void) : void;


  /**
     注册监听 App 内存不足时的系统回调函数 对应原生的API: onTrimMemory
     @param 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onapptrimmemory
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppTrimMemory(callback ?: (res : Number) => void) : void;

  /**
     onAppTrimMemory 对应的反注册函数。
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offapptrimmemory
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppTrimMemory(callback ?: (res : Number) => void) : void;


  /**
     注册监听 activity onPause事件
     @param 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onappactivitypause
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppActivityPause(callback : () => void) : void;

  /**
     onAppActivityPause 对应的反注册函数
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappactivitypause
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppActivityPause(callback ?: () => void) : void;


  /**
     注册监听 activity onResume事件
     @param 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onappactivityresume
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppActivityResume(callback : () => void) : void;


  /**
     onAppActivityResume 对应的反注册函数
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappactivityresume
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppActivityResume(callback ?: () => void) : void;


  /**
     注册监听 activity onDestroy事件
     @param 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/UTSAndroid.html#onAppActivityDestroy
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppActivityDestroy(callback : () => void) : void;

  /**
     onAppActivityDestroy 对应的反注册函数。
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappactivitydestroy
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppActivityDestroy(callback ?: () => void) : void;

  /**
     注册监听 activity onAppActivityResult 函数
     @param callback 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onappactivityresult
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppActivityResult(callback : (requestCode : Int, resultCode : Int, data : Intent?) => void) : void;

  /**
     onAppActivityResult 对应的反注册函数。
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappactivityresult
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppActivityResult(callback ?: (requestCode : Int, resultCode : Int, data : Intent?) => void) : void;


  /**
     注册监听 activity onAppActivityBack 函数
     @param callback 用于监听的响应函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onappactivityback
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppActivityBack(callback : () => void) : void;

  /**
     取消注册监听 activity onAppActivityBack 函数
     @param 准备取消监听的函数,如果传入的函数为null,则移除全部
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offappactivityback
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppActivityBack(callback ?: () => void) : void;


  /**
     获取当前应用Application上下文，对应android平台 Context.getApplicationContext 函数实现
     @return 当前应用程序 上下文实例对象
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappcontext
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppContext() : Context | null;


  /**
     获取当前应用 栈顶的 Activity实例，对应android平台 getActivity 函数实现
     @return 当前应用栈顶的 Activity实例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getuniactivity
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getUniActivity() : Activity | null;

  /**
     获取与当前页面绑定的activity对象，需要注意的是:当页面对象未与activity建立绑定关系时，可能为null
     @return 当前页面绑定的activity示例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#gettoppageactivity
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.0",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.0",
               "unixUtsPlugin": "4.0",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getTopPageActivity() : Activity | null;


  /**
     获取资源文件的原生平台路径。
     @param resourceName 资源文件相对于项目的绝对路径, 如：“/static/logo.png”
     @return 该资源在原生平台的路径
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getresourcepath
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getResourcePath(resourceName : string) : string;


  /**
     获取对象的jvm class实例
     @param input 任意不为空对象，如果传入一个Class类型，则返回该Class对应的jvm class实例
     @return 传入对象所对应的class实例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getjavaclass
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.0",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.0",
               "unixUtsPlugin": "4.0",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getJavaClass(input : any) : Class;

  /**
     获取对象的 KClass 实例
     @param input 任意不为空对象，如果传入一个Class类型，则返回该Class对应的 KClasss实例
     @return 传入对象所对应的KClass实例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getkotlinclass
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.65",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.65",
               "unixUtsPlugin": "4.65",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getKotlinClass(input : any) : KClass;


  /**
     获取app 临时目录。
     @return 返回app临时目录路径。存放在该文件可能会在应用退出后被清理
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappcachepath
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.99",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.99",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppCachePath() : string | null;


  /**
     退出当前应用
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#exit
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  exit() : void;



  /**
     获取一个任务分发器实例
     @param threadName 任务组名称，可能为：
     main: ui thread / dom: 仅uni-app x环境生效，uni-app 环境会自动切换到 ui
     io : io thread
     匿名线程 null 或者 '': 来源线程，如果来源线程不支持任务分发，则会在当前线程执行执行. 这个场景下要求第一个参数必须是线程环境

     @return 一个任务分发器，可以用于分发协程任务
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getdispatcher
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
     @deprecated 已废弃,请使用 uni.createWorker 替代
   */
  getDispatcher(threadName ?: string | null) : UTSTaskDispatcher;


  /**
     获取当前运行的app的AppId。
     @return 当前运行的app的AppId。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappid
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppId() : string;


  /**
     获取当前系统主题样式
     @return 系统主题样式 "dark":暗色模式  "light":亮色模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getostheme
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getOsTheme() : string;

  /**
     获取当前运行环境是否是unimp。
     @return 是否是unimp。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#isunimp
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  isUniMp() : boolean;

  /**
     获取manifest.json 中配置的应用名称
     @return 应用名称。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappname
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppName() : string;

  /**
     获取当前应用是否在暗黑模式
     @return 当前应用是否在暗黑模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappdarkmode
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppDarkMode() : boolean;

  /**
     获取manifest.json 中配置的应用版本信息
     @return 应用版本信息
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getappversion
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppVersion() : UTSJSONObject;

  /**
     获取当前手机端运行环境的 uni 编译规则版本号
     @internal
     @return 编译规则版本号
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "x",
               "unixVaporVer": "5.32",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x",
               "unixVaporUtsPlugin": "5.32"
            },
            "ios": {
               "uniVer": "x",
               "unixVer": "x",
               "unixVaporVer": "5.32",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x",
               "unixVaporUtsPlugin": "5.32"
            },
            "harmony": {
               "uniVer": "x",
               "unixVer": "x",
               "unixVaporVer": "5.32",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x",
               "unixVaporUtsPlugin": "5.32"
            }
        }
     }
   */
  getUniCompilerRuleVersion() : number;


  /**
     获取引擎版本号。
     @return 引擎版本号。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getinnerversion
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getInnerVersion() : string;


  /**
     获取当前是否是uniapp x 环境
     @return uniapp x 环境 true, uniapp 环境： false。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#isuniappx
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  isUniAppX() : boolean;

  /**
     @deprecated 注意：已废弃，请使用 `uni.rpx2px` 替代

     rpx单位 转换为 逻辑像素px单位
     @return 返回对应的逻辑像素值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#rpx2px
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  rpx2px(rpx : number) : number;


  /**
     当前应用是否已取得用户同意隐私协议
     @return true 用户已同意 false 用户未同意
     @deprecated 注意：已废弃，请使用 `uni.getPrivacySetting` 替代
     @internal
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#isprivacyagree
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  isPrivacyAgree() : boolean;


  /**
     设置当前应用是否已取得用户同意隐私协议
     @param state true 用户已同意 false 用户未同意
     @deprecated 注意：已废弃，请使用 `button` 组件设置 open-type 为 agreePrivacyAuthorization 替代
     @internal
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#setprivacyagree
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  setPrivacyAgree(state : boolean) : void;


  /**
     重置当前应用至用户未同意隐私协议
     @deprecated 注意：已废弃，请使用 `uni.resetPrivacyAuthorization` 替代
     @internal
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#resetprivacyagree
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  resetPrivacyAgree() : void;


  /**
     请求系统权限
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#requestsystempermission
     @param requestPermission 期望请求的权限
     @param {boolean} [shallUnCheck=false] 是否忽略权限检查，需要HBuilder X 4.25 之后版本
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  requestSystemPermission(
    context : Activity,
    requestPermission : Array<string>,
    success : (allRight : boolean, grantedList : Array<string>) => void,
    fail : (doNotAskAgain : boolean, grantedList : Array<string>) => void,
    shallUnCheck ?: boolean
  ) : void;


  /**
     检查当前应用是否已经具备指定权限
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#checksystempermissiongranted
     @param requestPermission 期望具备的权限
     @return 请求的权限列表中是否已经具备
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  checkSystemPermissionGranted(
    context : Activity,
    requestPermission : Array<string>
  ) : boolean;

  /**
     跳转至系统权限手动设备列表
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#gotosystempermissionactivity
     @param requestPermission 期望请求的权限
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  gotoSystemPermissionActivity(
    context : Activity,
    requestPermission : Array<string>
  ) : void;


  /**
     获取当前应用不具备的权限列表
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getsystempermissiondenied
     @param requestPermission 期望请求的权限
     @return 请求的权限列表中已经被禁用的部分
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getSystemPermissionDenied(
    context : Activity,
    requestPermission : Array<string>
  ) : Array<string>;



  /**
     页面的rpx像素转换为页面的px像素
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#rpx2px
     @param rpx 待转换的rpx
     @return 转换后的px
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.95",
               "unixVaporVer":"x",
               "uniUtsPlugin": "3.95",
               "unixUtsPlugin": "3.95",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  rpx2px(
    rpx : number
  ) : number;


  /**
     物理像素转换为页面的px像素
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#devicepx2px
     @param devicePX 待转换的物理像素
     @return 转换后的页面px
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.95",
               "unixVaporVer":"x",
               "uniUtsPlugin": "3.95",
               "unixUtsPlugin": "3.95",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  devicePX2px(
    devicePX : number
  ) : number;


  /**
   * 获取指定的颜色。
   * @param value 需要转换的代表色值的字符串，支持一下格式：精简写法的十六进制 如：#f00，十六进制 如：#ff0000，RGB 如：rgb(255, 0, 0)，RGBA 如:rgba(255, 0, 0, 0.5)，色值关键字，如： red
   * @return number Int类型颜色值，转换失败则返回黑色
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsios.html#colorwithstring
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "uniVer": "x",
   *           "unixVer": "5.21",
               "unixVaporVer":"x",
   *           "uniUtsPlugin": "x",
   *           "unixUtsPlugin": "5.21",
               "unixVaporUtsPlugin": "5.21"
   *        }
   *    }
   * }
   */
  colorWithString(value: string) : number;

  /**
     将文件的项目相对地址转换为 运行期对应的绝对地址
     eg.
        'static/logo.png' -> '/storage/sdcard/0/apps/com.xxxx/files/logo.png'

     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#convert2absfullpath
     @param inputPath 待转换的文件相对路径
     @return 转换后文件绝对路径
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.90",
               "unixVaporVer":"x",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "3.90",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  convert2AbsFullPath(
    inputPath : string
  ) : string;


  /**
     将应用的私有文件 通过内置的FileProvider转换为外部应用可以访问的Uri

     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getfileprovideruri
     @param file 待转换的私有文件
     @return 转换后的Uri
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.99",
               "unixVaporVer":"x",
               "uniUtsPlugin": "3.99",
               "unixUtsPlugin": "3.99",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getFileProviderUri(
    file : File
  ) : Uri;


  /**
     获取指定service的指定provider实现

     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getextapiprovider
     @param service 指定的服务名称
     @param providerName 指定provider名称
     @return 指定 provider 实例
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.14",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.14",
               "unixUtsPlugin": "4.14",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getExtApiProvider<T>(
    service : string,
    providerName : string
  ) : T | null;


  /**
     监听隐私协议状态改变

     @deprecated 注意：已废弃，请使用 `uni.onPrivacyAuthorizationChange` 替代
     @internal
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onPrivacyAgreeChange
     @param callback 回调方法
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onPrivacyAgreeChange(callback : (option : PrivacyOption) => void) : void;

  /**
     取消监听隐私协议状态改变

     @deprecated 注意：已废弃，请使用 `uni.offPrivacyAuthorizationChange` 替代
     @internal
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offPrivacyAgreeChange
     @param callback onPrivacyAgreeChange中传入的callback
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offPrivacyAgreeChange(callback : (option : PrivacyOption) => void) : void;

  /**
     注册监听activity回调方法

     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @param {IUniActivityCallback} callback 回调方法，[查看具体子类实现](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html)
     @param pageRoute [页面的路由地址route](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#getcurrentpages),注意如果是tabBar页面,请传'tabBar'字符串
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onActivityCallback(callback : IUniActivityCallback,
    pageRoute ?: string | null) : void;

  /**
     onActivityCallback对应的反注册函数。

     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#offActivityCallback
     @param {IUniActivityCallback} callback onActivityCallback传入的callback
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offActivityCallback(callback : IUniActivityCallback) : void;

  /**
     释放导出到 JavaScript 的原生实例对象在桥接层中的引用。

     调用此方法前，应先执行对象自身的资源清理逻辑。
     @param obj 要释放的原生实例对象
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#destroyinstance
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "x",
               "unixVaporVer":"x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "5.25",
               "unixVaporUtsPlugin": "5.25"
            }
        }
     }
   */
  destroyInstance(obj : any) : void;

  /**
     获取app主题
     @return {string} 值域为 dark | light | auto
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppTheme() : string

  /**
     设置app主题
     @param theme 主题类型 取值范围 "light" | "dark" | "auto"
     @internal
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  setAppTheme(theme : string) : void

  /**
     监听app主题变化
     @param callback app主题变化回调函数
     @internal
     @return 返回监听注册id 可用于注销监听
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onAppThemeChanged(callback : (res : UTSJSONObject) => void) : number

  /**
     注销app主题监听
     @param callbackId callback监听id
     @internal
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offAppThemeChanged(callbackId : number) : void

  /**
     监听系统主题变化
     @param callback 主题变化回调函数
     @internal
     @return 返回监听注册id 可用于注销监听
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onOsThemeChanged(callback : (res : UTSJSONObject) => void) : number

  /**
     注销系统主题监听
     @param callbackId callback监听id
     @internal
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.18",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.18",
               "unixUtsPlugin": "4.18",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  offOsThemeChanged(callbackId : number) : void

  /**
     获取app端启动参数
     @internal
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.23",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.23",
               "unixUtsPlugin": "4.23",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getAppLaunchOptions() : UTSJSONObject

  /**
     获取类型T 对应的 java.lang.reflect.Type 对象
      @inline
      @reified
      @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.02",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.02",
               "unixUtsPlugin": "4.02",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getGenericType<T>() : Type

  /**
     获取类型 T 对应的 class name
     @inline
     @reified
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "4.02",
               "unixVaporVer":"x",
               "uniUtsPlugin": "4.02",
               "unixUtsPlugin": "4.02",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  getGenericClassName<T>() : string


}


declare global {
  var UTSAndroid : UTSAndroid;
}
