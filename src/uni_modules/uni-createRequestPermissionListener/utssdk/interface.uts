export type RequestPermissionListenerRequestCallback = (permissions : Array<string>) => void
export type RequestPermissionListenerConfirmCallback = (permissions : Array<string>) => void
export type RequestPermissionListenerCompleteCallback = (permissions : Array<string>) => void

export interface RequestPermissionListener {
	/**
	 * 监听申请系统权限
	 * @param {RequestPermissionListenerRequestCallback} callback 申请系统权限回调，permissions为触发权限申请的所有权限
	 */
	onRequest(callback : RequestPermissionListenerRequestCallback) : void
	/**
	 * 监听弹出系统权限授权框
	 * @param {RequestPermissionListenerConfirmCallback} callback 弹出系统权限授权框回调，permissions为触发弹出权限授权框的所有权限
	 */
	onConfirm(callback : RequestPermissionListenerConfirmCallback) : void
	/**
	 * 监听权限申请完成
	 * @param {RequestPermissionListenerCompleteCallback} callback 权限申请完成回调，permissions为申请完成的所有权限
	 */
	onComplete(callback : RequestPermissionListenerCompleteCallback) : void
	/**
	 * 取消所有监听
	 */
	stop() : void
}

export type CreateRequestPermissionListener = () => RequestPermissionListener

export interface Uni {
	/**
	 * 创建一个监听权限申请的对象。
	 * @description 创建一个监听权限申请的对象。
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/system/create-request-permission-listener.html
	 * @uniPlatform {
	 *  "app": {
	 *		"android": {
	 *			"osVer": "5.0",
	 *			"uniVer": "4.0+",
	 *			"unixVer": "4.0+"
	 *		},
	 *		"ios": {
	 *			"osVer": "12.0",
	 *			"uniVer": "x",
	 *			"unixVer": "x"
	 *		},
	 *		"harmony": {
	 *			"osVer": "x",
	 *			"uniVer": "x",
	 *			"unixVer": "x"
	 *		}
	 *	},
   *  "web": {
   *    "uniVer": "x",
   *    "unixVer": "x"
   *  }
	 * }
	 */
	createRequestPermissionListener(): RequestPermissionListener
}
