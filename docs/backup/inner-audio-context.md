### uni.createInnerAudioContext()
创建并返回内部 audio 上下文 ``innerAudioContext`` 对象。本接口是 ``uni.createAudioContext`` 升级版。

innerAudioContext

**innerAudioContext 对象的属性列表：**

|属性|类型|说明|只读|支持版本|
|:-|:-|:-|:-|:-|
|src|String|音频的数据链接，用于直接播放。|否|*|
|startTime|Number|开始播放的位置（单位：s），默认 0|否|*|
|autoplay|Boolean|是否自动开始播放，默认 false|否|*|
|loop|Boolean|是否循环播放，默认 false|否|*|
|obeyMuteSwitch|Boolean|是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true|否|*|
|duration|Number|当前音频的长度（单位：s），只有在当前有合法的 src 时返回|是|*|
|currentTime|Number|当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位|是|*|
|paused|Boolean|当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放|是|*|
|buffered|Number|音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。|是|*|
|volume|Number|音量。范围 0~1。|否|*|


**innerAudioContext 对象的方法列表：**

|方法|参数|说明|
|:-|:-|:-|
|play||播放|
|pause||暂停|
|stop||停止|
|seek|position|跳转到指定位置，单位 s|
|destroy|position|销毁当前实例|
|onCanplay|callback|音频进入可以播放状态，但不保证后面可以流畅播放|
|onPlay|callback|音频播放事件|
|onPause|callback|音频暂停事件|
|onStop|callback|音频停止事件|
|onEnded|callback|音频自然播放结束事件|
|onTimeUpdate|callback|音频播放进度更新事件|
|onError|callback|音频播放错误事件|
|onWaiting|callback|音频加载中事件，当音频因为数据不足，需要停下来加载时会触发|
|onSeeking|callback|音频进行 seek 操作事件|
|onSeeked|callback|音频完成 seek 操作事件|
|offCanplay|callback|取消监听 onCanplay 事件|
|offPlay|callback|取消监听 onPlay 事件|
|offPause|callback|取消监听 onPause 事件|
|offStop|callback|取消监听 onStop 事件|
|offEnded|callback|取消监听 onEnded 事件|
|offTimeUpdate|callback|取消监听 onTimeUpdate 事件|
|offError|callback|取消监听 onError 事件|
|offWaiting|callback|取消监听 onWaiting 事件|
|offSeeking|callback|取消监听 onSeeking 事件|
|offSeeked|callback|取消监听 onSeeked 事件|

errCode 说明

|errCode|说明|
|:-|:-|
|10001|系统错误|
|10002|网络错误|
|10003|文件错误|
|10004|格式错误|
|-1|未知错误|


**示例代码：**

```javascript
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
innerAudioContext.title = '致爱丽丝';
innerAudioContext.singer = '暂无';
innerAudioContext.coverImgUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg';
innerAudioContext.onPlay(() => {
  console.log('开始播放');
});
innerAudioContext.onError((res) => {
  console.log(res.errMsg);
  console.log(res.errCode);
});
```