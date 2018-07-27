<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<canvas class="canvas-element" canvas-id="canvas"></canvas>
				<scroll-view class="canvas-buttons" scroll-y="true">
					<block v-for="(name, index) in names" :key="index">
						<button class="canvas-button" @tap="handleCanvasButton(name)">{{name}}</button>
					</block>
					<!-- <button class="canvas-button" @tap="toTempFilePath" type="primary">toTempFilePath</button> -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue';

	var context = null;
	export default {
		data() {
			return {
				title: 'createContext',
				names: ["rotate", "scale", "reset", "translate", "save", "restore", "drawImage", "fillText", "fill",
					"stroke", "clearRect", "beginPath", "closePath", "moveTo", "lineTo", "rect", "arc",
					"quadraticCurveTo", "bezierCurveTo", "setFillStyle", "setStrokeStyle", "setGlobalAlpha",
					"setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"
				]
			}
		},
		onReady: function () {
			context = uni.createCanvasContext('canvas')
		},
		methods: {
			toTempFilePath: function () {
				uni.canvasToTempFilePath({
					canvasId: 'canvas',
					success: function (res) {
						console.log(res)
					},
					fail: function (res) {
						console.log(res)
					}
				})
			},
			handleCanvasButton: function (name) {
				this[name]()
			},
			rotate: function () {
				context.beginPath()
				context.rotate(10 * Math.PI / 180)
				context.rect(225, 75, 20, 10)
				context.fill()
				context.draw()
			},
			scale: function () {
				context.beginPath()
				context.rect(25, 25, 50, 50)
				context.stroke()

				context.scale(2, 2)

				context.beginPath()
				context.rect(25, 25, 50, 50)
				context.stroke()
				context.draw()
			},
			reset: function () {
				context.beginPath()

				context.setFillStyle('#000000')
				context.setStrokeStyle('#000000')
				context.setFontSize(10)
				context.setGlobalAlpha(1)
				context.setShadow(0, 0, 0, 'rgba(0, 0, 0, 0)')

				context.setLineCap('butt')
				context.setLineJoin('miter')
				context.setLineWidth(1)
				context.setMiterLimit(10)
				context.draw()
			},
			translate: function () {
				context.beginPath()
				context.rect(10, 10, 100, 50)
				context.fill()

				context.translate(70, 70)

				context.beginPath()
				context.fill()
				context.draw()
			},
			save: function () {
				context.beginPath()
				context.setStrokeStyle('#00ff00')
				context.save()

				context.scale(2, 2)
				context.setStrokeStyle('#ff0000')
				context.rect(0, 0, 100, 100)
				context.stroke()
				context.restore()

				context.rect(0, 0, 50, 50)
				context.stroke()
				context.draw()
			},
			restore: function () {
				[3, 2, 1].forEach(function (item) {
					context.beginPath()
					context.save()
					context.scale(item, item)
					context.rect(10, 10, 100, 100)
					context.stroke()
					context.restore()
				});
				context.draw()
			},
			drawImage: function () {
				context.drawImage('../../../static/uni@2x.png', 0, 0)
				context.draw()
			},
			fillText: function () {
				context.setStrokeStyle('#ff0000')

				context.beginPath()
				context.moveTo(0, 10)
				context.lineTo(300, 10)
				context.stroke()
				// context.save()
				// context.scale(1.5, 1.5)
				// context.translate(20, 20)
				context.setFontSize(10)
				context.fillText('Hello World', 0, 30)
				context.setFontSize(20)
				context.fillText('Hello World', 100, 30)

				// context.restore()

				context.beginPath()
				context.moveTo(0, 30)
				context.lineTo(300, 30)
				context.stroke()
				context.draw()
			},
			fill: function () {
				context.beginPath()
				context.rect(20, 20, 150, 100)
				context.setStrokeStyle('#00ff00')
				context.fill()
				context.draw()
			},
			stroke: function () {
				context.beginPath()
				context.moveTo(20, 20)
				context.lineTo(20, 100)
				context.lineTo(70, 100)
				context.setStrokeStyle('#00ff00')
				context.stroke()
				context.draw()
			},
			clearRect: function () {
				context.setFillStyle('#ff0000')
				context.beginPath()
				context.rect(0, 0, 300, 150)
				context.fill()
				context.clearRect(20, 20, 100, 50)
				context.draw()
			},
			beginPath: function () {
				context.beginPath()
				context.setLineWidth(5)
				context.setStrokeStyle('#ff0000')
				context.moveTo(0, 75)
				context.lineTo(250, 75)
				context.stroke()
				context.beginPath()
				context.setStrokeStyle('#0000ff')
				context.moveTo(50, 0)
				context.lineTo(150, 130)
				context.stroke()
				context.draw()
			},
			closePath: function () {
				context.beginPath()
				context.setLineWidth(1)
				context.moveTo(20, 20)
				context.lineTo(20, 100)
				context.lineTo(70, 100)
				context.closePath()
				context.stroke()
				context.draw()
			},
			moveTo: function () {
				context.beginPath()
				context.moveTo(0, 0)
				context.lineTo(300, 150)
				context.stroke()
				context.draw()
			},
			lineTo: function () {
				context.beginPath()
				context.moveTo(20, 20)
				context.lineTo(20, 100)
				context.lineTo(70, 100)
				context.stroke()
				context.draw()
			},
			rect: function () {
				context.beginPath()
				context.rect(20, 20, 150, 100)
				context.stroke()
				context.draw()
			},
			arc: function () {
				context.beginPath()
				context.setLineWidth(2)
				context.arc(75, 75, 50, 0, Math.PI * 2, true)
				context.moveTo(110, 75)
				context.arc(75, 75, 35, 0, Math.PI, false)
				context.moveTo(65, 65)
				context.arc(60, 65, 5, 0, Math.PI * 2, true)
				context.moveTo(95, 65)
				context.arc(90, 65, 5, 0, Math.PI * 2, true)
				context.stroke()
				context.draw()
			},
			quadraticCurveTo: function () {
				context.beginPath()
				context.moveTo(20, 20)
				context.quadraticCurveTo(20, 100, 200, 20)
				context.stroke()
				context.draw()
			},
			bezierCurveTo: function () {
				context.beginPath()
				context.moveTo(20, 20)
				context.bezierCurveTo(20, 100, 200, 100, 200, 20)
				context.stroke()
				context.draw()
			},
			setFillStyle: function () {
				['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
					context.setFillStyle(item)
					context.beginPath()
					context.rect(0 + 75 * index, 0, 50, 50)
					context.fill()
				})
				context.draw()
			},
			setStrokeStyle: function () {
				['#fef957', 'rgb(242,159,63)', 'rgb(242,117,63)', '#e87e51'].forEach(function (item, index) {
					context.setStrokeStyle(item)
					context.beginPath()
					context.rect(0 + 75 * index, 0, 50, 50)
					context.stroke()
				})
				context.draw()
			},
			setGlobalAlpha: function () {
				context.setFillStyle('#000000');
				[1, 0.5, 0.1].forEach(function (item, index) {
					context.setGlobalAlpha(item)
					context.beginPath()
					context.rect(0 + 75 * index, 0, 50, 50)
					context.fill()
				})
				context.draw()
				context.setGlobalAlpha(1)
			},
			setShadow: function () {
				context.beginPath()
				context.setShadow(10, 10, 10, 'rgba(0, 0, 0, 199)')
				context.rect(10, 10, 100, 100)
				context.fill()
				context.draw()
			},
			setFontSize: function () {
				[10, 20, 30, 40].forEach(function (item, index) {
					context.setFontSize(item)
					context.fillText('Hello, world', 20, 20 + 40 * index)
				})
				context.draw()
			},
			setLineCap: function () {
				context.setLineWidth(10);
				['butt', 'round', 'square'].forEach(function (item, index) {
					context.beginPath()
					context.setLineCap(item)
					context.moveTo(20, 20 + 20 * index)
					context.lineTo(100, 20 + 20 * index)
					context.stroke()
				})
				context.draw()
			},
			setLineJoin: function () {
				context.setLineWidth(10);
				['bevel', 'round', 'miter'].forEach(function (item, index) {
					context.beginPath()
					context.setLineJoin(item)
					context.moveTo(20 + 80 * index, 20)
					context.lineTo(100 + 80 * index, 50)
					context.lineTo(20 + 80 * index, 100)
					context.stroke()
				})
				context.draw()
			},
			setLineWidth: function () {
				[2, 4, 6, 8, 10].forEach(function (item, index) {
					context.beginPath()
					context.setLineWidth(item)
					context.moveTo(20, 20 + 20 * index)
					context.lineTo(100, 20 + 20 * index)
					context.stroke()
				})
				context.draw()
			},
			setMiterLimit: function () {
				context.setLineWidth(4);
				[2, 4, 6, 8, 10].forEach(function (item, index) {
					context.beginPath()
					context.setMiterLimit(item)
					context.moveTo(20 + 80 * index, 20)
					context.lineTo(100 + 80 * index, 50)
					context.lineTo(20 + 80 * index, 100)
					context.stroke()
				})
				context.draw()
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	.canvas-element-wrapper {
		display: block;
		margin-bottom: 100px;
	}

	.canvas-element {
		width: 100%;
		height: 500px;
		background-color: #ffffff;
	}

	.canvas-buttons {
		padding: 30px 50px 10px;
		width: 100%;
		height: 360px;
		box-sizing: border-box;
	}

	.canvas-button {
		float: left;
		line-height: 2;
		width: 300px;
		margin: 15px 12px;
	}
</style>
