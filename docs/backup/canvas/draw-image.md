### drawImage
canvasContext.drawImage

**定义**

绘制图像到画布。


**参数**

|参数			|类型	|说明													|
|---	|---			|---	|
|imageResource	|String	|所要绘制的图片资源										|
|dx				|Number	|图像的左上角在目标canvas上 X 轴的位置					|
|dy				|Number	|图像的左上角在目标canvas上 Y 轴的位置					|
|dWidth			|Number	|在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放	|
|dHeigt			|Number	|在目标画布上绘制图像的高度，允许对绘制的图像进行缩放	|
|sx				|Number	|源图像的矩形选择框的左上角 X 坐标						|
|sy				|Number	|源图像的矩形选择框的左上角 Y 坐标						|
|sWidth			|Number	|源图像的矩形选择框的高度								|
|sHeight		|Number	|源图像的矩形选择框的高度								|

有三个版本的写法：

* ```drawImage(dx, dy)```
* ```drawImage(dx, dy, dWidth, dHeight)```
* ```drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`` 从 1.9.0 起支持

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

uni.chooseImage({
  success: function(res){
    ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    ctx.draw()
  }
})
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/draw-image.png?t=201859)
