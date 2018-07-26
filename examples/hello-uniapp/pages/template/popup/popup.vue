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
		<view class="btn-row">
			<button class="btn" type="button" @click="show">弹出 popup</button>
			<button class="btn" type="button" @click="show" data-position="top">顶部弹出 popup</button>
			<button class="btn" type="button" @click="show" data-position="bottom">底部弹出 popup</button>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

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
		components: {
			pageHead
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
		-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, .1);
		box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 400px;
		height: 400px;
		border-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}

	.popup-top {
		top: 0;
		width: 100%;
		height: 100px;
		text-align: center;
	}

	.popup-top text {
		line-height: 100px;
		margin-left: 20px;
		font-size: 32px;
	}

	.popup-bottom {
		bottom: 0;
		width: 100%;
		height: 100px;
		text-align: center;
	}

	.popup-bottom text {
		line-height: 100px;
		font-size: 32px;
	}

	.popup .list-view {
		height: 600px;
	}

	.list-view-item {
		position: relative;
		padding: 22px 30px;
		overflow: hidden;
		font-size: 28px;
	}

	.list-view-item::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 30px;
		height: 2px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row .btn {
		margin: 20px;
	}

	.desc {
		padding: 10px 20px;
		font-size: 30px;
		line-height: 30px;
		margin-top: 150px;
		text-align: center;
	}
</style>
