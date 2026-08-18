<template>
	<view class="uni-modal-mask" :class="{ 'uni-modal-mask--show': showAnim, 'uni-modal-mask--hide': !showAnim }">
		<view class="uni-modal-dialog" :style="{ bottom: inputBottom }"
			:class="{ 'uni-modal-dialog--show': showAnim }">
			<!-- ios need -->
			<view class="uni-modal-dialog__inner">
				<view class="uni-modal-dialog__title__container">
					<text v-if="hasTitle" max-lines="2" class="uni-modal-dialog__title">
						{{ title }}
					</text>
				</view>

				<view class="uni-modal-dialog__body" :class="{'no-title' : !hasTitle}">
					<textarea v-if="editable" v-model="content" class="uni-modal-dialog__textarea"
						placeholder-class="uni-modal-dialog__textarea-placeholder"
						:focus="true" :adjust-position="false" @blur="onInputBlur"
						@keyboardheightchange="onInputKeyboardChange" :auto-height="isAutoHeight"
						:placeholder="placeholderText" />

					<scroll-view v-else-if="content.length > 0" class="uni-modal-dialog__scroll" show-scrollbar="true"
						:style="{ maxHeight: maxScrollHeight }">
						<text class="uni-modal-dialog__message">
							{{ content }}
						</text>
					</scroll-view>
				</view>

				<view class="uni-modal-dialog__divider"></view>
				<view class="uni-modal-dialog__actions">
					<view v-if="showCancel" class="uni-modal-dialog__action uni-modal-dialog__action--cancel"
						hover-class="uni-modal-dialog__action--hover" @click="handleCancel">
						<text :style="cancelColorStyle" max-lines="1" class="uni-modal-dialog__action-text">
							{{ cancelText }}
						</text>
					</view>
					<view v-if="showCancel" class="uni-modal-dialog__split"></view>
					<view class="uni-modal-dialog__action uni-modal-dialog__action--confirm"
						hover-class="uni-modal-dialog__action--hover" @click="handleSure">
						<text :style="confirmColorStyle" max-lines="1"
							class="uni-modal-dialog__action-text uni-modal-dialog__action-text--confirm">
							{{ confirmText }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		computed,
		getCurrentInstance
	} from 'vue'

	const language = ref('zh-Hans')
	const i18nCancelText = {
		en: 'Cancel',
		es: 'Cancelar',
		fr: 'Annuler',
		'zh-Hans': '取消',
		'zh-Hant': '取消',
	}
	const i18nConfirmText = {
		en: 'OK',
		es: 'Confirmar',
		fr: 'Confirmer',
		'zh-Hans': '确定',
		'zh-Hant': '確定',
	}
	const readyEventName = ref('')
	const optionsEventName = ref('')
	const successEventName = ref('')
	const failEventName = ref('')
	const title = ref('')
	const content = ref('')
	const showCancel = ref(true)
	const editable = ref(false)
	const placeholderText = ref<string | null>(null)
	const inputConfirmText = ref<string | null>(null)
	const inputCancelText = ref<string | null>(null)
	const inputBottom = ref('0px')
	const maxScrollHeight = ref('192px')
	const inputCancelColor = ref<string | null>(null)
	const inputConfirmColor = ref<string | null>(null)
	const showAnim = ref(false)
	const isAutoHeight = ref(true)

	const hasTitle = computed((): boolean => {
		return title.value != ''
	})

	const instance = getCurrentInstance()

	const cancelText = computed((): string => {
		if (inputCancelText.value != null) {
			return inputCancelText.value!
		}
		if (language.value.startsWith('en')) {
			return i18nCancelText['en'] as string
		}
		if (language.value.startsWith('es')) {
			return i18nCancelText['es'] as string
		}
		if (language.value.startsWith('fr')) {
			return i18nCancelText['fr'] as string
		}
		if (language.value.startsWith('zh-Hans')) {
			return i18nCancelText['zh-Hans'] as string
		}
		if (language.value.startsWith('zh-Hant')) {
			return i18nCancelText['zh-Hant'] as string
		}
		return '取消'
	})

	const confirmText = computed((): string => {
		if (inputConfirmText.value != null) {
			return inputConfirmText.value!
		}
		if (language.value.startsWith('en')) {
			return i18nConfirmText['en'] as string
		}
		if (language.value.startsWith('es')) {
			return i18nConfirmText['es'] as string
		}
		if (language.value.startsWith('fr')) {
			return i18nConfirmText['fr'] as string
		}
		if (language.value.startsWith('zh-Hans')) {
			return i18nConfirmText['zh-Hans'] as string
		}
		if (language.value.startsWith('zh-Hant')) {
			return i18nConfirmText['zh-Hant'] as string
		}
		return '确定'
	})

	const onInputBlur = (e: UniTextareaBlurEvent) => {
		// 退出编辑状态
		setTimeout(() => {
			inputBottom.value = '0px'
		}, 220)
	}

	const onInputKeyboardChange = (e: UniInputKeyboardHeightChangeEvent) => {
		const keyBoardHeight = e.detail.height
		// 进入编辑状态，设置content 向上偏移键盘高度的 1/2
		if (keyBoardHeight > 0) {
			inputBottom.value = `${keyBoardHeight / 2}px`
		}
	}

	const isValidColor = (inputColor: string | null) => {
		const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
		if (inputColor == null) {
			return false
		}
		/**
		 * #888
		 * #808080
		 */
		return hexColorRegex.test(inputColor)
	}

	const cancelColorStyle = computed((): UTSJSONObject => {
		return isValidColor(inputCancelColor.value) ? { color: inputCancelColor.value! } : {}
	})
	const confirmColorStyle = computed((): UTSJSONObject => {
		return isValidColor(inputConfirmColor.value) ? { color: inputConfirmColor.value! } : {}
	})

	const closeModal = () => {
		showAnim.value = false
		setTimeout(() => {
			uni.closeDialogPage({
				dialogPage: instance?.proxy?.$page
			})
		}, 300)
	}

	const handleCancel = () => {
		closeModal()
		const ret = {
			cancel: true,
			confirm: false,
		}
		uni.$emit(successEventName.value, JSON.stringify(ret))
	}

	const handleSure = () => {
		closeModal()
		const ret = {
			cancel: false,
			confirm: true,
			content: editable.value ? content.value : null
		}
		uni.$emit(successEventName.value, JSON.stringify(ret))
	}

	// onReady 生命周期
	onReady(() => {
		setTimeout(() => {
			showAnim.value = true
		}, 10)
	})

	// onLoad 生命周期
	onLoad((options) => {
		/**
		 * show modal 不需要对内置文案进行i18n适配。（参考微信）
		 */
		const deviceInfo = uni.getDeviceInfo()
		// ios need
		const windowInfo = uni.getWindowInfo()
		maxScrollHeight.value = `${Math.floor(windowInfo.screenHeight * 0.55)}px`
		/**
		 * add since 2025-04-03 目前暂不支持设置app language
		 */
		const appBaseInfo = uni.getAppBaseInfo()
		if (appBaseInfo.appLanguage != null) {
			language.value = appBaseInfo.appLanguage
		} else if (deviceInfo.osLanguage != null) {
			language.value = deviceInfo.osLanguage
		}
		// #ifdef WEB
		// 监听浏览器的语言设置
		const locale = uni.getLocale()
		language.value = locale
		uni.onLocaleChange((res) => {
			if (res.locale) {
				language.value = res.locale
			}
		})
		// #endif

		readyEventName.value = options['readyEventName']!
		optionsEventName.value = options['optionsEventName']!
		successEventName.value = options['successEventName']!
		failEventName.value = options['failEventName']!

		uni.$on(optionsEventName.value, (data: UTSJSONObject) => {
			if (data['title'] != null) {
				title.value = data['title'] as string
			}
			if (data['content'] != null) {
				content.value = data['content'] as string
			}
			if (data['showCancel'] != null) {
				showCancel.value = data['showCancel'] as boolean
			}
			if (data['editable'] != null) {
				editable.value = data['editable'] as boolean
			}
			if (data['placeholderText'] != null) {
				placeholderText.value = data['placeholderText'] as string
			}

			if (data['confirmText'] != null) {
				inputConfirmText.value = data['confirmText'] as string
			}
			if (data['cancelText'] != null) {
				inputCancelText.value = data['cancelText'] as string
			}

			if (data['confirmColor'] != null) {
				inputConfirmColor.value = data['confirmColor'] as string
			}
			if (data['cancelColor'] != null) {
				inputCancelColor.value = data['cancelColor'] as string
			}
		})

		uni.$emit(readyEventName.value, {})
	})

	// onUnload 生命周期
	onUnload(() => {
		uni.$off(optionsEventName.value, null)
		uni.$off(readyEventName.value, null)
		uni.$off(successEventName.value, null)
		uni.$off(failEventName.value, null)
	})

	// onBackPress 生命周期
	onBackPress((_): boolean | null => {
		const ret = {
			cancel: false,
			confirm: false,
		}
		uni.$emit(successEventName.value, JSON.stringify(ret))
		return false
	})
</script>
<style>
	/**
	 * 透明背景
	 */
	.uni-modal-mask {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.55);
		transition-property: opacity;
	}

	.uni-modal-mask--hide {
		transition-duration: 0s;
		opacity: 0;
	}

	.uni-modal-mask--show {
		transition-duration: 0.1s;
		opacity: 1;
	}

	/**
	 * 居中的内容展示区域
	 */
	.uni-modal-dialog {
		width: 80%;
		max-width: 90%;
		max-height: 90%;
		background-color: #ffffff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 16px;
		opacity: 0;
		transform: scale(0.9);
		transition-duration: 0.1s;
		transition-property: opacity, transform;
	}

	/* #ifdef WEB */
	@media screen and (min-width: 768px) {
		.uni-modal-dialog {
			max-width: 556px;
		}
	}
	/* #endif */

	.uni-modal-dialog.uni-modal-dialog--show {
		opacity: 1;
		transform: scale(1);
	}

	.uni-modal-dialog__inner {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		border-radius: 8px;
	}

	.uni-modal-dialog__title__container {
		padding: 33px 24px 18px;
	}
	.uni-modal-dialog__title {
		font-size: 17px;
		font-weight: 600;
		text-align: center;
		text-overflow: ellipsis;
		/* #ifndef VUE3-VAPOR */
		lines: 2;
		/* #endif */
		line-height: 22px;
		/* #ifdef WEB */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* #endif */
	}

	.uni-modal-dialog__body {
		justify-content: center;
		align-items: center;
		padding: 0 22px;
		margin-bottom: 13px;
	}
	.uni-modal-dialog__body.no-title {
		margin-top: -10px;
		margin-bottom: 20px;
	}

	.uni-modal-dialog__scroll {
		max-height: 192px;
		margin: 2px;
		width: 100%;
	}

	.uni-modal-dialog__message {
		font-size: 17px;
		font-weight: normal;
		text-align: center;
		color: #7f7f7f;
		line-height: 1.5em;
		width: 100%;
		padding-bottom: 10px;
	}

	.uni-modal-dialog__textarea {
		font-size: 17px;
		background-color: #f6f6f6;
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

	.uni-modal-dialog__textarea-placeholder {
		color: #808080;
	}

	.uni-modal-dialog__divider {
		width: 100%;
		height: 1px;
		transform: scaleY(0.5);
		background-color: #e3e3e3;
	}

	.uni-modal-dialog__actions {
		display: flex;
		width: 100%;
		height: 56px;
		flex-direction: row;
		overflow: hidden;
	}

	.uni-modal-dialog__action {
		justify-content: center;
		flex-grow: 1;
	}
	
	.uni-modal-dialog__action--cancel{
		padding: 0 4px 0 10px;
	}
	.uni-modal-dialog__action--confirm{
		padding: 0 10px 0 4px;
	}

	.uni-modal-dialog__action--hover {
		background-color: #efefef;
	}

	.uni-modal-dialog__action-text {
		color: #000000;
		letter-spacing: 1px;
		font-size: 17px;
		text-align: center;
		/* #ifndef VUE3-VAPOR */
		lines: 1;
		/* #endif */
		white-space: nowrap;
		font-weight: 600;
	}

	.uni-modal-dialog__action-text--confirm {
		color: #4A5E86;
	}

	.uni-modal-dialog__split {
		width: 1px;
		height: 100%;
		transform: scaleX(0.5);
		background-color: #e3e3e3;
	}

	/* #ifdef WEB */
	.uni-textarea-wrapper {
		min-height: 18px !important;
	}
	/* #endif */

	@media (prefers-color-scheme: dark) {
		.uni-modal-dialog,
		.uni-modal-dialog__inner {
			background-color: #272727;
		}
		.uni-modal-dialog__title {
			color: #cfcfcf;
		}
		.uni-modal-dialog__textarea {
			background-color: #3d3d3d;
			color: #cfcfcf;
		}
		.uni-modal-dialog__divider,
		.uni-modal-dialog__split {
			background-color: #303030;
		}
		.uni-modal-dialog__action--hover {
			background-color: #1c1c1c;
		}
		.uni-modal-dialog__action-text {
			color: #a5a5a5;
		}
		.uni-modal-dialog__action-text--confirm {
			color: #7388a2;
		}
	}
</style>
