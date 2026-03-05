declare namespace UniNamespace {

interface InstallApkSuccess {
	/**
	 * 安装成功消息
	 */
	errMsg : string
}

type InstallApkErrorCode = 1300002
interface InstallApkFail {
	errCode : InstallApkErrorCode
}

type InstallApkComplete = any

type InstallApkSuccessCallback = (res : InstallApkSuccess) => void
type InstallApkFailCallback = (err : InstallApkFail) => void
type InstallApkCompleteCallback = (res : InstallApkComplete) => void

interface InstallApkOptions {
	/**
	 * apk文件地址
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

}


declare interface Uni {
  /**
    * installApk()
    * @description
    * 安装apk
    * @param {InstallApkOptions}
    * @return {void}
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
    *        }
    *    }
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
  installApk(options : UniNamespace.InstallApkOptions) : void
}
