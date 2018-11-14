<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view style="background:#FFFFFF; padding:40upx;">
				<view class="uni-hello-text uni-center">网络状态</view>
				<block v-if="hasNetworkType === false">
					<view class="uni-h2 uni-center uni-common-mt">未获取</view>
					<view class="uni-hello-text uni-center uni-common-mt">请点击下面按钮获取网络状态</view>
				</block>
				<block v-if="hasNetworkType === true">
					<view class="uni-h2 uni-center uni-common-mt">{{networkType}}</view>
				</block>
			</view>
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="getNetworkType">获取手机网络状态</button>
				<button @tap="clear">清空</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'getNetworkType',
				hasNetworkType: false,
				networkType: ''
			}
		},
		onUnload:function(){
			this.networkType = '',this.hasNetworkType = false;
		},
		methods: {
			getNetworkType: function () {
				uni.getNetworkType({
					success: (res) => {
						console.log(res)
						this.hasNetworkType = true, this.networkType = res.subtype || res.networkType
					},
                    fail: () => {
                        uni.showModal({
                        	content:'获取失败！',
                            showCancel:false
                        })
                    }
				})
			},
			clear: function () {
				this.hasNetworkType = false,
					this.networkType = ''
			}
		}
	}
</script>

<style>

</style>
