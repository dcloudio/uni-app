### uni.navigateToMiniProgram(OBJECT)

打开另一个小程序。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|x|

**OBJECT 参数说明**

|属性|类型|默认值|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|appId|string||是|要打开的小程序 appId（百度小程序则填写App Key）||
|path|string||否|打开的页面路径，如果为空则打开首页||
|extraData|object||否|需要传递给目标小程序的数据，目标小程序可在 ``App.vue `` 的 `onLaunch`或`onShow` 中获取到这份数据。||
|envVersion|string|release|否|要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版）。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。|支付宝小程序、微信小程序|
|success|function||否|接口调用成功的回调函数||
|fail|function||否|接口调用失败的回调函数||
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**示例代码**

```js
uni.navigateToMiniProgram({
  appId: '',
  path: 'pages/index/index?id=123',
  extraData: {
    'data1': 'test'
  },
  success(res) {
    // 打开成功
  }
})
```

### uni.navigateBackMiniProgram(OBJECT)

跳转回上一个小程序，只有当另一个小程序跳转到当前小程序时才会能调用成功。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|x|

**OBJECT参数说明**

|属性|类型|必填|说明|
|:-|:-|:-|:-|
|extraData|Object|否|需要返回给上一个小程序的数据，上一个小程序可在 ``App.vue `` 的 `onShow` 中获取到这份数据|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|
**示例代码**
```js
uni.navigateBackMiniProgram({
  extraData: {
    'data1': 'test'
  },
  success(res) {
    // 返回成功
  }
})
```