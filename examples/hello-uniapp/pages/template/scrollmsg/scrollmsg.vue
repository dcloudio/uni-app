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
					<swiper-item v-for="(item, index) in msg" :key="index">
						<navigator>{{item}}</navigator>
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
					<swiper-item v-for="(item, index) in msg" :key="index">
						<navigator>{{item}}</navigator>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title:"滚动公告",
			msg : [
				'uni-app行业峰会频频亮相，开发者反响热烈',
				'DCloud完成B2轮融资，uni-app震撼发布',
				'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
			]
		}
	}
}
</script>
<style>

</style>
