interface UTSAndroidHookProxy {
  /**
     uts 插件创建时的回调。
     对应原生 Application onCreate 函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroidhookproxy.html#oncreate
     @uniPlatform {
        "app": {
            "android": {
               "uniVer": "x",
               "unixVer": "3.97",
               "unixVaporVer":"x",
               "uniUtsPlugin": "3.97",
               "unixUtsPlugin": "3.97",
               "unixVaporUtsPlugin": "5.21"
            }
        }
     }
   */
  onCreate(application : Application) : void;

}
