<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="btn-area">
				<view class="body-view">
					<button type="default" @tap="toast1Tap">点击弹出默认toast</button>
				</view>
				<view class="body-view">
					<button type="default" @tap="toast2Tap">点击弹出设置duration的toast</button>
				</view>
				<view class="body-view">
					<button type="default" @tap="toast3Tap">点击弹出显示loading的toast</button>
				</view>
				<view class="body-view">
					<button type="default" @tap="toast4Tap">点击弹出显示自定义图片的toast</button>
				</view>
				<view class="body-view">
					<button type="default" @tap="hideToast">点击隐藏toast</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'toast'
			}
		},
		methods: {
			toast1Tap: function () {
				uni.showToast({
					title: "默认"
				})
			},
			toast2Tap: function () {
				uni.showToast({
					title: "duration 3000",
					duration: 3000
				})
			},
			toast3Tap: function () {
				uni.showToast({
					title: "loading",
					icon: "loading",
					duration: 5000
				})
			},
			toast4Tap: function () {
				uni.showToast({
					title: "logo",
					image: "../../../static/uni@2x.png"
				})
			},
			hideToast: function () {
				uni.hideToast()
			}
		}
	}
</script>
