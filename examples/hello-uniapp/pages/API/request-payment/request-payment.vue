<template>
	<view>
		<page-head :title="title"></page-head>
			<view class="uni-padding-wrap">
				<view style="background:#FFF; padding:50upx 0;">
					<view class="uni-hello-text uni-center">支付金额</text></view>
					<view class="uni-h1 uni-center uni-common-mt"><text class="rmbLogo">￥</text>0.01</view>
					<view class="uni-hello-text uni-center uni-common-mt">实际应用中可自定义金额</text></view>
				</view>
				<view class="uni-btn-v uni-common-mt">
					<!-- #ifdef MP-WEIXIN -->
					<button type="primary" @tap="weixinPay" :loading="loading">微信支付</button>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<button v-for="(item,index) in providerList" :key="index" @tap="requestPayment(item,index)" :loading="item.loading">{{item.name}}支付</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'request-payment',
				loading: false,
				providerList: []
			}
		},
		onLoad: function() {
			// #ifdef APP-PLUS
			uni.getProvider({
				service: "payment",
				success: (e) => {
					console.log("payment success", e);
					this.providerList = e.provider.map((value) => {
						switch (value) {
							case 'alipay':
								return {
									name: '支付宝',
									id: value,
									loading: false
								}
							case 'wxpay':
								return {
									name: '微信',
									id: value,
									loading: false
								}
						}
					})
				},
				fail: (e) => {
					console.log("获取登录通道失败：", e);
				}
			});
			// #endif
		},
		methods: {
			weixinPay() {
				console.log("发起支付");
				this.loading = true;
				uni.login({
					success: (e) => {
						console.log("login success", e);
						uni.request({
							url: `https://unidemo.dcloud.net.cn/payment/wx/mp?code=${e.code}&amount=0.01`,
							success: (res) => {
								console.log("pay request success", res);
								if (res.statusCode !== 200) {
									uni.showModal({
										content: "支付失败，请重试！",
										showCancel: false
									});
									return;
								}
								if (res.data.ret === 0) {
									console.log("得到接口prepay_id", res.data.payment);
									let paymentData = res.data.payment;
									uni.requestPayment({
										timeStamp: paymentData.timeStamp,
										nonceStr: paymentData.nonceStr,
										package: paymentData.package,
										signType: 'MD5',
										paySign: paymentData.paySign,
										success: (res) => {
											uni.showToast({
												title: "感谢您的赞助!"
											})
										},
										fail: (res) => {
											uni.showModal({
												content: "支付失败,原因为: " + res.errMsg,
												showCancel: false
											})
										},
										complete: () => {
											this.loading = false;
										}
									})
								} else {
									uni.showModal({
										content: res.data.desc,
										showCancel: false
									})
								}
							},
							fail: (e) => {
								console.log("fail", e);
								this.loading = false;
								uni.showModal({
									content: "支付失败,原因为: " + e.errMsg,
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						console.log("fail", e);
						this.loading = false;
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			async requestPayment(e, index) {
				this.providerList[index].loading = true;
				let orderInfo = await this.getOrderInfo(e.id);
				console.log("得到订单信息", orderInfo);
				if (orderInfo.statusCode !== 200) {
					console.log("获得订单信息失败", orderInfo);
					uni.showModal({
						content: "获得订单信息失败",
						showCancel: false
					})
					return;
				}
				uni.requestPayment({
					provider: e.id,
					orderInfo: orderInfo.data,
					success: (e) => {
						console.log("success", e);
						uni.showToast({
							title: "感谢您的赞助!"
						})
					},
					fail: (e) => {
						console.log("fail", e);
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: () => {
						this.providerList[index].loading = false;
					}
				})
			},
			getOrderInfo(e) {
				let appid = "";
				// #ifdef APP-PLUS
				appid = plus.runtime.appid;
				// #endif
				let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=0.01';
				return new Promise((res) => {
					uni.request({
						url: url,
						success: (result) => {
							res(result);
						},
						fail: (e) => {
							res(e);
						}
					})
				})
			}
		}
	}
</script>

<style>
	.rmbLogo {
		font-size: 40upx;
	}

	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
