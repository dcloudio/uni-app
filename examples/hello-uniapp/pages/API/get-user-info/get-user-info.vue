<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">
					<view class="page-body-title">用户信息</view>
					<block v-if="hasUserInfo === false">
						<text class="page-body-text">未获取</text>
						<text class="page-body-text">点击蓝色按钮可获取用户头像及昵称</text>
					</block>
					<block v-if="hasUserInfo === true">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl"></image>
						<text class="userinfo-nickname">{{userInfo.nickName}}</text>
					</block>
				</view>
				<view class="btn-area">
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
	.page-body-info {
		padding-bottom: 0;
		height: 460upx;
	}

	.userinfo-avatar {
		border-radius: 128upx;
		width: 128upx;
		height: 128upx;
	}

	.userinfo-nickname {
		margin-top: 20upx;
		font-size: 38upx;
	}
</style>
