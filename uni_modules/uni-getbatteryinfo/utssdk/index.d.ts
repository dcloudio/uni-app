declare namespace UniNamespace {
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
}

declare interface Uni {
  /**
   * 获取设备电量
   *
   * @tutorial https://uniapp.dcloud.net.cn/api/system/batteryInfo.html
   */
  getBatteryInfo(option?: UniNamespace.GetBatteryInfoOption): void;

  /**
   * 同步获取电池电量信息
   * @tutorial https://uniapp.dcloud.net.cn/api/system/batteryInfo.html
   */
  getBatteryInfoSync(): UniNamespace.GetBatteryInfoSuccessCallbackResult;
}
