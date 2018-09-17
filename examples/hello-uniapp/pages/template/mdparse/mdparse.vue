<template>
	<view style="margin-left: 15upx;margin-right: 15upx;">
		<wxParse :content="article" @preview="preview" @navigate="navigate" />
	</view>
</template>

<script>
//本示例引用组件为三方的mpvue-wxparse，该组件为开源mit协议，如有新需求可自行改动完成或联系原作者

	import marked from '../../../components/marked'
	import wxParse from '../../../components/mpvue-wxparse/src/wxParse.vue'

//真实业务开发时mdcontend应改为从网络获取，本演示写死在本地
var mdcontend = "很多资讯内容都是markdown格式，使用本模板可直接解析markdown为符合uni-app规范的富文本界面。下文为示例：\r\n" + 
"\r\n" +
"HBuilderX堪称markdown书写编辑的最佳工具，本文简单介绍HBuilderX里markdown的使用技巧。更多详情请在HBuilderX里点菜单帮助-markdown语法帮助。\r\n" +
"\r\n" +
"markdown的标题是行首以#号开头，空格分割的，不同级别的标题，在HX里着色也不同。如下：\r\n" +
"# 标题1\r\n" +
"## 标题2\r\n" +
"### 标题3\r\n" +
"#### 标题4\r\n" +
"##### 标题5\r\n" +
"\r\n" +
"HBuilderX标题编辑技巧：\r\n" +
"1. Emmet快速输入：敲h2+Tab即可生成二级标题【同HTML里的emmet写法，不止标题，HX里所有可对应tag的markdown语法均支持emmet写法】。仅行首生效\r\n" +
"2. 智能双击：双击#号可选中整个标题段落\r\n" +
"3. 智能回车：行尾回车或行中Ctrl+Enter强制换行后会自动在下一行补#\r\n" +
"4. 回车后再次按Tab可递进一层标题，再按Tab切换列表符\r\n" +
"5. 在# 后回车，可上插一个空标题行【同word】，任意位置按Ctrl+Shift+Enter也可以\r\n" +
"\r\n" +
"\r\n" +
"- 折叠：点标题前的-号可折叠该标题段落，快捷键是Alt+-（展开折叠是Alt+=）\r\n" +
"- 折叠：多层折叠时折叠或展开子节点，快捷键是Alt+Shift+-或=\r\n" +
"\r\n" +
"\r\n" +
"**加粗** 【快捷键：Ctrl+B，支持多光标；Emmet：b后敲Tab】\r\n" +
"\r\n" +
"_倾斜_【Emmet：i后敲Tab；前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入_】\r\n" +
"\r\n" +
"~~删除线~~【前后包围：选中文字按Ctrl+\\是在选区两侧添加光标，可以继续输入~~，会在2侧同时输入】\r\n" +
"\r\n" +
"> 引用\r\n" +
"\r\n" +
"\r\n" +
"[超链接](https://dcloud.io)\r\n" +
"\r\n" +
"![logo](https://img-cdn-qiniu.dcloud.net.cn/newpage/images/logo4.png)\r\n" +
"\r\n" +
"\r\n" +
"=======================\r\n" +
"\r\n" +
"\r\n" +
"``` javascript\r\n" +
"	var a = document; //代码\r\n" +
"```\r\n"
	export default {
		components: {
			wxParse
		},
		data() {
			return {
				article: marked(mdcontend)
			}
		},
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			}
		}

	}
</script>

<style>
	@import url("../../../components/mpvue-wxparse/src/wxParse.css");
</style>
