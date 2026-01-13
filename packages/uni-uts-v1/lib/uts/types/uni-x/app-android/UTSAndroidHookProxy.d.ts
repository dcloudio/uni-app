interface UTSAndroidHookProxy {
  /**
     uts 插件创建时的回调。
     对应原生 Application onCreate 函数
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/utsandroidhookproxy.html#oncreate
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "5.0",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "3.97",
               "unixUtsPlugin": "3.97"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x"
            }
        }
     }
   */
  onCreate(application : Application) : void;

}
