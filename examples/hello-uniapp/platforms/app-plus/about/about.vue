<template>
	<view class="about">
		<view class="content">
			<view class="qrcode">
				<image src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png" @longtap="save"></image>
				<text>扫码体验uni-app</text>
			</view>
			<view class="desc">
				<text class="code">uni-app</text>
				 是一个使用 <text class="code">Vue.js</text> 开发跨平台应用的前端框架 。
			</view>
			<button type="primary" @tap="share">分享</button>
		</view>
		<view class="version">
			当前版本：{{version}}
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				providerList:[],
				version:''
			}
		},
		onLoad() {
			this.version = plus.runtime.version;
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
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
					console.log('获取登录通道失败'+ JSON.stringify(e));
				}
			});
		},
		methods:{
			save(){
				uni.showActionSheet({
					itemList:['保存图片到相册'],
					success: () => {
						plus.gallery.save('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/app_download.png', function() {
							uni.showToast({
								title:'保存成功',
								icon:'none'
							})
						}, function() {
							uni.showToast({
								title:'保存失败，请重试！',
								icon:'none'
							})
						});
					}
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
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
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title:'欢迎体验uni-app',
							summary: 'uni-app 是一个使用 Vue.js 开发跨平台应用的前端框架',
							imageUrl:'https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/8.jpg',
							href:"https://m3w.cn/uniapp",
							success: (res) => {
								console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel:false
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	image{
		width: 400upx;
		height: 400upx;
	}
	.about{
		flex-direction: column;
		flex: 1;
	}
	.content{
		flex: 1;
		padding: 30upx;
		flex-direction: column;
		justify-content: center;
	}
	.qrcode{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.desc{
		margin-top: 30upx;
		display: block;
	}
	.code{
		color: #e96900;	
		background-color: #f8f8f8;
	}
	button{
		width: 100%;
		margin-top: 40upx;
	}
	.version{
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}
</style>
