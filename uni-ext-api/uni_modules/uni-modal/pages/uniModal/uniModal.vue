<template>
	<view class="uni-modal_dialog__mask" :class="{ 'uni-modal_dialog__mask__show': showAnim }">
		
		<view class="uni-modal_dialog__container" :class="{'uni-modal_dialog__show': showAnim,  'uni-modal_dark__mode': theme == 'dark'}">
			<!--ios need -->
			<view style="width: 100%;height: 100%; border-radius: 8px;">
				
				<text class="uni-modal_dialog__title__text" :class="{'uni-modal_dark__mode': theme == 'dark'}" v-if="title">
					{{ title }}
				</text>
					
				<view class="uni-modal_dialog__content">
					
					<textarea v-if="editable" v-model="content" 
						class="uni-modal_dialog__content__textarea"
						placeholder-class="modalContent_content_edit_placeholder"
						:class="{ 'uni-modal_dark__mode': theme == 'dark'}" 
						id="textarea_content_input"
						ref="ref_textarea_content_input"
						:auto-height="isAutoHeight"
						:placeholder="placeholderText" />
						
					<text v-else class="uni-modal_dialog__content__text">
						{{ content }}
					</text>
				</view>

				<view class="uni-modal_dialog__content__topline" :class="{ 'uni-modal_dark__mode': theme == 'dark'}"></view>
				<view class="uni-modal_dialog__content__bottom">
					<view v-if="showCancel" 
						class="uni-modal_dialog__content__bottom__button" 
						:class="{ 'uni-modal_dark__mode': theme == 'dark'}"
						:hover-class="hoverClassName" 
						 @click="handleCancel">
						<text :style="{ color: cancelColor }"
							class="uni-modal_dialog__content__bottom__button__text">{{cancelText}}</text>
					</view>
					<view v-if="showCancel" class="uni-modal_dialog__content__bottom__splitline"
						:class="{ 'uni-modal_dark__mode': theme == 'dark'}"></view>
					<view 
						class="uni-modal_dialog__content__bottom__button" 
						:class="{ 'uni-modal_dark__mode': theme == 'dark'}" 
						:hover-class="hoverClassName" 
						@click="handleSure">
						<text :style="{ color: confirmColor }"
							class="uni-modal_dialog__content__bottom__button__text__sure">
							{{confirmText}}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang='ts'>
	// #ifdef APP-ANDROID
	import EditText from 'android.widget.EditText'
	// #endif
	export default {
		data() {
			return {
				inputLineHeight : 32,
				theme: 'light',
				show: false,
				readyEventName: '',
				optionsEventName: '',
				successEventName: '',
				failEventName: '',
				title: '',
				content: '',
				showCancel: true,
				editable: false,
				placeholderText: null as string | null,
				confirmText: '确定',
				cancelText: '取消',
				cancelColor: '#000000',
				confirmColor: '#4A5E86',
				inputCancelColor: null as string | null,
				inputConfirmColor: null as string | null,
				hoverClassName:"uni-modal_dialog__content__bottom__button__hover",
				showAnim: false,
				isAutoHeight:true
			}
		},
		onReady() {
			
			// #ifdef APP-ANDROID
			/**
			 * 隐藏滚动条
			 */
			let editElement = this.$page.getElementById("textarea_content_input")
			if(editElement != null){
				let androidEditText = editElement.getAndroidView()! as EditText
				androidEditText.isVerticalScrollBarEnabled = false
			}
			// #endif
			
			setTimeout(() => {
				this.showAnim = true
			}, 10)
			
		},
		onLoad(options) {
			
			/**
			 * show modal 不需要对内置文案进行i18n适配。（参考微信）
			 */
			const systemInfo = uni.getSystemInfoSync()
			
			// #ifdef WEB
			const hostTheme = systemInfo.hostTheme
			if (hostTheme != null) {
				this.theme = hostTheme
				this.updateUI()
			}
			uni.onThemeChange((res) => {
				this.theme = res.theme
				this.updateUI()
			});
			// #endif
			// #ifdef APP
			const appTheme = systemInfo.appTheme
			if (appTheme != null) {
				this.theme = appTheme
			} 
			uni.onAppThemeChange((res: AppThemeChangeResult) => {
				this.theme = res.appTheme
				this.updateUI()
			})
			
			// #endif
			this.readyEventName = options['readyEventName'] !
			this.optionsEventName = options['optionsEventName'] !
			this.successEventName = options['successEventName'] !
			this.failEventName = options['failEventName'] !

			uni.$on(this.optionsEventName, (data: UTSJSONObject) => {

				if (data['title'] != null) {
					this.title = data['title'] as string
				}
				if (data['content'] != null) {
					this.content = data['content'] as string
				}
				if (data['showCancel'] != null) {
					this.showCancel = data['showCancel'] as boolean
				}
				if (data['editable'] != null) {
					this.editable = data['editable'] as boolean
				}
				if (data['placeholderText'] != null) {
					this.placeholderText = data['placeholderText'] as string
				}

				if (data['confirmText'] != null) {
					this.confirmText = data['confirmText'] as string
				}
				if (data['cancelText'] != null) {
					this.cancelText = data['cancelText'] as string
				}
				
				if (data['confirmColor'] != null) {
					this.inputConfirmColor = data['confirmColor'] as string
				}
				if (data['cancelColor'] != null) {
					this.inputCancelColor = data['cancelColor'] as string
				}
				
				this.updateUI()
				
			})

			uni.$emit(this.readyEventName, {})
			

		},
		
		onUnload() {
			uni.$off(this.optionsEventName, null)
			uni.$off(this.readyEventName, null)
			uni.$off(this.successEventName, null)
			uni.$off(this.failEventName, null)
		},
		methods: {
			/**
			 * update ui when theme change.
			 */
			updateUI(){
				
				if (this.inputConfirmColor != null) {
					this.confirmColor = this.inputConfirmColor!
				} else {
					/**
					 * init text color with theme
					 */
					if (this.theme == "dark") {
						this.confirmColor = '#7388a2'
					} else {
						this.confirmColor = '#4A5E86'
					}
				}
				if (this.inputCancelColor != null) {
					this.cancelColor = this.inputCancelColor!
				} else {
					if (this.theme == "dark") {
						this.cancelColor = '#a5a5a5'
					} else {
						this.cancelColor = '#000000'
					}
				}
				
				if(this.theme == "dark"){
					this.hoverClassName = "uni-modal_dialog__content__bottom__button__hover__uni-modal_dark__mode"
				}else{
					this.hoverClassName = "uni-modal_dialog__content__bottom__button__hover"
				}
				
			},
			
			closeModal() {
				this.showAnim = false
				setTimeout(() => {
					// #ifdef APP-ANDROID
					uni.closeDialogPage({
							dialogPage: this.$page
						} as io.dcloud.uniapp.framework.extapi.CloseDialogPageOptions)
					// #endif
					// #ifndef APP-ANDROID
					uni.closeDialogPage({
						dialogPage: this.$page
					})
					// #endif
				}, 300)
			},
			handleCancel() {
				this.closeModal()
				uni.$emit(this.successEventName, null)
			},
			handleSure() {
				this.closeModal()
				uni.$emit(this.successEventName, this.content)
			}
		}
	}
</script>
<style>

	/**
	 * 透明背景
	 */
	.uni-modal_dialog__mask {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		background-color: rgba(0, 0, 0, 0.5);
		transition-duration: 0.1s;
		transition-property: opacity;
		opacity: 0;
	}
	
	.uni-modal_dialog__mask__show {
		opacity: 1;
	}
	
	/**
	 * 居中的内容展示区域
	 */
	.uni-modal_dialog__container {
		width: 300px;
		padding-top: 10px;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 8px;
		/**
		 * anim
		 */
		transition-duration: 0.1s;
		transition-property: opacity,transform;
		opacity: 0;
		transform: scale(0.9);
	}
	
	.uni-modal_dialog__container.uni-modal_dialog__show {
		opacity: 1;
		transform: scale(1);
	}

	.uni-modal_dialog__container.uni-modal_dark__mode {
		background-color: #272727;
	}

	.uni-modal_dialog__title__text {
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		margin-top: 20px;
		text-overflow: ellipsis;
		padding-left: 20px;
		padding-right: 20px;
		lines: 2;
	}

	.uni-modal_dialog__title__text.uni-modal_dark__mode {
		color: #CFCFCF;
	}

	.uni-modal_dialog__content {
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.uni-modal_dialog__content__text {
		font-size: 16px;
		font-weight: normal;
		margin-bottom: 10px;
		text-align: center;
		color: #747474;
		lines: 6;
		width: 100%;
		text-overflow: ellipsis;
	}

	.uni-modal_dialog__content__textarea {
		background-color: #F6F6F6;
		color: #000000;
		width: 96%;
		padding: 5px;
		max-height: 192px;
		/* #ifdef WEB */
		word-break: break-word;
		/* #endif */
	}

	.uni-modal_dialog__content__textarea.uni-modal_dark__mode {
		background-color: #3d3d3d;
		color: #CFCFCF;
	}

	.uni-modal_dialog__content__textarea__placeholder {
		color: #808080;
	}

	.uni-modal_dialog__content__textarea__placeholder.uni-modal_dark__mode {
		color: #CFCFCF;
	}
	
	.uni-modal_dialog__content__topline {
		width: 100%;
		height: 1px;
		background-color: #E0E0E0;
	}
	
	.uni-modal_dialog__content__topline.uni-modal_dark__mode {
		background-color: #303030;
	}
	
	.uni-modal_dialog__content__bottom {
		display: flex;
		width: 100%;
		height: 50px;
		flex-direction: row;
		overflow: hidden;
	}

	.uni-modal_dialog__content__bottom__button {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	}

	.uni-modal_dialog__content__bottom__button__hover {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #efefef;
	}

	.uni-modal_dialog__content__bottom__button__hover__uni-modal_dark__mode {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1C1C1C;
	}

	.uni-modal_dialog__content__bottom__button__text {
		letter-spacing: 1px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		lines : 1;
	}

	.uni-modal_dialog__content__bottom__button__text__sure {
		letter-spacing: 1px;
		font-size: 16px;
		font-weight: bold;
		lines : 1;
		text-align: center;
		color: #4A5E86;
	}

	.uni-modal_dialog__content__bottom__splitline {
		width: 1px;
		height: 100%;
		background-color: #E3E3E3;
	}

	.uni-modal_dialog__content__bottom__splitline.uni-modal_dark__mode {
		background-color: #303030;
	}
</style>