#### editor

富文本编辑器，可以对图片、文字格式进行编辑和混排。

在web开发时，可以使用`contenteditable`来实现内容编辑。但这是一个dom API，在非H5平台无法使用。于是微信小程序和uni-app的App-vue提供了`editor`组件来实现这个功能，并且在uni-app的H5平台也提供了兼容。从技术本质来讲，这个组件仍然运行在视图层webview中，利用的也是浏览器的`contenteditable`功能。

编辑器导出内容支持带标签的 `html`和纯文本的 `text`，编辑器内部采用 `delta` 格式进行存储。

通过`setContents`接口设置内容时，解析插入的 `html` 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta 进行插入。

富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入[这段样式](https://github.com/dcloudio/uni-app/blob/master/src/core/view/components/editor/editor.css)，并维护`<ql-container><ql-editor></ql-editor></ql-container>`的结构，参考：[使用 editor 组件导出的 html](https://ask.dcloud.net.cn/article/36205)。

图片控件仅初始化时设置有效。

相关 api：[editorContext](/api/media/editor-context)

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|2.0+，app-vue|2.4.5+|基础库 2.7.0+|x|x|x|x|

editor组件目前只有H5、App的vue页面和微信支持，其他端平台自身未提供editor组件，只能使用web-view加载web页面，也可搜索[插件市场](https://ext.dcloud.net.cn/search?q=%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91) 获取简单的markdown富文本编辑器

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| read-only | boolean | false | 否 | 设置编辑器为只读 |
| placeholder | string |  | 否 | 提示信息 |
| show-img-size | boolean | false | 否 | 点击图片时显示图片大小控件 |
| show-img-toolbar | boolean | false | 否 | 点击图片时显示工具栏控件 |
| show-img-resize | boolean | false | 否 | 点击图片时显示修改尺寸控件 |
| @ready | eventhandle |  | 否 | 编辑器初始化完成时触发 |
| @focus | eventhandle |  | 否 | 编辑器聚焦时触发，event.detail = {html, text, delta} |
| @blur | eventhandle |  | 否 | 编辑器失去焦点时触发，detail = {html, text, delta} |
| @input | eventhandle |  | 否 | 编辑器内容改变时触发，detail = {html, text, delta} |
| @statuschange | eventhandle |  | 否 | 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 |

编辑器内支持部分 HTML 标签和内连样式，不支持**class**和**id**

#### 支持的标签

不满足的标签会被忽略，`<div>`会被转行为`<p>`储存。

| 类型 | 节点 |
| --- | --- |
| 行内元素 | `<span> <strong> <b> <ins> <em> <i> <u> <a> <del> <s> <sub> <sup> <img>` |
| 块级元素 | `<p> <h1> <h2> <h3> <h4> <h5> <h6> <hr> <ol> <ul> <li>` |

#### 支持的内连样式

内联样式仅能设置在行内元素或块级元素上，不能同时设置。例如 font-size` 归类为行内元素属性，在 p 标签上设置是无效的。

| 类型 | 样式 |
| --- | --- |
| 块级样式 | `text-align` `direction` `margin` `margin-top` `margin-left` `margin-right` `margin-bottom` `padding` `padding-top` `padding-left` `padding-right` `padding-bottom` `line-height` `text-indent` |
| 行内样式 | `font` `font-size` `font-style` `font-variant` `font-weight` `font-family` `letter-spacing` `text-decoration` `color` `background-color` |

**注意事项**

* 插入的 html 中事件绑定会被移除
* formats 中的 color 属性会统一以 hex 格式返回
* 粘贴时仅纯文本内容会被拷贝进编辑器
* 插入 html 到编辑器内时，编辑器会删除一些不必要的标签，以保证内容的统一。例如`<p><span>xxx</span></p>`会改写为`<p>xxx</p>`
* 编辑器聚焦时页面会被上推，系统行为以保证编辑区可见
* H5端会动态引入依赖 [quill.min.js](https://unpkg.com/quill@1.3.7/dist/quill.min.js)、[image-resize.min.js](https://unpkg.com/quill-image-resize-mp@3.0.1/image-resize.min.js)，依赖从 [unpkg.com](https://unpkg.com) 加载，如过依赖加载较慢，可以下载下来放在自己的服务器或 CDN 服务商，然后在 [自定义模板](/collocation/manifest?id=h5-template) head 内引入。


**示例代码** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/editor/editor)

```html
<template>
	<view class="container">
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
		<button type="warn" @tap="undo">撤销</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: '开始输入...'
			}
		},
		methods: {
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}

	#editor {
		width: 100%;
		height: 300px;
		background-color: #CCCCCC;
	}

	button {
		margin-top: 10px;
	}
</style>
```
