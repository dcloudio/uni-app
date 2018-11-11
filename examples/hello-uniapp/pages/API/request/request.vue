<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-hello-text">
				请点击按钮向服务器发起请求
			</view>
			<view class="uni-textarea uni-common-mt">
				<textarea :value="res"></textarea>
			</view>
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="makeRequest" :loading="loading">发起请求</button>
			</view>
		</view>
	</view>
</template>
<script>
	const requestUrl = "https://service.dcloud.net.cn/ajax/echo/text?name=uni-app"
	const duration = 2000
	export default {
		data() {
			return {
				title: 'request',
				loading: false,
				res:""
			}
		},
		methods: {
			makeRequest: function () {
				this.loading = true
				uni.request({
					url: requestUrl,
					data: {
						noncestr: Date.now()
					},
					success: (res) => {
						uni.showToast({
							title: '请求成功',
							icon: 'success',
							mask: true,
							duration: duration
						})
						this.res = '请求结果 : ' + JSON.stringify(res);
						console.log('request success', res)
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content:err.errMsg,
							showCancel:false
						})
					},
					complete:()=> {
						this.loading = false
					}
				})
			}
		}
	}
</script>

