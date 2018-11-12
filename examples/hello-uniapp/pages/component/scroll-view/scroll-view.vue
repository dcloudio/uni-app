<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">
				Vertical Scroll
				<text>\n纵向滚动</text>
			</view>
			<view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
				</scroll-view>
			</view>
			<view @tap="goTop" class="uni-link uni-center uni-common-mt">
				点击这里返回顶部
			</view>
			
			<view class="uni-title uni-common-mt">
				Horizontal Scroll
				<text>\n横向滚动</text>
			</view>
			<view>
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
				</scroll-view>
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
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			}
		}
	}
</script>

<style>
	.scroll-Y {
		height: 300upx;
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