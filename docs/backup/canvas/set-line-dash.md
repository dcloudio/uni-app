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