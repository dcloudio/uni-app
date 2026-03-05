/**
 * uni.exit成功回调参数
 */
export type ExitSuccess = {
  errMsg: string
}

/**
 * 错误码
 */
export type ExitErrorCode =
/**
 * 系统不支持
 */
12001 |
/**
 * 未知错误
 */
12002 |
/**
 * iOS平台，仅在uni-app x SDK模式中支持应用退出
 */
12003

/**
 * uni.exit失败回调参数
 */
export interface IExitError extends IUniError {
	errCode: ExitErrorCode
}
export type ExitFail = IExitError

/**
 * uni.exit成功回调函数定义
 */
export type ExitSuccessCallback = (res: ExitSuccess) => void
/**
 * uni.exit失败回调函数定义
 */
export type ExitFailCallback = (res: ExitFail) => void
/**
 * uni.exit完成回调函数定义
 */
export type ExitCompleteCallback = (res: any) => void

/**
 * uni.exit参数定义
 */
export type ExitOptions = {
  /**
   * 接口调用成功的回调函数
   */
  success?: ExitSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: ExitFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: ExitCompleteCallback | null
}


export interface Uni {

  /**
   * 退出当前应用
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/exit.html
   * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/exit.html
   *
   * @uniPlatform
    {
      "app": {
        "android": {
          "osVer": "5.0",
          "uniVer": "3.8.15",
          "uniUtsPlugin": "3.91",
          "unixVer": "3.91"
        },
        "ios": {
          "osVer": "12.0",
          "uniVer": "x",
          "uniUtsPlugin": "x",
          "unixVer": "4.33",
          "unixUtsPlugin": "4.33"
        },
        "harmony": {
          "osVer": "3.0",
          "uniVer": "4.23",
          "unixVer": "4.71",
          "unixvVer": "5.0"
        }
      },
      "mp": {
        "weixin": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "alipay": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "baidu": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "toutiao": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "lark": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "qq": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "kuaishou": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        },
        "jd": {
            "hostVer": "x",
            "uniVer": "x",
            "unixVer": "x"
        }
      },
      "web": {
        "uniVer": "x",
        "unixVer": "x"
      }
    }
   * @uniVueVersion 2,3  //支持的vue版本
   */
  exit(options?: ExitOptions | null):void;
}

export type Exit = (options?: ExitOptions | null) => void;
