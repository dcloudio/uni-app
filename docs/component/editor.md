#### editor

富文本编辑器，可以对图片、文字格式进行编辑和混排。

编辑器导出内容支持带标签的 `html`和纯文本的 `text`，编辑器内部采用 `delta` 格式进行存储。

通过`setContents`接口设置内容时，解析插入的 `html` 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta 进行插入。

富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入[这段样式](https://github.com/wechat-miniprogram/editor-style/blob/master/editor.css)，并维护`<ql-container><ql-editor></ql-editor></ql-container>`的结构，参考：[使用 editor 组件导出的 html](https://ask.dcloud.net.cn/article/36205)。

图片控件仅初始化时设置有效。

相关 api：[editorContext](/api/media/editor-context)

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|2.0.0+ [自定义组件编译模式](https://ask.dcloud.net.cn/article/35843)，不含nvue|x|基础库 2.7.0+|x|x|x|x|

本功能自HBuilderX2.0起支持。运行到微信小程序工具时，注意在微信工具里选择最新的基础库。

editor组件目前只有App的vue页面和微信支持，其他端的富文本编辑解决方案，可使用web-view加载web页面，也可搜索[插件市场](https://ext.dcloud.net.cn/search?q=%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91) 获取简单的markdown富文本编辑器

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

不满足的标签会被忽略，``会被转行为`<p>`储存。

| 类型 | 节点 |
| --- | --- |
| 行内元素 | ` <strong> <b> <ins> <em> <i> <u>  <del> <s> <sub> <sup> <img>` |
| 块级元素 | `<p> <h1> <h2> <h3> <h4> <h5> <h6> <hr> <ol> <ul> <li>` |

#### 支持的内连样式

内联样式仅能设置在行内元素或块级元素上，不能同时设置。例如 font-size` 归类为行内元素属性，在 p 标签上设置是无效的。

| 类型 | 样式 |
| --- | --- |
| 块级样式 | `text-align` `direction` `margin` `margin-top` `margin-left` `margin-right` `margin-bottom`
`padding` `padding-top` `padding-left` `padding-right` `padding-bottom` `line-height` `text-indent` |
| 行内样式 | `font` `font-size` `font-style` `font-variant` `font-weight` `font-family`
`letter-spacing` `text-decoration` `color` `background-color` |

**注意事项**

1. 插入的 html 中事件绑定会被移除
2. formats 中的 color 属性会统一以 hex 格式返回
3. 粘贴时仅纯文本内容会被拷贝进编辑器
4. 插入 html 到编辑器内时，编辑器会删除一些不必要的标签，以保证内容的统一。例如`<p>xxx</p>`会改写为`<p>xxx</p>`
5. 编辑器聚焦时页面会被上推，系统行为以保证编辑区可见

**示例代码**

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
        const _that = this
				uni.createSelectorQuery().select('#editor').context((res) => {
          _that.editorCtx = res.context
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
