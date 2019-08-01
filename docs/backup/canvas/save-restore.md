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
