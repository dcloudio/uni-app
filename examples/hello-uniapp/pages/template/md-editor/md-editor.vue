<template>
	<view class="container">
		<view class="page-body">
			<ly-markdown :showPreview="showPreview" :textareaData.sync="textareaData" :textareaHtml.sync="textareaHtml"></ly-markdown>
		</view>
		<page-foot :name="name"></page-foot>
	</view>
</template>

<script>
	import lyMarkdown from '../../../components/ly-markdown/ly-markdown.vue'
	export default {
		components: {
			lyMarkdown
		},
		data() {
			return {
				textareaData: "",
				textareaHtml:"",
				showPreview:false,
				name:'七月_'
			}
		},
		watch:{
			"textareaData":function(){
				this.showPreview = true;
			}
		}
	}
</script>

<style>
	.input-content {
		width: 100%;
	}

	.input-content textarea {
		padding: 16upx 25upx 15upx 25upx;
		font-size: 30upx;
		min-height: 500upx;
		line-height: 1.5;
	}

	.preview {
		border-top: 1upx solid #e0e0e0;
		width: 100%;
	}

	.toolbar {
		width: 100%;
		border: none;
		box-shadow: 0 0upx 4upx rgba(0, 0, 0, 0.157), 0 0upx 4upx rgba(0, 0, 0, 0.227);
	}

	.toolbar .iconfont {
		display: inline-block;
		cursor: pointer;
		height: 61.6upx;
		width: 61.6upx;
		margin: 13upx 0 11upx 0upx;
		font-size: 33upx;
		padding: 10upx 13upx 11upx 8upx;
		color: #757575;
		border-radius: 11upx;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		line-height: 2.2;
		vertical-align: middle;
	}
</style>
