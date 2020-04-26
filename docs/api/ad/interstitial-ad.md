### 插屏广告

插屏广告组件。插屏广告组件是一个原生组件，层级比普通组件高。插屏广告组件每次创建都会返回一个全新的实例，默认是隐藏的，需要调用 InterstitialAd.show() 将其显示。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|x|x|x|

uni.createInterstitialAd(Object object)

|属性|类型|必填|说明|
|:-:|:-:|:-:|:-:|
|adUnitId|string|是|广告单元 id，微信小程序2.6.0+|


#### 方法

`Promise InterstitialAd.show()`  
显示插屏广告。


`Promise InterstitialAd.load()`  
加载插屏广告。

`InterstitialAd.destroy()`  
销毁插屏广告实例。

`InterstitialAd.onLoad(function callback)`  
监听插屏广告加载事件。

`InterstitialAd.offLoad(function callback)`  
取消监听插屏广告加载事件

`InterstitialAd.onError(function callback)`  
监听插屏错误事件。

`InterstitialAd.offError(function callback)`  
取消监听插屏错误事件

`InterstitialAd.onClose(function callback)`  
监听插屏广告关闭事件。

`InterstitialAd.offClose(function callback)`  
取消监听插屏广告关闭事件
