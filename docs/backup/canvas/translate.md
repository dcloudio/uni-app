### translate
canvasContext.translate

**定义**

对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。

**参数**

|参数	|类型	|说明			|
|---	|---	|---			|
|x		|Number	|水平坐标平移量	|
|y		|Number	|竖直坐标平移量	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.strokeRect(10, 10, 150, 100)
ctx.translate(20, 20)
ctx.strokeRect(10, 10, 150, 100)
ctx.translate(20, 20)
ctx.strokeRect(10, 10, 150, 100)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/translate.png?t=201859)
