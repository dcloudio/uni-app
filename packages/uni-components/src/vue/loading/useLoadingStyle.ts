import { type Ref, onMounted, onUnmounted, ref } from 'vue'

interface LoadingStyleOptions {
  coefficientMedium?: number
  coefficientThick?: number
}

export function useLoadingStyle(
  targetElement: Ref<HTMLElement | null>,
  options: LoadingStyleOptions = {}
) {
  const loadingSize = ref('16px')
  const loadingBorderWidth = ref('0px')
  let observer: MutationObserver | null = null

  const coefficientMap = {
    medium: options.coefficientMedium || 1,
    thick: options.coefficientThick || 2,
  }

  const calculateLoadingWidth = (element) => {
    if (!element) return

    const computedStyle = window.getComputedStyle(element)

    const width = parseFloat(computedStyle.width)
    const height = parseFloat(computedStyle.height)

    const styleAttribute = element.getAttribute('style') || ''
    let currentBorderWidthKeyword = 'medium' // 默认值

    const match = styleAttribute.match(/border-width:\s*(medium|thick)/)
    if (match && match[1]) {
      currentBorderWidthKeyword = match[1]
    }

    if (!coefficientMap[currentBorderWidthKeyword]) {
      console.warn(
        `[uni-loading] 无效的 border-width 值: "${currentBorderWidthKeyword}"。将使用默认值 "medium"。`
      )
      currentBorderWidthKeyword = 'medium'
    }

    const coefficient = coefficientMap[currentBorderWidthKeyword]
    const minSide = Math.min(width, height)

    // (最小边 / 16) * 系数
    const calculatedWidth = (minSide / 16) * coefficient

    loadingSize.value = `${minSide}px`
    loadingBorderWidth.value = `${calculatedWidth}px`
  }

  const setupObserver = () => {
    if (!targetElement.value) return
    calculateLoadingWidth(targetElement.value)
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' ||
            mutation.attributeName === 'style')
        ) {
          calculateLoadingWidth(targetElement.value)
          break
        }
      }
    })
    observer.observe(targetElement.value, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    size: loadingSize,
    borderWidth: loadingBorderWidth,
  }
}
