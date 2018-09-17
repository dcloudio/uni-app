<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="btn-area">
				<button class="btn-load" @tap="showLoading">显示 loading 提示框</button>
				<button @tap="hideLoading">隐藏 loading 提示框</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'loading'
			}
		},
		methods: {
			showLoading: function () {
				uni.showLoading()
			},
			hideLoading: function () {
				uni.hideLoading()
			}
		}
	}
</script>

<style>
	.btn-load {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
