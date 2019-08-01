### bezier-curve-to
canvasContext.bezier-curve-to

**定义**

创建二次贝塞尔曲线路径。

**Tip:** 曲线的起始点为路径中前一个点。

**参数**

|参数	|类型	|说明				|
|---	|---	|---				|
|cpx	|Number	|贝塞尔控制点的x坐标|
|cpy	|Number	|贝塞尔控制点的y坐标|
|x		|Number	|结束点的x坐标		|
|y		|Number	|结束点的y坐标		|

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
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(200, 20)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.quadraticCurveTo(20, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/quadratic-curve-to.png?t=201859)

针对 ```moveTo(20, 20)`` ```quadraticCurveTo(20, 100, 200, 20)``` 的三个关键坐标如下：

* 红色：起始点(20, 20)
* 蓝色：控制点(20, 100)
* 绿色：终止点(200, 20)