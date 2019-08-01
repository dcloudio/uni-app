#### live-player

**注意：仅微信基础库 1.7.0+ 开始支持，5+App不支持**

实时音视频播放。

暂只针对如下类目开放，需要先通过类目审核，再在小程序管理后台，“设置”-“接口设置”中自助开通该组件权限。

|一级类目	|二级类目																																			|
|---|---|
|社交			|直播																																					|
|教育			|在线教育																																			|
|医疗			|互联网医院，公立医院																													|
|政务民生	|所有二级类目																																	|
|金融			|基金、信托、保险、银行、证券/期货、非金融机构自营小额贷款、征信业务、消费金融|

|属性名								|类型				|默认值			|说明																						|最低版本				|
|---------------			|-----			|----------	|----------------------------------							|--------------	|
|src									|String			|						|音视频地址。目前仅支持 flv, rtmp 格式					|								|
|mode									|String			|live				|live（直播），RTC（实时通话）									|								|
|autoplay							|Boolean		|false			|自动播放																				|								|
|muted								|Boolean		|false			|是否静音																				|								|
|orientation					|String			|vertical		|画面方向，可选值有 vertical，horizontal				|								|
|object-fit						|String			|contain		|填充模式，可选值有 contain，fillCrop						|								|
|background-mute			|Boolean		|false			|进入后台时是否静音															|								|
|min-cache						|Number			|1					|最小缓冲区，单位s															|								|
|max-cache						|Number			|3					|最大缓冲区，单位s															|								|
|@statechange			|EventHandle|						|播放状态变化事件，detail = {code}							|								|
|@fullscreenchange	|EventHandle|						|全屏变化事件，detail = {direction, fullScreen}	|								|
|@netstatus				|EventHandle|						|网络状态通知，detail = {info}									|1.9.0					|

**注意：**

* ``<live-player>`` 默认宽度300px、高度225px，可通过wxss设置宽高。
* 开发者工具上暂不支持。
* 相关api：uni.createLivePlayerContext

状态码

|代码	|说明																											|
|---|---|
|2001	|已经连接服务器																						|
|2002	|已经连接服务器,开始拉流																	|
|2003	|网络接收到首个视频数据包(IDR)														|
|2004	|视频播放开始																							|
|2005	|视频播放进度																							|
|2006	|视频播放结束																							|
|2007	|视频播放Loading																					|
|2008	|解码器启动																								|
|2009	|视频分辨率改变																						|
|-2301|网络断连，且经多次重连抢救无效，更多重试请自行重启播放		|
|-2302|获取加速拉流地址失败																			|
|2101	|当前视频帧解码失败																				|
|2102	|当前音频帧解码失败																				|
|2103	|网络断连, 已启动自动重连																	|
|2104	|网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀	|
|2105	|当前视频播放出现卡顿																			|
|2106	|硬解启动失败，采用软解																		|
|2107	|当前视频帧不连续，可能丢帧																|
|2108	|当前流硬解第一个I帧失败，SDK自动切软解										|
|3001	|RTMP -DNS解析失败																				|
|3002	|RTMP服务器连接失败																				|
|3003	|RTMP服务器握手失败																				|
|3005	|RTMP 读/写失败																						|

网络状态数据

|键名					|说明																									|
|---|---|
|videoBitrate	|当前视频编/码器输出的比特率，单位 kbps								|
|audioBitrate	|当前音频编/码器输出的比特率，单位 kbps								|
|videoFPS			|当前视频帧率																					|
|videoGOP			|当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s	|
|netSpeed			|当前的发送/接收速度																	|
|netJitter		|网络抖动情况，抖动越大，网络越不稳定									|
|videoWidth		|视频画面的宽度																				|
|videoHeight	|视频画面的高度																				|
**代码示例**
 
 ```html
<live-player src="https://domain/pull_stream" mode="RTC" autoplay @statechange="statechange" @error="error" style="width: 300px; height: 225px;" />
 ```
 
 ```javascript
export default {
  methods:{
    statechange(e) {
      console.log('live-player code:', e.detail.code)
    },
    error(e) {
        console.error('live-player error:', e.detail.errMsg)
    }
  }
}
 ```
 
 Bug & Tip
1. tip: ```live-player``` 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 ```z-index``` 控制层级。可使用 ```cover-view``` ```cover-image```覆盖在上面。
2. tip: 请勿在 ```scroll-view```、```swiper```、```picker-view```、```movable-view``` 中使用 ```live-player``` 组件。
3. tip: css 动画对 ```live-player``` 组件无效。