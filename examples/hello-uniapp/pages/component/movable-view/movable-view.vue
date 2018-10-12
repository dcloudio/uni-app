<template>
	<view class="page-body">
		<view class="page-section">
			<view class="page-section-title">movable-view区域小于movable-area</view>
			<movable-area>
				<movable-view :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
			</movable-area>
		</view>
		<view class="btn-area">
			<button @tap="tap" class="page-body-button" type="default">click me to move to (30px, 30px)</button>
		</view>

		<view class="page-section">
			<view class="page-section-title">movable-view区域大于movable-area</view>
			<movable-area>
				<movable-view class="max" direction="all">text</movable-view>
			</movable-area>
		</view>

		<view class="page-section">
			<view class="page-section-title">只可以横向移动</view>
			<movable-area>
				<movable-view direction="horizontal">text</movable-view>
			</movable-area>
		</view>

		<view class="page-section">
			<view class="page-section-title">只可以纵向移动</view>
			<movable-area>
				<movable-view direction="vertical">text</movable-view>
			</movable-area>
		</view>

		<view class="page-section">
			<view class="page-section-title">可超出边界</view>
			<movable-area>
				<movable-view direction="all" out-of-bounds>text</movable-view>
			</movable-area>
		</view>

		<view class="page-section">
			<view class="page-section-title">带有惯性</view>
			<movable-area>
				<movable-view direction="all" inertia>text</movable-view>
			</movable-area>
		</view>

		<view class="page-section">
			<view class="page-section-title">可放缩</view>
			<movable-area scale-area>
				<movable-view direction="all" @scale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">text</movable-view>
			</movable-area>
		</view>

		<view class="btn-area">
			<button @tap="tap2" class="page-body-button" type="default">click me to scale to 3.0</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				scale: 2,
				old: {
					x: 0,
					y: 0,
					scale: 2
				}
			}
		},
		methods: {
			tap: function(e) {
				// 解决view层不同步的问题
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			tap2() {
				// 解决view层不同步的问题
				this.scale = this.old.scale
				this.scale = this.old.scale
				this.$nextTick(function() {
					this.scale = 3
				})
			},
			onChange: function(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			onScale: function(e) {
				this.old.scale = e.detail.scale
			}
		}
	}
</script>

<style>
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		width: 100rpx;
		background-color: #007AFF;
		color: #fff;
	}

	movable-area {
		height: 400rpx;
		width: 400rpx;
		margin: 50rpx;
		background-color: #ccc;
		overflow: hidden;
	}

	.max {
		width: 600rpx;
		height: 600rpx;
	}

	.page-section {
		width: 100%;
		margin-bottom: 60rpx;
	}

	.page-section:last-child {
		margin-bottom: 0;
	}

	.page-section-title {
		font-size: 28rpx;
		color: #999999;
		margin-bottom: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
</style>
