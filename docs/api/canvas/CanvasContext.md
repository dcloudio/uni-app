**属性**

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

App-nvue下如需使用canvas，暂未封装为uni API，可参考[文档](https://github.com/dcloudio/NvueCanvasDemo)使用。

### CanvasContext.fillStyle string

填充颜色。用法同 [CanvasContext.setFillStyle()](#canvascontextsetfillstyle)。

### CanvasContext.strokeStyle string

边框颜色。用法同 [CanvasContext.setStrokeStyle()](#canvascontextsetstrokestyle)。

### CanvasContext.shadowOffsetX number

阴影相对于形状在水平方向的偏移

### CanvasContext.shadowOffsetY number

阴影相对于形状在竖直方向的偏移

### CanvasContext.shadowColor number

阴影的颜色

### CanvasContext.shadowBlur number

阴影的模糊级别

### CanvasContext.lineWidth number

线条的宽度。用法同 [CanvasContext.setLineWidth()](#canvascontextsetlinewidth)。

### CanvasContext.lineCap number

线条的端点样式。用法同 [CanvasContext.setLineCap()](#canvascontextsetlinecap)。

### CanvasContext.lineJoin number

线条的交点样式。用法同 [CanvasContext.setLineJoin()](#canvascontextsetlinejoin)。

### CanvasContext.miterLimit number

最大斜接长度。用法同 [CanvasContext.setMiterLimit()](#canvascontextsetmiterlimit)。

### CanvasContext.lineDashOffset number

虚线偏移量，初始值为0

### CanvasContext.font string

当前字体样式的属性。符合 [CSS font 语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif。

### CanvasContext.globalAlpha number

全局画笔透明度。范围 0-1，0 表示完全透明，1 表示完全不透明。

### CanvasContext.globalCompositeOperation string

在绘制新形状时应用的合成操作的类型。目前安卓版本只适用于 `fill` 填充块的合成，用于 `stroke` 线段的合成效果都是 `source-over`。

目前支持的操作有
* App和H5端：source-over、destination-over、source-in、destination-in、source-out、destination-out、source-atop、destination-atop、lighter、darker、xor、copy
* 微信小程序安卓端：xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light
* 微信小程序iOS端：xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity

**方法**

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|

### CanvasContext.arc

画一条弧线。创建一个圆可以用 ```arc()``` 方法指定其实弧度为0，终止弧度为 ```2 * Math.PI```。用 ```stroke()``` 或者 ```fill()``` 方法来在 ```canvas``` 中画弧线。

**参数**

|参数|类型	|说明|
|---|---	|---	|
|x	|Number	|圆的x坐标	|
|y	|Number	|圆的y坐标|
|r|Number	|圆的半径|
|sAngle	|Number	|起始弧度，单位弧度（在3点钟方向）|
|eAngle	|Number	|终止弧度|
|counterclockwise	|Boolean|可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Draw coordinates
ctx.arc(100, 75, 50, 0, 2 * Math.PI)
ctx.setFillStyle('#EEEEEE')
ctx.fill()

ctx.beginPath()
ctx.moveTo(40, 75)
ctx.lineTo(160, 75)
ctx.moveTo(100, 15)
ctx.lineTo(100, 135)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

ctx.setFontSize(12)
ctx.setFillStyle('black')
ctx.fillText('0', 165, 78)
ctx.fillText('0.5*PI', 83, 145)
ctx.fillText('1*PI', 15, 78)
ctx.fillText('1.5*PI', 83, 10)

// Draw points
ctx.beginPath()
ctx.arc(100, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(100, 25, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.beginPath()
ctx.arc(150, 75, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

// Draw arc
ctx.beginPath()
ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
ctx.setStrokeStyle('#333333')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/arc.png?t=201859)

针对 ```arc(100, 75, 50, 0, 1.5 * Math.PI)```的三个关键坐标如下：
* 绿色: 圆心 (100, 75)
* 红色: 起始弧度 (0)
* 蓝色: 终止弧度 (1.5 * Math.PI)

### CanvasContext.arcTo

根据控制点和半径绘制圆弧路径。

```javascript
CanvasContext.arcTo(x1, y1, x2, y2, radius)
```

**参数**

|属性值	|类型	|说明|
|---	|---	|---	|
|x1|Number	|第一个控制点的 x 轴坐标|
|y1|Number	|第一个控制点的 y 轴坐标|
|x2|Number	|第二个控制点的 x 轴坐标|
|y2|Number	|第二个控制点的 y 轴坐标|
|radius	|Number	|圆弧的半径	|

### CanvasContext.beginPath

开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。

**Tip:** 在最开始的时候相当于调用了一次 ```beginPath()```。
**Tip:** 同一个路径内的多次```setFillStyle()```、``setStrokeStyle()```、```setLineWidth()```等设置，以最后一次设置为准。


**示例代码**

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
### CanvasContext.bezierCurveTo

创建三次方贝塞尔曲线路径。

**Tip:** 曲线的起始点为路径中前一个点。

**参数**

|参数	|类型	|说明|
|---	|---	|---|
|cp1x	|Number	|第一个贝塞尔控制点的 x 坐标|
|cp1y	|Number	|第一个贝塞尔控制点的 y 坐标|
|cp2x	|Number	|第二个贝塞尔控制点的 x 坐标|
|cp2y	|Number	|第二个贝塞尔控制点的 y 坐标|
|x|Number	|结束点的 x 坐标|
|y|Number	|结束点的 y 坐标|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Draw points
ctx.beginPath()
ctx.arc(20, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

ctx.beginPath()
ctx.arc(200, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(20, 100, 2, 0, 2 * Math.PI)
ctx.arc(200, 100, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(150, 75)

ctx.moveTo(200, 20)
ctx.lineTo(200, 100)
ctx.lineTo(70, 75)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/bezier-curve.png?t=201859)

针对 ```moveTo(20, 20)`` ```bezierCurveTo(20, 100, 200, 100, 200, 20)``` 的三个关键坐标如下：

* 红色：起始点(20, 20)
* 蓝色：两个控制点(20, 100) (200, 100)
* 绿色：终止点(200, 20)

### CanvasContext.clearRect

清除画布上在该矩形区域内的内容。


**参数**

|参数|类型|说明|
|---	|---	|---	|
|x	|Number	|矩形区域左上角的x坐标|
|y	|Number	|矩形区域左上角的y坐标|
|width	|Number	|矩形区域的宽度|
|height	|Number	|矩形区域的高度|

**示例代码**

clearRect 并非画一个白色的矩形在地址区域，而是清空，为了有直观感受，对 canvas 加了一层背景色。

```javascript
<canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
```

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(0, 0, 150, 200)
ctx.setFillStyle('blue')
ctx.fillRect(150, 0, 150, 200)
ctx.clearRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/clear-rect.png?t=201859)


### CanvasContext.clip
从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。

**Tip:** 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。


**示例代码**

```javascript
const context = uni.createCanvasContext('myCanvas')

uni.downloadFile({
	url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
	success: function (res) {
context.save()
context.beginPath()
context.arc(96, 96, 48, 0, 2 * Math.PI)
context.clip()
context.drawImage(res.tempFilePath, 48, 48)
		context.restore()
		context.draw()
	}
})

```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/clip.png?t=201859)

### CanvasContext.closePath
关闭一个路径。

**Tip:** 关闭路径会连接起点和终点。
**Tip:** 如果关闭路径后没有调用 ```fill()``` 或者 ```stroke()``` 并开启了新的路径，那之前的路径将不会被渲染。


**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.closePath()
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/close-line.png?t=201859)


```javascript
const ctx = uni.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.closePath()

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

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/close-path.png?t=201859)

### CanvasContext.createCircularGradient
创建一个从圆心开始的渐变。返回的 [CanvasGradient](/api/canvas/CanvasGradient) 对象，需要使用 ```CanvasGradient.addColorStop()``` 来指定渐变点，至少要两个。

**参数**

|参数	|类型		|定义	|
|---	|---	|---		|
|x		|Number	|圆心的x坐标|
|y		|Number	|圆心的y坐标|
|r		|Number	|圆的半径		|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Create circular gradient
const grd = ctx.createCircularGradient(75, 50, 50)
grd.addColorStop(0, 'red')
grd.addColorStop(1, 'white')

// Fill with gradient
ctx.setFillStyle(grd)
ctx.fillRect(10, 10, 150, 80)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/circular-gradient.png?t=201859)

### CanvasContext.createLinearGradient
创建一个线性的渐变颜色。返回的 [CanvasGradient](/api/canvas/CanvasGradient) 对象，需要使用 ```CanvasGradient.addColorStop()``` 来指定渐变点，至少要两个。

**参数**

|参数	|类型		|定义	|
|---	|---	|---		|
|x0		|Number	|起点的x坐标|
|y0		|Number	|起点的y坐标|
|x1		|Number	|终点的x坐标|
|y1		|Number	|终点的y坐标|


**示例代码**

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

### CanvasContext.createPattern
对指定的图像创建模式的方法，可在指定的方向上重复元图像

**参数**

|参数		|类型	|说明				|
|---		|---	|---																|
|image		|String	|重复的图像源，仅支持包内路径和临时路径								|
|repetition	|String	|指定如何重复图像，有效值有: repeat, repeat-x, repeat-y, no-repeat	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
const pattern = ctx.createPattern('/path/to/image', 'repeat-x')
ctx.fillStyle = pattern
ctx.fillRect(0, 0, 300, 150)
ctx.draw()
```

### CanvasContext.draw
将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。

**参数**

|参数|类型|说明|最低版本	|
|---|---|---|---|
|reserve	|Boolean	|非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false	|	|
|callback	|Function	|绘制完成后回调|1.7.0|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/un-reserve.png?t=201859)


```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.draw()
ctx.fillRect(50, 50, 150, 100)
ctx.draw(true)
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/reserve.png?t=201859)

### CanvasContext.drawImage
绘制图像到画布。

**参数**

|参数|类型	|说明				|
|---	|---|---	|
|imageResource	|String	|所要绘制的图片资源				|
|dx	|Number	|图像的左上角在目标canvas上 X 轴的位置		|
|dy	|Number	|图像的左上角在目标canvas上 Y 轴的位置		|
|dWidth|Number	|在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放	|
|dHeight|Number	|在目标画布上绘制图像的高度，允许对绘制的图像进行缩放	|
|sx	|Number	|源图像的矩形选择框的左上角 X 坐标			|
|sy	|Number	|源图像的矩形选择框的左上角 Y 坐标			|
|sWidth|Number	|源图像的矩形选择框的高度		|
|sHeight		|Number	|源图像的矩形选择框的高度		|

有三个版本的写法：

* ```drawImage(dx, dy)```
* ```drawImage(dx, dy, dWidth, dHeight)```
* ```drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)```

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

uni.chooseImage({
  success: function(res){
    ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    ctx.draw()
  }
})
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/draw-image.png?t=201859)

### CanvasContext.fill
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

### CanvasContext.fillRect
填充一个矩形。

**Tip:** 用 ```setFillStyle()``` 设置矩形的填充色，如果没设置默认是黑色。

**参数**

|参数	|类型	|定义					|
|---	|---	|---					|
|x		|Number	|矩形路径左上角的x坐标	|
|y		|Number	|矩形路径左上角的y坐标	|
|width	|Number	|矩形路径的宽度			|
|height	|Number	|矩形路径的高度			|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-rect.png?t=201859)

### CanvasContext.fillText
在画布上绘制被填充的文本。

**参数**

|参数		|类型	|说明						|
|---		|---	|---						|
|text		|String	|在画布上输出的文本			|
|x			|Number	|绘制文本的左上角x坐标位置	|
|y			|Number	|绘制文本的左上角y坐标位置	|
|maxWidth	|Number	|需要绘制的最大宽度，可选	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setFontSize(20)
ctx.fillText('Hello', 20, 20)
ctx.fillText('MINA', 100, 100)

ctx.draw()
```


### CanvasContext.lineTo
增加一个新点，然后创建一条从上次指定点到目标点的线。

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

### CanvasContext.measureText
测量文本尺寸信息，目前仅返回文本宽度。同步接口。(App端自定义组件编译模式暂时不可用)

**参数**

|参数	|类型	|说明			|
|---	|---	|---			|
|text	|String	|要测量的文本	|

**返回**

返回 ```TextMetrics``` 对象，结构如下：

|参数	|类型	|说明		|
|---	|---	|---			|
|width	|Number	|文本的宽度	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.font = 'italic bold 20px cursive'
const metrics = ctx.measureText('Hello World')
console.log(metrics.width)
```

### CanvasContext.moveTo
把路径移动到画布中的指定点，不创建线条。用 ```stroke()``` 方法来画线条。

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

### CanvasContext.quadraticCurveTo
创建二次贝塞尔曲线路径。曲线的起始点为路径中前一个点。

**参数**

|参数	|类型	|说明				|
|---	|---	|---				|
|cpx	|Number	|贝塞尔控制点的x坐标|
|cpy	|Number	|贝塞尔控制点的y坐标|
|x		|Number	|结束点的x坐标		|
|y		|Number	|结束点的y坐标		|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// Draw points
ctx.beginPath()
ctx.arc(20, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('red')
ctx.fill()

ctx.beginPath()
ctx.arc(200, 20, 2, 0, 2 * Math.PI)
ctx.setFillStyle('lightgreen')
ctx.fill()

ctx.beginPath()
ctx.arc(20, 100, 2, 0, 2 * Math.PI)
ctx.setFillStyle('blue')
ctx.fill()

ctx.setFillStyle('black')
ctx.setFontSize(12)

// Draw guides
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.lineTo(20, 100)
ctx.lineTo(200, 20)
ctx.setStrokeStyle('#AAAAAA')
ctx.stroke()

// Draw quadratic curve
ctx.beginPath()
ctx.moveTo(20, 20)
ctx.quadraticCurveTo(20, 100, 200, 20)
ctx.setStrokeStyle('black')
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/quadratic-curve-to.png?t=201859)

针对 ```moveTo(20, 20)`` ```quadraticCurveTo(20, 100, 200, 20)``` 的三个关键坐标如下：

* 红色：起始点(20, 20)
* 蓝色：控制点(20, 100)
* 绿色：终止点(200, 20)

### CanvasContext.rect
创建一个矩形。

**Tip:** 用 fill() 或者 stroke() 方法将矩形真正的画到 canvas 中。

**参数**

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

### CanvasContext.restore
恢复之前保存的绘图上下文。

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

// save the default fill style
ctx.save() 
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)

// restore to the previous saved state
ctx.restore()
ctx.fillRect(50, 50, 150, 100)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/save-restore.png?t=201859)

### CanvasContext.rotate
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

### CanvasContext.save
保存当前的绘图上下文。

**示例代码**

```javascript
const ctx = wx.createCanvasContext('myCanvas')

// save the default fill style
ctx.save()
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)

// restore to the previous saved state
ctx.restore()
ctx.fillRect(50, 50, 150, 100)

ctx.draw()
```

### CanvasContext.scale
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

### CanvasContext.setFillStyle
设置填充色，如果没有设置 fillStyle，默认颜色为 black。

**语法**

```javascript
canvasContext.setFillStyle(color)
canvasContext.fillStyle = color
```

**参数**

|参数	|类型|定义		|说明|
|---|---|---|---|
|color|Color|Gradient Object|填充色	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-rect.png?t=201859)

### CanvasContext.setFontSize
设置字体的字号。

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


### CanvasContext.setGlobalAlpha
设置全局画笔透明度。

**参数**

|参数	|类型	|范围|说明										|
|---	|---	|---	|---									|
|alpha	|Number	|0~1	|透明度，0 表示完全透明，1 表示完全不透明	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 100)
ctx.setGlobalAlpha(0.2)
ctx.setFillStyle('blue')
ctx.fillRect(50, 50, 150, 100)
ctx.setFillStyle('yellow')
ctx.fillRect(100, 100, 150, 100)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/global-alpha.png?t=201859)

### CanvasContext.setLineCap
设置线条的端点样式。

**参数**

|参数	|类型						|说明				|
|---	|---						|---				|
|lineCap|String	|'butt'、'round'、'square'	|线条的结束端点样式	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('butt')
ctx.setLineWidth(10)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('round')
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineCap('square')
ctx.setLineWidth(10)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-cap.png?t=201859)

### CanvasContext.setLineDash
设置线条宽度。

**参数**

|参数	|类型	|定义													|
|---	|---	|---													|
|pattern|Array	|一组描述交替绘制线段和间距（坐标空间单位）长度的数字	|
|offset	|Number	|虚线偏移量												|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setLineDash([10, 20], 5);

ctx.beginPath();
ctx.moveTo(0,100);
ctx.lineTo(400, 100);
ctx.stroke();

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/set-line-dash.png?t=201859)

### CanvasContext.setLineJoin
设置线条的交点样式。

**参数**

|参数	|类型						|范围				|说明|
|---	|---						|---				|---|
|lineJoin	|String	|'bevel'、'round'、'miter'	|线条的结束交点样式	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(100, 50)
ctx.lineTo(10, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('bevel')
ctx.setLineWidth(10)
ctx.moveTo(50, 10)
ctx.lineTo(140, 50)
ctx.lineTo(50, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('round')
ctx.setLineWidth(10)
ctx.moveTo(90, 10)
ctx.lineTo(180, 50)
ctx.lineTo(90, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineJoin('miter')
ctx.setLineWidth(10)
ctx.moveTo(130, 10)
ctx.lineTo(220, 50)
ctx.lineTo(130, 90)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-join.png?t=201859)

### CanvasContext.setLineWidth
设置线条的宽度。

**参数**

|参数		|类型	|说明					|
|---		|---	|---					|
|lineWidth	|Number	|线条的宽度(单位是px)	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(150, 10)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(5)
ctx.moveTo(10, 30)
ctx.lineTo(150, 30)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.moveTo(10, 50)
ctx.lineTo(150, 50)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(15)
ctx.moveTo(10, 70)
ctx.lineTo(150, 70)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/line-width.png?t=201859)

### CanvasContext.setMiterLimit
设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 ``setLineJoin()`` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示。

**参数**

|参数		|类型	|说明			|
|---		|---	|---			|
|miterLimit	|Number	|最大斜接长度	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(1)
ctx.moveTo(10, 10)
ctx.lineTo(100, 50)
ctx.lineTo(10, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(2)
ctx.moveTo(50, 10)
ctx.lineTo(140, 50)
ctx.lineTo(50, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(3)
ctx.moveTo(90, 10)
ctx.lineTo(180, 50)
ctx.lineTo(90, 90)
ctx.stroke()

ctx.beginPath()
ctx.setLineWidth(10)
ctx.setLineJoin('miter')
ctx.setMiterLimit(4)
ctx.moveTo(130, 10)
ctx.lineTo(220, 50)
ctx.lineTo(130, 90)
ctx.stroke()

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/miter-limit.png?t=201859)

### CanvasContext.setShadow
设置阴影样式。如果没有设置，offsetX 默认值为0， offsetY 默认值为0， blur 默认值为0，color 默认值为 black。

**参数**

|参数|类型|定义		|说明				|
|---|---|---		|---				|
|offsetX|Number	|		|阴影相对于形状在水平方向的偏移	|
|offsetY|Number	|		|阴影相对于形状在竖直方向的偏移	|
|blur|Number	|0~100	|阴影的模糊级别，数值越大越模糊	|
|color	|Color	|		|阴影的颜色			|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.setShadow(10, 50, 50, 'blue')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/shadow.png?t=201859)

### CanvasContext.setStrokeStyle
设置边框颜色。如果没有设置 fillStyle，默认颜色为 black。

**参数**

|参数	|类型	|定义|说明		|
|---	|---	|---|---		|
|color|Color|Gradient Object|填充色	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setStrokeStyle('red')
ctx.strokeRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/stroke-rect.png?t=201859)

### CanvasContext.setTextAlign
用于设置文字的对齐

|参数	|类型	|定义|
|---	|---	|---|
|align	|String	|可选值 'left'、'center'、'right'	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setStrokeStyle('red')
ctx.moveTo(150, 20)
ctx.lineTo(150, 170)
ctx.stroke()

ctx.setFontSize(15)
ctx.setTextAlign('left')
ctx.fillText('textAlign=left', 150, 60)

ctx.setTextAlign('center')
ctx.fillText('textAlign=center', 150, 80)

ctx.setTextAlign('right')
ctx.fillText('textAlign=right', 150, 100)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/set-text-align.png?t=201859)

### CanvasContext.setTextBaseline
用于设置文字的水平对齐

**参数**

|参数	|类型|说明|
|---	|---|---|
|textBaseline	|String	|可选值 'top'、'bottom'、'middle'、'normal'	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')

ctx.setStrokeStyle('red')
ctx.moveTo(5, 75)
ctx.lineTo(295, 75)
ctx.stroke()

ctx.setFontSize(20)

ctx.setTextBaseline('top')
ctx.fillText('top', 5, 75)

ctx.setTextBaseline('middle')
ctx.fillText('middle', 50, 75)

ctx.setTextBaseline('bottom')
ctx.fillText('bottom', 120, 75)

ctx.setTextBaseline('normal')
ctx.fillText('normal', 200, 75)

ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/set-text-baseline.png?t=201859)

### CanvasContext.setTransform
使用矩阵重新设置（覆盖）当前变换的方法

**语法**

```javascript
canvasContext.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY)
```

**参数**

|参数		|类型	|说明		|
|---		|---	|---		|
|scaleX		|Number	|水平缩放	|
|skewX		|Number	|水平倾斜	|
|skewY		|Number	|垂直倾斜	|
|scaleY		|Number	|垂直缩放	|
|translateX	|Number	|水平移动	|
|translateY	|Number	|垂直移动	|

### CanvasContext.stroke
画出当前路径的边框。默认颜色色为黑色。

**Tip:** ``stroke()`` 描绘的的路径是从 ```beginPath()``` 开始计算，但是不会将 ```strokeRect()``` 包含进去，详情见例二。

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.moveTo(10, 10)
ctx.lineTo(100, 10)
ctx.lineTo(100, 100)
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/stroke-line.png?t=201859)


```javascript
const ctx = uni.createCanvasContext('myCanvas')
// begin path
ctx.rect(10, 10, 100, 30)
ctx.setStrokeStyle('yellow')
ctx.stroke()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)

// only stoke this rect, not in current path
ctx.setStrokeStyle('blue')
ctx.strokeRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)

// it will stroke current path
ctx.setStrokeStyle('red')
ctx.stroke()
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/stroke-path.png?t=201859)

### CanvasContext.strokeRect
画一个矩形(非填充)。用 `setFillStroke()` 设置边框颜色，如果没设置默认是黑色。

**参数**

|参数	|类型	|范围	|说明					|
|---	|---	|---	|---					|
|x		|Number	|		|矩形路径左上角的x坐标	|
|y		|Number	|		|矩形路径左上角的y坐标	|
|width	|Number	|		|矩形路径的宽度			|
|height	|Number	|		|矩形路径的高度			|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setStrokeStyle('red')
ctx.strokeRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/stroke-rect.png?t=201859)


### CanvasContext.strokeText
给定的 (x, y) 位置绘制文本描边的方法

**语法**

```javascript
canvasContext.strokeText(text, x, y, maxWidth)
```


**参数**

|参数	|类型		|说明						|
|---	|---		|---						|
|text		|String	|要绘制的文本				|
|x			|Number	|文本起始点的 x 轴坐标		|
|y			|Number	|文本起始点的 y 轴坐标		|
|maxWidth	|Number	|需要绘制的最大宽度，可选	|

### CanvasContext.transform
使用矩阵多次叠加当前变换的方法。

**参数**

|参数		|类型	|说明		|
|---		|---	|---		|
|scaleX		|Number	|水平缩放	|
|skewX		|Number	|水平倾斜	|
|skewY		|Number	|垂直倾斜	|
|scaleY		|Number	|垂直缩放	|
|translateX	|Number	|水平移动	|
|translateY	|Number	|垂直移动	|

### CanvasContext.translate
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
