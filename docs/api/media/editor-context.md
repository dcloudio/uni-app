## editorContext

editor 组件对应的 editorContext 实例，可通过 [uni.createSelectorQuery](/api/ui/nodes-info?id=createselectorquery) 获取。

```js
 onEditorReady() {
    uni.createSelectorQuery().select('#editor').context((res) => {
        this.editorCtx = res.context
    }).exec()
}
```

百度小程序 ```Editor``` 富文本编辑器动态库提供了 ```createEditorContext``` 的方法来获取。

```js
 onEditorReady() {
    this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
  }
```


`editorContext` 通过 `id` 跟一个 [`<editor>`](/component/editor) 组件绑定，操作对应的 [`<editor>`](/component/editor) 组件。






**平台差异说明**

|App|H5			|微信小程序	|支付宝小程序	|百度小程序	|字节跳动小程序	|QQ小程序	|
|:-:|:-:		|:-:				|:-:					|:-:				|:-:						|:-:			|
|√	|2.4.5+	|√					|x						|需引入动态库					|x							|x				|


**百度小程序引入动态库**


1. 在项目中引用动态库，在 ```manifest.json``` 中增添一项 ```dynamicLib``` 
 
```js
  "mp-baidu" : {
    "usingComponents" : true,
    "appid" : "",
    "setting" : {
      "urlCheck" : true
    },
    "dynamicLib": {//引入百度小程序动态库
      "editorLib": {
        "provider": "swan-editor"
      }
    }
  },

```

2. 在每个使用到富文本编辑器组件的页面，配置 ```pages.json``` 文件如下：

``` js 
{
	"pages": [ 
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app",
				"usingSwanComponents": {
					"editor": "dynamicLib://editorLib/editor"
				}
			}
		}
	]
}

```




## editorContext.format(name, value)

修改样式

| 参数 | 类型 | 说明 |
| --- | --- | --- |
|name|String|属性|
|value|String|值|

**支持设置的样式列表**

| name | value |
| --- | --- |
| bold |  |
| italic |  |
| underline |  |
| strike |  |
| ins |  |
| script | sub / super |
| header | H1 / H2 / h3 / H4 / h5 / H6 |
| align | left / center / right / justify |
| direction | rtl |
| indent | -1 / +1 |
| list | ordered / bullet / check |
| color | hex color |
| backgroundColor | hex color |
| margin/marginTop/marginBottom/marginLeft/marginRight | css style |
| padding/paddingTop/paddingBottom/paddingLeft/paddingRight | css style |
| font/fontSize/fontStyle/fontVariant/fontWeight/fontFamily | css style |
| lineHeight | css style |
| letterSpacing | css style |
| textDecoration | css style |
| textIndent | css style |

对已经应用样式的选区设置会取消样式。css style 表示 css 中规定的允许值。

## editorContext.insertDivider(OBJECT)

插入分割线

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.insertImage(OBJECT)

插入图片。

微信小程序平台地址为临时文件时，获取的编辑器html格式内容中 `<img>` 标签增加属性 data-local，delta 格式内容中图片 attributes 属性增加 data-local 字段，该值为传入的临时文件地址。
开发者可选择在提交阶段上传图片到服务器，获取到网络地址后进行替换。替换时对于html内容应替换掉 `<img>` 的 src 值，对于 delta 内容应替换掉 `insert { image: abc }` 值。

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| src | String |  | 是 | 图片地址 |
| alt | String |  | 否 | 图像无法显示时的替代文本 |
| width | String |  | 否 | 图片宽度（pixels/百分比），2.6.5+ 支持 |
| height | String |  | 否 | 图片高度 (pixels/百分比），2.6.5+ 支持|
| extClass | String |  | 否 | 添加到图片 img 标签上的类名，2.6.5+ 支持 |
| data | Object |  | 否 | data 被序列化为 name=value;name1=value2 的格式挂在属性 data-custom 上，2.6.5+ 支持 |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.insertText(OBJECT)

覆盖当前选区，设置一段文本

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| text | String |  | 否 | 文本内容 |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.setContents(OBJECT)

初始化编辑器内容，hmlt和delta同时存在时仅delta生效

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| html | String |  | 否 | 带标签的HTML内容 |
| delta | Object |  | 否 | 表示内容的delta对象 |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.getContents(OBJECT)

获取编辑器内容

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.clear(OBJECT)

清空编辑器内容

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.removeFormat(OBJECT)

清除当前选区的样式

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.undo(OBJECT)

撤销

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.redo(OBJECT)

恢复

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.blur(OBJECT)

编辑器失焦，同时收起键盘。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√`HBuilderX 3.0.3`|√`HBuilderX 3.0.3`|√`基础库2.8.3`|x|x|x|x|x|

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.scrollIntoView(OBJECT)

使得编辑器光标处滚动到窗口可视区域内。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√`HBuilderX 3.0.3`|√`HBuilderX 3.0.3`|√`基础库2.8.3`|x|x|x|x|x|

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

## editorContext.getSelectionText(OBJECT)

获取编辑器已选区域内的纯文本内容。当编辑器失焦或未选中一段区间时，返回内容为空。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√`HBuilderX 3.0.3`|√`HBuilderX 3.0.3`|√`基础库2.10.2`|x|x|x|x|x|

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success 返回参数说明：**

|参数|类型|说明|
|:-|:-|:-|
|errMsg|String|接口调用结果|
|text|String|纯文本内容|