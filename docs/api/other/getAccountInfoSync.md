
#### uni.getAccountInfoSync()

获取当前帐号信息，可以返回小程序的Appid。如果使用了微信小程序的云端插件，还可以反馈插件的id和版本

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

**返回值**

**Object**

帐号信息

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| miniProgram | Object| 小程序帐号信息 |
| plugin | Object | 插件帐号信息（仅在插件中调用时包含这一项） |
| appName | string| 智能小程序名称 (仅百度小程序支持) |
| lastAppURL | string| 智能小程序最近一次打开的调起协议 (仅百度小程序支持) |
| scheme | string| 调起协议的协议头 (仅百度小程序支持) |


**miniProgram 的结构**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| appId | string | 小程序 appId |


**plugin 的结构**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| appId | string | 插件 appId (百度小程序不支持) |
| version | string | 插件版本号 |


**示例代码**

```js
const accountInfo = uni.getAccountInfoSync();
console.log(accountInfo.miniProgram.appId); // 小程序 appId
console.log(accountInfo.plugin.appId); // 插件 appId
console.log(accountInfo.plugin.version); // 插件版本号， 'a.b.c' 这样的形式
```
