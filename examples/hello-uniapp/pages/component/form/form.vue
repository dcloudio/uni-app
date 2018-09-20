<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<form @submit="formSubmit" @reset="formReset">
				<view class="page-section page-section-gap">
					<view class="page-section-title">switch</view>
					<switch name="switch" />
				</view>

				<view class="page-section page-section-gap">
					<view class="page-section-title">radio</view>
					<radio-group class="uni-flex" name="radio">
						<label>
							<radio value="radio1" />选项一</label>
						<label>
							<radio value="radio2" />选项二</label>
					</radio-group>
				</view>

				<view class="page-section page-section-gap">
					<view class="page-section-title">checkbox</view>
					<checkbox-group class="uni-flex" name="checkbox">
						<label>
							<checkbox value="checkbox1" />选项一</label>
						<label>
							<checkbox value="checkbox2" />选项二</label>
					</checkbox-group>
				</view>

				<view class="page-section page-section-gap">
					<view class="page-section-title">slider</view>
					<slider value="50" name="slider" show-value></slider>
				</view>

				<view class="page-section">
					<view class="page-section-title">input</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<input class="uni-input" name="input" placeholder="这是一个输入框" />
						</view>
					</view>
				</view>

				<view class="btn-area">
					<button class="btn-submit" formType="submit">Submit</button>
					<button type="default" formType="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'form',
				pickerHidden: true,
				chosen: ''
			}
		},
		methods: {
			pickerConfirm: function (e) {
				this.pickerHidden = true
				this.chosen = e.target.value
			},
			pickerCancel: function (e) {
				this.pickerHidden = true
			},
			pickerShow: function (e) {
				this.pickerHidden = false
			},
			formSubmit: function (e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			}
		}
	}
</script>

<style>
	label {
		display: flex;
		flex-direction: row;
		min-width: 270upx;
		margin-right: 20upx;
	}

	.btn-submit {
		background-color: #007aff;
		color: #ffffff;
	}
	.uni-input{
		width: 100%;
		padding-left: 30upx;
	}
</style>
