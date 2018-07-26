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
	import pageHead from '../../../components/page-head.vue'
	import numberBox from '../../../components/number-box.vue'

	export default {
		data() {
			return {
				title: 'number-box'
			}
		},
		components: {
			pageHead,
			numberBox
		}
	}
</script>
<style>
	@import "../../../common/uni.css";
	page {
		background: #efeff4;
	}

	.page {
		background: #efeff4;
		font-size: 34px;
		padding-bottom: 70px;
	}

	.item {
		margin: 20px;
		margin-top: 30px;
		display: flex;
		flex-direction: column;
	}

	.item-title {
		color: #8f8f94;
		font-size: 28px;
		font-weight: 400;
	}

	.item-label {
		line-height: 70px;
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
		height: 2px;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-input-group:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 2px;
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
		left: 30px;
		height: 2px;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-input-row {
		padding: 22px 30px;
		justify-content: space-between;
	}

	.uni-input-row label {
		line-height: 70px;
	}

	.uni-input-row .uni-numbox {}
</style>
