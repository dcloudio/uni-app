#### canvas

画布。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|type|String||指定 canvas 类型，支持 2d (2.9.0) 和 webgl|微信小程序 2.7.0+|
|canvas-id|String||canvas 组件的唯一标识符||
|disable-scroll|Boolean|false|当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新|字节跳动小程序不支持|
|@touchstart|EventHandle||手指触摸动作开始|字节跳动小程序不支持|
|@touchmove|EventHandle||手指触摸后移动|字节跳动小程序不支持|
|@touchend|EventHandle||手指触摸动作结束|字节跳动小程序不支持|
|@touchcancel|EventHandle||手指触摸动作被打断，如来电提醒，弹窗|字节跳动小程序不支持|
|@longtap|EventHandle||手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动|字节跳动小程序不支持|
|@error|EventHandle||当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}|字节跳动小程序不支持|

**注意事项：**

* canvas 标签默认宽度 300px、高度 225px，动态修改 canvas 大小后需要重新绘制。
* 同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作。
* canvas 在微信小程序、百度小程序、QQ小程序中为原生组件，层级高于前端组件，请勿内嵌在 scroll-view、swiper、picker-view、movable-view 中使用。解决 canvas 层级过高无法覆盖，参考 [native-component](/component/native-component)。其他小程序端的 canvas 仍然为 webview 中的 canvas。
* app-vue 中的 canvas 仍然是 webview 的 canvas。app-nvue下如需使用canvas，需下载插件，暂未封装为uni API，可参考[文档](https://github.com/dcloudio/NvueCanvasDemo)使用。目前对nvue的开发者仍然建议在使用canvas时单独起一个vue页面，或者用web-view组件。
* app-vue的canvas虽然是webview自带的canvas，但却比nvue和微信小程序的原生canvas性能更高。注意并非原生=更快。canvas动画的流畅，关键不在于渲染引擎的速度，而在于减少从逻辑层向视图层频繁通信造成的折损。
* 小程序、app-nvue，因为通信阻塞，难以绘制非常流畅的canvas动画。h5和app-vue不存在此问题。但注意，app-vue下若想流畅的绘制canvas动画，需要使用[renderjs](https://uniapp.dcloud.io/frame?id=renderjs)技术，把操作canvas的js逻辑放到视图层运行，避免逻辑层和视图层频繁通信。hello uni-app的canvas示例很典型，在相同手机运行该示例，可以看出在h5端和app端非常流畅，而小程序端做不到这么流畅的动画。

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
 
相关 api：[uni.createCanvasContext](api/canvas/createCanvasContext)

**扩展阅读**

canvas的常用用途有图表和图片处理，在uni-app插件市场有大量基于canvas的插件，可搜索 [图表](https://ext.dcloud.net.cn/search?q=图表) 、 [头像裁剪](https://ext.dcloud.net.cn/search?q=头像裁剪) 、 [海报](https://ext.dcloud.net.cn/search?q=海报) 、 [二维码](https://ext.dcloud.net.cn/search?q=%E4%BA%8C%E7%BB%B4%E7%A0%81) 。

关于图表
- H5端流行的echart报表因为涉及大量dom操作，无法跨端使用，而wx-chart在跨端和更新方面都不足。如考虑小程序，推荐使用全端可用的[uChart](https://ext.dcloud.net.cn/plugin?id=271)。
- 如只考虑H5端，也可以继续使用echart、f2等常规web图表。
- 如不考虑小程序，那么App端和H5，也可以通过renderjs技术来使用echart、f2等web图表，功能性能比uchart更好。[什么是renderjs](https://uniapp.dcloud.io/frame?id=renderjs)、[基于renderjs使用echart的示例](https://ext.dcloud.net.cn/plugin?id=1207)


**nvue页面如何使用canvas**

HBuilderX 2.2.5（alpha）开始 nvue 页面支持 Canvas，支持 W3C WebGL API [WebGL 1.0](https://www.khronos.org/registry/webgl/specs/latest/1.0/)

示例工程地址：[NvueCanvasDemo](https://github.com/dcloudio/NvueCanvasDemo)
