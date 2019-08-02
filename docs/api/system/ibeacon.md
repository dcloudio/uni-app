**iBeacon API 平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|
|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|x|

### uni.onBeaconServiceChange(CALLBACK)

监听 iBeacon 服务状态变化事件

**CALLBACK 返回参数**

|属性|类型|说明|
|:-|:-|:-|
|available|boolean|服务目前是否可用|
|discovering|boolean|目前是否处于搜索状态|

### uni.onBeaconUpdate(CALLBACK)

监听 iBeacon 设备更新事件

**CALLBACK 返回参数**

|属性|类型|说明|
|:-|:-|:-|
|beacons|Array<[IBeaconInfo](/api/system/ibeacon?id=ibeaconinfo)>|当前搜寻到的所有 iBeacon 设备列表|

### uni.getBeacons(OBJECT)

获取所有已搜索到的 iBeacon 设备

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|属性|类型|说明|
|:-|:-|:-|
|beacons|Array<[IBeaconInfo](/api/system/ibeacon?id=ibeaconinfo)>|iBeacon 设备列表|

#### 错误

|错误码|错误信息|说明|
|:-|:-|:-|
|0|ok|正常|
|11000|unsupport|系统或设备不支持|
|11001|bluetooth service unavailable|蓝牙服务不可用|
|11002|location service unavailable|位置服务不可用|
|11003|already start|已经开始搜索|

### uni.startBeaconDiscovery(OBJECT)

开始搜索附近的 iBeacon 设备

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|uuids|Array＜String＞||是|iBeacon 设备广播的 uuid 列表|
|ignoreBluetoothAvailable|boolean|false|否|是否校验蓝牙开关，仅在 iOS 下有效|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|:-|:-|:-|
|0|ok|正常|
|11000|unsupport|系统或设备不支持|
|11001|bluetooth service unavailable|蓝牙服务不可用|
|11002|location service unavailable|位置服务不可用|
|11003|already start|已经开始搜索|

#### 示例代码

```js
uni.startBeaconDiscovery({
  success(res) { }
})
```

### uni.stopBeaconDiscovery(OBJECT)

停止搜索附近的 iBeacon 设备

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

#### 错误

|错误码|错误信息|说明|
|:-|:-|:-|
|0|ok|正常|
|11000|unsupport|系统或设备不支持|
|11001|bluetooth service unavailable|蓝牙服务不可用|
|11002|location service unavailable|位置服务不可用|
|11003|already start|已经开始搜索|

### IBeaconInfo

|属性|类型|说明|
|:-|:-|:-|
|uuid|string|iBeacon 设备广播的 uuid|
|major|string|iBeacon 设备的主 id|
|minor|string|iBeacon 设备的次 id|
|proximity|number|表示设备距离的枚举值|
|accuracy|number|iBeacon 设备的距离|
|rssi|number|表示设备的信号强度|