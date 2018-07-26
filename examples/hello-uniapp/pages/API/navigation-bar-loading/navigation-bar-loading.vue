<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="btn-area">
				<button class="btn-load" @tap="showNavigationBarLoading">显示加载动画</button>
				<button @tap="hideNavigationBarLoading">隐藏加载动画</button>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'navigationBarLoading'
			}
		},
		methods: {
			showNavigationBarLoading: function () {
				uni.showNavigationBarLoading()
			},
			hideNavigationBarLoading: function () {
				uni.hideNavigationBarLoading()
			}
		},
		components: {
			pageHead

		}
	}
</script>

<style>
	.btn-load {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
