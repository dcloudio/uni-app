#### text
文本。

**属性说明**

|属性名		|类型	|默认值	|说明			|平台差异说明				|
|:-|:-			|:-		|:-		|:-				|:-						|
|selectable	|Boolean|false	|文本是否可选	|						|
|space		|String	|		|显示连续空格	|5+APP、H5、微信小程序	|
|decode		|Boolean|false	|是否解码		|5+APP、H5、微信小程序	|

**space 值说明**

|值|说明|
|:-|:-|
|ensp|中文字符空格一半大小|
|emsp|中文字符空格大小|
|nbsp|根据字体设置的空格大小|

**Tips**

- `<text>` 组件内只支持嵌套 `<text>`，不支持其它组件或自定义组件，否则会引发在不同平台的渲染差异。。
- decode 可以解析的有 `&nbsp;` `&lt;` `&gt;` `&amp;` `&apos;` `&ensp;` `&emsp;`。
- 各个操作系统的空格标准并不一致。
- 除了文本节点以外的其他节点都无法长按选中。
- 支持 `\n` 方式换行。
- 如果使用 `<span>` 组件编译时会被转换为 `<text>`。

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/text/text)
```html
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="text-box" scroll-y="true">
				<text>{{text}}</text>
			</view>
			<view class="uni-btn-v">
				<button type="primary" :disabled="!canAdd" @click="add">add line</button>
				<button type="warn" :disabled="!canRemove" @click="remove">remove line</button>
			</view>
		</view>
	</view>
</template>
```
```javascript
export default {
    data() {
        return {
            texts: [
                'HBuilder，200万开发者选择的IDE',
                'MUI，轻巧、漂亮的前端开源框架',
                'wap2app，M站快速转换原生体验的App',
                '5+Runtime，为HTML5插上原生的翅膀',
                'HBuilderX，轻巧、极速，极客编辑器',
                'uni-app，终极跨平台方案',
                'HBuilder，200万开发者选择的IDE',
                'MUI，轻巧、漂亮的前端开源框架',
                'wap2app，M站快速转换原生体验的App',
                '5+Runtime，为HTML5插上原生的翅膀',
                'HBuilderX，轻巧、极速，极客编辑器',
                'uni-app，终极跨平台方案',
                '......'
            ],
            text: '',
            canAdd: true,
            canRemove: false,
            extraLine: []
        }
    },
    methods: {
        add: function(e) {
            this.extraLine.push(this.texts[this.extraLine.length % 12]);
            this.text = this.extraLine.join('\n');
            this.canAdd = this.extraLine.length < 12;
            this.canRemove = this.extraLine.length > 0;
        },
        remove: function(e) {
            if (this.extraLine.length > 0) {
                this.extraLine.pop();
                this.text = this.extraLine.join('\n');
                this.canAdd = this.extraLine.length < 12;
                this.canRemove = this.extraLine.length > 0;
            }
        }
    }
}

```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/text.png)
