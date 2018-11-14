<template>
    <view class="page">
        <page-head :title="title"></page-head>
		<view class="uni-steps">
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
			您也可以把数字步骤改成icon图标
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title:"步骤"
		}
	}
}
</script>
<style>
page{background:#FFFFFF;}
</style>