### uni.chooseImage(OBJECT)
从本地相册选择图片或使用相机拍照。另外选择和上传非图像、视频文件参考：[https://ask.dcloud.net.cn/article/35547](https://ask.dcloud.net.cn/article/35547)。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|count|Number|否|最多可以选择的图片张数，默认9|见下方说明|
|sizeType|Array&lt;String&gt;|否|original 原图，compressed 压缩图，默认二者都有|5+App、微信小程序、支付宝小程序、百度小程序|
|sourceType|Array&lt;String&gt;|否|album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项||
|success|Function|是|成功则返回图片的本地文件路径列表 tempFilePaths||
|fail|Function|否|接口调用失败的回调函数|小程序、5+App|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**Tips**

- count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。

**注：文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile](api/file/file?id=savefile)，在应用下次启动时才能访问得到。**

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|tempFilePaths|Array&lt;String&gt;|图片的本地文件路径列表|
|tempFiles|Array&lt;Object&gt;|图片的本地文件列表，每一项是一个 File 对象|

**File 对象结构如下**

|参数|类型|说明|
|:-|:-|:-|
|path|String|本地文件路径|
|size|Number|本地文件大小，单位：B|

**示例**

```javascript
uni.chooseImage({
	count: 6, //默认9
	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
	sourceType: ['album'], //从相册选择
	success: function (res) {
		console.log(JSON.stringify(res.tempFilePaths));
	}
});
```

### uni.previewImage(OBJECT) @unipreviewimageobject
预览图片。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|current|String/Number|详见下方说明|详见下方说明||
|urls|Array&lt;String&gt;|是|需要预览的图片链接列表||
|indicator|String|否|图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。|5+App|
|loop|Boolean|否|是否可循环预览，默认值为 false|5+App|
|longPressActions|Object|否|长按图片显示操作菜单，如不填默认为**保存相册**，1.9.5 起支持。|5+App|
|success|Function|否|接口调用成功的回调函数||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**current 参数说明**

> 1.9.5+ 支持传图片在 urls 中的索引值

current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。**App平台在 1.9.5至1.9.8之间，current为必填。不填会报错**

注意，当 urls 中有重复的图片链接时：

- 传链接，预览结果始终显示该链接在 urls 中第一次出现的位置。
- 传索引值，在微信/百度/头条小程序平台，会过滤掉传入的 urls 中该索引值之前与其对应图片链接重复的值。其它平台会保留原始的 urls 不会做去重处理。

举例说明：

一组图片 `[A, B1, C, B2, D]`，其中 B1 与 B2 的图片链接是一样的。

- 传 B2 的链接，预览的结果是 B1，前一张是 A，下一张是 C。
- 传 B2 的索引值 3，预览的结果是 B2，前一张是 C，下一张是 D。此时在微信/百度/头条小程序平台，最终传入的 urls 是 `[A, C, B2, D]`，过滤掉了与 B2 重复的 B1。

**longPressActions 参数说明**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|itemList|Array&lt;String&gt;|是|按钮的文字数组|
|itemColor|String|否|按钮的文字颜色，字符串格式，默认为"#000000"|
|success|Function|否|接口调用成功的回调函数，详见返回参数说明|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数|类型|说明|
|:-|:-|:-|
|index|Number|用户长按图片的索引值|
|tapIndex|Number|用户点击按钮列表的索引值|

**示例**

```javascript
// 从相册选择6张图
uni.chooseImage({
	count: 6,
	sizeType: ['original', 'compressed'],
	sourceType: ['album'],
	success: function(res) {
		// 预览图片
		uni.previewImage({
			urls: res.tempFilePaths,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
	});
```

### uni.getImageInfo(OBJECT)

获取图片信息。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|src|String|是|图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数名|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|width|Number|图片宽度，单位px||
|height|Number|图片高度，单位px||
|path|String|返回图片的本地路径||
|orientation|String|返回图片的方向，有效值见下表|小程序|
|type|String|返回图片的格式|小程序|

**orientation 参数说明**

|枚举值|说明|
|:-|:-|
|up|默认|
|down|180度旋转|
|left|逆时针旋转90度|
|right|顺时针旋转90度|
|up-mirrored|同up，但水平翻转|
|down-mirrored|同down，但水平翻转|
|left-mirrored|同left，但垂直翻转|
|right-mirrored|同right，但垂直翻转|

**示例**

```javascript
uni.chooseImage({
	count: 1,
	sourceType: ['album'],
	success: function (res) {
		uni.getImageInfo({
			src: res.tempFilePaths[0],
			success: function (image) {
				console.log(image.width);
				console.log(image.height);
			}
		});
	}
});
```

### uni.saveImageToPhotosAlbum(OBJECT)
保存图片到系统相册。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|x|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|filePath|String|是|图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数名|类型|说明|
|:-|:-|:-|
|errMsg|String|调用结果|

**示例代码：**

```javascript
uni.chooseImage({
	count: 1,
	sourceType: ['camera'],
	success: function (res) {
		uni.saveImageToPhotosAlbum({
			filePath: res.tempFilePaths[0],
			success: function () {
				console.log('save success');
			}
		});
	}
});
```

# uni.compressImage(OBJECT)

压缩图片接口，可选压缩质量

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序
|:-:|:-:|:-:|:-:|:-:|:-:|
|1.9.7+ [自定义组件编译模式](https://ask.dcloud.net.cn/article/35843)|x|√|√|x|x|

**OBJECT 参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :- | :- | :- | :- | :- |
| src | String |  | 是 | 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径 |
| quality | Number | 80 | 否 | 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效） |
| success | Function |  | 否 | 接口调用成功的回调函数 |
| fail | Function |  | 否 | 接口调用失败的回调函数 |
| complete | Function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success 返回参数说明**

| 属性 | 类型 | 说明 |
| :- | :- | :- |
| tempFilePath | String | 压缩后图片的临时文件路径 |

**示例代码：**

```js
uni.compressImage({
  src: '/static/logo.jpg',
  quality: 80,
  success: res => {
    console.log(res.tempFilePath)
  }
})
```


# wx.chooseMessageFile(OBJECT)

从客户端会话选择文件。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|x|x|

