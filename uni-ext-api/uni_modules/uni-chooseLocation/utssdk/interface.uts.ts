/**
 * chooseLocation 错误码
 * - 4: 框架内部异常
 */
export type ChooseLocationErrorCode = 4
export interface ChooseLocationSuccess extends AsyncApiSuccessResult {
  name : string,
  address : string,
  latitude : number,
  longitude : number
}
type ChooseLocationSuccessCallback = (result : ChooseLocationSuccess) => void

export interface ChooseLocationFail extends IUniError {
  errCode : ChooseLocationErrorCode
}
type ChooseLocationFailCallback = (result : ChooseLocationFail) => void

export type ChooseLocationComplete = AsyncApiResult
type ChooseLocationCompleteCallback = (result : ChooseLocationComplete) => void

/**
 * uni.chooseLocation函数参数定义
 */
export type ChooseLocationOptions = {
  /**
   * 指示位置的经度
   */
  latitude ?: number | null,
  /**
   * 指示位置的纬度
   */
  longitude ?: number | null,
  /**
   * 指示位置的名称
   */
  keyword ?: string | null,
  /**
   * 接口调用成功的回调函数
   */
  success ?: ChooseLocationSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail ?: ChooseLocationFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete ?: ChooseLocationCompleteCallback | null
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
export type ChooseLocation = (options : ChooseLocationOptions) => void;

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
   *      "unixVer": "x"
   *    }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  chooseLocation(options : ChooseLocationOptions) : void;
}
// #ifdef APP-ANDROID
// @ts-expect-error
export class ChooseLocationSuccessImpl extends AsyncApiSuccessResult implements ChooseLocationSuccess {
  name : string
  address : string
  latitude : number
  longitude : number
  // @ts-expect-error
  override errMsg : string
  constructor(name : string, address : string, latitude : number, longitude : number, errMsg : string = 'chooseLocation:ok') {
    super()
    this.errMsg = errMsg
    this.name = name
    this.address = address
    this.latitude = latitude
    this.longitude = longitude
  }
}
export class ChooseLocationFailImpl extends UniError implements ChooseLocationFail {
  override errCode : ChooseLocationErrorCode
  constructor(errMsg : string = 'chooseLocation:fail cancel', errCode : ChooseLocationErrorCode = 4) {
    super(errMsg)
    this.errCode = errCode
  }
}

// #endif
