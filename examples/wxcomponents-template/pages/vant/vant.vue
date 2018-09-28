<template>
	<view>
		<view class="title">导航栏</view>
		<van-nav-bar title="标题" left-text="返回" left-arrow @clickLeft="onClickLeft" @clickRight="onClickRight">
			<van-icon name="search" slot="right" custom-class="icon" />
		</van-nav-bar>
	</view>
</template>

<script>
	export default {
		methods: {
			onClickLeft() {
				wx.showToast({
					title: '点击返回',
					icon: 'none'
				});
			},

			onClickRight() {
				wx.showToast({
					title: '点击按钮',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>

</style>
