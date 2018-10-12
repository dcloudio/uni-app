<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<form>
				<view class="page-section">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">图片来源</view>
							</view>
							<view class="uni-list-cell-right">
								<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">
									<view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>
								</picker>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">图片质量</view>
							</view>
							<view class="uni-list-cell-right">
								<picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">
									<view class="uni-input">{{sizeType[sizeTypeIndex]}}</view>
								</picker>
							</view>
						</view>
						<!-- #endif -->
						
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								<view class="uni-label">数量限制</view>
							</view>
							<view class="uni-list-cell-right">
								<picker :range="count" @change="countChange" mode="selector">
									<view class="uni-input">{{count[countIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>

					<view class="uni-list list-pd">
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<view class="uni-uploader-head">
									<view class="uni-uploader-title">点击可预览选好的图片</view>
									<view class="uni-uploader-info">{{imageList.length}}/9</view>
								</view>
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,index) in imageList" :key="index">
											<view class="uni-uploader__file">
												<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
											</view>
										</block>
									</view>
									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onUnload(){
			this.imageList = [],
			this.sourceTypeIndex= 2,
			this.sourceType= ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex= 2,
			this.sizeType= ['压缩', '原图', '压缩或原图'],
			this.countIndex= 8;
		},
		methods: {
			sourceTypeChange: function (e) {
				this.sourceTypeIndex = e.target.value
			},
			sizeTypeChange: function (e) {
				this.sizeTypeIndex = e.target.value
			},
			countChange: function (e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function () {
				if(this.imageList.length === 9){
					let isContinue = await this.isFullImg();
					console.log("是否继续?",isContinue);
					if(!isContinue){
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					// #ifdef MP-WEIXIN
					sizeType: sizeType[this.sizeTypeIndex],
					// #endif
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
			},
			isFullImg:function(){
				return new Promise((res) => {
					uni.showModal({
						content:"已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if(e.confirm){
								this.imageList = [];
								res(true);
							}else{
								res(false)
							}
						},
						fail:() => {
							res(false)
						}
					})
				})
			},
			previewImage: function (e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			}
		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
</style>
