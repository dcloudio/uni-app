<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">扫码结果</view>
			<view class="uni-list">
				<view class="uni-cell">
					<view class="uni-input">{{result}}</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button type="primary" @tap="scanCode">扫一扫</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'scanCode',
				result: ''
			}
		},
		onUnload:function(){
			this.result = '';
		},
		methods: {
			scanCode: function () {
				var that = this
				uni.scanCode({
					success: function (res) {
						that.result = res.result
					},
					fail: function (res) {}
				})
			}
		}
	}
</script>

<style>

</style>
