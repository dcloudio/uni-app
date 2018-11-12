<template>
	<view class="page">
		<page-head :title="title"></page-head>
		<view class="uni-input-group uni-common-mt">
			<view class="uni-input-row">
				<label>默认</label>
				<number-box></number-box>
			</view>
			<view class="uni-input-row">
				<label>限定最小值和最大值</label>
				<number-box :min="0" :max="9"></number-box>
			</view>
			<view class="uni-input-row">
				<label>设定步长值（步长10）</label>
				<number-box :step="10"></number-box>
			</view>
			<view class="uni-input-row">
				<label>输入框只读</label>
				<number-box :disabled="true"></number-box>
			</view>
			<view class="uni-input-row">
				<label>获取输入的值 : {{numberValue}}</label>
				<number-box v-on:change="onNumberChange"></number-box>
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
			onNumberChange(value) {
				this.numberValue = value;
			}
		}
	}
</script>
<style>
</style>