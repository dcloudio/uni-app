# 渐变

渐变能用于填充一个矩形，圆，线，文字等。填充色可以不固定位固定的一种颜色。

我们提供了两种颜色渐变的方式：

* ```createLinearGradient(x, y, x1, y1)``` - 创建一个线性的渐变
* ```createCircularGradient(x, y, r)``` - 创建一个从圆心开始的渐变

一旦我们创建了一个渐变对象，我们必须添加两个颜色渐变点。

```addColorStop(position, color)``` 方法用于指定颜色渐变点的位置和颜色，位置必须位于0到1之间。

可以用```setFillStyle()``` 和 ```setStrokeStyle()``` 方法设置渐变，然后进行画图描述。

### 使用 createLinearGradient()

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Create linear gradient
const grd = ctx.createLinearGradient(0, 0, 200, 0)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/linear-gradient.png?t=201859)