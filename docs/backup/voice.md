### uni.playVoice(OBJECT)
开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。

|参数名|类型|必填|说明|最低版本|
|:-|:-|:-|:-|:-|
|filePath|String|是|需要播放的语音文件的文件路径|*|
|duration|Number|否|指定录音时长，到达指定的录音时长后会自动停止录音，单位：秒，默认值：60|*|
|success|Function|否|接口调用成功的回调函数|*|
|fail|Function|否|接口调用失败的回调函数|*|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|*|

**示例代码：**

```javascript
uni.startRecord({
  success: function (res) {
    var tempFilePath = res.tempFilePath;
    uni.playVoice({
      filePath: tempFilePath,
      complete: function () {}
    });
  }
});
```

### uni.pauseVoice()
暂停正在播放的语音。再次调用uni.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 uni.stopVoice。

**示例代码：**

```javascript
uni.startRecord({
  success: function (res) {
    var tempFilePath = res.tempFilePath;
    uni.playVoice({
      filePath: tempFilePath
    });

    setTimeout(function () {
      // 暂停播放
      uni.pauseVoice();
    }, 5000)
  }
});
```

### uni.stopVoice()
结束播放语音。

**示例代码：**

```javascript
uni.startRecord({
  success: function (res) {
    var tempFilePath = res.tempFilePath;
    uni.playVoice({
      filePath: tempFilePath
    });

    setTimeout(function () {
      uni.stopVoice();
    }, 5000);
  }
});
```