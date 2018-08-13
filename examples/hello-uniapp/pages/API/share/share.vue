<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section-title">分享内容</view>
			<view class="page-section">
				<view class="textarea-wrp">
					<textarea class="textarea" v-model="shareText" />
				</view>
			</view>
			<view class="page-section-title">分享图片：</view>
			<view class="page-section">
				<view class="uni-uploader-body">
					<view class="uni-uploader__input-box" v-if="!image" @tap="chooseImage"></view>
					<image class="uni-uploader__img" v-if="image" :src="image"></image>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="page-section-title">分享类型：</view>
			<view class="page-section">
				<view class="uni-uploader-body">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="1" checked="true"/>文字
						</label>
						<label class="radio">
							<radio value="2" />图片
						</label>
						<label class="radio">
							<radio value="0" />图文
						</label>
						<label class="radio">
							<radio value="5" />小程序
						</label>
					</radio-group>
				</view>
			</view>
			<view class="btn-area" v-if="providerList.length > 0">
				<block v-for="(value,index) in providerList" :key="index">
					<button type="primary" v-if="value" :disabled="shareType === 5 && value.name !== '分享到微信好友'" @tap="share(value)">{{value.name}}</button>
				</block>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="btn-area">
				<button type="primary" open-type="share">分享</button>
			</view>
			<!-- #endif -->
		</view>

	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'share',
				shareText: 'uni-app可以同时发布成原生App、微信小程序，邀请你一起体验！',
				href:"https://uniapp.dcloud.io",
				image: '',
				shareType:1,
				providerList: []
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareText ? this.shareText : "欢迎体验uni-app",
				path: '/pages/component/component',
				imageUrl:this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
			}
		},
		onUnload:function(){
			this.shareText='uni-app可以同时发布成原生App、微信小程序，邀请你一起体验！',
			this.href = "https://uniapp.dcloud.io",
			this.image='';
		},
		onLoad: function () {
			uni.getProvider({
				service: "share",
				success: (e) => {
					console.log("success", e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin',
									sort:0
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '分享到新浪微博',
									id: 'sinaweibo',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
					uni.showModal({
						content:"获取登录通道失败",
						showCancel:false
					})
				}
			});
		},
		methods: {
			async share(e) {
				console.log("分享通道:"+ e.id +"； 分享类型:" + this.shareType);
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:"分享内容不能为空",
						showCancel:false
					})
					return;
				}
				
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:"分享图片不能为空",
						showCancel:false
					})
					return;
				}
				
				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession", //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log("success", e);
						uni.showModal({
							content: "分享成功",
							showCancel:false
						})
					},
					fail: (e) => {
						console.log("fail", e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log("分享操作结束!")
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = "欢迎体验uniapp";
						shareOPtions.href = "http://uniapp.dcloud.io";
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
						shareOPtions.title = "欢迎体验uniapp";
						shareOPtions.miniProgram = {
							id:"gh_33446d7f7a26",
							path:"/pages/component/component",
							webUrl:"http://uniapp.dcloud.io",
							type:0
						};
						break;
					default:
						break;
				}
				
				if(shareOPtions.type === 0 && plus.os.name === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = "http://uniapp.dcloud.io";
					shareOPtions.title = "欢迎体验uniapp";
				}
				uni.share(shareOPtions);
			},
			radioChange(e){
				console.log("type:" + e.detail.value);
				this.shareType = parseInt(e.detail.value);
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					}
				})
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log("开始压缩");
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log("getFile:" + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:"分享图片太大,需要请重新选择图片!",
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log("Resolve file URL failed: " + e.message);
						uni.showModal({
							content:"分享图片太大,需要请重新选择图片!",
							showCancel:false
						})
					});
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

	.textarea-wrp {
		padding: 0 20px;
	}
	.page-section{
		margin-bottom: 20px;
	}
	.textarea {
		border: 2px solid #D8D8D8;
		padding: 10px;
		height: 90px;
		width: 690px;
	}
	.uni-input{
		border: 2px solid #D8D8D8;
		padding: 0 10px;
		width: 690px;
	}
	.uni-uploader-body {
		display: flex;
		justify-content: center;
	}
	radio-group{
		box-sizing: border-box;
		width: 100%;
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
	}
</style>
