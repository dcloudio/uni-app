<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40upx;">
				<block v-if="hasLogin === true">
					<view class="uni-h3 uni-center uni-common-mt">已登录</view>
					<view class="uni-hello-text uni-center">
						<text>每个帐号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</text>
					</view>
				</block>
				<block v-if="hasLogin === false">
					<view class="uni-h3 uni-center uni-common-mt">未登录</view>
					<view class="uni-hello-text uni-center">
						请点击按钮登录
					</view>
				</block>
			</view>
			<view class="uni-btn-v uni- uni-common-mt">
				<button type="primary" class="page-body-button" v-for="(value,key) in providerList" @tap="bindLogin(value)" :key="key">{{value.name}}</button>
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
	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
