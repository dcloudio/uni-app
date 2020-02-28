**低功耗蓝牙 API 平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|x|x|x|

### uni.writeBLECharacteristicValue(OBJECT)

向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|蓝牙设备 id|
|serviceId|string||是|蓝牙特征值对应服务的 uuid|
|characteristicId|string||是|蓝牙特征值的 uuid|
|value|ArrayBuffer||是|蓝牙设备特征值对应的二进制值|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 注意

*   并行调用多次会存在写失败的可能性。
*   APP不会对写入数据包大小做限制，但系统与蓝牙设备会限制蓝牙4.0单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过20字节。
*   若单次写入数据过长，iOS 上存在系统不会有任何回调的情况（包括错误回调）。
*   安卓平台上，在调用 `notifyBLECharacteristicValueChange` 成功后立即调用 `writeBLECharacteristicValue` 接口，在部分机型上会发生 10008 系统错误

#### 示例代码

```js
// 向蓝牙设备发送一个0x00的16进制数据
const buffer = new ArrayBuffer(1)
const dataView = new DataView(buffer)
dataView.setUint8(0, 0)
uni.writeBLECharacteristicValue({
  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  // 这里的value是ArrayBuffer类型
  value: buffer,
  success(res) {
    console.log('writeBLECharacteristicValue success', res.errMsg)
  }
})
```

### uni.readBLECharacteristicValue(OBJECT)

读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|蓝牙设备 id|
|serviceId|string||是|蓝牙特征值对应服务的 uuid|
|characteristicId|string||是|蓝牙特征值的 uuid|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 注意

*   并行调用多次会存在读失败的可能性。
*   接口读取到的信息需要在 `onBLECharacteristicValueChange` 方法注册的回调中获取。

#### 示例代码

```js
// 必须在这里的回调才能获取
uni.onBLECharacteristicValueChange(function (characteristic) {
  console.log('characteristic value comed:', characteristic)
})
uni.readBLECharacteristicValue({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  success(res) {
    console.log('readBLECharacteristicValue:', res.errCode)
  }
})
```

### uni.onBLEConnectionStateChange(CALLBACK)

监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等

**CALLBACK 返回参数**

|属性|类型|说明|
|---|---|---|
|deviceId|string|蓝牙设备ID|
|connected|boolean|是否处于已连接状态|

#### 示例代码

```js
uni.onBLEConnectionStateChange(function (res) {
  // 该方法回调中可以用于处理连接意外断开等异常情况
  console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
})
```

### uni.onBLECharacteristicValueChange(CALLBACK)

监听低功耗蓝牙设备的特征值变化事件。必须先启用 `notifyBLECharacteristicValueChange` 接口才能接收到设备推送的 notification。

**CALLBACK 返回参数**

|属性|类型|说明|
|---|---|---|
|deviceId|string|蓝牙设备 id|
|serviceId|string|蓝牙特征值对应服务的 uuid|
|characteristicId|string|蓝牙特征值的 uuid|
|value|ArrayBuffer|特征值最新的值|

#### 示例代码

```js
// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}
uni.onBLECharacteristicValueChange(function (res) {
  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
  console.log(ab2hex(res.value))
})
```

### uni.notifyBLECharacteristicValueChange(OBJECT)

启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用。
另外，必须先启用 `notifyBLECharacteristicValueChange` 才能监听到设备 `characteristicValueChange` 事件

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|蓝牙设备 id|
|serviceId|string||是|蓝牙特征值对应服务的 uuid|
|characteristicId|string||是|蓝牙特征值的 uuid|
|state|boolean||是|是否启用 notify|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 注意

*   订阅操作成功后需要设备主动更新特征值的 value，才会触发 [`uni.onBLECharacteristicValueChange`](/api/system/ble?id=onblecharacteristicvaluechange) 回调。
*   安卓平台上，在调用 `notifyBLECharacteristicValueChange` 成功后立即调用 `writeBLECharacteristicValue` 接口，在部分机型上会发生 10008 系统错误

#### 示例代码

```js
uni.notifyBLECharacteristicValueChange({
  state: true, // 启用 notify 功能
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId,
  success(res) {
    console.log('notifyBLECharacteristicValueChange success', res.errMsg)
  }
})
```

### uni.getBLEDeviceServices(OBJECT)

获取蓝牙设备所有服务(service)。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|蓝牙设备 id|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|---|---|---|
|services|Array&lt;Object&gt;|设备服务列表|

**res.services 的结构**

|属性|类型|说明|
|---|---|---|
|uuid|string|蓝牙设备服务的 uuid|
|isPrimary|boolean|该服务是否为主服务|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 示例代码

```js
uni.getBLEDeviceServices({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  success(res) {
    console.log('device services:', res.services)
  }
})
```

### uni.getBLEDeviceCharacteristics(OBJECT)

获取蓝牙设备某个服务中所有特征值(characteristic)。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|蓝牙设备 id|
|serviceId|string||是|蓝牙服务 uuid，需要使用 `getBLEDeviceServices` 获取|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|---|---|---|---|
|characteristics|Array&lt;Object&gt;|设备服务列表|

**res.characteristics 的结构**

|属性|类型|说明|
|---|---|---|
|uuid|string|蓝牙设备特征值的 uuid|
|properties|Object|该特征值支持的操作类型|

**properties 的结构**

|属性|类型|说明|
|---|---|---|
|read|boolean|该特征值是否支持 read 操作|
|write|boolean|该特征值是否支持 write 操作|
|notify|boolean|该特征值是否支持 notify 操作|
|indicate|boolean|该特征值是否支持 indicate 操作|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 示例代码

```js
uni.getBLEDeviceCharacteristics({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId,
  success(res) {
    console.log('device getBLEDeviceCharacteristics:', res.characteristics)
  }
})
```

### uni.createBLEConnection(OBJECT)

连接低功耗蓝牙设备。

若APP在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|用于区分设备的 id|
|timeout|number||否|超时时间，单位ms，不填表示不会超时|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 注意

*   请保证尽量成对的调用 `createBLEConnection` 和 `closeBLEConnection` 接口。安卓如果多次调用 `createBLEConnection` 创建连接，有可能导致系统持有同一设备多个连接的实例，导致调用 `closeBLEConnection` 的时候并不能真正的断开与设备的连接。
*   蓝牙连接随时可能断开，建议监听 [`uni.onBLEConnectionStateChange`](/api/system/ble?id=onbleconnectionstatechange) 回调事件，当蓝牙设备断开时按需执行重连操作
*   若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回 10006 错误，建议进行重连操作。

#### 示例代码

```js
uni.createBLEConnection({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId,
  success(res) {
    console.log(res)
  }
})
```

### uni.closeBLEConnection(OBJECT)

断开与低功耗蓝牙设备的连接。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|deviceId|string||是|用于区分设备的 id|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|---|---|---|
|0|ok|正常|
|10000|not init|未初始化蓝牙适配器|
|10001|not available|当前蓝牙适配器不可用|
|10002|no device|没有找到指定设备|
|10003|connection fail|连接失败|
|10004|no service|没有找到指定服务|
|10005|no characteristic|没有找到指定特征值|
|10006|no connection|当前连接已断开|
|10007|property not support|当前特征值不支持此操作|
|10008|system error|其余所有系统上报的异常|
|10009|system not support|Android 系统特有，系统版本低于 4.3 不支持 BLE|

#### 示例代码

```js
uni.closeBLEConnection({
  deviceId,
  success(res) {
    console.log(res)
  }
})
```
