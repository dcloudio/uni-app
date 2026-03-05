## uni.onLocationChange(callback) @onlocationchange

监听实时地理位置变化事件

### onLocationChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | (res: [GetLocationSuccess](#getlocationsuccess-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### GetLocationSuccess 的属性值 @getlocationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，范围为-180~180，负数表示西经 |
| speed | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 速度，浮点数，单位m/s |
| accuracy | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 位置的精确度 |
| altitude | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 高度，单位 m |
| verticalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 垂直精度，单位 m（Android 无法获取，返回 0） |
| horizontalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 水平精度，单位 m（Android、HarmonyOS 无法获取，返回 0） |
| address | string | 否 | null | Web: x; 微信小程序: x; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 地址信息 |


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onLocationChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.onLocationChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.onLocationChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onLocationChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onLocationChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onLocationChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onLocationChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onLocationChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onLocationChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offLocationChange(callback) @offlocationchange

移除实时地理位置变化事件。

### offLocationChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | number \| (res: [GetLocationSuccess](#getlocationsuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### GetLocationSuccess 的属性值 @getlocationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | number | 是 | 0 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，范围为-180~180，负数表示西经 |
| speed | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 速度，浮点数，单位m/s |
| accuracy | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 位置的精确度 |
| altitude | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 高度，单位 m |
| verticalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 垂直精度，单位 m（Android 无法获取，返回 0） |
| horizontalAccuracy | number | 是 | 0 | Web: 4.0; 微信小程序: 4.41; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 水平精度，单位 m（Android、HarmonyOS 无法获取，返回 0） |
| address | string | 否 | null | Web: x; 微信小程序: x; Android: 3.9.0; iOS: 4.11; HarmonyOS: x | 地址信息 |




<!-- UTSAPIJSON.offLocationChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.offLocationChange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.offLocationChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offLocationChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offLocationChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offLocationChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offLocationChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offLocationChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offLocationChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.onLocationChangeError(callback) @onlocationchangeerror

监听持续定位接口返回失败时触发。

### onLocationChangeError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | (listener: [IGetLocationFail](#igetlocationfail-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### IGetLocationFail 的属性值 @igetlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onLocationChangeError.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.onLocationChangeError)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.onLocationChangeError.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onLocationChangeError&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onLocationChangeError&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onLocationChangeError&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onLocationChangeError&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onLocationChangeError)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onLocationChangeError&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offLocationChangeError(callback) @offlocationchangeerror

移除监听持续定位接口返回失败事件。

### offLocationChangeError 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | number \| (listener: [IGetLocationFail](#igetlocationfail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### IGetLocationFail 的属性值 @igetlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |




<!-- UTSAPIJSON.offLocationChangeError.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.offLocationChangeError)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.offLocationChangeError.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offLocationChangeError&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offLocationChangeError&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offLocationChangeError&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offLocationChangeError&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offLocationChangeError)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offLocationChangeError&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.startLocationUpdate(options) @startlocationupdate

开启应用进入前台时接收位置消息。

### startLocationUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **StartLocationUpdateOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 定位服务提供商，通过 uni.getProvider 获取,目前支持系统定位(system)、腾讯定位(tencent), web端暂不支持provider机制。 |
| type | string | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于uni.openLocation的坐标，web端需配置定位 SDK 信息才可支持 gcj02； |
| success | (result: StartLocationUpdateSuccess) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [IGetLocationFail](#igetlocationfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| wgs84 | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | wgs84坐标系，系统定位默认取值wgs84，系统定位仅支持wgs84坐标系  |
| gcj02 | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | gcj02坐标系，腾讯定位默认取值gcj02，腾讯定位仅支持gcj02坐标系  |

#### IGetLocationFail 的属性值 @igetlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |




<!-- UTSAPIJSON.startLocationUpdate.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.startLocationUpdate)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdate.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startLocationUpdate&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startLocationUpdate&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startLocationUpdate&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startLocationUpdate&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startLocationUpdate)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startLocationUpdate&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.stopLocationUpdate(options) @stoplocationupdate

关闭监听实时位置变化，前后台都停止消息接收。

### stopLocationUpdate 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **StopLocationUpdateOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: StopLocationUpdateSuccess) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| fail | (result: [IGetLocationFail](#igetlocationfail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

#### IGetLocationFail 的属性值 @igetlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |




<!-- UTSAPIJSON.stopLocationUpdate.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.stopLocationUpdate)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.stopLocationUpdate.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopLocationUpdate&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopLocationUpdate&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopLocationUpdate&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopLocationUpdate&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopLocationUpdate)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopLocationUpdate&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.startLocationUpdateBackground(option) @startlocationupdatebackground
### 注意
- iOS平台：如果应用需要后台定位能力，需要在 info.plist 中配置 UIBackgroundModes 的 location，注意需Xcode工程中添加相对应 Capabilities 中的 Background Modes，并且勾选 Location updates。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  	<key>UIBackgroundModes</key>
		<array>
			<string>location</string>
		</array>

	</dict>
</plist>
```

开始监听实时地理位置信息变化事件，应用进入前后台时均接收实时地理位置信息。

### startLocationUpdateBackground 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **StartLocationUpdateBackgroundOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| provider | string | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 定位服务提供商，通过 uni.getProvider 获取,目前支持系统定位(system)、腾讯定位(tencent), web端暂不支持provider机制。 |
| type | string | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于uni.openLocation的坐标，web端需配置定位 SDK 信息才可支持 gcj02； |
| success | (result: StartLocationUpdateSuccess) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [IGetLocationFail](#igetlocationfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### type 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| wgs84 | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | wgs84坐标系，系统定位默认取值wgs84，系统定位仅支持wgs84坐标系  |
| gcj02 | Web: 4.0; 微信小程序: x; Android: 4.81; iOS: 4.81; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | gcj02坐标系，腾讯定位默认取值gcj02，腾讯定位仅支持gcj02坐标系  |

#### IGetLocationFail 的属性值 @igetlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 1505003 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 系统定位未开启，请在系统设置中开启系统定位 |
| 1505004 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 应用定位权限未开启 |
| 1505023 | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持逆地理编码 |
| 1505600 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: - | 超时 |
| 1505601 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 不支持的定位类型 |
| 1505602 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: 4.81; HarmonyOS(Vapor): 5.0 | 捕获定位失败 |
| 1505603 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 逆地理编码捕获失败 |
| 1505604 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 服务供应商获取失败 |
| 1505605 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 未通过配置预校验，通常是腾讯定位 api key 配置错误 |
| 1505607 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 腾讯定位只支持GCJ-02 |
| 1505608 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | 同一时间只能单个provider开启持续定位 |
| 1505700 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 不支持逆地理编码 |
| 1505701 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请确定系统定位是否开启 |
| 1505702 | Web: -; 微信小程序: -; Android: 4.81; iOS: 4.81; HarmonyOS: x | iOS plist文件中缺少后台定位配置：UIBackgroundModes->location |
| 1505800 | Web: -; 微信小程序: -; Android: 4.25; iOS: 4.25; HarmonyOS: x | 应用高精度定位权限未开启 |
| ~~1505005~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 缺失高精度权限授权（iOS特有）  **从4.25开始已经废弃** |
| ~~1505021~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 超时  **从4.25开始已经废弃** |
| ~~1505022~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 不支持的定位类型  **从4.25开始已经废弃** |
| ~~1505024~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 没有找到具体的定位引擎（GPS_PROVIDER，NETWORK_PROVIDER，PASSIVE_PROVIDER等），请定位开关是否已打开  **从4.25开始已经废弃** |
| ~~1505025~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 逆地理编码捕获失败  **从4.25开始已经废弃** |
| ~~1505026~~ | Web: 4.0; 微信小程序: -; Android: 3.9.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 捕获定位失败  **从4.25开始已经废弃** |




<!-- UTSAPIJSON.startLocationUpdateBackground.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.startLocationUpdateBackground)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdateBackground.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startLocationUpdateBackground&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startLocationUpdateBackground&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startLocationUpdateBackground&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startLocationUpdateBackground&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startLocationUpdateBackground)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startLocationUpdateBackground&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/location-change/location-change.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/location-change/location-change.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/location-change/location-change

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/location-change/location-change

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <text>显示简易操作日志(可滚动查看)</text><button size="mini" @click="data.log=''">清空日志</button>
  <scroll-view style="max-height: 300px;">
    <text style="margin: 2px; padding: 2px; border: 1px solid #000000;">{{ data.log }}</text>
  </scroll-view>
  <view class="uni-list">
    <text style="margin-bottom: 4px"> 请选择定位服务提供商：</text>
    <radio-group class="uni-flex uni-row" @change="providerChange" style="flex-wrap: wrap">
      <radio class="uni-list-cell" style="margin-right: 15px" v-for="(item, index) in data.providerList" :key="item.id"
        :value="item.id" :checked="index === data.currentSelectedProvider">
        {{ item.name }}
      </radio>
    </radio-group>
  </view>

  <view class="uni-list">
    <text style="margin-bottom: 4px"> 请选择坐标系：</text>
    <radio-group class="uni-flex uni-row" @change="typeChange" style="flex-wrap: wrap">
      <radio class="uni-list-cell" style="margin-right: 15px" v-for="(item, index) in types" :key="item.value"
        :value="item.value" :checked="index === data.currentSelectedType">
        {{ item.name }}
      </radio>
    </radio-group>
  </view>

  <scroll-view style="flex:1">
  <!-- #endif -->
    <button class="btnstyle" type="primary" @tap="startLocationUpdate" id="startLocationUpdate">点击连续定位</button>
    <button class="btnstyle" type="primary" @tap="startLocationUpdateBackground"
      id="startLocationUpdateBackground">后台点击连续定位</button>
    <button class="btnstyle" type="primary" @tap="stopLocationUpdate" id="stopLocationUpdate">点击关闭定位</button>
    <button class="btnstyle" type="primary" @tap="onLocationChange" id="onLocationChange">onLocationChange</button>
    <button class="btnstyle" type="primary" @tap="offLocationChange" id="offLocationChange">offLocationChange</button>
    <button class="btnstyle" type="primary" @tap="onLocationChangeError"
      id="onLocationChangeError">onLocationChangeError</button>
    <button class="btnstyle" type="primary" @tap="offLocationChangeError"
      id="offLocationChangeError">offLocationChangeError</button>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type LocationType = 'wgs84' | 'gcj02'
  export type ItemType = { value : LocationType, name : LocationType }
  export type LocationItem = { id : string, name : string, provider ?: UniProvider }
  export type DataType = {
    log: string
    logAble: boolean
    providerList: LocationItem[]
    currentSelectedProvider: number
    currentSelectedType: number
    startSuccess: boolean
    stopSuccess: boolean
    errCode: number
  }

  const data = reactive({
    log: "",
    logAble: true,
    providerList: [],
    currentSelectedProvider: 0,
    currentSelectedType: 0,
    startSuccess: false,
    stopSuccess: false,
    errCode: 0
  } as DataType)

  const types = ref<ItemType[]>([
    {
      value: 'wgs84',
      name: 'wgs84'
    },
    {
      value: 'gcj02',
      name: 'gcj02'
    }
  ])

  const getProvider = () => {
    // #ifdef APP

    let provider = uni.getProviderSync({
      service: "location",
    } as GetProviderSyncOptions)
    console.log(provider)
    provider.providerObjects.forEach((value : UniProvider) => {
      var currentProvider = value
      data.providerList.push({
        name: currentProvider.description,
        id: currentProvider.id,
        provider: currentProvider
      } as LocationItem);
    })

    data.providerList.forEach((value, index) => {
      if (value.id == "system") {
        data.currentSelectedProvider = index
      }
    })
    // #endif
  }

  const providerChange = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < data.providerList.length; i++) {
      if (data.providerList[i].id === e.detail.value) {
        data.currentSelectedProvider = i;
        break;
      }
    }

    if (e.detail.value == "system") {
      data.currentSelectedType = 0
    } else if (e.detail.value == "tencent") {
      data.currentSelectedType = 1
    }
  }

  const typeChange = (e : UniRadioGroupChangeEvent) => {
    for (let i = 0; i < types.value.length; i++) {
      if (types.value[i].value === e.detail.value) {
        data.currentSelectedType = i;
        break;
      }
    }
  }

  const offLocationChangeError = () => {
    if (data.logAble) {
      data.log += "关闭offLocationChangeError监听" + '\n\n'
    }
    console.log("关闭onLocationChangeError监听")
    uni.offLocationChangeError(null)
  }

  const onLocationChangeError = () => {
    uni.offLocationChangeError(null)
    if (data.logAble) {
      data.log += "开启onLocationChangeError监听" + '\n\n'
    }
    console.log("开启onLocationChangeError监听")
    uni.onLocationChangeError((e) => {
      console.log("onLocationChangeError回调: ", e)
      if (data.logAble) {
        data.log += JSON.stringify(e) + '\n\n'
      }
    })
  }

  const onLocationChange = () => {
    uni.offLocationChange(null)
    console.log("开启onLocationChange监听")
    if (data.logAble) {
      data.log += "开启onLocationChange监听" + '\n\n'
    }
    uni.onLocationChange((e) => {
      console.log("onLocationChange持续监听回调: ", e)
      if (data.logAble) {
        data.log += "provider= " + data.providerList[data.currentSelectedProvider].id + '\n' + JSON.stringify(e) + '\n\n'
      }
    })
  }

  const offLocationChange = () => {
    if (data.logAble) {
      data.log += "关闭offLocationChange监听" + '\n\n'
    }
    console.log("关闭offLocationChange监听")
    uni.offLocationChange(null)
  }

  const startLocationUpdate = () => {
    // #ifdef APP
    if (data.providerList.length == 0) {
      uni.showToast({
        title: '未获取到provider，请确定基座中包含location功能',
        icon: "error"
      })
      console.log("未获取到provider，请确定基座中包含location功能")
      return
    }
    // #endif
    const currentProvider = data.providerList[data.currentSelectedProvider]
    // #ifdef WEB
    if (currentProvider == null) {
      data.log += `currentSelectedProvider = ${data.currentSelectedProvider} is undefined\n\n`
      return
    }
    // #endif
    uni.startLocationUpdate({
      provider: currentProvider.id,
      type: types.value[data.currentSelectedType].value,
      success: () => {
        if (data.logAble) {
          data.log += "开启startLocationUpdate成功, provider= " + currentProvider.id + '\n\n'
        }
        console.log("持续定位启动成功")
        data.startSuccess = true
      },
      fail: (err) => {
        if (data.logAble) {
          data.log += "启动startLocationUpdate失败：erroCode=" + err.errCode + '\n\n'
        }

        console.log("持续定位启动失败")
        data.startSuccess = false
        data.errCode = err.errCode
      }

    })
  }

  const startLocationUpdateBackground = () => {
    // #ifdef APP
    if (data.providerList.length == 0) {
      uni.showToast({
        title: '未获取到provider，请确定基座中包含location功能',
        icon: "error"
      })
      console.log("未获取到provider，请确定基座中包含location功能")
      return
    }
    // #endif
    const currentProvider = data.providerList[data.currentSelectedProvider]
    // #ifdef WEB
    if (currentProvider == null) {
      data.log += `currentSelectedProvider = ${data.currentSelectedProvider} is undefined\n\n`
      return
    }
    // #endif
    uni.startLocationUpdateBackground({
      provider: currentProvider.id,
      type: types.value[data.currentSelectedType].value,
      success: () => {
        if (data.logAble) {
          data.log += "开启startLocationUpdateBackground成功, provider= " + currentProvider.id + '\n\n'
        }
        console.log("后台持续定位api启动成功")
        data.startSuccess = true
      }, fail: (err) => {
        if (data.logAble) {
          data.log += "启动startLocationUpdateBackground失败：erroCode=" + err.errCode + '\n\n'
        }
        console.log("后台持续定位启动失败")
        data.startSuccess = false
        data.errCode = err.errCode
      }

    })
  }

  const stopLocationUpdate = () => {
    uni.stopLocationUpdate({
      success: () => {
        if (data.logAble) {
          data.log += "成功关闭stopLocationUpdate定位" + '\n\n'
        }
        console.log("成功关闭stopLocationUpdate定位")
        data.stopSuccess = true
      }
    })
  }

  onLoad(() => {
    // #ifdef APP
    getProvider()
    // #endif
  })

  onUnload(() => {
    uni.stopLocationUpdate({})
    uni.offLocationChange(null)
    uni.offLocationChangeError(null)
  })

  defineExpose({
    data,
    stopLocationUpdate
  })
</script>

<style>
  .uni-list {
    border-bottom: 0px;
    background-color: transparent;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .uni-list-cell {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .btnstyle {
    margin: 4px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |
