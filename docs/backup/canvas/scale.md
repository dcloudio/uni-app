### scale
canvasContext.scale

**定义**

在调用```scale```方法后，之后创建的路径其横纵坐标会被缩放。多次调用```scale```，倍数会相乘。

**参数**

|参数		|类型	|说明												|
|---		|---	|---												|
|scaleWidth	|Number	|横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)	|
|scaleHeight|Number	|纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.strokeRect(10, 10, 25, 15)
ctx.scale(2, 2)
ctx.strokeRect(10, 10, 25, 15)
ctx.scale(2, 2)
ctx.strokeRect(10, 10, 25, 15)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/scale.png?t=201859)
