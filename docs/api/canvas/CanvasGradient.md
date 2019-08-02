### CanvasGradient.addColorStop(stop,color)

创建一个颜色的渐变点。
- 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。

- 需要使用 ```addColorStop()``` 来指定渐变点，至少要两个。

#### 参数

|参数|类型	|定义	|
|---|---|---	|
|stop	|Number(0-1)|表示渐变点在起点和终点中的位置	|
|color	|Color	|渐变点的颜色|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Create circular gradient
const grd = ctx.createLinearGradient(30, 10, 120, 10)
grd.addColorStop(0, 'red')
grd.addColorStop(0.16, 'orange')
grd.addColorStop(0.33, 'yellow')
grd.addColorStop(0.5, 'green')
grd.addColorStop(0.66, 'cyan')
grd.addColorStop(0.83, 'blue')
grd.addColorStop(1, 'purple')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/color-stop.png?t=201859)

