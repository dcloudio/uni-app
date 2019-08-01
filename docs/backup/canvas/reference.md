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














