### uni.getBackgroundAudioPlayerState(OBJECT)
获取后台音乐播放状态。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|参数|说明|
|:-|:-|
|duration|选定音频的长度（单位：s），只有在当前有音乐播放时返回|
|currentPosition|选定音频的播放位置（单位：s），只有在当前有音乐播放时返回|
|status|播放状态（2：没有音乐在播放，1：播放中，0：暂停中）|
|downloadPercent|音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回|
|dataUrl|歌曲数据链接，只有在当前有音乐播放时返回|

**示例代码：**

```javascript
uni.getBackgroundAudioPlayerState({
  success: function (res) {
    var status = res.status;
    var dataUrl = res.dataUrl;
    var currentPosition = res.currentPosition;
    var duration = res.duration;
    var downloadPercent = res.downloadPercent;
  }
});
```

### uni.playBackgroundAudio(OBJECT)
使用后台播放器播放音乐，对于客户端来说，只能同时有一个后台音乐在播放。当用户离开应用后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他应用占用了音乐播放器，原有应用内的音乐将停止播放。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|dataUrl|String|是|音乐链接，目前支持的格式有 m4a, aac, mp3, wav|
|title|String|否|音乐标题|
|coverImgUrl|String|否|封面URL|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例代码：**

```javascript
uni.playBackgroundAudio({
  dataUrl: '',
  title: '',
  coverImgUrl: ''
});
```

### uni.pauseBackgroundAudio()
暂停播放音乐。

**示例代码：**

```javascript
uni.pauseBackgroundAudio();
```

### uni.seekBackgroundAudio(OBJECT)
控制音乐播放进度。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|position|Number|是|音乐位置，单位：秒|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**示例代码：**

```javascript
uni.seekBackgroundAudio({
  position: 30
});
```

### uni.stopBackgroundAudio()
停止播放音乐。

**示例代码：**

```javascript
uni.stopBackgroundAudio();
```

### uni.onBackgroundAudioPlay(CALLBACK)
监听音乐播放。

### uni.onBackgroundAudioPause(CALLBACK)
监听音乐暂停。

### uni.onBackgroundAudioStop(CALLBACK)
监听音乐停止。