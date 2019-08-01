### clip
canvasContext.clip

**定义**

clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。

**Tip:** 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。


**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

uni.downloadFile({
  url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
  success: function(res) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(50, 50, 25, 0, 2*Math.PI)
      ctx.clip()
      ctx.drawImage(res.tempFilePath, 25, 25)
      ctx.restore()
      ctx.draw()
  }
})

```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/clip.png?t=201859)
