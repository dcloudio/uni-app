<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-info">
					<text class="page-body-text-small">当前位置信息</text>
					<block v-if="hasLocation === false">
						<text class="page-body-text">未选择位置</text>
					</block>
					<block v-if="hasLocation === true">
						<text class="page-body-text">{{locationAddress}}</text>
						<view class="page-body-text-location">
							<text>E: {{location.longitude[0]}}°{{location.longitude[1]}}′</text>
							<text>N: {{location.latitude[0]}}°{{location.latitude[1]}}′</text>
						</view>
					</block>
				</view>
				<view class="btn-area">
					<button type="primary" @tap="chooseLocation">选择位置</button>
					<button @tap="clear">清空</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue';

	var util = require('../../../common/util.js');
	var formatLocation = util.formatLocation;

	export default {
		data() {
			return {
				title: 'chooseLocation',
				hasLocation: false,
				location: {},
				locationAddress: ''
			}
		},
		methods: {
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			clear: function () {
				this.hasLocation = false
			}
		},
		components: {
			pageHead

		}
	}
</script>

<style>
	.page-body-info {
		padding-bottom: 0;
		height: 440px;
	}
</style>
