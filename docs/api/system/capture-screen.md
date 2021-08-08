### uni.onUserCaptureScreen(CALLBACK)

监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件。
 
**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|√|

注：App没有内置截屏相关功能，可以在插件市场搜索相关插件，[详见](https://ext.dcloud.net.cn/search?q=%E6%88%AA%E5%B1%8F)

**CALLBACK返回参数：**

无

**代码示例**

```javascript
uni.onUserCaptureScreen(function() {
    console.log('用户截屏了')
});
```
