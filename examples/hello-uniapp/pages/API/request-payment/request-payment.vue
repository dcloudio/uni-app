<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view>支付金额</view>
				<view class="price"><text class="rmbLogo">￥</text>0.01</view>
				<view class="desc">实际应用中可自定义金额</view>
				<view class="btn-area">
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
	.page-section {
		width: auto;
		margin: 30upx;
		padding: 64upx 30upx;
		background-color: #fff;
		text-align: center;
		font-size: 28upx;
	}

	.desc {
		color: #B2B2B2;
	}

	.price {
		margin-top: 30upx;
		margin-bottom: 25upx;
		position: relative;
		display: inline-block;
		font-size: 78upx;
		line-height: 1;
	}

	.rmbLogo {
		position: absolute;
		font-size: 40upx;
		top: 8upx;
		left: -40upx;
	}

	button {
		background-color: #007aff;
		color: #ffffff;
	}
</style>
