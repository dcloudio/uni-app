<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-hello-text uni-common-mt">默认</view>
			<view class="uni-hello-items">
				<number-box></number-box>
			</view>
			
			<view class="uni-hello-text uni-common-mt">限定最小值和最大值（0~9）</view>
			<view class="uni-hello-items">
				<number-box :min="0" :max="9"></number-box>
			</view>
			
			<view class="uni-hello-text uni-common-mt">设定步长值（步长10）</view>
			<view class="uni-hello-items">
				<number-box :step="10"></number-box>
			</view>
			
			<view class="uni-hello-text uni-common-mt">获取输入框的值</view>
			<view class="uni-hello-items">
				<view class="uni-inline-item">
					<number-box v-on:update="numberUpdate"></number-box>
					<text class="item-label-right">当前的值为：{{numberValue}}</text>
				</view>
			</view>
			
			<view class="uni-hello-text uni-common-mt">输入框只读</view>
			<view class="uni-hello-items">
				<number-box :disabled="true"></number-box>
			</view>
			
			<view class="uni-hello-text uni-common-mt">在行内</view>
			<view class="uni-hello-items">
				<view class="uni-inline-item">
					<text class="item-label">购买数量：</text>
					<number-box></number-box>
				</view>
			</view>
			
			<view class="uni-hello-text uni-common-mt">在表单中</view>
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
		<view style="height:80upx;"></view>
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
	.uni-hello-items{
		padding:10upx 0;
	}
	
	.item-label {
		line-height: 70upx;
		font-size:28upx;
	}

	.item-label-right {
		font-size:28upx;
		line-height: 70upx;
		margin-left: 20upx;
	}
</style>
