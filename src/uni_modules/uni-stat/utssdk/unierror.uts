import { ReportErrorCode, ReportError } from "./interface.uts"

/**
 * 错误主题
 */
export const ReportUniErrorSubject = 'uni-report';


/**
 * 错误码
 * @UniError
 */
export const ReportUniErrors:Map<number, string> = new Map([
  /**
   * 已集成uni统计，但未关联服务空间
   */
  [61000, '应用已集成uni统计，但未关联服务空间，请在uniCloud目录右键关联服务空间!'],
  /**
   * 统计已集成，但未初始化
   */
  [61001, '统计服务尚未初始化，请在main.uts中引入统计插件！'],
  /**
   * 调用失败
   */
  [61002, 'uni-app-launch 下 options 参数必填，请检查！'],
  [61003, 'Report的 name参数必填'],
  [61004, 'Report的name参数类型必须为字符串'],
  [61005, 'Report的name参数长度最大为255'],
  [61006, 'Report的options参数只能为String或者Object类型'],
  [61007, 'Report的options参数若为String类型，则长度最大为255'],
  [61008, 'Report的name参数为title时，options参数类型只能为String'],
]);

/**
 * ReportFail的实现
 */
export class ReportFailImpl extends UniError implements ReportError {
	override errCode: ReportErrorCode
  constructor (
    errCode: ReportErrorCode
  ) {
    super()
    this.errSubject = ReportUniErrorSubject
    this.errCode = errCode
    this.errMsg = ReportUniErrors.get(errCode) ?? ''
  }
}
