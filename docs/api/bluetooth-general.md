> HBuilder5.36及以上版本app-android/app-ios平台uni-app x项目内置支持蓝牙功能，HBuilder5.36以下版本需下载插件：[uni-bluetooth](https://ext.dcloud.net.cn/plugin?id=30539)

## 模块介绍

蓝牙规范由蓝牙技术联盟（SIG）制定，主流有两种规格：**经典蓝牙（BR/EDR）** 用于音箱、耳机等较大带宽场景；**蓝牙低功耗（BLE，蓝牙 4.0 起）** 功耗低、适合小数据量传输，常见于智能穿戴、传感器、智能家居等设备。

本文与[蓝牙-低功耗中心设备](./bluetooth-le-central.md)介绍 BLE 中心设备能力，用于发现并连接蓝牙低功耗外设，不用于经典蓝牙设备的数据通信。接口按职责分为两部分：

- **蓝牙-通用**：初始化/关闭适配器、监听适配器状态、扫描与发现设备、获取设备列表；
- **[蓝牙-低功耗中心设备](./bluetooth-le-central.md)**：连接设备、发现服务与特征值、读写特征值、订阅通知、MTU 等。

当前支持微信小程序（uni-app x 4.41 起）和支付宝小程序（uni-app x 5.31 起），App 端Harmony平台暂不支持。各接口的具体支持范围及最低支持版本以兼容性表为准。


## 使用流程

::: warning 注意事项

使用蓝牙能力前，需先调用 [uni.openBluetoothAdapter](#openbluetoothadapter) 初始化蓝牙适配器，并确认初始化成功。调用 [uni.closeBluetoothAdapter](#closebluetoothadapter) 或应用进程结束后，再次使用时需重新初始化。监听类接口可提前注册。

:::

<img class="zooming" src="../static/bluetooth-general-flow.svg" alt="蓝牙通用接口使用流程：注册监听、初始化、扫描发现设备、停止扫描、连接通信及清理资源" width="400">

1. 注册 [uni.onBluetoothAdapterStateChange](#onbluetoothadapterstatechange) 和 [uni.onBluetoothDeviceFound](#onbluetoothdevicefound)，分别监听适配器状态和设备发现事件。
2. 调用 [uni.openBluetoothAdapter](#openbluetoothadapter)，初始化成功后调用 [uni.startBluetoothDevicesDiscovery](#startbluetoothdevicesdiscovery) 开始扫描。
3. 通过设备发现事件获取目标设备的 `deviceId`，也可调用 [uni.getBluetoothDevices](#getbluetoothdevices) 获取已发现的设备列表。
4. 发现目标设备后，调用 [uni.stopBluetoothDevicesDiscovery](#stopbluetoothdevicesdiscovery) 停止扫描，再连接设备并通信，见[蓝牙-低功耗中心设备](./bluetooth-le-central.md)。
5. 使用结束后，移除当前页面或组件注册的监听；不再使用蓝牙能力时，调用 [uni.closeBluetoothAdapter](#closebluetoothadapter) 释放适配器。

## 权限@permission

### iOS

- 蓝牙访问需要 `NSBluetoothAlwaysUsageDescription` 隐私说明，并获得用户授权。发行时应确认最终应用包含符合实际用途的权限说明。
- 系统蓝牙开关与应用蓝牙权限是两个独立条件。系统蓝牙已开启，不代表应用已获授权。

### 微信小程序和支付宝小程序

需分别遵循微信小程序和支付宝小程序的蓝牙授权要求与平台限制。各接口的支持范围以对应的兼容性表为准。

## 注意事项@tips

### 设备发现与连接

- **使用扫描返回的 deviceId**：通过设备发现事件或已发现的设备列表获取目标设备的 `deviceId`，再用于后续连接和通信。
- **iOS 设备标识**：连接设备前需先扫描发现设备，仅保存设备 ID 不能代替设备发现。iOS 的 `deviceId` 来自系统分配的 UUID，不应假设它跨手机、跨安装或跨会话始终不变。
- **及时停止扫描**：扫描较耗电，发现目标设备后应尽快停止扫描。

适配器可用不代表设备已连接。监听设备连接状态时，使用 [uni.onBLEConnectionStateChange](./bluetooth-le-central.md#onbleconnectionstatechange)，通过回调中的 `deviceId` 和 `connected` 判断目标设备是否连接。

### 事件监听

- **监听与取消监听成对使用**：页面或组件卸载时，调用对应的 `off*` 移除自身注册的监听，避免重复监听或影响其他页面。
- **iOS 监听 ID**：可保存 `on*` 返回的监听 ID，并将该 ID 传给对应的 `off*`，仅移除自身注册的监听，避免清空其他页面的监听。

### 适配器状态与权限

- **适配器由应用共享**：关闭适配器会影响其他页面正在进行的蓝牙操作，应统一管理其生命周期。
- **蓝牙关闭后的恢复**：系统蓝牙关闭后，现有扫描与连接会失效。重新开启后，应根据适配器可用状态重新扫描、连接，并重新发现服务与特征值、订阅通知。

系统蓝牙开关和应用蓝牙权限需分别检查。先注册 [uni.onBluetoothAdapterStateChange](#onbluetoothadapterstatechange) 并调用 [uni.openBluetoothAdapter](#openbluetoothadapter) 初始化。

以下操作路径及事件表现为 **iOS 平台差异**，不作为其他平台的操作说明：

| 操作路径 | 事件表现 | uni API 处理方式 |
| --- | --- | --- |
| 设置 → 蓝牙：主开关 | 应用进程存活时，会触发适配器状态变化事件 | 在 `onBluetoothAdapterStateChange` 回调中通过 `available` 判断是否可用。关闭时停止后续蓝牙操作；重新开启且 `available` 为 `true` 后，按需重新扫描和连接。 |
| 设置 → App → 蓝牙：应用权限 | 系统会终止 App，不能依赖原进程继续接收事件 | 重新启动后，重新注册监听并调用 `openBluetoothAdapter`，根据成功或失败回调处理授权结果。 |
| 控制中心：蓝牙按钮 | 通常不会触发适配器状态变化事件 | 适配器仍可能可用，不能用此操作代替系统蓝牙主开关测试。设备是否断开应通过 `onBLEConnectionStateChange` 判断。 |

### 后台运行

iOS 应用进行后台蓝牙操作需声明 `bluetooth-central` 后台模式，但后台扫描与连接仍受系统调度限制，不能保证与前台行为一致。

### 初始化失败处理

以下错误码及处理方式适用于 App，微信小程序和支付宝小程序的错误码说明详见其文档。

| errCode | 含义 | 建议处理 |
| --- | --- | --- |
| `1509602` | 应用未获得蓝牙权限 | 引导用户在“设置 → App → 蓝牙”中授权。权限变更导致 App 重新启动后，重新注册监听并初始化。 |
| `1509603` | 系统蓝牙已关闭 | 引导用户在“设置 → 蓝牙”中开启主开关，恢复后重新调用初始化。 |
| `1500102` | 适配器暂不可用 | 等待适配器恢复可用后再尝试，不要连续反复初始化。 |
| `1509010` | 初始化时等待适配器状态超时 | 稍后重试初始化，并检查系统蓝牙状态；该错误不同于连接设备时的 `1509005`。 |
| `1500105` | 系统或平台不支持该蓝牙能力 | 检查接口兼容性及运行环境，重复调用不能消除此限制。 |
| `1500104` / `1509000` | 系统调用失败或其他错误 | 记录接口名、`errCode`、`errMsg` 及可用的错误详情，结合真机环境进一步排查。 |

::: sourceCode
## uni.openBluetoothAdapter(options) @openbluetoothadapter

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.openBluetoothAdapter


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

初始化蓝牙模块，建议与 uni.closeBluetoothAdapter 成对调用。

### openBluetoothAdapter 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.openBluetoothAdapter.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=openBluetoothAdapter&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **OpenBluetoothAdapterOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [OpenBluetoothAdapterSuccess](#openbluetoothadaptersuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。App 端的 success 回调结果不返回 errCode，该字段仅由微信小程序返回。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [OpenBluetoothAdapterSuccess](#openbluetoothadaptersuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 |
| mode | string | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 需要基础库： `2.10.0`<br/><br/>蓝牙模式，可作为主/从设备，仅 iOS 需要。<br/><br/>可选值：<br/>- 'central': 主机模式;<br/>- 'peripheral': 从机（外围设备）模式;<br/> |

##### mode 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "central" | Web: x; HarmonyOS: x |
| "peripheral" | Web: x; HarmonyOS: x | 

#### OpenBluetoothAdapterSuccess 的属性值 @openbluetoothadaptersuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.openBluetoothAdapter.example -->



### 使用说明

- 初始化成功只表示应用可以使用蓝牙适配器，不代表已扫描到设备或建立连接。应在成功回调后开始扫描，再按[中心设备使用流程](./bluetooth-le-central.md#使用流程)连接和通信。
- 初始化失败时，应根据失败回调处理原因，待相关条件恢复后重新初始化，不要继续扫描或连接。

::: sourceCode
## uni.closeBluetoothAdapter(options) @closebluetoothadapter

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.closeBluetoothAdapter


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

关闭蓝牙模块并释放相关系统资源，建议与 uni.openBluetoothAdapter 成对调用。

### closeBluetoothAdapter 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.closeBluetoothAdapter.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=closeBluetoothAdapter&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **CloseBluetoothAdapterOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [CloseBluetoothAdapterSuccess](#closebluetoothadaptersuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。App 端的 success 回调结果不返回 errCode，该字段仅由微信小程序返回。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [CloseBluetoothAdapterSuccess](#closebluetoothadaptersuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### CloseBluetoothAdapterSuccess 的属性值 @closebluetoothadaptersuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.closeBluetoothAdapter.example -->




::: sourceCode
## uni.getBluetoothAdapterState(options) @getbluetoothadapterstate

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.getBluetoothAdapterState


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

获取本机蓝牙适配器状态。

### getBluetoothAdapterState 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothAdapterState.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getBluetoothAdapterState&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBluetoothAdapterStateOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [GetBluetoothAdapterStateSuccess](#getbluetoothadapterstatesuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBluetoothAdapterStateSuccess](#getbluetoothadapterstatesuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetBluetoothAdapterStateSuccess 的属性值 @getbluetoothadapterstatesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| discovering | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 是否正在搜索设备。 |
| available | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器是否可用。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBluetoothAdapterState.example -->




::: sourceCode
## uni.onBluetoothAdapterStateChange(callback) @onbluetoothadapterstatechange

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.onBluetoothAdapterStateChange


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

监听蓝牙适配器状态变化事件。

### onBluetoothAdapterStateChange 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothAdapterStateChange.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=onBluetoothAdapterStateChange&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (result: [BluetoothAdapterStateChangeResult](#bluetoothadapterstatechangeresult-values)) => void | 是 | Web: x; HarmonyOS: x | * | 

### BluetoothAdapterStateChangeResult 的属性值 @bluetoothadapterstatechangeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| available | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器是否可用。 |
| discovering | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器是否正在搜索设备。 |




### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onBluetoothAdapterStateChange.example -->




::: sourceCode
## uni.offBluetoothAdapterStateChange(listener?) @offbluetoothadapterstatechange

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.offBluetoothAdapterStateChange


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

移除蓝牙适配器状态变化监听函数。传入监听 ID 时移除对应监听，否则移除全部监听。

### offBluetoothAdapterStateChange 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothAdapterStateChange.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=offBluetoothAdapterStateChange&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | number \| (result: **BluetoothAdapterStateChangeResult**) => void | 否 | Web: x; HarmonyOS: x | * |

#### listener 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| available | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器是否可用。 |
| discovering | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器是否正在搜索设备。 | 






<!-- UTSAPIJSON.offBluetoothAdapterStateChange.example -->




::: sourceCode
## uni.startBluetoothDevicesDiscovery(options) @startbluetoothdevicesdiscovery

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.startBluetoothDevicesDiscovery


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

开始搜寻附近的蓝牙外围设备。此操作比较耗费系统资源，搜索到需要的设备后应及时调用 uni.stopBluetoothDevicesDiscovery 停止搜索。

### startBluetoothDevicesDiscovery 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.startBluetoothDevicesDiscovery.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=startBluetoothDevicesDiscovery&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StartBluetoothDevicesDiscoveryOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| services | Array&lt;string&gt; | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 要搜索的蓝牙设备主服务 UUID 列表，支持 16、32、128 位 UUID。设置后只搜索广播包中包含对应主服务 UUID 的设备。 |
| allowDuplicatesKey | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 是否允许重复上报同一设备，默认值为 false。开启后同一设备可能被多次上报，但 RSSI 可能不同。 |
| interval | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 上报设备的间隔，单位 ms，默认值为 0。0 表示发现新设备后立即上报。 |
| powerLevel | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | 扫描模式，默认值为 medium；扫描速度越高越耗电。 |
| success | (result: [StartBluetoothDevicesDiscoverySuccess](#startbluetoothdevicesdiscoverysuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。App 端的 success 回调结果不返回 errCode，该字段仅由微信小程序返回。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [StartBluetoothDevicesDiscoverySuccess](#startbluetoothdevicesdiscoverysuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

##### powerLevel 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "low" | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | 低功耗扫描模式。  |
| "medium" | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | 均衡扫描模式。  |
| "high" | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | 高功耗扫描模式。  |

#### StartBluetoothDevicesDiscoverySuccess 的属性值 @startbluetoothdevicesdiscoverysuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.example -->




::: sourceCode
## uni.stopBluetoothDevicesDiscovery(options) @stopbluetoothdevicesdiscovery

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.stopBluetoothDevicesDiscovery


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

停止搜寻附近的蓝牙外围设备。

### stopBluetoothDevicesDiscovery 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=stopBluetoothDevicesDiscovery&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **StopBluetoothDevicesDiscoveryOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [StopBluetoothDevicesDiscoverySuccess](#stopbluetoothdevicesdiscoverysuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。App 端的 success 回调结果不返回 errCode，该字段仅由微信小程序返回。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [StopBluetoothDevicesDiscoverySuccess](#stopbluetoothdevicesdiscoverysuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### StopBluetoothDevicesDiscoverySuccess 的属性值 @stopbluetoothdevicesdiscoverysuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.example -->




::: sourceCode
## uni.onBluetoothDeviceFound(listener) @onbluetoothdevicefound

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.onBluetoothDeviceFound


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

监听搜索到新设备的事件。回调上报的设备会加入 uni.getBluetoothDevices 返回的设备列表。

### onBluetoothDeviceFound 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.onBluetoothDeviceFound.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=onBluetoothDeviceFound&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | (result: [BluetoothDeviceFoundResult](#bluetoothdevicefoundresult-values)) => void | 是 | Web: x; HarmonyOS: x | * | 

### BluetoothDeviceFoundResult 的属性值 @bluetoothdevicefoundresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| devices | Array&lt;**BluetoothDevice**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 新搜索到的设备列表。 |

#### devices 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙设备名称。某些设备可能没有名称；连接后名称可能由广播包中的 LocalName 变为设备的 GattName。 |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 用于区分蓝牙设备的 ID。 |
| RSSI | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备的信号强度，单位 dBm。 |
| advertisData | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ManufacturerData 数据段。 |
| advertisServiceUUIDs | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceUUIDs 数据段。 |
| localName | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 LocalName 数据段。 |
| serviceData | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceData 数据段，键为服务 UUID，值为对应的二进制数据。 |
| connectable | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备是否可连接。Android 8.0 以下不返回该值。 |




### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onBluetoothDeviceFound.example -->




::: sourceCode
## uni.offBluetoothDeviceFound(listener?) @offbluetoothdevicefound

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.offBluetoothDeviceFound


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

移除搜索到新设备的事件监听。传入监听 ID 时移除对应监听，否则移除全部监听。

### offBluetoothDeviceFound 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothDeviceFound.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=offBluetoothDeviceFound&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | number \| (result: **BluetoothDeviceFoundResult**) => void | 否 | Web: x; HarmonyOS: x | * |

#### listener 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| devices | Array&lt;**BluetoothDevice**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 新搜索到的设备列表。 |

##### devices 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙设备名称。某些设备可能没有名称；连接后名称可能由广播包中的 LocalName 变为设备的 GattName。 |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 用于区分蓝牙设备的 ID。 |
| RSSI | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备的信号强度，单位 dBm。 |
| advertisData | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ManufacturerData 数据段。 |
| advertisServiceUUIDs | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceUUIDs 数据段。 |
| localName | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 LocalName 数据段。 |
| serviceData | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceData 数据段，键为服务 UUID，值为对应的二进制数据。 |
| connectable | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备是否可连接。Android 8.0 以下不返回该值。 | 






<!-- UTSAPIJSON.offBluetoothDeviceFound.example -->




::: sourceCode
## uni.getBluetoothDevices(options) @getbluetoothdevices

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.getBluetoothDevices


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

获取蓝牙模块生效期间所有搜索到的蓝牙设备，包括已经和本机处于连接状态的设备。

### getBluetoothDevices 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getBluetoothDevices.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getBluetoothDevices&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBluetoothDevicesOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [GetBluetoothDevicesSuccess](#getbluetoothdevicessuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBluetoothDevicesSuccess](#getbluetoothdevicessuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetBluetoothDevicesSuccess 的属性值 @getbluetoothdevicessuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| devices | Array&lt;**BluetoothDevice**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙模块生效期间搜索到的设备列表，包括已经和本机处于连接状态的设备。 |

#### devices 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙设备名称。某些设备可能没有名称；连接后名称可能由广播包中的 LocalName 变为设备的 GattName。 |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 用于区分蓝牙设备的 ID。 |
| RSSI | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备的信号强度，单位 dBm。 |
| advertisData | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ManufacturerData 数据段。 |
| advertisServiceUUIDs | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceUUIDs 数据段。 |
| localName | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 LocalName 数据段。 |
| serviceData | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备广播数据中的 ServiceData 数据段，键为服务 UUID，值为对应的二进制数据。 |
| connectable | boolean | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙设备是否可连接。Android 8.0 以下不返回该值。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBluetoothDevices.example -->




::: sourceCode
## uni.getConnectedBluetoothDevices(options) @getconnectedbluetoothdevices

> issues: https://issues.dcloud.net.cn/?mid=api.device.bluetooth.bluetooth-general.getConnectedBluetoothDevices


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-bluetooth

:::

根据主服务 UUID 获取已连接的蓝牙设备。

### getConnectedBluetoothDevices 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.getConnectedBluetoothDevices.html"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getConnectedBluetoothDevices&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.41","5.31","5.36","5.36","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetConnectedBluetoothDevicesOptions** | 是 | Web: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| services | Array&lt;string&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙设备主服务 UUID 列表，支持 16、32、128 位 UUID。 |
| success | (result: [GetConnectedBluetoothDevicesSuccess](#getconnectedbluetoothdevicessuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetConnectedBluetoothDevicesSuccess](#getconnectedbluetoothdevicessuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetConnectedBluetoothDevicesSuccess 的属性值 @getconnectedbluetoothdevicessuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用结果信息。 |
| devices | Array&lt;**ConnectedBluetoothDevice**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 指定主服务 UUID 对应的已连接设备列表。 |

#### devices 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| name | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙设备名称。某些设备可能没有名称。 |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 用于区分蓝牙设备的 ID。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: x; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 5.36; iOS: 5.36; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: x; iOS: 5.36; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getConnectedBluetoothDevices.example -->




## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/bluetooth-general/bluetooth-general.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/bluetooth-general/bluetooth-general.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/bluetooth-general/bluetooth-general
```uvue
<template>
	<view class="page">
		<view class="log-panel">
			<view class="panel-heading">
				<text class="panel-title">Log</text>
				<button class="clear-button" size="mini" @click="clearLogs">清空</button>
			</view>
			<scroll-view class="log-list" direction="vertical" :show-scrollbar="true">
				<text v-if="logs.length == 0" class="log-empty">等待 API 调用</text>
				<text v-for="(log, index) in logs" :key="index" class="log-item">{{ log }}</text>
			</scroll-view>
		</view>

		<scroll-view class="api-scroll" direction="vertical" :show-scrollbar="true">
			<view class="api-content">

			<view class="section">
				<text class="section-title">监听 API</text>
				<view class="listener-card">
					<view class="listener-heading">
						<text class="listener-title">适配器状态变化</text>
						<text class="listener-status">listenerId: {{ adapterListenerId == 0 ? '-' : adapterListenerId }}</text>
					</view>
					<view class="listener-api-row">
						<text class="listener-api-name">uni.onBluetoothAdapterStateChange</text>
						<button id="test-on-bluetooth-adapter-state-change" class="listener-button" size="mini" type="primary"
							@click="onAdapterStateChange">监听</button>
					</view>
					<view class="listener-api-row">
						<text class="listener-api-name">uni.offBluetoothAdapterStateChange</text>
						<button id="test-off-bluetooth-adapter-state-change" class="listener-button" size="mini"
							@click="offAdapterStateChange">取消</button>
					</view>
				</view>

				<view class="listener-card">
					<view class="listener-heading">
						<text class="listener-title">发现蓝牙设备</text>
						<text class="listener-status">listenerId: {{ deviceListenerId == 0 ? '-' : deviceListenerId }}</text>
					</view>
					<view class="listener-api-row">
						<text class="listener-api-name">uni.onBluetoothDeviceFound</text>
						<button id="test-on-bluetooth-device-found" class="listener-button" size="mini" type="primary"
							@click="onDeviceFound">监听</button>
					</view>
					<view class="listener-api-row">
						<text class="listener-api-name">uni.offBluetoothDeviceFound</text>
						<button id="test-off-bluetooth-device-found" class="listener-button" size="mini"
							@click="offDeviceFound">取消</button>
					</view>
				</view>
			</view>

			<view class="section">
				<text class="section-title">普通 API</text>
				<view class="api-card">
					<view class="api-action-row">
						<text class="api-name">uni.openBluetoothAdapter</text>
						<button id="test-open-bluetooth-adapter" class="call-button" size="mini" type="primary" @click="openAdapter">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="api-action-row">
						<text class="api-name">uni.getBluetoothAdapterState</text>
						<button id="test-get-bluetooth-adapter-state" class="call-button" size="mini" @click="getAdapterState">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="parameter-row parameter-row-column">
						<text class="parameter-name">services</text>
						<input v-model="discoveryServices" class="parameter-input" placeholder="多个 UUID 使用英文逗号分隔" />
					</view>
					<view class="parameter-row">
						<text class="parameter-name">allowDuplicatesKey</text>
						<switch :checked="allowDuplicates" @change="allowDuplicates = $event.detail.value" />
					</view>
					<view class="parameter-row">
						<text class="parameter-name">interval (ms)</text>
						<input v-model="discoveryInterval" class="parameter-input parameter-input-short" type="number" placeholder="0" />
					</view>
					<!-- #ifdef APP-ANDROID -->
					<view class="parameter-row">
						<text class="parameter-name">powerLevel</text>
						<picker class="parameter-picker" :range="powerLevels" :value="powerLevelIndex" @change="onPowerLevelChange">
							<view class="picker-value">{{ powerLevels[powerLevelIndex] }}</view>
						</picker>
					</view>
					<!-- #endif -->
					<view class="api-action-row api-action-row-after-parameters">
						<text class="api-name">uni.startBluetoothDevicesDiscovery</text>
						<button id="test-start-bluetooth-devices-discovery" class="call-button" size="mini" type="primary"
							@click="startDiscovery">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="api-action-row">
						<text class="api-name">uni.stopBluetoothDevicesDiscovery</text>
						<button id="test-stop-bluetooth-devices-discovery" class="call-button" size="mini" @click="stopDiscovery">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="api-action-row">
						<text class="api-name">uni.getBluetoothDevices</text>
						<button id="test-get-bluetooth-devices" class="call-button" size="mini" @click="getDevices">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="parameter-row parameter-row-column">
						<text class="parameter-name">services</text>
						<input v-model="connectedServices" class="parameter-input" placeholder="必填，多个 UUID 使用英文逗号分隔" />
					</view>
					<view class="api-action-row api-action-row-after-parameters">
						<text class="api-name">uni.getConnectedBluetoothDevices</text>
						<button id="test-get-connected-bluetooth-devices" class="call-button" size="mini"
							@click="getConnectedDevices">调用</button>
					</view>
				</view>

				<view class="api-card">
					<view class="api-action-row">
						<text class="api-name">uni.closeBluetoothAdapter</text>
						<button id="test-close-bluetooth-adapter" class="call-button" size="mini" @click="closeAdapter">调用</button>
					</view>
				</view>
			</view>

			<button id="bluetooth-general-performance-test" class="performance-button" type="primary"
				@click="openPerformanceTest">综合性能测试</button>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	// #ifdef APP-ANDROID
	type PowerLevel = 'low' | 'medium' | 'high'
	// #endif

	type GeneralBluetoothDevice = {
		name ?: string | null
		localName ?: string | null
		deviceId : string
		RSSI ?: number | null
	}

	const logs = ref<string[]>([])
	const adapterListenerId = ref(0)
	const deviceListenerId = ref(0)
	const adapterOpened = ref(false)
	const discovering = ref(false)
	const discoveryServices = ref('')
	const connectedServices = ref('')
	const allowDuplicates = ref(false)
	const discoveryInterval = ref('0')
	// #ifdef APP-ANDROID
	const powerLevels = ['low', 'medium', 'high'] as PowerLevel[]
	const powerLevelIndex = ref(1)
	// #endif

	function addLog(apiName : string, message : string) {
		logs.value.unshift('[' + new Date().toLocaleTimeString() + '] ' + apiName + ': ' + message)
		if (logs.value.length > 100) logs.value.pop()
	}

	function addCallbackLog(message : string) {
		logs.value.unshift('[' + new Date().toLocaleTimeString() + '] ' + message)
		if (logs.value.length > 100) logs.value.pop()
	}

	function addError(errCode ?: number | null) {
		const code = errCode == null ? 'null' : errCode!.toString()
		addCallbackLog('errCode=' + code)
	}

	function clearLogs() {
		logs.value = []
	}

	function parseServices(value : string) : string[] {
		const result = [] as string[]
		value.split(',').forEach((item : string) => {
			const service = item.trim()
			if (service.length > 0) result.push(service)
		})
		return result
	}

	function formatDevices(devices : GeneralBluetoothDevice[]) : string {
		if (devices.length == 0) return 'devices=[]'
		const details = [] as string[]
		devices.forEach((device : GeneralBluetoothDevice) => {
			let name = device.name
			if ((name == null || name!.length == 0) && device.localName != null) name = device.localName
			const RSSI = device.RSSI == null ? 'null' : device.RSSI!.toString()
			details.push('{name=' + (name == null ? '' : name!) + ', deviceId=' + device.deviceId + ', RSSI=' + RSSI + '}')
		})
		return 'devices(' + devices.length.toString() + ')=[' + details.join(', ') + ']'
	}

	const adapterStateCallback = (result : { available : boolean, discovering : boolean }) => {
		addLog('onBluetoothAdapterStateChange callback', 'available=' + result.available.toString() + ', discovering=' + result.discovering.toString())
	}

	const deviceFoundCallback = (result : { devices : GeneralBluetoothDevice[] }) => {
		addLog('onBluetoothDeviceFound callback', formatDevices(result.devices))
	}

	function openAdapter() {
		addLog('openBluetoothAdapter', 'request')
		uni.openBluetoothAdapter({
			success: (result) => {
				adapterOpened.value = true
				addCallbackLog(result.errMsg)
			},
			fail: (error) => addError(error.errCode)
		})
	}

	function closeAdapter() {
		addLog('closeBluetoothAdapter', 'request')
		uni.closeBluetoothAdapter({
			success: (result) => {
				adapterOpened.value = false
				discovering.value = false
				addCallbackLog(result.errMsg)
			},
			fail: (error) => addError(error.errCode)
		})
	}

	function getAdapterState() {
		addLog('getBluetoothAdapterState', 'request')
		uni.getBluetoothAdapterState({
			success: (result) => {
				addCallbackLog(result.errMsg + ', available=' + result.available.toString() + ', discovering=' + result.discovering.toString())
			},
			fail: (error) => addError(error.errCode)
		})
	}

	function onAdapterStateChange() {
		if (adapterListenerId.value != 0) {
			addLog('onBluetoothAdapterStateChange', 'listener already registered, listenerId=' + adapterListenerId.value.toString())
			return
		}
		adapterListenerId.value = uni.onBluetoothAdapterStateChange(adapterStateCallback)
		addLog('onBluetoothAdapterStateChange', 'registered, listenerId=' + adapterListenerId.value.toString())
	}

	function offAdapterStateChange() {
		const listenerId = adapterListenerId.value
		if (listenerId != 0) uni.offBluetoothAdapterStateChange(listenerId)
		else uni.offBluetoothAdapterStateChange()
		adapterListenerId.value = 0
		addLog('offBluetoothAdapterStateChange', listenerId == 0 ? 'removed all listeners' : 'removed listenerId=' + listenerId.toString())
	}

	// #ifdef APP-ANDROID
	function onPowerLevelChange(event : UniPickerChangeEvent) {
		powerLevelIndex.value = event.detail.value as number
	}
	// #endif

	function startDiscovery() {
		const services = parseServices(discoveryServices.value)
		let interval = parseInt(discoveryInterval.value)
		if (Number.isNaN(interval) || interval < 0) interval = 0
		let parameterLog = 'request, services=[' + services.join(', ') + '], allowDuplicatesKey=' + allowDuplicates.value.toString() + ', interval=' + interval.toString()
		// #ifdef APP-ANDROID
		const powerLevel = powerLevels[powerLevelIndex.value]
		parameterLog += ', powerLevel=' + powerLevel
		// #endif
		addLog('startBluetoothDevicesDiscovery', parameterLog)
		const options : StartBluetoothDevicesDiscoveryOptions = {
			allowDuplicatesKey: allowDuplicates.value,
			interval,
			// #ifdef APP-ANDROID
			powerLevel,
			// #endif
			success: (result) => {
				discovering.value = true
				addCallbackLog(result.errMsg)
			},
			fail: (error) => addError(error.errCode)
		}
		if (services.length > 0) options.services = services
		uni.startBluetoothDevicesDiscovery(options)
	}

	function stopDiscovery() {
		addLog('stopBluetoothDevicesDiscovery', 'request')
		uni.stopBluetoothDevicesDiscovery({
			success: (result) => {
				discovering.value = false
				addCallbackLog(result.errMsg)
			},
			fail: (error) => addError(error.errCode)
		})
	}

	function onDeviceFound() {
		if (deviceListenerId.value != 0) {
			addLog('onBluetoothDeviceFound', 'listener already registered, listenerId=' + deviceListenerId.value.toString())
			return
		}
		deviceListenerId.value = uni.onBluetoothDeviceFound(deviceFoundCallback)
		addLog('onBluetoothDeviceFound', 'registered, listenerId=' + deviceListenerId.value.toString())
	}

	function offDeviceFound() {
		const listenerId = deviceListenerId.value
		if (listenerId != 0) uni.offBluetoothDeviceFound(listenerId)
		else uni.offBluetoothDeviceFound()
		deviceListenerId.value = 0
		addLog('offBluetoothDeviceFound', listenerId == 0 ? 'removed all listeners' : 'removed listenerId=' + listenerId.toString())
	}

	function getDevices() {
		addLog('getBluetoothDevices', 'request')
		uni.getBluetoothDevices({
			success: (result) => addCallbackLog(result.errMsg + ', ' + formatDevices(result.devices)),
			fail: (error) => addError(error.errCode)
		})
	}

	function getConnectedDevices() {
		const services = parseServices(connectedServices.value)
		addLog('getConnectedBluetoothDevices', 'request, services=[' + services.join(', ') + ']')
		uni.getConnectedBluetoothDevices({
			services,
			success: (result) => addCallbackLog(result.errMsg + ', ' + formatDevices(result.devices)),
			fail: (error) => addError(error.errCode)
		})
	}

	function openPerformanceTest() {
		uni.navigateTo({
			url: '/pages/API/bluetooth-benchmark/bluetooth-benchmark'
		})
	}

	onLoad(() => {
		onAdapterStateChange()
		onDeviceFound()
	})

	onUnload(() => {
		if (adapterListenerId.value != 0) uni.offBluetoothAdapterStateChange(adapterListenerId.value)
		if (deviceListenerId.value != 0) uni.offBluetoothDeviceFound(deviceListenerId.value)
		if (discovering.value) uni.stopBluetoothDevicesDiscovery({})
		if (adapterOpened.value) uni.closeBluetoothAdapter({})
	})
</script>

<style>
	.page {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #f5f5f5;
	}

	.api-scroll {
		flex: 1;
	}

	.api-content {
		display: flex;
		flex-direction: column;
		padding: 0 15px 15px;
	}

	.log-panel {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		margin: 15px 15px 10px;
		background-color: #1f2329;
		border-radius: 6px;
		overflow: hidden;
	}

	.panel-heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 8px 10px;
		border-bottom-width: 1px;
		border-bottom-style: solid;
		border-bottom-color: #3a3f47;
	}

	.panel-title {
		font-size: 14px;
		font-weight: 600;
		color: #ffffff;
	}

	.clear-button {
		margin: 0;
	}

	.log-list {
		height: 210px;
		padding: 8px 10px;
	}

	.log-empty,
	.log-item {
		margin-bottom: 6px;
		font-size: 11px;
		line-height: 16px;
		color: #aeb6c2;
	}

	.log-item {
		color: #d7dde5;
	}

	.section {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	.section-title {
		margin-bottom: 10px;
		font-size: 16px;
		font-weight: 600;
		color: #222222;
	}

	.listener-card {
		display: flex;
		flex-direction: column;
		margin-bottom: 12px;
		padding: 12px;
		background-color: #ffffff;
		border-radius: 6px;
	}

	.listener-heading {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 8px;
	}

	.listener-title {
		font-size: 14px;
		font-weight: 600;
		color: #222222;
	}

	.listener-status {
		font-size: 11px;
		color: #777777;
	}

	.listener-api-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 46px;
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #eeeeee;
	}

	.listener-api-name {
		flex: 1;
		margin-right: 10px;
		font-size: 12px;
		color: #333333;
	}

	.listener-button {
		width: 64px;
		margin: 0;
	}

	.api-card {
		display: flex;
		flex-direction: column;
		margin-bottom: 12px;
		padding: 12px;
		background-color: #ffffff;
		border-radius: 6px;
	}

	.api-name {
		flex: 1;
		margin-right: 10px;
		font-size: 14px;
		font-weight: 600;
		color: #222222;
	}

	.api-action-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 32px;
	}

	.api-action-row-after-parameters {
		margin-top: 10px;
	}

	.parameter-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		min-height: 42px;
		padding: 4px 0;
		border-top-width: 1px;
		border-top-style: solid;
		border-top-color: #eeeeee;
	}

	.parameter-row-column {
		flex-direction: column;
		align-items: stretch;
	}

	.parameter-name {
		font-size: 12px;
		color: #555555;
	}

	.parameter-input {
		height: 36px;
		margin-top: 6px;
		padding: 0 10px;
		background-color: #f5f5f5;
		border-radius: 4px;
		font-size: 12px;
	}

	.parameter-input-short {
		width: 120px;
		margin-top: 0;
	}

	.parameter-picker {
		width: 120px;
	}

	.picker-value {
		height: 36px;
		padding: 0 10px;
		background-color: #f5f5f5;
		border-radius: 4px;
		font-size: 12px;
		line-height: 36px;
		color: #333333;
	}

	.call-button {
		width: 64px;
		margin: 0;
	}

	.performance-button {
		width: 100%;
		margin-top: 8px;
		margin-bottom: 10px;
	}
</style>

```
:::


## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

