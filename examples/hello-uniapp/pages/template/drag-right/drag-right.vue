<template>
	<view>
		<view class="page-bottom" @touchmove="tap_drag" @touchend="tap_end" @touchstart="tap_start">
			<view class="page-content">
				<view class="wc">
					<navigator url="#" hover-class="navigator-hover">第一个菜单</navigator>
				</view>
				<view class="wc">
					<navigator url="#" hover-class="navigator-hover">第二个菜单（缩放）</navigator>
				</view>
				<view class="wc">
					<navigator url="#" hover-class="navigator-hover">第三个菜单（拖动）</navigator>
				</view>
				<view class="wc">
					<navigator url="#" hover-class="navigator-hover">第四个菜单</navigator>
				</view>
			</view>
		</view>
		<view @touchmove="tap_drag" @touchend="tap_end" @touchstart="tap_start" :class="['page-top',openDrag ? 'c-state1' : '',openClick ? 'c-state1' : '']">
			<image src="../../../static/menu.png" @tap="tap_ch"></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				openDrag: false,
				openClick: false,
				markX: 0,
				newmarkX: 0,
				markY: 0,
				newmarkY: 0,
				istoright: false
			}
		},
		onReady: function () {
			//如果返回时侧滑仍是打开状态，则再次打开页面，侧滑依然显示。如果不想看到，可以进来的时候重置下状态
			this.openDrag = false;
			this.openClick = false;
		},
		methods: {
			tap_ch: function (e) {
				if (this.openClick || this.openDrag) {
					this.openClick = false
					this.openDrag = false
				} else {
					this.openClick = true
				}
			},
			tap_start: function (e) {
				this.markX = this.newmarkX = e.touches[0].pageX;
				this.markY = this.newmarkY = e.touches[0].pageY;
			},
			tap_drag: function (e) {
				this.newmarkX = e.touches[0].pageX;
				this.newmarkY = e.touches[0].pageY;
				if (this.markX > this.newmarkX) {
					this.istoright = false;
				} else {
					this.istoright = true;
				}
				this.markX = this.newmarkX;
			},
			tap_end: function () {
				if (this.newmarkY - this.markY > 25 || this.markY - this.newmarkY > 25) { //防止上下拖动时触发侧滑
					return false;
				}
				this.markX = 0;
				this.newmarkX = 0;
				this.markY = 0;
				this.newmarkY = 0;
				if (this.istoright) {
					this.openDrag = true
				} else {
					this.openDrag = false
				}
			}
		}
	}
</script>

<style>
	.page-bottom {
		height: 100%;
		width: 750px;
		position: fixed;
		background-color: rgb(0, 68, 97);
		z-index: 0;
	}

	.wc {
		color: white;
		padding: 30px 0 30px 40px;
	}

	.page-content {
		padding-top: 300px;
	}

	.page-top {
		height: 100%;
		position: fixed;
		width: 750px;
		background-color: rgb(57, 125, 230);
		z-index: 0;
		transition: All 0.4s ease;
		-webkit-transition: All 0.4s ease;
	}

	.page-top image {
		position: absolute;
		width: 68px;
		height: 68px;
		left: 20px;
		top: 20px;
	}

	.c-state1 {
		transform: rotate(0deg) scale(1) translate(75%, 0%);
		-webkit-transform: rotate(0deg) scale(1) translate(75%, 0%);
	}
</style>
