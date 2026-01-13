interface Boolean {
  /** Returns the primitive value of the specified object. */
  valueOf(): boolean;
}

interface BooleanConstructor {
  /**
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/boolean.html#constructor
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
           "harmony": {
              "osVer": "5.0.0",
              "uniVer": "√",
              "unixVer": "4.61",
              "uniUtsPlugin": "√",
              "unixUtsPlugin": "4.61"
           }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "4.0"
        }
     }
   */
  new(value?: any): Boolean;
  /**
     @tutorial https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/boolean.html#constructor
     @uniPlatform {
        "app": {
            "android": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "ios": {
               "osVer": "x",
               "uniVer": "x",
               "unixVer": "x",
               "uniUtsPlugin": "x",
               "unixUtsPlugin": "x"
            },
            "harmony": {
               "osVer": "5.0.0",
               "uniVer": "√",
               "unixVer": "4.61",
               "uniUtsPlugin": "√",
               "unixUtsPlugin": "4.61"
            }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          }
        },
        "web": {
            "uniVer": "√",
            "unixVer": "4.0"
        }
     }
   */
  <T>(value?: T): boolean;
  readonly prototype: Boolean;
}

declare var Boolean: BooleanConstructor;
