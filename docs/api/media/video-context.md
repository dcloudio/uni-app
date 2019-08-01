### uni.createVideoContext(videoId, this)
创建并返回 video 上下文 videoContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ``<video>`` 组件。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|x|√|x|

**videoContext 对象的方法列表**

|方法|参数|说明|
|:-|:-|:-|
|play|无|播放|
|pause|无|暂停|
|seek|position|跳转到指定位置，单位 s|
|stop||停止视频，仅`微信小程序平台`支持，[规范详情](https://developers.weixin.qq.com/miniprogram/dev/api/VideoContext.stop.html)|
|sendDanmu|danmu|发送弹幕，danmu 包含两个属性 text, color|
|playbackRate|rate|设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5|
|requestFullScreen|无|进入全屏，可传入{direction}参数，详见 video 组件文档|
|exitFullScreen|无|退出全屏|
|showStatusBar|无|显示状态栏，仅在iOS全屏下有效|
|hideStatusBar|无|隐藏状态栏，仅在iOS全屏下有效|


**示例**

```html
<template>
	<view>
		<view class="page-body">
			<view class="page-section">
				<video id="myVideo" src="http://img.cdn.qiniu.dcloud.net.cn/wap2appvsnative.mp4" @error="videoErrorCallback" :danmu-list="danmuList"
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