### intro
#### 在Canvas上画图

所有在 ```<canvas/>``` 中的画图必须用 JavaScript 完成：

html：（我们在接下来的例子中如无特殊声明都会用这个标签为模板，不再重复）

```html
<canvas canvas-id="myCanvas" style="border: 1px solid;"/>
```

JS：（我们在接下来的例子中会将 JS 放在 onLoad 中）

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

**第一步：创建一个 Canvas 绘图上下文**

首先，我们需要创建一个 Canvas 绘图上下文 CanvasContext。

CanvasContext 是应用内建的一个对象，有一些绘图的方法：

```javascript
const ctx = uni.createCanvasContext('myCanvas')
```

**第二步：使用 Canvas 绘图上下文进行绘图描述**

接着，我们来描述要在 Canvas 中绘制什么内容。

设置绘图上下文的填充色为红色：

```javascript
ctx.setFillStyle('red')
```

用 ```fillRect(x, y, width, height)``` 方法画一个矩形，填充为刚刚设置的红色：

```javascript
ctx.fillRect(10, 10, 150, 75)
```

**第三步：画图**

告诉 ```<canvas/>``` 组件你要将刚刚的描述绘制上去：

```javascript
ctx.draw()
```

**结果**

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-rect.png?t=201859)

### coordinates
#### Canvas 坐标系

canvas 是在一个二维的网格当中。

左上角的坐标为```(0, 0)```。

在之前的章节，我们用了这个方法 ```fillRect(0, 0, 150, 75)```。

它的含义为：从左上角```(0, 0)```开始，画一个```150 x 75px``` 的矩形。

**坐标系例子：**

我们可以在 ```<canvas/>``` 中加上一些事件，来观测它的坐标系

```html
<canvas canvas-id="myCanvas"
  style="margin: 5px; border:1px solid #d3d3d3;"
  @touchstart="start"
  @touchmove="move"
  @touchend="end"/>

<view :hidden="hidden">
  Coordinates: ({{x}}, {{y}})
</view>
```

```javascript
export default {
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  methods:{
    start: function(e) {
        this.hidden = false
        this.x = e.touches[0].x
        this.y = e.touches[0].y
    },
    move: function(e) {
      this.x = e.touches[0].x
      this.y = e.touches[0].y
    },
    end: function(e) {
      this.hidden = true
    }
  }
}
```

当你把手指放到 canvas 中，就会在下边显示出触碰点的坐标：

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/coordinates.gif?t=201859)

### gradient
#### 渐变

渐变能用于填充一个矩形，圆，线，文字等。填充色可以不固定位固定的一种颜色。

我们提供了两种颜色渐变的方式：

* ```createLinearGradient(x, y, x1, y1)``` - 创建一个线性的渐变
* ```createCircularGradient(x, y, r)``` - 创建一个从圆心开始的渐变

一旦我们创建了一个渐变对象，我们必须添加两个颜色渐变点。

```addColorStop(position, color)``` 方法用于指定颜色渐变点的位置和颜色，位置必须位于0到1之间。

可以用```setFillStyle()``` 和 ```setStrokeStyle()``` 方法设置渐变，然后进行画图描述。

**使用 createLinearGradient()**

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

### reference
#### API 接口

|方法											|说明																	|
|--------------------------|------------------------------------|
|createCanvasContext			|创建 canvas 绘图上下文(指定 canvasId)|
|createContext(不推荐使用)|创建 canvas 绘图上下文								|
|drawCanvas(不推荐使用)		|进行绘图															|
|canvasToTempFilePath			|导出图片															|

**context 对象的方法列表**

颜色，样式，阴影

|方法						|说明					|
|------|-----------|
|setFillStyle		|设置填充样式	|
|setStrokeStyle	|设置线条样式	|
|setShadow			|设置阴影			|

渐变

|方法										|说明															|
|------									|-----------											|
|createLinearGradient		|创建一个线性渐变									|
|createCircularGradient	|创建一个圆形渐变									|
|addColorStop						|在渐变中的某一点添加一个颜色变化	|

线条样式

|方法					|说明									|
|------				|-----------					|
|setLineWidth	|设置线条宽度					|
|setLineCap		|设置线条端点的样式		|
|setLineJoin	|设置两线相交处的样式	|
|setMiterLimit|设置最大倾斜					|

矩形

|方法				|说明																	|
|------			|-----------													|
|rect				|创建一个矩形													|
|fillRect		|填充一个矩形													|
|strokeRect	|画一个矩形（不填充）									|
|clearRect	|在给定的矩形区域内，清除画布上的像素	|

路径

|方法							|说明																											|
|------						|-----------																							|
|fill							|对当前路径进行填充																				|
|stroke						|对当前路径进行描边																				|
|beginPath				|开始一个路径																							|
|closePath				|关闭一个路径																							|
|moveTo						|把路径移动到画布中的指定点，但不创建线条。								|
|lineTo						|添加一个新点，然后在画布中创建从该点到最后指定点的线条。	|
|arc							|添加一个弧形路径到当前路径，顺时针绘制。									|
|quadraticCurveTo	|创建二次方贝塞尔曲线																			|
|bezierCurveTo		|创建三次方贝塞尔曲线																			|

变形

|方法			|说明										|
|------		|-----------						|
|scale		|对横纵坐标进行缩放			|
|rotate		|对坐标轴进行顺时针旋转	|
|translate|对坐标原点进行缩放			|

文字

|方法						|说明											|
|------					|-----------							|
|fillText				|在画布上绘制被填充的文本	|
|setFontSize		|设置字体大小							|
|setTextBaseline|设置字体基准线						|
|setTextAlign		|设置字体对齐方式					|

图片

|方法						|说明					|
|------|-----------|
|drawImage		|在画布上绘制图像	|

混合

|方法						|说明					|
|------|-----------|
|setGlobalAlpha		|设置全局画笔透明度  	|

其它

|方法											|说明														|
|------|-----------|
|save											|保存当前绘图上下文							|
|restore									|恢复之前保过的绘图上下文				|
|draw											|进行绘图												|
|getActions(不推荐使用)		|获取当前context上存储的绘图动作|
|clearActions(不推荐使用)	|清空当前的存储绘图动作					|

### color

可以用以下几种方式来表示 canvas 中使用的颜色：

* RGB 颜色： 如 ```'rgb(255, 0, 0)'```
* RGBA 颜色：如 ```'rgba(255, 0, 0, 0.3)'```
* 16 进制颜色： 如 ``'#FF0000'``
* 预定义的颜色： 如 ```'red'```

其中预定义颜色有以下148个：

**Note**: Color Name 大小写不敏感

|Color Name						|HEX		|
|---|---|
|AliceBlue						|#F0F8FF|
|AntiqueWhite					|#FAEBD7|
|Aqua									|#00FFFF|
|Aquamarine						|#7FFFD4|
|Azure								|#F0FFFF|
|Beige								|#F5F5DC|
|Bisque								|#FFE4C4|
|Black								|#000000|
|BlanchedAlmond				|#FFEBCD|
|Blue									|#0000FF|
|BlueViolet						|#8A2BE2|
|Brown								|#A52A2A|
|BurlyWood						|#DEB887|
|CadetBlue						|#5F9EA0|
|Chartreuse						|#7FFF00|
|Chocolate						|#D2691E|
|Coral								|#FF7F50|
|CornflowerBlue				|#6495ED|
|Cornsilk							|#FFF8DC|
|Crimson							|#DC143C|
|Cyan									|#00FFFF|
|DarkBlue							|#00008B|
|DarkCyan							|#008B8B|
|DarkGoldenRod				|#B8860B|
|DarkGray							|#A9A9A9|
|DarkGrey							|#A9A9A9|
|DarkGreen						|#006400|
|DarkKhaki						|#BDB76B|
|DarkMagenta					|#8B008B|
|DarkOliveGreen				|#556B2F|
|DarkOrange						|#FF8C00|
|DarkOrchid						|#9932CC|
|DarkRed							|#8B0000|
|DarkSalmon						|#E9967A|
|DarkSeaGreen					|#8FBC8F|
|DarkSlateBlue				|#483D8B|
|DarkSlateGray				|#2F4F4F|
|DarkSlateGrey				|#2F4F4F|
|DarkTurquoise				|#00CED1|
|DarkViolet						|#9400D3|
|DeepPink							|#FF1493|
|DeepSkyBlue					|#00BFFF|
|DimGray							|#696969|
|DimGrey							|#696969|
|DodgerBlue						|#1E90FF|
|FireBrick						|#B22222|
|FloralWhite					|#FFFAF0|
|ForestGreen					|#228B22|
|Fuchsia							|#FF00FF|
|Gainsboro						|#DCDCDC|
|GhostWhite						|#F8F8FF|
|Gold									|#FFD700|
|GoldenRod						|#DAA520|
|Gray									|#808080|
|Grey									|#808080|
|Green								|#008000|
|GreenYellow					|#ADFF2F|
|HoneyDew							|#F0FFF0|
|HotPink							|#FF69B4|
|IndianRed						|#CD5C5C|
|Indigo								|#4B0082|
|Ivory								|#FFFFF0|
|Khaki								|#F0E68C|
|Lavender							|#E6E6FA|
|LavenderBlush				|#FFF0F5|
|LawnGreen						|#7CFC00|
|LemonChiffon					|#FFFACD|
|LightBlue						|#ADD8E6|
|LightCoral						|#F08080|
|LightCyan						|#E0FFFF|
|LightGoldenRodYellow	|#FAFAD2|
|LightGray						|#D3D3D3|
|LightGrey						|#D3D3D3|
|LightGreen						|#90EE90|
|LightPink						|#FFB6C1|
|LightSalmon					|#FFA07A|
|LightSeaGreen				|#20B2AA|
|LightSkyBlue					|#87CEFA|
|LightSlateGray				|#778899|
|LightSlateGrey				|#778899|
|LightSteelBlue				|#B0C4DE|
|LightYellow					|#FFFFE0|
|Lime									|#00FF00|
|LimeGreen						|#32CD32|
|Linen								|#FAF0E6|
|Magenta							|#FF00FF|
|Maroon								|#800000|
|MediumAquaMarine			|#66CDAA|
|MediumBlue						|#0000CD|
|MediumOrchid					|#BA55D3|
|MediumPurple					|#9370DB|
|MediumSeaGreen				|#3CB371|
|MediumSlateBlue			|#7B68EE|
|MediumSpringGreen		|#00FA9A|
|MediumTurquoise			|#48D1CC|
|MediumVioletRed			|#C71585|
|MidnightBlue					|#191970|
|MintCream						|#F5FFFA|
|MistyRose						|#FFE4E1|
|Moccasin							|#FFE4B5|
|NavajoWhite					|#FFDEAD|
|Navy									|#000080|
|OldLace							|#FDF5E6|
|Olive								|#808000|
|OliveDrab						|#6B8E23|
|Orange								|#FFA500|
|OrangeRed						|#FF4500|
|Orchid								|#DA70D6|
|PaleGoldenRod				|#EEE8AA|
|PaleGreen						|#98FB98|
|PaleTurquoise				|#AFEEEE|
|PaleVioletRed				|#DB7093|
|PapayaWhip						|#FFEFD5|
|PeachPuff						|#FFDAB9|
|Peru									|#CD853F|
|Pink									|#FFC0CB|
|Plum									|#DDA0DD|
|PowderBlue						|#B0E0E6|
|Purple								|#800080|
|RebeccaPurple				|#663399|
|Red									|#FF0000|
|RosyBrown						|#BC8F8F|
|RoyalBlue						|#4169E1|
|SaddleBrown					|#8B4513|
|Salmon								|#FA8072|
|SandyBrown						|#F4A460|
|SeaGreen							|#2E8B57|
|SeaShell							|#FFF5EE|
|Sienna								|#A0522D|
|Silver								|#C0C0C0|
|SkyBlue							|#87CEEB|
|SlateBlue						|#6A5ACD|
|SlateGray						|#708090|
|SlateGrey						|#708090|
|Snow									|#FFFAFA|
|SpringGreen					|#00FF7F|
|SteelBlue						|#4682B4|
|Tan									|#D2B48C|
|Teal									|#008080|
|Thistle							|#D8BFD8|
|Tomato								|#FF6347|
|Turquoise						|#40E0D0|
|Violet								|#EE82EE|
|Wheat								|#F5DEB3|
|White								|#FFFFFF|
|WhiteSmoke						|#F5F5F5|
|Yellow								|#FFFF00|
|YellowGreen					|#9ACD32|

### uni.createCanvasContext(canvasId, this)

#### 定义

创建 ```canvas``` 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ```<canvas/>``` 组件

**Tip:** 需要指定 canvasId，该绘图上下文只作用于对应的 ```<canvas/>```

#### 参数

|参数|类型|说明|
|----|----|-----|
|canvasId|String	|画布表示，传入定义在 ```<canvas/>``` 的 canvas-id	|
|componentInstance|Object	|自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 ```<canvas/>``` ，如果省略，则不在任何自定义组件内查找	|

### uni.createContext
创建并返回绘图上下文。(不推荐使用)

### uni.drawCanvas

#### 定义

用所提供的 actions 在所给的 canvas-id 对应的 canvas 上进行绘图。 (不推荐使用)

#### 参数

|参数		|类型	|说明																																																					|
|----|----|----|
|canvasId	|String	|画布标识，传入 ```<canvas/>``` 的 cavas-id																																													|
|actions	|Array	|绘图动作数组，由 ```uni.createContext``` 创建的 context，调用 ```getActions``` 方法导出绘图动作数组。																																|
|reserve	|Boolean|(可选)本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用```drawCanvas```绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false	|

### uni.canvasToTempFilePath(OBJECT, this)

把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。

**OBJECT参数说明：**

|参数	|类型		|必填		|说明	|
|---|---|---|---|---|
|x	|Number		|否			|画布x轴起点（默认0）|					
|y	|Number		|否			|画布y轴起点（默认0）|					
|width	|Number		|否			|画布宽度（默认为canvas宽度-x）|					
|height	|Number		|否			|画布高度（默认为canvas高度-y）|					
|destWidth	|Number		|否			|输出图片宽度（默认为 width * 屏幕像素密度）|					
|destHeight	|Number		|否			|输出图片高度（默认为 height * 屏幕像素密度）|					
|canvasId	|String		|是			|画布标识，传入 ``<canvas/>`` 的 canvas-id|						
|fileType	|String		|否			|目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'|		
|quality	|Number		|否			|图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理|		
|success	|Function	|否			|接口调用成功的回调函数|						
|fail	|Function	|否			|接口调用失败的回调函数|						
|complete	|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）		|

**示例代码**

```javascript
uni.canvasToTempFilePath({
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  destWidth: 100,
  destHeight: 100,
  canvasId: 'myCanvas',
  success: function(res) {
    console.log(res.tempFilePath)
  } 
})
```


### uni.canvasGetImageData(OBJECT)

返回一个数组，用来描述 canvas 区域隐含的像素数据

**OBJECT参数说明：**

|参数	|类型		|必填		|说明	|最低版本											|
|---			|---			|---	|---								|--|
|canvasId	|String		|是			|画布标识，传入 ```<canvas />``` 的 canvas-id|													|
|x	|Number		|是			|将要被提取的图像数据矩形区域的左上角 x 坐标|													|
|y	|Number		|是			|将要被提取的图像数据矩形区域的左上角 y 坐标|													|
|width	|Number		|是			|将要被提取的图像数据矩形区域的宽度|													|
|height	|Number		|是			|将要被提取的图像数据矩形区域的高度|													|
|success	|Function	|否			|接口调用成功的回调函数|													|
|fail	|Function	|否			|接口调用失败的回调函数|													|
|complete	|Function	|否		|接口调用结束的回调函数（调用成功、失败都会执行）	|&nbsp;|

**success回调返回参数：**

|参数	|类型				|说明													|
|---|---|---|
|errMsg	|String				|														|
|width	|Number				|图像数据矩形的宽度										|
|height	|Number				|图像数据矩形的高度										|
|data	|Uint8ClampedArray	|图像像素点数据，一维数组，每四项表示一个像素点的rgba	|


**示例代码**

```javascript
uni.canvasGetImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  success(res) {
    console.log(res.width) // 100
    console.log(res.height) // 100
    console.log(res.data instanceof Uint8ClampedArray) // true
    console.log(res.data.length) // 100 * 100 * 4
  }
})
```


### uni.canvasPutImageData(OBJECT)

将像素数据绘制到画布的方法

**OBJECT参数说明：**

|参数	|类型		|必填		|说明	|最低版本											|
|---			|---			|---	|---								|--|
|canvasId	|String		|是								|画布标识，传入 ```<canvas />``` 的 canvas-id|																												|
|data	|Uint8ClampedArray|是								|图像像素点数据，一维数组，每四项表示一个像素点的rgba|																												|
|x	|Number		|是								|源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）|																												|
|y	|Number		|是								|源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）|																												|
|width	|Number		|是								|源图像数据矩形区域的宽度|																												|
|height	|Number		|否								|源图像数据矩形区域的高度|																												|
|success	|Function	|否								|接口调用成功的回调函数|																												|
|fail	|Function	|否								|接口调用失败的回调函数|																												|
|complete	|Function					|否	|接口调用结束的回调函数（调用成功、失败都会执行）				|&nbsp;	|

**示例代码**

```javascript
const data = new Uint8ClampedArray([255, 0, 0, 1])
uni.canvasPutImageData({
  canvasId: 'myCanvas',
  x: 0,
  y: 0,
  width: 1,
  data: data,
  success(res) {}
})
```

### setFillStyle
canvasContext.setFillStyle
#### 定义

设置填充色。

**Tip:** 如果没有设置 fillStyle，默认颜色为 black。

#### 语法

```javascript
canvasContext.setFillStyle(color)
canvasContext.fillStyle = color // 基础库 1.9.90 起支持
```

#### 参数

|参数	|类型						|定义		|说明|
|---|---|---|---|
|color|[Color](/api/ui/canvas/color)|Gradient Object|填充色	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/fill-rect.png?t=201859)

### setStrokeStyle
canvasContext.setStrokeStyle
#### 定义

设置边框颜色。

**Tip:** 如果没有设置 fillStyle，默认颜色为 black。

#### 语法

```javascript
canvasContext.setStrokeStyle(color)
canvasContext.strokeStyle = color // 基础库 1.9.90 起支持
```

#### 参数

|参数	|类型	|定义						|说明		|
|---	|---	|---						|---		|
|color|[Color](/api/ui/canvas/color)|Gradient Object|填充色	|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setStrokeStyle('red')
ctx.strokeRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/stroke-rect.png?t=201859)

### setShadow
canvasContext.setShadow

#### 定义

设置阴影样式。

**Tip:** 如果没有设置，offsetX 默认值为0， offsetY 默认值为0， blur 默认值为0，color 默认值为 black。

#### 参数

|参数		|类型		|定义						|说明														|
|---		|---		|---						|---														|
|offsetX|Number	|								|阴影相对于形状在水平方向的偏移	|
|offsetY|Number	|								|阴影相对于形状在竖直方向的偏移	|
|blur		|Number	|0~100					|阴影的模糊级别，数值越大越模糊	|
|color	|[Color](/api/ui/canvas/color)	|								|阴影的颜色											|

**示例代码**

```javascript
const ctx = uni.createCanvasContext('myCanvas')
ctx.setFillStyle('red')
ctx.setShadow(10, 50, 50, 'blue')
ctx.fillRect(10, 10, 150, 75)
ctx.draw()
```

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/shadow.png?t=201859)

### shadowBlur
canvasContext.shadowBlur

#### 定义

设置阴影的模糊级别

#### 语法

```javascript
canvasContext.shadowBlur = value
```

### shadowColor
canvasContext.shadowColor

#### 定义

设置阴影的颜色

#### 语法

```javascript
canvasContext.shadowColor = value
```


### shadowOffsetX
canvasContext.shadowOffsetX
#### 定义

设置阴影相对于形状在水平方向的偏移

#### 语法

```javascript
canvasContext.shadowOffsetX = value
```

### shadowOffsetY
canvasContext.shadowOffsetY
#### 定义

设置阴影相对于形状在垂直方向的偏移

#### 语法

```javascript
canvasContext.shadowOffsetY = value
```

### createLinearGradient
canvasContext.createLinearGradient

#### 定义

创建一个线性的渐变颜色。

**Tip:** 

需要使用 ```addColorStop()``` 来指定渐变点，至少要两个。

#### 参数

|参数	|类型		|定义				|
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

### createCircularGradient
canvasContext.createCircularGradient

#### 定义

创建一个圆形的渐变颜色。

**Tip:** 起点在圆心，终点在圆环。

**Tip:** 需要使用 addColorStop() 来指定渐变点，至少要两个。

#### 参数

|参数	|类型		|定义				|
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

### addColorStop
canvasContext.addColorStop

#### 定义

创建一个颜色的渐变点。

**Tip:** 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。

**Tip:** 需要使用 ```addColorStop()``` 来指定渐变点，至少要两个。

#### 参数

|参数	|类型		|定义							|
|---	|---	|---		|
|stop	|Number(0-1)|表示渐变点在起点和终点中的位置	|
|color	|[Color](/api/ui/canvas/color)		|渐变点的颜色					|

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

### setLineWidth
canvasContext.setLineWidth

#### 定义

设置线条的宽度。

#### 语法

```javascript
canvasContext.setLineWidth(lineWidth)
canvasContext.lineWidth = lineWidth // 基础库 1.9.90 起支持
```

#### 参数

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

### setLineCap
canvasContext.setLineCap

#### 定义

设置线条的端点样式。

#### 语法

```javascript
canvasContext.setLineCap(lineCap)
canvasContext.lineCap = lineCap // 基础库 1.9.90 起支持
```

#### 参数

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

### setLineJoin
canvasContext.setLineJoin

#### 定义

设置线条的交点样式。

#### 语法

```javascript
canvasContext.setLineJoin(lineJoin)
canvasContext.lineJoin = lineJoin // 基础库 1.9.90 起支持
```

#### 参数

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

### setLineDash
canvasContext.setLineDash

#### 定义

设置线条宽度。

#### 参数

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

### setMiterLimit
canvasContext.setMiterLimit

#### 定义

设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 setLineJoin() 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示。

#### 语法

```javascript
canvasContext.setMiterLimit(miterLimit)
canvasContext.miterLimit = miterLimit // 基础库 1.9.90 起支持
```

#### 参数

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

### fillRect
canvasContext.fillRect

#### 定义

填充一个矩形。

**Tip:** 用 ```setFillStyle()``` 设置矩形的填充色，如果没设置默认是黑色。

#### 参数

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

### strokeRect
canvasContext.strokeRect

**定义**

画一个矩形(非填充)。

**Tip:** 用 setFillStroke() 设置边框颜色，如果没设置默认是黑色。

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


### clearRect
canvasContext.clearRect

#### 定义

清除画布上在该矩形区域内的内容。

**Tip:** clearRect 并非画一个白色的矩形在地址区域，而是清空，为了有直观感受，对 canvas 加了一层背景色。

```javascript
<canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
```

#### 参数

|参数		|类型		|说明									|
|---	|---	|---	|
|x			|Number	|矩形区域左上角的x坐标|
|y			|Number	|矩形区域左上角的y坐标|
|width	|Number	|矩形区域的宽度				|
|height	|Number	|矩形区域的高度				|

**示例代码**

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

### fill
canvasContext.fill

**定义**

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

### stroke
canvasContext.stroke

**定义**

画出当前路径的边框。默认颜色色为黑色。

**Tip:** ```stroke()`` 描绘的的路径是从 ```beginPath()``` 开始计算，但是不会将 ```strokeRect()``` 包含进去，详情见例二。

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

### beginPath
canvasContext.beginPath

**定义**

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

### closePath
canvasContext.closePath

**定义**

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

### arc
canvasContext.arc

**定义**

画一条弧线。

**Tip:** 创建一个圆可以用 ```arc()``` 方法指定其实弧度为0，终止弧度为 ```2 * Math.PI```。
**Tip:** 用 ```stroke()``` 或者 ```fill()``` 方法来在 ```canvas``` 中画弧线。

**参数**

|参数				|类型	|说明															|
|---				|---	|---															|
|x					|Number	|圆的x坐标														|
|y					|Number	|圆的y坐标														|
|r					|Number	|圆的半径														|
|sAngle				|Number	|起始弧度，单位弧度（在3点钟方向）								|
|eAngle				|Number	|终止弧度														|
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


### bezier-curve-to
canvasContext.bezier-curve-to

**定义**

创建三次方贝塞尔曲线路径。

**Tip:** 曲线的起始点为路径中前一个点。

**参数**

|参数	|类型	|说明						|
|---	|---	|---						|
|cp1x	|Number	|第一个贝塞尔控制点的 x 坐标|
|cp1y	|Number	|第一个贝塞尔控制点的 y 坐标|
|cp2x	|Number	|第二个贝塞尔控制点的 x 坐标|
|cp2y	|Number	|第二个贝塞尔控制点的 y 坐标|
|x		|Number	|结束点的 x 坐标			|
|y		|Number	|结束点的 y 坐标			|

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

### bezier-curve-to
canvasContext.bezier-curve-to

**定义**

创建二次贝塞尔曲线路径。

**Tip:** 曲线的起始点为路径中前一个点。

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


### clip
canvasContext.clip

**定义**

clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。

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


### fillText
canvasContext.fillText

**定义**

在画布上绘制被填充的文本。


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

![uniapp](//img-cdn-qiniu.dcloud.net.cn/uniapp/images/text.png?t=201859)


### setTextAlign 
canvasContext.setTextAlign 

**定义**

用于设置文字的对齐

**语法**

```javascript
canvasContext.setTextAlign(align)
canvasContext.textAlign = align // 基础库 1.9.90 起支持
```

|参数	|类型	|定义								|
|---	|---	|---								|
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


### setTextBaseline
canvasContext.setTextBaseline

**定义**

用于设置文字的水平对齐

**语法**

```javascript
canvasContext.setTextBaseline(textBaseline)
canvasContext.textBaseline = textBaseline // 基础库 1.9.90 起支持
```

**参数**

|参数	|类型			|说明										|
|---	|---			|---										|
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


### drawImage
canvasContext.drawImage

**定义**

绘制图像到画布。


**参数**

|参数			|类型	|说明													|
|---	|---			|---	|
|imageResource	|String	|所要绘制的图片资源										|
|dx				|Number	|图像的左上角在目标canvas上 X 轴的位置					|
|dy				|Number	|图像的左上角在目标canvas上 Y 轴的位置					|
|dWidth			|Number	|在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放	|
|dHeight			|Number	|在目标画布上绘制图像的高度，允许对绘制的图像进行缩放	|
|sx				|Number	|源图像的矩形选择框的左上角 X 坐标						|
|sy				|Number	|源图像的矩形选择框的左上角 Y 坐标						|
|sWidth			|Number	|源图像的矩形选择框的高度								|
|sHeight		|Number	|源图像的矩形选择框的高度								|

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


### setGlobalAlpha
canvasContext.setGlobalAlpha

**定义**

设置全局画笔透明度。

**定义**

```javascript
canvasContext.setGlobalAlpha(alpha)
canvasContext.globalAlpha = alpha // 基础库 1.9.90 起支持
```

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


### save    
canvasContext.save

**定义**

保存当前的绘图上下文。

### restore

**定义**

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


### draw
canvasContext.draw

**定义**

将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。

**Tip:** 绘图上下文需要由 uni.createCanvasContext(canvasId) 来创建。

**参数**

|参数		|类型		|说明																																																						|最低版本	|
|---		|---		|---																																																						|---		|
|reserve	|Boolean	|非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false	|			|
|callback	|Function	|绘制完成后回调																																																				|1.7.0		|

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


### getActions

返回绘图上下文的绘图动作。(不推荐使用)

### clearActions 
canvasContext.clearActions (不推荐使用)

清空绘图上下文的绘图动作。

### measureText
canvasContext.measureText

**定义**

测量文本尺寸信息，目前仅返回文本宽度。同步接口。


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

### globalCompositeOperation
canvasContext.globalCompositeOperation

**定义**

该属性是设置要在绘制新形状时应用的合成操作的类型。

**语法**

```javascript
canvasContext.globalCompositeOperation = type
```

**参数**

|参数	|类型	|说明								|
|---	|---	|---								|
|type	|String	|标识要使用哪种合成或混合模式操作	|

** type 支持的操作有：**

|平台	|操作																																																			|
|---|---|
|安卓	|xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light																													|
|iOS	|xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity	|

**Bug:** 目前安卓版本只适用于 fill 填充块的合成，用于 stroke 线段的合成效果都是 source-over

### arcTo
canvasContext.arcTo

**定义**

根据控制点和半径绘制圆弧路径。

**语法** 

```javascript
canvasContext.arcTo(x1, y1, x2, y2, radius)
```

**参数**

|属性值	|类型	|说明					|
|---	|---	|---	|
|x1		|Number	|第一个控制点的 x 轴坐标|
|y1		|Number	|第一个控制点的 y 轴坐标|
|x2		|Number	|第二个控制点的 x 轴坐标|
|y2		|Number	|第二个控制点的 y 轴坐标|
|radius	|Number	|圆弧的半径				|

### strokeText
canvasContext.strokeText

**定义**

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


### lineDashOffset
canvasContext.lineDashOffset

**定义**

设置虚线偏移量的属性

**语法**

```javascript
canvasContext.lineDashOffset = value
```


**参数**

|参数	|类型	|说明				|
|---	|---	|---				|
|value	|Number	|偏移量，初始值为 0	|


### createPattern
canvasContext.createPattern

**定义**

对指定的图像创建模式的方法，可在指定的方向上重复元图像

**语法**

```javascript
canvasContext.createPattern(image, repetition)
```

**参数**

|参数		|类型	|说明																|
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


### font
canvasContext.font

**定义**

设置当前字体样式的属性

**语法**

```javascript
canvasContext.font = value
```


**参数**

|参数	|类型	|说明																							|
|---	|---	|---																							|
|value	|String	|符合 CSS font 语法的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif|

value 支持的属性有：

|属性	|说明										|
|---|---|
|style	|字体样式。仅支持 italic, oblique, normal	|
|weight	|字体粗细。仅支持 normal, bold				|
|size	|字体大小									|
|family	|字体族名。注意确认各平台所支持的字体		|

### setTransform
canvasContext.setTransform

**定义**

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
