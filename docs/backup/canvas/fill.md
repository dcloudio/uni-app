### fill
canvasContext.fill

**定义**

对当前路径中的内容进行填充。默认的填充色为黑色。

**Tip:** 如果当前路径没有闭合，```fill()``` 方法会将起点和终点进行连接，然后填充，详情见例一。

**Tip:** ```fill()``` 填充的的路径是从 ```beginPath()``` 开始计算，但是不会将 ```fillRect()``` 包含进去，详情见例二。

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.fill()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-line.png?t=201859)

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