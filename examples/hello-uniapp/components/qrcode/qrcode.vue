<template xlang="wxml" minapp="mpvue">
	<view class="_qrCode">
		<canvas class="_qrCodeCanvas" id="_myQrCodeCanvas" canvas-id="_myQrCodeCanvas" :style="{width:cSize+'px',height:cSize+'px'}" />
		<image v-if="show" :src="result" :style="{width:cSize+'px',height:cSize+'px'}" />
	</view>
</template>

<script>
import QRCode from "./qrcode.js"
let qrcode
export default {
	name: "qrCode",
	props: {
		size: {
			type: Number,
			default: 100
		},
		show: {
			type: Boolean,
			default: true
		},
		val: {
			type: String,
			default: ''
		},
		colorDark: {
			type: String,
			default: '#000000'
		},
		colorLight: {
			type: String,
			default: '#ffffff'
		},
	},
	data() {
		return {
			cSize: this.size,
			result: '',
		}
	},
	methods: {
		_makeCode() {
			let that = this
			qrcode = new QRCode({
				text: that.val,
				width: that.cSize,
				height: that.cSize,
				colorDark: that.colorDark,
				colorLight: that.colorLight,
				correctLevel: QRCode.CorrectLevel.H,
				cbResult: function (res) {
					that._result(res)
				}
			});
		},
		_clearCode(){
			this._result('')
			qrcode.clear()
		},
		_saveCode() {
			let that = this;
			if (this.result != "") {
				uni.saveImageToPhotosAlbum({
					filePath: that.result,
					success: function () {
						uni.showToast({
							title: '二维码保存成功',
							icon: 'success',
							duration: 2000
						});
					}
				});
			}
		},
		_result(res) {
			this.result = res;
			this.$emit('result', res)
		}
	},
	computed: {
	},
	watch: {
		size: function (n, o) {
			if (n != o) {
				this.cSize = n
				setTimeout(() => {
					this._makeCode()
				}, 100);
			}
		}
	},
	onLoad: function () {
		// console.log(this.val)
	}
}
</script>
<style>
._qrCode {
  position: relative;
}
._qrCodeCanvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}
</style>
