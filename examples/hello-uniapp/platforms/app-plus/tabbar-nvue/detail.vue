<template>
	<view class="root">
		<view class="page-body">
			<view class="page-section-title">这是 nvue 页面跳转 vue 页面的演示，下面是页面跳转时传递过来的标题：</view>
			<view class="page-section-title">{{data}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data:""
			}
		},
		onLoad(e){
			if(e.data){
				this.data = e.data;
			}
		}
	}
</script>
<style>
	page{
		display: flex;
		min-height: 100%;
	}
	.root{
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.page-body{
		flex: 1;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		padding-top: 30px;
	}
</style>