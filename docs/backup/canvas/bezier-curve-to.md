### bezier-curve-to
canvasContext.bezier-curve-to

**定义**

创建三次方贝塞尔曲线路径。

**Tip:** 曲线的起始点为路径中前一个点。

**参数**

|参数	|类型	|说明						|
|---	|---	|---						|
|cp1x	|Number	|第一个贝塞尔控制点的 x 坐标|
|cp1y	|Number	|第一个贝塞尔控制点的 y 坐标|
|cp2x	|Number	|第二个贝塞尔控制点的 x 坐标|
|cp2y	|Number	|第二个贝塞尔控制点的 y 坐标|
|x		|Number	|结束点的 x 坐标			|
|y		|Number	|结束点的 y 坐标			|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Draw points
ctx.beginPath()
ctx.arc(20, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

ctx.beginPath()
ctx.arc(200, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(20, 100, 2, 0, 2 * Math.PI)
ctx.arc(200, 100, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(150, 75)

ctx.moveTo(200, 20)
ctx.lineTo(200, 100)
ctx.lineTo(70, 75)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/bezier-curve.png?t=201859)

针对 ```moveTo(20, 20)`` ```bezierCurveTo(20, 100, 200, 100, 200, 20)``` 的三个关键坐标如下：

* 红色：起始点(20, 20)
* 蓝色：两个控制点(20, 100) (200, 100)
* 绿色：终止点(200, 20)