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