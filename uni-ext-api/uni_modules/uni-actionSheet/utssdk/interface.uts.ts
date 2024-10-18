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
// @ts-expect-error
export interface ShowActionSheetSuccess extends AsyncApiSuccessResult {
  tapIndex: number
}
type ShowActionSheetSuccessCallback = (result: ShowActionSheetSuccess) => void
// @ts-expect-error
export interface ShowActionSheetFail extends IUniError {
  errCode: ShowActionSheetErrorCode
}
type ShowActionSheetFailCallback = (result: ShowActionSheetFail) => void
// @ts-expect-error
export type ShowActionSheetComplete = AsyncApiResult
type ShowActionSheetCompleteCallback = (result: ShowActionSheetComplete) => void

/**
 * uni.showActionSheet函数参数定义
 */
export type ShowActionSheet2Options = {
  /**
     * 菜单标题
     */
  title: string | null,
  /**
   * 警示文案（同菜单标题, app无效）
   */
  alertText: string | null,
  /**
   * 按钮的文字数组
   */
  itemList: string[],
  /**
   * 取消按钮的文字，默认为"取消"
   */
  cancelText: string | null,
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
   */
  titleColor: string.ColorString | null,
  /**
   * 取消按钮的文字颜色，字符串格式
   */
  cancelColor: string.ColorString | null,
  /**
   * 弹框背景颜色
   */
  backgroundColor: string.ColorString | null,
  /**
   * 接口调用成功的回调函数
   */
  success: ShowActionSheetSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail: ShowActionSheetFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete: ShowActionSheetCompleteCallback | null
};

/**
 * 从底部向上弹出操作菜单
 *
 * @param {ShowActionSheetOptions} options
 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#showactionsheet
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "√",
 *            "unixVer": "3.9.0"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "√",
 *            "unixVer": "4.11"
 *   	  },
 *    "harmony": {
 *      "osVer": "3.0",
 *      "uniVer": "4.23",
 *      "unixVer": "x"
 *    }
 *    },
 *    "web": {
 *        "uniVer": "√",
 *        "unixVer": "4.0"
 *    }
 * }
 */
export type ShowActionSheet2 = (options: ShowActionSheet2Options) => void;
export type HideActionSheet = () => void;

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
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "√",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "√",
   *            "unixVer": "4.11"
   *        },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "x"
   *    }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  showActionSheet2(options: ShowActionSheet2Options): void;

  /**
   * @description 关闭操作菜单
   * @example
   * ```typescript
   *	uni.hideActionSheet();
   * ```
   * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/hide-action-sheet.html
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "√",
   *            "unixVer": "4.32"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "√",
   *            "unixVer": "4.32"
   *        },
   *    "harmony": {
   *      "osVer": "3.0",
   *      "uniVer": "4.23",
   *      "unixVer": "x"
   *    }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.32"
   *    }
   * }
   */
  hideActionSheet(): void;
}

// @ts-expect-error
export class ShowActionSheetSuccessImpl extends AsyncApiSuccessResult implements ShowActionSheetSuccess {
  tapIndex: number
  // @ts-expect-error
  override errMsg: string
  constructor(tapIndex: number, errMsg: string = 'showActionSheet:ok') {
    super()
    this.errMsg = errMsg
    this.tapIndex = tapIndex
  }
}
export class ShowActionSheetFailImpl extends UniError implements ShowActionSheetFail {
  // @ts-expect-error
  override errCode: ShowActionSheetErrorCode
  constructor(errMsg: string = 'showActionSheet:fail cancel', errCode: ShowActionSheetErrorCode = 4) {
    super(errMsg)
    this.errCode = errCode
  }
}