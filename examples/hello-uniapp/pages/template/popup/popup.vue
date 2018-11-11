<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="mask" v-show="showMask" @click="hide"></view>
		<view class="popup popup-middle" v-show="showState.middle">
			<view class="desc">
				<text>Hello</text>
			</view>
		</view>
		<view class="popup popup-top" v-show="showState.top">
			<text>顶部 popup</text>
		</view>
		<view class="popup popup-bottom" v-show="showState.bottom">
			<text>底部 popup</text>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v">
				<button type="button" @click="show">弹出 popup</button>
				<button type="button" @click="show" data-position="top">顶部弹出 popup</button>
				<button type="button" @click="show" data-position="bottom">底部弹出 popup</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'popup',
				showState: {
					top: false,
					middle: false,
					bottom: false
				},
				showMask: false,
				activePop: 'middle'
			}
		},
    onBackPress() {
      if(this.showMask) {
        this.showMask = false;
        this.hide();
        return true;
      }
    },
		methods: {
			show(evt) {
				var pos = evt.target.dataset.position
				switch (pos) {
					case 'top':
						this.activePop = 'top'
						break
					case 'bottom':
						this.activePop = 'bottom'
						break
					default:
						this.activePop = 'middle'
				}
				this.showMask = true
				this.showState[this.activePop] = true
			},
			hide() {
				this.showMask = false
				this.showState[this.activePop] = false
			}
		}
	}
</script>
<style>
	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 400upx;
		height: 400upx;
		border-radius: 10upx;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}

	.popup-top {
		top: 0;
		width: 100%;
		height: 100upx;
		text-align: center;
	}

	.popup-top text {
		line-height: 100upx;
		margin-left: 20upx;
		font-size: 32upx;
	}

	.popup-bottom {
		bottom: 0;
		width: 100%;
		height: 100upx;
		text-align: center;
	}

	.popup-bottom text {
		line-height: 100upx;
		font-size: 32upx;
	}

	.popup .list-view {
		height: 600upx;
	}

	.list-view-item {
		position: relative;
		padding: 22upx 30upx;
		overflow: hidden;
		font-size: 28upx;
	}

	.list-view-item::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 2upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.desc {
		padding: 10upx 20upx;
		font-size: 30upx;
		line-height: 30upx;
		margin-top: 150upx;
		text-align: center;
	}
</style>
