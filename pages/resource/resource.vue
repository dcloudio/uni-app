<template>
	<view>
		<page-head :title="title"></page-head>
		<image :src="logo" mode="aspectFit" style="width: 100%;"></image>
			
	</view>
</template>
<script>
	
	import { getLogoPath } from '../../uni_modules/uts-advance'
	
	
	export default {
		
		data() {
			return {
				title: '资源加载示例',
				logo:""
			}
		},
		onLoad:function(){
			this.logo = getLogoPath()
		}
		
	}
</script>

<style>

  
</style>
