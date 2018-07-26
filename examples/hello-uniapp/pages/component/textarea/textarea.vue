<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">输入区域高度自适应，不会出现滚动条</view>
				<view class="textarea-wrp">
					<textarea @blur="bindTextAreaBlur" auto-height />
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-title">占位符字体是红色的textarea</view>
				<view class="textarea-wrp">
					<textarea class="textare" placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
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
				title: 'textarea',
				focus: false
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				console.log(e.detail.value)
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	textarea {
		width: 700px;
		padding: 25px 0;
		height: 34px;
		line-height: 34px;
		font-size: 32px;
	}
	.textare {
		height: 102px;
	}

	.textarea-wrp {
		padding: 0 25px;
		background-color: #fff;
	}
</style>
