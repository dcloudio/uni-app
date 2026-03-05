<template>
	<view>
		<page-head title="asset 音频播放示例" accordion></page-head>
		
		<button @click="testStart">播放asset音频</button>
		<button @click="testStop">停止播放asset音频</button>
			
	</view>
</template>

<script>
	import {
		playAssetAudio,
		stopAssetAudio
	} from "../../../uni_modules/uts-advance";
	
	export default {
		data() {
			return {
			}
		},
	
		methods: {

			/**
			 * 测试添加View实例至顶层容器
			 */
			testStart: function() {
				playAssetAudio();
			},
			/**
			 * 测试移除顶层容器的View实例
			 */
			testStop: function() {
				stopAssetAudio();
			}
	
	
		}
	}
</script>

<style>
</style>