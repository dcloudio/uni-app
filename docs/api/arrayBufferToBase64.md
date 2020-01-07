## uni.arrayBufferToBase64(arrayBuffer)

将 ArrayBuffer 对象转成 Base64 字符串

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|x|x|x|

**参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|arrayBuffer|ArrayBuffer|是|要转换成 Base64 字符串的 ArrayBuffer 对象|

**示例**

```javascript
const arrayBuffer = new Uint8Array([55, 55, 55])
const base64 = uni.arrayBufferToBase64(arrayBuffer)
```