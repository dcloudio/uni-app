<template>
	<view>
		<page-head :title="title"></page-head>
		
			<view class="uni-title uni-common-pl">输入区域高度自适应，不会出现滚动条</view>
			<view class="uni-textarea">
				<textarea @blur="bindTextAreaBlur" auto-height />
			</view>
			
			<view class="uni-title uni-common-pl">占位符字体是红色的textarea</view>
			<view class="uni-textarea">
				<textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
			</view>
		</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'textarea',
				focus: false
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			}
		}
	}
</script>

<style>
</style>
