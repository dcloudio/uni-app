<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap">
			<view style="background:#FFFFFF; padding:40upx;">
				<view class="uni-hello-text uni-center">当前位置经纬度</view>
				<block v-if="hasLocation === false">
					<view class="uni-h2 uni-center uni-common-mt">未获取</view>
				</block>
				<block v-if="hasLocation === true">
					<view class="uni-h2 uni-center uni-common-mt">
						<text>E: {{location.longitude[0]}}°{{location.longitude[1]}}′</text>
						<text>\nN: {{location.latitude[0]}}°{{location.latitude[1]}}′</text>
					</view>
				</block>
			</view>
			<view class="uni-btn-v">
				<button type="primary" @tap="getLocation">获取位置</button>
				<button @tap="clear">清空</button>
			</view>
		</view>
	</view>
</template>
<script>
	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;

	export default {
		data() {
			return {
				title: 'getLocation',
				hasLocation: false,
				location: {}
			}
		},
		methods: {
			getLocation: function () {
				uni.getLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude)
					}
				})
			},
			clear: function () {
				this.hasLocation = false
			}
		}
	}
</script>

<style>
	
</style>