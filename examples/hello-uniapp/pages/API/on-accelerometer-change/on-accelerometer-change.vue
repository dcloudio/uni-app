<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<!-- #ifdef APP-PLUS -->
				<view class="page-section-spacing">
					<button class="shake" @tap="shake">摇一摇</button>
				</view>
				<!-- #endif -->
				<view class="page-section-spacing">
					<button type="primary" @tap="watchAcce">监听设备的加速度变化</button>
					<button type="primary" @tap="stopAcce">停止监听设备的加速度变化</button>
				</view>
			</view>
			<view class="page-section">
				<view class="page-section-spacing">
					<textarea :value="value" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../../components/page-head.vue'

	export default {
		data() {
			return {
				title: 'onAccelerometerChange',
				value: ''
			}
		},
		onUnload() {
			uni.stopAccelerometer();
		},
		methods: {
			//#ifdef APP-PLUS
			shake() {
				uni.navigateTo({
					url: '/platforms/app-plus/shake/shake'
				})
			},
			//#endif
			watchAcce() {
				uni.onAccelerometerChange((res) => {
					this.value = "监听设备的加速度变化:\n" + "X轴：" + res.x.toFixed(2) + "\nY轴：" + res.y.toFixed(2) +
						"\nZ轴：" + res.z.toFixed(2);
				})
			},
			stopAcce() {
				uni.stopAccelerometer()
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	.shake {
		background-color: #FFCC33;
		color: #ffffff;
		margin-bottom: 50px;
	}

	textarea {
		border: 2px solid #7A7E83;
		box-sizing: border-box;
		width: 100%;
		height: 288px;
		padding: 20px;
	}
</style>
