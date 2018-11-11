<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">
				<view>在App端可在pages.json里配置buttons，暂不支持动态改变buttons的样式，使用onNavigationBarButtonTap可监听buttons的点击事件。</view>
				<view>在微信小程序端，不支持配置buttons，故按钮不见了。</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'nav-button'
			}
		},
		onNavigationBarButtonTap(e) {
			uni.showToast({
				title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
				icon: "none"
			})
		}
	}
</script>

<style>
	.page {
		padding-top: 60upx;
	}
</style>
