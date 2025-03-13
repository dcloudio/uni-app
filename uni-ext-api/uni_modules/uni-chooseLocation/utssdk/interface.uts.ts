/**
 * 错误码
 */
export type ChooseLocationErrorCode =
    /**
     * 取消
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.34"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.34"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.34"
     *    }
     * }
     */
    1 |
    /**
     * 框架内部错误
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.34"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.34"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.34"
     *    }
     * }
     */
    4;

export interface ChooseLocationSuccess {
    errMsg: string,
    name: string,
    address: string,
    latitude: number,
    longitude: number
}
type ChooseLocationSuccessCallback = (result: ChooseLocationSuccess) => void

export interface ChooseLocationFail extends IUniError {
    errCode: ChooseLocationErrorCode
}
type ChooseLocationFailCallback = (result: ChooseLocationFail) => void

export type ChooseLocationComplete = any
type ChooseLocationCompleteCallback = (result: ChooseLocationComplete) => void

/**
 * uni.chooseLocation函数参数定义
 */
export type ChooseLocationOptions = {
    /**
     * 指示位置的经度
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    latitude?: number | null,
    /**
     * 指示位置的纬度
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    longitude?: number | null,
    /**
     * 指示位置的名称
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    keyword?: string | null,
    /**
     * 用户自定义参数
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.35"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.35"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.35"
     *    }
     * }
     */
    payload?: UTSJSONObject | null,
    /**
     * 接口调用成功的回调函数
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    success?: ChooseLocationSuccessCallback | null,
    /**
     * 接口调用失败的回调函数
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    fail?: ChooseLocationFailCallback | null,
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "√",
     *        "unixVer": "4.33"
     *      },
     *      "harmony": {
     *        "osVer": "3.0",
     *        "uniVer": "4.23",
     *        "unixVer": "4.61"
     *      }
     *    },
     *    "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *    }
     * }
     */
    complete?: ChooseLocationCompleteCallback | null
};

/**
 * 打开地图选择位置
 *
 * @param {ChooseLocationOptions} options
 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#chooselocation
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "√",
 *            "unixVer": "4.33"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "√",
 *            "unixVer": "4.33"
 *        },
 *    "harmony": {
 *      "osVer": "3.0",
 *      "uniVer": "4.23",
 *      "unixVer": "4.61"
 *    }
 *    },
 *    "web": {
 *        "uniVer": "√",
 *        "unixVer": "4.0"
 *    }
 * }
 */
export type ChooseLocation = (options: ChooseLocationOptions) => void;

export interface Uni {
    /**
     * @description 打开地图选择位置
     * @example
     * ```typescript
      uni.chooseLocation({
        success: (res) => {
          console.log('res: ', res)
        },
        fail: (err) => {
          console.log('err: ', err)
        },
        complete: (res) => {
          console.log('complete: ', res)
        }
      });
     * ```
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "√",
     *      "unixVer": "4.33"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "√",
     *      "unixVer": "4.33"
     *    },
     *    "harmony": {
     *      "osVer": "3.0",
     *      "uniVer": "4.23",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "4.41"
     *    },
     *    "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "√",
     *        "uniVer": "√",
     *        "unixVer": "x"
     *    }
     *  },
     *  "web": {
     *      "uniVer": "√",
     *      "unixVer": "4.0"
     *  }
     * }
     */
    chooseLocation(options: ChooseLocationOptions): void;
}
export class ChooseLocationSuccessImpl implements ChooseLocationSuccess {
    errMsg: string
    name: string
    address: string
    latitude: number
    longitude: number
    constructor(name: string, address: string, latitude: number, longitude: number, errMsg: string = 'chooseLocation:ok') {
        this.errMsg = errMsg
        this.name = name
        this.address = address
        this.latitude = latitude
        this.longitude = longitude
    }
}
export class ChooseLocationFailImpl extends UniError implements ChooseLocationFail {
    override errCode: ChooseLocationErrorCode
    constructor(errMsg: string = 'chooseLocation:fail cancel', errCode: ChooseLocationErrorCode = 1) {
        super()
        this.errCode = errCode
        this.errMsg = errMsg
    }
}
