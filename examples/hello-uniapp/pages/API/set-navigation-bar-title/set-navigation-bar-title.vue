<template>
	<view>
		<page-head :title="title"></page-head>
		<view>
			<form @submit="setNaivgationBarTitle">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							页面标题
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" type="text" placeholder="请输入页面标题并点击设置即可" name="title"></input>
						</view>
					</view>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-btn-v">
						<button type="primary" formType="submit">设置</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'setNaivgationBarTitle'
			}
		},
		methods: {
			setNaivgationBarTitle: function (e) {
				let title = e.detail.value.title
				uni.setNavigationBarTitle({
					title: title,
					success: () => {
						console.log('setNavigationBarTitle success')
					},
					fail: (err) => {
						console.log('setNavigationBarTitle fail, err is', err)
					}
				})
			}
		}
	}
</script>

