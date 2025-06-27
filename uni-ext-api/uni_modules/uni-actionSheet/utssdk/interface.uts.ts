export type Popover = {
  /**
   * 指示区域坐标，使用原生 navigationBar 时一般需要加上 navigationBar 的高度
   */
  top: number,
  /**
   * 指示区域坐标
   */
  left: number,
  /**
   * 指示区域宽度
   */
  width: number,
  /**
   * 指示区域高度
   */
  height: number
}

/**
 * showActionSheet 错误码
 * - 4: 框架内部异常
 */
export type ShowActionSheetErrorCode = 4
export interface ShowActionSheetSuccess {
  errMsg: string
  tapIndex: number
}
type ShowActionSheetSuccessCallback = (result: ShowActionSheetSuccess) => void

export interface ShowActionSheetFail extends IUniError {
  errCode: ShowActionSheetErrorCode
}
type ShowActionSheetFailCallback = (result: ShowActionSheetFail) => void

export type ShowActionSheetComplete = any
type ShowActionSheetCompleteCallback = (result: ShowActionSheetComplete) => void

/**
 * uni.showActionSheet函数参数定义
 */
export type ShowActionSheetOptions = {
  /**
     * 菜单标题
     */
  title?: string | null,
  /**
   * 警示文案（仅微信小程序真机有效）
   */
  alertText?: string | null,
  /**
   * 按钮的文字数组
   */
  itemList: string[],
  /**
   * 按钮的文字颜色，字符串格式
   */
  itemColor?: string.ColorString | null,
  /**
   * 大屏设备弹出原生选择按钮框的指示区域，默认居中显示
   */
  popover?: Popover | null,
  /**
   * 菜单标题文字颜色，字符串格式
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51",
   *      "unixUtsPlugin": "4.51"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.51"
   *  }
   * }
   */
  titleColor?: string.ColorString | null,
  /**
   * 取消按钮的文字，默认为"取消"
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51",
   *      "unixUtsPlugin": "4.51"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.51"
   *  }
   * }
   */
  cancelText?: string | null,
  /**
   * 取消按钮的文字颜色，字符串格式
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51",
   *      "unixUtsPlugin": "4.51"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.51"
   *  }
   * }
   */
  cancelColor?: string.ColorString | null,
  /**
   * 弹框背景颜色
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51",
   *      "unixUtsPlugin": "4.51"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.51"
   *  }
   * }
   */
  backgroundColor?: string.ColorString | null,
  /**
   * 接口调用成功的回调函数
   */
  success?: ShowActionSheetSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: ShowActionSheetFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: ShowActionSheetCompleteCallback | null
};

export type ShowActionSheet = (options: ShowActionSheetOptions) => void;

export interface Uni {
  /**
   * @description 从底部向上弹出操作菜单
   * @example
   * ```typescript
   *	uni.showActionSheet({
   *		itemList: ['A', 'B', 'C'],
   *		success: function (res) {
   *			console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
   *		},
   *		fail: function (res) {
   *			console.log(res.errMsg);
   *		}
   *	});
   * ```
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html#showactionsheet
   * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html#showactionsheet
   * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#showactionsheet
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "3.91"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.11",
   *      "unixUtsPlugin": "4.11"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "4.61"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "4.41"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.0"
   *  }
   * }
   */
  showActionSheet(options: ShowActionSheetOptions): void;

  /**
   * @description 关闭栈顶页面操作菜单
   * @example
   * ```typescript
   *	uni.hideActionSheet();
   * ```
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/hide-action-sheet.html#hideactionsheet
   * @tutorial_uni_app https://doc.dcloud.net.cn/uni-app-x/api/hide-action-sheet.html#hideactionsheet
   * @uniPlatform {
   *  "app": {
   *    "android": {
   *      "osVer": "5.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51"
   *    },
   *    "ios": {
   *      "osVer": "12.0",
   *      "uniVer": "√",
   *      "uniUtsPlugin": "x",
   *      "unixVer": "4.51",
   *      "unixUtsPlugin": "4.51"
   *    },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "x"
   *    }
   *  },
   *  "mp": {
   *    "weixin": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "alipay": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "baidu": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "toutiao": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "lark": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "qq": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "kuaishou": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    },
   *    "jd": {
   *      "hostVer": "√",
   *      "uniVer": "√",
   *      "unixVer": "x"
   *    }
   *  },
   *  "web": {
   *    "uniVer": "√",
   *    "unixVer": "4.51"
   *  }
   * }
   */
  hideActionSheet(): void;
}

export class ShowActionSheetSuccessImpl implements ShowActionSheetSuccess {
  tapIndex: number
  errMsg: string
  constructor(tapIndex: number, errMsg: string = 'showActionSheet:ok') {
    this.errMsg = errMsg
    this.tapIndex = tapIndex
  }
}
export class ShowActionSheetFailImpl extends UniError implements ShowActionSheetFail {
  override errCode: ShowActionSheetErrorCode
  constructor(errMsg: string = 'showActionSheet:fail cancel', errCode: ShowActionSheetErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

export type HideActionSheet = () => void
