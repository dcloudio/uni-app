## DrawableContext



### DrawableContext 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |




### DrawableContext 的属性值 @drawablecontext-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| font | string | 是 | 10px | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置字体大小 |
| fillStyle | [string.ColorString](/uts/data-type.md#ide-string) | 是 | #000 (黑色) | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置填充颜色 |
| lineCap | string | 是 | butt | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 指定如何绘制每一条线条末端的属性，可选值：`butt`线段末端以方形结束；`round`线段末端以圆形结束；`square`线段末端以方形结束，但是会增加一个一半宽度的矩形区域。 |
| lineDashOffset | number | 是 | - | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置虚线偏移量 |
| lineJoin | string | 是 | miter | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置 2 个长度不为 0 的线条相连部分如何连接在一起的属性，可选值：`bevel`斜角；`round`圆角；`miter`尖角。 |
| lineWidth | number | 是 | 1px | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置线条的宽度 |
| strokeStyle | [string.ColorString](/uts/data-type.md#ide-string) | 是 | #000 (黑色) | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置边框的颜色 |
| textAlign | string | 是 | left | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): x | 设置文本的对齐方式，可取值：`left`左对齐；`center`居中对齐；`right`右对齐。 |


### DrawableContext 的方法 @drawablecontext-methods

#### beginPath(): void @beginpath

创建一个新的空路径

##### beginPath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |








#### arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean \| null): void @arc

绘制一段弧线

##### arc 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆心的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆心的Y轴坐标 |
| radius | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆弧的半径 |
| startAngle | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆弧的起始点，x 轴方向开始计算，单位为弧度 |
| endAngle | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆弧的终点，单位为弧度 |
| anticlockwise | boolean | 否 | true | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 圆弧绘制方向，true：逆时针绘制，false：顺时针绘制。 | 






#### moveTo(x: number, y: number): void @moveto

将一个新的路径的起始点移动到 (x，y) 坐标

##### moveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 点的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 点的Y轴坐标 | 






#### rect(x: number, y: number, width: number, height: number): void @rect

创建一个矩形路径

##### rect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的Y轴坐标 |
| width | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形宽度 |
| height | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形高度 | 






#### lineTo(x: number, y: number): void @lineto

将路径的最后一个点连接到 (x，y) 坐标

##### lineTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 线终点的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 线终点的Y轴坐标 | 






#### closePath(): void @closepath

闭合路径，将最后一个点与起点连接起来。如果图形已经封闭，或者只有一个点，那么此方法不会产生任何效果。

##### closePath 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |








#### stroke(): void @stroke

绘制当前或已经存在的路径的边框。

##### stroke 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |








#### strokeRect(x: number, y: number, width: number, height: number): void @strokerect

绘制一个矩形框

##### strokeRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的Y轴坐标 |
| width | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形宽度 |
| height | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形高度 | 






#### strokeText(text: string, x: number, y: number): void @stroketext

绘制空心字符

##### strokeText 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 要绘制的字符 |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 字符开始绘制的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 字符开始绘制的Y轴坐标 | 






#### fill(fillRule?: string \| null): void @fill

填充当前或已存在的路径

##### fill 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fillRule | string | 否 | nonzero | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 填充规则。可取值：`nonzero`非零环绕规则；`evenodd`奇偶环绕规则。 | 






#### fillRect(x: number, y: number, width: number, height: number): void @fillrect

绘制一个实心矩形

##### fillRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形起点的Y轴坐标 |
| width | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形宽度 |
| height | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 矩形高度 | 






#### fillText(text: string, x: number, y: number): void @filltext

绘制实心字符

##### fillText 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 要绘制的字符 |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 字符开始绘制的X轴坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 字符开始绘制的Y轴坐标 | 






#### reset(): void @reset

清空绘制数据

##### reset 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |








#### update(): void @update

将所有绘制内容更新到画布上

##### update 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |








#### setLineDash(segments: Array\<number>): void @setlinedash

设置虚线样式

##### setLineDash 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| segments | number[\] | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 一组描述交替绘制线段和间距长度的数字。 | 






#### bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void @beziercurveto

创建三次方贝塞尔曲线路径

##### bezierCurveTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | 3.9 | 4.11 | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| cp1x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 第一个贝塞尔控制点的 x 坐标 |
| cp1y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 第一个贝塞尔控制点的 y 坐标 |
| cp2x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 第二个贝塞尔控制点的 x 坐标 |
| cp2y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 第二个贝塞尔控制点的 y 坐标 |
| x | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 结束点的 x 坐标 |
| y | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 结束点的 y 坐标 | 







### 示例 
 示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/element-draw/element-draw.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/element-draw/element-draw.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/element-draw/element-draw
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view>
      <view class="drawing" id="draw-text-view"></view>
      <view class="drawing" id="draw-line-view"></view>
      <view class="drawing" id="draw-circle-view"></view>
      <view class="drawing" id="draw-dash-line"></view>
      <view class="drawing" id="draw-house"></view>
      <view class="drawing" id="draw-style"></view>
      <view class="drawing" id="draw-odd"></view>
      <view class="drawing" id="draw-arcto"></view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  var y = 160
  const texts: string[] = [
    'HBuilderX，轻巧、极速，极客编辑器',
    'uni-app x，终极跨平台方案',
    'uniCloud，js serverless云服务',
    'uts，大一统语言',
    'uniMPSdk，让你的App具备小程序能力',
    'uni-admin，开源、现成的全端管理后台',
    'uni-id，开源、全端的账户中心',
    'uni-pay，开源、云端一体、全平台的支付',
    'uni-ai，聚合ai能力',
    'uni-cms，开源、云端一体、全平台的内容管理平台',
    'uni-im，开源、云端一体、全平台的im即时消息',
    'uni统计，开源、完善、全平台的统计报表',
    '......'
  ]

  onPageShow(() => {
  })

  onUnload(() => {
    y = 160
  })

  function drawText() {
    let element = uni.getElementById('draw-text-view')!
    let ctx = element.getDrawableContext()!
    let width = element.getBoundingClientRect().width
    ctx.reset()
    ctx.font = "15px Arial"
    ctx.textAlign = "center"
    for (var i = 0; i < texts.length; i++) {
      let value = texts[i]
      if (i % 2 == 0) {
        ctx.fillText(value, width / 2, (20 * (i + 1)))
      } else {
        ctx.lineWidth = 0.5
        ctx.strokeText(value, width / 2, (20 * (i + 1)))
      }
    }
    ctx.update()
  }

  function drawDashedLine(pattern : Array<number>, ctx : DrawableContext) {
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();
    y += 15;
  }

  function drawLines() {
    let ctx = uni.getElementById('draw-line-view')!.getDrawableContext()!
    ctx.reset()
    ctx.lineWidth = 10;

    ["round", "bevel", "miter"].forEach((join, i) => {
      ctx.lineJoin = join;
      ctx.beginPath();
      ctx.moveTo(5, 10 + i * 40);
      ctx.lineTo(50, 50 + i * 40);
      ctx.lineTo(90, 10 + i * 40);
      ctx.lineTo(130, 50 + i * 40);
      ctx.lineTo(170, 10 + i * 40);
      ctx.stroke();
    });
    ctx.lineWidth = 1
    var space = 170
    ctx.strokeStyle = '#09f';
    ctx.beginPath();
    ctx.moveTo(10 + space, 10);
    ctx.lineTo(140 + space, 10);
    ctx.moveTo(10 + space, 140);
    ctx.lineTo(140 + space, 140);
    ctx.stroke();
    // Draw lines
    ctx.strokeStyle = 'black';
    ['butt', 'round', 'square'].forEach((lineCap, i) => {
      ctx.lineWidth = 15;
      ctx.lineCap = lineCap;
      ctx.beginPath();
      ctx.moveTo(25 + space + i * 50, 10);
      ctx.lineTo(25 + space + i * 50, 140);
      ctx.stroke();
    });
    ctx.lineWidth = 1;
    drawDashedLine([], ctx);
    drawDashedLine([2, 2], ctx);
    drawDashedLine([10, 10], ctx);
    drawDashedLine([20, 5], ctx);
    drawDashedLine([15, 3, 3, 3], ctx);
    drawDashedLine([20, 3, 3, 3, 3, 3, 3, 3], ctx);
    ctx.lineDashOffset = 18;
    drawDashedLine([12, 3, 3], ctx);
    ctx.lineDashOffset = 0
    ctx.setLineDash([0])
    ctx.update()
  }

  function drawCircles() {
    let ctx = uni.getElementById('draw-circle-view')!.getDrawableContext()!
    ctx.reset()
    // Draw shapes
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.beginPath();
        var x = 25 + j * 50;               // x coordinate
        var y = 25 + i * 50;               // y coordinate
        var radius = 20;                    // Arc radius
        var startAngle = 0;                     // Starting point on circle
        var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        var clockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, clockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
    ctx.update()
  }

  function drawStar() {
    let ctx = uni.getElementById('draw-dash-line')!.getDrawableContext()!
    ctx.reset()
    ctx.beginPath();
    var horn = 5; // 画5个角
    var angle = 360 / horn; // 五个角的度数
    // 两个圆的半径
    var R = 50;
    var r = 20;
    // 坐标
    var x = 100;
    var y = 100;
    // #ifdef APP-HARMONY
    //TODO 鸿蒙首次调用lineTo并不是起始点，这里暂时先调用一次moveTo
    ctx.moveTo(Math.cos((18 + 0 * angle) / 180.0 * Math.PI) * R + x, -Math.sin((18 + 0 * angle) / 180.0 * Math.PI) * R + y);
    // #endif
    for (var i = 0; i < horn; i++) {
      // 角度转弧度：角度/180*Math.PI
      // 外圆顶点坐标
      ctx.lineTo(Math.cos((18 + i * angle) / 180.0 * Math.PI) * R + x, -Math.sin((18 + i * angle) / 180.0 * Math.PI) * R + y);
      // 內圆顶点坐标
      ctx.lineTo(Math.cos((54 + i * angle) / 180.0 * Math.PI) * r + x, -Math.sin((54 + i * angle) / 180.0 * Math.PI) * r + y);
    }
    // closePath：关闭路径，将路径的终点与起点相连
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.fillStyle = '#E4EF00';
    ctx.strokeStyle = "red";
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth = 10;
    ctx.beginPath()
    ctx.moveTo(170, 100)
    ctx.lineTo(255, 15)
    ctx.lineTo(340, 100)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "blue"
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(170, 145)
    ctx.lineTo(255, 45)
    ctx.lineTo(340, 145)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = "gray"
    ctx.stroke()
    // 未设置beginPath，导致上下表现一致，与前端一致
    ctx.moveTo(170, 190)
    ctx.lineTo(255, 90)
    ctx.lineTo(340, 190)
    ctx.closePath()
    ctx.fillStyle = "orange"
    ctx.fill()
    ctx.strokeStyle = "khaki"
    ctx.stroke()
    ctx.update()
  }

  function hex(num : number) : string {
    if (num == 0) {
      return "00"
    }
    let hexChars = "0123456789ABCDEF";
    let result = "";
    while (num > 0) {
      let remainder = Math.floor(num) % 16;
      result = hexChars[remainder] + result;
      num = Math.floor(Math.floor(num) / 16);
    }
    if (result.length == 1) {
      return "0" + result
    }
    return result
  }

  function drawhouse() {
    let ctx = uni.getElementById('draw-house')!.getDrawableContext()!
    ctx.reset()
    ctx.lineWidth = 10;

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
    ctx.update()
  }

  function drawPoint() {
    let ctx = uni.getElementById('draw-style')!.getDrawableContext()!
    ctx.reset()
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        ctx.strokeStyle = `rgb(0,${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * j)})`;
        ctx.beginPath();
        ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * j)},0)`;
        ctx.fillRect(180 + j * 25, i * 25, 25, 25);
      }
    }
    ctx.update()
  }

  function drawRect() {
    let ctx = uni.getElementById('draw-odd')!.getDrawableContext()!
    ctx.reset()
    // Create path
    ctx.moveTo(30, 90);
    ctx.lineTo(110, 20);
    ctx.lineTo(240, 130);
    ctx.lineTo(60, 130);
    ctx.lineTo(190, 20);
    ctx.lineTo(270, 90);
    ctx.closePath();

    // Fill path
    ctx.fillStyle = "green";
    ctx.fill("evenodd");
    ctx.update()

  }

  function drawArcTo() {
    let ctx = uni.getElementById('draw-arcto')!.getDrawableContext()!
    ctx.reset()
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
    ctx.stroke();

    ctx.fillStyle = "blue";
    // start point
    ctx.fillRect(50, 20, 10, 10);
    // end point
    ctx.fillRect(50, 100, 10, 10);

    ctx.fillStyle = "red";
    // control point one
    ctx.fillRect(230, 30, 10, 10);
    // control point two
    ctx.fillRect(150, 70, 10, 10);

    ctx.fillStyle = 'transparent'
    ctx.fillRect(150, 70, 20, 20);

    ctx.update()
  }

  onReady(() => {
    drawText()
    drawLines()
    drawCircles()
    drawStar()
    drawhouse()
    drawPoint()
    drawRect()
    drawArcTo()
  })
</script>

<style>
  .drawing {
    height: 275px;
    background-color: lightgray;
    margin-bottom: 15px;
  }
</style>

```
:::

## Bug & Tips@tips
+ 同时使用`border-radius`和`DrawableContext`，可能会出现`DrawableContext`绘制内容超出border区域的情况。
+ 如果绘制过多内容或者绘制复杂图形时，建议设置`android-layer-type`为`hardware`，提高绘制效率。具体可参考[`android-layer-type`文档](../component/common.md#attribute-android)
+ iOS 平台绘制大量文字时相较于绘制其他内容性能会显著下降，可使用`text`组件代替。
+ uni-app-x harmony 暂不支持功能：line相关效果/镂空字体
