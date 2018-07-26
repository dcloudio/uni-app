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
	import pageHead from '../../../components/page-head.vue'

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
		},
		components: {
			pageHead

		}
	}
</script>

<style>
	.page-section {
		width: auto;
		margin: 30px;
		padding: 44px 60px 60px;
		background-color: #fff;
		font-size: 28px;
	}

	.desc {
		margin-bottom: 20px;
	}

	.input {
		height: 119px;
		line-height: 119px;
		font-size: 78px;
		border-bottom: 1px solid #E2E2E2;
	}

	.btn-area {
		padding: 0;
	}

</style>
