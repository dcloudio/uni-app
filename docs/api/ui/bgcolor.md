### uni.setBackgroundColor(OBJECT)

动态设置窗口的背景色。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

**参数说明**

|属性|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|backgroundColor|String||否|窗口的背景色，必须为十六进制颜色值|
|backgroundColorTop|String||否|顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持|
|backgroundColorBottom|String||否|底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持|
|success|Function||否|接口调用成功的回调函数|
|fail|Function||否|接口调用失败的回调函数|
|complete|Function||否|接口调用结束的回调函数（调用成功、失败都会执行）|

**代码示例**

```javascript
uni.setBackgroundColor({
    backgroundColor: '#ffffff',
    backgroundColorTop: '#222222',
    backgroundColorBottom: '#333333'
});
```

### uni.setBackgroundTextStyle(OBJECT)

动态设置下拉背景字体、loading 图的样式。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

**参数说明**

|属性|类型|必填|说明|
|:-|:-|:-|:-|
|textStyle|String|是|下拉背景字体、loading 图的样式，值为：dark、light|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**代码示例**

```javascript
uni.setBackgroundTextStyle({
  textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
})
```
