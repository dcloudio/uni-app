declare namespace UniNamespace {

interface MemoryWarningCallbackResult {
  /**
   * 内存警告等级(仅安卓平台有效，iOS始终是0)
   */
  level: number
}

/**
 * uni.onMemoryWarning/uni.offMemoryWarning回调函数定义
 */
type MemoryWarningCallback = (res: MemoryWarningCallbackResult) => void

type OnMemoryWarning = (callback: MemoryWarningCallback) => void

type OffMemoryWarning = (callback : MemoryWarningCallback | null) => void

}


declare interface Uni {
  /**
   * 开启监听内存警告
   *
   * @param {MemoryWarningCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/memory.html#onmemorywarning
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
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  onMemoryWarning(callback: UniNamespace.MemoryWarningCallback) : void,
  /**
   * 取消监听内存不足告警事件
   *
   * @param {MemoryWarningCallback} callback
   * @tutorial https://uniapp.dcloud.net.cn/api/system/memory.html#offmemorywarning
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
   *            "unixVer": "3.9.0"
   *   	  }
   *    }
   * }
   * @uniVersion 3.7.7
   * @uniVueVersion 2,3  //支持的vue版本
   * @autotest { expectCallback: true }
   */
  offMemoryWarning(callback : UniNamespace.MemoryWarningCallback | null) : void
}
