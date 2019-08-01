### setLineWidth
canvasContext.setLineWidth

#### 定义

设置线条的宽度。

#### 语法

```javascript
canvasContext.setLineWidth(lineWidth)
canvasContext.lineWidth = lineWidth // 基础库 1.9.90 起支持
```

#### 参数

|参数		|类型	|说明					|
|---		|---	|---					|
|lineWidth	|Number	|线条的宽度(单位是px)	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(5)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(15)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-width.png?t=201859)