import { type Ref, onMounted, onUnmounted, watchEffect, ref } from 'vue'

export function useLoadingStyle(
  targetElement: Ref<_Element | null>,
  bold: Ref<boolean>
) {
  const loadingSize = ref('16px')
  const loadingBorderWidth = ref('1px')
  const loadingBorderRadius = ref('8px')
  let observer: _ResizeObserver | null = null

  const calculateLoadingWidth = (element: _Element, bold: boolean) => {
    const { width, height } = element.getBoundingClientRect()

    const coefficient = bold ? 2 : 1
    const minSide = Math.min(width, height)

    // (最小边 / 16) * 系数
    const calculatedWidth = (minSide / 16) * coefficient

    loadingSize.value = `${minSide}px`
    loadingBorderWidth.value = `${calculatedWidth}px`
    loadingBorderRadius.value = `${minSide / 2}px`
  }

  const setupObserver = (cb: (el: _Element) => void) => {
    const el = targetElement.value as _Element
    if (!el) return

    observer!.observe(el)
  }

  onMounted(() => {
    setupObserver((el) => {
      calculateLoadingWidth(el, bold.value)
    })
    watchEffect(() => {
      const _bold = bold.value
      const el = targetElement.value
      if (el !== null) {
        calculateLoadingWidth(el, _bold)
      }
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    size: loadingSize,
    borderWidth: loadingBorderWidth,
    borderRadius: loadingBorderRadius,
  }
}
