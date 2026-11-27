import {
  type Ref,
  computed,
  isInSSRComponentSetup,
  useSSRContext,
  watch,
} from 'vue'
import { normalizeClass } from '@vue/shared'
import {
  INPUT_PLACEHOLDER_CLASS_PREFIX,
  type InputPlaceholderStyle,
  UNI_SSR_INPUT_STYLES,
  createInputPlaceholderStyle,
} from '@dcloudio/uni-shared'
import { registerInputStyle } from './inputStyleSheet'

// 为占位伪元素使用独立的 class，避免业务规则修改 input 自身。
export function normalizeInputPlaceholderClass(
  value: string | null | undefined
) {
  const classes: string[] = []
  for (const token of normalizeClass(value).split(/\s+/)) {
    // 父组件传入的外部类可能带有作用域前缀。
    const name = token.replace(/^\^+/, '')
    if (name) classes.push(INPUT_PLACEHOLDER_CLASS_PREFIX + name)
  }
  return classes.join(' ')
}

export function useInputStyles(
  props: {
    placeholderStyle: string | null | undefined
  },
  fieldRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>
) {
  const placeholder = computed(() =>
    createInputPlaceholderStyle(props.placeholderStyle)
  )
  const placeholderStyle = computed(() => placeholder.value.key)

  if (isInSSRComponentSetup) {
    const context = useSSRContext()
    if (context && placeholder.value.key) {
      const styles: Map<string, InputPlaceholderStyle> =
        context[UNI_SSR_INPUT_STYLES] ||
        (context[UNI_SSR_INPUT_STYLES] = new Map())
      styles.set(placeholder.value.key, placeholder.value)
    }
  }

  watch([fieldRef, placeholderStyle], ([field, key], _, onCleanup) => {
    if (field && key) {
      onCleanup(registerInputStyle(field.ownerDocument, placeholder.value))
    }
  })
  return placeholderStyle
}
