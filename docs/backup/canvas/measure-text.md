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
