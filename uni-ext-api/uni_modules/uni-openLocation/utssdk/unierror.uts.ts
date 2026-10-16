import { OpenLocationErrorCode, OpenLocationFail } from "./interface.uts"

/**
 * 错误主题
 */

export const UniErrorSubject = 'uni-openLocation';

/**
 * 错误码
 * @UniError
 */
export const UniErrors : Map<OpenLocationErrorCode, string> = new Map([
  /**
   * 框架内部错误
   */
  [4, 'internal error']
]);

export class OpenLocationFailImpl extends UniError implements OpenLocationFail {
  // #ifndef APP-IOS
  override errCode : OpenLocationErrorCode;
  // #endif
  constructor(errCode : OpenLocationErrorCode) {
    super();
    this.errSubject = UniErrorSubject;
    this.errCode = errCode;
    this.errMsg = UniErrors.get(errCode) ?? "";
  }
}
