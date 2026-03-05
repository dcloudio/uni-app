interface GetBatteryInfoSuccessCallbackResult {
  /**
   * 是否正在充电中
   */
  isCharging: boolean;
  /**
   * 设备电量，范围 1 - 100
   */
  level: number;
  errMsg: string;
}

interface GetBatteryInfoOption {
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: Function
  /**
   * 接口调用失败的回调函数
   */
  fail?: Function
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: GetBatteryInfoSuccessCallbackResult) => void
}

declare class Uni {
  /**
   * 获取设备电量
   *
   * 文档: [https://uniapp.dcloud.net.cn/api/system/batteryInfo.html](https://uniapp.dcloud.net.cn/api/system/batteryInfo.html)
   */
  getBatteryInfo(option?: GetBatteryInfoOption): void;
}
