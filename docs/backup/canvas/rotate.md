### rotate
canvasContext.rotate

**定义**

以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。

**参数**

|参数	|类型	|说明															|
|---	|---	|---															|
|rotate	|Number	|旋转角度，以弧度计(degrees * Math.PI/180；degrees范围为0~360)	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.strokeRect(100, 10, 150, 100)
ctx.rotate(20 * Math.PI / 180)
ctx.strokeRect(100, 10, 150, 100)
ctx.rotate(20 * Math.PI / 180)
ctx.strokeRect(100, 10, 150, 100)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/rotate.png?t=201859)
