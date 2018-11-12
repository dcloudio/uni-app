<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="demo">
				<block v-if="imageSrc">
					<image :src="imageSrc" class="image" mode="widthFix"></image>
				</block>
				<block v-else>
					<view class="uni-hello-addfile" @tap="chooseImage">+ 选择图片</view>
				</block>
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
				uni.showLoading({});
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
								});
								uni.hideLoading();
							},
							complete: () => {
								console.log("complate")
							}
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>
	.image {
		width: 100%;
	}

	.demo{
		background:#FFF;
		padding:50upx;
	}
</style>
