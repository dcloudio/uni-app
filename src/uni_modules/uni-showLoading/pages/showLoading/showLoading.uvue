<template>
	<view class="uni-loading-mask" :class="{ 'uni-loading-mask--show': showAnim }">
		<view class="uni-loading-dialog" :class="{ 'uni-loading-dialog--show': showAnim }">
			<loading class="uni-loading-dialog__spinner" :ios-spinner="iosSpinner" />
			<text v-if="title" class="uni-loading-dialog__title" max-lines="1">{{ title }}</text>
		</view>
	</view>
</template>
<script setup>
	import { ref, type Ref } from 'vue'
	import { onLoad, onReady, onUnload } from '@dcloudio/uni-app'

	const readyEventName: Ref<string> = ref('')
	const optionsEventName: Ref<string> = ref('')
	const successEventName: Ref<string> = ref('')
	const failEventName: Ref<string> = ref('')
	const title: Ref<string> = ref('')
	const showAnim: Ref<boolean> = ref(false)
	const iosSpinner: Ref<boolean> = ref(true)

	onReady(() => {
		setTimeout(() => {
			showAnim.value = true
		}, 10)
	})

	onLoad((options) => {
		readyEventName.value = options['readyEventName']!
		optionsEventName.value = options['optionsEventName']!
		successEventName.value = options['successEventName']!
		failEventName.value = options['failEventName']!

		uni.$on(optionsEventName.value, (data: UTSJSONObject) => {
			if (data['title'] != null) {
				title.value = data['title'] as string
			}
			if (data['iosSpinner'] != null) {
				iosSpinner.value = data['iosSpinner'] as boolean
			}
		})

		uni.$emit(readyEventName.value, {})
		uni.$emit(successEventName.value, '')
	})

	onUnload(() => {
		uni.$off(optionsEventName.value, null)
		uni.$off(readyEventName.value, null)
		uni.$off(successEventName.value, null)
		uni.$off(failEventName.value, null)
	})
</script>
<style>
	/**
	 * 透明背景
	 */
	.uni-loading-mask {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0);
		transition-duration: 0.1s;
		transition-property: opacity;
		opacity: 0;
	}

	.uni-loading-mask--show {
		opacity: 1;
	}

	/**
	 * 居中的内容展示区域
	 */
	.uni-loading-dialog {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 136px;
		/* #ifdef APP */
		max-width: 600rpx;
		/* #endif */
		/* #ifdef WEB */
		max-width: 80%;
		/* #endif */
		height: 136px;
		padding: 10px;
		background-color: rgba(76, 76, 76, 0.95);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		opacity: 0;
		transform: scale(0.9);
		transition-duration: 0.1s;
		transition-property: opacity, transform;
	}

	.uni-loading-dialog.uni-loading-dialog--show {
		opacity: 1;
		transform: scale(1);
	}

	.uni-loading-dialog__spinner {
		width: 36px;
		height: 36px;
		border-color: white;
	}

	.uni-loading-dialog__title {
		margin-top: 14px;
		color: white;
		font-size: 16px;
		lines: 1;
		text-align: center;
		text-overflow: ellipsis;
		/* #ifdef WEB */
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* #endif */
	}
</style>
