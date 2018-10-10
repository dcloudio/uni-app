<template>
    <view class="page">
        <page-head :title="title"></page-head>
		<view class="grace-steps">
			<view class="step">
				<view class="step-circle">1</view>
				<view class="step-content">
					<view class="step-title">步骤1</view>
				</view>
			</view>
			<view class="step current">
				<view class="step-circle">2</view>
				<view class="step-content">
					<view class="step-title">步骤2</view>
				</view>
			</view>
			<view class="step">
				<view class="step-circle">3</view>
				<view class="step-content">
					<view class="step-title">步骤3</view>
				</view>
			</view>
		</view>
		<view style="padding:30upx 0; text-align:center;">
			您也可以把数字步骤改成icon图标哦 ^_^
		</view>
	</view>
</template>
<script>
export default {
	data:{
		title:"步骤"
	}
}
</script>
<style>
page{background:#FFFFFF;}
.grace-steps{padding:20rpx 0; display:flex; width:100%; flex-wrap:wrap;}
.grace-steps view{display:flex; width:100%; flex-wrap:wrap; float:none;}
.grace-steps .step{width:31.3%; margin:0 1%; flex-wrap:nowrap;}
.grace-steps .step-circle{width:50upx; height:50upx; border-radius:50upx; background:#F1F1F3; justify-content:center; line-height:50upx; flex-shrink:0; margin-right:15upx; color:#666; font-size:28upx;}
.grace-steps .step-content{width:100%; height:22upx; border-bottom:1px solid #F1F1F3;}
.grace-steps .step-title{line-height:50upx; height:50upx; background:#FFFFFF; width:auto; overflow:hidden; padding-right:8upx;}
.grace-steps .current .step-circle{background:#00B26A; color:#FFFFFF;}
.grace-steps .current .step-content{border-color:#00B26A;}
.grace-steps .current .step-title{color:#00B26A;}
</style>