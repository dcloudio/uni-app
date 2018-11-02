<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">
					<text>Vertical Scroll\n纵向滚动</text>
				</view>
				<view class="page-section-spacing">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					 @scroll="scroll">
						<view id="demo1" class="scroll-view-item color1">A</view>
						<view id="demo2" class="scroll-view-item color2">B</view>
						<view id="demo3" class="scroll-view-item color3">C</view>
					</scroll-view>
				</view>
				<view class="btn-area">
					<button @tap="goTop" class="page-body-button" type="default">返回顶部</button>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">
					<text>Horizontal Scroll\n横向滚动</text>
				</view>
				<view class="page-section-spacing">
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
						<view id="demo1" class="scroll-view-item_H color1">A</view>
						<view id="demo2" class="scroll-view-item_H color2">B</view>
						<view id="demo3" class="scroll-view-item_H color3">C</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'scroll-view',
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				})
			}
		}
	}
</script>

<style>
	.scroll-Y {
		height: 300upx;
	}

	.page-section-spacing {
		margin-top: 60upx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}
</style>
