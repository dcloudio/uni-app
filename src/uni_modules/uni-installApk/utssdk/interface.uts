export interface Uni {
	/**
	  * 安装apk
		* @tutorial https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html
		* @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html
	  * @uniPlatform {
	  *    "app": {
	  *        "android": {
	  *            "osVer": "5.0",
	  *  		  	 "uniVer": "3.94+",
	  * 			 "unixVer": "3.94+"
	  *        },
	  *        "ios": {
	  *            "osVer": "x",
	  *  		  	 "uniVer": "x",
	  * 			 "unixVer": "x"
	  *        },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
	  *    },
		* *  "mp": {
     *    "weixin": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "alipay": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "baidu": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "toutiao": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "lark": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "qq": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "kuaishou": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    },
     *    "jd": {
     *        "hostVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     *  },
	  *  "web": {
      *    "uniVer": "x",
      *    "unixVer": "x"
      *  }
	  * }
	  * @example
	   ```typescript
		uni.installApk({
			filePath: "/xx/xx/xx.apk",
			complete: (res: any) => {
			  console.log("complete => " + JSON.stringify(res));
			}
		});
	   ```
	  */
	installApk(options : InstallApkOptions) : void
}
export type InstallApkSuccess = {
	/**
	 * 安装成功消息
	 */
	errMsg : string
}
export type InstallApkComplete = any
export type InstallApkSuccessCallback = (res : InstallApkSuccess) => void
/**
 * 错误码
 * - 1300002 找不到文件
 */
export type InstallApkErrorCode = 1300002
/**
 * 网络请求失败的错误回调参数
 */
export interface InstallApkFail extends IUniError {
	errCode : InstallApkErrorCode
};
export type InstallApkFailCallback = (err : InstallApkFail) => void
export type InstallApkCompleteCallback = (res : InstallApkComplete) => void

export type InstallApkOptions = {
	/**
	 * apk文件地址（仅支持本地文件路径）
	 */
	filePath : string,
	/**
	 * 接口调用成功的回调函数
	 * @defaultValue null
	 */
	success ?: InstallApkSuccessCallback | null,
	/**
	 * 接口调用失败的回调函数
	 * @defaultValue null
	 */
	fail ?: InstallApkFailCallback | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 * @defaultValue null
	 */
	complete ?: InstallApkCompleteCallback | null
}
