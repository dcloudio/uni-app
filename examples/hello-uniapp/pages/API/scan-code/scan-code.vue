<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section-title">扫码结果</view>
			<view class="uni-list">
				<view class="uni-cell">
					<view class="uni-input">{{result}}</view>
				</view>
			</view>
			<view class="btn-area">
				<button type="primary" @tap="scanCode">扫一扫</button>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

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
		},
		components: {
			pageHead

		}
	}
</script>

<style>
	@import "../../../common/uni.css";

	.uni-input {
		padding: 15px 30px;
		word-break: break-all;
	}
</style>
