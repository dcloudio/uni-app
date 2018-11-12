<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">
				示例1 <text>\n本地图片</text>
			</view>
			<view class="uni-center" style="background:#FFFFFF; font-size:0;">
				<image class="image" mode="widthFix" src="../../../static/uni@2x.png" />
			</view>
			
			<view class="uni-title uni-common-mt">
				示例2 <text>\n网络图片</text>
			</view>
			<view class="uni-center" style="background:#FFFFFF; font-size:0;">
				<image class="image" mode="widthFix" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" />
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'image'
			}
		}
	}
</script>
<style>
	.image {
		margin:40upx 0;
		width: 200upx;
	}
</style>
