interface Boolean {
  /** Returns the primitive value of the specified object. */
  valueOf() : boolean;
}

interface BooleanConstructor {
  /**
   * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Boolean.html#constructor
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  new(value ?: any) : Boolean;
  /**
   * @tutorial https://uniapp.dcloud.net.cn/uts/buildin-object-api/Boolean.html#constructor
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        },
   *        "ios": {
   *           "osVer": "x",
   *           "uniVer": "x",
   *           "unixVer": "x"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  <T>(value ?: T) : boolean;
  readonly prototype : Boolean;
}

declare var Boolean : BooleanConstructor;
