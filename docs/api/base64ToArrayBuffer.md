## uni.base64ToArrayBuffer(base64)

将 Base64 字符串转成 ArrayBuffer 对象

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|x|x|x|

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|base64|String|是|要转化成 ArrayBuffer 对象的 Base64 字符串|

**示例**

```javascript
const base64 = 'test'
const arrayBuffer = uni.base64ToArrayBuffer(base64)
```