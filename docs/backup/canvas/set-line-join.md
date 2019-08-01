### setLineJoin
canvasContext.setLineJoin

#### 定义

设置线条的交点样式。

#### 语法

```javascript
canvasContext.setLineJoin(lineJoin)
canvasContext.lineJoin = lineJoin // 基础库 1.9.90 起支持
```

#### 参数

|参数	|类型						|范围				|说明|
|---	|---						|---				|---|
|lineJoin	|String	|'bevel'、'round'、'miter'	|线条的结束交点样式	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(100, 50)
ctx.lineTo(10, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('bevel')
ctx.setLineWidth(10)
ctx.moveTo(50, 10)
ctx.lineTo(140, 50)
ctx.lineTo(50, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('round')
ctx.setLineWidth(10)
ctx.moveTo(90, 10)
ctx.lineTo(180, 50)
ctx.lineTo(90, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('miter')
ctx.setLineWidth(10)
ctx.moveTo(130, 10)
ctx.lineTo(220, 50)
ctx.lineTo(130, 90)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-join.png?t=201859)