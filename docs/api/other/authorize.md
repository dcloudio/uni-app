### uni.authorize(OBJECT)

提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
 
**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|√|
 
**OBJECT 参数说明**

|参数|类型|必填|说明|
|---|---|---|---|
|scope|String|是|需要获取权限的 scope，详见 scope 列表。|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

##### scope 列表

|scope|对应接口|描述	|平台差异说明|
|---|---|---|---|
|scope.userInfo	|[uni.getUserInfo](/api/plugins/login?id=getuserinfo)	|用户信息||
|scope.userLocation|[uni.getLocation](/api/location/location?id=getlocation), [uni.chooseLocation](/api/location/location?id=chooselocation)	|地理位置||
|scope.userLocationBackground|wx.userLocationBackground|后台定位|微信小程序|
|scope.address	|[uni.chooseAddress](/api/other/choose-address)	|通信地址||
|scope.record	|[uni.getRecorderManager](/api/media/record-manager?id=getrecordermanager)	|录音功能||
|scope.writePhotosAlbum	|[uni.saveImageToPhotosAlbum](/api/media/image?id=saveimagetophotosalbum), [uni.saveVideoToPhotosAlbum](/api/media/video?id=savevideotophotosalbum)	|保存到相册|头条小程序的返回值是scope.album|
|scope.camera	|[``<camera />``](/component/camera) 组件，头条下的扫码、拍照、选择相册	|摄像头	||
|scope.invoice	|[wx.chooseInvoice](https://developers.weixin.qq.com/miniprogram/dev/api/wx.chooseInvoice.html)	|获取发票|微信小程序、QQ小程序|
|scope.invoiceTitle|[uni.chooseInvoiceTitle](/api/other/invoice-title)		|发票抬头|微信小程序、百度小程序、QQ小程序|
|scope.werun	|[wx.getWeRunData](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getWeRunData.html)	|微信运动步数	|微信小程序|


**代码示例**

```javascript
uni.authorize({
    scope: 'scope.userLocation',
    success() {
        uni.getLocation()
    }
})
```
