## Path2D

Path2D用来声明路径，用来在canvas中根据需要创建可以保留并重用的路径, 此路径会被CanvasRenderingContext2D对象使用







### Path2D 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |

<!-- CUSTOMTYPEJSON.Path2D.example -->

### Path2D 的方法 @path2d-methods
#### closePath(): void @closepath

闭合路径，将最后一个点与起点连接起来。如果图形已经封闭，或者只有一个点，那么此方法不会产生任何效果。

##### closePath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |








#### moveTo(x: number, y: number): void @moveto

将一个新的路径的起始点移动到 (x，y) 坐标

##### moveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 点的X轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 点的Y轴坐标 | 






#### lineTo(x: number, y: number): void @lineto

将路径的最后一个点连接到 (x，y) 坐标

##### lineTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 线终点的X轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 线终点的Y轴坐标 | 






#### bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void @beziercurveto

创建三次方贝塞尔曲线路径

##### bezierCurveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cp1x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个贝塞尔控制点的 x 坐标 |
| cp1y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个贝塞尔控制点的 y 坐标 |
| cp2x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个贝塞尔控制点的 x 坐标 |
| cp2y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个贝塞尔控制点的 y 坐标 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 x 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 y 坐标 | 






#### quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void @quadraticcurveto

创建二次贝塞尔曲线路径

##### quadraticCurveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cpx | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 贝塞尔控制点的 x 坐标 |
| cpy | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 贝塞尔控制点的 y 坐标 |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 x 坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 结束点的 y 坐标 | 






#### arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): void @arc

绘制一段弧线

##### arc 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧中心（圆心）的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧中心（圆心）的 y 轴坐标 |
| radius | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的半径 |
| startAngle | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的起始点，x 轴方向开始计算，单位为弧度 |
| endAngle | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的终点，单位为弧度 |
| anticlockwise | boolean | 是 | true | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧绘制方向，true：逆时针绘制，false：顺时针绘制。 | 






#### arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void @arcto

根据控制点和半径绘制圆弧路径，使用当前的描点 (前一个 moveTo 或 lineTo 等函数的止点)。根据当前描点与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径

##### arcTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 x 轴坐标 |
| y1 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第一个控制点的 y 轴坐标 |
| x2 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 x 轴坐标 |
| y2 | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 第二个控制点的 y 轴坐标 |
| radius | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 圆弧的半径 | 






#### ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise: boolean): void @ellipse

添加椭圆路径。椭圆的圆心在（x,y）位置，半径分别是radiusX 和 radiusY，按照anticlockwise（默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束

##### ellipse 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | - | x | x | - |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆圆心的 x 轴（水平）坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆圆心的 y 轴（垂直）坐标 |
| radiusX | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆长轴的半径。必须为非负数 |
| radiusY | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆短轴的半径。必须为非负数。 |
| rotation | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆的旋转角度，以弧度表示。 |
| startAngle | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆弧的起始偏心角，从正 x 轴沿顺时针测量，用弧度表示。 |
| endAngle | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 椭圆弧的结束偏心角，从正 x 轴沿顺时针测量，用弧度表示。 |
| anticlockwise | boolean | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 一个可选的布尔值，如果为 true，则逆时针绘制椭圆弧。默认值为 false（顺时针）。 | 






#### rect(x: number, y: number, width: number, height: number): void @rect

创建一个矩形路径

##### rect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.25 | 4.25 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径起点的 x 轴坐标 |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径起点的 y 轴坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径的宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 矩形路径的高度 | 






**注意事项**

## uni-app-x harmony

draw(path2D) 不受 context 的 moveTo 影响，如果需要指定位置需要调用 path2D的moveTo方法，示例如下：

```js
uni.createCanvasContextAsync({
  id: 'canvas',
  component: this, // setup 模式使用 getCurrentInstance()
  success: (canvasContext : CanvasContext) => {
    const context = canvasContext.getContext('2d')!;
    const canvas = context.canvas;

    const dpr = uni.getWindowInfo().pixelRatio;
    context.scale(dpr, dpr);

    context.beginPath()
    const path2D = canvasContext!.createPath2D();
    const amplitude = 64;
    const wavelength = 64;
    for (let i = 0; i < 5; i++) {
      const x1 = 0 + (i * wavelength);
      const y1 = 128;
      const x2 = x1 + wavelength / 4;
      const y2 = y1 - amplitude;
      const x3 = x1 + 3 * wavelength / 4;
      const y3 = y1 + amplitude;
      const x4 = x1 + wavelength;
      const y4 = y1;
      // context.moveTo(x1, y1); 这里调用moveTo无效，需要使用path2D.moveTo(x1, y1);
      path2D.bezierCurveTo(x2, y2, x3, y3, x4, y4);
    }
    context.stroke(path2D);
  }
})
```
