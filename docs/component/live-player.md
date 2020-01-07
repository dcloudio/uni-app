#### live-player

实时音视频播放，也称直播拉流。

使用live-player 组件需注意：如果发布到小程序，需要先通过各家小程序的审核。指定类目的小程序才能使用（[微信小程序类目](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)、[百度小程序类目](https://smartprogram.baidu.com/docs/develop/component/media/#live-player/)），审核通过后在各家小程序管理后台自助开通该组件权限。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x(见下)|x|√|x|√|x|√|

- App的实时音视频播放，不是使用 live-player，而是直接使用 video 组件。
- H5 下可用 video 播放符合 HTML5 规范的流媒体，rtmp 等非 HTML5 标准的流媒体格式，仅在部分支持 flash 的国内手机浏览器上可播放。在 pc 浏览器上，需要安装 flash 插件才能播放 rtmp 等格式。


**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-:|:-:|:-:|:-:|:-:|
|id|String||live-player 属性的唯一标志符||
|src|String||音视频地址。百度小程序支持 m3u8 格式；微信小程序支持 flv, rtmp 格式||
|mode|String|live|live（直播），RTC（实时通话，该模式时延更低）|微信小程序|
|autoplay|Boolean|false|自动播放||
|muted|Boolean|false|是否静音||
|orientation|String|vertical|画面方向，可选值有 vertical，horizontal||
|object-fit|String|contain|填充模式，可选值:contain、fillCrop||
|background-mute|Boolean|false|进入后台时是否静音||
|min-cache|Number|1|最小缓冲区，单位s||
|max-cache|Number|3|最大缓冲区，单位s||
|@statechange|EventHandle||播放状态变化事件，detail = {code}||
|@netstatus|EventHandle||网络状态通知，detail = {info}||
|@fullscreenchange|EventHandle||全屏变化事件，detail = {direction, fullScreen}。|&nbsp;|

**Tips**

* 百度小程序 iOS 端不支持设置 orientation 属性；
* 微信小程序已废弃 background-mute 属性，默认为进入后台静音；
* live-player 默认宽度 300px、高度 225px；
* live-player 是原生组件，层级高于前端组件，请勿在 scroll-view、swiper、picker-view、movable-view 中使用
* 小程序下覆盖live-player需要使用cover-view。[详见](/component/native-component)
* live-player 组件相关 JS API：[createLivePlayerContext](/api/media/live-player-context)
* 小程序平台使用live-player有审核限制，请注意参考各家文档，


**状态码**

|代码|说明|
|---|---|
|2001|已经连接服务器|
|2002|已经连接服务器,开始拉流|
|2003|网络接收到首个视频数据包(IDR)|
|2004|视频播放开始|
|2005|视频播放进度|
|2006|视频播放结束|
|2007|视频播放Loading|
|2008|解码器启动|
|2009|视频分辨率改变|
|-2301|网络断连，且经多次重连抢救无效，更多重试请自行重启播放|
|-2302|获取加速拉流地址失败|
|2101|当前视频帧解码失败|
|2102|当前音频帧解码失败|
|2103|网络断连, 已启动自动重连|
|2104|网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀|
|2105|当前视频播放出现卡顿|
|2106|硬解启动失败，采用软解|
|2107|当前视频帧不连续，可能丢帧|
|2108|当前流硬解第一个I帧失败，SDK自动切软解|
|3001|RTMP -DNS解析失败|
|3002|RTMP服务器连接失败|
|3003|RTMP服务器握手失败|
|3005|RTMP 读/写失败|

**网络状态数据**

|键名|说明|
|---|---|
|videoBitrate|当前视频编/码器输出的比特率，单位 kbps|
|audioBitrate|当前音频编/码器输出的比特率，单位 kbps|
|videoFPS|当前视频帧率|
|videoGOP|当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s|
|netSpeed|当前的发送/接收速度|
|netJitter|网络抖动情况，抖动越大，网络越不稳定|
|videoWidth|视频画面的宽度|
|videoHeight|视频画面的高度|

**示例**

```html
<live-player
  src="https://domain/pull_stream"
  autoplay
  @statechange="statechange"
  @error="error"
  style="width: 300px; height: 225px;"
/>
```

```javascript
export default {
    methods:{
        statechange(e){
            console.log('live-player code:', e.detail.code)
        },
        error(e){
            console.error('live-player error:', e.detail.errMsg)
        }
    }
}
```
