## onResponse(callback) @onresponse

监听响应事件

### onResponse 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (UniCloudResponseEvent: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | - | - | - | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | - | 响应事件类型 |
| name | string | 是 | - | - | 响应事件由哪个云函数触发 |
| content | any | 是 | - | - | 响应结果、错误内容 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.onResponse)

## offResponse(callback) @offresponse

移除响应事件监听

### offResponse 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (UniCloudResponseEvent: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | - | - | - | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | - | 响应事件类型 |
| name | string | 是 | - | - | 响应事件由哪个云函数触发 |
| content | any | 是 | - | - | 响应结果、错误内容 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.offResponse)

## onRefreshToken(callback) @onrefreshtoken

监听token刷新事件

### onRefreshToken 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (UniCloudResponseEvent: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | - | - | - | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | - | 响应事件类型 |
| name | string | 是 | - | - | 响应事件由哪个云函数触发 |
| content | any | 是 | - | - | 响应结果、错误内容 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.onRefreshToken)

## offRefreshToken(callback) @offrefreshtoken

移除token刷新事件监听

### offRefreshToken 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (UniCloudResponseEvent: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | - | - | - | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | - | 响应事件类型 |
| name | string | 是 | - | - | 响应事件由哪个云函数触发 |
| content | any | 是 | - | - | 响应结果、错误内容 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.offRefreshToken)

## getCurrentUserInfo() @getcurrentuserinfo

获取token内缓存的用户信息

### getCurrentUserInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 阿里云 3.9，腾讯云 3.91，支付宝云 3.98 | 4.11 | 4.61 | - |




### 返回值 

| 类型 |
| :- |
| **UniCloudUserInfo** |

#### UniCloudUserInfo 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| uid | string | 否 | - | - | 用户id |
| role | Array&lt;string&gt; | 是 | - | - | 用户角色列表 |
| permission | Array&lt;string&gt; | 是 | - | - | 用户权限列表 |
| tokenExpired | number | 是 | - | - | 用户token过期时间 | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.getCurrentUserInfo)

## connectWebSocket() @connectWebSocket

连接 WebSocket

### connectWebSocket 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.24 | 4.41 | 4.28 | 4.24 | 4.61 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniCloudConnectWebSocketOptions** | 是 | - | - | - |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | - | WebSocket云函数/云对象名称 |
| query | any | 否 | - | Web: x; 微信小程序: 4.41; Android: 4.71; iOS: 4.71; HarmonyOS: x; HarmonyOS(Vapor): - | 建立连接时需要传递的参数, 仅在 connection 事件中接收到 | 


### 返回值 

| 类型 |
| :- |
| SocketTask |
 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.unicloud.utils.connectWebSocket)
