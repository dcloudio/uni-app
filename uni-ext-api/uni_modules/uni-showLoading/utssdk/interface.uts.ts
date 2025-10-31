
/**
 * uni.showLoading成功回调参数
 */
export type ShowLoadingSuccess = {
}

/**
 * uni.showLoading失败回调参数
 */
export type ShowLoadingFailErrorCode = 4
export interface ShowLoadingFail extends IUniError {
  errCode: ShowLoadingFailErrorCode
}

export class ShowLoadingFailImpl extends UniError implements ShowLoadingFail {
  override errCode: ShowLoadingFailErrorCode
  constructor(errMsg: string = 'showLoading:fail cancel', errCode: ShowLoadingFailErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

/**
 * uni.showLoading成功回调函数定义
 */
export type ShowLoadingSuccessCallback = (res: ShowLoadingSuccess) => void
/**
 * uni.showLoading失败回调函数定义
 */
export type ShowLoadingFailCallback = (res: ShowLoadingFail) => void
/**
 * uni.showLoading完成回调函数定义
 */
export type ShowLoadingCompleteCallback = (res: any) => void

/**
 * uni.showLoading参数定义
 */
export type ShowLoadingOptions = {
  /**
   * 提示的内容，长度与 icon 取值有关。
   */
  title?: string | null,
  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask?: boolean | null,
  /**
   * 接口调用成功的回调函数
   */
  success?: ShowLoadingSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: ShowLoadingFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: ShowLoadingCompleteCallback | null
}

export type ShowLoading = (options?: ShowLoadingOptions|null) => LoadingPage | null


/**
 * uni.showLoading成功回调参数
 */
export type HideLoadingSuccess = {
}

/**
 * uni.showLoading失败回调参数
 */
export type HideLoadingFailErrorCode = 4
/**
 * uni.showLoading失败回调参数
 */
export interface HideLoadingFail extends IUniError {
  errCode: HideLoadingFailErrorCode
}

export class HideLoadingFailImpl extends UniError implements HideLoadingFail {
  override errCode: HideLoadingFailErrorCode
  constructor(errMsg: string = 'hideLoading:fail cancel', errCode: HideLoadingFailErrorCode = 4) {
    super()
    this.errMsg = errMsg
    this.errCode = errCode
  }
}


/**
 * uni.hideLoading成功回调函数定义
 */
export type HideLoadingSuccessCallback = (res: HideLoadingSuccess) => void
/**
 * uni.hideLoading失败回调函数定义
 */
export type HideLoadingFailCallback = (res: HideLoadingFail) => void
/**
 * uni.hideLoading完成回调函数定义
 */
export type HideLoadingCompleteCallback = (res: any) => void

/**
 * uni.showLoading参数定义
 */
export type HideLoadingOptions = {
  /**
   * 期望隐藏的目标LoadingPage 如果为null 会关闭当前栈顶全部LoadingPage
   */
  loadingPage?: LoadingPage | null,
  /**
   * 接口调用成功的回调函数
   */
  success?: HideLoadingSuccessCallback | null,
  /**
   * 接口调用失败的回调函数
   */
  fail?: HideLoadingFailCallback | null,
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: HideLoadingCompleteCallback | null
}

export type HideLoading = (options?: HideLoadingOptions|null) => void

export type LoadingPage = UniPage;

export interface Uni {

	/**
	 * @description 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。
	 * @example
	  ```typescript
	  uni.showLoading({
	    title: '加载中'
	  });
	  ```
	 * @remark
	 * - showLoading 和 showToast 同时只能显示一个
	 * - showToast 应与 hideToast 配对使用
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#showloading
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#showloading
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "3.91",
	        "unixVer": "3.91"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "4.11",
	        "unixVer": "4.11",
	        "unixUtsPlugin": "4.11"
	      },
	      "harmony": {
	        "osVer": "3.0",
	        "uniVer": "4.23",
	        "unixVer": "4.61"
	      }
	    },
	    "mp": {
	      "weixin": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "4.41"
	      },
	      "alipay": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "baidu": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "toutiao": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "lark": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "qq": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "kuaishou": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "jd": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "√",
	      "unixVer": "4.0"
	    }
	  }
	 */
	showLoading(options?: ShowLoadingOptions|null): void,

	/**
	 * @description 隐藏 loading 提示框。
	 * @example
	  ```typescript
	  uni.showLoading({
	    title: '加载中'
	  });

	  setTimeout(function () {
	    uni.hideLoading();
	  }, 2000);
	  ```
	 * @tutorial_uni_app https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading
	 * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#hideloading
	 * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/prompt.html#hideloading
	 * @uniPlatform
	  {
	    "app": {
	      "android": {
	        "osVer": "5.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "3.91",
	        "unixVer": "3.91"
	      },
	      "ios": {
	        "osVer": "12.0",
	        "uniVer": "√",
	        "uniUtsPlugin": "4.11",
	        "unixVer": "4.11",
	        "unixUtsPlugin": "4.11"
	      },
	      "harmony": {
	        "osVer": "3.0",
	        "uniVer": "4.23",
	        "unixVer": "4.61"
	      }
	    },
	    "mp": {
	      "weixin": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "4.41"
	      },
	      "alipay": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "baidu": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "toutiao": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "lark": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "qq": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "kuaishou": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      },
	      "jd": {
	        "hostVer": "√",
	        "uniVer": "√",
	        "unixVer": "x"
	      }
	    },
	    "web": {
	      "uniVer": "√",
	      "unixVer": "4.0"
	    }
	  }
	 */
	hideLoading(options?: HideLoadingOptions|null): void,
}
