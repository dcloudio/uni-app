::: warning 注意事项

使用前，需先按[蓝牙-通用](./bluetooth-general.md)中的流程初始化适配器并发现目标设备。建立连接后，先发现服务和特征值，再进行读写或开启通知；断开连接后需重新连接并重新发现服务与特征值。

:::

## 模块介绍

蓝牙低功耗（BLE）中心设备相关接口，用于与蓝牙设备建立连接、发现其服务与特征值，并对特征值进行读写、订阅通知等操作。

- **服务**：设备对外提供的一组功能，由 UUID 标识，可包含一个或多个特征值；
- **特征值**：服务下的数据点，由 UUID 标识，其 `properties` 描述支持的操作，如 read、write、notify、indicate 等；
- **UUID**：服务与特征值的标识，可采用 16 位、32 位短格式或 128 位完整格式。调用接口时应使用服务、特征值发现结果返回的 UUID。

本文负责连接与数据通信，[蓝牙-通用](./bluetooth-general.md)负责适配器管理与设备发现。各接口及参数的支持范围以对应的兼容性表为准。

## 使用流程

1. 注册 [uni.onBLEConnectionStateChange](#onbleconnectionstatechange) 和 [uni.onBLECharacteristicValueChange](#onblecharacteristicvaluechange)，分别接收连接状态变化和特征值数据。
2. 使用扫描返回的 `deviceId`，调用 [uni.createBLEConnection](#createbleconnection) 连接目标设备。
3. 连接成功后，调用 [uni.getBLEDeviceServices](#getbledeviceservices) 发现服务，再调用 [uni.getBLEDeviceCharacteristics](#getbledevicecharacteristics) 获取目标服务的特征值及其属性。
4. 按特征值属性调用 [uni.readBLECharacteristicValue](#readblecharacteristicvalue) 或 [uni.writeBLECharacteristicValue](#writeblecharacteristicvalue)。主动读取的数据通过特征值变化事件返回，无需先开启通知。
5. 如需接收外设主动发送的数据，调用 [uni.notifyBLECharacteristicValueChange](#notifyblecharacteristicvaluechange) 开启通知，通过已注册的特征值变化事件监听接收数据。
6. 按需调用 [uni.getBLEDeviceRSSI](#getbledevicerssi) 获取信号强度；iOS 写入长度与 MTU 的说明见 [uni.getBLEMTU](#getblemtu) 和 [uni.setBLEMTU](#setblemtu)。
7. 不再需要通知时将其关闭；通信结束后调用 [uni.closeBLEConnection](#closebleconnection)，并移除当前页面或组件注册的事件监听。

## 权限@permission

蓝牙权限与[蓝牙-通用](./bluetooth-general.md#permission)一致，请先按该页完成各端权限配置。

## 注意事项@tips

### 通用

- **以特征值属性为准**：读、写和通知分别要求特征值支持对应的操作；支持读取不代表支持通知或写入。
- **重新连接后重新发现**：服务或特征值发生变化、设备固件更新或重新连接后，应重新获取服务与特征值。不能假设旧结果始终有效，也不能保证断开重连一定清除系统缓存。
- **区分通知与事件监听**：关闭外设通知需调用 `notifyBLECharacteristicValueChange` 并传入 `state: false`；`offBLECharacteristicValueChange` 只移除事件监听，不能代替关闭通知。
- **按监听所属范围清理**：不再使用时移除自身注册的特征值和连接状态监听。当前 iOS 插件可保存 `on*` 返回的监听 ID，并将该 ID 传给对应的 `off*`，避免清空其他页面的监听。
- **控制写入长度与时序**：单次写入长度由平台和当前连接决定，超长数据需由业务分包；同一连接上的读写与通知配置操作宜按完成回调依次执行。

## 调试建议

- 先用 iOS 蓝牙调试工具（如 **LightBlue**）连接设备，确认目标服务/特征值的 UUID 与属性，并先在其中验证读、写、订阅是否正常；
- 将工具结果与 App 内 [uni.getBLEDeviceServices](#getbledeviceservices)/[uni.getBLEDeviceCharacteristics](#getbledevicecharacteristics) 的输出对照，辅助定位服务、特征值或操作属性不匹配的问题。最终以设备协议和真机结果为准。

<!-- UTSAPIJSON.createBLEConnection.name -->

<!-- UTSAPIJSON.createBLEConnection.description -->

<!-- UTSAPIJSON.createBLEConnection.compatibility -->

<!-- UTSAPIJSON.createBLEConnection.param -->

<!-- UTSAPIJSON.createBLEConnection.fileFormats -->

<!-- UTSAPIJSON.createBLEConnection.returnValue -->

<!-- UTSAPIJSON.createBLEConnection.example -->

<!-- UTSAPIJSON.createBLEConnection.tutorial -->


<!-- UTSAPIJSON.closeBLEConnection.name -->

<!-- UTSAPIJSON.closeBLEConnection.description -->

<!-- UTSAPIJSON.closeBLEConnection.compatibility -->

<!-- UTSAPIJSON.closeBLEConnection.param -->

<!-- UTSAPIJSON.closeBLEConnection.fileFormats -->

<!-- UTSAPIJSON.closeBLEConnection.returnValue -->

<!-- UTSAPIJSON.closeBLEConnection.example -->

<!-- UTSAPIJSON.closeBLEConnection.tutorial -->


<!-- UTSAPIJSON.onBLEConnectionStateChange.name -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.description -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.compatibility -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.param -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.fileFormats -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.returnValue -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.example -->

<!-- UTSAPIJSON.onBLEConnectionStateChange.tutorial -->


<!-- UTSAPIJSON.offBLEConnectionStateChange.name -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.description -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.compatibility -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.param -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.fileFormats -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.returnValue -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.example -->

<!-- UTSAPIJSON.offBLEConnectionStateChange.tutorial -->


<!-- UTSAPIJSON.getBLEDeviceRSSI.name -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.description -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.compatibility -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.param -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.fileFormats -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.returnValue -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.example -->

<!-- UTSAPIJSON.getBLEDeviceRSSI.tutorial -->


<!-- UTSAPIJSON.getBLEMTU.name -->

<!-- UTSAPIJSON.getBLEMTU.description -->

<!-- UTSAPIJSON.getBLEMTU.compatibility -->

<!-- UTSAPIJSON.getBLEMTU.param -->

<!-- UTSAPIJSON.getBLEMTU.fileFormats -->

<!-- UTSAPIJSON.getBLEMTU.returnValue -->

<!-- UTSAPIJSON.getBLEMTU.example -->

<!-- UTSAPIJSON.getBLEMTU.tutorial -->

### iOS 注意事项

- 当前 iOS 插件返回的 `mtu` 是指定 `writeType` 对应的最大可写数据长度，单位为字节，不是 ATT MTU；不传 `writeType` 时按 `write` 查询。
- 直接以返回值作为该写模式的单次写入长度上限，无需再减 3，也不能通过加 3 推算 ATT MTU。查询时的 `writeType` 应与实际写入时一致。
- 返回的长度上限不代表外设业务协议支持任意长度的数据，分包还需遵循设备协议。


<!-- UTSAPIJSON.setBLEMTU.name -->

<!-- UTSAPIJSON.setBLEMTU.description -->

<!-- UTSAPIJSON.setBLEMTU.compatibility -->

<!-- UTSAPIJSON.setBLEMTU.param -->

<!-- UTSAPIJSON.setBLEMTU.fileFormats -->

<!-- UTSAPIJSON.setBLEMTU.returnValue -->

<!-- UTSAPIJSON.setBLEMTU.example -->

<!-- UTSAPIJSON.setBLEMTU.tutorial -->

### iOS 注意事项

iOS 不支持主动设置 MTU，当前插件调用此接口会执行 `fail` 和 `complete`，返回不支持错误。写入前可通过 `getBLEMTU` 查询对应写模式的最大可写长度。


<!-- UTSAPIJSON.onBLEMTUChange.name -->

<!-- UTSAPIJSON.onBLEMTUChange.description -->

<!-- UTSAPIJSON.onBLEMTUChange.compatibility -->

<!-- UTSAPIJSON.onBLEMTUChange.param -->

<!-- UTSAPIJSON.onBLEMTUChange.fileFormats -->

<!-- UTSAPIJSON.onBLEMTUChange.returnValue -->

<!-- UTSAPIJSON.onBLEMTUChange.example -->

<!-- UTSAPIJSON.onBLEMTUChange.tutorial -->


<!-- UTSAPIJSON.offBLEMTUChange.name -->

<!-- UTSAPIJSON.offBLEMTUChange.description -->

<!-- UTSAPIJSON.offBLEMTUChange.compatibility -->

<!-- UTSAPIJSON.offBLEMTUChange.param -->

<!-- UTSAPIJSON.offBLEMTUChange.fileFormats -->

<!-- UTSAPIJSON.offBLEMTUChange.returnValue -->

<!-- UTSAPIJSON.offBLEMTUChange.example -->

<!-- UTSAPIJSON.offBLEMTUChange.tutorial -->


<!-- UTSAPIJSON.getBLEDeviceServices.name -->

<!-- UTSAPIJSON.getBLEDeviceServices.description -->

<!-- UTSAPIJSON.getBLEDeviceServices.compatibility -->

<!-- UTSAPIJSON.getBLEDeviceServices.param -->

<!-- UTSAPIJSON.getBLEDeviceServices.fileFormats -->

<!-- UTSAPIJSON.getBLEDeviceServices.returnValue -->

<!-- UTSAPIJSON.getBLEDeviceServices.example -->

<!-- UTSAPIJSON.getBLEDeviceServices.tutorial -->


<!-- UTSAPIJSON.getBLEDeviceCharacteristics.name -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.description -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.compatibility -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.param -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.fileFormats -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.returnValue -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.example -->

<!-- UTSAPIJSON.getBLEDeviceCharacteristics.tutorial -->


<!-- UTSAPIJSON.readBLECharacteristicValue.name -->

<!-- UTSAPIJSON.readBLECharacteristicValue.description -->

<!-- UTSAPIJSON.readBLECharacteristicValue.compatibility -->

<!-- UTSAPIJSON.readBLECharacteristicValue.param -->

<!-- UTSAPIJSON.readBLECharacteristicValue.fileFormats -->

<!-- UTSAPIJSON.readBLECharacteristicValue.returnValue -->

<!-- UTSAPIJSON.readBLECharacteristicValue.example -->

<!-- UTSAPIJSON.readBLECharacteristicValue.tutorial -->

### 注意事项

- 先注册 `onBLECharacteristicValueChange`，再发起读取。读取结果通过该事件的 `value` 返回，`readBLECharacteristicValue` 的成功回调不包含特征值数据。
- 主动读取要求特征值支持 `read`，无需先调用 `notifyBLECharacteristicValueChange` 开启通知。
- 多设备或多特征值共用事件监听时，应按事件中的 `deviceId`、`serviceId` 和 `characteristicId` 匹配数据来源。


<!-- UTSAPIJSON.writeBLECharacteristicValue.name -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.description -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.compatibility -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.param -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.fileFormats -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.returnValue -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.example -->

<!-- UTSAPIJSON.writeBLECharacteristicValue.tutorial -->

### 注意事项

- 应根据特征值属性选择 `writeType`：`write` 为有响应写，`writeNoResponse` 为无响应写。当前 iOS 插件不传时使用 `write`，不会因特征值只支持无响应写而自动切换；此时需显式传入 `writeNoResponse`。
- 当前 iOS 插件不会自动分包。超过单次写入长度上限时，会调用 `fail` 和 `complete`，需按长度上限与设备协议自行分包，详见 [getBLEMTU 的 iOS 注意事项](#getblemtu)。
- 无响应写缺少外设对本次写入的协议层确认。若业务需要确认设备已接收或处理数据，应设计应用层应答机制。


<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.name -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.description -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.compatibility -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.param -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.fileFormats -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.returnValue -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.example -->

<!-- UTSAPIJSON.notifyBLECharacteristicValueChange.tutorial -->

### 注意事项

- 先注册 `onBLECharacteristicValueChange`，再传入 `state: true` 开启通知；特征值需支持 `notify` 或 `indicate`。
- 开启成功表示通知配置完成，不代表外设会立即发送数据；是否上报、何时上报由设备协议决定。
- 不再需要通知时传入 `state: false`。断线重连后如需继续接收通知，应重新发现服务和特征值并再次开启通知。


<!-- UTSAPIJSON.onBLECharacteristicValueChange.name -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.description -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.compatibility -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.param -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.fileFormats -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.returnValue -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.example -->

<!-- UTSAPIJSON.onBLECharacteristicValueChange.tutorial -->


<!-- UTSAPIJSON.offBLECharacteristicValueChange.name -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.description -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.compatibility -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.param -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.fileFormats -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.returnValue -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.example -->

<!-- UTSAPIJSON.offBLECharacteristicValueChange.tutorial -->


<!-- UTSAPIJSON.ble.example -->


## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

