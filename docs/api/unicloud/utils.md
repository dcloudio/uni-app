::: sourceCode
## onResponse(callback) @onresponse

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.onResponse

:::

监听响应事件

### onResponse 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 阿里云 3.9，腾讯云 3.91，支付宝云 3.98; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (arg: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| type | string | 是 | 响应事件类型 |
| name | string | 是 | 响应事件由哪个云函数触发 |
| content | any | 是 | 响应结果、错误内容 |






::: sourceCode
## offResponse(callback) @offresponse

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.offResponse

:::

移除响应事件监听

### offResponse 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 阿里云 3.9，腾讯云 3.91，支付宝云 3.98; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (arg: [UniCloudResponseEvent](#unicloudresponseevent-values)) => any | 是 | 

### UniCloudResponseEvent 的属性值 @unicloudresponseevent-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| type | string | 是 | 响应事件类型 |
| name | string | 是 | 响应事件由哪个云函数触发 |
| content | any | 是 | 响应结果、错误内容 |






::: sourceCode
## onRefreshToken(callback) @onrefreshtoken

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.onRefreshToken

:::

监听token刷新事件

### onRefreshToken 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 阿里云 3.9，腾讯云 3.91，支付宝云 3.98; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (arg: [UniCloudRefreshTokenEvent](#unicloudrefreshtokenevent-values)) => any | 是 | 

### UniCloudRefreshTokenEvent 的属性值 @unicloudrefreshtokenevent-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| token | string | 是 | token内容 |
| tokenExpired | number | 是 | token过期时间 |






::: sourceCode
## offRefreshToken(callback) @offrefreshtoken

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.offRefreshToken

:::

移除token刷新事件监听

### offRefreshToken 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 阿里云 3.9，腾讯云 3.91，支付宝云 3.98; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| callback | (arg: [UniCloudRefreshTokenEvent](#unicloudrefreshtokenevent-values)) => any | 是 | 

### UniCloudRefreshTokenEvent 的属性值 @unicloudrefreshtokenevent-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| token | string | 是 | token内容 |
| tokenExpired | number | 是 | token过期时间 |






::: sourceCode
## getCurrentUserInfo() @getcurrentuserinfo

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.getCurrentUserInfo

:::

获取token内缓存的用户信息

### getCurrentUserInfo 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 阿里云 3.9，腾讯云 3.91，支付宝云 3.98; iOS: 4.11; HarmonyOS: 4.61




### 返回值 

| 类型 |
| :- |
| **UniCloudUserInfo** |

#### UniCloudUserInfo 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| uid | string | 否 | 用户id |
| role | Array&lt;string&gt; | 是 | 用户角色列表 |
| permission | Array&lt;string&gt; | 是 | 用户权限列表 |
| tokenExpired | number | 是 | 用户token过期时间 | 




::: sourceCode
## connectWebSocket(options) @connectwebsocket

> issues: https://issues.dcloud.net.cn/?mid=api.unicloud.utils.connectWebSocket

:::

连接 WebSocket

### connectWebSocket 兼容性 <Help /> 
Web: 4.24; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 4.28; iOS: 4.24; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniCloudConnectWebSocketOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| name | string | 是 | WebSocket云函数/云对象名称 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 否 | 建立连接时需要传递的参数, 仅在 connection 事件中接收到 | 


### 返回值 

| 类型 |
| :- |
| SocketTask |
 



