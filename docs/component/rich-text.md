#### rich-text
富文本。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|nodes|Array / String|[]|节点列表 / HTML String|

**注意**

- app-nvue 平台 nodes 属性只支持使用 Array 类型

- 支付宝小程序 nodes 属性只支持使用 Array 类型。

如果需要支持 HTML String，则需要自己将 HTML String转化为 nodes 数组，可使用 [html-parser](https://github.com/dcloudio/hello-uniapp/blob/master/common/html-parser.js) 转换。

支持默认事件，包括：click、touchstart、touchmove、touchcancel、touchend、longpress。

**nodes 属性推荐使用 Array 类型，由于组件会将 String 类型转换为 Array 类型，因而性能会有所下降。**

##### nodes

现支持两种节点，通过 type 来区分，分别是元素节点和文本节点，默认是元素节点，在富文本区域里显示的 HTML 节点。

**元素节点：type = node**

|属性|说明|类型|必填|备注|
|:-|:-|:-|:-|:-|
|name|标签名|String|是|支持部分受信任的 HTML 节点|
|attrs|属性|Object|否|支持部分受信任的属性，遵循 Pascal 命名法|
|children|子节点列表|Array|否|结构和 nodes 一致|

**文本节点：type = text**

|属性|说明|类型|必填|备注|
|:-|:-|:-|:-|:-|
|text|文本|String|是|支持 entities|
 
##### 受信任的HTML节点及属性

全局支持class和style属性，**不支持id属性**。

|节点|属性|
|:-|:-|
|a||
|abbr||
|b||
|blockquote||
|br||
|code||
|col|span，width|
|colgroup|span，width|
|dd||
|del||
|div||
|dl||
|dt||
|em||
|fieldset||
|h1||
|h2||
|h3||
|h4||
|h5||
|h6||
|hr||
|i||
|img|alt，src，height，width|
|ins||
|label||
|legend||
|li||
|ol|start，type|
|p||
|q||
|span||
|strong||
|sub||
|sup||
|table|width|
|tbody||
|td|colspan，height，rowspan，width|
|tfoot||
|th|colspan，height，rowspan，width|
|thead||
|tr||
|ul|&nbsp;|

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/rich-text/rich-text)
```html
<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view class="uni-title uni-common-mt">
				数组类型
				<text>\nnodes属性为Array</text>
			</view>
			<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
				<rich-text :nodes="nodes"></rich-text>
			</view>
			<view class="uni-title uni-common-mt">
				字符串类型
				<text>\nnodes属性为String</text>
			</view>
			<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
	</view>
</template>
```
```javascript
export default {
    data() {
        return {
            nodes: [{
                name: 'div',
                attrs: {
                    class: 'div-class',
                    style: 'line-height: 60px; color: red; text-align:center;'
                },
                children: [{
                    type: 'text',
                    text: 'Hello&nbsp;uni-app!'
                }]
            }],
            strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
        }
    }
}
```
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/rich-text.png)

**Tips**

- nodes 不推荐使用 String 类型，性能会有所下降。
- rich-text 组件内屏蔽所有节点的事件。所以如果内容中有链接、图片需要点击，则不能使用rich-text，此时可在[uni-app插件市场](https://ext.dcloud.net.cn/)搜索uparse插件使用。app-nvue的rich-text组件支持链接图片点击，且nvue下不能使用uparse等插件。
- attrs 属性不支持 id ，支持 class 。
- name 属性大小写不敏感。
- 如果使用了不受信任的HTML节点，该节点及其所有子节点将会被移除。
- img 标签仅支持网络图片。
- 如果在自定义组件中使用 rich-text 组件，那么仅自定义组件的 css 样式对 rich-text 中的 class 生效。
