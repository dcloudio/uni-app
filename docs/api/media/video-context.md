### uni.createVideoContext(videoId, this)
创建并返回 video 上下文 videoContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ``<video>`` 组件。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|基础库版本>=1.10.0|√|√|√|√|

**videoContext 对象的方法列表**

|方法|参数|说明|平台差异说明
|:-|:-|:-|:-|
|play|无|播放||
|pause|无|暂停||
|seek|position|跳转到指定位置，单位 s||
|stop||停止视频|微信小程序|
|sendDanmu|danmu|发送弹幕，danmu 包含两个属性 text, color||
|playbackRate|rate|设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5。微信基础库2.6.3 起支持 2.0 倍速||
|requestFullScreen|无|进入全屏，可传入{direction}参数，详见 video 组件文档|H5和字节跳动小程序不支持{direction}参数|
|exitFullScreen|无|退出全屏||
|showStatusBar|无|显示状态栏，仅在iOS全屏下有效|微信小程序、百度小程序、QQ小程序|
|hideStatusBar|无|隐藏状态栏，仅在iOS全屏下有效|微信小程序、百度小程序、QQ小程序|

**注意：**
- app-nvue 平台 2.2.5以下使用本API，需同时设置组件属性id和ref ``<video id="video1" ref="video1"></video>``，或者直接使用 ref，例如 ``this.$refs.video1``，2.2.5+ 支持直接使用 uni.createVideoContext(videoId, this)

**示例**

```html
<template>
	<view>
		<view class="page-body">
			<view class="page-section">
				<video id="myVideo" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/360e4b20-4f4b-11eb-8a36-ebb87efcf8c0.mp4" @error="videoErrorCallback" :danmu-list="danmuList"
				    enable-danmu danmu-btn controls></video>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view>
							<view class="uni-label">弹幕内容</view>
						</view>
						<view class="uni-list-cell-db">
							<input @blur="bindInputBlur" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
						</view>
					</view>
				</view>
				<view class="btn-area">
					<button @tap="bindSendDanmu" class="page-body-button" formType="submit">发送弹幕</button>
				</view>
			</view>
		</view>
	</view>
</template>
```
```javascript
export default {
	data() {
		return {
			title: 'video',
			src: '',
			inputValue: '',
			danmuList: [{
					text: '第 1s 出现的弹幕',
					color: '#ff0000',
					time: 1
				},
				{
					text: '第 3s 出现的弹幕',
					color: '#ff00ff',
					time: 3
				}
			]
		}
	},
	onReady: function (res) {
		this.videoContext = uni.createVideoContext('myVideo')
	},
	methods: {
		bindInputBlur: function (e) {
			this.inputValue = e.target.value
		},
		bindButtonTap: function () {
			var that = this
			uni.chooseVideo({
				sourceType: ['album', 'camera'],
				maxDuration: 60,
				camera: ['front', 'back'],
				success: function (res) {
					this.src = res.tempFilePath
				}
			})
		},
		bindSendDanmu: function () {
			this.videoContext.sendDanmu({
				text: this.inputValue,
				color: this.getRandomColor()
			})
		},
		videoErrorCallback: function (e) {
			console.log('视频错误信息:')
			console.log(e.target.errMsg)
		},
		getRandomColor: function () {
			const rgb = []
			for (let i = 0; i < 3; ++i) {
				let color = Math.floor(Math.random() * 256).toString(16)
				color = color.length == 1 ? '0' + color : color
				rgb.push(color)
			}
			return '#' + rgb.join('')
		}
	}
}
```
