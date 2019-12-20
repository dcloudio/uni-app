### uni.showToast(OBJECT)

显示消息提示框。

**OBJECT参数说明**

|参数|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|title|String|是|提示的内容，长度与 icon 取值有关。||
|icon|String|否|图标，有效值详见下方说明。||
|image|String|否|自定义图标的本地路径|App、H5、微信小程序、百度小程序|
|mask|Boolean|否|是否显示透明蒙层，防止触摸穿透，默认：false|App、微信小程序|
|duration|Number|否|提示的延迟时间，单位毫秒，默认：1500||
|position|String|否|纯文本轻提示显示位置，填写有效值后只有 `title` 属性生效， 有效值详见下方说明。|App|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**icon 值说明**

|值|说明|平台差异说明|
|:-|:-|:-|
|success|显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值||
|loading|显示加载图标，此时 title 文本最多显示 7 个汉字长度。|支付宝小程序不支持|
|none|不显示图标，此时 title 文本在`小程序`最多可显示两行，`App`仅支持单行显示。|&nbsp;|

**示例**

```javascript
uni.showToast({
	title: '标题',
	duration: 2000
});
```

**position 值说明（仅App生效）**

|值|说明|
|:-|:-|
|top|居上显示|
|center|居中显示|
|bottom|居底显示|

**Tips**

App端可通过[plus.nativeUI.toast API](https://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.toast)实现更多功能。

### uni.hideToast()

隐藏消息提示框。

**示例**

```javascript
uni.hideToast();
```


### uni.showLoading(OBJECT)

显示 loading 提示框, 需主动调用 [uni.hideLoading](api/ui/prompt?id=hideloading) 才能关闭提示框。

**OBJECT参数说明**

|参数|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|title|String|是|提示的内容||
|mask|Boolean|否|是否显示透明蒙层，防止触摸穿透，默认：false|App、微信小程序、百度小程序|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**示例**

```javascript
uni.showLoading({
	title: '加载中'
});
```

### uni.hideLoading()

隐藏 loading 提示框。

**示例**

```javascript
uni.showLoading({
	title: '加载中'
});

setTimeout(function () {
	uni.hideLoading();
}, 2000);
```

### uni.showModal(OBJECT)

显示模态弹窗，类似于标准 html 的消息框：alert、confirm。

**OBJECT参数说明**

|参数|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|title|String|否|提示的标题||
|content|String|否|提示的内容||
|showCancel|Boolean|否|是否显示取消按钮，默认为 true||
|cancelText|String|否|取消按钮的文字，默认为"取消"，最多 4 个字符||
|cancelColor|HexColor|否|取消按钮的文字颜色，默认为"#000000"|H5、微信小程序、百度小程序|
|confirmText|String|否|确定按钮的文字，默认为"确定"，最多 4 个字符||
|confirmColor|HexColor|否|确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"|H5、微信小程序、百度小程序|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**注意**

- 钉钉小程序真机与模拟器表现有差异，真机title，content均为必填项

**success返回参数说明**

|参数|类型|说明|
|:-|:-|:-|:-|
|confirm|Boolean|为 true 时，表示用户点击了确定按钮|
|cancel|Boolean|为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）|

**Tips：**
* 在 App 下可以使用 [原生增强提示框插件](https://ext.dcloud.net.cn/plugin?id=36) 来解决 App 无法设置 cancelColor、confirmColor的问题。


**示例**

```javascript
uni.showModal({
	title: '提示',
	content: '这是一个模态弹窗',
	success: function (res) {
		if (res.confirm) {
			console.log('用户点击确定');
		} else if (res.cancel) {
			console.log('用户点击取消');
		}
	}
});
```

### uni.showActionSheet(OBJECT)

​显示操作菜单

**OBJECT参数说明**

|参数|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|itemList|Array&lt;String&gt;|是|按钮的文字数组|微信、百度、头条小程序数组长度最大为6个|
|itemColor|HexColor|否|按钮的文字颜色，字符串格式，默认为"#000000"|头条小程序不支持|
|success|Function|否|接口调用成功的回调函数，详见返回参数说明||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**success返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|tapIndex|Number|用户点击的按钮，从上到下的顺序，从0开始|

**示例**

```javascript
uni.showActionSheet({
	itemList: ['A', 'B', 'C'],
	success: function (res) {
		console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
	},
	fail: function (res) {
		console.log(res.errMsg);
	}
});
```

**Tips**

App端实现原生的、复杂的底部图文菜单，例如分享菜单，可参考[https://ext.dcloud.net.cn/plugin?id=69](https://ext.dcloud.net.cn/plugin?id=69)

**注意**

- 本章的所有弹出控件都是原生控件，层级最高，可覆盖video、map、tabbar等原生控件。
- [uni-app插件市场](https://ext.dcloud.net.cn/)有很多封装好的前端组件，但注意前端组件层级不是最高，无法覆盖原生组件，除非使用cover-view或nvue。
- App端还有原生的[prompt API](https://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.prompt)
