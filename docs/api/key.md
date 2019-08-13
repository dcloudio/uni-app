#### uni.hideKeyboard()

隐藏软键盘

隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|x|x|√|


#### uni.onKeyboardHeightChange(CALLBACK)

监听键盘高度变化

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|HBuilderX 2.2.2+|x|基础库2.7+|x|x|x|√|

**CALLBACK 返回参数**

|参数|类型|说明|
|:-|:-|:-|
|height|Number|键盘高度|

**示例代码**

```js
uni.onKeyboardHeightChange(res => {
  console.log(res.height)
})
```
