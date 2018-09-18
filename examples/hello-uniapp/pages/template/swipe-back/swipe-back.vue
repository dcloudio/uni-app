<template>
	<view>
		<swipe-back></swipe-back>
		
		<view class="info">
			从屏幕左侧边缘滑动，返回上一页,有手势提示。
		</view>
	</view>
</template>

<script>
	import SwipeBack from '../../../components/swipe-back.vue'
	export default {
		components:{
			SwipeBack
		}
	}
</script>

<style scoped>
.info{
	padding: 40upx;
	text-align: center;
}
</style>
