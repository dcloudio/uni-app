<template>
	<view class="uni-loading_dialog__mask" :class="{ 'uni-loading_dialog__mask__show': showAnim }" >
	
		<view class="uni-loading_dialog__container"
			:class="{'uni-loading_dialog__show': showAnim}">
			<loading class="uni-loading_dialog__container__loading"  />
			<text class="uni-loading_dialog__container__title" v-if="title" >{{title}}</text>
		</view>
	</view>
</template>
<script lang='ts'>

	export default {
		data() {
			return {
				readyEventName: '',
				optionsEventName: '',
				successEventName: '',
				failEventName: '',
				title: '',
				showAnim: false,
			}
		},

		onReady() {
			setTimeout(() => {
				this.showAnim = true
			}, 10)

		},
		onLoad(options) {

			this.readyEventName = options['readyEventName'] !
			this.optionsEventName = options['optionsEventName'] !
			this.successEventName = options['successEventName'] !
			this.failEventName = options['failEventName'] !

			uni.$on(this.optionsEventName, (data: UTSJSONObject) => {
				if (data['title'] != null) {
					this.title = data['title'] as string
				}
			})

			uni.$emit(this.readyEventName, {})
			uni.$emit(this.successEventName,"")
		},

		onUnload() {
			uni.$off(this.optionsEventName, null)
			uni.$off(this.readyEventName, null)
			uni.$off(this.successEventName, null)
			uni.$off(this.failEventName, null)
		},

		onBackPress(_):boolean|null {
			// 不可被回退关闭
			return true
		},

		methods: {
			
		}
	}
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
		width: 136px;
		max-width: 288px;
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
	}

	
</style>
