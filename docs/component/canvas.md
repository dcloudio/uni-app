#### canvas

画布。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|canvas-id|String||canvas 组件的唯一标识符||
|disable-scroll|Boolean|false|当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新|头条小程序不支持|
|@touchstart|EventHandle||手指触摸动作开始|头条小程序不支持|
|@touchmove|EventHandle||手指触摸后移动|头条小程序不支持|
|@touchend|EventHandle||手指触摸动作结束|头条小程序不支持|
|@touchcancel|EventHandle||手指触摸动作被打断，如来电提醒，弹窗|头条小程序不支持|
|@longtap|EventHandle||手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动|头条小程序不支持|
|@error|EventHandle||当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}|头条小程序不支持|

**注：**

1. canvas 标签默认宽度 300px、高度 225px。
2. 同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作。
3. canvas在微信、百度小程序中为原生组件，层级高于前端组件，请勿内嵌在 scroll-view、swiper、picker-view、movable-view 中使用。解决 canvas 层级过高无法覆盖，[参考](/component/native-component)。canvas在App端vue页面不是原生组件，目前App端nvue还不支持canvas组件。
- App-nvue 暂不支持 canvas 组件

**示例：**
 
```html
<template>
	<view>
		<canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas"></canvas>
		<canvas style="width: 400px; height: 500px;" canvas-id="secondCanvas"></canvas>
		<canvas style="width: 400px; height: 500px;" canvas-id="secondCanvas" @error="canvasIdErrorCallback"></canvas>
	</view>
</template>
```
 
```javascript
export default {
	onReady: function (e) {
		var context = uni.createCanvasContext('firstCanvas')

		context.setStrokeStyle("#00ff00")
		context.setLineWidth(5)
		context.rect(0, 0, 200, 200)
		context.stroke()
		context.setStrokeStyle("#ff0000")
		context.setLineWidth(2)
		context.moveTo(160, 100)
		context.arc(100, 100, 60, 0, 2 * Math.PI, true)
		context.moveTo(140, 100)
		context.arc(100, 100, 40, 0, Math.PI, false)
		context.moveTo(85, 80)
		context.arc(80, 80, 5, 0, 2 * Math.PI, true)
		context.moveTo(125, 80)
		context.arc(120, 80, 5, 0, 2 * Math.PI, true)
		context.stroke()
		context.draw()
	},
	methods: {
		canvasIdErrorCallback: function (e) {
			console.error(e.detail.errMsg)
		}
	}
}
```
 
相关 api：[uni.createCanvasContext](api/ui/canvas?id=createcanvascontext)

**扩展阅读**

canvas的常用用途有图表和图片处理，在uni-app插件市场有大量基于canvas的插件，可搜索 [图表](https://ext.dcloud.net.cn/search?q=图表) 、 [头像裁剪](https://ext.dcloud.net.cn/search?q=头像裁剪) 、 [海报](https://ext.dcloud.net.cn/search?q=海报) 、 [二维码](https://ext.dcloud.net.cn/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81) 。

关于图表，H5端流行的echart报表因为涉及大量dom操作，无法跨端使用，而wx-chart在跨端和更新方面都不足，推荐使用[uChart组件](https://ext.dcloud.net.cn/plugin?id=271)。如仍然坚持使用原版echart，可在web-view组件中内嵌html来使用。
