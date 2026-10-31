import { SetUserCaptureScreenErrorCode, SetUserCaptureScreenFail } from "./interface.uts"
/**
 * 错误主题
 */
export const UniErrorSubject = 'uni-usercapturescreen';


/**
 * 错误信息
 * @UniError
 */
export const UniErrors : Map<SetUserCaptureScreenErrorCode, string> = new Map([
  /**
   * 错误码及对应的错误信息
   */
  [12001, 'setUserCaptureScreen:system not support'],
  [12010, 'setUserCaptureScreen:system internal error'],
]);


/**
 * 错误对象实现
 */
export class SetUserCaptureScreenFailImpl extends UniError implements SetUserCaptureScreenFail {

  /**
   * 错误对象构造函数
   */
  constructor(errCode : SetUserCaptureScreenErrorCode) {
    super();
    this.errSubject = UniErrorSubject;
    this.errCode = errCode;
    this.errMsg = UniErrors[errCode] ?? "";
  }
}