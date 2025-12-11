<template>
	<view class="uni-loading_dialog__mask" :class="{ 'uni-loading_dialog__mask__show': showAnim }" >
	
		<view class="uni-loading_dialog__container"
			:class="{'uni-loading_dialog__show': showAnim}">
			<loading class="uni-loading_dialog__container__loading"  />
			<text class="uni-loading_dialog__container__title" v-if="title" >{{title}}</text>
		</view>
	</view>
</template>
<script setup lang='ts'>
	import { ref, type Ref } from 'vue'
	import { onLoad, onReady, onUnload, onBackPress } from '@dcloudio/uni-app'

	const readyEventName: Ref<string> = ref('')
	const optionsEventName: Ref<string> = ref('')
	const successEventName: Ref<string> = ref('')
	const failEventName: Ref<string> = ref('')
	const title: Ref<string> = ref('')
	const showAnim: Ref<boolean> = ref(false)

	onReady(() => {
		setTimeout(() => {
			showAnim.value = true
		}, 10)
	})

	onLoad((options) => {
		readyEventName.value = options['readyEventName'] !
		optionsEventName.value = options['optionsEventName'] !
		successEventName.value = options['successEventName'] !
		failEventName.value = options['failEventName'] !

		uni.$on(optionsEventName.value, (data: UTSJSONObject) => {
			if (data['title'] != null) {
				title.value = data['title'] as string
			}
		})

		uni.$emit(readyEventName.value, {})
		uni.$emit(successEventName.value, "")
	})

	onUnload(() => {
		uni.$off(optionsEventName.value, null)
		uni.$off(readyEventName.value, null)
		uni.$off(successEventName.value, null)
		uni.$off(failEventName.value, null)
	})

	onBackPress((_) => {
		// 不可被回退关闭
		return true
	})
</script>
<style>

	/**
	 * 透明背景
	 */
	.uni-loading_dialog__mask {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		background-color: rgba(0, 0, 0, 0.0);
		transition-duration: 0.1s;
		transition-property: opacity;
		opacity: 0;
	}

	.uni-loading_dialog__mask__show {
		opacity: 1;
	}

	/**
	 * 居中的内容展示区域
	 */
	.uni-loading_dialog__container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 136px;
		max-width: 600rpx;
		height: 136px;
		padding: 10px;
		background-color: rgba(76, 76, 76, 1);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		/**
		 * anim
		 */
		opacity: 0;
		transform: scale(0.9);
		transition-duration: 0.1s;
		transition-property: opacity,transform;
		
	}

	.uni-loading_dialog__container.uni-loading_dialog__show {
		opacity: 1;
		transform: scale(1);
	}
	
	.uni-loading_dialog__container__loading{
		width: 36px; 
		height: 36px;
		border-color: white;
	}
	
	.uni-loading_dialog__container__title{
		margin-top: 14px;
		color: white;
		font-size: 16px;
		lines:1;
		text-align: center;
		text-overflow: ellipsis;
		/* #ifdef WEB */
		display: -webkit-box;
		-webkit-line-clamp: 1; /* 限制显示两行 */
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* #endif */
	}

	
</style>
