#### Barcode

app端nvue专用的扫码组件。

- 此组件用于app端nvue页面实现内嵌到界面上的扫码。其他场景、其他平台，请使用全屏扫码API：[uni.scanCode](https://uniapp.dcloud.io/api/system/barcode) 
- App下纯nvue项目（manifest中renderer为native），暂不支持uni.scanCode API，此时只能使用barcode组件来替代。
- 此组件自HBuilderX 2.1.5+起支持。

**属性说明**
设置Barcode扫码控件的属性，如扫码框、扫码条的颜色等。

属性|类型 |默认值|必填|说明
:--|:--|:--|:--|:--|
autostart|boolean|false|否|是否自动开始扫码
background|string| |否|条码识别控件背景颜色,颜色值支持(参考CSS颜色规范)：颜色名称(参考CSS Color Names)/十六进制值/rgb值，默认值为黑色。
frameColor |string| |否|扫码框颜色,颜色值支持(参考CSS颜色规范)：颜色名称(参考CSS Color Names)/十六进制值/rgb值/rgba值，默认值为红色。
scanbarColor|string||否|扫码条颜色,颜色值支持(参考CSS颜色规范)：颜色名称(参考CSS Color Names)/十六进制值/rgb值/rgba值，默认值为红色。
filters|Array[Number] |[0,1,2]|否|条码类型过滤器，条码类型常量数组，默认情况支持QR、EAN13、EAN8类型。 通过此参数可设置扫码识别支持的条码类型（注意：设置支持的条码类型越多，扫描识别速度可能将会降低）。

**码类型常量**
- QR: QR二维码，数值为0
- EAN13: EAN条形码标准版，数值为1
- EAN8: ENA条形码简版，数值为2
- AZTEC: Aztec二维码，数值为3
- DATAMATRIX: Data Matrix二维码，数值为4
- UPCA: UPC条形码标准版，数值为5
- UPCE: UPC条形码缩短版，数值为6
- CODABAR: Codabar条形码，数值为7
- CODE39: Code39条形码，数值为8
- CODE93: Code93条形码，数值为9
- CODE128: Code128条形码，数值为10
- ITF: ITF条形码，数值为11
- MAXICODE: MaxiCode二维码，数值为12
- PDF417: PDF 417二维条码，数值为13
- RSS14: RSS 14条形组合码，数值为14
- RSSEXPANDED: 扩展式RSS条形组合码，数值为15

##### start(object)
> 开始扫码识别

###### Object object
属性|说明|类型|必填|备注
:--|:--|:--|:--|:--|
conserve|是否保存扫码成功时的截图|Boolean|否|如果设置为true则在扫码成功时将图片保存，并通过onmarked回调函数的file参数返回保存文件的路径。 默认值为false，不保存截图。
filename|保存扫码成功时图片保存路径|String|否|可通过此参数设置保存截图的路径和名称，如果设置图片文件名称则必须指定文件的后缀名（必须是.png），否则认为是指定目录，文件名称则自动生成。
vibrate|扫码成功时是否需要震动提醒|Boolean|否|如果设置为true则在扫码成功时震动设备，false则不震动。 默认值为true。
sound|扫码成功时播放的提示音|String|否|可取值： "none" - 不播放提示音； "default" - 播放默认提示音（5+引擎内置）。 默认值为"default"。


##### cancel()
> 取消扫码识别

参数|类型 |必填|说明
:--|:--|:--|:--|
无|无| 无| 结束对摄像头获取图片数据进行条码识别操作，同时关闭摄像头的视频捕获。 结束后可调用start方法重新开始识别。

##### setFlash(boolean)
> 操作闪光灯

###### Boolean boolean
类型 |必填|说明|备注
:--|:--|:--|:--|
Boolean| 是| 是否开启闪光灯|可取值true或false，true表示打开闪光灯，false表示关闭闪光灯。


##### 事件

##### marked
> 条码识别成功事件 {event.detail}

######  返回参数说明
参数|类型 |说明
:--|:--|:--|
type|string|"success" 表示成功
message|string|识别到的条码数据，扫码识别出的数据内容，字符串类型，采用UTF8编码格式。
code|Number|识别到的条码类型，与Barcode组件的条码类型常量一致。
file|string|扫码成功的截图文件路径，扫码识别到的截图，png格式文件，如果设置为不保存截图，则返回undefined。


##### error
> 条码识别错误事件

######  返回参数说明
参数|类型 |说明
:--|:--|:--|
type|string|"fail" 表示失败
code|number| 相应 code 码
message|string|失败描述

**示例：**
```html
<template>
	<view>
		<barcode id='1' class="barcode" autostart="true" ref="barcode" background="rgb(0,0,0)" frameColor="#1C86EE" scanbarColor="#1C86EE" :filters="fil" @marked="success1" @error="fail1"></barcode>
		<button class="btn" @click="toStart">开始扫码识别</button>
		<button class="btn" @click="tocancel">取消扫码识别</button>
		<button class="btn" @click="toFlash">开启闪光灯</button>
		<button class="btn" @click="toscan">预览</button>
	</view>
</template>

<script>
	export default {
		onLoad() {
			
		},
		data: {
			fil: [0, 2, 1]
		},

		methods: {
			success1(e) {
				console.log("success1:" + JSON.stringify(e));
			},
			fail1(e) {
				console.log("fail1:" + JSON.stringify(e));
			},
			toStart: function() {
				this.$refs.barcode.start({
					conserve: true,
					filename: '_doc/barcode/'
				});
			},
			tocancel:function(){
				this.$refs.barcode.cancel();
			},
			toFlash: function() {
				this.$refs.barcode.setFlash(true);
			},

			toscan: function() {
				console.log("scan:");				
				const barcodeModule = uni.requireNativePlugin('barcodeScan');
				barcodeModule.scan("/static/barcode1.png"
				,(e)=>{
					console.log("scan_error:"+JSON.stringify(e));
				});
			}
		}
	}
</script>

<style>
	.barcode {
		width: 750rpx;
		height: 700rpx;
		background-color: #808080;
	}

	.btn {
		top: 20rpx;
		width: 730rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
		background-color: #458B00;
		border-radius: 10rpx;
	}
</style>
```
