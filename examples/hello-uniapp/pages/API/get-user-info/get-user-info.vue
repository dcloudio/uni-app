<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40upx;">
				<block v-if="hasUserInfo === false">
					<view class="uni-hello-text uni-center">
						<text>请点击蓝色按钮获取用户头像及昵称</text>
					</view>
				</block>
				<block v-if="hasUserInfo === true">
					<view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName}}</view>
					<view style="padding:30upx 0; text-align:center;">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
					</view>
				</block>
			</view>
			<view class="uni-btn-v">
				<!-- #ifdef APP-PLUS -->
				<button type="primary" @tap="getUserInfo">获取用户信息</button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">获取用户信息</button>
				<!-- #endif -->
				<button @tap="clear">清空</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				title: 'getUserInfo',
				hasUserInfo: false,
				userInfo: {}
			}
		},
		computed: {
			...mapState({
				loginProvider: state => state.loginProvider
			})
		},
		onLoad: function () {},
		methods: {
			getUserInfo() { //获取用户信息api在微信小程序可直接使用，在5+app里面需要先登录才能调用
				uni.getUserInfo({
					provider: this.loginProvider,
					success: (e) => {
						console.log("得到用户信息", e);
						this.hasUserInfo = true;
						this.userInfo = e.userInfo
					},
					fail: (e) => {
						console.log("fail", e);
						let content = e.errMsg;
						if (~content.indexOf("uni.login")) {
							content = "请在登录页面完成登录操作"
						}
						uni.showModal({
							title:"获取用户信息失败",
							content:"错误原因"+content,
							showCancel: false
						})
					}
				})
			},
			wxGetUserInfo(e){
				console.log("得到用户信息", e);
				if(e.detail.errMsg !== 'getUserInfo:ok'){
					uni.showModal({
						title:"获取用户信息失败",
						content:"错误原因"+e.detail.errMsg,
						showCancel:false
					});
					return;
				}
				this.hasUserInfo = true;
				this.userInfo = e.detail.userInfo
			},
			clear() {
				this.hasUserInfo = false,
					this.userInfo = {}
			}
		}
	}
</script>

<style>
	.userinfo-avatar {
		border-radius: 128upx;
		width: 128upx;
		height: 128upx;
	}
</style>
