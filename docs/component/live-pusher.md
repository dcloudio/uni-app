#### live-pusher

实时音视频录制，也称直播推流。

- 微信小程序：[规范文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html)
- App平台：nvue文件下也支持live-pusher组件，API与微信相同。如果是vue文件，则需要单独编写条件编译代码，使用plus.video.LivePusher，[业务指南](https://ask.dcloud.net.cn/article/13416)、[规范文档](http://www.html5plus.org/doc/zh_cn/video.html#plus.video.LivePusher)


**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|x|x|x|x|

**参数说明**

设置live-pusher组件的推流地址，推流视频模式等。

属性|类型 |默认值|必填|说明:--|:--|:--|:--|:--|
url|string| |是|推流地址，支持RTMP协议。
mode |string| |否|推流视频模式，可取值：SD（标清）, HD（高清）, FHD（超清）。
muted|Boolean|false|否|是否静音。
enable-camera|Boolean|true|否|开启摄像头。
auto-focus|Boolean|true|否|自动聚集。
beauty|Number|0|否|美颜，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。
whiteness|Number|0|否|美白，取值范围 0-9（iOS取值范围为1） ，0 表示关闭。


```html
<template>
		<view>
			<live-pusher id='livePusher1' class="livePusher" ref="livePusher" url=""
			mode="SD" :muted="true" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
			aspect="9:16" postition="absolute"
			@statechange="statechange" @netstatus="netstatus" @error = "error"
			></live-pusher>
			<button class="btn" @click="start">开始推流</button>
			<button class="btn" @click="pause">暂停推流</button>
			<button class="btn" @click="resume">resume</button>
			<button class="btn" @click="stop">停止推流</button>
			<button class="btn" @click="snapshot">快照</button>
			<button class="btn" @click="startPreview">开启摄像头预览</button>
			<button class="btn" @click="stopPreview">关闭摄像头预览</button>
			<button class="btn" @click="switchCamera">切换摄像头</button>
		</view>
</template>
```

```javascript
<script>
	export default {
    onReady() {
      this.context = uni.createLivePusherContext("livePusher1", this);
    },
		methods: {
			statechange(e) {
				console.log("statechange:" + JSON.stringify(e));
			},
			netstatus(e) {
				console.log("netstatus:" + JSON.stringify(e));
			},
			error(e) {
				console.log("error:" + JSON.stringify(e));
			},
			start: function() {
				this.context.start((a) => {
					console.log("livePusher.start:" + JSON.stringify(a));
				});
			},
			close: function() {
				this.context.close((a) => {
					console.log("livePusher.close:" + JSON.stringify(a));
				});
			},
			snapshot: function() {
				this.context.snapshot((e) => {
					console.log(JSON.stringify(e));
				});
			},
			resume: function() {
				this.context.resume((a) => {
					console.log("livePusher.resume:" + JSON.stringify(a));
				});
			},
			pause: function() {
				this.context.pause((a) => {
					console.log("livePusher.pause:" + JSON.stringify(a));
				});
			},
			stop: function() {
				this.context.stop((a) => {
					console.log(JSON.stringify(a));
				});
			},
			switchCamera: function() {
				this.context.switchCamera((a) => {
					console.log("livePusher.switchCamera:" + JSON.stringify(a));
				});
			},
			startPreview: function() {
				this.context.startPreview((a) => {
					console.log("livePusher.startPreview:" + JSON.stringify(a));
				});
			},
			stopPreview: function() {
				this.context.stopPreview((a) => {
					console.log("livePusher.stopPreview:" + JSON.stringify(a));
				});
			}
		}
	}
</script>
```

相关api：[uni.createLivePusherContext](/api/media/live-pusher-context?id=createLivePusherContext)



**注意**

* live-pusher 是原生组件，在小程序端层级高于前端组件，请勿在 scroll-view、swiper、picker-view、movable-view 中使用，需使用cover-view覆盖。在App端的nvue文件中，live-pusher没有这类限制。
* App平台：使用 `<live-pusher/>` 组件，打包 App 时必须勾选 manifest.json->App 模块权限配置->LivePusher(直播推流) 模块。
