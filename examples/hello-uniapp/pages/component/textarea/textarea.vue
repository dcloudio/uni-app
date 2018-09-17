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
	textarea {
		width: 700upx;
		padding: 25upx 0;
		height: 34upx;
		line-height: 34upx;
		font-size: 32upx;
	}
	.textare {
		height: 102upx;
	}

	.textarea-wrp {
		padding: 0 25upx;
		background-color: #fff;
	}
</style>
