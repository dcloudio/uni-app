/**
 * 错误码
 */
export type OpenLocationErrorCode =
/**
 * 框架内部错误
 * @uniPlatform {
 *    "app": {
 *      "android": {
 *        "osVer": "5.0",
 *        "uniVer": "√",
 *        "unixVer": "4.41"
 *      },
 *      "ios": {
 *        "osVer": "12.0",
 *        "uniVer": "√",
 *        "unixVer": "4.41"
 *   	  },
 *      "harmony": {
 *        "osVer": "3.0",
 *        "uniVer": "4.23",
 *        "unixVer": "4.61"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "√",
 *        "unixVer": "4.0"
 *    },
 *    "mp": {
 *      "weixin": {
 *         "uniVer": "x",
 *         "unixVer": "x"
 *      }
 *    }
 * }
 */
4;

export interface OpenLocationSuccess {
  errMsg: string
}

type OpenLocationSuccessCallback = (result : OpenLocationSuccess) => void

export interface OpenLocationFail extends IUniError {
  errCode : OpenLocationErrorCode
}
type OpenLocationFailCallback = (result : OpenLocationFail) => void

export type OpenLocationComplete = any
type OpenLocationCompleteCallback = (result : OpenLocationComplete) => void

/**
 * uni.openLocation函数参数定义
 */
export type OpenLocationOptions = {
  /**
   * 纬度，范围为-90~90，负数表示南纬，使用 gcj02 国测局坐标系
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  latitude : number,
  /**
   * 经度，范围为-180~180，负数表示西经，使用 gcj02 国测局坐标系
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  longitude : number,
  /**
   * 缩放比例，范围5~18，默认为18（微信小程序）
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  scale ?: number | null,
  /**
   * 位置名
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  name ?: string | null,
  /**
   * 地址的详细说明
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  address ?: string | null,
  /**
   * 接口调用成功的回调函数
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  success ?: OpenLocationSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  fail ?: OpenLocationFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  complete ?: OpenLocationCompleteCallback | null
};

/**
 * 使用应用内置地图查看位置
 *
 * @param {OpenLocationOptions} options
 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#openLocation
 * @uniPlatform {
 *    "app": {
 *      "android": {
 *        "osVer": "5.0",
 *        "uniVer": "√",
 *        "unixVer": "4.41"
 *      },
 *      "ios": {
 *        "osVer": "12.0",
 *        "uniVer": "√",
 *        "unixVer": "4.41"
 *   	  },
 *      "harmony": {
 *        "osVer": "3.0",
 *        "uniVer": "4.23",
 *        "unixVer": "4.61"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "√",
 *        "unixVer": "4.0"
 *    },
 *    "mp": {
 *      "weixin": {
 *         "uniVer": "√",
 *         "unixVer": "4.41"
 *      }
 *    }
 * }
 */
export type OpenLocation = (options : OpenLocationOptions) => void;

export interface Uni {
  /**
   * @description 使用应用内置地图查看位置
   * @example
   * ```typescript
    uni.openLocation({
      latitude: 39.908823,
      longitude: 116.39747,
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
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#openLocation
   * @uniPlatform {
   *    "app": {
   *      "android": {
   *        "osVer": "5.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *      },
   *      "ios": {
   *        "osVer": "12.0",
   *        "uniVer": "√",
   *        "unixVer": "4.41"
   *   	  },
   *      "harmony": {
   *        "osVer": "3.0",
   *        "uniVer": "4.23",
   *        "unixVer": "4.61"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    },
   *    "mp": {
   *      "weixin": {
   *         "uniVer": "√",
   *         "unixVer": "4.41"
   *      }
   *    }
   * }
   */
  openLocation(options : OpenLocationOptions) : void;
}

export class OpenLocationSuccessImpl implements OpenLocationSuccess {
  errMsg : string
  constructor(errMsg : string = 'chooseLocation:ok') {
    this.errMsg = errMsg
  }
}
