type $OnCallback = Function
export type $On = (eventName: string, callback: $OnCallback) => number

type $OnceCallback = Function
export type $Once = (eventName: string, callback: $OnceCallback) => number

export type $Off = (eventName: string, callback?: any | null) => void

export type $Emit = (eventName: string, ...args: Array<any | null>) => void

export interface Uni {
    /**
     * 监听自定义事件。事件可以由 uni.$emit 触发。回调函数会接收 uni.$emit 传递的参数。
     * 4.31+ 开始支持返回事件监听器 id, 用于 off 事件监听器。
     *
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#on
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#on
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/window/communication.html#on
     * @uniPlatform
      {
        "app": {
          "android": {
            "osVer": "5.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "3.91"
          },
          "ios": {
            "osVer": "12.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.11",
            "unixUtsPlugin": "4.31"
          },
          "harmony": {
            "osVer": "3.0",
            "uniVer": "4.23",
            "unixVer": "4.61",
            "unixvVer": "5.0"
          }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          },
          "alipay": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "baidu": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "toutiao": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "lark": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "qq": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "kuaishou": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "jd": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          }
        },
        "web": {
          "uniVer": "√",
          "unixVer": "4.0"
        }
      }
     * @param eventName 事件名称
     * @param callback 事件回调
     */
    $on(eventName: string, callback: $OnCallback): number

    /**
     * 移除自定义事件监听器。如果提供了事件名和回调，则只移除这个回调的监听器。
     * 4.13+ 开始支持第二个参数为可选，如果仅提供事件名，则移除该事件的所有监听器。
     * 4.31+ 开始第二个参数的类型由 `Function | null` 调整为 `any | null`, 支持传入 `uni.$on`、`uni.$once` 返回的事件监听器 id, 移除指定事件监听器。
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#off
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#off
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/window/communication.html#off
     * @uniPlatform
      {
        "app": {
          "android": {
            "osVer": "5.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "3.91"
          },
          "ios": {
            "osVer": "12.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.11",
            "unixUtsPlugin": "4.31"
          },
          "harmony": {
            "osVer": "3.0",
            "uniVer": "4.23",
            "unixVer": "4.61",
            "unixvVer": "5.0"
          }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          },
          "alipay": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "baidu": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "toutiao": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "lark": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "qq": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "kuaishou": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "jd": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          }
        },
        "web": {
          "uniVer": "√",
          "unixVer": "4.0"
        }
      }
     * @param eventName 事件名称
     * @param callback 要移除的事件回调或事件监听器 id
     */
    $off(eventName: string, callback?: any | null): void

    /**
     * 监听一个自定义事件。事件只触发一次，在第一次触发之后移除事件监听器。
     * 4.31+ 开始支持返回事件监听器 id, 用于 off 事件监听器。
     *
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#once
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#once
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/window/communication.html#once
     * @uniPlatform
      {
        "app": {
          "android": {
            "osVer": "5.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "3.91"
          },
          "ios": {
            "osVer": "12.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.11",
            "unixUtsPlugin": "4.31"
          },
          "harmony": {
            "osVer": "3.0",
            "uniVer": "4.23",
            "unixVer": "4.61",
            "unixvVer": "5.0"
          }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          },
          "alipay": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "baidu": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "toutiao": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "lark": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "qq": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "kuaishou": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "jd": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          }
        },
        "web": {
          "uniVer": "√",
          "unixVer": "4.0"
        }
      }
     * @param eventName 事件名称
     * @param callback 事件回调
     */
    $once(eventName: string, callback: $OnceCallback): number

    /**
     * 触发自定义事件，附加的参数会传递给事件监听器。
     * 在iOS平台UTS环境下或者UTS和JS通信时参数仅支持基础类型、string、Array、UTSJSONObject,其中Array，UTSJSONObject也仅支持包含上述类型,on和emit类型需匹配否则会产生异常
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/window/communication.html#emit
     * @uniPlatform
      {
        "app": {
          "android": {
            "osVer": "5.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "3.91"
          },
          "ios": {
            "osVer": "12.0",
            "uniVer": "√",
            "uniUtsPlugin": "x",
            "unixVer": "4.11",
            "unixUtsPlugin": "4.31"
          },
          "harmony": {
            "osVer": "3.0",
            "uniVer": "4.23",
            "unixVer": "4.61",
            "unixvVer": "5.0"
          }
        },
        "mp": {
          "weixin": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "4.41"
          },
          "alipay": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "baidu": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "toutiao": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "lark": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "qq": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "kuaishou": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          },
          "jd": {
            "hostVer": "√",
            "uniVer": "√",
            "unixVer": "x"
          }
        },
        "web": {
          "uniVer": "√",
          "unixVer": "4.0"
        }
      }
     * @param eventName 事件名称
     * @param args 触发事件时传递的参数
     */
    $emit(eventName: string, ...args: Array<any | null>): void
}
