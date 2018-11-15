<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png"></image>
				<text class="tip">扫码体验uni-app</text>
			</view>
			<view class="desc">
				<text class="code">uni-app</text>
				是一个使用 <text class="code">Vue.js</text> 开发跨平台应用的前端框架 。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	image {
		width: 400upx;
		height: 400upx;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}

	.qrcode {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.qrcode .tip {
		margin-top: 20upx;
	}

	.desc {
		margin-top: 30upx;
		display: block;
	}

	.code {
		color: #e96900;
		background-color: #f8f8f8;
	}
</style>
