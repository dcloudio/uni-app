<template xlang="wxml">
	<view class="container">
		<page-head :title="title"></page-head>
		<view class="qrimg">
			<qrcode :val="qrval" :size="qrsize" :colorDark="qrColorDark" :colorLight="qrColorLight" ref="qrcode" @result="qrR"></qrcode>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-title">请输入要生成的二维码内容</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<input class="uni-input" placeholder="请输入要生成的二维码内容" :value="qrval" @input="bindClearInput" />
				<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title">设置二维码大小</view>
		</view>
		<view class="body-view">
			<slider :value="qrsize" @change="sliderchange" min="50" max="500" show-value />
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="creatQrcode">生成二维码</button>
				<button type="primary" @tap="saveQrcode">保存到图库</button>
				<button type="warn" @tap="clearQrcode">清除二维码</button>
			</view>
		</view>
		<page-foot :name="name"></page-foot>
	</view>
</template>
<script>
import qrcode from '../../../components/qrcode/qrcode.vue'
export default {
	data() {
		return {
			title: '二维码生成',
			name: '诗小柒',
			showClearIcon: false,
			qrval: '', // 要生成的二维码值
			qrsize: 100, // 二维码大小
			qrColorDark: '#00ffff', // 二维码背景色
			qrColorLight: '#d0ff00', // 二维码前景色
			qrSrc: ''
		}
	},
	methods: {
		bindClearInput: function (e) {
			this.qrval = e.target.value;
			if (e.target.value.length > 0) {
				this.showClearIcon = true;
			} else {
				this.showClearIcon = false;
			}
		},
		clearIcon: function () {
			this.qrval = "";
			this.showClearIcon = false;
		},
		sliderchange(e) {
			this.qrsize = e.detail.value
		},
		creatQrcode() {
			this.$refs.qrcode._makeCode()
		},
		saveQrcode() {
			this.$refs.qrcode._saveCode()
		},
		qrR(res) {
			this.qrSrc = res
		},
		clearQrcode() {
			this.$refs.qrcode._clearCode()
			this.clearIcon();
		}
	},
	components: {
		qrcode
	}
}
</script>

<style>
@import "../../../common/icon.css";
.container {
  display: flex;
  flex-direction: column;
}
.qrimg {
  display: flex;
  justify-content: center;
}
</style>
