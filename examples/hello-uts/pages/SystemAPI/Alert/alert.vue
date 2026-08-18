<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<button @tap="testShowAlert">确认框</button>
			<button @tap="testShowPrompt">输入框</button>
		</view>
	</view>

</template>

<script>
  // #ifdef APP
	import { showAlert,showPrompt } from '@/uni_modules/uts-alert'
  // #endif
	export default {
		
		data() {
			return {
				title:"Alert 示例"
			}
		},
		methods:{
			
			testShowAlert(){
				showAlert("提示框","这是一个提示框", (index)=> {
					
					var title = null
					if (index == 0) {
						title = "点击了确认"
					} else{
						title = "点击了取消"
					}
					
					uni.showToast({
						title: title,
						icon:'none'
					})
				})
			},
			testShowPrompt() {
				showPrompt("输入框","这是一个输入框","请输入内容", (content)=>{
					let title = content.length > 0 ? content : "没有输入内容"
					uni.showToast({
						title: title,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style>
</style>