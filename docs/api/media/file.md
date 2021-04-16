### uni.chooseFile(OBJECT)
从本地选择文件。

本API主要用于选择非媒体文件，如果选择的文件是媒体文件，另有3个专用API：
- [图片选择](https://uniapp.dcloud.io/api/media/image?id=chooseimage)
- [视频选择](https://uniapp.dcloud.io/api/media/video?id=choosevideo)
- [多媒体文件选择(含图片视频)](https://uniapp.dcloud.io/api/media/video?id=choosemedia)

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√`(HBuilder X2.9.9+)`|x`(可使用wx.chooseMessageFile)`|x|x|x|x|

- App端如需选择非媒体文件，可在插件市场搜索[文件选择](https://ext.dcloud.net.cn/search?q=文件选择)，其中Android端可以使用Native.js，无需原生插件，而iOS端需要原生插件。
- App端如果想选择下载到`_doc`、`_downloads`、`_documents`等plus.io控制的目录下的文件，可通过[plus.io Api](https://www.html5plus.org/doc/zh_cn/io.html)，自己做选择框。
- 选择文件大多为了上传，uni ui封装了更完善的[uni-file-picker组件](https://ext.dcloud.net.cn/plugin?id=4079)，文件选择、上传到uniCloud的免费存储和cdn中，一站式集成。强烈推荐使用。

**OBJECT 参数说明**

|参数名|类型|默认值|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|count|Number|100|否|最多可以选择的文件数量|见下方说明|
|type|String|'all'|否|所选的文件的类型|见下方说明|
|extension|Array&lt;String&gt;||否|根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。|见下方说明|
|sourceType|Array&lt;String&gt;|['album','camera']|否|（仅在type为`image`或`video`时可用）`album` 从相册选图，`camera` 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项||
|success|Function||是|成功则返回图片的本地文件路径列表 `tempFilePaths`||
|fail|Function||否|接口调用失败的回调函数||
|complete|Function||否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**Tips**

- count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。
- sourceType 在H5端对应`input`的`capture`属性，设置为`['album']`无效，依然可以使用相机。
- extension暂只支持文件后缀名，例如`['.zip','.exe','.js']`，不支持`application/msword`等类似值

**注：文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile](api/file/file?id=savefile)，在应用下次启动时才能访问得到。**

**OBJECT.type 的合法值**

|值|说明|
|:-|:-|
|all|从所有文件选择|
|video|只能选择视频文件|
|image|只能选择图片文件|

**Tips**

- 如果type属性和extension同时存在，例如`{type:'image',extension:['.png','.jpg']}`，则会选择`image/png,image/jpg`文件
- 如果只配置extension属性，例如`{extension:['.doc','.xlsx','.docx']}`，则会选择`.doc,.xlsx,.docx`文件，详情见[`accept属性`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/accept)
- 在微信环境中，如果`type="all"`，则`extension`属性失效

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|tempFilePaths|Array&lt;String&gt;|文件的本地文件路径列表|
|tempFiles|Array&lt;Object&gt;、Array&lt;File&gt;|文件的本地文件列表，每一项是一个 File 对象|

**File 对象结构如下**

|参数|类型|说明|
|:-|:-|:-|
|path|String|本地文件路径|
|size|Number|本地文件大小，单位：B|
|name|String|包含扩展名的文件名称，仅H5支持|
|type|String|文件类型，仅H5支持|

**示例**

```javascript
uni.chooseFile({
  count: 6, //默认100
  extension:['.zip','.doc'],
	success: function (res) {
		console.log(JSON.stringify(res.tempFilePaths));
	}
});

// 选择图片文件
uni.chooseFile({
  count: 10,
  type: 'image',
  success (res) {
    // tempFilePath可以作为img标签的src属性显示图片
    const tempFilePaths = res.tempFiles
  }
})
```

# wx.chooseMessageFile(OBJECT)

从微信聊天会话中选择文件。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√`(基础库2.5.0+)`|x|x|x|x|

