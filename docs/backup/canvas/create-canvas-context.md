# uni.createCanvasContext(canvasId, this)

### 定义

创建 ```canvas``` 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ```<canvas/>``` 组件

**Tip:** 需要指定 canvasId，该绘图上下文只作用于对应的 ```<canvas/>```

### 参数

|参数							|类型		|说明																																																								|
|----|----|-----|
|canvasId					|String	|画布表示，传入定义在 ```<canvas/>``` 的 canvas-id																																				|
|componentInstance|Object	|自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 ```<canvas/>``` ，如果省略，则不在任何自定义组件内查找	|