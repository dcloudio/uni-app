import {
  type ExtractPropTypes,
  type Ref,
  type SetupContext,
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'
import { extend } from '@vue/shared'
import { LINEFEED } from '@dcloudio/uni-shared'
import {
  emit as fieldEmit,
  props as fieldProps,
  useField,
} from '../../helpers/useField'
import {
  fieldSelectionProps,
  useFieldSelection,
} from '../../helpers/useFieldSelection'

const webSelectionProps = (
  __PLATFORM__ === 'h5' ? fieldSelectionProps : {}
) as typeof fieldSelectionProps

export const props = /*#__PURE__*/ extend(
  {},
  fieldProps,
  {
    placeholderClass: {
      type: String,
      default: 'input-placeholder',
    },
    autoHeight: {
      type: [Boolean, String],
      default: false,
    },
    confirmType: {
      type: String,
      default: 'return',
      validator(val: string) {
        return ConfirmTypes.concat('return').includes(val)
      },
    },
  },
  webSelectionProps
)

export let fixMargin: Boolean = false
const ConfirmTypes = ['done', 'go', 'next', 'search', 'send'] // 'return'

function setFixMargin() {
  // iOS 13 以下版本需要修正边距
  const DARK_TEST_STRING = '(prefers-color-scheme: dark)'
  fixMargin = __NODE_JS__
    ? false
    : String(navigator.platform).indexOf('iP') === 0 &&
      String(navigator.vendor).indexOf('Apple') === 0 &&
      window.matchMedia(DARK_TEST_STRING).media !== DARK_TEST_STRING
}

export const emits = ['confirm', 'change', 'linechange', ...fieldEmit]

type Props = ExtractPropTypes<typeof props>

export function useTextarea(
  props: Props,
  { emit, expose }: Pick<SetupContext, 'emit' | 'expose'>
) {
  const rootRef: Ref<HTMLElement | null> = ref(null)
  const wrapperRef: Ref<HTMLElement | null> = ref(null)
  const { fieldRef, state, scopedAttrsState, fixDisabledColor, trigger } =
    useField(props, rootRef, emit)
  const selectionRef =
    __PLATFORM__ === 'h5' ? useFieldSelection(props, fieldRef) : undefined
  const valueCompute = computed(() => state.value.split(LINEFEED))
  const isDone = computed(() => ConfirmTypes.includes(props.confirmType))
  const heightRef = ref(0)
  const lineRef: Ref<HTMLElement | null> = ref(null)
  watch(
    () => heightRef.value,
    (height) => {
      const el = rootRef.value as HTMLElement
      const lineEl = lineRef.value as HTMLElement
      const wrapper = wrapperRef.value as HTMLElement
      let lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      if (isNaN(lineHeight)) {
        lineHeight = lineEl.offsetHeight
      }
      var lineCount = Math.round(height / lineHeight)
      trigger('linechange', {} as Event, {
        height,
        heightRpx: (750 / window.innerWidth) * height,
        lineCount,
      })
      if (props.autoHeight) {
        wrapper.style.height = height + 'px'
      }
    }
  )

  //#if _X_
  watch(
    () => props.autoHeight,
    (autoHeight) => {
      const wrapper = wrapperRef.value as HTMLElement
      if (autoHeight) {
        wrapper.style.height = heightRef.value + 'px'
      } else {
        wrapper.style.height = ''
      }
    }
  )
  //#endif

  function onResize({ height }: { height: number }) {
    heightRef.value = height
  }

  function onChange(event: Event) {
    if (__X__) {
      trigger('change', event, {
        value: state.value,
      })
    }
  }

  function confirm(event: Event) {
    trigger('confirm', event, {
      value: state.value,
    })
  }

  function onKeyDownEnter(event: Event) {
    if ((event as KeyboardEvent).key !== 'Enter') {
      return
    }
    if (isDone.value) {
      event.preventDefault()
    }
  }

  function onKeyUpEnter(event: Event) {
    if ((event as KeyboardEvent).key !== 'Enter') {
      return
    }
    if (isDone.value) {
      confirm(event)
      const textarea = event.target as HTMLTextAreaElement
      !props.confirmHold && textarea.blur()
    }
  }

  if (__NODE_JS__) {
    onMounted(setFixMargin)
  } else {
    setFixMargin()
  }

  expose({
    $triggerInput: (detail: { value: string }) => {
      emit('update:modelValue', detail.value)
      emit('update:value', detail.value)
      state.value = detail.value
    },
  })

  return {
    rootRef,
    wrapperRef,
    fieldRef,
    state,
    scopedAttrsState,
    selectionRef,
    fixDisabledColor,
    valueCompute,
    lineRef,
    onResize,
    onChange,
    onKeyDownEnter,
    onKeyUpEnter,
  }
}
