<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-body-desc">
					手机顶部听筒处有传感器监听距离手机屏幕的障碍物，覆盖该传感器会触发本事件变化
				</view>
				<view class="page-section-spacing">
					<button type="primary" @tap="getProximity">获取距离传感器信息</button>
					<button type="primary" @tap="watchProximity">监听距离传感器变化</button>
					<button type="primary" @tap="watchStop">停止监听</button>
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
	var id = null
	var bright = null
	export default {
		data() {
			return {
				title: 'orientation',
				value: ''
			}
		},
		methods: {
			getProximity: function () {
				var that = this;
				plus.proximity.getCurrentProximity(function (d) {
					that.value = "距离为：" + d;
				}, function (e) {
					that.value = "获取失败:" + e.message;
				});
			},
			watchProximity: function () {
				var that = this;
				if (id) {
					return;
				}
				bright = plus.screen.getBrightness();
				id = plus.proximity.watchProximity(function (d) {
					that.value = "距离变化：" + d;
					plus.screen.setBrightness((d < 1) ? 0.01 : bright);
				}, function (e) {
					plus.proximity.clearWatch(id);
					id = null;
					that.value = "监听失败:" + e.message;
				});
			},
			watchStop: function () {
				var that = this;
				if (id) {
					that.value = "停止监听设备距离传感器信息";
					plus.proximity.clearWatch(id);
					id = null;
				} else {
					that.value = "没有监听设备距离传感器";
				}
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	textarea {
		border: 2px solid #7A7E83;
		height: 288px;
	}
	.page-body-desc{
		font-size: 32px;
		color: #BEBEBE;
		padding: 30px;
	}
</style>
