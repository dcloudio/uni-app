### uni.createCameraContext()
创建并返回 camera 组件的上下文 cameraContext 对象。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|√|

本API为 camera 组件配套的js API，与 camera 组件的平台兼容性相同，可实现非全屏摄像头。App端可通过[plus.camera](https://www.html5plus.org/doc/zh_cn/camera.html)实现全屏摄像头。

**cameraContext 对象的方法列表**

|方法|参数|说明|
|:-|:-|:-|
|takePhoto|Object|拍照，可指定质量，成功则返回图片路径。|
|startRecord|Object|开始录像|
|stopRecord|Object|结束录像，成功则返回封面与视频。|
|onCameraFrame|Function|获取 Camera 实时帧数据。仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/CameraContext.onCameraFrame.html)|

**takePhoto 的 Object 参数列表：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|quality|String|否|成像质量，值为high（高质量）、normal（普通质量）、low（低质量），默认normal。|
|success|Function|否|接口调用成功的回调函数 ，返回照片文件的临时路径，res = { tempImagePath }。|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**startRecord 的 Object 参数列表：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|timeoutCallback|Function|否|接超过30s或页面 onHide 时会结束录像|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**stopRecord 的 Object 参数列表：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数 ，返回封面与视频的临时路径，res = { tempThumbPath, tempVideoPath }。|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**注意**

- App下实现OCR等证件识别等需求，可在插件市场获取原生插件，[https://ext.dcloud.net.cn/plugin?id=135](https://ext.dcloud.net.cn/plugin?id=135)
- 微信小程序下实现OCR等证件识别等需求，插件市场也有封装，搜索 [ocr](https://ext.dcloud.net.cn/search?q=ocr) 可见。
- 可以通过用户授权API来判断用户是否给应用授予摄像头的访问权限[https://uniapp.dcloud.io/api/other/authorize](https://uniapp.dcloud.io/api/other/authorize)
