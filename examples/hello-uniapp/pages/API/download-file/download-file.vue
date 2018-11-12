<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<image class="img" v-if="imageSrc" :src="imageSrc" mode="center" />
			<block v-else>
				<view class="uni-hello-text">
					点击按钮下载服务端示例图片
				</view>
				<view class="uni-btn-v">
					<button type="primary" @tap="downloadImage">下载</button>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'downloadFile',
				imageSrc: ''
			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			downloadImage: function () {
				uni.showLoading({
					title:'下载中'
				})
				var self = this
				uni.downloadFile({
					url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: (res) => {
						console.log('downloadFile success, res is', res)
						self.imageSrc = res.tempFilePath;
						uni.hideLoading();
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})
			}
		}
	}
</script>

<style>
.img {
	width: 500upx;
	height: 500upx;
	margin: 0 95upx;
}
</style>
