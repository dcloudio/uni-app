## uni.startWifi(option) @startwifi

初始化Wi-Fi模块


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### startWifi 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **WifiOption** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.startWifi)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#startwifi)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=startWifi&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startWifi&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startWifi&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startWifi&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startWifi&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startWifi)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startWifi&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.stopWifi(option) @stopwifi

关闭 Wi-Fi 模块


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### stopWifi 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **WifiOption** | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.stopWifi)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#stopwifi)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=stopWifi&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopWifi&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopWifi&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopWifi&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopWifi&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopWifi)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopWifi&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.connectWifi(option) @connectwifi



### connectWifi 兼容性 
| Web | 微信小程序 | Android 系统版本 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| - | - | >=4.4 && <10.0 | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **WifiConnectOption** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| password | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| maunal | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| partialInfo | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.connectWifi)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#connectWifi)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=connectWifi&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=connectWifi&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=connectWifi&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=connectWifi&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=connectWifi&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=connectWifi)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=connectWifi&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.setWifiList(option) @setwifilist

SetWifiList  暂未实现


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### setWifiList 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **WifiOption** | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | Wifi 函数通用入参封装 |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.setWifiList)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=setWifiList&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setWifiList&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setWifiList&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setWifiList&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setWifiList&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setWifiList)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setWifiList&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.getWifiList(option) @getwifilist

请求获取 Wi-Fi 列表。wifiList 数据会在 onGetWifiList 注册的回调中返回。

> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### getWifiList 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **WifiOption** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.getWifiList)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#getWifiList)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getWifiList&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getWifiList&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getWifiList&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getWifiList&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getWifiList&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getWifiList)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getWifiList&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.onGetWifiList(UniWifiCallback) @ongetwifilist

监听获取到 Wi-Fi 列表数据事件。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onGetWifiList 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (wifiInfo: Record\<string, any>) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.onGetWifiList)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#onGetWifiList)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onGetWifiList&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onGetWifiList&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onGetWifiList&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onGetWifiList&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onGetWifiList&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onGetWifiList)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onGetWifiList&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offGetWifiList(UniWifiCallback) @offgetwifilist

移除获取到 Wi-Fi 列表数据事件的监听函数。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### offGetWifiList 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.offGetWifiList)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#offGetWifiList)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=offGetWifiList&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offGetWifiList&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offGetWifiList&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offGetWifiList&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offGetWifiList&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offGetWifiList)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offGetWifiList&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.getConnectedWifi(option) @getconnectedwifi

获取已连接的 Wi-Fi 信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### getConnectedWifi 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| option | **GetConnectedWifiOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### option 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| partialInfo | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| success | (res: [UniWifiResult](#uniwifiresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

#### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.getConnectedWifi)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#getConnectedWifi)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getConnectedWifi&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getConnectedWifi&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getConnectedWifi&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getConnectedWifi&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getConnectedWifi&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getConnectedWifi)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getConnectedWifi&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.onWifiConnected(UniWifiCallback) @onwificonnected

监听连接上 Wi-Fi 的事件


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onWifiConnected 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (wifiInfo: [UniWifiResult](#uniwifiresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 

### UniWifiResult 的属性值 @uniwifiresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| wifi | **UniWifiInfo** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### wifi 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| BSSID | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| secure | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| signalStrength | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| frequency | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.onWifiConnected)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnected)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onWifiConnected&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onWifiConnected&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onWifiConnected&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onWifiConnected&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onWifiConnected&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onWifiConnected)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onWifiConnected&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.onWifiConnectedWithPartialInfo(UniWifiCallback) @onwificonnectedwithpartialinfo

监听连接上 Wi-Fi 的事件。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### onWifiConnectedWithPartialInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (wifiInfo: [UniWifiInfoWithPartialInfo](#uniwifiinfowithpartialinfo-values)) => void | 是 | - | - |  | 

### UniWifiInfoWithPartialInfo 的属性值 @uniwifiinfowithpartialinfo-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| SSID | string | 是 | - | - | - |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.onWifiConnectedWithPartialInfo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#onWifiConnectedWithPartialInfo)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onWifiConnectedWithPartialInfo&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onWifiConnectedWithPartialInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onWifiConnectedWithPartialInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onWifiConnectedWithPartialInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onWifiConnectedWithPartialInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onWifiConnectedWithPartialInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onWifiConnectedWithPartialInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offWifiConnected(callback?) @offwificonnected

移除连接上 Wi-Fi 的事件的监听函数。


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-wifi](https://ext.dcloud.net.cn/plugin?name=uni-wifi)


### offWifiConnected 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 3.9.0 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | () => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.wifi.offWifiConnected)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/wifi.html#offWifiConnected)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=offWifiConnected&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offWifiConnected&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offWifiConnected&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offWifiConnected&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offWifiConnected&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offWifiConnected)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offWifiConnected&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

