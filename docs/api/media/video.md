### uni.chooseVideo(OBJECT)
拍摄视频或从手机相册中选视频，返回视频的临时文件路径。另外选择和上传非图像、视频文件参考：[https://ask.dcloud.net.cn/article/35547](https://ask.dcloud.net.cn/article/35547)。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|sourceType|Array&lt;String&gt;|否|album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']||
|compressed|Boolean|否|是否压缩所选的视频源文件，默认值为 true，需要压缩。|微信小程序、百度小程序、字节跳动小程序|
|maxDuration|Number|否|拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。|APP平台 1.9.7+(iOS支持，Android取决于ROM的拍照组件是否实现此功能，如果没实现此功能则忽略此属性。) 微信小程序、百度小程序|
|camera|String|否|'front'、'back'，默认'back'|APP、微信小程序|
|success|Function|否|接口调用成功，返回视频文件的临时文件路径，详见返回参数说明。||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**success 返回参数说明**

|参数|类型|说明|平台差异说明说明|
|:-|:-|:-|:-|
|tempFilePath|String|选定视频的临时文件路径||
|tempFile|File|选定的视频文件|仅H5（2.7.0+）支持|
|duration|Number|选定视频的时间长度，单位为 s|APP 2.1.0+、H5、微信小程序|
|size|Number|选定视频的数据量大小|APP 2.1.0+、H5、微信小程序|
|height|Number|返回选定视频的高|APP 2.1.0+、H5、微信小程序|
|width|Number|返回选定视频的宽|APP 2.1.0+、H5、微信小程序|
|name|String|包含扩展名的文件名称|仅H5支持|

**注意：**
* 文件的临时路径，在应用本次启动期间可以正常使用，如需持久保存，需在主动调用 [uni.saveFile](api/file/file?id=savefile)，在应用下次启动时才能访问得到。
* camera 部分 Android 手机下由于系统 ROM 不支持无法生效，打开拍摄界面后可操作切换
* 可以通过用户授权API来判断用户是否给应用授予相册或摄像头的访问权限[https://uniapp.dcloud.io/api/other/authorize](https://uniapp.dcloud.io/api/other/authorize)
* App下如需进一步压缩视频大小，可以在插件市场搜索[视频压缩](http://ext.dcloud.net.cn/search?q=%E8%A7%86%E9%A2%91%E5%8E%8B%E7%BC%A9)插件

**示例**

```html
<template>
	<view>
		<text>hello</text>
		<button @tap="test">click me</button>
		<video :src="src"></video>
	</view>
</template>
```
```javascript
export default {
	data: {
		src: ''
	},
	methods: {
		test: function () {
			var self = this;
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera', 'album'],
				success: function (res) {
					self.src = res.tempFilePath;
				}
			});
		}
	}
}
```

### uni.saveVideoToPhotosAlbum(OBJECT)
保存视频到系统相册。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|filePath|String|是|视频文件路径，可以是临时文件路径也可以是永久文件路径|
|success|Function|否|接口调用成功的回调函数|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明**

|参数名|类型|说明|
|:-|:-|:-|
|errMsg|String|调用结果|

**注意**

- 可以通过用户授权API来判断用户是否给应用授予相册写入权限[https://uniapp.dcloud.io/api/other/authorize](https://uniapp.dcloud.io/api/other/authorize)

**示例**

```html
<template>
	<view>
		<text>hello</text>
		<button @tap="test">click me</button>
		<video :src="src"></video>
	</view>
</template>
```
```javascript
export default {
	data: {
		src: ''
	},
	methods: {
		test: function () {
			var self = this;
			uni.chooseVideo({
				count: 1,
				sourceType: ['camera'],
				success: function (res) {
					self.src = res.tempFilePath;
					
					uni.saveVideoToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function () {
							console.log('save success');
						}
					});
				}
			});
		}
	}
}
```
