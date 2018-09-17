<template>
	<view class="root" :style="{backgroundImage:'url('+img+')'}">
		<view :class="[show ? 'up' : '','shake-up']">
			<image mode="aspectFit" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/shake/shakeup.png"></image>
		</view>
		<view :class="[show ? 'down' : '','shake-down']">
			<image mode="aspectFit" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/shake/shakedown.png"></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				img: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/shake/1.jpg',
				show: false
			}
		},
		onLoad: function () {
			let music = uni.createInnerAudioContext();
			music.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/shake/shake.wav';

			let index = 1,
				t = null;
			uni.onAccelerometerChange((res) => {
				if (Math.abs(res.x) + Math.abs(res.y) + Math.abs(res.z) > 20 && !this.show) {
					music.play();
					setTimeout(() => {
						index++;
						if (index > 4) {
							index = 1
						}
						this.img = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/shake/' + index + '.jpg';
					}, 2000);
					this.show = true;
					if (t) {
						clearTimeout(t);
					}
					t = setTimeout(() => {
						t = null;
						this.show = false;
					}, 600)
				}
			})
		},
		onUnload() {
			this.show = false;
			uni.stopAccelerometer();
		}
	}
</script>

<style>
	.root {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-position: center center;
		background-repeat: no-repeat;
	}

	.shake-up,
	.shake-down {
		height: 50%;
		overflow: hidden;
		transition: all .5s ease-in-out;
		-webkit-transition: all .5s ease-in-out;
		background: #333;
	}

	.up {
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}

	.down {
		transform: translateY(50%);
		-webkit-transform: translateY(50%);
	}

	image {
		height: 100%;
		width: 100%;
	}
</style>
