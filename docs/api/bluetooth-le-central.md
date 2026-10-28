::: warning 注意事项

使用前，需先按[蓝牙-通用](./bluetooth-general.md)中的流程初始化适配器并发现目标设备。建立连接后，先发现服务和特征值，再进行读写或开启通知；断开连接后需重新连接并重新发现服务与特征值。

:::

## 模块介绍

蓝牙低功耗（BLE）中心设备相关接口，用于与蓝牙设备建立连接、发现其服务与特征值，并对特征值进行读写、订阅通知等操作。

- **服务**：设备对外提供的一组功能，由 UUID 标识，可包含一个或多个特征值；
- **特征值**：服务下的数据点，由 UUID 标识，其 `properties` 描述支持的操作，如 read、write、notify、indicate 等；
- **UUID**：用于标识服务和特征值。调用接口时，使用 uni.getBLEDeviceServices 和 uni.getBLEDeviceCharacteristics 返回的 UUID。

本文负责连接与数据通信，[蓝牙-通用](./bluetooth-general.md)负责适配器管理与设备发现。各接口及参数的支持范围以对应的兼容性表为准。

## 使用流程

![BLE 中心设备流程：连接设备、发现服务和特征值、按属性收发数据并清理连接](../static/bluetooth-le-central-flow.svg)#{.zooming width="400px"}

1. 注册 [uni.onBLEConnectionStateChange](#onbleconnectionstatechange) 和 [uni.onBLECharacteristicValueChange](#onblecharacteristicvaluechange)，分别接收连接状态变化和特征值数据。
2. 使用扫描返回的 `deviceId`，调用 [uni.createBLEConnection](#createbleconnection) 连接目标设备。
3. 连接成功后，调用 [uni.getBLEDeviceServices](#getbledeviceservices) 发现服务，再调用 [uni.getBLEDeviceCharacteristics](#getbledevicecharacteristics) 获取目标服务的特征值及其属性。
4. 按特征值属性调用 [uni.readBLECharacteristicValue](#readblecharacteristicvalue) 或 [uni.writeBLECharacteristicValue](#writeblecharacteristicvalue)。调用 `readBLECharacteristicValue` 前需先注册 `onBLECharacteristicValueChange`，读取结果通过该事件的 `value` 返回；读取不要求先开启通知。
5. 如需接收外设主动发送的数据，调用 [uni.notifyBLECharacteristicValueChange](#notifyblecharacteristicvaluechange) 开启通知，通过已注册的特征值变化事件监听接收数据。
6. 按需调用 [uni.getBLEDeviceRSSI](#getbledevicerssi) 获取信号强度；iOS 写入长度与 MTU 的说明见 [uni.getBLEMTU](#getblemtu) 和 [uni.setBLEMTU](#setblemtu)。
7. 不再需要通知时将其关闭；通信结束后调用 [uni.closeBLEConnection](#closebleconnection)，并移除当前页面或组件注册的事件监听。

## 权限@permission

蓝牙权限与[蓝牙-通用](./bluetooth-general.md#permission)一致，请先按该页完成各端权限配置。

## 注意事项@tips

### 通用

- **以特征值属性为准**：读、写和通知分别要求特征值支持对应的操作；支持读取不代表支持通知或写入。
- **重新连接后重新发现**：断线重连后，应重新获取服务与特征值，并按需开启通知，不要直接沿用上次连接的结果。
- **区分通知与事件监听**：关闭外设通知需调用 `notifyBLECharacteristicValueChange` 并传入 `state: false`；`offBLECharacteristicValueChange` 只移除事件监听，不能代替关闭通知。
- **按监听所属范围清理**：不再使用时移除自身注册的特征值和连接状态监听。当前 iOS 插件可保存 `on*` 返回的监听 ID，并将该 ID 传给对应的 `off*`，避免清空其他页面的监听。
- **控制写入长度与时序**：单次写入长度由平台和当前连接决定，超长数据需由业务分包；同一连接上的读写与通知配置操作宜按完成回调依次执行。


::: sourceCode
## uni.createBLEConnection(options) @createbleconnection
:::

连接低功耗蓝牙设备

文档: [http://uniapp.dcloud.io/api/system/ble?id=createbleconnection](http://uniapp.dcloud.io/api/system/ble?id=createbleconnection)



### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | [UniNamespace.CreateBLEConnectionOptions](#uninamespace-values) | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| deviceId | string | 是 | 蓝牙设备 id，参考 getDevices 接口 |
| timeout | number | 否 | 超时时间 |
| success | (result: any) => void | 否 | 成功则返回本机蓝牙适配器状态 |
| fail | (result: any) => void | 否 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） | 






<!-- UTSAPIJSON.createBLEConnection.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.createBLEConnection)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=createBLEConnection&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createBLEConnection&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createBLEConnection&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createBLEConnection&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createBLEConnection&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createBLEConnection)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createBLEConnection&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### iOS 使用说明

- 先初始化适配器并扫描到目标设备，再传入扫描返回的 `deviceId`。能扫描到设备只表示收到了广播，不保证外设当前接受连接。
- 先注册 `onBLEConnectionStateChange`，再发起连接。同一设备不要并行调用多次 `createBLEConnection`，避免重复连接导致失败。
- 在 `success` 回调后调用 `getBLEDeviceServices` 和 `getBLEDeviceCharacteristics`，再开始读写或开启通知。连接成功不代表服务发现、特征值发现或业务认证已完成。
- `timeout` 的单位是毫秒，应设置为大于 0 的数值，并结合真机耗时确定。当前 iOS 插件不传时不设置连接超时期限，但仍可能因系统报告失败或适配器状态变化而结束。
- 当前 iOS 插件对已经连接的设备再次调用连接会返回成功。

### iOS 连接失败与超时排查 @ios-connection-troubleshooting

`createBLEConnection` 失败时，先确认适配器已初始化且可用，并使用扫描返回的 `deviceId`。连接成功后的服务发现、读写和通知问题，应按对应接口排查。

连接超时表示未在指定时间内完成连接，不代表设备已关机或停止广播；等待上一次断开完成也可能超时。能扫描到设备，不代表设备当前接受连接。

可按以下方向排查：

| 可能原因 | 检查与处理方式 |
| --- | --- |
| 信号弱或干扰 | 靠近外设，在干扰较少的环境中重试。 |
| 外设被占用或不可连接 | 断开其他手机、App 或调试工具的连接，确认外设处于可连接模式。 |
| 重复连接或断开未完成 | 同一设备只保留一个连接流程，避免并行连接或立即反复重连。 |
| 超时时间过短 | 结合正常连接耗时，适当增加 `timeout` 后对比。 |
| 外设重启或配对信息变化 | 重新扫描；若提示配对异常，按设备说明重新配对。持续失败时检查外设日志。 |
| 连接过多或系统暂不可用 | 关闭不必要的连接和扫描，通过 `onBluetoothAdapterStateChange` 确认可用后再试。 |

重试应设置间隔和次数上限，持续失败时提示用户检查设备。重连成功后，需重新发现服务和特征值，并按需开启通知。仍无法定位时，可按[调试建议](#调试建议)使用蓝牙工具对照验证。


::: sourceCode
## uni.closeBLEConnection(options) @closebleconnection
:::

断开与低功耗蓝牙设备的连接

文档: [http://uniapp.dcloud.io/api/system/ble?id=closebleconnection](http://uniapp.dcloud.io/api/system/ble?id=closebleconnection)



### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | [UniNamespace.CloseBLEConnectionOptions](#uninamespace-values) | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| success | (result: any) => void | 否 | 接口调用成功的回调函数 |
| fail | (result: any) => void | 否 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |
| deviceId | string | 是 | 蓝牙设备 id，参考 device 对象 | 






<!-- UTSAPIJSON.closeBLEConnection.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.closeBLEConnection)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=closeBLEConnection&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=closeBLEConnection&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=closeBLEConnection&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=closeBLEConnection&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=closeBLEConnection&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=closeBLEConnection)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=closeBLEConnection&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.onBLEConnectionStateChange(callback) @onbleconnectionstatechange
:::

监听低功耗蓝牙设备连接状态变化事件

文档: [http://uniapp.dcloud.io/api/system/ble?id=onbleconnectionstatechange](http://uniapp.dcloud.io/api/system/ble?id=onbleconnectionstatechange)



### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (result: [UniNamespace.OnBLEConnectionStateChangeSuccess](#uninamespace-values)) => void | 是 | 

### UniNamespace.OnBLEConnectionStateChangeSuccess 的属性值 @uninamespace-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| deviceId | string | 是 | 蓝牙设备 id，参考 device 对象 |
| connected | boolean | 是 | 连接目前的状态 |






<!-- UTSAPIJSON.onBLEConnectionStateChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.onBLEConnectionStateChange)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onBLEConnectionStateChange&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onBLEConnectionStateChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onBLEConnectionStateChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onBLEConnectionStateChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onBLEConnectionStateChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onBLEConnectionStateChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onBLEConnectionStateChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.offBLEConnectionStateChange(listener?) @offbleconnectionstatechange
:::

移除 BLE 连接状态变化监听。传 ID 删除对应监听，否则清空全部监听。

### offBLEConnectionStateChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | number \| (result: **BLEConnectionStateChangeResult**) => void | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### listener 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| connected | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 是否处于已连接状态。 | 






<!-- UTSAPIJSON.offBLEConnectionStateChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.offBLEConnectionStateChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEConnectionStateChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offBLEConnectionStateChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offBLEConnectionStateChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offBLEConnectionStateChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offBLEConnectionStateChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offBLEConnectionStateChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offBLEConnectionStateChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.getBLEDeviceRSSI(options) @getbledevicerssi
:::

获取蓝牙低功耗设备的信号强度 (Received Signal Strength Indication, RSSI)。

### getBLEDeviceRSSI 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBLEDeviceRSSIOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| success | (result: [GetBLEDeviceRSSISuccess](#getbledevicerssisuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBLEDeviceRSSISuccess](#getbledevicerssisuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetBLEDeviceRSSISuccess 的属性值 @getbledevicerssisuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| RSSI | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 信号强度，单位 dBm。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBLEDeviceRSSI.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.getBLEDeviceRSSI)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceRSSI.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBLEDeviceRSSI&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBLEDeviceRSSI&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBLEDeviceRSSI&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBLEDeviceRSSI&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBLEDeviceRSSI)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBLEDeviceRSSI&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.getBLEMTU(options) @getblemtu
:::

获取蓝牙低功耗的最大传输单元。需在 uni.createBLEConnection 调用成功后调用。

### getBLEMTU 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBLEMTUOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| writeType | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 写模式，仅 iOS 使用。可选值为 write、writeNoResponse，默认值为 write。 |
| success | (result: [GetBLEMTUSuccess](#getblemtusuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBLEMTUSuccess](#getblemtusuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

##### writeType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "write" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 强制回复写，不支持时报错 |
| "writeNoResponse" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 强制无回复写，不支持时报错 |

#### GetBLEMTUSuccess 的属性值 @getblemtusuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| mtu | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 最大传输单元，单位 bytes。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBLEMTU.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.getBLEMTU)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEMTU.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBLEMTU&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBLEMTU&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBLEMTU&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBLEMTU&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBLEMTU)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBLEMTU&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### iOS 注意事项

- 当前 iOS 插件返回的 `mtu` 是指定 `writeType` 对应的最大可写数据长度，单位为字节，不是 ATT MTU；不传 `writeType` 时按 `write` 查询。
- 直接以返回值作为该写模式的单次写入长度上限，无需再减 3，也不能通过加 3 推算 ATT MTU。查询时的 `writeType` 应与实际写入时一致。
- 返回的长度上限不代表外设业务协议支持任意长度的数据，分包还需遵循设备协议。


::: sourceCode
## uni.setBLEMTU(options) @setblemtu
:::

设置最大传输单元，仅 Android 支持。

### setBLEMTU 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **SetBLEMTUOptions** | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 仅 Android 支持。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| mtu | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 最大传输单元，取值范围为 (22, 512)，单位 bytes。 |
| success | (result: [SetBLEMTUSuccess](#setblemtusuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [SetBLEMTUSuccess](#setblemtusuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### SetBLEMTUSuccess 的属性值 @setblemtusuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| mtu | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 最终协商的 MTU 值，与传入参数一致，单位 bytes。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.setBLEMTU.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.setBLEMTU)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.setBLEMTU.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setBLEMTU&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setBLEMTU&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setBLEMTU&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setBLEMTU&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setBLEMTU)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setBLEMTU&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### iOS 注意事项

iOS 不支持主动设置 MTU，当前插件调用此接口会执行 `fail` 和 `complete`，返回不支持错误。写入前可通过 `getBLEMTU` 查询对应写模式的最大可写长度。


::: sourceCode
## uni.onBLEMTUChange(listener) @onblemtuchange
:::

监听 MTU 变化，仅 Android 支持。

### onBLEMTUChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | (result: [BLEMTUChangeResult](#blemtuchangeresult-values)) => void | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * | 

### BLEMTUChangeResult 的属性值 @blemtuchangeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| mtu | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 最大传输单元，单位 bytes。 |




### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onBLEMTUChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.onBLEMTUChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLEMTUChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onBLEMTUChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onBLEMTUChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onBLEMTUChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onBLEMTUChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onBLEMTUChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onBLEMTUChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.offBLEMTUChange(listener?) @offblemtuchange
:::

移除 MTU 变化监听，仅 Android 支持。传 ID 删除对应监听，否则清空全部监听。

### offBLEMTUChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | number \| (result: **BLEMTUChangeResult**) => void | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### listener 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| mtu | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 最大传输单元，单位 bytes。 | 






<!-- UTSAPIJSON.offBLEMTUChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.offBLEMTUChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEMTUChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offBLEMTUChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offBLEMTUChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offBLEMTUChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offBLEMTUChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offBLEMTUChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offBLEMTUChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.getBLEDeviceServices(options) @getbledeviceservices
:::

获取蓝牙低功耗设备所有服务 (service)。

### getBLEDeviceServices 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBLEDeviceServicesOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| success | (result: [GetBLEDeviceServicesSuccess](#getbledeviceservicessuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBLEDeviceServicesSuccess](#getbledeviceservicessuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetBLEDeviceServicesSuccess 的属性值 @getbledeviceservicessuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| services | Array&lt;**BLEService**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 设备服务列表。 |

#### services 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| uuid | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备服务的 UUID。 |
| isPrimary | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该服务是否为主服务。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBLEDeviceServices.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.getBLEDeviceServices)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceServices.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBLEDeviceServices&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBLEDeviceServices&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBLEDeviceServices&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBLEDeviceServices&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBLEDeviceServices)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBLEDeviceServices&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.getBLEDeviceCharacteristics(options) @getbledevicecharacteristics
:::

获取蓝牙低功耗设备某个服务中所有特征 (characteristic)。

### getBLEDeviceCharacteristics 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **GetBLEDeviceCharacteristicsOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙服务 UUID，需要先调用 getBLEDeviceServices 获取。 |
| success | (result: [GetBLEDeviceCharacteristicsSuccess](#getbledevicecharacteristicssuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [GetBLEDeviceCharacteristicsSuccess](#getbledevicecharacteristicssuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### GetBLEDeviceCharacteristicsSuccess 的属性值 @getbledevicecharacteristicssuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| characteristics | Array&lt;**BLECharacteristic**&gt; | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 设备特征列表。 |

#### characteristics 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| uuid | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备特征的 UUID。 |
| properties | **BLECharacteristicProperties** | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征支持的操作类型。 |

##### properties 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| read | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持 read 操作。 |
| write | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持 write 操作。 |
| notify | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持 notify 操作。 |
| indicate | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持 indicate 操作。 |
| writeNoResponse | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持无回复写操作。 |
| writeDefault | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 该特征是否支持有回复写操作。 |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.getBLEDeviceCharacteristics.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.getBLEDeviceCharacteristics)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.getBLEDeviceCharacteristics.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBLEDeviceCharacteristics&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBLEDeviceCharacteristics&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBLEDeviceCharacteristics&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBLEDeviceCharacteristics&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBLEDeviceCharacteristics)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBLEDeviceCharacteristics&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.readBLECharacteristicValue(options) @readblecharacteristicvalue
:::

读取蓝牙低功耗设备特征值的二进制数据。注意：必须设备的特征支持 read 才可以成功调用；读取结果通过 onBLECharacteristicValueChange 返回。

### readBLECharacteristicValue 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ReadBLECharacteristicValueOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征对应服务的 UUID，需要先调用 getBLEDeviceServices 获取。 |
| characteristicId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征的 UUID，需要先调用 getBLEDeviceCharacteristics 获取。 |
| success | (result: [BLEOperationSuccess](#bleoperationsuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。特征值通过 onBLECharacteristicValueChange 返回。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [BLEOperationSuccess](#bleoperationsuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

#### BLEOperationSuccess 的属性值 @bleoperationsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.readBLECharacteristicValue.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.readBLECharacteristicValue)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.readBLECharacteristicValue.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=readBLECharacteristicValue&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=readBLECharacteristicValue&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=readBLECharacteristicValue&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=readBLECharacteristicValue&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=readBLECharacteristicValue)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=readBLECharacteristicValue&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意事项

- 先注册 `onBLECharacteristicValueChange`，再发起读取。读取结果通过该事件的 `value` 返回，`readBLECharacteristicValue` 的成功回调不包含特征值数据。
- 主动读取要求特征值支持 `read`，无需先调用 `notifyBLECharacteristicValueChange` 开启通知。
- 多设备或多特征值共用事件监听时，应按事件中的 `deviceId`、`serviceId` 和 `characteristicId` 匹配数据来源。


::: sourceCode
## uni.writeBLECharacteristicValue(options) @writeblecharacteristicvalue
:::

向蓝牙低功耗设备特征值中写入二进制数据。注意：必须设备的特征支持 write 才可以成功调用。

### writeBLECharacteristicValue 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **WriteBLECharacteristicValueOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征对应服务的 UUID，需要先调用 getBLEDeviceServices 获取。 |
| characteristicId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征的 UUID，需要先调用 getBLEDeviceCharacteristics 获取。 |
| value | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备特征对应的二进制值。 |
| writeType | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征值写模式。可选值为 write、writeNoResponse；不传时 iOS 优先 write，Android 优先 writeNoResponse。 |
| success | (result: [BLEOperationSuccess](#bleoperationsuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [BLEOperationSuccess](#bleoperationsuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

##### writeType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "write" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 强制回复写，不支持时报错 |
| "writeNoResponse" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 强制无回复写，不支持时报错 |

#### BLEOperationSuccess 的属性值 @bleoperationsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.writeBLECharacteristicValue.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.writeBLECharacteristicValue)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.writeBLECharacteristicValue.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=writeBLECharacteristicValue&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=writeBLECharacteristicValue&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=writeBLECharacteristicValue&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=writeBLECharacteristicValue&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=writeBLECharacteristicValue)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=writeBLECharacteristicValue&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意事项

- 应根据特征值属性选择 `writeType`：`write` 为有响应写，`writeNoResponse` 为无响应写。当前 iOS 插件不传时使用 `write`，不会因特征值只支持无响应写而自动切换；此时需显式传入 `writeNoResponse`。
- 当前 iOS 插件不会自动分包。超过单次写入长度上限时，会调用 `fail` 和 `complete`，需按长度上限与设备协议自行分包，详见 [getBLEMTU 的 iOS 注意事项](#getblemtu)。
- 无响应写缺少外设对本次写入的协议层确认。若业务需要确认设备已接收或处理数据，应设计应用层应答机制。


::: sourceCode
## uni.notifyBLECharacteristicValueChange(options) @notifyblecharacteristicvaluechange
:::

启用蓝牙低功耗设备特征值变化时的 notify 功能，订阅特征。注意：必须设备的特征支持 notify 或者 indicate 才可以成功调用。另外，必须先启用 uni.notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件。

### notifyBLECharacteristicValueChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **NotifyBLECharacteristicValueChangeOptions** | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID，需要已经通过 createBLEConnection 建立连接。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征对应服务的 UUID，需要先调用 getBLEDeviceServices 获取。 |
| characteristicId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征的 UUID，需要先调用 getBLEDeviceCharacteristics 获取。 |
| state | boolean | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 是否启用特征值变化通知。 |
| type | string | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 特征订阅类型，可选值为 notification、indication，默认值为 indication。 |
| success | (result: [BLEOperationSuccess](#bleoperationsuccess-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用成功的回调函数。 |
| fail | (result: [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用失败的回调函数。 |
| complete | (result: [BLEOperationSuccess](#bleoperationsuccess-values) \| [BluetoothFail](#bluetoothfail-values)) => void | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 接口调用结束的回调函数，调用成功、失败都会执行。 | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| "notification" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 订阅类型 notification |
| "indication" | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 订阅类型 indication |

#### BLEOperationSuccess 的属性值 @bleoperationsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用结果信息。 |
| errCode | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误码<br/><br/>\| 错误码 \| 错误信息 \| 说明 \|<br/>\| - \| - \| - \|<br/>\| 0 \| ok \| 正常 \|<br/>\| -1 \| already connect \| 已连接 \|<br/>\| 10000 \| not init \| 未初始化蓝牙适配器 \|<br/>\| 10001 \| not available \| 当前蓝牙适配器不可用 \|<br/>\| 10002 \| no device \| 没有找到指定设备 \|<br/>\| 10003 \| connection fail \| 连接失败 \|<br/>\| 10004 \| no service \| 没有找到指定服务 \|<br/>\| 10005 \| no characteristic \| 没有找到指定特征 \|<br/>\| 10006 \| no connection \| 当前连接已断开 \|<br/>\| 10007 \| property not support \| 当前特征不支持此操作 \|<br/>\| 10008 \| system error \| 其余所有系统上报的异常 \|<br/>\| 10009 \| system not support \| Android 系统特有，系统版本低于 4.3 不支持 BLE \|<br/>\| 10012 \| operate time out \| 连接超时 \|<br/>\| 10013 \| invalid_data \| 连接 deviceId 为空或者是格式不正确 \|<br/> |

#### BluetoothFail 的属性值 @bluetoothfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | uni 蓝牙适配器和 BLE 中心设备 API 可能返回的统一错误码。 |
| mtu | number | 否 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; HarmonyOS: x | 最终协商的 MTU 值。如果协商失败则无此参数。安卓客户端 8.0.9 开始支持。<br/> |
| errSubject | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1500101 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙适配器尚未初始化或运行时未就绪。  |
| 1500102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前蓝牙适配器不可用（如重置中/状态未知）。  |
| 1500103 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Service。 |
| 1500104 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 调用系统蓝牙能力失败，具体原因见 cause。 |
| 1500105 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前平台或系统不支持该 BLE 能力或操作。 |
| 1509000 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未知或无法归类的 BLE 错误，具体原因见 cause。 |
| 1509001 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接 BLE 设备失败。 |
| 1509002 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到对应的 Characteristic。 |
| 1509003 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未连接上该 BLE 设备。 |
| 1509004 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前特征不支持此操作（属性不匹配）。  |
| 1509005 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE 操作超时。 |
| 1509006 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未找到该设备，可能尚未扫描到或已移除。  |
| 1509007 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备已经连接。 |
| 1509008 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | Android 扫描需位置权限（未授予）。 |
| 1509010 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | iOS 等待蓝牙状态更新超时。 |
| 1509601 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | BLE API 参数无效。 |
| 1509602 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 未获得系统蓝牙权限。  |
| 1509603 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 系统蓝牙已关闭。  |
| 1509604 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 当前 BLE 设备仅可被扫描，不接受中心设备连接。 |
| 1510102 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 连接/设备数已达上限。  |






<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.notifyBLECharacteristicValueChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.notifyBLECharacteristicValueChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=notifyBLECharacteristicValueChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=notifyBLECharacteristicValueChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=notifyBLECharacteristicValueChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=notifyBLECharacteristicValueChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=notifyBLECharacteristicValueChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=notifyBLECharacteristicValueChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 注意事项

- 先注册 `onBLECharacteristicValueChange`，再传入 `state: true` 开启通知；特征值需支持 `notify` 或 `indicate`。
- 开启成功表示通知配置完成，不代表外设会立即发送数据；是否上报、何时上报由设备协议决定。
- 不再需要通知时传入 `state: false`。断线重连后如需继续接收通知，应重新发现服务和特征值并再次开启通知。


::: sourceCode
## uni.onBLECharacteristicValueChange(listener) @onblecharacteristicvaluechange
:::

监听蓝牙低功耗设备的特征值变化事件。必须先调用 uni.notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。

### onBLECharacteristicValueChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | (result: [BLECharacteristicValueChangeResult](#blecharacteristicvaluechangeresult-values)) => void | 是 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * | 

### BLECharacteristicValueChangeResult 的属性值 @blecharacteristicvaluechangeresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征对应服务的 UUID。 |
| characteristicId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征的 UUID。 |
| value | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 特征最新的二进制值。 |




### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onBLECharacteristicValueChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.onBLECharacteristicValueChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.onBLECharacteristicValueChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onBLECharacteristicValueChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onBLECharacteristicValueChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onBLECharacteristicValueChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onBLECharacteristicValueChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onBLECharacteristicValueChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onBLECharacteristicValueChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


::: sourceCode
## uni.offBLECharacteristicValueChange(listener?) @offblecharacteristicvaluechange
:::

移除 BLE 特征值变化监听。传 ID 删除对应监听，否则清空全部监听。

### offBLECharacteristicValueChange 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS(VDOM) | iOS(Vapor) | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.34 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| listener | number \| (result: **BLECharacteristicValueChangeResult**) => void | 否 | Web: x; 支付宝小程序: x; Android: x; HarmonyOS: x | * |

#### listener 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| deviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙设备 ID。 |
| serviceId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征对应服务的 UUID。 |
| characteristicId | string | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 蓝牙特征的 UUID。 |
| value | [ArrayBuffer](/uts/buildin-object-api/arraybuffer.md) | 是 | Web: x; 微信小程序: 4.41; 支付宝小程序: x; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 特征最新的二进制值。 | 






<!-- UTSAPIJSON.offBLECharacteristicValueChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.ble.offBLECharacteristicValueChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLECharacteristicValueChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offBLECharacteristicValueChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offBLECharacteristicValueChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offBLECharacteristicValueChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offBLECharacteristicValueChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offBLECharacteristicValueChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offBLECharacteristicValueChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


<!-- UTSAPIJSON.ble.example -->


## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

