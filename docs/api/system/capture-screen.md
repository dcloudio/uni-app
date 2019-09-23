### uni.onUserCaptureScreen(CALLBACK)

监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件。
 
**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

**CALLBACK返回参数：**

无

**代码示例**

```javascript
uni.onUserCaptureScreen(function() {
    console.log('用户截屏了')
});
```
