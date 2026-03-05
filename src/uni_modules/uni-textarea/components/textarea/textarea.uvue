<template>
	<!-- #ifdef APP -->
	<view :ref="textareaCpp.setElement" :adjustPosition="adjustPosition" change:adjustPosition="textareaCpp.setAdjustPosition" :isFocusing="isFocusing" change:isFocusing="textareaCpp.setIsFocusing" :keyboardHeight="keyboardHeight" change:keyboardHeight="textareaCpp.handleKeyboardHeightChange" class='uni-textarea-wrapper' @touchstart="handleTouchStart" @touchend="handleTouchEnd">
		<view class="uni-textarea-container" flatten>
			<text class="uni-textarea-placeholder" v-if="showPlaceholder" v-show="isComputedPlaceholderStyle" :class="placeholderClass"
				:style="placeholderStyle">{{props.placeholder}}</text>
			<native-view style="height: 100%; width: 100%;" @init="onViewInit"></native-view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef WEB -->
	<textarea />
	<!-- #endif -->
</template>
<script module="textareaCpp" lang="cpp" class-name="Textarea" src="../../cppsdk/textarea.h" namespace="textarea"></script>
<script setup lang="uts">
	import {
		NativeTextareaView,
		// #ifndef APP-IOS
		UniTextareaElement,
		// #endif
	} from "@/uni_modules/uni-textarea";

	const keyboardHeight = ref(0)
	const isFocusing = ref(false)
	const adjustPosition = computed(() => Boolean(props.adjustPosition))

	const proxy = getCurrentInstance()?.proxy
	// 通过变量持有 UniTextareaElement 实例，避免被回收，待框架调整 $el 实现后可尝试移除
	let textareaElement: UniTextareaElement | null = null

	let isTouching = false
	
	let pageTouchEndId: number | null = null

	const FORM_KEY = 'UNI_FORM_CTX'
	interface TextareaInFormContext {
	  registerField : (field : {
	    name : string,
			getValue : () => string,
	    reset ?: () => void
	  }) => void,
	  unregisterField : (name : string) => void
	}

	let textareaView : NativeTextareaView | null = null

	const isComputedPlaceholderStyle = ref(false)

	const style = useComputedStyle({
		properties: ['font-size', 'color', 'line-height', 'letter-spacing', 'font-weight', 'font-style', 'font-family',  'text-align'],
		filterProperties: true
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
		name: 'textarea',
		rootElement: {
			class: UniTextareaElement
		},
		externalClasses: ['placeholder-class']
	})
	// #endif

	interface TextareaProps {
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
		value ?: string;
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
		autoHeight ?: boolean | string;
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
	const props = withDefaults(defineProps<TextareaProps>(), {
		name: 'textarea',
		disabled: false,
		value: '',
		modelValue: '',
		placeholder: '',
		placeholderStyle: '',
		placeholderClass: '',
		maxlength: -1,
		cursorSpacing: 0,
		cursorColor: '',
		autoFocus: false,
		focus: false,
		confirmType: 'return',
		confirmHold: false,
		cursor: 0,
		autoHeight: false,
		selectionStart: -1,
		selectionEnd: -1,
		adjustPosition: true,
		holdKeyboard: false,
	});

	const emit = defineEmits<{
		(e : 'update:modelValue', value : string) : void
		(e : 'input', value : UniInputEvent) : void
		(e : 'focus', value : UniTextareaFocusEvent) : void
		(e : 'blur', value : UniTextareaBlurEvent) : void
		(e : 'keyboardheightchange', value : UniInputKeyboardHeightChangeEvent) : void
		(e : 'change', value : UniInputChangeEvent) : void
		(e : 'linechange', value : UniTextareaLineChangeEvent) : void
		(e : 'confirm', value : UniInputConfirmEvent) : void
	}>()

	function getInitValue() : string {
		return props.modelValue == null || props.modelValue == '' ? props.value : props.modelValue
	}

	const initialValue = ref<string>(getInitValue())
	const textareaValue = ref<string>(initialValue.value)

	const showPlaceholder = ref<boolean>(initialValue.value == '' && props.placeholder != '')

	function onViewInit(e : UniNativeViewInitEvent) {
		setTimeout(() => {
			textareaView = new NativeTextareaView(e.detail.element);
			textareaView!.updateValue(textareaValue.value)
			textareaView!.updateDisabled(props.disabled)
			textareaView!.updateSelectionStart(props.selectionStart)
			textareaView!.updateSelectionEnd(props.selectionEnd)
			textareaView!.updateAutoFocus(props.autoFocus)
			textareaView!.updateFocus(props.focus)
			textareaView!.updateCursor(props.cursor)
			textareaView!.updateConfirmType(props.confirmType)
			textareaView!.updateConfirmHold(props.confirmHold)
			textareaView!.updateAutoHeight(props.autoHeight)
			textareaView!.updateAdjustPosition(props.adjustPosition)
			textareaView!.updateHoldKeyboard(props.holdKeyboard)
			textareaView!.updateMaxLength(props.maxlength)
			textareaView!.updateCursorColor(props.cursorColor)
			textareaView!.updateInputEvent(onInput)
			textareaView!.updateFocusEvent(onFocus)
			textareaView!.updateBlurEvent(onBlur)
			textareaView!.updateKeyboardHeightChangeEvent(onKeyboardHeightChange)
			textareaView!.updateChangeEvent(onChange)
			textareaView!.updateLineChangeEvent(onLineChange)
			textareaView!.updateConfirmEvent(onConfirm)
		}, 80)
	}

	function onInput(e : UniInputEvent) {
		const newValue = e.detail.value
		if (newValue !== textareaValue.value) {
			textareaValue.value = newValue;
			textareaElement?.updateValue(textareaValue.value);
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
	
	function onLineChange(e: UniTextareaLineChangeEvent) {
		emit('linechange', e)
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
				textareaView?.handlePageTouchEndFocus()
			}
		})

		watch(() => style.get('font-size'), (value: string) => {
			textareaView?.updateFontSize(value)
		})
		watch(() => style.get('color'), (value: string) => {
			textareaView?.updateColor(value)
		})
		watch(() => style.get('line-height'), (value: string) => {
			textareaView?.updateLineHeight(value)
		})
		watch(() => style.get('letter-spacing'), (value: string) => {
			textareaView?.updateLetterSpacing(value)
		})
		watch(() => style.get('font-weight'), (value: string) => {
			textareaView?.updateFontWeight(value)
		})
		watch(() => style.get('font-style'), (value: string) => {
			textareaView?.updateFontStyle(value)
		})
		watch(() => style.get('font-family'), (value: string) => {
			textareaView?.updateFontFamily(value)
		})
		watch(() => style.get('text-align'), (value: string) => {
			textareaView?.updateTextAlign(value)
		})
	
		watch(() => [textareaValue.value, props.placeholder], ([value, placeholder]: [string, string]) => {
			showPlaceholder.value = value == '' && placeholder != '';
		})

		watch(() => props.modelValue, (newValue : string) => {
			if(newValue == textareaValue.value) return
			const value = newValue != null ? newValue : ''
			textareaValue.value = value
			if(props.maxlength != -1){
        textareaValue.value = textareaValue.value.substring(0, parseInt(props.maxlength))
      }
			textareaView?.updateValue(textareaValue.value)
			textareaElement?.updateValue(textareaValue.value);
		})
		
		watch(() => props.value, (newValue : string) => {
			if(newValue == textareaValue.value) return
			const value = newValue != null ? newValue : ''
			textareaValue.value = value
			if(props.maxlength != -1){
        textareaValue.value = textareaValue.value.substring(0, parseInt(props.maxlength))
      }
			textareaView?.updateValue(textareaValue.value)
			textareaElement?.updateValue(textareaValue.value);
		})

		watch(() => props.disabled, (newValue : boolean) => {
			textareaView?.updateDisabled(newValue)
		})
		watch(() => props.maxlength, (newValue : number) => {
			textareaView?.updateMaxLength(newValue)
		})
		// input 光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
		watch(() => props.cursorSpacing, (newValue : number) => {
			textareaView?.updateCursorSpacing(newValue)
		})
		watch(() => props.cursorColor, (newValue : string) => {
			textareaView?.updateCursorColor(newValue)
		})

		watch(() => props.focus, (newValue : boolean) => {
			textareaView?.updateFocus(newValue)
		})

		watch(() => props.confirmType, (newValue : string) => {
			textareaView?.updateConfirmType(newValue)
		})

		watch(() => props.confirmHold, (newValue : boolean) => {
			textareaView?.updateConfirmHold(newValue)
		})
		
		watch(() => props.autoHeight, (newValue : boolean) => {
			textareaView?.updateAutoHeight(newValue)
		})

		watch(() => props.cursor, (newValue : number) => {
			textareaView?.updateCursor(newValue)
		})

		watch(() => props.selectionStart, (newValue : number) => {
			textareaView?.updateSelectionStart(newValue)
		})

		watch(() => props.selectionEnd, (newValue : number) => {
			textareaView?.updateSelectionEnd(newValue)
		})

		watch(() => props.adjustPosition, (newValue : boolean) => {
			textareaView?.updateAdjustPosition(newValue)
		})

		watch(() => props.holdKeyboard, (newValue : boolean) => {
			textareaView?.updateHoldKeyboard(newValue)
		})

		const formCtx = inject<TextareaInFormContext | null>(FORM_KEY, null)
		if (formCtx && props.name) {
		  formCtx.registerField({
		    name: props.name,
		    getValue: () => textareaValue.value,
		    reset: () => { textareaValue.value = initialValue.value }
		  })
		}
		setTimeout(() => {
			textareaView?.updateFontSize(style.get('font-size'))
			textareaView?.updateColor(style.get('color'))
			textareaView?.updateLineHeight(style.get('line-height'))
			textareaView?.updateLetterSpacing(style.get('letter-spacing'))
			textareaView?.updateFontWeight(style.get('font-weight'))
			textareaView?.updateFontStyle(style.get('font-style'))
			textareaView?.updateFontFamily(style.get('font-family'))
			textareaView?.updateTextAlign(style.get('text-align'))
		}, 80)

		if (proxy?.$el) {
			textareaElement = proxy.$el as unknown as UniTextareaElement;
			// 注册 onValueChange, set value 时更新内部 value 和 arkUI textarea
      textareaElement.onValueChange = (val : string) => {
				textareaValue.value = val;
        textareaView?.updateValue(val)
      }
			// 初始化 UniTextareaElement 内部 value
			textareaElement.updateValue(textareaValue.value);
    }
	})

	onBeforeUnmount(() => {
		textareaElement = null
		if(pageTouchEndId != null) {
			proxy?.$page.offTouchEnd(pageTouchEndId)
		}

		const formCtx = inject<{ unregisterField : (name : string) => void } | null>(FORM_KEY, null)
    if (formCtx && props.name) {
      formCtx.unregisterField(props.name)
    }
		textareaView?.destroy()
	})
</script>

<style>
	.uni-textarea-wrapper {
		width: 300px;
		height: 150px;
		overflow: visible;
	}
	.uni-textarea-container{
		height: 100%;
	}

	.uni-textarea-placeholder {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		color: #999999;
		font-size: 16px;
	}
</style>