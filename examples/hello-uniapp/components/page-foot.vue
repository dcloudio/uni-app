<template name="page-foot">
	<view class="page-share-title">
		<text>感谢{{name}}提供本示例，</text>
		<text class="submit" @tap="submit">我也提交</text>
	</view>
</template>

<script>
	export default {
		name: "page-foot",
		props: {
			name: {
				type: String,
				default: ""
			}
		},
		methods: {
			submit() {
				uni.showModal({
					content:"hello uni-app开源地址为https://github.com/dcloudio/uni-app/tree/master/examples，请在这个开源项目上贡献你的代码",
					showCancel:false
				})
			}
		}
	}
</script>
<style>
	.page-share-title {
		text-align: center;
		font-size: 30px;
		color: #BEBEBE;
		margin: 20px 0;
	}

	.submit {
		border-bottom: 1px solid #BEBEBE;
	}
</style>
