### closePath
canvasContext.closePath

**定义**

关闭一个路径。

**Tip:** 关闭路径会连接起点和终点。
**Tip:** 如果关闭路径后没有调用 ```fill()``` 或者 ```stroke()``` 并开启了新的路径，那之前的路径将不会被渲染。


**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.closePath()
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/close-line.png?t=201859)


```javascript
const ctx = uni.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.closePath()

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

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/close-path.png?t=201859)
