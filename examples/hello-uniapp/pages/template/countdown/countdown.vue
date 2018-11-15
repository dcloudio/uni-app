<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-text-small uni-center" style="margin:80upx 0 20upx 0;">示例1</view>
		<view style="justify-content:center;">
			<graceCountd :timer="timer1"></graceCountd>
		</view>
		<view class="uni-text-small uni-center" style="margin:80rpx 0 20rpx 0;">示例2</view>
		<view style="justify-content:center; background:#00B26A; padding:50rpx 0;">
			<graceCountd :timer="timer2" borderColor="#FFFFFF" splitorColor="#FFF" fontColor="#FFFFFF" bgrColor="none"></graceCountd>
		</view>
		<view class="uni-text-small uni-center" style="margin:80rpx 0 20rpx 0;">示例3</view>
		<view style="justify-content:center;">
			<graceCountd fontColor="#FFFFFF" bgrColor="#000000" :timer="timer3"></graceCountd>
		</view>
	</view>
</template>
<script>
	import graceCountd from "../../../components/graceCountd.vue";
	export default {
		data() {
			var dateObj = new Date();
			var currentTime = dateObj.getTime();
			var timer1 = this.formatDateTime((currentTime + 1000 * 2000));
			var timer2 = this.formatDateTime((currentTime + 1000 * 3000));
			var timer3 = this.formatDateTime((currentTime + 1000 * 5000));
			return {
				title: '倒计时',
				timer1: timer1,
				timer2: timer2,
				timer3: timer3
			}
		},
		components: {
			graceCountd
		},
		methods: {
			formatDateTime(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
				var date = new Date(inputTime);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			}
		},
	}
</script>

<style>
	view {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
	}

	.uni-countdown {
		padding: 2rpx 0;
		flex-wrap: nowrap;
		justify-content: center;
	}

	.uni-countdown-splitor {
		width: auto !important;
		justify-content: center;
		line-height: 44upx;
		padding: 0 5upx;
	}

	.uni-countdown-numbers {
		line-height: 44upx;
		width: auto !important;
		padding: 0 10upx;
		justify-content: center;
		height: 44upx;
		border-radius: 8upx;
		margin: 0 5upx;
		border: 1px solid #000000;
		font-size: 22upx;
	}
</style>
