<template>
	<view class="content">
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
	export default {
		data: {
			title: 'Hello'
		}
	}
</script>

<style>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
