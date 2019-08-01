### rect
canvasContext.rect

#### 定义

创建一个矩形。

**Tip:** 用 fill() 或者 stroke() 方法将矩形真正的画到 canvas 中。

#### 参数

|参数	|类型	|说明				|
|---	|---	|---					|
|x		|Number	|矩形路径左上角的x坐标	|
|y		|Number	|矩形路径左上角的y坐标	|
|width	|Number	|矩形路径的宽度			|
|height	|Number	|矩形路径的高度			|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.rect(10, 10, 150, 75)
ctx.setFillStyle('red')
ctx.fill()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-rect.png?t=201859)