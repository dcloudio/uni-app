### drawCanvas

#### 定义

用所提供的 actions 在所给的 canvas-id 对应的 canvas 上进行绘图。 (不推荐使用)

#### 参数

|参数		|类型	|说明																																																					|
|----|----|----|
|canvasId	|String	|画布标识，传入 ```<canvas/>``` 的 cavas-id																																													|
|actions	|Array	|绘图动作数组，由 ```uni.createContext``` 创建的 context，调用 ```getActions``` 方法导出绘图动作数组。																																|
|reserve	|Boolean|(可选)本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用```drawCanvas```绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false	|