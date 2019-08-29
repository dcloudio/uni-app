**蓝牙 API 平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|x|x|x|

### uni.openBluetoothAdapter(OBJECT)

初始化蓝牙模块

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
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

**注意**

*   其他蓝牙相关 API 必须在 [`uni.openBluetoothAdapter`](/api/system/bluetooth?id=openbluetoothadapter) 调用之后使用。否则 API 会返回错误（errCode=10000）。
*   在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用 [`uni.openBluetoothAdapter`](/api/system/bluetooth?id=openbluetoothadapter) 会返回错误（errCode=10001），表示手机蓝牙功能不可用。此时APP蓝牙模块已经初始化完成，可通过 [`uni.onBluetoothAdapterStateChange`](/api/system/bluetooth?id=onbluetoothadapterstatechange) 监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。

**示例代码**

```javascript
uni.openBluetoothAdapter({
  success(res) {
    console.log(res)
  }
})
```

### uni.startBluetoothDevicesDiscovery(OBJECT)

开始搜寻附近的蓝牙外围设备。**此操作比较耗费系统资源，请在搜索并连接到设备后调用 [`uni.stopBluetoothDevicesDiscovery`](/api/system/bluetooth?id=stopbluetoothdevicesdiscovery) 方法停止搜索。**


**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|services|Array&lt;String&gt;||否|要搜索但蓝牙设备主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。|
|allowDuplicatesKey|boolean|false|否|是否允许重复上报同一设备。如果允许重复上报，则 `uni.onBlueToothDeviceFound` 方法会多次上报同一设备，但是 RSSI 值会有不同。|
|interval|number|0|否|上报设备的间隔。0 表示找到新设备立即上报，其他数值根据传入的间隔上报。|
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

**注意：** 

* App 端目前仅支持发现ble蓝牙设备，更多蓝牙设备发现需使用 Native.js，参考：[https://ask.dcloud.net.cn/article/114](https://ask.dcloud.net.cn/article/114)。


**示例代码**

```javascript
// 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
uni.startBluetoothDevicesDiscovery({
  services: ['FEE7'],
  success(res) {
    console.log(res)
  }
})
```

### uni.onBluetoothDeviceFound(CALLBACK)

监听寻找到新设备的事件

**CALLBACK 返回参数**

|属性|类型|说明|
|---|---|---|
|devices|Array&lt;Object&gt;|新搜索到的设备列表|

**devices 的结构**

|属性|类型|说明|
|---|---|---|
|name|string|蓝牙设备名称，某些设备可能没有|
|deviceId|string|用于区分设备的 id|
|RSSI|number|当前蓝牙设备的信号强度|
|advertisData|ArrayBuffer|当前蓝牙设备的广播数据段中的 ManufacturerData 数据段。|
|advertisServiceUUIDs|Array&lt;String&gt;|当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段|
|localName|string|当前蓝牙设备的广播数据段中的 LocalName 数据段|
|serviceData|Object|当前蓝牙设备的广播数据段中的 ServiceData 数据段|

**注意**

*   若在 [`uni.onBluetoothDeviceFound`](/api/system/bluetooth?id=onbluetoothdevicefound) 回调了某个设备，则此设备会添加到 [`uni.getBluetoothDevices`](/api/system/bluetooth?id=getbluetoothdevices) 接口获取到的数组中。

**示例代码**

```javascript
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
uni.onBluetoothDeviceFound(function (devices) {
  console.log('new device list has founded')
  console.dir(devices)
  console.log(ab2hex(devices[0].advertisData))
})
```

### uni.stopBluetoothDevicesDiscovery(OBJECT)

停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
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

**示例代码**

```javascript
uni.stopBluetoothDevicesDiscovery({
  success(res) {
    console.log(res)
  }
})
```

### uni.onBluetoothAdapterStateChange(CALLBACK)

监听蓝牙适配器状态变化事件

**CALLBACK 返回参数**

|属性|类型|说明|
|---|---|---|
|available|boolean|蓝牙适配器是否可用|
|discovering|boolean|蓝牙适配器是否处于搜索状态|

**示例代码**

```javascript
uni.onBluetoothAdapterStateChange(function (res) {
  console.log('adapterState changed, now is', res)
})
```

### uni.getConnectedBluetoothDevices(OBJECT)

根据 uuid 获取处于已连接状态的设备。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|services|Array&lt;String&gt;||是|蓝牙设备主 service 的 uuid 列表|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|---|---|---|
|devices|Array&lt;Object&gt;|搜索到的设备列表|

**res.devices 的结构**

|属性|类型|说明|
|---|---|---|
|name|string|蓝牙设备名称，某些设备可能没有|
|deviceId|string|用于区分设备的 id|

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

**示例代码** 

```javascript
uni.getConnectedBluetoothDevices({
  success(res) {
    console.log(res)
  }
})
```

### uni.getBluetoothDevices(OBJECT)

获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|:-|:-|:-|
|devices|Array&lt;Object&gt;|uuid 对应的的已连接设备列表|

**res.devices 的结构**

|属性|类型|说明|
|---|---|---|---|
|name|string|蓝牙设备名称，某些设备可能没有|
|deviceId|string|用于区分设备的 id|
|RSSI|number|当前蓝牙设备的信号强度|
|advertisData|ArrayBuffer|当前蓝牙设备的广播数据段中的 ManufacturerData 数据段。|
|advertisServiceUUIDs|Array&lt;String&gt;|当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段|
|localName|string|当前蓝牙设备的广播数据段中的 LocalName 数据段|
|serviceData|Object|当前蓝牙设备的广播数据段中的 ServiceData 数据段|

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

**示例代码**

```javascript
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
uni.getBluetoothDevices({
  success(res) {
    console.log(res)
    if (res.devices[0]) {
      console.log(ab2hex(res.devices[0].advertisData))
    }
  }
})
```

**注意**

*   该接口获取到的设备列表为**蓝牙模块生效期间所有搜索到的蓝牙设备**，若在蓝牙模块使用流程结束后未及时调用 [`uni.closeBluetoothAdapter`](/api/system/bluetooth?id=closebluetoothadapter) 释放资源，会存在调用该接口会返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
*   蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的 LocalName 字段中的设备名称，而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的 `GattName`。若需要动态改变设备名称并展示，建议使用 `localName` 字段。

### uni.getBluetoothAdapterState(OBJECT)

获取本机蓝牙适配器状态。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|---|---|---|
|discovering|boolean|是否正在搜索设备|
|available|boolean|蓝牙适配器是否可用|

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

**示例代码**

```javascript
uni.getBluetoothAdapterState({
  success(res) {
    console.log(res)
  }
})
```

### uni.closeBluetoothAdapter(OBJECT)

关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 [`uni.openBluetoothAdapter`](/api/system/bluetooth?id=openbluetoothadapter) 成对调用。

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
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

**示例代码**

```javascript
uni.closeBluetoothAdapter({
  success(res) {
    console.log(res)
  }
})
```
