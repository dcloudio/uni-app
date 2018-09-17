<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="desc">请在下方输入电话号码</view>
				<input class="input" type="number" name="input" @input="bindInput" />
				<view class="btn-area">
					<button @tap="makePhoneCall" type="primary" :disabled="disabled">拨打</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'makePhoneCall',
				disabled: true
			}
		},
		methods: {
			bindInput: function (e) {
				this.inputValue = e.target.value
				if (this.inputValue.length > 0) {
					this.disabled = false
				} else {
					this.disabled = true
				}
			},
			makePhoneCall: function () {
				uni.makePhoneCall({
					phoneNumber: this.inputValue,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			}
		}
	}
</script>

<style>
	.page-section {
		width: auto;
		margin: 30upx;
		padding: 44upx 60upx 60upx;
		background-color: #fff;
		font-size: 28upx;
	}

	.desc {
		margin-bottom: 20upx;
	}

	.input {
		height: 119upx;
		line-height: 119upx;
		font-size: 78upx;
		border-bottom: 1upx solid #E2E2E2;
	}

	.btn-area {
		padding: 0;
	}

</style>
