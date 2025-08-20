import Activity from 'android.app.Activity'
/**
 * 公共返回参数
 */
declare class UniActivityParams {
  /**
     当前activity示例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.62",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.62"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x"
            }
        }
     }
   */
  activity : Activity;
  /**
     页面路由地址
     @tutorial https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#getcurrentpages
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  pageRoute : string;
  /**
     如果对应的方法有返回值，会将返回值赋给result，默认null
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  result : any | null;
}
interface IUniActivityCallback { }
/**
 * activity 自带方法，注意onPrexxx的方法是在super之前调用
 */
declare class UniActivityCallback implements IUniActivityCallback {
  /**
     对应原生 Activity 的 [onAttachFragment](https://developer.android.com/reference/android/app/Activity#onAttachFragment(android.app.Fragment)) 函数，此方法在 Fragment 被附加到 Activity 时被调用，以处理相关联的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 fragment 表示被附加的 Fragment 实例。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Fragment} fragment 被附加的 Fragment 实例
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onAttachFragment(params : UniActivityParams, fragment : Fragment) : void;
  /**
     对应原生 Activity 的 [onUserInteraction](https://developer.android.com/reference/android/app/Activity#onUserInteraction()) 函数，该方法在用户与设备进行交互时被调用，用于处理用户交互前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onUserInteraction(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onUserLeaveHint](https://developer.android.com/reference/android/app/Activity#onUserLeaveHint()) 函数，此方法在用户即将离开应用且返回到上一级活动（通过按Home键等操作造成的）时被调用，用于处理用户即将离开应用前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onUserLeaveHint(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onActivityResult](https://developer.android.com/reference/android/app/Activity#onActivityResult(int,%20int,%20android.content.Intent)) 函数，此方法在从另一个活动返回数据时被调用，用于处理返回数据前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二和第三个参数分别代表请求代码和结果代码，第四个参数 data 为返回的数据。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Int} requestCode 请求代码
     @param {Int} resultCode 结果代码
     @param {Intent | null} data 返回的数据
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onActivityResult(params : UniActivityParams, requestCode : Int, resultCode : Int, data : Intent | null) : void;

  /**
     对应原生 Activity 的 [onRequestPermissionsResult](https://developer.android.com/reference/android/app/Activity#onRequestPermissionsResult(int,%20java.lang.String[],%20int[])) 函数，此方法在用户响应权限请求后被调用，用于处理权限请求结果前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 requestCode 为请求代码，第三个参数 permissions 为请求的权限数组，第四个参数 grantResults 为权限请求结果数组。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Int} requestCode 请求代码
     @param {MutableList<String>} permissions 请求的权限
     @param {IntArray} grantResults 权限请求结果
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onRequestPermissionsResult(params : UniActivityParams, requestCode : Int, permissions : MutableList<String>, grantResults : IntArray) : void;

  /**
     对应原生 Activity 的 [onApplyThemeResource](https://developer.android.com/reference/android/app/Activity#onApplyThemeResource(android.content.res.Resources.Theme,%20int,%20boolean)) 函数，此方法在应用主题资源时被调用，用于处理主题资源应用前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 theme 为要应用的主题资源，第三个参数 resid 为资源ID，第四个参数 first 标示是否为首次应用。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Resources.Theme} theme 要应用的主题资源
     @param {Int} resid 资源ID
     @param {Boolean} first 是否为首次应用
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onApplyThemeResource(params : UniActivityParams, theme : Resources.Theme, resid : Int, first : Boolean) : void;

  /**
     对应原生 Activity 的 [onCreateView](https://developer.android.com/reference/android/app/Activity#onCreateView(android.view.View,%20java.lang.String,%20android.content.Context,%20android.util.AttributeSet))函数，此方法在视图创建时被调用，用于处理视图创建前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，后续参数分别为 parent 视图的父视图，name 视图名称，context 视图的上下文环境及 attrs 视图的属性集。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {View | null} parent 父视图
     @param {string} name 视图名称
     @param {Context} context 上下文环境
     @param {AttributeSet} attrs 属性集
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onCreateView(params : UniActivityParams, parent : View | null, name : string, context : Context, attrs : AttributeSet) : void;
  /**
     对应原生 Activity [onTitleChanged](https://developer.android.com/reference/android/app/Activity#onTitleChanged(java.lang.CharSequence,%20int)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数包括页面路由地址与方法返回值
     @param {String} title 新的标题字符
     @param {Int} color 新的标题颜色
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onTitleChanged(params : UniActivityParams, title : string, color : Int) : void;

  /**
     对应原生 Activity [onChildTitleChanged](https://developer.android.com/reference/android/app/Activity#onChildTitleChanged(android.app.Activity,%20java.lang.CharSequence)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数包括页面路由地址与方法返回值
     @param {Activity} childActivity 子Activity的实例
     @param {String} title 新的子Activity标题字符
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onChildTitleChanged(params : UniActivityParams, childActivity : Activity, title : string) : void;

  /**
     对应原生 Activity [onContextMenuClosed](https://developer.android.com/reference/android/app/Activity#onContextMenuClosed(android.view.Menu)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     当上下文菜单被关闭时调用，可用于执行菜单关闭后的操作。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {Menu} menu 关闭的菜单
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onContextMenuClosed(params : UniActivityParams, menu : Menu) : void;
  /**
     对应原生 Activity [onCreateContextMenu](https://developer.android.com/reference/android/app/Activity#onCreateContextMenu(android.view.ContextMenu,%20android.view.View,%20android.view.ContextMenu.ContextMenuInfo)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     当创建上下文菜单时调用，可用于定制上下文菜单的内容。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {ContextMenu} menu 要创建的上下文菜单
     @param {View} v 与上下文菜单相关联的视图
     @param {ContextMenu.ContextMenuInfo} menuInfo 关联上下文菜单的附加信息，可为空
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onCreateContextMenu(params : UniActivityParams, menu : ContextMenu, v : View, menuInfo : ContextMenu.ContextMenuInfo | null) : void;

  /**
     对应原生 Activity [onOptionsMenuClosed](https://developer.android.com/reference/android/app/Activity#onOptionsMenuClosed(android.view.Menu)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     当选项菜单被关闭时调用。可用于执行菜单关闭后的操作。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {Menu} menu 关闭的菜单
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onOptionsMenuClosed(params : UniActivityParams, menu : Menu) : void;
  /**
     对应原生 Activity [onPrepareNavigateUpTaskStack](https://developer.android.com/reference/android/app/Activity#onPrepareNavigateUpTaskStack(android.app.TaskStackBuilder)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     此方法在用户从当前 Activity 导航到应用的祖先 Activity 时调用，以准备返回栈。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {TaskStackBuilder} builder 返回栈建造者，用于构造导航返回栈
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPrepareNavigateUpTaskStack(params : UniActivityParams, builder : TaskStackBuilder) : void;

  /**
     对应原生 Activity [onProvideAssistData](https://developer.android.com/reference/android/app/Activity#onProvideAssistData(android.os.Bundle)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     此方法在构建辅助数据时被调用，比如在使用 Google Now 时展示有关当前 Activity 的信息。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {Bundle} data 提供辅助数据的 Bundle
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onProvideAssistData(params : UniActivityParams, data : Bundle) : void;
  /**
     对应原生 Activity [onProvideAssistContent](https://developer.android.com/reference/android/app/Activity#onProvideAssistContent(android.app.assist.AssistContent)) 函数，注意第一个参数为自定义参数 UniActivityParams。
     此方法允许Activity提供有关其当前在屏幕上显示的内容的附加信息，这有助于提升语音搜索等辅助功能的体验。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {AssistContent} outContent 通过这个参数，Activity可以提供有关其内容的结构化信息。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onProvideAssistContent(params : UniActivityParams, outContent : AssistContent) : void;

  /**
     对应原生 Activity [onAttachFragment](https://developer.android.com/reference/android/app/Activity#onAttachFragment(android.app.Fragment)) 函数，该方法在Fragment与Activity建立关联时调用。本方法的调用时机在super.onAttachFragment()之前，它允许您在Fragment完全附加到Activity之前进行必要的设置或初始化。
     提在super方法之前调用
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {Fragment} fragment 即将附加的Fragment对象。这允许Activity在Fragment完全附加之前与之交互。
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreAttachFragment(params : UniActivityParams, fragment : Fragment) : void;
  /**
     对应原生 Activity [onUserInteraction](https://developer.android.com/reference/android/app/Activity#onUserInteraction()) 函数。
     在用户与设备进行交互时被调用，例如触摸屏幕或按键。开发者可以覆盖此方法以执行特定操作，如取消自动隐藏的导航控件等。
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreUserInteraction(params : UniActivityParams) : void;

  /**
     对应原生 Activity [onUserLeaveHint](https://developer.android.com/reference/android/app/Activity#onUserLeaveHint()) 函数。
     当用户即将离开当前Activity时被调用，通常是因为用户按了 "Home" 键或最近任务键。可以覆盖此方法来实现特定的暂停、保存状态或资源释放操作。
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreUserLeaveHint(params : UniActivityParams) : void;

  /**
     对应原生 Activity [onActivityResult](https://developer.android.com/reference/android/app/Activity#onActivityResult(int,%20int,%20android.content.Intent)) 函数。
     当一个启动的Activity返回结果时调用。在super方法之前调用。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {int} requestCode 请求代码，标识发送请求的Activity
     @param {int} resultCode 结果代码，表明操作是否成功或取消
     @param {Intent | null} data 含返回数据的Intent对象或null
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreActivityResult(params : UniActivityParams, requestCode : Int, resultCode : Int, data : Intent | null) : void;

  /**
     对应原生 Activity [onRequestPermissionsResult](https://developer.android.com/reference/android/app/Activity#onRequestPermissionsResult(int,%20java.lang.String[],%20int[])) 函数。
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @param {int} requestCode 请求代码，与请求权限相关联
     @param {MutableList<String>} permissions 请求的权限
     @param {IntArray} grantResults 授予权限的结果数组
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
   */
  onPreRequestPermissionsResult(params : UniActivityParams, requestCode : Int, permissions : MutableList<String>, grantResults : IntArray) : void;
  /**
     对应原生 Activity [onApplyThemeResource](https://developer.android.com/reference/android/app/Activity#onApplyThemeResource(android.content.res.Resources.Theme,int,boolean)) 函数。
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {Resources.Theme} theme 当前 Activity 即将应用的主题资源
     @param {int} resid 用于应用主题的资源ID
     @param {boolean} first 是否为第一次应用该主题
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreApplyThemeResource(params : UniActivityParams, theme : Resources.Theme, resid : Int, first : Boolean) : void;

  /**
     对应原生 Activity [onCreateView](https://developer.android.com/reference/android/app/Activity#onCreateView(android.view.View,java.lang.String,android.content.Context,android.util.AttributeSet)) 函数。
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {View | null} parent 即将创建视图的父视图
     @param {String} name 视图的标识名
     @param {Context} context 视图创建时的上下文
     @param {AttributeSet} attrs 视图的属性集
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreCreateView(params : UniActivityParams, parent : View | null, name : String, context : Context, attrs : AttributeSet) : void;

  /**
     对应原生 Activity [onTitleChanged](https://developer.android.com/reference/android/app/Activity#onTitleChanged(java.lang.CharSequence,%20int)) 函数，
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。
     @param {String} title 即将设置的新标题。
     @param {int} color 标题的颜色。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 了解更多关于uni-app x 框架的活动回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreTitleChanged(params : UniActivityParams, title : String, color : Int) : void;

  /**
     对应原生 Activity [onChildTitleChanged](https://developer.android.com/reference/android/app/Activity#onChildTitleChanged(android.app.Activity,%20java.lang.CharSequence)) 函数，
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。
     @param {Activity} childActivity 标题变更的子Activity。
     @param {String} title 即将设置的新标题。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 查看详细信息关于如何在uni-app x框架下注册Activity的回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreChildTitleChanged(params : UniActivityParams, childActivity : Activity, title : String) : void;

  /**
     对应原生 Activity [onContextMenuClosed](https://developer.android.com/reference/android/app/Activity#onContextMenuClosed(android.view.Menu)) 函数，
     在super方法之前调用
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。
     @param {Menu} menu 引发上下文菜单关闭事件的菜单。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 查看更多关于在 uni-app x 框架下如何注册 Activity 的回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreContextMenuClosed(params : UniActivityParams, menu : Menu) : void;

  /**
     对应原生 Activity [onCreateContextMenu](https://developer.android.com/reference/android/app/Activity#onCreateContextMenu(android.view.ContextMenu,%20android.view.View,%20android.view.ContextMenu.ContextMenuInfo)) 函数，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。
     @param {ContextMenu} menu 要创建的上下文菜单。
     @param {View} v 引发上下文菜单的视图。
     @param {ContextMenu.ContextMenuInfo | null} menuInfo 与上下文菜单关联的上下文菜单信息，如果没有则为 null。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 查看更多关于在 uni-app x 框架下如何注册 Activity 的回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreCreateContextMenu(params : UniActivityParams, menu : ContextMenu, v : View, menuInfo : ContextMenu.ContextMenuInfo | null) : void;

  /**
     对应原生 Activity [onOptionsMenuClosed](https://developer.android.com/reference/android/app/Activity#onOptionsMenuClosed(android.view.Menu)) 函数，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值。
     @param {Menu} menu 被关闭的选项菜单。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 查看如何在 uni-app x 框架内注册回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreOptionsMenuClosed(params : UniActivityParams, menu : Menu) : void;

  /**
     对应原生 Activity [onPrepareNavigateUpTaskStack](https://developer.android.com/reference/android/app/Activity#onPrepareNavigateUpTaskStack(android.app.TaskStackBuilder)) 函数，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值。
     @param {TaskStackBuilder} builder 用于构建向上导航任务栈的 TaskStackBuilder 实例。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 详细了解如何在 uni-app x 框架内注册和使用回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPrePrepareNavigateUpTaskStack(params : UniActivityParams, builder : TaskStackBuilder) : void;
  /**
     对应原生 Activity [onProvideAssistData](https://developer.android.com/reference/android/app/Activity#onProvideAssistData(android.os.Bundle)) 函数，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值。
     @param {Bundle} data 辅助数据的捆绑包。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 了解如何注册和实施活动回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreProvideAssistData(params : UniActivityParams, data : Bundle) : void;

  /**
     对应原生 Activity [onProvideAssistContent](https://developer.android.com/reference/android/app/Activity#onProvideAssistContent(android.app.assist.AssistContent)) 函数，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值。
     @param {AssistContent} outContent 辅助内容的对象。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 详细了解如何在 uni-app x 框架内注册和使用回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreProvideAssistContent(params : UniActivityParams, outContent : AssistContent) : void;

}


/**
 * Component 相关方法，注意onPrexxx的方法是在super之前调用
 */
declare class UniActivityComponentCallback implements IUniActivityCallback {
  /**
     对应原生 Activity [onConfigurationChanged](https://developer.android.com/reference/android/app/Activity#onConfigurationChanged(android.content.res.Configuration)) 函数，
     当设备配置（如屏幕大小、方向、语言等）发生改变时调用。开发者可以通过重写此方法来处理配置更改事件。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这允许开发者在处理配置更改时访问特定的环境信息。
     @param {Configuration} newConfig 新的设备配置数据。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 在 uni-app x 框架中注册和实现活动回调函数的指南。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onConfigurationChanged(params : UniActivityParams, newConfig : Configuration) : void;

  /**
     对应原生 Activity [onLowMemory](https://developer.android.com/reference/android/app/Activity#onLowMemory()) 函数，
     当系统运行在低内存环境下时调用。在这种情况下，开发者应当清除不必要的资源以帮助系统回收内存，减轻内存压力。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这提供了一个机会，让开发者能够在应用面临低内存情况时执行特定逻辑。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 学习如何在 uni-app x 框架中注册和调用活动回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onLowMemory(params : UniActivityParams) : void;
  /**
     对应原生 Activity [onTrimMemory](https://developer.android.com/reference/android/app/Activity#onTrimMemory(int)) 函数，
     当系统决定当前进程需要缩减内存使用时调用。开发者可以根据传递的内存级别清除不必要的资源以帮助系统管理内存。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这使得开发者能够基于应用的当前状态适当地响应内存清理需求。
     @param {int} level 提供了当前内存清理级别的指示，开发者可以根据这个级别确定清理资源的紧迫性。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 详细解释如何在 uni-app x 框架中注册和实现活动回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onTrimMemory(params : UniActivityParams, level : Int) : void;

  /**
     该方法是对原生  Activity [onConfigurationChanged](https://developer.android.com/reference/android/app/Activity#onConfigurationChanged(android.content.res.Configuration)) 函数的扩展，
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这为开发者提供了一个机会，让他们能够在配置更改生效之前对其进行预处理。
     @param {Configuration} newConfig 提供了新的设备配置信息，允许开发者根据这些信息调整应用行为。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供对如何在 uni-app x 框架内注册和使用回调方法的进一步理解。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreConfigurationChanged(params : UniActivityParams, newConfig : Configuration) : void;

  /**
     此方法在 Activity 的 [onLowMemory](https://developer.android.com/reference/android/app/Activity#onLowMemory()) 方法被触发之前调用，
     允许开发者在系统通知内存不足之前执行自定义逻辑。这可以用于积极地释放资源或减少内存使用，以避免应用被系统杀死。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。它们可以被用来做出更加上下文相关的响应。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 了解如何在 uni-app x 框架中注册和实现此回调函数。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreLowMemory(params : UniActivityParams) : void;

  /**
     此方法在 Activity 的 [onTrimMemory](https://developer.android.com/reference/android/app/Activity#onTrimMemory(int)) 方法被触发之前调用，
     允许开发者在系统建议应用减少内存使用之前预先采取措施。这里的处理可以根据传递的内存级别清除缓存或其他不必要的资源。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。使用这些信息，可以选择性地进行内存优化。
     @param {int} level 系统传递的当前内存清理级别的枚举值。开发者可以基于这个级别来调整他们的内存管理策略。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 为开发者提供一个如何在 uni-app x 集成此回调方法的参考。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreTrimMemory(params : UniActivityParams, level : Int) : void;

}


/**
 * KeyEvent 相关方法，注意onPrexxx的方法是在super之前调用
 */
declare class UniActivityKeyEventCallback implements IUniActivityCallback {
  /**
     此方法对应 Android Activity 的 [onKeyDown](https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)) 函数，
     在用户按下键盘键（例如返回键、菜单键等）时调用。可以用于自定义按键事件的响应逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前活动上下文以及任何先前操作的结果。
     @param {int} keyCode 表明被按下的键的键码。
     @param {KeyEvent | null} event 提供了关于按键事件的详细信息，包括按键的动作和代码。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 指导如何在 uni-app x 框架中注册和使用键盘事件回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onKeyDown(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;

  /**
     此方法对应 Android Activity 的 [onKeyLongPress](https://developer.android.com/reference/android/app/Activity#onKeyLongPress(int,%20android.view.KeyEvent)) 函数，
     在用户长按键盘键时调用。这通常用于执行按键的二级功能。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这样，开发者可以利用设置的返回参数执行上下文相关的操作。
     @param {int} keyCode 表明长按的键的键码。
     @param {KeyEvent | null} event 提供关于长按键事件的额外信息，允许开发者根据需要来响应事件。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供详细信息，让开发者了解如何在 uni-app x 框架中捕捉和处理长按键事件。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onKeyLongPress(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;
  /**
     此方法对应 Android Activity 的 [onKeyUp](https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)) 函数，
     在用户松开键盘键时调用。可以用于处理按键抬起事件。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供当前上下文及函数调用的相关结果。
     @param {int} keyCode 表示松开的键的键码。
     @param {KeyEvent | null} event 提供了关于按键事件的详细信息，包含按键的动作和代码等。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onKeyUp(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;

  /**
     此方法对应 Android Activity 的 [onKeyMultiple](https://developer.android.com/reference/android/app/Activity#onKeyMultiple(int,%20int,%20android.view.KeyEvent)) 函数，
     在用户进行多个按键事件时调用（例如，当用户按住某个键时会连续触发此事件）。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。可以用来执行基于当前应用状态的操作。
     @param {int} keyCode 表示重复按下的键的键码。
     @param {int} repeatCount 表明此键的重复次数。
     @param {KeyEvent | null} event 提供按键事件的详细信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 解释如何在 uni-app x 中注册和使用此回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onKeyMultiple(params : UniActivityParams, keyCode : Int, repeatCount : Int, event : KeyEvent | null) : void;

  /**
     在 Android Activity 的 [onKeyDown](https://developer.android.com/reference/android/app/Activity#onKeyDown(int,%20android.view.KeyEvent)) 方法触发之前调用，
     允许开发者在标准按键处理流程之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。便于开发者获取上下文信息和返回的数据。
     @param {int} keyCode 按下的键的键码。
     @param {KeyEvent | null} event 提供按键事件的详细信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供如何在 uni-app x 框架中注册此回调的指示。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreKeyDown(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;

  /**
     在 Android Activity 的 [onKeyLongPress](https://developer.android.com/reference/android/app/Activity#onKeyLongPress(int,%20android.view.KeyEvent)) 方法触发之前调用，
     允许开发者在标准长按处理流程之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。开发者可以利用这些返回值进行进一步处理。
     @param {int} keyCode 长按的键的键码。
     @param {KeyEvent | null} event 提供长按键事件的详细信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 指导如何在 uni-app x 框架中注册和使用长按键事件回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreKeyLongPress(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;

  /**
     在 Android Activity 的 [onKeyUp](https://developer.android.com/reference/android/app/Activity#onKeyUp(int,%20android.view.KeyEvent)) 方法触发之前调用，
     允许开发者在标准按键抬起处理流程之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。便于开发者获取和处理返回的数据。
     @param {int} keyCode 松开的键的键码。
     @param {KeyEvent | null} event 提供按键抬起事件的详细信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供如何在 uni-app x 框架中注册和使用此回调方法的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreKeyUp(params : UniActivityParams, keyCode : Int, event : KeyEvent | null) : void;

  /**
     在 Android Activity 的 [onKeyMultiple](https://developer.android.com/reference/android/app/Activity#onKeyMultiple(int,%20int,%20android.view.KeyEvent)) 方法触发之前调用，
     允许开发者在处理多个按键事件之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。开发者可以根据这些返回值对按键事件进行处理。
     @param {int} keyCode 表示触发多次的键的键码。
     @param {int} repeatCount 按键重复的次数。
     @param {KeyEvent | null} event 提供多个按键事件的详细信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 指导如何在 uni-app x 框架中注册和使用此回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreKeyMultiple(params : UniActivityParams, keyCode : Int, repeatCount : Int, event : KeyEvent | null) : void;
}


/**
 * activity 生命周期相关方法，注意onPrexxx的方法是在super之前调用
 */
declare class UniActivityLifeCycleCallback implements IUniActivityCallback {
  /**
     此方法对应 Android Activity 的 [onCreate](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) 函数，
     当Activity正在被创建时调用。这个回调提供了一种方法来执行任何初始化——创建视图、绑定数据等操作。
     注意，由于注册时机的问题，首页无法回调此方法
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值，这些参数为开发者提供了当前上下文及函数调用的相关结果。
     @param {Bundle | null} savedInstanceState 如果Activity在之前被销毁，现在正在重新创建，这个Bundle将包含上次保存的状态数据。如果Activity是首次创建，则为null。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onCreate(params : UniActivityParams, savedInstanceState : Bundle | null) : void;

  /**
     在 Android Activity 的 [onCreate](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle)) 方法触发之前调用，
     允许开发者在 Activity 创建之前执行自定义逻辑。
     注意，由于注册时机的问题，首页无法回调此方法
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前的上下文信息和方法调用的结果。
     @param {Bundle | null} savedInstanceState 如果 Activity 正在重新创建，则此参数包含之前保存的状态信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreCreate(params : UniActivityParams, savedInstanceState : Bundle | null) : void;


  /**
     对应原生 Activity 的 [onStart](https://developer.android.com/reference/android/app/Activity#onStart()) 函数，当Activity即将对用户可见时调用。
     注意，由于注册时机的问题，首页无法回调此方法
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 了解如何在uni-app x框架中注册和使用活动回调。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onStart(params : UniActivityParams) : void;
  /**
     在 Android Activity 的 [onStart](https://developer.android.com/reference/android/app/Activity#onStart()) 方法触发之前调用，
     允许开发者在 Activity 开始之前执行自定义逻辑。
     注意，由于注册时机的问题，首页无法回调此方法
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了进行操作所需的上下文信息。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 解释如何在 uni-app x 框架中注册和使用此回调方法。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreStart(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onRestart](https://developer.android.com/reference/android/app/Activity#onRestart()) 函数，当Activity在停止后重新启动前调用。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数,包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onRestart(params : UniActivityParams) : void;
  /**
     对应原生 Activity 的 [onRestart](https://developer.android.com/reference/android/app/Activity#onRestart()) 函数，在super方法之前调用。此为在 Activity 重启前额外的准备步骤，提供了自定义操作的机会。
     在 super 方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreRestart(params : UniActivityParams) : void;
  /**
     对应原生 Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 函数，在 Activity 准备和用户进行交互时调用。此时 Activity 处于运行状态的顶层。
     注意第一个参数为自定义参数 UniActivityParams。
     注意，由于注册时机的问题，首页首次无法回调此方法
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onResume(params : UniActivityParams) : void;

  /**
     在 Android Activity 的 [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法触发之前调用，
     允许开发者在 Activity 恢复之前执行自定义逻辑。
     注意，由于注册时机的问题，首页首次无法回调此方法
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。借助这些参数，开发者可以对 Activity 的恢复行为进行定制。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 指导如何在 uni-app x 框架中注册并实现此回调功能。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreResume(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 函数，当 Activity 开始进入不活动状态（即用户即将离开此 Activity）时调用。此时应当暂停正在进行的操作和更新 UI 数据。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPause(params : UniActivityParams) : void;

  /**
     在 Android Activity 的 [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法触发之前调用，
     允许开发者在 Activity 暂停之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数提供了进行必要操作所需的上下文。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPrePause(params : UniActivityParams) : void;


  /**
     对应原生 Activity 的 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 函数，在 Activity 即将停止时被调用，这通常是因为 Activity 即将被销毁，或因为用户切换到了另一个 Activity。在此阶段，应保存数据或进行清理工作。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onStop(params : UniActivityParams) : void;

  /**
     在 Android Activity 的 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法触发之前调用，
     允许开发者在 Activity 停止之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。利用这些返回参数，开发者可以优化 Activity 的停止过程。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 解决如何在 uni-app x 框架中注册及应用此回调的相关指引。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreStop(params : UniActivityParams) : void;

  /**
     在 Android Activity 的 [onDestroy](https://developer.android.com/reference/android/app/Activity#onDestroy()) 方法触发时调用，
     允许开发者在 Activity 销毁之前执行自定义逻辑或清理资源。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这些参数为开发者提供了当前的上下文信息和方法调用的结果。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onDestroy(params : UniActivityParams) : void;

  /**
     在 Android Activity 的 [onDestroy](https://developer.android.com/reference/android/app/Activity#onDestroy()) 方法触发之前调用，
     允许开发者在 Activity 销毁之前执行自定义逻辑。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值。这为开发者提供了一个机会，在 Activity 销毁之前做必要的资源释放与保存。
     @tutorial [注册活动回调](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback) - 提供了如何在 uni-app x 框架中注册及实现此功能的指南。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreDestroy(params : UniActivityParams) : void;
}

/**
 * window 相关方法，注意onPrexxx的方法是在super之前调用
 */
declare class UniActivityWindowCallback implements IUniActivityCallback {
  /**
     对应原生 Activity 的 [onDetachedFromWindow](https://developer.android.com/reference/android/view/View#onDetachedFromWindow()) 函数，当 Activity 的窗口从窗口管理器中移除时调用。这是进行最后清理的好时机。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onDetachedFromWindow(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onContentChanged](https://developer.android.com/reference/android/app/Activity#onContentChanged()) 函数，当 Activity 的内容视图更改时调用。这可以作为响应内容更改并更新 UI 的适当时机。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onContentChanged(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onWindowAttributesChanged](https://developer.android.com/reference/android/view/Window.Callback#onWindowAttributesChanged(android.view.WindowManager.LayoutParams)) 函数，当当前窗口属性更改时调用，如大小、透明度等。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 attrs 为窗口参数。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {WindowManager.LayoutParams} attrs 新的窗口属性
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onWindowAttributesChanged(params : UniActivityParams, attrs : WindowManager.LayoutParams) : void;

  /**
     对应原生 Activity 的 [onWindowFocusChanged](https://developer.android.com/reference/android/app/Activity#onWindowFocusChanged(boolean)) 函数，当 Activity 的窗口焦点发生变化时调用，如获得或失去焦点。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasFocus 指示窗口是否获得了焦点。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {Boolean} hasFocus 窗口是否获得了焦点
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onWindowFocusChanged(params : UniActivityParams, hasFocus : Boolean) : void;

  /**
     对应原生 Activity 的 [onAttachedToWindow](https://developer.android.com/reference/android/view/View#onAttachedToWindow()) 函数，当 Activity 的窗口被添加到窗口管理器时调用。这标志着 Activity 可以开始与用户交互。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onAttachedToWindow(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onPanelClosed](https://developer.android.com/reference/android/app/Activity#onPanelClosed(int,%20android.view.Menu)) 函数，当菜单面板被关闭时调用，可以在这里做一些清理工作。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 featureId 为面板编号，第三个参数 menu 为面板的菜单。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {Int} featureId 面板编号
     @param {Menu} menu 面板的菜单
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPanelClosed(params : UniActivityParams, featureId : Int, menu : Menu) : void;
  /**
     对应原生 Activity 的 [onSearchRequested](https://developer.android.com/reference/android/app/Activity#onSearchRequested()) 函数，当用户请求搜索操作时调用。您可以在这里启动一个搜索界面。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onSearchRequested(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，当窗口开始进入操作模式时调用，如选择文本操作。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式回调。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {ActionMode.Callback | null} callback 操作模式的回调
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null) : void;

  /**
     对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback,%20int)) 函数，使用特定类型时调用。例如，浮动或类型化的操作模式。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式回调，第三个参数 type 为操作模式类型。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {ActionMode.Callback | null} callback 操作模式的回调
     @param {Int} type 操作模式的类型
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null, type : Int) : void;

  /**
     对应原生 Activity 的 [onActionModeFinished](https://developer.android.com/reference/android/app/Activity#onActionModeFinished(android.view.ActionMode)) 函数，当操作模式结束时调用。可以在此处执行清理工作。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 为结束的操作模式。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {ActionMode | null} mode 结束的操作模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onActionModeFinished(params : UniActivityParams, mode : ActionMode | null) : void;

  /**
     对应原生 Activity 的 [onActionModeStarted](https://developer.android.com/reference/android/app/Activity#onActionModeStarted(android.view.ActionMode)) 函数，当操作模式开始时调用。可以在此处进行初始化工作。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 为开始的操作模式。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {ActionMode | null} mode 开始的操作模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onActionModeStarted(params : UniActivityParams, mode : ActionMode | null) : void;

  /**
     对应原生 Activity 的 [onProvideKeyboardShortcuts](https://developer.android.com/reference/android/app/Activity#onProvideKeyboardShortcuts(java.util.List,%20android.view.Menu,%20int)) 函数，当用户请求显示键盘快捷方式帮助时调用。可以在此处提供快捷方式信息。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 data 为键盘快捷方式群组的列表，第三个参数 menu 为相关联的菜单（如果有），第四个参数 deviceId 为请求快捷方式的设备ID。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {MutableList<KeyboardShortcutGroup> | null} data 键盘快捷方式群组的列表
     @param {Menu | null} menu 相关联的菜单
     @param {Int} deviceId 设备ID
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onProvideKeyboardShortcuts(params : UniActivityParams, data : MutableList<KeyboardShortcutGroup> | null, menu : Menu | null, deviceId : Int) : void;

  /**
     对应原生 Activity 的 [onPointerCaptureChanged](https://developer.android.com/reference/android/app/Activity#onPointerCaptureChanged(boolean)) 函数，当指针捕获状态更改时调用。可以在此处更新 UI 或状态来响应捕获状态的变化。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasCapture 指示是否启用了指针捕获。
     @param {UniActivityParams} params 统一返回参数, 包括页面路由地址与方法返回值
     @param {Boolean} hasCapture 是否启用了指针捕获
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 为开发者提供如何在 uni-app x 框架中注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPointerCaptureChanged(params : UniActivityParams, hasCapture : Boolean) : void;

  /**
     对应原生 Activity 的 [onDetachedFromWindow](https://developer.android.com/reference/android/view/View#onDetachedFromWindow()) 函数，此方法在super.onDetachedFromWindow() 调用之前被调用，用于处理 Activity 的窗口从窗口管理器中即将移除前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreDetachedFromWindow(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onContentChanged](https://developer.android.com/reference/android/app/Activity#onContentChanged()) 函数，此方法在super.onContentChanged() 调用之前被调用，用于处理 Activity 内容更改前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreContentChanged(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onWindowAttributesChanged](https://developer.android.com/reference/android/view/Window.Callback#onWindowAttributesChanged(android.view.WindowManager.LayoutParams)) 函数，此方法在super.onWindowAttributesChanged() 调用之前被调用，用于处理窗口属性更改前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 attrs 为窗口属性参数。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {WindowManager.LayoutParams} attrs 窗口属性
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreWindowAttributesChanged(params : UniActivityParams, attrs : WindowManager.LayoutParams) : void;

  /**
     对应原生 Activity 的 [onWindowFocusChanged](https://developer.android.com/reference/android/app/Activity#onWindowFocusChanged(boolean)) 函数，此方法在super.onWindowFocusChanged() 调用之前被调用，用于处理窗口焦点更改前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasFocus 表示是否获得焦点。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Boolean} hasFocus 窗口是否获得焦点
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreWindowFocusChanged(params : UniActivityParams, hasFocus : Boolean) : void;

  /**
     对应原生 Activity 的 [onAttachedToWindow](https://developer.android.com/reference/android/view/View#onAttachedToWindow()) 函数，此方法在super.onAttachedToWindow() 调用之前被调用，用于处理窗口附加到窗口管理器前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreAttachedToWindow(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onPanelClosed](https://developer.android.com/reference/android/app/Activity#onPanelClosed(int,%20android.view.Menu)) 函数，此方法在super.onPanelClosed() 调用之前被调用，用于处理面板关闭前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 featureId 表示面板的特征标识，第三个参数 menu 表示关闭的面板的菜单。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Int} featureId 面板的特征标识
     @param {Menu} menu 面板的菜单
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPrePanelClosed(params : UniActivityParams, featureId : Int, menu : Menu) : void;

  /**
     对应原生 Activity 的 [onSearchRequested](https://developer.android.com/reference/android/app/Activity#onSearchRequested()) 函数，此方法在super.onSearchRequested() 调用之前被调用，用于处理搜索请求前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreSearchRequested(params : UniActivityParams) : void;

  /**
     对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，此方法在super.onWindowStartingActionMode() 调用之前被调用，用于处理窗口开始操作模式前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式的回调函数。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {ActionMode.Callback | null} callback 操作模式的回调函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null) : void;

  /**
     对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback)) 函数，此方法在super.onWindowStartingActionMode() 调用之前被调用，用于处理窗口开始操作模式前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式的回调函数。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {ActionMode.Callback | null} callback 操作模式的回调函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null) : void;

  /**
     对应原生 Activity 的 [onWindowStartingActionMode](https://developer.android.com/reference/android/app/Activity#onWindowStartingActionMode(android.view.ActionMode.Callback,%20int)) 函数，此方法在super.onWindowStartingActionMode() 调用之前被调用，用于处理特定类型操作模式开始前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 callback 为操作模式的回调函数，第三个参数 type 为操作模式的类型。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {ActionMode.Callback | null} callback 操作模式的回调函数
     @param {Int} type 操作模式的类型
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreWindowStartingActionMode(params : UniActivityParams, callback : ActionMode.Callback | null, type : Int) : void;

  /**
     对应原生 Activity 的 [onActionModeFinished](https://developer.android.com/reference/android/app/Activity#onActionModeFinished(android.view.ActionMode)) 函数，此方法在super.onActionModeFinished() 调用之前被调用，用于处理操作模式结束前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 表示结束的操作模式。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {ActionMode | null} mode 结束的操作模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreActionModeFinished(params : UniActivityParams, mode : ActionMode | null) : void;

  /**
     对应原生 Activity 的 [onActionModeStarted](https://developer.android.com/reference/android/app/Activity#onActionModeStarted(android.view.ActionMode)) 函数，此方法在super.onActionModeStarted() 调用之前被调用，用于处理操作模式开始前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 mode 表示开始的操作模式。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {ActionMode | null} mode 开始的操作模式
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreActionModeStarted(params : UniActivityParams, mode : ActionMode | null) : void;

  /**
     对应原生 Activity 的 [onProvideKeyboardShortcuts](https://developer.android.com/reference/android/app/Activity#onProvideKeyboardShortcuts(java.util.List,%20android.view.Menu,%20int)) 函数，此方法在super.onProvideKeyboardShortcuts() 调用之前被调用，用于处理提供键盘快捷方式前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 data 为键盘快捷键列表，第三个参数 menu 为菜单（如果有），第四个参数 deviceId 为设备ID。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {MutableList<KeyboardShortcutGroup> | null} data 键盘快捷键列表
     @param {Menu | null} menu 菜单
     @param {Int} deviceId 设备ID
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPreProvideKeyboardShortcuts(params : UniActivityParams, data : MutableList<KeyboardShortcutGroup> | null, menu : Menu | null, deviceId : Int) : void;

  /**
     对应原生 Activity 的 [onPointerCaptureChanged](https://developer.android.com/reference/android/app/Activity#onPointerCaptureChanged(boolean)) 函数，此方法在super.onPointerCaptureChanged() 调用之前被调用，用于处理指针捕获状态改变前的逻辑。
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 hasCapture 表示是否捕获了输入指针。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {Boolean} hasCapture 是否捕获了输入指针
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#registerActivityCallback - 提供注册和使用此回调的指导。
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  onPrePointerCaptureChanged(params : UniActivityParams, hasCapture : Boolean) : void;

  /**
     对应原生 Activity 的 [dispatchKeyEvent](https://developer.android.com/reference/android/app/Activity#dispatchKeyEvent(android.view.KeyEvent)) 函数
     注意第一个参数为自定义参数 UniActivityParams，第二个参数 event 为按键事件。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {KeyEvent | null} event 按键事件
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  dispatchKeyEvent(params : UniActivityParams, event : KeyEvent | null) : void;
  /**
     对应原生 Activity 的 [dispatchKeyEvent](https://developer.android.com/reference/android/app/Activity#dispatchKeyEvent(android.view.KeyEvent)) 函数，此方法在super.dispatchKeyEvent() 调用之前被调用，用于处理按键事件分发前的逻辑。
     在super方法之前调用，注意第一个参数为自定义参数 UniActivityParams。
     @param {UniActivityParams} params 统一返回参数，包括页面路由地址与方法返回值
     @param {KeyEvent | null} event 按键事件
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "4.18",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "4.18"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
                 "unixVer": "x"
            }
        }
     }
   */
  dispatchPreKeyEvent(params : UniActivityParams, event : KeyEvent | null) : void;

}
