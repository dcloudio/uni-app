import {
  type Ref,
  computed,
  isInSSRComponentSetup,
  onActivated,
  onDeactivated,
  useSSRContext,
  watch,
} from 'vue'
import { normalizeClass } from '@vue/shared'
import {
  INPUT_SELECTION_ATTRIBUTE,
  INPUT_SELECTION_BACKGROUND,
  INPUT_SELECTION_PROBE,
  INPUT_SELECTION_PROBE_BACKGROUND,
  type InputPlaceholderStyle,
  UNI_SSR_INPUT_STYLES,
  createInputPlaceholderStyle,
} from '@dcloudio/uni-shared'
import { registerInputStyle } from './inputStyleSheet'

export function normalizeInputStyleClass(value: string | null | undefined) {
  // SSR 保留显式空值，先沿用 Vue 的类名规范化，与客户端 externalClass 一致。
  // externalClasses 为跨组件传递的类名添加 ^；作用域由现有 scoped attrs 透传。
  return normalizeClass(value)
    .replace(/(^|\s)\^+/g, '$1')
    .trim()
}

export function useInputStyles(
  props: {
    placeholderStyle: string | null | undefined
    placeholderClass: string
    selectionClass: string
  },
  fieldRef: Ref<HTMLInputElement | HTMLTextAreaElement | null>
) {
  let active = true
  let resume: (() => void) | undefined
  let pause: (() => void) | undefined
  onActivated(() => {
    active = true
    resume?.()
  })
  onDeactivated(() => {
    active = false
    pause?.()
  })
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

  watch(
    [fieldRef, placeholder],
    ([field, style], _, onCleanup) => {
      if (!field) return
      onCleanup(registerInputStyle(field.ownerDocument, style))
    },
    // 先收集本轮规则，再由共享样式表在 mounted/updated 之前统一写入。
    { flush: 'pre' }
  )
  watch(
    [fieldRef, () => props.selectionClass],
    ([field, className], _, onCleanup) => {
      if (!field || !className) return
      let frame: number | undefined
      const clear = () => {
        field.removeAttribute(INPUT_SELECTION_ATTRIBUTE)
        field.style.removeProperty(INPUT_SELECTION_BACKGROUND)
      }
      // 不生成 DOM 的伪元素承担原探测节点的层叠与 currentColor 解析。
      // 只在挂载、激活、焦点变化及聚焦期间读取，未聚焦时不逐帧观察。
      function refresh() {
        frame = undefined
        if (!active || !field!.isConnected) return
        let color = getComputedStyle(
          field!,
          INPUT_SELECTION_PROBE
        ).backgroundColor
        if (
          color === 'transparent' ||
          color.replace(/\s/g, '') === 'rgba(0,0,0,0)'
        ) {
          // 区分显式透明与没有有效背景声明；后者继续使用浏览器默认选区。
          field!.style.setProperty(INPUT_SELECTION_PROBE_BACKGROUND, '#000000')
          try {
            if (
              getComputedStyle(field!, INPUT_SELECTION_PROBE)
                .backgroundColor !== color
            )
              color = ''
          } finally {
            field!.style.removeProperty(INPUT_SELECTION_PROBE_BACKGROUND)
          }
        }
        if (color) {
          if (
            field!.style.getPropertyValue(INPUT_SELECTION_BACKGROUND) !== color
          )
            field!.style.setProperty(INPUT_SELECTION_BACKGROUND, color)
          if (!field!.hasAttribute(INPUT_SELECTION_ATTRIBUTE))
            field!.setAttribute(INPUT_SELECTION_ATTRIBUTE, '')
        } else {
          clear()
        }
        if (field!.ownerDocument.activeElement === field) {
          frame = requestAnimationFrame(refresh)
        }
      }
      function stop() {
        if (frame !== undefined) cancelAnimationFrame(frame)
        frame = undefined
      }
      function start() {
        stop()
        refresh()
      }
      resume = () => {
        start()
      }
      pause = stop
      field.addEventListener('focus', start)
      field.addEventListener('blur', start)
      resume()
      onCleanup(() => {
        pause?.()
        resume = pause = undefined
        field.removeEventListener('focus', start)
        field.removeEventListener('blur', start)
        clear()
      })
    },
    { flush: 'post' }
  )
  return placeholderStyle
}
