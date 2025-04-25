import {
  type ExtractPropTypes,
  type HTMLAttributes,
  type Ref,
  type SetupContext,
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { extend, isFunction } from '@vue/shared'
import { debounce } from '@dcloudio/uni-shared'
import { getCurrentPageId, registerViewMethod } from '@dcloudio/uni-core'
import { throttle } from './throttle'
import { type CustomEventTrigger, useCustomEvent } from './useEvent'
import { useUserAction } from './useUserAction'
import {
  emit as keyboardEmit,
  props as keyboardProps,
  useKeyboard,
} from './useKeyboard'
import { useScopedAttrs } from './useScopedAttrs'
import { useFormField } from './useFormField'

function getSelectedTextRange(
  _: unknown,
  resolve: (res: UniApp.GetSelectedTextRangeSuccessCallbackResult) => void
) {
  const activeElement = document.activeElement
  if (!activeElement) {
    return resolve({})
  }
  const data: UniApp.GetSelectedTextRangeSuccessCallbackResult = {}
  if (['input', 'textarea'].includes(activeElement.tagName.toLowerCase())) {
    data.start = (activeElement as HTMLInputElement).selectionStart!
    data.end = (activeElement as HTMLInputElement).selectionEnd!
  }
  resolve(data)
}

const UniViewJSBridgeSubscribe = function () {
  // 内部会判断是否已存在，可重复调用 registerViewMethod 时
  registerViewMethod<{}, UniApp.GetSelectedTextRangeSuccessCallbackResult>(
    getCurrentPageId(),
    'getSelectedTextRange',
    getSelectedTextRange
  )
}

// App 延迟获取焦点
const FOCUS_DELAY = 200
let startTime: number

function getValueString(value: any, type: string, maxlength?: number) {
  if (type === 'number' && isNaN(Number(value))) {
    value = ''
  }
  const valueStr = value === null || value === void 0 ? '' : String(value)
  if (maxlength == void 0) {
    return valueStr
  }
  return valueStr.slice(0, maxlength)
}

interface InputEventDetail {
  value: string
}

type HTMLFieldElement = HTMLInputElement | HTMLTextAreaElement

type INPUT_MODE = HTMLAttributes['inputmode']
const INPUT_MODES: INPUT_MODE[] = [
  'none',
  'text',
  'decimal',
  'numeric',
  'tel',
  'search',
  'email',
  'url',
]

export const props = /*#__PURE__*/ extend(
  {},
  {
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * 已废弃属性，用于历史兼容
     */
    autoFocus: {
      type: [Boolean, String],
      default: false,
    },
    focus: {
      type: [Boolean, String],
      default: false,
    },
    cursor: {
      type: [Number, String],
      default: -1,
    },
    selectionStart: {
      type: [Number, String],
      default: -1,
    },
    selectionEnd: {
      type: [Number, String],
      default: -1,
    },
    type: {
      type: String,
      default: 'text',
    },
    password: {
      type: [Boolean, String],
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    placeholderStyle: {
      type: String,
      default: '',
    },
    placeholderClass: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, String],
      default: __X__ ? Infinity : 140,
    },
    confirmType: {
      type: String,
      default: 'done',
    },
    confirmHold: {
      type: Boolean,
      default: false,
    },
    ignoreCompositionEvent: {
      type: Boolean,
      default: true,
    },
    step: {
      type: String,
      default: '0.000000000000000001',
    },
    inputmode: {
      type: String,
      default: undefined,
      validator: (value: INPUT_MODE) => !!~INPUT_MODES.indexOf(value),
    },
    cursorColor: {
      type: String,
      default: '',
    },
  },
  keyboardProps
)

export const emit = [
  'input',
  'focus',
  'blur',
  'update:value',
  'update:modelValue',
  'update:focus',
  'compositionstart',
  'compositionupdate',
  'compositionend',
  ...keyboardEmit,
]

type Props = ExtractPropTypes<typeof props>

export interface State {
  value: string
  maxlength: number
  focus: boolean | string
  composing: boolean
  selectionStart: number
  selectionEnd: number
  cursor: number
}

function useBase(
  props: Props,
  rootRef: Ref<HTMLElement | null>,
  emit: SetupContext['emit']
) {
  const fieldRef: Ref<HTMLFieldElement | null> = ref(null)
  const trigger = useCustomEvent(rootRef, emit)
  const selectionStart = computed(() => {
    const selectionStart = Number(props.selectionStart)
    return isNaN(selectionStart) ? -1 : selectionStart
  })
  const selectionEnd = computed(() => {
    const selectionEnd = Number(props.selectionEnd)
    return isNaN(selectionEnd) ? -1 : selectionEnd
  })
  const cursor = computed(() => {
    const cursor = Number(props.cursor)
    return isNaN(cursor) ? -1 : cursor
  })
  const maxlength = computed(() => {
    var maxlength = Number(props.maxlength)
    if (__X__) {
      return isNaN(maxlength) || maxlength < 0
        ? Infinity
        : Math.floor(maxlength)
    } else {
      return isNaN(maxlength) ? 140 : maxlength
    }
  })
  let value = ''
  if (__X__) {
    // case: 如果 modelValue 和 value 都存在，优先使用 modelValue
    // case: 如果 modelValue 未设置，读取 value

    const modelValueString = getValueString(
      props.modelValue,
      props.type,
      maxlength.value
    )
    const valueString = getValueString(props.value, props.type, maxlength.value)

    // prettier-ignore
    value =
      props.modelValue !== void 0
        ? modelValueString !== null && modelValueString !== void 0
          ? modelValueString
          : valueString
        : valueString
  } else {
    value =
      getValueString(props.modelValue, props.type) ||
      getValueString(props.value, props.type)
  }
  const state: State = reactive({
    value,
    valueOrigin: value,
    maxlength,
    focus: props.focus,
    composing: false,
    selectionStart,
    selectionEnd,
    cursor,
  })
  watch(
    () => state.focus,
    (val) => emit('update:focus', val)
  )
  watch(
    () => state.maxlength,
    (val) => (state.value = state.value.slice(0, val)),
    {
      immediate: __X__ ? true : false,
    }
  )
  return {
    fieldRef,
    state,
    trigger,
  }
}

function useValueSync(
  props: Props,
  state: { value: string; maxlength: number },
  emit: SetupContext['emit'],
  trigger: CustomEventTrigger
) {
  let valueChangeFn:
    | ReturnType<typeof throttle>
    | ReturnType<typeof debounce>
    | null = null
  if (__X__) {
    valueChangeFn = throttle((val: any) => {
      state.value = getValueString(val, props.type, state.maxlength)
    }, 100)
  } else {
    valueChangeFn = debounce(
      (val: any) => {
        state.value = getValueString(val, props.type)
      },
      100,
      { setTimeout, clearTimeout }
    )
  }
  watch(() => props.modelValue, valueChangeFn!)
  watch(() => props.value, valueChangeFn!)
  const triggerInputFn = throttle((event: Event, detail: InputEventDetail) => {
    valueChangeFn!.cancel()
    emit('update:modelValue', detail.value)
    emit('update:value', detail.value)
    trigger('input', event, detail)
  }, 100)
  const triggerInput = (
    event: Event,
    detail: InputEventDetail,
    force: boolean
  ) => {
    valueChangeFn!.cancel()
    triggerInputFn(event, detail)
    if (force) {
      triggerInputFn.flush()
    }
  }
  onBeforeMount(() => {
    valueChangeFn!.cancel()
    triggerInputFn.cancel()
  })
  return {
    trigger,
    triggerInput,
  }
}

function useAutoFocus(props: Props, fieldRef: Ref<HTMLFieldElement | null>) {
  const { state: userActionState } = useUserAction()
  const needFocus = computed(() => props.autoFocus || props.focus)
  function focus() {
    if (!needFocus.value) {
      return
    }
    const field = fieldRef.value
    if (!field || (__PLATFORM__ === 'app' && !('plus' in window))) {
      setTimeout(focus, 100)
      return
    }
    if (__PLATFORM__ === 'h5') {
      field.focus()
    } else {
      const timeout = FOCUS_DELAY - (Date.now() - startTime)
      if (timeout > 0) {
        setTimeout(focus, timeout)
        return
      }
      // @ts-expect-error plus类型
      if (plus.os.name === 'HarmonyOS') {
        // 无用户交互的 webview 需主动显示键盘（鸿蒙）
        if (!userActionState.userAction) {
          // 鸿蒙需要先显示键盘再focus，否则键盘类型、confirmType等设置无效
          plus.key.showSoftKeybord()
          setTimeout(() => {
            field.focus()
          }, 100)
        } else {
          field.focus()
        }
      } else {
        field.focus()
        // 无用户交互的 webview 需主动显示键盘（安卓）
        if (!userActionState.userAction && props.inputmode !== 'none') {
          plus.key.showSoftKeybord()
        }
      }
    }
  }
  function blur() {
    const field = fieldRef.value
    if (field) {
      field.blur()
    }
  }
  watch(
    () => props.focus,
    (value) => {
      if (value) {
        focus()
      } else {
        blur()
      }
    }
  )
  onMounted(() => {
    startTime = startTime || Date.now()
    if (needFocus.value) {
      // nextTick 为了保证逻辑在initField之后执行
      nextTick(focus)
    }
  })
}

function useEvent(
  fieldRef: Ref<HTMLFieldElement | null>,
  state: State,
  props: Props,
  trigger: CustomEventTrigger,
  triggerInput: Function,
  beforeInput?: (event: Event, state: State) => any
) {
  function checkSelection() {
    const field = fieldRef.value
    if (
      field &&
      state.focus &&
      state.selectionStart > -1 &&
      state.selectionEnd > -1 &&
      field.type !== 'number'
    ) {
      field.selectionStart = state.selectionStart
      field.selectionEnd = state.selectionEnd
    }
  }
  function checkCursor() {
    const field = fieldRef.value
    if (
      field &&
      state.focus &&
      state.selectionStart < 0 &&
      state.selectionEnd < 0 &&
      state.cursor > -1 &&
      field.type !== 'number'
    ) {
      field.selectionEnd = field.selectionStart = state.cursor
    }
  }
  function getFieldSelectionEnd(field: HTMLInputElement) {
    if (field.type === 'number') {
      return null
    } else {
      return field.selectionEnd
    }
  }
  function initField() {
    const field = fieldRef.value
    if (!field) return
    const onFocus = function (event: Event) {
      state.focus = true
      trigger('focus', event, {
        value: state.value,
      })
      // 从 watch:focusSync 中移出到这里。在watcher中如果focus初始值为ture，则不会执行以下逻辑
      checkSelection()
      checkCursor()
    }
    const onInput = function (event: Event, force?: boolean) {
      event.stopPropagation()
      if (isFunction(beforeInput) && beforeInput(event, state) === false) {
        return
      }
      state.value = field.value
      if (!state.composing || !props.ignoreCompositionEvent) {
        triggerInput(
          event,
          {
            value: field.value,
            cursor: getFieldSelectionEnd(field as HTMLInputElement),
          },
          force
        )
      }
    }
    const onBlur = function (event: Event) {
      // iOS 输入法 compositionend 事件可能晚于 blur
      if (state.composing) {
        state.composing = false
        onInput(event, true)
      }
      state.focus = false
      trigger('blur', event, {
        value: state.value,
        cursor: getFieldSelectionEnd(event.target as HTMLInputElement),
      })
    }
    // 避免触发父组件 change 事件
    field.addEventListener('change', (event: Event) => event.stopPropagation())
    field.addEventListener('focus', onFocus)
    field.addEventListener('blur', onBlur)
    field.addEventListener('input', onInput)
    field.addEventListener('compositionstart', (event) => {
      event.stopPropagation()
      state.composing = true
      _onComposition(event)
    })
    field.addEventListener('compositionend', (event) => {
      event.stopPropagation()
      if (state.composing) {
        state.composing = false
        // 部分输入法 compositionend 事件可能晚于 input
        onInput(event)
      }
      _onComposition(event)
    })
    field.addEventListener('compositionupdate', _onComposition)
    function _onComposition(event: Event) {
      if (!props.ignoreCompositionEvent) {
        trigger((event as InputEvent).type, event, {
          value: (event as InputEvent).data,
        })
      }
    }
  }
  watch([() => state.selectionStart, () => state.selectionEnd], checkSelection)
  watch(() => state.cursor, checkCursor)
  watch(() => fieldRef.value, initField)
}

export function useField(
  props: Props,
  rootRef: Ref<HTMLElement | null>,
  emit: SetupContext['emit'],
  beforeInput?: (event: Event, state: State) => any
) {
  UniViewJSBridgeSubscribe()
  const { fieldRef, state, trigger } = useBase(props, rootRef, emit)
  const { triggerInput } = useValueSync(props, state, emit, trigger)
  useAutoFocus(props, fieldRef)
  useKeyboard(props, fieldRef, trigger)
  const { state: scopedAttrsState } = useScopedAttrs()
  useFormField('name', state)
  useEvent(fieldRef, state, props, trigger, triggerInput, beforeInput)

  // Safari 14 以上修正禁用状态颜色
  // TODO fixDisabledColor 可以调整到beforeMount或mounted做修正，确保不影响SSR
  const fixDisabledColor = __NODE_JS__
    ? false
    : String(navigator.vendor).indexOf('Apple') === 0 &&
      CSS.supports('image-orientation:from-image')

  return {
    fieldRef,
    state,
    scopedAttrsState,
    fixDisabledColor,
    trigger,
  }
}
