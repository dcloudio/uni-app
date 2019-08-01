#### live-pusher

**注意：仅微信基础库 1.7.0+支持，5+App不支持**

实时音视频录制。

需要用户授权 scope.camera、scope.record

暂只针对如下类目开放，需要先通过类目审核，再在小程序管理后台，“设置”-“接口设置”中自助开通该组件权限。

|一级类目	|二级类目																																			|
|---|---|
|社交			|直播																																					|
|教育			|在线教育																																			|
|医疗			|互联网医院，公立医院																													|
|政务民生	|所有二级类目																																	|
|金融			|基金、信托、保险、银行、证券/期货、非金融机构自营小额贷款、征信业务、消费金融|

|属性名						|类型				|默认值			|说明																									|最低版本				|
|---------------	|-----			|----------	|----------------------------------										|--------------	|
|url							|String			|						|推流地址。目前仅支持 flv, rtmp 格式									|								|
|mode							|String			|RTC				|SD（标清）, HD（高清）, FHD（超清）, RTC（实时通话）	|								|
|autopush					|Boolean		|false			|自动推流																							|								|
|muted						|Boolean		|false			|是否静音																							|								|
|enable-camera		|Boolean		|true				|开启摄像头																						|								|
|auto-focus				|Boolean		|true				|自动聚集																							|								|
|orientation			|String			|vertical		|vertical，horizontal																	|								|
|beauty						|Number			|0					|美颜																									|								|
|whiteness				|Number			|0					|美白																									|								|
|aspect						|String			|9:16				|宽高比，可选值有 3:4, 9:16														|								|
|min-bitrate			|Number			|200				|最小码率																							|								|
|max-bitrate			|Number			|1000				|最大码率																							|								|
|waiting-image		|String			|						|进入后台时推流的等待画面															|								|
|waiting-image-md5|String			|						|等待画面资源的MD5值																	|								|
|background-mute	|Boolean		|false			|进入后台时是否静音																		|								|
|@statechange	|EventHandle|						|状态变化事件，detail = {code}												|								|
|@netstatus		|EventHandle|						|网络状态通知，detail = {info}												|1.9.0					|
|@error				|EventHandle|						|渲染错误事件，detail = {errMsg, errCode}							|1.7.4					|

**注意：**

* ```<live-player>``` 默认宽度为100%、无默认高度，请通过wxss设置宽高。
* 开发者工具上暂不支持。
* 相关api：```uni.createLivePusherContext```

错误码(errCode)

|代码	|说明								|
|---|---|
|1001	|用户禁止使用摄像头	|
|1002	|用户禁止使用录音		|

状态码(code)

|代码	|说明																											|
|---	|---																											|
|1001	|已经连接推流服务器																				|
|1002	|已经与服务器握手完毕,开始推流														|
|1003	|打开摄像头成功																						|
|1004	|录屏启动成功																							|
|1005	|推流动态调整分辨率																				|
|1006	|推流动态调整码率																					|
|1007	|首帧画面采集完成																					|
|1008	|编码器启动																								|
|-1301|打开摄像头失败																						|
|-1302|打开麦克风失败																						|
|-1303|视频编码失败																							|
|-1304|音频编码失败																							|
|-1305|不支持的视频分辨率																				|
|-1306|不支持的音频采样率																				|
|-1307|网络断连，且经多次重连抢救无效，更多重试请自行重启推流		|
|-1308|开始录屏失败，可能是被用户拒绝														|
|-1309|录屏失败，不支持的Android系统版本，需要5.0以上的系统			|
|-1310|录屏被其他应用打断了																			|
|-1311|Android Mic打开成功，但是录不到音频数据									|
|-1312|录屏动态切横竖屏失败																			|
|1101	|网络状况不佳：上行带宽太小，上传数据受阻									|
|1102	|网络断连, 已启动自动重连																	|
|1103	|硬编码启动失败,采用软编码																|
|1104	|视频编码失败																							|
|1105	|新美颜软编码启动失败，采用老的软编码											|
|1106	|新美颜软编码启动失败，采用老的软编码											|
|3001	|RTMP -DNS解析失败																				|
|3002	|RTMP服务器连接失败																				|
|3003	|RTMP服务器握手失败																				|
|3004	|RTMP服务器主动断开，请检查推流地址的合法性或防盗链有效期	|
|3005	|RTMP 读/写失败																						|

网络状态数据（info）

|键名					|说明																									|
|---					|---																									|
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
 <live-pusher url="https://domain/push_stream" mode="RTC" autopush @statechange="statechange" style="width: 300px; height: 225px;" />
 ```
 
 ```javascript
export default {
  mehods:{
    statechange(e) {
      console.log('live-pusher code:', e.detail.code)
    }
  }
}
 ```
 
 Bug & Tip
1. tip: ```live-pusher``` 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 ```z-index``` 控制层级。可使用 ```cover-view``` ```cover-image```覆盖在上面。
2. tip: 请勿在 ```scroll-view```、```swiper```、```picker-view```、```movable-view``` 中使用 ```live-pusher``` 组件。
3. tip: css 动画对 ```live-pusher``` 组件无效。