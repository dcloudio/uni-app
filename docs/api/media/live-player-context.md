### uni.createLivePlayerContext(livePlayerId, this)
创建 live-player 上下文 livePlayerContext 对象。注意是直播的播放而不是推流。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|见下|x|√|x|√|x|√|x|

App平台的直播播放，不使用此API，而直接使用video的API。

**参数说明**

|参数|说明|平台差异说明|
|:-:|:-:|:-:|
|livePlayerId|``<live-player>`` 组件 id||
|this|在自定义组件下，当前组件实例的 this，以操作组件内 ``<live-player>`` 组件|微信小程序|

**livePlayerContext 对象的方法列表：**

|方法|参数|说明|
|:-|:-|:-|
|play|Object|播放|
|stop|Object|停止|
|mute|Object|静音|
|pause|Object|暂停|
|resume|Object|恢复|
|requestFullScreen|Object|进入全屏|
|exitFullScreen|Object|退出全屏|

**requestFullScreen 的 Object 参数列表：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|direction|Number|是|设置全屏时的方向，有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）。|
|success|Function|否|接口调用成功的回调函数。|
|fail|Function|否|接口调用失败的回调函数。|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）。|

**其他方法的 Object 参数列表：**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|



### uni.createLivePusherContext(livePusherId, this)
创建 live-pusher 上下文 livePusherContext 对象。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|见下|x|√|x|x|x|√|x|

- app-nvue 平台 2.2.5+ 支持 uni.createLivePusherContext(livePusherId, this)
- app-nvue 平台 2.2.5以下，需要同时设置组件属性id和ref ``<live-pusher id="livepusher1" ref="livepusher1"></live-pusher>``，或者直接使用 ref，例如 ``this.$refs.livepusher1``
- app-vue 平台，需要编写条件编译代码，使用 `plus.video.LivePusher`，[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)

#### livePusherContext
#### start(OBJECT)
> 开始推流

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### pause(OBJECT)
> 暂停推流

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### resume(OBJECT)
> 恢复推流

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|


#### stop(OBJECT)
> 停止推流

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### switchCamera(OBJECT)
> 切换前后摄像头

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### snapshot(OBJECT)
> 快照

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### startPreview(OBJECT)
> 开启摄像头预览

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

#### stopPreview(OBJECT)
> 关闭摄像头预览

|属性|类型|必填|说明|
|:--|:--|:--|:--|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|
