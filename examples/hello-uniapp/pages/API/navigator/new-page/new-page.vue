<template>
	<view class="root">
		<page-head :title="title"></page-head>
		<view class="page-body">
			{{data}}
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: '新页面',
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
		justify-content: center;
		align-items: center;
	}
</style>