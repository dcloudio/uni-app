### setLineCap
canvasContext.setLineCap

#### 定义

设置线条的端点样式。

#### 语法

```javascript
canvasContext.setLineCap(lineCap)
canvasContext.lineCap = lineCap // 基础库 1.9.90 起支持
```

#### 参数

|参数	|类型						|说明				|
|---	|---						|---				|
|lineCap|String	|'butt'、'round'、'square'	|线条的结束端点样式	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('butt')
ctx.setLineWidth(10)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('round')
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('square')
ctx.setLineWidth(10)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-cap.png?t=201859)