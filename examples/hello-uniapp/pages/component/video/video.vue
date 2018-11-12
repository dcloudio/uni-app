<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<video id="myVideo" src="https://www.dcloud.io/uniapp/wap2appvsnative.mp4" @error="videoErrorCallback" :danmu-list="danmuList"
				    enable-danmu danmu-btn controls></video>
			</view>

			<view class="uni-list uni-common-mt">
				<view class="uni-list-cell">
					<view>
						<view class="uni-label">弹幕内容</view>
					</view>
					<view class="uni-list-cell-db">
						<input @blur="bindInputBlur" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @tap="bindSendDanmu" class="page-body-button">发送弹幕</button>
			</view>
			</view>
		</view>
	</view>
</template>
<script>
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
			bindSendDanmu: function () {
				this.videoContext.sendDanmu({
					text: this.inputValue,
					color: this.getRandomColor()
				})
			},
			videoErrorCallback: function (e) {
				console.log(e.target.errMsg);
				uni.showModal({
					content:e.target.errMsg,
					showCancel:false
				})
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
</script>

<style>
	video{width:690upx;}
</style>