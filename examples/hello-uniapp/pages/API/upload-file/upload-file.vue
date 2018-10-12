<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">

					<block v-if="imageSrc">
						<image :src="imageSrc" class="image" mode="aspectFit"></image>
					</block>

					<block v-else>
						<view class="image-plus image-plus-nb" @tap="chooseImage">
							<view class="image-plus-horizontal"></view>
							<view class="image-plus-vertical"></view>
						</view>
						<view class="image-plus-text">选择图片</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'uploadFile',
				imageSrc: ''
			}
		},
		onUnload() {
			this.imageSrc = '';
		},
		methods: {
			chooseImage: function () {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: "https://demo.dcloud.net.cn/helloh5/uploader/upload.php",
							filePath: imageSrc,
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content:err.errMsg,
									showCancel:false
								})
							},
							complete: () => {
								console.log("complate")
							}
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
					}
				})
			}
		}
	}
</script>

<style>
	.image {
		width: 100%;
		height: 360upx;
	}

	.page-body-info {
		display: flex;
		box-sizing: border-box;
		padding: 30upx;
		height: 420upx;
		border-top: 1upx solid #D9D9D9;
		border-bottom: 1upx solid #D9D9D9;
		align-items: center;
		justify-content: center;
	}
</style>
