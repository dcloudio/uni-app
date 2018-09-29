<template>
	<view class="page">
		<view style="justify-content:center; line-height:60upx; margin-top:30upx;">
			竖向滚动
		</view>
		<view class="grace-padding">
			<view class="grace-swiper-msg">
				<view class="grace-swiper-msg-icon">
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
				</view>
				<swiper vertical="true" autoplay="true" circular="true" interval="3000">
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view style="justify-content:center; line-height:60upx; text-align:center; width:100%;">
				横向滚动
			</view>
			<view class="grace-swiper-msg">
				<view class="grace-swiper-msg-icon">
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
				</view>
				<swiper autoplay="true" circular="true" interval="5000">
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
					<swiper-item>
						<navigator>内容......</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data:{
		title:"滚动公告"
	}
}
</script>
<style>
.grace-padding{padding:2%; width:96%;}
view{display:flex; flex-wrap:wrap; font-size:28upx; height:auto; width:100%;}
.grace-swiper-msg{width:100%; padding:12rpx 0; flex-wrap:nowrap;}
.grace-swiper-msg-icon{width:50upx; margin-right:20upx;}
.grace-swiper-msg-icon image{width:100%; flex-shrink:0;}
.grace-swiper-msg swiper{width:100%; height:50upx;}
.grace-swiper-msg swiper-item{line-height:50upx;}
</style>
