### arc
canvasContext.arc

**定义**

画一条弧线。

**Tip:** 创建一个圆可以用 ```arc()``` 方法指定其实弧度为0，终止弧度为 ```2 * Math.PI```。
**Tip:** 用 ```stroke()``` 或者 ```fill()``` 方法来在 ```canvas``` 中画弧线。

**参数**

|参数				|类型	|说明															|
|---				|---	|---															|
|x					|Number	|圆的x坐标														|
|y					|Number	|圆的y坐标														|
|r					|Number	|圆的半径														|
|sAngle				|Number	|起始弧度，单位弧度（在3点钟方向）								|
|eAngle				|Number	|终止弧度														|
|counterclockwise	|Boolean|可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Draw coordinates
ctx.arc(100, 75, 50, 0, 2 * Math.PI)
ctx.setFillStyle('#EEEEEE')
ctx.fill()

ctx.beginPath()
ctx.moveTo(40, 75)
ctx.lineTo(160, 75)
ctx.moveTo(100, 15)
ctx.lineTo(100, 135)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

ctx.setFontSize(12)
ctx.setFillStyle('black')
ctx.fillText('0', 165, 78)
ctx.fillText('0.5*PI', 83, 145)
ctx.fillText('1*PI', 15, 78)
ctx.fillText('1.5*PI', 83, 10)

// Draw points
ctx.beginPath()
ctx.arc(100, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(100, 25, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.beginPath()
ctx.arc(150, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

// Draw arc
ctx.beginPath()
ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
ctx.setStrokeStyle('#333333')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/arc.png?t=201859)

针对 ```arc(100, 75, 50, 0, 1.5 * Math.PI)```的三个关键坐标如下：

* 绿色: 圆心 (100, 75)
* 红色: 起始弧度 (0)
* 蓝色: 终止弧度 (1.5 * Math.PI)
