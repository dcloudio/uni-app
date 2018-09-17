<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<block v-if="hasLogin === true">
					<text class="page-body-title">已登录</text>
					<text class="page-body-text">每个帐号仅需登录 1 次，后续每次进入页面即可自动拉取用户信息</text>
				</block>
				<block v-if="hasLogin === false">
					<text class="page-body-text">每个帐号仅需登录一次</text>
					<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @tap="bindLogin(value)" :key="key">{{value.name}}</button>
				</block>
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
				title: 'login',
				providerList: []
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			uni.getProvider({
				service: "oauth",
				success: (e) => {
					this.providerList = e.provider.map((value) => {
						switch (value) {
							case 'weixin':
								return {
									name: '微信登录',
									id: value
								}
							case 'qq':
								return {
									name: 'QQ登录',
									id: value
								}
							case 'sinaweibo':
								return {
									name: '新浪微博登录',
									id: value
								}
							case 'xiaomi':
								return {
									name: '小米登录',
									id: value
								}
						}
					})
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
		},
		methods: {
			...mapMutations(['login']),
			bindLogin(e) {
				uni.login({
					provider: e.id,
					success: (res) => {
						console.log("登录", res);
						this.login(e.id); //改变保存在store里的登录状态
					},
					fail: (e) => {
						console.log("fail", e);
					}
				})
			}
		}
	}
</script>

<style>
	.page-section {
		margin-top: 200upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0 50upx;
		box-sizing: border-box;
	}

	.page-body-title {
		font-size: 60upx;
		line-height: 200upx;
	}

	.page-body-text {
		color: #bbb;
		font-size: 28upx;
		line-height: 40upx;
		margin: 0 0 100upx 0;
		text-align: center;
	}

	.page-body-button {
		width: 100%;
	}

	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
