### lineTo
canvasContext.lineTo

**定义**

lineTo 方法增加一个新点，然后创建一条从上次指定点到目标点的线。

**Tip:** 用 ```stroke()``` 方法来画线条

**参数**

|参数	|类型|说明			|
|---	|---	|---	|
|x		|Number	|目标位置的x坐标|
|y		|Number	|目标位置的y坐标|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.rect(10, 10, 100, 50)
ctx.lineTo(110, 60)
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-to.png?t=201859)
