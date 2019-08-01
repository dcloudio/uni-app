## 在Canvas上画图

所有在 ```<canvas/>``` 中的画图必须用 JavaScript 完成：

WXML：（我们在接下来的例子中如无特殊声明都会用这个 WXML 为模板，不再重复）

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

CanvasContext 是小程序内建的一个对象，有一些绘图的方法：

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