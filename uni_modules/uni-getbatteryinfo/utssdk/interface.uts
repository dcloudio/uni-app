export type GetBatteryInfoSuccess = {
	errMsg: string,
	/**
	* 设备电量，范围1 - 100
	*/
	level: number,
	/**
	* 是否正在充电中
	*/
	isCharging: boolean
}

export type GetBatteryInfoOptions = {
	/**
		* 接口调用结束的回调函数（调用成功、失败都会执行）
		*/
	success?: (res: GetBatteryInfoSuccess) => void
	/**
		* 接口调用失败的回调函数
		*/
	fail?: (res: UniError) => void
	/**
		* 接口调用成功的回调
		*/
	complete?: (res: any) => void
}

export type GetBatteryInfoResult = {
	/**
	* 设备电量，范围1 - 100
	*/
	level: number,
	/**
	* 是否正在充电中
	*/
	isCharging: boolean
}

/**
 * 错误码
 * - 1001 getAppContext is null
 */
export type GetBatteryInfoErrorCode = 1001 | 1002;
/**
 * GetBatteryInfo 的错误回调参数
 */
export interface GetBatteryInfoFail extends IUniError {
	errCode: GetBatteryInfoErrorCode
};

/**
* 获取电量信息
* @param {GetBatteryInfoOptions} options
*
*
* @tutorial https://uniapp.dcloud.net.cn/api/system/batteryInfo.html
* @platforms APP-IOS = ^9.0,APP-ANDROID = ^22
* @since 3.6.11
*
* @assert () => success({errCode: 0, errSubject: "uni-getBatteryInfo", errMsg: "getBatteryInfo:ok", level: 60, isCharging: false })
* @assert () => fail({errCode: 1001, errSubject: "uni-getBatteryInfo", errMsg: "getBatteryInfo:fail getAppContext is null" })
*/
export type GetBatteryInfo = (options: GetBatteryInfoOptions) => void


export type GetBatteryInfoSync = () => GetBatteryInfoResult

interface Uni {

	/**
	 * 获取电池电量信息
	 *
	 * @example
	 * ```typescript
	 * uni.getBatteryInfo({
	 *		success(res) {
	 *			console.log(res);
	 *		}
	 * })
	 * ```
	 * @remark
	 * - 该接口需要同步调用
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *            "osVer": "4.4.4",
	 *            "uniVer": "3.6.11",
	 *            "unixVer": "3.9.0"
	 *        },
	 *        "ios": {
	 *            "osVer": "12.0",
	 *            "uniVer": "3.6.11",
	 *            "unixVer": "4.11"
	 *        },
		 *    "harmony": {
		 *      "osVer": "3.0",
		 *      "uniVer": "4.23",
		 *      "unixVer": "x"
		 *    }
	 *    },
	 *    "web": {
	 *      "uniVer": "3.6.11",
	 *      "unixVer": "4.0"
	 *    }
	 * }
	 * @uniVueVersion 2,3  //支持的vue版本
	 *
	 */
	getBatteryInfo(options: GetBatteryInfoOptions): void,
	/**
	 * 同步获取电池电量信息
	 *
	 * @example
	 * ```typescript
	 * uni.getBatteryInfo()
	 * ```
	 * @remark
	 * - 该接口需要同步调用
	 * @uniPlatform {
	 *    "app": {
	 *        "android": {
	 *            "osVer": "4.4.4",
	 *            "uniVer": "3.6.11",
	 *            "unixVer": "3.9.0"
	 *        },
	 *        "ios": {
	 *            "osVer": "12.0",
	 *            "uniVer": "3.6.11",
	 *            "unixVer": "4.11"
	 *        },
		 *    "harmony": {
		 *      "osVer": "3.0",
		 *      "uniVer": "4.23",
		 *      "unixVer": "x"
		 *    }
	 *    },
	 *    "web": {
	 *      "uniVer": "3.6.11",
	 *      "unixVer": "4.0"
	 *    }
	 * }
	 * @uniVueVersion 2,3  //支持的vue版本
	 *
	 */
	getBatteryInfoSync(): GetBatteryInfoResult

}
