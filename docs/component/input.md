#### input

输入框。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|value|String||输入框的初始内容||
|type|String|text|input 的类型||
|password|Boolean|false|是否是密码类型||
|placeholder|String||输入框为空时占位符||
|placeholder-style|String||指定 placeholder 的样式||
|placeholder-class|String|"input-placeholder"|指定 placeholder 的样式类||
|disabled|Boolean|false|是否禁用||
|maxlength|Number|140|最大输入长度，设置为 -1 的时候不限制最大长度||
|cursor-spacing|Number|0|指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离|5+App、微信小程序、百度小程序、QQ小程序|
|focus|Boolean|false|获取焦点。在 H5 平台聚焦后软键盘是否跟随弹出，取决于当前浏览器本身的规范（策略）。||
|confirm-type|String|done|设置键盘右下角按钮的文字，仅在 type="text" 时生效。||
|confirm-hold|Boolean|false|点击键盘右下角按钮时是否保持键盘不收起|5+App、微信小程序、支付宝小程序、百度小程序、QQ小程序|
|cursor|Number||指定focus时的光标位置||
|selection-start|Number|-1|光标起始位置，自动聚集时有效，需与selection-end搭配使用||
|selection-end|Number|-1|光标结束位置，自动聚集时有效，需与selection-start搭配使用||
|adjust-position|Boolean|true|键盘弹起时，是否自动上推页面|5+App、微信小程序、百度小程序、QQ小程序|
|@input|EventHandle||当键盘输入时，触发input事件，event.detail = {value}|差异见下方 Tips|
|@focus|EventHandle||输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度|仅微信小程序、5+App（HBuilderX 2.0+ [nvue uni-app模式](http://ask.dcloud.net.cn/article/36074)） 、QQ小程序支持 height|
|@blur|EventHandle||输入框失去焦点时触发，event.detail = {value: value}||
|@confirm|EventHandle||点击完成按钮时触发，event.detail = {value: value}|&nbsp;|

**Tips**

- `input` 事件处理函数可以直接 return 一个字符串，将替换输入框的内容。仅微信小程序支持。
- `input` 事件处理函数内实时修改当前值不生效，可以延迟设置，例如：``setTimeout(() => { this.value = 100 }, 0)``。
- `input` 组件上有默认的 `min-height` 样式，如果 `min-height` 的值大于 `height` 的值那么 `height` 样式无效。

**type 有效值**

|值|说明|平台差异说明|
|:-|:-|:-|
|text|文本输入键盘||
|number|数字输入键盘|注意iOS的vue页面弹出的数字键盘并非9宫格方式|
|idcard|身份证输入键盘|微信、支付宝、百度、QQ小程序|
|digit|带小数点的数字键盘|App的nvue页面、微信、支付宝、百度、头条、QQ小程序|

**注意事项**

- 小程序平台，`number` 类型只支持输入整型数字。微信开发者工具上体现不出效果，请使用真机预览。
- 如果需要在小程序平台输入浮点型数字，请使用 `digit` 类型。
- input组件若不想弹出软键盘，可设置为disable
- App平台的vue页面及 H5平台 的弹出键盘使用的是浏览器控制的键盘，丰富程度略低。可通过插件市场补足。
- [uni-app插件市场](https://ext.dcloud.net.cn/)有各种类型的模拟键盘，比如车牌键盘、身份证键盘，以及封装好的搜索框ui组件，可去插件市场搜索 [键盘](https://ext.dcloud.net.cn/search?q=%E9%94%AE%E7%9B%98)。
- [uni-app插件市场](https://ext.dcloud.net.cn/)有输入文字后自动提示候选的组件，可搜索 [autocomplete](https://ext.dcloud.net.cn/search?q=autocomplete) 查看。

**confirm-type 有效值**


|值|说明|平台差异说明|
|:-|:-|-|
|send|右下角按钮为“发送”|微信、支付宝、百度小程序、App的nvue|
|search|右下角按钮为“搜索”||
|next|右下角按钮为“下一个”|微信、支付宝、百度小程序、App的nvue|
|go|右下角按钮为“前往”||
|done|右下角按钮为“完成”|微信、支付宝、百度小程序、App的nvue|

App平台的nvue页面，如果是uni-app编译模式，直接使用此属性设置即可生效。如果是weex编译模式，需通过weex的api设置，[weex相关文档参考](https://weex.apache.org/zh/docs/components/input.html#%E5%B1%9E%E6%80%A7)

#### App平台iOS端软键盘上方横条去除方案

App平台在iOS上，webview中的软键盘弹出时，默认在软键盘上方有一个横条，显示着：上一项、下一项和完成等按钮。如不想显示这个横条，可以配置softinputNavBar: 'none'
- 如需要整个App配置，则在manifest中配置
```json
	"app-plus": {
		"softinput": {  
			"navBar": "none"    // 是否显示软键盘上的导航条  
        }
	}
```

- 如需要单个页面配置，则在pages.json中配置
```json
	{
		"path": "pages/component/input/input",
		"style": {
			"app-plus":{
				"softinputNavBar":"none"
			}
		}
	}
```

- 如需使用js动态设置softinputNavBar
```javascript
this.$mp.page.$getAppWebview().setStyle({
	softinputNavBar: 'none'
})
```

如果是nvue页面，默认就没有键盘上方的横条，无需任何设置。

#### 关于软键盘弹出的逻辑说明

App平台，软键盘弹出有adjustResize|adjustPan 两种模式
- adjustResize：软键盘弹出时，webview窗体高度挤压。屏幕高度=webview窗体高度+软键盘高度
- adjustPan：软键盘弹出时，webview窗体高度不变，但窗体上推，以保证输入框不被软键盘盖住

除了App平台，其他平台只支持adjustPan模式。App平台两种模式都支持，具体如下：
- Android：默认为adjustResize。配置修改只能在manifest中修改，全局生效。如果改为adjustPan，无法顺利上推窗体，底部的input会被软键盘盖住
- iOS平台：默认为adjustPan。配置可以在manifest中全局修改，也可以单独页面设置style。没有类似Android的局限。

如下为全局或页面的配置方式：
- 在manifest中配置
```json
	"app-plus": {
		"softinput": {  
			"mode": "adjustResize|adjustPan"    // 软键盘弹出模式   
        }
	}
```

- 如需要单个页面配置，则在pages.json中配置
```json
	{
		"path": "pages/component/input/input",
		"style": {
			"app-plus":{
				"softinputMode": "adjustResize" //仅iOS支持单个页面配置
			}
		}
	}
```

App端开发聊天类应用时，目前推荐改为adjustResize模式。在hello uni-app的模板-聊天中有详细示例。

**注意**
- adjustResize模式在Android App上，弹起键盘和收回键盘时，因为要重设webview高度，可能会临时性出现灰屏或漏出下层页面内容。后续会优化
- 小程序端在 input 聚焦期间，避免使用 css 动画。
- H5平台只能在用户交互时修改 focus 生效。
- 如果遇到 focus 属性设置不生效的问题参考：[组件属性设置不生效解决办法](/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)


#### 关于软键盘收起的逻辑说明
- Android上在软键盘弹出后，点击back或点击非置焦区域可收起软键盘。
- iOS上如果软键盘上方有带有“完成”的横条，则需要点完成才能收起键盘；如果没有软键盘上方横条，则点击非input/textarea区域即可收起软键盘

以上为默认逻辑，uni-app同时提供了隐藏软键盘的api：[uni.hideKeyboard()](https://uniapp.dcloud.io/api/key?id=hidekeyboard)

#### App平台原生输入框的说明
在app平台，有titleNView配置的[searchinput](/collocation/pages?id=app-titlenview)原生输入框和plus.nativeObj.view的drawinput。这两种方式的输入框都是原生的，不是webview里的。
- 原生输入框在iOS上不会有软键盘上方的横条
- 原生输入框一样受配置的`adjustPan|adjustResize`模式影响

**input示例**
 
```html
<template>
	<view>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">可自动聚焦的input</view>
				<input class="uni-input" focus placeholder="自动获得焦点" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">键盘右下角按钮显示为搜索</view>
				<input class="uni-input" confirm-type="search" placeholder="键盘右下角按钮显示为搜索" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制最大输入长度的input</view>
				<input class="uni-input" maxlength="10" placeholder="最大输入长度为10" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">实时获取输入值：{{inputValue}}</view>
				<input class="uni-input" @input="onKeyInput" placeholder="输入同步到view中" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制输入的input</view>
				<input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder="连续的两个1会变成2" />
			</view>
			<!-- #ifndef MP-BAIDU -->
			<view class="uni-form-item uni-column">
				<view class="title">控制键盘的input</view>
				<input class="uni-input" ref="input1" @input="hideKeyboard" placeholder="输入123自动收起键盘" />
			</view>
			<!-- #endif -->
			<view class="uni-form-item uni-column">
				<view class="title">数字输入的input</view>
				<input class="uni-input" type="number" placeholder="这是一个数字输入框" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码输入的input</view>
				<input class="uni-input" password type="text" placeholder="这是一个密码输入框" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">带小数点的input</view>
				<input class="uni-input" type="digit" placeholder="带小数点的数字键盘" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">身份证输入的input</view>
				<input class="uni-input" type="idcard" placeholder="身份证输入键盘" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">控制占位符颜色的input</view>
				<input class="uni-input" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" />
			</view>
		</view>
	</view>
</template>
```
 
```javascript
export default {
    data() {
        return {
            title: 'input',
            focus: false,
            inputValue: '',
            changeValue: ''
        }
    },
    methods: {
        onKeyInput: function(event) {
            this.inputValue = event.target.value
        },
        replaceInput: function(event) {
            var value = event.target.value;
            if (value === '11') {
                this.changeValue = '2';
            }
        },
        hideKeyboard: function(event) {
            if (event.target.value === '123') {
                uni.hideKeyboard();
            }
        }
    }
}
```
 
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/input.png?t=201857)
