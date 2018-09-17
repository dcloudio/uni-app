<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body" v-if="provider[0]">
			<view class="btn-area">
				<button type="primary" @tap="openPush">开启push</button>
				<button type="primary" @tap="closePush">关闭push</button>
				<button type="primary" @tap="listenTranMsg">监听透传数据</button>
				<button type="primary" @tap="removeTranMsg">移除监听透传数据</button>
			</view>
			<view class="btn-area">
				<button type="primary" @tap="requireTranMsg">发送"透传数据"消息</button>
			</view>
			<view class="page-section-title">透传内容：</view>
			<view class="page-section">
				<view class="textare-view">
					<textarea class="textarea" v-model="tranMsg" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'push',
				provider: [],
				pushServer: 'http://demo.dcloud.net.cn/push/?',
				tranMsg:''
			}
		},
		onLoad: function () {
			uni.getProvider({
				service: "push",
				success: (e) => {
					console.log("success", e);
					this.provider = e.provider;
				},
				fail: (e) => {
					console.log("获取推送通道失败", e);
				}
			});
		},
		onUnload:function(){
			this.tranMsg = ''
		},
		methods: {
			openPush() {
				uni.subscribePush({
					provider: this.provider[0],
					success: (e) => {
						uni.showToast({
							title: "已开启push接收"
						})
					}
				})
			},
			closePush() {
				uni.unsubscribePush({
					provider: this.provider[0],
					success: (e) => {
						uni.showToast({
							title: "已关闭push接收"
						})
					}
				})
			},
			listenTranMsg() {
				uni.onPush({
					provider: this.provider[0],
					success: (e) => {
						uni.showToast({
							title: "开始监听透传数据"
						})
					},
					callback: (e) => {
						uni.showToast({
							title: "接收到透传数据"
						});
						
						this.tranMsg = JSON.stringify(e.data);
					}
				})
			},
			removeTranMsg() {
				uni.offPush({
					provider: this.provider[0],
					success: (e) => {
						console.log("移除监听透传数据");
						uni.showToast({
							title: "移除监听透传数据"
						})
					}
				})
			},
			requireTranMsg() { //请求‘透传数据’推送消息
				var inf = plus.push.getClientInfo();
				var url = this.pushServer + 'type=tran&appid=' + encodeURIComponent(plus.runtime.appid);
				inf.id && (url += '&id=' + inf.id);
				url += ('&cid=' + encodeURIComponent(inf.clientid));
				if (plus.os.name == 'iOS') {
					url += ('&token=' + encodeURIComponent(inf.token));
				}
				url += ('&title=' + encodeURIComponent('Hello uniapp'));
				url += ('&content=' + encodeURIComponent('带透传数据推送通知！'));
				if(plus.os.name === 'iOS'){
					url += ('&payload=' + encodeURIComponent('{"title":"Hello uniapp Test","content":"test content"}'));
				}else{
					url += ('&payload=' + encodeURIComponent('\'{"title":"Hello uniapp Test","content":"test content"}\''));
				}
				url += ('&version=' + encodeURIComponent(plus.runtime.version));
				plus.runtime.openURL(url);
			}
		}
	}
</script>

<style>
	.textare-view{
		box-sizing: border-box;
		width: 100%;
		padding: 0 30upx;
	}
	textarea{
		background-color: #FFFFFF;
		width: 100%;
		height: 200upx;
		padding: 10upx;
		box-sizing: border-box;
	}
</style>

