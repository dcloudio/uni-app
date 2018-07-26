<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-body-wrapper">
				<canvas canvas-id="canvas" class="canvas"></canvas>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'
	
	var context = null,interval = null;
	
	export default {
		data() {
			return {
				title: 'canvas',
				screenWidth:uni.getSystemInfoSync().windowWidth,
				canvasWidth:0,
				position: {
					x: 150,
					y: 150,
					vx: 2,
					vy: 2
				}
			}
		},
		onReady: function () {
			context = uni.createCanvasContext('canvas');
			this.canvasWidth = this.screenWidth / 750 * 610;
			this.position = {
				x:this.canvasWidth/2,
				y:this.canvasWidth/2,
				vx:2,
				vy:2
			}
			this.drawBall();
			interval = setInterval(this.drawBall, 17)
		},
		onUnload: function () {
			clearInterval(interval);
			this.position = {
				x: 0,
				y: 0,
				vx: 0,
				vy: 0
			}
		},
		methods: {
			drawBall: function () {
				var p = this.position
				p.x += p.vx
				p.y += p.vy
				if (p.x >= this.canvasWidth) {
					p.vx = -2
				}
				if (p.x <= 7) {
					p.vx = 2
				}
				if (p.y >= this.canvasWidth) {
					p.vy = -2
				}
				if (p.y <= 7) {
					p.vy = 2
				}
				function ball(x, y) {
					context.beginPath(0)
					context.arc(x, y, 5, 0, Math.PI * 2)
					context.setFillStyle('#1aad19')
					context.setStrokeStyle('rgba(1,1,1,0)')
					context.fill()
					context.stroke()
				}

				ball(p.x, this.canvasWidth/2)
				ball(this.canvasWidth/2, p.y)
				ball(this.canvasWidth - p.x, this.canvasWidth/2)
				ball(this.canvasWidth/2, this.canvasWidth - p.y)
				ball(p.x, p.y)
				ball(this.canvasWidth - p.x, this.canvasWidth - p.y)
				ball(p.x, this.canvasWidth - p.y)
				ball(this.canvasWidth - p.x, p.y)

				context.draw()
			}
		},
		components: {
			pageHead

		}
	}
</script>

<style>
	.canvas {
		width: 610px;
		height: 610px;
		background-color: #fff;
	}
</style>
