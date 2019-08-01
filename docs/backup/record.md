### uni.startRecord(OBJECT)
开始录音。当主动调用 ``uni.stopRecord``，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开应用时，此接口无法调用。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**注：文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile]()，在应用下次启动时才能访问得到。**

**success 返回参数说明：**

|参数|说明|
|:-|:-|
|tempFilePath|录音文件的临时路径|

### uni.stopRecord()
​主动调用停止录音。

**示例代码：**

```javascript
uni.startRecord({
  success: function (res) {
    var tempFilePath = res.tempFilePath;
  },
  fail: function (res) {
    // 录音失败
  }
});

setTimeout(function () {
  // 结束录音  
  uni.stopRecord();
}, 10000);
```