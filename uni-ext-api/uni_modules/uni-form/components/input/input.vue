<template>
	<!-- #ifdef APP -->
	<view class='uni-input-wrapper' @touchstart="handleTouchStart" @touchend="handleTouchEnd"
		<!-- #ifdef APP-HARMONY -->
		@touchcancel="handleTouchCancel"
		<!-- #endif -->
	>

    <view class="uni-input-container"
		 <!-- #ifndef APP-ANDROID -->
		 flatten
		 <!-- #endif -->
	>
      <text class="uni-input-placeholder" v-if="showPlaceholder" :class="placeholderClass"
        :style="placeholderStyle">{{props.placeholder}}</text>
      <!-- #ifdef APP-ANDROID -->
      <native-view
        style="height: 100%; width: 100%;"
        @init="onViewInit"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keyboardheightchange="onKeyboardHeightChange"
        @change="onChange"
        @confirm="onConfirm"
      ></native-view>
      <!-- #endif -->
      <!-- #ifdef APP-IOS -->
      <native-view
        :style="`height: ${nativeViewHeight}px; width: 100%;`"
        @init="onViewInit"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keyboardheightchange="onKeyboardHeightChange"
        @change="onChange"
        @confirm="onConfirm"
      ></native-view>
      <!-- #endif -->
      <!-- #ifdef APP-HARMONY -->
      <native-view
        :style="`height: ${nativeViewHeight}px; width: 100%;`"
        :ref="inputCpp.setRuntimeBatchedElement"
        @init="onHarmonyNativeViewInit"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
        @confirm="onConfirm"
        :input-configuration="harmonyInputConfiguration satisfies string" change:input-configuration="inputCpp.applyConfiguration"
        :input-runtime-state="harmonyInputRuntimeState satisfies string" change:input-runtime-state="inputCpp.applyRuntimeState"
      ></native-view>
      <!-- #endif -->
    </view>
	</view>
	<!-- #endif -->
	<!-- #ifdef WEB -->
	<input type="text" />
	<!-- #endif -->
</template>
<!-- #ifdef APP-HARMONY -->
<script module="inputCpp" lang="cpp" class-name="NativeInputView" src="../../cppsdk/app-harmony/input_view.h" namespace="uniappx::form"></script>
<!-- #endif -->
<script setup lang="ts">
	import {
		// #ifdef APP-ANDROID || APP-IOS
		NativeInputView,
		// #endif
		// #ifdef APP-ANDROID || APP-HARMONY
		UniInputElement,
		// #endif
		// #ifdef APP-IOS
		UniInputElementImpl,
		// #endif
		// #ifdef APP-HARMONY
		activateHarmonyInputPositionOwner,
		activateHarmonyInputKeyboardAvoid,
		beginHarmonyInputKeyboardAvoid,
		cancelHarmonyInputKeyboardAvoid,
		createHarmonyInputPositionOwner,
		getHarmonyInputKeyboardHeight,
		getHarmonyInputErrorMessage,
		isHarmonyInputPositionOwner,
		registerHarmonyInputPositionReset,
		releaseHarmonyInputKeyboardAvoid,
		resetHarmonyInputPositionOwner,
		setHarmonyInputKeyboardHeight,
		// #endif
	} from "@/uni_modules/uni-form";
	// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
	import { hasRecentEditorTouch, markEditorTouchStart } from "../common.ts"
	// #endif

	const keyboardHeight = ref(0)
	const isFocusing = ref(false)
	const isComposing = ref(false)
	// #ifdef APP-HARMONY
	const pageTouchEndVersion = ref(0)
	// #endif

	const proxy = getCurrentInstance()?.proxy
	// #ifdef APP-HARMONY
	// 通过变量持有 UniInputElement 实例，避免被回收，待框架调整 $el 实现后可尝试移除
	let inputElement : UniInputElement | null = null
	let harmonyNativeViewElement : UniNativeViewElement | null = null
	let harmonyKeyboardHeightChangeId : number | null = null
	let harmonyPositionReset : (() => void) | null = null
	let harmonyMounted = false
	let harmonyFocusAttemptTimer : number | null = null
	const harmonyPositionOwner = createHarmonyInputPositionOwner()
	const harmonyFocusRequest = ref(false)
	const harmonyAutoFocusRequest = ref(false)
	const harmonyFocusRequestVersion = ref(0)
	// #endif

	let isTouching = false

	let pageTouchEndId : number | null = null

	const FORM_KEY = 'UNI_FORM_CTX'
	interface InputInFormContext {
		registerField : (field : {
			name : string,
			getValue : () => string,
			reset ?: () => void
		}) => void,
		unregisterField : (name : string) => void
	}

	// #ifdef APP-ANDROID || APP-IOS
	let inputView : NativeInputView | null = null
	// #endif
	const style = useComputedStyle({
		properties: [
			'font-size', 'color',
			// #ifndef APP-ANDROID
			'line-height',
			// #endif
			'letter-spacing', 'font-weight', 'font-style', 'font-family', 'text-align',
			'direction',
		],
		filterProperties: true
	})
	
	const rpx2px = (value: string | null): string => {
		if (value == null) {
			return ''
		}
		if(value.endsWith('rpx')){
			return `${uni.rpx2px(parseInt(value))}px`
		}
		return value
	}

	// #ifdef APP-HARMONY
	const getStyleValue = (property: string): string => {
		const value = style.get(property)
		return typeof value == 'string' ? value : ''
	}
	// #endif

	const nativeViewHeight = computed(() => {
		let res = 24
		let styleFontSize = style.get('font-size') as string
		if (styleFontSize) {
			styleFontSize = rpx2px(styleFontSize)
			if (styleFontSize.endsWith('px')) {
				res = Math.max(res, parseInt(styleFontSize))
			}
		}

		let styleLineHeight = style.get('line-height') as string
		if (styleLineHeight) {
			styleLineHeight = rpx2px(styleLineHeight)
			if (styleLineHeight.endsWith('px')) {
				res = Math.max(res, parseInt(styleLineHeight))
			}
		}
		return res
	})
	const placeholderStyle = computed(() => {
		let styleText = ''
		// #ifdef APP-HARMONY
		const appendStyle = (name: string, value: string) => {
			if (value != '') {
				styleText += `${name}:${value};`
			}
		}
		const hasPlaceholderClass = props.placeholderClass != null && props.placeholderClass != ''
		if (!hasPlaceholderClass) {
			let styleFontSize = style.get('font-size')
			if (typeof styleFontSize == 'string') {
				styleFontSize = rpx2px(styleFontSize)
				if (styleFontSize.endsWith('px')) {
					styleText += `font-size:${parseFloat(styleFontSize)}px;`
				}
			}
		}
		const styleDirection = style.get('direction')
		if (typeof styleDirection == 'string' && styleDirection.length > 0) {
			styleText += `direction:${styleDirection};`
		}
		appendStyle('text-align', getStyleValue('text-align'))
		appendStyle('line-height', rpx2px(getStyleValue('line-height')))
		appendStyle('letter-spacing', rpx2px(getStyleValue('letter-spacing')))
		appendStyle('font-weight', getStyleValue('font-weight'))
		appendStyle('font-style', getStyleValue('font-style'))
		appendStyle('font-family', getStyleValue('font-family'))
		// #endif
		// #ifndef APP-HARMONY
		let styleFontSize = style.get('font-size')
		if (typeof styleFontSize == 'string') {
			styleFontSize = rpx2px(styleFontSize)
			if (styleFontSize.endsWith('px')) {
				// TODO: 该方案存在 placeholder 先显示默认大小，如果开发者给组件设置了 font-size, 再更新为设置的字体大小问题
				// TODO: 该方案会导致开发者设置的组件大小对 placeholder 中设置的字体大小影响高于 placeholder-class 中设置的字体大小
				styleText += `font-size:${parseInt(styleFontSize)}px;`
			}
		}
		const styleDirection = style.get('direction')
		if (typeof styleDirection == 'string' && styleDirection.length > 0) {
			styleText += `direction:${styleDirection};`
		}
		// #endif
		return `${styleText}${props.placeholderStyle}`
	})

	defineOptions({
		name: 'input',
		rootElement: {
			// #ifdef APP-ANDROID || APP-HARMONY
			class: UniInputElement
			// #endif
			// #ifdef APP-IOS
			class: UniInputElementImpl
			// #endif
		},
		externalClasses: ['placeholder-class']
	})

	interface ModelModifiers {
		lazy ?: boolean;
		number ?: boolean;
		trim ?: boolean;
	}

	interface InputProps {
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		name ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		disabled ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		value ?: string | number;
		valueModifiers ?: ModelModifiers;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		type ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		password ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		placeholder ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		placeholderStyle ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		placeholderClass ?: string.ClassString;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		maxlength ?: number | string;
		/**
	 * @uniPlatform {
	   "app": {
			 "harmony": {
			   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		cursorSpacing ?: number;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		cursorColor ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		autoFocus ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		focus ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		confirmType ?: string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		confirmHold ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		cursor ?: number;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		selectionStart ?: number;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		selectionEnd ?: number;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		adjustPosition ?: boolean | string;
		/**
	 * @uniPlatform {
	   "app": {
		 "harmony": {
		   "unixVaporVer": "5.0"
		 }
	   }
	 }
	 */
		holdKeyboard ?: boolean | string;
	}
	const props = withDefaults(defineProps<InputProps>(), {
		name: 'input',
		disabled: false,
		value: '',
		type: 'text',
		password: false,
		placeholder: '',
		placeholderStyle: '',
		placeholderClass: '',
		maxlength: -1,
		cursorSpacing: 0,
		cursorColor: '',
		autoFocus: false,
		focus: false,
		confirmType: 'done',
		confirmHold: false,
		cursor: -1,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
	});

	const emit = defineEmits<{
		(e : 'update:value', value : string) : void
		(e : 'input', value : UniInputEvent) : void
		(e : 'focus', value : UniInputFocusEvent) : void
		(e : 'blur', value : UniInputBlurEvent) : void
		(e : 'keyboardheightchange', value : UniInputKeyboardHeightChangeEvent) : void
		(e : 'change', value : UniInputChangeEvent) : void
		(e : 'confirm', value : UniInputConfirmEvent) : void
	}>()

	// #ifdef APP-ANDROID
	function syncAndroidInputStyleProps() {
		inputView?.updateFontSize(rpx2px(style.get('font-size')))
		inputView?.updateColor(style.get('color'))
		inputView?.updateLetterSpacing(rpx2px(style.get('letter-spacing')))
		inputView?.updateFontWeight(style.get('font-weight'))
		inputView?.updateFontStyle(style.get('font-style'))
		inputView?.updateFontFamily(style.get('font-family'))
		inputView?.updateTextAlign(style.get('text-align'))
		inputView?.updateDirection(style.get('direction'))
	}
	// #endif

	function getInitValue() : string {
		return normalizeByMaxLength(props.value.toString())
	}

	function getMaxLength(value : number | string) : number {
		return typeof value == 'string' ? parseInt(value) : value
	}

	function normalizeByMaxLength(value : string) : string {
		const maxlength = getMaxLength(props.maxlength)
		if (maxlength >= 0) {
			return value.substring(0, maxlength)
		}
		return value
	}

	const initialValue = ref<string>(getInitValue())
	const inputValue = ref<string>(initialValue.value)

	function emitModelValueOnInput(value : string) {
		if (props.valueModifiers?.lazy != true) {
			emit('update:value', value)
		}
	}

	function emitModelValueOnChange(value : string) {
		if (props.valueModifiers?.lazy == true) {
			inputValue.value = value
			emit('update:value', value)
		}
	}

	// #ifdef APP-HARMONY
	// Placeholder visibility is derived entirely from existing reactive state.
	// Keeping it computed avoids creating an additional watcher for every input.
	const showPlaceholder = computed(() : boolean => {
		return inputValue.value == '' && props.placeholder != '' && !isComposing.value
	})
	// #endif
	// #ifndef APP-HARMONY
	const showPlaceholder = ref<boolean>(initialValue.value == '' && props.placeholder != '')
	// #endif

	// #ifdef APP-HARMONY
	// Static attributes and frequently changing runtime state use two versioned,
	// escaped payloads. This keeps initial rendering to two C++ tasks without
	// making value changes rebuild the larger style configuration. Record
	// Separator escapes itself and Unit Separator, keeping arbitrary text lossless.
	const encodeHarmonyFields = (fields : string[]) : string => {
		let result = ''
		for (let index = 0; index < fields.length; index++) {
			if (index > 0) result += '\u001f'
			const value = fields[index]
			if (value.indexOf('\u001e') < 0 && value.indexOf('\u001f') < 0) {
				result += value
				continue
			}
			for (let characterIndex = 0; characterIndex < value.length; characterIndex++) {
				const character = value.substring(characterIndex, characterIndex + 1)
				if (character == '\u001e' || character == '\u001f') {
					result += '\u001e'
				}
				result += character
			}
		}
		return result
	}
	const harmonyInputConfiguration = computed(() : string => {
		const fields : string[] = [
			'1',
			props.disabled === true || props.disabled === 'true' ? '0' : '1',
			getMaxLength(props.maxlength).toString(),
			props.type,
			props.password === true || props.password === 'true' ? '1' : '0',
			props.cursor.toString(),
			props.selectionStart.toString(),
			props.selectionEnd.toString(),
			props.confirmType,
			props.confirmHold === true || props.confirmHold === 'true' ? '1' : '0',
			props.holdKeyboard === true || props.holdKeyboard === 'true' ? '1' : '0',
			rpx2px(getStyleValue('font-size')),
			getStyleValue('color'),
			rpx2px(getStyleValue('line-height')),
			rpx2px(getStyleValue('letter-spacing')),
			getStyleValue('font-weight'),
			getStyleValue('font-style'),
			getStyleValue('font-family'),
			getStyleValue('text-align'),
			getStyleValue('direction'),
			props.cursorColor
		]
		return encodeHarmonyFields(fields)
	})
	const harmonyInputRuntimeState = computed(() : string => {
		const fields : string[] = [
			'1',
			inputValue.value,
			harmonyFocusRequest.value ? '1' : '0',
			harmonyAutoFocusRequest.value ? '1' : '0',
			harmonyFocusRequestVersion.value.toString(),
			pageTouchEndVersion.value.toString()
		]
		return encodeHarmonyFields(fields)
	})
	// #endif

	// #ifdef APP-ANDROID
	watch(() => props.value, (newValue : string) => {
		if (newValue == inputValue.value) return
		const value = newValue != null ? newValue : ''
		inputValue.value = normalizeByMaxLength(value.toString())
		inputView?.updateValue(inputValue.value)
	})

	watch(() => [inputValue.value, props.placeholder, isComposing.value], ([value, placeholder, composing] : [string, string, boolean]) => {
		showPlaceholder.value = value == '' && placeholder != '' && !composing;
	})

	watch(() => [
		style.get('font-size'),
		style.get('color'),
		style.get('letter-spacing'),
		style.get('font-weight'),
		style.get('font-style'),
		style.get('font-family'),
		style.get('text-align'),
		style.get('direction')
	], () => {
		if (!inputView) return
		inputView.beginUpdateBatch()
		syncAndroidInputStyleProps()
		inputView.endUpdateBatch()
	})

	watch(() => props.disabled, (newValue : boolean) => {
		inputView?.updateDisabled(newValue)
	})
	watch(() => props.type, (newValue : string) => {
		inputView?.updateType(newValue)
	})
	watch(() => props.password, (newValue : boolean) => {
		inputView?.updatePassword(newValue)
	})
	watch(() => props.maxlength, (newValue : number | string) => {
		const oldValue = inputValue.value
		inputValue.value = normalizeByMaxLength(inputValue.value)
		if (inputValue.value != oldValue) {
			inputView?.updateValue(inputValue.value)
		}
		inputView?.updateMaxLength(getMaxLength(newValue))
	})
	// input 光标与键盘的距离，单位 px 。实际生效值会受可视区域高度限制
	watch(() => props.cursorSpacing, (newValue : number) => {
		inputView?.updateCursorSpacing(newValue)
	})
	watch(() => props.cursorColor, (newValue : string) => {
		inputView?.updateCursorColor(newValue)
	})

	watch(() => props.focus, (newValue : boolean) => {
		inputView?.updateFocus(newValue)
	})

	watch(() => props.confirmType, (newValue : string) => {
		inputView?.updateConfirmType(newValue)
	})

	watch(() => props.confirmHold, (newValue : boolean) => {
		inputView?.updateConfirmHold(newValue)
	})

	watch(() => props.cursor, (newValue : number) => {
		inputView?.updateCursor(newValue)
	})

	watch(() => props.selectionStart, (newValue : number) => {
		inputView?.updateSelectionStart(newValue)
	})

	watch(() => props.selectionEnd, (newValue : number) => {
		inputView?.updateSelectionEnd(newValue)
	})

	watch(() => props.adjustPosition, (newValue : boolean) => {
		inputView?.updateAdjustPosition(newValue)
	})

	watch(() => props.holdKeyboard, (newValue : boolean) => {
		inputView?.updateHoldKeyboard(newValue)
	})
	// #endif

	// #ifdef APP-IOS
	const instance = getCurrentInstance()
	// #endif

	// #ifdef APP-IOS
	function onNativeViewReady() {
		const rawProps = instance.rawProps
		for(const key in rawProps) {
			switch (key) {
				case 'value':
					inputView?.updateValue(inputValue.value)
					break
				case 'type':
					inputView?.updateType(props.type)
					break
				case 'disabled':
					inputView?.updateDisabled(props.disabled)
					break
				case 'selection-start':
				case 'selectionStart':
					inputView?.updateSelectionStart(props.selectionStart)
					break
				case 'selection-end':
				case 'selectionEnd':
					inputView?.updateSelectionEnd(props.selectionEnd)
					break
				case 'auto-focus':
				case 'autoFocus':
				case 'autofocus':
					inputView?.updateAutoFocus(props.autoFocus)
					break
				case 'focus':
					inputView?.updateFocus(props.focus)
					break
				case 'cursor':
					inputView?.updateCursor(props.cursor)
					break
				case 'confirm-type':
				case 'confirmType':
					inputView?.updateConfirmType(props.confirmType)
					break
				case 'confirm-hold':
				case 'confirmHold':
					inputView?.updateConfirmHold(props.confirmHold)
					break
				case 'adjust-position':
				case 'adjustPosition':
					inputView?.updateAdjustPosition(props.adjustPosition)
					break
				case 'hold-keyboard':
				case 'holdKeyboard':
					inputView?.updateHoldKeyboard(props.holdKeyboard)
					break
				case 'password':
					inputView?.updatePassword(props.password)
					break
				case 'maxlength':
					inputView?.updateMaxLength(getMaxLength(props.maxlength))
					break
				case 'cursor-color':
				case 'cursorColor':
					inputView?.updateCursorColor(props.cursorColor)
					break
				case 'cursor-spacing':
				case 'cursorSpacing':
					inputView?.updateCursorSpacing(props.cursorSpacing)
					break
			}
		}
		style.forEach((value, key) => {
			switch (key) {
				case 'font-size':
					inputView?.updateFontSize(rpx2px(value))
					break
				case 'color':
					inputView?.updateColor(value)
					break
				case 'line-height':
					inputView?.updateLineHeight(rpx2px(value))
					break
				case 'letter-spacing':
					inputView?.updateLetterSpacing(rpx2px(value))
					break
				case 'font-weight':
					inputView?.updateFontWeight(value)
					break
				case 'font-style':
					inputView?.updateFontStyle(value)
					break
				case 'font-family':
					inputView?.updateFontFamily(value)
					break
				case 'text-align':
					inputView?.updateTextAlign(value)
					break
				case 'direction':
					inputView?.updateDirection(value)
					break
			}
		})
	}
	// #endif

	// #ifdef APP-ANDROID || APP-IOS
	function onViewInit(e : UniNativeViewInitEvent) {
		// #ifdef APP-ANDROID
		inputView = new NativeInputView(
			e.detail.element,
			rpx2px(style.get('font-size')),
			style.get('color'),
			rpx2px(style.get('letter-spacing')),
			style.get('font-weight'),
			style.get('font-style'),
			style.get('font-family'),
			style.get('text-align'),
			style.get('direction'),
			inputValue.value,
			props.type,
			props.disabled,
			props.selectionStart,
			props.selectionEnd,
			props.autoFocus,
			props.focus,
			props.cursor,
			props.confirmType,
			props.confirmHold,
			props.adjustPosition,
			props.holdKeyboard,
			props.password,
			getMaxLength(props.maxlength),
			props.cursorColor,
			props.cursorSpacing
		);
		// #endif
		// #ifdef APP-IOS
		inputView = new NativeInputView(e.detail.element);
		onNativeViewReady()
		// #endif
	}
	// #endif

	// #ifdef APP-ANDROID
	function onInput(e : UniNativeViewEvent) {
		const newValue = e.detail.value ?? ""
		if (newValue !== inputValue.value) {
			inputValue.value = newValue
			emitModelValueOnInput(newValue)
			emit('input', e)
		}
	}

	function onFocus(e : UniNativeViewEvent) {
		isFocusing.value = true
		emit('focus', e)
	}

	function onBlur(e : UniNativeViewEvent) {
		isFocusing.value = false
		isComposing.value = false
		emit('blur', e)
	}

	function onKeyboardHeightChange(e : UniNativeViewEvent) {
		keyboardHeight.value = e.detail.height ?? 0
		emit('keyboardheightchange', e)
	}

	function onChange(e : UniNativeViewEvent) {
		emitModelValueOnChange(e.detail.value ?? inputValue.value)
		emit('change', e)
	}

	function onConfirm(e : UniNativeViewEvent) {
		emit('confirm', e)
	}
	// #endif
	// #ifdef APP-IOS
	function onInput(e : UniNativeViewEvent) {
		isComposing.value = !!e.detail.composing
		if (isComposing.value) {
			return
		}
		const newValue = e.detail.value;
		if (newValue !== inputValue.value) {
			inputValue.value = e.detail.value;
			emitModelValueOnInput(newValue)
			emit('input', e)
		}

	}
	function onFocus(e : UniNativeViewEvent) {
		isFocusing.value = true
		emit('focus', e)
	}
	function onBlur(e : UniNativeViewEvent) {
		isFocusing.value = false
		isComposing.value = false
		emit('blur', e)
	}
	function onKeyboardHeightChange(e : UniNativeViewEvent) {
		keyboardHeight.value = e.detail.height
		emit('keyboardheightchange', e)
	}

	function onChange(e : UniNativeViewEvent) {
		emitModelValueOnChange(e.detail.value ?? inputValue.value)
		emit('change', e)
	}

	function onConfirm(e : UniNativeViewEvent) {
		emit('confirm', e)
	}
	// #endif
	// #ifdef APP-HARMONY
	function clearHarmonyFocusAttemptTimer() {
		if (harmonyFocusAttemptTimer != null) {
			clearTimeout(harmonyFocusAttemptTimer!)
			harmonyFocusAttemptTimer = null
		}
	}

	function beginHarmonyFocusAttempt() {
		const harmonyDisabled = props.disabled === true || props.disabled === 'true'
		if (harmonyDisabled) return
		ensureHarmonyKeyboardHeightListener()
		beginHarmonyInputKeyboardAvoid(harmonyPositionOwner)
		clearHarmonyFocusAttemptTimer()
		// NativeNode focus has no failure callback. Restore the window-level
		// avoid mode if a focus event does not arrive after the request.
		harmonyFocusAttemptTimer = setTimeout(() => {
			harmonyFocusAttemptTimer = null
			if (!isFocusing.value) {
				cancelHarmonyFocusAttempt()
			}
		}, 1000)
	}

	function completeHarmonyFocusAttempt() {
		clearHarmonyFocusAttemptTimer()
		activateHarmonyInputKeyboardAvoid(harmonyPositionOwner)
	}

	function cancelHarmonyFocusAttempt() {
		clearHarmonyFocusAttemptTimer()
		cancelHarmonyInputKeyboardAvoid(harmonyPositionOwner)
		// A failed attempt owns only this component's listener ID. Preserve a
		// previous successful focus's listener while its keyboard is closing.
		if (!isFocusing.value
			&& (!isHarmonyInputPositionOwner(harmonyPositionOwner) || keyboardHeight.value <= 0)) {
			removeHarmonyKeyboardHeightListener()
		}
	}

	function replayHarmonyFocus() {
		const shouldFocus = props.focus === true || props.focus === 'true'
		const shouldAutoFocus = props.autoFocus === true || props.autoFocus === 'true'
		if (shouldFocus || shouldAutoFocus) {
			beginHarmonyFocusAttempt()
			// Apply focus before auto-focus so auto-focus wins when both props
			// are present during initial rendering.
			harmonyFocusRequest.value = shouldFocus
			harmonyAutoFocusRequest.value = shouldAutoFocus
			// Force a native focus replay even when the boolean props have not
			// changed since the initial render.
			harmonyFocusRequestVersion.value++
		}
	}

	function ensureHarmonyKeyboardHeightListener() {
		if (harmonyKeyboardHeightChangeId != null) return
		harmonyKeyboardHeightChangeId = uni.onKeyboardHeightChange((event) => {
			const height = Math.max(0, event.height)
			setHarmonyInputKeyboardHeight(height)
			handleHarmonyKeyboardHeightChange(height)
		})
	}

	function removeHarmonyKeyboardHeightListener() {
		if (harmonyKeyboardHeightChangeId == null) return
		const listenerId = harmonyKeyboardHeightChangeId!
		// Clear local state first so an exception from a Window that has already
		// been destroyed cannot leave this component looking registered.
		harmonyKeyboardHeightChangeId = null
		try {
			uni.offKeyboardHeightChange(listenerId)
		} catch (e) {
			// On application exit Harmony can destroy Window before component
			// beforeUnmount hooks run. Ignore only that expected teardown race.
			const message : string = getHarmonyInputErrorMessage(e)
			if (message.indexOf('Window is nullptr') < 0) {
				console.error(message)
			}
		}
	}

	function ensureHarmonyPageTouchEndListener() {
		if (pageTouchEndId != null) return
		pageTouchEndId = proxy?.$page.onTouchEnd(() => {
			const recentEditorTouch = hasRecentEditorTouch()
			if (!isTouching && !recentEditorTouch) {
				pageTouchEndVersion.value++
			}
		})
	}

	function removeHarmonyPageTouchEndListener() {
		if (pageTouchEndId == null) return
		proxy?.$page.offTouchEnd(pageTouchEndId!)
		pageTouchEndId = null
	}

	function onHarmonyNativeViewInit(e : UniNativeViewInitEvent) {
		harmonyNativeViewElement = e.detail.element
		// Initial focus must wait until onMounted has registered the keyboard
		// listener. Otherwise the first keyboardHeightChange can be lost.
		if (harmonyMounted) {
			replayHarmonyFocus()
		}
	}

	function onInput(e : UniInputEvent) {
		const detail = e.detail as unknown as HarmonyInputEventDetail
		isComposing.value = detail.composing == true
		if (isComposing.value) return
		const newValue = e.detail.value
		if (newValue !== inputValue.value) {
			inputValue.value = newValue;
			inputElement?.updateValue(newValue);
			emitModelValueOnInput(newValue)
			emit('input', e)
		}
	}

	function onFocus(e : UniInputFocusEvent) {
		ensureHarmonyKeyboardHeightListener()
		ensureHarmonyPageTouchEndListener()
		isFocusing.value = true
		activateHarmonyInputPositionOwner(harmonyPositionOwner)
		completeHarmonyFocusAttempt()
		const currentKeyboardHeight = getHarmonyInputKeyboardHeight()
		keyboardHeight.value = currentKeyboardHeight
		const detail = e.detail as unknown as HarmonyInputFocusEventDetail
		detail.height = currentKeyboardHeight
		if (currentKeyboardHeight > 0) {
			setTimeout(() => {
				if (isFocusing.value) {
					adjustHarmonyInputPosition(currentKeyboardHeight)
				}
			}, 0)
		}
		emit('focus', e)
	}

	function onBlur(e : UniInputBlurEvent) {
		isFocusing.value = false
		isComposing.value = false
		const currentKeyboardHeight = getHarmonyInputKeyboardHeight()
		if (currentKeyboardHeight <= 0 && isHarmonyInputPositionOwner(harmonyPositionOwner)) {
			resetHarmonyInputPosition(true)
			releaseHarmonyInputKeyboardAvoid(harmonyPositionOwner)
		}
		if (currentKeyboardHeight <= 0) {
			removeHarmonyKeyboardHeightListener()
		}
		removeHarmonyPageTouchEndListener()
		emit('blur', e)
	}

	function onChange(e : UniInputChangeEvent) {
		emitModelValueOnChange(e.detail.value)
		emit('change', e)
	}

	function onConfirm(e : UniInputConfirmEvent) {
		emit('confirm', e)
	}

	type HarmonyKeyboardHeightChangeEventDetail = {
		height : number
		duration : number
	}

	type HarmonyInputEventDetail = {
		composing ?: boolean
	}

	type HarmonyInputFocusEventDetail = {
		height : number
	}

	class HarmonyKeyboardHeightChangeEvent extends UniCustomEvent<HarmonyKeyboardHeightChangeEventDetail> {
		constructor(height : number, duration : number) {
			super('keyboardheightchange', {
				height,
				duration
			} as HarmonyKeyboardHeightChangeEventDetail)
		}
	}

	function emitHarmonyKeyboardHeightChange(height : number, duration : number) {
		const event = new HarmonyKeyboardHeightChangeEvent(height, duration)
		emit('keyboardheightchange', event as UniInputKeyboardHeightChangeEvent)
	}

	function handleHarmonyKeyboardHeightChange(heightValue : number, duration : number = 0) {
		if (!isFocusing.value && !(heightValue <= 0 && keyboardHeight.value > 0)) return

		const height = Math.max(0, heightValue)
		keyboardHeight.value = height
		emitHarmonyKeyboardHeightChange(height, duration)
		if (height <= 0) {
			const ownedHarmonyPosition = isHarmonyInputPositionOwner(harmonyPositionOwner)
			resetHarmonyInputPosition(!isFocusing.value)
			if (!isFocusing.value && ownedHarmonyPosition) {
				releaseHarmonyInputKeyboardAvoid(harmonyPositionOwner)
			}
			if (!isFocusing.value) {
				removeHarmonyKeyboardHeightListener()
			}
			return
		}
		activateHarmonyInputKeyboardAvoid(harmonyPositionOwner)
		adjustHarmonyInputPosition(height)
	}

	function resetHarmonyInputPosition(release : boolean = false) {
		resetHarmonyInputPositionOwner(harmonyPositionOwner, release)
		harmonyPositionReset = null
	}

	function isHarmonyScrollParent(element : UniElement) : boolean {
		const tagName = element.tagName.toUpperCase()
		return tagName == 'SCROLL-VIEW'
			|| tagName == 'SCROLLVIEW'
			|| tagName == 'LIST-VIEW'
			|| tagName == 'LISTVIEW'
			|| tagName == 'WEB-VIEW'
			|| tagName == 'WEBVIEW'
			|| tagName.indexOf('SCROLL-VIEW') >= 0
			|| tagName.indexOf('SCROLLVIEW') >= 0
			|| tagName.indexOf('LIST-VIEW') >= 0
			|| tagName.indexOf('LISTVIEW') >= 0
			|| tagName.indexOf('WEB-VIEW') >= 0
			|| tagName.indexOf('WEBVIEW') >= 0
			// 鸿蒙页面自身也是默认滚动容器。遗漏 PAGE 会让离屏输入框
			// 错误地走整页 transform 兜底，最终把页面推飞并露出空白。
			|| tagName == 'PAGE'
	}

	function getHarmonyPageRoot(element : UniElement) : UniElement | null {
		let root = element.parentElement
		while (root?.parentElement != null) {
			root = root.parentElement
		}
		return root
	}

	function adjustHarmonyInputPosition(height : number) {
		activateHarmonyInputPositionOwner(harmonyPositionOwner)
		resetHarmonyInputPosition(false)

		const shouldAdjustPosition = props.adjustPosition === true || props.adjustPosition === 'true'
		if (!shouldAdjustPosition || height <= 0 || harmonyNativeViewElement == null) return

		const element = harmonyNativeViewElement!
		const windowHeight = element.uniPage.pageBody.height
		const rect = element.getBoundingClientRect()
		const elementHeight = Math.max(0, rect.height)
		const elementBottom = rect.y + elementHeight
		const maxSafeSpacing = Math.max(0, windowHeight - height - elementHeight)
		const effectiveCursorSpacing = Math.min(
			Math.max(0, props.cursorSpacing),
			maxSafeSpacing
		)
		const keyboardTop = windowHeight - height
		let needMoreScrollDistance = elementBottom + effectiveCursorSpacing - keyboardTop
		if (needMoreScrollDistance <= 0) return

		const scrollParents : UniElement[] = []
		let parent = element.parentElement
		while (parent != null) {
			if (isHarmonyScrollParent(parent!)) {
				scrollParents.push(parent!)
			}
			parent = parent!.parentElement
		}
		const scrollAdjustRecords : {
			element : UniElement,
			originScrollTop : number,
			adjustedScrollTop : number
		}[] = []
		let appliedScrollDistance = 0

		for (let i = 0; i < scrollParents.length; i++) {
			const currentParent = scrollParents[i]
			const canScroll = currentParent.scrollHeight
				- currentParent.scrollTop
				- currentParent.getBoundingClientRect().height
			if (canScroll <= 0) continue

			const distance = Math.min(canScroll, needMoreScrollDistance)
			const originScrollTop = currentParent.scrollTop
			const adjustedScrollTop = originScrollTop + distance
			scrollAdjustRecords.push({
				element: currentParent,
				originScrollTop,
				adjustedScrollTop
			})
			currentParent.scrollTo(currentParent.scrollLeft, adjustedScrollTop)
			appliedScrollDistance += distance
			needMoreScrollDistance -= distance
			if (needMoreScrollDistance <= 0) break
		}

		// 是否允许根节点兜底必须按滚动后的输入框位置判断：
		// 初始在屏幕外但已被 PAGE 滚入可视区时仍需补足；仍在屏幕外时禁止整页位移。
		const adjustedElementTop = rect.y - appliedScrollDistance
		const adjustedElementBottom = elementBottom - appliedScrollDistance
		const allowRootTranslate = elementHeight > 0
			&& adjustedElementTop < windowHeight
			&& adjustedElementBottom > 0
		if (needMoreScrollDistance > 0 && allowRootTranslate) {
			const rootTransformDistance = Math.min(
				needMoreScrollDistance,
				Math.max(0, adjustedElementTop)
			)
			if (rootTransformDistance > 0) {
				const pageRootElement = getHarmonyPageRoot(element)
				if (pageRootElement != null) {
					const originalTransform = pageRootElement.style.getPropertyValue('transform')
					const adjustedTransform = originalTransform == '' || originalTransform == 'none'
						? `translateY(-${rootTransformDistance}px)`
						: `${originalTransform} translateY(-${rootTransformDistance}px)`
					pageRootElement.style.setProperty(
						'transform',
						adjustedTransform
					)
					harmonyPositionReset = () => {
						if (pageRootElement.isConnected !== false) {
							pageRootElement.style.setProperty('transform', originalTransform)
						}
					}
				}
			}
		}

		const rootPositionReset = harmonyPositionReset
		harmonyPositionReset = () => {
			const connectedRecords = scrollAdjustRecords.filter((record) => record.element.isConnected !== false)
			const hasUserScrolled = connectedRecords.some((record) => {
				return Math.abs(record.element.scrollTop - record.adjustedScrollTop) > 1
			})
			if (!hasUserScrolled) {
				for (let i = 0; i < connectedRecords.length; i++) {
					const record = connectedRecords[i]
					record.element.scrollTo(record.element.scrollLeft, record.originScrollTop)
				}
			}
			rootPositionReset?.()
		}
		registerHarmonyInputPositionReset(harmonyPositionOwner, harmonyPositionReset)
	}
	// #endif
	const handleTouchStart = () => {
		// #ifdef APP-ANDROID || APP-IOS || APP-HARMONY
		markEditorTouchStart()
		// #endif
		// #ifdef APP-HARMONY
		// Disable the system offset before NativeNode focus to avoid racing the
		// component adjustment. A tokenized timeout/cancel path restores it when
		// the gesture does not result in focus.
		beginHarmonyFocusAttempt()
		// #endif
		isTouching = true
	}

	const handleTouchEnd = (event : UniTouchEvent) => {
		// #ifdef APP-ANDROID
		const touch = event.changedTouches[0]
		inputView?.cacheEditorTouchEnd(touch.clientX, touch.clientY)
		// #endif
		isTouching = false
	}

	// #ifdef APP-HARMONY
	const handleTouchCancel = () => {
		isTouching = false
		if (!isFocusing.value) {
			cancelHarmonyFocusAttempt()
		}
	}
	// #endif

	onMounted(() => {
		// #ifdef APP-HARMONY
		harmonyMounted = true
		const shouldFocusOnMount = props.focus === true || props.focus === 'true'
			|| props.autoFocus === true || props.autoFocus === 'true'
		if (shouldFocusOnMount) {
			beginHarmonyFocusAttempt()
		}
		// The C++ native node receives its initial attributes before the page
		// is attached. Trigger focus only after the keyboard listener is ready.
		if (shouldFocusOnMount) {
			setTimeout(() => {
				if (harmonyMounted) {
					replayHarmonyFocus()
				}
			}, 100)
		}
		// #endif

		// #ifdef APP-ANDROID || APP-IOS
		pageTouchEndId = proxy?.$page.onTouchEnd(() => {
			const recentEditorTouch = hasRecentEditorTouch()
			// #ifdef APP-ANDROID
			if (isFocusing.value && !isTouching && !recentEditorTouch) {
				inputView?.handlePageTouchEndFocus()
			}
			// #endif
			// #ifdef APP-IOS
			if (!isTouching && !recentEditorTouch) {
				inputView?.handlePageTouchEndFocus()
			}
			// #endif
		})
		// #endif

		// #ifndef APP-ANDROID
		watch(() => props.value, (newValue : string) => {
			if (newValue == inputValue.value) return
			const value = newValue != null ? newValue : ''
			inputValue.value = normalizeByMaxLength(value.toString())
			// #ifdef APP-IOS
			inputView?.updateValue(inputValue.value)
			// #endif
			// #ifdef APP-HARMONY
			inputElement?.updateValue(inputValue.value);
			// #endif
		})

		// #ifdef APP-IOS
		watch(() => [inputValue.value, props.placeholder, isComposing.value], ([value, placeholder, composing] : [string, string, boolean]) => {
			showPlaceholder.value = value == '' && placeholder != '' && !composing;
		})
		// #endif

		// Harmony style and native properties are synchronized by the
		// change:input-* bindings on native-view. These watchers are only
		// required by the iOS NativeInputView implementation.
		// #ifdef APP-IOS
		watch(() => style.get('font-size'), (value : string) => {
			inputView?.updateFontSize(rpx2px(value))
		})
		watch(() => style.get('color'), (value : string) => {
			inputView?.updateColor(value)
		})
		watch(() => style.get('line-height'), (value : string) => {
			inputView?.updateLineHeight(rpx2px(value))
		})
		watch(() => style.get('letter-spacing'), (value : string) => {
			inputView?.updateLetterSpacing(rpx2px(value))
		})
		watch(() => style.get('font-weight'), (value : string) => {
			inputView?.updateFontWeight(value)
		})
		watch(() => style.get('font-style'), (value : string) => {
			inputView?.updateFontStyle(value)
		})
		watch(() => style.get('font-family'), (value : string) => {
			inputView?.updateFontFamily(value)
		})
		watch(() => style.get('text-align'), (value : string) => {
			inputView?.updateTextAlign(value)
		})
		watch(() => style.get('direction'), (value : string) => {
			inputView?.updateDirection(value)
		})

		watch(() => props.disabled, (newValue : boolean) => {
			inputView?.updateDisabled(newValue)
		})
		watch(() => props.type, (newValue : string) => {
			inputView?.updateType(newValue)
		})
		watch(() => props.password, (newValue : boolean) => {
			inputView?.updatePassword(newValue)
		})
		// #endif

		watch(() => props.maxlength, (newValue : number | string) => {
			const oldValue = inputValue.value
			inputValue.value = normalizeByMaxLength(inputValue.value)
			if (inputValue.value != oldValue) {
				// #ifdef APP-IOS
				inputView?.updateValue(inputValue.value)
				// #endif
				// #ifdef APP-HARMONY
				inputElement?.updateValue(inputValue.value);
				// #endif
			}
			// #ifdef APP-IOS
			inputView?.updateMaxLength(getMaxLength(newValue))
			// #endif
		})
		// input 光标与键盘的距离，单位 px 。实际生效值会受可视区域高度限制
		watch(() => props.cursorSpacing, (newValue : number) => {
			// #ifdef APP-IOS
			inputView?.updateCursorSpacing(newValue)
			// #endif
			// #ifdef APP-HARMONY
			if (isFocusing.value && keyboardHeight.value > 0) {
				adjustHarmonyInputPosition(keyboardHeight.value)
			}
			// #endif
		})
		// #ifdef APP-IOS
		watch(() => props.cursorColor, (newValue : string) => {
			inputView?.updateCursorColor(newValue)
		})
		// #endif

		watch(() => props.focus, (newValue : boolean) => {
			// #ifdef APP-HARMONY
			if (newValue === true || newValue === 'true') {
				beginHarmonyFocusAttempt()
			} else if (!isFocusing.value) {
				cancelHarmonyFocusAttempt()
			}
			harmonyFocusRequest.value = newValue === true || newValue === 'true'
			// #endif
			// #ifdef APP-IOS
			inputView?.updateFocus(newValue)
			// #endif
		})

		// Harmony 的 native input 需要在节点挂载完成后重新应用 auto-focus。
		// 初始 change 回调可能早于 ArkUI 节点真正加入页面，此时设置焦点会被丢弃。
		// #ifdef APP-HARMONY
		watch(() => props.autoFocus, (newValue : boolean | string) => {
			if (newValue === true || newValue === 'true') {
				beginHarmonyFocusAttempt()
			} else if (!isFocusing.value) {
				cancelHarmonyFocusAttempt()
			}
			harmonyAutoFocusRequest.value = newValue === true || newValue === 'true'
		})
		// #endif

		// #ifdef APP-IOS
		watch(() => props.confirmType, (newValue : string) => {
			inputView?.updateConfirmType(newValue)
		})

		watch(() => props.confirmHold, (newValue : boolean) => {
			inputView?.updateConfirmHold(newValue)
		})

		watch(() => props.cursor, (newValue : number) => {
			inputView?.updateCursor(newValue)
		})

		watch(() => props.selectionStart, (newValue : number) => {
			inputView?.updateSelectionStart(newValue)
		})

		watch(() => props.selectionEnd, (newValue : number) => {
			inputView?.updateSelectionEnd(newValue)
		})
		// #endif

		// #ifdef APP-HARMONY
		watch(() => props.adjustPosition, (newValue : boolean | string) => {
			const shouldAdjustPosition = newValue === true || newValue === 'true'
			if (!shouldAdjustPosition) {
				resetHarmonyInputPosition()
			} else if (isFocusing.value && keyboardHeight.value > 0) {
				adjustHarmonyInputPosition(keyboardHeight.value)
			}
		})
		// #endif
		// #ifndef APP-HARMONY
		watch(() => props.adjustPosition, (newValue : boolean) => {
			inputView?.updateAdjustPosition(newValue)
		})
		// #endif

		// #ifdef APP-IOS
		watch(() => props.holdKeyboard, (newValue : boolean) => {
			inputView?.updateHoldKeyboard(newValue)
		})
		// #endif
		// #endif

		const formCtx = inject<InputInFormContext | null>(FORM_KEY, null)
		if (formCtx && props.name) {
			formCtx.registerField({
				name: props.name,
				getValue: () => inputValue.value,
				reset: () => {
					inputValue.value = normalizeByMaxLength(initialValue.value)
					// #ifdef APP-ANDROID || APP-IOS
					inputView?.updateValue(inputValue.value)
					// #endif
					// #ifdef APP-HARMONY
					inputElement?.updateValue(inputValue.value)
					// #endif
				}
			})
		}
		// #ifdef APP-ANDROID
		setTimeout(() => {
			if (inputView) {
				inputView.beginUpdateBatch()
				syncAndroidInputStyleProps()
				inputView.endUpdateBatch()
			}
		}, 80)
		// #endif

		// #ifdef APP-HARMONY
		if (proxy?.$el) {
			inputElement = proxy.$el as unknown as UniInputElement
			// set value 时更新响应式 value，再由 runtime-state 同步到 NativeNode。
			inputElement.onValueChange = (val : string) => {
				inputValue.value = val
			}
			// 初始化 UniInputElement 内部 value
			inputElement.updateValue(inputValue.value)
		}
		// #endif
	})

	onBeforeUnmount(() => {
		// #ifdef APP-HARMONY
		harmonyMounted = false
		clearHarmonyFocusAttemptTimer()
		const ownedHarmonyPosition = isHarmonyInputPositionOwner(harmonyPositionOwner)
		resetHarmonyInputPosition(true)
		if (ownedHarmonyPosition) {
			setHarmonyInputKeyboardHeight(0)
		}
		releaseHarmonyInputKeyboardAvoid(harmonyPositionOwner)
		removeHarmonyKeyboardHeightListener()
		inputElement = null
		// #endif
		if (pageTouchEndId != null) {
			proxy?.$page.offTouchEnd(pageTouchEndId)
		}

		const formCtx = inject<{ unregisterField : (name : string) => void } | null>(FORM_KEY, null)
		if (formCtx && props.name) {
			formCtx.unregisterField(props.name)
		}
		// Android/iOS 平台需要主动释放 UTS 原生实例。
		// #ifdef APP-ANDROID || APP-IOS
		inputView?.destroy()
		// #endif
	})
</script>

<style>
	/* #ifdef APP-IOS || APP-HARMONY */
	.uni-input-wrapper {
		justify-content: center;
	}
	/* #endif */

	.uni-input-container {
		width: 100%;
		/* #ifdef APP-ANDROID */
		height: 100%;
		/* #endif */
	}

	.uni-input-placeholder {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		right: 0;
		color: #757575;
		white-space: nowrap;
	}
</style>
