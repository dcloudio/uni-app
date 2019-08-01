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