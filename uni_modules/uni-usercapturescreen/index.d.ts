declare namespace UniNamespace {
  /**
    * uni.onUserCaptureScreen/uni.offUserCaptureScreen回调参数
    */
  type OnUserCaptureScreenCallbackResult = {
    /**
      * 截屏文件路径（仅Android返回）
      */
    path ?: string
  }

  /**
    * uni.onUserCaptureScreen/uni.offUserCaptureScreen回调函数定义
    */
  type UserCaptureScreenCallback = (res : OnUserCaptureScreenCallbackResult) => void

  type OnUserCaptureScreen = (callback : UserCaptureScreenCallback | null) => void

  type OffUserCaptureScreen = (callback : UserCaptureScreenCallback | null) => void

  /**
    * uni.setUserCaptureScreen成功回调参数
    */
  type SetUserCaptureScreenSuccess = {

  }

  /**
    * uni.setUserCaptureScreen成功回调函数定义
    */
  type SetUserCaptureScreenSuccessCallback = (res : SetUserCaptureScreenSuccess) => void

  /**
   * 错误码
   * - 12001 "setUserCaptureScreen:system not support"
   * - 12010 "setUserCaptureScreen:system internal error"
   */
  type SetUserCaptureScreenErrorCode = 12001 | 12010;

  /**
   * SetUserCaptureScreen 的错误回调参数
   */
  interface SetUserCaptureScreenFail {
    errCode : SetUserCaptureScreenErrorCode
  }

  /**
    * uni.setUserCaptureScreen失败回调函数定义
    */
  type SetUserCaptureScreenFailCallback = (res : SetUserCaptureScreenFail) => void

  /**
    * uni.setUserCaptureScreen完成回调函数定义
    */
  type SetUserCaptureScreenCompleteCallback = (res : any) => void

  /**
    * uni.setUserCaptureScreen参数
    */
  type SetUserCaptureScreenOptions = {
    /**
    * true: 允许用户截屏 false: 不允许用户截屏，防止用户截屏到应用页面内容
    */
    enable : boolean;
    /**
    * 接口调用成功的回调函数
    */
    // success : SetUserCaptureScreenSuccessCallback | null,
    success ?: SetUserCaptureScreenSuccessCallback,
    /**
    * 接口调用失败的回调函数
    */
    // fail : SetUserCaptureScreenFailCallback | null,
    fail ?: SetUserCaptureScreenFailCallback,
    /**
    * 接口调用结束的回调函数（调用成功、失败都会执行）
    */
    // complete : SetUserCaptureScreenSuccessCallback | SetUserCaptureScreenFailCallback | null
    complete ?: SetUserCaptureScreenCompleteCallback
  }

  type SetUserCaptureScreen = (options : SetUserCaptureScreenOptions) => void
}

declare interface Uni {
  /**
   * 开启截屏监听
   *
   * @param {UserCaptureScreenCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/capture-screen.html#onusercapturescreen
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "x"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  onUserCaptureScreen(callback : UniNamespace.UserCaptureScreenCallback | null) : void,
  /**
   * 关闭截屏监听
   *
   * @param {UserCaptureScreenCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/capture-screen.html#offusercapturescreen
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "x"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  offUserCaptureScreen(callback : UniNamespace.UserCaptureScreenCallback | null) : void,
  /**
   * 设置防截屏
   *
   * @param {SetUserCaptureScreenOptions} options
   * @tutorial https://uniapp.dcloud.net.cn/api/system/capture-screen.html#setusercapturescreen
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "13.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "x"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   */
  setUserCaptureScreen(options : UniNamespace.SetUserCaptureScreenOptions) : void
}
