import Context from "android.content.Context";
import BatteryManager from "android.os.BatteryManager";

import { GetBatteryInfo, GetBatteryInfoOptions, GetBatteryInfoSuccess, GetBatteryInfoResult, GetBatteryInfoSync } from '../interface.uts'
import IntentFilter from 'android.content.IntentFilter';
import Intent from 'android.content.Intent';

import { GetBatteryInfoFailImpl } from '../unierror';

/**
 * 异步获取电量
 */
export const getBatteryInfo : GetBatteryInfo = function (options : GetBatteryInfoOptions) {
  const context = UTSAndroid.getAppContext();
  if (context != null) {
    const manager = context.getSystemService(
      Context.BATTERY_SERVICE
    ) as BatteryManager;
    const level = manager.getIntProperty(
      BatteryManager.BATTERY_PROPERTY_CAPACITY
    );

    let ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    let batteryStatus = context.registerReceiver(null, ifilter);
    let status = batteryStatus?.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
    let isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;

    const res : GetBatteryInfoSuccess = {
      errMsg: 'getBatteryInfo:ok',
      level,
      isCharging: isCharging
    }
    options.success?.(res)
    options.complete?.(res)
  } else {
    let res = new GetBatteryInfoFailImpl(1001);
    options.fail?.(res)
    options.complete?.(res)
  }
}

/**
 * 同步获取电量
 */
export const getBatteryInfoSync : GetBatteryInfoSync = function () : GetBatteryInfoResult {
  const context = UTSAndroid.getAppContext();
  if (context != null) {
    const manager = context.getSystemService(
      Context.BATTERY_SERVICE
    ) as BatteryManager;
    const level = manager.getIntProperty(
      BatteryManager.BATTERY_PROPERTY_CAPACITY
    );

    let ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    let batteryStatus = context.registerReceiver(null, ifilter);
    let status = batteryStatus?.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
    let isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;

    const res : GetBatteryInfoResult = {
      level: level,
      isCharging: isCharging
    };
    return res;
  }
  else {
    /**
     * 无有效上下文
     */
    const res : GetBatteryInfoResult = {
      level: -1,
      isCharging: false
    };
    return res;
  }
}
