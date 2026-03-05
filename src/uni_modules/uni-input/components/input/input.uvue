<template>
	<!-- #ifdef APP -->
	<view :ref="inputCpp.setElement" :adjustPosition="adjustPosition" change:adjustPosition="inputCpp.setAdjustPosition" :isFocusing="isFocusing" change:isFocusing="inputCpp.setIsFocusing" :keyboardHeight="keyboardHeight" change:keyboardHeight="inputCpp.handleKeyboardHeightChange" class='uni-input-wrapper' @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <view class="uni-input-container" flatten>
      <text class="uni-input-placeholder" v-if="showPlaceholder" v-show="isComputedPlaceholderStyle" :class="placeholderClass"
        :style="placeholderStyle">{{props.placeholder}}</text>
      <native-view :style="`height: ${nativeViewHeight}px; width: 100%;`" @init="onViewInit"></native-view>
    </view>
	</view>
	<!-- #endif -->
	<!-- #ifdef WEB -->
	<input type="text" />
	<!-- #endif -->
</template>
<script module="inputCpp" lang="cpp" class-name="Input" src="../../cppsdk/input.h"
  namespace="input"></script>
<script setup lang="uts">
	import {
		NativeInputView,
		// #ifndef APP-IOS
		UniInputElement,
		// #endif
	} from "@/uni_modules/uni-input";

    const keyboardHeight = ref(0)
    const isFocusing = ref(false)
    const adjustPosition = computed(() => Boolean(props.adjustPosition))

	const proxy = getCurrentInstance()?.proxy
	// 通过变量持有 UniInputElement 实例，避免被回收，待框架调整 $el 实现后可尝试移除
	let inputElement: UniInputElement | null = null

	let isTouching = false

	let pageTouchEndId: number | null = null

	const FORM_KEY = 'UNI_FORM_CTX'
	interface InputInFormContext {
	  registerField : (field : {
	    name : string,
			getValue : () => string,
	    reset ?: () => void
	  }) => void,
	  unregisterField : (name : string) => void
	}

	let inputView : NativeInputView | null = null
	
	const isComputedPlaceholderStyle = ref(false)

	const style = useComputedStyle({
		properties: ['font-size', 'color', 'line-height', 'letter-spacing', 'font-weight', 'font-style', 'font-family',  'text-align'],
		filterProperties: true
	})

	const nativeViewHeight = computed(() => {
		let res = 24
		const styleFontSize = style.get('font-size') as string
		if(styleFontSize){
			if(styleFontSize.endsWith('px')){
				res = Math.max(res, parseInt(styleFontSize))
			}
		}

		const styleLineHeight = style.get('line-height') as string
		if(styleLineHeight){
			if(styleLineHeight.endsWith('px')){
				res = Math.max(res, parseInt(styleLineHeight))
			}
		}
		return res
	})

	// TODO: 处理 placeholderClass 中 font-size 优先级问题
	const placeholderStyle = computed(() => {
		const styleFontSize = style.get('font-size')
		if(typeof styleFontSize == 'string'){
			if(styleFontSize.endsWith('px')){
				isComputedPlaceholderStyle.value = true
				return `font-size:${parseInt(styleFontSize)}px;${props.placeholderStyle}`
			}
		}
		isComputedPlaceholderStyle.value = true
		return props.placeholderStyle
	})

	// #ifndef APP-IOS
	defineOptions({
	  name: 'input',
		rootElement: {
			class: UniInputElement
		},
		externalClasses: ['placeholder-class']
	})
	// #endif

	interface InputProps {
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		name ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		disabled ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		value ?: string | number;
		modelValue?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		type ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		password ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		placeholder ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		placeholderStyle ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		placeholderClass ?: string.ClassString;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		maxlength ?: number;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
         }
       }
     }
     */
		cursorSpacing ?: number;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		cursorColor ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		autoFocus ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		focus ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		confirmType ?: string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		confirmHold ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		cursor ?: number;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		selectionStart ?: number;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		selectionEnd ?: number;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "5.0"
         }
       }
     }
     */
		adjustPosition ?: boolean | string;
		/**
     * @uniPlatform {
       "app": {
         "harmony": {
           "unixvVer": "x"
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
		modelValue: '',
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
		cursor: 0,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
	});

	const emit = defineEmits<{
		(e : 'update:modelValue', value : string) : void
		(e : 'input', value : UniInputEvent) : void
		(e : 'focus', value : UniInputFocusEvent) : void
		(e : 'blur', value : UniInputBlurEvent) : void
		(e : 'keyboardheightchange', value : UniInputKeyboardHeightChangeEvent) : void
		(e : 'change', value : UniInputChangeEvent) : void
		(e : 'confirm', value : UniInputConfirmEvent) : void
	}>()

	function getInitValue() : string {
		const value = props.modelValue == null || props.modelValue == '' ? props.value : props.modelValue
		return value.toString()
	}

	const initialValue = ref<string>(getInitValue())
	const inputValue = ref<string>(initialValue.value)

	const showPlaceholder = ref<boolean>(initialValue.value == '' && props.placeholder != '')

	function onViewInit(e : UniNativeViewInitEvent) {
		setTimeout(() => {
			inputView = new NativeInputView(e.detail.element);
			inputView!.updateValue(inputValue.value)
			inputView!.updateType(props.type)
			inputView!.updateDisabled(props.disabled)
			inputView!.updateSelectionStart(props.selectionStart)
			inputView!.updateSelectionEnd(props.selectionEnd)
			inputView!.updateAutoFocus(props.autoFocus)
			inputView!.updateFocus(props.focus)
			inputView!.updateCursor(props.cursor)
			inputView!.updateConfirmType(props.confirmType)
			inputView!.updateConfirmHold(props.confirmHold)
			inputView!.updateAdjustPosition(props.adjustPosition)
			inputView!.updateHoldKeyboard(props.holdKeyboard)
			inputView!.updatePassword(props.password)
			inputView!.updateMaxLength(props.maxlength)
			inputView!.updateCursorColor(props.cursorColor)
			inputView!.updateInputEvent(onInput)
			inputView!.updateFocusEvent(onFocus)
			inputView!.updateBlurEvent(onBlur)
			inputView!.updateKeyboardHeightChangeEvent(onKeyboardHeightChange)
			inputView!.updateChangeEvent(onChange)
			inputView!.updateConfirmEvent(onConfirm)
		}, 80)
	}

	function onInput(e : UniInputEvent) {
		const newValue = e.detail.value
		if (newValue !== inputValue.value) {
			inputValue.value = newValue;
			inputElement?.updateValue(inputValue.value);
			emit('update:modelValue', newValue)
			emit('input', e)
		}
	}

	function onFocus(e : UniInputFocusEvent) {
		isFocusing.value = true
		emit('focus', e)
	}

	function onBlur(e : UniInputBlurEvent) {
		isFocusing.value = false
		emit('blur', e)
	}

	function onKeyboardHeightChange(e : UniInputKeyboardHeightChangeEvent) {
		keyboardHeight.value = e.detail.height
		emit('keyboardheightchange', e)
	}

	function onChange(e : UniInputChangeEvent) {
		emit('change', e)
	}

	function onConfirm(e : UniInputConfirmEvent) {
		emit('confirm', e)
	}

	const handleTouchStart = () => {
		isTouching = true
	}

	const handleTouchEnd = () => {
		isTouching = false
	}

	onMounted(() => {
		pageTouchEndId = proxy?.$page.onTouchEnd(() => {
			if(!isTouching){
				inputView?.handlePageTouchEndFocus()
			}
		})

		watch(() => style.get('font-size'), (value: string) => {
			inputView?.updateFontSize(value)
		})
		watch(() => style.get('color'), (value: string) => {
			inputView?.updateColor(value)
		})
		watch(() => style.get('line-height'), (value: string) => {
			inputView?.updateLineHeight(value)
		})
		watch(() => style.get('letter-spacing'), (value: string) => {
			inputView?.updateLetterSpacing(value)
		})
		watch(() => style.get('font-weight'), (value: string) => {
			inputView?.updateFontWeight(value)
		})
		watch(() => style.get('font-style'), (value: string) => {
			inputView?.updateFontStyle(value)
		})
		watch(() => style.get('font-family'), (value: string) => {
			inputView?.updateFontFamily(value)
		})
		watch(() => style.get('text-align'), (value: string) => {
			inputView?.updateTextAlign(value)
		})

		watch(() => [inputValue.value, props.placeholder], ([value, placeholder]: [string, string]) => {
			showPlaceholder.value = value == '' && placeholder != '';
		})

		watch(() => props.modelValue, (newValue : string) => {
			if(newValue == inputValue.value) return
			const value = newValue != null ? newValue : ''
			inputValue.value = value.toString()
      if(props.maxlength != -1){
        inputValue.value = inputValue.value.substring(0, parseInt(props.maxlength))
      }
			inputView?.updateValue(inputValue.value)
			inputElement?.updateValue(inputValue.value);
		})

		watch(() => props.value, (newValue : string) => {
			if(newValue == inputValue.value) return
			const value = newValue != null ? newValue : ''
			inputValue.value = value.toString()
      if(props.maxlength != -1){
        inputValue.value = inputValue.value.substring(0, parseInt(props.maxlength))
      }
			inputView?.updateValue(inputValue.value)
			inputElement?.updateValue(inputValue.value);
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
		watch(() => props.maxlength, (newValue : number) => {
			inputView?.updateMaxLength(newValue)
		})
		// input 光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
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

		const formCtx = inject<InputInFormContext | null>(FORM_KEY, null)
		if (formCtx && props.name) {
		  formCtx.registerField({
		    name: props.name,
		    getValue: () => inputValue.value,
		    reset: () => { inputValue.value = initialValue.value }
		  })
		}
		setTimeout(() => {
			inputView?.updateFontSize(style.get('font-size'))
			inputView?.updateColor(style.get('color'))
			inputView?.updateLineHeight(style.get('line-height'))
			inputView?.updateLetterSpacing(style.get('letter-spacing'))
			inputView?.updateFontWeight(style.get('font-weight'))
			inputView?.updateFontStyle(style.get('font-style'))
			inputView?.updateFontFamily(style.get('font-family'))
			inputView?.updateTextAlign(style.get('text-align'))
		}, 80)

		if (proxy?.$el) {
			inputElement = proxy.$el as unknown as UniInputElement;
			// 注册 onValueChange, set value 时更新内部 value 和 arkUI input
			inputElement.onValueChange = (val : string) => {
				inputValue.value = val;
				inputView?.updateValue(val)
			}
			// 初始化 UniInputElement 内部 value
			inputElement.updateValue(inputValue.value);
		}
	})

	onBeforeUnmount(() => {
		inputElement = null
		if(pageTouchEndId != null) {
			proxy?.$page.offTouchEnd(pageTouchEndId)
		}

		const formCtx = inject<{ unregisterField : (name : string) => void } | null>(FORM_KEY, null)
    if (formCtx && props.name) {
      formCtx.unregisterField(props.name)
    }
		// iOS平台需要主动释放 uts 实例
		inputView?.destroy()
	})
</script>

<style>
	.uni-input-wrapper {
		width: 100%;
		justify-content: center;
	}

	.uni-input-container{
		min-height: 100%;
	}

	.uni-input-placeholder {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		right: 0;
		color: #999999;
		white-space: nowrap;
	}
</style>
