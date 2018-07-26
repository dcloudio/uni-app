<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			<view class="page-section">
				<view class="page-section-title">请输入剪贴板内容</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<input class="uni-input" type="text" placeholder="请输入剪贴板内容" :value="data" @input="dataChange"></input>
					</view>
				</view>
				<view class="btn-area">
					<button type="primary" @click="setClipboard">存储数据</button>
					<button @tap="getClipboard">读取数据</button>
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
				title: 'get/setClipboardData',
				data: ''
			}
		},
		methods: {
			dataChange: function (e) {
				this.data = e.target.value
			},
			getClipboard: function () {
				uni.getClipboardData({
					success: (res) => {
						console.log(res.data);
						uni.showModal({
							title: '读取剪贴板',
							content: '剪贴板内容为: ' + res.data,
							showCancel: false
						})
					},
					fail: () => {
						uni.showModal({
							content: '读取剪贴板失败!',
							showCancel: false
						})
					}
				});
			},
			setClipboard: function () {
				var data = this.data;
				if (data.length === 0) {
					uni.showModal({
						title: '设置剪贴板失败',
						content: '内容不能为空',
						showCancel: false
					})
				} else {
					uni.setClipboardData({
						data: data,
						success: () => {
							uni.showModal({
								content: '设置剪贴板成功',
								showCancel: false
							})
						},
						fail: () => {
							uni.showModal({
								content: '储存数据失败!',
								showCancel: false
							})
						}
					});
				}
			}
		},
		components: {
			pageHead
		}
	}
</script>

<style>
	@import "../../../common/uni.css";

	.uni-list-cell {
		padding: 0px 30px;
	}
</style>
