<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">
					<text>Vertical Scroll\n纵向滚动</text>
				</view>
				<view class="page-section-spacing">
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
						<view id="demo1" class="scroll-view-item color1">A</view>
						<view id="demo2" class="scroll-view-item color2">B</view>
						<view id="demo3" class="scroll-view-item color3">C</view>
					</scroll-view>
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
				title: 'scroll-view'
			}
		},
		methods: {
			upper: function (e) {
				console.log(e)
			},
			lower: function (e) {
				console.log(e)
			},
			scroll: function (e) {
				console.log(e)
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
