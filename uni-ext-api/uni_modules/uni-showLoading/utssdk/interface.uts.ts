/**
 * uni.showLoading成功回调参数
 */
export interface ShowLoadingSuccess {
  /**
   * 错误信息
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  errMsg: string
}

/**
 * uni.showLoading失败回调参数
 */
export type ShowLoadingFailErrorCode = 4

export interface ShowLoadingFail extends IUniError {
  errCode: ShowLoadingFailErrorCode
}

export class ShowLoadingSuccessImpl implements ShowLoadingSuccess {
  errMsg: string
  constructor(errMsg: string = 'showLoading:ok') {
    this.errMsg = errMsg
  }
}

export class ShowLoadingFailImpl extends UniError implements ShowLoadingFail {
  override errCode: ShowLoadingFailErrorCode
  constructor(errMsg: string = 'showLoading:fail cancel', errCode: ShowLoadingFailErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

export type ShowLoadingComplete = any

/**
 * uni.showLoading成功回调函数定义
 */
export type ShowLoadingSuccessCallback = (res: ShowLoadingSuccess) => void
/**
 * uni.showLoading失败回调函数定义
 */
export type ShowLoadingFailCallback = (res: ShowLoadingFail) => void
/**
 * uni.showLoading完成回调函数定义
 */
export type ShowLoadingCompleteCallback = (res: ShowLoadingComplete) => void

/**
 * uni.showLoading参数定义
 */
export type ShowLoadingOptions = {
  /**
   * 提示的内容，长度与 icon 取值有关。
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  title?: string | null,
  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   * @uniPlatform
    {
      "app": {
        "android": {
          "uniVer": "x",
          "unixVer": "x",
          "unixVaporVer": "x"
        },
        "ios": {
          "uniVer": "x",
          "unixVer": "x",
          "unixVaporVer": "x"
        },
        "harmony": {
          "uniVer": "x",
          "unixVer": "x",
          "unixVaporVer": "x"
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
   */
  mask?: boolean | null,
  /**
   * iOS是否采用系统雪花状样式
   * @uniPlatform
    {
      "app": {
        "android": {
          "uniVer": "x",
          "unixVer": "x",
          "unixVaporVer": "x"
        },
        "ios": {
          "uniVer": "x",
          "unixVer": "5.0",
          "unixVaporVer": "5.11"
        },
        "harmony": {
          "uniVer": "x",
          "unixVer": "x",
          "unixVaporVer": "x"
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
   * @defaultValue true
   * @default true
   * @internal
   */
  iosSpinner?: boolean | null,
  /**
   * 接口调用成功的回调函数
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  success?: ShowLoadingSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  fail?: ShowLoadingFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  complete?: ShowLoadingCompleteCallback | null
}

export type ShowLoading = (options?: ShowLoadingOptions | null) => LoadingPage | null

/**
 * uni.hideLoading成功回调参数
 */
export interface HideLoadingSuccess {
  /**
   * 错误信息
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  errMsg: string
}

/**
 * uni.hideLoading失败回调参数
 */
export type HideLoadingFailErrorCode = 4
/**
 * uni.hideLoading失败回调参数
 */
export interface HideLoadingFail extends IUniError {
  errCode: HideLoadingFailErrorCode
}

export class HideLoadingSuccessImpl implements HideLoadingSuccess {
  errMsg: string
  constructor(errMsg: string = 'hideLoading:ok') {
    this.errMsg = errMsg
  }
}

export class HideLoadingFailImpl extends UniError implements HideLoadingFail {
  override errCode: HideLoadingFailErrorCode
  constructor(errMsg: string = 'hideLoading:fail cancel', errCode: HideLoadingFailErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

export type HideLoadingComplete = any

/**
 * uni.hideLoading成功回调函数定义
 */
export type HideLoadingSuccessCallback = (res: HideLoadingSuccess) => void
/**
 * uni.hideLoading失败回调函数定义
 */
export type HideLoadingFailCallback = (res: HideLoadingFail) => void
/**
 * uni.hideLoading完成回调函数定义
 */
export type HideLoadingCompleteCallback = (res: HideLoadingComplete) => void

/**
 * uni.hideLoading参数定义
 */
export type HideLoadingOptions = {
  /**
   * 期望隐藏的目标LoadingPage 如果为null 会关闭当前栈顶全部LoadingPage
   * @uniPlatform {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
        "uniVer": "√",
        "unixVer": "4.0"
      }
    }
   */
  loadingPage?: LoadingPage | null,
  /**
   * 接口调用成功的回调函数
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  success?: HideLoadingSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  fail?: HideLoadingFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  complete?: HideLoadingCompleteCallback | null
}

export type HideLoading = (options?: HideLoadingOptions | null) => void

export type LoadingPage = UniPage

export interface Uni {
  /**
   * @description 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。
   * @example
    ```typescript
    uni.showLoading({
      title: '加载中'
    });
    ```
   * @remark
   * - showLoading 和 showToast 同时只能显示一个
   * - showToast 应与 hideToast 配对使用
   * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading
   * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/loading.html
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/loading.html
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  showLoading(options?: ShowLoadingOptions | null): LoadingPage | null,

  /**
   * @description 隐藏 loading 提示框。
   * @example
    ```typescript
    uni.showLoading({
      title: '加载中'
    });

    setTimeout(function () {
      uni.hideLoading();
    }, 2000);
    ```
   * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading
   * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/loading.html#hideloadinghttps://doc.dcloud.net.cn/uni-app-x/api/loading.html
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/loading.html#hideloadinghttps://doc.dcloud.net.cn/uni-app-x/api/loading.html
   * @uniPlatform
    {
      "app": {
        "android": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.21"
	      },
	      "ios": {
	        "uniVer": "x",
	        "uniUtsPlugin": "x",
	        "unixVer": "4.61",
	        "unixUtsPlugin": "4.61",
	        "unixVaporVer": "5.11"
	      },
	      "harmony": {
	        "uniVer": "4.23",
	        "unixVer": "4.61",
	        "unixVaporVer": "5.0"
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
   */
  hideLoading(options?: HideLoadingOptions | null): void,
}
