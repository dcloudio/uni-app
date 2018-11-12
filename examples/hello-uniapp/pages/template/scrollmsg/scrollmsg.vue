<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
			竖向滚动
			</view>
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-icon">
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
			
			<view class="uni-title uni-common-mt">
				横向滚动
			</view>
			<view class="uni-swiper-msg">
				<view class="uni-swiper-msg-icon">
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
.uni-swiper-msg{width:100%; padding:12rpx 0; flex-wrap:nowrap; display:flex;}
.uni-swiper-msg-icon{width:50upx; margin-right:20upx;}
.uni-swiper-msg-icon image{width:100%; flex-shrink:0;}
.uni-swiper-msg swiper{width:100%; height:50upx;}
.uni-swiper-msg swiper-item{line-height:50upx;}
</style>
