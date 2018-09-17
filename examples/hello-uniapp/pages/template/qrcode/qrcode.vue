<template>
	<view class="container">
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<qrcode :val="qrval" :size="qrsize" ref="qrcode"></qrcode>
			</view>
			<view class="page-section">
				<view class="page-section-title">请输入要生成的二维码内容</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input class="uni-input" placeholder="请输入要生成的二维码内容" :value="qrval" @input="bindClearInput" />
						<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon"></view>
					</view>
				</view>
				<view class="page-section-title">设置二维码大小</view>
				<view class="body-view">
					<slider :value="qrsize" @change="sliderchange" min="50" max="500" show-value/>
				</view>
			</view>
			<view class="page-section">
				<button type="primary" @tap="creatQrcode">生成二维码</button>
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
				name:'诗小柒',
				showClearIcon: false,
				qrval:'',
				qrsize:100,
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
			sliderchange(e){
				this.qrsize = e.detail.value
			},
			creatQrcode(){
				this.$refs.qrcode.creatQrcode();
			},
			clearQrcode(){
				this.$refs.qrcode.clearQrcode();
				this.clearIcon();
			}
		},
		components: {
			qrcode
		}
	}
</script>

<style>
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";
	.page-section {
		margin-bottom: 20upx;
	}

	.page-body {
		padding-bottom: 40upx;
	}

	.uni-list-cell {
		padding: 0 30upx;
	}

	.uni-input {
		flex: 1;
	}

	.uni-icon {
		color: #999;
	}
</style>
