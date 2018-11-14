<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide"></view>
		<view :class="['uni-popup','uni-popup-'+type]" v-show="show">
			{{msg}}
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				//top - 顶部， middle - 居中, bottom - 底部
				default: 'middle'
			},
			msg: {
				type: String,
				default: ""
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {
				offsetTop: offsetTop
			}
		},
		methods: {
			hide: function() {
				this.$emit('hidePopup');
			}
		}
	}
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.uni-popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.uni-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 380upx;
		height: 380upx;
		border-radius: 10upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		justify-content: center;
		padding: 30upx;
	}

	.uni-popup-top {
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}
</style>
