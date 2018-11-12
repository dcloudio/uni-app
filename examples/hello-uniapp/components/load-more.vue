<template>
	<view class="load-more">
		<view class="loading-img" v-show="loadingType === 1 && showImage">
			<view class="load1">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load2">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load3">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
		</view>
		<text class="loading-text" :style="{color:color}">{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}</text>
	</view>
</template>

<script>
	export default {
		name: "load-more",
		props: {
			loadingType: {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				type: Number,
				default: 0
			},
			showImage: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#777777"
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentdown: "上拉显示更多",
						contentrefresh: "正在加载...",
						contentnomore: "没有更多数据了"
					};
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style>
	.load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.loading-img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.loading-text {
		font-size: 28upx;
		color: #777777;
	}

	.loading-img>view {
		position: absolute;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.loading-img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #777;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		-webkit-animation: load 1.56s ease infinite;
	}

	.loading-img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(2) {
		-webkit-transform: rotate(180deg);
		top: 11px;
		right: 0px;
	}

	.loading-img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.loading-img>view view:nth-child(4) {
		top: 11px;
		left: 0px;
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.30s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>
