<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-hello-text uni-center" style="padding-bottom:50upx;">
				旋转手机即可获取方位信息
			</view>
			<view class="direction">
				<view class="bg-compass-line"></view>
				<image class="bg-compass" src="../../../static/compass.png" :style="'transform: rotate('+direction+'deg)'"></image>
				<view class="direction-value">
					<text>{{direction}}</text>
					<text class="direction-degree">o</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'onCompassChange',
				direction: 0
			}
		},
		onReady: function () {
			uni.onCompassChange((res) => {
				this.direction = parseInt(res.direction)
			})
		},
		onUnload() {
			uni.startCompass();
			this.direction = 0;
		}
	}
</script>

<style>
	.direction {
		position: relative;
		margin-top: 70upx;
		display: flex;
		width: 540upx;
		height: 540upx;
		align-items: center;
		justify-content: center;
		margin:0 auto;
	}

	.direction-value {
		position: relative;
		font-size: 200upx;
		color: #353535;
		line-height: 1;
		z-index: 1;
	}

	.direction-degree {
		position: absolute;
		top: 0;
		right: -40upx;
		font-size: 60upx;
	}

	.bg-compass {
		position: absolute;
		top: 0;
		left: 0;
		width: 540upx;
		height: 540upx;
		transition: .1s;
	}

	.bg-compass-line {
		position: absolute;
		left: 267upx;
		top: -10upx;
		width: 6upx;
		height: 56upx;
		background-color: #1AAD19;
		border-radius: 999upx;
		z-index: 1;
	}
</style>
