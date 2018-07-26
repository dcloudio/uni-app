<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">
					<block v-if="tempFilePath != ''">
						<image :src="tempFilePath" class="image" mode="aspectFit"></image>
					</block>
					<block v-if="tempFilePath === '' && savedFilePath != ''">
						<image :src="savedFilePath" class="image" mode="aspectFit"></image>
					</block>
					<block v-if="tempFilePath === '' && savedFilePath === ''">
						<view class="image-plus image-plus-nb" @tap="chooseImage">
							<view class="image-plus-horizontal"></view>
							<view class="image-plus-vertical"></view>
						</view>
						<view class="image-plus-text">请选择文件</view>
					</block>
				</view>
				<view class="btn-area">
					<button class="btn-savefile" @tap="saveFile">保存文件</button>
					<button @tap="clear">删除文件</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'saveFile',
				tempFilePath: '',
				savedFilePath: ''
			}
		},
		onLoad() {
			this.savedFilePath = uni.getStorageSync('savedFilePath')
		},
		onUnload() {
			this.tempFilePath = "",
			this.savedFilePath = ""
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.tempFilePath = res.tempFilePaths[0]
					}
				})
			},
			saveFile() {
				if (this.tempFilePath.length > 0) {
					uni.saveFile({
						tempFilePath: this.tempFilePath,
						success: (res) => {
							this.savedFilePath = res.savedFilePath
							uni.setStorageSync('savedFilePath', res.savedFilePath)
							uni.showModal({
								title: '保存成功',
								content: '下次进入页面时，此文件仍可用',
								showCancel:false
							})
						},
						fail: (res) => {
							uni.showModal({
								title: '保存失败',
								content: '失败原因: ' + JSON.stringify(res),
								showCancel:false
							})
						}
					})
				}else{
					uni.showModal({
						content:"请选择文件",
						showCancel:false
					})
				}
			},
			clear() {
				uni.setStorageSync('savedFilePath', '')
				this.tempFilePath = '',
					this.savedFilePath = ''
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	.image {
		width: 100%;
		height: 360px;
	}

	.page-body-info {
		display: flex;
		box-sizing: border-box;
		padding: 30px;
		height: 420px;
		border-top: 1px solid #D9D9D9;
		border-bottom: 1px solid #D9D9D9;
		align-items: center;
		justify-content: center;
	}

	.btn-savefile {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
