<template>
	<view class="uni-modal_dialog__mask" :class="{ 'uni-modal_dialog__mask__show': showAnim }" >
		
		<view class="uni-modal_dialog__container" 
			id="modal_content"
			:style="{bottom:inputBottom}"
			:class="{'uni-modal_dialog__show': showAnim,  'uni-modal_dark__mode': theme == 'dark'}">
			<!--ios need -->
			<view class="uni-modal_dialog__container__wrapper" :class="{'uni-modal_dark__mode': theme == 'dark'}">
				
				<text class="uni-modal_dialog__title__text" :class="{'uni-modal_dark__mode': theme == 'dark'}" v-if="title">
					{{ title }}
				</text>
				
				<view class="uni-modal_dialog__content">
					
					<textarea v-if="editable" v-model="content" 
						class="uni-modal_dialog__content__textarea"
						placeholder-class="modalContent_content_edit_placeholder"
						:class="{ 'uni-modal_dark__mode': theme == 'dark'}" 
						:adjust-position="false" 
						@blur="onInputBlur" @keyboardheightchange="onInputKeyboardChange"
						id="textarea_content_input"
						ref="ref_textarea_content_input"
						:auto-height="isAutoHeight"
						:placeholder="placeholderText" />
						
					<text v-if="!editable && content.length > 0" class="uni-modal_dialog__content__text">
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

	export default {
		data() {
			return {
				theme: 'light',
				language: 'zh-Hans',
				i18nCancelText: {
				  en: 'Cancel',
				  es: 'Cancelar',
				  fr: 'Annuler',
				  'zh-Hans': '取消',
				  'zh-Hant': '取消',
				},
				i18nConfirmText: {
				  en: 'OK',
				  es: 'Confirmar',
				  fr: 'Confirmer',
				  'zh-Hans': '确定',
				  'zh-Hant': '確定',
				},
				readyEventName: '',
				optionsEventName: '',
				successEventName: '',
				failEventName: '',
				title: '',
				content: '',
				showCancel: true,
				editable: false,
				placeholderText: null as string | null,
				inputConfirmText: null as string | null,
				inputCancelText: null as string | null,
				cancelColor: '#000000',
				confirmColor: '#4A5E86',
				inputBottom: '0px',
				inputCancelColor: null as string | null,
				inputConfirmColor: null as string | null,
				hoverClassName:"uni-modal_dialog__content__bottom__button__hover",
				showAnim: false,
				isAutoHeight:true
			}
		},
		
		onReady() {
			
			setTimeout(() => {
				this.showAnim = true
			}, 10)
			
		},
		
		computed: {
			cancelText(): string {
			  if (this.inputCancelText != null) {
				const res = this.inputCancelText!
			    return res
			  }
			  if (this.language.startsWith('en')) {
			    return this.i18nCancelText['en'] as string
			  }
			  if (this.language.startsWith('es')) {
			    return this.i18nCancelText['es'] as string
			  }
			  if (this.language.startsWith('fr')) {
			    return this.i18nCancelText['fr'] as string
			  }
			  if (this.language.startsWith('zh-Hans')) {
			    return this.i18nCancelText['zh-Hans'] as string
			  }
			  if (this.language.startsWith('zh-Hant')) {
			    return this.i18nCancelText['zh-Hant'] as string
			  }
			  return '取消'
			},
			confirmText(): string {
			  if (this.inputConfirmText != null) {
				const res = this.inputConfirmText!
			    return res
			  }
			  if (this.language.startsWith('en')) {
			    return this.i18nConfirmText['en'] as string
			  }
			  if (this.language.startsWith('es')) {
			    return this.i18nConfirmText['es'] as string
			  }
			  if (this.language.startsWith('fr')) {
			    return this.i18nConfirmText['fr'] as string
			  }
			  if (this.language.startsWith('zh-Hans')) {
			    return this.i18nConfirmText['zh-Hans'] as string
			  }
			  if (this.language.startsWith('zh-Hant')) {
			    return this.i18nConfirmText['zh-Hant'] as string
			  }
			  return '确定'
			},
		},
		onLoad(options) {
			
			/**
			 * show modal 不需要对内置文案进行i18n适配。（参考微信）
			 */
			const systemInfo = uni.getSystemInfoSync()
			const osLanguage = systemInfo.osLanguage
			/**
			 * add since 2025-04-03 目前暂不支持设置app language
			 */
			const appLanguage = systemInfo.appLanguage
			if (appLanguage != null) {
			  this.language = appLanguage
			} else if (osLanguage != null) {
			  this.language = osLanguage
			}
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
			// 监听浏览器的语言设置
			const locale = uni.getLocale()
			this.language = locale
			uni.onLocaleChange((res) => {
			  if (res.locale) {
			    this.language = res.locale
			  }
			})
			// #endif
			// #ifdef APP-ANDROID || APP-IOS
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
					this.inputConfirmText = data['confirmText'] as string
				}
				if (data['cancelText'] != null) {
					this.inputCancelText = data['cancelText'] as string
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
		
		onBackPress(_):boolean|null {
			
			let ret = {
				cancel : false,
				confirm : false,
			}
			uni.$emit(this.successEventName, JSON.stringify(ret))
			return false
		},
		
		methods: {
			onInputBlur(e:UniTextareaBlurEvent) {
				// 退出编辑状态
				setTimeout(() => {
					this.inputBottom = '0px';
				}, 220)
				
			},
			onInputKeyboardChange(e:UniInputKeyboardHeightChangeEvent) {
				// 进入编辑状态，设置content 向上偏移键盘高度的 1/2
				let keyBoardHeight = e.detail.height
				if(keyBoardHeight > 0){
					let calcBottom = (keyBoardHeight) / 2
					this.inputBottom = `${calcBottom}px`;
				}
			},
			
			isValidColor(inputColor:string|null){
				const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
				if(inputColor == null){
					return false
				}
				/**
				 * #888
				 * #808080
				 */
				return hexColorRegex.test(inputColor)
			},
			/**
			 * update ui when theme change.
			 */
			updateUI(){
				
				if (this.isValidColor(this.inputConfirmColor)) {
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
				if (this.isValidColor(this.inputCancelColor)) {
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
					uni.closeDialogPage({
						dialogPage: this.$page
					})
				}, 300)
			},
			handleCancel() {
				this.closeModal()
				let ret = {
					cancel : true,
					confirm : false,
				}
				uni.$emit(this.successEventName, JSON.stringify(ret))
			},
			handleSure() {
				this.closeModal()
				let ret = {
					cancel : false,
					confirm : true,
					content : this.editable ? this.content : null
				}
				uni.$emit(this.successEventName, JSON.stringify(ret))
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
		background-color: white;
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
	
	.uni-modal_dialog__container.uni-modal_dialog__show {
		opacity: 1;
		transform: scale(1);
	}

	.uni-modal_dialog__container.uni-modal_dark__mode {
		background-color: #272727;
	}
	
	.uni-modal_dialog__container__wrapper {
		width: 100%;
		height: 100%; 
		padding-top: 10px;
		background-color: white;
		border-radius: 8px;
	}
	
	.uni-modal_dialog__container__wrapper.uni-modal_dark__mode {
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
		/* #ifdef WEB */
		display: -webkit-box;
		-webkit-line-clamp: 2; /* 限制显示两行 */
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* #endif */
	}

	.uni-modal_dialog__title__text.uni-modal_dark__mode {
		color: #CFCFCF;
	}

	.uni-modal_dialog__content {
		justify-content: center;
		align-items: center;
		padding: 18px;
	}

	.uni-modal_dialog__content__text {
		font-size: 16px;
		font-weight: normal;
		margin-top: 2px;
		margin-left: 2px;
		margin-right: 2px;
		margin-bottom: 12px;
		text-align: center;
		color: #747474;
		lines: 6;
		width: 100%;
		text-overflow: ellipsis;
		/* #ifdef WEB */
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-word;
		/* #endif */
	}

	.uni-modal_dialog__content__textarea {
		background-color: #F6F6F6;
		color: #000000;
		width: 96%;
		padding: 5px;
		margin-top: 2px;
		margin-bottom: 7px;
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
		white-space: nowrap;
	}

	.uni-modal_dialog__content__bottom__button__text__sure {
		letter-spacing: 1px;
		font-size: 16px;
		font-weight: bold;
		lines : 1;
		white-space: nowrap;
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