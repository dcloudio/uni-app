### uni.canvasToTempFilePath(OBJECT, this)

把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。

**OBJECT参数说明：**

|参数	|类型		|必填		|说明	|最低版本												|
|---|---|---|---|---|
|x	|Number		|否			|画布x轴起点（默认0）|1.2.0													|
|y	|Number		|否			|画布y轴起点（默认0）|1.2.0													|
|width	|Number		|否			|画布宽度（默认为canvas宽度-x）|1.2.0													|
|height	|Number		|否			|画布高度（默认为canvas高度-y）|1.2.0													|
|destWidth	|Number		|否			|输出图片宽度（默认为 width * 屏幕像素密度）|1.2.0													|
|destHeight	|Number		|否			|输出图片高度（默认为 height * 屏幕像素密度）|1.2.0													|
|canvasId	|String		|是			|画布标识，传入 <canvas/> 的 canvas-id|														|
|fileType	|String		|否			|目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'|1.7.0													|
|quality	|Number		|否			|图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理|1.7.0													|
|success	|Function	|否			|接口调用成功的回调函数|														|
|fail	|Function	|否			|接口调用失败的回调函数|														|
|complete	|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）		|&bnsp;|

**示例代码**

```javascript
uni.canvasToTempFilePath({
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  destWidth: 100,
  destHeight: 100,
  canvasId: 'myCanvas',
  success: function(res) {
    console.log(res.tempFilePath)
  } 
})
```