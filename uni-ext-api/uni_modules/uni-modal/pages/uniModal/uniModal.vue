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

					<scroll-view v-if="!editable && content.length > 0"
								class="uni-modal_dialog__content__scrollview"
								show-scrollbar="true"
								:style="{maxHeight:maxScrollHeight}"
								>
						<text class="uni-modal_dialog__content__scrollview__text">
							{{ content }}
						</text>
					</scroll-view>

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
<script setup lang='ts'>
import { ref, computed, getCurrentInstance } from 'vue'

const theme = ref('light')
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
const cancelColor = ref('#000000')
const confirmColor = ref('#4A5E86')
const inputBottom = ref('0px')
const maxScrollHeight = ref('192px')
const inputCancelColor = ref<string | null>(null)
const inputConfirmColor = ref<string | null>(null)
const hoverClassName = ref("uni-modal_dialog__content__bottom__button__hover")
const showAnim = ref(false)
const isAutoHeight = ref(true)
// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
const appThemeChangeCallbackId = ref(-1)
// #endif

const instance = getCurrentInstance()

const cancelText = computed((): string => {
  if (inputCancelText.value != null) {
    const res = inputCancelText.value!
    return res
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
    const res = inputConfirmText.value!
    return res
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
  // 进入编辑状态，设置content 向上偏移键盘高度的 1/2
  let keyBoardHeight = e.detail.height
  if (keyBoardHeight > 0) {
    let calcBottom = keyBoardHeight / 2
    inputBottom.value = `${calcBottom}px`
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

/**
 * update ui when theme change.
 */
const updateUI = () => {
  if (isValidColor(inputConfirmColor.value)) {
    confirmColor.value = inputConfirmColor.value!
  } else {
    /**
     * init text color with theme
     */
    if (theme.value == "dark") {
      confirmColor.value = '#7388a2'
    } else {
      confirmColor.value = '#4A5E86'
    }
  }
  if (isValidColor(inputCancelColor.value)) {
    cancelColor.value = inputCancelColor.value!
  } else {
    if (theme.value == "dark") {
      cancelColor.value = '#a5a5a5'
    } else {
      cancelColor.value = '#000000'
    }
  }

  if (theme.value == "dark") {
    hoverClassName.value = "uni-modal_dialog__content__bottom__button__hover__uni-modal_dark__mode"
  } else {
    hoverClassName.value = "uni-modal_dialog__content__bottom__button__hover"
  }
}

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
  let ret = {
    cancel: true,
    confirm: false,
  }
  uni.$emit(successEventName.value, JSON.stringify(ret))
}

const handleSure = () => {
  closeModal()
  let ret = {
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
onLoad((options: any) => {
  /**
   * show modal 不需要对内置文案进行i18n适配。（参考微信）
   */
  const systemInfo = uni.getSystemInfoSync()
  const osLanguage = systemInfo.osLanguage
  // ios need
  const scrollHeight = Math.floor(systemInfo.screenHeight * 0.55)
  maxScrollHeight.value = scrollHeight + "px"
  /**
   * add since 2025-04-03 目前暂不支持设置app language
   */
  const appLanguage = systemInfo.appLanguage
  if (appLanguage != null) {
    language.value = appLanguage
  } else if (osLanguage != null) {
    language.value = osLanguage
  }
  // #ifdef WEB
  const hostTheme = systemInfo.hostTheme
  if (hostTheme != null) {
    theme.value = hostTheme
    updateUI()
  }
  uni.onThemeChange((res) => {
    theme.value = res.theme
    updateUI()
  })
  // 监听浏览器的语言设置
  const locale = uni.getLocale()
  language.value = locale
  uni.onLocaleChange((res) => {
    if (res.locale) {
      language.value = res.locale
    }
  })
  // #endif
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
  const appTheme = systemInfo.appTheme
  if (appTheme != null) {
    const osTheme = systemInfo.osTheme ?? 'light'
    theme.value = ('auto' == appTheme) ? osTheme : appTheme
  }
  appThemeChangeCallbackId.value = uni.onAppThemeChange((res: AppThemeChangeResult) => {
    theme.value = res.appTheme
    updateUI()
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

    updateUI()
  })

  uni.$emit(readyEventName.value, {})
})

// onUnload 生命周期
onUnload(() => {
  uni.$off(optionsEventName.value, null)
  uni.$off(readyEventName.value, null)
  uni.$off(successEventName.value, null)
  uni.$off(failEventName.value, null)
  // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
  uni.offAppThemeChange(appThemeChangeCallbackId.value)
  // #endif
})

// onBackPress 生命周期
onBackPress((_: any): boolean | null => {
  let ret = {
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
		opacity: 0.5;
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

	.uni-modal_dialog__content__scrollview {
		max-height: 192px;
		margin: 2px;
		width: 100%;
	}


	.uni-modal_dialog__content__scrollview__text {
		font-size: 16px;
		font-weight: normal;
		text-align: center;
		color: #747474;
		width: 100%;
		padding-bottom: 10px;
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
		height: 0.5px;
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
		width: 0.5px;
		height: 100%;
		background-color: #E3E3E3;
	}

	.uni-modal_dialog__content__bottom__splitline.uni-modal_dark__mode {
		background-color: #303030;
	}
</style>
