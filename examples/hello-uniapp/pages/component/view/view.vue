<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">
					<text>
						Flex是Flexible Box的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性。当设置display: flex后，继续给view等容器组件设置flex-direction: row或column，就可以在该容器内按行或列排布子组件。uni-app默认全局使用flex布局(在App.vue里预设了)。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。
					</text>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">
					<text>flex-direction: row\n横向布局</text>
				</view>
				<view class="page-section-spacing">
					<view class="uni-flex uni-row" style="margin-top: 60upx;">
						<view class="flex-item color1">A</view>
						<view class="flex-item color2">B</view>
						<view class="flex-item color3">C</view>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">
					<text>flex-direction: column\n纵向布局</text>
				</view>
				<view class="uni-flex uni-column" style="margin-top: 60upx;">
					<view class="flex-item flex-item-V color1">A</view>
					<view class="flex-item flex-item-V color2">B</view>
					<view class="flex-item flex-item-V color3">C</view>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">
					<text>更多布局示例</text>
				</view>
				<view class="text">纵向布局-自动宽度</view>
				<view class="text" style="width: 300upx;">纵向布局-固定宽度</view>
				
				<view class="uni-flex uni-row">
					<view class="text">横向布局-自动宽度</view>
					<view class="text">横向布局-自动宽度</view>
				</view>
				<view class="uni-flex uni-row" style="justify-content: center;">
					<view class="text">横向布局-居中</view>
					<view class="text">横向布局-居中</view>
				</view>
				<view class="uni-flex uni-row" style="justify-content: flex-end;">
					<view class="text">横向布局-居右</view>
					<view class="text">横向布局-居右</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;">横向布局-平均分布</view>
					<view class="text" style="flex: 1;">横向布局-平均分布</view>
				</view>
				<view class="uni-flex uni-row" style="justify-content: space-between;">
					<view class="text">横向布局-两端对齐</view>
					<view class="text">横向布局-两端对齐</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="width: 200upx;">固定宽度</view>
					<view class="text" style="flex: 1;">自动占满余量</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="width: 200upx;">固定宽度</view>
					<view class="text" style="flex: 1;">自动占满</view>
					<view class="text" style="width: 200upx;">固定宽度</view>
				</view>
				<view class="uni-flex uni-row" style="flex-wrap: wrap;">
					<view class="text" style="width: 280upx;">一行显示不全,wrap折行</view>
					<view class="text" style="width: 280upx;">一行显示不全,wrap折行</view>
					<view class="text" style="width: 280upx;">一行显示不全,wrap折行</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="flex: 1;height: 200upx;display: flex; justify-content: center;align-items: flex-start;">
						<text>垂直居顶</text>
					</view>
					<view class="text" style="flex: 1;height: 200upx;display: flex; justify-content: center;align-items: center;">
						<text>垂直居中</text>
					</view>
					<view class="text" style="flex: 1;height: 200upx;display: flex; justify-content: center;align-items: flex-end;">
						<text>垂直居底</text>
					</view>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">
					<text>组合示例：</text>
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
						<image src="../../../static/plus.png" style="width: 150upx;height: 150upx;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex: 1;justify-content: space-between;">
						<view class="text" style="height: 120upx;text-align: left;padding-left: 20upx;padding-top: 10upx;">
							文字居左，留出左间距
						</view>
						<view class="uni-flex uni-row">
							<view class="text" style="flex: 1;">剩余数量</view>
							<view class="text" style="flex: 1;">立即购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'view'
			}
		}
	}
</script>

<style>
	@import "../../../common/uni.css";

	.flex-item {
		width: 200upx;
		height: 300upx;
		text-align: center;
		line-height: 300upx;
		font-size: 26upx;
	}

	.flex-item-V {
		margin: 0 auto;
		width: 300upx;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
	}
	.text{
		margin: 10upx;
		padding: 0 20upx;
		background-color: #ebebeb;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #cfcfcf;
		font-size: 26upx;
	}
	.desc{
		/* text-indent: 40upx; */
	}
</style>
