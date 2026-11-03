::: sourceCode
## uni.startWifi(option) @startwifi

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.startWifi


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

初始化Wi-Fi模块


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### startWifi 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **WifiOption** | 是 | HarmonyOS: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | HarmonyOS: x |
| complete | (res: any) => void | 否 | HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | HarmonyOS: x |
| errSubject | string | 是 | HarmonyOS: x |
| errMsg | string | 是 | HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| secure | boolean | 否 | HarmonyOS: x |
| signalStrength | number | 否 | HarmonyOS: x |
| frequency | number | 否 | HarmonyOS: x |






::: sourceCode
## uni.stopWifi(option) @stopwifi

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.stopWifi


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

关闭 Wi-Fi 模块


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### stopWifi 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **WifiOption** | 是 | Android: x; HarmonyOS: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | Android: x; HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | Android: x; HarmonyOS: x |
| complete | (res: any) => void | 否 | Android: x; HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | Android: x; HarmonyOS: x |
| errSubject | string | 是 | Android: x; HarmonyOS: x |
| errMsg | string | 是 | Android: x; HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | Android: x; HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | Android: x; HarmonyOS: x |
| BSSID | string | 否 | Android: x; HarmonyOS: x |
| secure | boolean | 否 | Android: x; HarmonyOS: x |
| signalStrength | number | 否 | Android: x; HarmonyOS: x |
| frequency | number | 否 | Android: x; HarmonyOS: x |






::: sourceCode
## uni.connectWifi(option) @connectwifi

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.connectWifi


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::



### connectWifi 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android 系统版本","group":"Android","subtitle":"系统版本"},{"title":"Android","group":"Android","subtitle":"uni-app x"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["&amp;gt;=4.4 &amp;amp;&amp;amp; &amp;lt;10.0","3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **WifiConnectOption** | 是 | HarmonyOS: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 否 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| password | string | 否 | HarmonyOS: x |
| maunal | boolean | 否 | HarmonyOS: x |
| partialInfo | boolean | 否 | HarmonyOS: x |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | HarmonyOS: x |
| complete | (res: any) => void | 否 | HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | HarmonyOS: x |
| errSubject | string | 是 | HarmonyOS: x |
| errMsg | string | 是 | HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| secure | boolean | 否 | HarmonyOS: x |
| signalStrength | number | 否 | HarmonyOS: x |
| frequency | number | 否 | HarmonyOS: x |






::: sourceCode
## uni.setWifiList(option) @setwifilist

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.setWifiList


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

SetWifiList  暂未实现


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### setWifiList 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android 系统版本","group":"Android","subtitle":"系统版本"},{"title":"Android","group":"Android","subtitle":"uni-app x"},{"title":"iOS 系统版本","group":"iOS","subtitle":"系统版本"},{"title":"iOS","group":"iOS","subtitle":"uni-app x"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| option | **WifiOption** | 是 | Android: x; iOS: x; HarmonyOS: x | Wifi 函数通用入参封装 |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | Android: x; iOS: x; HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | Android: x; iOS: x; HarmonyOS: x |
| complete | (res: any) => void | 否 | Android: x; iOS: x; HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | Android: x; iOS: x; HarmonyOS: x |
| errSubject | string | 是 | Android: x; iOS: x; HarmonyOS: x |
| errMsg | string | 是 | Android: x; iOS: x; HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | Android: x; iOS: x; HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | Android: x; iOS: x; HarmonyOS: x |
| BSSID | string | 否 | Android: x; iOS: x; HarmonyOS: x |
| secure | boolean | 否 | Android: x; iOS: x; HarmonyOS: x |
| signalStrength | number | 否 | Android: x; iOS: x; HarmonyOS: x |
| frequency | number | 否 | Android: x; iOS: x; HarmonyOS: x |






::: sourceCode
## uni.getWifiList(option) @getwifilist

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.getWifiList


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

请求获取 Wi-Fi 列表。wifiList 数据会在 onGetWifiList 注册的回调中返回。

> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### getWifiList 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **WifiOption** | 是 | HarmonyOS: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | HarmonyOS: x |
| complete | (res: any) => void | 否 | HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | HarmonyOS: x |
| errSubject | string | 是 | HarmonyOS: x |
| errMsg | string | 是 | HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| secure | boolean | 否 | HarmonyOS: x |
| signalStrength | number | 否 | HarmonyOS: x |
| frequency | number | 否 | HarmonyOS: x |






::: sourceCode
## uni.onGetWifiList(callback) @ongetwifilist

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.onGetWifiList


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

监听获取到 Wi-Fi 列表数据事件。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onGetWifiList 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (wifiInfo: [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md)) => void | 是 | HarmonyOS: x | 






::: sourceCode
## uni.offGetWifiList(callback) @offgetwifilist

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.offGetWifiList


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

移除获取到 Wi-Fi 列表数据事件的监听函数。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### offGetWifiList 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | () => void | 是 | HarmonyOS: x | 






::: sourceCode
## uni.getConnectedWifi(option) @getconnectedwifi

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.getConnectedWifi


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

获取已连接的 Wi-Fi 信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### getConnectedWifi 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| option | **GetConnectedWifiOptions** | 是 | HarmonyOS: x |

#### option 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| partialInfo | boolean | 否 | HarmonyOS: x |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | HarmonyOS: x |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | HarmonyOS: x |
| complete | (res: any) => void | 否 | HarmonyOS: x | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | HarmonyOS: x |
| errSubject | string | 是 | HarmonyOS: x |
| errMsg | string | 是 | HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| secure | boolean | 否 | HarmonyOS: x |
| signalStrength | number | 否 | HarmonyOS: x |
| frequency | number | 否 | HarmonyOS: x |






::: sourceCode
## uni.onWifiConnected(callback) @onwificonnected

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.onWifiConnected


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

监听连接上 Wi-Fi 的事件


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onWifiConnected 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (wifiInfo: [UniWifiResult](#uniwifiresult-values)) => void | 是 | HarmonyOS: x | 

### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errCode | number | 是 | HarmonyOS: x |
| errSubject | string | 是 | HarmonyOS: x |
| errMsg | string | 是 | HarmonyOS: x |
| wifi | **UniWifiInfo** | 否 | HarmonyOS: x |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| SSID | string | 是 | HarmonyOS: x |
| BSSID | string | 否 | HarmonyOS: x |
| secure | boolean | 否 | HarmonyOS: x |
| signalStrength | number | 否 | HarmonyOS: x |
| frequency | number | 否 | HarmonyOS: x |






::: sourceCode
## uni.onWifiConnectedWithPartialInfo(callback) @onwificonnectedwithpartialinfo

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.onWifiConnectedWithPartialInfo


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

监听连接上 Wi-Fi 的事件。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onWifiConnectedWithPartialInfo 兼容性 <Help /> 
Android: 3.9.0; iOS: 4.11


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (wifiInfo: [UniWifiInfoWithPartialInfo](#uniwifiinfowithpartialinfo-values)) => void | 是 | 

### UniWifiInfoWithPartialInfo 的属性值 @uniwifiinfowithpartialinfo-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| SSID | string | 是 |






::: sourceCode
## uni.offWifiConnected(callback?) @offwificonnected

> issues: https://issues.dcloud.net.cn/?mid=api.device.wifi.offWifiConnected


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-wifi

:::

移除连接上 Wi-Fi 的事件的监听函数。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### offWifiConnected 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS 系统版本","group":"HarmonyOS","subtitle":"系统版本"},{"title":"HarmonyOS","group":"HarmonyOS","subtitle":"uni-app x"}],"rows":[["3.9.0","4.11","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | () => void | 否 | HarmonyOS: x | 






## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

