## 使用说明  

Wi-Fi功能模块


### App-iOS平台注意事项  
- iOS平台App获取Wi-Fi信息需要开启“Access WiFi information”能力  
  登录苹果开发者网站，在“Certificates, Identifiers & Profiles”页面选择“Identifiers”中选择对应的App ID，确保开启“Access WiFi information”，保存后重新生成profile文件  
- iOS13及以上系统，获取当前连接的Wi-Fi信息需要先获取系统定位权限，因此在iOS13及以上系统使用此接口时，会触发定位权限申请的弹窗  

### App-Android平台注意事项  
- 如果是自定义基座，需要具备下面的权限

```
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```


###uni.startWifi(OBJECT)

初始化Wi-Fi模块。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#startwifi](https://uniapp.dcloud.net.cn/api/system/wifi.html#startwifi)


### uni.stopWifi(OBJECT)

关闭 Wi-Fi 模块。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#stopwifi](https://uniapp.dcloud.net.cn/api/system/wifi.html#stopwifi)


### uni.getConnectedWifi(OBJECT)

获取已连接的 Wi-Fi 信息

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#getconnectedwifi](https://uniapp.dcloud.net.cn/api/system/wifi.html#getconnectedwifi)


### uni.getWifiList(OBJECT)

请求获取 Wi-Fi 列表。wifiList 数据会在 onGetWifiList 注册的回调中返回。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#getWifiList](https://uniapp.dcloud.net.cn/api/system/wifi.html#getWifiList)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.onGetWifiList(CALLBACK)

监听获取到 Wi-Fi 列表数据事件。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#onGetWifiList](https://uniapp.dcloud.net.cn/api/system/wifi.html#onGetWifiList)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.offGetWifiList(CALLBACK)

移除获取到 Wi-Fi 列表数据事件的监听函数。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#offGetWifiList](https://uniapp.dcloud.net.cn/api/system/wifi.html#offGetWifiList)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.connectWifi(OBJECT)

连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#connectWifi](https://uniapp.dcloud.net.cn/api/system/wifi.html#connectWifi)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.onWifiConnected(CALLBACK)

监听连接上 Wi-Fi 的事件。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnected](https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnected)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.offWifiConnected(CALLBACK)

移除连接上 Wi-Fi 的事件的监听函数。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnected](https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnected)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.onWifiConnectedWithPartialInfo(CALLBACK)

监听连接上 Wi-Fi 的事件。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnectedWithPartialInfo](https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnectedWithPartialInfo)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|


### uni.offWifiConnectedWithPartialInfo(CALLBACK)

移除连接上 Wi-Fi 的事件的监听函数。

> 使用文档：[https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnectedWithPartialInfo](https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnectedWithPartialInfo)

**平台差异说明**

|App-Android|App-iOS|
|:-:|:-:|
|√|x|

