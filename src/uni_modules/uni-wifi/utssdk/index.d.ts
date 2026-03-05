declare namespace UniNamespace {

  type UniWifiComplete = any
  type WifiSuccessCallback = (res : UniWifiResult) => void
  type WifiFailCallback = (err : UniWifiFail) => void
  type WifiCompleteCallback = (res : UniWifiComplete) => void
  type UniWifiCallback = () => void


  type WifiErrorCode = 1300002

  interface UniWifiInfo {
    SSID : string;
    BSSID ?: string;
    secure ?: boolean;
    signalStrength ?: number;
    frequency ?: number;
  }

  interface UniWifiResult {
    errCode : number,
    errSubject : string,
    errMsg : string,
    wifi : UniWifiInfo | null
  }

  interface UniWifiFail {
    errCode : WifiErrorCode
  }

  interface WifiConnectOption {
    SSID : string | null;
    BSSID : string | null;
    password : string | null;
    maunal : boolean | null;
    partialInfo : boolean | null; //ios不生效
    success : WifiSuccessCallback | null;
    fail : WifiFailCallback | null;
    complete : WifiCompleteCallback | null;
  }

  interface GetConnectedWifiOptions {
    partialInfo : boolean | null;
    success : WifiSuccessCallback | null;
    fail : WifiFailCallback | null;
    complete ?: WifiCompleteCallback | null;
  }


  interface WifiOption {
    success : WifiSuccessCallback | null,
    fail : WifiFailCallback | null,
    complete : InstallApkCompleteCallback | null
  }

  interface UniWifiInfoWithPartialInfo  {
  	SSID : string;
  }

  type UniGetWifiListCallback = (wifiInfo:UTSJSONObject) => void

  type UniWifiResultCallback = (wifiInfo:UniWifiResult) => void

  type UniWifiResultCallbackWithPartialInfo = (wifiInfo:UniWifiInfoWithPartialInfo) => void

}

declare interface Uni {

  /**
   * 初始化Wi-Fi模块
   *
   * @param {WifiOption} option
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#startwifi
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { after: 'stopWifi' }
   */
  startWifi(option : UniNamespace.WifiOption): void,

  /**
   * 关闭 Wi-Fi 模块
   *
   * @param {WifiOption} option
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#stopwifi
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { before: 'startWifi' }
   */
  stopWifi(option : UniNamespace.WifiOption) : void,
  /**
   * @param {WifiConnectOption} option
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#connectWifi
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": ">=4.4 && <10.0",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest {
  	generated: false,
  	pollution: false,
  	cases:[
  		{
  			before: 'startWifi',
  			after: 'stopWifi',
  			input: [{
  				maunal:false,
  				SSID:"Xiaomi_20D0",
  				password:"streamApp!2016",
  			}],
  			output:{
  					callbackType: 'success',
  					value: { errCode: 12013 ,errMsg: "connectWifi:wifi config may be expired",errSubject: "uni-connectWifi"}
  				}
  		}
  	]
  }
  */
  connectWifi(option : UniNamespace.WifiConnectOption) : void,
  /**
   * 请求获取 Wi-Fi 列表。wifiList 数据会在 onGetWifiList 注册的回调中返回。
   * @param {WifiOption} option
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#getWifiList
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { before: 'startWifi', after: 'stopWifi' }
  */
  getWifiList(option : UniNamespace.WifiOption) : void,
  /**
   * 监听获取到 Wi-Fi 列表数据事件。
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#onGetWifiList
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest  { expectCallback: true }
   * @autotest {
  	 generated: false,
  	 pollution: false,
  	 expectCallback: true,
  	 before: 'startWifi',
  	 after: 'onGetWifiListAfter',
  	 cases: [
  		 {
  			 output: {
  				 value: 0,
  				 returnKey: '.wifiList.length',
  				 jestExpectSyntax: 'toBeGreaterThan'
  			 },
  		 }
  	 ]
  }
   */
  onGetWifiList(callback : UniNamespace.UniGetWifiListCallback) : void,
  /**
   * 移除获取到 Wi-Fi 列表数据事件的监听函数。
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#offGetWifiList
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  offGetWifiList(callback : UniNamespace.UniWifiCallback) : void,
  /**
   * 获取已连接的 Wi-Fi 信息
   *
   * @param {GetConnectedWifiOptions} option
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#getConnectedWifi
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { before: 'startWifi', after: 'stopWifi' }
   */
  getConnectedWifi(option : UniNamespace.GetConnectedWifiOptions) : void,
  /**
   * 监听连接上 Wi-Fi 的事件
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnected
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  onWifiConnected(callback : UniNamespace.UniWifiResultCallback) : void,
  /**
   * 监听连接上 Wi-Fi 的事件。
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnectedWithPartialInfo
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  onWifiConnectedWithPartialInfo(callback : UniNamespace.UniWifiResultCallbackWithPartialInfo) : void,
  /**
   * 移除连接上 Wi-Fi 的事件的监听函数。
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnected
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "4.4.4",
   *            "uniVer": "3.7.0",
   *            "unixVer": "3.9.0"
   *        },
   *        "ios": {
   *            "osVer": "9.0",
   *            "uniVer": "3.7.7",
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  offWifiConnected(callback ?: UniNamespace.UniWifiCallback) : void,

  /**
   * 移除连接上 Wi-Fi 的事件的监听函数。
   *
   * @param {UniWifiCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnectedWithPartialInfo
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "x",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "x",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  offWifiConnectedWithPartialInfo(callback ?: UniNamespace.UniWifiResultCallbackWithPartialInfo) : void,
  /**
   * SetWifiList  暂未实现
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "x",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "x",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *   	  }
   *    }
   * }
   */
  setWifiList(option : UniNamespace.WifiOption) : void,


}
