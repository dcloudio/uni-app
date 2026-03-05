import { WifiErrorCode, WifiFail} from "./interface.uts"

/**
 * 错误主题
 */
export const UniErrorSubject = 'uni-wifi';
/**
 * 错误码
 * @UniError
 */
export const WifiUniErrors : Map<WifiErrorCode, string> = new Map([

	/**
	 * 未先调用 startWifi 接口
	 */
	[12000, 'not init.'],
	/**
	 * 当前系统不支持相关能力
	 */
	[12001, 'system not support'],
  /**
   * 密码错误
   */
  [12002, 'password error Wi-Fi'],
	/**
	 * Android 特有，未打开 Wi-Fi 开关
	 */
	[12005, 'wifi not turned on'],
	/**
	 * 用户拒绝授权链接 Wi-Fi
	 */
	[12007, 'user denied'],
	/**
	 * 系统其他错误，需要在 errmsg 打印具体的错误原因
	 */
	[12010, 'unknown error'],
  /**
   * 系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试，仅 Android 支持
   */
  [12013, 'wifi config may be expired'],

]);


export function getErrcode(errCode : number) : WifiErrorCode {
	const res = WifiUniErrors[errCode];
	return res == null ? 12000 : errCode;
}


export class WifiFailImpl extends UniError implements WifiFail {
	constructor(errCode : WifiErrorCode) {
		super();
		this.errSubject = UniErrorSubject;
		this.errCode = errCode;
		this.errMsg = WifiUniErrors[errCode] ?? "";
	}
}

