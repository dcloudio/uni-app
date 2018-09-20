<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="item">
			<text class="item-title">默认</text>
			<number-box></number-box>
		</view>
		<view class="item">
			<text class="item-title">限定最小值和最大值（0~9）</text>
			<number-box :min="0" :max="9"></number-box>
		</view>
		<view class="item">
			<text class="item-title">设定步长值（步长10）</text>
			<number-box :step="10"></number-box>
		</view>
		<view class="item">
			<text class="item-title">获取输入框的值</text>
			<view class="inline-item">
				<number-box v-on:update="numberUpdate"></number-box>
				<text class="item-label-right">当前的值为：{{numberValue}}</text>
			</view>
		</view>
		<view class="item">
			<text class="item-title">输入框只读</text>
			<number-box :disabled="true"></number-box>
		</view>
		<view class="item">
			<text class="item-title">在行内</text>
			<view class="inline-item">
				<text class="item-label">购买数量：</text>
				<number-box></number-box>
			</view>
		</view>
		<view class="item">
			<text class="item-title">在表单中</text>
			<view class="uni-input-group">
				<view class="uni-input-row">
					<label>数字框一</label>
					<number-box></number-box>
				</view>
				<view class="uni-input-row">
					<label>数字框二</label>
					<number-box></number-box>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import numberBox from '../../../components/number-box.vue'

	export default {
		data() {
			return {
				title: 'number-box',
				numberValue: 0
			}
		},
		components: {
			numberBox
		},
		methods: {
			numberUpdate(value) {
				this.numberValue = value;
			}
		}
	}
</script>
<style>
	page {
		background: #efeff4;
	}

	.page {
		background: #efeff4;
		font-size: 34upx;
		padding-bottom: 70upx;
	}

	.item {
		margin: 20upx;
		margin-top: 30upx;
		display: flex;
		flex-direction: column;
	}

	.item-title {
		color: #8f8f94;
		font-size: 28upx;
		font-weight: 400;
	}

	.item-label {
		line-height: 70upx;
	}

	.item-label-right {
		line-height: 70upx;
		margin-left: 20upx;
	}

	.inline-item {
		display: flex;
		flex-direction: row;
	}

	.uni-input-group {
		position: relative;
		padding: 0;
		border: 0;
		background-color: #fff;
	}

	.uni-input-group:before {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 2upx;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-input-group:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 2upx;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-input-row {
		position: relative;
		display: flex;
		flex-direction: row;
	}

	.uni-input-group .uni-input-row:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 2upx;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-input-row {
		padding: 22upx 30upx;
		justify-content: space-between;
	}

	.uni-input-row label {
		line-height: 70upx;
	}
</style>
