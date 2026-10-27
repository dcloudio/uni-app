::: warning 注意事项

使用蓝牙能力前，需先调用 [uni.openBluetoothAdapter](#openbluetoothadapter) 初始化蓝牙适配器，并确认初始化成功。调用 [uni.closeBluetoothAdapter](#closebluetoothadapter) 或应用进程结束后，再次使用时需重新初始化。监听类接口可提前注册。

:::

## 模块介绍

蓝牙规范由蓝牙技术联盟（SIG）制定，主流有两种规格：**经典蓝牙（BR/EDR）** 用于音箱、耳机等较大带宽场景；**蓝牙低功耗（BLE，蓝牙 4.0 起）** 功耗低、适合小数据量传输，常见于智能穿戴、传感器、智能家居等设备。

本文与[蓝牙-低功耗中心设备](./bluetooth-le-central.md)介绍 BLE 中心设备能力，用于发现并连接蓝牙低功耗外设，不用于经典蓝牙设备的数据通信。接口按职责分为两部分：

- **蓝牙-通用**：初始化/关闭适配器、监听适配器状态、扫描与发现设备、获取设备列表；
- **[蓝牙-低功耗中心设备](./bluetooth-le-central.md)**：连接设备、发现服务与特征值、读写特征值、订阅通知、MTU 等。

各平台、运行模式及最低支持版本以各接口的兼容性表为准，下文的平台说明不代表所有版本均已支持。

## 使用流程

1. 注册 [uni.onBluetoothAdapterStateChange](#onbluetoothadapterstatechange) 和 [uni.onBluetoothDeviceFound](#onbluetoothdevicefound)，分别监听适配器状态和设备发现事件。
2. 调用 [uni.openBluetoothAdapter](#openbluetoothadapter)，初始化成功后调用 [uni.startBluetoothDevicesDiscovery](#startbluetoothdevicesdiscovery) 开始扫描。
3. 通过设备发现事件获取目标设备的 `deviceId`，也可调用 [uni.getBluetoothDevices](#getbluetoothdevices) 获取已发现的设备列表。
4. 发现目标设备后，调用 [uni.stopBluetoothDevicesDiscovery](#stopbluetoothdevicesdiscovery) 停止扫描，再连接设备并通信，见[蓝牙-低功耗中心设备](./bluetooth-le-central.md)。
5. 使用结束后，移除当前页面或组件注册的监听；不再使用蓝牙能力时，调用 [uni.closeBluetoothAdapter](#closebluetoothadapter) 释放适配器。

## 权限@permission

### iOS

- 蓝牙访问需要 `NSBluetoothAlwaysUsageDescription` 隐私说明，并获得用户授权。HBuilderX 5.34 的 iOS 蒸汽模式蓝牙插件已声明该配置，发行时应确认最终应用包含符合实际用途的权限说明。
- 系统蓝牙开关与应用蓝牙权限是两个独立条件。系统蓝牙已开启，不代表应用已获授权。

### 微信小程序

需遵循微信小程序的蓝牙授权要求与平台限制。各接口的支持范围以对应的兼容性表为准。

## 注意事项@tips

### 通用

- **使用扫描返回的 deviceId**：当前 iOS 插件连接设备时需要已有扫描记录，仅保存设备 ID 不能代替设备发现。iOS 的 ID 来自系统分配的 UUID，不应假设它跨手机、跨安装或跨会话始终不变。
- **监听与取消监听成对使用**：页面或组件卸载时，调用对应的 `off*` 移除自身注册的监听，避免重复监听。当前 iOS 插件可保存 `on*` 返回的监听 ID，并将该 ID 传给对应的 `off*`，避免清空其他页面的监听。
- **及时停止扫描**：扫描较耗电，发现目标设备后应尽快停止扫描。
- **适配器由应用共享**：关闭适配器会影响其他页面正在进行的蓝牙操作，应统一管理其生命周期。

### iOS

- HBuilderX 5.34 的 iOS 蒸汽模式蓝牙插件已声明 `bluetooth-central` 后台模式，但后台扫描与连接仍受系统调度限制，不能保证与前台行为一致。
- 系统蓝牙关闭后，现有扫描与连接会失效。重新开启后，应根据适配器可用状态重新扫描、连接，并重新发现服务与特征值、订阅通知。

#### iOS 测试注意事项

测试前，先注册 [uni.onBluetoothAdapterStateChange](#onbluetoothadapterstatechange) 并调用 [uni.openBluetoothAdapter](#openbluetoothadapter) 初始化。不同操作的表现及处理方式如下：

| 操作路径 | 事件表现 | uni API 处理方式 |
| --- | --- | --- |
| 设置 → 蓝牙：主开关 | 应用进程存活时，会触发适配器状态变化事件 | 在 `onBluetoothAdapterStateChange` 回调中通过 `available` 判断是否可用。关闭时停止后续蓝牙操作；重新开启且 `available` 为 `true` 后，按需重新扫描和连接。 |
| 设置 → App → 蓝牙：应用权限 | 系统会终止 App，不能依赖原进程继续接收事件 | 重新启动后，重新注册监听并调用 `openBluetoothAdapter`，根据成功或失败回调处理授权结果。 |
| 控制中心：蓝牙按钮 | 通常不会触发适配器状态变化事件 | 适配器仍可能可用，不能用此操作代替系统蓝牙主开关测试。设备是否断开应通过 `onBLEConnectionStateChange` 判断。 |

适配器可用不代表设备已连接。监听设备连接状态时，使用 [uni.onBLEConnectionStateChange](./bluetooth-le-central.md#onbleconnectionstatechange)，通过回调中的 `deviceId` 和 `connected` 判断目标设备是否连接。

<!-- UTSAPIJSON.openBluetoothAdapter.name -->

<!-- UTSAPIJSON.openBluetoothAdapter.description -->

<!-- UTSAPIJSON.openBluetoothAdapter.compatibility -->

<!-- UTSAPIJSON.openBluetoothAdapter.param -->

<!-- UTSAPIJSON.openBluetoothAdapter.fileFormats -->

<!-- UTSAPIJSON.openBluetoothAdapter.returnValue -->

<!-- UTSAPIJSON.openBluetoothAdapter.example -->

<!-- UTSAPIJSON.openBluetoothAdapter.tutorial -->

### iOS 使用说明

- 初始化成功只表示应用可以使用蓝牙适配器，不代表已扫描到设备或建立连接。应在成功回调后开始扫描，再按[中心设备使用流程](./bluetooth-le-central.md#使用流程)连接和通信。
- 初始化失败时，在 `fail` 回调中通过 `errCode` 判断处理方式，不要继续扫描或连接。。
- 系统蓝牙开关和应用蓝牙权限需分别检查；在控制中心点击蓝牙按钮不能代替在系统设置中关闭蓝牙，详见 [iOS 测试注意事项](#ios-测试注意事项)。

### iOS 常见初始化错误

| errCode | 含义 | 建议处理 |
| --- | --- | --- |
| `1509602` | 应用未获得蓝牙权限 | 引导用户在“设置 → App → 蓝牙”中授权。权限变更导致 App 重新启动后，重新注册监听并初始化。 |
| `1509603` | 系统蓝牙已关闭 | 引导用户在“设置 → 蓝牙”中开启主开关，恢复后重新调用初始化。 |
| `1500102` | 适配器暂不可用 | 等待适配器恢复可用后再尝试，不要连续反复初始化。 |
| `1509010` | 初始化时等待适配器状态超时 | 稍后重试初始化，并检查系统蓝牙状态；该错误不同于连接设备时的 `1509005`。 |
| `1500105` | 系统或平台不支持该蓝牙能力 | 检查接口兼容性及运行环境，重复调用不能消除此限制。 |
| `1500104` / `1509000` | 系统调用失败或其他错误 | 记录接口名、`errCode`、`errMsg` 及可用的错误详情，结合真机环境进一步排查。 |

<!-- UTSAPIJSON.closeBluetoothAdapter.name -->

<!-- UTSAPIJSON.closeBluetoothAdapter.description -->

<!-- UTSAPIJSON.closeBluetoothAdapter.compatibility -->

<!-- UTSAPIJSON.closeBluetoothAdapter.param -->

<!-- UTSAPIJSON.closeBluetoothAdapter.fileFormats -->

<!-- UTSAPIJSON.closeBluetoothAdapter.returnValue -->

<!-- UTSAPIJSON.closeBluetoothAdapter.example -->

<!-- UTSAPIJSON.closeBluetoothAdapter.tutorial -->


<!-- UTSAPIJSON.getBluetoothAdapterState.name -->

<!-- UTSAPIJSON.getBluetoothAdapterState.description -->

<!-- UTSAPIJSON.getBluetoothAdapterState.compatibility -->

<!-- UTSAPIJSON.getBluetoothAdapterState.param -->

<!-- UTSAPIJSON.getBluetoothAdapterState.fileFormats -->

<!-- UTSAPIJSON.getBluetoothAdapterState.returnValue -->

<!-- UTSAPIJSON.getBluetoothAdapterState.example -->

<!-- UTSAPIJSON.getBluetoothAdapterState.tutorial -->


<!-- UTSAPIJSON.onBluetoothAdapterStateChange.name -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.description -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.compatibility -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.param -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.fileFormats -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.returnValue -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.example -->

<!-- UTSAPIJSON.onBluetoothAdapterStateChange.tutorial -->


<!-- UTSAPIJSON.offBluetoothAdapterStateChange.name -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.description -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.compatibility -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.param -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.fileFormats -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.returnValue -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.example -->

<!-- UTSAPIJSON.offBluetoothAdapterStateChange.tutorial -->


<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.name -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.description -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.compatibility -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.param -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.fileFormats -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.returnValue -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.example -->

<!-- UTSAPIJSON.startBluetoothDevicesDiscovery.tutorial -->


<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.name -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.description -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.compatibility -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.param -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.fileFormats -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.returnValue -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.example -->

<!-- UTSAPIJSON.stopBluetoothDevicesDiscovery.tutorial -->


<!-- UTSAPIJSON.onBluetoothDeviceFound.name -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.description -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.compatibility -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.param -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.fileFormats -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.returnValue -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.example -->

<!-- UTSAPIJSON.onBluetoothDeviceFound.tutorial -->


<!-- UTSAPIJSON.offBluetoothDeviceFound.name -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.description -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.compatibility -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.param -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.fileFormats -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.returnValue -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.example -->

<!-- UTSAPIJSON.offBluetoothDeviceFound.tutorial -->


<!-- UTSAPIJSON.getBluetoothDevices.name -->

<!-- UTSAPIJSON.getBluetoothDevices.description -->

<!-- UTSAPIJSON.getBluetoothDevices.compatibility -->

<!-- UTSAPIJSON.getBluetoothDevices.param -->

<!-- UTSAPIJSON.getBluetoothDevices.fileFormats -->

<!-- UTSAPIJSON.getBluetoothDevices.returnValue -->

<!-- UTSAPIJSON.getBluetoothDevices.example -->

<!-- UTSAPIJSON.getBluetoothDevices.tutorial -->


<!-- UTSAPIJSON.getConnectedBluetoothDevices.name -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.description -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.compatibility -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.param -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.fileFormats -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.returnValue -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.example -->

<!-- UTSAPIJSON.getConnectedBluetoothDevices.tutorial -->


## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

