<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">
				<uni-icon size="16" type="info"></uni-icon>说明 : </view>
			<view class="uni-helllo-text">
				<view>在App端可在pages.json里配置buttons，暂不支持动态改变buttons的样式，使用onNavigationBarButtonTap可监听buttons的点击事件。</view>
				<view>在微信小程序端，不支持配置buttons，故按钮不见了。</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniIcon from '../../../components/uni-icon.vue'
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
		},
		components:{
			uniIcon
		}
	}
</script>

<style>
	
</style>
