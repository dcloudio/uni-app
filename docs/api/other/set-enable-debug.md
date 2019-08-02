### uni.setEnableDebug(OBJECT)

设置是否打开调试开关。此开关对正式版也能生效。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|

**OBJECT说明**

| 属性 | 类型 | 必填 | 说明 |平台差异说明|
| --- | --- | --- | --- | --- |
| enableDebug | boolean| 是 | 是否打开调试 ||
| success | function| 否 | 接口调用成功的回调函数 |微信小程序|
| fail | function| 否 | 接口调用失败的回调函数 |微信小程序|
| complete | function| 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |微信小程序|

#### 示例代码
```js
// 打开调试
uni.setEnableDebug({
    enableDebug: true
})
// 关闭调试
uni.setEnableDebug({
    enableDebug: false
})
```
