### uni.createLivePlayerContext(livePlayerId, this)
创建 live-player 上下文 livePlayerContext 对象。注意是直播的播放而不是推流。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|见下|x|√|x|√|x|√|

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

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|见下|x|√|x|x|x|√|

- app-nvue 平台 2.2.5+ 支持 uni.createLivePusherContext(livePusherId, this)
- app-nvue 平台 2.2.5以下，需要同时设置组件属性id和ref ``<live-pusher id="livepusher1" ref="livepusher1"></live-pusher>``，或者直接使用 ref，例如 ``this.$refs.livepusher1``
- app-vue 平台，需要编写条件编译代码，使用 `plus.video.LivePusher`，[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)

使用nvue做直播，比使用vue的优势有：
1. nvue可一套代码直接编译到App和微信
2. nvue的cover-view比vue的cover-view更强大，在视频上绘制元素更容易。如果只考虑App端的话，不用cover-view，任意组件都可以覆盖live-pusher组件
3. 若需要视频内嵌在swiper里上下滑动（类抖音、映客首页模式），App端只有nvue才能实现
当然nvue相比vue的坏处是css写法受限，如果只开发微信小程序，不考虑App，那么使用vue页面也是一样的。

**参数说明**

设置live-pusher组件的推流地址，推流视频模式等。

属性|类型 |默认值|必填|说明
:--|:--|:--|:--|:--|
url|string| |是|推流地址，支持RTMP协议。
mode |string| |否|推流视频模式，可取值：SD（标清）, HD（高清）, FHD（超清）。
muted|Boolean|false|否|是否静音。
enable-camera|Boolean|true|否|开启摄像头。
auto-focus|Boolean|true|否|自动聚集。
beauty|Number|0|否|美颜，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。
whiteness|Number|0|否|美白，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。


#### API
#### start(callback)
> 开始推流

##### callback 返回 Object 参数说明
属性|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### pause(callback)
> 暂停推流

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### resume(callback)
> 恢复推流

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败


#### stop(callback)
> 停止推流

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### switchCamera(callback)
> 切换前后摄像头

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### snapshot(callback)
> 快照

#####  callback 返回 Object 参数说明
##### 成功时的回调
参数|类型 |说明
:--|:--|:--|
type|string|"success" 表示成功, "fail" 表示失败
code|Number| 对应code码
message|object|{width:"快照图片宽度",height:"快照图片高度",tempImagePath:"快照图片路径"}。

##### 失败的回调
参数|类型 |说明
:--|:--|:--|
type|string|"fail" 表示失败
code|Number|
message|object|


#### startPreview(callback)
> 开启摄像头预览

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### stopPreview(callback)
> 关闭摄像头预览

##### callback 返回 Object 参数说明
参数|类型 |说明
:--|:--|:--|
type | String | "success" 表示成功， "fail" 表示失败

#### 事件

#### statechange
> 状态变化事件

#####  返回参数（detail）的详细说明
参数|类型|说明
:--|:--|:--|
code|Number|
message|string|


#### netstatus
> 网络状态通知事件

#####  安卓 返回参数（detail）的详细说明
键名|说明
:--|:--|
videoBitrate | 当前视频编/码器输出的比特率，单位 kbps
audioBitrate | 当前音频编/码器输出的比特率，单位 kbps
videoFPS | 当前视频帧率
videoGOP | 当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s
netSpeed | 当前的发送/接收速度
netJitter | 网络抖动情况，抖动越大，网络越不稳定
videoWidth | 视频画面的宽度
videoHeight | 视频画面的高度

##### iOS 返回参数（detail）的详细说明
参数|类型 |说明
:--|:--|:--|
code|Number| code码
message|string| 具体的网络状态信息


#### error
> 渲染错误事件

#####  返回参数（detail）的详细说明
参数|类型 |说明
:--|:--|:--|
errCode|Number|
errMsg|string|
