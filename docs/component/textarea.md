#### textarea

多行输入框。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|value|String||输入框的内容||
|placeholder|String||输入框为空时占位符||
|placeholder-style|String||指定 placeholder 的样式||
|placeholder-class|String|textarea-placeholder|指定 placeholder 的样式类|头条小程序不支持|
|disabled|Boolean|false|是否禁用||
|maxlength|Number|140|最大输入长度，设置为 -1 的时候不限制最大长度||
|focus|Boolean|false|获取焦点||
|auto-height|Boolean|false|是否自动增高，设置auto-height时，style.height不生效||
|fixed|Boolean|false|如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true|微信小程序、百度小程序、头条小程序|
|cursor-spacing|Number|0|指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离|微信小程序、百度小程序、头条小程序|
|cursor|Number||指定focus时的光标位置|微信小程序、5+App、H5、百度小程序、头条小程序|
|show-confirm-bar|Boolean|true|是否显示键盘上方带有”完成“按钮那一栏|微信小程序、百度小程序|
|selection-start|Number|-1|光标起始位置，自动聚集时有效，需与selection-end搭配使用|微信小程序、5+App、H5、百度小程序、头条小程序|
|selection-end|Number|-1|光标结束位置，自动聚集时有效，需与selection-start搭配使用|微信小程序、5+App、H5、百度小程序、头条小程序|
|adjust-position|Boolean|true|键盘弹起时，是否自动上推页面|微信小程序、百度小程序|
|@focus|EventHandle||输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度|微信小程序（基础库 1.9.90 起）|
|@blur|EventHandle||输入框失去焦点时触发，event.detail = {value, cursor}||
|@linechange|EventHandle||输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}|头条小程序不支持|
|@input|EventHandle||当键盘输入时，触发 input 事件，event.detail = {value, cursor}， @input 处理函数的返回值并不会反映到 textarea 上||
|@confirm|EventHandle||点击完成时， 触发 confirm 事件，event.detail = {value: value}|微信小程序、百度小程序|

**示例**
 
```html
<template>
	<view>
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
```
 
```javascript
export default {
    data() {
        return {}
    },
    methods: {
        bindTextAreaBlur: function (e) {
            console.log(e.detail.value)
        }
    }
}
```

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/textarea.png)

**Tips**

- textarea 的 blur 事件会晚于页面上的 tap 事件，如果需要在 button 的点击事件获取 textarea，可以使用 form 的 @submit。
- `input` 事件处理函数内实时修改当前值不生效，可以延迟设置，例如：``setTimeout(() => { this.value = 100 }, 0)``。
- 微信小程序、百度小程序、头条小程序中，textarea是原生组件，层级高于前端组件，请勿在 scroll-view、swiper、picker-view、movable-view 中使用 textarea 组件。覆盖textarea需要使用cover-view。[详见](/component/native-component)
- 小程序端 css 动画对 textarea 组件无效。
- H5 平台只能在用户交互时修改 focus 生效。
- 如果遇到 focus 属性设置不生效的问题参考：[组件属性设置不生效解决办法](/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- 软键盘的弹起和收齐逻辑，详见[input的文档](/component/input?id=app%E5%B9%B3%E5%8F%B0ios%E7%AB%AF%E8%BD%AF%E9%94%AE%E7%9B%98%E4%B8%8A%E6%96%B9%E6%A8%AA%E6%9D%A1%E5%8E%BB%E9%99%A4%E6%96%B9%E6%A1%88)

**富文本编辑的解决方案**
在输入框里图文混排内容，在web上该功能依赖document，而小程序和app的正常页面又没有document。
- 方式一是采用markdown编辑器方案，输入区输入markdown语法，预览区提供预览。插件市场搜[富文本编辑](https://ext.dcloud.net.cn/search?q=%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91)，有不少插件。
- 方式二是在vue页面里内嵌web-view组件，该组件支持完整html语法，此时可使用web中常见的各种富文本编辑器，插件市场也有这类插件。
