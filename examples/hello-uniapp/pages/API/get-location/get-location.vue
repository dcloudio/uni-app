<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">
					<text class="page-body-text-small">当前位置经纬度</text>
					<block v-if="hasLocation === false">
						<text class="page-body-text">未获取</text>
					</block>
					<block v-if="hasLocation === true">
						<view class="page-body-text-location">
							<text>E: {{location.longitude[0]}}°{{location.longitude[1]}}′</text>
							<text>N: {{location.latitude[0]}}°{{location.latitude[1]}}′</text>
						</view>
					</block>
				</view>
				<view class="btn-area">
					<button type="primary" @tap="getLocation">获取位置</button>
					<button @tap="clear">清空</button>
				</view>
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
	.page-body-info {
		height: 250upx;
	}

	.page-body-text-small {
		font-size: 24upx;
		color: #000;
		margin-bottom: 100upx;
	}

	.page-body-text-location {
		display: flex;
		font-size: 50upx;
	}

	.page-body-text-location text {
		margin: 10upx;
	}
</style>
