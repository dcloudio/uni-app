<template>
	<view class="content">
		<view class="uni-h1">HI...</view>
		<view class="uni-h2">HI...</view>
		<view class="uni-h3">HI...</view>
		<view class="uni-h4">HI...</view>
		<view class="uni-h5">HI...</view>
		<view class="uni-h6">HI...</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			};
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
