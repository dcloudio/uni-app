<template>
	<view class="index">
		<swiper @change="swpierChange" :style="{height:screenHeight + 'px'}">
			<swiper-item v-for="(value,index) in data" :key="index" @click="preImg(index)">
				<image :src="value" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="detail-btn-view">
			<view class="download" @click="download"></view>
			<!-- #ifdef APP-PLUS -->
			<view v-if="showBtn" class="setting" @click="setting">设为壁纸</view>
			<!-- #endif -->
			<view class="collect" @click="collect"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				data: [],
				detailDec:""
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			if (plus.os.name === 'Android') {
				this.showBtn = true;
			}
			// #endif
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			console.log(e.data);
			this.detailDec = e.data;
			let data = JSON.parse(e.data);
			this.imgLength = data.img_num;
			this.data.push(data.img_src);
			this.getData(data.id);
			uni.setNavigationBarTitle({
				title: "1/" + this.imgLength
			});
			// 获取分享通道
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		onShareAppMessage() {
			return {
				title: "欢迎使用uni-app看图模板",
				path: '/pages/detail/detail?data=' + this.detailDec,
				imageUrl:this.data[this.index]
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.providerList.length === 0) {
				uni.showModal({
					title: "当前环境无分享渠道!",
					showCancel: false
				})
				return;
			}
			let itemList = this.providerList.map(function (value) {
				return value.name
			})
			uni.showActionSheet({
				itemList: itemList,
				success: (res) => {
					uni.share({
						provider: this.providerList[res.tapIndex].id,
						scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
							'WXSenceTimeline' : "WXSceneSession",
						type: 0,
						title: "uni-app模版",
						summary: "欢迎使用uni-app模版",
						imageUrl: this.data[this.index],
						href: "https://uniapp.dcloud.io",
						success: (res) => {
							console.log("success:" + JSON.stringify(res));
						},
						fail: (e) => {
							uni.showModal({
								content: e.errMsg,
								showCancel: false
							})
						}
					});
				}
			})
		},
		methods: {
			download() {
				uni.downloadFile({
					url: this.data[this.index],
					success: (e) => {
						console.log(e);
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: () => {
								uni.showToast({
									icon: "none",
									title: "已保存到手机相册"
								})
							},
							fail: () => {
								uni.showToast({
									icon: "none",
									title: "保存到手机相册失败"
								})
							}
						});
					},
					fail: (e) => {
						uni.showModal({
							content: "下载失败，" + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			collect() {
				uni.showToast({
					icon: "none",
					title: "点击收藏按钮"
				})
			},
			//#ifdef APP-PLUS
			setting() {
				uni.showToast({
					icon: "none",
					title: "正在设为壁纸"
				})
				setTimeout(() => {
					var WallpaperManager = plus.android.importClass("android.app.WallpaperManager");
					var Main = plus.android.runtimeMainActivity();
					var wallpaperManager = WallpaperManager.getInstance(Main);
					plus.android.importClass(wallpaperManager);
					var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
					uni.downloadFile({
						url: this.data[this.index],
						success: (e) => {
							var filePath = e.tempFilePath.replace("file://", "");
							var bitmap = BitmapFactory.decodeFile(filePath);
							try {
								wallpaperManager.setBitmap(bitmap);
								uni.showToast({
									icon: "none",
									title: "壁纸设置成功"
								})
							} catch (e) {
								uni.showToast({
									icon: "none",
									title: "壁纸设置失败"
								})
							}
						},
						fail: () => {
							uni.showToast({
								icon: "none",
								title: "壁纸设置失败"
							})
						}
					})
				}, 100)
			},
			//#endif
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + "/" + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.data[index],
						urls: this.data
					})
				}, 150)
			},
			getData(e) {
				uni.request({
					url: "https://uniapp.dcloud.io/tuku/detail.php?id=" + e,
					success: (res) => {
						if (res.data.code !== 0) {
							uni.showModal({
								content: "请求失败，失败原因：" + res.data.msg,
								showCancel: false
							})
							return;
						}

						this.data = this.data.concat(res.data.data);
					},
					fail: () => {
						uni.showModal({
							content: "请求失败，请重试!",
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #000;
	}

	swiper {
		flex: 1;
		width: 750px;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750px;
		height: 1125px;
	}
</style>
