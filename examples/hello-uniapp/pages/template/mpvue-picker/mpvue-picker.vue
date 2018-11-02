<template>
	<view class="mvpue-picker">
		<view class="page-hd">
			<view class="page-title">mvpue-picker 使用示例</view>
			<view class="page__desc">选中的值:</view>
			<view class="picker-text">{{pickerText}}</view>
		</view>
		<view class="page-bd">
			<button type="default" @click="showSinglePicker">单列选择</button>
			<button type="default" @click="showMulLinkageTwoPicker">二级联动</button>
			<button type="default" @click="showMulLinkageThreePicker">三级城市联动</button>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../common/city.data.js';

	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				pickerValueDefault: [0, 0],
				pickerSingleArray: [{
						label: '中国',
						value: 1
					},
					{
						label: '俄罗斯',
						value: 2
					},
					{
						label: '美国',
						value: 3
					},
					{
						label: '日本',
						value: 4
					}
				],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0]
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
			}
		},
    onBackPress() {
      if (this.$refs.mpvuePicker.showPicker) {
      	this.$refs.mpvuePicker.pickerCancel();
        return true;
      }
      if (this.$refs.mpvueCityPicker.showPicker) {
      	this.$refs.mpvueCityPicker.pickerCancel();
        return true;
      }
    },
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>

<style>
	.page-hd {
		padding: 80upx;
	}

	.page-title {
		font-size: 40upx;
		font-weight: 800upx;
	}

	.page-bd {
		padding: 30upx;
	}

	.page__desc {
		margin-top: 20upx;
	}

	.picker-text {
		color: #6D6D6D;
	}

	button {
		margin-top: 30upx;
	}
</style>
