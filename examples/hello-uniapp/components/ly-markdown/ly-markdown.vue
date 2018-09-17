<template>
	<view>
		<view>
			<view class="toolbar">
				<view class="iconfont icon-bold" @click="toolBarClick('bold')"></view>
				<view class="iconfont icon-italic" @click="toolBarClick('italic')"></view>
				<view class="iconfont icon-xiahuaxian1" @click="toolBarClick('header')"></view>
				<view class="iconfont icon-underline" @click="toolBarClick('underline')"></view>
				<view class="iconfont icon-strike" @click="toolBarClick('strike')"></view>
				<view class="iconfont icon-sup" @click="toolBarClick('sup')"></view>
				<view class="iconfont icon-sub" @click="toolBarClick('sub')"></view>
				<view class="iconfont icon-alignleft" @click="toolBarClick('alignleft')"></view>
				<view class="iconfont icon-aligncenter" @click="toolBarClick('aligncenter')"></view>
				<view class="iconfont icon-alignright" @click="toolBarClick('alignright')"></view>
				<view class="iconfont icon-link" @click="toolBarClick('link')"></view>
				<view class="iconfont icon-image" @click="toolBarClick('imgage')"></view>
				<view class="iconfont icon-code" @click="toolBarClick('code')"></view>
				<view class="iconfont icon-table" @click="toolBarClick('table')"></view>
				<view class="iconfont icon-qingkong" @click="toolBarClick('clear')"></view>
			</view>
			<view class="input-content">
				<textarea auto-height maxlength="-1" v-model="textareaData" @blur="getCursor"></textarea>
			</view>
		</view>
		<view class="preview" v-if="showPreview && textareaHtml">
			<scroll-view scroll-y :style="'height:'+screenHeight/2.5+'px;padding:10px;box-sizing: border-box;'">
				<wxParse :content="textareaHtml" @preview="preview" @navigate="navigate" />
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import marked from '../marked'
	import wxParse from '../mpvue-wxparse/src/wxParse.vue'
	export default {
		name: "ly-markdown",
		components: {
			wxParse
		},
		data: function () {
			return {
				screenHeight: 0,
				cursor: 0
			}
		},
		props: {
			textareaData: {
				type: String,
				default: ""
			},
			textareaHtml: {
				type: String,
				default: ""
			},
			showPreview: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			preview(src, e) {
				uni.previewImage({
					urls: src,
				})
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// #ifdef APP-PLUS
				plus.runtime.openURL(href)
				// #endif
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: href,
					success: function () {
						uni.showModal({
							content: "网址已复制,请在浏览器中粘贴打开",
							showCancel: false
						})
					}
				})
				// #endif
			},
			toolBarClick(type) {
				if (type == 'bold') {
					this.textareaData += "**粗体文字** "
				} else if (type == "italic") {
					this.textareaData += "*斜体* "
				} else if (type == "header") {
					uni.showActionSheet({
						itemList: ["标题1", "标题2", "标题3", "标题4", "标题5", "标题6"],
						success: res => {
							switch (res.tapIndex) {
								case 0:
									this.textareaData += "# 标题1\r";
									return;
								case 1:
									this.textareaData += "## 标题2\r";
									return;
								case 2:
									this.textareaData += "### 标题3\r";
									return;
								case 3:
									this.textareaData += "#### 标题4\r";
									return;
								case 4:
									this.textareaData += "##### 标题5\r";
									return;
								case 5:
									this.textareaData += "###### 标题6\r";
									return;
							}
						}
					})
				} else if (type == "underline") {
					this.textareaData += "++下划线++ "
				} else if (type == "strike") {
					this.textareaData += "~~中划线~~ "
				} else if (type == "sup") {
					this.textareaData += "^上角标^ "
				} else if (type == "sub") {
					this.textareaData += "~下角标~ "
				} else if (type == "alignleft") {
					this.textareaData += "\n::: hljs-left\n\n左对齐\n\n:::\n"
				} else if (type == "aligncenter") {
					this.textareaData += "\n::: hljs-center\n\n居中对齐\n\n:::\n"
				} else if (type == "alignright") {
					this.textareaData += "\n::: hljs-right\n\n\n\n右对齐\n\n:::\n"
				} else if (type == "link") {
					this.textareaData += "[在此输入网址描述](在此输入网址) "
				} else if (type == "imgage") {
					this.textareaData += "![](在此输入图片地址) "
				} else if (type == "code") {
					this.textareaData += "\n``` 代码块 \n\n```\n"
				} else if (type == "table") {
					this.textareaData += "\n|列1|列2|列3|\n|-|-|-|\n|单元格1|单元格2|单元格3|\n"
				} else if (type == "clear") {
					uni.showModal({
						title: "提示",
						content: "确定清空?",
						success: res => {
							if (res.confirm) {
								this.textareaData = "";
							}
						}
					})
				}
			},
			getCursor(e) {
				//安卓失去焦点获取不到cursor位置,暂不使用
				//this.cursor = e.detail.cursor; 
			}
		},
		watch: {
			"textareaData": function (newValue, oldValue) {
				this.textareaHtml = marked(newValue)
				this.$emit('update:textareaData', newValue)
				this.$emit('update:textareaHtml', this.textareaHtml)
			}
		},
		onLoad: function () {
			uni.getSystemInfo({
				success: res => {
					this.screenHeight = res.screenHeight
				}
			})
		}
	}
</script>

<style>
	@import './markdown.css';
	@import url("../mpvue-wxparse/src/wxParse.css");

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

	.input-content {
		min-height: ;
	}
</style>
