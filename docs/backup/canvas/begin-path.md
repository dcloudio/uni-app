### strokeRect
canvasContext.strokeRect

**定义**

开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。

**Tip:** 在最开始的时候相当于调用了一次 ```beginPath()```。
**Tip:** 同一个路径内的多次```setFillStyle()```、``setStrokeStyle()```、```setLineWidth()```等设置，以最后一次设置为准。


**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.setFillStyle('yellow')
ctx.fill()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only fill this rect, not in current path
ctx.setFillStyle('blue')
ctx.fillRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will fill current path
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-path.png?t=201859)
