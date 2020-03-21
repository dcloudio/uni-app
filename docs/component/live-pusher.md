#### live-pusher

实时音视频录制，也称直播推流。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√(仅nvue)|x|√|x|x|x|x|

如app平台的vue页面需要支持直播推流，需编写条件编译代码，使用 `plus.video.LivePusher`，[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)

使用nvue做直播，比使用vue的优势有：
1. nvue可一套代码直接编译到App和微信
2. nvue的cover-view比vue的cover-view更强大，在视频上绘制元素更容易。如果只考虑App端的话，不用cover-view，任意组件都可以覆盖live-pusher组件，因为nvue没有层级问题。
3. 若需要视频内嵌在swiper里上下滑动（类抖音、映客首页模式），App端只有nvue才能实现
当然nvue相比vue的坏处是css写法受限，如果只开发微信小程序，不考虑App，那么使用vue页面也是一样的。


**参数说明**

设置live-pusher组件的推流地址，推流视频模式等。

属性|类型 |默认值|必填|说明|平台差异说明|
:--|:--|:--|:--|:--|:--|
url|string| |是|推流地址，支持RTMP协议。|
mode |string|SD|否|推流视频模式，可取值：SD（标清）, HD（高清）, FHD（超清）。|
aspect |string|3:2|否|视频宽高比例|
muted|Boolean|false|否|是否静音。|
enable-camera|Boolean|true|否|开启摄像头。|
auto-focus|Boolean|true|否|自动聚集。|
beauty|Number|0|否|美颜，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。|
whiteness|Number|0|否|美白，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。|
orientation|String|"vertical"|否|画面方向|
beauty|number|0|否|美颜，取值范围 0-9 ，0 表示关闭|
whiteness|number|0|否|美白，取值范围 0-9 ，0 表示关闭|
min-bitrate|Number|200|否|最小码率。|
max-bitrate|Number|1000|否|最大码率。|
audio-quality|string|high|否|高音质(48KHz)或低音质(16KHz)，值为high, low|微信小程序1.7.0
waiting-image|string||否|进入后台时推流的等待画面|微信小程序1.7.0
waiting-image-hash|string||否|等待画面资源的MD5值|微信小程序1.7.0
zoom|boolean|false|否|调整焦距|微信小程序2.1.0
device-position|string|front|否|前置或后置，值为front, back|微信小程序2.3.0
background-mute|boolean|false|否|进入后台时是否静音|微信小程序1.7.0
remote-mirror|boolean|false|否|设置推流画面是否镜像，产生的效果在 live-player 反应到|微信小程序2.10.0
local-mirror|string|auto|否|控制本地预览画面是否镜像|微信小程序2.10.0
audio-reverb-type|number|0|否|音频混响类型|微信小程序2.10.0
enable-mic|boolean|true|否|开启或关闭麦克风|微信小程序2.10.0
enable-agc|boolean|false|否|是否开启音频自动增益|微信小程序2.10.0
enable-ans|boolean|false|否|是否开启音频噪声抑制|微信小程序2.10.0
audio-volume-type|string|voicecall|否|音量类型|微信小程序2.10.0
@statechange|EventHandle|||状态变化事件，detail = {code}|
@netstatus|EventHandle|||网络状态通知，detail = {info}|
@error|EventHandle|||渲染错误事件，detail = {errMsg, errCode}|
@bgmstart|EventHandle|||背景音开始播放时触发|微信小程序2.4.0
@bgmprogress|EventHandle|||背景音进度变化时触发，detail = {progress, duration}|微信小程序2.4.0
@bgmcomplete|EventHandle|||背景音播放完成时触发|微信小程序2.4.0


orientation 的合法值

|值|说明|
|:-|:-|
|vertical|竖直|
|horizontal|水平|


local-mirror 的合法值

|值|说明|
|:-|:-|
|auto|前置摄像头镜像，后置摄像头不镜像|
|enable|前后置摄像头均镜像|
|disable|前后置摄像头均不镜像|


audio-reverb-type 的合法值

|值|说明|
|:-|:-|
|0|关闭|
|1|KTV|
|2|小房间|
|3|大会堂|
|4|低沉|
|5|洪亮|
|6|金属声|
|7|磁性|


audio-volume-type 的合法值

|值|说明|
|:-|:-|
|media|媒体音量|
|voicecall|通话音量|

网络状态数据（info）安卓

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

网络状态数据（info）iOS

参数|类型 |说明
:--|:--|:--|
code|Number|  code码
message|string| 具体的网络状态信息


```html
<template>
    <view>
        <live-pusher id='livePusher1' ref="livePusher" class="livePusher" url=""
        mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"
        ></live-pusher>
        <button class="btn" @click="start">开始推流</button>
        <button class="btn" @click="pause">暂停推流</button>
        <button class="btn" @click="resume">resume</button>
        <button class="btn" @click="stop">停止推流</button>
        <button class="btn" @click="snapshot">快照</button>
        <button class="btn" @click="startPreview">开启摄像头预览</button>
        <button class="btn" @click="stopPreview">关闭摄像头预览</button>
        <button class="btn" @click="switchCamera">切换摄像头</button>
    </view>
</template>
```

```javascript
<script>
    export default {
        data: {
            fil: true
        },
        onReady() {
            // 注意：需要在onReady中 或 onLoad 延时
            this.context = uni.createLivePusherContext("livePusher", this);
        },
        methods: {
            statechange(e) {
                console.log("statechange:" + JSON.stringify(e));
            },
            netstatus(e) {
                console.log("netstatus:" + JSON.stringify(e));
            },
            error(e) {
                console.log("error:" + JSON.stringify(e));
            },
            start: function() {
                this.context.start({
                    success: (a) => {
                        console.log("livePusher.start:" + JSON.stringify(a));
                    }
                });
            },
            close: function() {
                this.context.close({
                    success: (a) => {
                        console.log("livePusher.close:" + JSON.stringify(a));
                    }
                });
            },
            snapshot: function() {
                this.context.snapshot({
                    success: (e) => {
                        console.log(JSON.stringify(e));
                    }
                });
            },
            resume: function() {
                this.context.resume({
                    success: (a) => {
                        console.log("livePusher.resume:" + JSON.stringify(a));
                    }
                });
            },
            pause: function() {
                this.context.pause({
                    success: (a) => {
                        console.log("livePusher.pause:" + JSON.stringify(a));
                    }
                });
            },
            stop: function() {
                this.context.stop({
                    success: (a) => {
                        console.log(JSON.stringify(a));
                    }
                });
            },
            switchCamera: function() {
                this.context.switchCamera({
                    success: (a) => {
                        console.log("livePusher.switchCamera:" + JSON.stringify(a));
                    }
                });
            },
            startPreview: function() {
                this.context.startPreview({
                    success: (a) => {
                        console.log("livePusher.startPreview:" + JSON.stringify(a));
                    }
                });
            },
            stopPreview: function() {
                this.context.stopPreview({
                    success: (a) => {
                        console.log("livePusher.stopPreview:" + JSON.stringify(a));
                    }
                });
            }
        }
    }
</script>
```

相关api：[uni.createLivePusherContext](/api/media/live-pusher-context?id=createLivePusherContext)



**注意**

* live-pusher 是原生组件，在小程序端层级高于前端组件，需使用cover-view覆盖。在低版本微信中，live-pusher无法内嵌于 scroll-view、swiper、picker-view、movable-view 中。在App端的nvue文件中，live-pusher没有这类限制。
* App平台：使用 `<live-pusher/>` 组件，打包 App 时必须勾选 manifest.json->App 模块权限配置->LivePusher(直播推流) 模块。
