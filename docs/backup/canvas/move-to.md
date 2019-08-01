### moveTo
canvasContext.moveTo

**定义**

把路径移动到画布中的指定点，不创建线条。

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
ctx.lineTo(100, 10)

ctx.moveTo(10, 50)
ctx.lineTo(100, 50)
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/move-to.png?t=201859)
