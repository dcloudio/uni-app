# uni-bluetooth

`uni-bluetooth` 是面向 **uni-app x** 的蓝牙低功耗（BLE）插件，提供蓝牙适配器管理、设备发现、连接、GATT 服务/特征读写、订阅通知（notify/indicate）以及 RSSI/MTU 等能力。

## 功能说明

本插件参考微信小程序的「蓝牙-通用」+「蓝牙-低功耗中心设备」两类能力：

- iOS平台 基于 Apple CoreBluetooth `CBCentralManager`，不包含经典蓝牙（SPP/RFCOMM 等）设备的扫描与连接。
- 不提供 BLE 外围设备/广播角色、信标（iBeacon/Eddystone）等能力。
- iOS平台 不提供 ATT MTU 设置与 MTU 变化事件：`setBLEMTU` 返回“平台不支持”（`1500105`）；`onBLEMTUChange` / `offBLEMTUChange` 为明确的空操作（`onBLEMTUChange` 返回 `-1`，不注册任何监听）。`getBLEMTU` 可用，返回当前写模式的单包最大负载长度（非协商后的 ATT_MTU）。


## 使用文档  
- [蓝牙-通用](https://doc.dcloud.net.cn/uni-app-x/api/bluetooth-general.html)
- [蓝牙-低功耗中心设备](https://doc.dcloud.net.cn/uni-app-x/api/bluetooth-le-central.html)


## 注意事项

### iOS平台权限

- 首次调用 `openBluetoothAdapter` 会弹出系统蓝牙授权框；用户授予后，进程存活期间即可正常使用。
- 用户拒绝蓝牙权限时，`openBluetoothAdapter` 返回 `1509602`（`data.state = 3`），需引导用户前往「设置 → 本 App → 蓝牙」开启。
- 系统蓝牙开关变化会触发 `onBluetoothAdapterStateChange`：开启/关闭对应 `poweredOn` / `poweredOff`。

## 参考文档

- [UTS API 插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
- [iOS平台 CoreBluetooth](https://developer.apple.com/documentation/corebluetooth)
