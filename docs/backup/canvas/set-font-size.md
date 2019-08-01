### setFontSize
canvasContext.setFontSize

**定义**

设置字体的字号。

**Tip:** 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。

|参数	|类型	|说明					|
|---	|---	|---					|
|fontSize	|Number	|字体的字号|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setFontSize(20)
ctx.fillText('20', 20, 20)
ctx.setFontSize(30)
ctx.fillText('30', 40, 40)
ctx.setFontSize(40)
ctx.fillText('40', 60, 60)
ctx.setFontSize(50)
ctx.fillText('50', 90, 90)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/font-size.png?t=201859)
